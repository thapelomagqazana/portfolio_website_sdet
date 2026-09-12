import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

/** Helper: mock matchMedia for a given dark-mode preference. */
function mockMatchMedia(prefersDark: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: prefersDark,
    media: query,
    onchange: null,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    },
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));

  return {
    emit: (matches: boolean) => {
      listeners.forEach((cb) => cb({ matches } as MediaQueryListEvent));
    },
  };
}

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme-mode');
    mockMatchMedia(true);
  });

  it('defaults to system mode', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe('system');
  });

  it('resolves system mode to dark when the OS prefers dark', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.resolved).toBe('dark');
  });

  it('resolves system mode to light when the OS prefers light', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current.resolved).toBe('light');
  });

  it('persists the chosen mode to localStorage', () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.setMode('light'));

    expect(window.localStorage.getItem('theme')).toBe('light');
    expect(result.current.mode).toBe('light');
    expect(result.current.resolved).toBe('light');
  });

  it('reads the stored mode on mount', () => {
    window.localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe('light');
    expect(result.current.resolved).toBe('light');
  });

  it('applies data-theme to <html>', () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.setMode('light'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    act(() => result.current.setMode('dark'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('updates the resolved theme when the system preference changes in system mode', () => {
    const media = mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());

    expect(result.current.resolved).toBe('dark');

    act(() => media.emit(false));

    expect(result.current.resolved).toBe('light');
  });

  it('ignores system preference changes when not in system mode', () => {
    const media = mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());

    act(() => result.current.setMode('light'));
    act(() => media.emit(true)); // system goes dark

    expect(result.current.resolved).toBe('light'); // still light
  });
});
