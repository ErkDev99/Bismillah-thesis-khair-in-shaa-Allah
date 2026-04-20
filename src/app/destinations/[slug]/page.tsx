// src/app/destinations/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — individual destination detail page.
// Style: Nature / Travel Magazine — emerald + cream palette, serif headings,
// leaf ornaments, rounded corners, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getDestinationBySlug,
  getAllDestinations,
  type Destination,
} from "@/lib/data/destinations";
import { getToursByDestination, type Tour } from "@/lib/data/tours";

// ─── Nature Divider — leaf ornament ──────────────────────────────────────────
function NatureDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
      <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
      </svg>
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
    </div>
  );
}

// Generate static params for all destinations
export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: `${destination.name}, ${destination.country} | Wanderlust`,
    description: destination.description,
    openGraph: {
      title: `${destination.name}, ${destination.country} | Wanderlust`,
      description: destination.description,
      type: "website",
      siteName: "Wanderlust",
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// DESTINATION HEADER (HERO)
// ═════════════════════════════════════════════════════════════════════════════
function DestinationHero({ destination }: { destination: Destination }) {
  return (
    <section
      className="relative h-[50vh] min-h-[400px] flex items-end"
      aria-label={`${destination.name} hero`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12">
        <Link
          href="/destinations"
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
          Back to Destinations
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
            {destination.country}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90 border border-white/20 uppercase tracking-wide">
            {destination.tourCount} tours available
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
          {destination.name}
        </h1>

        <p className="text-lg md:text-xl text-stone-300 max-w-3xl leading-relaxed">
          {destination.description}
        </p>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// QUICK FACTS CARD (STICKY SIDEBAR)
// ═════════════════════════════════════════════════════════════════════════════
function QuickFactsCard({ destination }: { destination: Destination }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl shadow-lg p-6 sticky top-24">
      <p className="text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.2em] mb-1">
        Know Before You Go
      </p>
      <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif">
        Quick Facts
      </h3>

      <div className="space-y-3 mb-5">
        {destination.quickFacts.map((fact, index) => (
          <div
            key={index}
            className="flex justify-between items-baseline gap-3 text-sm"
          >
            <span className="text-stone-600 dark:text-stone-400 uppercase tracking-wide text-xs">
              {fact.label}
            </span>
            <span className="font-semibold text-stone-900 dark:text-emerald-100 text-right">
              {fact.value}
            </span>
          </div>
        ))}
      </div>

      <NatureDivider className="my-5" />

      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          <div>
            <span className="font-semibold text-stone-900 dark:text-emerald-100">
              Languages:{" "}
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              {destination.languages.join(", ")}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <span className="font-semibold text-stone-900 dark:text-emerald-100">
              Currency:{" "}
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              {destination.currency}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <span className="font-semibold text-stone-900 dark:text-emerald-100">
              Timezone:{" "}
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              {destination.timezone}
            </span>
          </div>
        </div>
      </div>

      <NatureDivider className="my-5" />

      <Link
        href="/contact"
        className="block w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-center py-4 font-semibold uppercase tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        Plan Your Visit
      </Link>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// OVERVIEW SECTION
// ═════════════════════════════════════════════════════════════════════════════
function OverviewSection({ destination }: { destination: Destination }) {
  return (
    <section className="mb-12" aria-labelledby="overview-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
        About This Place
      </p>
      <h2
        id="overview-heading"
        className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif"
      >
        About {destination.name}
      </h2>
      <NatureDivider className="mb-6 !justify-start" />
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
        {destination.longDescription}
      </p>

      {/* Highlights */}
      <div className="bg-emerald-50/60 dark:bg-slate-900/60 border border-emerald-300/40 dark:border-emerald-700/30 rounded-xl p-6">
        <h3 className="font-semibold text-stone-900 dark:text-emerald-100 mb-4 font-serif uppercase tracking-wide text-sm">
          Highlights
        </h3>
        <ul className="grid md:grid-cols-2 gap-3">
          {destination.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-stone-700 dark:text-stone-300">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// WEATHER SECTION
// ═════════════════════════════════════════════════════════════════════════════
function WeatherSection({ destination }: { destination: Destination }) {
  return (
    <section className="mb-12" aria-labelledby="weather-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
        When to Visit
      </p>
      <h2
        id="weather-heading"
        className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif"
      >
        Best Time to Visit
      </h2>
      <NatureDivider className="mb-6 !justify-start" />
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
        {destination.bestTimeToVisit}
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Summer */}
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl p-5 group hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-6 h-6 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="font-semibold text-stone-900 dark:text-emerald-100 font-serif uppercase tracking-wide text-sm">
              Summer
            </h3>
          </div>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            {destination.weather.summer}
          </p>
        </div>

        {/* Winter */}
        <div className="bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl p-5 group hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-6 h-6 text-stone-600 dark:text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <h3 className="font-semibold text-stone-900 dark:text-emerald-100 font-serif uppercase tracking-wide text-sm">
              Winter
            </h3>
          </div>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            {destination.weather.winter}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// THINGS TO DO SECTION
// ═════════════════════════════════════════════════════════════════════════════
function ThingsToDoSection({ destination }: { destination: Destination }) {
  return (
    <section className="mb-12" aria-labelledby="things-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
        Experiences
      </p>
      <h2
        id="things-heading"
        className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif"
      >
        Things to Do
      </h2>
      <NatureDivider className="mb-6 !justify-start" />
      <div className="grid md:grid-cols-2 gap-6">
        {destination.thingsToDo.map((activity, index) => (
          <article
            key={index}
            className="group bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Activity Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
                {activity.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// RELATED TOURS SECTION
// ═════════════════════════════════════════════════════════════════════════════
function RelatedToursSection({ tours }: { tours: Tour[] }) {
  if (tours.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby="related-heading">
      <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-1">
        Curated Journeys
      </p>
      <h2
        id="related-heading"
        className="text-2xl font-bold text-stone-900 dark:text-emerald-100 mb-4 font-serif"
      >
        Tours in This Destination
      </h2>
      <NatureDivider className="mb-6 !justify-start" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.slice(0, 3).map((tour) => (
          <Link
            key={tour.id}
            href={`/tours/${tour.slug}`}
            aria-label={`View Tour: ${tour.title}`}
            className="group bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm text-emerald-300 text-sm font-bold font-serif px-3 py-1 rounded-lg uppercase tracking-wide">
                ${tour.price.toLocaleString()}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-stone-900 dark:text-emerald-100 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-serif">
                {tour.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400 mt-auto pt-2 border-t border-stone-200 dark:border-slate-700">
                <span>{tour.duration}</span>
                <div
                  className="flex items-center gap-1"
                  aria-label={`Rated ${tour.rating} out of 5`}
                >
                  <svg
                    className="w-4 h-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-stone-900 dark:text-emerald-100">
                    {tour.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {tours.length > 3 && (
        <div className="text-center mt-8">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold uppercase tracking-wide text-sm group focus:outline-none focus:underline"
          >
            View All Tours
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  // Get related tours for this destination
  const relatedTours = getToursByDestination(destination.country.toLowerCase());

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <DestinationHero destination={destination} />

      <section className="py-12 px-4" aria-label="Destination details">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <OverviewSection destination={destination} />
              <WeatherSection destination={destination} />
              <ThingsToDoSection destination={destination} />
              <RelatedToursSection tours={relatedTours} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <QuickFactsCard destination={destination} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
