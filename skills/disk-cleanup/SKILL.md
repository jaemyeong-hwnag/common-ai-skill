---
name: disk-cleanup
description: Use automatically when disk space is low, user asks to free storage, remove unnecessary cache files, clean development caches, inspect large cache folders, or safely reclaim macOS/Linux workspace storage. Provides an audit-first cleanup workflow with dry-run scripts, approval checkpoints for destructive deletion, and optional aggressive model-cache removal.
---

# Disk Cleanup

## Overview

Use this skill to reclaim disk space without guessing. Always audit cache sizes first, run cleanup in dry-run mode, then request approval before destructive deletion outside the workspace.

## Workflow

1. Audit free space and cache sizes:

```bash
bash scripts/audit_caches.sh
```

2. Review the largest entries and classify them:

- Conservative cleanup: package manager caches, app update caches, browser/app caches, Gradle daemon/cache files, and build tool caches.
- Aggressive cleanup: Hugging Face hub cache, local model caches, Codex runtimes, or anything that may require large downloads to restore.
- Preserve: project source, credentials, databases, user documents, active worktrees, JetBrains/IntelliJ state, and unknown non-cache folders.

3. Preview cleanup:

```bash
bash scripts/clean_caches.sh
```

4. Ask the user for approval before running the destructive command. Include the exact mode and the main paths that will be deleted.

5. Run the approved cleanup:

```bash
bash scripts/clean_caches.sh --apply
```

6. Re-run the audit and report before/after free space.

## Aggressive Options

Use aggressive options only when the user explicitly accepts re-download or regeneration cost:

```bash
bash scripts/clean_caches.sh --apply --aggressive-hf
bash scripts/clean_caches.sh --apply --include-agentic-models
bash scripts/clean_caches.sh --apply --include-codex-runtimes
```

`--aggressive-hf` removes the Hugging Face hub cache. This can reclaim many GB, but model files will need to be downloaded again.

`--include-agentic-models` removes local agentic-capital model files under `~/.cache/agentic-capital/models`.

`--include-codex-runtimes` removes cached Codex runtimes and may force runtime reinstallation.

## Safety Rules

- Never delete source directories, repositories, databases, user documents, or credential stores as part of this skill.
- Never delete JetBrains/IntelliJ paths by default, including `~/Library/Caches/JetBrains`, `~/Library/Application Support/JetBrains`, `~/Library/Preferences/*JetBrains*`, `~/Library/Preferences/*IntelliJ*`, and JetBrains plugin/options folders. JetBrains cache removal can reset or hide IDE plugins/options; use the IDE's own cache invalidation UI instead.
- Do not clear model caches by default; treat them as aggressive cleanup.
- Prefer tool-native cleanup commands when available before deleting cache directories directly.
- After tool-native cleanup, it is still acceptable to remove leftover cache-only directories when they are clearly disposable and can be regenerated.
- If an app is actively running, deleting its cache is usually safe but may be immediately recreated. Mention this in the final report when relevant.
- If a command fails due to sandbox permissions, rerun it only with explicit user approval.

## Verification

Validate scripts with:

```bash
bash -n scripts/audit_caches.sh
bash -n scripts/clean_caches.sh
bash scripts/clean_caches.sh
```

Successful completion means the cleanup script exits 0, the post-clean audit shows increased free space, and the final report lists what was preserved.
