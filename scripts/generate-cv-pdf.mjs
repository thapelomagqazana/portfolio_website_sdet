/**
 * Generate the CV PDF from the /cv route.
 *
 * Renders /cv in headless Chromium and emits a real PDF to
 * public/. This is the canonical way to produce the CV — do
 * not commit hand-saved PDFs from a browser print dialog,
 * because manual print-to-PDF has multiple failure modes
 * (background graphics off, wrong page, headers/footers on).
 *
 * Usage:
 *   npm run build
 *   npm run preview &
 *   npm run cv:generate
 *   kill %1
 *
 * Or in one command (from repo root, on macOS/Linux):
 *   npm run cv:refresh
 */
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(
  __dirname,
  '..',
  'public',
  'thapelo-magqazana-cv.pdf',
);

const TARGET_URL = process.env.CV_URL ?? 'http://localhost:4173/#/cv';

async function main() {
  console.log(`[cv] Navigating to ${TARGET_URL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

    // Wait for the CV to render (h1 with the name).
    await page.waitForSelector('h1', { timeout: 10_000 });

    // Give web fonts a moment to settle.
    await page.evaluate(() => document.fonts.ready);

    console.log(`[cv] Generating PDF → ${OUT_PATH}`);

    await page.pdf({
      path: OUT_PATH,
      format: 'A4',
      printBackground: true,
      tagged: true, // ← preserve tagged PDF structure (links)
      outline: true, // ← generate PDF bookmarks from headings
      margin: {
        top: '15mm',
        right: '20mm',
        bottom: '15mm',
        left: '20mm',
      },
    });

    // Verify the output is a real PDF (starts with %PDF-).
    const bytes = await fs.readFile(OUT_PATH);
    const header = bytes.subarray(0, 5).toString('ascii');

    if (header !== '%PDF-') {
      throw new Error(
        `Generated file is not a PDF. First 5 bytes: "${header}".`,
      );
    }

    const sizeKb = Math.round(bytes.byteLength / 1024);
    console.log(`[cv] Done. ${sizeKb} KB, header: ${header}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('[cv] Failed:', error.message);
  process.exit(1);
});
