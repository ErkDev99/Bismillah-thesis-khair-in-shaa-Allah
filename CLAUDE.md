# Wanderlust – Bachelor's Thesis Website

*Last updated: 2026-05-02 (Session 53 — Phase 6 fully complete; Phase 5 code-level fixes done; only manual browser pass remains.)*

Central Asian travel & tourism platform (Kazakhstan, Kyrgyzstan, Uzbekistan). Next.js 16, React 19, Tailwind CSS v4. Bachelor's thesis. **Pre-defense: 2026-05-21/22. State defense: 2026-06-10/14.**

---

## Current Status

| Area | Status |
|------|--------|
| Phase 1 — UI/UX Restyle (16 pages + 89 real images) | ✅ |
| Design System (Nature/Emerald) | ✅ |
| Phase 2 — Accessibility (WCAG 2.1, Lighthouse 100) | ✅ |
| Phase 3 — Performance (Desktop ~97 / Mobile ~71 avg) | ✅ |
| Phase 4 — SEO | ⏭️ Skipped (thesis, not commercial) |
| Phase 5 — Cross-browser & Responsive | 🔄 Code fixes done; manual browser pass pending |
| Phase 6 — Polish & Content | ✅ All done |
| Voice Chat + ChatWidget mic, Dark mode, Review system, QuickSearchBar | ✅ |
| Contact form (real Resend send) | ✅ |
| ChatWidget — data-driven system prompt | ✅ |
| i18n (EN/RU) — all 22 files | ✅ |
| Thesis docx — text-accuracy reviewed (Ch 1, 2, 3, КОРУТУНДУ) | ✅ |

---

## Quick Start for Next Session

Web app done. **Only Phase 5 manual browser pass remains** (~30–45 min): Chrome DevTools device toolbar → 375 / 390 / 768 / 1280 / 1440 / 1920 across `/`, `/tours/[slug]`, `/about`, `/contact`, `/voice-chat`, `/_not-found`. Verify `/faq` + `/practical-info` pill strips have no scrollbar (esp. Firefox). Safari iOS: 100vh URL bar quirk on voice-chat.

If new strings get added: i18n pattern → add `"use client"`, `import { useLocale }`, add namespace to `en.ts` first (TS enforces RU parity).

---

## Open Issues

- **Focus ring contrast (WCAG 1.4.11)** — fix any leftover `focus:ring-amber-*` on white bg.
- **Mobile Lighthouse** — 71 avg (variance 59–79, TBT-dominated by 4× CPU throttle, not a code regression). Cite desktop for defense; if mobile must be quoted, give 3-run avg + variance footnote.
- **WebSocket URL** — voice-chat falls back to `ws://localhost:8001` for dev; prod uses `NEXT_PUBLIC_VOICE_WS_URL`.
- **Vercel chat widget needs `OPENAI_API_KEY`** — without it, returns mock JSON.
- **Hydration error from ad-blocker** — dev-only. Verify in incognito/prod.
- **Google Docs renders thesis docx wrong** — title-page page numbers + lowerRoman ignored. **Always share as PDF on Google Drive.**

---

## Lighthouse Runbook

**Always test prod build** (`npm run build && npm run start`) — `next dev` is not representative.

```bash
npx lighthouse http://localhost:3000 --preset=desktop --quiet \
  --chrome-flags="--headless=new" --output=json,html --output-path=./lh-desktop
# mobile: drop --preset=desktop, run 3× and average
```

After re-measuring: update Phase 3 status row, `Mobile Lighthouse` open issue, and `Theses/build_pm_quality_docx.py` (`scores` list in `draw_histogram()` + `draw_control_chart()`), then `python Theses/build_pm_quality_docx.py`. Delete `lh-*` artifacts before commit.

Sample pages: `/`, `/tours`, `/destinations`, `/about`, `/blog`, `/contact`. Read `categories.performance.score` from each `*.report.json`.

---

## Thesis docx — pending Lighthouse updates

> **🚫 BLOCKED — supervisor reviewing.** Do NOT edit until user confirms file is back. When unblocked, ASK: *"Mobile dropped to 71 — cite desktop only or include with variance footnote?"*

**4 spots to update** (paragraph indices verified 2026-04-30):
- §3.7.1 table p1295–p1339 (Desktop 96→97; Mobile 82→71 per user choice)
- Future-work bullet p1377 (delete or rephrase to "WebP/AVIF миграция")
- КОРУТУНДУ p1555/1591/1594 (mirror new table values)
- АННОТАЦИЯ p236 + ÖZET p242 (rephrase as "десктопто 90+", not generic)

