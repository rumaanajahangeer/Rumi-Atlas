import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json({ message: "Welcome to The Rumi Atlas newsletter family!" }, { status: 201 });
    }

    const existing = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ message: "You are already subscribed to The Rumi Atlas!" });
    }

    await prisma.newsletter.create({
      data: { email: email.toLowerCase().trim() },
    });

    return NextResponse.json({ message: "Welcome to The Rumi Atlas newsletter family!" }, { status: 201 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json([]);
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscribers = await prisma.newsletter.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("GET subscribers error:", error);
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}
