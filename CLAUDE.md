# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 (App Router) rebuild of the Ship Bottom Brewery website (shipbottombrewery.com), replacing a WordPress/WooCommerce setup. The site is a static-first brewery marketing site with no backend or database — all content lives in TypeScript data files.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (type-checks + static export)
npm run start      # Serve production build
npm run lint       # ESLint via next lint
```

## Architecture

### Routing
Uses the Next.js App Router (`src/app/`). Each page is a `page.tsx` file inside its route folder. Pages are Server Components by default; interactive components are split into separate `"use client"` files co-located with their route (e.g., `BeerGrid.tsx` next to `our-beers/page.tsx`, `ContactForm.tsx` next to `contact/page.tsx`).

### Data Layer
All site content is in `src/data/`:
- `beers.ts` — Full beer catalog with types, categories, ABV, descriptions, and feature flags (`featured`, `seasonal`)
- `locations.ts` — All taproom locations with addresses, hours, features, and Google Maps links

When adding new beers or updating location details, edit these files. No API calls or database involved.

### Styling
Tailwind CSS with a custom theme defined in `tailwind.config.ts`:
- `navy` / `navy-dark` / `navy-light` — primary dark brand colors
- `sand` / `sand-dark` — light background tones
- `ocean` — mid-tone blue for accents
- `amber` — warm orange used for CTAs, highlights, and brand accents

Global utility classes (`btn-primary`, `btn-outline`, `section-heading`, `section-subheading`) are defined in `src/app/globals.css` via `@layer components`.

### Layout
`src/app/layout.tsx` wraps every page with `<Header>` and `<Footer>`. The `<main>` element has `pt-16` to offset the fixed header.

`Header.tsx` and `Footer.tsx` are in `src/components/`. The Header is a Client Component (uses `usePathname` and `useState` for mobile menu).

## Key Conventions

- **Server vs Client split**: Keep pages as Server Components. Extract interactive pieces (filters, forms) into `"use client"` co-located files.
- **New pages**: Create `src/app/<route>/page.tsx`. Match the pattern of existing pages: dark hero section, then content section on `bg-sand` or `bg-white`.
- **New beers**: Add to the `beers` array in `src/data/beers.ts`. Use one of the existing `BeerCategory` union types. Set `featured: true` to surface on the homepage.
- **New locations**: Add to the `locations` array in `src/data/locations.ts`.
- **Contact form**: `ContactForm.tsx` currently uses local state and doesn't POST anywhere. Wire it to a real API route or form service (e.g., Resend, Formspree) when deploying.
- **Beer finder**: Built with Leaflet + OpenStreetMap (no API key). Store locations live in `src/data/stores.ts` with pre-geocoded `lat`/`lng` — add new stores there. Zip search calls the free Nominatim geocoder (`nominatim.openstreetmap.org`) at runtime; rate limit is 1 req/sec which is fine for this traffic level. The map (`MapView.tsx`) must stay dynamically imported with `ssr: false` via `next/dynamic` because Leaflet requires `window`. Distance filtering uses the Haversine formula in `BeerFinder.tsx`.
- **Images**: The site currently uses no external images. When adding brewery/beer photos, place them in `public/images/` and use `next/image`. Remote images from `shipbottombrewery.com` are allowed via `next.config.mjs`.
