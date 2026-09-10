"use client";

import { FavoriteCard } from "./FavoriteCard";
import { FavoriteCardSkeleton } from "./FavoritesCardSkeleton";

interface FavoritesGridProps {
  favorites: any[];
  isLoading: boolean;
  onRemove: (id: number) => void;
}

export function FavoritesGrid({
  favorites,
  isLoading,
  onRemove,
}: FavoritesGridProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <FavoriteCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {favorites.map((anime) => (
        <FavoriteCard
          key={anime.id}
          anime={anime}
          onRemove={() => onRemove(anime.id)}
        />
      ))}
    </div>
  );
}
