# Non-Functional Requirements

**Project:** Thapelo Magqazana — The Engineering Lab  
**Document:** Non-Functional Requirements  
**WBS Task:** P1-03  
**Status:** Complete  
**Version:** 1.0

---

## 1. Purpose

This document defines the non-functional requirements (NFRs) for the portfolio website.

Functional requirements describe **what the portfolio does**.

Non-functional requirements describe **how well it must work**.

The portfolio itself is intended to demonstrate engineering discipline. Therefore, quality requirements apply not only to the content and visual design, but also to:

- Performance
- Accessibility
- SEO
- Responsiveness
- Browser compatibility
- Keyboard usability
- Motion behaviour
- Build reproducibility
- Deployment reliability
- Security
- Maintainability

The guiding principle is:

> **The portfolio must demonstrate the same quality mindset that it claims to use when building and testing software.**

---

# 2. NFR Summary

| ID | Category | Target |
|---|---|---|
| NFR-001 | Performance | Lighthouse ≥ 90 target |
| NFR-002 | Accessibility | Lighthouse ≥ 90 target |
| NFR-003 | SEO | Lighthouse ≥ 90 target |
| NFR-004 | Responsive | 320px–1440px+ |
| NFR-005 | Browser | Chrome, Firefox, Edge, Safari |
| NFR-006 | Keyboard | Full navigation |
| NFR-007 | Motion | Reduced-motion support |
| NFR-008 | Build | Reproducible |
| NFR-009 | Deployment | Automated |

---

# 3. NFR-001 — Performance

## Requirement

The portfolio should provide a fast and responsive experience on modern devices and networks.

## Target

```text
Lighthouse Performance: ≥ 90
````

The target should be evaluated against a production build rather than the development server.

## Performance Targets

Where measurable, aim for:

| Metric                 |                         Target |
| ---------------------- | -----------------------------: |
| Lighthouse Performance |                           ≥ 90 |
| LCP                    |                         < 2.5s |
| CLS                    |                          < 0.1 |
| INP                    |                        < 200ms |
| Initial JavaScript     |                   Keep minimal |
| Image loading          |                      Optimised |
| Fonts                  | Minimal and efficiently loaded |

## Requirements

The implementation should:

* Use a production build for measurement.
* Avoid unnecessary JavaScript.
* Avoid unnecessarily large dependencies.
* Optimise images.
* Use responsive images where appropriate.
* Lazy-load non-critical media.
* Avoid blocking resources where possible.
* Minimise third-party scripts.
* Avoid unnecessary animation.
* Avoid loading content that is not needed immediately.

## Anti-Requirements

Do not sacrifice performance for:

* Decorative animations
* Large background videos
* Heavy 3D scenes
* Excessive JavaScript
* Unnecessary UI libraries
* Tracking scripts

## Verification

Run:

```bash
npm run build
```

Then evaluate the deployed production site with Lighthouse.

---

# 4. NFR-002 — Accessibility

## Requirement

The portfolio must be usable by people with different abilities and assistive technologies.

## Target

```text
Lighthouse Accessibility: ≥ 90
```

The engineering target should also be:

```text
WCAG 2.2 AA-oriented
```

The Lighthouse score is a useful signal, but passing Lighthouse alone does not guarantee accessibility.

## Requirements

### Semantic HTML

Use appropriate elements:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

rather than using generic `<div>` elements for everything.

### Headings

Maintain a logical heading hierarchy:

```text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

There should normally be one primary H1 representing the page's main identity.

### Images

Meaningful images must have useful alternative text.

Decorative images should not create unnecessary screen-reader noise.

### Links

Links must communicate their destination.

Avoid:

```text
Click here
```

Prefer:

```text
View BrikByteOS on GitHub
```

### Forms

If a contact form is implemented:

* Every field must have a label.
* Validation errors must be understandable.
* Errors must be associated with the relevant fields.
* Keyboard users must be able to complete the form.
* Focus must remain visible.

### Contrast

Text and interactive elements must maintain sufficient contrast.

### Focus

Interactive elements must have a visible focus state.

### Screen Readers

Important content must remain understandable when visual styling is removed.

## Verification

Use:

* Lighthouse
* Browser accessibility tools
* Keyboard-only testing
* Screen-reader spot checks
* Automated accessibility tests where practical

---

# 5. NFR-003 — SEO

## Requirement

The portfolio must be discoverable by search engines and correctly represented when shared.

## Target

```text
Lighthouse SEO: ≥ 90
```

## Requirements

