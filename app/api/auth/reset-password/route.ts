import { NextResponse } from "next/server";
import admin from "firebase-admin";
import crypto from "crypto";
import { auth, db } from "../../../../lib/firebaseAdmin";

const RESET_TYPE = "password_reset";

export async function POST(request: Request) {
  try {
    const { token, password } = (await request.json()) as {
      token?: string;
      password?: string;
    };

    if (!token || !password) {
      console.error("auth.reset-password.invalid-request", {
        hasToken: Boolean(token),
        hasPassword: Boolean(password),
      });
      return NextResponse.json(
        { error: "Missing token or password" },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const snapshot = await db
      .collection("password_resets")
      .where("tokenHash", "==", tokenHash)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.error("auth.reset-password.invalid-token", { tokenHash });
      return NextResponse.json(
        { error: "Token is invalid or expired" },
        { status: 400 }
      );
    }

    const doc = snapshot.docs[0];
    const resetData = doc.data() as {
      userId?: string;
      used?: boolean;
      expiresAt?: admin.firestore.Timestamp;
      type?: string;
    };

    if (resetData.type !== RESET_TYPE) {
      console.error("auth.reset-password.invalid-type", {
        tokenHash,
        type: resetData.type,
      });
      return NextResponse.json(
        { error: "Token is invalid or expired" },
        { status: 400 }
      );
    }

    if (resetData.used) {
      console.error("auth.reset-password.used-token", { tokenHash });
      return NextResponse.json(
        { error: "Token is invalid or expired" },
        { status: 400 }
      );
    }

    const expiresAt = resetData.expiresAt;
    if (!expiresAt || expiresAt.toMillis() <= Date.now()) {
      console.error("auth.reset-password.expired-token", {
        tokenHash,
        expiresAt: expiresAt?.toDate().toISOString(),
      });
      return NextResponse.json(
        { error: "Token is invalid or expired" },
        { status: 400 }
      );
    }

    if (!resetData.userId) {
      console.error("auth.reset-password.missing-user", { tokenHash });
      return NextResponse.json(
        { error: "Token is invalid or expired" },
        { status: 400 }
      );
    }

    await auth.updateUser(resetData.userId, { password });

    await doc.ref.update({
      used: true,
      usedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("auth.reset-password.error", { error });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
