"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface RecentBlog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  authorName: string;
  authorAvatar?: string;
}

interface NexumHeroProps {
  totalBlogsCount?: number;
  recentBlog?: RecentBlog;
}

export default function NexumHero({ totalBlogsCount = 6, recentBlog }: NexumHeroProps) {
  const displayBlog = recentBlog || {
    id: "1",
    title: "Whispering Sands of Merzouga",
    excerpt: "Ascending golden dunes at sunset and stargazing over Berber luxury camps.",
    slug: "sahara-desert-palaces-merzouga",
    authorName: "Rumi",
    authorAvatar: "https://i.pravatar.cc/72?img=12",
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0813] font-sans select-none">
      {/* 1. ABSOLUTE FULL-BLEED BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
      />

      {/* SOFT VIGNETTE OVERLAY FOR EXCELLENT READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0B0813] backdrop-blur-[0.5px]" />

      {/* 2. MAIN CONTAINER OVERLAY */}
      <div className="relative z-10 flex flex-col h-full justify-end">
        {/* MAIN CONTENT (BOTTOM-ANCHORED WITH FADE-IN ANIMATION) */}
        <main className="mt-auto px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Left: Editorial Headline & Supporting Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl space-y-4 sm:space-y-6"
            >
              <h1 className="font-instrument font-normal italic text-4xl sm:text-6xl lg:text-[4rem] leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                Every Journey Begins With a Story.
              </h1>

              <p className="font-serif italic text-sm sm:text-base md:text-lg leading-relaxed text-stone-200 font-light drop-shadow max-w-xl">
                "Step into a collection of unforgettable moments, quiet discoveries, and stories gathered along the way. Every journal is an invitation to slow down, explore, and relive the beauty of meaningful journeys."
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <Link
                  href="/blog"
                  className="px-8 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-[0.25em] font-semibold shadow-xl hover:scale-105 transition-all inline-block"
                >
                  Explore Atlas Journals &rarr;
                </Link>
              </div>
            </motion.div>

            {/* Right: Dual Glass Cards Showing Recent CMS Blogs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5 w-full"
            >
              {/* Card 1: Total Stories Count */}
              <div className="rounded-3xl liquid-glass p-5 sm:p-6 sm:w-64 flex flex-col justify-between border border-[#2E2352] shadow-2xl">
                <div>
                  <div className="font-silkscreen text-3xl sm:text-4xl font-normal tracking-tight text-white">
                    {totalBlogsCount}+
                  </div>
                  <p className="text-xs leading-relaxed mt-3 text-stone-300 font-light">
                    Preserved travel journals & dispatches in The Rumi Atlas.
                  </p>
                </div>
              </div>

              {/* Card 2: Most Recent Story Preview */}
              <div className="rounded-3xl liquid-glass p-5 sm:p-6 sm:w-64 flex flex-col justify-between border border-[#2E2352] shadow-2xl">
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#FDE047]">
                      Latest Dispatch
                    </span>
                    <Link
                      href={`/blog/${displayBlog.slug}`}
                      className="text-[11px] font-semibold uppercase text-white hover:text-[#FDE047] underline"
                    >
                      Read &rarr;
                    </Link>
                  </div>

                  {/* Recent Story Title & Excerpt */}
                  <h3 className="font-instrument italic text-lg text-white line-clamp-1">
                    {displayBlog.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-300 font-light mt-1 line-clamp-2">
                    "{displayBlog.excerpt}"
                  </p>
                </div>

                {/* Footer Author */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    R
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {displayBlog.authorName || "Rumi"}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Author & Curator
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </section>
  );
}
