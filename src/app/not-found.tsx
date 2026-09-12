import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { NotFoundWaifu } from "@/components/ui/NotFoundWaifu";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow relative">
        <NotFoundWaifu
          title="This page doesn't exist"
          description=" Maybe you took a wrong turn?"
          bigNumber="404"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="bg-primary text-on-primary px-6 py-3 rounded-full font-medium hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(208,188,255,0.3)]"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/discover"
              className="bg-surface/40 backdrop-blur-md border border-white/20 text-on-surface px-6 py-3 rounded-full font-medium hover:bg-surface/60 transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              Discover Anime
            </Link>
          </div>
        </NotFoundWaifu>
      </main>
    </div>
  );
}
