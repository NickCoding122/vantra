import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { Resend } from "resend";
import { db } from "../../../lib/firebaseAdmin";

export const runtime = "nodejs";

type ApplicationPayload = {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role?: string;
  instagram?: string;
  email?: string;
  agency?: string;
  photos?: string[];
  proposedBy?: string;
};

export async function POST(request: Request) {
  let payload: ApplicationPayload | undefined;
  try {
    payload = (await request.json()) as ApplicationPayload;
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const {
    firstName,
    lastName,
    fullName,
    role,
    instagram,
    email,
    agency,
    photos,
    proposedBy,
  } = payload;

  const hasRequiredStrings =
    firstName !== undefined &&
    lastName !== undefined &&
    fullName !== undefined &&
    role !== undefined &&
    instagram !== undefined &&
    email !== undefined &&
    agency !== undefined;

  if (!hasRequiredStrings || !Array.isArray(photos)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const createdAt = admin.firestore.Timestamp.now();

  const applicationData: Record<string, unknown> = {
    firstName,
    lastName,
    fullName,
    role,
    instagram,
    email,
    agency,
    photos,
    status: "pending",
    createdAt,
  };

  if (typeof proposedBy === "string") {
    applicationData.proposedBy = proposedBy;
  }

  await db.collection("applications").add(applicationData);

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const resend = new Resend(resendApiKey);
    const submittedAt = createdAt.toDate().toISOString();

    const bodyLines = [
      `Submitted at: ${submittedAt}`,
      `Full name: ${fullName}`,
      `First name: ${firstName}`,
      `Last name: ${lastName}`,
      `Role: ${role}`,
      `Instagram: ${instagram}`,
      `Email: ${email}`,
      `Agency: ${agency}`,
      `Photos: ${photos.join(", ")}`,
    ];

    if (typeof proposedBy === "string" && proposedBy.trim().length > 0) {
      bodyLines.push(`Proposed by: ${proposedBy}`);
    }

    await resend.emails.send({
      from: "Vantra <info@vantra.app>",
      to: ["nicholaswsymons@gmail.com", "antonshumeyko@mail.ru"],
      subject: "New Vantra app application",
      text: bodyLines.join("\n"),
    });
  } catch (error) {
    console.error("apply-app.email.error", error, { payload });
  }

  return NextResponse.json({ success: true });
}
