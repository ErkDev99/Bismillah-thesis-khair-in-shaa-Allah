# Wanderlust – Bachelor's Thesis Website
## Master Plan: Professional-Grade Website for Academic Evaluation

> **Note:** For active session context (what's been restyled, what's next, current design system, user preferences, lessons learned), see **`HANDOVER.md`**. This file holds the long-term master plan — site structure, quality tests, execution phases, and design principles that don't change session to session.

---

## Project Context

This is a Central Asian travel & tourism platform (Kazakhstan, Kyrgyzstan, Uzbekistan) built with Next.js 16, React 19, and Tailwind CSS v4. It is being evaluated as a bachelor's thesis project. The site needs to pass a variety of standard website quality tests and must look and feel professionally designed — not amateurish.

**Teacher's feedback (starting point):**
- The site does not pass basic visibility/usability tests
- Users have to scroll too much to find what they need
- Everything important should be perceivable without excessive scrolling
- The UI/UX does not feel comfortable for a normal user

---

## Current Site Structure (What We Have)

```
Pages:
  /                  → Home (hero + featured tours + destinations + testimonials + newsletter)
  /tours             → All tours with filters/sorting sidebar
  /tours/[slug]      → Individual tour detail
  /destinations      → All destinations
  /destinations/[slug] → Individual destination detail
  /about             → About the company + team
  /blog              → Blog listing
  /blog/[slug]       → Individual blog post
  /contact           → Contact form
  /practical-info    → Travel tips (visas, currency, health, packing)
  /faq               → FAQ accordion
  /privacy           → Privacy policy
  /terms             → Terms of service

Components:
  Header.tsx         → Sticky top nav with 7 links + mobile hamburger
  Footer.tsx         → 4-column footer (links, contact, support)
  ChatWidget.tsx     → Floating AI chat assistant

Data:
  tours.ts           → 6 tours with full 10-day itineraries
  destinations.ts    → 6 destinations with detailed info
  blog.ts            → Blog posts

Missing:
  - Real images (currently all gradients/placeholders)
  - Real booking/payment flow
  - User accounts
```

---

## Website Quality Tests — Complete List

These are the standard tests applied to professional websites. We will go through them one by one, in this order of priority.

### TIER 1 — Critical (Must Pass for Any Thesis)

| # | Test Category | What It Checks | Status |
|---|---|---|---|
| 1 | **UI/UX & Visual Design** | Professional look, consistent design system, visual hierarchy, color usage | ❌ Needs major work |
| 2 | **Above-the-Fold / First Impression** | What does the user see in the first 3 seconds? Is it clear what the site does? | ❌ Hero too tall, content buried |
| 3 | **Navigation & Information Architecture** | Can users find what they need? Is the menu logical? | ⚠️ 7 links, no grouping |
| 4 | **Responsiveness** | Does the site work on mobile, tablet, and desktop? | ⚠️ Partially done |
| 5 | **Accessibility (WCAG 2.1)** | Color contrast, keyboard nav, ARIA labels, screen reader support | ❌ Not checked |
| 6 | **Performance (Core Web Vitals)** | Page load speed, Lighthouse score (target: 90+) | ❌ Not measured |

### TIER 2 — Important (Expected in a Professional Site)

| # | Test Category | What It Checks | Status |
|---|---|---|---|
| 7 | **Content Quality** | Clear, readable, professional writing. No placeholder text. | ⚠️ Good but images missing |
| 8 | **Cross-Browser Compatibility** | Works in Chrome, Firefox, Safari, Edge | ❌ Not tested |
| 9 | **SEO Basics** | Page titles, meta descriptions, Open Graph, semantic HTML | ⚠️ Minimal |
| 10 | **Form Usability & Validation** | Contact form works, validates input, gives feedback | ❌ Not tested |
| 11 | **Broken Links / 404 Handling** | All internal links work, 404 page exists | ❌ No custom 404 |
| 12 | **Consistency** | Same fonts, colors, spacing patterns everywhere | ⚠️ Mostly consistent |

### TIER 3 — Polish (Distinguishes Good from Excellent)

