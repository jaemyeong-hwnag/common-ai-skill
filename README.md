# common-ai-skill

## Directive
<instruction>
Skills are interfaces: each skill defines WHAT must be achieved — never HOW.
You are the implementation: read the skill → inspect this project → fulfill the contract using this project's own language, tools, and conventions.
One skill works for any project, any language, any AI — because you are the adapter.
</instruction>

## Installation

```bash
# npm — installs skills to ~/.claude/skills/
npx common-ai-skill

# pip — installs skills to ~/.claude/skills/
pip install common-ai-skill && common-ai-skill

# git submodule — wires skills into your project's CLAUDE.md
curl -sL https://raw.githubusercontent.com/jaemyeong-hwnag/common-ai-skill/main/scripts/submodule-install.sh | sh
```

## How Skills Are Loaded

Each skill lives in `skills/<name>/SKILL.md`. When an AI reads this repository, it loads the relevant skill files directly. The README serves as the index and auto-selection guide; each skill's full definition is below and in its own file.

## Context Signals

Detect these signals before selecting skills:

```
change.type    : code | ai-feature | explicit
change.scope   : core-logic | interface | infra | test | docs
arch.pattern   : hexagonal | layered | none
quality.status : no-tests | low-coverage | high-coverage
ai.complexity  : single-call | pipeline | stateful | multi-agent
action.risk    : reversible | irreversible
```

## Auto-Selection

```
change.type=code
  → delivery-workflow
  + hexagonal-development   (arch.pattern=hexagonal or layered)
  + interface-first-development (change.scope=interface)
  → finalize                (after completion)

change.type=ai-feature
  → framework-selection     (always first)
  + rag-development         (retrieval pipeline present)
  + observability           (ai.complexity≥pipeline)
  + evaluation              (quality measurement needed)
  + human-in-the-loop       (action.risk=irreversible)
  + agent-orchestration     (ai.complexity=multi-agent)

change.type=explicit
  → /version /security-audit /principle-audit /ai-token-optimize
    /coverage /test-runner /finalize
```

## Composition

```
finalize = test-runner + coverage + docs-sync + delivery-workflow(commit)
```

## Dependency Order

Apply required skills before dependent skills. Detect `requires:` in each SKILL.md frontmatter and resolve in dependency order before execution.

---

## Skills

### delivery-workflow
> Enforce the full delivery cycle for every implementation task. Covers coding, testing, coverage, commit rules, and auto-commit on completion. This skill MUST be followed for all code changes.

**Sequence**

implement → run tests → fix failures → repeat until pass → add/update tests for changed behavior → rerun → commit by purpose

**Rules**
<constraints>
- every code change requires test run
- new behavior requires new tests
- changed behavior requires updated tests
- commit only when all tests pass
- never mix purposes in one commit
- auto-commit when work is complete
</constraints>

**Commit Format**

```
format: <type>: <imperative summary, ≤72 chars>
types: feat=new feature | fix=bug fix | refactor=no behavior change | test=test change | docs=doc change | chore=build/config/deps
forbidden: vague summaries (update, fix issues, changes)
```

**Done**
<criteria>
all tests pass + tests exist for changed behavior + commits separated by purpose
</criteria>

---

### hexagonal-development
> Detect and enforce layered architecture boundaries. Use when the project separates concerns into layers and changes touch layer boundaries.

**Sequence**

detect project layer structure → apply change flow inside-out

**Change Flow**

domain/business rule → inbound contract → outbound contract → infrastructure adapter → presentation mapping

**Rules**
<constraints>
- detect existing layer naming, do not rename/restructure unless requested
- domain layer: zero deps on infrastructure or presentation
- infrastructure types must not leak into domain or contract layers
- explicit mapping between infrastructure models and domain models
- presentation layer: thin, delegates to use-cases
- deps always point inward: outer→inner, never reverse
</constraints>

---

### interface-first-development
> Define contracts before implementations. Use when adding or changing abstractions, service boundaries, or cross-layer dependencies.

**Sequence**

detect project's abstraction mechanism → define/update contract first → implement after contract stable → wire via DI/config → update external boundaries only for surface changes → test contract behavior

