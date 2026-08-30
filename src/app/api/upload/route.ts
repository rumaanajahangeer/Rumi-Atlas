import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

// Vercel Blob validates the MIME type in the client-upload token. Wildcards
// cover common camera, image, and video formats without proxying file bytes
// through a Vercel Function.
const ALLOWED_CONTENT_TYPES = ["image/*", "video/*"];

// Vercel Blob supports client multipart uploads up to 5 TB. This limit is on
// the signed token only; file data still travels browser -> Blob directly.
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("Blob upload unavailable: BLOB_READ_WRITE_TOKEN is not configured.");
      return NextResponse.json(
        { error: "Media storage is not configured." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as HandleUploadBody;

    // Blob calls this route both to issue an upload token and to acknowledge a
    // completed upload. Only the token-issuance request originates from a user.
    if (body.type === "blob.generate-client-token") {
      const session = await getServerSession(authOptions);
      if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("rumi-atlas/")) {
          throw new Error("Invalid upload path.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Blob upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Media upload failed. Please try again.",
      },
      { status: 400 }
    );
  }
}
