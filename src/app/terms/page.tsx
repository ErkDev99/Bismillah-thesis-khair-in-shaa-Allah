// src/app/terms/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — no "use client" needed.
// Style: Nature / Travel Magazine — emerald + cream palette, rounded corners,
// leaf dividers, bright photography, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Terms of Service | Wanderlust",
  description:
    "Terms and conditions for using Wanderlust travel services and website.",
};

// ─── Nature Divider — leaf ornament ─────────────────────────────────────────
function NatureDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
      <svg className="w-5 h-5 text-emerald-500/60" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.15 9.34 19.67 12 14 12 14s-2.85 7-8 7c1.07-5 6.11-13 13-13zM21 2c-4 0-10.17 3.43-12 8 1.83 1.83 8 1.83 12-8z" />
      </svg>
      <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="Terms of service"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <p className="text-emerald-300 text-xs font-semibold tracking-[0.3em] uppercase mb-2 drop-shadow-md">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-md">
          Terms of <span className="text-emerald-400">Service</span>
        </h1>
        <p className="text-stone-300 text-sm uppercase tracking-[0.2em] drop-shadow-md">
          Last updated: January 29, 2025
        </p>
        <NatureDivider className="mt-4" />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Typography helpers — keep the JSX below readable
// ═════════════════════════════════════════════════════════════════════════════
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-emerald-100 mt-10 mb-4 font-serif">
      {children}
    </h2>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-stone-600 dark:text-stone-400 mb-4 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-6 space-y-2 marker:text-emerald-500">
      {children}
    </ul>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-8 md:p-12 shadow-sm rounded-xl">
            <P className="text-lg">
              Welcome to Wanderlust. By accessing our website and using our
              services, you agree to be bound by these Terms of Service. Please
              read them carefully.
            </P>

            <H2>1. Acceptance of Terms</H2>
            <P>
              By accessing or using the Wanderlust website and services, you
              agree to comply with and be bound by these Terms of Service and
              our Privacy Policy. If you do not agree to these terms, please do
              not use our services.
            </P>

            <H2>2. Services Description</H2>
            <P>
              Wanderlust provides travel planning, tour booking, and related
              tourism services for destinations in Central Asia, including
              Kazakhstan, Kyrgyzstan, and Uzbekistan. We act as an intermediary
              between travelers and local service providers including hotels,
              transport operators, and tour guides.
            </P>

            <H2>3. Booking and Payment</H2>
            <Ul>
              <li>A 30% deposit is required to confirm your booking</li>
              <li>The remaining balance is due 30 days before the tour start date</li>
              <li>Bookings made within 30 days of departure require full payment</li>
              <li>All prices are in USD unless otherwise stated</li>
              <li>Prices are subject to change until booking is confirmed</li>
            </Ul>

            <H2>4. Cancellation Policy</H2>
            <P>Our cancellation policy is as follows:</P>
            <Ul>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100">60+ days before departure:</strong>{" "}
                Full refund minus $100 administrative fee
              </li>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100">30-59 days before departure:</strong>{" "}
                50% refund
              </li>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100">Less than 30 days before departure:</strong>{" "}
                No refund
              </li>
              <li>Cancellations must be submitted in writing via email</li>
            </Ul>
            <P>
              We strongly recommend purchasing comprehensive travel insurance
              to protect against unforeseen cancellations.
            </P>

            <H2>5. Travel Insurance</H2>
            <P>
              Travel insurance is strongly recommended and may be required for
              certain adventure tours. Your insurance should cover medical
              emergencies, evacuation, trip cancellation, and lost luggage. For
              trekking tours, ensure coverage extends to activities at altitude
              (4,000m+).
            </P>

            <H2>6. Travel Documents</H2>
            <P>
              You are responsible for ensuring you have valid travel documents
              including passports, visas, and any required vaccinations.
              Wanderlust is not liable for any issues arising from inadequate
              documentation. We recommend checking entry requirements at least
              8 weeks before travel.
            </P>

            <H2>7. Health and Fitness</H2>
            <P>
              Some tours require a reasonable level of fitness. You are
              responsible for assessing your own fitness for your chosen tour
              and disclosing any medical conditions that may affect your
              participation. We reserve the right to exclude participants whose
              condition may pose a risk to themselves or others.
            </P>

            <H2>8. Itinerary Changes</H2>
            <P>
              While we make every effort to operate tours as described, we
              reserve the right to modify itineraries due to weather conditions,
              safety concerns, local regulations, or circumstances beyond our
              control. Alternative arrangements of similar value will be
              provided where possible.
            </P>

            <H2>9. Limitation of Liability</H2>
            <P>
              Wanderlust acts as an agent for hotels, transport providers, and
              other service suppliers. We are not liable for any injury, damage,
              loss, delay, or inconvenience caused by these third parties or by
              events beyond our reasonable control, including but not limited
              to natural disasters, civil unrest, or pandemic restrictions.
            </P>

            <H2>10. Intellectual Property</H2>
            <P>
              All content on this website, including text, images, logos, and
              design, is owned by Wanderlust or our licensors and is protected
              by copyright laws. You may not reproduce, distribute, or use any
              content without our written permission.
            </P>

            <H2>11. User Conduct</H2>
            <P>When using our website and services, you agree not to:</P>
            <Ul>
              <li>Provide false or misleading information</li>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to interfere with the website&apos;s operation</li>
              <li>Infringe on the rights of others</li>
            </Ul>

            <H2>12. Governing Law</H2>
            <P>
              These Terms of Service shall be governed by and construed in
              accordance with applicable laws. Any disputes arising from these
              terms shall be resolved through good-faith negotiation or, if
              necessary, binding arbitration.
            </P>

            <H2>13. Changes to Terms</H2>
            <P>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting to this page. Your
              continued use of our services after changes constitutes
              acceptance of the modified terms.
            </P>

            <H2>14. Contact Information</H2>
            <P>
              For questions about these Terms of Service, please contact us:
            </P>
            <ul className="list-none text-stone-600 dark:text-stone-400 mb-6 space-y-2">
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  Email:
                </strong>{" "}
                <a
                  href="mailto:legal@wanderlust.com"
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 focus:outline-none focus:underline"
                >
                  legal@wanderlust.com
                </a>
              </li>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  Phone:
                </strong>{" "}
                <a
                  href="tel:+15551234567"
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 focus:outline-none focus:underline"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  Address:
                </strong>{" "}
                123 Travel Street, Adventure City, AC 12345
              </li>
            </ul>

            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em] focus:outline-none focus:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
