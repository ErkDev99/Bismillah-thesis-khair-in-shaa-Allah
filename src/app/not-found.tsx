"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";

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

type SuggestionKey = "home" | "tours" | "destinations" | "contact";

const suggestionMeta: { key: SuggestionKey; href: string; icon: ReactNode }[] = [
  {
    key: "home",
    href: "/",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
  },
  {
    key: "tours",
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
    key: "destinations",
    href: "/destinations",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    key: "contact",
    href: "/contact",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
];

function HeroSection() {
  const { t } = useLocale();
  return (
    <section
      aria-label={t.notFound.hero.ariaLabel}
      className="relative text-center text-white overflow-hidden min-h-[60vh] flex items-center justify-center"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-3xl mx-auto py-16 md:py-20">
        <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
          <span className="text-emerald-300/80 text-xs tracking-[0.3em] uppercase drop-shadow-md">
            {t.notFound.hero.eyebrow}
          </span>
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
        </div>

        <p className="text-emerald-300 text-[6rem] md:text-[9rem] font-bold leading-none font-serif drop-shadow-lg mb-2">
          {t.notFound.hero.code}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 font-serif drop-shadow-md">
          {t.notFound.hero.titlePrefix}{" "}
          <span className="text-emerald-400">{t.notFound.hero.titleAccent}</span>
        </h1>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md">
          {t.notFound.hero.subtitle}
        </p>

        <NatureDivider />

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-emerald-950 px-8 py-4 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-black/40"
          >
            {t.notFound.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Suggestions() {
  const { t } = useLocale();
  return (
    <section aria-labelledby="not-found-suggestions" className="py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.notFound.suggestionsEyebrow}
          </p>
          <h2
            id="not-found-suggestions"
            className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-emerald-100 font-serif"
          >
            {t.notFound.suggestionsTitle}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {suggestionMeta.map((meta) => {
            const item = t.notFound.suggestions[meta.key];
            return (
              <Link
                key={meta.key}
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
      </div>
    </section>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />
      <Suggestions />
    </div>
  );
}
