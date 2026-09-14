import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

/* =========================================================
   jsdom polyfills
   =========================================================
   jsdom implements the DOM, events and most core APIs, but
   omits browser APIs that require a rendering engine (layout,
   intersection, resize). Our components use two of them:

     - matchMedia            (useTheme, reduced-motion checks)
     - IntersectionObserver  (useReveal)

   Polyfill both here so tests can render any component in the
   codebase without a runtime error.
   ========================================================= */

/**
 * matchMedia — used by useTheme and reduced-motion checks.
 *
 * jsdom does not implement it. Returns a static
 * MediaQueryList reporting no match. Tests that need to
 * simulate a specific media state can override window.matchMedia
 * with vi.spyOn before rendering.
 */
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

/**
 * IntersectionObserver — used by useReveal to flip
 * data-revealed="true" when an element enters the viewport.
 *
 * jsdom does not implement it. This stub stores the callback
 * and exposes a `trigger()` helper so tests that need the
 * observer to fire can invoke it manually. In normal test
 * runs the callback never fires — reveal targets stay at
 * their pre-reveal state, which is fine because tests assert
 * on content, not animation state.
 *
 * The mock is registered on both `window` and `globalThis`
 * because in some test environments they are distinct objects.
 */
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    // Readonly properties required by the DOM interface
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    readonly scrollMargin: string = '';

    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe(): void {
      // No-op by default. Tests that need the observer to fire
      // can call trigger() on the instance.
    }

    unobserve(): void {
      // No-op
    }

    disconnect(): void {
      // No-op
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    /**
     * Test helper — invoke the observer callback manually.
     *
     * Not part of the IntersectionObserver interface. Only
     * available on this mock, so tests that want to simulate
     * an intersection must access the instance directly.
     */
    trigger(entries: IntersectionObserverEntry[]): void {
      this.callback(entries, this);
    }
  }

  window.IntersectionObserver = MockIntersectionObserver;
  globalThis.IntersectionObserver = MockIntersectionObserver;
}
