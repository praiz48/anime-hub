"use client";

import { useQuery } from "@tanstack/react-query";
import { Quote } from "lucide-react";

interface QuoteData {
  anime: string;
  character: string;
  quote: string;
}

async function fetchQuote(): Promise<QuoteData> {
  const res = await fetch("/api/quote");
  if (!res.ok) throw new Error("Failed to fetch quote");
  return res.json();
}

export function QuoteCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnMount: false,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container border border-border animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-container-high" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-surface-container-high rounded w-3/4" />
            <div className="h-4 bg-surface-container-high rounded w-2/3" />
            <div className="h-4 bg-surface-container-high rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // Error state - show fallback quote
  if (error || !data) {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container border border-border">
        <div className="flex items-start gap-4">
          <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-base md:text-lg font-medium text-on-surface italic">
              "Anime is not just a hobby, it's a way of life."
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              — Anime Hub Team
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Data loaded
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-surface-container border border-border hover:border-primary/20 transition-colors">
      <div className="flex items-start gap-4">
        <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0 mt-1" />
        <div>
          <p className="text-base md:text-lg font-medium text-on-surface italic leading-relaxed">
            "{data.quote}"
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            — {data.character}, {data.anime}
          </p>
        </div>
      </div>
    </div>
  );
}
