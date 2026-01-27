"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  destinations,
  getUniqueCountries,
  type Destination,
} from "@/lib/data/destinations";

// Destination Card Component
function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group">
      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
        {/* Background Gradient Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 group-hover:scale-105 transition-transform duration-500">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}

        {/* Tour Count Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {destination.tourCount} tours
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-emerald-300 text-sm font-medium mb-1">
            {destination.country}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">
            {destination.name}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2 mb-4">
            {destination.description}
          </p>

          {/* Highlights Preview */}
          <div className="flex flex-wrap gap-2">
            {destination.highlights.slice(0, 2).map((highlight, index) => (
              <span
                key={index}
                className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs"
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
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => setActiveCountry("")}
        className={`px-5 py-2 rounded-full font-medium transition-colors ${
          activeCountry === ""
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Destinations
      </button>
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => setActiveCountry(country)}
          className={`px-5 py-2 rounded-full font-medium transition-colors ${
            activeCountry === country
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
    <div className="bg-emerald-900 text-white py-12 px-4 mb-16 rounded-2xl">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
              {stat.value}
            </div>
            <div className="text-emerald-200">{stat.label}</div>
          </div>
        ))}
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-90" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore Our Destinations
          </h1>
          <p className="text-emerald-200 max-w-3xl mx-auto text-lg md:text-xl">
            From the snow-capped peaks of the Tian Shan to the ancient Silk Road
            cities, discover the wonders of Central Asia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Country Filter */}
          <CountryFilter
            countries={countries}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
          />

          {/* Results Count */}
          <p className="text-gray-600 mb-8 text-center">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredDestinations.length}
            </span>{" "}
            destination{filteredDestinations.length !== 1 ? "s" : ""}
            {activeCountry && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-gray-900">
                  {activeCountry}
                </span>
              </>
            )}
          </p>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No destinations found
              </h3>
              <p className="text-gray-600 mb-4">
                We don&apos;t have destinations in this country yet.
              </p>
              <button
                onClick={() => setActiveCountry("")}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
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
          <div className="text-center mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can&apos;t decide where to go?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our travel experts can help you plan the perfect itinerary based on
              your interests, budget, and time frame.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Talk to an Expert
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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