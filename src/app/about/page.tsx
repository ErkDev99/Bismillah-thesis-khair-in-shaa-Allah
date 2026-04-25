"use client";

// src/app/about/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component (uses useLocale for EN/RU translations).
// Style: Nature / Travel Magazine — emerald + cream palette, serif headings,
// leaf ornaments, rounded corners, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";

// ─── Nature Divider — leaf ornament ──────────────────────────────────────────
function NatureDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
      <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
      </svg>
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { t } = useLocale();
  return (
    <section
      aria-label={t.about.hero.ariaLabel}
      className="relative text-center text-white overflow-hidden"
    >
      <Image
        src="/images/hero/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/45" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-emerald-400/70" />
          <span className="text-emerald-300 text-xs tracking-[0.3em] uppercase drop-shadow-md">{t.about.hero.since}</span>
          <div className="h-px w-12 md:w-20 bg-emerald-400/70" />
        </div>

        <p className="text-emerald-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
          {t.about.hero.eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-lg">
          {t.about.hero.titlePrefix} <span className="text-emerald-300">{t.about.hero.titleAccent}</span>
        </h1>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed drop-shadow-md">
          {t.about.hero.subtitle}
        </p>

        <NatureDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 2 — STORY
// ═════════════════════════════════════════════════════════════════════════════
function StorySection() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="story-heading"
      className="py-16 md:py-20 px-4 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Image */}
          <div className="group relative h-80 lg:h-[450px] overflow-hidden rounded-xl">
            <Image
              src="/images/hero/hero.jpg"
              alt={t.about.story.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative monogram */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm border-2 border-emerald-500/40">
                <span className="text-emerald-400 text-3xl font-serif">W</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
              {t.about.story.eyebrow}
            </p>
            <h2
              id="story-heading"
              className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-5 font-serif"
            >
              {t.about.story.title}
            </h2>
            <NatureDivider className="mb-6 !justify-start" />
            <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.about.story.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 3 — MISSION
// ═════════════════════════════════════════════════════════════════════════════
function MissionSection() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="mission-heading"
      className="py-16 md:py-20 px-4 bg-stone-100 dark:bg-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors rounded-xl p-10 md:p-14 text-center">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.about.mission.eyebrow}
          </p>
          <h2
            id="mission-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-5 font-serif"
          >
            {t.about.mission.title}
          </h2>
          <NatureDivider className="mb-6" />
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic">
            {t.about.mission.body}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 4 — TEAM
// ═════════════════════════════════════════════════════════════════════════════
const teamImages = [
  "/images/team/aibek.jpg",
  "/images/team/sarah.jpg",
  "/images/team/bekzat.jpg",
  "/images/team/elena.jpg",
] as const;

function TeamSection() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="team-heading"
      className="py-16 md:py-20 px-4 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.about.team.eyebrow}
          </p>
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.about.team.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            {t.about.team.subtitle}
          </p>
          <NatureDivider className="mt-5" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.team.members.map((member, i) => (
            <article
              key={i}
              className="group bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Team member photo */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={teamImages[i]}
                  alt={member.name}
                  fill
                  className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              <div className="p-6 text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-1 font-serif group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  {member.role}
                </p>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 5 — VALUES
// ═════════════════════════════════════════════════════════════════════════════
const valueIcons = [
  (
    <path
      key="auth"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  (
    <path
      key="sus"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  ),
  (
    <path
      key="safe"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  (
    <path
      key="small"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  ),
] as const;

function ValuesSection() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="values-heading"
      className="relative py-16 md:py-20 px-4 bg-emerald-950 dark:bg-black text-white overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.about.values.eyebrow}
          </p>
          <h2
            id="values-heading"
            className="text-3xl md:text-4xl font-bold mb-3 font-serif"
          >
            {t.about.values.title}
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto">
            {t.about.values.subtitle}
          </p>
          <NatureDivider className="mt-5" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.values.items.map((value, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/60 transition-all duration-300 rounded-xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {valueIcons[i]}
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 font-serif">{value.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 6 — CTA
// ═════════════════════════════════════════════════════════════════════════════
function CTASection() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-16 md:py-20 px-4 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors rounded-xl p-10 md:p-14 text-center">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.about.cta.eyebrow}
          </p>
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif"
          >
            {t.about.cta.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            {t.about.cta.subtitle}
          </p>

          <NatureDivider className="mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg px-8 py-4 font-semibold uppercase tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              {t.about.cta.contactUs}
            </Link>
            <Link
              href="/tours"
              className="border-2 border-emerald-500 hover:bg-emerald-600 hover:text-white rounded-lg text-emerald-700 dark:text-emerald-400 px-8 py-4 font-semibold uppercase tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              {t.about.cta.browseTours}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />
      <StorySection />
      <MissionSection />
      <TeamSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
}
