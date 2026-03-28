---
name: skill-update
description: Detect the currently installed version of common-ai-skill, check for a newer release, and update all installed skills to the latest version.
---

## Sequence

detect installation method → detect installed version → fetch latest release version → compare versions → if update available: update via detected method → verify all skills present and non-empty → report result

## Version Detection

detect in order: package manager lock file → submodule ref → installed SKILL.md metadata → report unknown if none found

## Update Methods

match detected installation method:
- package manager → update via package manager
- submodule → pull latest ref
- manual copy → re-run installer with latest source

## Rules
<constraints>
- detect installation method before attempting update
- do not update if already at latest version
- update must be atomic — all skills updated together, never partial
- verify every skill is present and non-empty after update
- if update fails, restore previous state and report error
- report installed version, latest version, and list of changed skills
</constraints>

## Done
<criteria>
installed version detected + latest version fetched + update applied if needed + all skills verified + result reported
</criteria>
