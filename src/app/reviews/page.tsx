// src/app/reviews/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — reads localStorage for submitted reviews and combines
// with seed reviews. Style: Nature / Travel Magazine — emerald + cream palette.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

// ─── Seed Reviews (always visible, hardcoded) ─────────────────────────────────
// One per mock booking credential so the page looks full on first visit.
interface SeedReview {
  id: string;
  name: string;
  country: string;
  tour: string;
  rating: number;
  title: string;
  body: string;
  recommend: boolean;
  date: string;
}

const SEED_REVIEWS: SeedReview[] = [
  {
    id: "seed-1",
    name: "Emma B.",
    country: "United Kingdom",
    tour: "Silk Road Adventure",
    rating: 5,
    title: "Trip of a lifetime",
    body: "The Silk Road tour was the trip of a lifetime. Our guide's knowledge of local history was extraordinary — I learned more in 10 days than in years of reading. Every stop felt carefully chosen to give us maximum insight into this ancient civilization. The combination of history, landscape, and local hospitality was unlike anything I have experienced before.",
    recommend: true,
    date: "2025-09-20",
  },
  {
    id: "seed-2",
    name: "Lars M.",
    country: "Germany",
    tour: "Nomadic Life Experience",
    rating: 5,
    title: "Unforgettable nights under the stars",
    body: "Sleeping in a traditional yurt under a sky full of stars in Kyrgyzstan is something I will carry with me forever. Wanderlust made it feel effortless — every logistical detail was handled so we could fully absorb the experience. The nomadic family we stayed with were incredibly welcoming and generous. A truly human connection across cultures.",
    recommend: true,
    date: "2025-08-25",
  },
  {
    id: "seed-3",
    name: "Hana K.",
    country: "Japan",
    tour: "Mountain Expedition",
    rating: 5,
    title: "Perfectly balanced adventure",
    body: "The small group meant we got to know everyone deeply. The itinerary was perfectly balanced — adventurous but never rushed. Absolutely perfect. I came back not just with memories but with real friendships. The mountain scenery in Kyrgyzstan rivals anything I have seen in the Alps or in Japan.",
    recommend: true,
    date: "2025-07-15",
  },
  {
    id: "seed-4",
    name: "Maria R.",
    country: "Spain",
    tour: "Cultural Heritage Tour",
    rating: 5,
    title: "Uzbekistan surpassed all expectations",
    body: "I had been to many countries but Uzbekistan truly surprised me. The architecture of Samarkand is jaw-dropping, and our guide brought it all to life with stories and historical context that no guidebook could match. The ceramics workshops and bazaar visits added a hands-on dimension that made the culture feel tangible, not just observed.",
    recommend: true,
    date: "2024-11-10",
  },
  {
    id: "seed-5",
    name: "John P.",
    country: "United States",
    tour: "Photography Expedition",
    rating: 4,
    title: "Incredible light, incredible landscapes",
    body: "As a photographer I was looking for locations that would challenge and inspire me. This tour delivered on both counts. The golden hour light at the Tian Shan mountains alone was worth the entire trip. One or two logistics hiccups kept it from being a perfect five stars, but the overall experience and the quality of access to remote locations was outstanding. Would come back for more.",
    recommend: true,
    date: "2024-10-18",
  },
  {
    id: "seed-6",
    name: "Elena V.",
    country: "France",
    tour: "Winter Wonderland",
    rating: 5,
    title: "Kazakhstan in winter — a hidden gem",
    body: "Everyone told me Central Asia in winter was a bad idea. They were completely wrong. The frozen steppe, the snow-covered mountains, the steaming beshbarmak in a warm yurt — it was a side of Kazakhstan that most travelers never see. Wanderlust made it feel safe, warm, and magical all at once. The ice fishing and eagle hunting demonstrations were extraordinary.",
    recommend: true,
    date: "2025-01-22",
  },
];

// ─── LocalStorage review shape (from /review page) ───────────────────────────
interface StoredReview {
  tour: string;
  rating: number;
  title: string;
  body: string;
  name: string;
  recommend: boolean;
  date?: string;
}

// ─── Star display ─────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${i <= rating ? "text-amber-400" : "text-stone-300 dark:text-slate-600"}`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-semibold text-stone-900 dark:text-emerald-100">{rating}.0</span>
    </div>
  );
}

// ─── Format date ──────────────────────────────────────────────────────────────
function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "Recently submitted";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Recently submitted";
  }
}

