---
name: nova-secao
description: Add a new content section to the wedding site end to end — type, seed data, context CRUD with its versioned localStorage key, public component, navbar entry, and admin editor. Use when asked to add a new section, block, or manageable content area to the public site or admin panel.
---

# Adding a section

A section is only "done" when all six layers exist. Skipping the admin editor or the storage key produces content the couple can't edit or that vanishes on reload. Work in this order — later steps depend on earlier ones.

Ask first if not specified: the section's **name** (Portuguese, for UI), whether it holds a **list of items** or **single fields on `WeddingData`**, and where it sits in the public page order.

## 1. `src/types.ts`

List-shaped sections get their own interface. Match the existing shape: `id: string`, the content fields, `order: number`, and optional fields marked `?`. Data values that are domain terms stay in Portuguese (`'noiva' | 'noivo'`), field names stay English.

Single-field sections get their fields added to `WeddingData` instead.

## 2. `src/data/initialWeddingData.ts`

Export an `INITIAL_<NAME>` const with 2–4 realistic Brazilian seed entries — this is what an empty admin panel shows. Keep the tone of the surrounding seed data (it's a real couple's site, not lorem ipsum).

## 3. `src/context/WeddingContext.tsx`

Four edits, all required:

- Add the entity to `STORAGE_KEYS` as `casamento_<nome>_v1`.
- Add `useState` with the `localStorage.getItem(...) ? JSON.parse(...) : INITIAL_<NAME>` initializer pattern.
- Add the persistence `useEffect` that writes the entity back on change.
- Add `add*` / `update*` / `delete*` to **both** the `WeddingContextType` interface and the provider's context value. New IDs use `` `<prefix>-${Date.now()}` ``; `add*` takes `Omit<T, 'id' | 'order'>` and sets `order: list.length + 1`.

If you change the shape of an entity that already exists, bump its `STORAGE_KEYS` suffix (`_v1` → `_v2`) — otherwise returning users hydrate stale JSON into the new shape.

## 4. `src/components/public/<Name>Section.tsx`

`export const <Name>Section: React.FC = () => {}`, named export, reading from `useWedding()`. Give the wrapper an `id` matching the navbar anchor.

Use the sage-green palette and the `index.css` utilities (`glass`, `mesh-bg`, `divider-gold`, `font-cormorant`/`font-playfair` for headings, `letter-spacing-wide` for the uppercase eyebrow text). Read colors and fonts from `theme` in `useWedding()` rather than hardcoding hex — most existing components predate this and hardcode, so copy their layout but not their color handling.

Look at `StorySection.tsx` or `GodparentsSection.tsx` for the section rhythm: eyebrow label → serif heading → divider → content grid.

## 5. Wire the public page

- `src/components/public/PublicWeddingPage.tsx` — import and place the component inside `<main>`, keeping the numbered comment sequence (`{/* 7. Galeria ... */}`) correct for everything after it.
- `src/components/public/Navbar.tsx` — add `{ label: '<Rótulo>', href: '#<anchor>' }` to `links`, matching the `id` from step 4. The navbar is a scroll-spy list, so order must match the page.

## 6. Admin editor

- Create `src/components/admin/Admin<Name>.tsx` — named export, CRUD form calling the context functions from step 3. `AdminStory.tsx` and `AdminUsefulInfo.tsx` are the closest templates for list CRUD; `AdminWeddingDetails.tsx` for flat fields.
- `src/components/admin/AdminLayout.tsx` — add `{ id: '<slug>', label: '<Rótulo>', icon: <LucideIcon> }` to the sections array **and** the matching `{adminSection === '<slug>' && <Admin<Name> />}` line in the render block. Both are needed; the nav item alone renders nothing.

## 7. Verify

Run `npm run lint` (`tsc --noEmit`). Then run `npm run dev` and check both views: the section renders on the public site, its navbar link scrolls to it, the admin editor saves, and the change survives a page reload (proving the storage key works).
