import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { db } from "../../../../lib/firebaseAdmin";

type NotificationType = "message" | "connection_request";

type SendNotificationPayload = {
  recipientUserId?: string;
  type?: NotificationType;
  threadId?: string;
  requestId?: string;
};

const notificationCopy: Record<NotificationType, { title: string; body: string }> = {
  message: {
    title: "New message",
    body: "You have a new message waiting.",
  },
  connection_request: {
    title: "New connection request",
    body: "Someone wants to connect with you.",
  },
};

export async function POST(request: Request) {
  let recipientUserId: string | undefined;
  let type: NotificationType | undefined;
  let fcmToken: string | undefined;
  try {
    const payload = (await request.json()) as SendNotificationPayload;
    recipientUserId = payload.recipientUserId;
    type = payload.type;
    const { threadId, requestId } = payload;

    if (!recipientUserId || !type) {
      return NextResponse.json(
        { error: "Missing recipientUserId or type" },
        { status: 400 }
      );
    }

    if (type !== "message" && type !== "connection_request") {
      return NextResponse.json({ error: "Invalid notification type" }, { status: 400 });
    }

    const userDoc = await db.collection("users").doc(recipientUserId).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
    }

    const userData = userDoc.data() as { fcmToken?: string } | undefined;
    fcmToken = userData?.fcmToken;

    if (!fcmToken) {
      return NextResponse.json(
        { error: "Recipient does not have an FCM token" },
        { status: 400 }
      );
    }

    console.info("notifications.send.start", {
      recipientUserId,
      fcmToken,
      type,
    });

    const { title, body } = notificationCopy[type];

    const dataPayload: Record<string, string> = {
      type,
    };

    if (threadId) {
      dataPayload.threadId = String(threadId);
    }

    if (requestId) {
      dataPayload.requestId = String(requestId);
    }

    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title,
        body,
      },
      data: dataPayload,
    });

    console.info("notifications.send.success", {
      recipientUserId,
      fcmToken,
      type,
      response,
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("notifications.send.error", {
      recipientUserId,
      fcmToken,
      type,
      error,
    });

    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
