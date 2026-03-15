---
name: agent-orchestration
description: Coordinate multiple agents — routing, delegation, parallelism, state sharing, and result aggregation.
---

## Orchestration Patterns

```
sequential  → agent A output → agent B input → ... → final result
parallel    → dispatch N tasks → wait for all → aggregate
routing     → classify input → dispatch to specialist agent
delegation  → orchestrator breaks task → sub-agents execute → orchestrator assembles
map-reduce  → split input → process in parallel → reduce results
```

## Rules

<constraints>
- orchestrator owns the plan; sub-agents own execution
- sub-agents must not know about each other — communicate only via orchestrator
- every message between agents must be serializable
- sub-agent failures must be handled explicitly — no silent drops
- define a maximum depth for delegation chains to prevent infinite recursion
- shared state must be accessed through a single authoritative store, not passed in messages
</constraints>

## Message Contract

<instruction>
each inter-agent message must include:
- task description (what to do)
- required inputs (data, context)
- expected output format
- constraints (time, cost, scope limits)
- correlation ID (to trace back to root request)
</instruction>

## Failure Handling

```
sub-agent error    → retry with backoff → escalate to orchestrator → human-in-the-loop if needed
timeout            → cancel + mark partial result → continue with available results
partial failure    → proceed if core path succeeded, flag degraded output
```

## Done

<criteria>
agents communicate only via orchestrator + messages serializable + failures handled + delegation depth bounded + correlation IDs present
</criteria>
