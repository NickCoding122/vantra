import { NextResponse } from "next/server";
import { appendApplicationRow } from "../../../lib/googleSheets";
import { Resend } from "resend";

export async function POST(request: Request) {
  const data = await request.json();
  await appendApplicationRow(data);
  const submittedAt = new Date().toISOString();

  const applicantName = data?.name ?? "";
  const applicantEmail = data?.email ?? "";
  const applicantInstagram = data?.instagram ?? "";
  const proposedBy = data?.proposedBy ?? data?.proposed_by ?? "";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const bodyLines = [
      `Applicant name: ${applicantName}`,
      `Applicant email: ${applicantEmail}`,
      `Instagram handle: ${applicantInstagram}`,
      ...(proposedBy ? [`Proposed by: ${proposedBy}`] : []),
      `Submission timestamp: ${submittedAt}`,
    ];

    await resend.emails.send({
      from: "Vantra <info@vantra.app>",
      to: ["nicholaswsymons@gmail.com", "antonshumeyko@mail.ru"],
      subject: "New Vantra application submitted",
      text: bodyLines.join("\n"),
    });
  } catch (error) {
    console.error("apply.notification_email_failed", error);
  }

  return NextResponse.json({ success: true });
}
