import { NextResponse } from "next/server";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 1 * 1024 * 1024; // 1MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Please upload a JPEG or PNG image" },
        { status: 400 },
      );
    }

    // Validate file size (trace.moe limit is 1MB)
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `Image too large. Max size is 1MB.` },
        { status: 400 },
      );
    }

    // Forward to trace.moe
    const traceFormData = new FormData();
    traceFormData.append("image", file);

    const response = await fetch(
      "https://api.trace.moe/search?anilistInfo=1&cutBorders=1",
      {
        method: "POST",
        body: traceFormData,
      },
    );

    if (!response.ok) {
      if (response.status === 413) {
        return NextResponse.json(
          { error: "Image too large for trace.moe (max 1MB)" },
          { status: 413 },
        );
      }
      throw new Error(`Trace.moe error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in trace route:", error);
    return NextResponse.json(
      { error: "Failed to search screenshot" },
      { status: 500 },
    );
  }
}
