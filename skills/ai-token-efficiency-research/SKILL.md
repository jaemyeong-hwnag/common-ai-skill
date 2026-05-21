---
name: ai-token-efficiency-research
requires: [paper-research, ai-token-optimize]
description: >
  Use this skill when the user asks about recent AI research on token
  efficiency, prompt compression, inference cache compression, prompt caching,
  agent memory, or cost reduction in model and agent systems. Trigger on
  Korean cues such as "token 줄이기", "AI agent 비용", "토큰 최적화",
  "비용 줄이기", "정확도 유지", and English cues such as "prompt compression",
  "KV cache", "recent AI papers", "agent token optimization", and "cost
  reduction". Also trigger when the user wants a research summary that can
  become a skill or reference document.
---

# AI Token Efficiency Research

<instruction>
Connect current research on token efficiency to practical design decisions for
AI systems. Use research as evidence, not decoration: the output
must help the user decide which efficiency option fits their workload,
risk tolerance, and quality requirements.
</instruction>

## Scope

Cover research-backed approaches for:

- reducing unnecessary input material
- reducing retained runtime state
- reusing stable context
- retaining and retrieving durable context
- resource, quality, stability, and safety trade-offs
- process-level value analysis

Coordinate with:

- `paper-research` for source discovery, source status, and citation discipline
- `ai-token-optimize` for applying token-efficient representations after the research answer identifies a suitable technique

## Activation

Trigger this skill when the user asks:

- how to reduce token cost while maintaining quality
- which efficiency strategy fits a workload
- for source-backed evidence in token efficiency
- for a research-backed skill, reference document, design note, or decision guide
- why a token-saving option changes quality, time, or operating cost

Skip this skill when:

- the request has no research depth
- official product pricing or documentation is the primary source of truth
- the user asks for a quick non-research answer
- the task has no token-efficiency question

## Research Map

Classify the topic before searching or summarizing:

- identify avoidable material
- reduce retained runtime state
- reuse stable context across repeated work
- retain and retrieve durable context
- locate process steps with poor value for their cost

## Workflow

1. Identify the workload shape, reuse pattern, quality tolerance, and time constraints.
2. Map the workload to one or more research areas.
3. Prefer primary sources, evaluation reports, and maintained evidence.
4. Verify all quantitative claims before reporting them.
5. Compare techniques by applicability, expected gain, quality risk, operational complexity, and failure modes.
6. Convert the evidence into a decision: recommended path, when not to use it, and what to measure first.

## Evidence Requirements

<constraints>
- numeric claims must be sourced, current, and tied to the reported conditions
- preprint, peer-reviewed, project-site, evaluation, and secondary-summary evidence must be clearly distinguishable
- do not generalize one result to all settings
- savings claims must account for all relevant usage
- efficiency methods must include quality and operational caveats
- stale or unverified research claims must be labeled as unverified or omitted
</constraints>

## Decision Output

For short answers, return:

```
Recommendation: <selected option>
Fit: <why it applies>
Evidence: <sourced support or measure-first note>
Limit: <main caveat>
Validation: <first check>
Sources: <source identifiers>
```

For research summaries, include:

```
## Executive Takeaway
## Technique Map
## Representative Papers
## Practical Decision Guide
## Measurement Plan
## Caveats
## Sources
```

## Done

<criteria>
the answer maps the workload to the right option + research claims are sourced and scoped + trade-offs are explicit + recommendation includes a measurement path + unsupported numbers are not reported
</criteria>
