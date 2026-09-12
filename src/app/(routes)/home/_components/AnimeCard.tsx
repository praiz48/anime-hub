"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import {
  isFavorite,
  toggleFavorite,
} from "@/app/(routes)/favorites/_utils/favorites";
import type { AniListMedia } from "@/lib/api/anilist";

interface AnimeCardProps {
  anime: AniListMedia;
  onClick?: () => void;
  showBookmark?: boolean;
}

export function AnimeCard({
  anime,
  onClick,
  showBookmark = true,
}: AnimeCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isFav, setIsFav] = useState(false);

  // Check if anime is favorited on mount and when anime.id changes
  useEffect(() => {
    setIsFav(isFavorite(anime.id));
  }, [anime.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(anime.id);
    setIsFav(!isFav);
  };

  const imageUrl = imageError
    ? "/placeholder-anime.jpg"
    : anime.coverImage?.large || anime.coverImage?.medium || "";

  return (
    <div
      className=" p-2 min-w-[200px] md:min-w-[240px] max-w-[200px] md:max-w-[240px] flex-shrink-0 group cursor-pointer snap-start"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden glass-card transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
          )}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={anime.title?.romaji || "Anime"}
              fill
              sizes="(max-width: 768px) 200px, 240px"
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                isLoading ? "opacity-0" : "opacity-100",
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setImageError(true);
              }}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
            />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>

        {/* Bookmark button with visual feedback */}
        {showBookmark && (
          <button
            onClick={handleBookmark}
            className="absolute top-2 right-2 p-2 rounded-full bg-surface/80 backdrop-blur-md hover:bg-surface transition-all duration-300 z-10 group/bookmark"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all duration-300",
                isFav
                  ? "fill-error text-red-500 scale-110"
                  : "text-on-surface-variant hover:text-error group-hover/bookmark:scale-110",
              )}
            />
          </button>
        )}

        {/* Badges */}
        {anime.episodes && (
          <div className="absolute top-2 left-2 bg-surface/80 backdrop-blur-md px-2 py-1 rounded text-label-sm font-label-sm text-secondary border border-white/10">
            Ep {anime.episodes}
          </div>
        )}

        {anime.averageScore && anime.averageScore >= 85 && (
          <div className="absolute bottom-2 left-2 bg-primary-container px-2 py-1 rounded text-label-sm font-label-sm text-on-primary-container">
            TOP
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-on-primary shadow-[0_0_15px_rgba(208,188,255,0.6)] hover:scale-105 transition-transform">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
        </div>
      </div>

      <div className="mt-3 min-h-[3.5rem] md:min-h-[4rem]">
        <h3 className="font-title-md text-title-md text-on-surface line-clamp-3 leading-tight">
          {anime.title?.english || anime.title?.romaji || "Unknown"}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm truncate mt-0.5">
          {anime.genres?.slice(0, 2).join(", ") || "Unknown"}
        </p>
      </div>
    </div>
  );
}
