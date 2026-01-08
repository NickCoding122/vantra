import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { auth, db } from "../../../../lib/firebaseAdmin";
import { Resend } from "resend";

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
    } catch (error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emailFromToken = decodedToken.email;

    if (!emailFromToken || !ADMIN_EMAILS.includes(emailFromToken)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = (await request.json()) as { applicationId?: string };
    const applicationId = data.applicationId;

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
    };

    const email = applicationData.email;
    const name = applicationData.fullName;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Application data incomplete" },
        { status: 400 }
      );
    }

    try {
      await auth.getUserByEmail(email);
    } catch (error) {
      const authError = error as { code?: string };
      if (authError.code !== "auth/user-not-found") {
        throw error;
      }

      await auth.createUser({
        email,
        emailVerified: true,
      });
    }

    const resetUrl = await auth.generatePasswordResetLink(email, {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    });

    await applicationRef.update({
      status: "approved",
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Vantra <info@vantra.app>",
      to: email,
      template: {
        id: "27d59f28-3ccc-4005-a6b9-87dc285f83c9",
        variables: {
          name,
          reset_url: resetUrl,
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
