---
name: framework-selection
description: Choose the right tool, library, or architecture for the task — minimal complexity for the requirement.
---

## Decision Sequence

<instruction>
Before choosing a solution, classify the problem:
1. what is the core requirement? (single call, pipeline, stateful workflow, multi-agent)
2. what is the complexity level? (simple → complex)
3. what already exists in the project?

match complexity to requirement — never over-engineer, never under-engineer
</instruction>

## Complexity Tiers

```
single call       → simplest in-process solution, no framework
pipeline          → composable steps, minimal orchestration
stateful workflow → explicit state, checkpointing, resumability
multi-agent       → routing, delegation, parallelism, coordination
```

## Rules

<constraints>
- detect what the project already uses before proposing anything new
- start at the lowest tier that satisfies the requirement
- escalate one tier only when the lower tier cannot meet a stated requirement
- document the reason for tier choice in the decision
- switching tiers mid-project requires justification
</constraints>

## Done

<criteria>
chosen approach matches complexity tier + existing project conventions respected + rationale recorded
</criteria>
