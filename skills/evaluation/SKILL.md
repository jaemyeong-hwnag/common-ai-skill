---
name: evaluation
description: Build evaluation pipelines for AI outputs — create datasets, write evaluators, and measure quality systematically.
---

## Evaluation Types

```
offline → fixed dataset, deterministic, run before deploy
online  → live traffic sample, continuous, run in production
```

## Dataset Creation

<instruction>
build a dataset by:
1. identify representative task types for the system
2. collect examples from: production traces, handcrafted edge cases, adversarial inputs
3. for each example record: input, expected output (or criteria), metadata
4. label at least one failure mode per dataset type

dataset types:
  - final response: input → expected output
  - step-level: input → expected intermediate step
  - trajectory: input → expected sequence of steps
</instruction>

## Evaluator Types

```
code evaluator    → deterministic check (exact match, regex, schema validation)
LLM-as-judge      → semantic check (correctness, tone, safety, relevance)
human evaluator   → gold standard for ambiguous criteria
```

## Evaluator Rules

<constraints>
- prefer code evaluators for measurable criteria (format, schema, exact value)
- use LLM-as-judge only for subjective criteria; include a rubric in the prompt
- every evaluator must return a score and a reason
- do not use the same model as both judge and judged — bias risk
- evaluators must be deterministic for the same input (seed or temperature=0)
</constraints>

## Sequence

<instruction>
collect dataset → write evaluators → run baseline → change system → rerun → compare delta → iterate
</instruction>

## Done

<criteria>
dataset covers representative inputs + each evaluator returns score+reason + baseline recorded + regression detectable
</criteria>
