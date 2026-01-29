// src/app/faq/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Wanderlust",
  description:
    "Frequently asked questions about traveling to Central Asia, booking tours, visas, safety, and more.",
};

// FAQ Data organized by category
const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
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
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
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
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
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
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
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

// Hero Section
function HeroSection() {
  return (
    <section className="bg-emerald-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-emerald-200 max-w-2xl mx-auto text-lg">
          Everything you need to know about traveling with Wanderlust. Can&apos;t
          find your answer? Contact us anytime.
        </p>
      </div>
    </section>
  );
}

// Quick Navigation
function QuickNav() {
  return (
    <nav className="bg-white shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
          {faqCategories.map((category) => (
            
            <a  key={category.id}
              href={`#${category.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-emerald-100 rounded-full text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors whitespace-nowrap"
            >
              {category.icon}
              {category.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// FAQ Category Section
function FAQCategory({
  category,
}: {
  category: (typeof faqCategories)[0];
}) {
  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
          {category.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
      </div>

      <div className="space-y-4">
        {category.faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-900 pr-4">
                {faq.question}
              </span>
              <svg
                className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// Still Have Questions CTA
function ContactCTA() {
  return (
    <section className="bg-emerald-900 text-white rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Still Have Questions?
      </h2>
      <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
        Our team is here to help. Reach out anytime and we&apos;ll get back to
        you within 24 hours.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/contact"
          className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold transition-colors"
        >
          Contact Us
        </Link>

        <a
          href="mailto:info@wanderlust.com"
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
        >
          Email Us Directly
        </a>
      </div>
      <p className="text-emerald-300 text-sm mt-6">
        Or call us at{" "}
        <a href="tel:+15551234567" className="underline hover:text-white">
          +1 (555) 123-4567
        </a>
      </p>
    </section>
  );
}

// Related Links
function RelatedLinks() {
  const links = [
    {
      title: "Practical Info",
      description: "Visa, weather, packing lists, and more",
      href: "/practical-info",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Our Tours",
      description: "Browse all available adventures",
      href: "/tours",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "About Us",
      description: "Learn about our team and mission",
      href: "/about",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Helpful Resources
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {link.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Main FAQ Page
export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <QuickNav />

      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* FAQ Categories */}
          {faqCategories.map((category) => (
            <FAQCategory key={category.id} category={category} />
          ))}

          {/* Related Links */}
          <RelatedLinks />

          {/* Contact CTA */}
          <ContactCTA />
        </div>
      </main>
    </div>
  );
}