---
name: interface-first-development
description: Define contracts before implementations. Use when adding or changing abstractions, service boundaries, or cross-layer dependencies.
---

## Sequence

detect project's abstraction mechanism → define/update contract first → implement after contract stable → wire via DI/config → update external boundaries only for surface changes → test contract behavior

## Rules
<constraints>
- infrastructure types must not appear in contract signatures
- function signatures: minimal, intention-revealing
- prefer extending existing contracts over ad-hoc cross-layer deps
- one contract = one responsibility
</constraints>
