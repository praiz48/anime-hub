"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomAnime } from "@/lib/api/anilist";

export function useRandomAnime() {
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    data: anime,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["randomAnime", refreshKey],
    queryFn: fetchRandomAnime,
    staleTime: 0, // Always fetch fresh
    gcTime: 0, // Don't cache
    retry: 2,
  });

  const getAnother = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return {
    anime,
    isLoading,
    error,
    getAnother,
  };
}
