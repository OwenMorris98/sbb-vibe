/**
 * Google Sheets write-back helper.
 *
 * Uses a service account JWT to authenticate against the Sheets API v4 — no
 * extra npm packages required; everything is built on Node's native `crypto`
 * and `fetch`.
 *
 * Setup:
 *  1. Create a Google Cloud project (free) → IAM & Admin → Service Accounts
 *  2. Create a key for the account → download JSON
 *  3. Share your spreadsheet with the service account's email as Editor
 *  4. Copy `client_email` and `private_key` from the JSON into .env.local:
 *       GOOGLE_SERVICE_ACCOUNT_EMAIL=...
 *       GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
 *     (keep the literal \n — they get replaced at runtime)
 */

import { createSign } from "crypto";

export interface StockDecrement {
  productId: string;
  quantity: number;
}

/** Convert a 0-based column index to A1 column letters (0→A, 25→Z, 26→AA …). */
function columnToLetter(col: number): string {
  let letter = "";
  let c = col;
  while (c >= 0) {
    letter = String.fromCharCode(65 + (c % 26)) + letter;
    c = Math.floor(c / 26) - 1;
  }
  return letter;
}

/** Mint a short-lived Google OAuth2 access token for the configured service account. */
async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set."
    );
  }

  // Env vars store literal \n — replace with real newlines before using as PEM
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString(
    "base64url"
  );
  const payload = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");

  const signingInput = `${header}.${payload}`;
  const sign = createSign("RSA-SHA256");
  sign.update(signingInput);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${signingInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token exchange failed: ${text}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Decrement the `stock` column in the product spreadsheet for each item sold.
 *
 * NOTE: This is called when the Square payment link is created, not after the
 * payment is confirmed. For a low-traffic shop this is an acceptable trade-off.
 * If you need post-payment accuracy, wire this up to a Square webhook instead:
 *   POST /api/webhooks/square → verify signature → call decrementStock
 */
export async function decrementStock(items: StockDecrement[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEETS_PRODUCT_ID;
  if (!sheetId) throw new Error("GOOGLE_SHEETS_PRODUCT_ID is not set.");

  const token = await getAccessToken();

  // Read the entire sheet so we can locate each product's row number
  const readRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:Z`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!readRes.ok) {
    throw new Error(`Sheets API read failed: ${readRes.status} ${await readRes.text()}`);
  }

  const { values } = (await readRes.json()) as { values: string[][] };

  if (!values || values.length < 2) return;

  const headers = values[0];
  const idCol = headers.indexOf("id");
  const stockCol = headers.indexOf("stock");

  if (idCol === -1 || stockCol === -1) {
    console.warn(
      "Sheet is missing an 'id' or 'stock' column — stock decrement skipped. " +
        "Add a numeric 'stock' column to your sheet to enable this feature."
    );
    return;
  }

  const colLetter = columnToLetter(stockCol);
  const updates: { range: string; values: number[][] }[] = [];

  for (const { productId, quantity } of items) {
    // values[0] is headers; data rows start at values[1] = sheet row 2
    const rowIndex = values.findIndex((row, i) => i > 0 && row[idCol] === productId);

    if (rowIndex === -1) {
      console.warn(`decrementStock: product "${productId}" not found in sheet.`);
      continue;
    }

    const currentStock = parseInt(values[rowIndex][stockCol] ?? "0", 10);
    const newStock = Math.max(0, currentStock - quantity);

    // rowIndex is 0-based array index; sheet row number = rowIndex + 1
    updates.push({ range: `${colLetter}${rowIndex + 1}`, values: [[newStock]] });
  }

  if (updates.length === 0) return;

  const writeRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valueInputOption: "USER_ENTERED", data: updates }),
    }
  );

  if (!writeRes.ok) {
    throw new Error(
      `Sheets API write failed: ${writeRes.status} ${await writeRes.text()}`
    );
  }
}
