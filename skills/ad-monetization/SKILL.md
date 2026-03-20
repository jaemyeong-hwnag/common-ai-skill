---
name: ad-monetization
description: Integrate display advertising into a client-side app — maximize yield without degrading user experience or performance metrics.
---

## Sequence

identify high-attention placement zones → configure ad units by zone priority → implement state-triggered units → verify policy compliance → measure performance impact

## Placement Priority

```
1. post-primary-content   — after user consumes key value, highest CTR
2. contextual-trigger     — on significant emotional state change, highest CPM, max 1/session
3. persistent-anchor      — on notification or deep-link landing flows
❌ above-fold fixed        — blocks content, causes banner blindness, harms ratings
```

## Rules
<constraints>
- state-triggered (interstitial) units must fire at most once per session
- every ad unit must have a visible dismiss path
- ads must not block or delay the primary user task
- consent mechanism required where legally mandated before ad scripts load
- ad units outside the viewport must be lazy-loaded to protect performance scores
- ad client ID must be stored in environment config, not hardcoded
</constraints>

## Done
<criteria>
units render without errors + state-triggered unit fires once per session on correct trigger + core performance metrics unaffected + policy compliance checklist passed
</criteria>
