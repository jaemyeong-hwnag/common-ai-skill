---
name: test-runner
description: Detect the project's test runner and execute the full test suite with coverage reporting. Fail fast and fix on failure.
---

## Sequence

detect test framework from project → run full suite → on failure: classify(code bug|test bug) → fix → rerun → repeat until pass → summarize

## Output Format

```
Tests:total=N passed=N failed=N skipped=N Coverage:N% Duration:Xs
```

## Rules
<constraints>
- tests must be independently runnable, no order dependency
- mock only external I/O boundaries
</constraints>
