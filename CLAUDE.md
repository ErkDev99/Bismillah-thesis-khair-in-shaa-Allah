# Wanderlust – Bachelor's Thesis Website

*Last updated: 2026-04-26 (Session 41 — i18n complete: all 22 pages/files translated EN/RU.)*

Central Asian travel & tourism platform (Kazakhstan, Kyrgyzstan, Uzbekistan). Next.js 16, React 19, Tailwind CSS v4. Evaluated as a bachelor's thesis.

---

## Current Status

| Area | Status |
|------|--------|
| Phase 1 — UI/UX Restyle (16 pages + 89 real images) | ✅ |
| Design System (Nature/Emerald) | ✅ |
| Phase 2 — Accessibility (WCAG 2.1, Lighthouse 100) | ✅ |
| Phase 3 — Performance (Desktop 96, Mobile ~82) | ✅ |
| Phase 4 — SEO | ⏭️ Skipped (thesis, not commercial) |
| Phase 5 — Cross-browser & Responsive | ⬜ Not started |
| Phase 6 — Polish & Content | 🔄 6.5 done; 6.1–6.4 pending |
| Voice Chat + ChatWidget mic | ✅ |
| Dark mode | ✅ |
| Review system (`/review`, `/reviews`) | ✅ |
| QuickSearchBar, Contact map | ✅ |
| **i18n (EN/RU)** | ✅ All 22 pages/files |

---

## Quick Start for Next Session

**i18n complete.** Next: **Phase 5** (cross-browser/responsive — breakpoints 375/390/768/1280/1440/1920 across Chrome/Firefox/Edge/Safari), then **Phase 6.1** (custom 404 at `src/app/not-found.tsx`), 6.2 (loading states + skeletons at `src/app/loading.tsx`), 6.3 (form validation), 6.4 (micro-interactions).

**i18n pattern (if any new strings get added):**
1. Add `"use client"` if missing (needed for `useLocale()`).
2. `import { useLocale } from "@/components/LocaleProvider"`; `const { locale, t } = useLocale();`.
3. Add the namespace to `en.ts` and matching keys in `ru.ts` — TS fails the build if keys are missing.
4. Replace hardcoded English with `t.<namespace>.<key>`.
5. For data-bound text: `locale === "ru" && item.fieldRu ? item.fieldRu : item.field` — EN is the fallback.

---

## Open Issues

- **Focus ring contrast (WCAG 1.4.11)** — homepage uses `focus:ring-emerald-*`. Any remaining `focus:ring-amber-500` on white bg fails 3:1. Fix as encountered.
- **Kyrgyz TTS quality** — gTTS fallback mediocre. Low priority.
- **WebSocket URL** — voice-chat uses `NEXT_PUBLIC_VOICE_WS_URL` (Render backend in prod), falls back to `ws://localhost:8001` for dev.
- **Chat widget on Vercel needs `OPENAI_API_KEY`** — without it, returns mock JSON; streaming displays raw JSON.
- **Hydration error from browser extension** — ad-blocker rewrites `<head>` in dev only. Not a code bug — ignore in dev, verify in incognito/production.
- **Mobile Lighthouse ~82** — `public/images/hero/hero.jpg` is 1.7 MB. Compressing to ~300–400 KB would push mobile LCP 4.2s → ~2.5s.
- **Team photo cropping** — `/about` uses `h-72 object-cover object-[center_20%]`. Switch to per-member `objectPosition` if any face looks wrong.

---

## DO NOT TOUCH

- **`src/app/globals.css`** — any layout-affecting edit caused horizontal overflow bug twice (required `git reset --hard`). All design via component-level Tailwind only. *Exception:* `@custom-variant dark (&:where(.dark, .dark *));` is a Tailwind config directive and is safe.
- **`voice-actor/main.py`** — backend with REST + WebSocket proxy endpoints. Working. **Never `print()` raw user text, emojis, or non-ASCII** — Windows cp1252 console throws `UnicodeEncodeError` → 500 to browser. Use `print(f"[ASR] Transcript ({len(text)} chars)")` style.
- **`src/app/layout.tsx`** — fonts are Geist; `font-serif` falls back to system serif and works. Do NOT add Cormorant Garamond (broke the site once). Wraps in `<ThemeProvider>` → `<LocaleProvider>`. Has `suppressHydrationWarning` on `<html>` + FOUC inline script for dark mode. Also wraps everything in `<main id="main-content">` — so every page uses `<div>` as its root, not `<main>`.

