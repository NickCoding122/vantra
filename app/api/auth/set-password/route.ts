import { NextResponse } from "next/server";
import { auth, db } from "../../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const snapshot = await db
    .collection("applications")
    .where("approvalToken", "==", token)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  if (!data.email) {
    return NextResponse.json({ error: "Invalid application" }, { status: 400 });
  }

  // Ensure user exists
  try {
    await auth.getUserByEmail(data.email);
  } catch {
    await auth.createUser({
      email: data.email,
      emailVerified: true,
    });
  }

  // Generate reset link NOW (human confirmed)
  const resetUrl = await auth.generatePasswordResetLink(data.email, {
    url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  });

  // Burn the token
  await doc.ref.update({
    approvalToken: null,
  });

  return NextResponse.json({ redirectUrl: resetUrl });
}
