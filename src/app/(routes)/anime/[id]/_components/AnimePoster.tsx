"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, BookmarkPlus } from "lucide-react";
import {
  isFavorite,
  toggleFavorite,
} from "@/app/(routes)/favorites/_utils/favorites";
import { cn } from "@/lib/utils";

interface AnimePosterProps {
  coverImage: {
    large: string;
    medium: string;
  };
  title: {
    romaji: string;
    english?: string | null;
  };
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  } | null;
  id: number;
}

export function AnimePoster({
  coverImage,
  title,
  trailer,
  id,
}: AnimePosterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const displayTitle = title.english || title.romaji;
  const [isFav, setIsFav] = useState(false);
  // Check if anime is favorited on mount and when anime.id changes
  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
    setIsFav(!isFav);
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Poster */}
      <div className="relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(208,188,255,0.15)] group">
        {isLoading && (
          <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
        )}
        <Image
          src={coverImage.large || coverImage.medium}
          alt={displayTitle}
          width={400}
          height={600}
          className={cn(
            "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={() => setIsLoading(false)}
          priority
        />
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none" />
      </div>

      {/* Buttons */}
      <button className="w-full bg-gradient-to-r from-primary to-secondary text-background font-headline-md text-body-md py-3 rounded-full hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2">
        <Play className="w-5 h-5 fill-current" />
        {trailer ? "Watch Trailer" : "Watch Now"}
      </button>

      <button
        onClick={handleBookmark}
        className={cn(
          "w-full  border border-primary/30  font-headline-md text-body-md py-3 rounded-full  transition-all active:scale-95 flex items-center justify-center gap-2",
          isFav
            ? "bg-primary text-background hover:bg-primary/90"
            : "bg-surface-container text-primary hover:bg-primary/10",
        )}
      >
        <BookmarkPlus className="w-5 h-5" />
        Add to List
      </button>
    </div>
  );
}
