import { useCallback, useEffect, useState } from 'react';

/**
 * useTheme — theme mode with system awareness and persistence.
 *
 * Task P5-03 acceptance:
 *   - Modes: dark | light | system
 *   - Persist preference in localStorage
 *   - Respect prefers-color-scheme when in system mode
 *   - Respect prefers-reduced-motion (transition handled in CSS)
 *
 * Implementation notes:
 *   - `mode` is the only piece of state we own. It's the user's
 *     explicit choice ('light' | 'dark' | 'system').
 *   - `resolved` is DERIVED during render, not stored in state.
 *     Storing it would trigger a second render on every mode
 *     change (react-hooks/set-state-in-effect).
 *   - `systemTheme` is tracked in state so that when the OS
 *     preference changes while in system mode, the component
 *     re-renders with the new resolved value.
 *   - A single effect writes the result to <html> as a
 *     side-effect, without calling setState.
 */
export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const MODES: readonly ThemeMode[] = ['light', 'dark', 'system'];

/** Detect the current system preference. */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/** Read the stored preference, defaulting to system. */
function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (MODES as readonly string[]).includes(stored)) {
      return stored as ThemeMode;
    }
  } catch {
    // localStorage may throw in private mode; fall through to system
  }
  return 'system';
}

export interface UseThemeReturn {
  /** The user's selected mode (dark / light / system). */
  mode: ThemeMode;
  /** The effective theme (always dark or light). */
  resolved: ResolvedTheme;
  /** Update the mode; persists to localStorage. */
  setMode: (next: ThemeMode) => void;
}

export function useTheme(): UseThemeReturn {
  // 1. Mode — the user's explicit choice. Persisted.
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);

  // 2. System theme — the OS preference. Tracked so that changes
  //    while in system mode re-render the component.
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  // 3. Resolved theme — DERIVED during render, not stored.
  //    This eliminates the cascading-render warning and keeps
  //    'mode' as the single source of truth.
  const resolved: ResolvedTheme = mode === 'system' ? systemTheme : mode;

  // 4. Persist mode changes and write the resolved theme to <html>.
  //    This effect performs only side-effects (localStorage +
  //    DOM attribute) — no setState — so it does not violate
  //    react-hooks/set-state-in-effect.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.dataset.themeMode = mode;
  }, [mode, resolved]);

  // 5. Subscribe to OS preference changes. Only track while in
  //    system mode to avoid unnecessary listeners.
  useEffect(() => {
    if (mode !== 'system') return;
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Silently ignore write failures (private mode, quota)
    }
  }, []);

  return { mode, resolved, setMode };
}
