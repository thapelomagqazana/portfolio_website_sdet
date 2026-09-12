# Design System

**Project:** Thapelo Magqazana — The Engineering Lab  
**Document:** Design Concept, System and Theme  
**WBS Task:** P1-05  
**Status:** Complete  
**Version:** 1.0

---

# 1. Design Concept

## 1.1 Concept Name

# THAPELO — THE ENGINEERING LAB

The portfolio is designed as a personal engineering lab.

It is not:

- A résumé with animations
- A developer dashboard
- A SaaS landing page
- A cyberpunk terminal
- A collection of project cards

It is:

> A personal engineering lab demonstrating how Thapelo builds, tests, automates and thinks about software.

The website should make the engineer visible behind the work.

---

# 2. Design Objective

The design exists to increase:

```text
CLARITY
   +
CREDIBILITY
   +
EVIDENCE
   +
PERSONALITY
````

The primary design question is:

> Can a recruiter understand what Thapelo does within seconds, then discover enough evidence to trust his technical ability?

If a visual treatment does not contribute to that objective, it should be questioned.

---

# 3. Design Principles

## Principle 01 — Clarity Before Cleverness

The interface must be understandable before it becomes interesting.

Avoid designs that require visitors to learn how the website works.

---

## Principle 02 — Evidence Before Explanation

Use:

```text
SHOW
 ↓
EXPLAIN
 ↓
DEEP DIVE
```

Example:

```text
Pipeline
   ↓
What it does
   ↓
Architecture / implementation
```

---

## Principle 03 — Content Before Decoration

Every visual element must do at least one of the following:

```text
EXPLAIN
PROVE
ORIENT
DELIGHT
```

If it does none of these:

> Remove it.

---

## Principle 04 — Thapelo Is the Product

The hierarchy is:

```text
THAPELO
   ↓
PROFESSIONAL CAPABILITY
   ↓
PROOF
   ↓
PROJECTS
```

Not:

```text
QINIS
   ↓
BrikByteOS
   ↓
Thapelo
```

QINIS and BrikByteOS are proof of engineering capability.

They are not the personal brand.

---

## Principle 05 — Calm Confidence

The interface should feel confident without shouting.

Avoid:

* Excessive gradients
* Neon
* Giant animations
* Loud effects
* Artificial urgency
* Excessive visual noise

Desired feeling:

> "This engineer is serious about quality."

---

# 4. Brand Personality

The design personality is:

| Attribute    | Expression                            |
| ------------ | ------------------------------------- |
| Technical    | Code, systems, architecture           |
| Precise      | Grid, spacing, typography             |
| Intelligent  | Clear information hierarchy           |
| Human        | Photography and personal narrative    |
| Confident    | Strong typography and concise copy    |
| Approachable | Warm language and simple interactions |
| Experimental | Engineering Lab concept               |
| Reliable     | Consistency and predictable behaviour |

---

# 5. Visual Direction

## Editorial Minimalism × Developer Tooling

The visual language combines two worlds.

### Editorial

```text
Large typography
Generous whitespace
Strong hierarchy
Short paragraphs
Careful composition
```

### Developer Tooling

```text
Code
Terminal output
System diagrams
Status indicators
Technical metadata
Quality signals
```

Neither should dominate.

The intended balance is:

```text
EDITORIAL
     +
ENGINEERING
     =
THAPELO
```

---

# 6. Theme

## Primary Theme

The default theme is:

> **Dark Technical Minimalism**

The background should be near-black rather than pure black.

Example conceptual palette:

```text
Background
#0B0D0F

Surface
#111417

Elevated Surface
#171B1F

Primary Text
#F2F4F5

Secondary Text
#A7ADB3

Muted Text
#737A82

Border
#252A30
```

These values are starting tokens, not immutable colours.

---

# 7. Accent System

Use one primary brand accent.

The accent represents:

```text
SIGNAL
   ↓
QUALITY
   ↓
