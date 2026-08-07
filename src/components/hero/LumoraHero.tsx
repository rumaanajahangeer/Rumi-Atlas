"use client";

import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const VIDEOS = [
  {
    name: "Golden Hour",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
  },
  {
    name: "Still Water",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
  },
  {
    name: "Deep Woods",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
  },
  {
    name: "Quiet Dawn",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
  },
];

export default function LumoraHero() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleVideoSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const isDeepWoods = activeVideo === 2;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between select-none">
      {/* BACKGROUND VIDEO STACK LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {VIDEOS.map((video, idx) => (
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
      </div>

      {/* TRANSPARENT PNG OVERLAY (z-index 1) WITH TRAIN-BOB */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
          alt="Overlay Frame"
          className="w-full h-full object-cover animate-train-bob"
        />
      </div>

      {/* CONTENT LAYER (z-index 2) */}
      <div className="relative z-[2] flex flex-col h-full justify-between">
        {/* NAVIGATION BAR */}
        <header className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="font-instrument italic text-white text-xl sm:text-2xl font-normal tracking-wide">
            Lumora
          </div>

          {/* Desktop Nav Pill */}
          <nav className="hidden md:flex items-center space-x-6 px-6 py-2 rounded-full liquid-glass text-white/90 text-sm font-sans">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#community" className="hover:text-white transition-colors">
              Community
            </a>
            <button className="ml-2 px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-[1.03] transition-transform">
              Get Started
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full liquid-glass text-white relative w-10 h-10 flex items-center justify-center overflow-hidden"
          >
            <div
              className={`transition-all duration-300 transform ${
                mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <Menu className="w-5 h-5" />
            </div>
            <div
              className={`absolute transition-all duration-300 transform ${
                mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
              }`}
            >
              <X className="w-5 h-5" />
            </div>
          </button>
        </header>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-center items-center space-y-6 text-center animate-fade-rise">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-3xl font-instrument hover:text-[#D8B46A] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-3xl font-instrument hover:text-[#D8B46A] transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-3xl font-instrument hover:text-[#D8B46A] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-3xl font-instrument hover:text-[#D8B46A] transition-colors"
            >
              Community
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 rounded-full bg-white text-black font-medium text-lg mt-4"
            >
              Get Started
            </button>
          </div>
        )}

        {/* HERO CENTER CONTENT */}
        <div className="max-w-4xl mx-auto px-6 text-center my-auto flex flex-col items-center justify-center space-y-6">
          {/* Badge */}
          <div
            className={`inline-block px-5 py-2 rounded-full liquid-glass text-xs sm:text-sm font-sans tracking-wide transition-colors duration-700 ${
              isDeepWoods ? "text-[#182C41]" : "text-white/90"
            }`}
          >
            Over 10,000 minds already finding their clarity
          </div>

          {/* Heading */}
          <h1
            className={`font-instrument font-normal text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl tracking-tight transition-colors duration-700 ${
              isDeepWoods ? "text-[#182C41]" : "text-white"
            }`}
          >
            Clarity in an Endlessly <br className="hidden sm:inline" />
            Noisy Universe
          </h1>

          {/* Subtext */}
          <p
            className={`font-sans text-sm sm:text-base md:text-lg max-w-xl leading-relaxed transition-colors duration-700 ${
              isDeepWoods ? "text-[#182C41]/80" : "text-white/80"
            }`}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover how to protect your presence and create with intention.
          </p>

          {/* Email Input */}
          <div className="w-full max-w-[320px] sm:max-w-sm p-1.5 rounded-full liquid-glass flex items-center justify-between">
            <input
              type="email"
              placeholder="Your Best Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-transparent outline-none px-4 text-xs sm:text-sm w-full placeholder-white/50 transition-colors duration-700 ${
                isDeepWoods ? "text-[#182C41] placeholder-[#182C41]/50" : "text-white"
              }`}
            />
            <button className="px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-medium hover:scale-[1.03] transition-transform whitespace-nowrap shadow-md">
              Get Early Access
            </button>
          </div>

          {/* Video Switcher */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-4">
            {VIDEOS.map((video, idx) => {
              const isActive = activeVideo === idx;
              return (
                <button
                  key={video.name}
                  onClick={() => handleVideoSwitch(idx)}
                  className={`text-xs sm:text-sm font-sans tracking-wide pb-1 transition-all duration-300 ${
                    isActive
                      ? isDeepWoods
                        ? "text-[#182C41] border-b-2 border-[#182C41] font-semibold"
                        : "text-white border-b-2 border-white font-semibold"
                      : isDeepWoods
                      ? "text-[#182C41]/50 hover:text-[#182C41]/80 border-b-2 border-transparent"
                      : "text-white/50 hover:text-white/80 border-b-2 border-transparent"
                  }`}
                >
                  {video.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM STATS */}
        <footer className="w-full max-w-5xl mx-auto px-6 py-6 text-center text-white/70 text-xs sm:text-sm font-sans">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span>60+ Deep Sessions</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>12,000+ Creators</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>4.8 User Satisfaction</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>Intentional-First Design</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
