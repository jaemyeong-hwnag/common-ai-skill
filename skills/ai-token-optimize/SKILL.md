---
name: ai-token-optimize
description: Optimize AI-consumed code and data for token efficiency — reduce token usage while preserving semantic fidelity. Applies to prompts, tool outputs, and inter-agent messages.
---

## Scope

- **include**: AI-consumed data (prompts, tool returns, agent messages, AI-parsed structures, LLM context)
- **exclude**: human-facing data (docs, tests, config, schema)

## Techniques

1. LEGEND: compress repeated labels → abbreviations, define once
2. compact k:v: verbose structured labels → short key:value pairs
3. positional: repeated-structure collections → header-once + values-only
4. structural tags: lightweight markup instead of deep nesting
5. placement: critical info at start+end of prompt, supporting context in middle

## Sequence

scan AI-consumed targets → apply techniques → verify(tests pass + AI can parse) → commit per module

## Verify
<criteria>
labels compressed + collections positional + returns compact + critical info at edges + tests pass
</criteria>
