"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { HeroSkeleton } from "@/components/ui/skeletons/HeroSkeleton";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author: string;
  guid: string;
  image: string | null;
}

interface HeroCarouselProps {
  news: NewsItem[];
  isLoading?: boolean;
  error?: Error | null;
}

export function HeroCarousel({ news, isLoading, error }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || !news || news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, news]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, news]);

  const goToPrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  }, [news.length]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % news.length);
  }, [news.length]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // Loading state
  if (isLoading) {
    return <HeroSkeleton />;
  }

  // Error state
  if (error || !news || news.length === 0) {
    return (
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[716px] flex items-center justify-center bg-surface-container">
        <div className="text-center px-4">
          <p className="text-error text-lg mb-2">Failed to load news</p>
          <p className="text-muted-foreground text-sm">
            Please try again later
          </p>
        </div>
      </section>
    );
  }

  const currentNews = news[currentIndex];

  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] lg:h-[716px] min-h-[400px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder image - we'll use a gradient as fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container to-primary/20" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(208,188,255,0.1) 0%, transparent 50%)`,
          }}
        />
        {/* image */}
        {currentNews.image && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container to-primary/20" />
            <Image
              src={currentNews.image}
              alt={currentNews.title}
              fill
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
        )}
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 z-10 cinematic-gradient" />

      {/* Content */}
      <div className="relative z-20 w-full h-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-end pb-12 md:pb-16 lg:pb-20">
        <div className="flex flex-col gap-3 md:gap-4 max-w-3xl">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary text-on-secondary font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
              Latest News
            </span>
            <span className="glass-card px-3 py-1 rounded-full text-label-sm font-label-sm text-on-surface flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {new Date(currentNews.pubDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight line-clamp-3 md:line-clamp-4">
            {currentNews.title}
          </h1>

          {/* Description */}
          <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant line-clamp-2 md:line-clamp-3 max-w-2xl">
            {currentNews.description ||
              "Click to read the full article on Anime News Network."}
          </p>

          {/* Author & Date */}
          <p className="text-label-sm text-label-sm text-on-surface-variant opacity-70">
            By {currentNews.author || "ANN Staff"}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4 mt-2">
            <Link
              href={currentNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary font-title-md text-title-md px-6 md:px-8 py-2.5 md:py-3 rounded-full flex items-center gap-2 hover:bg-primary-fixed transition-all hover:scale-105 shadow-[0_0_20px_rgba(208,188,255,0.3)]"
            >
              <Play className="w-5 h-5 fill-current" />
              Read Full Story
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="pointer-events-auto p-2 md:p-3 rounded-full bg-surface/50 backdrop-blur-lg border border-white/10 text-on-surface hover:bg-surface/80 transition-all hover:scale-105"
          aria-label="Previous news"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={goToNext}
          className="pointer-events-auto p-2 md:p-3 rounded-full bg-surface/50 backdrop-blur-lg border border-white/10 text-on-surface hover:bg-surface/80 transition-all hover:scale-105"
          aria-label="Next news"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              transition-all duration-300 rounded-full
              ${
                index === currentIndex
                  ? "w-8 md:w-10 h-2 bg-primary"
                  : "w-2 h-2 bg-on-surface-variant/40 hover:bg-on-surface-variant/60"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
