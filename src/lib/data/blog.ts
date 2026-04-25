// src/lib/data/blog.ts
// Locale-aware entry point. EN data is the source of truth (blog.en.ts);
// RU strings are slug-keyed overrides in blog.ru.ts. Pass `locale` to any
// getter to receive a localized BlogPost; missing RU overrides gracefully
// fall back to EN.

import { blogPostsEn, type BlogPost, type BlogCategoryKey } from "./blog.en";
import { blogPostsRu } from "./blog.ru";

export type { BlogPost, BlogCategoryKey };

export type Locale = "en" | "ru";

function localize(post: BlogPost, locale: Locale): BlogPost {
  if (locale !== "ru") return post;
  const ru = blogPostsRu[post.slug];
  if (!ru) return post;
  return {
    ...post,
    title: ru.title,
    excerpt: ru.excerpt,
    content: ru.content,
    tags: ru.tags,
    readTime: ru.readTime,
    author: {
      ...post.author,
      name: ru.authorName,
      role: ru.authorRole,
    },
  };
}

export function getAllPosts(locale: Locale = "en"): BlogPost[] {
  return blogPostsEn
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((p) => localize(p, locale));
}

export function getPostBySlug(
  slug: string,
  locale: Locale = "en"
): BlogPost | undefined {
  const post = blogPostsEn.find((p) => p.slug === slug);
  return post ? localize(post, locale) : undefined;
}

export function getFeaturedPosts(locale: Locale = "en"): BlogPost[] {
  return blogPostsEn.filter((p) => p.featured).map((p) => localize(p, locale));
}

export function getPostsByCategory(
  category: BlogCategoryKey,
  locale: Locale = "en"
): BlogPost[] {
  return blogPostsEn
    .filter((p) => p.category === category)
    .map((p) => localize(p, locale));
}

export function getUniqueCategories(): BlogCategoryKey[] {
  return [...new Set(blogPostsEn.map((p) => p.category))];
}

export function getRelatedPosts(
  currentSlug: string,
  locale: Locale = "en",
  limit: number = 3
): BlogPost[] {
  const currentPost = blogPostsEn.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  return blogPostsEn
    .filter((p) => p.slug !== currentSlug)
    .filter(
      (p) =>
        p.category === currentPost.category ||
        p.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit)
    .map((p) => localize(p, locale));
}
