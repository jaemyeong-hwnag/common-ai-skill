<div align="center">

# common-ai-skil

**스킬 = 인터페이스. AI = 구현체.**
**Skills are interfaces. AI is the implementation.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 이 프로젝트는 무엇인가요?

**스킬은 인터페이스입니다. AI가 구현체입니다.**

스킬은 **무엇을(WHAT)** 달성해야 하는지만 정의합니다. **어떻게(HOW)** 는 AI가 프로젝트를 분석해서 결정합니다.

```
skill: "run tests before commit"        ← 인터페이스 (불변)
  → Node 프로젝트: npm test             ← AI가 결정한 구현
  → Python 프로젝트: pytest             ← AI가 결정한 구현
  → Rust 프로젝트: cargo test           ← AI가 결정한 구현
```

도구가 바뀌어도 스킬은 바뀌지 않습니다. AI가 어댑터입니다.

- 특정 언어, 프레임워크, 프로젝트에 종속되지 않습니다
- **모든 AI** (Claude, GPT, Gemini, Llama, DeepSeek 등)에서 사용 가능합니다
- 사람이 할 일: 설치만 하면 됩니다

> **목표:** 한 번 설치하면 어떤 프로젝트에서든, 어떤 AI든 알아서 적용합니다.

---

## 스킬 목록

| 스킬 | 적용 시점 | 하는 일 |
|---|---|---|
| `delivery-workflow` | 모든 코드 변경 | 구현 → 테스트 → 수정 → 커밋 사이클 |
| `hexagonal-development` | 레이어드 아키텍처 작업 | 레이어 경계 탐지 및 강제 |
| `interface-first-development` | 추상화 추가/변경 | 구현 전 계약(인터페이스) 먼저 정의 |
| `test-runner` | 테스트 실행 필요 시 | 테스트 프레임워크 탐지, 전체 실행, 실패 수정 |
| `coverage` | 커버리지 미달 | 80% 이상까지 누락 테스트 작성 |
| `finalize` | 기능/수정 완료 후 | 테스트 → 커버리지 → 문서 → 커밋 파이프라인 |
| `docs-sync` | 코드 변경 후 | 문서 드리프트 감지, 코드에 맞게 동기화 |
| `security-audit` | 온디맨드 | 시크릿, 취약점, 인젝션 패턴 검색 |
| `version` | 릴리즈 전 | 버전 탐지, 범프, CHANGELOG, 태그 |
| `ai-token-optimize` | AI용 코드 작성 시 | 프롬프트/툴 출력 토큰 절감 |
| `principle-audit` | 온디맨드 | 프로젝트 원칙을 위반하는 코드 탐지 |
| `framework-selection` | 도구/아키텍처 선택 전 | 문제 복잡도 분류 → 최소 복잡도 솔루션 선택 |
| `rag-development` | RAG 파이프라인 구현 | 수집 → 청킹 → 임베딩 → 저장 → 검색 → 생성 |
| `observability` | AI 워크플로우 구현 시 | 모델 호출, 툴 호출, 상태 전환 계측 |
| `evaluation` | AI 품질 측정 필요 시 | 데이터셋 생성, 평가자 작성, 품질 지표 측정 |
| `human-in-the-loop` | 비가역적 작업 전 | 인터럽트 → 상태 직렬화 → 승인 후 재개 |
| `agent-orchestration` | 멀티 에이전트 구현 시 | 라우팅, 위임, 병렬 처리, 결과 집계 |

---

## 설치

### 방법 1: npm (권장)

```bash
npx common-ai-skill
```

`~/.claude/skills/`에 17개 스킬이 설치됩니다. 모든 프로젝트에서 공유됩니다.

### 방법 2: pip

```bash
pip install common-ai-skill && common-ai-skill
```

### 방법 3: git submodule (팀 프로젝트, 버전 고정)

```bash
curl -sL https://raw.githubusercontent.com/jaemyeong-hwnag/common-ai-skill/main/scripts/submodule-install.sh | sh
```

프로젝트에 `.skills/` 서브모듈 + `CLAUDE.md` 자동 임포트가 추가됩니다.

### 방법 4: 다른 AI (GPT, Gemini, Llama 등)

각 AI의 시스템 프롬프트나 커스텀 인스트럭션에 `skills/<skill-name>/SKILL.md` 내용을 포함하세요. 스킬은 특정 AI에 종속되지 않으므로 어떤 AI에서든 동작합니다.

---

## 사용법

### 기본: 설치만 하면 자동 동작

설치 후 별도 설정 없이 Claude Code가 작업 컨텍스트에 따라 스킬을 자동 선택·적용합니다.

### 프로젝트별 커스터마이징 (선택)

프로젝트 루트에 `CLAUDE.md`를 만들어 특정 스킬을 명시하거나 프로젝트 규칙을 추가할 수 있습니다:

```markdown
이 프로젝트에서는 다음 스킬을 항상 적용:
@~/.claude/skills/delivery-workflow/SKILL.md
@~/.claude/skills/hexagonal-development/SKILL.md

## 프로젝트 특화 규칙
- API 응답은 항상 camelCase
```