**Rules**
<constraints>
- infrastructure types must not appear in contract signatures
- function signatures: minimal, intention-revealing
- prefer extending existing contracts over ad-hoc cross-layer deps
- one contract = one responsibility
</constraints>

---

### test-runner
> Detect the project's test runner and execute the full test suite with coverage reporting. Fail fast and fix on failure.

**Sequence**

detect test framework from project → run full suite → on failure: classify(code bug|test bug) → fix → rerun → repeat until pass → summarize

**Output Format**

```
Tests:total=N passed=N failed=N skipped=N Coverage:N% Duration:Xs
```

**Rules**
<constraints>
- tests must be independently runnable, no order dependency
- mock only external I/O boundaries
</constraints>

---

### coverage
> Analyze test coverage and drive it to 80%+ by writing missing tests. Detects the project's test runner automatically.

**Sequence**

detect coverage tool → measure → identify uncovered code → write tests → remeasure → repeat until ≥80%

**Priority**

core business logic → service/use-case → infrastructure/integration → entry points

**Test Strategy**

happy path + boundary values + error paths + all conditional branches

**Exclusions**

entry-point bootstrap | auto-generated files | config/env files | type-definition-only files

**Done**
<criteria>
coverage ≥80% + all tests pass
</criteria>

---

### finalize
> Post-implementation pipeline — run tests, enforce 80% coverage, sync docs, then commit atomically. Run after every feature or fix.

**Sequence**

test(detect→run→fix→pass) → coverage(measure→write tests→≥80%) → docs-sync(detect drift→update) → commit(by purpose, type: summary)

**Output Format**

```
Tests:total=N passed=N failed=N Coverage:N% Docs:[files] Commits:[hash:msg]
```

**Done**
<criteria>
all tests pass + coverage ≥80% + docs synced + commits created
</criteria>

---

### docs-sync
> Detect documentation drift from recent code changes and synchronize docs to match the current codebase.

**Sequence**

scan project docs → identify changed code → map changes to affected docs → update docs → validate structure

**Change-to-Doc Mapping**

- new public API/module → API docs, architecture overview
- public interface change → API docs, usage examples
- config change → config guide, env examples
- schema change → data model docs
- dependency change → install guide
- architecture change → architecture docs

**Rules**
<constraints>
- code is source of truth: docs follow code
- add sections for new topics
- remove docs for deleted features
- fix broken internal links
- sync TOC with actual headings
- remove duplicate content
</constraints>

---

### security-audit
> Comprehensive security review — secrets exposure, dependency vulnerabilities, code injection risks, and infrastructure config.

**Scan Targets**

1. **secrets**: VCS history + source files for hardcoded credentials + verify secret/key/log files excluded from VCS
2. **deps**: run project's vulnerability scanner
3. **code**: injection(query,command,template) + path traversal + missing input validation at boundaries + error exposure(stack traces,internal paths) + credential logging
4. **infra**: unnecessary port exposure + default/weak credentials + secrets not via env vars

**Severity**
<criteria>
HIGH(secret exposure, injection) → fix immediately
MEDIUM(vulnerable dep, error exposure) → fix this cycle
LOW(potential risk, best-practice violation) → next cycle
</criteria>

**Action**

fix HIGH issues directly when possible

---

### version
> Manage semantic versioning — auto-detect version bump type from recent commits, update version files, write CHANGELOG, and create a git tag.

**Bump Rules**

BREAKING CHANGE→MAJOR(X+1.0.0) | feat→MINOR(X.Y+1.0) | fix,refactor,perf→PATCH(X.Y.Z+1) | test,docs,chore→no change

**Sequence**

detect current version(tags→version files→CHANGELOG) → determine bump(arg or auto from commits) → update all version files → write CHANGELOG(Added/Changed/Fixed/Removed) → commit + tag

**Usage**

```
/version (auto) | /version patch | /version minor | /version major
```

---

### ai-token-optimize
> Optimize AI-consumed code and data for token efficiency — reduce token usage while preserving semantic fidelity. Applies to prompts, tool outputs, and inter-agent messages.

**Scope**

- **include**: AI-consumed data (prompts, tool returns, agent messages, AI-parsed structures, LLM context)
- **exclude**: human-facing data (docs, tests, config, schema)

**Techniques**

