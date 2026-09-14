---
slug: api-testing
title: What API testing actually catches
description: A short field guide to the failures that only show up below the UI.
date: 2026-03-02
tags: [api, testing, backend]
---

# What API testing actually catches

UI tests confirm that a user can do what they intended. API tests confirm that the system underneath the UI behaves the way the UI assumes it does.

They are not redundant. Each catches a different class of failure.

## Failures only API tests catch

- **Contract drift.** A field is renamed, added or reordered without the client knowing.
- **Boundary behaviour.** Off-by-one errors in pagination, dates, or ranges that the UI never exposes.
- **Error semantics.** What does a 400 mean in this API? What should it mean? Do they agree?
- **Idempotency.** Does the same request twice produce the same state? Should it?
- **Performance at the seam.** Response time distributions that hide behind a UI spinner.

## What I write first

For a new API, I write these in order:

1. A **schema assertion** — the response shape matches the contract.
2. A **negative case** — a request the API should reject, rejected for the right reason.
3. A **boundary case** — a value at the edge of the valid range.
4. A **happy-path integration** — the request that exercises the critical path.

Four tests. If they pass and the contract is stable, most of the surface is covered. Add more only when a specific risk justifies the cost.

## The point

UI tests are good at asking "does this work for a user?" API tests are good at asking "does this work for the system?" Both questions matter; they just need different tools.