The site should provide:

* Descriptive `<title>`
* Meta description
* Correct heading structure
* Semantic HTML
* Crawlable links
* Canonical URL where appropriate
* Open Graph metadata
* Social sharing metadata
* Descriptive page content
* `robots.txt`
* Sitemap where appropriate
* Valid URLs
* Mobile-friendly layout

## Primary Search Identity

The website should clearly communicate:

```text
Thapelo Magqazana
QA Engineer
Software Tester
Test Automation Engineer
Quality Engineering
```

## SEO Content Principle

SEO must not result in keyword stuffing.

The content should be written for humans first.

## Verification

Run:

```text
Lighthouse SEO
```

and validate important metadata using browser and search-engine tooling where appropriate.

---

# 6. NFR-004 — Responsive Design

## Requirement

The portfolio must provide a usable experience across small mobile screens through large desktop displays.

## Target

```text
320px – 1440px+
```

The layout must not assume a single screen size.

## Minimum Width

```text
320px
```

The interface must remain usable at this width without:

* Horizontal scrolling caused by the site layout
* Overlapping content
* Unusable navigation
* Truncated critical information

## Desktop

The design must remain readable and balanced at:

```text
1440px+
```

Large screens must not result in excessive line lengths or large empty areas.

## Responsive Principles

Use:

* Fluid layouts
* Responsive typography
* Flexible grids
* Relative spacing
* Responsive images
* CSS media queries
* Appropriate content reflow

Avoid:

* Fixed-width layouts
* Absolute positioning for primary page structure
* Device-specific hacks
* Separate desktop/mobile implementations unless necessary

## Suggested Test Widths

```text
320px
375px
390px
768px
1024px
1280px
1440px
1920px
```

## Verification

Test using:

* Browser responsive mode
* Real mobile devices where available
* Playwright viewport testing

---

# 7. NFR-005 — Browser Compatibility

## Requirement

The portfolio must work correctly in modern versions of the major browsers.

## Supported Browsers

```text
Chrome
Firefox
Microsoft Edge
Safari
```

## Platforms

Testing should prioritise:

```text
Windows
macOS
Android
iOS
```

where practical.

## Requirements

The following must work consistently:

* Navigation
* Responsive layout
* Buttons
* Links
* Animations
* Forms
* External links
* Project interactions
* Keyboard navigation
* Content rendering

## Browser Strategy

The portfolio should target modern evergreen browsers rather than legacy browsers.

Do not introduce polyfills or compatibility dependencies unless there is a demonstrated need.

## Verification Matrix

| Browser | Desktop  | Mobile   |
| ------- | -------- | -------- |
| Chrome  | Required | Required |
| Firefox | Required | —        |
| Edge    | Required | —        |
| Safari  | Required | Required |

---

# 8. NFR-006 — Keyboard Navigation

## Requirement

All important functionality must be usable without a mouse.

## Target

```text
100% of interactive functionality keyboard accessible
```

## Requirements

Users must be able to:

* Navigate links using `Tab`
* Navigate backwards using `Shift + Tab`
* Activate controls using keyboard input
* See the current focus position
* Escape dismissible overlays where applicable
* Navigate the entire primary experience without a mouse

## Focus Order

Focus order must follow the logical visual and content order.

Example:

```text
Navigation
    ↓
Hero CTA
    ↓
Work
    ↓
Experience
    ↓
Skills
    ↓
Contact
    ↓
Social links
```

## Focus Visibility

Never remove focus styling without providing an equivalent visible state.

Avoid:

```css
outline: none;
```

unless an accessible replacement is implemented.

## Verification

Perform a complete keyboard-only walkthrough:

```text
Mouse disabled
        ↓
Start at page load
        ↓
Press Tab
        ↓
Navigate through all controls
        ↓
Activate important actions
        ↓
Reach footer
```

---

# 9. NFR-007 — Motion

## Requirement

Animations must enhance comprehension and interaction rather than distract from content.

The portfolio must respect the user's operating-system preference for reduced motion.

## Requirement

Support:

```css
@media (prefers-reduced-motion: reduce)
```

## Reduced Motion Behaviour

When reduced motion is enabled:

* Disable non-essential animations.
* Reduce transition duration.
* Remove large movement effects.
* Avoid parallax.
* Avoid continuous decorative animation.
* Preserve essential state changes through non-motion cues.

## Example

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

This implementation should be reviewed rather than blindly applied to every interaction.

## Design Principle

```text
Motion communicates.
Motion does not decorate.
```

