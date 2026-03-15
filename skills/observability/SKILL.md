---
name: observability
description: Instrument AI workflows with tracing, logging, and monitoring to enable debugging, auditing, and performance analysis.
---

## What to Instrument

<instruction>
instrument at these boundaries:
- entry points (user input, API calls, scheduled triggers)
- AI model calls (inputs, outputs, latency, token counts)
- tool/function calls (name, inputs, outputs, errors)
- inter-agent messages (sender, receiver, content, timing)
- state transitions (before/after, what changed, why)
</instruction>

## Trace Structure

```
trace
  └── span: root operation
        ├── span: model call (inputs, outputs, latency, tokens)
        ├── span: tool call (name, args, result, error)
        └── span: sub-operation
              └── span: model call
```

## Rules

<constraints>
- every AI model call must be traced
- traces must include enough context to reproduce the behavior
- never log secrets, PII, or credentials inside traces
- propagate trace context across service boundaries
- attach correlation IDs to connect traces to user sessions or jobs
- structured logs only — free-form strings are not queryable
</constraints>

## Query Patterns

<instruction>
when debugging, query by:
- trace ID for single-request investigation
- time range + error flag for incident review
- latency percentile for performance analysis
- token count for cost analysis
</instruction>

## Done

<criteria>
all model calls traced + tool calls recorded + no secrets in traces + structured output + correlation IDs present
</criteria>
