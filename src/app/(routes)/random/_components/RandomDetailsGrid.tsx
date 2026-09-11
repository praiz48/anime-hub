"use client";

import type { AniListMedia } from "@/lib/api/anilist";

interface RandomDetailsGridProps {
  anime: AniListMedia;
}

export function RandomDetailsGrid({ anime }: RandomDetailsGridProps) {
  const studio = anime.studios?.nodes?.[0]?.name || "Unknown";
  const statusText = anime.status
    ? anime.status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/^\w/, (char) => char.toUpperCase())
    : "TBA";
  const episodes = anime.episodes
    ? `${anime.episodes} ${anime.status === "FINISHED" ? "(Completed)" : ""}`.trim()
    : statusText;
  const year = anime.seasonYear || anime.startDate?.year || "TBA";
  const matchRate = anime.averageScore ? `${anime.averageScore}%` : "N/A";

  const details = [
    { label: "Studio", value: studio },
    { label: "Episodes", value: episodes },
    { label: "Year", value: year },
    { label: "Match Rate", value: matchRate, highlight: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline-variant/20"
        >
          <p className="font-label-sm text-on-surface-variant mb-1 text-xs md:text-sm">
            {detail.label}
          </p>
          <p
            className={`font-body-md text-sm md:text-base font-semibold ${
              detail.highlight ? "text-secondary" : "text-on-surface"
            }`}
          >
            {detail.value}
          </p>
        </div>
      ))}
    </div>
  );
}
