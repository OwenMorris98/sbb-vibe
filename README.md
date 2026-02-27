# sbb-vibe

Next.js storefront for Ship Bottom Brewery.

## Local Development

1. Install dependencies:
```bash
npm install
```
2. Copy env template and fill values:
```bash
copy .env.example .env.local
```
3. Start dev server:
```bash
npm run dev
```

## Google Sheets OAuth Setup (No Service Account Key)

This project updates inventory through Google Sheets using OAuth refresh tokens.

1. In Google Cloud, create an OAuth client (`Web application`).
2. Add redirect URI: `http://localhost:5050/callback`.
3. Put these in `.env.local`:
```env
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GOOGLE_SHEETS_PRODUCT_ID=...
```
4. Run:
```bash
npm run google:refresh-token
```
5. Open the printed URL, approve access, then copy output:
```env
GOOGLE_OAUTH_REFRESH_TOKEN=...
```

Use the Google account that has edit access to the sheet.

## Common Commands

- `npm run dev`: run local app
- `npm run lint`: lint project
- `npm run build`: production build
- `npm run start`: run built app
