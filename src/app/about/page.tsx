"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingPetals from "@/components/effects/FloatingPetals";
import { Sparkles, ArrowRight, Compass, Heart, Feather } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative bg-[#0B0813] text-[#F3E8FF] min-h-screen overflow-hidden font-sans select-none">
      {/* 3D FLOATING PETALS */}
      <FloatingPetals />

      {/* 1. CINEMATIC VIDEO HERO SECTION */}
      <section className="relative h-screen min-h-[720px] flex flex-col justify-between overflow-hidden pt-24 pb-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-[#0B0813] z-[1]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full liquid-glass border border-white/20 text-white text-xs uppercase tracking-widest font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>The Rumi Atlas • Editorial Sanctuary</span>
          </div>

          <h1 className="font-instrument font-normal italic text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-white drop-shadow-2xl max-w-5xl mx-auto">
            Where <em className="not-italic text-stone-300">dreams</em> rise <br className="hidden sm:inline" />
            <em className="not-italic text-[#FDE047]">through the silence.</em>
          </h1>

          {/* UPDATED TRAVEL-INSPIRED ELEGANT INTRODUCTION */}
          <p className="font-sans text-stone-200 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light drop-shadow">
            "For the curious souls who find joy in every journey, believe every destination has a story to tell, and know that the most beautiful memories are the ones collected along the way. This is a place where adventures become stories, and stories become timeless memories."
          </p>

          <div className="pt-2">
            <Link
              href="#about-traveler"
              className="liquid-glass rounded-full px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-white hover:scale-105 transition-all inline-flex items-center space-x-2 border border-white/30 shadow-2xl"
            >
              <span>Begin Journey</span>
              <ArrowRight className="w-4 h-4 text-[#FDE047]" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. ABOUT THE TRAVELER SECTION (EDITORIAL LAYOUT - ZERO PROFILE IMAGES) */}
      <section id="about-traveler" className="py-28 max-w-4xl mx-auto px-6 relative z-10 space-y-16">
        {/* DELICATE DECORATIVE DIVIDER TOP */}
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Editorial Introduction
          </span>

          <h2 className="text-4xl sm:text-6xl font-instrument italic font-normal text-white">
            About the Traveler
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-[#A78BFA] max-w-2xl mx-auto leading-relaxed pt-2">
            "Forever chasing horizons, collecting stories, and finding a little piece of myself in every journey."
          </p>
        </motion.div>

        {/* ELEGANT EDITORIAL STORY CONTAINER (NO AVATARS / NO PLACEHOLDERS) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="liquid-glass p-8 sm:p-14 rounded-3xl border border-[#2E2352] shadow-2xl space-y-8 font-sans text-stone-200 text-sm sm:text-base leading-relaxed font-light"
        >
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:italic first-letter:text-[#FDE047] first-letter:mr-2 first-letter:float-left">
            Hi, I'm Rumi—a curious soul with a heart that feels most at home on the road. I believe every destination has a story waiting to be discovered, every journey teaches something new, and every memory deserves to be preserved. Through The Rumi Atlas, I share moments that made me pause, smile, and see the world a little differently.
          </p>

          <p>
            This is more than a collection of travel journals—it's a living archive of adventures, emotions, and unforgettable experiences. From quiet mornings and scenic landscapes to unexpected detours and meaningful encounters, every page holds a piece of a journey that shaped me.
          </p>

          <p>
            And this is only the beginning. There are countless destinations still waiting to be explored, countless stories yet to be written, and a world far too beautiful to stop discovering. So here's to the next adventure, the next passport stamp, and the next chapter waiting just beyond the horizon.
          </p>

          <div className="pt-6 border-t border-[#2E2352] flex items-center justify-between">
            <div className="font-instrument italic text-2xl text-[#FDE047]">
              ~ Rumi
            </div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-mono text-[#A78BFA]">
              <Compass className="w-4 h-4 text-[#FDE047]" />
              <span>Curator & Storyteller</span>
            </div>
          </div>
        </motion.div>

        {/* DELICATE DECORATIVE DIVIDER BOTTOM */}
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto" />
      </section>

      {/* 3. EDITORIAL PILLARS SHOWCASE */}
      <section className="pb-32 max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="liquid-glass p-8 rounded-3xl border border-[#2E2352] space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#FDE047] mx-auto">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-instrument italic text-2xl text-white">Slow Exploration</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Seeking quiet mornings, off-the-beaten-path paths, and meaningful cultural connections.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-[#2E2352] space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#FDE047] mx-auto">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-instrument italic text-2xl text-white">Poetic Storytelling</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Preserving emotions, thoughts, and quiet memories in an illustrated travel diary.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-[#2E2352] space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#FDE047] mx-auto">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-instrument italic text-2xl text-white">Living Archive</h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              A timeless collection of passport stamps, hand-drawn moments, and future horizons.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
