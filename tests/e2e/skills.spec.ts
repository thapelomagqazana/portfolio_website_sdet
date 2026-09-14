import { test, expect } from '@playwright/test';

test.describe('skills', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the section heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: /what i work with, grouped by purpose/i,
      }),
    ).toBeVisible();
  });

  test('renders all four capability groups', async ({ page }) => {
    const skills = page.locator('#skills');
    for (const label of ['Test', 'Automate', 'Build', 'Deliver']) {
      await expect(
        skills.getByRole('heading', { level: 3, name: label }),
      ).toBeVisible();
    }
  });

  test('renders every capability as a tag', async ({ page }) => {
    const skills = page.locator('#skills');
    const expected = [
      'Functional',
      'Regression',
      'API',
      'Database',
      'Usability',
      'Playwright',
      'Selenium',
      'JUnit',
      'Cypress',
      'Python',
      'Java',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Git',
      'Docker',
      'CI/CD',
      'GitHub Actions',
      'GitLab CI',
      'Azure DevOps',
    ];
    for (const item of expected) {
      await expect(skills.getByText(item, { exact: true })).toBeVisible();
    }
  });

  test('contains no skill bars or percentages', async ({ page }) => {
    const skills = page.locator('#skills');
    // No ARIA progressbar anywhere in the section
    await expect(skills.locator('[role="progressbar"]')).toHaveCount(0);
    // No element displays a percentage sign
    const percentCount = await skills.locator('text=/%/').count();
    expect(percentCount).toBe(0);
  });
});
