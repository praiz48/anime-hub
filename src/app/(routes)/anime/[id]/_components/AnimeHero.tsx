"use client";

import Image from "next/image";

interface AnimeHeroProps {
  bannerImage?: string | null;
  title: {
    romaji: string;
    english?: string | null;
    native?: string | null;
  };
  genres: string[];
}

export function AnimeHero({ bannerImage, title, genres }: AnimeHeroProps) {
  const displayTitle = title.english || title.romaji;

  return (
    <section className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] min-h-[300px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {bannerImage ? (
          <Image
            src={bannerImage}
            alt={displayTitle}
            fill
            className="object-cover object-top"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-container via-surface-container-high to-primary-container/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent" />
      </div>

      {/* Content - Title and genres positioned at bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 lg:p-12">
        <div className="max-w-container-max mx-auto">
          {/* Padding to match poster width on desktop */}
          <div className=" md:pl-[340px] md:block lg:pl-[310px] hidden">
            <div className="flex flex-wrap gap-2 mb-3">
              {genres.slice(0, 4).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-surface-variant/80 backdrop-blur-sm rounded-full font-label-sm text-label-sm text-on-surface border border-white/5"
                >
                  {genre}
                </span>
              ))}
            </div>
            <h1 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface mb-1 tracking-tight drop-shadow-lg">
              {displayTitle}
            </h1>
            {title.native && title.native !== displayTitle && (
              <p className="text-on-surface-variant text-sm md:text-base opacity-70">
                {title.native}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