1. **legend**: define all abbreviations once at prompt start; reuse without re-definition — prefer abbreviations already present in model training data (domain-standard codes require no definition)
2. **compact k:v**: verbose structured labels → short key:value pairs, pipe or comma-separated
3. **tabular**: repeated-structure collections → typed header with column list once, then value rows only
4. **numeric notation**: express numbers as `{digit_count:value}` to prevent tokenizer fragmentation on large or precise values
5. **structural tags**: lightweight semantic markup for boundaries instead of deep nesting or verbose prose
6. **placement**: identity and critical directives at top, supporting data in middle, output schema at bottom — mitigates attention degradation in long contexts

**Sequence**

scan AI-consumed targets → identify repetition and verbosity → apply techniques → verify AI can parse output → run tests → commit per module

**Rules**
<constraints>
- apply only to AI-consumed data — never to human-facing content
- verify after each technique: AI must parse output correctly
- legend abbreviations must be unambiguous within their scope
- tabular format requires consistent column order across all rows
- placement order: legend → identity/directives → data → output schema
</constraints>

**Done**
<criteria>
labels compressed + collections tabular + numerics notation-formatted + critical info at top + output schema at bottom + tests pass
</criteria>

---

### principle-audit
> Audit the codebase for violations of the project's core principles — detect unintended system-imposed constraints that contradict the project's stated goals.

**Sequence**

find project principles(docs, config) → scan for violations → classify(allowed vs violation) → report + fix

**Violation Types**

1. **unintended constraints**: system blocks behavior without business rule
2. **layer boundary**: deps in forbidden direction, logic in wrong layer
3. **consistency**: same-purpose logic in conflicting ways, naming/error-handling mismatch
4. **hardcoded assumptions**: values that should be configurable, env-specific assumptions

**Distinguish**

- allowed: status as info | config-based threshold | domain rule rejection
- violation: status blocks execution | hardcoded threshold | infra-layer business decision

**Severity**
<criteria>
CRITICAL(direct violation, immediate impact) → fix now
WARNING(violation, currently inactive) → fix this cycle
INFO(potential risk) → comment/TODO
</criteria>

**Report**

per violation: file:line + description + related principle + fix recommendation
fix CRITICAL immediately → run tests

---

### framework-selection
> Choose the right tool, library, or architecture for the task — minimal complexity for the requirement.

**Sequence**

classify problem complexity → detect what the project already uses → match to the lowest sufficient tier → record rationale

**Complexity Tiers**

```
single call       → no framework
pipeline          → composable steps, minimal orchestration
stateful workflow → explicit state, resumability
multi-agent       → routing, delegation, parallelism
```

**Rules**
<constraints>
- detect existing project tools before proposing new ones
- start at the lowest tier that satisfies the stated requirement
- escalate only when the lower tier cannot meet a requirement
- switching tiers mid-project requires explicit justification
</constraints>

**Done**
<criteria>
chosen approach matches complexity tier + existing conventions respected + rationale recorded
</criteria>

---

### rag-development
> Implement Retrieval-Augmented Generation pipelines — ingestion, chunking, embedding, retrieval, and generation.

**Sequence**

ingest → chunk → embed → store → retrieve → rerank → generate

**Rules**
<constraints>
- preserve source metadata (origin, section, date) through all stages
- chunk boundaries must respect semantic units
- embedding model must be identical at index time and query time
- retrieval store must match the data scale
- retrieve candidates before filtering by relevance — never pass unfiltered results to generation
- generation output must attribute retrieved sources
</constraints>

**Done**
<criteria>
all stages present + metadata preserved + embedding model consistent + sources attributed in output
</criteria>

---

### observability
> Instrument AI workflows with tracing, logging, and monitoring to enable debugging, auditing, and performance analysis.

**Sequence**

identify instrumentation boundaries → add spans → attach metadata → verify no gaps

**Boundaries**

```
entry points      → user input, external triggers
model calls       → inputs, outputs, latency, token counts
tool calls        → name, inputs, outputs, errors
inter-agent msgs  → sender, receiver, content, timing
state transitions → before/after snapshot
```

