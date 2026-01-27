import { NextResponse } from "next/server";
import { appendApplicationRow } from "../../../lib/googleSheets";

export async function POST(request: Request) {
  const data = await request.json();
  await appendApplicationRow(data);

  return NextResponse.json({ success: true });
}
