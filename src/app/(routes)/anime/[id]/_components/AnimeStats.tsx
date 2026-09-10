"use client";
import { cn } from "@/lib/utils";

interface AnimeStatsProps {
  episodes?: number;
  status?: string;
  studios?: {
    nodes: Array<{ name: string }>;
  };
  averageScore?: number;
}

export function AnimeStats({
  episodes,
  status,
  studios,
  averageScore,
}: AnimeStatsProps) {
  const stats = [
    { label: "Format", value: "TV Series" },
    { label: "Episodes", value: episodes || "Unknown" },
    {
      label: "Status",
      value: status
        ? status.replace("_", " ").charAt(0) +
          status.replace("_", " ").slice(1).toLowerCase()
        : "Unknown",
    },
    { label: "Studio", value: studios?.nodes?.[0]?.name || "Unknown" },
    {
      label: "Rating",
      value: averageScore ? `${(averageScore / 10).toFixed(1)}/10` : "N/A",
    },
  ];

  return (
    <div className="bg-surface-container/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/5 mt-4">
      <ul className="space-y-3 md:space-y-4">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0"
          >
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {stat.label}
            </span>
            <span
              className={cn(
                "font-body-md text-body-md text-on-surface",
                stat.label === "Studio" && "text-secondary",
                stat.label === "Rating" && "text-primary font-bold",
              )}
            >
              {stat.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
