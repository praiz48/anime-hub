"use client";

import { useRouter } from "next/navigation";
import { Dices, PlayCircle, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  isFavorite,
  toggleFavorite,
} from "@/app/(routes)/favorites/_utils/favorites";
import { RandomDetailsGrid } from "./RandomDetailsGrid";
import type { AniListMedia } from "@/lib/api/anilist";

interface RandomInfoPanelProps {
  anime: AniListMedia;
  onGetAnother: () => void;
  isLoading?: boolean;
}

export function RandomInfoPanel({
  anime,
  onGetAnother,
  isLoading,
}: RandomInfoPanelProps) {
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(anime.id));
  }, [anime.id]);

  const handleBookmark = () => {
    toggleFavorite(anime.id);
    setIsFav(!isFav);
  };

  const handleWatchTrailer = () => {
    if (anime.trailer?.id && anime.trailer.site === "youtube") {
      window.open(
        `https://www.youtube.com/watch?v=${anime.trailer.id}`,
        "_blank",
      );
    } else {
      router.push(`/anime/${anime.id}`);
    }
  };

  const handleViewDetails = () => {
    router.push(`/anime/${anime.id}`);
  };

  return (
    <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-6 md:gap-8 bg-surface-container/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-outline-variant/30">
      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">
          Your Random Pick
        </h2>
        <p className="font-body-md text-on-surface-variant text-sm md:text-base">
          We traversed the digital ether and found this gem for you.
        </p>
      </div>

      {/* Details Grid */}
      <RandomDetailsGrid anime={anime} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 md:gap-4 mt-auto">
        <button
          onClick={onGetAnother}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-headline-md text-base md:text-lg py-3 md:py-4 rounded-xl shadow-[0_0_15px_rgba(160,120,255,0.3)] hover:shadow-[0_0_25px_rgba(160,120,255,0.5)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Dices
            className={cn(
              "w-5 h-5 transition-transform duration-500",
              isLoading ? "animate-spin" : "group-hover:rotate-180",
            )}
          />
          {isLoading ? "Finding..." : "Surprise Me Again"}
        </button>

        <button
          onClick={handleWatchTrailer}
          className="w-full bg-transparent border border-primary/50 text-primary hover:bg-primary/10 font-headline-md text-base md:text-lg py-3 md:py-4 rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-5 h-5 fill-current" />
          {anime.trailer ? "Watch Trailer" : "View Details"}
        </button>

        <button
          onClick={handleBookmark}
          className={cn(
            "w-full font-headline-md text-base md:text-lg py-3 md:py-4 rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 border",
            isFav
              ? "bg-error/10 border-error/50 text-error"
              : "bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface",
          )}
        >
          <Bookmark className={cn("w-5 h-5", isFav && "fill-current")} />
          {isFav ? "In Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
