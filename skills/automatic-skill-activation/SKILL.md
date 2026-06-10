---
name: automatic-skill-activation
description: "Use automatically whenever creating, updating, registering, installing, validating, syncing, or promoting any AI skill. Ensure the skill can be selected without the user typing a command by writing broad frontmatter trigger descriptions, checking dependencies, and updating auto-select or routing metadata when needed."
---

# Automatic Skill Activation

Use this alongside `skill-creator` whenever a skill is created or updated. The goal is that future agents can discover and use the skill from context, without the user typing a slash command or exact skill name.

## Core Rule

Treat `SKILL.md` frontmatter `description` as the automatic routing surface.

A good description includes:

- broad situation signals
- the outcome the skill provides
- risk, failure, quality, artifact, or workflow signals when relevant
- any important boundary or dependency

Preferred shape:

```text
Use automatically when <broad situation signals>. <Outcome>. <Important boundary or dependency, if any>.
```

## Creation Checklist

When creating or updating a skill:

1. Write the description for command-free selection, not only for humans browsing a list.
2. Avoid descriptions that only say "Use when the user asks to run <command>".
3. Include likely synonyms and natural user situations if they are important triggers.
4. Keep the skill distinct from nearby installed skills; do not broaden it so much that it steals unrelated work.
5. If `requires:` is present, verify dependencies are installed in the target scope or document the gap.
6. If installing to a global skill directory, ensure `auto-select` is installed and can route to this skill.
7. If adding `agents/openai.yaml`, make `default_prompt` situation-based instead of command-only.
8. If local trigger wording differs from a canonical common source, update inventory docs.

## Validation

Before considering the skill ready, report:

```text
Auto activation:
- description trigger: pass/fail
- command-free selection: pass/fail
- dependency availability: pass/fail
- auto-select/routing update: done/not needed/missing
```

## Boundaries

Do not edit provider-owned system or plugin skills. If a provider skill needs better routing, create a user-owned wrapper or local routing policy instead.