After: re-grep `(96|82|97|71)/100` → only new numbers should appear; trigger TOC + figure-list update on next Word open.

---

## DO NOT TOUCH

- **`src/app/globals.css`** — layout edits caused horizontal overflow twice (`git reset --hard`). Component-level Tailwind only. Adding `@utility` blocks is OK; layout rules are NOT. Existing safe directives: `@custom-variant dark`, `@utility scrollbar-hide`.
- **`voice-actor/main.py`** — REST + WebSocket proxy. Working. **Never `print()` non-ASCII** (Windows cp1252 → UnicodeEncodeError → 500). Use `print(f"[ASR] Transcript ({len(text)} chars)")` style.
- **`src/app/layout.tsx`** — Geist fonts; do NOT add Cormorant Garamond. Wraps in `<ThemeProvider>` → `<LocaleProvider>`. Has `suppressHydrationWarning` + FOUC inline script. Wraps in `<main id="main-content">` — every page uses `<div>` as root.

---

## User Preferences

- Prefers one file at a time.
- Proceed autonomously on restyle/impl — don't ask permission for each step.
- When risky (`layout.tsx`, `globals.css`, thesis docx headers/sections), **ask first**.
- If site breaks, believe the user and revert immediately.
- User is Muslim — responds well to Islamic greetings.
- **Don't remove things from the site.** Additive only; merge/enhance instead of delete.
- For design tradeoffs, give 2–3 labeled options (A/B/C) with pros/cons + recommendation.

---

## Lessons Learned (web app)

- **`globals.css` is off-limits for layout** — only Tailwind variant directives + `@utility` additions are safe.
- **Nested `<main>` bug** — `layout.tsx` already wraps everything; every page uses `<div>` as root.
- **SVG pattern IDs must be unique per file** — duplicates cause render bugs.
- **`blog/page.tsx` is a client component** — cannot use `export const metadata`.
- **`flex-1` inside `overflow-y-auto`** — pair with `min-h-0`; use `el.scrollTop = el.scrollHeight` to confine scrolling.
- **Windows cp1252 kills non-ASCII `print()`** — wrap counters/lengths only in voice backend logs.
- **SSE streaming needs line buffering** — buffer incomplete lines across `transform()` calls; process in `flush()`.
- **Dark mode FOUC prevention** — inline `<script>` reads `localStorage` and adds `dark` class before paint; `suppressHydrationWarning` on `<html>`.
- **OpenAI Realtime transcription arrives late** — insert placeholder user message on `speech_stopped`, fill on transcription event.
- **`useSearchParams` requires Suspense in Next.js 15+** — wrap in `<Suspense>` or build fails.
- **Next.js `priority` doesn't always emit `fetchpriority`** — add explicit `fetchPriority="high"` on hero `<Image>` for LCP.
- **aria-label must contain visible text** — voice-control users say what they see.
- **Lighthouse mobile scores swing 10–15 pts** — chase desktop for thesis defense.
- **Google Maps embed needs no API key** — `https://www.google.com/maps?q=LOCATION&output=embed` in iframe.
- **i18n without URL routing** — client-side `LocaleProvider` + `localStorage`. Trade-off: server paint starts EN. Gain: zero routing churn, TS-enforced parity.
- **Typed translation dictionaries** — `en.ts` exports `Translations`; `ru.ts` typed `const ru: Translations`. Missing keys = build error.
- **Long RU nav labels overflow** — "Практическая информация" (21 ch) broke flex nav. Use shortest idiomatic equivalent in tight layouts (header uses `Советы`).
- **Don't translate concrete contact data** — phone/email/address are data, not UI copy.
- **Data-layer i18n: `*Ru` siblings** — `titleRu?: string` on short fields; pick `locale === "ru" && item.fieldRu ? item.fieldRu : item.field`. Long fields get separate `*.ru.ts`.
- **React 19 `use(params)` for client `[slug]` pages** — `import { use } from "react"`; `const { slug } = use(params)`. Drop `generateStaticParams`/`generateMetadata`.
- **Hero overlay strength depends on hero shape** — tall: `from-black/40 via-transparent to-transparent`; band: `from-black/15 via-black/25 to-black/45`; `[slug]` 50vh: `from-black/55 via-black/10 to-transparent`.
- **Resend sandbox sender (`onboarding@resend.dev`) only delivers to account-owner email** — symptom: API returns 200 but no email arrives.
- **Form spam protection: honeypot + Map<ip, timestamps[]>** — honeypot catches >95% silently. Rate-limit Map is best-effort on serverless (cold starts reset).
- **Return error keys (not strings) from API routes** — `{ ok: false, error: "emailInvalid" }` lets frontend localize via `t.contact.form.errors.emailInvalid`.
- **Data-driven system prompts beat hardcoded** — build at request time from data files (~2–3k token overhead, but always-current; no sync step).

