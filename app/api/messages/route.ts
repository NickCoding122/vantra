import { NextResponse } from "next/server";
import { db, serverTimestamp } from "../../../lib/firebaseAdmin";

type CreateMessagePayload = {
  threadId?: string;
  recipientUserId?: string;
  senderUserId?: string;
  senderName?: string;
  text?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateMessagePayload;
    const { threadId, recipientUserId, senderUserId, senderName, text } = payload;

    if (!threadId || !recipientUserId || !senderUserId || !senderName || !text) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: threadId, recipientUserId, senderUserId, senderName, text",
        },
        { status: 400 }
      );
    }

    const messageRef = await db
      .collection("threads")
      .doc(threadId)
      .collection("messages")
      .add({
        threadId,
        recipientUserId,
        senderUserId,
        senderName,
        text,
        createdAt: serverTimestamp(),
      });

    let notificationSent = false;
    if (senderUserId !== recipientUserId) {
      const notificationUrl = new URL("/api/notifications/send", request.url);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const notificationResponse = await fetch(notificationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipientUserId,
            type: "message",
            threadId,
            otherUserId: senderUserId,
            otherUserName: senderName,
            messageText: text,
          }),
          signal: controller.signal,
        });

        notificationSent = notificationResponse.ok;

        if (!notificationResponse.ok) {
          console.warn("notifications.send.failed", {
            threadId,
            recipientUserId,
            senderUserId,
            status: notificationResponse.status,
          });
        }
      } catch (error) {
        console.warn("notifications.send.failed", {
          threadId,
          recipientUserId,
          senderUserId,
          error: error instanceof Error ? error.message : "unknown",
        });
      } finally {
        clearTimeout(timeoutId);
      }
    }

    return NextResponse.json(
      {
        success: true,
        messageId: messageRef.id,
        notificationSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("messages.create.error", { error });
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
