"use client";

import { useRef, useState, useEffect } from "react";
import { AnimeCard } from "./AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/skeletons/AnimeCardSkeleton";
import { SectionHeader } from "./SectionHeader";
import type { AniListMedia } from "@/lib/api/anilist";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimeSectionProps {
  title: string;
  data?: AniListMedia[];
  isLoading: boolean;
  viewAllLink?: string;
  error?: Error | null;
  Icon?: LucideIcon;
}

export function AnimeSection({
  title,
  data,
  isLoading,
  viewAllLink,
  error,
  Icon,
}: AnimeSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(
      hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 5,
    );
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [data]);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Error state
  if (error) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
        <div className="p-8 text-center bg-error-container/20 rounded-2xl border border-error/20">
          <p className="text-error">Failed to load {title.toLowerCase()}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-primary hover:text-primary-fixed transition-colors"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
        <div className="flex gap-6 overflow-x-auto hide-scroll pb-8 pt-4 -mt-4 px-2 -mx-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <section className="flex flex-col gap-6">
        <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />
        <div className="p-8 text-center bg-surface-container rounded-2xl border border-border">
          <p className="text-muted-foreground">
            No anime found in this section
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 group/section">
      <SectionHeader title={title} viewAllLink={viewAllLink} icon={Icon} />

      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBy("left")}
            className={cn(
              "hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "w-12 h-12 rounded-full",
              "bg-background/90 backdrop-blur-md border border-white/10",
              "text-on-surface hover:bg-background hover:scale-110 transition-all",
              "shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
              "-translate-x-4",
              "opacity-0 group-hover/section:opacity-100 transition-opacity",
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scroll pb-8 pt-4 -mt-4 px-2 -mx-2 snap-x"
        >
          {data.map((anime, index) => (
            <AnimeCard
              key={`${anime.id}-${index}`}
              anime={anime}
              onClick={() => (window.location.href = `/anime/${anime.id}`)}
            />
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scrollBy("right")}
            className={cn(
              "hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "w-12 h-12 rounded-full",
              "bg-background/90 backdrop-blur-md border border-white/10",
              "text-on-surface hover:bg-background hover:scale-110 transition-all",
              "shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
              "translate-x-4",
              "opacity-0 group-hover/section:opacity-100 transition-opacity",
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
}
