"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RecommendationNode {
  mediaRecommendation: {
    id: number;
    title: {
      romaji: string;
      english?: string | null;
    };
    coverImage: {
      large: string;
    };
    averageScore?: number;
  };
}

interface RecommendationGridProps {
  recommendations: RecommendationNode[];
}

export function RecommendationGrid({
  recommendations,
}: RecommendationGridProps) {
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});

  const handleLoad = (id: number) => {
    setIsLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="mt-12 md:mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-headline-md text-on-surface border-l-4 border-secondary pl-4">
          You Might Also Like
        </h2>
        <Link
          href={`/discover?recommendations=${recommendations[0]?.mediaRecommendation.id}`}
          className="font-label-sm text-label-sm text-primary hover:text-secondary transition-colors flex items-center gap-1"
        >
          View All
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {recommendations.slice(0, 10).map(({ mediaRecommendation: rec }) => {
          const displayTitle = rec.title.english || rec.title.romaji;
          const score = rec.averageScore
            ? (rec.averageScore / 10).toFixed(1)
            : null;

          return (
            <Link
              key={rec.id}
              href={`/anime/${rec.id}`}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[2/3] mb-2 md:mb-3">
                {isLoading[rec.id] !== false && (
                  <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
                )}
                <Image
                  src={rec.coverImage.large}
                  alt={displayTitle}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500 group-hover:scale-105",
                    isLoading[rec.id] === false ? "opacity-100" : "opacity-0",
                  )}
                  onLoad={() => handleLoad(rec.id)}
                  loading="lazy"
                />
                <div className="absolute inset-0 shadow-[inset_0_-50px_40px_-20px_rgba(15,19,29,0.8)]" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />

                {score && (
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-secondary">
                    ★ {score}
                  </div>
                )}
              </div>
              <h3 className="font-headline-md text-sm md:text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {displayTitle}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
