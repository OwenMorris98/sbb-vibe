import http from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

function loadEnvFile(fileName) {
  const filePath = resolve(process.cwd(), fileName);
  if (!existsSync(filePath)) return;

  const raw = readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    if (!key || process.env[key]) continue;

    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

async function main() {
  loadEnvFile(".env.local");
  loadEnvFile(".env");

  const clientId = requiredEnv("GOOGLE_OAUTH_CLIENT_ID");
  const clientSecret = requiredEnv("GOOGLE_OAUTH_CLIENT_SECRET");
  const redirectUri = "http://localhost:5050/callback";
  const scope = "https://www.googleapis.com/auth/spreadsheets";

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scope);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("\nOpen this URL and complete consent in the same Google account that can edit your sheet:\n");
  console.log(authUrl.toString());
  console.log("\nWaiting for OAuth callback on http://localhost:5050/callback ...\n");

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const url = new URL(req.url ?? "/", redirectUri);
        const authCode = url.searchParams.get("code");
        const authError = url.searchParams.get("error");

        if (authError) {
          res.statusCode = 400;
          res.end("OAuth error. Check terminal output.");
          reject(new Error(`Google OAuth error: ${authError}`));
          server.close();
          return;
        }

        if (!authCode) {
          res.statusCode = 400;
          res.end("Missing code in callback.");
          reject(new Error("Missing authorization code in callback."));
          server.close();
          return;
        }

        res.statusCode = 200;
        res.end("Authorization complete. You can close this tab.");
        resolve(authCode);
        server.close();
      } catch (err) {
        reject(err);
        server.close();
      }
    });

    server.listen(5050, "127.0.0.1");
  });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${JSON.stringify(tokenJson)}`);
  }

  if (!tokenJson.refresh_token) {
    throw new Error(
      "No refresh_token returned. Re-run and ensure prompt=consent is used and this client is configured correctly."
    );
  }

  console.log("\nCopy this into your .env/.env.local:\n");
  console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokenJson.refresh_token}\n`);
}

main().catch(async (err) => {
  console.error("\nFailed to generate refresh token:");
  console.error(err instanceof Error ? err.message : err);

  const rl = createInterface({ input, output });
  await rl.question("\nPress Enter to exit...");
  rl.close();
  process.exit(1);
});
