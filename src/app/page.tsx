"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/app/(routes)/home/_components/HeroCarousel";
import { AnimeSection } from "@/app/(routes)/home/_components/AnimeSection";
import { QuoteCard } from "@/app/(routes)/home/_components/QuoteCard";
import {
  useSeasonalAnime,
  useTrendingAnime,
  useTopRatedAnime,
  useHiddenGems,
} from "@/hooks/useAnime";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  // Fetch all sections in parallel
  // src/app/page.tsx - Add better error handling
  const seasonal = useSeasonalAnime(8);
  const trending = useTrendingAnime(8);
  const topRated = useTopRatedAnime(8);
  const hiddenGems = useHiddenGems(8);

  // Check for errors and log them
  if (seasonal.error) console.error("Seasonal error:", seasonal.error);
  if (trending.error) console.error("Trending error:", trending.error);
  if (topRated.error) console.error("Top rated error:", topRated.error);
  if (hiddenGems.error) console.error("Hidden gems error:", hiddenGems.error);

  // Fetch news
  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner - News Carousel */}
        <HeroCarousel
          news={news || []}
          isLoading={newsLoading}
          error={newsError}
        />

        {/* All sections */}
        <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
          <AnimeSection
            title="🆕 Just Released"
            data={seasonal.data}
            isLoading={seasonal.isLoading}
            error={seasonal.error}
            viewAllLink="/discover?season=now"
          />

          <AnimeSection
            title="🔥 Trending Now"
            data={trending.data}
            isLoading={trending.isLoading}
            error={trending.error}
            viewAllLink="/discover?filter=trending"
          />

          {/* Quote of the Day */}
          <QuoteCard />

          <AnimeSection
            title="⭐ Top Rated"
            data={topRated.data}
            isLoading={topRated.isLoading}
            error={topRated.error}
            viewAllLink="/discover?filter=top"
          />

          <AnimeSection
            title="💎 Hidden Gems"
            data={hiddenGems.data}
            isLoading={hiddenGems.isLoading}
            error={hiddenGems.error}
            viewAllLink="/discover?filter=hidden"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
