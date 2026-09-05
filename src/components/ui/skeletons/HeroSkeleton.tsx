export function HeroSkeleton() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[716px] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-surface-container animate-pulse" />
      <div className="absolute inset-0 cinematic-gradient" />

      <div className="relative z-20 w-full h-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-end pb-12 md:pb-16 lg:pb-20">
        <div className="flex flex-col gap-3 md:gap-4 max-w-3xl w-full">
          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-7 w-24 bg-surface-container-high rounded-full animate-pulse" />
            <div className="h-7 w-32 bg-surface-container-high rounded-full animate-pulse" />
          </div>

          {/* Title */}
          <div className="h-12 md:h-16 bg-surface-container-high rounded-lg animate-pulse w-3/4" />
          <div className="h-12 md:h-16 bg-surface-container-high rounded-lg animate-pulse w-2/3" />

          {/* Description */}
          <div className="h-5 bg-surface-container-high rounded animate-pulse w-full max-w-2xl" />
          <div className="h-5 bg-surface-container-high rounded animate-pulse w-3/4 max-w-2xl" />

          {/* Author */}
          <div className="h-4 bg-surface-container-high rounded animate-pulse w-32" />

          {/* Buttons */}
          <div className="flex gap-3 md:gap-4 mt-2">
            <div className="h-11 md:h-14 w-40 bg-surface-container-high rounded-full animate-pulse" />
            <div className="h-11 md:h-14 w-32 bg-surface-container-high rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