CONFIDENCE
```

The accent should be used for:

* Primary CTA
* Links
* Focus states
* Selected states
* Important metadata
* Interactive indicators

It should not cover large portions of the interface.

## Accent Rule

```text
Accent = signal
Not
Accent = decoration
```

---

# 8. Semantic Colour System

Colours must communicate meaning.

```text
NEUTRAL
Information

ACCENT
Interaction / focus

SUCCESS
Quality passed

WARNING
Risk / attention

ERROR
Failure / defect
```

Example conceptual tokens:

```text
--color-info
--color-focus
--color-success
--color-warning
--color-error
```

The exact values should be chosen after contrast testing.

---

# 9. Colour Usage Rules

## Background

Use the darkest colours for:

* Page background
* Large structural areas

## Surface

Use slightly lighter colours for:

* Project modules
* Experience items
* Technical panels

## Borders

Use subtle borders instead of excessive shadows.

## Accent

Reserve the accent for meaningful signals.

## Semantic Colours

Never use success/warning/error colours purely because they look attractive.

A green indicator should mean:

> Something passed.

A red indicator should mean:

> Something failed.

This makes the colour system itself part of the engineering story.

---

# 10. Typography

Use a maximum of two font families.

## Primary

```text
Inter / Geist
```

Used for:

* Headings
* Body
* Navigation
* Buttons
* UI

## Technical

```text
JetBrains Mono
```

Used for:

* Code
* Commands
* Technical metadata
* Status
* System labels

Mono typography should be used sparingly.

The site must not look like a terminal emulator.

---

# 11. Type Scale

Use a fluid type system.

Conceptual scale:

```text
Display
72px → 96px

H1
48px → 72px

H2
36px → 48px

H3
24px → 32px

Body Large
20px → 24px

Body
16px → 18px

Small
14px

Technical
12px → 14px
```

The actual implementation should use responsive CSS rather than fixed values.

Example:

```css
font-size: clamp(3rem, 7vw, 6rem);
```

Typography should scale naturally between mobile and desktop.

---

# 12. Typography Rules

## Headings

Headings should be:

* Short
* Strong
* Specific

Prefer:

> How I think about quality

over:

> My Professional Engineering Philosophy and Approach to Software Quality

---

## Body

Body text should be:

* Short
* Readable
* Conversational
* Specific

Avoid unnecessary jargon.

---

## Technical Text

Use monospace for:

```text
$ bb run
API /v1/releases
PASS
BUILD #142
```

Do not use monospace for entire paragraphs.

---

# 13. Spacing System

Use a consistent 4px/8px-based spacing system.

Example:

```text
4
8
12
16
24
32
48
64
80
96
128
```

Large sections should have generous vertical spacing.

Whitespace is part of the visual system.

---

# 14. Layout System

Use a constrained content width.

Conceptual:

```text
┌─────────────────────────────────────────────┐
│                                             │
│          MAX CONTENT WIDTH                  │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │                                     │   │
│   │             CONTENT                 │   │
│   │                                     │   │
│   └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

Recommended maximum:

```text
1200px – 1280px
```

depending on final composition.

Avoid full-width text blocks on large screens.

---

# 15. Grid

Use a flexible grid system.

Conceptual desktop grid:

```text
12 columns
```

Mobile:

```text
1 column
```

Tablet:

```text
4–8 columns
```

The grid should support:

* Project layouts
* Experience
* Metrics
* Technical evidence
* Editorial content

Do not force every section into cards.

---

# 16. Border System

Use borders to define structure.

Default:

```text
1px solid
```

Borders should be:

* Subtle
* Consistent
* Low contrast

Avoid:

* Thick decorative borders
* Multiple competing border styles
* Glowing borders

---

# 17. Radius System

Use restrained corner radii.

Recommended:

```text
Small
6px

Medium
10px

Large
16px
```

Avoid using many different radii.

The interface should feel engineered rather than playful.

---

# 18. Shadow System

Use shadows minimally.

Primary separation should come from:

```text
Spacing
+
Surface colour
+
Border
```

not large shadows.

Avoid:

```text
Huge glow
Neon shadow
Floating glass everywhere
```

