import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_POSTS } from "@/lib/fallback-data";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DatabaseUnavailableCard from "@/components/admin/DatabaseUnavailableCard";
import FloatingPetals from "@/components/effects/FloatingPetals";
import { BookOpen, FileText, Sparkles, PlusCircle, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const dbReady = isDatabaseConfigured();
  let totalBlogs = 0;
  let publishedBlogs = 0;
  let draftBlogs = 0;
  let recentBlogs: any[] = [];

  if (dbReady) {
    try {
      totalBlogs = await prisma.post.count();
      publishedBlogs = await prisma.post.count({ where: { isPublished: true } });
      draftBlogs = await prisma.post.count({ where: { isPublished: false } });

      recentBlogs = await prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      });
    } catch (e) {
      console.error("Dashboard DB error:", e);
      totalBlogs = FALLBACK_POSTS.length;
      publishedBlogs = FALLBACK_POSTS.filter((p) => p.isPublished).length;
      draftBlogs = 0;
      recentBlogs = FALLBACK_POSTS;
    }
  } else {
    totalBlogs = FALLBACK_POSTS.length;
    publishedBlogs = FALLBACK_POSTS.filter((p) => p.isPublished).length;
    draftBlogs = 0;
    recentBlogs = FALLBACK_POSTS;
  }


  return (
    <div className="min-h-screen bg-[#0B0813] text-[#F3E8FF] flex relative overflow-hidden font-sans">
      <FloatingPetals />
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-10 overflow-y-auto relative z-10">
        {!dbReady && <DatabaseUnavailableCard />}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2E2352] pb-6 gap-4">
          <div>
            <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-white">
              Digital Writing Studio
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FDE047] font-semibold mt-1">
              Welcome back, {session.user?.name || "Curator"}
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

        {/* Stats Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl liquid-glass border border-[#2E2352] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-[#A78BFA] font-bold">Total Stories</span>
              <BookOpen className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div className="font-instrument text-4xl text-white font-normal">{totalBlogs}</div>
            <div className="text-[11px] text-[#A78BFA]">Preserved travel entries</div>
          </div>

          <div className="p-6 rounded-3xl liquid-glass border border-[#2E2352] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-[#A78BFA] font-bold">Published</span>
              <Sparkles className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div className="font-instrument text-4xl text-emerald-300 font-normal">{publishedBlogs}</div>
            <div className="text-[11px] text-[#A78BFA]">Live dispatches on atlas</div>
          </div>

          <div className="p-6 rounded-3xl liquid-glass border border-[#2E2352] shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-[#A78BFA] font-bold">Drafts</span>
              <FileText className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div className="font-instrument text-4xl text-amber-300 font-normal">{draftBlogs}</div>
            <div className="text-[11px] text-[#A78BFA]">In-progress journal entries</div>
          </div>
        </div>

        {/* Recent Blogs Showcase */}
        <div className="liquid-glass p-8 rounded-3xl space-y-6 border border-[#2E2352] shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-instrument italic text-2xl text-white font-normal">Recent Journal Entries</h2>
            <Link href="/admin/blogs" className="text-xs uppercase tracking-widest font-semibold text-[#FDE047] hover:underline flex items-center space-x-1">
              <span>Journal Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#2E2352]">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="py-4 flex items-center justify-between text-sm">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-base text-white">{blog.title}</span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        blog.isPublished
                          ? "liquid-glass text-emerald-300 border border-emerald-500/30"
                          : "liquid-glass text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <span className="text-xs text-[#A78BFA] mt-1 block">
                    Category: {blog.category.name}
                  </span>
                </div>

                <Link
                  href={`/admin/blogs/edit/${blog.id}`}
                  className="px-4 py-1.5 rounded-full liquid-glass border border-[#2E2352] text-xs uppercase font-semibold tracking-wider text-[#FDE047] hover:bg-white/10 transition-all shadow-sm"
                >
                  Edit Studio &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
