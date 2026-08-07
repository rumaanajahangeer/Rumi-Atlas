"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen, Compass } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  galleryImages: string;
  destination: string;
  country: string;
  readingTime: number;
  category: { name: string };
  author: { name: string; avatar: string; bio: string };
}

interface BlogListClientProps {
  posts: PostItem[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  return (
    <div className="space-y-12 text-[#F3E8FF] font-sans">
      {/* SECTION HEADER */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
          Explore The Archives
        </span>
        <h2 className="text-4xl sm:text-6xl font-instrument italic font-normal text-white">
          All Travel Journals
        </h2>
        <p className="font-serif italic text-base text-[#A78BFA]">
          "Every page holds a new adventure. Browse through our complete library of travel stories."
        </p>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto mt-4" />
      </div>

      {/* POSTS GRID (DIRECT SHOWCASE WITHOUT FILTERS OR SEARCH BAR) */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between h-full liquid-glass rounded-3xl overflow-hidden border border-[#2E2352] shadow-xl hover:border-[#8B5CF6]/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Postcard Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FDE047] text-[10px] uppercase font-bold tracking-widest">
                      {post.category?.name || "Expedition"}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#A78BFA] font-mono">
                      <span className="flex items-center space-x-1">
                        <Compass className="w-3.5 h-3.5 text-[#FDE047]" />
                        <span>{post.destination}, {post.country}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#FDE047]" />
                        <span>{post.readingTime || 5} min</span>
                      </span>
                    </div>

                    <h3 className="font-instrument italic text-2xl text-white group-hover:text-[#FDE047] transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 pb-6 pt-2 border-t border-[#2E2352]/40 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8B5CF6] group-hover:text-[#FDE047] transition-colors">
                  <span>Read Full Journal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="liquid-glass p-12 rounded-3xl text-center border border-[#2E2352] space-y-4">
          <BookOpen className="w-12 h-12 text-[#8B5CF6] mx-auto" />
          <h3 className="font-instrument italic text-3xl text-white">No Journals Available</h3>
        </div>
      )}
    </div>
  );
}
