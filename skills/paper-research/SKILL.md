---
name: paper-research
description: >
  Use proactively whenever academic literature could improve answer quality,
  even when the user does not mention papers or research. Trigger on technical
  questions where peer-reviewed or preprint evidence would strengthen the
  answer: algorithm internals, system design trade-offs, performance analysis,
  novel techniques, comparisons of named methods, claim validation, arXiv IDs,
  DOI references, conference names, academic PDFs, Korean cues such as "논문",
  "선행 연구", "관련 연구", "레퍼런스", "최신 동향", "SOTA", "근거 있어",
  "출처", and English cues such as "paper", "prior work", and "benchmark".
---

# Paper Research

<instruction>
Use academic evidence when it clearly improves a technical answer, even if the
user did not ask for papers. Keep automatically triggered citations lightweight:
the main answer comes first, and research support follows only as much as it
helps the user decide, verify, or go deeper.
</instruction>

## Activation

Trigger this skill for:

- algorithm or data-structure internals where original or survey literature exists
- system design trade-offs with empirical or comparative research
- performance analysis, benchmark interpretation, or claims about speed, accuracy, scale, or quality
- named techniques, models, protocols, storage designs, indexing methods, compression methods, ranking methods, or distributed algorithms
- comparisons such as "A vs B" when prior work can clarify differences
- requests for trend, state of the art, recent work, prior work, references, evidence, or source attribution
- academic identifiers, conference names, paper titles, author names, or uploaded academic documents

Skip this skill for:

- casual conversation, non-technical requests, or simple opinion prompts
- product documentation or API usage where official docs are the primary source
- trivial syntax, setup, or environment questions
- ordinary code writing or review unless the user asks about the underlying method or evidence
- explicit requests for a short answer without sources or research depth

When uncertain, trigger lightly and include at most one compact research note.

## Modes

| Mode | Signal | Outcome |
|---|---|---|
| Automatic support | technical question where literature would help | answer normally, then add a short research note |
| Search | broad topic, trend, or evidence request | find a small set of relevant papers and synthesize |
| Single-paper analysis | paper identifier, title, URL, or academic document | summarize metadata, method, results, limits, and source |
| Survey or comparison | multiple methods, "A vs B", state of the art | compare representative papers and explain trade-offs |

## Workflow

1. Classify whether the user needs mechanism, evidence, comparison, trend, or validation.
2. Search or inspect academic sources only as deeply as the task requires.
3. Prefer original papers, reputable venues, surveys, replicated benchmarks, and papers with visible evaluation artifacts.
4. Distinguish peer-reviewed work from preprints and note uncertainty when publication status is unclear.
5. Extract the problem, contribution, method, evaluation setup, key results, limitations, and practical implications.
6. Synthesize instead of listing: explain what the evidence changes about the answer.
7. Cite sources with stable identifiers or venue/year metadata when available.

## Source Priority

Use the strongest available evidence for the user's domain:

1. peer-reviewed conference, journal, or workshop papers
2. well-cited preprints with clear methodology
3. official proceedings, author pages, and reproducibility artifacts
4. benchmark leaderboards or implementation indexes as supporting evidence only
5. secondary summaries only when primary sources are unavailable or used for navigation

## Output

For automatic support, keep the research note short:

```
참고: <paper or venue/year> reports a related finding: <one practical implication>.
```

For a single paper:

```
# <title>
Authors / venue or status / year

## One-line Summary
## Core Contributions
## Method
## Results
## Limitations
## Practical Takeaway
## Sources
```

For a survey or comparison:

```
## Related Work: <topic>

### 1. <paper>
- Core idea:
- Evidence:
- Limit:
- Source:
```

## Rules

<constraints>
- do not make remembered numeric claims without source verification
- do not over-weight a preprint when peer-reviewed evidence contradicts it
- do not let citations overwhelm the answer when research was not explicitly requested
- keep summaries copyright-safe and concise
- measured results, author claims, and practical interpretation remain distinguishable
- report when no strong academic evidence was found
</constraints>

**Done**
<criteria>
the answer uses the right level of academic evidence + source status is clear + claims are attributed + limitations are stated + automatic citations remain lightweight
</criteria>
