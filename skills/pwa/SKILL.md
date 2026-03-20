---
name: pwa
description: Configure a client-side web app for installation, offline use, and push notifications.
---

## Sequence

declare app identity and entry point → define installability criteria → implement offline caching strategy → add install prompt → integrate push notification subscription

## Caching Strategy

```
static assets        → cache-first, long TTL
dynamic API data     → stale-while-revalidate, short TTL
navigation requests  → network-first with offline fallback
```

## Rules
<constraints>
- push credentials must never be embedded in client code
- offline behavior must be explicitly designed, not assumed by the caching layer
- install prompt must appear only after the user has demonstrated intent
- caching strategy must differentiate static assets from dynamic data
- push permission must be requested only after a user-initiated action, never on page load
- always provide a path to unsubscribe from push
</constraints>

## Done
<criteria>
app is installable from the browser + offline state shows cached content, not a blank screen + push subscription flow complete + push credentials stored outside client bundle
</criteria>
