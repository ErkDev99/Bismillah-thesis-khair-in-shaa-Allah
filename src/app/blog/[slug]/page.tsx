// src/app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/data/blog";

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
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
  };
}

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Article Header
function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mb-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blog
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          {post.category}
        </span>
        <span className="text-gray-500 text-sm">{post.readTime}</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

      {/* Author & Date */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
          {post.author.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{post.author.name}</p>
          <p className="text-sm text-gray-500">
            {post.author.role} • {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>
    </header>
  );
}

// Featured Image
function FeaturedImage({ post }: { post: BlogPost }) {
  return (
    <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-emerald-200 to-emerald-400">
      {/* Uncomment when you have images:
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
        priority
      />
      */}
    </div>
  );
}

// Article Content (renders markdown-like content)
function ArticleContent({ content }: { content: string }) {
  // Simple markdown-to-HTML conversion for headings and basic formatting
  const processedContent = content
    .split("\n")
    .map((line, index) => {
      // H2 headings
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-gray-900 mt-8 mb-4"
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
            className="text-xl font-bold text-gray-900 mt-6 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Bold text handling
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={index} className="text-gray-600 mb-4 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-900">
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
          <li key={index} className="text-gray-600 ml-4 mb-2">
            {line.replace("- ", "")}
          </li>
        );
      }
      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="text-gray-600 ml-4 mb-2 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      // Regular paragraphs (skip empty lines)
      if (line.trim()) {
        return (
          <p key={index} className="text-gray-600 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    })
    .filter(Boolean);

  return <div className="prose-custom">{processedContent}</div>;
}

// Tags
function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}

// Share Buttons
function ShareButtons({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t">
      <span className="text-gray-600 font-medium">Share this article:</span>
      <div className="flex gap-2">
        <button
          className="w-10 h-10 bg-gray-100 hover:bg-emerald-100 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </button>
        <button
          className="w-10 h-10 bg-gray-100 hover:bg-emerald-100 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button
          className="w-10 h-10 bg-gray-100 hover:bg-emerald-100 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Related Posts
function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Articles
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-emerald-200 to-emerald-400">
                {/* Image placeholder */}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">{post.readTime}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="mt-16 bg-emerald-900 text-white rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Ready to Experience Central Asia?
      </h2>
      <p className="text-emerald-200 mb-6 max-w-xl mx-auto">
        Turn inspiration into adventure. Browse our curated tours or contact us
        to plan your custom journey.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/tours"
          className="bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Explore Tours
        </Link>
        <Link
          href="/contact"
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}

// Main Blog Post Page
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Background */}
      <div className="bg-emerald-900 h-32" />

      <article className="max-w-4xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <ArticleHeader post={post} />
          <FeaturedImage post={post} />
          <ArticleContent content={post.content} />
          <TagList tags={post.tags} />
          <ShareButtons post={post} />
        </div>

        <RelatedPosts posts={relatedPosts} />
        <CTASection />
      </article>

      {/* Bottom spacing */}
      <div className="h-16" />
    </div>
  );
}