"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getFavorites,
  removeFavorite,
  addFavorite,
  isFavorite,
} from "../_utils/favorites";
import { fetchAnimeDetails } from "@/lib/api/anilist";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load favorites from localStorage on client
  useEffect(() => {
    setIsClient(true);
    setFavoriteIds(getFavorites());
  }, []);

  // Fetch all favorite anime details
  const {
    data: favorites,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites", favoriteIds],
    queryFn: async () => {
      if (!favoriteIds.length) return [];

      // Fetch all favorites in parallel
      const promises = favoriteIds.map((id) => fetchAnimeDetails(id));
      const results = await Promise.allSettled(promises);

      // Filter out failed requests
      return results
        .filter(
          (result): result is PromiseFulfilledResult<any> =>
            result.status === "fulfilled",
        )
        .map((result) => result.value);
    },
    enabled: isClient && favoriteIds.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const addFavoriteAnime = (id: number) => {
    addFavorite(id);
    setFavoriteIds(getFavorites());
    refetch();
  };

  const removeFavoriteAnime = (id: number) => {
    removeFavorite(id);
    setFavoriteIds(getFavorites());
    refetch();
  };

  const checkIsFavorite = (id: number) => {
    return isFavorite(id);
  };

  return {
    favoriteIds,
    favorites: favorites || [],
    isLoading,
    error,
    addFavoriteAnime,
    removeFavoriteAnime,
    checkIsFavorite,
    refetch,
    isClient,
  };
}
