"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [{ label: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-variant mt-stack-lg">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="font-title-md text-title-md font-bold text-secondary">
            Anime Hub
          </div>

          {/* Copyright */}
          <div className="text-label-sm font-label-sm text-on-surface-variant text-center order-3 md:order-2">
            © {currentYear} Anime Hub by Pizi dev. All rights reserved.
          </div>

          {/* Links - Stack on mobile, row on desktop */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 order-2 md:order-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-sm text-label-sm text-on-surface-variant hover:text-secondary hover:underline decoration-secondary transition-all opacity-80 hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
