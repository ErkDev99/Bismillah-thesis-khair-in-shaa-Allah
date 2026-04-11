// src/app/blog/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component — no "use client" needed.
// Style: Luxury / Art Deco — amber + stone palette, serif headings,
// geometric diamond ornaments, wide tracking, dark mode throughout.
// ─────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/data/blog";

// ─── Shared gradient palette ─────────────────────────────────────────────────
const GRADIENTS = [
  "from-amber-800 via-amber-900 to-stone-950",
  "from-stone-700 via-stone-800 to-stone-950",
  "from-amber-700 via-orange-800 to-amber-950",
  "from-stone-600 via-stone-700 to-stone-900",
  "from-amber-600 via-amber-700 to-stone-900",
  "from-stone-800 via-stone-900 to-black",
];

// ─── Generate static params for all posts ───────────────────────────────────
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ─── Generate metadata for SEO ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Wanderlust Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      siteName: "Wanderlust",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

// ─── Diamond Divider ─────────────────────────────────────────────────────────
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
// ARTICLE HEADER
// ═════════════════════════════════════════════════════════════════════════════
function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 mb-6 text-xs font-semibold uppercase tracking-[0.2em] transition-colors focus:outline-none focus:underline"
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
        Back to Blog
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] border border-amber-300 dark:border-amber-700">
          {post.category}
        </span>
        <span className="text-stone-600 dark:text-stone-400 text-xs uppercase tracking-[0.15em]">
          {post.readTime}
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-amber-100 mb-5 leading-tight font-serif">
        {post.title}
      </h1>

      <p className="text-xl text-stone-600 dark:text-stone-400 mb-6 leading-relaxed font-serif italic">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
        <div
          className="relative w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-lg font-serif border border-amber-500/40"
          aria-hidden="true"
        >
          {post.author.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-stone-900 dark:text-amber-100">
            {post.author.name}
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em] mt-0.5">
            {post.author.role} &middot; {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>
    </header>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEATURED IMAGE
// ═════════════════════════════════════════════════════════════════════════════
function FeaturedImage({ post }: { post: BlogPost }) {
  const gradientIndex = post.id % GRADIENTS.length;
  return (
    <div
      className={`group relative h-64 md:h-96 overflow-hidden mb-10 bg-gradient-to-br ${GRADIENTS[gradientIndex]}`}
    >
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="blog-featured-deco" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blog-featured-deco)" />
        </svg>
      </div>
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/60" aria-hidden="true" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/60" aria-hidden="true" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/60" aria-hidden="true" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/60" aria-hidden="true" />
      <span className="sr-only">Featured image placeholder for {post.title}</span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ARTICLE CONTENT
// ═════════════════════════════════════════════════════════════════════════════
function ArticleContent({ content }: { content: string }) {
  const processedContent = content
    .split("\n")
    .map((line, index) => {
      // H2 headings
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-amber-100 mt-10 mb-4 font-serif"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      // H3 headings
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-stone-900 dark:text-amber-100 mt-8 mb-3 font-serif"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Bold text handling
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={index} className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-stone-900 dark:text-amber-100">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      // List items
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-stone-600 dark:text-stone-400 ml-6 mb-2 list-disc marker:text-amber-500">
            {line.replace("- ", "")}
          </li>
        );
      }
      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="text-stone-600 dark:text-stone-400 ml-6 mb-2 list-decimal marker:text-amber-500">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={index} className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    })
    .filter(Boolean);

  return <div className="prose-custom">{processedContent}</div>;
}

// ═════════════════════════════════════════════════════════════════════════════
// TAG LIST
// ═════════════════════════════════════════════════════════════════════════════
function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-10 pt-8 border-t border-stone-200 dark:border-stone-800">
      <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-[10px] mb-3">
        Tags
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SHARE BUTTONS
// ═════════════════════════════════════════════════════════════════════════════
function ShareButtons() {
  const buttonClass =
    "w-10 h-10 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-stone-200 dark:border-stone-800">
      <span className="text-stone-700 dark:text-stone-300 font-semibold text-xs uppercase tracking-[0.2em]">
        Share this article
      </span>
      <div className="flex gap-2">
        <button type="button" className={buttonClass} aria-label="Share on Twitter">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </button>
        <button type="button" className={buttonClass} aria-label="Share on Facebook">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button type="button" className={buttonClass} aria-label="Share on LinkedIn">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// RELATED POSTS
// ═════════════════════════════════════════════════════════════════════════════
function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800"
    >
      <div className="mb-8">
        <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">
          Keep Reading
        </p>
        <h2
          id="related-heading"
          className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-amber-100 font-serif"
        >
          Related Articles
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            aria-label={`Read: ${post.title}`}
            className="group relative focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
          >
            <article className="relative bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600">
              <CornerAccents />
              <div
                className={`relative h-40 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                aria-hidden="true"
              >
                <div className="absolute inset-0 opacity-[0.06]">
                  <svg width="100%" height="100%">
                    <pattern id={`related-deco-${i}`} width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#related-deco-${i})`} />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-stone-900 dark:text-amber-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 font-serif">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-[0.15em]">
                  {post.readTime}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CTA SECTION
// ═════════════════════════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section
      aria-labelledby="blog-cta-heading"
      className="relative mt-16 bg-stone-900 dark:bg-black text-white p-10 md:p-14 text-center border border-amber-500/20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="post-cta-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#post-cta-deco)" />
        </svg>
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="text-amber-400/70 uppercase tracking-[0.3em] text-xs mb-3">
          Inspired?
        </p>
        <h2 id="blog-cta-heading" className="text-2xl md:text-3xl font-bold mb-4 font-serif">
          Ready to Experience Central Asia?
        </h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto leading-relaxed">
          Turn inspiration into adventure. Browse our curated tours or contact us
          to plan your custom journey.
        </p>

        <DiamondDivider className="mb-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tours"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Explore Tours
          </Link>
          <Link
            href="/contact"
            className="border-2 border-amber-500/50 hover:bg-amber-500 hover:text-white text-amber-300 px-8 py-4 font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
      {/* Dark banner band */}
      <div
        className="relative bg-stone-900 dark:bg-black h-32 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <pattern id="post-banner-deco" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#post-banner-deco)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <article className="max-w-4xl mx-auto px-4 -mt-16 pb-16">
        <div className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg p-6 md:p-10">
          <CornerAccents />
          <ArticleHeader post={post} />
          <FeaturedImage post={post} />
          <ArticleContent content={post.content} />
          <TagList tags={post.tags} />
          <ShareButtons />
        </div>

        <RelatedPosts posts={relatedPosts} />
        <CTASection />
      </article>
    </div>
  );
}
