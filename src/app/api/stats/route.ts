import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_POSTS, FALLBACK_COMMENTS } from "@/lib/fallback-data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({
        totalBlogs: FALLBACK_POSTS.length,
        publishedBlogs: FALLBACK_POSTS.filter((p) => p.isPublished).length,
        draftBlogs: 0,
        totalComments: FALLBACK_COMMENTS.length,
        pendingComments: 0,
        totalSubscribers: 12,
        totalViews: 3600,
        recentBlogs: FALLBACK_POSTS,
      });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const totalBlogs = await prisma.post.count();
    const publishedBlogs = await prisma.post.count({ where: { isPublished: true } });
    const draftBlogs = await prisma.post.count({ where: { isPublished: false } });
    const totalComments = await prisma.comment.count();
    const pendingComments = await prisma.comment.count({ where: { status: "PENDING" } });
    const totalSubscribers = await prisma.newsletter.count({ where: { isSubscribed: true } });

    const totalViewsAggregate = await prisma.post.aggregate({
      _sum: { views: true },
    });
    const totalViews = totalViewsAggregate._sum.views || 0;

    const recentBlogs = await prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return NextResponse.json({
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalComments,
      pendingComments,
      totalSubscribers,
      totalViews,
      recentBlogs,
    });
  } catch (error) {
    console.error("GET stats error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
