---
name: docs-sync
description: Detect documentation drift from recent code changes and synchronize docs to match the current codebase.
---

## Sequence

scan project docs → identify changed code → map changes to affected docs → update docs → validate structure

## Change-to-Doc Mapping

- new public API/module → API docs, architecture overview
- public interface change → API docs, usage examples
- config change → config guide, env examples
- schema change → data model docs
- dependency change → install guide
- architecture change → architecture docs

## Rules
<constraints>
- code is source of truth: docs follow code
- add sections for new topics
- remove docs for deleted features
- fix broken internal links
- sync TOC with actual headings
- remove duplicate content
</constraints>
