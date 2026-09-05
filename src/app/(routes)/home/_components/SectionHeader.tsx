// src/components/home/SectionHeader.tsx
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
}

export function SectionHeader({ title, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end">
      <h2 className="font-headline-lg text-headline-lg text-on-surface md:font-headline-lg font-headline-lg-mobile text-headline-lg-mobile">
        {title}
      </h2>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="text-secondary hover:text-secondary-fixed transition-colors font-label-sm text-label-sm flex items-center gap-1"
        >
          View All
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      )}
    </div>
  );
}
