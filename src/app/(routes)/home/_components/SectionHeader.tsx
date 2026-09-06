import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  icon?: LucideIcon; // Add icon prop
}

export function SectionHeader({
  title,
  viewAllLink,
  icon: Icon,
}: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        <h2 className="font-headline-lg text-headline-lg text-on-surface md:font-headline-lg font-headline-lg-mobile text-headline-lg-mobile">
          {title}
        </h2>
      </div>
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
