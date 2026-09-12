# Conversion Goals

**Project:** Thapelo Magqazana — The Engineering Lab  
**Document:** Conversion Goals  
**WBS Task:** P1-04  
**Status:** Complete  
**Version:** 1.0

---

## 1. Purpose

This document defines the measurable conversion goals for the portfolio.

The portfolio is not designed to maximise clicks.

It is designed to move the right visitor from:

```text
Discover
   ↓
Understand
   ↓
Trust
   ↓
Explore Evidence
   ↓
Connect
````

The primary business outcome is:

> **Generate genuine professional interest in Thapelo's QA Engineering, Test Automation and Quality Engineering capabilities.**

---

# 2. Conversion Hierarchy

The portfolio uses three CTA levels.

```text
PRIMARY
View Work
    ↓
SECONDARY
LinkedIn
    ↓
TERTIARY
GitHub / Email
```

The hierarchy reflects visitor intent.

A visitor who is still evaluating Thapelo should first see his work.

A visitor who already trusts the profile can connect professionally.

A highly interested technical visitor can inspect the source code.

A visitor ready for direct communication can send an email.

---

# 3. Primary CTA — View Work

## CTA

```text
View Work
```

## Purpose

Move visitors from professional positioning to evidence.

The CTA should lead directly to the portfolio's strongest proof of engineering capability.

## Destination

```text
#work
```

## Destination Content

The destination should contain:

```text
QINIS
BrikByteOS
```

and eventually additional high-quality engineering case studies.

## User Action

```text
Hero
  ↓
View Work
  ↓
Selected Work
  ↓
Project evaluation
```

## Success Event

The CTA is considered successful when the visitor:

1. Activates `View Work`.
2. Reaches the Selected Work section.
3. Can interact with at least one project/case study.

## Measurement

Track:

```text
view_work_click
```

Suggested event properties:

```json
{
  "cta": "view_work",
  "location": "hero"
}
```

## Primary KPI

```text
View Work CTR =
View Work clicks / Hero CTA impressions
```

## Target

Initial target:

```text
≥ 20% CTA engagement
```

This is an initial product hypothesis rather than a guaranteed industry benchmark.

The target should be revised after real traffic data is available.

---

# 4. Secondary CTA — LinkedIn

## CTA

```text
LinkedIn
```

## Purpose

Move visitors from portfolio evaluation to professional relationship.

LinkedIn is the primary professional identity destination.

## Destination

```text
LinkedIn profile
```

The destination must be the user's actual public LinkedIn profile.

## User Action

```text
Portfolio
    ↓
LinkedIn
    ↓
Profile verification
    ↓
Connection / message / follow
```

## Success Event

The portfolio can measure:

```text
linkedin_click
```

The actual LinkedIn outcome may not be measurable by the portfolio.

Therefore, distinguish:

### Measurable

```text
Number of LinkedIn outbound clicks
```

### Not directly measurable

```text
Connection accepted
Message received
Recruiter contacted
Profile viewed
```

unless appropriate platform analytics are available.

## Measurement

Suggested event:

```text
linkedin_click
```

Example:

```json
{
  "cta": "linkedin",
  "location": "hero"
}
```

## KPI

```text
LinkedIn CTR =
LinkedIn clicks / LinkedIn CTA impressions
```

---

# 5. Tertiary CTA — GitHub

## CTA

```text
GitHub
```

## Purpose

Allow technically interested visitors to inspect actual engineering work.

GitHub is evidence rather than the primary conversion destination.

## Destination

The relevant public GitHub profile or repository.

Priority should be:

```text
BrikByteOS repository
      ↓
GitHub profile
```

where appropriate.

## User Action

```text
Portfolio
    ↓
GitHub
    ↓
Repository
    ↓
Code / documentation / tests / CI
```

## Success Event

```text
github_click
```

## Measurement

Example:

```json
{
  "cta": "github",
  "location": "project"
}
```

## KPI

```text
GitHub CTR =
GitHub clicks / GitHub CTA impressions
```

---

# 6. Tertiary CTA — Email

## CTA

```text
Email
```

## Purpose

Provide a direct communication path for recruiters, hiring managers and potential collaborators.

## Destination

Use:

```text
mailto:
```

with the user's professional email address.

## User Action

```text
Portfolio
    ↓
Email
    ↓
Email client
    ↓
