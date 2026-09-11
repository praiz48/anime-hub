"use client";

export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-surface-container border border-border">
      {/* Image skeleton */}
      <div className="aspect-[16/9] w-full bg-surface-container-high animate-pulse" />

      {/* Content skeleton */}
      <div className="flex flex-col p-4 md:p-6 gap-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-surface-container-high rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-surface-container-high rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-full bg-surface-container-high rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-surface-container-high rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-surface-container-high rounded animate-pulse" />
        </div>
        <div className="h-4 w-24 bg-surface-container-high rounded animate-pulse mt-auto" />
      </div>
    </div>
  );
}
