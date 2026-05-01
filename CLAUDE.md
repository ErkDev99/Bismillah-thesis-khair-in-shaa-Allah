# Wanderlust – Bachelor's Thesis Website

*Last updated: 2026-04-30 (Session 49 — Lighthouse re-measure: Desktop avg 97 / Mobile avg 71 across 16 pages; PM_Quality_Homework.docx regenerated.)*

Central Asian travel & tourism platform (Kazakhstan, Kyrgyzstan, Uzbekistan). Next.js 16, React 19, Tailwind CSS v4. Evaluated as a bachelor's thesis. **Pre-defense: 2026-05-21/22. State defense: 2026-06-10/14.**

---

## Current Status

| Area | Status |
|------|--------|
| Phase 1 — UI/UX Restyle (16 pages + 89 real images) | ✅ |
| Design System (Nature/Emerald) | ✅ |
| Phase 2 — Accessibility (WCAG 2.1, Lighthouse 100) | ✅ |
| Phase 3 — Performance (Desktop ~97 avg / Mobile ~71 avg, Session 49 re-measure) | ✅ |
| Phase 4 — SEO | ⏭️ Skipped (thesis, not commercial) |
| Phase 5 — Cross-browser & Responsive | ⬜ Not started |
| Phase 6 — Polish & Content | 🔄 6.5 done; 6.1–6.4 pending |
| Voice Chat + ChatWidget mic | ✅ |
| Dark mode | ✅ |
| Review system (`/review`, `/reviews`) | ✅ |
| QuickSearchBar, Contact map | ✅ |
| **i18n (EN/RU)** | ✅ All 22 pages/files |
| **Thesis docx — text-accuracy reviewed (Ch 1, 2, 3, КОРУТУНДУ)** | ✅ |

---

## Quick Start for Next Session

**Web app — i18n complete.** Next: **Phase 5** (cross-browser/responsive — breakpoints 375/390/768/1280/1440/1920 across Chrome/Firefox/Edge/Safari), then **Phase 6.1** (custom 404 at `src/app/not-found.tsx`), 6.2 (loading states + skeletons at `src/app/loading.tsx`), 6.3 (form validation), 6.4 (micro-interactions).

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
- **Mobile Lighthouse** — Session 49 (2026-04-30) re-measure: 3-run avg **71** (runs: 79 / 59 / 75). Did NOT reach 90+. Variance dominated by TBT (110 ms → 2080 ms across runs) — host-CPU contention amplified by Lighthouse's 4× CPU throttle, not a code regression. Desktop is solid (97 avg over 16 pages). For thesis defense, cite desktop score; if mobile must be quoted, use the 3-run average and note the variance honestly.
- **Team photo cropping** — `/about` uses `h-72 object-cover object-[center_20%]`. Switch to per-member `objectPosition` if any face looks wrong.
- **Google Docs renders the thesis docx incorrectly** — Google Docs ignores `<w:titlePg/>` and `pgNumType w:fmt="lowerRoman"`, so it shows Arabic page numbers on the title page and front matter. Word and WPS render correctly. **Always share the thesis as PDF on Google Drive, not docx.**

---

## Lighthouse Runbook

Baseline (Session 49, 2026-04-30, 16-page sample): **Desktop avg 97 / Mobile 3-run avg 71**. Desktop range: 77 (`/destinations/[slug]` — image-heavy gallery) to 100 (`/destinations`, `/practical-info`); 13/16 pages score ≥ 94. Mobile is highly variable (Session 49 spread: 59–79, ~20 pts) — chase desktop for thesis defense, but record mobile as a 3-run average. Pre-hero.jpg-fix baseline was Desktop 96 / Mobile ~82; the compression helped desktop slightly but mobile variance overwhelms the signal.

**Always test the production build, not `next dev`** — dev mode is slower and not representative.

```bash
# Terminal 1 — production server on :3000
npm run build && npm run start

# Terminal 2 — desktop (1 run is enough; consistent)
npx lighthouse http://localhost:3000 --preset=desktop --quiet \
  --chrome-flags="--headless=new" --output=json,html --output-path=./lh-desktop

# Terminal 2 — mobile (default preset; run 3× and average)
npx lighthouse http://localhost:3000 --quiet \
  --chrome-flags="--headless=new" --output=json,html --output-path=./lh-mobile-1
# repeat → lh-mobile-2, lh-mobile-3
```

**Pages to sample (for histogram + control chart in `PM_Quality_Homework.docx`):** at minimum `/` (hero-heavy, the LCP target). For a fuller distribution: `/`, `/tours`, `/destinations`, `/about`, `/blog`, `/contact`. Read the `categories.performance.score` field from each `*.report.json` (multiply by 100 to get the 0–100 score).

