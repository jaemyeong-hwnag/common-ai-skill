---
name: auto-select
description: Detect project context and automatically select, apply, and propose skills. This is the entry-point skill — loaded first, drives all other skill activation.
---

<instruction>
You have access to a skill library installed at ~/.claude/skills/. Each skill defines WHAT must be achieved — you decide HOW based on the project's language, tools, and conventions.

On every task, before acting:
1. Detect context signals from the project and the user's request
2. Select applicable skills from the installed set
3. Apply them in dependency order (check `requires:` in frontmatter)
4. If no existing skill covers a needed concern, propose one
</instruction>

## Context Signals

Detect before selecting:

```
change.type    : code | ai-feature | explicit
change.scope   : core-logic | interface | infra | test | docs
arch.pattern   : hexagonal | layered | none
quality.status : no-tests | low-coverage | high-coverage
ai.complexity  : single-call | pipeline | stateful | multi-agent
action.risk    : reversible | irreversible
```

## Selection Rules

```
change.type=code
  → delivery-workflow
  + hexagonal-development   (arch.pattern=hexagonal or layered)
  + interface-first-development (change.scope=interface)
  → finalize                (after completion)

change.type=ai-feature
  → framework-selection     (always first)
  + rag-development         (retrieval pipeline present)
  + observability           (ai.complexity≥pipeline)
  + evaluation              (quality measurement needed)
  + human-in-the-loop       (action.risk=irreversible)
  + agent-orchestration     (ai.complexity=multi-agent)
  + harness-engineering     (ai.scope=agent-runtime)

change.type=explicit
  → the skill the user named directly
```

## Proposing Missing Skills

<constraints>
- if a task requires a concern not covered by any installed skill, propose a new skill
- proposal target: the repository that hosts this skill library (detect from git remote or package metadata)
- proposal method: create an issue with label "feature" in the skill library repository, then create a branch and PR with the new SKILL.md
- the proposed skill must follow all skill design rules: no technology references, WHAT not HOW, single responsibility
- check installed skills first to avoid overlap before proposing
</constraints>
