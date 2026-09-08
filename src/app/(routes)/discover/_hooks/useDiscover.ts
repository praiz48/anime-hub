"use client";

import { useState, useEffect, useCallback } from "react";
import { useBrowseAnime } from "@/hooks/useAnime";
import { getCurrentSeason } from "@/lib/api/anilist";

export interface DiscoverFilters {
  genre?: string;
  season?: string;
  seasonYear?: number;
  status?: string;
  sort?: string;
}

export function useDiscover() {
  // Default to current season with good defaults
  const currentSeason = getCurrentSeason();

  const [filters, setFilters] = useState<DiscoverFilters>({
    season: currentSeason.season,
    seasonYear: currentSeason.year,
    status: "RELEASING",
    sort: "POPULARITY_DESC",
  });

  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { data, isLoading, error, isFetching } = useBrowseAnime(
    page,
    20,
    filters,
  );

  // Check if any meaningful filters are active (excluding defaults)
  useEffect(() => {
    const defaultFilters: Partial<DiscoverFilters> = {
      season: currentSeason.season,
      seasonYear: currentSeason.year,
      status: "RELEASING",
      sort: "POPULARITY_DESC",
    };

    // Check if any filter value differs from its default
    const hasActiveFilters = Object.keys(filters).some((key) => {
      const filterKey = key as keyof DiscoverFilters;
      const value = filters[filterKey];
      const defaultValue = defaultFilters[filterKey];

      // Genre is special - only "active" if it has a value
      if (filterKey === "genre") {
        return value !== undefined && value !== "" && value !== null;
      }

      return (
        value !== undefined &&
        value !== "" &&
        value !== null &&
        value !== defaultValue
      );
    });

    setIsFilterActive(hasActiveFilters);
  }, [filters, currentSeason]);

  // Reset when filters change
  useEffect(() => {
    setPage(1);
    setAllResults([]);
    setHasMore(true);
  }, [filters]);

  // Append new results when data changes
  useEffect(() => {
    if (data?.media) {
      if (page === 1) {
        setAllResults(data.media);
      } else {
        setAllResults((prev) => [...prev, ...data.media]);
      }
      setHasMore(data.pageInfo?.hasNextPage || false);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  const updateFilter = useCallback((key: keyof DiscoverFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    const currentSeason = getCurrentSeason();
    setFilters({
      season: currentSeason.season,
      seasonYear: currentSeason.year,
      status: "RELEASING",
      sort: "POPULARITY_DESC",
    });
  }, []);

  // Reset to default (current season)
  const resetToSeasonal = useCallback(() => {
    const currentSeason = getCurrentSeason();
    setFilters({
      season: currentSeason.season,
      seasonYear: currentSeason.year,
      status: "RELEASING",
      sort: "POPULARITY_DESC",
    });
  }, []);

  return {
    filters,
    results: allResults,
    isLoading: isLoading && page === 1,
    isFetchingMore: isFetching && page > 1,
    hasMore,
    totalResults: data?.pageInfo?.total || 0,
    error,
    isFilterActive,
    updateFilter,
    clearFilters,
    loadMore,
    resetToSeasonal,
  };
}
