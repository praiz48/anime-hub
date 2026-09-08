"use client";

import { AnimeCard } from "@/app/(routes)/home/_components/AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/skeletons/AnimeCardSkeleton";
import type { AniListMedia } from "@/lib/api/anilist";
import { Search } from "lucide-react";

interface ResultsGridProps {
  results: AniListMedia[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  totalResults: number;
  onLoadMore: () => void;
}

export function ResultsGrid({
  results,
  isLoading,
  isFetchingMore,
  hasMore,
  totalResults,
  onLoadMore,
}: ResultsGridProps) {
  // Show skeletons on initial load
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl items-center mb-4">
          <Search className="mx-auto w-12 h-12 text-muted-foreground" />
        </span>
        <h3 className="text-xl font-semibold text-on-surface mb-2">
          No results found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results count */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">
          {totalResults} results
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {results.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onClick={() => (window.location.href = `/anime/${anime.id}`)}
          />
        ))}
      </div>

      {/* Load more trigger */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          {isFetchingMore ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="material-symbols-outlined animate-spin">
                autorenew
              </span>
              <span>Loading more...</span>
            </div>
          ) : (
            <button
              onClick={onLoadMore}
              className="text-secondary hover:text-secondary-fixed transition-colors font-label-sm text-label-sm"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