Message
```

## Success Event

The portfolio can reliably measure:

```text
email_click
```

It cannot reliably determine whether the visitor actually sent the email.

Therefore:

### Measurable

```text
Email CTA activation
```

### Not directly measurable

```text
Email sent
Conversation started
Interview requested
```

unless additional infrastructure is introduced.

## Measurement

Example:

```json
{
  "cta": "email",
  "location": "contact"
}
```

---

# 7. CTA Destination Contract

Every CTA must have an explicit destination.

| CTA       | Priority  | Destination               | Measurable Event  |
| --------- | --------- | ------------------------- | ----------------- |
| View Work | Primary   | `#work`                   | `view_work_click` |
| LinkedIn  | Secondary | LinkedIn profile          | `linkedin_click`  |
| GitHub    | Tertiary  | GitHub profile/repository | `github_click`    |
| Email     | Tertiary  | `mailto:` email           | `email_click`     |

Therefore:

```text
CTA
 ↓
Explicit destination
 ↓
User action
 ↓
Measurable event
```

No CTA should exist without this chain.

---

# 8. CTA Placement

## Hero

Primary:

```text
View Work
```

Secondary:

```text
LinkedIn
```

The hero should not contain four competing CTAs.

---

## Selected Work

Project-level CTAs:

```text
View QINIS
View BrikByteOS
```

Possible destinations:

```text
#qinis
#brikbyteos
```

and eventually:

```text
/project/qinis
/project/brikbyteos
```

if dedicated case-study pages are introduced.

---

## Contact

Primary action:

```text
Email Me
```

Secondary:

```text
LinkedIn
```

Tertiary:

```text
GitHub
```

---

## Footer

Keep the footer lightweight:

```text
LinkedIn
GitHub
Email
```

The footer is for persistent navigation, not another large conversion section.

---

# 9. CTA Naming Rules

CTA labels must describe the action.

### Good

```text
View Work
View QINIS
View BrikByteOS
Connect on LinkedIn
View GitHub
Email Me
```

### Avoid

```text
Click Here
Learn More
Discover
Explore
Let's Go
Submit
```

unless the surrounding context makes the destination completely obvious.

---

# 10. Conversion Funnel

The intended funnel is:

```text
VISITOR
   │
   ▼
LANDING
   │
   ▼
UNDERSTAND POSITIONING
   │
   ▼
VIEW WORK
   │
   ▼
EVALUATE EVIDENCE
   │
   ├───────────────┐
   ▼               ▼
LINKEDIN         GITHUB
   │               │
   └───────┬───────┘
           ▼
        CONTACT
           │
           ▼
 PROFESSIONAL OPPORTUNITY
```

The website should optimise for **quality of conversion**, not raw click volume.

---

# 11. Conversion Events

The initial event vocabulary should remain deliberately small.

```text
page_view
view_work_click
project_view
linkedin_click
github_click
email_click
```

Future events may include:

```text
case_study_view
resume_download
contact_form_submit
article_view
```

Only add events when they answer a real product question.

---

# 12. Event Naming Convention

Use:

```text
<object>_<action>
```

Examples:

```text
view_work_click
linkedin_click
github_click
email_click
project_view
```

Avoid inconsistent naming such as:

```text
clickedViewWork
ViewWorkCTA
hero_button_pressed
linkedinButtonClicked
```

A consistent vocabulary makes analytics easier to understand.

---

# 13. CTA Location Tracking

The same CTA may appear in multiple locations.

Therefore, the event should identify its location.

Example:

```json
{
  "cta": "linkedin",
  "location": "hero"
}
```

versus:

```json
{
  "cta": "linkedin",
  "location": "contact"
}
```

Possible locations:

```text
hero
work
project
contact
footer
navigation
```

This allows later analysis of which parts of the website actually drive engagement.

---

# 14. Conversion Metrics

## Primary Metric

### Work Exploration Rate

```text
Visitors who activate View Work
--------------------------------
Unique visitors
```

This indicates whether the hero successfully moves visitors toward evidence.

---

## Secondary Metrics

### LinkedIn Engagement

```text
LinkedIn clicks
----------------
Unique visitors
```

### GitHub Engagement

```text
GitHub clicks
-------------
Unique visitors
```

### Email Engagement

```text
Email clicks
------------
Unique visitors
```

---

# 15. Quality Conversion Metrics

Raw clicks are not enough.

The portfolio should eventually evaluate:

```text
Visitor
   ↓
View Work
   ↓
Project viewed
   ↓
GitHub / LinkedIn / Email
```

A stronger signal is therefore:

### Evidence-to-Contact Rate

```text
Visitors who viewed meaningful work
and then contacted/connected
-----------------------------------
Visitors who viewed meaningful work
```

