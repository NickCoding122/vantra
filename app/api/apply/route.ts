import { NextResponse } from "next/server";

import { addApplicationToSheet } from "@/lib/googleSheets";

export async function POST(request: Request) {
  try {
    const { name, role, agency, instagram, email } = await request.json();

    const fields = { name, role, agency, instagram, email };
    const missing = Object.entries(fields)
      .filter(([, value]) => typeof value !== "string" || value.trim() === "")
      .map(([key]) => key);

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missing.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const application = {
      name: name.trim(),
      role: role.trim(),
      agency: agency.trim(),
      instagram: instagram.trim(),
      email: email.trim(),
    };

    const success = await addApplicationToSheet(application);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to submit application" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    );
  }
}
