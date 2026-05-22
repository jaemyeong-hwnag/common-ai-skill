---
name: worktree-parent-rebase
description: Use automatically before starting work in a child worktree, Codex-provided task worktree, delegated worktree branch, or parallel agent worktree. Ensure the worktree branch is safely rebased onto its parent or base branch before edits begin, and stop instead of rewriting dirty or ambiguous work.
requires: [human-in-the-loop, self-recovery]
---

## Purpose

Keep child worktree branches current with their parent branch before work starts, so Codex-provided task worktrees and delegated agent work begin from the intended base and do not drift from upstream changes.

## Activation

Trigger this skill before edits when the task involves:

- a Codex-provided task worktree or child worktree
- a delegated task, parallel agent task, or sandbox backed by its own worktree branch
- a branch, worktree, sandbox, or fork created from a parent branch
- resuming work on a non-parent branch after the parent may have changed
- integrating agent-generated work where the base branch matters

Skip only when the task is read-only, no worktree branch is involved, or the project explicitly forbids rebasing for this worktree flow.

## Sequence

detect worktree branch context -> identify parent branch -> verify clean workspace -> refresh parent when allowed -> rebase worktree branch onto parent -> verify ancestry -> begin work

## Parent Selection

Prefer the parent branch from explicit worktree metadata, task metadata, or user instruction. If unavailable, infer from project conventions, review base, branch relationship, upstream tracking, or the nearest stable integration branch.

If multiple plausible parents remain, stop and ask for the parent branch instead of guessing.

## Rules

<constraints>
- perform this before making task edits
- never rebase the parent branch itself as the child branch
- never rebase when the workspace has uncommitted user changes unless the user explicitly approves how to preserve them
- never discard, reset, or overwrite existing work to make a rebase succeed
- refresh the parent only through project-approved network and repository conventions
- resolve only straightforward conflicts that are clearly caused by the current task context
- stop on ambiguous conflicts, unclear parentage, protected branches, or ownership uncertainty
- do not force-push after a rebase unless the user explicitly requested publishing rewritten history or the repository worktree flow already authorizes it for the owned child branch
</constraints>

## Verification

Before continuing with task work, confirm:

<criteria>
current branch is the worktree child branch + parent branch is known + workspace was clean before rebase + worktree branch now includes the parent branch tip + no unresolved conflicts remain
</criteria>

## Report

```
Parent rebase:
- child branch:
- parent branch:
- preflight:
- action:
- verification:
- blockers:
```
