import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        totalComments: 0,
        pendingComments: 0,
        totalSubscribers: 0,
        totalViews: 0,
        recentBlogs: [],
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
