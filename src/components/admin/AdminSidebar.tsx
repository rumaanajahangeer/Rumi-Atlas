"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Home,
  BookOpen,
  PenTool,
  FileText,
  Sparkles,
  Image as ImageIcon,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home, emoji: "🏠" },
    { name: "Journal Library", href: "/admin/blogs", icon: BookOpen, emoji: "📖" },
    { name: "New Journal", href: "/admin/blogs/new", icon: PenTool, emoji: "✍️" },
    { name: "Drafts", href: "/admin/blogs?status=draft", icon: FileText, emoji: "📝" },
    { name: "Published Journals", href: "/admin/blogs?status=published", icon: Sparkles, emoji: "🌸" },
    { name: "Media Library", href: "/admin/subscribers", icon: ImageIcon, emoji: "🖼" },
    { name: "Settings", href: "/admin/comments", icon: Settings, emoji: "⚙" },
  ];

  return (
    <aside className="w-64 shrink-0 min-h-screen liquid-glass border-r border-[#2E2352] p-6 flex flex-col justify-between hidden md:flex z-30 bg-[#0B0813]">
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="space-y-1">
          <Link href="/" className="group flex flex-col">
            <span className="font-instrument italic text-2xl font-normal text-white">
              The Rumi Atlas
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#FDE047] uppercase font-sans font-medium">
              Digital Writing Studio
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#8B5CF6] text-white font-semibold shadow-lg scale-[1.02]"
                    : "text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-6 border-t border-[#2E2352]">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs text-stone-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-[#FDE047]" />
          <span>View Public Journal</span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs text-rose-400 hover:bg-rose-500/20 transition-all uppercase tracking-wider font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