| # | Test Category | What It Checks | Status |
|---|---|---|---|
| 13 | **Micro-interactions & Animation** | Smooth transitions, hover effects, feedback on actions | ⚠️ Minimal |
| 14 | **Empty/Loading States** | What shows while data loads? What if no results? | ❌ Missing |
| 15 | **Typography Scale** | Proper heading hierarchy (H1→H2→H3), readable line lengths | ⚠️ Needs review |
| 16 | **Cognitive Load** | Is any page overwhelming? Too much at once? | ❌ Homepage too dense |
| 17 | **Trust Signals** | Testimonials, ratings, certifications, contact info visible | ⚠️ Some present |
| 18 | **Print Friendliness** | Does the page print cleanly (for tours/info)? | ❌ Not done |

---

## Root Cause of Teacher's Feedback (Diagnosis)

The teacher's "can't find without scrolling" complaint comes from these specific problems:

### Problem 1: Navigation Has 7 Items With No Visual Priority
The header has: Home, Tours, Destinations, About, Practical Info, Blog, Contact — all the same size and weight. There is no visual distinction between primary actions (Tours, Destinations) and secondary pages (About, Blog, Privacy).

**Fix:** Visually group navigation. Primary nav = Tours, Destinations, Contact. Secondary = About, Blog, Practical Info. Add a prominent CTA button ("Book Now" or "View Tours") in the header.

### Problem 2: No Images — It Looks Like a Prototype
All images are CSS gradients. This makes the site look unfinished. A travel website without photographs feels untrustworthy and amateurish.

**Fix:** Add free, high-quality travel images from Unsplash/Pexels for Central Asia (Kazakhstan, Kyrgyzstan, Uzbekistan).

### Problem 3: Homepage Has Too Many Sections
The homepage currently has: Hero → Featured Tours → Popular Destinations → Testimonials → Newsletter. That is ~5 heavy sections. A first-time visitor is overwhelmed.

**Fix:** Restructure homepage to be shorter and more focused. Each section should have one clear purpose and lead naturally to the next.

### Problem 4: No Visual Hierarchy on Cards
Tour cards all look the same weight. There's no "featured" indicator that draws the eye. Prices, ratings, and CTAs are present but don't stand out enough.

**Fix:** Improve card design — larger images, clearer price/rating, stronger CTA button.

---

## The Execution Plan (Step by Step)

We do this in order. Do NOT skip steps. Each step has a clear goal.

### PHASE 1 — Fix UI/UX (Most Important)
*Goal: Make the site look professional and comfortable to use.*

**Step 1.1 — Add Real Images**
- Source free images from Unsplash (Central Asia: Kazakhstan steppe, Kyrgyz mountains, Uzbekistan architecture, Silk Road, yurts, bazaars)
- Replace all gradient placeholders with real images
- Optimize images for web (use Next.js `<Image>` component properly)

**Step 1.2 — Redesign the Hero Section**
- Reduce hero height from 100vh to ~65vh on desktop
- Add a real background image (mountain/steppe/Silk Road)
- Keep headline + 2 CTA buttons
- Add a visual cue at the bottom (scroll arrow or partial next-section peek)

**Step 1.3 — Improve the Header/Navigation**
- Keep sticky header (this is correct)
- Add a visually distinct CTA button in header (e.g., "Explore Tours" in emerald, styled as a button not a link)
- On desktop: group "About | Blog | Practical Info" together more subtly
- Ensure active page is highlighted

**Step 1.4 — Redesign the Homepage Layout**
- Hero (shorter) → Search/filter bar (quick: destination + dates) → Featured Tours (3 cards) → Why Choose Us (3 icons + text) → Destinations teaser (4 cards) → Testimonials (2-3) → CTA banner
- Each section should be shorter and tighter (less py-20, use py-12 or py-16)

**Step 1.5 — Improve Tour & Destination Cards**
- Larger image area (55-60% of card height)
- Clear price (prominent, top-right badge)
- Star rating visible
- Strong "View Tour" button at bottom
- Hover: slight scale + shadow effect

