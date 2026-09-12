/**
 * CTA configuration — Thapelo Magqazana Engineering Portfolio
 *
 * Conversion Goals §18 — Every CTA has:
 *   - label
 *   - destination
 *   - type (internal | external | email)
 *   - event (analytics name)
 *   - location (where it appears)
 *
 * This module is the single source of truth for hero-level
 * CTAs. Keeping it here (not inline in JSX) makes the
 * conversion contract testable and refactor-safe.
 */

export type CtaType = 'internal' | 'external' | 'email';

export interface CtaConfig {
  /** Visible label. */
  label: string;
  /** Destination URL or hash. */
  destination: string;
  /** How the link behaves. */
  type: CtaType;
  /** Analytics event name (Conversion Goals §12). */
  event: string;
  /** Where the CTA appears (Conversion Goals §13). */
  location: 'hero' | 'contact' | 'footer' | 'navigation' | 'project';
  /** Screen-reader-only suffix — appended to the accessible name. */
  srSuffix?: string;
}

/* Hero CTAs (Conversion Goals §3, §4) */

export const heroPrimaryCta: CtaConfig = {
  label: 'Explore My Work',
  destination: '#work',
  type: 'internal',
  event: 'view_work_click',
  location: 'hero',
};

export const heroSecondaryCta: CtaConfig = {
  label: 'LinkedIn',
  destination: 'https://www.linkedin.com/in/thapelo-magqazana-90632a174',
  type: 'external',
  event: 'linkedin_click',
  location: 'hero',
  srSuffix: '(opens in a new tab)',
};
