import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.animenewsnetwork.com/news/rss.xml",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    const xmlText = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
    });

    const result = parser.parse(xmlText);
    const items = result.rss.channel.item || [];

    // Transform RSS items into clean news objects
    const newsItems = await Promise.all(
      items.slice(0, 10).map(async (item: any) => {
        // Try to fetch the article page to get the image
        let imageUrl = null;
        try {
          const articleRes = await fetch(item.link, {
            next: { revalidate: 3600 },
          });
          const html = await articleRes.text();

          // Look for og:image meta tag
          const ogImageMatch = html.match(
            /<meta property="og:image" content="([^"]+)"/,
          );
          if (ogImageMatch) {
            imageUrl = ogImageMatch[1];
          }

          // Also try to find Twitter card image
          if (!imageUrl) {
            const twitterImageMatch = html.match(
              /<meta name="twitter:image" content="([^"]+)"/,
            );
            if (twitterImageMatch) {
              imageUrl = twitterImageMatch[1];
            }
          }
        } catch (e) {
          // If we can't fetch the image, use a placeholder
          console.error("Failed to fetch image for news item:", item.link);
        }

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description:
            item.description?.replace(/<[^>]*>/g, "").slice(0, 150) + "..." ||
            "",
          author: item["dc:creator"] || "ANN Staff",
          guid: item.guid,
          image: imageUrl || null,
        };
      }),
    );

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
