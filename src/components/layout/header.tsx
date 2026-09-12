"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchDropdown } from "@/components/ui/SearchDropdown";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Discover", href: "/discover" },
    { label: "News", href: "/news" },
    { label: "Favorites", href: "/favorites" },
    { label: "Random", href: "/random" },
    { label: "Trace Scene", href: "/screenshot" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-black text-primary tracking-tighter"
            >
              Anime<span className="text-on-surface">Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      font-title-md text-title-md transition-colors
                      ${
                        isActive
                          ? "text-primary font-bold border-b-2 border-primary pb-1"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 p-2 rounded"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Button - Opens dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <SearchDropdown
                  isOpen={isSearchOpen}
                  onClose={() => setIsSearchOpen(false)}
                />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Slide-out Menu */}
      <div
        className={`
          md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <nav
          className={`
            absolute left-0 top-0 h-full w-72 bg-surface-container-low/95 backdrop-blur-2xl 
            border-r border-white/5 shadow-2xl transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full py-6">
            {/* Header */}
            <div className="px-6 mb-8 flex justify-between items-center">
              <div>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
                  Anime Hub
                </h2>
                <p className="text-label-sm font-label-sm pt-4 text-on-surface-variant">
                  Premium Discovery
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-xl font-body-md text-body-md transition-all
                      ${
                        isActive
                          ? "bg-primary-container text-on-primary-container"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
                      }
                    `}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {item.label === "Home" && "home"}
                      {item.label === "Discover" && "explore"}
                      {item.label === "News" && "newspaper"}
                      {item.label === "Favorites" && "favorite"}
                      {item.label === "Random" && "casino"}
                      {item.label === "Trace Scene" && "camera"}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
