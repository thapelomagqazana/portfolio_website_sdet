/**
 * Contact content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §15 — Convert interest into a conversation.
 *
 * Content Integrity (NFR-013):
 *   - Only professional contact channels
 *   - No personal phone numbers, addresses, or private data
 *   - LinkedIn, GitHub and portfolio URLs must be the real
 *     public destinations
 *
 * Conversion Goals §18 — Every CTA has label, destination,
 * type, event and location.
 */

export interface ContactChannel {
  /** Stable id for anchors, test ids and display ordering. */
  id: 'email' | 'website' | 'linkedin' | 'github';
  /** Visible label. */
  label: string;
  /** Full destination: mailto:, https://, etc. */
  destination: string;
  /** Link kind. Drives target/rel attributes and sr hints. */
  kind: 'email' | 'external';
  /** Analytics event name (Conversion Goals §12). */
  event: string;
  /**
   * Optional plain-text display value for the CV. When
   * omitted, the CV derives the display from `destination`
   * (stripping mailto:, https://, www.).
   *
   * Reserved for channels whose URI and readable form differ
   * significantly — e.g. phone numbers (`tel:+27821234567`
   * displayed as `+27 82 123 4567`).
   */
  displayValue?: string;
}

export const contactHeading = "Let's build better software.";

export const contactSupporting =
  'Interested in QA Engineering, Test Automation, Quality Engineering or software reliability? Let\u2019s connect.';

/**
 * Site URL — single source of truth for the domain.
 *
 * Referenced by:
 *   - the "Portfolio" contact channel below
 *   - the CV header and footer (via CvPage)
 *   - the CV canonical link
 *
 * When switching to a custom domain, update SITE_URL here and
 * then update the static references (index.html, robots.txt,
 * sitemap.xml, and each page's CANONICAL_URL constant).
 */
export const SITE_URL = 'https://thapelomagqazana.netlify.app';
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

/**
 * Contact channels, in priority order.
 *
 * Ordering rationale (Content Inventory §15):
 *   1. Email     — the most direct channel for recruiters
 *   2. Portfolio — the primary artifact; recruiters can
 *                  browse the work before reaching out
 *   3. LinkedIn  — professional identity
 *   4. GitHub    — technical evidence
 */
export const contactChannels: readonly ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    destination: 'mailto:tapsmcgzee8@gmail.com',
    kind: 'email',
    event: 'email_click',
  },
  {
    id: 'website',
    label: 'Portfolio',
    destination: SITE_URL,
    kind: 'external',
    event: 'website_click',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    destination: 'https://www.linkedin.com/in/thapelo-magqazana-90632a174',
    kind: 'external',
    event: 'linkedin_click',
  },
  {
    id: 'github',
    label: 'GitHub',
    destination: 'https://github.com/thapelomagqazana',
    kind: 'external',
    event: 'github_click',
  },
] as const;
