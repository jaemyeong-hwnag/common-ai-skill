---
name: self-recovery
description: Recover failed, stalled, looping, or unsafe AI-run work by monitoring execution, stopping stale attempts, diagnosing root cause, applying the smallest safe fix, verifying, and reporting evidence.
---

# Self Recovery

## Sequence

define success/failure/rollback → run with a timer → monitor evidence → stop stale or unsafe work → classify cause → fix smallest local cause → verify → restart only when safe → report evidence

## Monitor

Track the signals that prove progress or failure:

- exit status
- changing output
- process or job state
- log freshness
- health or readiness signal
- created or modified artifacts
- external dependency status

Do not treat a still-running process as healthy without fresh progress evidence.

## Recovery Rules

<constraints>
- define success and failure before starting work
- use adaptive check intervals based on the task's expected progress
- stop execution that is stale, duplicated, failed, or unsafe before changing state
- never repeat the same failed attempt without a new cause, fix, or diagnostic
- classify the root cause before applying a fix
- prefer the smallest reversible local fix
- do not invent missing credentials, external availability, or success evidence
- restart only after verification or after choosing a safe degraded path
</constraints>

## Cause Classes

- local code or logic defect
- local configuration or environment mismatch
- stale local state, lock, queue, cache, or duplicate execution
- external dependency unavailable or denied
- safety risk, irreversible action, or unclear blast radius

## Done

<criteria>
failed or stale work stopped + cause classified + smallest safe fix applied or blocker reported + verification evidence collected + final state reported
</criteria>
