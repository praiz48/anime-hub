"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FilterBar } from "./_components/FilterBar";
import { ResultsGrid } from "./_components/ResultsGrid";
import { useDiscover } from "./_hooks/useDiscover";
import { Sparkles } from "lucide-react";

export default function DiscoverPage() {
  const {
    filters,
    results,
    isLoading,
    isFetchingMore,
    hasMore,
    totalResults,
    error,
    isFilterActive,
    updateFilter,
    clearFilters,
    loadMore,
    resetToSeasonal,
  } = useDiscover();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-12">
        {/* Header */}
        <section className="mb-8 md:mb-12">
          <div className="max-w-4xl mx-auto mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface text-center flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Discover Anime
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Browse and filter through our collection of anime
            </p>
            {!isFilterActive && (
              <p className="text-center text-sm text-secondary mt-1">
                Showing: Current Season
              </p>
            )}
          </div>

          <FilterBar
            filters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
            onResetToSeasonal={resetToSeasonal}
          />
        </section>

        {/* Results */}
        <section>
          <ResultsGrid
            results={results}
            isLoading={isLoading}
            isFetchingMore={isFetchingMore}
            hasMore={hasMore}
            totalResults={totalResults}
            onLoadMore={loadMore}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
