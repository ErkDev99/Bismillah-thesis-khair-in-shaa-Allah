"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export type SearchTour = {
  id: number;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  durationDays: number;
  price: number;
  rating: number;
  image: string;
  difficulty: string;
};

type Props = {
  tours: SearchTour[];
};

export default function QuickSearchBar({ tours }: Props) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  // Unique countries from tour data
  const countries = useMemo(() => {
    const unique = [...new Set(tours.map((t) => t.destination))];
    return unique.map((d) => ({
      value: d,
      label: d.charAt(0).toUpperCase() + d.slice(1),
    }));
  }, [tours]);

  // Filter tours based on current selection
  const filteredTours = useMemo(() => {
    let result = tours;
    if (destination) {
      result = result.filter((t) => t.destination === destination);
    }
    if (duration) {
      result = result.filter((t) => {
        if (duration === "short") return t.durationDays <= 5;
        if (duration === "medium")
          return t.durationDays >= 6 && t.durationDays <= 10;
        if (duration === "long") return t.durationDays >= 11;
        return true;
      });
    }
    return result;
  }, [tours, destination, duration]);

  // Only show duration options that have matching tours for the selected country
  const availableDurations = useMemo(() => {
    const relevantTours = destination
      ? tours.filter((t) => t.destination === destination)
      : tours;

    const hasShort = relevantTours.some((t) => t.durationDays <= 5);
    const hasMedium = relevantTours.some(
      (t) => t.durationDays >= 6 && t.durationDays <= 10
    );
    const hasLong = relevantTours.some((t) => t.durationDays >= 11);

    const options: { value: string; label: string }[] = [];
    if (hasShort) options.push({ value: "short", label: "1–5 Days" });
    if (hasMedium) options.push({ value: "medium", label: "6–10 Days" });
    if (hasLong) options.push({ value: "long", label: "11+ Days" });
    return options;
  }, [tours, destination]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (duration) params.set("duration", duration);
    const qs = params.toString();
    router.push(qs ? `/tours?${qs}` : "/tours");
  };

  const showResults = destination !== "";

  return (
    <section
      aria-label="Find a tour"
      className="bg-stone-900 dark:bg-black border-t border-b border-amber-500/20 py-6 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-amber-400/80 text-xs uppercase tracking-[0.3em] mb-4">
          Find Your Journey
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end"
        >
          {/* ── Country picker ── */}
          <div>
            <label
              htmlFor="qs-destination"
              className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-[0.2em]"
            >
              Destination
            </label>
            <select
              id="qs-destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDuration(""); // reset duration when country changes
              }}
              className="w-full px-3 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Any destination</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── Duration picker (dynamic options) ── */}
          <div>
            <label
              htmlFor="qs-duration"
              className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-[0.2em]"
            >
              Duration
            </label>
            <select
              id="qs-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Any duration</option>
              {availableDurations.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2.5 font-semibold text-sm uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300/50 whitespace-nowrap"
          >
            {showResults ? "See All Tours" : "Find Tours"}
          </button>
        </form>

        {/* ── Instant results panel ── */}
        {showResults && (
          <div
            className="mt-5 border-t border-amber-500/20 pt-5"
            aria-live="polite"
          >
            <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-3">
              {filteredTours.length}{" "}
              {filteredTours.length === 1 ? "tour" : "tours"} available
            </p>

            {filteredTours.length > 0 ? (
              <div className="space-y-2">
                {filteredTours.map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/tours/${tour.slug}`}
                    className="group flex items-center gap-3 sm:gap-4 p-3 bg-stone-800/50 border border-stone-700/50 hover:border-amber-500/50 hover:bg-stone-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Tour name + meta */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-amber-100 group-hover:text-amber-400 transition-colors font-serif truncate">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {tour.duration} · {tour.difficulty}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider leading-none mb-0.5">
                        From
                      </p>
                      <p className="text-lg font-bold text-amber-400 font-serif">
                        ${tour.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 text-stone-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 text-sm text-center py-4">
                No tours match your selection. Try a different duration.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
