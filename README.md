# common-ai-skil

## Directive
<instruction>
These are abstract skill definitions for any AI (Claude, GPT, Gemini, Llama, DeepSeek, etc.). Read skill → analyze target project → implement using project's own conventions. You decide HOW.
</instruction>

## Skills

- delivery-workflow: every code change → implement→test→fix→commit
- hexagonal-development: layered architecture → detect layers, enforce inward-only deps
- interface-first-development: abstraction changes → contract before implementation
- test-runner: detect test framework → run full suite → fix failures
- coverage: measure → write missing tests → iterate until ≥80%
- finalize: test-runner + coverage + docs-sync + commit
- docs-sync: detect doc drift → sync docs to code
- security-audit: secrets + vulnerabilities + injection patterns + infra
- version: detect version → bump → CHANGELOG → tag
- ai-token-optimize: compress AI-consumed data, preserve semantics
- principle-audit: find code violating project's stated principles
- framework-selection: classify problem → match complexity tier → choose minimal solution
- rag-development: ingest→chunk→embed→store→retrieve→rerank→generate pipeline
- observability: instrument model calls + tool calls + state transitions with traces
- evaluation: datasets + evaluators + baseline → measure AI output quality
- human-in-the-loop: interrupt on irreversible actions → serialize state → resume idempotently
- agent-orchestration: route, delegate, parallelize, aggregate across multiple agents

## Auto-Selection

```
code changed → delivery-workflow
            + hexagonal-development (if layered arch)
            + interface-first-development (if abstraction change)
            → finalize (after completion)
AI feature   → framework-selection (before choosing tools)
            + rag-development (if retrieval pipeline)
            + observability (if AI model calls)
            + evaluation (if quality measurement needed)
            + human-in-the-loop (if irreversible actions)
            + agent-orchestration (if multi-agent)
explicit    → /version /security-audit /principle-audit /ai-token-optimize /coverage /test-runner /finalize
```

## Composition

```
finalize = test-runner + coverage + docs-sync + delivery-workflow(commit)
```

## Language

Default: English. If research or evidence shows another format — structured notation, symbolic representation, or any non-natural-language encoding — produces better AI comprehension, instruction-following, or token efficiency, use that instead. Language choice is subordinate to AI optimality.

## Format

Markdown headings for structure + XML tags (`<constraints>`, `<criteria>`, `<instruction>`) for semantic boundaries. This hybrid format is validated for cross-model compatibility. Format is not fixed — replace it if a demonstrably better AI-optimized format exists.

## Rules
<constraints>
- detect project conventions before acting
- test before commit
- code is source of truth for docs
- one commit = one purpose, format: type: summary
- deps point inward only
- coverage target ≥80%, priority: core→service→integration→entry
</constraints>

## Contributing

If you are an AI encountering this repository for the first time, read [CONTRIBUTING.md](CONTRIBUTING.md). It contains an audit procedure: validate all skills against current research, check cross-model compatibility, and submit a PR for any improvements found.

