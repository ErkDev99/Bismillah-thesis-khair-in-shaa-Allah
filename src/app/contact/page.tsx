// src/app/contact/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — form state + EN/RU via useLocale.
// Style: Nature / Travel Magazine — emerald + cream palette, serif headings,
// leaf ornaments, rounded corners, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import type { Translations } from "@/lib/translations/en";

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

// ─── Contact Info — concrete data (email/phone/address are not UI copy) ─────
const contactInfoData = [
  {
    key: "email" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    value: "info@wanderlust.com",
    href: "mailto:info@wanderlust.com",
  },
  {
    key: "phone" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    key: "office" as const,
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
    value: "123 Travel Street, Adventure City, AC 12345",
    href: null,
  },
  {
    key: "hours" as const,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    value: null,
    href: null,
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { t } = useLocale();
  return (
    <section
      aria-label={t.contact.hero.ariaLabel}
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/45" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <p className="text-emerald-300 uppercase tracking-[0.3em] text-xs mb-2 drop-shadow-md" aria-hidden="true">
          {t.contact.hero.eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-lg">
          {t.contact.hero.titlePrefix} <span className="text-emerald-300">{t.contact.hero.titleAccent}</span>
        </h1>

        <NatureDivider className="mb-4" />

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {t.contact.hero.subtitle}
        </p>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═════════════════════════════════════════════════════════════════════════════
type ErrorKey = keyof Translations["contact"]["form"]["errors"];

function ContactForm() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot — must stay empty for real users
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);

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
    setErrorKey(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && json?.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
        return;
      }

      const apiKey = json?.error;
      const known = apiKey && apiKey in t.contact.form.errors;
      setErrorKey(known ? (apiKey as ErrorKey) : "sendFailed");
      setStatus("error");
    } catch {
      setErrorKey("network");
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors";

  const labelClasses =
    "block text-xs font-semibold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t.contact.form.fullNameLabel}
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
            placeholder={t.contact.form.fullNamePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            {t.contact.form.emailLabel}
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
            placeholder={t.contact.form.emailPlaceholder}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            {t.contact.form.phoneLabel}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder={t.contact.form.phonePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="subject" className={labelClasses}>
            {t.contact.form.subjectLabel}
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
            <option value="">{t.contact.form.selectSubject}</option>
            <option value="tour-inquiry">{t.contact.form.subjects.tourInquiry}</option>
            <option value="custom-trip">{t.contact.form.subjects.customTrip}</option>
            <option value="booking">{t.contact.form.subjects.booking}</option>
            <option value="partnership">{t.contact.form.subjects.partnership}</option>
            <option value="feedback">{t.contact.form.subjects.feedback}</option>
            <option value="other">{t.contact.form.subjects.other}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t.contact.form.messageLabel}
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
          placeholder={t.contact.form.messagePlaceholder}
        />
      </div>

      {/* Honeypot — hidden from sighted users + screen readers + keyboard.
          Bots fill in every field; if this is non-empty the server silently
          discards the submission. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white rounded-lg py-4 font-semibold uppercase tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        {status === "loading" ? t.contact.form.sending : t.contact.form.submit}
      </button>

      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="relative bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 rounded-lg px-4 py-3 text-center text-sm"
        >
          {t.contact.form.success}
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="relative bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg px-4 py-3 text-center text-sm"
        >
          {errorKey ? t.contact.form.errors[errorKey] : t.contact.form.error}
        </div>
      )}
    </form>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTACT INFO CARD
// ═════════════════════════════════════════════════════════════════════════════
function ContactInfoCard() {
  const { t } = useLocale();
  return (
    <div className="relative bg-emerald-950 dark:bg-black text-white rounded-xl p-8 h-fit overflow-hidden">
      {/* Radial Emerald Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative">
        <p className="text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
          {t.contact.info.eyebrow}
        </p>
        <h3 className="text-xl font-bold mb-6 font-serif">{t.contact.info.title}</h3>

        <div className="space-y-6">
          {contactInfoData.map((item) => {
            const label = t.contact.info.labels[item.key];
            const value = item.key === "hours" ? t.contact.info.hours : item.value;
            return (
              <div key={item.key} className="flex items-start gap-4">
                <div className="text-emerald-400 shrink-0 w-10 h-10 border border-emerald-500/30 rounded-lg flex items-center justify-center">
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
                  <p className="text-emerald-400/70 text-[11px] uppercase tracking-[0.2em] mb-0.5">
                    {label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white hover:text-emerald-300 transition-colors text-sm focus:outline-none focus:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm">{value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <NatureDivider className="my-8" />

        <div>
          <p className="text-emerald-400/70 text-[11px] uppercase tracking-[0.2em] mb-4">{t.contact.info.followUs}</p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="map-heading"
      className="py-16 md:py-20 px-4 bg-stone-100 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.contact.map.eyebrow}
          </p>
          <h2
            id="map-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3 font-serif"
          >
            {t.contact.map.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>
        <div className="h-80 md:h-96 overflow-hidden rounded-xl border border-stone-200 dark:border-slate-800">
          <iframe
            title={t.contact.map.iframeTitle}
            src="https://www.google.com/maps?q=Bishkek,Kyrgyzstan&z=12&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FAQ SECTION
// ═════════════════════════════════════════════════════════════════════════════
function FAQSection() {
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 md:py-20 px-4 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
            {t.contact.faq.eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3 font-serif"
          >
            {t.contact.faq.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="space-y-4">
          {t.contact.faq.items.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-emerald-50/60 dark:hover:bg-slate-800/60 transition-colors list-none">
                <span className="font-semibold text-stone-900 dark:text-stone-100 font-serif pr-4">
                  {faq.question}
                </span>
                <svg
                  className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-stone-600 dark:text-stone-400 text-sm leading-relaxed border-t border-stone-200 dark:border-slate-800 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-stone-600 dark:text-stone-400 mt-8 text-sm">
          {t.contact.faq.moreQuestionsPrefix}{" "}
          <Link
            href="/practical-info"
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold uppercase tracking-wide focus:outline-none focus:underline"
          >
            {t.contact.faq.moreQuestionsLink}
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
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />
      <section
        aria-labelledby="form-heading"
        className="py-16 md:py-20 px-4 bg-emerald-50 dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl p-8 md:p-10">
              <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
                {t.contact.form.eyebrow}
              </p>
              <h2
                id="form-heading"
                className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 font-serif"
              >
                {t.contact.form.title}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8 text-sm">
                {t.contact.form.subtitle}
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
