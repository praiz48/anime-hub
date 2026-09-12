import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://nekos.best/api/v2/neko", {
      headers: {
        Accept: "application/json",
        "User-Agent": "AnimeHub/1.0 (https://your-site.com)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Nekos.best error: ${response.status}`);
    }

    const data = await response.json();
    const image = data.results?.[0];

    if (!image) {
      return NextResponse.json({ error: "No image found" }, { status: 404 });
    }

    return NextResponse.json({
      url: image.url,
      width: image.width || 2000,
      height: image.height || 3000,
      artist: image.artist_name,
      source: image.source_url,
    });
  } catch (error) {
    console.error("Error fetching waifu:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}