// ─── Single Review Card ───────────────────────────────────────────────────────
function ReviewCard({
  rating,
  title,
  body,
  name,
  country,
  tour,
  recommend,
  date,
  isNew,
}: {
  rating: number;
  title: string;
  body: string;
  name: string;
  country?: string;
  tour: string;
  recommend: boolean;
  date?: string;
  isNew?: boolean;
}) {
  return (
    <article className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-6 flex flex-col hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 rounded-xl">
      {/* Top row: stars + verified badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <Stars rating={rating} />
        <div className="flex items-center gap-1.5 shrink-0">
          {isNew && (
            <span className="text-[10px] uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 font-semibold rounded-lg">
              New
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verified
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-stone-900 dark:text-emerald-100 font-serif mb-2">{title}</h3>

      {/* Body */}
      <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed font-serif italic flex-1 mb-4">
        &ldquo;{body}&rdquo;
      </p>

      {/* Footer */}
      <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-emerald-100">{name}</p>
            {country && (
              <p className="text-xs text-stone-500 dark:text-stone-400">{country} &middot; {tour}</p>
            )}
            {!country && (
              <p className="text-xs text-stone-500 dark:text-stone-400">{tour}</p>
            )}
          </div>
          {recommend && (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Recommends
            </span>
          )}
        </div>
        <p className="text-[11px] text-stone-400 dark:text-stone-500">{formatDate(date)}</p>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ReviewsPage() {
  const [lsReviews, setLsReviews] = useState<StoredReview[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wanderlust-reviews");
      if (stored) setLsReviews(JSON.parse(stored));
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const totalCount = SEED_REVIEWS.length + lsReviews.length;
  const avgRating =
    Math.round(
      ([...SEED_REVIEWS, ...lsReviews.map((r) => ({ rating: r.rating }))].reduce(
        (sum, r) => sum + r.rating,
        0
      ) / totalCount) * 10
    ) / 10;

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="relative bg-emerald-950 text-white overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            Verified Traveler Reviews
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
            What Our <span className="text-emerald-400">Travelers Say</span>
          </h1>
          <p className="text-stone-400 max-w-xl mx-auto">
            Every review on this page comes from a verified customer who traveled with Wanderlust.
            No filters, no edits — genuine experiences from real adventurers.
          </p>
          <NatureDivider className="mt-5" />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-stone-900 dark:text-emerald-100 font-serif">
                {mounted ? avgRating : "4.9"}
              </span>
              <div className="flex flex-col">
                <div className="flex gap-0.5" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-stone-500">out of 5</span>
              </div>
            </div>
            <div className="h-8 w-px bg-stone-300 dark:bg-slate-700 hidden sm:block" aria-hidden="true" />
            <div className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>
                <strong className="text-stone-900 dark:text-emerald-100">{mounted ? totalCount : SEED_REVIEWS.length}</strong> verified reviews
              </span>
            </div>
          </div>
          <Link
            href="/review"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-6 py-2.5 font-semibold uppercase tracking-wide text-sm transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Leave a Review
          </Link>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Newly submitted reviews (from localStorage) */}
        {mounted && lsReviews.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-bold text-stone-900 dark:text-emerald-100 font-serif">
                Recently Submitted
              </h2>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 font-semibold uppercase tracking-wider rounded-lg">
                {lsReviews.length} new
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...lsReviews].reverse().map((review, i) => (
                <ReviewCard
                  key={`ls-${i}`}
                  rating={review.rating}
                  title={review.title}
                  body={review.body}
                  name={review.name}
                  tour={review.tour}
                  recommend={review.recommend}
                  date={review.date}
                  isNew
                />
              ))}
            </div>
            <div className="mt-8 mb-2">
              <NatureDivider />
            </div>
          </div>
        )}

        {/* All seed reviews */}
        <div>
          {mounted && lsReviews.length > 0 && (
            <h2 className="text-lg font-bold text-stone-900 dark:text-emerald-100 font-serif mb-6">
              All Verified Reviews
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEED_REVIEWS.map((review) => (
              <ReviewCard
                key={review.id}
                rating={review.rating}
                title={review.title}
                body={review.body}
                name={review.name}
                country={review.country}
                tour={review.tour}
                recommend={review.recommend}
                date={review.date}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-stone-200 dark:border-slate-800 bg-emerald-50 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <NatureDivider className="mb-6" />
          <h2 className="text-2xl font-bold text-stone-900 dark:text-emerald-100 font-serif mb-2">
            Traveled with Wanderlust?
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6 text-sm">
            Share your experience and help future travelers choose the right adventure.
            Your booking reference and email are all you need to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/review"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-8 py-3 font-semibold uppercase tracking-wide text-sm transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Write a Review
            </Link>
            <Link
              href="/"
              className="border-2 border-stone-300 dark:border-slate-600 hover:border-emerald-500 text-stone-700 dark:text-stone-300 px-8 py-3 font-semibold uppercase tracking-wide text-sm transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
