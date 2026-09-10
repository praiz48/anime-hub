"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AniListMedia } from "@/lib/api/anilist";

interface FavoriteCardProps {
  anime: AniListMedia;
  onRemove: () => void;
}

export function FavoriteCard({ anime, onRemove }: FavoriteCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const displayTitle = anime.title?.english || anime.title?.romaji || "Unknown";
  const score = anime.averageScore
    ? (anime.averageScore / 10).toFixed(1)
    : null;

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
  };

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative rounded-xl overflow-hidden bg-surface-container aspect-[2/3] transition-all duration-300 hover:shadow-[0_0_30px_rgba(208,188,255,0.2)] cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
        )}
        <Image
          src={anime.coverImage?.large || anime.coverImage?.medium || ""}
          alt={displayTitle}
          fill
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-110",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 p-2 bg-surface-dim/80 backdrop-blur-md rounded-full text-on-surface-variant hover:text-error hover:bg-error-container transition-all duration-300 z-10"
        aria-label="Remove from favorites"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end h-full">
        <h3 className="font-headline-md text-sm md:text-base text-on-surface font-bold leading-tight mb-1 line-clamp-2">
          {displayTitle}
        </h3>
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-on-surface-variant font-label-sm text-xs md:text-sm">
          {score && (
            <span className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-secondary text-secondary" />
              {score}
            </span>
          )}
          {anime.seasonYear && <span>{anime.seasonYear}</span>}
          {anime.episodes && <span>{anime.episodes} Ep</span>}
          {!anime.episodes && anime.status && (
            <span>
              {anime.status.replace("_", " ").charAt(0) +
                anime.status.replace("_", " ").slice(1).toLowerCase()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
