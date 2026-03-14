---
name: delivery-workflow
description: Enforce the full delivery cycle for every implementation task. Covers coding, testing, coverage, commit rules, and auto-commit on completion. This skill MUST be followed for all code changes.
---

## Sequence

implement → run tests → fix failures → repeat until pass → add/update tests for changed behavior → rerun → commit by purpose

## Rules
<constraints>
- every code change requires test run
- new behavior requires new tests
- changed behavior requires updated tests
- commit only when all tests pass
- never mix purposes in one commit
- auto-commit when work is complete
</constraints>

## Commit Format

```
format: <type>: <imperative summary, ≤72 chars>
types: feat=new feature | fix=bug fix | refactor=no behavior change | test=test change | docs=doc change | chore=build/config/deps
forbidden: vague summaries (update, fix issues, changes)
```

## Done
<criteria>
all tests pass + tests exist for changed behavior + commits separated by purpose
</criteria>
