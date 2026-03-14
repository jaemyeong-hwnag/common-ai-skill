---
name: version
description: Manage semantic versioning — auto-detect version bump type from recent commits, update version files, write CHANGELOG, and create a git tag.
---

## Bump Rules

BREAKING CHANGE→MAJOR(X+1.0.0) | feat→MINOR(X.Y+1.0) | fix,refactor,perf→PATCH(X.Y.Z+1) | test,docs,chore→no change

## Sequence

detect current version(tags→version files→CHANGELOG) → determine bump(arg or auto from commits) → update all version files → write CHANGELOG(Added/Changed/Fixed/Removed) → commit + tag

## Usage

```
/version (auto) | /version patch | /version minor | /version major
```