The portfolio should remain fully understandable with motion disabled.

## Verification

Test both:

```text
Reduced Motion OFF
Reduced Motion ON
```

---

# 10. NFR-008 — Reproducible Build

## Requirement

The project must produce a predictable production build from a clean environment.

## Target

A clean checkout should be capable of producing the same application build using the documented project configuration.

## Requirements

The repository must contain:

```text
package.json
package-lock.json
```

or the equivalent lockfile for the selected package manager.

Dependencies must be explicitly declared.

The build must not depend on:

* Developer-specific global packages
* Undocumented environment variables
* Local filesystem paths
* Untracked files
* Manual build steps
* Developer-specific configuration

## Expected Flow

```text
Clean checkout
      ↓
Install locked dependencies
      ↓
Run validation
      ↓
Run tests
      ↓
Build
      ↓
Production artifact
```

## Example Commands

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

The exact scripts may evolve during implementation, but the workflow must remain deterministic.

## Environment Variables

If environment variables are required:

* Document them.
* Provide safe example values where appropriate.
* Never commit secrets.
* Fail clearly when required configuration is missing.

## Verification

A clean CI environment must successfully execute the build.

---

# 11. NFR-009 — Automated Deployment

## Requirement

Deployment must be automated through version-controlled CI/CD.

## Target

```text
Git push
    ↓
CI
    ↓
Quality checks
    ↓
Build
    ↓
Deployment
```

## Minimum Pipeline

The deployment pipeline should perform:

```text
Install dependencies
        ↓
Lint
        ↓
Type check
        ↓
Unit/component tests
        ↓
Production build
        ↓
Deploy
```

End-to-end tests should be included where practical.

## Quality Gate

Deployment should not proceed when required quality checks fail.

Example:

```text
Lint       ✓
Typecheck  ✓
Tests      ✓
Build      ✓
           │
           ▼
        DEPLOY
```

Failure:

```text
Tests      ✗
           │
           ▼
      DEPLOY BLOCKED
```

## Deployment Platform

The initial deployment may use:

```text
Netlify
```

or another suitable static hosting provider.

The deployment provider is an implementation detail.

The requirement is:

> **Deployment must be automated and reproducible.**

---

# 12. NFR-010 — Security Baseline

Although not included in the original minimum NFR table, security is required because the portfolio is a publicly accessible website.

## Requirements

The site must:

* Never expose secrets.
* Never commit API keys.
* Avoid unnecessary collection of personal information.
* Use HTTPS in production.
* Minimise third-party dependencies.
* Keep dependencies updated.
* Avoid unsafe HTML injection.
* Use secure external-link behaviour where appropriate.
* Apply appropriate security headers where supported by the hosting platform.

## Contact Data

Only intentionally public professional contact information should be displayed.

Do not expose:

* Passwords
* Tokens
* Private API keys
* Internal company information
* Private documents
* Sensitive personal information

---

# 13. NFR-011 — Maintainability

The portfolio is an engineering project and must remain maintainable as content grows.

## Requirements

The implementation should:

* Use TypeScript strict mode.
* Use reusable components.
* Keep content separate from presentation where practical.
* Avoid unnecessary duplication.
* Use consistent naming.
* Keep components focused.
* Keep dependencies minimal.
* Document important architectural decisions.

## Preferred Principle

```text
Simple enough to understand.
Structured enough to evolve.
```

---

# 14. NFR-012 — Reliability

The portfolio should remain functional when individual non-critical enhancements fail.

## Requirements

Core content must not depend on:

* JavaScript animations
* Third-party analytics
* External fonts
* External APIs
* Optional embeds

If a non-critical external service fails, the primary portfolio experience should remain usable.

## Graceful Degradation

Example:

```text
Animation fails
    ↓
Content still visible

Analytics fails
    ↓
Website still works

External image fails
    ↓
Layout remains stable

JavaScript enhancement fails
    ↓
Core navigation/content remains usable where practical
```

---

# 15. NFR-013 — Content Integrity

The portfolio must maintain factual accuracy.

## Requirements

The website must not contain invented:

* Employment history
* Qualifications
* Certifications
* Client relationships
* Users
* Revenue
* Product adoption
* Performance results
* GitHub metrics
* Business outcomes

Professional experience and personal projects must remain clearly separated.

## Principle

```text
If it cannot be supported,
do not claim it.
```

---

# 16. Quality Gates

The portfolio should eventually enforce the following quality gates:

```text
                 CODE
                   │
                   ▼
                LINTING
                   │
                   ▼
              TYPE CHECK
                   │
                   ▼
                 TESTS
                   │
                   ▼
              PRODUCTION
                 BUILD
                   │
                   ▼
              E2E / SMOKE
                   │
                   ▼
             LIGHTHOUSE
                   │
                   ▼
              DEPLOYMENT
```

A failure in a required gate should block deployment.

---

# 17. NFR Verification Matrix

| NFR               | Requirement                | Verification                       |
| ----------------- | -------------------------- | ---------------------------------- |
| Performance       | Lighthouse ≥90             | Lighthouse CI/manual               |
| Accessibility     | Lighthouse ≥90             | Lighthouse + accessibility testing |
| SEO               | Lighthouse ≥90             | Lighthouse + metadata inspection   |
| Responsive        | 320px–1440px+              | Browser + Playwright               |
| Browser           | Chrome/Firefox/Edge/Safari | Cross-browser testing              |
| Keyboard          | Full navigation            | Manual keyboard test + E2E         |
| Motion            | Reduced-motion support     | Browser accessibility setting      |
| Build             | Reproducible               | Clean CI build                     |
| Deployment        | Automated                  | CI/CD pipeline                     |
| Security          | No exposed secrets         | Repository + build inspection      |
| Maintainability   | Structured code            | Code review + lint/type checks     |
| Reliability       | Graceful degradation       | Failure/disablement testing        |
| Content Integrity | Accurate claims            | Content review                     |

---

# 18. Priority Classification

## P0 — Release Blocking

The following are release-blocking:

```text
Performance
Accessibility
Responsive behaviour
Browser compatibility
Keyboard navigation
Build reliability
Deployment reliability
Security baseline
Content integrity
```

## P1 — Important

```text
SEO
Reduced-motion support
Maintainability
Reliability improvements
```

## P2 — Optimisation

Future improvements may include:

```text
Advanced performance optimisation
Automated visual regression
Extended accessibility testing
Real-user monitoring
Privacy-conscious analytics
Advanced SEO
```

---

# 19. Acceptance Criteria

## AC-01 — Performance

**Requirement:**

```text
Lighthouse Performance ≥ 90 target
```

**Status:** Defined

---

## AC-02 — Accessibility

**Requirement:**

```text
Lighthouse Accessibility ≥ 90 target
```

**Status:** Defined

---

## AC-03 — SEO

**Requirement:**

```text
Lighthouse SEO ≥ 90 target
```

**Status:** Defined

---

## AC-04 — Responsive

**Requirement:**

```text
320px–1440px+
```

**Status:** Defined

---

## AC-05 — Browser

**Requirement:**

```text
Chrome
Firefox
Edge
Safari
```

**Status:** Defined

---

## AC-06 — Keyboard

**Requirement:**

All important interactive functionality must be keyboard accessible.

**Status:** Defined

---

## AC-07 — Motion

**Requirement:**

The portfolio must respect:

```text
prefers-reduced-motion
```

**Status:** Defined

---

## AC-08 — Build

**Requirement:**

The production build must be reproducible from a clean environment using locked dependencies.

**Status:** Defined

---

## AC-09 — Deployment

**Requirement:**

Production deployment must be automated through CI/CD.

**Status:** Defined

---

# 20. Definition of Done

P1-03 is complete when:

* [x] Performance requirements are defined.
* [x] Accessibility requirements are defined.
* [x] SEO requirements are defined.
* [x] Responsive requirements are defined.
* [x] Browser requirements are defined.
* [x] Keyboard requirements are defined.
* [x] Reduced-motion requirements are defined.
* [x] Reproducible-build requirements are defined.
* [x] Automated-deployment requirements are defined.
* [x] Security baseline is defined.
* [x] Maintainability requirements are defined.
* [x] Reliability requirements are defined.
* [x] Content integrity requirements are defined.
* [x] Verification methods are defined.
* [x] Quality gates are defined.
* [x] Acceptance criteria are documented.

---

# 21. Final NFR Principle

The portfolio is itself a demonstration of engineering quality.

Therefore:

```text
FAST
  +
ACCESSIBLE
  +
RESPONSIVE
  +
TESTABLE
  +
REPRODUCIBLE
  +
SECURE
  +
AUTOMATED
  =
CREDIBLE ENGINEERING PORTFOLIO
```

The objective is not to achieve high scores for their own sake.

The objective is:

> **Build a portfolio that is fast, accessible, reliable and maintainable — and use the engineering process itself as evidence of quality.**
