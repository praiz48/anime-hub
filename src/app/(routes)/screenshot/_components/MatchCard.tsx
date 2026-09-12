"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { TraceResult } from "../_hooks/useScreenshotSearch";

interface MatchCardProps {
  result: TraceResult;
}

export function MatchCard({ result }: MatchCardProps) {
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
    <div className="glass-panel rounded-lg overflow-hidden flex min-h-[140px] hover:bg-surface-variant/30 transition-colors">
      {/* Thumbnail */}
      <div className="w-32 md:w-40 relative flex-shrink-0">
        <img
          src={result.image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1.5 left-1.5 bg-surface/80 text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-medium backdrop-blur-md">
          {similarity}%
        </div>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col justify-between flex-1 min-w-0">
        <div className="min-w-0">
          <h4 className="text-sm md:text-base font-semibold text-on-surface line-clamp-2 mb-1">
            {title}
          </h4>
          {result.anilist?.title?.romaji &&
            result.anilist.title.romaji !== title && (
              <p className="text-xs text-on-surface-variant line-clamp-1 mb-1">
                {result.anilist.title.romaji}
              </p>
            )}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {result.episode && (
              <span className="text-secondary text-xs font-medium">
                EP {result.episode}
              </span>
            )}
            <span className="text-on-surface-variant text-xs">
              {formatTime(result.from)}
            </span>
            {result.filename && (
              <>
                <span className="text-on-surface-variant/50 text-xs">•</span>
                <span className="text-on-surface-variant/70 text-xs line-clamp-1 italic">
                  {result.filename}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Link
            href={`/anime/${result.anilist?.id}`}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
