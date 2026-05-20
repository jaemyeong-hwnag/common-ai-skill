---
name: rag-failure-diagnosis
description: Diagnose failures in retrieval-augmented answers by assigning the first failing subsystem: retrieval, generation, server behavior, guardrails, or a combination.
---

# RAG Failure Diagnosis

## Sequence

capture question and answer → inspect retrieved evidence → compare evidence to question → compare answer to evidence → inspect fallback or guardrail behavior → assign first failing subsystem → recommend smallest next fix

## Verdicts

Use one explicit verdict:

- retrieval failure
- generation failure
- server or guardrail failure
- combined retrieval and generation failure
- insufficient evidence to decide

## Diagnosis Rules

<constraints>
- judge retrieval before judging generation
- if no relevant evidence was retrieved but relevant corpus content should exist, blame retrieval coverage or search
- if retrieved evidence is relevant but indirect, blame retrieval filtering or ranking
- if evidence is correct but the answer ignores, weakens, mistranslates, or invents facts, blame generation
- if fallback or guardrail behavior overrides useful evidence, blame server or guardrail behavior
- if metadata indicates no evidence was available, evaluate no-context behavior instead of answer quality
- do not hide behind vague quality labels; state the first failing responsibility
</constraints>

## Evidence To Report

- original question
- retrieved evidence summary and relevance judgment
- answer behavior that failed
- first failing subsystem
- smallest next fix

## Done

<criteria>
clear subsystem verdict + evidence-backed cause + next fix scoped to retrieval, generation, server behavior, guardrails, or data
</criteria>
