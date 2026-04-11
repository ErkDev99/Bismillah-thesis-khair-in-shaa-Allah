"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  destinations,
  getUniqueCountries,
  type Destination,
} from "@/lib/data/destinations";

const GRADIENTS = [
  "from-amber-800 via-amber-900 to-stone-950",
  "from-stone-700 via-stone-800 to-stone-950",
  "from-amber-700 via-orange-800 to-amber-950",
  "from-stone-600 via-stone-700 to-stone-900",
  "from-amber-600 via-amber-700 to-stone-900",
  "from-stone-800 via-stone-900 to-black",
];

// Destination Card Component
function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <Link href={`/destinations/${destination.slug}`} className="group relative block">
      {/* Corner Accents */}
      <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
      <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
      <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
      <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />

      <div className="relative h-80 md:h-96 overflow-hidden border border-stone-200 dark:border-stone-800 group-hover:border-amber-400 transition-colors">
        {/* Background Gradient Placeholder */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform duration-500`}
        >
          {/* Uncomment when you have images:
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          */}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 text-xs uppercase tracking-wider font-medium">
            Featured
          </div>
        )}

        {/* Tour Count Badge */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-amber-300 border border-amber-500/30 px-3 py-1 text-xs uppercase tracking-wider">
          {destination.tourCount} tours
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-1">
            {destination.country}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 group-hover:text-amber-300 transition-colors">
            {destination.name}
          </h3>
          <p className="text-stone-300 text-sm line-clamp-2 mb-4">
            {destination.description}
          </p>

          {/* Highlights Preview */}
          <div className="flex flex-wrap gap-2">
            {destination.highlights.slice(0, 2).map((highlight, i) => (
              <span
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 text-xs text-stone-200"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Country Filter Component
function CountryFilter({
  countries,
  activeCountry,
  setActiveCountry,
}: {
  countries: string[];
  activeCountry: string;
  setActiveCountry: (country: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filter by country">
      <button
        onClick={() => setActiveCountry("")}
        className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
          activeCountry === ""
            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
            : "border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 bg-white dark:bg-stone-900"
        }`}
      >
        All Destinations
      </button>
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => setActiveCountry(country)}
          className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
            activeCountry === country
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
              : "border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 bg-white dark:bg-stone-900"
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "6+", label: "Destinations" },
    { value: "50+", label: "Tours" },
    { value: "3", label: "Countries" },
    { value: "1000+", label: "Happy Travelers" },
  ];

  return (
    <div className="relative bg-stone-900 dark:bg-black text-white py-14 px-4 overflow-hidden">
      {/* Geometric SVG Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="stats-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5"/>
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#stats-pattern)"/>
        </svg>
      </div>
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        {/* Diamond Divider */}
        <div className="flex items-center justify-center gap-2 mb-10" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-amber-500/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
          <div className="h-px w-12 md:w-20 bg-amber-500/50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="font-serif text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-amber-200/70 text-xs uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Destinations Page
export default function DestinationsPage() {
  const [activeCountry, setActiveCountry] = useState("");

  const countries = getUniqueCountries();

  const filteredDestinations = useMemo(() => {
    if (!activeCountry) return destinations;
    return destinations.filter(
      (dest) => dest.country.toLowerCase() === activeCountry.toLowerCase()
    );
  }, [activeCountry]);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      {/* Hero Section */}
      <section className="relative bg-stone-900 dark:bg-stone-950 text-white py-20 px-4 overflow-hidden" aria-labelledby="destinations-heading">
        {/* Geometric SVG Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="hero-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-pattern)"/>
          </svg>
        </div>
        {/* Radial Amber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-amber-400/70 uppercase tracking-[0.3em] text-xs mb-4" aria-hidden="true">
            Central Asia
          </p>
          <h1 id="destinations-heading" className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Explore Our Destinations
          </h1>
          {/* Diamond Divider */}
          <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
            <div className="h-px w-12 md:w-20 bg-amber-500/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
            <div className="h-px w-12 md:w-20 bg-amber-500/50" />
          </div>
          <p className="text-amber-100/70 max-w-3xl mx-auto text-lg md:text-xl">
            From the snow-capped peaks of the Tian Shan to the ancient Silk Road
            cities, discover the wonders of Central Asia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4" aria-label="Destinations listing">
        <div className="max-w-7xl mx-auto">
          {/* Country Filter */}
          <CountryFilter
            countries={countries}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
          />

          {/* Results Count */}
          <p className="text-stone-600 dark:text-stone-400 mb-8 text-center text-sm uppercase tracking-wider">
            Showing{" "}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {filteredDestinations.length}
            </span>{" "}
            destination{filteredDestinations.length !== 1 ? "s" : ""}
            {activeCountry && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {activeCountry}
                </span>
              </>
            )}
          </p>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-stone-300 dark:text-stone-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No destinations found
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                We don&apos;t have destinations in this country yet.
              </p>
              <button
                onClick={() => setActiveCountry("")}
                className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium text-sm uppercase tracking-wider"
              >
                View all destinations
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-20">
            <StatsSection />
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 py-16 px-4 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-4" aria-hidden="true">
              Plan Your Journey
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Can&apos;t decide where to go?
            </h2>
            {/* Diamond Divider */}
            <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
              <div className="h-px w-12 bg-amber-500/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
              <div className="h-px w-12 bg-amber-500/50" />
            </div>
            <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto">
              Our travel experts can help you plan the perfect itinerary based on
              your interests, budget, and time frame.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 font-medium uppercase tracking-wider transition-colors"
            >
              Talk to an Expert
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
