import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { FALLBACK_CATEGORIES } from "@/lib/fallback-data";

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(FALLBACK_CATEGORIES);
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: { where: { isPublished: true } } },
        },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
