---
name: viral-share
description: Make app output shareable in one action — implement the share mechanism, craft share content, and configure social previews for screenshot-driven spread.
---

## Sequence

implement primary share mechanism → define fallback for unsupported environments → craft share content template → configure social meta tags → design share-worthy visual state

## Share Content Template

```
[app name/identity] + [core metric(s)] + [status message] + [URL]
max 280 chars — readable without app context
include 2–3 relevant signals for visual scan
```

## Social Meta

```
og:title        → dynamic state summary
og:description  → one-line metric + status
og:image        → 1200×630, high contrast, key numbers large
twitter:card    → summary_large_image
```

## Rules
<constraints>
- share trigger must be reachable without scrolling from the primary output
- share action must complete in a single user gesture — no confirmation dialogs
- share content must be meaningful without app context (standalone readability)
- visual design of the shareable state must prioritize legibility and emotional impact over UI completeness
- a fallback (clipboard copy) must work in all environments where the primary mechanism is unavailable
</constraints>

## Done
<criteria>
share completes in one gesture + fallback works across all environments + social preview renders correctly in major platforms + share trigger is visible without scroll
</criteria>
