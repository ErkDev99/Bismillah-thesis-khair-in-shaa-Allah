// src/app/faq/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — no "use client" needed.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import type { Metadata } from "next";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "FAQ | Wanderlust — Central Asia Travel Questions Answered",
  description:
    "Frequently asked questions about traveling to Central Asia with Wanderlust: booking, payments, visas, safety, tours, and practical info for Kazakhstan, Kyrgyzstan, and Uzbekistan.",
  openGraph: {
    title: "FAQ — Wanderlust Central Asia Travel",
    description:
      "Answers to common questions about booking, visas, tours, and travel to Central Asia.",
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
      <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
    </>
  );
}

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    faqs: [
      {
        question: "What countries does Wanderlust operate in?",
        answer:
          "We specialize in Central Asia, specifically Kazakhstan, Kyrgyzstan, and Uzbekistan. These three countries offer an incredible diversity of experiences—from the ancient Silk Road cities of Uzbekistan to the nomadic traditions of Kyrgyzstan and the modern cities and stunning nature of Kazakhstan.",
      },
      {
        question: "Is Central Asia safe for tourists?",
        answer:
          "Yes, Central Asia is generally very safe for tourists. The region has low crime rates, and locals are known for their warm hospitality toward visitors. As with any travel, we recommend standard precautions: keep valuables secure, be aware of your surroundings, and follow local customs. Our guides are with you throughout the journey to ensure your safety and comfort.",
      },
      {
        question: "What languages are spoken in Central Asia?",
        answer:
          "Each country has its own national language (Kazakh, Kyrgyz, Uzbek), but Russian is widely understood across the region as a common second language. English is spoken in tourist areas and by younger generations in cities, but less common in rural areas. All our tours include English-speaking guides, so language won't be a barrier.",
      },
      {
        question: "What is the best time to visit Central Asia?",
        answer:
          "The best time depends on your interests. For general sightseeing and comfortable temperatures, visit in spring (April–June) or autumn (September–October). Summer (July–August) is ideal for mountain trekking but can be very hot in Uzbekistan. Winter (December–February) offers skiing opportunities in Kazakhstan and Kyrgyzstan, plus fewer crowds at historical sites.",
      },
    ],
  },
  {
    id: "booking",
    title: "Booking & Payments",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    ),
    faqs: [
      {
        question: "How do I book a tour?",
        answer:
          "You can book a tour by clicking 'Book This Tour' on any tour page, which will take you to our contact form. Alternatively, email us at info@wanderlust.com or call +1 (555) 123-4567. We'll confirm availability, answer any questions, and send you a detailed itinerary and invoice.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. For bank transfers, we provide details for both USD and EUR accounts. All payments are processed securely.",
      },
      {
        question: "What is your deposit and payment policy?",
        answer:
          "We require a 30% deposit to secure your booking. The remaining 70% is due 30 days before your tour start date. For bookings made within 30 days of departure, full payment is required at the time of booking.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "We understand plans can change. Cancellations made 60+ days before departure receive a full refund minus a $100 admin fee. Cancellations 30–59 days before departure receive a 50% refund. Cancellations less than 30 days before departure are non-refundable. We strongly recommend purchasing travel insurance.",
      },
      {
        question: "Can I customize a tour or create a private trip?",
        answer:
          "Absolutely! We love creating custom itineraries. Tell us your interests, budget, group size, and preferred dates, and we'll design a personalized journey just for you. Private tours are available for any of our existing itineraries as well.",
      },
    ],
  },
  {
    id: "tours",
    title: "Tours & Experiences",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    faqs: [
      {
        question: "What is included in the tour price?",
        answer:
          "Our tour prices typically include: accommodation, transportation within the region, English-speaking guides, entrance fees to attractions, and meals as specified in the itinerary (usually breakfast daily plus some lunches and dinners). International flights, travel insurance, visa fees (if any), and personal expenses are not included unless otherwise stated.",
      },
      {
        question: "What is the group size for tours?",
        answer:
          "Our group sizes vary by tour type. Cultural tours typically have 6–16 participants, adventure treks have 4–8, and photography expeditions are limited to 4–8 for personalized attention. We believe smaller groups provide better experiences and more meaningful connections.",
      },
      {
        question: "What fitness level is required for your tours?",
        answer:
          "This varies by tour. Our cultural tours are suitable for anyone who can walk for a few hours with breaks. Adventure and trekking tours require moderate to good fitness—you should be comfortable hiking 10–15km per day with elevation changes. Each tour page specifies the difficulty level (Easy, Moderate, or Challenging).",
      },
      {
        question: "What type of accommodation is provided?",
        answer:
          "Accommodation varies by tour and location. In cities, we use 3–4 star hotels or boutique guesthouses. In rural areas, you may stay in traditional yurts, family homestays, or comfortable guesthouses. All accommodations are clean, safe, and carefully selected for authenticity and comfort.",
      },
      {
        question: "Are meals included? What about dietary restrictions?",
        answer:
          "Most tours include breakfast daily, plus additional meals as specified. We can accommodate vegetarian, vegan, gluten-free, and other dietary requirements with advance notice. Central Asian cuisine is meat-heavy, but our team knows how to find delicious alternatives.",
      },
    ],
  },
  {
    id: "practical",
    title: "Practical Information",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    faqs: [
      {
        question: "Do I need a visa to visit Central Asia?",
        answer:
          "Many nationalities enjoy visa-free access. Citizens of the USA, UK, EU, Canada, Australia, and 60+ other countries can visit Kazakhstan, Kyrgyzstan, and Uzbekistan visa-free for 30–60 days. Check our Practical Info page or your country's embassy website for the most current requirements.",
      },
      {
        question: "What currency should I bring?",
        answer:
          "US dollars are the best currency to bring—they're easily exchanged everywhere and often get the best rates. Bring clean, unmarked bills from 2009 or newer. ATMs are available in cities, and credit cards are increasingly accepted in urban areas, but cash is essential for rural regions and bazaars.",
      },
      {
        question: "What should I pack for a Central Asia trip?",
        answer:
          "Pack layers, as temperatures can vary significantly between day and night. Comfortable walking shoes are essential. For religious sites, bring modest clothing (covering shoulders and knees). Sun protection is important at high altitudes. Check our Practical Info page for detailed packing lists by season and tour type.",
      },
      {
        question: "Is travel insurance required?",
        answer:
          "While not technically required, we strongly recommend comprehensive travel insurance that covers medical emergencies, evacuation, trip cancellation, and lost luggage. For adventure tours involving trekking at altitude, ensure your policy covers activities up to 4,000m or higher.",
      },
      {
        question: "What vaccinations do I need?",
        answer:
          "No vaccinations are mandatory for Central Asia. However, we recommend being up-to-date on routine vaccinations and considering Hepatitis A, Hepatitis B, and Typhoid. Consult your doctor or a travel clinic 4–6 weeks before departure for personalized advice.",
      },
      {
        question: "Can I use my mobile phone in Central Asia?",
        answer:
          "Yes, mobile coverage is good in cities and along main routes. You can buy local SIM cards inexpensively at airports and phone shops (bring your passport). WiFi is available in most hotels and many cafes. In remote mountain areas, coverage may be limited or unavailable.",
      },
    ],
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="relative text-center text-white overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, #1c1917 0%, #292524 20%, #44403c 50%, #1c1917 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="faq-hero-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#faq-hero-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
          <span className="text-amber-400/80 text-xs tracking-[0.3em] uppercase">Need Help?</span>
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
        </div>

        <p className="text-amber-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          Answers
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif">
          Frequently Asked{" "}
          <span className="text-amber-400">Questions</span>
        </h1>

        <p className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Everything you need to know about traveling with Wanderlust.
          Can&apos;t find your answer? Contact us anytime.
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
  return (
    <nav
      aria-label="FAQ categories"
      className="bg-stone-900 dark:bg-black border-b border-amber-500/20 sticky top-16 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
          {faqCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="flex items-center gap-2 px-4 py-2 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-300 hover:text-amber-200 text-xs font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {category.icon}
              </svg>
              {category.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FAQ CATEGORY
// ═════════════════════════════════════════════════════════════════════════════
function FAQCategory({
  category,
}: {
  category: (typeof faqCategories)[0];
}) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-heading`} className="scroll-mt-32">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 border border-amber-500/40 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 flex items-center justify-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {category.icon}
          </svg>
        </div>
        <div>
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-[10px] mb-0.5">
            Category
          </p>
          <h2
            id={`${category.id}-heading`}
            className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-amber-100 font-serif"
          >
            {category.title}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {category.faqs.map((faq, index) => (
          <details
            key={index}
            className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors overflow-hidden"
          >
            <CornerAccents />
            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-amber-50/60 dark:hover:bg-stone-800/60 transition-colors list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset">
              <span className="font-semibold text-stone-900 dark:text-amber-100 pr-4 font-serif">
                {faq.question}
              </span>
              <svg
                className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-4 text-stone-600 dark:text-stone-400 text-sm leading-relaxed border-t border-stone-200 dark:border-stone-800">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT CTA
// ═════════════════════════════════════════════════════════════════════════════
function ContactCTA() {
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="relative bg-stone-900 dark:bg-black text-white p-10 md:p-14 text-center overflow-hidden border border-amber-500/20"
    >
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="faq-cta-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#faq-cta-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-amber-400/70 uppercase tracking-[0.3em] text-xs mb-2">
          Still Stuck?
        </p>
        <h2 id="faq-cta-heading" className="text-2xl md:text-3xl font-bold mb-4 font-serif">
          Still Have Questions?
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          Our team is here to help. Reach out anytime and we&apos;ll get back to
          you within 24 hours.
        </p>

        <DiamondDivider className="mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Contact Us
          </Link>

          <a
            href="mailto:info@wanderlust.com"
            className="border-2 border-amber-500/50 hover:bg-amber-500 hover:text-white text-amber-300 px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Email Us Directly
          </a>
        </div>
        <p className="text-stone-400 text-sm mt-6">
          Or call us at{" "}
          <a
            href="tel:+15551234567"
            className="text-amber-400 hover:text-amber-300 font-semibold focus:outline-none focus:underline"
          >
            +1 (555) 123-4567
          </a>
        </p>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// RELATED LINKS
// ═════════════════════════════════════════════════════════════════════════════
function RelatedLinks() {
  const links = [
    {
      title: "Practical Info",
      description: "Visa, weather, packing lists, and more",
      href: "/practical-info",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: "Our Tours",
      description: "Browse all available adventures",
      href: "/tours",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: "About Us",
      description: "Learn about our team and mission",
      href: "/about",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
    },
  ];

  return (
    <section aria-labelledby="resources-heading">
      <div className="mb-6">
        <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">
          Explore More
        </p>
        <h2
          id="resources-heading"
          className="text-2xl font-bold text-stone-900 dark:text-amber-100 font-serif"
        >
          Helpful Resources
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative flex items-center gap-4 p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
          >
            <CornerAccents />
            <div className="w-12 h-12 border border-amber-500/40 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 flex items-center justify-center transition-all shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {link.icon}
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-amber-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors font-serif">
                {link.title}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function FAQPage() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      <HeroSection />
      <QuickNav />

      <div className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {faqCategories.map((category) => (
            <FAQCategory key={category.id} category={category} />
          ))}

          <RelatedLinks />

          <ContactCTA />
        </div>
      </div>
    </div>
  );
}
