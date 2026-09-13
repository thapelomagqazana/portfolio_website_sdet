/**
 * About content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §6 — About section covers:
 *   1. QA experience
 *   2. Development background
 *   3. Current studies
 *   4. Career direction
 *
 * Each pillar is discrete so it can evolve without
 * restructuring the section. The narrative is written as
 * standalone paragraphs, not bullet points — bullets feel
 * like a resume, paragraphs feel like a story
 * (Design System §12, §40).
 */

export interface AboutPillar {
  /** Short label used as a subheading. */
  label: string;
  /** Narrative paragraph. */
  body: string;
}

export const aboutHeading = 'Engineering quality, not just finding bugs.';

export const aboutIntro =
  'I approach testing as an engineering discipline — understanding systems, questioning assumptions, and building evidence that teams can act on.';

export const aboutPillars: readonly AboutPillar[] = [
  {
    label: 'QA experience',
    body: 'Hands-on experience in functional, regression, API, database and usability testing, with defect management, requirements validation and CI/CD exposure.',
  },
  {
    label: 'Development background',
    body: 'A software-development foundation in Python, Java, JavaScript and SQL that lets me understand systems beyond the UI and work effectively with developers.',
  },
  {
    label: 'Current studies',
    body: 'Studying toward a BSc in Computer Science and Mathematics at UNISA, building deeper foundations in algorithms, systems and formal reasoning.',
  },
  {
    label: 'Career direction',
    body: 'Moving toward Test Automation, SDET and Quality Engineering roles where testing is treated as an engineering function rather than a final verification step.',
  },
] as const;

/**
 * CTA configuration (Conversion Goals §18).
 *
 * `destination` matches the section id used by the Career
 * Journey section so the link scrolls to it.
 */
export const aboutCta = {
  label: 'More about my journey',
  destination: '#career',
  event: 'about_journey_click',
  location: 'about' as const,
};
