/**
 * CV content — Thapelo Magqazana Engineering Portfolio
 *
 * Single source for the /cv page. Where possible, reads from
 * existing content files (experience, education, credentials)
 * so the CV never drifts from the site.
 *
 * The CV is a condensed, one-page view. It does NOT replace
 * the site — it's a courtesy export for ATS-driven workflows
 * (Content Inventory §15, Product Brief §15).
 */

import { experience } from './experience';
import { education } from './credentials';
import { certifications } from './credentials';

export interface CvHeader {
  name: string;
  role: string;
  tagline: string;
}

export const cvHeader: CvHeader = {
  name: 'Thapelo Magqazana',
  role: 'QA Engineer · Test Automation Engineer',
  tagline: 'I build, test and automate software for confidence.',
};

export const cvSummary =
  'QA Engineer and Software Tester focused on software quality, test automation and reliable software delivery. Hands-on experience in functional, regression, API, database and usability testing, with a software-development foundation in Python, Java, C#, C++, JavaScript and SQL. Moving toward Test Automation, SDET and Quality Engineering roles.';

/**
 * Re-export the same data the site uses. This is the single
 * point of truth — never duplicate.
 */
export const cvExperience = experience;
export const cvEducation = education;
export const cvCertifications = certifications;

export const cvSkills = {
  test: ['Functional', 'Regression', 'API', 'Database', 'Usability'],
  automate: ['Playwright', 'Selenium', 'JUnit', 'Cypress'],
  build: [
    'Python',
    'Java',
    'JavaScript',
    'C#',
    'C++',
    'Go',
    'TypeScript',
    'SQL',
  ],
  deliver: [
    'Git',
    'Docker',
    'CI/CD',
    'GitHub Actions',
    'GitLab CI',
    'Azure DevOps',
  ],
} as const;
