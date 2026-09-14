---
slug: release-confidence
title: Why release confidence is not the same as passing tests
description: Passing tests tell you what ran. Release confidence tells you what you know.
date: 2026-01-15
tags: [quality, ci-cd, release]
---

# Why release confidence is not the same as passing tests

A green CI pipeline tells you that the checks you configured passed. It does not tell you that you have the checks you need. Those are different problems, and conflating them is one of the most common sources of release surprises.

## The gap between green and trustworthy

Tests are a _signal_. A release decision is a _judgement_. Between them sits a question: **what would have to be true for me to trust this release?**

- All critical paths exercised
- No unaddressed critical defects
- Coverage of the change surface adequate for the risk
- Performance within tolerance under realistic load

If your pipeline only runs tests, you are answering the first question. The others need evidence of a different shape.

## Evidence is not a report

A report is a document. Evidence is a claim with a source. A passing test suite is a report. "The login flow was exercised end-to-end against the release candidate, at 2.3× expected peak load, with no unhandled errors" is evidence.

The difference matters because evidence can be _inspected_, _diffed_ and _attached_ to a decision. Reports are skimmed once and forgotten.

## What I build instead

The instinct behind QINIS is to make evidence the default output of the delivery pipeline, not a document someone writes after the fact. Quality gates read evidence. Release decisions consume evidence. The pipeline emits it.

That is the shift: from "did the tests pass?" to "what can we honestly claim about this release?"
