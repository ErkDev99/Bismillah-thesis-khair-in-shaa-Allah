"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  destinations,
  getUniqueCountries,
  type Destination,
} from "@/lib/data/destinations";
import { useLocale } from "@/components/LocaleProvider";
import type { Translations } from "@/lib/translations/en";

type TDestinations = Translations["destinations"];

// Destination Card Component
function DestinationCard({
  destination,
  locale,
  t,
}: {
  destination: Destination;
  locale: string;
  t: TDestinations;
}) {
  const name = locale === "ru" && destination.nameRu ? destination.nameRu : destination.name;
  const country =
    locale === "ru" && destination.countryRu ? destination.countryRu : destination.country;
  const description =
    locale === "ru" && destination.descriptionRu
      ? destination.descriptionRu
      : destination.description;
  const highlights =
    locale === "ru" && destination.highlightsRu
      ? destination.highlightsRu
      : destination.highlights;

  return (
    <Link href={`/destinations/${destination.slug}`} className="group relative block">
      <div className="relative h-80 md:h-96 overflow-hidden rounded-xl border border-stone-200 dark:border-slate-800 group-hover:border-emerald-400 transition-colors">
        {/* Destination Image */}
        <Image
          src={destination.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-full px-3 py-1 text-xs uppercase tracking-wide font-medium">
            {t.card.featured}
          </div>
        )}

        {/* Tour Count Badge */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-1 text-xs uppercase tracking-wide">
          {destination.tourCount} {t.card.toursSuffix}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] mb-1">
            {country}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">
            {name}
          </h3>
          <p className="text-stone-300 text-sm line-clamp-2 mb-4">
            {description}
          </p>

          {/* Highlights Preview */}
          <div className="flex flex-wrap gap-2">
            {highlights.slice(0, 2).map((highlight, i) => (
              <span
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-2 py-1 text-xs text-stone-200"
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
  t,
}: {
  countries: string[];
  activeCountry: string;
  setActiveCountry: (country: string) => void;
  t: TDestinations;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label={t.filters.ariaLabel}>
      <button
        onClick={() => setActiveCountry("")}
        className={`px-5 py-2 rounded-lg text-xs uppercase tracking-wide font-medium transition-colors ${
          activeCountry === ""
            ? "bg-emerald-600 text-white"
            : "border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900"
        }`}
      >
        {t.filters.all}
      </button>
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => setActiveCountry(country)}
          className={`px-5 py-2 rounded-lg text-xs uppercase tracking-wide font-medium transition-colors ${
            activeCountry === country
              ? "bg-emerald-600 text-white"
              : "border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-stone-300 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900"
          }`}
        >
          {t.countries[country] ?? country}
        </button>
      ))}
    </div>
  );
}

// Stats Section
function StatsSection({ t }: { t: TDestinations }) {
  const stats = [
    { value: "6+", label: t.stats.destinations },
    { value: "50+", label: t.stats.tours },
    { value: "3", label: t.stats.countries },
    { value: "1000+", label: t.stats.travelers },
  ];

  return (
    <div className="relative bg-emerald-950 dark:bg-black text-white py-14 px-4 overflow-hidden rounded-xl">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        {/* Nature Divider */}
        <div className="flex items-center justify-center gap-3 mb-10" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
          <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
          </svg>
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="font-serif text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-emerald-200/70 text-xs uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Destinations Page
export default function DestinationsPage() {
  const { locale, t } = useLocale();
  const tDest = t.destinations;

  const [activeCountry, setActiveCountry] = useState("");

  const countries = getUniqueCountries();

  const filteredDestinations = useMemo(() => {
    if (!activeCountry) return destinations;
    return destinations.filter(
      (dest) => dest.country.toLowerCase() === activeCountry.toLowerCase()
    );
  }, [activeCountry]);

  const activeCountryLabel = activeCountry
    ? tDest.countries[activeCountry] ?? activeCountry
    : "";

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-emerald-950 dark:bg-slate-950 text-white overflow-hidden" aria-labelledby="destinations-heading">
        {/* Background image */}
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
        {/* Radial Emerald Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative z-10 px-4 max-w-4xl mx-auto text-center py-4 md:py-6">
          <p className="text-emerald-300 uppercase tracking-[0.3em] text-xs mb-2 drop-shadow-md" aria-hidden="true">
            {tDest.hero.eyebrow}
          </p>
          <h1 id="destinations-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 drop-shadow-lg">
            {tDest.hero.title}
          </h1>
          {/* Nature Divider */}
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <div className="h-px w-12 md:w-20 bg-emerald-400/70" />
            <svg className="w-5 h-5 text-emerald-300 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
            </svg>
            <div className="h-px w-12 md:w-20 bg-emerald-400/70" />
          </div>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {tDest.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4" aria-label={tDest.listingsAriaLabel}>
        <div className="max-w-7xl mx-auto">
          {/* Country Filter */}
          <CountryFilter
            countries={countries}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
            t={tDest}
          />

          {/* Results Count */}
          <p className="text-stone-600 dark:text-stone-400 mb-8 text-center text-sm uppercase tracking-wide">
            {tDest.results.showingPrefix}{" "}
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {filteredDestinations.length}
            </span>{" "}
            {filteredDestinations.length === 1
              ? tDest.results.destinationSingular
              : tDest.results.destinationPlural}
            {activeCountry && (
              <>
                {" "}
                {tDest.results.in}{" "}
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {activeCountryLabel}
                </span>
              </>
            )}
          </p>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  locale={locale}
                  t={tDest}
                />
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
                {tDest.empty.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">
                {tDest.empty.subtitle}
              </p>
              <button
                onClick={() => setActiveCountry("")}
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium text-sm uppercase tracking-wide"
              >
                {tDest.empty.viewAll}
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-20">
            <StatsSection t={tDest} />
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 py-16 px-4 bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl">
            <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-4" aria-hidden="true">
              {tDest.cta.eyebrow}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              {tDest.cta.title}
            </h2>
            {/* Nature Divider */}
            <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
              <div className="h-px w-12 bg-emerald-500/40" />
              <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
              </svg>
              <div className="h-px w-12 bg-emerald-500/40" />
            </div>
            <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto">
              {tDest.cta.subtitle}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg px-8 py-4 font-medium uppercase tracking-wide transition-colors"
            >
              {tDest.cta.button}
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
