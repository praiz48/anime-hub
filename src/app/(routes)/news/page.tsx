"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NewsGrid } from "./_components/NewsGrid";
import { NewsEmpty } from "./_components/NewsEmpty";
import { useNews } from "./_hooks/useNews";
import { useLoadMoreTrigger } from "./_hooks/useLoadMoreTrigger";
import { Newspaper, Loader2 } from "lucide-react";

export default function NewsPage() {
  const {
    news,
    total,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    loadMore,
  } = useNews();
  const triggerRef = useLoadMoreTrigger(
    loadMore,
    hasNextPage,
    isFetchingNextPage,
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-12">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-2 flex items-center gap-3">
            <Newspaper className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            Latest News
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Stay up to date with the latest from the anime world.
          </p>
          {!isLoading && total > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {total} articles • From 7 sources
            </p>
          )}
        </header>

        {/* Content */}
        {error ? (
          <NewsEmpty />
        ) : news.length === 0 && !isLoading ? (
          <NewsEmpty />
        ) : (
          <>
            <NewsGrid news={news} isLoading={isLoading} />

            {/* Infinite scroll trigger */}
            {hasNextPage && (
              <div
                ref={triggerRef}
                className="flex justify-center py-8 md:py-12"
              >
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more news...</span>
                  </div>
                ) : (
                  <button
                    onClick={() => loadMore()}
                    className="text-secondary hover:text-primary transition-colors font-medium"
                  >
                    Load more
                  </button>
                )}
              </div>
            )}

            {!hasNextPage && news.length > 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                You've reached the end • Showing all {news.length} articles
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
