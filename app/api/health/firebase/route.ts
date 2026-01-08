import { auth } from "../../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await auth.listUsers(1);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
