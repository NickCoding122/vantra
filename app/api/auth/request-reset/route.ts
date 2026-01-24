import { NextResponse } from "next/server";
import admin from "firebase-admin";
import crypto from "crypto";
import { Resend } from "resend";
import { auth, db } from "../../../../lib/firebaseAdmin";

const RESET_TOKEN_BYTES = 32;
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;
const RESET_TYPE = "password_reset";

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email) {
      return NextResponse.json({ success: true });
    }

    let userRecord: { uid: string } | null = null;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error: any) {
      if (error?.code !== "auth/user-not-found") {
        throw error;
      }
    }

    if (userRecord) {
      const existingResets = await db
        .collection("password_resets")
        .where("userId", "==", userRecord.uid)
        .where("used", "==", false)
        .get();

      if (!existingResets.empty) {
        const batch = db.batch();
        existingResets.docs.forEach((doc) => {
          batch.update(doc.ref, { used: true });
        });
        await batch.commit();
      }

      const resetToken = crypto.randomBytes(RESET_TOKEN_BYTES).toString("hex");
      const tokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const expiresAt = admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + RESET_TOKEN_TTL_MS)
      );

      await db.collection("password_resets").add({
        userId: userRecord.uid,
        tokenHash,
        type: RESET_TYPE,
        expiresAt,
        used: false,
      });
      console.info("auth.request-reset.token-created", {
        userId: userRecord.uid,
      });

      const resetUrl = `https://vantra.app/reset-password?token=${resetToken}`;

      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: "Vantra <info@vantra.app>",
          to: email,
          template: {
            id: "fda23c26-32db-47ef-8e27-b0772ad3d558",
            variables: {
              email,
              reset_url: resetUrl,
            },
          },
        });
        console.info("auth.request-reset.email-sent", {
          userId: userRecord.uid,
        });
      } catch (error) {
        console.error("auth.request-reset.email-failed", {
          userId: userRecord.uid,
          error,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("auth.request-reset.error", { error });
    return NextResponse.json({ success: true });
  }
}
