"use client";

import { Filter, RefreshCw } from "lucide-react";
import type { DiscoverFilters } from "../_hooks/useDiscover";
import { getCurrentSeason } from "@/lib/api/anilist";

interface FilterBarProps {
  filters: DiscoverFilters;
  onFilterChange: (key: keyof DiscoverFilters, value: any) => void;
  onClearFilters: () => void;
  onResetToSeasonal: () => void;
}

// More comprehensive genre list
const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Thriller",
  "Ecchi",
  "Harem",
  "Isekai",
  "Magical Girl",
  "Mecha",
  "Music",
  "Parody",
  "Psychological",
  "Supernatural",
  "Suspense",
];

const SEASONS = ["WINTER", "SPRING", "SUMMER", "FALL"];
const YEARS = Array.from(
  { length: 15 },
  (_, i) => new Date().getFullYear() - i + 5,
);
const STATUSES = ["RELEASING", "FINISHED", "NOT_YET_RELEASED"];

const SORT_OPTIONS = [
  { value: "POPULARITY_DESC", label: "Most Popular" },
  { value: "SCORE_DESC", label: "Highest Score" },
  { value: "TRENDING_DESC", label: "Trending Now" },
  { value: "START_DATE_DESC", label: "Newest" },
  { value: "START_DATE_ASC", label: "Oldest" },
  { value: "FAVOURITES_DESC", label: "Most Favorited" },
];

// Get current season for default
const currentSeason = getCurrentSeason();

export function FilterBar({
  filters,
  onFilterChange,
  onResetToSeasonal,
}: FilterBarProps) {
  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key as keyof DiscoverFilters];
    return value !== undefined && value !== "" && value !== null;
  });

  return (
    <div className="glass-panel rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <>
              <button
                onClick={onResetToSeasonal}
                className="text-secondary font-label-sm text-label-sm hover:underline transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Current Season
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {/* Genre - Only one with blank option */}
        <div className="relative group">
          <select
            value={filters.genre || ""}
            onChange={(e) =>
              onFilterChange("genre", e.target.value || undefined)
            }
            className="w-full appearance-none bg-surface-container border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg py-2.5 px-3 pr-8 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer hover:bg-surface-variant"
          >
            <option value="">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-outline group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </div>

        {/* Season - Default: Current Season */}
        <div className="relative group">
          <select
            value={filters.season || currentSeason.season}
            onChange={(e) =>
              onFilterChange("season", e.target.value || undefined)
            }
            className="w-full appearance-none bg-surface-container border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg py-2.5 px-3 pr-8 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer hover:bg-surface-variant"
          >
            {SEASONS.map((season) => (
              <option key={season} value={season}>
                {season.charAt(0) + season.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-outline group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </div>

        {/* Year - Default: Current Year */}
        <div className="relative group">
          <select
            value={filters.seasonYear || currentSeason.year}
            onChange={(e) =>
              onFilterChange(
                "seasonYear",
                e.target.value ? parseInt(e.target.value) : undefined,
              )
            }
            className="w-full appearance-none bg-surface-container border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg py-2.5 px-3 pr-8 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer hover:bg-surface-variant"
          >
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-outline group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </div>

        {/* Status - Default: RELEASING */}
        <div className="relative group">
          <select
            value={filters.status || "RELEASING"}
            onChange={(e) =>
              onFilterChange("status", e.target.value || undefined)
            }
            className="w-full appearance-none bg-surface-container border border-outline-variant text-on-surface-variant font-body-md text-body-md rounded-lg py-2.5 px-3 pr-8 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer hover:bg-surface-variant"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ").charAt(0) +
                  status.replace("_", " ").slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-outline group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">
              expand_more
            </span>
          </div>
        </div>

        {/* Sort - Default: POPULARITY_DESC */}
        <div className="relative group md:col-span-2 lg:col-span-1">
          <select
            value={filters.sort || "POPULARITY_DESC"}
            onChange={(e) =>
              onFilterChange("sort", e.target.value || undefined)
            }
            className="w-full appearance-none bg-surface-container border border-outline-variant text-primary font-body-md text-body-md rounded-lg py-2.5 px-3 pr-8 focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors cursor-pointer hover:bg-surface-variant"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-primary">
            <span className="material-symbols-outlined text-sm">sort</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center text-outline font-body-md text-body-md hidden lg:flex text-sm">
          <span className="material-symbols-outlined text-sm mr-1">info</span>
          <span>Default: Current Season</span>
        </div>
      </div>
    </div>
  );
}
