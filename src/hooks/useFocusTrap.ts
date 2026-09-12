import { useEffect, type RefObject } from 'react';

/**
 * useFocusTrap — confine keyboard focus inside a container.
 *
 * Design System §35 — Focus must remain visible and controllable.
 * NFR-006 — Full keyboard navigation.
 *
 * While `active`, Tab and Shift+Tab cycle only through focusable
 * descendants of `containerRef`. On deactivation, focus is
 * returned to the element that was focused when the trap started.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  returnFocusRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((el) => !el.hasAttribute('aria-hidden'));

    // Move focus to the first focusable element.
    const first = getFocusable()[0];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const firstEl = focusable[0]!;
      const lastEl = focusable[focusable.length - 1]!;
      const activeEl = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeEl === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && activeEl === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus to the trigger (or the previously focused element).
      const target = returnFocusRef?.current ?? previouslyFocused;
      target?.focus();
    };
  }, [active, containerRef, returnFocusRef]);
}
