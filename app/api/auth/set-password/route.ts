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
      return NextResponse.json(
        { error: "Token is invalid or already used" },
        { status: 400 }
      );
    }

    const doc = snapshot.docs[0];
    const applicationData = doc.data() as {
      email?: string;
      passwordSetupExpiresAt?: admin.firestore.Timestamp;
    };

    const expiresAt = applicationData.passwordSetupExpiresAt;

    if (!expiresAt) {
      return NextResponse.json({ error: "Token is invalid" }, { status: 400 });
    }

    if (expiresAt.toMillis() < Date.now()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const email = applicationData.email;

    if (!email) {
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