---

## Design System — Nature / Travel Magazine (emerald)

Changed from amber/Art Deco in Session 24. Teacher: "Kyrgyzstan is green — use green, pleasant to the eyes."

### Colors
| Role | Light | Dark |
|------|-------|------|
| Primary accent | `emerald-600/700` | `emerald-400/500` |
| Text accent | `text-emerald-700` | `text-emerald-400` |
| Section bg (tinted / neutral / dark) | `bg-emerald-50` / `bg-stone-50` / `bg-emerald-950` | `bg-slate-950` / `bg-slate-900` / `bg-emerald-950` |
| Card bg + border | `bg-white border-stone-200` | `bg-slate-900 border-slate-800` |
| Card border hover | `hover:border-emerald-400` | `hover:border-emerald-600` |
| Body text | `text-stone-600` | `text-stone-400` |
| Stars | `text-amber-400` (keep — universal) | same |

### Typography & Shape
- Headings: `font-serif` on h1/h2/h3.
- Eyebrows: `uppercase tracking-[0.3em] text-xs text-emerald-700 dark:text-emerald-400`.
- Buttons: `tracking-wide`. Body min: `text-stone-600 dark:text-stone-400` (stone-500 fails contrast).
- `rounded-xl` cards · `rounded-lg` buttons/inputs/badges · `rounded-full` pills/avatars.

### Buttons
- Primary: `bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg tracking-wide`
- Ghost: `border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg`
- On dark bg: `bg-emerald-500 hover:bg-emerald-400 text-emerald-950`

### Hero overlays (NO dark overlay — teacher's rule)
- Tall (`min-h-[70vh]`): `from-black/40 via-transparent to-transparent`
- Compact band: `from-black/15 via-black/25 to-black/45`
- `[slug]` 50vh (title at bottom): `from-black/55 via-black/10 to-transparent`
- Add `drop-shadow-md`/`-lg`. Use `text-emerald-300` + `text-white/90`.

### Misc
- DifficultyBadge: Easy emerald · Moderate orange · Challenging red, all `rounded-full`.
- No Art Deco: no corner accents, no diamond dividers, no geometric SVG overlays.
- NatureDivider: `<h-px w-12 md:w-20 bg-emerald-500/40>` + leaf SVG + same line, `aria-hidden="true"`.
- Radial emerald glow on dark sections: centered `w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl absolute`.

### 12-rule restyle checklist
1. amber→emerald (except star ratings)
2. stone-900/950 dark bg → slate-900/950; bg-amber-50 → bg-emerald-50
3. rounded-xl cards, rounded-lg buttons/inputs/badges
4. DiamondDivider → NatureDivider
5. Remove Art Deco corner accents
6. Remove geometric SVG overlays
7. font-serif on h1/h2/h3
8. Eyebrow → text-emerald-700 dark:text-emerald-400
9. Full `dark:` variants
10. `aria-hidden="true"` on decorative
11. Solid emerald buttons (not gradient)
12. Page root: `<div>` (NOT `<main>`) with `min-h-screen bg-emerald-50 dark:bg-slate-950`

---

## i18n (EN/RU)

Complete. 22 files. Namespaces in `en.ts`/`ru.ts`: header, footer, chat, home, tourCategory, tours, destinations, about, contact, practicalInfo, faq, blog, review, reviews, privacy, terms, voiceChat, notFound. All `[slug]` pages are client components using React 19 `use(params)`. Tour/Destination interfaces have inline `*Ru` siblings + long-field RU siblings filled. Blog uses split: `blog.en.ts` (source) + `blog.ru.ts` (slug-keyed override map) merged in `blog.ts`.

Known limitations (acceptable for thesis): server paint starts EN until LocaleProvider hydrates; `/api/chat` + WebSocket error messages remain English; ChatWidget reply language follows user's last message language (system prompt instruction, not piped through locale toggle).

---

## Voice Integration

**Backend:** `voice-actor/main.py` (FastAPI, port 8001) — `POST /transcribe-voice` (Whisper STT), `POST /generate-voice` (TTS + gTTS Kyrgyz fallback), `WS /ws/realtime` (OpenAI Realtime proxy).

**Run:** `cd voice-actor && python main.py`. Requires `OPENAI_API_KEY` in `voice-actor/.env`. Next.js rewrites `/voice/:path*` → `localhost:8001/:path*`. WS connects directly (bypasses rewrites).

