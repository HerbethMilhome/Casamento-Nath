# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 3000, bound to `0.0.0.0`.
- `npm run lint` — **this is `tsc --noEmit`, not a linter.** There is no ESLint/Prettier/Biome config in the repo. Run it after editing `.ts`/`.tsx` — it is the only automated check that exists.
- `src/components/admin/` currently has **9 pre-existing type errors** (missing `hasPlusOne`, `order` passed where it is `Omit`ted, `heroPhotoUrl`/`coverPhrase` not on `WeddingData`). They are known and unrelated to your change — check that your edit did not *add* to the count rather than expecting zero.
- There is **no test suite and no test runner installed.** Do not suggest `npm test`. Verify changes by typechecking and by running the app.

## Architecture

Single-page React 19 + Vite app, no router. `src/App.tsx` swaps between two views via `activeView` state in context: the public guest site (`components/public/`) and the couple's admin panel (`components/admin/`). A fixed bottom-right button toggles between them.

`src/context/WeddingContext.tsx` is the data layer for everything except RSVP and guestbook messages (see below). It holds one `useState` per entity (wedding, milestones, godparents, guests, gifts, messages, photos, usefulInfo, faqs), mirrors each to `localStorage` through a dedicated `useEffect`, and exposes CRUD functions on the context value. Seed data lives in `src/data/initialWeddingData.ts`.

Consequences to respect:
- **Storage keys are versioned** (`casamento_guests_v1`, `casamento_photos_v2`, …) in the `STORAGE_KEYS` map. Changing the shape of a persisted entity requires bumping its key suffix, or returning users hydrate stale JSON into the new shape and crash.
- State reads from `localStorage` in the `useState` initializer and is written back on every change. Adding an entity means adding all four pieces: state, its `STORAGE_KEYS` entry, its persistence `useEffect`, and its CRUD functions on the context type + value.
- Auth is cosmetic. `loginAdmin` compares against hardcoded strings and the guest gate in `PublicWeddingPage.tsx` accepts `'123456'` as a universal bypass. This is a demo, not security — don't build anything on it that implies real access control.

### RSVP and guestbook are NOT localStorage

These two are the exception and the reason `src/services/sheetsApi.ts` exists: a guest confirming on their phone has to be visible to the couple on a different device. Both go to a Google Apps Script web app that writes to a Google Sheet (`apps-script/Codigo.gs`, setup in `apps-script/README.md`).

- `submitRsvp` and `addGuestbookMessage` are **async**. `submitRsvp` returns `{success:false}` when the sheet write fails — never show a confirmation screen without checking it, or the guest leaves believing they confirmed.
- **Apps Script cannot be called normally from a browser.** `/exec` answers with a redirect that carries no CORS headers, so a plain `fetch` rejects even when the write succeeded. `sheetsApi.ts` works around this in two ways, both deliberate — do not "clean them up":
  - Writes go out as `mode: 'no-cors'` POSTs with `Content-Type: text/plain` (a "simple" request, so no preflight). The response is opaque and unreadable.
  - Reads use JSONP (an injected `<script>` tag), which CORS does not apply to.
- Because the POST response is unreadable, each write carries a random token that the script stores in `CacheService` for 10 minutes; the client then polls `?confirmar=<token>` over JSONP before reporting success. That round trip is the only thing standing between a failed write and a guest being told they are confirmed — keep it.
- Guestbook moderation lives **in the spreadsheet**, not in the admin panel — the couple ticks an `Aprovado` checkbox. New messages are written unapproved. The public wall is populated on mount and again on `visibilitychange`, replacing the `messages` state.
- JSONP URLs carry a `_` cache-buster. Without it the browser caches the `<script>` response and the wall serves stale messages for minutes after an approval. `buscarRecadosAprovados` returns `null` on failure versus `[]` for "no approved messages" — the caller must not blank the wall on `null`.
- With `VITE_SHEETS_ENDPOINT` unset (normal in local dev) `sheetsConfigurado()` is false and both fall back to localStorage, so the app still runs offline.
- Editing `Codigo.gs` has no effect until the script is **redeployed as a new version** in the Apps Script UI (edit the existing deployment; "New deployment" mints a different URL and silently leaves the old code serving). `Codigo.gs` carries a `VERSAO` constant echoed by `GET /exec` — that is how you tell which code is actually live.