---

# 19. Surface Hierarchy

Use three primary levels:

```text
LEVEL 0
Page

LEVEL 1
Section / Surface

LEVEL 2
Interactive / Elevated Surface
```

Example:

```text
Background
   ↓
Project Surface
   ↓
Interactive Project Element
```

Avoid excessive nested cards.

---

# 20. Component Philosophy

Components should be reusable and purposeful.

Core components:

```text
Button
Link
Badge
Tag
StatusIndicator
Metric
SectionHeader
ProjectCard
ProjectEvidence
Timeline
ExperienceItem
SocialLink
Navigation
Footer
```

Components should represent meaningful interface concepts.

Avoid creating components simply because a `<div>` exists.

---

# 21. Button System

## Primary

Used for the most important action.

Example:

```text
View Work →
```

## Secondary

Used for important but lower-priority actions.

Example:

```text
LinkedIn ↗
```

## Tertiary

Used for supporting actions.

Example:

```text
GitHub ↗
Email →
```

The hierarchy must remain visually obvious.

---

# 22. CTA Design

Primary CTA:

```text
VIEW WORK
```

Secondary:

```text
LINKEDIN
```

Tertiary:

```text
GITHUB
EMAIL
```

The CTA hierarchy reflects the conversion strategy.

---

# 23. Navigation

Primary navigation:

```text
About
Work
Experience
Writing
Contact
```

Do not place every homepage section in the navigation.

Avoid:

```text
About
Skills
Certifications
Education
Projects
Timeline
Philosophy
QINIS
BrikByteOS
Contact
```

The navigation should remain simple.

---

# 24. Hero Design

The hero is primarily typographic.

Structure:

```text
QA ENGINEER · TEST AUTOMATION · SOFTWARE QUALITY

I build, test and automate
software for confidence.

QA Engineer focused on API, UI and CI/CD testing,
with a software-development foundation in Python and Java.

[ VIEW WORK ]  [ LINKEDIN ]

2+ YEARS
ISTQB® CERTIFIED
AZURE CERTIFIED
```

The hero must communicate identity before experimentation.

---

# 25. Proof Strip

The proof strip functions as engineering metadata.

Example:

```text
2+ YEARS
QA EXPERIENCE

100+
TEST SCENARIOS

30+
DEFECTS

ISTQB®
CERTIFIED

AZURE
CERTIFIED
```

Numbers must only be displayed when factually supported.

---

# 26. Project Design

Projects should feel like case studies rather than portfolio thumbnails.

Each project should answer:

```text
WHAT?
WHY?
HOW?
WHAT DID I LEARN?
WHERE IS THE EVIDENCE?
```

---

# 27. QINIS Visual Treatment

QINIS should appear as a major project.

Not as the website identity.

Recommended composition:

```text
QINIS

Engineering intelligence for software
quality and release confidence.

┌───────────────────────────────────┐
│                                   │
│          ARCHITECTURE             │
│                                   │
└───────────────────────────────────┘

Problem
Solution
Architecture
Implementation
Testing
Current State

[ EXPLORE QINIS ]
```

---

# 28. BrikByteOS Visual Treatment

BrikByteOS should use a small terminal moment.

Example:

```text
$ bb run

✓ Tests
✓ Security
✓ Quality
✓ Evidence

RELEASE: PASS
```

The terminal is evidence.

It is not the website's entire aesthetic.

---

# 29. Signature Visual System

The portfolio's unique visual metaphor is:

# Signal → Evidence → Quality → Confidence

Represent this consistently.

Example:

```text
┌──────────────┐
│ TEST SIGNAL  │
└──────┬───────┘
       ↓
┌──────────────┐
│   EVIDENCE   │
└──────┬───────┘
       ↓
┌──────────────┐
│   QUALITY    │
└──────┬───────┘
       ↓
┌──────────────┐
│  CONFIDENCE  │
└──────────────┘
```

This should be a subtle recurring motif rather than an enormous graphic.

---

# 30. Status Indicators

