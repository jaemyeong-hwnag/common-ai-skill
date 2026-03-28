---
name: evaluation
description: Build evaluation pipelines for AI outputs — create datasets, write evaluators, and measure quality systematically.
requires: [observability]
---

## Sequence

collect dataset → write evaluators → run baseline → change system → rerun → compare delta → iterate

## Dataset Types

```
final response  → input → expected output
step-level      → input → expected intermediate step
trajectory      → input → expected sequence of steps
```

## Evaluator Types

```
code evaluator  → deterministic check (exact match, schema, format)
LLM-as-judge    → semantic check (correctness, tone, safety)
human evaluator → gold standard for ambiguous criteria
```

## Rules

<constraints>
- prefer code evaluators for measurable criteria
- every evaluator must return a score and a reason
- judge model must differ from the model being evaluated
- evaluators must produce consistent output for the same input
- record a baseline before any system change
</constraints>

## Done

<criteria>
dataset covers representative inputs + each evaluator returns score+reason + baseline recorded + regression detectable
</criteria>