**Step 1.6 — Improve Typography & Spacing**
- Check all headings follow H1 > H2 > H3 hierarchy
- Ensure body text is 16px minimum, line-height 1.6+
- Consistent section padding
- Remove orphaned words (lines ending with one word)

**Step 1.7 — Footer Cleanup**
- Footer is currently 4 columns — this is fine
- Ensure it has the company name, tagline, social links (even if placeholder), copyright
- Add a "Back to top" button

---

### PHASE 2 — Accessibility (WCAG 2.1)
*Goal: The site works for people with disabilities and passes automated checks.*

**Step 2.1 — Color Contrast**
- All text must have a contrast ratio of at least 4.5:1 (normal text) or 3:1 (large text)
- Tool: Check with browser DevTools or axe extension

**Step 2.2 — Keyboard Navigation**
- Tab through the entire site — every link, button, input must be reachable
- Focus rings must be visible (not hidden)
- Skip-to-content link at top

**Step 2.3 — ARIA & Semantic HTML**
- All images must have descriptive `alt` text
- Forms must have `<label>` elements linked to inputs
- Buttons must have meaningful text (not just "Click here")
- Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>` properly

**Step 2.4 — Screen Reader Compatibility**
- Headings must be in logical order
- Dynamic content (chat widget, filters) must announce changes

---

### PHASE 3 — Performance
*Goal: Lighthouse score 90+ on all four metrics.*

**Step 3.1 — Image Optimization**
- Use Next.js `<Image>` with proper `width`, `height`, and `priority` on above-the-fold images
- Use WebP format
- Lazy-load below-fold images

**Step 3.2 — Code Splitting & Loading**
- Next.js handles this mostly automatically
- Check for large client-side components that could be server components

**Step 3.3 — Core Web Vitals**
- LCP (Largest Contentful Paint): < 2.5s — hero image must load fast
- CLS (Cumulative Layout Shift): < 0.1 — reserve space for images
- INP (Interaction to Next Paint): < 200ms — interactive elements respond fast

**Step 3.4 — Run Lighthouse**
- `npm run build && npm run start` then run Lighthouse in Chrome
- Target: 90+ Performance, 95+ Accessibility, 90+ Best Practices, 90+ SEO

---

### PHASE 4 — SEO
*Goal: The site is discoverable and has proper metadata.*

**Step 4.1 — Page Metadata**
- Every page needs a unique `<title>` and `<meta description>`
- Use Next.js `export const metadata` in each page
- Add Open Graph tags (og:title, og:description, og:image) for social sharing

**Step 4.2 — Semantic Structure**
- One `<h1>` per page
- Meaningful URL slugs (already done via Next.js dynamic routes)

**Step 4.3 — Robots & Sitemap**
- Add `robots.txt`
- Generate `sitemap.xml` (can use next-sitemap package)

---

### PHASE 5 — Cross-Browser & Responsiveness
*Goal: The site works on all major browsers and screen sizes.*

**Step 5.1 — Test on Breakpoints**
- Mobile: 375px (iPhone SE), 390px (iPhone 14)
- Tablet: 768px (iPad)
- Desktop: 1280px, 1440px, 1920px
- Check: Navigation, hero, cards, footer, forms

**Step 5.2 — Cross-Browser**
- Chrome, Firefox, Edge (Safari if possible)
- Check: CSS gradients, sticky header, chat widget, filter sidebar

---

### PHASE 6 — Content & Polish
*Goal: Every page feels complete and professional.*

**Step 6.1 — Add Custom 404 Page**
- `src/app/not-found.tsx` with friendly message + link back to home

**Step 6.2 — Loading States**
- Add loading skeletons for tour/destination cards
- `src/app/loading.tsx` files

**Step 6.3 — Form Validation**
- Contact form: validate email format, required fields
- Show success/error messages after submission

**Step 6.4 — Micro-interactions**
- Smooth scroll behavior
- Button press feedback
- Card hover animations (already partially done — ensure consistent)

**Step 6.5 — Trust Signals**
- Add a "Why Choose Us" or "Our Guarantees" section
- Display star ratings and review counts prominently
- Add partner logos or certifications (even as UI placeholders)

---

## Execution Order Summary

```
Phase 1: UI/UX Redesign     ← START HERE
  1.1 Add real images
  1.2 Redesign hero
  1.3 Improve header/nav
  1.4 Redesign homepage layout
  1.5 Improve cards
  1.6 Fix typography
  1.7 Fix footer

