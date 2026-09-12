"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, NewspaperIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsItem } from "../_hooks/useNews";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60),
      );

      if (diffHours < 1) return "Just now";
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffHours < 48) return "Yesterday";

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    } catch {
      return "Recent";
    }
  };

  const hasImage = news.image && !imageError;

  return (
    <Link
      href={news.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-surface-container border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Image */}
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container-high">
        {hasImage ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
            )}
            {/* Use regular img for external news images - no config needed */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={news.image!}
              alt={news.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                isLoading ? "opacity-0" : "opacity-100",
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setImageError(true);
              }}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-container via-surface-container-high to-primary-container/20 flex items-center justify-center">
            <NewspaperIcon className="text-4xl opacity-30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-6">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-medium uppercase tracking-wider">
            {news.source}
          </span>
          <span>•</span>
          <span>{formatDate(news.date)}</span>
        </div>

        {/* Title */}
        <h3 className="font-headline-md text-base md:text-lg text-on-surface font-semibold mb-2 line-clamp-3 group-hover:text-primary transition-colors">
          {news.title}
        </h3>

        {/* Excerpt */}
        {news.excerpt && (
          <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 flex-1">
            {news.excerpt}
          </p>
        )}

        {/* Read more */}
        <div className="flex items-center gap-1 text-sm text-secondary group-hover:text-primary transition-colors mt-auto">
          <span>Read more</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
