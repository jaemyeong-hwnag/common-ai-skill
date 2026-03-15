---
name: human-in-the-loop
description: Insert human approval, review, or correction checkpoints into AI workflows — interrupt, wait, resume safely.
---

## Sequence

reach checkpoint → serialize state → emit review request → halt → human acts → restore state → resume

## When to Interrupt

<constraints>
- irreversible actions (destructive, external, financial)
- confidence below an explicit threshold
- ambiguous task where wrong assumptions have high cost
- policy or compliance sign-off required
- resource or cost limit about to be exceeded
</constraints>

## Escalation Tiers

```
soft  → surface suggestion, continue unless rejected
hard  → halt until explicit approval
stop  → halt and require human restart
```

## Rules

<constraints>
- state at interrupt must be fully serializable
- resume path must be idempotent — no duplicated side effects
- review payload must include: pending action, context, options
- rejected actions must be recorded with reason
- never auto-resume on timeout without an explicit policy
</constraints>

## Done

<criteria>
all irreversible actions have an interrupt point + state serializable + resume idempotent + rejections recorded
</criteria>
