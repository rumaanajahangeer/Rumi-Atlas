"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // DO NOT RENDER PUBLIC NAVBAR ON ADMIN PAGES TO PREVENT OVERLAPPING
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Travel Journals", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "liquid-glass py-4 shadow-xl border-b border-[#2E2352]"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-instrument italic tracking-wide text-2xl sm:text-3xl font-normal text-white transition-colors">
              The Rumi Atlas
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#FDE047] uppercase font-sans font-medium -mt-1">
              Collecting Places. Preserving Memories.
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-1 font-medium ${
                    isActive
                      ? "text-[#FDE047] font-semibold"
                      : "text-white/90 hover:text-[#FDE047]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FDE047] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            <Link
              href={session ? "/admin/dashboard" : "/admin/login"}
              className="flex items-center space-x-1.5 px-5 py-2 text-[11px] font-medium tracking-[0.2em] uppercase rounded-full transition-all shadow-md bg-[#8B5CF6] text-white hover:bg-[#7C3AED] hover:scale-105"
            >
              <Sparkles className="w-3 h-3" />
              <span>{session ? "Admin" : "Admin Portal"}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden liquid-glass px-6 pt-4 pb-8 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-instrument italic tracking-[0.2em] uppercase text-white hover:text-[#FDE047] py-1 border-b border-[#2E2352]"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={session ? "/admin/dashboard" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#FDE047] pt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{session ? "Admin Portal" : "Admin Login"}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
