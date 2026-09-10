"use client";

export function FavoriteCardSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden bg-surface-container aspect-[2/3] animate-pulse">
      <div className="absolute inset-0 bg-surface-container-high" />
      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="h-5 bg-surface-container/80 rounded w-3/4 mb-2" />
        <div className="flex gap-3">
          <div className="h-3 bg-surface-container/80 rounded w-12" />
          <div className="h-3 bg-surface-container/80 rounded w-12" />
        </div>
      </div>
      {/* Remove button placeholder */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-dim/50" />
    </div>
  );
}
