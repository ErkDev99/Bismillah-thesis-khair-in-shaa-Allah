"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  tours,
  getUniqueDestinations,
  getUniqueCategories,
  getUniqueDifficulties,
  type Tour,
} from "@/lib/data/tours";

// Filter Sidebar Component
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
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Clear all
          </button>
        </div>

        {/* Destination Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <select
            value={filters.destination}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, destination: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, difficulty: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Levels</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <select
            value={filters.duration}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, duration: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Any Duration</option>
            <option value="short">1-5 Days</option>
            <option value="medium">6-10 Days</option>
            <option value="long">11+ Days</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price: ${filters.priceRange[1]}
          </label>
          <input
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
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$500</span>
            <span>$5000</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Tour Card Component
function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/tours/${tour.slug}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-200 to-emerald-400">
          {/* Uncomment when you have images:
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                tour.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : tour.difficulty === "Moderate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {tour.difficulty}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-emerald-700">
            ${tour.price}
          </div>
          {tour.featured && (
            <div className="absolute bottom-3 left-3 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {tour.location}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {tour.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {tour.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1 text-sm">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-600">{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium text-gray-900">{tour.rating}</span>
              <span className="text-gray-400 text-sm">
                ({tour.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Sort Options Component
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
      <p className="text-gray-600">
        <span className="font-semibold text-gray-900">{resultCount}</span> tours
        found
      </p>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
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

// Filter State Type
interface FilterState {
  destination: string;
  category: string;
  difficulty: string;
  priceRange: [number, number];
  duration: string;
}

// Main Tours Page Component
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

  // Get unique filter options
  const destinations = getUniqueDestinations();
  const categories = getUniqueCategories();
  const difficulties = getUniqueDifficulties();

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Apply filters
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

    // Apply sorting
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
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Tours
          </h1>
          <p className="text-emerald-200 max-w-2xl mx-auto text-lg">
            From cultural immersions to mountain expeditions, find the perfect
            adventure for your travel style.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 font-medium"
          >
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
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
              <div className="lg:hidden">
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
                  {filteredTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl">
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
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No tours found
                  </h3>
                  <p className="text-gray-600 mb-4">
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
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
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