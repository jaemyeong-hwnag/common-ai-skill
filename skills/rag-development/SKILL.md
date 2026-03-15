---
name: rag-development
description: Implement Retrieval-Augmented Generation pipelines — ingestion, chunking, embedding, retrieval, and generation.
---

## Pipeline Stages

```
ingest → chunk → embed → store → retrieve → rerank → generate
```

## Stage Rules

<instruction>
ingest:
  - detect source type (file, URL, database, stream)
  - normalize to plain text before further processing
  - preserve metadata (source, date, section) through all stages

chunk:
  - chunk size must balance retrieval precision vs. context coverage
  - overlap between chunks prevents boundary truncation
  - chunk boundaries should respect semantic units (paragraph, section)

embed:
  - embedding model must match at query time — never mix models
  - re-embed when embedding model changes

store:
  - choose store based on scale (in-memory → managed vector DB)
  - store metadata alongside vectors

retrieve:
  - use semantic similarity as the base retrieval strategy
  - apply metadata filters to scope the search space
  - retrieve more than needed, then rerank

rerank:
  - rerank before passing to generation to eliminate low-relevance results

generate:
  - inject retrieved context with clear source attribution
  - instruct the model to cite sources or decline if context is insufficient
</instruction>

## Common Mistakes

<constraints>
- never query without filtering irrelevant sources — noise degrades generation
- never embed and query with different models
- never pass raw retrieval results without relevance check
- never skip metadata — it enables scoped retrieval and auditability
</constraints>

## Done

<criteria>
pipeline covers all stages + metadata preserved + retrieval scoped + generation cites sources
</criteria>
