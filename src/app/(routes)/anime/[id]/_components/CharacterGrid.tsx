"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CharacterEdge {
  node: {
    id: number;
    name: {
      full: string;
    };
    image: {
      large: string;
    };
  };
  role: string;
}

interface CharacterGridProps {
  characters: CharacterEdge[];
}

export function CharacterGrid({ characters }: CharacterGridProps) {
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});

  const handleLoad = (id: number) => {
    setIsLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="mt-12 md:mt-20">
      <h2 className="font-headline-lg text-headline-md text-on-surface mb-6 border-l-4 border-primary pl-4">
        Main Characters
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {characters.slice(0, 10).map(({ node, role }) => (
          <div
            key={node.id}
            className="group relative rounded-xl overflow-hidden bg-surface-container aspect-[3/4] cursor-pointer"
          >
            <div className="relative w-full h-full">
              {isLoading[node.id] !== false && (
                <div className="absolute inset-0 bg-surface-container-high animate-pulse" />
              )}
              <Image
                src={node.image.large}
                alt={node.name.full}
                fill
                className={cn(
                  "object-cover transition-transform duration-500 group-hover:scale-110",
                  isLoading[node.id] === false ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => handleLoad(node.id)}
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-2 md:p-3 w-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="font-headline-md text-sm md:text-base text-on-surface truncate">
                {node.name.full}
              </h3>
              <p
                className={cn(
                  "font-label-sm text-label-sm",
                  role === "MAIN" ? "text-primary" : "text-secondary",
                )}
              >
                {role === "MAIN" ? "Main" : "Supporting"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
