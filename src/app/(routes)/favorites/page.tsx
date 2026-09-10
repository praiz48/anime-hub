"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FavoritesGrid } from "./_components/FavoritesGrid";
import { EmptyFavorites } from "./_components/EmptyFavorites";
import { useFavorites } from "./_hooks/useFavorites";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, isLoading, removeFavoriteAnime, favoriteIds } =
    useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Header */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              My Favorites
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {favoriteIds.length > 0
                ? `You have ${favoriteIds.length} favorite anime in your collection`
                : "Your curated collection of masterpieces"}
            </p>
          </div>
          {favoriteIds.length > 0 && (
            <Link
              href="/discover"
              className="bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-2.5 rounded-full font-label-sm tracking-wider uppercase hover:scale-105 transition-all duration-300 shadow-[0_4px_14px_0_rgba(160,120,255,0.39)] flex items-center gap-2 text-sm"
            >
              Continue Browsing
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </header>

        {/* Grid or Empty State */}
        {favoriteIds.length === 0 && !isLoading ? (
          <EmptyFavorites />
        ) : (
          <FavoritesGrid
            favorites={favorites}
            isLoading={isLoading}
            onRemove={removeFavoriteAnime}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
