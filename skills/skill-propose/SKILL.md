---
name: skill-propose
description: Analyze the current project to identify missing skills and submit a pull request proposing the new skill to the common-ai-skill repository.
---

## Sequence

audit existing skills → identify gap(missing concern or coverage) → define new skill following project principles → submit proposal as pull request targeting develop branch

## Proposal Format

```
branch: improve/<descriptive-name>
target: develop
title: feat: add <skill-name> skill
body:
  ## Motivation
  - what concern is not covered by existing skills
  ## Skill Definition
  - name, sequence, constraints, done criteria
  ## Validation
  - no technology references
  - abstract goal only
  - cross-model compatible
```

## Rules
<constraints>
- proposed skill must define WHAT, never HOW
- no technology-specific references in skill definition
- every proposed skill must have: sequence + constraints + done criteria
- proposed skill must not overlap with existing skills
- branch from develop; PR targets develop
</constraints>

## Done
<criteria>
gap identified + skill definition follows project principles + pull request submitted to develop
</criteria>
