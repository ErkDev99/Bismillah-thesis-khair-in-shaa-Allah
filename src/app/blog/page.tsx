// src/app/blog/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component — category filter state.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  blogPosts,
  getUniqueCategories,
  type BlogPost,
} from "@/lib/data/blog";

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

// ─── Corner Accents ──────────────────────────────────────────────────────────
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

// ─── Format date helper ──────────────────────────────────────────────────────
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ═════════════════════════════════════════════════════════════════════════════
// FEATURED POST CARD (Large)
// ═════════════════════════════════════════════════════════════════════════════
function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read featured post: ${post.title}`}
      className="group relative block h-[400px] md:h-[500px] overflow-hidden focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="100vw"
      />
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="featured-post-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#featured-post-deco)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" aria-hidden="true" />

      {/* Corner accents — manual for all 4, positioned slightly inset */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/60 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/60 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/60 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/60 group-hover:border-amber-500 transition-colors z-10" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
            Featured
          </span>
          <span className="text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
            {post.category}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 group-hover:text-amber-300 transition-colors font-serif">
          {post.title}
        </h2>
        <p className="text-stone-300 mb-5 line-clamp-2 max-w-2xl leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-stone-400 uppercase tracking-[0.15em]">
          <span>{post.author.name}</span>
          <span className="w-1 h-1 rotate-45 bg-amber-500/60" aria-hidden="true" />
          <span>{formatDate(post.publishedAt)}</span>
          <span className="w-1 h-1 rotate-45 bg-amber-500/60" aria-hidden="true" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// REGULAR POST CARD
// ═════════════════════════════════════════════════════════════════════════════
function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      className="group relative block focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
    >
      <article className="relative bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600">
        <CornerAccents />
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-amber-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] border border-amber-500/30">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-stone-900 dark:text-amber-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 font-serif">
            {post.title}
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-700 text-xs">
            <span className="text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-[0.15em]">
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
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) {
  const buttonBase =
    "px-5 py-2 font-semibold text-xs uppercase tracking-[0.15em] transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950";
  const activeClass =
    "bg-gradient-to-r from-amber-500 to-amber-600 text-white border border-amber-600";
  const inactiveClass =
    "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400";

  return (
    <div
      role="group"
      aria-label="Filter posts by category"
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      <button
        type="button"
        onClick={() => setActiveCategory("")}
        aria-pressed={activeCategory === ""}
        className={`${buttonBase} ${activeCategory === "" ? activeClass : inactiveClass}`}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setActiveCategory(category)}
          aria-pressed={activeCategory === category}
          className={`${buttonBase} ${activeCategory === category ? activeClass : inactiveClass}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section
      aria-label="Travel blog"
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
          <pattern id="blog-hero-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="3" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blog-hero-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 max-w-4xl mx-auto py-4 md:py-6">
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden="true">
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
          <span className="text-amber-400/80 text-xs tracking-[0.3em] uppercase">The Journal</span>
          <div className="h-px w-12 md:w-20 bg-amber-500/60" />
        </div>

        <p className="text-amber-300 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
          Stories from the Silk Road
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 font-serif">
          Travel Stories &amp; <span className="text-amber-400">Guides</span>
        </h1>

        <p className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Insights, tips, and inspiration for your Central Asian adventure from
          our team of local experts.
        </p>

        <DiamondDivider />
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// NEWSLETTER CTA
// ═════════════════════════════════════════════════════════════════════════════
function NewsletterCTA() {
  return (
    <section
      aria-labelledby="blog-newsletter-heading"
      className="relative mt-16 bg-stone-900 dark:bg-black text-white p-10 md:p-14 text-center border border-amber-500/20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="blog-newsletter-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blog-newsletter-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-amber-400/70 uppercase tracking-[0.3em] text-xs mb-3">
          Stay Inspired
        </p>
        <h2
          id="blog-newsletter-heading"
          className="text-2xl md:text-3xl font-bold mb-3 font-serif"
        >
          Get Travel Tips in Your Inbox
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          Subscribe to our newsletter for exclusive guides, deals, and
          inspiration for your next adventure.
        </p>

        <DiamondDivider className="mb-8" />

        <form
          action="/api/newsletter"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          aria-label="Blog newsletter signup"
          noValidate
        >
          <label htmlFor="blog-newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="blog-newsletter-email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            aria-required="true"
            autoComplete="email"
            className="flex-1 px-5 py-3 bg-white/10 border border-amber-500/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-3 font-semibold uppercase tracking-wider text-white transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-stone-900 whitespace-nowrap"
          >
            Subscribe
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
  const [activeCategory, setActiveCategory] = useState("");

  const categories = getUniqueCategories();

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return blogPosts;
    return blogPosts.filter(
      (post) => post.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const remainingPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
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
                  {remainingPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              role="status"
              className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-12 text-center group"
            >
              <CornerAccents />
              <svg
                className="w-16 h-16 text-amber-400/70 mx-auto mb-4"
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
              <h3 className="text-xl font-bold text-stone-900 dark:text-amber-100 mb-2 font-serif">
                No posts found
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                No blog posts in this category yet.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("")}
                className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-semibold uppercase tracking-wider text-sm focus:outline-none focus:underline"
              >
                View all posts
              </button>
            </div>
          )}

          <NewsletterCTA />
        </div>
      </section>
    </div>
  );
}