### Nossa História (linha do tempo)

`StoryMilestone` carries `dateLabel` (the full date as the couple wrote it), `location`, `art` (a `StoryArtMotif`) and `photos`: editable photo slots. A slot with no `url` renders `StoryWatercolor`, a hand-drawn SVG of the destination — never a stock photo and never a face, so a placeholder can't be mistaken for a real picture of the couple. `photoUrl`/`caption` stay on the type only as a fallback for milestones that predate `photos`.

`STORY_CLOSING` and `STORY_SOUNDTRACK` live in `initialWeddingData.ts`. The soundtrack button only renders when `STORY_SOUNDTRACK.url` is filled, and it never autoplays.

`express`, `dotenv`, and `@google/genai` are installed but imported nowhere; they are placeholders for a planned backend. Keep them.

## Styling

Tailwind v4 via `@tailwindcss/vite`, configured entirely in `src/index.css` (`@import "tailwindcss"`) — there is no `tailwind.config.js`.

- **The rustic palette is canonical**: `--primary: #657153` (verde-oliva), `--accent: #A98C5B` (dourado envelhecido), `--accent-soft`/`--nude: #E9DDCC`, `--bg-page: #F9F6EF` (marfim), `--text-color: #3F463A`, `--text-heading: #2C3225`, defined as CSS vars in `index.css`. The whole site was migrated to it in one sweep — the old sage-green family (`#608334`, `#A8CA7E`, `#CBDDB5`, `#F7FEEF`) and the older brown/taupe one (`#8C7355`, `#745F46`) should not reappear. Components still hardcode hex values; keep to the palette above when you add any.
- `AdminAppearance.tsx` lets the couple pick colors, fonts, `buttonRadius`, and `cardStyle`, but **no public component currently reads `theme` from context** — they all hardcode hex. When you create or substantially edit a public component, wire it to `theme` from `useWedding()` instead of hardcoding.
- Custom utility classes in `index.css` are the house style: `glass`, `glass-subtle`, `glass-dark`, `mesh-bg`, `font-cormorant`, `font-playfair`, `font-montserrat`, `font-sans-body`, `letter-spacing-wide`, `divider-gold`, `no-scrollbar`. Prefer these over re-implementing backdrop blur or font stacks inline.
- Fonts load from Google Fonts in `index.html`, not from npm.

## Conventions

- **All user-facing copy is Brazilian Portuguese.** Identifiers, types, and comments are English. Domain terms inside `types.ts` stay Portuguese where they're data values (`'noiva' | 'noivo' | 'ambos'`, `'Madrinha' | 'Padrinho'`, `'vegetariana' | 'sem_lactose'`).
- Components are `export const Name: React.FC = () => {}` with named exports — not default exports. `App.tsx` is the one exception.
- IDs are generated as `` `prefix-${Date.now()}` `` (`story-`, `gp-`, …) inside the context's `add*` functions.
- The `@/*` path alias maps to the project root (see `vite.config.ts` and `tsconfig.json`) but is currently unused; relative imports are the norm.
- Images live in `public/` at the repo root and are referenced by absolute path (`/capela-sao-jose.jpg`, `/monograma-ni.jpg`), with `wedding.*Image` from context as the override. `src/assets/images/` holds a second, unreferenced copy of the same files.

## Environment

`VITE_SHEETS_ENDPOINT` (in `.env.local`) is the Apps Script web app URL. Only `VITE_`-prefixed vars reach the client, and Vite reads them at startup — restart `npm run dev` after changing it.

`GEMINI_API_KEY` and `APP_URL` are documented in `.env.example` for Google AI Studio but **are not read anywhere in `src/`**.

`vite.config.ts` disables HMR and file watching when `DISABLE_HMR=true` (AI Studio sets this to stop flicker during agent edits). Leave that block alone.

## Repo state

This directory is **not a git repository** — there is no version control, so edits are unrecoverable. Confirm before deleting or rewriting files wholesale.
