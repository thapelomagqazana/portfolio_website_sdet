import { test, expect } from '@playwright/test';

test.describe('certifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders both certifications with issuers', async ({ page }) => {
    const section = page.locator('#certifications');

    await expect(
      section.getByRole('heading', {
        level: 3,
        name: /ISTQB® Certified Tester — Foundation Level/i,
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', {
        level: 3,
        name: /Microsoft Certified: Azure Fundamentals/i,
      }),
    ).toBeVisible();

    // exact: true — the certification name also contains 'ISTQB®',
    // so we must match only the standalone issuer text.
    await expect(section.getByText('ISTQB®', { exact: true })).toBeVisible();
    await expect(section.getByText('Microsoft', { exact: true })).toBeVisible();
  });

  test('does not display placeholder credential IDs', async ({ page }) => {
    const section = page.locator('#certifications');
    await expect(section.locator('text=/^ID:/')).toHaveCount(0);
  });
});

test.describe('education', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders all three institutions', async ({ page }) => {
    const section = page.locator('#education');

    for (const name of ['UNISA', 'WeThinkCode_', 'Wits']) {
      await expect(
        section.getByRole('heading', { level: 3, name }),
      ).toBeVisible();
    }
  });

  test('renders every programme and date range', async ({ page }) => {
    const section = page.locator('#education');

    for (const text of [
      'BSc Computer Science & Mathematics',
      'NQF 5 Systems Development',
      'BSc Construction Studies',
      '2026 – Present',
      '2022 – 2024',
      '2017 – 2021',
    ]) {
      await expect(section.getByText(text)).toBeVisible();
    }
  });
});
