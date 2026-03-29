# CLAUDE.md

## Git Flow — Mandatory Procedure

Every code change MUST follow this exact sequence. No exceptions.

```
1. issue    → create GitHub issue FIRST (gh issue create --label "<type>")
2. branch   → create from issue ID: <type>/<issue-number>-<slug>  (base: develop or main)
3. work     → implement on that branch only
4. commit   → one commit per purpose (type: summary, ≤72 chars)
5. push     → git push -u origin <branch>
6. pr       → create PR targeting correct base (auto-pr.yml may do this)
7. review   → wait for CI checks + review
8. merge    → rebase merge (feature/fix/improve/chore) or merge commit (release/hotfix)
```

### Branch Rules

| Type | Base | Target | Format |
|------|------|--------|--------|
| feature | develop | develop | `feature/<issue-id>-<slug>` |
| fix | develop | develop | `fix/<issue-id>-<slug>` |
| improve | develop | develop | `improve/<issue-id>-<slug>` |
| chore | develop | develop | `chore/<issue-id>-<slug>` |
| hotfix | main | main+develop | `hotfix/<issue-id>-<slug>` |
| release | develop | main+develop | `release/<version>` |

<constraints>
- NEVER commit directly to main or develop
- NEVER start work without a GitHub issue
- NEVER create a branch without an issue ID (except release/*)
- NEVER mix purposes in one commit
- NEVER push without a corresponding PR
</constraints>

---

## Permission Boundary

What the agent can and cannot do:

### Allowed Operations
- git operations (fetch, add, commit, push, checkout, branch, log, diff, status, stash, rebase, merge, cherry-pick)
- test execution (npm test, node test/)
- GitHub CLI (gh issue, gh pr)
- web search and fetch from: github.com, arxiv.org, docs.anthropic.com

### Denied Operations
<constraints>
- NEVER run rm -rf on any directory
- NEVER force push to main or develop (git push --force origin main/develop)
- NEVER run git reset --hard without explicit user approval
- NEVER install or remove npm/pip packages without user approval
- NEVER modify .github/workflows/ without explicit request
- NEVER access or create files containing secrets, credentials, or API keys
</constraints>

---

## Execution Sandbox

How to ensure safe, rollback-capable execution:

<constraints>
- all work happens on feature branches — never on main or develop directly
- every change must be committed before switching context — uncommitted work is lost state
- prefer git stash over discarding changes when switching tasks
- test after every significant change — run npm test before committing
- if a command might have irreversible side effects, ask the user first
- workflow files are high-risk — changes require explicit user request
</constraints>

---

## Context Strategy

How to manage what the agent sees:

<constraints>
- map over manual — provide pointers to files, not full contents
- scoped context — load only what the current task requires
- repository-centered — all agent knowledge lives in versioned artifacts in this repo
- knowledge promotion — external knowledge must become a repo artifact before agent use
- context compaction — when context grows large, summarize older observations to preserve recent work
</constraints>

### Key Files Map

```
CLAUDE.md              → harness rules, git flow, context strategy, recovery guide
CONTRIBUTING.md        → AI audit procedure, skill design principles, branch rules
README.md              → skill index, auto-selection logic, all skill definitions
skills/*/SKILL.md      → individual skill interface definitions
.github/workflows/     → CI/CD automation (9 workflows)
.claude/settings.local.json → permission boundaries and hooks
test/init.test.js      → installation validation tests
```

---

## Session Continuity

When work spans multiple sessions or context resets:

<constraints>
- before ending a session, commit all work-in-progress to the branch
- write a progress comment on the linked GitHub issue summarizing: what was done, what remains, what to do next
- next session: read the issue comments and git log to restore context
- never rely on memory alone — the repo and issue tracker are the source of truth
- if a task is too large for one session, break it into sub-issues
</constraints>

---

## Recovery Guide

When things go wrong:

| Situation | Recovery |
|-----------|----------|
| CI check fails | read the PR comment, fix the violation, push new commit |
| abstraction check fails | remove technology-specific terms from SKILL.md |
| branch name invalid | create new branch with correct format, cherry-pick commits |
| merge conflict | rebase branch onto base, resolve conflicts, force-push branch |
| accidental commit to wrong branch | git cherry-pick to correct branch, reset wrong branch |
| test failure | read error output, fix code, re-run `npm test` |
| workflow YAML error | validate syntax, check indentation, push fix |

<constraints>
- NEVER use destructive commands (rm -rf, git push --force on main/develop) without explicit user approval
- diagnose root cause before applying fix — no blind retries
- if same error occurs 3+ times, escalate to user instead of retrying
</constraints>

---

## Skills

This project hosts abstract AI skill interfaces at `skills/*/SKILL.md`.

<constraints>
- skills define WHAT, never HOW
- zero technology-specific references (no language, library, tool, command, or file path names)
- single responsibility per skill
- format: YAML frontmatter + Markdown headings + XML tags
- README.md must always reflect the full content of every skill
</constraints>

## Commands

```
npm test                  → run installation validation tests
npx ai-skill-interface    → install skills to ~/.claude/skills/
```
