import React from "react";
import Link from "next/link";
import { connection } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_POSTS } from "@/lib/fallback-data";
import FloatingPetals from "@/components/effects/FloatingPetals";
import InfiniteGallery from "@/components/effects/InfiniteGallery";
import RumiAtlasLuxuryHero from "@/components/hero/RumiAtlasLuxuryHero";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  await connection();

  let latestPosts: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    readingTime: number | null;
    publishedAt: Date | string | null;
  }> = [];

  if (isDatabaseConfigured()) {
    try {
      latestPosts = await prisma.post.findMany({
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          readingTime: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: "desc" },
        take: 6,
      });
    } catch {
      latestPosts = FALLBACK_POSTS;
    }
  } else {
    latestPosts = FALLBACK_POSTS;
  }


  const galleryImages = latestPosts
    .filter((p) => p.featuredImage && p.featuredImage.startsWith("http"))
    .map((p) => ({
      src: p.featuredImage,
      alt: p.title,
    }));

  return (
    <div className="relative overflow-hidden bg-[#0B0813] text-[#F3E8FF]">
      {/* 3D Floating Petals & Particles Effect */}
      <FloatingPetals />

      {/* 1. CINEMATIC LUXURY TRAVEL HERO WITH 4 TRAVEL VIDEOS & LIQUID GLASS */}
      <RumiAtlasLuxuryHero />

      {/* 2. INFINITE 3D CANVAS GALLERY SECTION (DARK THEME) */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10 bg-[#0B0813]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Interactive Canvas
          </span>
          <h2 className="text-3xl sm:text-5xl font-instrument italic font-normal text-white">
            3D Visual Horizon
          </h2>
          <p className="text-xs text-[#A78BFA] font-light">
            Drag to pan around the infinite canvas or scroll to zoom through memory layers.
          </p>
          <div className="w-12 h-[1px] bg-[#8B5CF6] mx-auto mt-4" />
        </div>

        <div className="h-[550px] w-full rounded-3xl overflow-hidden border border-[#2E2352] shadow-2xl relative bg-[#130F24]">
          <InfiniteGallery
            images={galleryImages.length > 0 ? galleryImages : undefined}
            density={6}
            imageWidth={160}
            imageHeight={210}
            rounded={6}
            dragSpeed={22}
            driftAmount={15}
            backgroundColor="#130F24"
          />
        </div>
      </section>

      {/* 3. MINIMAL JOURNAL PREVIEW GRID (DARK THEME) */}
      <section className="pb-28 max-w-6xl mx-auto px-6 bg-[#0B0813]">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Travel Entries
          </span>
          <h2 className="text-3xl sm:text-5xl font-instrument italic font-normal text-white">
            Recent Journals
          </h2>
          <div className="w-12 h-[1px] bg-[#8B5CF6] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="tilt-card group liquid-glass rounded-3xl overflow-hidden shadow-md flex flex-col justify-between"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                  <ImagePlaceholder
                    src={post.featuredImage}
                    alt={post.title}
                    label="Travel Cover Placeholder"
                    aspectRatio="aspect-[4/3]"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>

                <div className="p-7 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#A78BFA] font-sans">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recently"}
                    </span>
                    <span>{post.readingTime || 5} min read</span>
                  </div>

                  <h3 className="font-instrument italic text-2xl font-normal text-white group-hover:text-[#FDE047] transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-[#A78BFA] font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-serif italic text-[#FDE047] hover:text-white transition-colors"
                >
                  <span>Read Journal Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="pt-16 text-center">
          <Link
            href="/blog"
            className="px-8 py-3.5 bg-transparent border border-[#8B5CF6] hover:bg-[#8B5CF6]/20 text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-full transition-all inline-block"
          >
            View Full Atlas Journal &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
