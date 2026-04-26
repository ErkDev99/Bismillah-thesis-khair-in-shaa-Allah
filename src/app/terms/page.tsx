// src/app/terms/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component (needs useLocale).
// Style: Nature / Travel Magazine — emerald + cream palette, rounded corners,
// leaf dividers, bright photography, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import Link from "next/link";
import Image from "next/image";
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

// ═════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { t } = useLocale();
  const tr = t.terms.hero;

  return (
    <section
      aria-label={`${tr.titlePrefix} ${tr.titleAccent}`}
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <p className="text-emerald-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 drop-shadow-md">
          {tr.eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-md">
          {tr.titlePrefix} <span className="text-emerald-400">{tr.titleAccent}</span>
        </h1>
        <p className="text-stone-300 text-sm uppercase tracking-[0.2em] drop-shadow-md">
          {tr.lastUpdated}
        </p>
        <NatureDivider className="mt-4" />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Typography helpers — keep the JSX below readable
// ═════════════════════════════════════════════════════════════════════════════
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-emerald-100 mt-10 mb-4 font-serif">
      {children}
    </h2>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-stone-600 dark:text-stone-400 mb-4 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

function Ul({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-6 space-y-2 marker:text-emerald-500">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function StrongUl({ items }: { items: readonly { strong: string; body: string }[] }) {
  return (
    <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-6 space-y-2 marker:text-emerald-500">
      {items.map((item, i) => (
        <li key={i}>
          {item.strong && (
            <>
              <strong className="text-stone-900 dark:text-emerald-100">{item.strong}</strong>{" "}
            </>
          )}
          {item.body}
        </li>
      ))}
    </ul>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function TermsOfServicePage() {
  const { t } = useLocale();
  const tr = t.terms;
  const s = tr.sections;

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-8 md:p-12 shadow-sm rounded-xl">
            <P className="text-lg">{tr.intro}</P>

            <H2>{s.acceptance.title}</H2>
            <P>{s.acceptance.body}</P>

            <H2>{s.services.title}</H2>
            <P>{s.services.body}</P>

            <H2>{s.booking.title}</H2>
            <Ul items={s.booking.items} />

            <H2>{s.cancellation.title}</H2>
            <P>{s.cancellation.intro}</P>
            <StrongUl items={s.cancellation.items} />
            <P>{s.cancellation.tail}</P>

            <H2>{s.insurance.title}</H2>
            <P>{s.insurance.body}</P>

            <H2>{s.documents.title}</H2>
            <P>{s.documents.body}</P>

            <H2>{s.health.title}</H2>
            <P>{s.health.body}</P>

            <H2>{s.itinerary.title}</H2>
            <P>{s.itinerary.body}</P>

            <H2>{s.liability.title}</H2>
            <P>{s.liability.body}</P>

            <H2>{s.ip.title}</H2>
            <P>{s.ip.body}</P>

            <H2>{s.conduct.title}</H2>
            <P>{s.conduct.intro}</P>
            <Ul items={s.conduct.items} />

            <H2>{s.governing.title}</H2>
            <P>{s.governing.body}</P>

            <H2>{s.changes.title}</H2>
            <P>{s.changes.body}</P>

            <H2>{s.contact.title}</H2>
            <P>{s.contact.intro}</P>
            <ul className="list-none text-stone-600 dark:text-stone-400 mb-6 space-y-2">
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  {s.contact.emailLabel}
                </strong>{" "}
                <a
                  href="mailto:legal@wanderlust.com"
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 focus:outline-none focus:underline"
                >
                  legal@wanderlust.com
                </a>
              </li>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  {s.contact.phoneLabel}
                </strong>{" "}
                <a
                  href="tel:+15551234567"
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 focus:outline-none focus:underline"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  {s.contact.addressLabel}
                </strong>{" "}
                123 Travel Street, Adventure City, AC 12345
              </li>
            </ul>

            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em] focus:outline-none focus:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {tr.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
