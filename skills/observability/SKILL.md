---
name: observability
description: Instrument AI workflows with tracing, logging, and monitoring to enable debugging, auditing, and performance analysis.
---

## Sequence

identify instrumentation boundaries → add spans → attach metadata → verify no gaps

## Boundaries

```
entry points      → user input, external triggers
model calls       → inputs, outputs, latency, token counts
tool calls        → name, inputs, outputs, errors
inter-agent msgs  → sender, receiver, content, timing
state transitions → before/after snapshot
```

## Rules

<constraints>
- every AI model call must produce a trace entry
- propagate trace context across service boundaries
- attach a correlation ID to every trace
- structured output only — no free-form strings
- no secrets, PII, or credentials in traces
</constraints>

## Done

<criteria>
all model calls traced + tool calls recorded + correlation IDs present + no secrets in traces
</criteria>
