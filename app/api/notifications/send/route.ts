import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { db } from "../../../../lib/firebaseAdmin";

type NotificationType = "message" | "connection_request";

type ChatMessagePayload = {
  recipientUserId?: string;
  type?: "message";
  threadId?: string;
  otherUserId?: string;
  otherUserName?: string;
  messageText?: string;
};

type ConnectionRequestPayload = {
  recipientUserId?: string;
  type?: "connection_request";
  fromUserId?: string;
  fromName?: string;
};

type SendNotificationPayload = ChatMessagePayload | ConnectionRequestPayload;

const notificationCopy: Record<
  Extract<NotificationType, "connection_request">,
  { title: string; body: string }
> = {
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

    if (!recipientUserId || !type) {
      return NextResponse.json(
        { error: "Missing recipientUserId or type" },
        { status: 400 }
      );
    }

    if (type !== "message" && type !== "connection_request") {
      return NextResponse.json({ error: "Invalid notification type" }, { status: 400 });
    }

    if (type === "message") {
      const { threadId, otherUserId, otherUserName } =
        payload as ChatMessagePayload;
    
      if (!threadId || !otherUserId || !otherUserName) {
        return NextResponse.json(
          {
            error:
              "Missing required fields for message notification: threadId, otherUserId, otherUserName",
          },
          { status: 400 }
        );
      }
    }

    if (type === "connection_request") {
      const { fromUserId, fromName } =
        payload as ConnectionRequestPayload;
    
      if (!fromUserId || !fromName) {
        return NextResponse.json(
          {
            error:
              "Missing required fields for connection request: fromUserId, fromName",
          },
          { status: 400 }
        );
      }
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

    let title = "";
    let body = "";

    const dataPayload: Record<string, string> = {};

    if (type === "message") {
      const { threadId, otherUserId, otherUserName, messageText } =
        payload as ChatMessagePayload;
      const messagePreview =
        typeof messageText === "string" ? messageText.slice(0, 120) : "";
      title = String(otherUserName);
      body = messagePreview;
      dataPayload.type = "chat_message";
      dataPayload.threadId = String(threadId);
      dataPayload.otherUserId = String(otherUserId);
      dataPayload.otherUserName = String(otherUserName);
    }

    if (type === "connection_request") {
      const { fromUserId, fromName } = payload as ConnectionRequestPayload;
      ({ title, body } = notificationCopy.connection_request);
      dataPayload.type = "connection_request";
      dataPayload.fromUserId = String(fromUserId);
      dataPayload.fromName = String(fromName);
    }

    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title,
        body,
      },
      data: dataPayload,
      apns: {
        headers: {
          "apns-priority": "10",
        },
      },
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
