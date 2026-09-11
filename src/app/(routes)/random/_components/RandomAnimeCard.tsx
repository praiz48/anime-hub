"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AniListMedia } from "@/lib/api/anilist";

interface RandomAnimeCardProps {
  anime: AniListMedia;
}

export function RandomAnimeCard({ anime }: RandomAnimeCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const displayTitle = anime.title?.english || anime.title?.romaji || "Unknown";
  const score = anime.averageScore
    ? (anime.averageScore / 10).toFixed(1)
    : null;

  return (
    <div className="lg:col-span-7 xl:col-span-8 relative group">
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_rgba(160,120,255,0.3)]">
        {isLoading && (
          <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
        )}

        {/* Use banner image if available, otherwise cover */}
        <Image
          src={anime.bannerImage || anime.coverImage?.large || ""}
          alt={displayTitle}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={() => setIsLoading(false)}
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />

        {/* Score badge - Top right */}
        {score && (
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-surface-dim/80 backdrop-blur-md text-secondary border border-secondary/30 px-3 py-1 rounded-full font-label-sm flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-secondary" />
              {score}
            </span>
          </div>
        )}

        {/* Title & Genres - Bottom */}
        {/* Title & Genres - Bottom */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-background via-background/80 to-transparent pt-20">
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {anime.genres.slice(0, 4).map((genre, index) => (
                <span key={genre} className="flex items-center gap-2">
                  <span className="text-tertiary font-label-sm uppercase tracking-wider drop-shadow-md">
                    {genre}
                  </span>
                  {index < Math.min(3, anime.genres.length - 1) && (
                    <span className="text-tertiary font-label-sm uppercase tracking-wider">
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display-lg text-2xl md:text-4xl lg:text-5xl text-on-surface mb-2 leading-tight drop-shadow-lg">
            {displayTitle}
          </h1>

          {anime.title?.native && anime.title.native !== displayTitle && (
            <p className="text-on-surface-variant text-sm md:text-base opacity-80 mb-2 drop-shadow-md">
              {anime.title.native}
            </p>
          )}

          {anime.description && (
            <p className="font-body-md text-on-surface-variant max-w-2xl hidden md:block line-clamp-3 drop-shadow-md">
              {anime.description.replace(/<[^>]*>/g, "")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
