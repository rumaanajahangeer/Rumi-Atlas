"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPetals from "@/components/effects/FloatingPetals";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import {
  Clock,
  ArrowDown,
  BookOpen,
  ChevronDown,
  X,
  Send,
} from "lucide-react";

export interface DayChapter {
  dayNumber: string;
  title: string;
  story: string;
  photos: string[];
  videos: string[];
}

interface PostData {
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
  dayChapters?: DayChapter[];
}

interface JournalReadingExperienceProps {
  post: PostData;
  allPosts: PostData[];
}

export default function JournalReadingExperience({
  post,
  allPosts,
}: JournalReadingExperienceProps) {
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: "image" | "video" } | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentMsg, setCommentMsg] = useState("");
  const [commentsList, setCommentsList] = useState([
    {
      id: "1",
      author: "Clara Vance",
      time: "Recent reflection",
      text: "Reading this day-by-day entry felt like sitting quietly on a sunlit veranda with a cup of chamomile tea. Absolutely magical.",
    },
  ]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentMsg.trim()) return;
    setCommentsList([
      ...commentsList,
      {
        id: Date.now().toString(),
        author: commentName || "Reader",
        time: "Just now",
        text: commentMsg,
      },
    ]);
    setCommentName("");
    setCommentMsg("");
  };

  const defaultDayChapters: DayChapter[] = [
    {
      dayNumber: "Day 1",
      title: "Arriving at the Golden Dunes of Merzouga",
      story: "We arrived at the edge of the Sahara as dusk began to painterly tint the sky in hues of deep violet and dusty rose. The air was crisp, scented with woodfire smoke and dry earth. Mounted on dromedaries, we ventured deep into the undulating dunes.",
      photos: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80",
      ],
      videos: [
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
      ],
    },
    {
      dayNumber: "Day 2",
      title: "Stargazing over Nomadic Berber Camps",
      story: "Night fell like a heavy velvet curtain over the desert. With zero light pollution, millions of stars emerged, tracing constellations across the sky. Around the fire, Berber hosts played acoustic lutes and shared ancient legends.",
      photos: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
      ],
      videos: [
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
      ],
    },
    {
      dayNumber: "Day 3",
      title: "Valley of Roses & Cedar Trails",
      story: "Leaving the dunes behind, we crossed winding mountain passes flanked by ancient mud-brick kasbahs. Fresh wild roses grew along stone aqueducts, filling the mountain breeze with sweet natural perfume.",
      photos: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      ],
      videos: [
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
      ],
    },
  ];

  let dynamicChapters: DayChapter[] = [];
  if (post.galleryImages) {
    try {
      const parsed = typeof post.galleryImages === "string" ? JSON.parse(post.galleryImages) : post.galleryImages;
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.dayNumber) {
        dynamicChapters = parsed.map((item: any, idx: number) => ({
          dayNumber: item.dayNumber || `Day ${idx + 1}`,
          title: item.title || `Chapter ${idx + 1}`,
          story: item.story || "",
          photos: Array.isArray(item.photos) ? item.photos : [],
          videos: Array.isArray(item.videos) ? item.videos : [],
        }));
      }
    } catch (e) {
      console.error("Error parsing galleryImages as dayChapters:", e);
    }
  }

  const dayChapters: DayChapter[] = (post.dayChapters && post.dayChapters.length > 0)
    ? post.dayChapters
    : (dynamicChapters.length > 0 ? dynamicChapters : defaultDayChapters);


  const suggestedPosts = allPosts.slice(0, 3);

  return (
    <div className="relative bg-[#0B0813] text-[#F3E8FF] min-h-screen overflow-hidden select-none font-sans">
      <FloatingPetals />

      {/* FIXED NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 sm:px-10 liquid-glass border-b border-[#2E2352] shadow-2xl bg-[#0B0813]/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-instrument italic text-2xl sm:text-3xl font-normal text-white">
              The Rumi Atlas
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#FDE047] uppercase font-sans font-medium -mt-1">
              "Every Journey Becomes a Story."
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium text-white/90">
              <Link href="/" className="hover:text-[#FDE047] transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-[#FDE047] transition-colors">Journal Library</Link>
              <Link href="/about" className="hover:text-[#FDE047] transition-colors">About</Link>
            </nav>

            <div className="relative">
              <button
                onClick={() => setIsLibraryOpen(!isLibraryOpen)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#8B5CF6] text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-[#7C3AED] transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Browse Journals</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLibraryOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLibraryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-72 liquid-glass border border-[#2E2352] rounded-3xl p-4 shadow-2xl space-y-2 z-50 bg-[#130F24]"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-[#FDE047] font-bold px-3 block">
                      Journal Entries
                    </span>
                    <div className="divide-y divide-[#2E2352] max-h-64 overflow-y-auto">
                      {allPosts.map((entry) => (
                        <Link
                          key={entry.id}
                          href={`/blog/${entry.slug}`}
                          onClick={() => setIsLibraryOpen(false)}
                          className="block py-2.5 px-3 rounded-2xl hover:bg-white/10 text-xs font-serif italic text-white hover:text-[#FDE047] transition-colors"
                        >
                          {entry.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* 1. FULLSCREEN HERO */}
      <section className="relative h-screen min-h-[720px] flex flex-col justify-between overflow-hidden pt-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-90 animate-pulse"
            poster={post.featuredImage}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0B0813] backdrop-blur-[0.5px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto space-y-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-[#FDE047] text-[11px] uppercase tracking-[0.25em] font-semibold">
              Travel Journal
            </span>
            <span className="flex items-center space-x-1 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-stone-300 text-[11px] uppercase tracking-[0.25em]">
              <Clock className="w-3 h-3 text-[#FDE047]" />
              <span>{post.readingTime || 5} min read</span>
            </span>
          </div>

          <h1 className="font-instrument font-normal italic text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight text-white drop-shadow-2xl">
            {post.title}
          </h1>

          <p className="font-serif italic text-base sm:text-xl text-stone-200 font-light max-w-2xl mx-auto">
            "{post.excerpt}"
          </p>

          <div className="pt-4">
            <button
              onClick={() => scrollToSection("day-by-day")}
              className="px-8 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-[0.25em] font-semibold shadow-2xl hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <span>Start Reading Day by Day</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. JOURNEY OVERVIEW CARD */}
      <section className="py-20 max-w-4xl mx-auto px-6 relative z-10">
        <div className="liquid-glass p-8 sm:p-12 rounded-3xl border border-[#2E2352] shadow-2xl space-y-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-[#2E2352] aspect-[4/3]">
            <img src={post.featuredImage} alt="Trip overview" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6] text-[#FDE047] text-[10px] uppercase tracking-widest font-bold">
              3-Day Expedition
            </span>
            <h2 className="font-instrument italic text-3xl sm:text-4xl text-white">
              Journey Overview
            </h2>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Experience each day of the journey exactly as it unfolded—with its own story, video clips, and small postcard memories seamlessly woven together.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DAY-BY-DAY JOURNAL EXPERIENCE (1ST VIDEOS, THEN IMAGES) */}
      <section id="day-by-day" className="py-24 max-w-4xl mx-auto px-6 relative z-10 space-y-20">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Illustrated Travel Diary
          </span>
          <h2 className="text-4xl sm:text-6xl font-instrument italic font-normal text-white">
            Day-by-Day Journey
          </h2>
          <div className="w-12 h-[1px] bg-[#8B5CF6] mx-auto mt-4" />
        </div>

        {dayChapters.map((day, idx) => (
          <div
            key={idx}
            className="liquid-glass p-8 sm:p-12 rounded-3xl border border-[#2E2352] shadow-2xl space-y-8 relative overflow-hidden"
          >
            {/* Day Header */}
            <div className="border-b border-[#2E2352] pb-4 space-y-2">
              <span className="px-4 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#FDE047] text-xs font-mono font-bold uppercase tracking-widest">
                {day.dayNumber}
              </span>
              <h3 className="font-instrument italic text-3xl text-white font-normal mt-1">
                {day.title}
              </h3>
            </div>

            {/* Rich Text Story */}
            <div className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed space-y-4">
              <p>"{day.story}"</p>
            </div>

            {/* SEAMLESS MEDIA ROW: 1ST VIDEOS, THEN IMAGES */}
            {(day.videos.length > 0 || day.photos.length > 0) && (
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#2E2352]/50">
                {/* 1ST: VIDEOS */}
                {day.videos.map((vidUrl, i) => (
                  <div
                    key={`vid-${i}`}
                    onClick={() => setSelectedMedia({ url: vidUrl, type: "video" })}
                    className="cursor-pointer group rounded-xl border-2 border-white/90 p-1 bg-white/10 shadow-md overflow-hidden w-48 sm:w-56 h-36 aspect-[4/3] relative hover:scale-105 transition-transform duration-300 shrink-0"
                  >
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover rounded-lg">
                      <source src={vidUrl} type="video/mp4" />
                    </video>
                  </div>
                ))}

                {/* 2ND: IMAGES */}
                {day.photos.map((imgUrl, i) => (
                  <div
                    key={`photo-${i}`}
                    onClick={() => setSelectedMedia({ url: imgUrl, type: "image" })}
                    className="cursor-pointer group rounded-xl border-2 border-white/90 p-1 bg-white/10 shadow-md overflow-hidden w-48 sm:w-56 h-36 aspect-[4/3] relative hover:scale-105 transition-transform duration-300 shrink-0"
                  >
                    <img src={imgUrl} alt={`${day.dayNumber} postcard photo ${i+1}`} className="w-full h-full object-cover rounded-lg" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 4. MAGNET MEMORY SCRAPBOOK */}
      <section className="py-16 max-w-3xl mx-auto px-6 relative z-10">
        <div className="liquid-glass p-8 rounded-3xl border border-[#2E2352] shadow-2xl text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Signature Keepsake
          </span>
          <h2 className="font-instrument italic text-3xl text-white">🧲 Magnet Memory</h2>
          <div className="w-28 h-28 mx-auto rounded-xl overflow-hidden border-2 border-white/90 shadow-lg p-1 bg-white/10 aspect-square">
            <img src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80" alt="Magnet keepsake" className="w-full h-full object-cover rounded-lg" />
          </div>
          <h3 className="font-serif italic text-lg text-white">Handcrafted Sahara Terracotta Magnet</h3>
          <p className="text-xs text-stone-300 font-light leading-relaxed max-w-lg mx-auto">
            "Picked from a small Artisan stall in Erfoud. Hand-painted by Berber potters using natural clay pigments."
          </p>
        </div>
      </section>

      {/* 5. FINAL REFLECTION ("UNTIL THE NEXT JOURNEY...") */}
      <section className="py-20 max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="liquid-glass p-10 sm:p-12 rounded-3xl border border-[#2E2352] shadow-2xl space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Closing Reflection
          </span>
          <h2 className="font-instrument italic text-4xl sm:text-5xl text-white font-normal">
            Until the Next Journey...
          </h2>
          <p className="font-serif italic text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
            "As the sand dunes fade into the horizon behind us, I carry away the quiet beauty of early mornings and desert starscapes. Until we explore another corner of the world together."
          </p>
          <div className="font-instrument italic text-2xl text-[#FDE047] pt-2">
            ~ Rumi
          </div>
        </div>
      </section>

      {/* 6. CONTINUE READING */}
      <section className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FDE047] font-bold">
            Keep Exploring
          </span>
          <h2 className="text-3xl sm:text-5xl font-instrument italic text-white font-normal">
            Continue Reading
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suggestedPosts.map((sPost) => (
            <Link
              key={sPost.id}
              href={`/blog/${sPost.slug}`}
              className="group liquid-glass rounded-3xl overflow-hidden border border-[#2E2352] shadow-xl tilt-card flex flex-col justify-between"
            >
              <div>
                <ImagePlaceholder
                  src={sPost.featuredImage}
                  alt={sPost.title}
                  label="Journal Cover"
                  aspectRatio="aspect-[4/3]"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#FDE047] font-semibold">
                    {sPost.readingTime || 5} min read
                  </span>
                  <h3 className="font-instrument italic text-2xl text-white group-hover:text-[#FDE047] transition-colors line-clamp-1">
                    {sPost.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-light line-clamp-2">
                    {sPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. COMMENTS */}
      <section className="py-16 max-w-4xl mx-auto px-6 relative z-10 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-instrument italic text-white font-normal">
            Reader Reflections ({commentsList.length})
          </h2>
          <div className="w-12 h-[1px] bg-[#8B5CF6] mx-auto mt-2" />
        </div>

        <div className="space-y-4">
          {commentsList.map((c) => (
            <div key={c.id} className="liquid-glass p-6 rounded-3xl space-y-3 shadow-xl border border-[#2E2352]">
              <div className="flex items-center justify-between text-xs text-[#A78BFA]">
                <span className="font-serif text-base text-white">{c.author}</span>
                <span>{c.time}</span>
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">"{c.text}"</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment} className="liquid-glass p-8 rounded-3xl space-y-4 shadow-xl border border-[#2E2352]">
          <h3 className="font-instrument italic text-2xl text-white">Leave a Reflection</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            className="w-full bg-white/5 border border-[#2E2352] rounded-full px-5 py-3 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6]"
          />
          <textarea
            required
            rows={4}
            placeholder="Share your thoughts..."
            value={commentMsg}
            onChange={(e) => setCommentMsg(e.target.value)}
            className="w-full bg-[#130F24] border border-[#2E2352] rounded-2xl p-5 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] resize-none"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-widest font-semibold rounded-full flex items-center space-x-2 transition-all shadow-xl"
          >
            <span>Post Reflection</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </section>

      {/* FULLSCREEN POSTCARD LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[85vh] relative overflow-hidden rounded-3xl shadow-2xl p-2 bg-white/20 border-2 border-white">
              {selectedMedia.type === "image" ? (
                <img src={selectedMedia.url} alt="Enlarged postcard" className="w-full h-full object-contain max-h-[85vh] rounded-2xl" />
              ) : (
                <video autoPlay controls className="w-full h-full max-h-[85vh] rounded-2xl">
                  <source src={selectedMedia.url} type="video/mp4" />
                </video>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
