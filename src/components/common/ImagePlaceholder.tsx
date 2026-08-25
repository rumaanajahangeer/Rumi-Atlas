"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface ImagePlaceholderProps {
  src?: string | null;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  label?: string;
}

export default function ImagePlaceholder({
  src,
  alt = "Travel Journal Image",
  className = "",
  aspectRatio = "aspect-[4/3]",
  label = "Journal Image Placeholder",
}: ImagePlaceholderProps) {
  if (src && (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/"))) {
    if (src.startsWith("data:") || src.startsWith("/")) {
      return (
        <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#F8F5F0] via-[#E2DBD0] to-[#A8B8A5]/20 dark:from-[#1C291E] dark:via-[#243527] dark:to-[#314734] border border-[#A8B8A5]/30 flex flex-col items-center justify-center p-6 text-center group ${aspectRatio} ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#A8B8A5]/20 border border-[#A8B8A5]/40 flex items-center justify-center text-[#2F4733] dark:text-[#A8B8A5] mb-3 group-hover:scale-110 transition-transform duration-500">
        <Camera className="w-5 h-5 opacity-75" />
      </div>
      <span className="font-serif text-xs italic tracking-wider text-[#2F4733]/80 dark:text-[#F8F5F0]/80">
        {label}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#D8B46A] mt-1">
        Personal Travel Imagery
      </span>
    </div>
  );
}
