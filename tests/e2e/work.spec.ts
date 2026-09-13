import { test, expect } from '@playwright/test';

test.describe('selected work — QINIS', () => {
  test('renders the QINIS card on the homepage', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 3, name: 'QINIS' }),
    ).toBeVisible();
    await expect(
      page.getByText(/engineering intelligence for software quality/i),
    ).toBeVisible();
  });

  test('renders the architecture flow', async ({ page }) => {
    await page.goto('/');

    const flow = page.getByRole('list', { name: /qinis architecture flow/i });
    await expect(flow).toBeVisible();

    for (const stage of [
      'Development',
      'Testing',
      'Evidence',
      'Quality',
      'Decision',
    ]) {
      await expect(flow.getByText(stage)).toBeVisible();
    }
  });

  test('explore CTA navigates to the case study', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /explore qinis/i }).click();

    await expect(page).toHaveURL(/#\/work\/qinis$/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'QINIS' }),
    ).toBeVisible();
  });

  test('case study renders all nine sections', async ({ page }) => {
    await page.goto('/#/work/qinis');

    for (const title of [
      'Overview',
      'Problem',
      'Architecture',
      'Engineering Decisions',
      'Quality Model',
      'Implementation',
      'Current Status',
      'Lessons',
      'Repository',
    ]) {
      await expect(
        page.getByRole('heading', { level: 2, name: title }),
      ).toBeVisible();
    }
  });

  test('back link returns to the homepage', async ({ page }) => {
    await page.goto('/#/work/qinis');

    await page
      .getByRole('link', { name: /back to work/i })
      .first()
      .click();
    await expect(page).toHaveURL(/#\/$/);
  });
});

test.describe('selected work — BrikByteOS', () => {
  test('renders the BrikByteOS card on the homepage', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 3, name: 'BrikByteOS' }),
    ).toBeVisible();
    await expect(
      page.getByText(/release confidence from the command line/i),
    ).toBeVisible();
  });

  test('renders the terminal demonstration', async ({ page }) => {
    await page.goto('/');

    // Scope to the terminal figure. The card also contains the
    // word "tests" in the problem paragraph, which collides with
    // getByText('Tests') under Playwright's case-insensitive
    // substring matching.
    const terminal = page.getByRole('figure', {
      name: /brikbyteos terminal output/i,
    });

    await expect(terminal.getByText('bb run')).toBeVisible();
    await expect(terminal.getByText('Tests')).toBeVisible();
    await expect(terminal.getByText('Security')).toBeVisible();
    await expect(terminal.getByText('Quality')).toBeVisible();
    await expect(terminal.getByText('Evidence')).toBeVisible();
    await expect(terminal.getByText('RELEASE: PASS')).toBeVisible();
  });

  test('explore CTA navigates to the case study', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /explore brikbyteos/i }).click();

    await expect(page).toHaveURL(/#\/work\/brikbyteos$/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'BrikByteOS' }),
    ).toBeVisible();
  });

  test('case study renders all required sections', async ({ page }) => {
    await page.goto('/#/work/brikbyteos');

    for (const title of [
      'Problem',
      'Solution',
      'Architecture',
      'CLI',
      'Evidence',
      'Quality Gates',
      'CI/CD',
      'Technology',
      'Lessons',
      'GitHub',
    ]) {
      await expect(
        page.getByRole('heading', { level: 2, name: title }),
      ).toBeVisible();
    }
  });

  test('back link returns to the homepage', async ({ page }) => {
    await page.goto('/#/work/brikbyteos');

    await page
      .getByRole('link', { name: /back to work/i })
      .first()
      .click();
    await expect(page).toHaveURL(/#\/$/);
  });
});