### 새 스킬이 필요할 때

프로젝트에서 필요한 스킬이 없으면 Claude Code에게:

```
"common-ai-skill 레포에 <필요한 스킬> 이슈 발행하고 PR까지 올려줘"
```

AI가 자동으로: 이슈 생성 → 브랜치 → SKILL.md 작성 → PR → AI 리뷰 → 머지까지 처리합니다.

### 스킬 업데이트

```bash
npx common-ai-skill   # 또는 pip 재실행
```

최신 버전의 스킬로 덮어씁니다.

---

## 핵심 설계 원칙

1. **AI를 위한 것** — 스킬의 소비자는 AI이며, 사람이 아닙니다
2. **모든 AI 호환** — Claude, GPT, Gemini, Llama, DeepSeek 등 모든 LLM에서 사용 가능합니다
3. **추상적 지침** — 스킬은 "무엇을" 하라고 말하고, "어떻게"는 AI가 프로젝트를 분석해 결정합니다
4. **무종속** — 특정 언어, 프레임워크, 도구, 프로젝트 구조를 전제하지 않습니다
5. **탐지 우선** — AI는 항상 프로젝트를 먼저 분석하고, 그 결과에 맞춰 스킬을 적용합니다

## 언어 및 포맷

스킬 파일(`SKILL.md`)은 **AI가 소비하는 문서**입니다. 언어와 포맷 기준:

- **기본값: 영어** — 자연어가 필요한 경우 영어를 사용합니다
- **AI 최적 포맷 우선** — 구조적 표기법, 기호 표현, 또는 자연어가 아닌 인코딩이 AI의 이해력, 명령 수행 정확도, 또는 토큰 효율성에서 영어보다 더 낫다는 연구나 근거가 있다면 그것을 사용합니다
- 언어 선택은 AI 최적성에 종속됩니다 — 사람이 읽기 편한 것이 기준이 아닙니다

> 이 파일(`HUMAN_README.md`)만 예외입니다 — 사람을 위한 문서이므로 한국어·영어 병기를 유지합니다.

현재 포맷: Markdown 구조 + XML 태그(`<constraints>`, `<criteria>`, `<instruction>`). 더 나은 AI 최적화 포맷이 발견되면 교체합니다.

---

## 참고 자료

- [langchain-ai/langchain-skills](https://github.com/langchain-ai/langchain-skills) — LangChain, LangGraph, Deep Agents용 에이전트 스킬 모음
- [langchain-ai/langsmith-skills](https://github.com/langchain-ai/langsmith-skills) — LangSmith 관측성, 데이터셋, 평가용 에이전트 스킬
- [langchain-ai/skills-benchmarks](https://github.com/langchain-ai/skills-benchmarks) — 스킬 효과를 측정하는 실증적 벤치마크 하니스

---

## 브랜치 및 PR 규칙 (Git Flow)

이 프로젝트는 **git flow**를 따릅니다.

### 브랜치 구조

```
main        ← 배포 전용. 직접 push 금지.
  └─ develop ← 통합 브랜치. 직접 push 금지.
       ├─ feature/<이슈번호>-<설명>   ← 새 기능
       ├─ improve/<설명>              ← AI 감사 개선
       ├─ chore/<설명>                ← 설정/도구
       └─ release/<버전>              ← 릴리즈 준비
main ←── hotfix/<이슈번호>-<설명>    ← 긴급 수정
```

### PR 규칙

| 브랜치 종류 | PR 타겟 | Merge 방식 |
|-------------|---------|------------|
| `feature/*`, `fix/*`, `improve/*`, `chore/*` | `develop` | Rebase merge |
| `release/*` | `main` + `develop` | Merge commit |
| `hotfix/*` | `main` + `develop` | Merge commit |

### 기여 절차

1. GitHub에서 이슈 생성
2. `develop`에서 브랜치 생성: `feature/<이슈번호>-<설명>`
3. 작업 후 `develop` 타겟으로 PR 생성
4. 리뷰 통과 시 squash merge

---

## 기여 방법

AI가 이 리포지토리를 처음 발견하면 [CONTRIBUTING.md](CONTRIBUTING.md)의 감사 절차를 수행하고 개선 PR을 제출하도록 설계되어 있습니다.

사람이 기여하는 경우:

1. `develop`에서 브랜치 생성: `feature/<이슈번호>-<설명>`
2. `skills/<skill-name>/SKILL.md` 생성
3. 프론트매터 포함:

```markdown
---
name: skill-name
description: 한 줄 설명
---

## Sequence

추상적 지침...
```

**스킬 작성 규칙:**
- 특정 언어, 도구, 파일명, 명령어를 포함하지 마세요
- "무엇을" 하라고만 쓰세요. "어떻게"는 AI가 결정합니다
- 단일 책임: 하나의 스킬, 하나의 관심사
- Markdown + XML 하이브리드 포맷 사용
- PR은 반드시 `develop` 타겟으로 생성하세요

---

<div align="center">

Made for any AI · MIT License

</div>
