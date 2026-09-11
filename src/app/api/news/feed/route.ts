import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "12";
    const cursor = searchParams.get("cursor") || "";
    const source = searchParams.get("source") || "";

    const params = new URLSearchParams({ limit, sort: "latest" });
    if (cursor) params.append("cursor", cursor);
    if (source) params.append("source", source);

    const response = await fetch(
      `https://aninews.vercel.app/api/news?${params.toString()}`,
      {
        next: { revalidate: 600 },
        headers: { Accept: "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error(`AniNewsAPI error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      news: data.data || [],
      hasMore: data.meta?.hasMore ?? false,
      nextCursor: data.meta?.nextCursor ?? null,
      total: data.meta?.total ?? 0,
      availableSources: data.meta?.availableSources ?? [],
    });
  } catch (error) {
    console.error("Error fetching news feed:", error);
    return NextResponse.json(
      {
        news: [],
        hasMore: false,
        nextCursor: null,
        total: 0,
        availableSources: [],
      },
      { status: 500 },
    );
  }
}
