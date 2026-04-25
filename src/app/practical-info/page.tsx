"use client";

// src/app/practical-info/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component (uses useLocale for EN/RU translations).
// Style: Nature / Travel Magazine — emerald + cream palette, rounded corners,
// leaf dividers, bright photography, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";

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

// ─── Eyebrow Label ───────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.3em] text-xs mb-2">
      {children}
    </p>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { t } = useLocale();
  return (
    <section
      aria-label={t.practicalInfo.hero.ariaLabel}
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
          <span className="text-emerald-300/80 text-xs tracking-[0.3em] uppercase drop-shadow-md">{t.practicalInfo.hero.bannerLabel}</span>
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
        </div>

        <p className="text-emerald-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
          {t.practicalInfo.hero.eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-md">
          {t.practicalInfo.hero.titlePrefix} <span className="text-emerald-400">{t.practicalInfo.hero.titleAccent}</span>
        </h1>

        <p className="text-base md:text-lg text-stone-200 max-w-2xl mx-auto mb-4 leading-relaxed drop-shadow-md">
          {t.practicalInfo.hero.subtitle}
        </p>

        <NatureDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// QUICK NAV — sticky section jump bar
// ═════════════════════════════════════════════════════════════════════════════
function QuickNav() {
  const { t } = useLocale();
  const sections = [
    { id: "visa", label: t.practicalInfo.quickNav.sections.visa },
    { id: "weather", label: t.practicalInfo.quickNav.sections.weather },
    { id: "packing", label: t.practicalInfo.quickNav.sections.packing },
    { id: "health", label: t.practicalInfo.quickNav.sections.health },
    { id: "money", label: t.practicalInfo.quickNav.sections.money },
    { id: "culture", label: t.practicalInfo.quickNav.sections.culture },
  ];

  return (
    <nav
      aria-label={t.practicalInfo.quickNav.ariaLabel}
      className="bg-emerald-950 dark:bg-slate-950 border-b border-emerald-500/20 sticky top-16 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-300 hover:text-emerald-200 text-xs font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
  const { t } = useLocale();
  return (
    <section
      id="visa"
      aria-labelledby="visa-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>{t.practicalInfo.visa.eyebrow}</Eyebrow>
          <h2
            id="visa-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.practicalInfo.visa.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.practicalInfo.visa.countries.map((country) => (
            <article
              key={country.country}
              className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl" aria-hidden="true">
                  {country.flag}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-emerald-100 font-serif">
                  {country.country}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    {t.practicalInfo.visa.durationLabel}
                  </p>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 font-serif text-lg">
                    {country.duration}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    {t.practicalInfo.visa.visaFreeForLabel}
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm mt-0.5">
                    {country.visaFree}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200 dark:border-slate-700">
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
          className="relative mt-8 bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 p-5 rounded-xl"
        >
          <p className="text-emerald-900 dark:text-emerald-200 text-sm leading-relaxed">
            <strong className="uppercase tracking-wider text-xs">{t.practicalInfo.visa.noteStrong}</strong>{" "}
            {t.practicalInfo.visa.noteBody}
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
  const { t } = useLocale();
  return (
    <section
      id="weather"
      aria-labelledby="weather-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-stone-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>{t.practicalInfo.weather.eyebrow}</Eyebrow>
          <h2
            id="weather-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.practicalInfo.weather.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.practicalInfo.weather.seasons.map((season) => (
            <article
              key={season.season}
              className="relative bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-6 rounded-xl"
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {season.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
                {season.season}
              </h3>
              <p className="text-emerald-700 dark:text-emerald-400 font-serif text-sm mb-3">
                {season.temp}
              </p>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
                {season.description}
              </p>
              <div className="pt-4 border-t border-stone-200 dark:border-slate-700">
                <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                  {t.practicalInfo.weather.bestForLabel}
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
  items: readonly string[];
}) {
  return (
    <article className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center rounded-lg">
          <span className="text-xl" aria-hidden="true">
            {emoji}
          </span>
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 font-serif">
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
              className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
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
  const { t } = useLocale();
  return (
    <section
      id="packing"
      aria-labelledby="packing-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>{t.practicalInfo.packing.eyebrow}</Eyebrow>
          <h2
            id="packing-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.practicalInfo.packing.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <PackingCard title={t.practicalInfo.packing.essentials.title} emoji="📋" items={t.practicalInfo.packing.essentials.items} />
          <PackingCard title={t.practicalInfo.packing.clothing.title} emoji="👕" items={t.practicalInfo.packing.clothing.items} />
          <PackingCard title={t.practicalInfo.packing.trekking.title} emoji="🥾" items={t.practicalInfo.packing.trekking.items} />
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HEALTH SECTION
// ═════════════════════════════════════════════════════════════════════════════
function HealthSection() {
  const { t } = useLocale();
  return (
    <section
      id="health"
      aria-labelledby="health-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-stone-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>{t.practicalInfo.health.eyebrow}</Eyebrow>
          <h2
            id="health-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.practicalInfo.health.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.practicalInfo.health.items.map((item) => (
            <article
              key={item.title}
              className="relative bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-6 flex gap-4 rounded-xl"
            >
              <div className="text-3xl shrink-0" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
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
          className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 p-5 rounded-xl"
        >
          <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">
            <strong className="uppercase tracking-wider text-xs">{t.practicalInfo.health.emergencyStrong}</strong>{" "}
            {t.practicalInfo.health.emergencyBody}
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
  const { t } = useLocale();
  return (
    <section
      id="money"
      aria-labelledby="money-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-emerald-50 dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>{t.practicalInfo.money.eyebrow}</Eyebrow>
          <h2
            id="money-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.practicalInfo.money.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.practicalInfo.money.countries.map((info) => (
            <article
              key={info.country}
              className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-5 font-serif">
                {info.country}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    {t.practicalInfo.money.currencyLabel}
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-emerald-100 font-serif">
                    {info.currency}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                    {t.practicalInfo.money.rateLabel}
                  </p>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 font-serif">
                    {info.rate}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200 dark:border-slate-700">
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
          className="mt-8 bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 p-5 rounded-xl"
        >
          <p className="text-emerald-900 dark:text-emerald-200 text-sm leading-relaxed">
            <strong className="uppercase tracking-wider text-xs">{t.practicalInfo.money.tipStrong}</strong>{" "}
            {t.practicalInfo.money.tipBody}
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
  const { t } = useLocale();
  return (
    <section
      id="culture"
      aria-labelledby="culture-heading"
      className="py-16 md:py-20 px-4 scroll-mt-32 bg-stone-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>{t.practicalInfo.culture.eyebrow}</Eyebrow>
          <h2
            id="culture-heading"
            className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-emerald-100 mb-3 font-serif"
          >
            {t.practicalInfo.culture.title}
          </h2>
          <NatureDivider className="mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.practicalInfo.culture.tips.map((tip) => (
            <article
              key={tip.title}
              className="relative bg-white dark:bg-slate-950 border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
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
  const { t } = useLocale();
  return (
    <section
      aria-labelledby="info-cta-heading"
      className="relative py-20 px-4 overflow-hidden bg-emerald-950 text-white"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-emerald-400/70 uppercase tracking-[0.3em] text-xs mb-3">
          {t.practicalInfo.cta.eyebrow}
        </p>
        <h2
          id="info-cta-heading"
          className="text-3xl md:text-5xl font-bold mb-4 font-serif"
        >
          {t.practicalInfo.cta.title}
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          {t.practicalInfo.cta.subtitle}
        </p>

        <NatureDivider className="mb-10" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-8 py-4 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-950"
          >
            {t.practicalInfo.cta.browseTours}
          </Link>
          <Link
            href="/contact"
            className="border-2 border-emerald-500 hover:bg-emerald-600 hover:text-white text-emerald-300 px-8 py-4 font-semibold uppercase tracking-wide transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-emerald-950"
          >
            {t.practicalInfo.cta.contactUs}
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
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
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
