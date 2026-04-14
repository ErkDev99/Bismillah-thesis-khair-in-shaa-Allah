// src/app/tours/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — filters & sorting require interactivity.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  tours,
  getUniqueDestinations,
  getUniqueCategories,
  getUniqueDifficulties,
  type Tour,
} from "@/lib/data/tours";

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

// ─── Filter State Type ───────────────────────────────────────────────────────
interface FilterState {
  destination: string;
  category: string;
  difficulty: string;
  priceRange: [number, number];
  duration: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// FILTER SIDEBAR
// ═════════════════════════════════════════════════════════════════════════════
function FilterSidebar({
  filters,
  setFilters,
  destinations,
  categories,
  difficulties,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  destinations: string[];
  categories: string[];
  difficulties: string[];
}) {
  const clearFilters = () => {
    setFilters({
      destination: "",
      category: "",
      difficulty: "",
      priceRange: [0, 5000],
      duration: "",
    });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0" aria-label="Tour filters">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-amber-100 font-serif">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 uppercase tracking-wider font-medium"
          >
            Clear all
          </button>
        </div>

        {/* Destination Filter */}
        <div className="mb-6">
          <label htmlFor="filter-destination" className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2 uppercase tracking-[0.2em]">
            Destination
          </label>
          <select
            id="filter-destination"
            value={filters.destination}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, destination: e.target.value }))
            }
            className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Destinations</option>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest.charAt(0).toUpperCase() + dest.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label htmlFor="filter-category" className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2 uppercase tracking-[0.2em]">
            Category
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <label htmlFor="filter-difficulty" className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2 uppercase tracking-[0.2em]">
            Difficulty
          </label>
          <select
            id="filter-difficulty"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, difficulty: e.target.value }))
            }
            className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Any Difficulty</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Filter */}
        <div className="mb-6">
          <label htmlFor="filter-duration" className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2 uppercase tracking-[0.2em]">
            Duration
          </label>
          <select
            id="filter-duration"
            value={filters.duration}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, duration: e.target.value }))
            }
            className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Any Duration</option>
            <option value="short">1-5 Days</option>
            <option value="medium">6-10 Days</option>
            <option value="long">11+ Days</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label htmlFor="filter-price" className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2 uppercase tracking-[0.2em]">
            Max Price: <span className="text-amber-700 dark:text-amber-400 font-serif">${filters.priceRange[1]}</span>
          </label>
          <input
            id="filter-price"
            type="range"
            min="500"
            max="5000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [0, parseInt(e.target.value)],
              }))
            }
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 mt-1">
            <span>$500</span>
            <span>$5,000</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// TOUR CARD