**Voice Chat (`/voice-chat`):** real-time speech-to-speech, PCM16 24kHz, server-side VAD, ~0.5–1s latency.

**ChatWidget mic:** dictation mode — record → waveform → confirm/cancel → Whisper STT → text in input. ~2–3s. No auto-send.

**Chat API (`POST /api/chat`):** `{ messages, voice? }`. Text streams plain; voice returns full JSON. **System prompt built at request time** from `tours.ts` + `destinations.ts` + `blog.en.ts` + hand-written `SITE_MAP`. Always knows current tour names/prices/slugs/durations/highlights/destinations/blog titles. Includes markdown links. Voice variant compact (names + prices). `max_tokens`: 700 text / 100 voice.

**Lang routing:** `voiceApi.ts:detectLang()` — Kyrgyz Unicode → `ky`, Cyrillic → `ru`, else → `en`.

**No auth.** JWT removed. Don't reintroduce.

---

## Contact Form (Resend)

**Backend** (`api/contact/route.ts`): JSON parse → honeypot (`website` field) → server validation (name ≤100, email regex ≤254, phone ≤32, subject in `ALLOWED_SUBJECTS`, message 10–5000) → in-memory `Map<ip, timestamps[]>` rate-limit (3/hr, best-effort) → Resend SDK send (HTML + text, user input HTML-escaped, `replyTo` = sender email) → dev fallback (no key → log + return 200).

**Env vars** (`.env.local` + Vercel): `RESEND_API_KEY` (free: 100/day), `CONTACT_TO_EMAIL` (with sandbox sender, **must equal** Resend account-owner email), `CONTACT_FROM_EMAIL` (optional; default `Wanderlust <onboarding@resend.dev>`).

**Frontend** (`contact/page.tsx`): real `fetch("/api/contact")`, honeypot input off-screen. Specific i18n error rendering: `errorKey ? t.contact.form.errors[errorKey] : t.contact.form.error`.

**Demo flow for defense:** local `npm run start` (faster than Vercel cold-start). Gmail open in tab → form submit → green banner → email arrives in seconds (`[Wanderlust] subject — name`). Reply from Gmail auto-fills sender via `replyTo`.

---

## Files Reference

**Components:**
- `src/components/layout/Header.tsx` — sticky 7-link nav, Contact CTA, dark + EN/RU toggle
- `src/components/layout/Footer.tsx` — 4-column
- `src/components/chat/ChatWidget.tsx` — floating chat + dictation mic
- `src/components/ThemeProvider.tsx` — dark mode context
- `src/components/LocaleProvider.tsx` — EN/RU context, `localStorage("locale")`, sets `<html lang>`, exposes `useLocale()`
- `src/components/Reveal.tsx` — framer-motion `whileInView` wrapper, respects `prefers-reduced-motion`
- `src/components/home/QuickSearchBar.tsx` — country picker with instant tour results
- `src/components/home/AnimatedHeadline.tsx` — rotating country names (framer-motion spring)

**Translations:** `src/lib/translations/en.ts` (source, exports `Translations`), `ru.ts` (typed, TS enforces parity).

**Data:** `src/lib/data/tours.ts` (6 tours), `destinations.ts` (6), `blog.ts` + `blog.en.ts` + `blog.ru.ts`.

**Conventions files:** `loading.tsx` (root Suspense fallback), `not-found.tsx`, `layout.tsx`.

**Mock booking credentials (`/review` demo):**
`WL-2025-001 / sarah@example.com` · `WL-2025-002 / david@example.com` · `WL-2025-003 / aiko@example.com` · `WL-2024-004 / maria@example.com` · `WL-2024-005 / john@example.com` · `WL-2025-006 / elena@example.com`

---

## Site Structure

```
/ · /tours · /tours/[slug] · /destinations · /destinations/[slug]
/about · /blog · /blog/[slug] · /contact · /practical-info · /faq
/privacy · /terms · /review · /reviews · /voice-chat
Conventions: loading.tsx, not-found.tsx
Out of thesis scope: real booking/payment, user accounts.
```

---

## Thesis Document

Practical part = the Wanderlust website. Written thesis in Kyrgyz: `Theses/Дипломдук иш Erkebulan Duishenaliev.docx`. User: Computer Engineering at Kyrgyz-Turkish Manas University (КТМУ).

