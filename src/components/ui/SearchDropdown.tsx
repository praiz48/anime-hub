"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useSearchAnime } from "@/hooks/useAnime";
import Image from "next/image";
import Link from "next/link";

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // The actual term to search
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isFetching } = useSearchAnime(searchTerm, page, 5);

  // Reset when search term changes
  useEffect(() => {
    setPage(1);
    setAllResults([]);
  }, [searchTerm]);

  // Append new results
  useEffect(() => {
    if (data?.media) {
      if (page === 1) {
        setAllResults(data.media);
      } else {
        setAllResults((prev) => [...prev, ...data.media]);
      }
    }
  }, [data, page]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle search submission
  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setSearchTerm(query.trim());
    }
  }, [query]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Load more function
  const loadMore = () => {
    if (!isFetching && data?.pageInfo?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-4 top-[10%] md:top-[20%] z-50 max-w-2xl mx-auto">
        <div className="bg-surface-container rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Search Input */}
          <div className="p-4 md:p-6 border-b border-border">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search anime..."
                  className="w-full bg-surface-container-high border border-outline-variant text-on-surface text-lg rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={!query.trim() || isLoading}
                className="px-6 py-3 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto p-2">
            {/* Initial state - no search yet */}
            {!searchTerm && !isLoading && (
              <div className="p-12 text-center text-muted-foreground">
                <p className="text-lg">Type a title and click Search</p>
                <p className="text-sm mt-1">Search for anime by title</p>
              </div>
            )}

            {/* Loading state */}
            {isLoading && page === 1 && searchTerm && (
              <div className="p-8 text-center text-muted-foreground">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                <p className="mt-2">Searching...</p>
              </div>
            )}

            {/* No results */}
            {!isLoading && searchTerm && allResults.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-lg text-on-surface">No results found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search for "{searchTerm}"
                </p>
              </div>
            )}

            {/* Results */}
            {allResults.length > 0 && (
              <>
                {allResults.map((anime: any) => (
                  <Link
                    key={anime.id}
                    href={`/anime/${anime.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors"
                  >
                    <div className="relative w-14 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container-high">
                      {anime.coverImage?.medium ? (
                        <Image
                          src={anime.coverImage.medium}
                          alt={anime.title?.romaji || "Anime"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-on-surface truncate">
                        {anime.title?.english ||
                          anime.title?.romaji ||
                          "Unknown"}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-0.5">
                        <span>{anime.genres?.[0] || "Unknown"}</span>
                        {anime.averageScore && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span>★</span>
                              <span>
                                {(anime.averageScore / 10).toFixed(1)}
                              </span>
                            </span>
                          </>
                        )}
                        {anime.episodes && (
                          <>
                            <span>•</span>
                            <span>{anime.episodes} eps</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Load More Button */}
                {data?.pageInfo?.hasNextPage && (
                  <button
                    onClick={loadMore}
                    disabled={isFetching}
                    className="w-full text-center text-sm text-secondary hover:text-secondary-fixed transition-colors py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFetching ? "Loading..." : "Load more results..."}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
