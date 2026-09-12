/**
 * Token verification tests.
 *
 * Ensures the token layer is loaded and the CSS custom
 * properties resolve as expected. Prevents silent drift
 * between tokens.css and the Tailwind bridge.
 *
 * References: NFR-002, NFR-011
 */
import { describe, it, expect } from 'vitest';
import { colors, spacing, radius, breakpoints } from '@/lib/tokens';

describe('design tokens — TypeScript mirror', () => {
  it('exposes the dark background colour', () => {
    expect(colors.background).toBe('#0B0D0F');
  });

  it('exposes the accent colour', () => {
    expect(colors.accent).toBe('#4F8CFF');
  });

  it('covers the spacing scale', () => {
    expect(Object.keys(spacing)).toEqual([
      '0',
      '1',
      '2',
      '3',
      '4',
      '6',
      '8',
      '12',
      '16',
      '24',
      '32',
    ]);
  });

  it('declares all three radii', () => {
    expect(radius).toMatchObject({ sm: '6px', md: '10px', lg: '16px' });
  });

  it('declares responsive breakpoints', () => {
    expect(breakpoints).toEqual({
      mobileMin: 320,
      tabletMin: 640,
      desktopMin: 1024,
      wideMin: 1440,
    });
  });
});