**After measuring, update in this order:**
1. **Phase 3 row** in `## Current Status` table above (new Desktop / Mobile numbers).
2. **`Mobile Lighthouse`** line in `## Open Issues` — if mobile is now ≥ 90, mark as resolved.
3. **`Theses/build_pm_quality_docx.py`** — refresh `scores` list in `draw_histogram()` and append new sessions to `draw_control_chart()`. Then `python Theses/build_pm_quality_docx.py` to regenerate the docx.
4. Delete or `.gitignore` the `lh-*.json` / `lh-*.html` artifacts before committing.

If `npx lighthouse` is missing: `npm i -g lighthouse` (no need to add it as a project dep).

---

## Thesis docx — pending Lighthouse updates (Session 49)

> **🚫 BLOCKED as of 2026-04-30 — supervisor is reviewing the submitted docx.** Do NOT edit `Theses/Дипломдук иш Erkebulan Duishenaliev.docx` until the user confirms the supervisor has returned the file with comments. Editing now would create a version fork: the supervisor's annotations would be against the old text, forcing manual merge. When the file comes back, ask the user to confirm before proceeding with the edits below.

After Session 49 re-measure (Desktop avg **97**, Mobile 3-run avg **71**), `Theses/Дипломдук иш Erkebulan Duishenaliev.docx` has stale numbers in **4 spots**. Desktop went up (96 → 97), mobile went down (82 → 71, variance-dominated by 4× CPU throttle on a busy host). Use the XML pattern in **Thesis docx editing patterns** below; index paragraphs with `re.finditer(r'<w:p\b[^>]*>.*?</w:p>')` and edit by index.

**Before editing — ASK the user this judgment call:** *"Mobile dropped to 71 in re-measure (variance-heavy). Cite desktop only in the abstract, or include mobile with a variance footnote?"* The mobile-went-down framing is the user's call, not yours — academic honesty vs. defense-friendliness.

**Edits (paragraph indices verified 2026-04-30):**

1. **§3.7.1 table + analysis (canonical) — p1295–p1339:**
   - Table cell: `Десктоп Performance 96/100` → `97/100 (16 барактын орточосу)`
   - Table cell: `Мобилдик 82/100` → user's choice from above (likely `71/100 (3 өлчөөнүн орточосу, дисперсия 59–79)`)
   - p1338 prose: rewrite from "1,7 МБ — кысылса 4,2 → 2,5 сек болот" → "1,7 МБ → 107 КБ кысылды (Сессия 49). Мобилдик упай 4× CPU чектөөдөн жогорку дисперсияга дуушар; десктоп 97/100 деңгээлинде туруктуу."

2. **Future work — p1377:**
   - Currently: `Hero сүрөт оптималдаштыруу: 1,7 МБ — кысуу зарыл`
   - Action: **delete this bullet** (TODO is done) OR rephrase as `WebP/AVIF форматка өтүү — мобилдик дисперсияны азайтуу үчүн.`

3. **КОРУТУНДУ — p1555, p1591, p1594:**
   - All three say `десктоп 96/100, мобилдик ~82/100`. Per the rule "КОРУТУНДУ should match the table," update to whatever the new §3.7.1 cells say.

4. **АННОТАЦИЯ p236 + ÖZET p242:**
   - Currently `Google Lighthouse Performance 90+` (generic). Defensible **only if interpreted as desktop**. Recommended explicit rephrase: `десктопто Google Lighthouse Performance 90+ (97/100 орточо)` / `masaüstünde Google Lighthouse Performance 90+ (ortalama 97/100)`. ✗ Don't claim 90+ mobile — Session 49 contradicts it.

**After editing:**
- Re-grep all four sites to confirm consistency: `grep -E '(96|82|97|71)/100' word/document.xml` should only return the new numbers.
- Trigger TOC + figure-list update on next Word open (see "Open Word checklist").
- Bump CLAUDE.md "Thesis docx — text-accuracy reviewed" status row to note Session 49 numbers folded in.

---

## DO NOT TOUCH

