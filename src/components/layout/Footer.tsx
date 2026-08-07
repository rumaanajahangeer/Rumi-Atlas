"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Send } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // DO NOT RENDER PUBLIC FOOTER ON ADMIN PAGES
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0813] text-[#A78BFA] py-16 border-t border-[#2E2352] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-10">
        {/* Brand */}
        <div className="space-y-2">
          <span className="font-instrument italic tracking-wide text-3xl font-normal uppercase text-white">
            The Rumi Atlas
          </span>
          <p className="text-xs tracking-[0.3em] text-[#FDE047] uppercase font-sans font-medium">
            Collecting Places. Preserving Memories.
          </p>
        </div>

        {/* Minimal Dispatch Subscription */}
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-xs font-light text-stone-300 leading-relaxed">
            Receive private travel dispatches and personal reflections directly in your inbox.
          </p>
          {subscribed ? (
            <div className="text-xs text-[#FDE047] font-serif italic">
              ✨ Thank you for subscribing to The Rumi Atlas dispatch.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-[#2E2352] focus:border-[#8B5CF6] rounded-full px-5 py-2.5 text-xs text-white placeholder-stone-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-widest font-semibold rounded-full flex items-center space-x-1.5 transition-all shadow-md"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Nav & Copyright */}
        <div className="pt-10 border-t border-[#2E2352] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A78BFA] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">The Rumi Atlas</span>. Personal Travel Journal.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/blog" className="hover:text-white transition-colors">Journal</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#FDE047] hover:text-white transition-colors font-medium"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
