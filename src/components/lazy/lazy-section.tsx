"use client";

import { useEffect, useRef, useState } from "react";

export type LazySectionProps = {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly rootMargin?: string;
};

/**
 * Loads children once the section approaches the viewport.
 */
export function LazySection({ children, fallback = null, rootMargin = "300px" }: LazySectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return <div ref={ref}>{shouldRender ? children : fallback}</div>;
}
