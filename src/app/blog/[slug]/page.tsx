import React from "react";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import JournalReadingExperience from "@/components/blog/JournalReadingExperience";

export const revalidate = 0;

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  await connection();

  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  const allPosts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true },
  });

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
    travelDate: post.travelDate ? post.travelDate.toISOString() : null,
    readingTime: post.readingTime || 5,
    category: { name: post.category.name },
    author: {
      name: post.author.name,
      avatar: post.author.avatar || "",
      bio: post.author.bio || "",
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
    travelDate: p.travelDate ? p.travelDate.toISOString() : null,
    readingTime: p.readingTime || 5,
    category: { name: p.category.name },
    author: {
      name: p.author.name,
      avatar: p.author.avatar || "",
      bio: p.author.bio || "",
    },
  }));

  return <JournalReadingExperience post={formattedPost} allPosts={formattedAllPosts} />;
}
