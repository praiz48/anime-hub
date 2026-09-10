"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-surface-container flex items-center justify-center mb-6">
        <Heart className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground" />
      </div>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">
        No Favorites Yet
      </h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">
        Start exploring and save your favorite anime by clicking the bookmark
        button on any anime card.
      </p>
      <Link
        href="/discover"
        className="gradient-btn text-on-primary px-8 py-3 rounded-full font-label-sm tracking-wider uppercase hover:scale-105 transition-all duration-300 shadow-[0_4px_14px_0_rgba(160,120,255,0.39)] flex items-center gap-2"
      >
        Start Discovering
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
