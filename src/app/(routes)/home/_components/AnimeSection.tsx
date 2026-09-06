// src/components/home/AnimeSection.tsx
"use client";

import { AnimeCard } from "./AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/skeletons/AnimeCardSkeleton";
import { SectionHeader } from "./SectionHeader";
import type { AniListMedia } from "@/lib/api/anilist";
import { type LucideIcon } from "lucide-react";

interface AnimeSectionProps {
  title: string;
  data?: AniListMedia[];
  isLoading: boolean;
  viewAllLink?: string;
  error?: Error | null;
  Icon?: LucideIcon; // Optional icon prop
}

export function AnimeSection({
  title,
  data,
  isLoading,
  viewAllLink,
  error,
  Icon,
}: AnimeSectionProps) {
  // Error state
  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
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
        <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
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
        <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
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
      <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
      <div className="flex gap-6 overflow-x-auto hide-scroll pb-8 pt-4 -mt-4 px-2 -mx-2 snap-x">
        {data.map((anime, index) => (
          <AnimeCard
            key={`${anime.id}-${index}`} // ← Combine id + index for uniqueness
            anime={anime}
            onClick={() => (window.location.href = `/anime/${anime.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
