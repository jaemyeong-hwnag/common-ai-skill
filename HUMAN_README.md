<div align="center">

# ai-skill-interface

**스킬 = 인터페이스. AI = 구현체.**
**Skills are interfaces. AI is the implementation.**

[![npm version](https://img.shields.io/npm/v/ai-skill-interface)](https://www.npmjs.com/package/ai-skill-interface)
[![PyPI version](https://img.shields.io/pypi/v/ai-skill-interface)](https://pypi.org/project/ai-skill-interface/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 이게 뭔가요? / What is this?

**스킬은 인터페이스입니다. AI가 구현체입니다.**
**Skills are interfaces. AI is the implementation.**

스킬은 **무엇을(WHAT)** 달성해야 하는지만 정의합니다. **어떻게(HOW)**는 AI가 프로젝트를 분석해서 결정합니다.

Skills define only **WHAT** must be achieved. **HOW** is decided by the AI after analyzing your project.

```
skill: "run tests before commit"        ← interface (never changes)
  → Node project:   npm test            ← AI decides the implementation
  → Python project: pytest              ← AI decides the implementation
  → Rust project:   cargo test          ← AI decides the implementation
```

도구가 바뀌어도 스킬은 바뀌지 않습니다. AI가 어댑터입니다.
The tool changes. The skill does not. AI is the adapter.

- 특정 언어·프레임워크·프로젝트에 종속되지 않습니다 / No dependency on any language, framework, or project structure
- **모든 AI** (Claude, GPT, Gemini, Llama, DeepSeek 등)에서 사용 가능합니다 / Works with **any AI** model
- 사람이 할 일: 설치만 / You only install. AI does the rest.

---

## 설치 / Install

```bash
# npm — installs 19 skills to ~/.claude/skills/
npx ai-skill-interface

# pip
pip install ai-skill-interface && ai-skill-interface

# git submodule (팀 프로젝트, 버전 고정 / team projects, version-locked)
curl -sL https://raw.githubusercontent.com/jaemyeong-hwnag/ai-skill-interface/main/scripts/submodule-install.sh | sh
```

설치 후 모든 프로젝트에서 자동 적용됩니다.
After install, skills apply automatically across all your projects.

---

## 스킬 목록 / Skills (19)

| 스킬 / Skill | 적용 시점 / When | 하는 일 / Does |
|---|---|---|
| `delivery-workflow` | 모든 코드 변경 / every code change | 구현 → 테스트 → 커밋 사이클 / implement → test → commit cycle |
| `test-runner` | 테스트 실행 / run tests | 프레임워크 자동 탐지, 전체 실행 / auto-detect framework, run suite |
| `coverage` | 커버리지 미달 / coverage gap | 80% 달성까지 누락 테스트 작성 / write tests until 80%+ |
| `finalize` | 기능/수정 완료 후 / after feature or fix | 테스트 → 커버리지 → 문서 → 커밋 파이프라인 / test → coverage → docs → commit |
| `hexagonal-development` | 레이어드 아키텍처 / layered arch | 레이어 경계 탐지 및 강제 / detect and enforce layer boundaries |
| `interface-first-development` | 추상화 추가/변경 / abstraction change | 구현 전 계약 먼저 정의 / define contract before implementation |
| `framework-selection` | 도구/아키텍처 선택 / tool or arch choice | 최소 복잡도 솔루션 선택 / select lowest-complexity solution |
| `docs-sync` | 코드 변경 후 / after code change | 문서 드리프트 감지 및 동기화 / detect and sync doc drift |
| `security-audit` | 온디맨드 / on demand | 시크릿·취약점·인젝션 패턴 탐지 / secrets, vulnerabilities, injection |
| `ai-token-optimize` | AI용 코드 작성 / writing AI-consumed code | 프롬프트·툴 출력 토큰 절감 / reduce tokens in prompts and tool outputs |
| `principle-audit` | 온디맨드 / on demand | 프로젝트 원칙 위반 탐지 / detect principle violations |
| `observability` | AI 워크플로우 구현 / AI workflow | 모델 호출·상태 전환 계측 / trace model calls and state transitions |
| `evaluation` | AI 품질 측정 / AI quality | 데이터셋 생성, 평가자 작성 / create datasets, write evaluators |
| `human-in-the-loop` | 비가역적 작업 / irreversible actions | 인터럽트 → 승인 → 재개 / interrupt → approval → resume |
| `agent-orchestration` | 멀티 에이전트 / multi-agent | 라우팅·위임·병렬 처리 / routing, delegation, parallelism |
| `rag-development` | RAG 파이프라인 / RAG pipeline | 수집 → 청킹 → 임베딩 → 검색 → 생성 / ingest → chunk → embed → retrieve → generate |
| `version` | 릴리즈 전 / before release | 버전 탐지·범프·CHANGELOG·태그 / detect, bump, changelog, tag |
| `auto-select` | 항상 (메타 스킬) / always (meta-skill) | 컨텍스트 시그널로 스킬 자동 선택 / auto-select skills from context signals |
| `harness-engineering` | 에이전트 런타임 설계 / agent runtime design | 컨텍스트·권한·샌드박스·검증 레이어 / context, permission, sandbox, validation layers |

---

## 사용법 / Usage

### 설치만 하면 자동 동작 / Install and it just works

설치 후 Claude Code가 작업 컨텍스트에 따라 스킬을 자동 선택·적용합니다.
After install, Claude Code auto-selects and applies skills based on your task context.

### 프로젝트별 명시 (선택) / Per-project explicit loading (optional)

```markdown
<!-- CLAUDE.md -->
@~/.claude/skills/delivery-workflow/SKILL.md
@~/.claude/skills/hexagonal-development/SKILL.md
```

### 다른 AI 사용 / Using with other AI models (GPT, Gemini, Llama…)

각 AI의 시스템 프롬프트나 커스텀 인스트럭션에 `skills/<skill-name>/SKILL.md` 내용을 포함하세요.
스킬은 특정 AI에 종속되지 않으므로 어떤 LLM에서든 동작합니다.

Paste the contents of any `skills/<skill-name>/SKILL.md` into your AI's system prompt or custom instructions.
Skills are model-agnostic — they work with any LLM.

### 새 스킬이 필요할 때 / Need a new skill?

```
"ai-skill-interface 레포에 <필요한 스킬> 이슈 발행하고 PR까지 올려줘"
"Open an issue and PR on the ai-skill-interface repo for a <skill-name> skill"
```

AI가 자동으로: 이슈 생성 → 브랜치 → SKILL.md 작성 → PR → AI 리뷰 → 머지까지 처리합니다.
AI handles the full cycle: issue → branch → SKILL.md → PR → AI review → merge.

---

## 핵심 설계 원칙 / Design Principles

1. **AI를 위한 것 / For AI** — 스킬의 소비자는 AI입니다 / The consumer of skills is AI, not humans
2. **모든 AI 호환 / Model-agnostic** — Claude, GPT, Gemini, Llama, DeepSeek 등 / Works with any LLM
3. **추상적 지침 / Abstract goals** — "무엇을"만 정의, "어떻게"는 AI가 결정 / Defines WHAT; AI decides HOW
4. **무종속 / Zero dependency** — 언어·프레임워크·도구·구조를 전제하지 않음 / No assumption about language, framework, or project structure
5. **탐지 우선 / Detect first** — AI는 항상 프로젝트를 먼저 분석 / AI always inspects the project before acting

---

## 참고 / References

- [langchain-ai/langchain-skills](https://github.com/langchain-ai/langchain-skills)
- [langchain-ai/langsmith-skills](https://github.com/langchain-ai/langsmith-skills)
- [langchain-ai/skills-benchmarks](https://github.com/langchain-ai/skills-benchmarks)

---

## 기여 / Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) 참고 / See [CONTRIBUTING.md](CONTRIBUTING.md)

---

<div align="center">

Made for any AI · MIT License

</div>
