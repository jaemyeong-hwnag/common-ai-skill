---
name: coverage
description: Analyze test coverage and drive it to 80%+ by writing missing tests. Detects the project's test runner automatically.
requires: [test-runner]
---

## Sequence

detect coverage tool → measure → identify uncovered code → write tests → remeasure → repeat until ≥80%

## Priority

core business logic → service/use-case → infrastructure/integration → entry points

## Test Strategy

happy path + boundary values + error paths + all conditional branches

## Exclusions

entry-point bootstrap | auto-generated files | config/env files | type-definition-only files

## Done
<criteria>
coverage ≥80% + all tests pass
</criteria>