- **`src/app/globals.css`** — any layout-affecting edit caused horizontal overflow bug twice (required `git reset --hard`). All design via component-level Tailwind only. *Exception:* `@custom-variant dark (&:where(.dark, .dark *));` is a Tailwind config directive and is safe.
- **`voice-actor/main.py`** — backend with REST + WebSocket proxy endpoints. Working. **Never `print()` raw user text, emojis, or non-ASCII** — Windows cp1252 console throws `UnicodeEncodeError` → 500 to browser. Use `print(f"[ASR] Transcript ({len(text)} chars)")` style.
- **`src/app/layout.tsx`** — fonts are Geist; `font-serif` falls back to system serif and works. Do NOT add Cormorant Garamond (broke the site once). Wraps in `<ThemeProvider>` → `<LocaleProvider>`. Has `suppressHydrationWarning` on `<html>` + FOUC inline script for dark mode. Also wraps everything in `<main id="main-content">` — so every page uses `<div>` as its root, not `<main>`.

---

## User Preferences

- Prefers one file at a time.
- Proceed autonomously on restyle/implementation — don't ask permission for each step (saves tokens).
- When a change is risky (`layout.tsx`, `globals.css`, thesis docx headers/sections), **ask first**.
- If site breaks, believe the user and revert immediately.
- User is Muslim — responds well to Islamic greetings.
- **Don't remove things from the site.** User is not a web-dev expert and trusts me to lead, but worries the site will "lack something." Only additive changes; if something seems redundant, offer to merge or enhance, not delete.
- When presenting design tradeoffs, give 2–3 labeled options (A/B/C) with pros/cons + my recommendation.

---

## Lessons Learned (web app)

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
- **i18n without URL routing** — client-side `LocaleProvider` + `localStorage`, mirrors `ThemeProvider`. Trade-offs: server-rendered markup starts in EN until hydration (acceptable FOUC); SEO sees only EN (acceptable, Phase 4 skipped); no `/ru/*` deep-links. Gains: zero routing churn, TS-enforced key parity, no duplicate page files.
- **Typed translation dictionaries** — `en.ts` exports `export type Translations = typeof en`; `ru.ts` is typed `const ru: Translations`. Missing/misspelt keys become build errors, not runtime `undefined`.
- **Long RU nav labels can silently break the header** — "Практическая информация" (21 chars) vs "Practical Info" (14) overflowed `whitespace-nowrap` flex nav. In tight horizontal layouts, pick the shortest idiomatic RU equivalent. Header uses `Советы`; footer (which wraps) keeps `Практическая информация`.
- **Don't translate concrete contact data** — phone, email, physical address are data, not UI copy.
- **Data-layer localization — `*Ru` sibling pattern** — short data fields get optional `titleRu?: string` siblings; components pick with `locale === "ru" && item.fieldRu ? item.fieldRu : item.field` — EN is the fallback. For long fields (itinerary steps, blog bodies), a separate `*.ru.ts` file is cleaner.
- **Tighten loose string types for i18n indexing** — narrow data fields to literal unions (`"cultural" | "adventure"`) so TS can index translation dicts without `as` casts.
- **React 19 `use(params)` for client-page conversion** — Next.js 15+ passes dynamic route params as `Promise<{...}>`. When converting a server page to a client component, switch to `import { use } from "react"` and `const { slug } = use(params)`. Drop `generateStaticParams` / `generateMetadata` (server-only).
- **Hero overlay strength depends on hero shape** — homepage's `from-black/40 via-transparent to-transparent` (bottom only) works for tall heroes; compact band heroes need `from-black/15 via-black/25 to-black/45` (top-to-bottom wash); `[slug]` heroes (50vh, title at bottom) use `from-black/55 via-black/10 to-transparent`.

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
- Tall heroes (`min-h-[70vh]`): `bg-gradient-to-t from-black/40 via-transparent to-transparent`
- Compact band heroes (`py-4 md:py-6`): `bg-gradient-to-b from-black/15 via-black/25 to-black/45`
- Detail `[slug]` heroes (`h-[50vh]`, `flex items-end`): `bg-gradient-to-t from-black/55 via-black/10 to-transparent`
- Add `drop-shadow-md` (body) / `drop-shadow-lg` (h1). Use `text-emerald-300` and `text-white/90` (not `text-stone-300`) for accent + body on hero photos.

### DifficultyBadge
- Easy: emerald · Moderate: orange · Challenging: red. All `rounded-full`.

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
- Locale doesn't affect chat assistant's reply language — OpenAI picks based on user's message.

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

**Translations:** `src/lib/translations/en.ts` (source of truth, exports `Translations` type) · `src/lib/translations/ru.ts` (typed `Translations`, TS enforces key parity)

**Data:** `src/lib/data/tours.ts` (6 tours, 10-day itineraries) · `src/lib/data/destinations.ts` (6 destinations) · `src/lib/data/blog.ts` + `blog.en.ts` + `blog.ru.ts`

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

