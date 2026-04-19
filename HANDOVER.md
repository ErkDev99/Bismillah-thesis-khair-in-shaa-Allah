# Handover: Wanderlust Thesis Site

*Last updated: 2026-04-19 (Session 25)*

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 1 — UI/UX Restyle (all 16 pages) | ✅ Complete (Art Deco) |
| Phase 1.1 — Real images | ✅ Complete — all 89 images wired via Next.js `<Image>`, gradient placeholders removed |
| **Design System Retheme** (Art Deco → Nature/Green) | 🔄 In progress — homepage + Header + Footer + ChatWidget done (Session 25), 15 pages remaining |
| Phase 2 — Accessibility (WCAG 2.1) | ✅ Complete |
| Voice Chat Page (`/voice-chat`) | ✅ Complete — OpenAI Realtime API via WebSocket, real-time speech-to-speech, ChatGPT-style conversation UI |
| ChatWidget Mic (chat bubble) | ✅ Complete — Dictation mode (record → waveform → confirm/cancel → Whisper STT → text in input) |
| Chat streaming fix | ✅ Complete — SSE buffering bug fixed in `/api/chat` route |
| Dark mode (light/dark toggle) | ✅ Complete — class-based Tailwind v4, ThemeProvider, FOUC prevention, Header toggle |
| Header CTA button | ✅ Complete — Contact link styled as filled emerald button (Session 20; green retheme applied Session 25) |
| QuickSearchBar on homepage | ✅ Complete — destination + duration dropdowns with **instant results panel** showing matching tours with prices (Session 22, upgraded from Session 20) |
| Contact page Google Map | ✅ Complete — Bishkek embed via Google Maps iframe (Session 20) |
| Phase 3 — Performance (Lighthouse) | ✅ Complete — Desktop 96/100/100/100, Mobile ~82/100/100/100 (Session 21) |
| Phase 4 — SEO | ⏭️ Skipped — thesis site, not commercial |
| Phase 5 — Cross-browser & Responsive | ⬜ Not started |
| Phase 6 — Polish & Content | 🔄 In progress — 6.5 trust signals done (review system) |
| Review & Rating System | ✅ Complete — social proof strip, /review (verified form), /reviews (all reviews page) |

---

## Quick Start for Next Session

1. **PRIORITY: Green retheme is in progress.** Homepage, Header, Footer, and ChatWidget are done. 15 pages still use the old amber/Art Deco palette. The design system is Nature/Travel Magazine/emerald (see Design System section below).

