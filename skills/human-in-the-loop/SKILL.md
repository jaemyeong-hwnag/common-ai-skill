---
name: human-in-the-loop
description: Insert human approval, review, or correction checkpoints into AI workflows — interrupt, wait, resume safely.
---

## Sequence

reach checkpoint → serialize state → emit review request → halt → human acts → restore state → resume

## Interrupt Triggers

```
irreversible actions    → destructive, external, financial
low confidence          → below an explicit threshold
high-cost ambiguity     → wrong assumption cannot be easily undone
compliance gate         → policy or sign-off required
limit approaching       → resource or cost ceiling about to be exceeded
```

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
