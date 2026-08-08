import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
    }

    const body = await request.json();
    const { postId, content, authorName, authorEmail, authorAvatar, parentId } = body;

    if (!postId || !content || !authorName || !authorEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        content,
        authorName,
        authorEmail,
        authorAvatar: authorAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(authorName)}`,
        parentId: parentId || null,
        status: "APPROVED",
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("POST comment error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json([]);
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      include: {
        post: { select: { title: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