2. **Next task: Retheme remaining pages, starting with QuickSearchBar.tsx (#4).** Apply the new emerald/nature palette to all pages listed in the "Pages Needing Green Retheme" section below. Follow the 12-rule restyle checklist. Proceed file by file.

3. **After retheme:** Phase 5 (cross-browser/responsive testing), Phase 6.1 (custom 404), 6.2 (loading states), 6.3 (form validation), 6.4 (micro-interactions).

   **What was done in Session 25:**
   - **Green retheme applied to 3 global components** (Header, Footer, ChatWidget) — these appear on every page, so the entire site now has a consistent emerald nav/footer/chat.
   - **Header.tsx**: `bg-stone-900` → `bg-emerald-950`, all `amber-*` → `emerald-*`, Contact CTA now `bg-emerald-600 text-white rounded-lg`, `tracking-wider` → `tracking-wide`.
   - **Footer.tsx**: `bg-stone-950` → `bg-emerald-950`, Art Deco geometric SVG overlay → radial emerald glow, diamond ornaments → leaf NatureDivider, all amber → emerald.
   - **ChatWidget.tsx**: All amber → emerald, `rounded-full` on toggle button, `rounded-xl` on chat window, `rounded-lg` on message bubbles/inputs/buttons, gradient send button → solid `bg-emerald-600`, prompt bubble bg → `bg-emerald-950`, chat header → `bg-emerald-950`, dark mode refs updated (`stone-900` → `slate-900`).
   - **Build verified**: `next build` passes cleanly with no errors.

   **What was done in Session 24:**
   - **Design system changed** from Luxury/Art Deco (amber + stone, sharp corners, diamond dividers, geometric SVG patterns) to **Nature/Travel Magazine** (emerald + cream, rounded corners, leaf dividers, bright photography).
   - **Homepage fully restyled** (`src/app/page.tsx`):
     - Hero overlay **removed entirely** (was `bg-black/50`; now only a subtle bottom gradient `from-black/40 via-transparent to-transparent`) — teacher said photos were too dark.
     - **AnimatedHeadline** added — rotating country names ("Kazakhstan" → "Kyrgyzstan" → "Uzbekistan") in emerald green with spring animation, using framer-motion.
     - All `amber-*` colors → `emerald-*` throughout.
     - `DiamondDivider` → `NatureDivider` (leaf SVG icon between horizontal lines).
     - Art Deco corner accents removed from all cards.
     - All sharp edges → `rounded-xl` / `rounded-lg` (cards, buttons, badges).
     - DifficultyBadge "Easy" changed from amber to emerald (semantic: green = easy). Stars kept amber (universal convention).
     - Section backgrounds: alternating `emerald-50` / `white` / `stone-50` (light mode), `slate-950` / `slate-900` (dark mode).
     - Newsletter + CTA banner: deep forest green (`emerald-950` / `emerald-900`) instead of stone dark.
     - CTA banner globe icon now in a circle (was a rotated diamond).
   - **New component**: `src/components/home/AnimatedHeadline.tsx` — client component, framer-motion spring animation.
   - **New dependency**: `framer-motion` installed.
   - **Build verified**: `next build` passes cleanly with no errors.

   **What was done in Session 23:**
   - **Review & rating system** (teacher feedback on ratings): Three-part implementation —
     1. **Social proof strip** (homepage, between Why Choose Us and Featured Tours): aggregate 4.9★ rating, "524 verified travelers" badge, 3 mini review cards, "Leave a review" link, **"View All Reviews" button** (new).
     2. **`/review` page**: Multi-step form — Step 1 verifies booking ref + email against 6 mock credentials (WL-2025-001 to WL-2025-006); Step 2 collects stars/title/body/name/recommend; saves to `localStorage("wanderlust-reviews")` with auto-captured ISO date. Success screen links to `/reviews`.
     3. **`/reviews` page** (new): Client component showing 6 hardcoded seed reviews (always visible) + any localStorage-submitted reviews at the top with "New" badge. Stats bar (avg rating + total count recalculates dynamically). "Leave a Review" + "Back to Home" CTAs at bottom.
   - **Homepage testimonials section**: Renamed hardcoded names (Sarah M. → Emma B., David K. → Lars M., Aiko T. → Hana K.) so demo submissions don't duplicate them. Added **"Read All Reviews"** (outlined) + **"Leave a Review"** (solid amber) buttons below the 3-card grid.
   - **Mock booking credentials** (for demo): `WL-2025-001 / sarah@example.com`, `WL-2025-002 / david@example.com`, `WL-2025-003 / aiko@example.com`, `WL-2024-004 / maria@example.com`, `WL-2024-005 / john@example.com`, `WL-2025-006 / elena@example.com`.

   **What was done in Session 22:**
   - **QuickSearchBar upgraded** (teacher feedback): Search bar now shows instant results with prices when a country is selected. User picks a country → matching tours appear below with thumbnail, name, duration, difficulty, and price. Duration dropdown dynamically updates to only show ranges available for the selected country. "Find Tours" button becomes "See All Tours" when results are visible. Addresses teacher's concern: "user shouldn't have to go to the tours page to find prices — everything within 1-2 clicks." Files changed: `QuickSearchBar.tsx` (rewritten), `page.tsx` (passes slim tour data instead of destination strings).

   **What was done in Session 21:**
   - **Lighthouse audit (Phase 3)**: Ran Lighthouse CLI against production build. Baseline: Desktop Perf 75, A11y/BP/SEO all 100.
   - **`fetchPriority="high"` on hero image**: Next.js `priority` prop wasn't emitting the HTML `fetchpriority` attribute. Added explicit `fetchPriority="high"` to the hero `<Image>` in `page.tsx`. Desktop LCP dropped from 2.4s → 1.4s, Performance jumped 75 → 96.
   - **aria-label mismatches fixed**: Lighthouse flagged `label-content-name-mismatch` on 7 elements — `aria-label` text didn't contain the visible text, breaking voice-control software. Fixed by removing redundant aria-labels on "View all tours" / "All destinations" / destination cards (visible text is descriptive enough), and changing "View details for X" → "View Tour: X" to contain the visible "View Tour" text. Fixed across `page.tsx`, `tours/page.tsx`, `destinations/[slug]/page.tsx`.
   - **Final scores**: Desktop 96/100/100/100. Mobile 72–85 (high variance from simulated throttling; LCP ~4.2s driven by hero.jpg over simulated slow 4G). Lighthouse HTML reports saved in `lighthouse-reports/`.
   - **Mobile LCP opportunity**: `public/images/hero/hero.jpg` is 1.7 MB source. Compressing to ~300–400 KB via squoosh.app/tinyjpg.com would push mobile LCP from 4.2s → ~2.5s and likely bring mobile performance above 90.

   **Sessions 16–20 summary:**
   - S20: QuickSearchBar on homepage, Header Contact CTA button, Google Maps on contact page, tours page reads URL params
   - S19: Wired all 89 images, tours/destinations listing headers got hero.jpg background, team photo framing fix
   - S18: Dark mode toggle (class-based Tailwind v4, ThemeProvider, FOUC prevention), header responsive fix, image folder structure
   - S17: Vercel deployment fix, voice chat production URLs, hero consistency
   - S16: Chat SSE streaming fix, Voice Chat UI redesign (ChatGPT-style), message ordering fix

---

## Open Issues

- **Focus ring contrast (WCAG 1.4.11)**: Homepage now uses `focus:ring-emerald-*` (better contrast than amber). Other pages still have `focus:ring-amber-500` on white bg = 2.15:1 (fails 3:1). Will be fixed as pages are rethemed. Doesn't affect Lighthouse score (still 100) but is a real WCAG gap.
- **Kyrgyz TTS quality**: gTTS fallback for Kyrgyz is mediocre. Low priority.
- **WebSocket URL**: Voice-chat page uses `NEXT_PUBLIC_VOICE_WS_URL` env var for production (Render backend), falls back to `ws://localhost:8001` for dev.
- **Team photo cropping**: `/about` uses `h-72 object-cover object-[center_20%]`. If any face looks wrong, switch to per-member `objectPosition`.
- **Chat widget on Vercel needs OPENAI_API_KEY**: Without it, the API returns mock JSON and streaming displays raw JSON.
- **Hydration error from browser extension**: Ad-blocker extension rewrites `<head>` in dev only. Not a code bug — ignore in dev, verify in incognito/production.
- **No removals policy**: Only additive changes unless user explicitly asks for a cut.
- **Mobile Lighthouse performance (~82)**: Hero source image `hero.jpg` is 1.7 MB — compressing to ~300–400 KB would improve mobile LCP significantly. Desktop is fine at 96.

---

## Files Completed (Phase 1 Restyle)

1. `src/app/page.tsx` — Homepage
2. `src/components/layout/Header.tsx` — Sticky nav
3. `src/components/layout/Footer.tsx` — 4-column footer
4. `src/components/chat/ChatWidget.tsx` — Floating chat widget
5. `src/app/tours/page.tsx` — Tours listing
6. `src/app/tours/[slug]/page.tsx` — Tour detail
7. `src/app/destinations/page.tsx` — Destinations listing
8. `src/app/destinations/[slug]/page.tsx` — Destination detail
9. `src/app/about/page.tsx` — About page
10. `src/app/contact/page.tsx` — Contact page
11. `src/app/practical-info/page.tsx` — Practical info
12. `src/app/faq/page.tsx` — FAQ page
13. `src/app/blog/page.tsx` — Blog listing
14. `src/app/blog/[slug]/page.tsx` — Blog post detail
15. `src/app/privacy/page.tsx` — Privacy policy
16. `src/app/terms/page.tsx` — Terms of service

17. `src/components/ThemeProvider.tsx` — Dark mode context provider (Session 18)
18. `src/components/home/QuickSearchBar.tsx` — Homepage quick-search bar with instant results panel: pick country → see tours with prices inline (Session 20, upgraded Session 22)
19. `src/app/review/page.tsx` — Multi-step verified review form: booking ref + email verification → star rating + review fields → success with link to /reviews (Session 23)
20. `src/app/reviews/page.tsx` — All reviews page: 6 seed reviews always visible + dynamically reads localStorage submitted reviews, shows them at top with "New" badge (Session 23)
21. `src/components/home/AnimatedHeadline.tsx` — Client component, framer-motion spring animation for rotating country names in hero (Session 24)

**NOT yet restyled (risky — do not touch without explicit user confirmation):**
- `src/app/layout.tsx` — Root layout. Fonts are Geist. `font-serif` falls back to system serif, which works fine. Do NOT add Cormorant Garamond — it broke the site once. **Session 18 changes:** Added ThemeProvider wrapper, `suppressHydrationWarning` on `<html>`, FOUC-prevention inline script in `<head>`, dark variant on skip-to-content link.

**DO NOT TOUCH:**
- `src/app/globals.css` — caused horizontal overflow bug TWICE. `git reset --hard` both times.
- `voice-actor/main.py` — Backend with REST + WebSocket proxy endpoints. All working. Do not touch.

---

## Pages Needing Green Retheme

The homepage (`src/app/page.tsx`) was restyled in Session 24. Header, Footer, and ChatWidget were restyled in Session 25. The remaining 15 pages still use the old amber/Art Deco palette and need to be converted. Apply the new design system (see section below) to each file.

**Priority order** (continue from #4 — QuickSearchBar):

| # | File | Notes |
|---|------|-------|
| 1 | ~~`src/components/layout/Header.tsx`~~ | ✅ Done (Session 25) |
| 2 | ~~`src/components/layout/Footer.tsx`~~ | ✅ Done (Session 25) |
| 3 | ~~`src/components/chat/ChatWidget.tsx`~~ | ✅ Done (Session 25) |
| 4 | `src/components/home/QuickSearchBar.tsx` | **Next** — Homepage search bar — amber accents → emerald (high visibility, on homepage) |
| 5 | `src/app/tours/page.tsx` | Tours listing — cards, filters, sort — amber → emerald |
| 6 | `src/app/tours/[slug]/page.tsx` | Tour detail — amber → emerald, remove Art Deco patterns |
| 7 | `src/app/destinations/page.tsx` | Destinations listing — amber → emerald |
| 8 | `src/app/destinations/[slug]/page.tsx` | Destination detail — amber → emerald |
| 9 | `src/app/about/page.tsx` | About page — amber → emerald |
| 10 | `src/app/contact/page.tsx` | Contact form — amber → emerald |
| 11 | `src/app/practical-info/page.tsx` | Travel tips — amber → emerald |
| 12 | `src/app/faq/page.tsx` | FAQ accordion — amber → emerald |
| 13 | `src/app/blog/page.tsx` | Blog listing — amber → emerald |
| 14 | `src/app/blog/[slug]/page.tsx` | Blog post — amber → emerald |
| 15 | `src/app/review/page.tsx` | Review form — amber → emerald |
| 16 | `src/app/reviews/page.tsx` | All reviews — amber → emerald |
| 17 | `src/app/privacy/page.tsx` | Privacy — amber → emerald |
| 18 | `src/app/terms/page.tsx` | Terms — amber → emerald |

---

## Voice Integration Summary

**Backend:** `voice-actor/main.py` (FastAPI on port 8001) — **one service, three endpoints:**
- `POST /transcribe-voice` — Whisper-1 STT (used by ChatWidget dictation mic)
- `POST /generate-voice` — OpenAI TTS tts-1 + gTTS Kyrgyz fallback (not currently used by frontend)
- `WS /ws/realtime` — WebSocket proxy to OpenAI Realtime API (used by Voice Chat page only)

**Run:** `cd voice-actor && python main.py` → listens on `http://127.0.0.1:8001`
- Requires `OPENAI_API_KEY` in `voice-actor/.env`
- Next.js rewrites `/voice/:path*` → `http://localhost:8001/:path*` for REST endpoints (see `next.config.ts`)
- WebSocket connects directly to `ws://localhost:8001/ws/realtime` (bypasses Next.js rewrites)

**Voice Chat page (`/voice-chat`)** — Real-time, like ChatGPT/Claude voice:
- Opens WebSocket → streams mic audio as PCM16 24kHz → OpenAI Realtime API processes speech-to-speech → audio streams back
- Server-side VAD (no client-side VAD needed)
- Latency: ~0.5-1s

**ChatWidget mic (chat bubble)** — Dictation mode (like ChatGPT's "Dictate"):
- Click mic → recording starts, waveform shown via AnalyserNode, X (cancel) + ✓ (confirm) buttons
- Click ✓ → audio sent to `/voice/transcribe-voice` (Whisper STT) → transcribed text fills the input field
- User clicks send arrow to send — no auto-send, no voice reply
- Latency: ~2-3s (Whisper processing)

**Language routing:** `src/lib/voiceApi.ts:detectLang()` — Kyrgyz-specific Unicode chars → `ky`, Cyrillic → `ru`, else → `en`. Sends `{ text, lang }` to TTS endpoint.

**Chat API:** `POST /api/chat` — shape `{ messages: [{role, content}], voice?: boolean }` → text: streaming plain text; voice: full JSON `{ message }`.

**No auth** — source project had JWT Bearer tokens; all removed. Do not reintroduce.

---

## Design System: Nature / Travel Magazine (Session 24)

> **Changed from Art Deco/amber to Nature/Travel Magazine/emerald in Session 24.** Teacher's feedback: "Kyrgyzstan is green — use green, it's pleasant to the eyes." The old amber/gold Art Deco read as Middle Eastern luxury; the new green palette matches Central Asian mountain landscapes.

### Color Palette
| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| Primary accent | `emerald-600` / `emerald-700` | `emerald-400` / `emerald-500` |
| Text accent (labels, links) | `text-emerald-700` | `text-emerald-400` |
| Text heading highlight | `text-emerald-100` (dark bg) | `text-emerald-100` |
| Section bg (tinted) | `bg-emerald-50` | `bg-slate-950` |
| Section bg (neutral) | `bg-stone-50` or `bg-white` | `bg-slate-900` |
| Dark sections (newsletter, CTA) | `bg-emerald-950` | `bg-emerald-950` |
| Card bg | `bg-white` | `bg-slate-900` |
| Card border | `border-stone-200 hover:border-emerald-400` | `border-slate-800 hover:border-emerald-600` |
| Body text | `text-stone-600` | `text-stone-400` |
| Stars (ratings) | `text-amber-400` (keep amber — universal) | `text-amber-400` |

### Typography
- **Headings**: `font-serif` on all `h1`, `h2`, `h3`
- **Labels/eyebrows**: `uppercase tracking-[0.3em] text-xs text-emerald-700 dark:text-emerald-400`
- **Buttons/CTAs**: `tracking-wide` (not `tracking-wider` — softer than Art Deco)
- **Body text minimum**: `text-stone-600 dark:text-stone-400` (stone-500 fails contrast)

### Shape Language
- **Rounded corners everywhere** — `rounded-xl` on cards, `rounded-lg` on buttons/inputs/badges
- `rounded-full` for DifficultyBadge pills, avatar circles
- Cards: `border border-stone-200 dark:border-slate-800 hover:border-emerald-400 rounded-xl`

### Nature Ornamental Elements

**Nature Divider (replaces Diamond Divider):**
```jsx
<div className="flex items-center justify-center gap-3" aria-hidden="true">
  <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
  <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
  </svg>
  <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
</div>
```

**Radial Emerald Glow (dark sections):**
```jsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />
```

**Section Eyebrow** (above each h2):
```jsx
<p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
  Section Label
</p>
```

**NO Art Deco elements** — remove all corner accents, diamond dividers, geometric SVG patterns from pages as they're rethemed.

### Buttons
- **Primary**: `bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg tracking-wide`
- **Secondary/Ghost**: `border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg tracking-wide`
- **On dark bg**: `bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg`

### Hero Image Treatment
- **NO dark overlay** on hero photos — teacher explicitly said "remove that darkness"
- Use only a subtle bottom gradient: `bg-gradient-to-t from-black/40 via-transparent to-transparent`
- Add `drop-shadow-md` to text for readability against bright photos

### DifficultyBadge
- Easy: emerald (green = easy, semantic)
- Moderate: orange (unchanged)
- Challenging: red (unchanged)
- All use `rounded-full` pill shape

### How to Restyle a File (12-rule checklist)
1. Replace all `amber-*` → `emerald-*` (except star ratings — keep `text-amber-400` for stars)
2. Replace `stone-900`/`stone-950` dark bg → `slate-900`/`slate-950`; `bg-amber-50` → `bg-emerald-50`
3. Add `rounded-xl` to cards, `rounded-lg` to buttons/inputs/badges
4. Replace `DiamondDivider` with `NatureDivider` (leaf icon)
5. Remove Art Deco corner accents (`border-t-2 border-l-2` corner elements)
6. Remove geometric SVG pattern overlays from dark sections
7. Keep `font-serif` on all `h1`, `h2`, `h3`
8. Keep eyebrow labels but change color to `text-emerald-700 dark:text-emerald-400`
9. Add full `dark:` variants to every element
10. Add `aria-hidden="true"` to decorative elements, `aria-label`/`aria-labelledby` to sections
11. Use new button styles (solid emerald, not gradient)
12. Page wrapper: `<div>` (NOT `<main>`) with `min-h-screen bg-emerald-50 dark:bg-slate-950`

---

## Lessons Learned

- **`globals.css` is off-limits** — any styling edit there caused horizontal overflow twice (required `git reset --hard` to recover). All design via component-level Tailwind only.
- **`layout.tsx` fonts are Geist** — `font-serif` falls back to system serif and works. Do not add Cormorant Garamond without explicit user confirmation and a safe Next.js font-optimizer plan.
- **Nested `<main>` bug** — layout.tsx wraps everything in `<main id="main-content">`. Every page must use `<div>` as its root, not `<main>`.
- **SVG pattern IDs must be unique per file** — duplicate IDs across pages cause pattern rendering bugs.
- **blog/page.tsx is a client component** — cannot use `export const metadata`. Keep the inline comment noting this.
- **`flex-1` inside `overflow-y-auto`** — always pair with `min-h-0` on the flex child, and use `el.scrollTop = el.scrollHeight` (not `scrollIntoView`) to confine scrolling to the container.
- **Windows cp1252 kills non-ASCII `print()`** — `voice-actor/main.py` runs on Windows where the console defaults to cp1252. Any `print()` with emojis, Cyrillic, or other non-ASCII chars throws `UnicodeEncodeError` which becomes a 500 to the browser. **Never print raw user text or emojis in voice-actor.** Use `print(f"[ASR] Transcript ({len(text)} chars)")` style instead.
- **SSE streaming needs line buffering** — OpenAI SSE `data: {...}\n\n` lines can split across TCP chunks. A naive `text.split("\n")` per chunk drops partial lines. Must buffer incomplete lines across `transform()` calls and process in `flush()`.
- **globals.css dark variant is safe** — `@custom-variant dark (&:where(.dark, .dark *));` is a Tailwind config directive, not a layout style. It was added in Session 18 without triggering the horizontal overflow bug. The ban on `globals.css` applies to layout-affecting CSS rules, not Tailwind variant configuration.
- **Dark mode FOUC prevention** — Next.js server-renders without knowing the user's theme preference. An inline `<script>` in `<head>` reads localStorage and adds the `dark` class before paint. `suppressHydrationWarning` on `<html>` prevents React from complaining about the class mismatch between server and client.
- **OpenAI Realtime transcription arrives late** — `conversation.item.input_audio_transcription.completed` (user's words) arrives *after* `response.audio_transcript.delta` (assistant starts replying). Insert a placeholder user message on `speech_stopped` and fill it when transcription arrives, otherwise messages appear out of order.
- **`useSearchParams` requires Suspense in Next.js 15+** — any client component calling `useSearchParams()` must be wrapped in `<Suspense>` or the build fails. Pattern used in Session 20 for tours page: rename the original component to `ToursPageInner`, keep the default export as a thin wrapper that renders `<Suspense fallback={...}><ToursPageInner /></Suspense>`.
- **Next.js `priority` doesn't always emit `fetchpriority`** — In Next.js 16, the `priority` prop on `<Image>` removes `loading="lazy"` but may not emit the HTML `fetchpriority="high"` attribute. Adding explicit `fetchPriority="high"` prop fixed this and dropped desktop LCP from 2.4s → 1.4s. Always verify rendered HTML with `curl` when optimizing LCP.
- **aria-label must contain visible text** — If a link/button has visible text "View Tour" but `aria-label="View details for X"`, voice-control users can't activate it by saying the visible text. Either remove the aria-label (let visible text be the accessible name) or ensure the aria-label starts with the visible text (e.g., "View Tour: X").
- **Lighthouse mobile scores are highly variable** — Simulated 4x CPU throttling + slow 4G causes 10–15 point swings between runs. Don't chase small mobile improvements; focus on desktop scores for thesis defense.
- **Google Maps embed needs no API key** — `https://www.google.com/maps?q=LOCATION&output=embed` used in an `<iframe>` works without any billing setup. Lower fidelity than the official Embed API but fine for a thesis site.

---

## User Preferences

- Prefers one file at a time
- Proceed autonomously on restyle/implementation — don't ask permission for each step (saves tokens)
- When a change is risky (layout.tsx, globals.css), **ask first**
- If site breaks, believe the user and revert immediately
- User is Muslim — responds well to Islamic greetings
- **Don't remove things from the site** (Session 20). User is not a web-dev expert and trusts me to lead, but worries the site will "lack something" if sections/links are cut. Only additive changes; if something seems redundant, offer to merge or enhance, not delete.
- When presenting design tradeoffs, give 2–3 labeled options (A/B/C) with pros/cons + my recommendation. User picked Option A for the Header CTA this way — works well for visible UX decisions where taste matters.
