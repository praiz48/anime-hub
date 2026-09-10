"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimeHero } from "./_components/AnimeHero";
import { AnimeInfo } from "./_components/AnimeInfo";
import { AnimeStats } from "./_components/AnimeStats";
import { AnimePoster } from "./_components/AnimePoster";
import { CharacterGrid } from "./_components/CharacterGrid";
import { RecommendationGrid } from "./_components/RecommendationGrid";
import { AnimeDetailsSkeleton } from "./_components/AnimeDetailsSkeleton";
import { useAnimeDetails } from "./_hooks/useAnimeDetails";

export default function AnimeDetailsPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const { data: anime, isLoading, error } = useAnimeDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimeDetailsSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-on-surface mb-2">
              Anime Not Found
            </h2>
            <p className="text-muted-foreground">
              The anime you're looking for doesn't exist or couldn't be loaded.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <AnimeHero
          bannerImage={anime.bannerImage}
          title={anime.title}
          genres={anime.genres}
        />

        {/* Content Container - Adjusted negative margin */}
        <section className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-[80px] md:-mt-[100px] lg:-mt-[120px] pb-24">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
            {/* Poster Sidebar - Left side */}
            <div className="w-full md:w-[280px] lg:w-[320px] shrink-0">
              <AnimePoster
                coverImage={anime.coverImage}
                title={anime.title}
                trailer={anime.trailer}
                id={anime.id}
              />

              {/* Quick Stats */}
              <AnimeStats
                episodes={anime.episodes}
                status={anime.status}
                studios={anime.studios}
                averageScore={anime.averageScore}
              />
            </div>

            {/* Main Info - Right side with proper padding */}
            <div className="flex-1 pt-4 md:pt-8 lg:pt-12">
              <AnimeInfo
                title={anime.title}
                description={anime.description}
                genres={anime.genres}
                season={anime.season}
                seasonYear={anime.seasonYear}
                status={anime.status}
              />
            </div>
          </div>

          {/* Characters */}
          {anime.characters?.edges && anime.characters.edges.length > 0 && (
            <CharacterGrid characters={anime.characters.edges} />
          )}

          {/* Recommendations */}
          {anime.recommendations?.nodes &&
            anime.recommendations.nodes.length > 0 && (
              <RecommendationGrid
                recommendations={anime.recommendations.nodes}
              />
            )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
