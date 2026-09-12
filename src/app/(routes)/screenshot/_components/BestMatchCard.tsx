"use client";

import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";
import type { TraceResult } from "../_hooks/useScreenshotSearch";

interface BestMatchCardProps {
  result: TraceResult;
}

export function BestMatchCard({ result }: BestMatchCardProps) {
  const title =
    result.anilist?.title?.english ||
    result.anilist?.title?.romaji ||
    "Unknown";
  const similarity = Math.round(result.similarity * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden border-l-4 border-l-primary relative group">
      {/* Match percentage badge */}
      <div className="absolute top-3 right-3 bg-primary/20 text-primary px-2.5 py-1 rounded text-xs font-bold backdrop-blur-md z-10">
        {similarity}% Match
      </div>

      {/* Preview image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img
          src={result.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {/* Episode + timestamp */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            {result.episode && (
              <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-bold inline-block w-fit backdrop-blur-sm">
                EP {result.episode}
              </span>
            )}
            <span className="text-white text-sm block drop-shadow-md font-medium">
              {formatTime(result.from)} / {formatTime(result.to)}
            </span>
          </div>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2.5 rounded-full transition-colors">
            <Play className="w-5 h-5 text-white fill-current" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-on-surface line-clamp-2 mb-1">
            {title}
          </h3>
          {result.anilist?.title?.romaji &&
            result.anilist.title.romaji !== title && (
              <p className="text-sm text-on-surface-variant line-clamp-1">
                {result.anilist.title.romaji}
              </p>
            )}
        </div>

        {result.filename && (
          <p className="text-xs text-on-surface-variant/70 line-clamp-1 italic">
            {result.filename}
          </p>
        )}

        <Link
          href={`/anime/${result.anilist?.id}`}
          className="mt-1 text-center w-full py-2.5 bg-surface-variant/50 hover:bg-surface-variant text-primary rounded-full transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          View Details
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
