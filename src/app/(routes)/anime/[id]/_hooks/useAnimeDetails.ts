"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails } from "@/lib/api/anilist";

export function useAnimeDetails(id: number) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => fetchAnimeDetails(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    retry: 1,
  });
}
