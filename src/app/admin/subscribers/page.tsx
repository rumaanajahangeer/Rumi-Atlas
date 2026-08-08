import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DatabaseUnavailableCard from "@/components/admin/DatabaseUnavailableCard";
import FloatingPetals from "@/components/effects/FloatingPetals";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { Search, Plus, Image as ImageIcon, Film } from "lucide-react";

export const revalidate = 0;

export default async function AdminMediaLibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const dbReady = isDatabaseConfigured();
  let posts: any[] = [];

  if (dbReady) {
    try {
      posts = await prisma.post.findMany({
        select: { featuredImage: true, title: true },
      });
    } catch (e) {
      console.error("Admin media library DB error:", e);
    }
  }

  const mediaImages = posts
    .filter((p) => p.featuredImage)
    .map((p) => ({ url: p.featuredImage, title: p.title }));

  return (
    <div className="min-h-screen bg-[#0B0813] text-[#F3E8FF] flex relative overflow-hidden font-sans">
      <FloatingPetals />
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto relative z-10">
        {!dbReady && <DatabaseUnavailableCard />}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2E2352] pb-6 gap-4">
          <div>
            <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-white">
              🖼 Media Library
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FDE047] font-semibold mt-1">
              Pinterest-inspired photography & video gallery
            </p>
          </div>

          <button className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-widest font-semibold rounded-full flex items-center space-x-2 shadow-xl hover:scale-105 transition-all self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            <span>Upload New Media</span>
          </button>
        </div>

        {/* Search Bar & Folders */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search media files..."
              className="w-full bg-white/5 border border-[#2E2352] rounded-full px-5 py-2.5 pl-11 text-xs text-white placeholder-stone-500 outline-none focus:border-[#8B5CF6] shadow-sm"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-4 py-1.5 rounded-full bg-[#8B5CF6] text-[11px] font-semibold text-white uppercase tracking-wider shadow-md flex items-center space-x-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>All Photos ({mediaImages.length})</span>
            </span>
            <span className="px-4 py-1.5 rounded-full liquid-glass border border-[#2E2352] text-[11px] font-semibold text-stone-300 hover:text-white uppercase tracking-wider flex items-center space-x-1 cursor-pointer">
              <Film className="w-3.5 h-3.5" />
              <span>Hero Videos</span>
            </span>
          </div>
        </div>

        {/* Pinterest Masonry Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mediaImages.map((item, i) => (
            <div key={i} className="group rounded-3xl overflow-hidden liquid-glass border border-[#2E2352] shadow-xl tilt-card">
              <ImagePlaceholder
                src={item.url}
                alt={item.title}
                label="Media Asset"
                aspectRatio="aspect-[4/5]"
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="p-4 bg-[#130F24] border-t border-[#2E2352] text-xs text-white font-serif italic line-clamp-1">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
