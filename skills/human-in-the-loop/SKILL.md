---
name: human-in-the-loop
description: Insert human approval, review, or correction checkpoints into AI workflows — interrupt, wait, resume safely.
---

## When to Interrupt

<instruction>
interrupt and wait for human input when:
- the action is irreversible (delete, send, deploy, charge)
- confidence is below an explicit threshold
- the task is ambiguous and wrong assumptions have high cost
- a policy or compliance rule requires sign-off
- the agent is about to exceed a resource or cost limit
</instruction>

## Interrupt–Resume Pattern

```
reach checkpoint → serialize full state → emit review request → halt
human reviews    → approves / rejects / edits
resume           → restore state → continue from checkpoint
```

## Rules

<constraints>
- state at interrupt must be fully serializable — no in-memory-only references
- the resume path must be idempotent — re-running from the checkpoint must not duplicate side effects
- never auto-resume after timeout without explicit policy; default is to stay halted
- the human review payload must include: what action is pending, what context led to it, what the options are
- rejected actions must record why, to inform future behavior
</constraints>

## Escalation Tiers

```
tier 1: soft interrupt — surface suggestion, continue unless rejected within window
tier 2: hard interrupt — halt until explicit approval
tier 3: full stop     — halt and require human restart
```

<instruction>
select the lowest tier that satisfies the risk level of the action
</instruction>

## Done

<criteria>
all irreversible actions have an interrupt point + state serializable + resume idempotent + rejection recorded
</criteria>
