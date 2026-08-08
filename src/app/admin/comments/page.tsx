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
    <div className="min-h-screen bg-[#0B0813] text-[#F3E8FF] flex relative overflow-hidden font-sans">
      <FloatingPetals />
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto relative z-10">
        <div className="border-b border-[#2E2352] pb-6">
          <h1 className="font-instrument italic text-4xl sm:text-5xl font-normal text-white">
            Comment Moderation ({comments.length})
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#FDE047] font-semibold mt-1">
            Review & Approve Reader Reflections
          </p>
        </div>

        {/* Comments Grid */}
        <div className="space-y-4">
          {comments.map((comment: any) => (
            <div
              key={comment.id}
              className="liquid-glass p-6 rounded-3xl space-y-4 flex flex-col justify-between border border-[#2E2352]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-base text-white">{comment.authorName}</h3>
                  <span className="text-xs text-[#A78BFA]">{comment.authorEmail}</span>
                  <span className="text-xs text-stone-400 block mt-1">
                    On story: <strong className="text-[#FDE047]">{comment.post?.title}</strong>
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    comment.status === "APPROVED"
                      ? "liquid-glass text-emerald-300 border border-emerald-500/30"
                      : "liquid-glass text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {comment.status}
                </span>
              </div>

              <p className="text-xs text-stone-200 font-light leading-relaxed">
                "{comment.content}"
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
