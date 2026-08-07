import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";
import FloatingPetals from "@/components/effects/FloatingPetals";

export const revalidate = 0;

export default async function AdminCommentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const comments = await prisma.comment.findMany({
    include: { post: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#2D2342] flex relative overflow-hidden">
      <FloatingPetals />
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto relative z-10">
        <div className="border-b border-[#C4B5FD]/40 pb-6">
          <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-[#2D2342]">
            Comment Moderation ({comments.length})
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B5CF6] font-semibold mt-1">
            Review & Approve Reader Reflections
          </p>
        </div>

        {/* Comments Grid */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="liquid-glass p-6 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-base text-[#2D2342]">{comment.authorName}</h3>
                  <span className="text-xs text-[#7C6A96]">{comment.authorEmail}</span>
                  <span className="text-xs text-stone-500 block mt-1">
                    On story: <strong className="text-[#8B5CF6]">{comment.post.title}</strong>
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    comment.status === "APPROVED"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                      : "bg-amber-100 text-amber-700 border border-amber-300"
                  }`}
                >
                  {comment.status}
                </span>
              </div>

              <p className="text-xs text-[#2D2342]/90 font-light leading-relaxed">
                "{comment.content}"
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
