import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DatabaseUnavailableCard from "@/components/admin/DatabaseUnavailableCard";
import BlogActions from "@/components/admin/BlogActions";
import FloatingPetals from "@/components/effects/FloatingPetals";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { PlusCircle, Search } from "lucide-react";

export const revalidate = 0;

export default async function AdminBlogsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const dbReady = isDatabaseConfigured();
  let posts: any[] = [];

  if (dbReady) {
    try {
      posts = await prisma.post.findMany({
        include: { category: true, author: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.error("Admin blogs DB error:", e);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0813] text-[#F3E8FF] flex relative overflow-hidden font-sans">
      <FloatingPetals />
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto relative z-10">
        {!dbReady && <DatabaseUnavailableCard />}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2E2352] pb-6 gap-4">
          <div>
            <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-white">
              📖 Journal Library ({posts.length})
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FDE047] font-semibold mt-1">
              Your preserved memories & travel dispatches
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs uppercase tracking-widest font-semibold rounded-full flex items-center space-x-2 shadow-xl hover:scale-105 transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Journal</span>
          </Link>
        </div>

        {/* Search & Filter Chips Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search journals by title..."
              className="w-full bg-white/5 border border-[#2E2352] rounded-full px-5 py-2.5 pl-11 text-xs text-[#F3E8FF] placeholder-stone-500 outline-none focus:border-[#8B5CF6] shadow-sm"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            <span className="px-4 py-1.5 rounded-full bg-[#8B5CF6] text-[11px] font-semibold text-white uppercase tracking-wider shadow-md">
              All Entries
            </span>
            <span className="px-4 py-1.5 rounded-full liquid-glass border border-[#2E2352] text-[11px] font-semibold text-stone-300 hover:text-white uppercase tracking-wider cursor-pointer">
              🌸 Published
            </span>
            <span className="px-4 py-1.5 rounded-full liquid-glass border border-[#2E2352] text-[11px] font-semibold text-stone-300 hover:text-white uppercase tracking-wider cursor-pointer">
              📝 Drafts
            </span>
          </div>
        </div>

        {/* Magazine Cover Cards Grid (Dark Mode) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <div
              key={post.id}
              className="liquid-glass rounded-3xl overflow-hidden border border-[#2E2352] shadow-xl flex flex-col justify-between tilt-card"
            >
              <div>
                {/* Cover Preview */}
                <div className="relative overflow-hidden">
                  <ImagePlaceholder
                    src={post.featuredImage}
                    alt={post.title}
                    label="Journal Cover"
                    aspectRatio="aspect-[16/9]"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-md ${
                      post.isPublished
                        ? "liquid-glass text-emerald-300 border border-emerald-500/30"
                        : "liquid-glass text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#FDE047] font-semibold">
                    {post.category?.name || "Expedition"} • {post.readingTime || 5} min read
                  </span>
                  <h3 className="font-instrument italic text-2xl font-normal text-white line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#A78BFA] font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-[#2E2352] flex items-center justify-between">
                <span className="text-[11px] text-[#A78BFA] font-mono">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                <BlogActions postId={post.id} isPublished={post.isPublished} slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