---

## User Preferences

- Prefers one file at a time.
- Proceed autonomously on restyle/implementation — don't ask permission for each step (saves tokens).
- When a change is risky (`layout.tsx`, `globals.css`), **ask first**.
- If site breaks, believe the user and revert immediately.
- User is Muslim — responds well to Islamic greetings.
- **Don't remove things from the site.** User is not a web-dev expert and trusts me to lead, but worries the site will "lack something." Only additive changes; if something seems redundant, offer to merge or enhance, not delete.
- When presenting design tradeoffs, give 2–3 labeled options (A/B/C) with pros/cons + my recommendation.

---

## Lessons Learned

- **`globals.css` is off-limits for layout** — layout-affecting edits caused horizontal overflow bug twice. Only Tailwind variant config directives are safe there.
- **Nested `<main>` bug** — `layout.tsx` wraps everything in `<main id="main-content">`. Every page must use `<div>` as its root.
- **SVG pattern IDs must be unique per file** — duplicate IDs across pages cause pattern rendering bugs.
- **`blog/page.tsx` is a client component** — cannot use `export const metadata`.
- **`flex-1` inside `overflow-y-auto`** — pair with `min-h-0` on the flex child; use `el.scrollTop = el.scrollHeight` (not `scrollIntoView`) to confine scrolling.
- **Windows cp1252 kills non-ASCII `print()`** — `voice-actor/main.py` runs on Windows where the console defaults to cp1252. Any `print()` with emojis/Cyrillic/non-ASCII throws `UnicodeEncodeError` → 500.
- **SSE streaming needs line buffering** — OpenAI SSE `data: {...}\n\n` lines split across TCP chunks. Buffer incomplete lines across `transform()` calls; process in `flush()`.
- **Dark mode FOUC prevention** — inline `<script>` in `<head>` reads `localStorage` and adds `dark` class before paint. `suppressHydrationWarning` on `<html>` prevents the React class-mismatch warning.
- **OpenAI Realtime transcription arrives late** — `conversation.item.input_audio_transcription.completed` arrives *after* `response.audio_transcript.delta`. Insert a placeholder user message on `speech_stopped` and fill it when transcription arrives.
- **`useSearchParams` requires Suspense in Next.js 15+** — wrap in `<Suspense>` or build fails. Pattern: rename the original to `*Inner`, export a thin wrapper `<Suspense fallback={...}><*Inner /></Suspense>`.
- **Next.js `priority` doesn't always emit `fetchpriority`** — add explicit `fetchPriority="high"` on hero `<Image>`. Dropped desktop LCP 2.4s → 1.4s. Verify rendered HTML with `curl`.
- **aria-label must contain visible text** — if a link has visible "View Tour" but `aria-label="View details for X"`, voice-control users can't activate it by saying the visible text. Either remove aria-label (let visible text be the accessible name) or ensure it starts with the visible text ("View Tour: X").
- **Lighthouse mobile scores are highly variable** — simulated 4× CPU throttling + slow 4G causes 10–15 point swings. Chase desktop scores for thesis defense.
- **Google Maps embed needs no API key** — `https://www.google.com/maps?q=LOCATION&output=embed` in an `<iframe>` works without billing.
- **i18n without URL routing** — client-side `LocaleProvider` + `localStorage`, mirrors `ThemeProvider`. Trade-offs: (1) server-rendered markup starts in EN until hydration (acceptable FOUC); (2) SEO sees only EN (acceptable, Phase 4 skipped); (3) no `/ru/*` deep-links. Gains: zero routing churn, TS-enforced key parity, no duplicate page files.
- **Typed translation dictionaries** — `en.ts` exports `export type Translations = typeof en`; `ru.ts` is typed `const ru: Translations`. Missing/misspelt keys become build errors, not runtime `undefined`.
- **Long RU nav labels can silently break the header** — "Практическая информация" (21 chars) vs "Practical Info" (14) overflowed `whitespace-nowrap` flex nav and pushed theme/locale toggles off-screen. Rule: in tight horizontal layouts (nav, button rows), pick the shortest idiomatic RU equivalent. Longer forms are fine in grid footers that wrap. Header uses `Советы`; footer keeps `Практическая информация`.
- **Don't translate concrete contact data** — phone, email, physical address are data, not UI copy. If one is hardcoded in the component, all three should be.
- **Data-layer localization — `*Ru` sibling pattern** — for short data fields (`title`, `description`, `name`, `country`, `location`, etc.), add optional `titleRu?: string` siblings on the TS interface. Components pick with `locale === "ru" && item.fieldRu ? item.fieldRu : item.field` — EN is the fallback so a missing RU gracefully degrades instead of rendering `undefined`. Keep the field optional so you can roll out RU data incrementally per page. For **long** fields (itinerary steps, blog bodies, multi-paragraph descriptions), a separate `*.ru.ts` file is cleaner than inlined siblings.
- **Tighten loose string types for i18n indexing** — if a data field is `category: string` but the translation dict is keyed by literal values (`t.tourCategory.cultural`), narrow the field to a union (`"cultural" | "adventure"`) so TS can index the dict without an `as` cast. Catches typos and enforces that every data value has a matching translation key.
- **React 19 `use(params)` for client-page conversion** — Next.js 15+ passes dynamic route params as `Promise<{...}>`. When converting a server page with `async function Page({ params })` + `await params` to a client component (needed for `useLocale()`), switch to `import { use } from "react"` and `const { slug } = use(params)`. Drop `generateStaticParams` and `generateMetadata` (they're server-only; acceptable here since Phase 4 SEO is skipped). Keeps the dynamic route working without resorting to route wrappers.
- **Hero overlay strength depends on hero shape** — homepage's `from-black/40 via-transparent to-transparent` (bottom gradient only) works because the hero is `min-h-[70vh]` and the centered title sits well above the gradient. The same overlay on a compact band hero (tours/destinations/contact/about, `py-4 md:py-6`) leaves the centered title without contrast — needed `bg-gradient-to-b from-black/15 via-black/25 to-black/45` to add a faint top-to-bottom wash. For detail `[slug]` heroes (50vh, title at bottom via `flex items-end`), `from-black/55 via-black/10 to-transparent` keeps the photo bright while ensuring title legibility. Lesson: gradient direction and stop strengths must match where the text sits, not a one-size-fits-all rule.

---

## Design System — Nature / Travel Magazine (emerald)

Changed from Art Deco/amber in Session 24. Teacher: "Kyrgyzstan is green — use green, pleasant to the eyes."

### Color Palette
| Role | Light | Dark |
|------|-------|------|
| Primary accent | `emerald-600` / `700` | `emerald-400` / `500` |
| Text accent (labels, links) | `text-emerald-700` | `text-emerald-400` |
| Text heading highlight | `text-emerald-100` (on dark bg) | `text-emerald-100` |
| Section bg (tinted) | `bg-emerald-50` | `bg-slate-950` |
| Section bg (neutral) | `bg-stone-50` / `bg-white` | `bg-slate-900` |
| Dark sections (newsletter, CTA) | `bg-emerald-950` | `bg-emerald-950` |
| Card bg | `bg-white` | `bg-slate-900` |
| Card border | `border-stone-200 hover:border-emerald-400` | `border-slate-800 hover:border-emerald-600` |
| Body text | `text-stone-600` | `text-stone-400` |
| Stars (ratings) | `text-amber-400` (keep amber — universal) | `text-amber-400` |

### Typography
- Headings: `font-serif` on all `h1`, `h2`, `h3`
- Labels/eyebrows: `uppercase tracking-[0.3em] text-xs text-emerald-700 dark:text-emerald-400`
- Buttons/CTAs: `tracking-wide`
- Body min: `text-stone-600 dark:text-stone-400` (stone-500 fails contrast)

### Shape
- `rounded-xl` on cards, `rounded-lg` on buttons/inputs/badges, `rounded-full` for difficulty pills/avatars
- Cards: `border border-stone-200 dark:border-slate-800 hover:border-emerald-400 rounded-xl`

### Nature Divider (replaces Diamond Divider)
```jsx
<div className="flex items-center justify-center gap-3" aria-hidden="true">
  <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
  <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
  </svg>
  <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
</div>
```

### Radial Emerald Glow (dark sections)
```jsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />
```

### Section Eyebrow
```jsx
<p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
  Section Label
</p>
```

### Buttons
- Primary: `bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg tracking-wide`
- Secondary/Ghost: `border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg tracking-wide`
- On dark bg: `bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg`

### Hero Images
- **NO dark overlay** — teacher: "remove that darkness."
- Tall heroes (homepage `min-h-[70vh]`): subtle bottom gradient only — `bg-gradient-to-t from-black/40 via-transparent to-transparent`.
- Compact band heroes (`py-4 md:py-6` on tours/destinations/contact/about): top-to-bottom wash — `bg-gradient-to-b from-black/15 via-black/25 to-black/45`. The pure bottom-only gradient leaves centered title without contrast on a thin band.
- Detail `[slug]` heroes (`h-[50vh]` with title at bottom via `flex items-end`): `bg-gradient-to-t from-black/55 via-black/10 to-transparent` — bright photo at top, just enough darkening at the bottom for the title.
- Always add `drop-shadow-md` (body) / `drop-shadow-lg` (h1) to text over bright photos. Use `text-emerald-300` (not `-400`) and `text-white/90` (not `text-stone-300`) for accent + body on hero photos — better contrast against varied imagery.

### DifficultyBadge
- Easy: emerald (green = easy, semantic)
- Moderate: orange
- Challenging: red
- All `rounded-full` pill shape.

### No Art Deco Elements
Remove all corner accents (`border-t-2 border-l-2`), diamond dividers, geometric SVG overlays. Sharp edges → `rounded-*`.

### 12-rule restyle checklist (for any amber file)
1. `amber-*` → `emerald-*` (except star ratings — keep `text-amber-400`)
2. `stone-900`/`stone-950` dark bg → `slate-900`/`slate-950`; `bg-amber-50` → `bg-emerald-50`
3. `rounded-xl` on cards, `rounded-lg` on buttons/inputs/badges
4. `DiamondDivider` → `NatureDivider`
5. Remove Art Deco corner accents
6. Remove geometric SVG pattern overlays
7. Keep `font-serif` on all `h1`, `h2`, `h3`
8. Eyebrow color → `text-emerald-700 dark:text-emerald-400`
9. Full `dark:` variants on every element
10. `aria-hidden="true"` on decorative elements
11. Solid emerald buttons (not gradient)
12. Page root: `<div>` (NOT `<main>`) with `min-h-screen bg-emerald-50 dark:bg-slate-950`

---

## i18n (EN/RU)

Complete. All 22 pages/files translated. Translation namespaces in `en.ts` / `ru.ts`: `header`, `footer`, `chat`, `home`, `tourCategory`, `tours`, `destinations`, `about`, `contact`, `practicalInfo`, `faq`, `blog`, `review`, `reviews`, `privacy`, `terms`, `voiceChat`. Tour and Destination interfaces have inline `*Ru` siblings (short fields) and inline long-field RU siblings filled for all 6 tours and 6 destinations. Blog uses a split: `blog.en.ts` (source) + `blog.ru.ts` (slug-keyed `BlogPostRuOverride` map) merged via a locale-aware `blog.ts` entry. All `[slug]` pages are client components using React 19 `use(params)`; `generateStaticParams` / `generateMetadata` dropped (Phase 4 SEO skipped).

**Known limitations (acceptable for thesis):**
- Server-rendered initial paint shows EN until `LocaleProvider` hydrates (no FOUC script — low priority).
- `/api/chat` + WebSocket error messages remain in English (backend strings).
- Locale doesn't affect chat assistant's reply language — OpenAI picks based on user's message. Could add system prompt hint tied to `locale` if needed.

---

## Voice Integration

**Backend:** `voice-actor/main.py` (FastAPI, port 8001) — one service, three endpoints:
- `POST /transcribe-voice` — Whisper-1 STT (used by ChatWidget dictation mic)
- `POST /generate-voice` — OpenAI TTS tts-1 + gTTS Kyrgyz fallback (not currently used)
- `WS /ws/realtime` — WebSocket proxy to OpenAI Realtime API (used by Voice Chat page)

**Run:** `cd voice-actor && python main.py` → `http://127.0.0.1:8001`
- Requires `OPENAI_API_KEY` in `voice-actor/.env`
- Next.js rewrites `/voice/:path*` → `http://localhost:8001/:path*` (see `next.config.ts`)
- WebSocket connects directly to `ws://localhost:8001/ws/realtime` (bypasses rewrites)

**Voice Chat page (`/voice-chat`):** real-time speech-to-speech via WebSocket, PCM16 24kHz, server-side VAD, ~0.5–1s latency.

**ChatWidget mic (bubble):** dictation mode — record → waveform (AnalyserNode) → confirm/cancel → Whisper STT → text in input. ~2–3s latency. No auto-send.

**Language routing:** `src/lib/voiceApi.ts:detectLang()` — Kyrgyz-specific Unicode → `ky`, Cyrillic → `ru`, else → `en`.

**Chat API:** `POST /api/chat` — `{ messages: [{role, content}], voice?: boolean }` → text: streaming plain text; voice: full JSON `{ message }`.

**No auth** — source project had JWT Bearer tokens; all removed. Do not reintroduce.

---

## Files Reference

**Components:**
- `src/components/layout/Header.tsx` — sticky nav, 7 links, Contact CTA, dark toggle, EN\|RU toggle
- `src/components/layout/Footer.tsx` — 4-column
- `src/components/chat/ChatWidget.tsx` — floating chat + dictation mic
- `src/components/ThemeProvider.tsx` — dark mode context
- `src/components/LocaleProvider.tsx` — EN/RU context, persists to `localStorage("locale")`, sets `<html lang>`, exposes `useLocale()` → `{ locale, t, setLocale }`
- `src/components/home/QuickSearchBar.tsx` — country picker with instant tour results + prices
- `src/components/home/AnimatedHeadline.tsx` — rotating country names (framer-motion spring)

**Translations:**
- `src/lib/translations/en.ts` — source of truth, exports `Translations` type
- `src/lib/translations/ru.ts` — typed `Translations`, TS enforces key parity

**Data:**
- `src/lib/data/tours.ts` — 6 tours with 10-day itineraries
- `src/lib/data/destinations.ts` — 6 destinations
- `src/lib/data/blog.ts` + `blog.en.ts` + `blog.ru.ts` — locale-aware blog data

**Mock booking credentials (for `/review` demo):**
- `WL-2025-001 / sarah@example.com`
- `WL-2025-002 / david@example.com`
- `WL-2025-003 / aiko@example.com`
- `WL-2024-004 / maria@example.com`
- `WL-2024-005 / john@example.com`
- `WL-2025-006 / elena@example.com`

---

## Site Structure

```
Pages: / · /tours · /tours/[slug] · /destinations · /destinations/[slug]
       /about · /blog · /blog/[slug] · /contact · /practical-info · /faq
       /privacy · /terms · /review · /reviews · /voice-chat

Missing (out of thesis scope): real booking/payment flow, user accounts
```
