# Handover: Wanderlust Thesis Site

*Last updated: 2026-04-13 (Session 17)*

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 1 — UI/UX Restyle (all 16 pages) | ✅ Complete |
| Phase 2 — Accessibility (WCAG 2.1) | ✅ Complete |
| Voice Chat Page (`/voice-chat`) | ✅ Complete — OpenAI Realtime API via WebSocket, real-time speech-to-speech, ChatGPT-style conversation UI |
| ChatWidget Mic (chat bubble) | ✅ Complete — Dictation mode (record → waveform → confirm/cancel → Whisper STT → text in input) |
| Chat streaming fix | ✅ Complete — SSE buffering bug fixed in `/api/chat` route |
| Phase 3 — Performance (Lighthouse) | ⬜ Not started |
| Phase 4 — SEO | ⬜ Not started |
| Phase 5 — Cross-browser & Responsive | ⬜ Not started |
| Phase 6 — Polish & Content | ⬜ Not started |

---

## Quick Start for Next Session

1. **Hero consistency fix complete.** All pages now match Home's standard: `text-3xl sm:text-4xl md:text-5xl`, `py-4 md:py-6`, description `text-base md:text-lg`. Fixed in Session 18: Destinations, About, Blog, Contact, Practical Info, FAQ, Privacy, Terms.

2. **After hero consistency**, continue with Phase 3–6. See `CLAUDE.md` for full phase specs.

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
- **Hero size inconsistency**: ✅ Resolved — all pages now match Home's standard.
- **Chat widget on Vercel needs OPENAI_API_KEY**: Without it, the API returns mock JSON responses and the streaming reader displays raw JSON. User needs to add `OPENAI_API_KEY` env var in Vercel project settings.

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

**NOT yet restyled (risky — do not touch without explicit user confirmation):**
- `src/app/layout.tsx` — Root layout. Fonts are Geist. `font-serif` falls back to system serif, which works fine. Do NOT add Cormorant Garamond — it broke the site once.

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
- **OpenAI Realtime transcription arrives late** — `conversation.item.input_audio_transcription.completed` (user's words) arrives *after* `response.audio_transcript.delta` (assistant starts replying). Insert a placeholder user message on `speech_stopped` and fill it when transcription arrives, otherwise messages appear out of order.

---

## User Preferences

- Prefers one file at a time
- Proceed autonomously on restyle/implementation — don't ask permission for each step (saves tokens)
- When a change is risky (layout.tsx, globals.css), **ask first**
- If site breaks, believe the user and revert immediately
- User is Muslim — responds well to Islamic greetings