The Wanderlust website is the practical part. Written thesis in Kyrgyz: `Theses/Дипломдук иш Erkebulan Duishenaliev.docx`. User is in **Computer Engineering** at Kyrgyz-Turkish Manas University (КТМУ).

**Reference files in `Theses/`:**
- `Дипломдук иш Erkebulan Duishenaliev.docx` — the thesis itself
- `thesis_writing_rules.txt` — extracted КТМУ rules (Article 7 + B-annex + D-annex; Computer Engineering)
- Sample files (⚡️.docx, Санжар.docx) and `Dipl_erejeler_kg.pdf` were removed by the user after format work was done; if needed again, they can be restored from git history.

**Format (verified matches both KTMU rules and the Санжар sample):**
- Page: A4 (21 × 29.7 cm). Margins: top 4.0 / bottom 2.5 / left 4.0 / right 2.5 cm.
- Font: Times New Roman 12pt. Line spacing: 1.5.
- First-line indent: **none** (sample uses flat block-paragraph; supervisor said follow sample, not rules).
- References: `SURNAME, Initial. (Year). Title. Publisher.` — alphabetical, surnames in CAPS.
- Body in Kyrgyz; **АННОТАЦИЯ + КОРУТУНДУ are mirrored as ÖZET + SONUÇ in Turkish**.
- Page numbers: top-right header at `pgMar w:header="1417"` (= 2.5 cm). Title page unnumbered (`<w:titlePg/>` + empty first-page header). Front matter lowerRoman; body decimal.
- Two intentional rule deviations (per supervisor / sample): first-line indent 0 cm (rules say 1.25); Heading 2 in CAPS (rules say lowercase).

