---
slug: qinis-lessons
title: Three lessons from building QINIS
description: What building an evidence-first engineering platform taught me about designing quality systems.
date: 2026-04-12
tags: [qinis, engineering, quality]
---

# Three lessons from building QINIS

QINIS is an ongoing project — an engineering platform exploring how quality signals across the delivery pipeline become evidence for release decisions. Building it has changed how I think about quality engineering.

Three lessons have stuck.

## 1. Normalize before you render

The instinct when building a quality dashboard is to start with the UI. This is the wrong order.

The hard work is agreeing on a shared shape for what a "test result" is, what a "coverage number" is, and what it means for two results to be comparable. Once that shape exists, every UI is a rendering of it. Without it, every UI is a different interpretation.

Normalize first. Render later.

## 2. Evidence is append-only

A result that can be overwritten is a report. A result that is recorded once and referenced forever is evidence.

This has architectural consequences: an evidence store needs versioning, timestamps and provenance. It refuses to let a fact disappear because a newer fact arrived. Both facts remain, with a relationship between them.

The instinct to "update the dashboard" is wrong. The dashboard should show the latest _view_ of a set of immutable _facts_.

## 3. Meaning is a design problem

The hardest part of building QINIS has not been running tools or normalizing their output. It has been agreeing on what the output _means_.

Is 80% coverage good? It depends on the codebase. Is a passing security scan reassuring? It depends on what the scan looked for. Is a green pipeline a green release? Never automatically.

The system can compute. Only people can decide what the computation means — and designing for that decision is the actual engineering problem.

## Where this leaves me

Every tool I build now starts with the question: _what decision does this support?_ Everything else is downstream. If the tool doesn't support a decision, it's decoration.
