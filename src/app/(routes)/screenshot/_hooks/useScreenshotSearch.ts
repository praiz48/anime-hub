"use client";

import { useState, useCallback } from "react";

export interface TraceResult {
  anilist: {
    id: number;
    idMal: number;
    title: {
      native: string;
      romaji: string;
      english: string | null;
    };
    synonyms: string[];
    isAdult: boolean;
    coverImage: {
      large: string;
      medium: string;
    };
  };
  filename: string;
  episode: number | null;
  from: number;
  to: number;
  similarity: number;
  video: string;
  image: string;
}

export interface TraceResponse {
  frameCount: number;
  error: string;
  result: TraceResult[];
}

export function useScreenshotSearch() {
  const [results, setResults] = useState<TraceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/trace", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Search failed");
      }

      const data: TraceResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.result || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    results,
    isLoading,
    error,
    hasSearched,
    search,
    reset,
  };
}
