// src/app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — form state.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import Link from "next/link";

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

// ─── Contact Info Data ───────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    label: "Email",
    value: "info@wanderlust.com",
    href: "mailto:info@wanderlust.com",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    label: "Office",
    value: "123 Travel Street, Adventure City, AC 12345",
    href: null,
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    label: "Hours",
    value: "Mon-Fri: 9AM-6PM (UTC+6)",
    href: null,
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="Contact Wanderlust"
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
          <pattern id="contact-hero-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-hero-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-amber-500/40 z-10" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-amber-500/40 z-10" aria-hidden="true" />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-16 md:py-20">
        <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
          <span className="text-amber-400/80 text-xs tracking-[0.3em] uppercase">We&apos;re Listening</span>
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
        </div>

        <p className="text-amber-300 text-sm font-semibold tracking-[0.2em] uppercase mb-5">
          Let&apos;s Connect
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 font-serif">
          Get in <span className="text-amber-400">Touch</span>
        </h1>

        <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Have questions about a tour? Ready to start planning? We would love
          to hear from you.
        </p>

        <DiamondDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═════════════════════════════════════════════════════════════════════════════
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1000);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-amber-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors";

  const labelClasses =
    "block text-xs font-semibold uppercase tracking-[0.15em] text-stone-700 dark:text-amber-200 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            required
            aria-required="true"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select a subject</option>
            <option value="tour-inquiry">Tour Inquiry</option>
            <option value="custom-trip">Custom Trip Planning</option>
            <option value="booking">Booking Question</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us about your travel plans or questions..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 disabled:from-amber-400 disabled:to-amber-500 disabled:cursor-not-allowed text-white py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="relative bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 px-4 py-3 text-center text-sm"
        >
          Thank you! Your message has been sent. We will get back to you within 24 hours.
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="relative bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 text-center text-sm"
        >
          Something went wrong. Please try again or email us directly.
        </div>
      )}
    </form>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT INFO CARD
// ═════════════════════════════════════════════════════════════════════════════
function ContactInfoCard() {
  return (
    <div className="group relative bg-stone-900 dark:bg-black text-white p-8 h-fit border border-amber-500/20 overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="info-deco" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#info-deco)" />
        </svg>
      </div>

      <CornerAccents />

      <div className="relative">
        <p className="text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
          Reach Us
        </p>
        <h3 className="text-xl font-bold mb-6 font-serif">Contact Information</h3>

        <div className="space-y-6">
          {contactInfo.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="text-amber-400 shrink-0 w-10 h-10 border border-amber-500/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>
              <div>
                <p className="text-amber-400/70 text-[11px] uppercase tracking-[0.2em] mb-0.5">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-white hover:text-amber-300 transition-colors text-sm focus:outline-none focus:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <DiamondDivider className="my-8" />

        <div>
          <p className="text-amber-400/70 text-[11px] uppercase tracking-[0.2em] mb-4">Follow Us</p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-400 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-400 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-400 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAP SECTION
// ═════════════════════════════════════════════════════════════════════════════
function MapSection() {
  return (
    <section
      aria-labelledby="map-heading"
      className="py-16 md:py-20 px-4 bg-stone-100 dark:bg-stone-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            Our Location
          </p>
          <h2
            id="map-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Find Us
          </h2>
          <DiamondDivider className="mt-4" />
        </div>
        <div className="group relative h-80 bg-gradient-to-br from-stone-700 via-stone-800 to-stone-950 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
            <svg width="100%" height="100%">
              <pattern id="map-deco" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#map-deco)" />
            </svg>
          </div>
          <CornerAccents />
          <div className="relative text-center text-stone-400">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-amber-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="uppercase tracking-[0.2em] text-xs text-amber-400/80">
              Google Maps integration coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FAQ SECTION
// ═════════════════════════════════════════════════════════════════════════════
function FAQSection() {
  const faqs = [
    {
      question: "How quickly will you respond to my inquiry?",
      answer:
        "We typically respond within 24 hours during business days. For urgent matters, please call us directly.",
    },
    {
      question: "Can you create custom itineraries?",
      answer:
        "Absolutely! We specialize in tailor-made trips. Share your interests, budget, and timeframe, and we will craft the perfect journey.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, bank transfers, and PayPal. A 30% deposit secures your booking, with the balance due 30 days before departure.",
    },
  ];

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 md:py-20 px-4 bg-amber-50 dark:bg-stone-950"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
            Quick Answers
          </p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-amber-100 mb-3 font-serif"
          >
            Frequently Asked Questions
          </h2>
          <DiamondDivider className="mt-4" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors overflow-hidden"
            >
              <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
              <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
              <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />
              <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors pointer-events-none" aria-hidden="true" />

              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-amber-50/60 dark:hover:bg-stone-800/60 transition-colors list-none">
                <span className="font-semibold text-stone-900 dark:text-amber-100 font-serif pr-4">
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
              <div className="px-5 pb-5 text-stone-600 dark:text-stone-400 text-sm leading-relaxed border-t border-stone-200 dark:border-stone-800 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-stone-600 dark:text-stone-400 mt-8 text-sm">
          More questions?{" "}
          <Link
            href="/practical-info"
            className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-semibold uppercase tracking-wider focus:outline-none focus:underline"
          >
            Check our Practical Info page
          </Link>
        </p>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      <HeroSection />
      <section
        aria-labelledby="form-heading"
        className="py-16 md:py-20 px-4 bg-amber-50 dark:bg-stone-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group relative lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors p-8 md:p-10">
              <CornerAccents />

              <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
                Inquiry Form
              </p>
              <h2
                id="form-heading"
                className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-amber-100 mb-2 font-serif"
              >
                Send Us a Message
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8 text-sm">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
              <ContactForm />
            </div>
            <div>
              <ContactInfoCard />
            </div>
          </div>
        </div>
      </section>
      <MapSection />
      <FAQSection />
    </div>
  );
}
