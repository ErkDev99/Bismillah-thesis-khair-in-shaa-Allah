// src/app/tours/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — uses useLocale() for EN/RU translation.
// Metadata/generateStaticParams dropped (Phase 4 SEO skipped for thesis).
// Style: Nature / Travel Magazine — emerald + cream palette, serif headings,
// leaf ornaments, rounded corners, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTourBySlug, type Tour } from "@/lib/data/tours";
import { useLocale } from "@/components/LocaleProvider";
import type { Translations } from "@/lib/translations/en";

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

type TDetail = Translations["tours"]["detail"];

// ═════════════════════════════════════════════════════════════════════════════
// TOUR HEADER (HERO)
// ═════════════════════════════════════════════════════════════════════════════
function TourHeader({
  tour,
  title,
  location,
  duration,
  groupSize,
  t,
  tDifficulty,
  tTourCategory,
}: {
  tour: Tour;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  t: TDetail;
  tDifficulty: Translations["home"]["difficulty"];
  tTourCategory: Translations["tourCategory"];
}) {
  const difficultyStyles: Record<Tour["difficulty"], string> = {
    Easy: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    Moderate: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
    Challenging: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end" aria-label={`${title} ${t.heroAriaSuffix}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={tour.image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-emerald-400/80 hover:text-emerald-400 mb-4 transition-colors uppercase tracking-wide text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.back}
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${difficultyStyles[tour.difficulty]}`}>
            {tDifficulty[tour.difficulty]}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90 border border-white/20 uppercase tracking-wide">
            {tTourCategory[tour.category]}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {groupSize}
          </div>
          <div className="flex items-center gap-1" aria-label={`${t.ratingAriaPrefix} ${tour.rating} ${t.ratingMid} ${tour.reviewCount} ${t.ratingSuffix}`}>
            <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-white/60">({tour.reviewCount} {t.reviewsSuffix})</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PRICE CARD (STICKY SIDEBAR)
// ═════════════════════════════════════════════════════════════════════════════
function PriceCard({ tour, title, t }: { tour: Tour; title: string; t: TDetail }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl shadow-lg p-6 sticky top-24">
      <div className="mb-6">
        <span className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-[0.2em]">{t.priceFrom}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-stone-900 dark:text-emerald-100 font-serif">${tour.price.toLocaleString()}</span>
          <span className="text-stone-600 dark:text-stone-400">{t.perPerson}</span>
        </div>
      </div>

      <Link
        href="/contact"
        className="block w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-center py-4 font-semibold uppercase tracking-wide transition-all mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        {t.bookNow}
      </Link>

      <button className="w-full border-2 border-emerald-500/50 hover:bg-emerald-600 hover:text-white rounded-lg text-emerald-700 dark:text-emerald-400 py-3 font-medium uppercase tracking-wide transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {t.saveWishlist}
      </button>

      <Link
        href={`/review?tour=${encodeURIComponent(title)}`}
        className="w-full border-2 border-stone-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 py-3 font-medium uppercase tracking-wide transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 mt-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        {t.rateTour}
      </Link>

      <NatureDivider className="my-6" />

      <div className="space-y-4 text-sm">
        {t.perks.map((text) => (
          <div key={text} className="flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-stone-600 dark:text-stone-300">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TOUR CONTENT SECTIONS
// ═════════════════════════════════════════════════════════════════════════════
function TourOverview({ longDescription, t }: { longDescription: string; t: TDetail }) {
  return (
    <section className="mb-12" aria-labelledby="overview-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">{t.overviewEyebrow}</p>
      <h2 id="overview-heading" className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif">{t.overviewTitle}</h2>
      <NatureDivider className="mb-6 !justify-start" />
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{longDescription}</p>
    </section>
  );
}

function TourHighlights({ highlights, t }: { highlights: string[]; t: TDetail }) {
  return (
    <section className="mb-12" aria-labelledby="highlights-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">{t.highlightsEyebrow}</p>
      <h2 id="highlights-heading" className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif">{t.highlightsTitle}</h2>
      <NatureDivider className="mb-6 !justify-start" />
      <ul className="grid md:grid-cols-2 gap-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-stone-600 dark:text-stone-300">{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TourItinerary({
  itinerary,
  t,
}: {
  itinerary: Tour["itinerary"];
  t: TDetail;
}) {
  return (
    <section className="mb-12" aria-labelledby="itinerary-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">{t.itineraryEyebrow}</p>
      <h2 id="itinerary-heading" className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-6 font-serif">{t.itineraryTitle}</h2>
      <NatureDivider className="mb-6 !justify-start" />
      <div className="space-y-4">
        {itinerary.map((day) => (
          <details
            key={day.day}
            className="group bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center gap-4 p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors">
              <span className="w-10 h-10 bg-emerald-600 rounded-lg text-white flex items-center justify-center font-bold shrink-0 font-serif">
                {day.day}
              </span>
              <span className="font-semibold text-stone-900 dark:text-emerald-100 flex-1 font-serif">
                {day.title}
              </span>
              <svg
                className="w-5 h-5 text-stone-600 dark:text-stone-400 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-stone-600 dark:text-stone-300 ml-14">{day.description}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function TourInclusions({
  included,
  notIncluded,
  t,
}: {
  included: string[];
  notIncluded: string[];
  t: TDetail;
}) {
  return (
    <section className="mb-12" aria-labelledby="inclusions-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">{t.inclusionsEyebrow}</p>
      <h2 id="inclusions-heading" className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-6 font-serif">
        {t.inclusionsTitle}
      </h2>
      <NatureDivider className="mb-6 !justify-start" />
      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        <div>
          <h3 className="font-semibold text-stone-900 dark:text-emerald-100 mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t.included}
          </h3>
          <ul className="space-y-2">
            {included.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div>
          <h3 className="font-semibold text-stone-900 dark:text-emerald-100 mb-4 flex items-center gap-2 uppercase tracking-wide text-sm">
            <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t.notIncluded}
          </h3>
          <ul className="space-y-2">
            {notIncluded.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
                <svg className="w-4 h-4 text-red-400 dark:text-red-500 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const tour = getTourBySlug(slug);
  const { locale, t } = useLocale();

  if (!tour) {
    notFound();
  }

  const tDetail = t.tours.detail;
  const tDifficulty = t.home.difficulty;
  const tTourCategory = t.tourCategory;

  const isRu = locale === "ru";
  const title = isRu && tour.titleRu ? tour.titleRu : tour.title;
  const location = isRu && tour.locationRu ? tour.locationRu : tour.location;
  const duration = isRu && tour.durationRu ? tour.durationRu : tour.duration;
  const groupSize = isRu && tour.groupSizeRu ? tour.groupSizeRu : tour.groupSize;
  const longDescription = isRu && tour.longDescriptionRu ? tour.longDescriptionRu : tour.longDescription;
  const highlights = isRu && tour.highlightsRu ? tour.highlightsRu : tour.highlights;
  const included = isRu && tour.includedRu ? tour.includedRu : tour.included;
  const notIncluded = isRu && tour.notIncludedRu ? tour.notIncludedRu : tour.notIncluded;
  const itinerary = isRu && tour.itineraryRu ? tour.itineraryRu : tour.itinerary;

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <TourHeader
        tour={tour}
        title={title}
        location={location}
        duration={duration}
        groupSize={groupSize}
        t={tDetail}
        tDifficulty={tDifficulty}
        tTourCategory={tTourCategory}
      />

      <section className="py-12 px-4" aria-label={tDetail.detailsAriaLabel}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <TourOverview longDescription={longDescription} t={tDetail} />
              <TourHighlights highlights={highlights} t={tDetail} />
              <TourItinerary itinerary={itinerary} t={tDetail} />
              <TourInclusions included={included} notIncluded={notIncluded} t={tDetail} />

              {/* Review CTA */}
              <section className="bg-stone-100 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 font-serif mb-1">
                    {tDetail.reviewCta.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {tDetail.reviewCta.subtitle}
                  </p>
                </div>
                <Link
                  href={`/review?tour=${encodeURIComponent(title)}`}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg px-6 py-2.5 font-semibold uppercase tracking-wide transition-all text-sm whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  {tDetail.reviewCta.button}
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <PriceCard tour={tour} title={title} t={tDetail} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
