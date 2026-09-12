"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UploadZone } from "./_components/UploadZone";
import { ResultsPanel } from "./_components/ResultsPanel";
import { useScreenshotSearch } from "./_hooks/useScreenshotSearch";
import { Search, Loader2 } from "lucide-react";

export default function ScreenshotPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const { results, isLoading, error, hasSearched, search } =
    useScreenshotSearch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    if (selectedFile) {
      search(selectedFile);
    }
  };

  // Before mount: always true (matches server render)
  // After mount: depends on file selection
  const isDisabled = !mounted || !selectedFile || isLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <section className="w-full md:w-1/2 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
                Trace Scene
              </h1>
              <p className="text-on-surface-variant">
                Upload an anime screenshot to find its origin.
              </p>
            </div>

            <UploadZone
              onFileSelect={setSelectedFile}
              isSearching={isLoading}
            />

            <button
              onClick={handleSearch}
              disabled={isDisabled}
              suppressHydrationWarning
              className="w-full bg-primary text-on-primary font-medium py-4 rounded-full hover:bg-primary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {hasSearched ? "Search Again" : "Search Screenshot"}
                </>
              )}
            </button>
          </section>

          <section className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-on-surface">
              Match Results
            </h2>
            <ResultsPanel
              results={results}
              isLoading={isLoading}
              hasSearched={hasSearched}
              error={error}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
