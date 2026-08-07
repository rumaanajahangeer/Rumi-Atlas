"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Cinematic3DHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(0);

  // 3D Movable Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Video Custom Fade Loop Logic using requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const checkTime = () => {
      if (video.duration) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        // Fade in over 0.5s at the start
        if (currentTime < 0.5) {
          setOpacity(currentTime / 0.5);
        }
        // Fade out over 0.5s before the end
        else if (duration - currentTime < 0.5) {
          setOpacity((duration - currentTime) / 0.5);
        } else {
          setOpacity(1);
        }
      }
      animationFrameId = requestAnimationFrame(checkTime);
    };

    const handleEnded = async () => {
      setOpacity(0);
      setTimeout(async () => {
        if (video) {
          video.currentTime = 0;
          try {
            await video.play();
          } catch (e) {}
        }
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    animationFrameId = requestAnimationFrame(checkTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full overflow-hidden bg-white text-[#000000] flex flex-col justify-between"
      style={{ perspective: 1200 }}
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          style={{ opacity, transition: "opacity 0.1s linear" }}
          className="w-full h-full object-cover filter brightness-95 saturate-90 scale-105"
        />
        {/* Gradient Overlay over video */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/95" />
      </div>

      {/* 3D Movable Content Card Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center my-auto py-24"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-[#6F6F6F] text-[11px] uppercase tracking-[0.3em] font-medium mb-6 animate-fade-rise">
          <Sparkles className="w-3.5 h-3.5 text-[#000000]" />
          <span>The Rumi Atlas® Journal</span>
        </div>

        {/* Headline */}
        <h1 className="font-instrument font-normal text-5xl sm:text-7xl md:text-8xl max-w-7xl leading-[0.95] tracking-[-2.46px] text-[#000000] animate-fade-rise">
          Beyond <span className="italic text-[#6F6F6F]">silence,</span> we build{" "}
          <span className="italic text-[#6F6F6F]">the eternal.</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay font-sans">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
        </p>

        {/* Hero CTA Button */}
        <div className="animate-fade-rise-delay-2">
          <Link
            href="/blog"
            className="inline-block rounded-full px-14 py-5 text-base font-sans font-medium mt-12 bg-[#000000] text-white hover:scale-[1.03] transition-transform duration-300 shadow-2xl"
          >
            Begin Journey &rarr;
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
