---
name: framework-selection
description: Choose the right tool, library, or architecture for the task — minimal complexity for the requirement.
---

## Sequence

classify problem complexity → detect what the project already uses → match to the lowest sufficient tier → record rationale

## Complexity Tiers

```
single call       → no framework
pipeline          → composable steps, minimal orchestration
stateful workflow → explicit state, resumability
multi-agent       → routing, delegation, parallelism
```

## Rules

<constraints>
- detect existing project tools before proposing new ones
- start at the lowest tier that satisfies the stated requirement
- escalate only when the lower tier cannot meet a requirement
- switching tiers mid-project requires explicit justification
</constraints>

## Done

<criteria>
chosen approach matches complexity tier + existing conventions respected + rationale recorded
</criteria>
