import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const pathname = `rumi-atlas/${Date.now()}-${safeName}`;

    const blob = await put(pathname, file, {
      access: "public",
    });

    return NextResponse.json({
      url: blob.url,
    });
  } catch (error) {
    console.error("Blob upload error:", error);

    return NextResponse.json(
      { error: "File upload failed" },
      { status: 500 }
    );
  }
}
