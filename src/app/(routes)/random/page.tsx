"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RandomAnimeCard } from "./_components/RandomAnimeCard";
import { RandomInfoPanel } from "./_components/RandomInfoPanel";
import { RandomSkeleton } from "./_components/RandomSkeleton";
import { useRandomAnime } from "./_hooks/useRandomAnime";

export default function RandomPage() {
  const { anime, isLoading, error, getAnother } = useRandomAnime();

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🎲</div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">
              Couldn't roll the dice
            </h2>
            <p className="text-on-surface-variant mb-6">
              Something went wrong while finding a random anime.
            </p>
            <button
              onClick={getAnother}
              className="bg-primary text-on-primary px-6 py-3 rounded-full font-medium hover:bg-primary-fixed transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex items-center justify-center relative min-h-[calc(100vh-100px)]">
        {/* Ambient Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        {/* Content */}
        <div className="max-w-container-max w-full mx-auto z-10">
          {isLoading || !anime ? (
            <RandomSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter items-center">
              <RandomAnimeCard anime={anime} />
              <RandomInfoPanel
                anime={anime}
                onGetAnother={getAnother}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
