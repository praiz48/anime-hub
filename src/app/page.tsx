"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/app/(routes)/home/_components/HeroCarousel";
import { AnimeSection } from "@/app/(routes)/home/_components/AnimeSection";
import { QuoteCard } from "@/app/(routes)/home/_components/QuoteCard";
import {
  useTrendingAnime,
  useSeasonalAnime,
  useTopRatedAnime,
  useHiddenGems,
  useNextSeasonalAnime,
} from "@/hooks/useAnime";
import { useQuery } from "@tanstack/react-query";
import {
  StarIcon,
  TrendingUp,
  GemIcon,
  FlameIcon,
  Calendar,
} from "lucide-react";

export default function HomePage() {
  // Fetch all sections in parallel
  const seasonal = useSeasonalAnime(8);
  const nextSeasonal = useNextSeasonalAnime(8);
  const trending = useTrendingAnime(8);
  const topRated = useTopRatedAnime(8);
  const hiddenGems = useHiddenGems(8);

  // Fetch news (still using ANN RSS)
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
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroCarousel
          news={news || []}
          isLoading={newsLoading}
          error={newsError}
        />

        <div className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
          <AnimeSection
            title="Just Released"
            Icon={Calendar}
            data={seasonal.data}
            isLoading={seasonal.isLoading}
            error={seasonal.error}
            viewAllLink="/discover?season=now"
          />
          <AnimeSection
            title=" Upcoming"
            Icon={TrendingUp}
            data={nextSeasonal.data}
            isLoading={nextSeasonal.isLoading}
            error={nextSeasonal.error}
            viewAllLink="/discover?season=next"
          />

          <AnimeSection
            title="Trending Now"
            Icon={FlameIcon}
            data={trending.data}
            isLoading={trending.isLoading}
            error={trending.error}
            viewAllLink="/discover?filter=trending"
          />

          <QuoteCard />

          <AnimeSection
            title="Top Rated"
            Icon={StarIcon}
            data={topRated.data}
            isLoading={topRated.isLoading}
            error={topRated.error}
            viewAllLink="/discover?filter=top"
          />

          <AnimeSection
            title="Hidden Gems"
            Icon={GemIcon}
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
