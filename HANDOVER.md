# Handover: Wanderlust Thesis Site

*Last updated: 2026-04-14 (Session 20)*

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 1 — UI/UX Restyle (all 16 pages) | ✅ Complete |
| Phase 1.1 — Real images | ✅ Complete — all 89 images wired via Next.js `<Image>`, gradient placeholders removed |
| Phase 2 — Accessibility (WCAG 2.1) | ✅ Complete |
| Voice Chat Page (`/voice-chat`) | ✅ Complete — OpenAI Realtime API via WebSocket, real-time speech-to-speech, ChatGPT-style conversation UI |
| ChatWidget Mic (chat bubble) | ✅ Complete — Dictation mode (record → waveform → confirm/cancel → Whisper STT → text in input) |
| Chat streaming fix | ✅ Complete — SSE buffering bug fixed in `/api/chat` route |
| Dark mode (light/dark toggle) | ✅ Complete — class-based Tailwind v4, ThemeProvider, FOUC prevention, Header toggle |
| Header CTA button | ✅ Complete — Contact link styled as filled amber button (Session 20) |
| QuickSearchBar on homepage | ✅ Complete — destination + duration → /tours with query params (Session 20) |
| Contact page Google Map | ✅ Complete — Bishkek embed via Google Maps iframe (Session 20) |
| Phase 3 — Performance (Lighthouse) | ⬜ Not started |
| Phase 4 — SEO | ⬜ Not started |
| Phase 5 — Cross-browser & Responsive | ⬜ Not started |
| Phase 6 — Polish & Content | ⬜ Not started |

---

## Quick Start for Next Session

1. **Phase 1 is fully done**, including the previously-skipped Step 1.4 QuickSearchBar (Session 20). The homepage now flows Hero → **Search bar** → Stats → Why Us → Featured Tours → Destinations → Testimonials → Newsletter → CTA Banner. User explicitly wants **no removals** — keep all 8 sections even though Newsletter + CTA Banner are slightly redundant.

