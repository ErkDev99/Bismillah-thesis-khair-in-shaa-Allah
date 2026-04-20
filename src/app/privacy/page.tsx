// src/app/privacy/page.tsx
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
  title: "Privacy Policy | Wanderlust",
  description:
    "Learn how Wanderlust collects, uses, and protects your personal information.",
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
      aria-label="Privacy policy"
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
          Privacy <span className="text-emerald-400">Policy</span>
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
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-8 md:p-12 shadow-sm rounded-xl">
            <P className="text-lg">
              At Wanderlust, we are committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your personal
              information when you use our website and services.
            </P>

            <H2>1. Information We Collect</H2>
            <P>We collect information you provide directly to us, including:</P>
            <Ul>
              <li>Name, email address, and phone number when you contact us or book a tour</li>
              <li>Payment information when you make a purchase (processed securely by our payment providers)</li>
              <li>Travel preferences and requirements you share with us</li>
              <li>Communications you send to us via email, chat, or contact forms</li>
            </Ul>

            <P>We automatically collect certain information when you visit our website:</P>
            <Ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or source</li>
              <li>Device information</li>
            </Ul>

            <H2>2. How We Use Your Information</H2>
            <P>We use the information we collect to:</P>
            <Ul>
              <li>Process and manage your tour bookings</li>
              <li>Communicate with you about your inquiries and reservations</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </Ul>

            <H2>3. Information Sharing</H2>
            <P>We do not sell your personal information. We may share your information with:</P>
            <Ul>
              <li>Tour operators and accommodation providers necessary to fulfill your booking</li>
              <li>Payment processors to handle transactions securely</li>
              <li>Service providers who assist with our website operations</li>
              <li>Legal authorities when required by law</li>
            </Ul>

            <H2>4. Cookies</H2>
            <P>
              We use cookies and similar technologies to enhance your browsing
              experience, analyze website traffic, and personalize content. You
              can control cookies through your browser settings.
            </P>

            <H2>5. Data Security</H2>
            <P>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </P>

            <H2>6. Your Rights</H2>
            <P>You have the right to:</P>
            <Ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </Ul>

            <H2>7. Third-Party Links</H2>
            <P>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review their privacy policies.
            </P>

            <H2>8. Children&apos;s Privacy</H2>
            <P>
              Our services are not directed to individuals under 18 years of age.
              We do not knowingly collect personal information from children.
            </P>

            <H2>9. Changes to This Policy</H2>
            <P>
              We may update this privacy policy from time to time. We will notify
              you of any significant changes by posting the new policy on this
              page with an updated revision date.
            </P>

            <H2>10. Contact Us</H2>
            <P>
              If you have any questions about this privacy policy or our data
              practices, please contact us:
            </P>
            <ul className="list-none text-stone-600 dark:text-stone-400 mb-6 space-y-2">
              <li>
                <strong className="text-stone-900 dark:text-emerald-100 uppercase tracking-[0.15em] text-xs">
                  Email:
                </strong>{" "}
                <a
                  href="mailto:privacy@wanderlust.com"
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 focus:outline-none focus:underline"
                >
                  privacy@wanderlust.com
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
