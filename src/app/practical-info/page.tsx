// src/app/practical-info/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — no "use client" needed.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Practical Travel Info | Wanderlust — Central Asia",
  description:
    "Everything you need to prepare for your Central Asian adventure: visas, weather, packing lists, health, money, and cultural etiquette for Kazakhstan, Kyrgyzstan, and Uzbekistan.",
  openGraph: {
    title: "Practical Travel Info — Central Asia",
    description:
      "Visas, weather, packing, health, money, and cultural etiquette for travel to Kazakhstan, Kyrgyzstan, and Uzbekistan.",
    type: "website",
    siteName: "Wanderlust",
  },
};

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

// ─── Corner Accents — 4 corners on a card ────────────────────────────────────
function CornerAccents() {
  return (
    <>
      <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
      <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
      <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
      <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" aria-hidden="true" />
    </>
  );
}

// ─── Eyebrow Label ───────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
      {children}
    </p>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const visaInfo = [
  {
    country: "Kazakhstan",
    flag: "🇰🇿",
    visaFree: ["USA", "UK", "EU countries", "Canada", "Australia", "Japan", "South Korea", "UAE"],
    duration: "30 days",
    notes: "Visa-free for 70+ countries. Registration required for stays over 30 days.",
  },
  {
    country: "Kyrgyzstan",
    flag: "🇰🇬",
    visaFree: ["USA", "UK", "EU countries", "Canada", "Australia", "Japan", "Most countries"],
    duration: "60 days",
    notes: "One of the most open visa policies in Central Asia. E-visa available for others.",
  },
  {
    country: "Uzbekistan",
    flag: "🇺🇿",
    visaFree: ["USA", "UK", "EU countries", "Canada", "Australia", "Japan", "South Korea"],
    duration: "30 days",
    notes: "Visa-free since 2019 for 90+ countries. E-visa available for others.",
  },
];

const weatherData = [
  {
    season: "Spring (Mar-May)",
    icon: "🌸",
    description: "Mild temperatures, occasional rain. Flowers bloom across the steppes.",
    temp: "10-20°C (50-68°F)",
    ideal: "City tours, cultural sites, photography",
  },
  {
    season: "Summer (Jun-Aug)",
    icon: "☀️",
    description: "Hot in lowlands, perfect in mountains. Peak trekking season.",
    temp: "25-40°C (77-104°F)",
    ideal: "Mountain treks, lake visits, nomadic experiences",
  },
  {
    season: "Autumn (Sep-Nov)",
    icon: "🍂",
    description: "Golden colors, comfortable temperatures. Fewer crowds.",
    temp: "10-25°C (50-77°F)",
    ideal: "Hiking, photography, cultural festivals",
  },
  {
    season: "Winter (Dec-Feb)",
    icon: "❄️",
    description: "Cold but magical. Skiing opportunities in mountains.",
    temp: "-10 to 5°C (14-41°F)",
    ideal: "Skiing, winter landscapes, hot springs",
  },
];

const packingLists = {
  essentials: [
    "Passport (valid 6+ months)",
    "Travel insurance documents",
    "Copies of important documents",
    "Credit/debit cards + some cash (USD)",
    "Phone + charger + adapter (Type C/F)",
    "Medications + basic first aid",
    "Sunscreen + sunglasses",
    "Reusable water bottle",
  ],
  clothing: [
    "Layers (weather varies greatly)",
    "Comfortable walking shoes",
    "Light jacket or fleece",
    "Rain jacket (spring/autumn)",
    "Hat for sun protection",
    "Modest clothing for religious sites",
    "Warm clothes if visiting mountains",
    "Swimwear (for lakes/pools)",
  ],
  trekking: [
    "Sturdy hiking boots (broken in)",
    "Trekking poles",
    "Daypack (20-30L)",
    "Headlamp + batteries",
    "Thermal underwear",
    "Down jacket",
    "Gloves + warm hat",
    "Sleeping bag liner (for yurt stays)",
  ],
};

const healthSafety = [
  {
    title: "Vaccinations",
    icon: "💉",
    content:
      "No mandatory vaccinations required. Recommended: Hepatitis A & B, Typhoid, routine vaccinations. Consult your doctor 4-6 weeks before travel.",
  },
  {
    title: "Altitude",
    icon: "⛰️",
    content:
      "Many destinations are above 2,000m. Acclimatize gradually, stay hydrated, and watch for altitude sickness symptoms. Descend if symptoms worsen.",
  },
  {
    title: "Water",
    icon: "💧",
    content:
      "Drink only bottled or purified water. Avoid ice in drinks outside major hotels. Bottled water is widely available and inexpensive.",
  },
  {
    title: "Safety",
    icon: "🛡️",
    content:
      "Central Asia is generally very safe for tourists. Use common sense, avoid displaying expensive items, and keep valuables secure.",
  },
];