2. **Suggested next task: Phase 4 — SEO metadata** (add `export const metadata` with title/description/OG tags to every page that doesn't have it), or Phase 3.4 Lighthouse audit. Both are additive and low-risk. Phase 6.1 (custom `not-found.tsx`) is another quick win. Avoid any task that involves removing sections/content — user vetoed.

   **What was done in Session 20:**
   - **Google Maps embed on Contact page**: Replaced the "coming soon" placeholder in [contact/page.tsx:MapSection](src/app/contact/page.tsx) with a real Google Maps iframe of Bishkek (`https://www.google.com/maps?q=Bishkek,Kyrgyzstan&z=12&output=embed` — no API key needed for embed). Kept CornerAccents around the iframe, bumped height to `h-80 md:h-96`.
   - **Header CTA (Option A)**: Styled the Contact nav link as a filled amber button (`bg-amber-500 text-stone-900`) on both desktop and mobile. All 7 links preserved — user did **not** want anything removed (including Home). Active state on /contact uses an amber ring instead of the underline used by other links. Mobile version is full-width at bottom of hamburger menu with top spacing. See [Header.tsx:42-68](src/components/layout/Header.tsx#L42-L68) and [Header.tsx:136-166](src/components/layout/Header.tsx#L136-L166).
   - **QuickSearchBar on homepage** (Phase 1.4, finally): New client component [src/components/home/QuickSearchBar.tsx](src/components/home/QuickSearchBar.tsx) with Destination + Duration dropdowns + "Find Tours" button. On submit it `router.push`es to `/tours?destination=X&duration=Y`. Rendered between `<HeroSection />` and the stats bar on [src/app/page.tsx](src/app/page.tsx). Home page stays server component; only the bar itself is client.
   - **Tours page now reads URL params**: [src/app/tours/page.tsx](src/app/tours/page.tsx) — added `useSearchParams()` in `ToursPageInner`, initializes filter state from `?destination=` and `?duration=` query params. Wrapped the page in `<Suspense>` (required by Next.js 15+ for `useSearchParams`).
   - **Hydration error investigation**: User reported a React hydration mismatch on the theme script in layout.tsx. Root cause was a Chrome extension (`chrome-extension://elfaihghhjjoknimpccccmkioofjjfkf/assets/youtube-hulu-vast-ads.js` — an ad blocker) rewriting the `<head>` before React hydrated. Not a code bug. Reproduces only in dev with the extension on; disappears in incognito and in production.
   - **Usability walkthrough** (findings documented but not all actioned): Header nav still flat beyond the Contact CTA; homepage has 8 sections (user wants to keep all); Newsletter + CTA Banner are arguably redundant (user wants to keep both); no quick-search bar WAS the biggest gap — now fixed.

   **What was done in Session 19:**
   - **Wired all 89 images** into the site. Replaced every CSS gradient placeholder with Next.js `<Image>` across 12 pages: home hero, tour cards + detail heroes, destination cards + detail heroes + `thingsToDo` activities, blog cards + article heroes, about page team photos + hero + story section, and `hero.jpg` as background on contact/faq/practical-info/privacy/terms compact headers.
   - **Tours & Destinations listing headers** (`/tours`, `/destinations`) initially had solid dark bg (no image) for "content above the fold" reasons. User flagged the inconsistency; added `hero.jpg` as background with `bg-black/70` overlay (darker than `/about`'s `/50` since these headers are much shorter — stronger overlay keeps amber title readable).
   - **Team photo framing fix**: Original `h-56 object-cover` was cropping heads (hats, tops of heads). Bumped to `h-72 object-cover object-[center_20%]`. The `20%` is a compromise across 4 differently-framed photos — if it needs tuning, lower (e.g. 10%) pulls subjects up, higher (30%) pushes them down.
   - **Removed all unused `GRADIENTS` constant arrays** and one stray `gradient` variable from 9 files after the image wiring was done. Build still passes.

   **What was done in Session 18:**
   - **Dark mode toggle**: Implemented class-based dark mode for Tailwind CSS v4. Added `@custom-variant dark` to `globals.css`, created `src/components/ThemeProvider.tsx` (context + localStorage + system preference), added FOUC-prevention inline script in `layout.tsx`, and sun/moon toggle button in Header. Toggle persists across page loads. No flash on reload.
   - **Header responsive fix**: Toggle was being pushed off-screen on narrower desktop viewports. Fixed by putting the toggle inside the desktop nav flow with tighter spacing (`text-xs px-2` at `md`, `text-sm px-3` at `lg`), and a separate mobile container with toggle + hamburger.
   - **Image folder structure**: Created `public/images/{hero,tours,destinations,blog,team}/`. Provided user with complete 89-image download list (filenames, search keywords, what to look for) mapped to every `image` and `gallery` path in `tours.ts`, `destinations.ts`, and `blog.ts`.

   **What was done in Session 17:**
   - **Vercel deployment fix**: Project had Output Directory misconfigured to "public" instead of `.next`. User had two Vercel projects — deleted the broken one, fixed the remaining one.
   - **Voice chat production URL**: Updated `src/app/voice-chat/page.tsx` WS_URL to use `NEXT_PUBLIC_VOICE_WS_URL` env var (falls back to localhost:8001 for dev). Backend deployed on Render.
   - **Voice chat scroll/viewport fix**: Page was rendering scrolled down with footer visible. Fixed by: `height: calc(100vh - 4rem)` (not minHeight), `overflow: hidden`, `window.scrollTo(0,0)` on mount, and hiding footer + body overflow via useEffect.
   - **`voiceApi.ts` production URL**: `VOICE_BASE` now reads `NEXT_PUBLIC_VOICE_WS_URL` env var for Render backend HTTP endpoints.
   - **Hero consistency (in progress)**: Home page is the reference. Tours page hero updated to match (H1 size, padding, description text). Destinations and About still need fixing.

   **What was done in Session 16:**
   - **Chat streaming fix**: `/api/chat/route.ts` SSE transform had a buffering bug — TCP chunks splitting mid-line caused dropped words in both Russian and English responses. Fixed by accumulating a line buffer across chunks + `flush()` handler.
   - **Voice Chat UI redesign** (`/voice-chat`): Redesigned in-conversation view to match ChatGPT's voice mode:
     - Compact top bar with orb + status + "End" button (was a tall vertical stack)
     - Full-height chat transcript with left/right chat bubbles (was a narrow scrollable field)
     - User/assistant messages styled identically to ChatWidget bubbles
   - **Voice Chat message ordering fix**: User transcription (`conversation.item.input_audio_transcription.completed`) arrived after assistant response started. Fixed by inserting a placeholder user bubble on `speech_stopped`, then filling it when transcription arrives. Shows "Transcribing..." in italic while waiting (~1-2s, normal for Whisper).

---

## Open Issues

- **Focus ring contrast (WCAG 1.4.11)**: `focus:ring-amber-500` on white bg = 2.15:1 (fails 3:1 for UI). ~20 instances in form/card contexts. Deferred — flag before Phase 3 audit.
- **Kyrgyz TTS quality**: gTTS fallback for Kyrgyz is mediocre. Low priority.
- **WebSocket URL**: Voice-chat page now uses `NEXT_PUBLIC_VOICE_WS_URL` env var for production (Render backend), falls back to `ws://localhost:8001` for dev. Backend deployed at `bismillah-thesis-khair-in-shaa-allah.onrender.com`.
- **Hero size inconsistency**: ✅ Resolved — all pages now match Home's standard. Tours/Destinations listing headers also have `hero.jpg` background (Session 19) with `bg-black/70` overlay for the shorter header height.
- **Dark mode**: ✅ Implemented. Class-based (`@custom-variant dark` in globals.css), `ThemeProvider` context, FOUC-prevention script in `<head>`, sun/moon toggle in Header. Persists to localStorage, defaults to system preference. All existing `dark:` classes across the site now work.
- **Images**: ✅ All 89 wired. `hero/hero.jpg` (1), `tours/*.jpg` (24), `destinations/*.jpg` (54), `blog/*.jpg` (6), `team/*.jpg` (4). Data files (`tours.ts`, `destinations.ts`, `blog.ts`) own the paths.
- **Team photo cropping**: Team grid on `/about` uses `h-72 object-cover object-[center_20%]` to handle 4 differently-framed portraits. If any specific face looks wrong, switch to per-member `objectPosition` values rather than a single shared percentage.
- **Chat widget on Vercel needs OPENAI_API_KEY**: Without it, the API returns mock JSON responses and the streaming reader displays raw JSON. User needs to add `OPENAI_API_KEY` env var in Vercel project settings.
- **Hydration error from browser extension**: In dev, an ad-blocker extension (filename `youtube-hulu-vast-ads.js`) rewrites the `<head>` before React hydrates, which mismatches the theme-FOUC `<script>` in layout.tsx. Not a code bug — only appears in dev with the extension enabled. Ignore in dev; verify in incognito or production.
- **No removals policy**: User prefers the site to feel full, not sparse. Do not remove existing sections (Newsletter, CTA Banner, any nav link including Home) even if they seem redundant. Only additive changes unless user explicitly asks for a cut.

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
18. `src/components/home/QuickSearchBar.tsx` — Homepage quick-search bar, destination + duration → /tours (Session 20)

**NOT yet restyled (risky — do not touch without explicit user confirmation):**
- `src/app/layout.tsx` — Root layout. Fonts are Geist. `font-serif` falls back to system serif, which works fine. Do NOT add Cormorant Garamond — it broke the site once. **Session 18 changes:** Added ThemeProvider wrapper, `suppressHydrationWarning` on `<html>`, FOUC-prevention inline script in `<head>`, dark variant on skip-to-content link.

**DO NOT TOUCH:**
- `src/app/globals.css` — caused horizontal overflow bug TWICE. `git reset --hard` both times.
- `voice-actor/main.py` — Backend with REST + WebSocket proxy endpoints. All working. Do not touch.

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

## Design System: Luxury / Art Deco

### Color Palette
| Old | New |
|-----|-----|
| `emerald-*` | `amber-*` |
| `gray-*` | `stone-*` |
| `bg-white` (sections) | alternating `bg-amber-50` / `bg-stone-100` |
| `bg-gray-900` (dark sections) | `bg-stone-900` / `bg-stone-950` / `bg-black` |
| `text-emerald-600` (accent) | `text-amber-700` (light bg) / `text-amber-400` (dark bg) |

### Typography
- **Headings**: `font-serif` on all `h1`, `h2`, `h3`
- **Labels/eyebrows**: `uppercase tracking-[0.2em]` or `tracking-[0.3em]`, `text-xs`, `text-amber-700 dark:text-amber-400`
- **Buttons/CTAs**: `uppercase tracking-wider`
- **Body text minimum**: `text-stone-600 dark:text-stone-400` (stone-500 fails contrast)

### Shape Language
- **NO rounded corners** — remove all `rounded-xl`, `rounded-2xl`, `rounded-lg` from cards/buttons/inputs
- Exception: `rounded-full` OK for animation dots and avatar circles
- Cards: `border border-stone-200 dark:border-stone-800 hover:border-amber-400`

### Art Deco Ornamental Elements

**Diamond Divider:**
```jsx
<div className="flex items-center justify-center gap-2" aria-hidden="true">
  <div className="h-px w-12 md:w-20 bg-amber-500/50" />
  <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
  <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
  <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
  <div className="h-px w-12 md:w-20 bg-amber-500/50" />
</div>
```

**Corner Accents** (4 corners on cards):
```jsx
<div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
```

**Geometric SVG Pattern** (dark sections — use unique `id` per file):
```jsx
<div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
  <svg width="100%" height="100%">
    <pattern id="unique-id" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5"/>
      <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#unique-id)"/>
  </svg>
</div>
```

**Radial Amber Glow:**
```jsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />
```

**Section Eyebrow** (above each h2):
```jsx
<p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
  Section Label
</p>
```

### Buttons
- **Primary**: `bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white uppercase tracking-wider`
- **Secondary/Ghost**: `border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-white uppercase tracking-wider`

### Gradients (placeholder images)
```js
const GRADIENTS = [
  "from-amber-800 via-amber-900 to-stone-950",
  "from-stone-700 via-stone-800 to-stone-950",
  "from-amber-700 via-orange-800 to-amber-950",
  "from-stone-600 via-stone-700 to-stone-900",
  "from-amber-600 via-amber-700 to-stone-900",
  "from-stone-800 via-stone-900 to-black",
];
```

### How to Restyle a File (15-rule checklist)
1. Replace `emerald-*` → `amber-*`, `gray-*` → `stone-*`
2. Remove all `rounded-xl`, `rounded-2xl`, `rounded-lg` (keep `rounded-full` only for dots/avatars)
3. Add `font-serif` to all `h1`, `h2`, `h3`
4. Add eyebrow labels above section headings
5. Add diamond dividers where appropriate
6. Replace `<hr>` with diamond dividers
7. Add corner accents to cards
8. Add geometric SVG pattern + radial glow to dark hero/header sections
9. Add full `dark:` variants to every element
10. Add `aria-hidden="true"` to decorative elements, `aria-label`/`aria-labelledby` to sections
11. Add `htmlFor`/`id` pairs to all label+input/select combos
12. Use GRADIENTS array for placeholder image backgrounds
13. Use standard button styles (primary gradient, secondary ghost)
14. Replace `bg-white` sections with `bg-amber-50 dark:bg-stone-950` or `bg-stone-100 dark:bg-stone-900`
15. Page wrapper: `<div>` (NOT `<main>` — layout.tsx owns the single `<main id="main-content">`) with `min-h-screen bg-amber-50 dark:bg-stone-950`

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
