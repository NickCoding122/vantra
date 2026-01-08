import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { auth, db } from "../../../../lib/firebaseAdmin";
import { Resend } from "resend";

export async function POST(request: Request) {
  const snapshot = await db.collection("applications").limit(10).get();

  const visibleIds = snapshot.docs.map((d) => d.id);
  
  return NextResponse.json({
    debug: true,
    visibleApplicationIds: visibleIds,
  });

  
  try {
    const data = (await request.json()) as { applicationId?: string };
    const applicationId = data.applicationId;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Missing applicationId" },
        { status: 400 }
      );
    }

    // Fetch application
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

    // Create or fetch Firebase Auth user
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

    // Generate password reset link
    const resetUrl = await auth.generatePasswordResetLink(email, {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    });

    // Update Firestore application status
    await applicationRef.update({
      status: "approved",
      approvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send approval email via Resend template
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Vantra <no-reply@vantra.com>",
      to: email,
      template: {
        id: "vantra.application.approved",
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
