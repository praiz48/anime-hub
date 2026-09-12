"use client";

import { useEffect } from "react";
import { NotFoundWaifu } from "@/components/ui/NotFoundWaifu";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow relative">
        {/* Reuse the same waifu background component */}
        <NotFoundWaifu
          title="Something went wrong"
          description="An unexpected error occurred. Here's a cute anime art while we sort it out."
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="bg-primary text-on-primary px-6 py-3 rounded-full font-medium hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(208,188,255,0.3)]"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/"
              className="bg-surface/40 backdrop-blur-md border border-white/20 text-on-surface px-6 py-3 rounded-full font-medium hover:bg-surface/60 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </NotFoundWaifu>
      </main>
    </div>
  );
}
