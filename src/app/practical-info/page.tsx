// src/app/practical-info/page.tsx
import Link from "next/link";

// Visa Information Data
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

// Weather Data by Season
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

// Packing Lists
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

// Health & Safety Info
const healthSafety = [
  {
    title: "Vaccinations",
    icon: "💉",
    content: "No mandatory vaccinations required. Recommended: Hepatitis A & B, Typhoid, routine vaccinations. Consult your doctor 4-6 weeks before travel.",
  },
  {
    title: "Altitude",
    icon: "⛰️",
    content: "Many destinations are above 2,000m. Acclimatize gradually, stay hydrated, and watch for altitude sickness symptoms. Descend if symptoms worsen.",
  },
  {
    title: "Water",
    icon: "💧",
    content: "Drink only bottled or purified water. Avoid ice in drinks outside major hotels. Bottled water is widely available and inexpensive.",
  },
  {
    title: "Safety",
    icon: "🛡️",
    content: "Central Asia is generally very safe for tourists. Use common sense, avoid displaying expensive items, and keep valuables secure.",
  },
];

// Money & Currency Info
const moneyInfo = [
  {
    country: "Kazakhstan",
    currency: "Tenge (KZT)",
    rate: "~450 KZT = 1 USD",
    tips: "ATMs widely available in cities. Cards accepted in major establishments. Carry cash for bazaars and rural areas.",
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

// Cultural Tips
const culturalTips = [
  {
    title: "Hospitality",
    description: "Central Asians are incredibly hospitable. You may be invited into homes for tea—it's polite to accept. Remove shoes when entering homes.",
  },
  {
    title: "Greetings",
    description: "Handshakes are common between men. With women, wait for them to extend their hand first. A slight bow shows respect to elders.",
  },
  {
    title: "Bread",
    description: "Bread (non/nan) is sacred. Never place it upside down, throw it away, or put it on the ground. Break it by hand, don't cut with a knife.",
  },
  {
    title: "Photography",
    description: "Always ask permission before photographing people. Some religious sites prohibit photography. Military installations are off-limits.",
  },
  {
    title: "Dress Code",
    description: "Dress modestly, especially at religious sites. Women should cover shoulders and knees. Headscarves required at some mosques.",
  },
  {
    title: "Bargaining",
    description: "Expected at bazaars and markets. Start at 50-60% of asking price. Keep it friendly and smile. Fixed prices in shops and supermarkets.",
  },
];

// Hero Section
function HeroSection() {
  return (
    <section className="relative bg-emerald-900 text-white py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-90" />
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Practical Information</h1>
        <p className="text-emerald-200 max-w-2xl mx-auto text-lg">
          Everything you need to know to prepare for your Central Asian adventure.
        </p>
      </div>
    </section>
  );
}

// Quick Navigation
function QuickNav() {
  const sections = [
    { id: "visa", label: "Visa Info", icon: "📄" },
    { id: "weather", label: "Weather", icon: "🌤️" },
    { id: "packing", label: "Packing", icon: "🎒" },
    { id: "health", label: "Health & Safety", icon: "🏥" },
    { id: "money", label: "Money", icon: "💰" },
    { id: "culture", label: "Culture", icon: "🕌" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
          {sections.map((section) => (
            
              <a key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-emerald-100 rounded-full text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors whitespace-nowrap"
            >
              <span>{section.icon}</span>
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Visa Section
function VisaSection() {
  return (
    <section id="visa" className="py-16 px-4 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Visa Information</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {visaInfo.map((country) => (
            <div key={country.country} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <h3 className="text-xl font-bold text-gray-900">{country.country}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Visa-free duration</span>
                  <p className="font-semibold text-emerald-600">{country.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Visa-free for citizens of</span>
                  <p className="text-gray-700">{country.visaFree.join(", ")}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">{country.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <strong>Note:</strong> Visa requirements change frequently. Always verify current requirements with the official embassy or consulate before traveling.
          </p>
        </div>
      </div>
    </section>
  );
}

// Weather Section
function WeatherSection() {
  return (
    <section id="weather" className="py-16 px-4 bg-gray-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Weather & Best Time to Visit</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherData.map((season) => (
            <div key={season.season} className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-4xl mb-3">{season.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{season.season}</h3>
              <p className="text-emerald-600 font-medium mb-3">{season.temp}</p>
              <p className="text-gray-600 text-sm mb-4">{season.description}</p>
              <div className="pt-3 border-t">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Best for</span>
                <p className="text-sm text-gray-700 mt-1">{season.ideal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Packing Section
function PackingSection() {
  return (
    <section id="packing" className="py-16 px-4 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Packing Lists</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Essentials */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Essentials</h3>
            </div>
            <ul className="space-y-2">
              {packingLists.essentials.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Clothing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👕</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Clothing</h3>
            </div>
            <ul className="space-y-2">
              {packingLists.clothing.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trekking Gear */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🥾</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Trekking Gear</h3>
            </div>
            <ul className="space-y-2">
              {packingLists.trekking.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Health & Safety Section
function HealthSection() {
  return (
    <section id="health" className="py-16 px-4 bg-gray-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Health & Safety</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {healthSafety.map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow-sm p-6 flex gap-4">
              <div className="text-3xl shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            <strong>Emergency Numbers:</strong> Police: 102 | Ambulance: 103 | Fire: 101 (in all Central Asian countries)
          </p>
        </div>
      </div>
    </section>
  );
}

// Money Section
function MoneySection() {
  return (
    <section id="money" className="py-16 px-4 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Money & Currency</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {moneyInfo.map((info) => (
            <div key={info.country} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{info.country}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Currency</span>
                  <p className="font-semibold text-gray-900">{info.currency}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Approximate rate</span>
                  <p className="font-semibold text-emerald-600">{info.rate}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">{info.tips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Tip:</strong> Bring clean, unmarked US dollars (2009 or newer) for the best exchange rates. Torn or marked bills may be refused.
          </p>
        </div>
      </div>
    </section>
  );
}

// Culture Section
function CultureSection() {
  return (
    <section id="culture" className="py-16 px-4 bg-gray-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Cultural Etiquette</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalTips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 px-4 bg-emerald-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="text-emerald-200 mb-8">
          Now that you know what to expect, let us help you plan the perfect trip.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Browse Tours
          </Link>
          <Link
            href="/contact"
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function PracticalInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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