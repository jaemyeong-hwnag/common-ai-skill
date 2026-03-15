---
name: agent-orchestration
description: Coordinate multiple agents — routing, delegation, parallelism, state sharing, and result aggregation.
---

## Sequence

decompose task → route or delegate → execute → aggregate results → handle failures

## Patterns

```
sequential   → chain agent outputs as inputs
parallel     → dispatch independent tasks, aggregate results
routing      → classify input, dispatch to specialist
delegation   → orchestrator plans, sub-agents execute
map-reduce   → split input, process independently, reduce
```

## Rules

<constraints>
- orchestrator owns the plan; sub-agents own execution
- sub-agents must not communicate directly — only via orchestrator
- every inter-agent message must be serializable
- sub-agent failures must be handled explicitly — no silent drops
- delegation chain depth must be bounded
- shared state must flow through a single authoritative store
- every message must carry a correlation ID traceable to the root request
</constraints>

## Done

<criteria>
agents communicate only via orchestrator + messages serializable + failures handled + depth bounded + correlation IDs present
</criteria>
