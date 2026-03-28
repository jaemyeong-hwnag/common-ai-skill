---
name: skill-update
description: Detect the currently installed version of common-ai-skill, check for a newer release, and update all installed skills to the latest version.
---

<constraints>
- detect the currently installed version before taking any action
- do not update if already at the latest version
- the update must be atomic — all skills are updated together, never partially
- verify every skill is present and non-empty after the update
- if the update fails, restore the previous state before reporting the error
- report the installed version, the latest version, and the list of changed skills
</constraints>

<criteria>
installed version detected + latest version fetched + update applied if needed + all skills verified present and non-empty + result reported with version diff
</criteria>
