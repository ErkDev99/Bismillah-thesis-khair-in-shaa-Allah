// src/app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — no "use client" needed.
// Style: Nature / Travel Magazine — emerald + cream palette, serif headings,
// leaf ornaments, bright hero photography, fresh green accents.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getFeaturedTours,
  getAllTours,
  type Tour,
} from "@/lib/data/tours";
import {
  getFeaturedDestinations,
  getAllDestinations,
  type Destination,
} from "@/lib/data/destinations";
import QuickSearchBar from "@/components/home/QuickSearchBar";
import { AnimatedHeadline } from "@/components/home/AnimatedHeadline";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Wanderlust — Discover Central Asia | Tours in Kazakhstan, Kyrgyzstan & Uzbekistan",
  description:
    "Expertly guided small-group tours through Kazakhstan, Kyrgyzstan, and Uzbekistan. Ancient Silk Road cities, mountain expeditions, and authentic nomadic experiences from $1,299.",
  openGraph: {
    title: "Wanderlust — Discover Central Asia",
    description:
      "Small-group tours through Kazakhstan, Kyrgyzstan & Uzbekistan. Silk Road cities, mountain treks, and nomadic stays from $1,299.",
    type: "website",
    siteName: "Wanderlust",
  },
  keywords: [
    "Central Asia tours",
    "Kazakhstan travel",
    "Kyrgyzstan tours",
    "Uzbekistan tours",
    "Silk Road",
    "guided tours Central Asia",
  ],
};

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

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${rating} out of 5 stars${count ? `, ${count} reviews` : ""}`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${
            i < Math.round(rating) ? "text-amber-400" : "text-stone-300 dark:text-stone-600"
          }`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-semibold text-stone-900 dark:text-emerald-100">{rating}</span>
      {count && (
        <span className="text-sm text-stone-600 dark:text-stone-400">({count})</span>
      )}
    </div>
  );
}