**Rules**
<constraints>
- every AI model call must produce a trace entry
- token counts must be extracted from the model API response metadata, not estimated or hardcoded — never use response length or character count as a token proxy
- propagate trace context across service boundaries
- attach a correlation ID to every trace
- structured output only — no free-form strings
- no secrets, PII, or credentials in traces
</constraints>

**Done**
<criteria>
all model calls traced + tool calls recorded + correlation IDs present + no secrets in traces
</criteria>

---

### evaluation
> Build evaluation pipelines for AI outputs — create datasets, write evaluators, and measure quality systematically.

**Sequence**

collect dataset → write evaluators → run baseline → change system → rerun → compare delta → iterate

**Dataset Types**

```
final response  → input → expected output
step-level      → input → expected intermediate step
trajectory      → input → expected sequence of steps
```

**Evaluator Types**

```
code evaluator  → deterministic check (exact match, schema, format)
LLM-as-judge    → semantic check (correctness, tone, safety)
human evaluator → gold standard for ambiguous criteria
```

**Rules**
<constraints>
- prefer code evaluators for measurable criteria
- every evaluator must return a score and a reason
- judge model must differ from the model being evaluated
- evaluators must produce consistent output for the same input
- record a baseline before any system change
</constraints>

**Done**
<criteria>
dataset covers representative inputs + each evaluator returns score+reason + baseline recorded + regression detectable
</criteria>

---

### human-in-the-loop
> Insert human approval, review, or correction checkpoints into AI workflows — interrupt, wait, resume safely.

**Sequence**

reach checkpoint → serialize state → emit review request → halt → human acts → restore state → resume

**Interrupt Triggers**

```
irreversible actions    → destructive, external, financial
low confidence          → below an explicit threshold
high-cost ambiguity     → wrong assumption cannot be easily undone
compliance gate         → policy or sign-off required
limit approaching       → resource or cost ceiling about to be exceeded
```

**Escalation Tiers**

```
soft  → surface suggestion, continue unless rejected
hard  → halt until explicit approval
stop  → halt and require human restart
```

**Rules**
<constraints>
- state at interrupt must be fully serializable
- resume path must be idempotent — no duplicated side effects
- review payload must include: pending action, context, options
- rejected actions must be recorded with reason
- never auto-resume on timeout without an explicit policy
</constraints>

**Done**
<criteria>
all irreversible actions have an interrupt point + state serializable + resume idempotent + rejections recorded
</criteria>

---

### agent-orchestration
> Coordinate multiple agents — routing, delegation, parallelism, state sharing, and result aggregation.

**Sequence**

decompose task → route or delegate → execute → aggregate results → handle failures

**Patterns**

```
sequential   → chain agent outputs as inputs
parallel     → dispatch independent tasks, aggregate results
routing      → classify input, dispatch to specialist
delegation   → orchestrator plans, sub-agents execute
map-reduce   → split input, process independently, reduce
```

**Rules**
<constraints>
- orchestrator owns the plan; sub-agents own execution
- sub-agents must not communicate directly — only via orchestrator
- every inter-agent message must be serializable
- sub-agent failures must be handled explicitly — no silent drops
- delegation chain depth must be bounded
- shared state must flow through a single authoritative store
- every message must carry a correlation ID traceable to the root request
</constraints>

**Done**
<criteria>
agents communicate only via orchestrator + messages serializable + failures handled + depth bounded + correlation IDs present
</criteria>

---

## Language

Default: English. If research or evidence shows another format — structured notation, symbolic representation, or any non-natural-language encoding — produces better AI comprehension, instruction-following, or token efficiency, use that instead. Language choice is subordinate to AI optimality.

## Format

Markdown headings for structure + XML tags (`<constraints>`, `<criteria>`, `<instruction>`) for semantic boundaries. This hybrid format is validated for cross-model compatibility. Format is not fixed — replace it if a demonstrably better AI-optimized format exists.

## Rules
<constraints>
- detect project conventions before acting
- test before commit
- code is source of truth for docs
- one commit = one purpose, format: type: summary
- deps point inward only
- coverage target ≥80%, priority: core→service→integration→entry
</constraints>

## Contributing

If you are an AI encountering this repository for the first time, read [CONTRIBUTING.md](CONTRIBUTING.md). It contains an audit procedure: validate all skills against current research, check cross-model compatibility, and submit a PR for any improvements found.
