"use client";

// src/app/faq/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component (uses useLocale for EN/RU translations).
// Style: Nature / Travel Magazine — emerald + cream palette, rounded corners,
// leaf dividers, bright photography, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";

// ─── Nature Divider — leaf ornament ─────────────────────────────────────────
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

// ─── FAQ Category Metadata — IDs and icons stay constant; titles/faqs come from translations ─
type CategoryKey = "general" | "booking" | "tours" | "practical";

const categoryMeta: { key: CategoryKey; id: string; icon: ReactNode }[] = [
  {
    key: "general",
    id: "general",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    key: "booking",
    id: "booking",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    ),
  },
  {
    key: "tours",
    id: "tours",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    key: "practical",
    id: "practical",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { t } = useLocale();
  return (
    <section
      aria-label={t.faq.hero.ariaLabel}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
          <span className="text-emerald-300/80 text-xs tracking-[0.3em] uppercase drop-shadow-md">{t.faq.hero.bannerLabel}</span>
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
        </div>

        <p className="text-emerald-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
          {t.faq.hero.eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-md">
          {t.faq.hero.titlePrefix}{" "}
          <span className="text-emerald-400">{t.faq.hero.titleAccent}</span>
        </h1>

        <p className="text-base md:text-lg text-stone-200 max-w-2xl mx-auto mb-4 leading-relaxed drop-shadow-md">
          {t.faq.hero.subtitle}
        </p>

        <NatureDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// QUICK NAV — sticky section jump bar
// ═════════════════════════════════════════════════════════════════════════════
function QuickNav() {
  const { t } = useLocale();
  return (
    <nav
      aria-label={t.faq.quickNavAriaLabel}
      className="bg-emerald-950 dark:bg-slate-950 border-b border-emerald-500/20 sticky top-16 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
          {categoryMeta.map((meta) => (
            <a
              key={meta.id}
              href={`#${meta.id}`}
              className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-300 hover:text-emerald-200 text-xs font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {meta.icon}
              </svg>
              {t.faq.categories[meta.key].title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FAQ CATEGORY
// ═════════════════════════════════════════════════════════════════════════════
function FAQCategory({ meta }: { meta: (typeof categoryMeta)[number] }) {
  const { t } = useLocale();
  const category = t.faq.categories[meta.key];
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-heading`} className="scroll-mt-32">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center rounded-lg">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {meta.icon}
          </svg>
        </div>
        <div>
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-[10px] mb-0.5">
            {t.faq.categoryLabel}
          </p>
          <h2
            id={`${meta.id}-heading`}
            className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-emerald-100 font-serif"
          >
            {category.title}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {category.faqs.map((faq, index) => (
          <details
            key={index}
            className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors overflow-hidden rounded-xl"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-emerald-50/60 dark:hover:bg-slate-800/60 transition-colors list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset">
              <span className="font-semibold text-stone-900 dark:text-emerald-100 pr-4 font-serif">
                {faq.question}
              </span>
              <svg
                className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-4 text-stone-600 dark:text-stone-400 text-sm leading-relaxed border-t border-stone-200 dark:border-slate-800">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT CTA
// ═════════════════════════════════════════════════════════════════════════════
function ContactCTA() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="relative bg-emerald-950 text-white p-10 md:p-14 text-center overflow-hidden rounded-xl"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-emerald-400/70 uppercase tracking-[0.3em] text-xs mb-2">
          {t.faq.contactCta.eyebrow}
        </p>
        <h2 id="faq-cta-heading" className="text-2xl md:text-3xl font-bold mb-4 font-serif">
          {t.faq.contactCta.title}
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          {t.faq.contactCta.subtitle}
        </p>

        <NatureDivider className="mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-8 py-4 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-950"
          >
            {t.faq.contactCta.contactUs}
          </Link>

          <a
            href="mailto:info@wanderlust.com"
            className="border-2 border-emerald-500 hover:bg-emerald-600 hover:text-white text-emerald-300 px-8 py-4 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-emerald-950"
          >
            {t.faq.contactCta.emailUs}
          </a>
        </div>
        <p className="text-stone-400 text-sm mt-6">
          {t.faq.contactCta.callUsPrefix}{" "}
          <a
            href="tel:+15551234567"
            className="text-emerald-400 hover:text-emerald-300 font-semibold focus:outline-none focus:underline"
          >
            +1 (555) 123-4567
          </a>
        </p>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// RELATED LINKS
// ═════════════════════════════════════════════════════════════════════════════
const relatedLinkMeta = [
  {
    href: "/practical-info",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    href: "/tours",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    href: "/about",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
] as const;

function RelatedLinks() {
  const { t } = useLocale();
  return (
    <section aria-labelledby="resources-heading">
      <div className="mb-6">
        <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
          {t.faq.related.eyebrow}
        </p>
        <h2
          id="resources-heading"
          className="text-2xl font-bold text-stone-900 dark:text-emerald-100 font-serif"
        >
          {t.faq.related.title}
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {relatedLinkMeta.map((meta, i) => {
          const item = t.faq.related.items[i];
          return (
            <Link
              key={meta.href}
              href={meta.href}
              className="group relative flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            >
              <div className="w-12 h-12 border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 flex items-center justify-center transition-all shrink-0 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {meta.icon}
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-emerald-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-serif">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function FAQPage() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />
      <QuickNav />

      <div className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {categoryMeta.map((meta) => (
            <FAQCategory key={meta.id} meta={meta} />
          ))}

          <RelatedLinks />

          <ContactCTA />
        </div>
      </div>
    </div>
  );
}
