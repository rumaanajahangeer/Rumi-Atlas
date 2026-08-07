"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import FloatingPetals from "@/components/effects/FloatingPetals";

const TRAVEL_VIDEOS = [
  {
    name: "Wildflowers",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
  },
  {
    name: "Forest Trails",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
  },
  {
    name: "Mountain Cabin",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
  },
  {
    name: "Golden Sunrise",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
  },
];

export default function RumiAtlasLuxuryHero() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleVideoSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0B0813] flex flex-col justify-between select-none pt-24 pb-12">
      {/* 3D FLOATING PETALS LAYER */}
      <FloatingPetals />

      {/* BACKGROUND VIDEO STACK LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {TRAVEL_VIDEOS.map((video, idx) => (
          <video
            key={video.name}
            autoPlay
            muted
            loop
            playsInline
            src={video.url}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Soft Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0B0813] backdrop-blur-[0.5px]" />
      </div>

      {/* TRANSPARENT OVERLAY FRAME */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
          alt="Overlay Frame"
          className="w-full h-full object-cover animate-train-bob opacity-30"
        />
      </div>

      {/* HERO CENTER CONTENT WITH SUBTLE FADE-IN ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-[2] max-w-4xl mx-auto px-6 text-center my-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8"
      >
        {/* Small Badge */}
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white/90 text-xs sm:text-sm font-sans tracking-wide shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
          <span>A digital journal of slow travel & unforgettable memories.</span>
        </div>

        {/* Updated Headline: "Every Journey Begins With a Story." */}
        <h1 className="font-instrument font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight text-white drop-shadow-2xl max-w-4xl">
          Every Journey <br />
          <span className="italic text-[#FDE047]">Begins With a Story.</span>
        </h1>

        {/* Updated Supporting Text */}
        <p className="font-serif italic text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-stone-200 font-light drop-shadow">
          "Step into a collection of unforgettable moments, quiet discoveries, and stories gathered along the way."
        </p>

        {/* Clean Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Link
            href="/blog"
            className="px-8 py-4 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-sans text-xs uppercase tracking-[0.25em] font-semibold shadow-2xl hover:scale-105 transition-all flex items-center space-x-2"
          >
            <span>Read My Journals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/blog"
            className="px-8 py-4 rounded-full bg-black/60 hover:bg-black/80 border border-white/30 text-white font-sans text-xs uppercase tracking-[0.25em] font-semibold backdrop-blur-xl transition-all hover:scale-105"
          >
            Start Exploring
          </Link>
        </div>

        {/* Video Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {TRAVEL_VIDEOS.map((video, idx) => {
            const isActive = activeVideo === idx;
            return (
              <button
                key={video.name}
                onClick={() => handleVideoSwitch(idx)}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 shadow-md ${
                  isActive
                    ? "bg-[#8B5CF6] text-white font-semibold border border-[#8B5CF6] scale-105"
                    : "bg-black/60 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-black/80"
                }`}
              >
                {video.name}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* BOTTOM EDITORIAL PHRASES SECTION */}
      <footer className="relative z-[2] w-full max-w-5xl mx-auto px-6 py-4 text-center text-stone-300/80 text-xs sm:text-sm font-sans">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 uppercase tracking-widest font-light">
          <span>Slow Travel</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span>Nature Lover</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span>Travel Journals</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span>Captured Moments</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span>Hidden Cafés</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span>Mountain Escapes</span>
        </div>
      </footer>
    </section>
  );
}
