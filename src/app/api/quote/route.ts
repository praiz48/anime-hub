// src/app/api/quote/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Try multiple quote sources
    const sources = [
      "https://anime-api-1-3c3c875dd5a7.herokuapp.com/api/quote",
      "https://animechan.xyz/api/random",
      "https://anime-quotes-api.herokuapp.com/quotes/random",
    ];

    let lastError = null;

    for (const source of sources) {
      try {
        console.log(`Trying quote source: ${source}`);
        const response = await fetch(source, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (response.ok) {
          const data = await response.json();

          // Handle different response formats
          let quote = null;
          if (data.quote && data.anime && data.character) {
            quote = data; // AnimeKun/AnimeChan format
          } else if (data.quotes && data.quotes.length > 0) {
            // Some APIs return an array
            const q = data.quotes[0];
            quote = {
              anime: q.anime || q.anime_name || "Unknown",
              character: q.character || q.character_name || "Unknown",
              quote: q.quote || q.text || q.quote_text || "No quote available",
            };
          } else if (data.anime && data.text) {
            quote = {
              anime: data.anime,
              character: data.character || "Unknown",
              quote: data.text,
            };
          }

          if (quote) {
            console.log("Successfully fetched quote from:", source);
            return NextResponse.json(quote);
          }
        }
      } catch (e) {
        console.warn(`Source ${source} failed:`, e);
        lastError = e;
      }
    }

    // If all sources fail, use a default quote
    console.warn("All quote sources failed, using fallback");
    return NextResponse.json({
      anime: "Anime Hub",
      character: "System",
      quote: "Believe in yourself and keep watching anime!",
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({
      anime: "Anime Hub",
      character: "System",
      quote: "Believe in yourself and keep watching anime!",
    });
  }
}
