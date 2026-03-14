---
name: finalize
description: Post-implementation pipeline — run tests, enforce 80% coverage, sync docs, then commit atomically. Run after every feature or fix.
---

## Sequence

test(detect→run→fix→pass) → coverage(measure→write tests→≥80%) → docs-sync(detect drift→update) → commit(by purpose, type: summary)

## Output Format

```
Tests:total=N passed=N failed=N Coverage:N% Docs:[files] Commits:[hash:msg]
```

## Done
<criteria>
all tests pass + coverage ≥80% + docs synced + commits created
</criteria>
