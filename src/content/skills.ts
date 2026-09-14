/**
 * Technical capability content — Thapelo Magqazana Engineering Portfolio
 *
 * Content Inventory §8 — Skills categories.
 *
 * Content Rule:
 *   - No skill bars
 *   - No percentage ratings
 *   - No "expert / 95%" claims without objective evidence
 *
 * Capabilities are grouped by what they are for (Test, Automate,
 * Build, Deliver), not by how well the author claims to know them.
 */

import type { LucideIcon } from 'lucide-react';
import { FlaskConical, Bot, Code2, Package } from 'lucide-react';

export interface SkillGroup {
  /** Stable id for anchors and test ids. */
  id: string;
  /** Group label shown as the group heading. */
  label: string;
  /** One-line purpose statement, shown under the label. */
  purpose: string;
  /** Icon from lucide-react. Decorative — paired with the label. */
  Icon: LucideIcon;
  /** Individual capabilities in the group. */
  items: readonly string[];
}

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'test',
    label: 'Test',
    purpose: 'Verify software behaves as intended and fails safely.',
    Icon: FlaskConical,
    items: ['Functional', 'Regression', 'API', 'Database', 'Usability'],
  },
  {
    id: 'automate',
    label: 'Automate',
    purpose: 'Make repeatable verification fast, consistent and observable.',
    Icon: Bot,
    items: [
      'Playwright',
      'Selenium',
      'JUnit',
      'Cypress',
      'Karate',
      'Trivy',
      'k6',
    ],
  },
  {
    id: 'build',
    label: 'Build',
    purpose: 'Understand systems from the code and data upwards.',
    Icon: Code2,
    items: [
      'Python',
      'Java',
      'C#',
      'C++',
      'Go',
      'JavaScript',
      'TypeScript',
      'SQL',
    ],
  },
  {
    id: 'deliver',
    label: 'Deliver',
    purpose: 'Move changes into production with confidence and evidence.',
    Icon: Package,
    items: [
      'Git',
      'Docker',
      'CI/CD',
      'GitHub Actions',
      'GitLab CI',
      'Azure DevOps',
    ],
  },
] as const;
