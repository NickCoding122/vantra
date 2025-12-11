import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_SHEETS_ID,
} = process.env;

const missingEnvVars = [
  { key: "GOOGLE_CLIENT_ID", value: GOOGLE_CLIENT_ID },
  { key: "GOOGLE_CLIENT_SECRET", value: GOOGLE_CLIENT_SECRET },
  { key: "GOOGLE_REFRESH_TOKEN", value: GOOGLE_REFRESH_TOKEN },
  { key: "GOOGLE_SHEETS_ID", value: GOOGLE_SHEETS_ID },
]
  .filter(({ value }) => !value)
  .map(({ key }) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `[GoogleSheets] Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

function getSheetsClient() {
  const oauthClient = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
  );

  oauthClient.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  return google.sheets({ version: "v4", auth: oauthClient });
}

export async function appendApplicationRow(data: {
  name: string;
  role?: string;
  instagram: string;
  niche?: string;
  email: string;
  agency?: string;
}): Promise<void> {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEETS_ID,
    range: "Form Responses 1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          data.name ?? "",
          data.role ?? "",
          data.instagram ?? "",
          data.niche ?? "",
          data.email ?? "",
          data.agency ?? "",
        ],
      ],
    },
  });
}
