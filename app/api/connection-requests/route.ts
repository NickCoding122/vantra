import { NextResponse } from "next/server";
import { db, serverTimestamp } from "../../../lib/firebaseAdmin";

type CreateConnectionRequestPayload = {
  recipientUserId?: string;
  fromUserId?: string;
  fromName?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateConnectionRequestPayload;
    const { recipientUserId, fromUserId, fromName } = payload;

    if (!recipientUserId || !fromUserId || !fromName) {
      return NextResponse.json(
        {
          error: "Missing required fields: recipientUserId, fromUserId, fromName",
        },
        { status: 400 }
      );
    }

    const requestRef = await db.collection("connectionRequests").add({
      recipientUserId,
      fromUserId,
      fromName,
      createdAt: serverTimestamp(),
    });

    let notificationSent = false;
    if (fromUserId !== recipientUserId) {
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
            type: "connection_request",
            fromUserId,
            fromName,
          }),
          signal: controller.signal,
        });

        notificationSent = notificationResponse.ok;

        if (!notificationResponse.ok) {
          console.warn("notifications.send.failed", {
            recipientUserId,
            fromUserId,
            status: notificationResponse.status,
          });
        }
      } catch (error) {
        console.warn("notifications.send.failed", {
          recipientUserId,
          fromUserId,
          error: error instanceof Error ? error.message : "unknown",
        });
      } finally {
        clearTimeout(timeoutId);
      }
    }

    return NextResponse.json(
      {
        success: true,
        requestId: requestRef.id,
        notificationSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("connectionRequests.create.error", { error });
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
