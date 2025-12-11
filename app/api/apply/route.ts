import { NextResponse } from "next/server";
import { appendApplicationRow } from "@/lib/googleSheets";

type ApplicationPayload = {
  name: string;
  role: string;
  instagram: string;
  niche: string;
  email: string;
  agency?: string;
};

function normalize(value: unknown): string {
  return (value || "").toString().trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ApplicationPayload>;

    const payload: ApplicationPayload = {
      name: normalize(body.name),
      role: normalize(body.role),
      instagram: normalize(body.instagram),
      niche: normalize(body.niche),
      email: normalize(body.email),
      agency: normalize(body.agency),
    };

    if (!payload.name || !payload.role || !payload.instagram || !payload.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Write to Google Sheets via helper
    await appendApplicationRow(payload);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/apply", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: explicitly reject other methods
export function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
