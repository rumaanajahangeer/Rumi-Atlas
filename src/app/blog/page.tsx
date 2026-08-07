import React from "react";
import NexumHero from "@/components/hero/NexumHero";
import { prisma } from "@/lib/prisma";
import BlogListClient from "@/components/blog/BlogListClient";

export const revalidate = 0;

export default async function BlogListingPage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: {
      category: true,
      author: true,
    },
  });

  const formattedPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    galleryImages: post.galleryImages || "[]",
    destination: post.destination || "Global Destination",
    country: post.country || "Explore",
    readingTime: post.readingTime || 5,
    category: { name: post.category?.name || "Expedition" },
    author: {
      name: post.author?.name || "Rumi",
      avatar: post.author?.avatar || "",
      bio: post.author?.bio || "",
    },
  }));

  const latestPost = posts[0];
  const recentBlog = latestPost
    ? {
        id: latestPost.id,
        title: latestPost.title,
        excerpt: latestPost.excerpt,
        slug: latestPost.slug,
        authorName: latestPost.author?.name || "Rumi",
        authorAvatar: latestPost.author?.avatar || undefined,
      }
    : undefined;

  return (
    <main className="bg-[#0B0813] min-h-screen">
      {/* 1. HERO SECTION */}
      <NexumHero totalBlogsCount={posts.length} recentBlog={recentBlog} />

      {/* 2. ALL TRAVEL JOURNALS SECTION DOWN THE PAGE */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-[#2E2352]/50">
        <BlogListClient posts={formattedPosts} />
      </section>
    </main>
  );
}
