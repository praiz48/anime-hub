// src/components/ui/skeletons/AnimeCardSkeleton.tsx
export function AnimeCardSkeleton() {
  return (
    <div className="min-w-[200px] md:min-w-[240px] flex-shrink-0 snap-start">
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-surface-container-high animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-5 bg-surface-container-high rounded animate-pulse w-3/4" />
        <div className="h-4 bg-surface-container-high rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
