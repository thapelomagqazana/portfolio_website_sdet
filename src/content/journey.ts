/**
 * Career Journey content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §13 — Transition from construction into
 * software and the long-term engineering direction.
 *
 * Content Integrity (Product Brief §24):
 *   - Stages before "Software Testing" are education and
 *     exploration, not employment
 *   - "QA Engineering", "Test Automation" and "Quality
 *     Engineering" describe direction and current focus,
 *     not claimed seniority
 *   - The narrative must not overstate experience
 */

export interface JourneyStage {
  /** Stable id for anchors and test ids. */
  id: string;
  /** Short label shown on the timeline. */
  label: string;
  /** One-line description. */
  description: string;
  /**
   * 'past'     — completed (education, prior roles)
   * 'present'  — current position or study
   * 'future'   — direction / growth target
   */
  status: 'past' | 'present' | 'future';
}

export const journeyStages: readonly JourneyStage[] = [
  {
    id: 'construction',
    label: 'Construction',
    description:
      'BSc Construction Studies — an engineering mindset around planning and systems.',
    status: 'past',
  },
  {
    id: 'systems-development',
    label: 'Systems Development',
    description:
      'NQF 5 at WeThinkCode_ — programming and software systems foundations.',
    status: 'past',
  },
  {
    id: 'software-testing',
    label: 'Software Testing',
    description:
      'Hands-on QA roles across functional, regression and database testing.',
    status: 'past',
  },
  {
    id: 'qa-engineering',
    label: 'QA Engineering',
    description:
      'Current focus — building quality into the delivery pipeline, not just verifying outputs.',
    status: 'present',
  },
  {
    id: 'test-automation',
    label: 'Test Automation',
    description:
      'Growth direction — automated test frameworks, CI/CD integration and tooling.',
    status: 'future',
  },
  {
    id: 'quality-engineering',
    label: 'Quality Engineering',
    description:
      'Long-term direction — quality as an engineering discipline across the lifecycle.',
    status: 'future',
  },
] as const;

/**
 * Task P13-02 — the narrative that ties the stages together.
 *
 * Content Inventory §13 — construction → software development
 * → testing → QA engineering → test automation → quality
 * engineering.
 */
export const journeyNarrative = [
  'Construction taught me to think about systems and process. Software development taught me how systems are built. Testing taught me how systems fail. Computer Science is helping me understand the foundations underneath them.',
] as const;
