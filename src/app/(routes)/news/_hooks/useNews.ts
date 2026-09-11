"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export interface NewsItem {
  title: string;
  slug: string;
  source: string;
  excerpt: string;
  date: string;
  image: string | null;
  link: string;
  tags?: string[];
}

interface NewsResponse {
  news: NewsItem[];
  hasMore: boolean;
  nextCursor: string | null;
  total: number;
  availableSources: string[];
}

async function fetchNewsPage(cursor: string | null): Promise<NewsResponse> {
  const params = new URLSearchParams({ limit: "12" });
  if (cursor) params.append("cursor", cursor);

  const res = await fetch(`/api/news/feed?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export function useNews() {
  const query = useInfiniteQuery({
    queryKey: ["news-feed"],
    queryFn: ({ pageParam }) => fetchNewsPage(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const news = query.data?.pages?.flatMap((page) => page?.news ?? []) ?? [];
  const total = query.data?.pages?.[0]?.total ?? 0;
  const availableSources = query.data?.pages?.[0]?.availableSources ?? [];

  return {
    news,
    total,
    availableSources,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage ?? false,
    error: query.error,
    loadMore: query.fetchNextPage,
  };
}