const moneyInfo = [
  {
    country: "Kazakhstan",
    currency: "Tenge (KZT)",
    rate: "~450 KZT = 1 USD",
    tips:
      "ATMs widely available in cities. Cards accepted in major establishments. Carry cash for bazaars and rural areas.",
  },
  {
    country: "Kyrgyzstan",
    currency: "Som (KGS)",
    rate: "~88 KGS = 1 USD",
    tips: "Cash preferred in most places. ATMs available in Bishkek and major towns. USD easily exchanged.",
  },
  {
    country: "Uzbekistan",
    currency: "Som (UZS)",
    rate: "~12,500 UZS = 1 USD",
    tips: "Cash is king. Bring clean, new USD bills. Cards increasingly accepted in tourist areas.",
  },
];

const culturalTips = [
  {
    title: "Hospitality",
    description:
      "Central Asians are incredibly hospitable. You may be invited into homes for tea—it's polite to accept. Remove shoes when entering homes.",
  },
  {
    title: "Greetings",
    description:
      "Handshakes are common between men. With women, wait for them to extend their hand first. A slight bow shows respect to elders.",
  },
  {
    title: "Bread",
    description:
      "Bread (non/nan) is sacred. Never place it upside down, throw it away, or put it on the ground. Break it by hand, don't cut with a knife.",
  },
  {
    title: "Photography",
    description:
      "Always ask permission before photographing people. Some religious sites prohibit photography. Military installations are off-limits.",
  },
  {
    title: "Dress Code",
    description:
      "Dress modestly, especially at religious sites. Women should cover shoulders and knees. Headscarves required at some mosques.",
  },
  {
    title: "Bargaining",
    description:
      "Expected at bazaars and markets. Start at 50-60% of asking price. Keep it friendly and smile. Fixed prices in shops and supermarkets.",
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="Practical travel information"
      className="relative text-center text-white overflow-hidden"
    >
      <Image
        src="/images/hero/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="info-hero-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#info-hero-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
          <span className="text-amber-400/80 text-xs tracking-[0.3em] uppercase">Travel Guide</span>
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
        </div>

        <p className="text-amber-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          Know Before You Go
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif">
          Practical <span className="text-amber-400">Information</span>
        </h1>

        <p className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Everything you need to know to prepare for your Central Asian adventure.
        </p>

        <DiamondDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// QUICK NAV — sticky section jump bar
// ═════════════════════════════════════════════════════════════════════════════
function QuickNav() {
  const sections = [
    { id: "visa", label: "Visa Info" },
    { id: "weather", label: "Weather" },
    { id: "packing", label: "Packing" },
    { id: "health", label: "Health & Safety" },
    { id: "money", label: "Money" },
    { id: "culture", label: "Culture" },
  ];

  return (
    <nav
      aria-label="Practical info sections"
      className="bg-stone-900 dark:bg-black border-b border-amber-500/20 sticky top-16 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 px-4 py-2 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 text-xs font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// VISA SECTION
// ═════════════════════════════════════════════════════════════════════════════
function VisaSection() {
  return (
    <section
      id="visa"
      aria-labelledby="visa-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Entry Requirements</Eyebrow>
          <h2
            id="visa-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Visa Information
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visaInfo.map((country) => (
            <article
              key={country.country}
              className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-6"
            >
              <CornerAccents />
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl" aria-hidden="true">
                  {country.flag}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-amber-100 font-serif">
                  {country.country}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    Visa-free duration
                  </p>
                  <p className="font-semibold text-amber-700 dark:text-amber-400 font-serif text-lg">
                    {country.duration}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    Visa-free for citizens of
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm mt-0.5">
                    {country.visaFree.join(", ")}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {country.notes}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          role="note"
          className="relative mt-8 bg-amber-100/50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 p-5"
        >
          <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
            <strong className="uppercase tracking-wider text-xs">Note:</strong>{" "}
            Visa requirements change frequently. Always verify current
            requirements with the official embassy or consulate before traveling.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// WEATHER SECTION
// ═════════════════════════════════════════════════════════════════════════════
function WeatherSection() {
  return (
    <section
      id="weather"
      aria-labelledby="weather-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-stone-100 dark:bg-stone-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>When to Visit</Eyebrow>
          <h2
            id="weather-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Weather &amp; Best Time to Visit
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherData.map((season) => (
            <article
              key={season.season}
              className="group relative bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-6"
            >
              <CornerAccents />
              <div className="text-4xl mb-3" aria-hidden="true">
                {season.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-2 font-serif">
                {season.season}
              </h3>
              <p className="text-amber-700 dark:text-amber-400 font-serif text-sm mb-3">
                {season.temp}
              </p>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
                {season.description}
              </p>
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                  Best for
                </p>
                <p className="text-sm text-stone-700 dark:text-stone-300 mt-1">
                  {season.ideal}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PACKING SECTION
// ═════════════════════════════════════════════════════════════════════════════
function PackingCard({
  title,
  emoji,
  items,
}: {
  title: string;
  emoji: string;
  items: string[];
}) {
  return (
    <article className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-6">
      <CornerAccents />
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 border border-amber-500/40 bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
          <span className="text-xl" aria-hidden="true">
            {emoji}
          </span>
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 font-serif">
          {title}
        </h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-stone-600 dark:text-stone-400 text-sm"
          >
            <svg
              className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PackingSection() {
  return (
    <section
      id="packing"
      aria-labelledby="packing-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>What to Bring</Eyebrow>
          <h2
            id="packing-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Packing Lists
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <PackingCard title="Essentials" emoji="📋" items={packingLists.essentials} />
          <PackingCard title="Clothing" emoji="👕" items={packingLists.clothing} />
          <PackingCard title="Trekking Gear" emoji="🥾" items={packingLists.trekking} />
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HEALTH SECTION
// ═════════════════════════════════════════════════════════════════════════════
function HealthSection() {
  return (
    <section
      id="health"
      aria-labelledby="health-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-stone-100 dark:bg-stone-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Stay Well</Eyebrow>
          <h2
            id="health-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Health &amp; Safety
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {healthSafety.map((item) => (
            <article
              key={item.title}
              className="group relative bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-6 flex gap-4"
            >
              <CornerAccents />
              <div className="text-3xl shrink-0" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-2 font-serif">
                  {item.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          role="alert"
          className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 p-5"
        >
          <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">
            <strong className="uppercase tracking-wider text-xs">Emergency Numbers:</strong>{" "}
            Police: 102 | Ambulance: 103 | Fire: 101 (in all Central Asian countries)
          </p>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MONEY SECTION
// ═════════════════════════════════════════════════════════════════════════════
function MoneySection() {
  return (
    <section
      id="money"
      aria-labelledby="money-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Currency</Eyebrow>
          <h2
            id="money-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Money &amp; Currency
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {moneyInfo.map((info) => (
            <article
              key={info.country}
              className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-6"
            >
              <CornerAccents />
              <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-5 font-serif">
                {info.country}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    Currency
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-amber-100 font-serif">
                    {info.currency}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    Approximate rate
                  </p>
                  <p className="font-semibold text-amber-700 dark:text-amber-400 font-serif">
                    {info.rate}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {info.tips}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          role="note"
          className="mt-8 bg-amber-100/50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 p-5"
        >
          <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
            <strong className="uppercase tracking-wider text-xs">Tip:</strong>{" "}
            Bring clean, unmarked US dollars (2009 or newer) for the best
            exchange rates. Torn or marked bills may be refused.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CULTURE SECTION
// ═════════════════════════════════════════════════════════════════════════════
function CultureSection() {
  return (
    <section
      id="culture"
      aria-labelledby="culture-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-stone-100 dark:bg-stone-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Local Customs</Eyebrow>
          <h2
            id="culture-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Cultural Etiquette
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalTips.map((tip) => (
            <article
              key={tip.title}
              className="group relative bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-6"
            >
              <CornerAccents />
              <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-2 font-serif">
                {tip.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                {tip.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CTA SECTION
// ═════════════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section
      aria-labelledby="info-cta-heading"
      className="relative py-20 px-4 overflow-hidden bg-stone-900 dark:bg-black text-white"
    >
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="info-cta-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="15" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#info-cta-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-amber-400/70 uppercase tracking-[0.3em] text-xs mb-3">
          Your Next Step
        </p>
        <h2
          id="info-cta-heading"
          className="text-3xl md:text-5xl font-bold mb-4 font-serif"
        >
          Ready to Start Your Adventure?
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          Now that you know what to expect, let us help you plan the perfect trip.
        </p>

        <DiamondDivider className="mb-10" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Browse Tours
          </Link>
          <Link
            href="/contact"
            className="border-2 border-amber-500/50 hover:bg-amber-500 hover:text-white text-amber-300 px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function PracticalInfoPage() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      <HeroSection />
      <QuickNav />
      <VisaSection />
      <WeatherSection />
      <PackingSection />
      <HealthSection />
      <MoneySection />
      <CultureSection />
      <CTASection />
    </div>
  );
}