Status indicators should communicate real states.

Examples:

```text
● Available
✓ Passed
! Attention
× Failed
```

Never use animated indicators simply to make the page feel alive.

A status indicator should have semantic meaning.

---

# 31. Photography

Human identity is important.

Use one high-quality professional photograph.

The photograph should communicate:

```text
Human
Professional
Approachable
Confident
```

Avoid:

* Stock photos
* Generic developer images
* Excessive portraits
* AI-generated representations

The photo should support the engineering identity, not dominate it.

---

# 32. Motion System

Motion is progressive enhancement.

The site must remain fully understandable without animation.

## Motion Principles

```text
FAST
SUBTLE
PURPOSEFUL
PREDICTABLE
```

Good uses:

```text
Hover
Focus
Section reveal
Pipeline progression
Terminal output
Diagram flow
```

Avoid:

```text
Particles
Cursor trails
Constant floating
Parallax everywhere
Large 3D objects
Long entrance animations
```

---

# 33. Motion Timing

Use short transitions.

Conceptual:

```text
Micro interaction
100–150ms

Standard
150–250ms

Large transition
250–400ms
```

Long animations should be rare.

---

# 34. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

* Remove non-essential movement.
* Reduce transitions.
* Disable parallax.
* Disable continuous animations.
* Preserve the meaning of state changes.

The website must remain understandable.

---

# 35. Interaction States

Every interactive component should define:

```text
Default
Hover
Focus
Active
Disabled
Error
Success
```

Where applicable.

Example:

```text
BUTTON

Default
   ↓
Hover
   ↓
Focus
   ↓
Active
```

Keyboard focus must always remain visible.

---

# 36. Accessibility

Accessibility is part of the design system.

Requirements:

```text
Semantic HTML
Keyboard navigation
Visible focus
Accessible contrast
Logical headings
Alt text
Accessible forms
Reduced motion
Meaningful link text
```

Target:

```text
Lighthouse Accessibility ≥ 90
```

Design target:

```text
WCAG 2.2 AA-oriented
```

---

# 37. Responsive System

Supported range:

```text
320px → 1440px+
```

Design from content rather than devices.

Suggested validation widths:

```text
320
375
390
768
1024
1280
1440
1920
```

The layout must adapt rather than simply shrink.

---

# 38. Mobile Design Philosophy

Mobile is not a reduced desktop version.

It is a first-class experience.

The priority becomes:

```text
IDENTITY
   ↓
VALUE
   ↓
WORK
   ↓
CONTACT
```

The mobile hero should remain understandable within seconds.

---

# 39. Responsive Behaviour

### Desktop

```text
Large typography
Multi-column layouts
Rich project compositions
```

### Tablet

```text
Reduced columns
Moderate typography
Simplified compositions
```

### Mobile

```text
Single column
Compact navigation
Shorter copy
Large touch targets
Minimal decorative elements
```

---

# 40. Content Density

The portfolio should use progressive disclosure.

Default:

```text
Short explanation
      ↓
Evidence
      ↓
Optional deep dive
```

Do not put the entire technical case study on the homepage.

---

# 41. Iconography

Use one consistent icon family.

Recommended:

```text
Lucide
```

Icons should support meaning.

Avoid icons that exist purely as decoration.

Do not use ten different icon styles.

---

# 42. Imagery

Prefer:

* Real screenshots
* Architecture diagrams
* Test reports
* Pipeline visualisations
* Code snippets
* Product interfaces

Avoid generic stock imagery.

The strongest visual asset is:

> **Evidence of actual work.**

---

# 43. Engineering Evidence Design

When showing technical work, use:

```text
Artifact
   ↓
Context
   ↓
Interpretation
```

Example:

```text
TEST RESULT
     ↓
What failed?
     ↓
Why does it matter?
```

This prevents screenshots from becoming meaningless decoration.

---

# 44. "Lab Mode"

The website may eventually expose three conceptual modes.

## Profile

```text
Who is Thapelo?
```

## Work

```text
What has Thapelo built/tested?
```

## Lab

