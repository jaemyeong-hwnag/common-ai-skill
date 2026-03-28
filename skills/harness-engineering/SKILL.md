---
name: harness-engineering
description: Design the runtime environment around AI agents — constraints, guardrails, verification, sandboxing, feedback loops, and recovery mechanisms that make agents reliable at scale.
requires: [framework-selection, observability]
---

## Sequence

define agent boundaries → design guardrails → configure sandboxing → build verification pipeline → implement feedback loops → add recovery mechanisms → set up session continuity → validate end-to-end

## Layers

```
context management     → what the agent sees (repo-local, versioned artifacts only)
permission boundary    → what the agent can access (files, tools, commands)
execution sandbox      → where the agent runs (isolated, rollback-capable)
validation pipeline    → how outputs are verified (deterministic + semantic)
architectural guard    → structural rules the agent must not violate
feedback loop          → how failures inform next attempts
recovery mechanism     → how the system handles and corrects errors
session continuity     → how state bridges across context resets
```

## Architectural Constraints

```
deps flow: types → config → repository → service → runtime → presentation
structural tests validate layer compliance automatically
agent cannot bypass constraints — enforcement is mechanical, not instructional
```

## Context Strategy

```
repository-centered  → all agent-accessible knowledge lives in versioned artifacts
map over manual      → concise pointers, not exhaustive instructions
scoped context       → load only what the current task requires
knowledge promotion  → external knowledge → repo artifact before agent use
adaptive compaction  → progressively reduce older observations to preserve recent context
```

## Verification Tiers

```
deterministic   → static analysis, structural tests, schema validation
semantic        → model-based correctness, intent alignment, output quality
composite       → deterministic first (fast, cheap), semantic second (nuanced)
generator-evaluator → separate generation from evaluation in adversarial loop
```

## Risk-Based Routing

```
low risk    → automated validation only, no human gate
medium risk → automated validation + async human review
high risk   → halt until explicit human approval before execution
```

## Session Continuity

```
progress artifact    → structured file tracking completed work and next steps
initializer session  → first run sets up environment and initial state
incremental session  → subsequent runs read progress, advance, update artifact
context reset        → clear context between sessions to prevent drift
automatic compaction → compress history when context limit approaches
```

## Agent Topology

```
single agent         → one agent handles full task (prefer when sufficient)
plan-execute split   → one agent plans, another executes (reduce reasoning load)
generator-evaluator  → one agent produces, another critiques in adversarial loop
specialist routing   → classify input, dispatch to domain-specific agent
```

## Trace-Driven Improvement

```
capture  → log every tool call, decision, and intermediate output
analyze  → cluster failure patterns across runs
detect   → identify doom loops (repeated edits to same target without progress)
convert  → turn recurring failure patterns into new constraints or middleware
```

## Harness Evolution

```
each harness component encodes an assumption about model limitations
when models improve → re-test assumptions → strip what is no longer needed
prefer removing complexity over adding it — simplification beats sophistication
harness must remain model-agnostic — swappable without structural changes
```

## Rules

<constraints>
- enforce constraints mechanically — never rely solely on prompt instructions for safety
- every agent action must be auditable — log inputs, outputs, tool calls, and decisions
- sandbox must support rollback — no irreversible side effects without explicit approval
- permission boundaries must follow least-privilege — grant minimum access required per task
- context is a scarce resource — provide maps, not manuals; pointers, not payloads
- architectural boundaries must be enforced by structural tests, not by convention
- verification must combine deterministic and semantic checks — neither alone is sufficient
- feedback from failures must be converted into reusable constraints — not one-off fixes
- recovery must be automatic for known failure classes, escalated for unknown ones
- agent-generated artifacts must pass the same quality gates as human-generated ones
- periodic maintenance agents must detect drift in docs, architecture, and constraints
- long-running tasks must persist progress in structured artifacts across sessions
- detect doom loops via trace analysis — intervene when repeated attempts show no progress
- route actions through risk tiers — high-risk actions require human approval
- prefer single-agent topology — escalate to multi-agent only when single agent is insufficient
- harness must survive model changes — no coupling to specific model capabilities
- evaluator must be adversarial — optimistic self-review is insufficient for quality
</constraints>

## Anti-Patterns

```
prompt-only safety       → relying on instructions instead of mechanical enforcement
unbounded context        → dumping all docs into context instead of targeted selection
trust-by-default         → granting full access instead of least-privilege boundaries
manual-only review       → human review as sole quality gate instead of automated verification
fix-and-forget           → patching individual failures instead of creating reusable constraints
optimistic self-eval     → agent evaluating own work without adversarial challenge
model-coupled harness    → harness assumptions hardcoded to specific model behavior
session amnesia          → no structured handoff between context windows
complexity accumulation  → adding harness components without re-testing necessity
```

## Done

<criteria>
permission boundaries enforced + execution sandboxed with rollback + verification pipeline active (deterministic + semantic + generator-evaluator) + architectural constraints mechanically enforced + feedback loops convert failures to constraints + all agent outputs pass same quality gates as human outputs + audit trail present for all agent actions + session continuity via progress artifacts + doom loop detection active + risk-based routing configured + harness components documented
</criteria>
