const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { logger } = require("firebase-functions");
const { Resend } = require("resend");

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

exports.notifyNewApplication = onDocumentCreated(
  {
    document: "applications/{docId}",
    secrets: [RESEND_API_KEY],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("No snapshot data for applications onCreate event.");
      return;
    }

    const data = snapshot.data() || {};
    const applicantName = data.name || "Unknown";
    const applicantEmail = data.email || "Unknown";
    const instagramHandle = data.instagram || "Unknown";
    const proposedBy = data.proposedBy || "";
    const documentId = event.params.docId;
    const createdAt = snapshot.createTime
      ? snapshot.createTime.toDate().toISOString()
      : "Unknown";

    const lines = [
      "A new Vantra application was submitted.",
      "",
      `Applicant name: ${applicantName}`,
      `Applicant email: ${applicantEmail}`,
      `Instagram handle: ${instagramHandle}`,
      `Proposed by: ${proposedBy || "N/A"}`,
      `Firestore document ID: ${documentId}`,
      `Creation timestamp: ${createdAt}`,
    ];

    try {
      const resend = new Resend(RESEND_API_KEY.value());
      await resend.emails.send({
        from: "Vantra <info@vantra.app>",
        to: ["nicholaswsymons@gmail.com", "antonshumeyko@mail.ru"],
        subject: "New Vantra app application",
        text: lines.join("\n"),
      });
    } catch (error) {
      logger.error("Failed to send application notification email.", error);
    }
  }
);
