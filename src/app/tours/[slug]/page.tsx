// src/app/tours/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — individual tour detail page.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTourBySlug, getAllTours, type Tour } from "@/lib/data/tours";

// ─── Diamond Divider — Art Deco ornament ─────────────────────────────────────
function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <div className="h-px w-12 md:w-20 bg-amber-500/50" />
      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
      <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
      <div className="h-px w-12 md:w-20 bg-amber-500/50" />
    </div>
  );
}

// Generate static params for all tours (for static generation)
export async function generateStaticParams() {
  const tours = getAllTours();
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return { title: "Tour Not Found" };
  }

  return {
    title: `${tour.title} | Wanderlust Tours`,
    description: tour.description,
    openGraph: {
      title: `${tour.title} | Wanderlust Tours`,
      description: tour.description,
      type: "website",
      siteName: "Wanderlust",
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// TOUR HEADER (HERO)
// ═════════════════════════════════════════════════════════════════════════════
function TourHeader({ tour }: { tour: Tour }) {
  const difficultyStyles: Record<Tour["difficulty"], string> = {
    Easy: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    Moderate: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
    Challenging: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end" aria-label={`${tour.title} hero`}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Art Deco geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="tour-hero-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#tour-hero-deco)"/>
        </svg>
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-500/30 z-10" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-500/30 z-10" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-amber-400/80 hover:text-amber-400 mb-4 transition-colors uppercase tracking-wider text-sm font-medium"
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
          Back to Tours
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-sm font-semibold uppercase tracking-wider ${difficultyStyles[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
          <span className="px-3 py-1 text-sm font-medium bg-white/10 text-white/90 border border-white/20 uppercase tracking-wider">
            {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
          {tour.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tour.location}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tour.duration}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tour.groupSize}
          </div>
          <div className="flex items-center gap-1" aria-label={`Rating: ${tour.rating} out of 5, ${tour.reviewCount} reviews`}>
            <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-white/60">({tour.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PRICE CARD (STICKY SIDEBAR)
// ═════════════════════════════════════════════════════════════════════════════
function PriceCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg p-6 sticky top-24">
      {/* Art Deco corner accents */}
      <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40" aria-hidden="true" />
      <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/40" aria-hidden="true" />
      <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/40" aria-hidden="true" />
      <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/40" aria-hidden="true" />

      <div className="mb-6">
        <span className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-[0.2em]">From</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-stone-900 dark:text-amber-100 font-serif">${tour.price.toLocaleString()}</span>
          <span className="text-stone-600 dark:text-stone-400">/ person</span>
        </div>
      </div>

      <Link
        href="/contact"
        className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 text-white text-center py-4 font-semibold uppercase tracking-wider transition-all mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
      >
        Book This Tour
      </Link>

      <button className="w-full border-2 border-amber-500/50 hover:bg-amber-500 hover:text-white text-amber-700 dark:text-amber-400 py-3 font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Save to Wishlist
      </button>

      <DiamondDivider className="my-6" />

      <div className="space-y-4 text-sm">
        {["Free cancellation up to 30 days", "Reserve now, pay later", "Small group experience"].map((text) => (
          <div key={text} className="flex items-center gap-3">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
function TourOverview({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12" aria-labelledby="overview-heading">
      <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">About This Tour</p>
      <h2 id="overview-heading" className="text-2xl font-bold text-stone-900 dark:text-amber-100 mb-4 font-serif">Overview</h2>
      <DiamondDivider className="mb-6 !justify-start" />
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{tour.longDescription}</p>
    </section>
  );
}

function TourHighlights({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12" aria-labelledby="highlights-heading">
      <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">What Awaits You</p>
      <h2 id="highlights-heading" className="text-2xl font-bold text-stone-900 dark:text-amber-100 mb-4 font-serif">Highlights</h2>
      <DiamondDivider className="mb-6 !justify-start" />
      <ul className="grid md:grid-cols-2 gap-3">
        {tour.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-stone-600 dark:text-stone-300">{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TourItinerary({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12" aria-labelledby="itinerary-heading">
      <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">Day by Day</p>
      <h2 id="itinerary-heading" className="text-2xl font-bold text-stone-900 dark:text-amber-100 mb-6 font-serif">Itinerary</h2>
      <DiamondDivider className="mb-6 !justify-start" />
      <div className="space-y-4">
        {tour.itinerary.map((day) => (
          <details
            key={day.day}
            className="group bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 overflow-hidden"
          >
            <summary className="flex items-center gap-4 p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
              <span className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold shrink-0 font-serif">
                {day.day}
              </span>
              <span className="font-semibold text-stone-900 dark:text-amber-100 flex-1 font-serif">
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

function TourInclusions({ tour }: { tour: Tour }) {
  return (
    <section className="mb-12" aria-labelledby="inclusions-heading">
      <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">The Details</p>
      <h2 id="inclusions-heading" className="text-2xl font-bold text-stone-900 dark:text-amber-100 mb-6 font-serif">
        What&apos;s Included
      </h2>
      <DiamondDivider className="mb-6 !justify-start" />
      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        <div>
          <h3 className="font-semibold text-stone-900 dark:text-amber-100 mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Included
          </h3>
          <ul className="space-y-2">
            {tour.included.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div>
          <h3 className="font-semibold text-stone-900 dark:text-amber-100 mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
            <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Not Included
          </h3>
          <ul className="space-y-2">
            {tour.notIncluded.map((item, index) => (
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
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      <TourHeader tour={tour} />

      <section className="py-12 px-4" aria-label="Tour details">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <TourOverview tour={tour} />
              <TourHighlights tour={tour} />
              <TourItinerary tour={tour} />
              <TourInclusions tour={tour} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <PriceCard tour={tour} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}