"use client";

import { useEffect, useRef } from "react";

export function useLoadMoreTrigger(
  onLoadMore: () => void,
  hasMore: boolean,
  isLoading: boolean,
) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentRef = triggerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [onLoadMore, hasMore, isLoading]);

  return triggerRef;
}
