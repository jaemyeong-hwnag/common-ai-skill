# CLAUDE.md

## Git Flow — Mandatory Procedure

Every code change MUST follow this exact sequence. No exceptions. No shortcuts.

### Procedure

```
1. issue    → create a GitHub issue FIRST (gh issue create --label "<type>")
2. branch   → create branch from issue ID: <type>/<issue-number>-<slug>
3. work     → implement changes on that branch
4. commit   → one commit per purpose (type: summary, ≤72 chars)
5. push     → push branch to remote (git push -u origin <branch>)
6. pr       → create PR targeting the correct base branch
7. review   → wait for CI checks and review
8. merge    → rebase merge (feature/fix/improve/chore) or merge commit (release/hotfix)
```

### Branch Rules

| Type | Base | Target | Format |
|------|------|--------|--------|
| feature | develop | develop | `feature/<issue-id>-<slug>` |
| fix | develop | develop | `fix/<issue-id>-<slug>` |
| improve | develop | develop | `improve/<issue-id>-<slug>` |
| chore | develop | develop | `chore/<issue-id>-<slug>` |
| hotfix | main | main + develop | `hotfix/<issue-id>-<slug>` |
| release | develop | main + develop | `release/<version>` |

### Hard Constraints

<constraints>
- NEVER commit directly to main or develop
- NEVER start work without a GitHub issue
- NEVER create a branch without an issue ID (except release/*)
- NEVER mix purposes in one commit
- NEVER push without a corresponding PR
- branch name MUST match format: <type>/<issue-number>-<description>
- PR base: develop for feature/fix/improve/chore, main for release/hotfix
- all CI checks MUST pass before merge
</constraints>

## Skills

This project hosts abstract AI skill interfaces at `skills/*/SKILL.md`.

### Skill Design Rules

<constraints>
- skills define WHAT, never HOW
- zero technology-specific references (no language, library, tool, command, or file path names)
- single responsibility per skill
- format: YAML frontmatter + Markdown headings + XML tags (<constraints>, <criteria>, <instruction>)
- README.md must always reflect the full content of every skill
</constraints>

## Project Commands

- `npm test` — run installation tests
- `npx ai-skill-interface` — install skills to ~/.claude/skills/
