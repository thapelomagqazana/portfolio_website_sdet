import { useEffect } from 'react';

/**
 * useEscapeKey — invoke a handler when Escape is pressed.
 *
 * Design System §35 — Escape must dismiss overlays.
 * NFR-006 — Keyboard operability.
 *
 * The handler runs only when `enabled` is true, so the listener
 * is not attached while the menu is closed.
 */
export function useEscapeKey(enabled: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onEscape]);
}
