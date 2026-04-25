// src/app/blog/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — category filter state + locale.
// NOTE: Cannot use `export const metadata` in a client component.
// Style: Nature / Travel Magazine — emerald + cream palette, rounded corners,
// leaf dividers, bright photography, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllPosts,
  getUniqueCategories,
  type BlogPost,
  type BlogCategoryKey,
} from "@/lib/data/blog";
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

// ─── Format date helper (locale-aware) ───────────────────────────────────────
function formatDate(dateString: string, locale: "en" | "ru"): string {
  return new Date(dateString).toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEATURED POST CARD (Large)
// ═════════════════════════════════════════════════════════════════════════════
function FeaturedPostCard({ post }: { post: BlogPost }) {
  const { locale, t } = useLocale();
  const tb = t.blog;
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`${tb.card.readFeaturedAriaPrefix}: ${post.title}`}
      className="group relative block h-[400px] md:h-[500px] overflow-hidden rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-emerald-600 text-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] rounded-lg">
            {tb.card.featured}
          </span>
          <span className="text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em]">
            {tb.categories[post.category]}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 group-hover:text-emerald-300 transition-colors font-serif">
          {post.title}
        </h2>
        <p className="text-stone-300 mb-5 line-clamp-2 max-w-2xl leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-stone-400 uppercase tracking-[0.15em]">
          <span>{post.author.name}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60" aria-hidden="true" />
          <span>{formatDate(post.publishedAt, locale)}</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500/60" aria-hidden="true" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// REGULAR POST CARD
// ═════════════════════════════════════════════════════════════════════════════
function PostCard({ post }: { post: BlogPost }) {
  const { locale, t } = useLocale();
  const tb = t.blog;
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`${tb.card.readAriaPrefix}: ${post.title}`}
      className="group relative block focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
    >
      <article className="relative bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-stone-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-emerald-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] rounded-lg border border-emerald-500/30">
              {tb.categories[post.category]}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-100 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 font-serif">
            {post.title}
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-slate-700 text-xs">
            <span className="text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-[0.15em]">
              {post.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORY FILTER
// ═════════════════════════════════════════════════════════════════════════════
function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: BlogCategoryKey[];
  activeCategory: BlogCategoryKey | "";
  setActiveCategory: (category: BlogCategoryKey | "") => void;
}) {
  const { t } = useLocale();
  const tb = t.blog;
  const buttonBase =
    "px-5 py-2 font-semibold text-xs uppercase tracking-[0.15em] transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950";
  const activeClass =
    "bg-emerald-600 text-white border border-emerald-600";
  const inactiveClass =
    "bg-white dark:bg-slate-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400";

  return (
    <div
      role="group"
      aria-label={tb.filter.ariaLabel}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      <button
        type="button"
        onClick={() => setActiveCategory("")}
        aria-pressed={activeCategory === ""}
        className={`${buttonBase} ${activeCategory === "" ? activeClass : inactiveClass}`}
      >
        {tb.filter.allPosts}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setActiveCategory(category)}
          aria-pressed={activeCategory === category}
          className={`${buttonBase} ${activeCategory === category ? activeClass : inactiveClass}`}
        >
          {tb.categories[category]}
        </button>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const { t } = useLocale();
  const tb = t.blog;
  return (
    <section
      aria-label={tb.hero.ariaLabel}
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
          <span className="text-emerald-300/80 text-xs tracking-[0.3em] uppercase drop-shadow-md">
            {tb.hero.eyebrowOrnament}
          </span>
          <div className="h-px w-12 md:w-20 bg-emerald-500/40" />
        </div>

        <p className="text-emerald-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3 drop-shadow-md">
          {tb.hero.eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif drop-shadow-md">
          {tb.hero.titlePrefix} <span className="text-emerald-400">{tb.hero.titleAccent}</span>
        </h1>

        <p className="text-base md:text-lg text-stone-200 max-w-2xl mx-auto mb-4 leading-relaxed drop-shadow-md">
          {tb.hero.subtitle}
        </p>

        <NatureDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// NEWSLETTER CTA
// ═════════════════════════════════════════════════════════════════════════════
function NewsletterCTA() {
  const { t } = useLocale();
  const tb = t.blog.newsletter;
  return (
    <section
      aria-labelledby="blog-newsletter-heading"
      className="relative mt-16 bg-emerald-950 text-white p-10 md:p-14 text-center rounded-xl overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-emerald-400/70 uppercase tracking-[0.3em] text-xs mb-3">
          {tb.eyebrow}
        </p>
        <h2
          id="blog-newsletter-heading"
          className="text-2xl md:text-3xl font-bold mb-3 font-serif"
        >
          {tb.title}
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          {tb.subtitle}
        </p>

        <NatureDivider className="mb-8" />

        <form
          action="/api/newsletter"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          aria-label={tb.ariaLabel}
          noValidate
        >
          <label htmlFor="blog-newsletter-email" className="sr-only">
            {tb.emailLabel}
          </label>
          <input
            id="blog-newsletter-email"
            type="email"
            name="email"
            placeholder={tb.emailPlaceholder}
            required
            aria-required="true"
            autoComplete="email"
            className="flex-1 px-5 py-3 bg-white/10 border border-emerald-500/30 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-6 py-3 font-semibold uppercase tracking-wide text-white transition-all rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-emerald-950 whitespace-nowrap"
          >
            {tb.subscribe}
          </button>
        </form>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function BlogPage() {
  const { locale, t } = useLocale();
  const tb = t.blog;
  const [activeCategory, setActiveCategory] = useState<BlogCategoryKey | "">("");

  const categories = getUniqueCategories();

  const allPosts = useMemo(() => getAllPosts(locale), [locale]);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return allPosts;
    return allPosts.filter((post) => post.category === activeCategory);
  }, [allPosts, activeCategory]);

  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const remainingPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-slate-950">
      <HeroSection />

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {filteredPosts.length > 0 ? (
            <>
              {featuredPost && (
                <div className="mb-12">
                  <FeaturedPostCard post={featuredPost} />
                </div>
              )}

              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              role="status"
              className="relative bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 p-12 text-center rounded-xl"
            >
              <svg
                className="w-16 h-16 text-emerald-400/70 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-xl font-bold text-stone-900 dark:text-emerald-100 mb-2 font-serif">
                {tb.empty.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                {tb.empty.subtitle}
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("")}
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold uppercase tracking-wide text-sm focus:outline-none focus:underline"
              >
                {tb.empty.viewAll}
              </button>
            </div>
          )}

          <NewsletterCTA />
        </div>
      </section>
    </div>
  );
}
