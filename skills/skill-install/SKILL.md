---
name: skill-install
description: Detect which common-ai-skill skills the current project needs and wire them in using the project's available installation method.
---

<constraints>
- detect the project's architectural concerns and context before selecting skills
- select only skills that are relevant to the detected concerns
- do not install skills that are already present and up to date
- installation must be idempotent
- verify each installed skill is loadable after installation
</constraints>

<criteria>
project concerns identified + required skills selected + all selected skills installed and verified loadable
</criteria>