Phase 2: Accessibility
  2.1 Color contrast
  2.2 Keyboard navigation
  2.3 ARIA + semantic HTML
  2.4 Screen reader check

Phase 3: Performance
  3.1 Image optimization
  3.2 Code splitting review
  3.3 Core Web Vitals
  3.4 Lighthouse audit

Phase 4: SEO
  4.1 Page metadata
  4.2 Semantic structure
  4.3 Robots + sitemap

Phase 5: Cross-browser & Responsive
  5.1 Breakpoint testing
  5.2 Browser testing

Phase 6: Polish & Content
  6.1 Custom 404 page
  6.2 Loading states
  6.3 Form validation
  6.4 Micro-interactions
  6.5 Trust signals
```

---

## Design Principles to Follow Throughout

1. **Clarity over cleverness** — The user should never wonder what to click next
2. **Progressive disclosure** — Show the most important thing first; details on demand
3. **Consistency** — Same button styles, same card styles, same spacing everywhere
4. **Whitespace is not wasted space** — Give elements room to breathe
5. **Mobile first** — Design for mobile, scale up to desktop
6. **Real content** — Use real images and real-feeling text (no "Lorem ipsum")
7. **Speed** — A slow site feels broken. Every optimization matters.

---

## Questions to Answer as We Go

- [ ] Do we have access to real photos of Central Asia? (Unsplash is free)
- [ ] Is there a real booking flow needed, or is this a showcase/portfolio site?
- [ ] Does the chat widget actually call an AI API? (It calls /api/chat — is there an API key set up?)
- [ ] What deployment platform will be used? (Vercel, Netlify, etc.) — needed for Lighthouse testing
- [ ] Does the thesis require a user study / testing with real users?

---

## Progress Tracker

> **Phase 1 (UI/UX Redesign) is tracked per-file in `HANDOVER.md`.** See the "Files Completed" and "Files NOT Yet Restyled" sections there for current status. The current design system is **Luxury / Art Deco** (amber + stone palette, serif headings, geometric ornaments) — full specification in HANDOVER.

### Phase 2 — Accessibility
| Step | Task | Status |
|------|------|--------|
| 2.1 | Color contrast | ⬜ Not started |
| 2.2 | Keyboard navigation | ⬜ Not started |
| 2.3 | ARIA + semantic HTML | ⬜ Not started |
| 2.4 | Screen reader check | ⬜ Not started |

### Phase 3 — Performance
| Step | Task | Status |
|------|------|--------|
| 3.1 | Image optimization | ⬜ Not started |
| 3.2 | Code splitting review | ⬜ Not started |
| 3.3 | Core Web Vitals | ⬜ Not started |
| 3.4 | Lighthouse audit | ⬜ Not started |

### Phase 4 — SEO
| Step | Task | Status |
|------|------|--------|
| 4.1 | Page metadata | ⬜ Not started |
| 4.2 | Semantic structure | ⬜ Not started |
| 4.3 | Robots + sitemap | ⬜ Not started |

### Phase 5 — Cross-Browser & Responsiveness
| Step | Task | Status |
|------|------|--------|
| 5.1 | Breakpoint testing | ⬜ Not started |
| 5.2 | Browser testing | ⬜ Not started |

### Phase 6 — Polish & Content
| Step | Task | Status |
|------|------|--------|
| 6.1 | Custom 404 page | ⬜ Not started |
| 6.2 | Loading states | ⬜ Not started |
| 6.3 | Form validation | ⬜ Not started |
| 6.4 | Micro-interactions | ⬜ Not started |
| 6.5 | Trust signals | ⬜ Not started |

> **Lessons learned and safe patterns** (horizontal overflow bug, `globals.css` rule, confirmed safe editing patterns) are documented in `HANDOVER.md`. Read that file before making any changes.

---

*Last updated: 2026-04-11*
*Working together step by step — quality over speed.*
