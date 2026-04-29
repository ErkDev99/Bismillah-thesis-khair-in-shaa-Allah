# Wanderlust – Bachelor's Thesis Website

*Last updated: 2026-04-29 (Session 47 — Chapter 3 + КОРУТУНДУ text-accuracy review applied: 25 replacements covering fabricated unit/integration tests in §3.5 (no `__tests__/`, no jest/vitest deps — softened to "future templates"), nonexistent `vercel.json` in §3.6.1 (Vercel auto-detects Next.js — no file needed), fake env vars `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_GA_ID` in §3.6.2 (replaced with real `NEXT_PUBLIC_VOICE_WS_URL` + voice-actor/.env note), unimplemented IP rate limiting in §3.10.2 (marked as future), wrong "Cloudflare CDN" → "Vercel Edge Network" in §3.11.1 ASCII diagram, unused `@vercel/analytics` in §3.13.2 (marked as potential integration), wrong "92/100 Lighthouse" in §3.15 conclusion (→ desktop 96/100 + mobile ~82/100), Vercel "Edge Functions" misclaim in §3.1.2 + КОРУТУНДУ (route.ts has no `runtime="edge"` — it's Node serverless), FCP value mismatch in КОРУТУНДУ (0.9s → 0.8s desktop / 1.4s mobile matching §3.7.1 table), fabricated SEO claims (Phase 4 SEO was skipped per CLAUDE.md), nonexistent AI personalization claim, and overstated "limited user testing" (no formal UX research was done). Figure list (33-сүрөт, 34-сүрөт) updated to match new captions. Backup at .PRE-CH3-ACCURACY.docx. All three chapters now text-accuracy reviewed.)*

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

---

## Thesis Document (the deliverable)

The Wanderlust website is the practical part. The written thesis in Kyrgyz is `Дипломдук иш Erkebulan Duishenaliev.docx` at the repo root. User is in **Computer Engineering** at Kyrgyz-Turkish Manas University (КТМУ).

**Reference files at repo root:**
- `Дипломдук иш Erkebulan Duishenaliev.docx` — the thesis itself
- `Дипломдук иш Erkebulan Duishenaliev.PRE-CH3-ACCURACY.docx` — Session 47 rollback point (most recent good state). All older backups have been cleaned up: `.PRE-CH2-ACCURACY` deleted at end of Session 47; Sessions 42–45 backups (`.BACKUP`, `.PRE-FOOTER-FIX`, `.PRE-DEDUPE`, `.PRE-TOC-DEDUPE`, `.PRE-CH1-ACCURACY`) deleted at end of Session 46.
- `Дипломдук иш ⚡️.docx` — supervisor-provided sample. **Note (Session 44 update):** uses footer-bottom-right page numbering, which violates the KTMU "top-right at 2.5 cm" rule.
- `Дипломдук_иш_Санжар_Садыкбеков_1504_01011_1.docx` — second sample, **rule-compliant** (top-right header at `pgMar w:header="1417"` = 2.5 cm). User chose to follow this pattern over the supervisor's ⚡️ sample because the rule on this point is unambiguous.
- `Dipl_erejeler_kg.pdf` — official KTMU thesis-writing rules (Kyrgyz)
- `thesis_writing_rules.txt` — extracted rules relevant to Computer Engineering (Article 7 + B-annex + D-annex). Humanities-only A/E annexes removed.

**Format (verified matches both rules and sample):**
- Page: A4 (21 × 29.7 cm). Margins: top 4.0 / bottom 2.5 / left 4.0 / right 2.5 cm.
- Font: Times New Roman 12pt. Line spacing: 1.5.
- First-line indent: **none** — sample uses flat block-paragraph style, not the 1.25 cm the rules specify. Follow the sample (supervisor's instruction).
- References: `SURNAME, Initial. (Year). Title. Publisher.` — alphabetical, surnames in caps.
- Body language: Kyrgyz. **АННОТАЦИЯ + КОРУТУНДУ are mirrored as ÖZET + SONUÇ in Turkish** (rules require abstract+conclusion in the second language).

**Required structure (B-annex, engineering):** Аннотация, Киришүү, Мазмуну, Пайдаланылган адабияттар, Изилдөө методдору, Ачылыштар, Талкуулар, Корутунду, Белгилер, Ыраазычылык билдирүү, Булактар, Тиркемелер. The sample condenses some of these into the 3-chapter body.

**Current chapter layout (matches the sample's pattern):**
1. **1-БӨЛҮК** — Theoretical foundations (chatbot architectures, AI in tourism, comparison of existing solutions, AI chatbot theory)
2. **2-БӨЛҮК** — System architecture & design (requirements, Next.js/React stack, ChatWidget, styling, deployment)
3. **3-БӨЛҮК** — Implementation & results (modules, OpenAI API integration, testing, deployment, performance, future work)

**Session 42 fixes (already applied to the docx):**
- Renumbered duplicate sections in Chapter 1: the second 1.2 → 1.4, second 1.3 → 1.5, old 1.4 → 1.6.
- Reclassified 5 bullet items under §3.1 from `Heading 1` → `Normal` (they were polluting the TOC).
- Converted 230 paragraphs from `**markdown bold**` to real Word bold formatting. Zero `**` markers remain. Cause: text was pasted from AI/markdown output without conversion — watch for this if more content gets pasted in.

**Session 43 fixes (already applied to the docx):**
- Converted 7 inline markdown table blocks to real Word tables (Table Grid borders, light-emerald header shading `D9E1D5`, bold header row, Times New Roman 11pt). Tables: comparison (7×5), API endpoint (2×3), prompt elements (8×2), env vars (2×3), API endpoints full (11×3), Lighthouse perf (10×4), traditional vs Wanderlust (5×4).
- Deleted 22 stale `*(Диаграмма: ...)*` placeholder paragraphs (these were fallback descriptions originally inserted for figures; redundant now that real PNGs are embedded).
- De-bracketed 16 `[N-сүрөт. ...]` placeholders (figs 24, 27–40) into clean captions — they were always meant to be visible captions for code/diagram listings; brackets were leftover TODO markers.
- Normalized old-style "Сүрөт 8." → "8-сүрөт." (matches sample's `N-сүрөт.` convention; zero old-style captions remain).
- Reclassified 3 empty Heading 1 spacer paragraphs (idx 94, 95, 123) → Normal (they would have rendered as blank TOC entries).
- Appended **СҮРӨТТӨР ТИЗМЕСИ** at end (just before ПАЙДАЛАНЫЛГАН БУЛАКТАР) listing all 42 figure captions in numeric order. Figs 25, 26 don't exist (never generated/referenced); list is contiguous through what exists.
- **Skipped Жадыбалдар тизмеси** — 5 of the 7 tables already carry `N-сүрөт.` captions (table-as-figure pattern matching the body's references); the 2 remaining are tiny inline 2×3 reference snippets. Sample has neither figure nor table list, so this stays consistent. If you want a separate table list later, we'd first need to relabel the 5 tables from "сүрөт" → "жадыбал" everywhere they're referenced.

**Session 43 follow-up audit fixes (also applied):**
- **Figs 25-26 orphan placeholder cleaned** — bracketed `[25-26-сүрөттөр. Wanderlust платформасындагы UI жагы]` (idx 783) became "Платформанын негизги колдонуучу интерфейси төмөнкү беттерден турат:" intro sentence; the two `- N-сүрөт: ...` bullet lines (idx 784, 786) lost their figure-number prefixes. Reason: figs 25 and 26 were placeholders for screenshots that were never generated, and the figure list goes 24 → 27.
- **Page breaks before chapters** — every Heading 1 (АННОТАЦИЯ, ÖZET, ЫРААЗЫЧЫЛЫК БИЛДИРҮҮ, БЕЛГИЛЕР, КИРИШҮҮ, all three БӨЛҮКs, КОРУТУНДУ, СҮРӨТТӨР ТИЗМЕСИ, ПАЙДАЛАНЫЛГАН БУЛАКТАР) now starts on a new page via `<w:pageBreakBefore/>` on the **Heading 1 style** (not explicit `<w:br>` runs — those caused blank pages where they collided with existing section breaks, e.g. КИРИШҮҮ idx 124's section break + injected break = blank Roman page x and blank Arabic page 1). With the style-property approach, Word skips the break when the paragraph is already on a new page.
- **Lesson learned (page breaks)** — for every Heading 1 in this docx, use `<w:pageBreakBefore/>` paragraph property (or set it on the style), NOT `<w:r><w:br w:type="page"/></w:r>` injected as a run. Explicit `<w:br>` always forces a break, so it stacks on top of section breaks → blank page. The style property is "skip if already on new page."

**Session 43 Phase 7 — KTMU rules-compliance pass (also applied):**
- **Page numbers now actually display** — both section headers had `pgNumType` set (lowerRoman for sect 0, decimal for sect 1) but no PAGE field, so nothing was rendering. Added `<w:fldChar … PAGE …/>` to each section's default header, right-aligned, TNR 12pt — matches rule "оң үст бурчта, кагаздын үстүнөн 2,5 см".
- **Title page has no number** — set `<w:titlePg/>` on Section 0 + emptied Section 0's first-page header. Rules: "Мукаба жана титулдук барактан башка бардык барактарга номер коюлат."
- **МАЗМУНУ (TOC)** — inserted heading + TOC field (`TOC \o "1-3" \h \z \u`) just before the section break (so МАЗМУНУ stays in front matter, Roman pages, but TOC entries reference the body's Arabic page numbers). The placeholder text inside the TOC field tells you to right-click → Update Field.
- **ЖАДЫБАЛДАР ТИЗМЕСИ (table list, 7 entries)** — inserted right before ПАЙДАЛАНЫЛГАН БУЛАКТАР. Each table is labeled "N-жадыбал" (1–7) with section reference. Note: 5 of the 7 tables also appear in Сүрөттөр тизмеси (they were originally captioned as `N-сүрөт`); didn't relabel them inline to avoid disrupting figure numbering. Both lists exist; minor double-listing of those 5 is acceptable.
- **First-person "биз" → passive third-person** — §3.15 conclusion's "Үчүнчү бөлүктө биз ... карап чыктык" → "Үчүнчү бөлүктө ... карап чыгылды". Acknowledgements section keeps first-person ("мен", "менин") — that's appropriate convention there.

**Session 44 fixes (already applied to the docx):**
- **Footer page numbers removed** — original WPS template had floating right-aligned text boxes with PAGE fields in `footer1.xml` and `footer2.xml`, rendering page numbers at the bottom in addition to the headers added in Session 43. Both footers emptied to bare `<w:p/>` wrappers (~374 bytes each).
- **Header offset fixed** — both `sectPr` blocks had `pgMar w:header="0"` placing the page number flush against the page edge. Changed to `header="1417"` twips (= exactly 2.5 cm), matching the rule "оң үст бурчта, кагаздын үстүнөн 2,5 см" and the Санжар sample's positioning.
- **Page-numbering pattern decision** — followed Санжар sample (rule-compliant, top-right header) instead of supervisor's ⚡️ sample (footer-bottom-right). User-confirmed: "stick with Санжар since it follows the rules."
- **Title page stays unnumbered** — `<w:titlePg/>` on Section 0 + empty `header2.xml` (first-page header). Both samples violate the rule by numbering page 1; user explicitly chose rule-compliance here.
- **22 duplicate figure paragraphs removed** — each figure 1-7 + 9-23 was inserted **twice** in the document: once as a proper SVG-with-PNG-fallback at 14.50 cm wide, and again as a redundant PNG-only copy at 15.24 cm wide (which exceeded the 14.52 cm text area, causing the page-14 cut-off the user reported). The 15.24 cm dups had no captions of their own — they sat right above the same caption as the proper SVG version. Cleaned up.
- **Figs 41-44 restored and resized** — these 4 figures had **only** the 15.24 cm PNG version (no SVG counterpart). Initial dedupe wrongly removed them; restored from PRE-DEDUPE backup and rescaled cx/cy by 5220000/5486400 = 0.9514 to fit at 14.50 cm width while preserving aspect ratio.
- **Duplicate TOC removed** — Session 43's TOC insertion didn't notice that the docx already had a TOC field at p[75] (after the title page). Both fields existed at p[75] and p[285]; both rendered the same content; the user saw two complete Tables of Contents after running Update Field. Removed paragraphs p[284-443] (the second МАЗМУНУ heading + the Session-43-added TOC field with all its 158 cached entries). Single TOC at p[75] remains, in its correct position right after the title page / signature block.
- **Final image audit:** 47 images total = 3 small icons + 44 figure images. 0 oversized (all ≤ 14.52 cm wide). Code-listing figures (24, 27-40) intentionally have no image — these are text-only listings per Session 43 design.

**Session 45 fixes (already applied to the docx) — Chapter 1 text-accuracy review:**
- **§1.6 Conclusion (idx 524)** — "Next.js 16 (2024)" → "Next.js 16 (2025)". Next.js 16 actually released October 2025, not 2024 (`package.json` has `next: 16.1.5`).
- **§1.4.2 Expedia (idx 452)** — Replaced "Бирок real-time AI консультант функциясы жок." with a paragraph acknowledging Expedia's **Romie** AI assistant (launched May 2024 in EG Labs, US-only experimental).
- **§1.3.2 TripAdvisor (idx 391)** — Rewrote to acknowledge TripAdvisor launched an **AI Trip Planner** in 2024 powered by OpenAI; advantages now include "1 миллиарддан ашык кароо базасы, sentiment анализи, AI маршрут түзүү"; disadvantages reframed as global-scope without Central Asia depth.
- **§1.3.4 Comparative table (idx 404, 419, 421, 429)** — TripAdvisor row: Real-time чат ✗→✓, 24/7 жеткиликтүүлүк ✗→✓, Маршрут пландоо "Чектелген"→✓ (all now reflect TripAdvisor's AI Trip Planner). Wanderlust row: Маршрут пландоо ✓→"Даяр маршруттар" (honest about predefined itineraries — no dynamic route generation since `tours.ts` has 6 fixed `itinerary[]` arrays and the chatbot uses static system prompt).
- **§1.5.3 Context windows (idx 505)** — "(GPT-3.5: 4K токен, GPT-4: 8K-128K токен)" → "(GPT-3.5-turbo: 16K токен, GPT-4-turbo жана GPT-4o: 128K токен)" + added sentence noting Wanderlust uses gpt-3.5-turbo (16K) which suffices for tourism conversations. Verified `route.ts:179` uses `model: "gpt-3.5-turbo"`.
- **§1.4.3 Stable-tech labels (idx 456-459)** — Dropped "(2024)" suffixes from Next.js, OpenAI API, Tailwind CSS (changed to "Tailwind CSS v4"), and Framer Motion bold lead-ins. These technologies aren't from 2024 — Next.js since 2016, Tailwind since 2017, etc.
- **§1.4.4 University citations (idx 461-464)** — Removed fabricated MIT project name "Conversational AI for Travel" and softened to general "Conversational AI боюнча академиялык эмгектер" framing. Stripped "(2023)/(2024)" date suffixes from MIT Media Lab, Stanford HCI Group, Cornell Hotel School, and University of Surrey Tourism Research bold lead-ins (these are research labs, not dated publications).
- **§1.4.2 GetYourGuide (idx 454)** — Updated "AI чатбот интеграциясы жок" to acknowledge their ChatGPT plugin (since 2023) but no native consumer-facing chatbot.
- **§1.4.2 Booking.com listings (idx 451)** — "28 миллиондон ашык" → "30 миллиондон ашык" (matches Booking.com's 2024 reporting).
- **Total: 19 string replacements across 18 paragraphs.** Fix script was a one-shot — temp working dir cleaned up at end of Session 46.

**Session 45 lessons learned:**
- **Bold lead-in pattern in §1.4.x bullets** — descriptive sub-section bullets use `<w:r><w:rPr><w:b/></w:rPr><w:t>NAME (YEAR)</w:t></w:r>` followed by a normal `<w:r>` for the rest. To drop the date while keeping the bold lead-in styling, just shorten the inner `<w:t>` text — the `<w:rPr><w:b/></w:rPr>` styling persists.
- **Positional paragraph replacement** — for generic strings like `<w:t>✗</w:t>` that appear in many table cells, use `re.finditer(r'<w:p\b[^>]*>.*?</w:p>')` to locate paragraphs by index, then `.replace(old, new, 1)` only on the target paragraph. Don't do global replaces — they hit unintended cells.
- **Re-zipping docx changes compression-only file sizes by ~190KB** — Python's zlib defaults compress slightly differently than WPS Office. The uncompressed file_size for unchanged files is identical, just `compress_size` shifts. Verified with `zipfile.testzip()` returning OK and Word/WPS reading correctly.
- **Don't lose directory entries when re-zipping** — original WPS docx zips include empty directory entries (`word/`, `word/media/`, etc.). My `rezip.py` skips them but Word reads the docx fine without them. Just a cosmetic difference, not functional.

**Session 46 fixes (already applied to the docx) — Chapter 2 text-accuracy review:**
- **§2.2.1 SSR / React Server Components bullets (idx 598, 601)** — dropped trailing "(Vercel, 2024)" and "(React Team, 2024)" date-suffix tags from the bullet body text. Same rationale as Session 45's stable-tech-label cleanup: SSR/RSC aren't 2024 inventions. Note: in-body parenthetical citations like "(Vercel, 2024)" elsewhere in §1.4.3 (idx 456) are real APA citations and stay.
- **§2.2.4 fake UI components (idx 706-709)** — the bullet list claimed `TourCard`, `DestinationCard`, `FilterSidebar`, `ContactForm` were reusable components. They do NOT exist as separate files — `find src/components -name "*.tsx"` returns only `LocaleProvider`, `ThemeProvider`, `chat/ChatWidget`, `home/AnimatedHeadline`, `home/QuickSearchBar`, `layout/Header`, `layout/Footer`. Tour cards / forms are inlined as JSX inside their respective pages. Replaced the four fabricated bullets with: `AnimatedHeadline.tsx`, `QuickSearchBar.tsx`, `LocaleProvider`/`ThemeProvider` context providers, plus an honesty bullet acknowledging that other UI elements are inlined per-page.
- **§2.3.2 proactive prompt timing (idx 734)** — "3 секунддан кийин чакыруу билдирүүсү" was inaccurate. `ChatWidget.tsx:65-69` shows `setTimeout(..., 2000)` — and only AFTER the user has scrolled past the hero (`hasScrolled` gate, line 64). Updated to "колдонуучу скроллдогондон 2 секунд кийин чакыруу билдирүүсү".
- **§2.4.1 design tokens (idx 811, 813)** — bullets claimed generic Tailwind `gray-*` palette ("Background: gray-50 (#f9fafb)", "Text: gray-900, gray-600, gray-400"). The actual Nature/Emerald design system (Session 24 onwards) uses `stone-*` for text/neutral surfaces, `emerald-*` as primary accent, and `slate-*` for dark mode (per the Design System table in this file). Updated both bullets to reflect the real palette including light/dark variants.
- **§2.7.1 backend file structure (idx 868)** — claimed "`voice-actor/voice_service.py` — Whisper жана TTS операциялары үчүн жардамчы функциялар". File DOES exist but uses `aitil.kg` external ASR/TTS API endpoints (not Whisper), is a standalone `FastAPI()` app (not a helper module), and is NOT imported by `main.py`. It's a legacy prototype kept around for reference. Replaced the entire sentence with an accurate description: `main.py` is the single FastAPI app on port 8001 hosting STT (Whisper-1), TTS (tts-1 + gTTS Kyrgyz fallback) and the WebSocket Realtime proxy as three endpoints.
- **Total: 10 string replacements across 10 paragraphs.** Fix script `apply_ch2_fixes.py` was a one-shot — temp working dir cleaned up at end of session.

**Session 46 lessons learned:**
- **Don't trust thesis claims about file structure — `find` first.** §2.2.4 listed four reusable UI components that don't exist anywhere in `src/components/`. Always glob/grep the actual directory before accepting "this component does X" claims as accurate.
- **Legacy/prototype files in the repo can be misleading** — `voice-actor/voice_service.py` looks like a helper module from its name but is actually an unused alternative implementation. Verify a file is imported (or its functions called) before describing its role in the architecture. Quick test: `grep -r "from voice_service import"` or `grep -r "voice_service" voice-actor/`.
- **Numeric heading style IDs in WPS docx** — body Heading 1 paragraphs use `pStyle w:val="2"` and TOC entries use `w:val="21"`. Filter by `style == "2"` to find real chapter starts; the "21" entries with trailing digits like "...БӨЛҮК...25" are TOC stubs.
- **`sys.stdout.reconfigure(encoding='utf-8')` is essential for any Python script that prints Cyrillic** — Windows Python defaults to cp1252 and crashes with `UnicodeEncodeError` on Кирилл characters. Add this at the top of every fix-script template.

**Session 47 fixes (already applied to the docx) — Chapter 3 + КОРУТУНДУ text-accuracy review:**
- **§3.1.2 + КОРУТУНДУ (idx 992, 1586) — "Vercel Edge Functions" misclaim** — `src/app/api/chat/route.ts` does NOT declare `export const runtime = "edge"`. It's a default Next.js API route running on Node.js serverless. Replaced with "Vercel Serverless Functions ... + Edge Network for static assets / global CDN" — accurate split between compute (Node serverless) and content delivery (Edge CDN).
- **§3.5 (idx 1208, 1209, 1232, 1233) — fabricated unit + integration tests** — entire section claimed `__tests__/api/chat.test.ts` and `__tests__/components/ChatWidget.test.tsx` exist with detailed test code. Glob check: `**/__tests__/**` returns nothing; package.json has no jest/vitest/@testing-library deps; no `test` script. Subsection titles softened to "Бирдиктүү тесттер үчүн шаблон (потенциалдуу ишке ашыруу)" / "Интеграциялык тесттер үчүн шаблон". Figure 33 + 34 captions updated to "(учурда ишке кошулган эмес)" — code blocks themselves left as illustrative templates of what tests would look like.
- **§3.6.1 (idx 1263) — fabricated `vercel.json`** — file does NOT exist (`ls vercel.json` returns "No such file"). Vercel auto-detects Next.js without any config. Comment changed to "vercel.json мисалы (атайын файл түзүлгөн эмес — Vercel Next.js'ти автоматтык таанып, default конфигурация менен иштейт)" so readers understand the JSON is illustrative.
- **§3.6.2 (idx 1281-1284) — fabricated env vars** — `.env.local` only has `OPENAI_API_KEY`. The thesis listed nonexistent `NEXT_PUBLIC_SITE_URL=https://wanderlust-tours.vercel.app` and `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`. Replaced with the real env var pattern: `NEXT_PUBLIC_VOICE_WS_URL` (production WebSocket URL for Render backend, dev fallback `ws://localhost:8001`) plus a note that `voice-actor/.env` holds backend's own `OPENAI_API_KEY` separately.
- **§3.10.2 (idx 1423) — IP rate limiting NOT implemented** — `route.ts` has no `request.headers.get('x-forwarded-for')` check, no max message length validation. Code block kept as illustration but comment changed from "Rate limiting мисалы" → "Келечектеги Rate limiting мисалы (учурда ишке кошулган эмес)".
- **§3.11.1 (idx 1449) — wrong CDN provider in scaling diagram** — ASCII diagram showed "Cloudflare CDN" at top. Vercel uses its own Edge Network (built on AWS), not Cloudflare. Replaced with "Vercel Edge".
- **§3.13.2 (idx 1504, 1506) — `@vercel/analytics` not installed** — `grep "@vercel" package.json` returns nothing. Comment "Analytics автоматтык түрдө иштейт Vercel'де" was wrong (Vercel Analytics requires the package or dashboard activation). Replaced with "Vercel Analytics учурда орнотулган эмес — потенциалдуу интеграция мисалы". Import line commented out and labeled as not-yet-installed.
- **§3.15 КОРУТУНДУ (idx 1555) — wrong Lighthouse number** — claimed "92/100 Lighthouse Performance скору" but §3.7.1 table (and CLAUDE.md Status section) say desktop 96, mobile ~82. Replaced with "Lighthouse Performance скору: десктоп 96/100, мобилдик ~82/100" — matches the body table and the КОРУТУНДУ §1591 phrasing.
- **КОРУТУНДУ (idx 1594) — FCP value inconsistent with §3.7.1** — said "First Contentful Paint: 0.9 секунд" but §3.7.1 table shows 0.8s desktop / 1.4s mobile. Updated to show both numbers.
- **КОРУТУНДУ (idx 1597, 1627) — fabricated SEO claims** — §1597 listed "SEO-оптималдаштырылган баракчалар" as an achievement and §1627 listed `generateMetadata` + `generateStaticParams` under "ЧЕЧИЛГЕН НЕГИЗГИ КӨЙГӨЙЛӨР" (key problems solved). Per CLAUDE.md Status table Phase 4 SEO was SKIPPED, and per the i18n notes both functions were DROPPED for `[slug]` client pages. Replaced with honest "Static generation: 16 баракчанын баары build убагында генерацияланат".
- **КОРУТУНДУ (idx 1638) — nonexistent AI personalization** — listed "AI менен персоналдаштырылган сунуштар" under commercial advantages. The chatbot has a static system prompt with no user profile, no message-history-based recommendations. Replaced with "AI чатбот аркылуу жалпы маалымат жана тур сунуштары".
- **КОРУТУНДУ (idx 1656) — overstated user testing** — said "Тестирлөө процесси чектелген колдонуучулар менен" implying limited user testing was done; in reality no formal UX research happened. Replaced with "Расмий колдонуучу тестирлөөсү (UX research) жүргүзүлгөн жок; автоматташтырылган unit/интеграциялык тесттер ишке кошулган эмес".
- **СҮРӨТТӨР ТИЗМЕСИ (idx 1727, 1728)** — figures 33 + 34 captions updated to match the new in-body captions.
- **Total: 25 string replacements across 21 paragraphs.** Fix script `apply_ch3_fixes.py` was a one-shot — temp working dir cleaned up at end of session.

**Session 47 lessons learned:**
- **Verify env-var lists against `.env*` files** — the thesis listed `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_ID` that don't exist anywhere in the repo, while omitting the real `NEXT_PUBLIC_VOICE_WS_URL` that voice-chat depends on. Quick check: `cat .env.local`, `grep -r "process.env.NEXT_PUBLIC" src/`. Don't trust prose-listed env vars.
- **"Edge Functions" vs "Serverless Functions" on Vercel** — Vercel terminology is precise. **Edge Functions** require `export const runtime = "edge"` in the route file (uses V8 isolates, Web Streams). **Serverless Functions** are the default (Node.js runtime, full Node API). Wanderlust's `route.ts` has no runtime declaration → it's a Node serverless function. Don't conflate them; thesis was wrong on both §3.1.2 and КОРУТУНДУ.
- **Test-infrastructure claims are easily fabricated** — fake `__tests__/api/chat.test.ts` paths and `import { POST } from '@/app/api/chat/route'` look credible at first glance. Verification is cheap: `glob "**/__tests__/**"`, `grep -E '"(jest|vitest|@testing-library)"' package.json`, `ls jest.config.* vitest.config.*`. If all return empty, no test framework exists. The thesis-original claim of integration tests with `@testing-library/react` was completely fabricated.
- **`vercel.json` is rarely needed for Next.js on Vercel** — Vercel auto-detects Next.js framework (`framework: "nextjs"`), default `buildCommand: "next build"`, default `outputDirectory: ".next"`. The only common reasons to add `vercel.json` are explicit regions, custom rewrites/redirects beyond `next.config.ts`, or cron jobs. If the user's repo has none of these, no `vercel.json` should be claimed in the thesis.
- **CDN provider is part of the deployment stack — verify, don't guess** — Vercel's Edge Network is built on AWS regions and is NOT Cloudflare. Cloudflare offers a competing edge platform (Cloudflare Pages, Workers). Mixing them up in architectural diagrams is a basic factual error.
- **For Lighthouse-style metrics, audit the body for the *first* statement of the value** — KO's typically reference the §3.7 table; if KO and §3.7 disagree, the table is canonical because it's shown to the reader explicitly. Run `grep "/100"` across the doc to spot mismatches.

**Session 44 lessons learned:**
- **`pgMar w:header="N"` controls vertical position of page numbers** — must be set to `1417` twips (= 2.5 cm) per KTMU rule, not `0`. The header offset is independent of the top margin (`w:top`).
- **WPS Office insertions can be doubled** — when figures were inserted by an earlier session, each got both an `<asvg:svgBlip>`-bearing SVG inline AND a separate PNG-only inline below it. Looks like one figure visually but is two `<w:drawing>` paragraphs. To detect: count `<wp:extent>` tags vs visible figure count.
- **Don't blindly dedupe by width** — figs 41-44 had only the 15.24 cm version (no SVG sibling). Always verify each "duplicate" candidate has a real proper-sized neighbor in the preceding 2-4 paragraphs before removing.
- **Watch for pre-existing TOC fields before adding one** — the original WPS template already had a TOC field at p[75]. Session 43's `TOC \o "1-3" \h \z \u` insertion at the end of front matter became a duplicate. Always grep for `<w:instrText>` containing `TOC ` before inserting a new one.
- **On Windows, the Read/Write tool needs Windows-style paths** — Unix-style `/tmp/foo` paths silently no-op (the tool says "success" but nothing persists to disk; bash sees the unmodified original). Always use `C:\Users\...` form for files outside the project working directory.

**Two intentional deviations that remain (per supervisor / sample):**
- First-line indent: 0 cm (rules say 1.25 cm) — supervisor: "follow sample, not rules."
- Heading 2 (subsection) titles in CAPS (rules say lowercase) — sample uses CAPS.

**B-annex sections "Ачылыштар" + "Талкуулар"** — not separate sections; consolidated into the 3-chapter body, matching the supervisor sample's condensed structure.

**Open Word checklist after any further docx edit:**
1. Right-click the TOC field → *Update Field* → *Update entire table* (rebuilds Мазмуну entries + page numbers).
2. Same for Сүрөттөр / Жадыбалдар tables if you change figures or tables.
3. Verify the title page has no page number (page i should appear on the page after it, on АННОТАЦИЯ).
- **Audited and OK as-is**: page setup (A4 21×29.7, margins 4/2.5/4/2.5, TNR 12pt, 1.5 spacing, no first-line indent), references list (34 entries, alphabetical, SURNAME-Initial-(Year)-Title-Publisher format), title page (24 paragraphs of standard КТМУ form), АННОТАЦИЯ ↔ ÖZET parity (5 paras each, ~1.5k chars each).

**After any TOC-affecting edit:** in Word, right-click the table of contents → *Update Field* → *Update entire table*.

**Heading style discipline:**
- `Heading 1` is reserved for: chapters (1-БӨЛҮК, 2-БӨЛҮК, 3-БӨЛҮК), КИРИШҮҮ, КОРУТУНДУ, ПАЙДАЛАНЫЛГАН БУЛАКТАР, АННОТАЦИЯ, ÖZET, ЫРААЗЫЧЫЛЫК БИЛДИРҮҮ, БЕЛГИЛЕР. Nothing else.
- `Heading 2` for `N.M` subsections (1.1, 2.3, 3.7…). All in CAPS in the sample (rules say lowercase, but sample uses caps — follow sample).
- Bullet lines and prose go in `Normal`.

---

## Next Thesis Step — All Chapters Reviewed

Format/structure work is done. **Text-accuracy review is now complete for all three chapters and the conclusion** — the prose has been verified against the actual Wanderlust code (`src/`, `voice-actor/`) and corrected where it described features/architectures that didn't match reality.

**Status:**
1. ~~**Chapter 1 (theoretical)** — claims about competing chatbots (Booking.com AI, TripAdvisor AI, ChatGPT) and the comparative table.~~ ✅ Done in Session 45 — see "Session 45 fixes" above for the 19 replacements applied.
2. ~~**Chapter 2 (architecture/design)** — verify against actual code (App Router, ChatWidget, Voice, i18n, Deployment).~~ ✅ Done in Session 46 — see "Session 46 fixes" above for the 10 replacements applied.
3. ~~**Chapter 3 (implementation/results)** — tech stack, module mechanisms, OpenAI API, testing, performance results, future-work tense.~~ ✅ Done in Session 47 — see "Session 47 fixes" above for the 25 replacements applied (covers fabricated tests, nonexistent vercel.json, fake env vars, wrong CDN provider, unimplemented rate limiting, missing analytics package, Lighthouse number mismatch, Edge-vs-Serverless misclaim, and dropped SEO claims).
4. ~~**Chapter 3 future-work claims (3.8.2, 3.11, 3.14)** — verify they're not described as "implemented".~~ ✅ Done in Session 47 — code listings in §3.10.2, §3.13.2, §3.14.2 explicitly labeled "(учурда ишке кошулган эмес)" / "потенциалдуу интеграция мисалы".
5. ~~**Conclusion (КОРУТУНДУ)** — achievement claims and statistics rooted in actual measured results.~~ ✅ Done in Session 47 — Lighthouse numbers, FCP, SEO claim, AI personalization claim, and "limited user testing" all corrected.

**Open Word checklist after Session 47 edits:**
1. Right-click МАЗМУНУ TOC field → *Update Field* → *Update entire table* (no Heading 1/2/3 changed, but TOC may show the new captions).
2. Right-click СҮРӨТТӨР ТИЗМЕСИ → no action needed (already updated to new captions for figs 33-34 in this session).
3. Verify §3.5, §3.6.1, §3.6.2, §3.10.2, §3.13.2, §3.15 read coherently end-to-end (Cyrillic/Kyrgyz prose can be hard to spot-check programmatically — eyeball it once).
4. The `.PRE-CH3-ACCURACY.docx` backup is the active rollback point — delete only after you've opened the live docx, confirmed everything reads correctly, and are confident no further restore is needed.

**If more issues are found later:** the same fix-script pattern (positional paragraph replacement via `re.finditer` + `paragraph.replace(old, new, 1)`) works. See `apply_ch3_fixes.py` in `c:\tmp\thesis_ch3\` for the most recent template (now cleaned up, but the pattern is documented in Session 45-47 lessons).
