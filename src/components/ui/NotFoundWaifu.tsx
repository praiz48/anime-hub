"use client";

import { useEffect, useState, ReactNode } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface WaifuImage {
  url: string;
  width: number;
  height: number;
  artist?: string;
  source?: string;
}

interface NotFoundWaifuProps {
  title?: string;
  description?: string;
  bigNumber?: string; // Optional - shows "404" style large number
  children?: ReactNode; // CTA buttons
}

export function NotFoundWaifu({
  title = "This page doesn't exist",
  description = "Maybe you took a wrong turn?",
  bigNumber = "404",
  children,
}: NotFoundWaifuProps) {
  const [waifu, setWaifu] = useState<WaifuImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchWaifu = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const res = await fetch("/api/waifu");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setWaifu(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaifu();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container to-primary-container/20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const hasImage = !hasError && waifu?.url;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image (or gradient fallback) */}
      {hasImage ? (
        <img
          src={`/api/waifu/image?url=${encodeURIComponent(waifu!.url)}`}
          alt="Anime art background"
          className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-container to-primary-container/30" />
      )}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop text-center">
        {/* Big number (optional) */}
        {bigNumber && (
          <div className="font-display-lg text-[120px] md:text-[180px] lg:text-[220px] font-black text-primary/30 leading-none tracking-tighter mb-2 drop-shadow-[0_0_30px_rgba(208,188,255,0.3)]">
            {bigNumber}
          </div>
        )}

        <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 drop-shadow-lg">
          {title}
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8 drop-shadow-md">
          {description}
        </p>

        {/* CTAs passed as children */}
        {children}
      </div>

      {/* Bottom-left: Artist credit */}
      {hasImage && waifu!.artist && (
        <div className="absolute bottom-4 left-4 z-20 text-xs text-on-surface-variant/70 backdrop-blur-sm bg-surface/30 px-3 py-1.5 rounded-full">
          Art by <span className="text-secondary">{waifu!.artist}</span>
        </div>
      )}

      {/* Bottom-right: New image button */}
      {hasImage && (
        <button
          onClick={fetchWaifu}
          className="absolute bottom-4 right-4 z-20 text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 backdrop-blur-sm bg-surface/30 px-3 py-1.5 rounded-full"
        >
          <Sparkles className="w-3.5 h-3.5" />
          New image
        </button>
      )}
    </div>
  );
}
