// src/app/blog/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  blogPosts,
  getUniqueCategories,
  type BlogPost,
} from "@/lib/data/blog";

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Featured Post Card (Large)
function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 group-hover:scale-105 transition-transform duration-500">
          {/* Uncomment when you have images:
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
            <span className="text-emerald-300 text-sm">{post.category}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 group-hover:text-emerald-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-300 mb-4 line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{post.author.name}</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Regular Post Card
function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-200 to-emerald-400">
          {/* Uncomment when you have images:
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
            <span className="text-gray-500">{formatDate(post.publishedAt)}</span>
            <span className="text-emerald-600 font-medium">{post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Category Filter
function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => setActiveCategory("")}
        className={`px-5 py-2 rounded-full font-medium transition-colors ${
          activeCategory === ""
            ? "bg-emerald-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 rounded-full font-medium transition-colors ${
            activeCategory === category
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// Main Blog Page
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("");

  const categories = getUniqueCategories();

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return blogPosts;
    return blogPosts.filter(
      (post) => post.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  // Get featured post (first featured post or first post)
  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const remainingPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Stories & Guides
          </h1>
          <p className="text-emerald-200 max-w-2xl mx-auto text-lg">
            Insights, tips, and inspiration for your Central Asian adventure from
            our team of local experts.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <FeaturedPostCard post={featuredPost} />
                </div>
              )}

              {/* Posts Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 mb-4">
                No blog posts in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("")}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View all posts
              </button>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-emerald-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get Travel Tips in Your Inbox
            </h2>
            <p className="text-emerald-200 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive guides, deals, and
              inspiration for your next adventure.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}