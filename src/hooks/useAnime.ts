import { useQuery } from "@tanstack/react-query";
import {
  fetchSeasonalAnime,
  fetchTrendingAnime,
  fetchTopRatedAnime,
  fetchHiddenGems,
  fetchRandomAnime,
  fetchAnimeDetails,
  fetchAnimeCharacters,
  fetchAnimeRecommendations,
  searchAnime,
  fetchAnimeByGenre,
  fetchAnimeGenres,
  type Anime,
} from "@/lib/api/jikan";

// Query keys
export const animeKeys = {
  all: ["anime"] as const,
  seasonal: () => [...animeKeys.all, "seasonal"] as const,
  trending: () => [...animeKeys.all, "trending"] as const,
  topRated: () => [...animeKeys.all, "topRated"] as const,
  hiddenGems: () => [...animeKeys.all, "hiddenGems"] as const,
  random: () => [...animeKeys.all, "random"] as const,
  details: (id: string) => [...animeKeys.all, "details", id] as const,
  characters: (id: string) => [...animeKeys.all, "characters", id] as const,
  recommendations: (id: string) =>
    [...animeKeys.all, "recommendations", id] as const,
  search: (query: string) => [...animeKeys.all, "search", query] as const,
  genre: (genreId: number) => [...animeKeys.all, "genre", genreId] as const,
  genres: () => [...animeKeys.all, "genres"] as const,
};

// Hooks
export function useSeasonalAnime(limit: number = 8) {
  return useQuery({
    queryKey: animeKeys.seasonal(),
    queryFn: () => fetchSeasonalAnime(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useTrendingAnime(limit: number = 8) {
  return useQuery({
    queryKey: animeKeys.trending(),
    queryFn: () => fetchTrendingAnime(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTopRatedAnime(limit: number = 8) {
  return useQuery({
    queryKey: animeKeys.topRated(),
    queryFn: () => fetchTopRatedAnime(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useHiddenGems(limit: number = 8) {
  return useQuery({
    queryKey: animeKeys.hiddenGems(),
    queryFn: () => fetchHiddenGems(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRandomAnime() {
  return useQuery({
    queryKey: animeKeys.random(),
    queryFn: fetchRandomAnime,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAnimeDetails(id: string) {
  return useQuery({
    queryKey: animeKeys.details(id),
    queryFn: () => fetchAnimeDetails(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useAnimeCharacters(id: string) {
  return useQuery({
    queryKey: animeKeys.characters(id),
    queryFn: () => fetchAnimeCharacters(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useAnimeRecommendations(id: string) {
  return useQuery({
    queryKey: animeKeys.recommendations(id),
    queryFn: () => fetchAnimeRecommendations(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useSearchAnime(
  query: string,
  page: number = 1,
  limit: number = 20,
) {
  return useQuery({
    queryKey: animeKeys.search(query),
    queryFn: () => searchAnime(query, page, limit),
    staleTime: 1000 * 60 * 5,
    enabled: query.length > 0,
  });
}

export function useAnimeByGenre(
  genreId: number,
  page: number = 1,
  limit: number = 20,
) {
  return useQuery({
    queryKey: animeKeys.genre(genreId),
    queryFn: () => fetchAnimeByGenre(genreId, page, limit),
    staleTime: 1000 * 60 * 5,
    enabled: !!genreId,
  });
}

export function useAnimeGenres() {
  return useQuery({
    queryKey: animeKeys.genres(),
    queryFn: fetchAnimeGenres,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
