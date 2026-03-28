---
name: harness-engineering
description: Design and implement the runtime control layer around AI agents — constraints, feedback loops, validation, observability, and failure recovery — to make agent behavior reliable, auditable, and production-ready.
requires: [framework-selection, observability]
---

## Sequence

audit agent workflow → identify harness gaps → design control layer → implement constraints → wire feedback loops → add validation gates → verify reliability

## Harness Components

```
constraints      → rules that prevent invalid or unsafe agent actions
feedback loops   → signals that let the harness detect and correct drift
validation gates → checkpoints that verify output quality before propagation
observability    → traces, logs, and metrics that make behavior auditable
failure recovery → rollback and escalation paths when invariants break
```

## Gap Detection

Audit the current agent workflow for missing harness components:

```
no output validation   → add validation gate before each propagation point
no error handling      → add explicit failure path for each tool call
no trace context       → add correlation ID to every agent message
no invariant checks    → define and enforce safety invariants per action type
no human checkpoint    → add interrupt trigger for irreversible or high-risk actions
```

## Design Principles

<constraints>
- harness controls WHAT the agent may do, not HOW it does it
- every irreversible action must have an interrupt gate
- validation must run before output reaches downstream consumers
- failure recovery must restore prior state — no partial updates
- observability must cover every model call, tool call, and state transition
- harness complexity must not exceed the complexity of the problem it solves
</constraints>

## Scaffolding vs Runtime

```
scaffolding (pre-execution)  → system prompt, tool schemas, agent registry
                               completed before first user message
harness (runtime)            → tool dispatch, context compaction, safety enforcement
                               active on every conversation turn
```

## Done

<criteria>
all agent actions have explicit success and failure paths + irreversible actions have interrupt gates + every model call and tool call is traced with correlation ID + output validated before propagation + failure recovery restores prior state
</criteria>