**Chapter layout (3-chapter, matching the Санжар sample's condensed structure):**
1. **1-БӨЛҮК** — Theoretical foundations (chatbot architectures, AI in tourism, comparison of existing solutions, AI chatbot theory)
2. **2-БӨЛҮК** — System architecture & design (requirements, Next.js/React stack, ChatWidget, styling, deployment)
3. **3-БӨЛҮК** — Implementation & results (modules, OpenAI API integration, testing, deployment, performance, future work)

**B-annex sections "Ачылыштар" + "Талкуулар"** are consolidated into the body chapters, matching the supervisor sample.

### What's already been applied to the docx (Sessions 42–48)

- **Structure** — duplicate §1.2/1.3 headings renumbered to 1.4/1.5/1.6; 5 Chapter-3 bullets reclassified Heading 1 → Normal; 230 `**markdown bold**` paragraphs converted to real Word bold.
- **Tables** — 7 markdown table blocks → real Word tables (Table Grid borders, light-emerald header `D9E1D5`, bold header row, TNR 11pt).
- **Figures** — old `Сүрөт N.` → `N-сүрөт.` convention; 22 doubled figure paragraphs deduped (each had a 14.50 cm SVG + a redundant 15.24 cm PNG); figs 41-44 restored at 14.50 cm; figs 25-26 orphan placeholder cleaned up.
- **TOC + lists** — single МАЗМУНУ TOC field (TOC `\o "1-3" \h \z \u`) at p[75]; СҮРӨТТӨР ТИЗМЕСИ + ЖАДЫБАЛДАР ТИЗМЕСИ (7 entries) appended before ПАЙДАЛАНЫЛГАН БУЛАКТАР.
- **Page numbering** — top-right header at 2.5 cm (`pgMar w:header="1417"`); title page unnumbered; footers emptied to bare `<w:p/>` wrappers.
- **Page breaks** — every Heading 1 starts on a new page via `<w:pageBreakBefore/>` on the **style** (not explicit `<w:br>` runs, which collide with section breaks → blank pages).
- **Text accuracy** — Chapter 1 (19 replacements), Chapter 2 (10), Chapter 3 + КОРУТУНДУ (25). Verified against `src/`, `voice-actor/`, `package.json`, `.env.local`, `route.ts`. Fixed: fabricated tests, nonexistent `vercel.json`, fake env vars, wrong CDN provider, unimplemented IP rate limiting, missing `@vercel/analytics`, wrong Lighthouse number, "Edge Functions" misclaim, dropped SEO claims, fake AI personalization, overstated user testing.
- **Google Docs page-number rendering fix (Session 48)** — `header1.xml` rewritten as a clean direct PAGE field (was wrapped in a `<w:drawing>` floating text box from the original WPS template); empty `header3.xml` added for the title page; `rId96` registered; `<w:headerReference w:type="first"/>` added to `sectPr #0`. Word still renders correctly. Google Docs still ignores `<w:titlePg/>` and lowerRoman — that's a Google Docs limitation, not a docx issue. **Always share thesis as PDF on Google Drive.**

### Thesis docx editing patterns (lessons)

**XML editing pattern:**
- Use `re.finditer(r'<w:p\b[^>]*>.*?</w:p>')` to locate paragraphs by index, then `paragraph.replace(old, new, 1)` only on the target. Don't do global replaces — they hit unintended cells (e.g. `<w:t>✗</w:t>` appears in many table cells).
- Bold lead-in pattern in §1.4.x bullets: `<w:r><w:rPr><w:b/></w:rPr><w:t>NAME (YEAR)</w:t></w:r>` followed by a normal `<w:r>` for the rest. Shorten the inner `<w:t>` text to drop dates while keeping bold styling.
- Numeric heading style IDs in WPS docx: body Heading 1 = `pStyle w:val="2"`, TOC entries = `w:val="21"`. Filter by `style == "2"` to find real chapter starts.
- Add `sys.stdout.reconfigure(encoding='utf-8')` to every Python fix-script — Windows Python defaults to cp1252 and crashes on Cyrillic.
- Re-zipping changes compression-only file sizes by ~190KB (Python zlib vs WPS); uncompressed `file_size` is identical. Verify with `zipfile.testzip()`.
- On Windows, Read/Write tools need Windows-style paths (`C:\Users\...`); Unix-style `/tmp/foo` silently no-ops.

**Page numbering / headers:**
- `pgMar w:header="N"` controls vertical header position (must be `1417` twips = 2.5 cm per KTMU rule).
- Use `<w:pageBreakBefore/>` on the Heading 1 *style* for chapter starts, NOT `<w:r><w:br w:type="page"/></w:r>` (the latter stacks on top of section breaks → blank pages).
- **Never wrap a PAGE field in `<w:drawing>` / `<wp:anchor>` / `Text Box`** — direct `<w:fldChar>` runs only. Floating text boxes break Google Docs rendering. If user edits page numbering in Word and `header1.xml` grows past 2 KB, Word may have re-introduced a wrapper.
- Always grep for `<w:instrText>` containing `TOC ` before inserting a new TOC field — duplicates render as two complete TOCs.
- Don't blindly dedupe figures by width — verify each "duplicate" candidate has a real proper-sized neighbor in the preceding 2-4 paragraphs before removing.
- WPS Office can double-insert figures: each as `<asvg:svgBlip>`-bearing SVG + a separate PNG inline below it. Detect by counting `<wp:extent>` tags vs visible figures.

**Text accuracy:**
- Don't trust thesis claims about file structure — `find`/`glob`/`grep` first. `§2.2.4` listed four UI components that didn't exist; `§3.5` claimed `__tests__/` paths that didn't exist; `§3.6.2` listed env vars that weren't in `.env.local`.
- Verify env-var lists against `.env*` files; check `package.json` for claimed dependencies; check `route.ts` runtime declarations.
- "Edge Functions" vs "Serverless Functions" on Vercel: Edge requires `export const runtime = "edge"`. Default is Node serverless. Don't conflate them.
- Vercel uses its own Edge Network (built on AWS), NOT Cloudflare.
- For metric mismatches (Lighthouse, FCP), the body table is canonical; КОРУТУНДУ should match the table.
- Legacy/prototype files in the repo (e.g. `voice-actor/voice_service.py`) can mislead — verify a file is imported (`grep -r "from voice_service import"`) before describing its role.

### Heading style discipline

- `Heading 1` is reserved for: chapters (1-БӨЛҮК, 2-БӨЛҮК, 3-БӨЛҮК), КИРИШҮҮ, КОРУТУНДУ, ПАЙДАЛАНЫЛГАН БУЛАКТАР, АННОТАЦИЯ, ÖZET, ЫРААЗЫЧЫЛЫК БИЛДИРҮҮ, БЕЛГИЛЕР. Nothing else.
- `Heading 2` for `N.M` subsections (1.1, 2.3, 3.7…). All in CAPS in the sample.
- Bullet lines and prose go in `Normal`.

### Open Word checklist after any docx edit

1. Right-click МАЗМУНУ TOC field → *Update Field* → *Update entire table* (rebuilds page numbers).
2. Same for СҮРӨТТӨР / ЖАДЫБАЛДАР lists if figures or tables changed.
3. Verify title page has no number; page i appears on the page after it (АННОТАЦИЯ).
4. **For Google Drive sharing: export PDF (`File → Export → Create PDF/XPS`) and upload that, not the docx.** Google Docs ignores `<w:titlePg/>` and lowerRoman formatting.
