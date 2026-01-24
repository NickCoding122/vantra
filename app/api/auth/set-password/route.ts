import { NextResponse } from "next/server";
import admin from "firebase-admin";
import crypto from "crypto";
import { auth, db } from "../../../../lib/firebaseAdmin";

const MIN_PASSWORD_LENGTH = 8;

export async function POST(request: Request) {
  try {
    const { token, password } = (await request.json()) as {
      token?: string;
      password?: string;
    };

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing token or password" },
        { status: 400 }
      );
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const snapshot = await db
      .collection("applications")
      .where("passwordSetupTokenHash", "==", tokenHash)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.warn("Set password token validation failed: token not found", {
        tokenHash,
      });
      return NextResponse.json(
        { error: "Token is invalid or already used" },
        { status: 400 }
      );
    }

    const doc = snapshot.docs[0];
    const applicationData = doc.data() as {
      email?: string;
      passwordSetupExpiresAt?: admin.firestore.Timestamp;
      passwordSetupTokenType?: string;
      passwordSetupUsedAt?: admin.firestore.Timestamp;
      status?: string;
    };

    const expiresAt = applicationData.passwordSetupExpiresAt;
    const tokenType = applicationData.passwordSetupTokenType;
    const status = applicationData.status;

    if (status !== "approved") {
      console.warn("Set password token validation failed: status not approved", {
        applicationId: doc.id,
        status,
      });
      return NextResponse.json({ error: "Token is invalid" }, { status: 400 });
    }

    if (applicationData.passwordSetupUsedAt) {
      console.warn("Set password token validation failed: token already used", {
        applicationId: doc.id,
      });
      return NextResponse.json(
        { error: "Token is invalid or already used" },
        { status: 400 }
      );
    }

    if (!tokenType) {
      console.warn("Set password token validation failed: missing token type", {
        applicationId: doc.id,
        tokenType,
      });
      return NextResponse.json(
        { error: "Token type is required" },
        { status: 400 }
      );
    }

    if (tokenType !== "onboarding") {
      console.warn("Set password token validation failed: invalid token type", {
        applicationId: doc.id,
        tokenType,
      });
      return NextResponse.json(
        { error: "Token type must be onboarding" },
        { status: 400 }
      );
    }

    if (!expiresAt) {
      console.warn("Set password token validation failed: missing expiry", {
        applicationId: doc.id,
      });
      return NextResponse.json({ error: "Token is invalid" }, { status: 400 });
    }

    if (expiresAt.toMillis() < Date.now()) {
      console.warn("Set password token validation failed: token expired", {
        applicationId: doc.id,
      });
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const email = applicationData.email;

    if (!email) {
      console.warn("Set password token validation failed: missing email", {
        applicationId: doc.id,
      });
      return NextResponse.json(
        { error: "Application missing email" },
        { status: 400 }
      );
    }

    try {
      const user = await auth.getUserByEmail(email);
      await auth.updateUser(user.uid, { password });
    } catch (error: any) {
      if (error.code !== "auth/user-not-found") {
        throw error;
      }

      await auth.createUser({
        email,
        emailVerified: true,
        password,
      });
    }

    await doc.ref.update({
      passwordSetupTokenHash: admin.firestore.FieldValue.delete(),
      passwordSetupExpiresAt: admin.firestore.FieldValue.delete(),
      passwordSetupUsedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
