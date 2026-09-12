import { useQuery } from "@tanstack/react-query";
import {
  fetchTrendingAnime,
  fetchSeasonalAnime,
  fetchNextSeasonalAnime,
  fetchTopRatedAnime,
  fetchHiddenGems,
  fetchAnimeDetails,
  searchAnime,
  browseAnime,
  fetchRandomAnime,
  getCurrentSeason,
  getNextSeason,
} from "@/lib/api/anilist";

// Query keys
export const animeKeys = {
  all: ["anime"] as const,
  trending: () => [...animeKeys.all, "trending"] as const,
  seasonal: (season: string, year: number) =>
    [...animeKeys.all, "seasonal", season, year] as const,
  topRated: () => [...animeKeys.all, "topRated"] as const,
  hiddenGems: () => [...animeKeys.all, "hiddenGems"] as const,
  details: (id: number) => [...animeKeys.all, "details", id] as const,
  search: (query: string) => [...animeKeys.all, "search", query] as const,
  random: () => [...animeKeys.all, "random"] as const,
};

// Hooks
export function useTrendingAnime(perPage: number = 8) {
  return useQuery({
    queryKey: animeKeys.trending(),
    queryFn: () => fetchTrendingAnime(perPage),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSeasonalAnime(perPage: number = 8) {
  const { season, year } = getCurrentSeason();
  return useQuery({
    queryKey: animeKeys.seasonal(season, year),
    queryFn: () => fetchSeasonalAnime(perPage),
    staleTime: 1000 * 60 * 5,
  });
}
export function useNextSeasonalAnime(perPage: number = 8) {
  const { season, year } = getNextSeason();
  return useQuery({
    queryKey: animeKeys.seasonal(season, year),
    queryFn: () => fetchNextSeasonalAnime(perPage),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTopRatedAnime(perPage: number = 8) {
  return useQuery({
    queryKey: animeKeys.topRated(),
    queryFn: () => fetchTopRatedAnime(perPage),
    staleTime: 1000 * 60 * 5,
  });
}

export function useHiddenGems(perPage: number = 8) {
  return useQuery({
    queryKey: animeKeys.hiddenGems(),
    queryFn: () => fetchHiddenGems(perPage),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useAnimeDetails(id: number) {
  return useQuery({
    queryKey: animeKeys.details(id),
    queryFn: () => fetchAnimeDetails(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

// Search hook - Now only for search, no browse logic
export function useSearchAnime(
  query: string,
  page: number = 1,
  perPage: number = 20,
) {
  return useQuery({
    queryKey: [...animeKeys.search(query), page],
    queryFn: () => searchAnime(query, page, perPage),
    staleTime: 1000 * 60 * 5,
    enabled: query.length > 0, // Only run when there's a query
    retry: 1,
  });
}

// New browse hook for discover page
export function useBrowseAnime(
  page: number = 1,
  perPage: number = 20,
  filters?: {
    genre?: string;
    status?: string;
    season?: string;
    seasonYear?: number;
    sort?: string;
  },
) {
  return useQuery({
    queryKey: ["browse", filters, page],
    queryFn: () => browseAnime(page, perPage, filters),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useRandomAnime() {
  return useQuery({
    queryKey: animeKeys.random(),
    queryFn: fetchRandomAnime,
    staleTime: 1000 * 60 * 5,
  });
}