```text
How does Thapelo think?
```

Navigation remains simple.

These are content modes, not necessarily separate application routes.

---

# 45. Engineering Notes

Writing should look editorial rather than like a blog template.

Example:

```text
ENGINEERING NOTE

Why Test Automation
Isn't Just Clicking Faster

5 min read
QA · AUTOMATION · ENGINEERING
```

Use writing to demonstrate technical thinking.

---

# 46. Footer

The footer should be simple.

Example:

```text
THAPELO MAGQAZANA

QA Engineer · Test Automation · Software Quality

Build. Test. Automate. Ship with confidence.

LinkedIn
GitHub
Email

© 2026 Thapelo Magqazana
```

Do not turn the footer into another navigation dashboard.

---

# 47. Visual Noise Budget

The website has a limited visual-noise budget.

Use visual emphasis intentionally.

Priority:

```text
1. Thapelo's identity
2. Primary CTA
3. Evidence
4. Project identity
5. Supporting metadata
6. Decorative detail
```

Decorative detail must always be lowest priority.

---

# 48. Anti-Patterns

Explicitly avoid:

```text
❌ Cyberpunk
❌ Hacker aesthetic
❌ Excessive neon
❌ Skill percentage bars
❌ Giant technology logo wall
❌ Fake metrics
❌ Fake client logos
❌ Excessive glassmorphism
❌ Particle backgrounds
❌ Cursor effects
❌ Gratuitous 3D
❌ Full-screen terminal
❌ Dashboard overload
❌ Excessive cards
❌ Animation everywhere
```

---

# 49. Design Decision Test

Every new design element must answer:

### Question 1

> What does this communicate?

### Question 2

> Who does it help?

### Question 3

> Does it improve comprehension?

### Question 4

> Does it provide evidence?

### Question 5

> Does it improve interaction?

### Question 6

> What happens if we remove it?

If the element has no meaningful answer:

> Remove it.

---

# 50. Design Tokens

The implementation should centralise design decisions.

Conceptual token structure:

```ts
const tokens = {
  colors: {
    background: "...",
    surface: "...",
    surfaceElevated: "...",
    text: "...",
    textSecondary: "...",
    textMuted: "...",
    border: "...",
    accent: "...",
    success: "...",
    warning: "...",
    error: "..."
  },

  spacing: {
    xs: "...",
    sm: "...",
    md: "...",
    lg: "...",
    xl: "...",
    "2xl": "...",
    "3xl": "..."
  },

  radius: {
    sm: "...",
    md: "...",
    lg: "..."
  }
}
```

The exact implementation can use CSS variables/Tailwind tokens rather than a JavaScript object.

---

# 51. Suggested CSS Token Layer

Conceptually:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-surface-elevated: ...;

  --color-text: ...;
  --color-text-secondary: ...;
  --color-text-muted: ...;

  --color-border: ...;
  --color-accent: ...;

  --color-success: ...;
  --color-warning: ...;
  --color-error: ...;

  --space-1: ...;
  --space-2: ...;
  --space-3: ...;
  --space-4: ...;
  --space-6: ...;
  --space-8: ...;
  --space-12: ...;
  --space-16: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
}
```

These tokens become the foundation for all components.

---

# 52. Technology Alignment

The design system should support the planned implementation stack:

```text
React
TypeScript
Vite
Tailwind CSS
Lucide
Vitest
React Testing Library
Playwright
GitHub Actions
Netlify
```

The design system must not become dependent on unnecessary UI frameworks.

---

# 53. Technical Design Principles

## Static First

The site should be primarily content-driven and static.

## Component Driven

Reusable components should enforce visual consistency.

## Type Safe

Content and component interfaces should be typed.

## Testable

Important interactions should be testable.

## Accessible

Accessibility must be considered during component creation.

## Performant

Visual sophistication must not require heavy JavaScript.

---

# 54. Design System Quality Gates

Before a component is considered complete:

```text
Visual
  ✓

Responsive
  ✓

Keyboard
  ✓

Focus
  ✓

