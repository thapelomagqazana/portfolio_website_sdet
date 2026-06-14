import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

/**
 * IntersectionObserver mock for jsdom.
 *
 * jsdom does not implement IntersectionObserver by default, but Motion's
 * whileInView feature depends on it during component tests.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "0px";
  readonly scrollMargin: string = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
  }

  disconnect(): void {}

  observe(target: Element): void {
    const rect = target.getBoundingClientRect();

    this.callback(
      [
        {
          boundingClientRect: rect,
          intersectionRatio: 1,
          intersectionRect: rect,
          isIntersecting: true,
          rootBounds: null,
          target,
          time: Date.now(),
        },
      ],
      this
    );
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
