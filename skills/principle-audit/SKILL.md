---
name: principle-audit
description: Audit the codebase for violations of the project's core principles — detect unintended system-imposed constraints that contradict the project's stated goals.
---

## Sequence

find project principles(docs, config) → scan for violations → classify(allowed vs violation) → report + fix

## Violation Types

1. **unintended constraints**: system blocks behavior without business rule
2. **layer boundary**: deps in forbidden direction, logic in wrong layer
3. **consistency**: same-purpose logic in conflicting ways, naming/error-handling mismatch
4. **hardcoded assumptions**: values that should be configurable, env-specific assumptions

## Distinguish

- allowed: status as info | config-based threshold | domain rule rejection
- violation: status blocks execution | hardcoded threshold | infra-layer business decision

## Severity
<criteria>
CRITICAL(direct violation, immediate impact) → fix now
WARNING(violation, currently inactive) → fix this cycle
INFO(potential risk) → comment/TODO
</criteria>

## Report

per violation: file:line + description + related principle + fix recommendation
fix CRITICAL immediately → run tests
