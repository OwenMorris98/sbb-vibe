# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 14 App Router app using TypeScript and Tailwind CSS.

- `src/app/`: route segments and page-level UI (`page.tsx`, `layout.tsx`).
- `src/app/<route>/`: feature-local components (for example, `our-shop/ProductGrid.tsx`).
- `src/app/api/`: server routes (checkout flow in `api/checkout/route.ts`).
- `src/components/`: shared UI/providers (`Header`, `Footer`, `CartProvider`, `CartButton`).
- `src/data/`: static site data (beer list, locations, stores).
- `src/lib/`: integrations and helpers (`products.ts`, `sheets.ts`).
- `src/types/`: shared domain types such as `Product`.

Keep route-specific code colocated in its route folder; promote only reusable pieces to `src/components`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: run local dev server at `http://localhost:3000`.
- `npm run build`: generate a production build.
- `npm run start`: serve the production build.
- `npm run lint`: run ESLint (`next/core-web-vitals` + TypeScript rules).

Run `npm run lint && npm run build` before opening a PR.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true` in `tsconfig.json`).
- Indentation: 2 spaces; keep imports grouped and deterministic.
- Components/files: `PascalCase` for component files, Next route conventions for `page.tsx`/`layout.tsx`.
- Variables/functions: `camelCase`; exported types/interfaces in `PascalCase`.
- Styling: Tailwind utilities and existing theme tokens from `tailwind.config.ts`.

Use the `@/*` path alias for imports from `src`.

## Testing Guidelines
No automated test runner is currently configured.

- Required checks: `npm run lint` and `npm run build`.
- For UI work, include manual QA notes (routes touched, mobile + desktop behavior, cart/checkout path if relevant).
- If adding tests, use `*.test.ts(x)` next to source or `src/__tests__/` and add a script in `package.json`.

## Commit & Pull Request Guidelines
Use short, clear commit messages describing scope and intent.

- Recommended format: `<area>: <summary>` (example: `our-shop: add success page redirect`).
- Keep commits focused; avoid mixing refactors and features.
- PRs should include purpose, key changes, verification steps, linked issues, and screenshots/GIFs for visual changes.

## Security & Configuration Tips
- Keep secrets in `.env.local`; never commit credentials.
- Checkout requires Square env vars: `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, `SQUARE_ENVIRONMENT`.
- Product/stock sync uses Google Sheets vars: `GOOGLE_SHEETS_PRODUCT_ID`, `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_OAUTH_REFRESH_TOKEN`.
