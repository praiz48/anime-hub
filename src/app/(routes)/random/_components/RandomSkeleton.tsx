"use client";

export function RandomSkeleton() {
  return (
    <div className="max-w-container-max w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter items-center">
      {/* Card Skeleton */}
      <div className="lg:col-span-7 xl:col-span-8">
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-container-high animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            <div className="h-4 bg-surface-container rounded w-32 mb-3 animate-pulse" />
            <div className="h-10 md:h-14 bg-surface-container rounded w-3/4 mb-3 animate-pulse" />
            <div className="h-4 bg-surface-container rounded w-full max-w-2xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Info Panel Skeleton */}
      <div className="lg:col-span-5 xl:col-span-4 bg-surface-container/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-outline-variant/30">
        <div className="text-center md:text-left mb-6">
          <div className="h-8 bg-surface-container-high rounded w-48 mb-2 animate-pulse mx-auto md:mx-0" />
          <div className="h-4 bg-surface-container-high rounded w-64 animate-pulse mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-container-low p-3 md:p-4 rounded-xl"
            >
              <div className="h-3 w-16 bg-surface-container-high rounded mb-2 animate-pulse" />
              <div className="h-5 w-20 bg-surface-container-high rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <div className="h-14 bg-surface-container-high rounded-xl animate-pulse" />
          <div className="h-14 bg-surface-container-high rounded-xl animate-pulse" />
          <div className="h-14 bg-surface-container-high rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
