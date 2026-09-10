"use client";

interface AnimeInfoProps {
  title: {
    romaji: string;
    english?: string | null;
    native?: string | null;
  };
  description?: string;
  genres: string[];
  season?: string;
  seasonYear?: number;
  status?: string;
}

export function AnimeInfo({
  title,
  description,
  genres,
  season,
  seasonYear,
  status,
}: AnimeInfoProps) {
  const displayTitle = title.english || title.romaji;

  return (
    <div className="flex flex-col justify-end pt-8 md:pt-32">
      {/* Genres - Mobile only (desktop shows in hero) */}
      <div className="flex flex-wrap gap-2 mb-4 md:hidden">
        {genres.slice(0, 5).map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 bg-surface-variant rounded-full font-label-sm text-label-sm text-on-surface"
          >
            {genre}
          </span>
        ))}
      </div>

      <h1 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface mb-2 tracking-tight drop-shadow-lg md:hidden">
        {displayTitle}
      </h1>

      {/* Season/Year/Status badge */}
      {(season || seasonYear || status) && (
        <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-muted-foreground">
          {season && seasonYear && (
            <span className="px-3 py-1 bg-surface-container rounded-full">
              {season.charAt(0) + season.slice(1).toLowerCase()} {seasonYear}
            </span>
          )}
          {status && (
            <span className="px-3 py-1 bg-surface-container rounded-full">
              {status.replace("_", " ").charAt(0) +
                status.replace("_", " ").slice(1).toLowerCase()}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-6 leading-relaxed">
          {description.replace(/<[^>]*>/g, "")}
        </p>
      )}
    </div>
  );
}
