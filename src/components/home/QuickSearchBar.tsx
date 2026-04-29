"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export type SearchTour = {
  id: number;
  slug: string;
  title: string;
  titleRu?: string;
  destination: string;
  duration: string;
  durationRu?: string;
  durationDays: number;
  price: number;
  rating: number;
  image: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
};

type Props = {
  tours: SearchTour[];
};

export default function QuickSearchBar({ tours }: Props) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  // Unique countries from tour data — labels run through translation dict
  const countries = useMemo(() => {
    const unique = [...new Set(tours.map((tr) => tr.destination))];
    return unique.map((d) => {
      const capitalized = d.charAt(0).toUpperCase() + d.slice(1);
      return {
        value: d,
        label: t.destinations.countries[capitalized] ?? capitalized,
      };
    });
  }, [tours, t]);

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
    if (hasShort) options.push({ value: "short", label: t.home.search.short });
    if (hasMedium) options.push({ value: "medium", label: t.home.search.medium });
    if (hasLong) options.push({ value: "long", label: t.home.search.long });
    return options;
  }, [tours, destination, t]);

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
      aria-label={t.home.search.ariaLabel}
      className="bg-emerald-950 dark:bg-black border-t border-b border-emerald-500/20 py-6 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-emerald-400/80 text-xs uppercase tracking-[0.3em] mb-4">
          {t.home.search.eyebrow}
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
              {t.home.search.destinationLabel}
            </label>
            <select
              id="qs-destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDuration(""); // reset duration when country changes
              }}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">{t.home.search.anyDestination}</option>
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
              {t.home.search.durationLabel}
            </label>
            <select
              id="qs-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">{t.home.search.anyDuration}</option>
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
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg px-6 py-2.5 font-semibold text-sm uppercase tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300/50 whitespace-nowrap"
          >
            {showResults ? t.home.search.seeAllTours : t.home.search.findTours}
          </button>
        </form>

        {/* ── Instant results panel ── */}
        {showResults && (
          <div
            className="mt-5 border-t border-emerald-500/20 pt-5"
            aria-live="polite"
          >
            <p className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-3">
              {filteredTours.length}{" "}
              {filteredTours.length === 1
                ? t.home.search.tourSingular
                : t.home.search.tourPlural}
            </p>

            {filteredTours.length > 0 ? (
              <div className="space-y-2">
                {filteredTours.map((tour) => {
                  const title =
                    locale === "ru" && tour.titleRu ? tour.titleRu : tour.title;
                  const tourDuration =
                    locale === "ru" && tour.durationRu
                      ? tour.durationRu
                      : tour.duration;
                  const difficultyLabel = t.home.difficulty[tour.difficulty];
                  return (
                  <Link
                    key={tour.id}
                    href={`/tours/${tour.slug}`}
                    className="group flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded-lg">
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
                      <h3 className="text-sm font-semibold text-emerald-100 group-hover:text-emerald-400 transition-colors font-serif truncate">
                        {title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {tourDuration} · {difficultyLabel}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-stone-500 uppercase tracking-wider leading-none mb-0.5">
                        {t.home.search.from}
                      </p>
                      <p className="text-lg font-bold text-emerald-400 font-serif">
                        ${tour.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 text-stone-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block"
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
                  );
                })}
              </div>
            ) : (
              <p className="text-stone-500 text-sm text-center py-4">
                {t.home.search.noMatch}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
