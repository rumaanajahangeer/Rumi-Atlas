import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
    }

    const { id } = await params;
    const body = await request.json();

    const { status, isPinned, like } = body;

    if (like) {
      const comment = await prisma.comment.update({
        where: { id },
        data: { likes: { increment: 1 } },
      });
      return NextResponse.json(comment);
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (isPinned !== undefined) updateData.isPinned = isPinned;

    const comment = await prisma.comment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("PUT comment error:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.comment.delete({ where: { id } });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("DELETE comment error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
