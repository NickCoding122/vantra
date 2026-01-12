import { NextResponse } from "next/server";
import { auth } from "../../../../lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { oobCode, password } = await request.json();

    if (!oobCode || !password) {
      return NextResponse.json(
        { error: "Missing token or password" },
        { status: 400 }
      );
    }

    await auth.confirmPasswordReset(oobCode, password);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid or expired link";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
