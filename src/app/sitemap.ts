import { MetadataRoute } from "next";
import { connection } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_POSTS } from "@/lib/fallback-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const baseUrl = "https://rumiatlas.com";

  let posts: Array<{ slug: string; updatedAt: Date | string }> = [];

  if (isDatabaseConfigured()) {
    try {
      posts = await prisma.post.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      });
    } catch {
      posts = FALLBACK_POSTS.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
    }
  } else {
    posts = FALLBACK_POSTS.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
  }

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));


  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/destinations`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...postUrls,
  ];
}
