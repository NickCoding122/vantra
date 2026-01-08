import { NextResponse } from "next/server";
import { auth, db, serverTimestamp } from "../../../../lib/firebaseAdmin";
import { Resend } from "resend";

export async function POST(request: Request) {
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
    name?: string;
  };

  const email = applicationData.email;
  const name = applicationData.name;

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

    await auth.createUser({ email, emailVerified: true });
  }

  const resetUrl = await auth.generatePasswordResetLink(email, {
    url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  });

  await applicationRef.update({
    status: "approved",
    approvedAt: serverTimestamp(),
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Vantra <no-reply@vantra.com>",
    to: email,
    template_id: "vantra.application.approved",
    params: {
      name,
      reset_url: resetUrl,
    },
  });

  return NextResponse.json({ success: true });
}
