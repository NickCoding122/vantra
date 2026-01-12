import { NextResponse } from "next/server";
import admin from "firebase-admin";
import crypto from "crypto";
import { auth, db } from "../../../../lib/firebaseAdmin";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitByEmail = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    const ADMIN_EMAILS = ["nick@vantra.app", "anton@vantra.app"];

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decodedToken: { email?: string };
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = decodedToken.email;

    if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limiting
    const now = Date.now();
    const recentAttempts =
      rateLimitByEmail
        .get(adminEmail)
        ?.filter((t) => now - t < RATE_LIMIT_WINDOW_MS) ?? [];

    if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many approval attempts" },
        { status: 429 }
      );
    }

    recentAttempts.push(now);
    rateLimitByEmail.set(adminEmail, recentAttempts);

    const { applicationId } = (await request.json()) as {
      applicationId?: string;
    };

    if (!applicationId) {
      return NextResponse.json(
        { error: "Missing applicationId" },
        { status: 400 }
      );
    }

    const applicationRef = db.collection("applications").doc(applicationId);
    const applicationSnapshot = await applicationRef.get();

    if (!applicationSnapshot.exists) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const applicationData = applicationSnapshot.data() as {
      email?: string;
      fullName?: string;
      status?: string;
    };

    const email = applicationData.email;
    const name = applicationData.fullName;
    const status = applicationData.status;

    // Idempotency
    if (status === "approved") {
      return NextResponse.json({ success: true });
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: "Application data incomplete" },
        { status: 400 }
      );
    }

    // Ensure user exists (but DO NOT generate reset link here)
    try {
      await auth.getUserByEmail(email);
    } catch (error: any) {
      if (error.code !== "auth/user-not-found") {
        throw error;
      }

      await auth.createUser({
        email,
        emailVerified: true,
      });
    }

    const passwordSetupToken = crypto.randomUUID();
    const passwordSetupTokenHash = crypto
      .createHash("sha256")
      .update(passwordSetupToken)
      .digest("hex");
    const passwordSetupExpiresAt = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 15 * 60 * 1000)
    );

    await applicationRef.update({
      status: "approved",
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
      passwordSetupTokenHash,
      passwordSetupExpiresAt,
    });

    const setPasswordUrl = `https://vantra.app/set-password?token=${passwordSetupToken}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Vantra <info@vantra.app>",
      to: email,
      template: {
        id: "27d59f28-3ccc-4005-a6b9-87dc285f83c9",
        variables: {
          name,
          set_password_url: setPasswordUrl,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
