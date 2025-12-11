import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_SHEETS_ID,
} = process.env;

const missingVars = [
  { key: "GOOGLE_CLIENT_ID", value: GOOGLE_CLIENT_ID },
  { key: "GOOGLE_CLIENT_SECRET", value: GOOGLE_CLIENT_SECRET },
  { key: "GOOGLE_REDIRECT_URI", value: GOOGLE_REDIRECT_URI },
  { key: "GOOGLE_REFRESH_TOKEN", value: GOOGLE_REFRESH_TOKEN },
  { key: "GOOGLE_SHEETS_ID", value: GOOGLE_SHEETS_ID },
]
  .filter(({ value }) => !value)
  .map(({ key }) => key);

if (missingVars.length > 0) {
  console.error(
    `[GoogleSheets] Missing required environment variables: ${missingVars.join(", ")}`,
  );
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const sheets = google.sheets({ version: "v4", auth: oauth2Client });

export type ApplicationRow = {
  name: string;
  role: string;
  agency: string;
  instagram: string;
  email: string;
};

export async function addApplicationToSheet(data: ApplicationRow): Promise<boolean> {
  if (missingVars.length > 0) {
    return false;
  }

  const row = [data.name, data.role, data.agency, data.instagram, data.email];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: "Form Responses 1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return true;
  } catch (error) {
    console.error("[GoogleSheets] Failed to append application row", error);
    return false;
  }
}
