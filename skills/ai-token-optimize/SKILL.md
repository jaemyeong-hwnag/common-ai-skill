---
name: ai-token-optimize
description: Optimize AI-consumed code and data for token efficiency — reduce token usage while preserving semantic fidelity. Applies to prompts, tool outputs, and inter-agent messages.
---

## Scope

- **include**: AI-consumed data (prompts, tool returns, agent messages, AI-parsed structures, LLM context)
- **exclude**: human-facing data (docs, tests, config, schema)

## Techniques

1. **legend**: define all abbreviations once at prompt start; reuse without re-definition — prefer abbreviations already present in model training data (domain-standard codes require no definition)
2. **compact k:v**: verbose structured labels → short key:value pairs, pipe or comma-separated
3. **tabular**: repeated-structure collections → typed header with column list once, then value rows only
4. **numeric notation**: express numbers as `{digit_count:value}` to prevent tokenizer fragmentation on large or precise values
5. **structural tags**: lightweight semantic markup for boundaries instead of deep nesting or verbose prose
6. **placement**: identity and critical directives at top, supporting data in middle, output schema at bottom — mitigates attention degradation in long contexts

## Sequence

scan AI-consumed targets → identify repetition and verbosity → apply techniques → verify AI can parse output → run tests → commit per module

## Rules
<constraints>
- apply only to AI-consumed data — never to human-facing content
- verify after each technique: AI must parse output correctly
- legend abbreviations must be unambiguous within their scope
- tabular format requires consistent column order across all rows
- placement order: legend → identity/directives → data → output schema
</constraints>

## Done
<criteria>
labels compressed + collections tabular + numerics notation-formatted + critical info at top + output schema at bottom + tests pass
</criteria>
