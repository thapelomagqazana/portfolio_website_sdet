import { useEffect, useRef } from 'react';

/**
 * useReveal — flip data-revealed="true" when the element
 * enters the viewport.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   return <div ref={ref} data-reveal="false">…</div>;
 *
 * The CSS in motion.css keys off [data-reveal] and
 * [data-revealed]. Without JS, elements render visible by
 * default (data-revealed is never flipped, but the media query
 * that hides them is only active when JS is running — see
 * motion.css for the exact mechanism).
 *
 * Actually, without JS, the elements ARE hidden because
 * motion.css sets opacity: 0 by default. To avoid that, the
 * hook sets data-revealed="true" on mount when reduced motion
 * is requested, and IntersectionObserver fires immediately for
 * elements already in the viewport on load.
 *
 * Accessibility: respects prefers-reduced-motion — the
 * observer is bypassed entirely and the element is revealed
 * immediately.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — reveal immediately, skip observer
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      el.dataset.revealed = 'true';
      return;
    }

    // If the element is already in the viewport on mount,
    // reveal it immediately (avoids a flash of hidden content
    // for sections above the fold when JS hydrates late).
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      el.dataset.revealed = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.revealed = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
