"use client";

import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "./NewsCardSkeleton";
import type { NewsItem } from "../_hooks/useNews";

interface NewsGridProps {
  news: NewsItem[];
  isLoading: boolean;
}

export function NewsGrid({ news, isLoading }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {news.map((item, index) => (
        <NewsCard key={`${item.link}-${index}`} news={item} />
      ))}
    </div>
  );
}
