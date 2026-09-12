/**
 * Typed token access — Thapelo Magqazana Engineering Portfolio
 * =============================================================
 *
 * Provides TypeScript-safe access to design tokens for cases
 * where CSS custom properties cannot be used directly:
 *
 *   - <meta name="theme-color" content={tokens.color.background} />
 *   - Chart libraries that need hex strings
 *   - Unit tests verifying tokens exist
 *   - Storybook controls
 *
 * Prefer CSS variables (var(--color-*)) in all styling code.
 * Use this module only when JS genuinely needs the value.
 *
 * References:
 *   Design System §50 — Design tokens
 *   Design System §51 — Suggested CSS token layer
 */

/** Colour tokens. Values mirror src/styles/tokens.css. */
export const colors = {
  background: '#0B0D0F',
  surface: '#111417',
  surfaceElevated: '#171B1F',
  surfaceMuted: '#0E1114',

  foreground: '#F2F4F5',
  foregroundMuted: '#A7ADB3',
  foregroundSubtle: '#737A82',

  border: '#252A30',
  borderStrong: '#333A42',

  accent: '#4F8CFF',
  accentHover: '#6FA0FF',

  success: '#3FB950',
  warning: '#D29922',
  error: '#F85149',
} as const;

/** Spacing scale in rem values (1rem = 16px by default). */
export const spacing = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '6': '1.5rem',
  '8': '2rem',
  '12': '3rem',
  '16': '4rem',
  '24': '6rem',
  '32': '8rem',
} as const;

/** Radius values in px. */
export const radius = {
  sm: '6px',
  md: '10px',
  lg: '16px',
  full: '9999px',
} as const;

/** Motion durations in milliseconds. */
export const duration = {
  instant: 80,
  fast: 120,
  base: 200,
  slow: 320,
} as const;

/**
 * Responsive breakpoints in px.
 * Aligned with Design System §37 and NFR-004.
 */
export const breakpoints = {
  mobileMin: 320,
  tabletMin: 640,
  desktopMin: 1024,
  wideMin: 1440,
} as const;

/** Z-index scale. See Design System §35 for stacking rules. */
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 100,
  header: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600,
} as const;

/** Aggregate export for convenience. */
export const tokens = {
  colors,
  spacing,
  radius,
  duration,
  breakpoints,
  zIndex,
} as const;

export type Tokens = typeof tokens;
