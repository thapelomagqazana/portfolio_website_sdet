# Thapelo Magqazana — SDET Portfolio v2.0

[![Portfolio CI](https://github.com/thapelomagqazana/portfolio_website_sdet/actions/workflows/ci.yml/badge.svg)](https://github.com/thapelomagqazana/portfolio_website_sdet/actions/workflows/ci.yml)

A production-grade engineering portfolio showcasing software quality, release engineering, test automation, systems thinking, and **BrikByteOS — Release Confidence Infrastructure**.

The portfolio is intentionally engineered as a real-world software system rather than a static personal website. Every architectural decision reflects the same quality principles used to build enterprise software.

---

# Overview

This portfolio demonstrates my work as a **Software Development Engineer in Test (SDET)** with a focus on:

- Quality Engineering
- Test Automation
- Release Engineering
- CI/CD
- Software Architecture
- Systems Thinking
- Release Confidence
- BrikByteOS

Instead of presenting projects as isolated examples, the portfolio presents an engineering narrative that explains how software quality, architecture, testing, and release confidence fit together.

---

# Engineering Philosophy

> Software should not ship because we hope it works.

> Software should ship because engineering evidence proves it is ready.

The portfolio applies the same philosophy throughout:

- evidence over assumptions
- automation over manual repetition
- maintainability over cleverness
- measurable quality over subjective confidence

---

# Technology Stack

## Framework

- Next.js 16
- React 19
- TypeScript

## Styling

- Tailwind CSS v4
- Design Tokens
- CSS Variables

## Motion

- Motion (Framer Motion successor)

## Content

- MDX
- Engineering Intelligence articles
- Structured metadata

## Quality

- Vitest
- Testing Library
- ESLint
- Prettier

## Tooling

- pnpm
- Husky
- lint-staged

---

# Architecture

```text
src/
│
├── app/
├── components/
├── sections/
├── hooks/
├── lib/
├── data/
├── styles/
└── tests/

content/
└── articles/

docs/

scripts/
```

The project follows a feature-oriented architecture with centralized data, reusable utilities, and strongly typed content models.

---

# Portfolio Sections

- Opening Sequence
- Hero
- Mission Profile
- Skills Matrix
- BrikByteOS Showcase
- Projects
- Experience Timeline
- Engineering Intelligence
- Contact
- Footer

---

# Engineering Intelligence

The portfolio includes long-form technical writing covering topics such as:

- Release Engineering
- Quality Engineering
- Test Automation
- Software Architecture
- Systems Thinking
- BrikByteOS

Articles are written as engineering field guides rather than traditional blog posts.

---

# BrikByteOS

BrikByteOS is my flagship engineering project.

It is **Release Confidence Infrastructure**.

Instead of asking:

> "Did the tests pass?"

BrikByteOS asks:

> "Do we have enough engineering evidence to release confidently?"

Core ideas include:

- Evidence Normalization
- Quality Gates
- Release Confidence
- Engineering Reports
- Policy Evaluation
- Adapter Architecture

---

# Performance

The portfolio is engineered to achieve excellent Core Web Vitals.

Performance targets include:

| Metric         |  Target |
| -------------- | ------: |
| Performance    |     ≥95 |
| Accessibility  |     ≥95 |
| Best Practices |     ≥95 |
| SEO            |     ≥95 |
| LCP            |  <2.5 s |
| CLS            |    <0.1 |
| INP            | <200 ms |

Animations are optimized using:

- GPU-friendly transforms
- Lazy loading
- Reduced motion support
- Intersection activation
- Stable rendering
- Motion performance budgets

---

# SEO

The project includes:

- OpenGraph
- Twitter Cards
- JSON-LD
- Sitemap
- Robots
- Canonical URLs
- Structured Metadata

---

# Accessibility

Accessibility is treated as an engineering requirement.

Features include:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Focus indicators
- WCAG AA colour contrast
- Reduced motion support
- Accessible MDX content

---

# Quality Standards

Every change is validated through automated checks.

Validation includes:

- Formatting
- Linting
- Type checking
- Unit tests
- Component tests
- Build validation

Local verification:

```bash
pnpm verify
```

---

# Continuous Integration

GitHub Actions validates every push and pull request.

Pipeline stages:

1. Install dependencies
2. Generate design tokens
3. Verify generated assets
4. Format check
5. Lint
6. Type check
7. Tests
8. Production build

A merge is blocked whenever any validation fails.

---

# Getting Started

## Clone

```bash
git clone https://github.com/<owner>/<repo>.git
```

```bash
cd <repo>
```

## Install

```bash
pnpm install
```

## Start Development

```bash
pnpm dev
```

## Run Tests

```bash
pnpm test
```

## Type Check

```bash
pnpm typecheck
```

## Lint

```bash
pnpm lint
```

## Build

```bash
pnpm build
```

## Full Verification

```bash
pnpm verify
```

---

# Project Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Development server           |
| `pnpm build`     | Production build             |
| `pnpm start`     | Start production server      |
| `pnpm lint`      | ESLint                       |
| `pnpm format`    | Format source                |
| `pnpm typecheck` | TypeScript validation        |
| `pnpm test`      | Run tests                    |
| `pnpm verify`    | Complete validation pipeline |

---

# Engineering Principles

The portfolio follows these principles:

- Single Responsibility
- Composition over duplication
- Strong typing
- Data-driven UI
- Accessibility by default
- Performance-first engineering
- Production-ready architecture
- Testability
- Maintainability
- Long-term scalability

---

# Roadmap

Future enhancements include:

- Interactive architecture explorer
- BrikByteOS live demo
- Dark/light theme
- Engineering search
- MDX syntax highlighting
- RSS feed
- Analytics dashboard
- Internationalisation
- Portfolio CMS

---

# Documentation

Additional documentation is available in the `docs/` directory.

Topics include:

- Architecture
- Motion System
- Performance
- SEO
- CI/CD
- Release Gate
- Design Tokens

---

# License

This repository is licensed under the MIT License.

---

# Author

**Thapelo Magqazana**

Software Development Engineer in Test

Quality Engineer

Release Engineer

Creator of **BrikByteOS — Release Confidence Infrastructure**

> Building confidence into every release.
