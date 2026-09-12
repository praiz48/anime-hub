"use client";

import { useQuery } from "@tanstack/react-query";

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

const FALLBACK: QuoteData = {
  quote: "Anime is not just a hobby, it's a way of life.",
  character: "Anime Hub Team",
  anime: "",
};

export function QuoteCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-container p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-11/12 rounded bg-surface-container-high" />
            <div className="h-4 w-3/4 rounded bg-surface-container-high" />
            <div className="h-4 w-1/2 rounded bg-surface-container-high" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="h-4 w-0.5 bg-surface-container-high" />
            <div className="h-3 w-32 rounded bg-surface-container-high" />
          </div>
        </div>
      </div>
    );
  }

  const shown = error || !data ? FALLBACK : data;
  const isFallback = error || !data;

  return (
    <div className="quote-card group relative overflow-hidden rounded-2xl border border-border bg-surface-container p-6 md:p-8">
      {/* corner fold — panel-note motif */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-5 w-5 bg-surface-container-high"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden
      />

      {/* oversized quotation glyph, sits behind the text */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 -top-6 select-none font-serif text-[6rem] leading-none text-primary/10 md:text-[7.5rem]"
      >
        “
      </span>

      <blockquote className="relative">
        <p className="font-serif text-lg italic leading-relaxed text-on-surface md:text-xl">
          {shown.quote}
        </p>
        <footer className="mt-4 flex items-center gap-2">
          <span className="h-4 w-0.5 shrink-0 bg-primary" aria-hidden />
          <cite className="not-italic text-sm text-muted-foreground">
            <span className="font-medium text-on-surface">
              {shown.character}
            </span>
            {!isFallback && shown.anime ? <> — {shown.anime}</> : null}
          </cite>
        </footer>
      </blockquote>

      <style jsx>{`
        .quote-card {
          animation: quoteIn 0.4s ease-out;
        }
        @keyframes quoteIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .quote-card {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
