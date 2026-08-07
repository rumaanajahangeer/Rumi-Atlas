"use client";

import React from "react";
import { useBookmarks } from "@/components/providers/BookmarkProvider";
import { Bookmark, BookmarkCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function BookmarkButton({ postId }: { postId: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(postId);

  const handleClick = () => {
    if (!bookmarked) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#C5A059", "#D4AF37", "#5F7466"],
        });
      } catch (e) {}
    }
    toggleBookmark(postId);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
        bookmarked
          ? "bg-[#C5A059] text-white border-[#C5A059] shadow-md"
          : "bg-white/10 hover:bg-white/20 text-white border-white/30"
      }`}
    >
      {bookmarked ? (
        <>
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="w-3.5 h-3.5" />
          <span>Save Story</span>
        </>
      )}
    </button>
  );
}
