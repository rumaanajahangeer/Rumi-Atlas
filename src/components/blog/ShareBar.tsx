"use client";

import React, { useState } from "react";
import { Share2, Globe, MessageCircle, Copy, Check } from "lucide-react";

interface ShareBarProps {
  title: string;
  url?: string;
}

export default function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "https://rumiatlas.com");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - ${currentUrl}`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center space-x-3 py-6 border-y border-stone-200 dark:border-slate-800 my-8">
      <span className="text-xs uppercase tracking-widest font-bold text-stone-500 flex items-center space-x-1.5 mr-2">
        <Share2 className="w-4 h-4 text-[#C5A059]" />
        <span>Share Story</span>
      </span>

      <button
        onClick={shareFacebook}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-[#1877F2] hover:text-white text-stone-700 dark:text-stone-300 flex items-center justify-center transition-all"
        title="Share on Facebook"
      >
        <Share2 className="w-4 h-4" />
      </button>

      <button
        onClick={shareTwitter}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-black hover:text-white text-stone-700 dark:text-stone-300 flex items-center justify-center transition-all"
        title="Share on X"
      >
        <Globe className="w-4 h-4" />
      </button>

      <button
        onClick={shareWhatsApp}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-[#25D366] hover:text-white text-stone-700 dark:text-stone-300 flex items-center justify-center transition-all"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      <button
        onClick={copyToClipboard}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-slate-800 hover:bg-[#C5A059] hover:text-white text-stone-700 dark:text-stone-300 flex items-center justify-center transition-all relative"
        title="Copy Link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>

      {copied && (
        <span className="text-xs text-emerald-600 font-semibold animate-pulse ml-2">
          Link copied!
        </span>
      )}
    </div>
  );
}
