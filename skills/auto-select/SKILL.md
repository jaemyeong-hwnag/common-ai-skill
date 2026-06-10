---
name: auto-select
description: Use automatically as a broad entry-point for non-trivial AI agent work, even when the user does not name a skill. Detect project context, risk, code/docs/test/security/RAG/AI workflow signals, then select and apply the relevant installed skills in dependency order.
---

<instruction>
You have access to a global skill library. Each skill defines WHAT must be achieved; you decide HOW based on the current project, tools, permissions, and user request.

Use this as a broad routing skill. On every non-trivial task, even when the user does not name a skill:
1. Detect context signals from the request and repository.
2. Select applicable installed skills by purpose, not by command name.
3. Apply selected skills in dependency order when dependencies are installed.
4. Skip missing optional skills without failing; use the nearest installed skill or propose a new one.
5. Keep selection lightweight. Do not announce every skill unless it matters to the user.
</instruction>

## Context Signals

Detect before selecting:

```text
change.type    : code | docs | test | ai-feature | ops | release | explicit
change.scope   : core-logic | interface | infra | config | script | docs | skill-inventory
quality.status : unknown | no-tests | low-coverage | failing-tests | high-coverage
action.risk    : reversible | destructive | external | credential | irreversible
ai.system      : none | rag | agent-runtime | automation | evaluation
execution      : none | command | test | server | daemon | deployment | monitor
system.storage : normal | low-disk | cleanup-requested
```

## Selection Rules

Use these skills automatically when their signals appear:

```text
Any implementation/code/config/script change
  -> worktree-parent-rebase (child or agent-provided worktree, before edits)
  -> delivery-workflow
  + test-runner          (after change or when verifying)
  + coverage             (new behavior, low coverage, or coverage requested)
  + docs-sync            (public behavior, config, API, schema, install, or workflow changed)
  -> finalize            (when wrapping up)

Any command/test/server/deployment/monitor run
  -> self-recovery       (define success/failure, monitor, recover stalls/failures)

Tool/library/architecture/package/approach choice
  -> framework-selection

Security-sensitive work
  -> security-audit      (secrets, env, auth, permissions, deps, install scripts, network, infra)

Project principle, ownership, architecture, or consistency risk
  -> principle-audit

RAG answer quality problem
  -> rag-failure-diagnosis
  -> rag-regression-testing after retrieval/prompt/fallback/guardrail changes

Agent runtime, automation, sandbox, guardrail, workflow reliability, long-running AI work
  -> harness-engineering

Irreversible, destructive, external, credential, high-cost, or ambiguous actions
  -> human-in-the-loop

Release/version/changelog/tag/package publication
  -> version

Skill creation, update, registration, installation, validation, or sync
  -> automatic-skill-activation
  + framework-selection    (when choosing source/install scope)
  + security-audit         (external repo, install script, or global install involved)

Disk pressure, cache cleanup, or storage reclamation
  -> disk-cleanup
  + human-in-the-loop      (before destructive deletion)
```

## Rough Selection Policy

<constraints>
- Prefer using a relevant installed skill over waiting for the user to name it.
- Use broad trigger matching; it is better to apply a lightweight relevant skill than miss an important quality or safety guard.
- Do not force every skill onto every task. Pick the smallest useful set.
- Do not load missing skills. If a missing concern is important, say which skill is missing and continue with the closest available workflow.
- Preserve user intent and project conventions over generic skill text.
</constraints>

## Proposing Missing Skills

<constraints>
- if a task requires a concern not covered by any installed skill, propose a new skill
- proposal target: the repository that hosts this skill library, unless project conventions say otherwise
- the proposed skill must follow all skill design rules: clear trigger description, WHAT not HOW, single responsibility
- check installed skills first to avoid overlap before proposing
</constraints>
