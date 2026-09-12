"use client";

import { Image, Loader2 } from "lucide-react";
import { BestMatchCard } from "./BestMatchCard";
import { MatchCard } from "./MatchCard";
import type { TraceResult } from "../_hooks/useScreenshotSearch";

interface ResultsPanelProps {
  results: TraceResult[];
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
}

export function ResultsPanel({
  results,
  isLoading,
  hasSearched,
  error,
}: ResultsPanelProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="glass-panel rounded-xl flex items-center justify-center p-8 text-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-lg font-semibold text-primary animate-pulse">
            Analyzing frames...
          </p>
          <p className="text-sm text-on-surface-variant mt-2">
            Checking database of 1M+ episodes
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="glass-panel rounded-xl flex items-center justify-center p-8 text-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-lg font-semibold text-error mb-2">Search Failed</p>
          <p className="text-sm text-on-surface-variant">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state (no search yet)
  if (!hasSearched) {
    return (
      <div className="glass-panel rounded-xl flex items-center justify-center p-8 text-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <Image className="w-16 h-16 text-surface-variant mb-4" />
          <p className="text-on-surface-variant">
            Upload an image to see potential matches here.
          </p>
        </div>
      </div>
    );
  }

  // No results
  if (!results || results.length === 0) {
    return (
      <div className="glass-panel rounded-xl flex items-center justify-center p-8 text-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-on-surface mb-2">
            No Matches Found
          </p>
          <p className="text-sm text-on-surface-variant">
            Try uploading a clearer screenshot or a different scene.
          </p>
        </div>
      </div>
    );
  }

  const [bestMatch, ...otherMatches] = results;

  return (
    <div className="flex flex-col gap-3">
      <BestMatchCard result={bestMatch} />
      {otherMatches.map((result, index) => (
        <MatchCard
          key={`${result.anilist?.id ?? "x"}-${index}`}
          result={result}
        />
      ))}
    </div>
  );
}
