---
name: rag-development
description: Implement Retrieval-Augmented Generation pipelines — ingestion, chunking, embedding, retrieval, and generation.
---

## Sequence

ingest → chunk → embed → store → retrieve → rerank → generate

## Rules

<constraints>
- preserve source metadata (origin, section, date) through all stages
- chunk boundaries must respect semantic units
- embedding model must be identical at index time and query time
- retrieval store must match the data scale
- retrieve candidates before filtering by relevance — never pass unfiltered results to generation
- generation output must attribute retrieved sources
</constraints>

## Done

<criteria>
all stages present + metadata preserved + embedding model consistent + sources attributed in output
</criteria>