// ─── Difficulty Badge ────────────────────────────────────────────────────────
function DifficultyBadge({ difficulty }: { difficulty: Tour["difficulty"] }) {
  const styles: Record<Tour["difficulty"], string> = {
    Easy: "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700",
    Moderate: "bg-orange-100 text-orange-800 border border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700",
    Challenging: "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="Welcome to Wanderlust Central Asia Tours"
      className="relative text-center text-white overflow-hidden min-h-[70vh] flex items-center"
    >
      <Image
        src="/images/hero/hero.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Subtle bottom gradient only — keeps the photo bright */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-12 md:py-20 w-full">
        <p className="text-emerald-300 text-sm font-semibold tracking-[0.25em] uppercase mb-4 drop-shadow-md">
          Kazakhstan &middot; Kyrgyzstan &middot; Uzbekistan
        </p>

        <AnimatedHeadline />

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md">
          Expert-led small-group tours through ancient Silk Road cities, soaring
          mountain ranges, and nomadic landscapes unlike anywhere else on Earth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-8 py-3 rounded-lg font-semibold text-base tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg"
          >
            Browse All Tours
          </Link>
          <Link
            href="/destinations"
            className="border-2 border-white/60 hover:bg-white hover:text-emerald-800 text-white px-8 py-3 rounded-lg font-semibold text-base tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 2 — WHY CHOOSE US
// ═════════════════════════════════════════════════════════════════════════════
const WHY_US = [
  {
    title: "Expert Local Guides",
    description:
      "Every tour is led by certified guides born and raised in the region — giving you authentic insider access that no app or map can replicate.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    ),
  },
  {
    title: "Small Groups (Max 12)",
    description:
      "Smaller groups mean personal attention, deeper connections with locals, and access to places that large tours simply cannot reach.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
  {
    title: "Authentic Experiences",
    description:
      "Sleep in yurts, share meals with nomadic families, and discover places that standard tourism never reaches — genuine cultural immersion.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

function WhyChooseUsSection() {
  return (
    <section
      aria-labelledby="why-us-heading"
      className="py-16 px-4 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            Why Choose Us
          </p>
          <h2
            id="why-us-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            Why Travel with Wanderlust?
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            We&apos;ve spent years crafting journeys that go beyond the tourist
            trail — here&apos;s what makes us different.
          </p>
          <NatureDivider className="mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {WHY_US.map((item) => (
            <div
              key={item.title}
              className="relative flex flex-col items-center text-center p-7 bg-white dark:bg-slate-900 rounded-xl border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 transition-colors duration-300">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
                {item.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 2.5 — SOCIAL PROOF STRIP (Compact trust signal)
// ═════════════════════════════════════════════════════════════════════════════
const MINI_REVIEWS = [
  {
    quote: "Best travel decision I ever made — our guide knew every hidden spot.",
    name: "Emma B.",
    country: "United Kingdom",
  },
  {
    quote: "Sleeping in a yurt under the stars is something I'll never forget.",
    name: "Lars M.",
    country: "Germany",
  },
  {
    quote: "Perfectly balanced — adventurous but never rushed. Absolutely perfect.",
    name: "Hana K.",
    country: "Japan",
  },
];

function SocialProofStrip() {
  return (
    <section
      aria-label="Traveler ratings"
      className="py-10 px-4 bg-white dark:bg-slate-900 border-y border-stone-200 dark:border-slate-800"
    >
      <div className="max-w-5xl mx-auto">
        {/* Aggregate rating */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-stone-900 dark:text-emerald-100 font-serif">4.9</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">out of 5</span>
            </div>
          </div>
          <div className="h-8 w-px bg-stone-300 dark:bg-slate-700 hidden sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>
              Rated by <strong className="text-stone-900 dark:text-emerald-100">524 verified travelers</strong>
            </span>
          </div>
          <div className="h-8 w-px bg-stone-300 dark:bg-slate-700 hidden sm:block" aria-hidden="true" />
          <Link
            href="/review"
            className="text-sm text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors"
          >
            Leave a review
          </Link>
          <div className="h-8 w-px bg-stone-300 dark:bg-slate-700 hidden sm:block" aria-hidden="true" />
          <Link
            href="/reviews"
            className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-lg tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            View All Reviews
          </Link>
        </div>

        {/* Mini review cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {MINI_REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-slate-800/50 rounded-lg border border-emerald-100 dark:border-slate-700"
            >
              <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>
              <div>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic font-serif">
                  {r.quote}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5">
                  {r.name} &middot; {r.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 3 — FEATURED TOURS
// ═════════════════════════════════════════════════════════════════════════════
function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600">
      <div className="relative h-52 shrink-0 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 z-10">
          <DifficultyBadge difficulty={tour.difficulty} />
        </div>
        <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs px-2.5 py-1 flex items-center gap-1">
          <svg
            className="w-3 h-3 text-amber-400 fill-current"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span aria-label={`Rated ${tour.rating} out of 5`}>{tour.rating}</span>
          {tour.reviewCount && (
            <span className="text-white/60">({tour.reviewCount})</span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 z-10 text-white/80 text-xs uppercase tracking-[0.2em] font-medium drop-shadow-md bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
          {tour.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 text-sm mb-2">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{tour.location}</span>
        </div>

        <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-serif">
          <Link href={`/tours/${tour.slug}`} className="focus:outline-none focus:underline">
            {tour.title}
          </Link>
        </h3>

        <p className="text-stone-600 dark:text-stone-400 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
          {tour.description}
        </p>

        <div className="flex items-end justify-between pt-4 border-t border-stone-200 dark:border-slate-700 mb-4">
          <div>
            <p className="text-[11px] text-stone-400 uppercase tracking-[0.15em]">From</p>
            <p className="text-2xl font-bold text-stone-900 dark:text-emerald-100 font-serif">
              ${tour.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{tour.duration}</p>
            <p className="text-xs text-stone-600 dark:text-stone-400">{tour.groupSize}</p>
          </div>
        </div>

        <Link
          href={`/tours/${tour.slug}`}
          aria-label={`View Tour: ${tour.title}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-2.5 rounded-lg font-semibold tracking-wide text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          View Tour
        </Link>
      </div>
    </article>
  );
}

function FeaturedToursSection({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) return null;
  return (
    <section
      aria-labelledby="tours-heading"
      className="py-16 px-4 bg-stone-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
              Curated Journeys
            </p>
            <h2
              id="tours-heading"
              className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif"
            >
              Featured Tours
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Handpicked journeys that showcase the best of Central Asia.
            </p>
          </div>
          <Link
            href="/tours"
            className="shrink-0 inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold tracking-wide text-sm group focus:outline-none focus:underline"
          >
            View all tours
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 4 — FEATURED DESTINATIONS
// ═════════════════════════════════════════════════════════════════════════════
function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex h-72 overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

      <div className="absolute top-4 right-4 bg-emerald-600/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg z-10">
        {destination.tourCount} tours
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
        <p className="text-emerald-300 text-xs font-bold uppercase tracking-[0.2em] mb-1">
          {destination.country}
        </p>
        <h3 className="text-2xl font-bold mb-1 group-hover:text-emerald-300 transition-colors font-serif">
          {destination.name}
        </h3>
        <p className="text-stone-300 text-sm line-clamp-2 leading-relaxed">
          {destination.description}
        </p>
      </div>
    </Link>
  );
}

function FeaturedDestinationsSection({ destinations }: { destinations: Destination[] }) {
  if (destinations.length === 0) return null;
  return (
    <section
      aria-labelledby="destinations-heading"
      className="py-16 px-4 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
              Iconic Places
            </p>
            <h2
              id="destinations-heading"
              className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif"
            >
              Top Destinations
            </h2>
            <p className="text-stone-600 dark:text-stone-400">
              Iconic places where ancient legend meets breathtaking landscape.
            </p>
          </div>
          <Link
            href="/destinations"
            className="shrink-0 inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold tracking-wide text-sm group focus:outline-none focus:underline"
          >
            All destinations
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 5 — TESTIMONIALS
// ═════════════════════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    name: "Emma B.",
    country: "United Kingdom",
    tour: "Silk Road Adventure",
    rating: 5,
    quote:
      "The Silk Road tour was the trip of a lifetime. Our guide's knowledge of local history was extraordinary — I learned more in 10 days than in years of reading.",
  },
  {
    name: "Lars M.",
    country: "Germany",
    tour: "Nomadic Life Experience",
    rating: 5,
    quote:
      "Sleeping in a traditional yurt under a sky full of stars in Kyrgyzstan is something I will carry with me forever. Wanderlust made it feel effortless.",
  },
  {
    name: "Hana K.",
    country: "Japan",
    tour: "Mountain Expedition",
    rating: 5,
    quote:
      "The small group meant we got to know everyone deeply. The itinerary was perfectly balanced — adventurous but never rushed. Absolutely perfect.",
  },
];

function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 px-4 bg-white dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            What Our Travelers Say
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Real reviews from real adventurers. No filters, no edits.
          </p>
          <NatureDivider className="mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="relative bg-stone-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-stone-200 dark:border-slate-700"
            >
              <StarRating rating={t.rating} />
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed flex-1 mt-4 mb-5 font-serif italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <cite className="not-italic">
                  <p className="font-semibold text-stone-900 dark:text-emerald-100 text-sm">{t.name}</p>
                  <p className="text-stone-600 dark:text-stone-400 text-xs mt-0.5">
                    {t.country} &middot; {t.tour}
                  </p>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Reviews CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 px-8 py-3 rounded-lg font-semibold tracking-wide text-sm transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Read All Reviews
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/review"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold tracking-wide text-sm transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Leave a Review
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 6 — NEWSLETTER
// ═════════════════════════════════════════════════════════════════════════════
function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative py-16 px-4 bg-emerald-950 text-white overflow-hidden"
    >
      <div className="relative max-w-2xl mx-auto text-center">
        <NatureDivider className="mb-6" />
        <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold mb-3 font-serif">
          Get Inspired Weekly
        </h2>
        <p className="text-emerald-200/70 mb-8 leading-relaxed">
          Travel tips, exclusive deals, and hidden gems from Central Asia —
          delivered straight to your inbox. No spam, ever.
        </p>

        <form
          action="/api/newsletter"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          aria-label="Newsletter signup form"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            aria-required="true"
            autoComplete="email"
            className="flex-1 px-4 py-3 bg-white/10 rounded-lg border border-emerald-500/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg font-semibold tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-emerald-950 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-emerald-300/50 text-xs mt-4">No spam. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 7 — FINAL CTA BANNER
// ═════════════════════════════════════════════════════════════════════════════
function CTABannerSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500" />
          <div className="w-12 h-12 border-2 border-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500" />
        </div>

        <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-emerald-200/70 mb-8 max-w-xl mx-auto leading-relaxed">
          Our travel experts are available to craft a custom itinerary just for
          you. No two trips are alike — and yours shouldn&apos;t be either.
        </p>

        <NatureDivider className="mb-10" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="group bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-10 py-4 rounded-lg font-semibold tracking-wide transition-all flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-950"
          >
            Browse Tours
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="group border-2 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-emerald-950 px-10 py-4 rounded-lg font-semibold tracking-wide transition-all flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-950"
          >
            Contact Us
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const featuredTours =
    getFeaturedTours().length > 0
      ? getFeaturedTours().slice(0, 3)
      : getAllTours().slice(0, 3);

  const featuredDestinations =
    getFeaturedDestinations().length > 0
      ? getFeaturedDestinations().slice(0, 6)
      : getAllDestinations().slice(0, 6);

  // Slim tour data for the search bar (no itineraries, descriptions, etc.)
  const searchTours = getAllTours().map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    destination: t.destination,
    duration: t.duration,
    durationDays: t.durationDays,
    price: t.price,
    rating: t.rating,
    image: t.image,
    difficulty: t.difficulty,
  }));

  return (
    <>
      <HeroSection />
      <QuickSearchBar tours={searchTours} />
      <div className="bg-emerald-950 border-t border-emerald-500/20" aria-label="Key stats">
        <div className="max-w-3xl mx-auto px-4 py-4 grid grid-cols-3 divide-x divide-emerald-500/20 text-center">
          {([
            { value: "6+", label: "Destinations" },
            { value: "500+", label: "Happy Travelers" },
            { value: "4.9\u2605", label: "Avg. Rating" },
          ] as const).map((stat) => (
            <div key={stat.label} className="px-2 sm:px-4">
              <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-serif">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-200/60 uppercase tracking-[0.15em] mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <WhyChooseUsSection />
      <SocialProofStrip />
      <FeaturedToursSection tours={featuredTours} />
      <FeaturedDestinationsSection destinations={featuredDestinations} />
      <TestimonialsSection />
      <NewsletterSection />
      <CTABannerSection />
    </>
  );
}
