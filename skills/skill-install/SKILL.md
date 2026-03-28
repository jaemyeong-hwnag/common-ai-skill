---
name: skill-install
description: Detect which common-ai-skill skills the current project needs and wire them in using the project's available installation method.
---

## Sequence

detect project context(architecture, concerns, existing tooling) → select required skills from common-ai-skill catalog → detect available installation method → install selected skills → verify skills are loadable

## Selection Criteria

```
code changes present       → delivery-workflow
layered architecture       → hexagonal-development
abstraction boundaries     → interface-first-development
AI model integration       → framework-selection + observability
retrieval pipeline         → rag-development
quality measurement        → evaluation
irreversible actions       → human-in-the-loop
multi-agent coordination   → agent-orchestration
explicit request           → version | security-audit | principle-audit | ai-token-optimize | coverage | docs-sync
```

## Installation Methods

detect in order: package manager config → submodule config → manual copy → report if none available

## Rules
<constraints>
- detect project conventions before selecting skills
- do not install skills that are already present and up to date
- do not install skills that are irrelevant to the project context
- installation must be idempotent
- verify each installed skill is loadable after installation
</constraints>

## Done
<criteria>
required skills identified + installed via available method + each skill verified loadable
</criteria>
