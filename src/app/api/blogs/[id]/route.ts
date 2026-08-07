import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, avatar: true, bio: true },
        },
        comments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment views count asynchronously
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET post error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      galleryImages,
      destination,
      country,
      state,
      latitude,
      longitude,
      travelDate,
      tripDuration,
      budget,
      categoryId,
      tags,
      tips,
      bestTimeToVisit,
      readingTime,
      isPublished,
      isFeatured,
      isTrending,
      scheduledAt,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage,
    } = body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages || []),
        destination,
        country,
        state,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        travelDate: travelDate ? new Date(travelDate) : undefined,
        tripDuration,
        budget,
        categoryId,
        tags: typeof tags === "string" ? tags : JSON.stringify(tags || []),
        tips,
        bestTimeToVisit,
        readingTime: readingTime ? parseInt(readingTime) : undefined,
        isPublished,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
        isTrending: isTrending !== undefined ? Boolean(isTrending) : undefined,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT post error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE post error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
