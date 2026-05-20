---
name: rag-regression-testing
description: Verify retrieval-augmented generation fixes with same-case, nearby-case, and unrelated-case tests after changing data, retrieval, ranking, prompting, fallback, or guardrail behavior.
---

# RAG Regression Testing

## Sequence

apply targeted fix → rebuild or refresh affected retrieval state if needed → run same-case test → run nearby-case test → run unrelated-case test → inspect retrieval and answer for each → report pass or fail

## Required Test Classes

1. same case: the exact failed question or scenario
2. nearby case: a close variant that should use the same improved behavior
3. unrelated case: a distinct question or domain that should not be pulled into the fix

## Verification Rules

<constraints>
- inspect retrieved evidence and final answer for every test
- the repeated scenario must be backed by directly relevant evidence
- nearby-case retrieval must prove the fix generalizes beyond one wording
- unrelated-case retrieval must avoid the previous false-positive pattern
- final answers must stay within retrieved evidence
- report every case as PASS or FAIL
- do not call the fix complete when only the exact failed case passes
</constraints>

## Report Format

```text
RAG regression:
- fix:
- same case: PASS/FAIL
- nearby case: PASS/FAIL
- unrelated case: PASS/FAIL
- remaining retrieval risk:
- remaining generation risk:
```

## Done

<criteria>
same-case, nearby-case, and unrelated-case tests run + retrieval inspected + final answers inspected + remaining risks reported
</criteria>
