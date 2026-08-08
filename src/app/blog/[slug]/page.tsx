import React from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_POSTS } from "@/lib/fallback-data";
import JournalReadingExperience from "@/components/blog/JournalReadingExperience";

export const revalidate = 0;

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  await connection();

  const { slug } = await params;

  let post: any = null;
  let allPosts: any[] = [];

  if (isDatabaseConfigured()) {
    try {
      post = await prisma.post.findUnique({
        where: { slug },
        include: {
          category: true,
          author: true,
        },
      });

      allPosts = await prisma.post.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        include: { category: true, author: true },
      });
    } catch {
      post = FALLBACK_POSTS.find((p) => p.slug === slug) || null;
      allPosts = FALLBACK_POSTS;
    }
  } else {
    post = FALLBACK_POSTS.find((p) => p.slug === slug) || null;
    allPosts = FALLBACK_POSTS;
  }

  if (!post || (post.isPublished === false)) {
    notFound();
  }


  const formattedPost = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    galleryImages: post.galleryImages || "[]",
    destination: post.destination || "Merzouga Dunes",
    country: post.country || "Morocco",
    travelDate: post.travelDate
      ? typeof post.travelDate === "string"
        ? post.travelDate
        : post.travelDate.toISOString()
      : null,
    readingTime: post.readingTime || 5,
    category: { name: post.category?.name || "Expedition" },
    author: {
      name: post.author?.name || "Editorial Curator",
      avatar: post.author?.avatar || "",
      bio: post.author?.bio || "",
    },
  };

  const formattedAllPosts = allPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    featuredImage: p.featuredImage,
    galleryImages: p.galleryImages || "[]",
    destination: p.destination || "Merzouga Dunes",
    country: p.country || "Morocco",
    travelDate: p.travelDate
      ? typeof p.travelDate === "string"
        ? p.travelDate
        : p.travelDate.toISOString()
      : null,
    readingTime: p.readingTime || 5,
    category: { name: p.category?.name || "Expedition" },
    author: {
      name: p.author?.name || "Editorial Curator",
      avatar: p.author?.avatar || "",
      bio: p.author?.bio || "",
    },
  }));


  return <JournalReadingExperience post={formattedPost} allPosts={formattedAllPosts} />;
}
