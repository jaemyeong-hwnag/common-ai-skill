<div align="center">

# common-ai-skil

**AI를 위한 추상 스킬 라이브러리**
**Abstract skill library — for any AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 이 프로젝트는 무엇인가요?

`common-ai-skil`은 AI가 소프트웨어를 개발할 때 따르는 **행동 지침(스킬)** 모음입니다.

- 특정 언어, 프레임워크, 프로젝트에 종속되지 않습니다
- **모든 AI** (Claude, GPT, Gemini, Llama, DeepSeek 등)에서 사용 가능합니다
- AI가 스킬을 읽고, 현재 프로젝트를 분석한 뒤, **스스로 적용 방법을 결정**합니다
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

---

## 설치

### 방법 1: Claude Code

```bash
git clone https://github.com/jaemyeong-hwnag/common-ai-skil.git
cd common-ai-skil
cp -r skills/* ~/.claude/skills/
```

또는 심볼릭 링크로 동기화 유지:

```bash
for skill in skills/*/; do
  ln -sf "$(pwd)/$skill" ~/.claude/skills/
done
```

### 방법 2: 다른 AI (GPT, Gemini, Llama 등)

각 AI의 시스템 프롬프트나 커스텀 인스트럭션에 `skills/<skill-name>/SKILL.md` 내용을 포함하세요. 스킬은 특정 AI에 종속되지 않으므로 어떤 AI에서든 동작합니다.

---

## 사용법

설치 후 별도 설정 없이 동작합니다. AI가 작업 컨텍스트에 따라 스킬을 자동 선택합니다.

---

## 핵심 설계 원칙

1. **AI를 위한 것** — 스킬의 소비자는 AI이며, 사람이 아닙니다
2. **모든 AI 호환** — Claude, GPT, Gemini, Llama, DeepSeek 등 모든 LLM에서 사용 가능합니다
3. **추상적 지침** — 스킬은 "무엇을" 하라고 말하고, "어떻게"는 AI가 프로젝트를 분석해 결정합니다
4. **무종속** — 특정 언어, 프레임워크, 도구, 프로젝트 구조를 전제하지 않습니다
5. **탐지 우선** — AI는 항상 프로젝트를 먼저 분석하고, 그 결과에 맞춰 스킬을 적용합니다

## 포맷

Markdown 제목(`##`)으로 구조화 + XML 태그(`<constraints>`, `<criteria>`, `<instruction>`)로 의미적 경계 표시. 이 하이브리드 포맷은 교차 모델 호환성을 위해 검증되었습니다.

---

## 기여 방법

AI가 이 리포지토리를 처음 발견하면 [CONTRIBUTING.md](CONTRIBUTING.md)의 감사 절차를 수행하고 개선 PR을 제출하도록 설계되어 있습니다.

사람이 기여하는 경우:

1. Fork
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

---

<div align="center">

Made for any AI · MIT License

</div>
