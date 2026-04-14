"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  destinations: string[];
};

export default function QuickSearchBar({ destinations }: Props) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (duration) params.set("duration", duration);
    const qs = params.toString();
    router.push(qs ? `/tours?${qs}` : "/tours");
  };

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
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Any destination</option>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
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
              <option value="short">1–5 Days</option>
              <option value="medium">6–10 Days</option>
              <option value="long">11+ Days</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2.5 font-semibold text-sm uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300/50 whitespace-nowrap"
          >
            Find Tours
          </button>
        </form>
      </div>
    </section>
  );
}
