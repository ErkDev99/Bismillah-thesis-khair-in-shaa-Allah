# Handover: Wanderlust Thesis Site

*Last updated: 2026-04-12 (Session 11)*

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 1 — UI/UX Restyle (all 16 pages) | ✅ Complete |
| Phase 2 — Accessibility (WCAG 2.1) | ✅ Complete |
| Voice Chat Integration | ✅ Code complete — needs browser test + commit |
| Phase 3 — Performance (Lighthouse) | ⬜ Not started |
| Phase 4 — SEO | ⬜ Not started |
| Phase 5 — Cross-browser & Responsive | ⬜ Not started |
| Phase 6 — Polish & Content | ⬜ Not started |

---

## Quick Start for Next Session

1. **Browser test + commit voice integration** (still uncommitted):
   ```bash
   # Terminal 1:
   cd voice-actor && python main.py
   # Terminal 2:
   npm run dev
   ```
   Test: ChatWidget mic button (any page) + `/voice-chat` immersive page.
   Then commit:
   ```bash
   git add voice-actor src/lib/voiceApi.ts src/app/voice-chat src/components/chat/ChatWidget.tsx next.config.ts HANDOVER.md
   git commit -m "Add voice chat: STT/TTS, ChatWidget mic, /voice-chat immersive mode, language routing"
   git push
   ```

2. **After voice is committed**, ask user which phase to tackle next (3–6). See `CLAUDE.md` for full phase specs.

---

## Open Issues

- **Focus ring contrast (WCAG 1.4.11)**: `focus:ring-amber-500` on white bg = 2.15:1 (fails 3:1 for UI). ~20 instances in form/card contexts. Deferred — flag before Phase 3 audit.
- **Kyrgyz TTS quality**: gTTS fallback for Kyrgyz is mediocre. `voice_service.py` aitil.kg TTS is better but requires Kyrgyz text. Low priority.
- **VAD sensitivity**: `SPEECH_THRESHOLD = 0.018` RMS may need tuning per mic/environment.

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
- `src/components/chat/ChatWidget.tsx` — Chat bubble is working correctly: positioned bottom-right, does NOT cover page content/descriptions. Do not touch until user explicitly asks.

---

## Voice Integration Summary

**Recommended backend:** `voice-actor/main.py` (OpenAI Whisper-1 STT + OpenAI TTS tts-1 + gTTS fallback for Kyrgyz)
- Run: `cd voice-actor && python main.py` → listens on `http://127.0.0.1:8001`
- Requires `OPENAI_API_KEY` in `voice-actor/.env`
- Next.js rewrites `/voice/:path*` → `http://localhost:8001/:path*` (see `next.config.ts`)

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

---

## User Preferences

- Prefers one file at a time
- Proceed autonomously on restyle/implementation — don't ask permission for each step (saves tokens)
- When a change is risky (layout.tsx, globals.css), **ask first**
- If site breaks, believe the user and revert immediately
- User is Muslim — responds well to Islamic greetings
