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

## Auto-Selection

```
code changed → delivery-workflow
            + hexagonal-development (if layered arch)
            + interface-first-development (if abstraction change)
            → finalize (after completion)
explicit    → /version /security-audit /principle-audit /ai-token-optimize /coverage /test-runner /finalize
```

## Composition

```
finalize = test-runner + coverage + docs-sync + delivery-workflow(commit)
```

## Format

Markdown headings for structure + XML tags (`<constraints>`, `<criteria>`, `<instruction>`) for semantic boundaries. This hybrid format is validated for cross-model compatibility.

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
