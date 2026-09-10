"use client";

export function AnimeDetailsSkeleton() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="relative w-full h-[400px] md:h-[614px] bg-surface-container animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </section>

      {/* Content Skeleton */}
      <section className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-[307px] pb-24">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 mb-12">
          {/* Poster Skeleton */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0 space-y-4">
            <div className="aspect-[2/3] rounded-xl bg-surface-container-high animate-pulse" />
            <div className="h-12 rounded-full bg-surface-container-high animate-pulse" />
            <div className="h-12 rounded-full bg-surface-container-high animate-pulse" />
            <div className="p-6 space-y-3 bg-surface-container/50 rounded-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 bg-surface-container-high rounded animate-pulse" />
                  <div className="h-4 w-24 bg-surface-container-high rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="w-full md:w-2/3 lg:w-3/4 pt-8 md:pt-32">
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-surface-container-high rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="h-12 w-3/4 bg-surface-container-high rounded-lg animate-pulse mb-4" />
            <div className="space-y-2 max-w-3xl">
              <div className="h-4 w-full bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-full bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-surface-container-high rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Characters Skeleton */}
        <div className="mt-12 md:mt-20">
          <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl bg-surface-container-high animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Recommendations Skeleton */}
        <div className="mt-12 md:mt-20">
          <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[2/3] rounded-xl bg-surface-container-high animate-pulse" />
                <div className="h-4 w-3/4 bg-surface-container-high rounded animate-pulse mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
