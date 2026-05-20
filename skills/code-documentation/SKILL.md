---
name: code-documentation
description: Document public code surfaces and API behavior using the project's native documentation conventions while avoiding redundant comments and private implementation noise.
---

# Code Documentation

## Sequence

detect documentation conventions → identify public surfaces → document intent, inputs, outputs, errors, and side effects → document externally visible endpoints or messages → remove or avoid redundant comments → verify style consistency

## What To Document

- public surfaces that callers, users, or other system parts depend on
- parameters, accepted ranges, defaults, and nullability
- return values and empty or missing result behavior
- errors, exceptions, and caller recovery expectations
- observable side effects and external interactions
- externally visible request, response, event, or message contracts

## What Not To Document

<constraints>
- do not restate obvious code literally
- do not expose private implementation details unless they explain non-obvious behavior
- do not document temporary helpers as public APIs
- do not replace existing correct comments
- do not add documentation in a style that conflicts with the surrounding project
</constraints>

## Quality Rules

- explain why when behavior is surprising
- keep descriptions concise and caller-oriented
- update stale comments when behavior changes
- place documentation next to the surface it describes unless the project already centralizes API docs
- prefer project-native comment and API documentation formats

## Done

<criteria>
public surfaces documented + external contracts clear + stale comments updated + redundant comments avoided + project documentation style preserved
</criteria>
