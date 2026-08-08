import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_POSTS } from "@/lib/fallback-data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(FALLBACK_POSTS);
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const categorySlug = searchParams.get("category");
    const tag = searchParams.get("tag");
    const destination = searchParams.get("destination");
    const country = searchParams.get("country");
    const status = searchParams.get("status") || "published";

    const where: any = {};

    if (status === "published") {
      where.isPublished = true;
    } else if (status === "draft") {
      where.isPublished = false;
    }

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (destination) {
      where.destination = { contains: destination };
    }

    if (country) {
      where.country = { contains: country };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        category: true,
        author: {
          select: { id: true, name: true, avatar: true, bio: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
    }

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    let {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      galleryImages = [],
      destination,
      country,
      state,
      latitude,
      longitude,
      travelDate,
      tripDuration,
      budget,
      categoryId,
      tags = [],
      tips,
      bestTimeToVisit,
      readingTime = 5,
      isPublished = true,
      isFeatured = false,
      isTrending = false,
    } = body;

    // Fallback required fields to prevent save failures
    if (!title || !title.trim()) {
      title = "Untitled Journal Entry";
    }

    if (!excerpt || !excerpt.trim()) {
      excerpt = "A quiet description of this journey...";
    }

    if (!content || !content.trim()) {
      content = "<p>Story content will be written here...</p>";
    }

    if (!featuredImage) {
      featuredImage = "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80";
    }

    if (!destination) destination = "Merzouga";
    if (!country) country = "Morocco";

    // Fallback category if none specified
    if (!categoryId) {
      const firstCat = await prisma.category.findFirst();
      if (firstCat) {
        categoryId = firstCat.id;
      } else {
        const createdCat = await prisma.category.create({
          data: { name: "Expeditions", slug: "expeditions" },
        });
        categoryId = createdCat.id;
      }
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const existing = await prisma.post.findUnique({ where: { slug: generatedSlug } });
    const finalSlug = existing ? `${generatedSlug}-${Date.now().toString().slice(-4)}` : generatedSlug;

    let authorId = (session.user as { id?: string }).id;
    if (!authorId) {
      const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      authorId = admin?.id || "";
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        featuredImage,
        galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages),
        destination,
        country,
        state,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        travelDate: travelDate ? new Date(travelDate) : new Date(),
        tripDuration,
        budget,
        categoryId,
        tags: typeof tags === "string" ? tags : JSON.stringify(tags),
        tips,
        bestTimeToVisit,
        readingTime: parseInt(readingTime) || 5,
        isPublished: Boolean(isPublished),
        isFeatured: Boolean(isFeatured),
        isTrending: Boolean(isTrending),
        publishedAt: isPublished ? new Date() : null,
        metaTitle: title,
        metaDescription: excerpt,
        ogImage: featuredImage,
        authorId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST blog error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