**Format (matches KTMU rules + Санжар sample):**
- A4. Margins: top/left 4.0, bottom/right 2.5 cm. TNR 12pt, line spacing 1.5.
- First-line indent: **none** (sample-driven; rules say 1.25 — supervisor said follow sample).
- References: `SURNAME, Initial. (Year). Title. Publisher.` — alphabetical, surnames CAPS.
- Body Kyrgyz; **АННОТАЦИЯ + КОРУТУНДУ mirrored as ÖZET + SONUÇ in Turkish**.
- Page numbers: top-right header at `pgMar w:header="1417"` (= 2.5 cm). Title page unnumbered (`<w:titlePg/>`). Front matter lowerRoman; body decimal.
- Heading 2 in CAPS (rules say lowercase, sample wins).

**Chapter layout (3-chapter, condensed sample structure):**
1. **1-БӨЛҮК** — Theoretical foundations (chatbot architectures, AI in tourism, comparison)
2. **2-БӨЛҮК** — System architecture & design (requirements, stack, ChatWidget, deployment)
3. **3-БӨЛҮК** — Implementation & results (modules, OpenAI integration, testing, performance, future work)

B-annex sections "Ачылыштар" + "Талкуулар" consolidated into body chapters per sample.

### Heading style discipline
- **Heading 1** reserved for: chapters (1-БӨЛҮК, 2-БӨЛҮК, 3-БӨЛҮК), КИРИШҮҮ, КОРУТУНДУ, ПАЙДАЛАНЫЛГАН БУЛАКТАР, АННОТАЦИЯ, ÖZET, ЫРААЗЫЧЫЛЫК БИЛДИРҮҮ, БЕЛГИЛЕР. Nothing else.
- **Heading 2** for `N.M` subsections (1.1, 2.3…). All CAPS in sample.
- Bullet lines + prose go in `Normal`.

### Editing patterns (XML)
- Locate paragraphs with `re.finditer(r'<w:p\b[^>]*>.*?</w:p>')`, edit by index, `paragraph.replace(old, new, 1)` only on target. Don't global-replace (e.g. `✗` appears in many cells).
- Bold lead-in pattern (§1.4.x): `<w:r><w:rPr><w:b/></w:rPr><w:t>NAME (YEAR)</w:t></w:r>` then normal `<w:r>` for rest.
- Heading style IDs (WPS): body Heading 1 = `pStyle w:val="2"`, TOC entries = `w:val="21"`. Filter style="2" for real chapter starts.
- Add `sys.stdout.reconfigure(encoding='utf-8')` to every fix-script (Windows cp1252 + Cyrillic = crash).
- Re-zipping changes file size by ~190KB (Python zlib vs WPS); uncompressed identical. Verify `zipfile.testzip()`.
- **Windows paths only** (`C:\Users\...`); Unix-style `/tmp/foo` silently no-ops in Read/Write tools.

### Page numbering / headers
- `pgMar w:header="N"` controls vertical position (must be `1417` twips).
- `<w:pageBreakBefore/>` on the Heading 1 *style* for chapter starts — **NOT** `<w:r><w:br w:type="page"/></w:r>` (collides with section breaks → blank pages).
- **Never wrap PAGE field in `<w:drawing>` / `Text Box`** — direct `<w:fldChar>` runs only. Floating text boxes break Google Docs. If `header1.xml` grows past 2 KB, Word may have re-introduced a wrapper.
- Always grep `<w:instrText>` for `TOC ` before inserting a new TOC field.
- Don't blindly dedupe figures by width — verify each "duplicate" has a real proper-sized neighbor in nearby paragraphs first.
- WPS Office can double-insert figures (SVG + separate PNG). Detect via `<wp:extent>` count vs visible figures.

### Text accuracy rules
- Don't trust thesis claims about file structure — `find`/`glob`/`grep` first. Past finds: §2.2.4 listed nonexistent UI components; §3.5 claimed nonexistent `__tests__/`; §3.6.2 listed nonexistent env vars.
- Verify env-vars against `.env*`; deps against `package.json`; runtime declarations against `route.ts`.
- "Edge Functions" vs "Serverless Functions" on Vercel: Edge requires `export const runtime = "edge"`. Default is Node serverless. Don't conflate.
- Vercel uses its own Edge Network (built on AWS), not Cloudflare.
- Body table is canonical; КОРУТУНДУ should match table, not vice versa.
- Legacy/prototype files can mislead — `grep -r "from voice_service import"` before describing role.

### Open Word checklist (after any docx edit)
1. Right-click МАЗМУНУ TOC → *Update Field* → *Update entire table*.
2. Same for СҮРӨТТӨР / ЖАДЫБАЛДАР if figures/tables changed.
3. Verify title page has no number; page i appears on the next page (АННОТАЦИЯ).
4. **For Google Drive sharing: export PDF (`File → Export → Create PDF/XPS`)**, not docx.
