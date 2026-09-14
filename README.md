# Thapelo Magqazana — The Engineering Lab

A personal engineering portfolio demonstrating QA, test automation and
quality engineering capability through **evidence, not claims**.

- **Concept:** The Engineering Lab
- **UX principle:** Clarity → Evidence → Exploration → Trust → Action
- **Mantra:** Less portfolio. More proof.
- **Live:** [thapelo-magqazana.netlify.app](https://thapelo-magqazana.netlify.app)

---

## What this is

A single-page portfolio plus four supporting routes:

| Route              | Purpose                         |
| ------------------ | ------------------------------- |
| `/`                | Full portfolio — Hero → Contact |
| `/work/qinis`      | QINIS case study                |
| `/work/brikbyteos` | BrikByteOS case study           |
| `/insights`        | Engineering Notes index         |
| `/insights/:slug`  | Individual note                 |
| `/cv`              | Printable, one-page CV          |

The site itself is treated as a **QA artifact**: it demonstrates the
same quality discipline it claims to apply. Requirements, design,
implementation, testing and deployment are all first-class here, not
afterthoughts.

---

## Stack

| Layer         | Choice                                        |
| ------------- | --------------------------------------------- |
| Framework     | React 19                                      |
| Language      | TypeScript 6 (strict)                         |
| Build         | Vite 8                                        |
| Styling       | Tailwind CSS 4                                |
| Icons         | Lucide (UI) · Simple Icons (brand)            |
| Unit tests    | Vitest 4 · React Testing Library              |
| E2E tests     | Playwright 1.63 (6 browser/viewport projects) |
| Lint / format | ESLint 10 · Prettier 3                        |
| Git hooks     | Husky 9 · lint-staged 16 · gitleaks           |
| CI/CD         | GitHub Actions                                |
| Hosting       | Netlify                                       |
| Router        | Custom hash router (no external dep)          |

---

## Requirements

- **Node 22.13.1** (pinned in `.nvmrc`)
- **npm 11+** — Node 22's bundled npm 10 has a resolver bug that breaks installs
- **Git**

Optional:

- **gitleaks** for local secret scanning — `brew install gitleaks` / `snap install gitleaks`
- **Playwright browsers** — installed on first `npm run test:e2e`

---

## Local development

```bash
# Clone
git clone https://github.com/thapelomagqazana/portfolio_website_sdet.git
cd portfolio_website_sdet

# Install (uses the locked dependency tree)
npm ci

# Run dev server — http://localhost:5173
npm run dev
```

The dev server supports hot module replacement. Changes to `src/`
appear instantly; changes to `index.html` require a reload.

---

## Scripts

| Script                 | Purpose                                |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Vite dev server with HMR               |
| `npm run build`        | `tsc -b && vite build` → `dist/`       |
| `npm run preview`      | Serve `dist/` at http://localhost:4173 |
| `npm run lint`         | ESLint (flat config, type-aware)       |
| `npm run typecheck`    | `tsc -b --noEmit`                      |
| `npm run format`       | Prettier write                         |
| `npm run format:check` | Prettier check (used in CI)            |
| `npm run test`         | Vitest watch                           |
| `npm run test:run`     | Vitest one-shot (used in CI)           |
| `npm run test:ui`      | Vitest UI                              |
| `npm run test:e2e`     | Playwright (all projects)              |
| `npm run test:e2e:ui`  | Playwright UI mode                     |
| `npm run cv:generate`  | Regenerate the CV PDF from `/cv`       |
| `npm run cv:refresh`   | Build, preview, regenerate CV PDF      |

---

## Project structure

```text
portfolio_website_sdet/
├── .github/
│   └── workflows/
│       ├── ci.yml              # lint · typecheck · unit · e2e · build
│       └── security.yml        # gitleaks secret scan
├── docs/                       # Planning documents (see below)
├── public/                     # Static assets served at /
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _headers                # Netlify security headers
│   └── thapelo-magqazana-cv.pdf
├── scripts/
│   └── generate-cv-pdf.mjs     # Playwright PDF generator
├── src/
│   ├── components/             # All UI, grouped by concern
│   │   ├── layout/             # AppShell, Container, Section, Stack
│   │   ├── navigation/         # SiteNav, Nav, MobileMenu, ThemeToggle
│   │   ├── primitives/         # Button, Link, Badge, Tag, StatusDot
│   │   ├── typography/         # Heading, Text, Eyebrow
│   │   ├── icons/              # BrandIcons (inline SVG)
│   │   ├── hero/               # Hero, HeroActions, ProofStrip
│   │   ├── about/              # About, AboutActions
│   │   ├── work/               # SelectedWork, QinisCard, BrikByteCard
│   │   ├── projects/           # ArchitectureFlow, TerminalDemo
│   │   ├── experience/         # Experience, ExperienceItem
│   │   ├── skills/             # Skills, SkillGroup
│   │   ├── certifications/     # Certifications, Education
│   │   ├── philosophy/         # Philosophy, Principle
│   │   ├── journey/            # Journey, JourneyStage
│   │   ├── contact/            # Contact, ContactActions
│   │   └── notes/              # Markdown, NoteCard
│   ├── content/                # Typed content — single source of truth
│   │   ├── about.ts
│   │   ├── brikbyteos.ts
│   │   ├── certifications.ts
│   │   ├── contact.ts
│   │   ├── ctas.ts
│   │   ├── cv.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── journey.ts
│   │   ├── navigation.ts
│   │   ├── notes/              # Markdown articles
│   │   ├── philosophy.ts
│   │   ├── proof.ts
│   │   ├── qinis.ts
│   │   └── skills.ts
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useDocumentMeta.ts
│   │   ├── useEscapeKey.ts
│   │   ├── useFocusTrap.ts
│   │   ├── useReveal.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   ├── cn.ts               # className composition
│   │   ├── notes/              # Markdown loader + parser
│   │   └── router/             # Hash router, matchPath, Link
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── QinisPage.tsx
│   │   ├── BrikBytePage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── NotePage.tsx
│   │   └── CvPage.tsx
│   ├── styles/
│   │   ├── tokens.css          # Design tokens
│   │   ├── globals.css         # Tailwind + base layer
│   │   ├── motion.css          # Animation system
│   │   └── print.css           # Print styles for /cv
│   ├── tests/
│   │   └── setup.ts            # Vitest setup
│   ├── App.tsx                 # Router
│   └── main.tsx                # Entry point
├── tests/
│   └── e2e/                    # Playwright specs
├── .nvmrc
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── playwright.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Design system

The visual language is defined in `src/styles/tokens.css` and
consumed by every component. Key rules:

- **Two type families maximum:** Inter (sans) · JetBrains Mono
- **One accent colour** — signal, not decoration
- **No skill bars, no percentages, no fake metrics**
- **Reduced motion respected everywhere** (`prefers-reduced-motion`)
- **WCAG 2.2 AA-oriented** contrast on all surfaces, in both themes

The full design system lives in `docs/design-system.md`.

---

## Content model

Every piece of content on the site lives in `src/content/*.ts` as
typed data. Components read from those files — never from inline
strings. This means:

- Updating experience = editing `src/content/experience.ts`
- Updating contact channels = editing `src/content/contact.ts`
- Adding a note = dropping a `.md` file in `src/content/notes/`

The Contact section, the CV page, and the CV PDF all read from the
same `src/content/contact.ts` — so they never drift.

**Adding a new engineering note:**

```bash
touch src/content/notes/your-title.md
```

Front-matter:

```md
---
slug: your-title
title: Your note title
description: One-sentence summary.
date: 2026-05-01
tags: [quality, testing]
---

# Your note title

Body content in Markdown.
```

The loader picks it up at build time. No registration needed.

---

## Documentation

Planning documents live in [`/docs`](./docs):

- [Product Brief](./docs/product-brief.md) — strategic foundation
- [Content Inventory](./docs/content-inventory.md) — what goes on the page
- [Design System](./docs/design-system.md) — tokens, type, colour, motion
- [Conversion Goals](./docs/conversion-goals.md) — CTA hierarchy and analytics
- [Non-Functional Requirements](./docs/nfr.md) — quality bar
- [CV Maintenance](./docs/cv-maintenance.md) — regenerating the PDF

---

## Quality gates

Every push and PR must pass:

1. **`npm run lint`** — ESLint (type-aware, no `any`)
2. **`npm run typecheck`** — `tsc -b --noEmit`
3. **`npm run format:check`** — Prettier
4. **`npm run test:run`** — Unit and component tests
5. **`npm run build`** — Production build
6. **CV PDF check** — `public/thapelo-magqazana-cv.pdf` must be a real PDF
7. **`npm run test:e2e`** — Playwright across 6 projects
8. **gitleaks** — no committed secrets

A failing gate blocks merge. See `.github/workflows/ci.yml`.

---

## Deployment

Hosted on Netlify with continuous deployment from `main`.

**Configuration:**

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: pinned via `.nvmrc`

**Security headers** are defined in `public/_headers` and applied
by Netlify on every response.

**Prerender / routes:** The site uses a hash-based router, so no
server-side rewrite rules are required. Any URL under `/` loads
`index.html` and the client router handles the rest.

---

## Testing strategy

| Layer     | Tool                                           | Scope                                             |
| --------- | ---------------------------------------------- | ------------------------------------------------- |
| Unit      | Vitest                                         | Utility functions, hooks, content shape           |
| Component | React Testing Library                          | Primitives, sections, accessibility               |
| E2E       | Playwright                                     | Full page flows, navigation, forms, cross-browser |
| A11y      | Lighthouse (manual), Playwright keyboard tests | Focus, labels, contrast, reduced motion           |

Run everything:

```bash
npm run lint && \
npm run typecheck && \
npm run format:check && \
npm run test:run && \
npm run build && \
npm run test:e2e
```

---

## Accessibility

The portfolio targets **WCAG 2.2 AA**. Key commitments:

- **Skip link** — first focusable element on every page
- **Semantic landmarks** — `<header>`, `<main>`, `<footer>` on every route
- **Visible focus rings** — never removed, always ≥ 2px accent outline
- **Keyboard parity** — every interactive element is operable without a mouse
- **Reduced motion** — all animation is disabled under `prefers-reduced-motion`
- **Theme-aware contrast** — tokens are AA-tested in both light and dark

To verify locally:

```bash
npx lighthouse http://localhost:4173 --only-categories=accessibility --view
```

---

## Contributing

This is a personal portfolio, not a community project. But if you're
working on it locally:

1. Create a branch: `git checkout -b feat/your-change`
2. Make the change
3. Run the full quality gate locally (see above)
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
5. Push and open a PR

Pre-commit hooks run lint-staged (format + lint on staged files),
typecheck on the full project, and gitleaks on staged content.

---

## License

**Code:** MIT — see `LICENSE`.

**Content, copy, and personal data** are © Thapelo Magqazana. Do not
reproduce the CV, project case studies, or engineering notes without
permission. The MIT license applies to the codebase only, not to the
portfolio's factual content about its author.

---

## Contact

- **Email:** [tapsmcgzee8@gmail.com](mailto:tapsmcgzee8@gmail.com)
- **LinkedIn:** [linkedin.com/in/thapelo-magqazana-90632a174](https://www.linkedin.com/in/thapelo-magqazana-90632a174)
- **GitHub:** [github.com/thapelomagqazana](https://github.com/thapelomagqazana)
- **Portfolio:** [thapelo-magqazana.netlify.app](https://thapelo-magqazana.netlify.app)

> **Build. Test. Automate. Ship with confidence.**