This helps answer the more important question:

> **Does the portfolio convince technically relevant visitors to take the next step?**

---

# 16. Conversion Anti-Patterns

The portfolio must avoid:

### CTA Overload

Do not present:

```text
View Work
Download CV
Contact Me
LinkedIn
GitHub
Email
Read Blog
Watch Video
Book Meeting
```

all at the same time.

Too many choices weaken the hierarchy.

---

### Fake Urgency

Avoid:

```text
Hire Me Now!
Limited Availability!
Don't Miss Out!
```

The portfolio should communicate professional confidence without sales pressure.

---

### Decorative Buttons

Every button must have a meaningful destination.

A button that only triggers an animation is not a useful conversion CTA.

---

### Dead Links

No CTA may point to:

```text
#
javascript:void(0)
```

unless it has a legitimate interaction purpose.

---

### Unfinished Destinations

Do not link to:

* Empty project pages
* Placeholder repositories
* Empty social profiles
* Broken case studies
* "Coming soon" pages presented as completed work

If the destination is not ready, do not expose the CTA yet.

---

# 17. CTA Accessibility Requirements

Every CTA must:

* Be keyboard accessible.
* Have a visible focus state.
* Have understandable accessible text.
* Have sufficient contrast.
* Provide an appropriate hover/focus state.
* Have a sufficiently large interaction target.
* Clearly indicate whether it navigates internally or externally.

External links should be identifiable where appropriate.

---

# 18. CTA Technical Contract

CTA components should eventually follow a consistent structure.

Conceptually:

```ts
type CTA = {
  label: string
  destination: string
  type: "internal" | "external" | "email"
  event: string
  location: string
}
```

Example:

```ts
const viewWorkCTA = {
  label: "View Work",
  destination: "#work",
  type: "internal",
  event: "view_work_click",
  location: "hero"
}
```

This makes CTA behaviour explicit and testable.

---

# 19. CTA Testing Requirements

Each CTA must have at least one automated test.

## Example

```text
View Work
    ↓
Click
    ↓
#work becomes reachable
```

Test:

```text
✓ CTA exists
✓ CTA has correct label
✓ CTA is keyboard accessible
✓ CTA has correct destination
✓ CTA triggers expected navigation
```

External CTAs should verify the destination URL.

Email should verify the `mailto:` destination.

---

# 20. Conversion Acceptance Criteria

## AC-01 — Primary CTA

The homepage contains:

```text
View Work
```

**Destination:**

```text
#work
```

**Status:** Defined

---

## AC-02 — Secondary CTA

The homepage contains:

```text
LinkedIn
```

**Destination:**

Actual public LinkedIn profile.

**Status:** Defined

---

## AC-03 — Tertiary GitHub CTA

The portfolio provides a GitHub destination for technical evidence.

**Status:** Defined

---

## AC-04 — Tertiary Email CTA

The portfolio provides a working email destination.

**Status:** Defined

---

## AC-05 — Measurability

Every CTA has:

```text
Label
Destination
Event
Location
```

**Status:** Defined

---

## AC-06 — No Dead CTAs

Every exposed CTA must lead to a valid destination.

**Status:** Defined

---

## AC-07 — Accessibility

Every CTA must be keyboard accessible and have visible focus.

**Status:** Defined

---

## AC-08 — CTA Hierarchy

The homepage must visually prioritise:

```text
1. View Work
2. LinkedIn
3. GitHub / Email
```

**Status:** Defined

---

# 21. Definition of Done

P1-04 is complete when:

* [x] Primary CTA is defined.
* [x] Secondary CTA is defined.
* [x] Tertiary CTAs are defined.
* [x] Every CTA has an explicit destination.
* [x] Every CTA has a measurable interaction event.
* [x] CTA placement is defined.
* [x] CTA naming rules are defined.
* [x] Conversion funnel is defined.
* [x] Conversion metrics are defined.
* [x] CTA accessibility requirements are defined.
* [x] CTA testing requirements are defined.
* [x] Dead-link requirements are defined.
* [x] Acceptance criteria are documented.

---

# 22. Final Conversion Principle

The portfolio should not ask:

> **"How many people clicked my buttons?"**

It should ask:

> **"Did the right people move from seeing my profile to examining my evidence and wanting to connect?"**

Therefore:

```text
VIEW WORK
    ↓
SEE EVIDENCE
    ↓
BUILD TRUST
    ↓
CONNECT
```

The portfolio's primary conversion is not a sale.

It is:

> **Professional interest strong enough to continue the conversation.**