// ═════════════════════════════════════════════════════════════════════════════
function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const difficultyStyles: Record<Tour["difficulty"], string> = {
    Easy: "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700",
    Moderate: "bg-orange-100 text-orange-800 border border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700",
    Challenging: "bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
  };

  return (
    <article className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Art Deco corner accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />

        {/* Difficulty badge */}
        <div className="absolute top-3 left-10 z-10">
          <span className={`px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${difficultyStyles[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
        </div>

        {/* Featured badge */}
        {tour.featured && (
          <div className="absolute top-3 right-10 z-10">
            <span className="bg-amber-500 text-white px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
              Featured
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 z-10 bg-stone-900/80 backdrop-blur-sm text-amber-400 px-3 py-1.5 font-bold font-serif text-lg">
          ${tour.price.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.2em] text-xs mb-1">
          {tour.destination}
        </p>
        <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-2 font-serif group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
          {tour.title}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2 flex-1">
          {tour.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3" aria-label={`Rating: ${tour.rating} out of 5 stars, ${tour.reviewCount} reviews`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 fill-current ${
                i < Math.round(tour.rating) ? "text-amber-400" : "text-stone-300 dark:text-stone-600"
              }`}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm font-semibold text-stone-900 dark:text-amber-100 ml-1">{tour.rating}</span>
          <span className="text-sm text-stone-600 dark:text-stone-400">({tour.reviewCount})</span>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400 mb-4 border-t border-stone-100 dark:border-stone-800 pt-3">
          <span>{tour.duration}</span>
          <span>{tour.groupSize}</span>
        </div>

        {/* CTA */}
        <Link
          href={`/tours/${tour.slug}`}
          aria-label={`View details for ${tour.title}`}
          className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 text-white py-2.5 font-semibold uppercase tracking-wider text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
        >
          View Tour
        </Link>
      </div>
    </article>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SORT OPTIONS
// ═════════════════════════════════════════════════════════════════════════════
function SortOptions({
  sortBy,
  setSortBy,
  resultCount,
}: {
  sortBy: string;
  setSortBy: (value: string) => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <p className="text-stone-600 dark:text-stone-400">
        <span className="font-semibold text-stone-900 dark:text-amber-100">{resultCount}</span> tours
        found
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-wider">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="duration">Duration</option>
        </select>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function ToursPage() {
  const [filters, setFilters] = useState<FilterState>({
    destination: "",
    category: "",
    difficulty: "",
    priceRange: [0, 5000],
    duration: "",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const destinations = getUniqueDestinations();
  const categories = getUniqueCategories();
  const difficulties = getUniqueDifficulties();

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (filters.destination) {
      result = result.filter(
        (tour) =>
          tour.destination.toLowerCase() === filters.destination.toLowerCase()
      );
    }
    if (filters.category) {
      result = result.filter(
        (tour) =>
          tour.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.difficulty) {
      result = result.filter(
        (tour) => tour.difficulty === filters.difficulty
      );
    }
    if (filters.duration) {
      result = result.filter((tour) => {
        if (filters.duration === "short") return tour.durationDays <= 5;
        if (filters.duration === "medium")
          return tour.durationDays >= 6 && tour.durationDays <= 10;
        if (filters.duration === "long") return tour.durationDays > 10;
        return true;
      });
    }
    result = result.filter((tour) => tour.price <= filters.priceRange[1]);

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        result.sort((a, b) => a.durationDays - b.durationDays);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      {/* Page Header */}
      <section className="relative bg-stone-900 dark:bg-black text-white py-4 md:py-6 px-4 overflow-hidden">
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
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        {/* Art Deco geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <svg width="100%" height="100%">
            <pattern id="tours-header-deco" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#tours-header-deco)"/>
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            Curated Journeys
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 font-serif leading-tight">
            Explore Our <span className="text-amber-400">Tours</span>
          </h1>
          <DiamondDivider className="mb-4" />
          <p className="text-stone-300 max-w-2xl mx-auto text-base md:text-lg">
            From cultural immersions to mountain expeditions, find the perfect
            adventure for your travel style.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4" aria-label="Tour listings">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 px-4 py-3 font-medium text-stone-900 dark:text-stone-100 uppercase tracking-wider text-sm hover:border-amber-500 transition-colors"
            aria-expanded={mobileFiltersOpen}
            aria-controls="mobile-filters"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                destinations={destinations}
                categories={categories}
                difficulties={difficulties}
              />
            </div>

            {/* Sidebar - Mobile */}
            {mobileFiltersOpen && (
              <div className="lg:hidden" id="mobile-filters">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  destinations={destinations}
                  categories={categories}
                  difficulties={difficulties}
                />
              </div>
            )}

            {/* Tour Grid */}
            <div className="flex-1">
              <SortOptions
                sortBy={sortBy}
                setSortBy={setSortBy}
                resultCount={filteredTours.length}
              />

              {filteredTours.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTours.map((tour, i) => (
                    <TourCard key={tour.id} tour={tour} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
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
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-amber-100 mb-2 font-serif">
                    No tours found
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 mb-4">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        destination: "",
                        category: "",
                        difficulty: "",
                        priceRange: [0, 5000],
                        duration: "",
                      })
                    }
                    className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium uppercase tracking-wider text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}