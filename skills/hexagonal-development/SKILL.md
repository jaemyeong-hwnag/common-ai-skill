---
name: hexagonal-development
description: Detect and enforce layered architecture boundaries. Use when the project separates concerns into layers and changes touch layer boundaries.
requires: [interface-first-development]
---

## Sequence

detect project layer structure → apply change flow inside-out

## Change Flow

domain/business rule → inbound contract → outbound contract → infrastructure adapter → presentation mapping

## Rules
<constraints>
- detect existing layer naming, do not rename/restructure unless requested
- domain layer: zero deps on infrastructure or presentation
- infrastructure types must not leak into domain or contract layers
- explicit mapping between infrastructure models and domain models
- presentation layer: thin, delegates to use-cases
- deps always point inward: outer→inner, never reverse
</constraints>
