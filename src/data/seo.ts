/**
 * Central SEO configuration.
 */
export const siteSeo = {
  siteName: "Thapelo Magqazana",
  title: "Thapelo Magqazana | Software Development Engineer in Test",
  titleTemplate: "%s | Thapelo Magqazana",
  description:
    "Software Development Engineer in Test specializing in Quality Engineering, Test Automation, Release Engineering, and creator of BrikByteOS.",
  url: "https://thapelomagqazana.com",
  locale: "en_ZA",
  language: "en",
  region: "ZA",
  author: "Thapelo Magqazana",
  creator: "Thapelo Magqazana",
  publisher: "BrikByte Studios",
  themeColor: "#00d4ff",
  previewImage: "/og-image.jpeg",
  twitterHandle: "@tapsmcgzee8",
} as const;

export const coreSeoKeywords = [
  "Software Development Engineer in Test",
  "SDET",
  "Quality Engineering",
  "Test Automation",
  "Release Engineering",
  "Release Confidence",
  "BrikByteOS",
  "Quality Gates",
  "Software Testing",
  "Continuous Integration",
  "CI/CD",
  "Developer Productivity",
  "Engineering Systems",
  "Playwright",
  "Vitest",
  "Performance Testing",
  "Security Testing",
] as const;

export const seoRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/engineering/release-confidence", priority: 0.8, changeFrequency: "monthly" },
  { path: "/engineering/quality-gates", priority: 0.8, changeFrequency: "monthly" },
  { path: "/engineering/playwright-best-practices", priority: 0.7, changeFrequency: "monthly" },
  { path: "/engineering/architecture-thinking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/engineering/brikbyteos-introduction", priority: 0.8, changeFrequency: "monthly" },
] as const;
