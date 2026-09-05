// src/components/home/AnimeSection.tsx
"use client";

import { AnimeCard } from "./AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/skeletons/AnimeCardSkeleton";
import { SectionHeader } from "./SectionHeader";
import type { Anime } from "@/lib/api/jikan";

interface AnimeSectionProps {
  title: string;
  data?: Anime[];
  isLoading: boolean;
  viewAllLink?: string;
  error?: Error | null;
}

export function AnimeSection({
  title,
  data,
  isLoading,
  viewAllLink,
  error,
}: AnimeSectionProps) {
  // Error state
  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} />
        <div className="p-8 text-center bg-error-container/20 rounded-2xl border border-error/20">
          <p className="text-error">Failed to load {title.toLowerCase()}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-primary hover:text-primary-fixed transition-colors"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} />
        <div className="flex gap-6 overflow-x-auto hide-scroll pb-8 pt-4 -mt-4 px-2 -mx-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} />
        <div className="p-8 text-center bg-surface-container rounded-2xl border border-border">
          <p className="text-muted-foreground">
            No anime found in this section
          </p>
        </div>
      </section>
    );
  }

  // Data loaded
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader title={title} viewAllLink={viewAllLink} />
      <div className="flex gap-6 overflow-x-auto hide-scroll pb-8 pt-4 -mt-4 px-2 -mx-2 snap-x">
        {data.map((anime, index) => (
          <AnimeCard
            key={`${anime.mal_id}-${index}`} // ← Combine id + index for uniqueness
            anime={anime}
            onClick={() => (window.location.href = `/anime/${anime.mal_id}`)}
          />
        ))}
      </div>
    </section>
  );
}
