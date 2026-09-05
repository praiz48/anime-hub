"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: {
    mal_id: number;
    title: string;
    images: {
      jpg: { image_url: string };
      webp: { image_url: string };
    };
    score?: number;
    episodes?: number;
    genres?: Array<{ name: string }>;
  };
  onClick?: () => void;
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="min-w-[200px] md:min-w-[240px] flex-shrink-0 group cursor-pointer snap-start"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden glass-card transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        {/* Image with loading state */}
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
          )}
          <Image
            src={anime.images.jpg.image_url}
            alt={anime.title}
            fill
            sizes="(max-width: 768px) 200px, 240px"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
          />
        </div>

        {/* Badges */}
        {anime.episodes && (
          <div className="absolute top-2 right-2 bg-surface/80 backdrop-blur-md px-2 py-1 rounded text-label-sm font-label-sm text-secondary border border-white/10">
            Ep {anime.episodes}
          </div>
        )}

        {anime.score && anime.score >= 9 && (
          <div className="absolute top-2 left-2 bg-primary-container px-2 py-1 rounded text-label-sm font-label-sm text-on-primary-container">
            TOP
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

        {/* Play button on hover */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-on-primary shadow-[0_0_15px_rgba(208,188,255,0.6)]">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-title-md text-title-md text-on-surface truncate">
          {anime.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm truncate">
          {anime.genres
            ?.slice(0, 2)
            .map((g) => g.name)
            .join(", ") || "Unknown"}
        </p>
      </div>
    </div>
  );
}