Reduced Motion
  ✓

Semantic HTML
  ✓

Content
  ✓

Performance
  ✓
```

A component that looks good but fails accessibility is not complete.

---

# 55. Design-to-Code Relationship

The design system should map directly to implementation.

```text
Design Token
     ↓
Component
     ↓
Section
     ↓
Page
```

Example:

```text
Accent Token
     ↓
Button
     ↓
Hero CTA
     ↓
Homepage
```

This prevents every section from inventing its own styling.

---

# 56. Portfolio as QA Artifact

The website itself should demonstrate the principles it communicates.

```text
REQUIREMENTS
     ↓
DESIGN
     ↓
IMPLEMENTATION
     ↓
TESTING
     ↓
EVIDENCE
     ↓
QUALITY GATE
     ↓
DEPLOYMENT
```

The portfolio is therefore both:

```text
PERSONAL BRAND
       +
ENGINEERING EVIDENCE
```

---

# 57. Acceptance Criteria

## AC-01 — Design Concept

The portfolio has a clearly defined concept:

> **Thapelo — The Engineering Lab**

**Status:** PASS

---

## AC-02 — Visual Direction

The visual direction is:

> **Editorial Minimalism × Developer Tooling**

**Status:** PASS

---

## AC-03 — Brand Hierarchy

Thapelo remains the primary identity.

QINIS and BrikByteOS are presented as evidence.

**Status:** PASS

---

## AC-04 — Theme

A dark technical minimal theme is defined with restrained accent usage.

**Status:** PASS

---

## AC-05 — Typography

A maximum of two type families is defined.

**Status:** PASS

---

## AC-06 — Colour Semantics

Colour has defined semantic meaning.

**Status:** PASS

---

## AC-07 — Spacing

A consistent spacing system is defined.

**Status:** PASS

---

## AC-08 — Components

Core reusable interface components are identified.

**Status:** PASS

---

## AC-09 — Responsive Design

The system supports:

```text
320px → 1440px+
```

**Status:** PASS

---

## AC-10 — Accessibility

Keyboard navigation, focus, contrast and reduced motion are part of the design system.

**Status:** PASS

---

## AC-11 — Motion

Motion is progressive enhancement and not required for comprehension.

**Status:** PASS

---

## AC-12 — Anti-Patterns

Explicit visual anti-patterns are documented.

**Status:** PASS

---

## AC-13 — Evidence

The system prioritises real engineering evidence over decorative visuals.

**Status:** PASS

---

# 58. Definition of Done

P1-05 is complete when:

* [x] Design concept is defined.
* [x] Brand personality is defined.
* [x] Visual direction is defined.
* [x] Theme is defined.
* [x] Colour philosophy is defined.
* [x] Semantic colour system is defined.
* [x] Typography system is defined.
* [x] Spacing system is defined.
* [x] Layout system is defined.
* [x] Grid system is defined.
* [x] Radius system is defined.
* [x] Border system is defined.
* [x] Shadow system is defined.
* [x] Component philosophy is defined.
* [x] CTA hierarchy is defined.
* [x] Navigation philosophy is defined.
* [x] Motion system is defined.
* [x] Accessibility principles are defined.
* [x] Responsive principles are defined.
* [x] Evidence presentation system is defined.
* [x] Anti-patterns are documented.
* [x] Design quality gates are defined.
* [x] Acceptance criteria are documented.

---

# 59. Final Design Principle

The website should feel like:

> **A beautifully designed engineering product created by a thoughtful QA engineer.**

Not:

> A flashy developer portfolio.

The hierarchy is:

```text
THAPELO
   ↓
CLARITY
   ↓
CAPABILITY
   ↓
EVIDENCE
   ↓
ENGINEERING THINKING
   ↓
TRUST
   ↓
CONNECTION
```

The final design mantra is:

# LESS PORTFOLIO. MORE PROOF.

And the final test is:

> **If all animations, gradients and decorative effects disappeared, would the quality of Thapelo's work still be compelling?**

If yes, the design system is doing its job.

