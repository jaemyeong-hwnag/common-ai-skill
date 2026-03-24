# Changelog

## [1.1.1] - 2026-03-24

### Fixed
- GitHub Actions 워크플로우 YAML 파싱 에러 수정 — `run: |` 블록 내 멀티라인 문자열이 column 0으로 떨어져 YAML 파서가 `*`/`{`를 alias/mapping으로 오인, 모든 워크플로우 실행이 `jobs: []`, `conclusion: failure`로 종료되던 문제
- `ai-pr-review.yml`: PR 코멘트 body를 `echo` + `--body-file` 방식으로 교체
- `reusable-skill-check.yml`: PR 코멘트 body 교체 + Python f-string을 문자열 연결로 교체

## [1.1.0] - 2026-03-24

### Added
- npm 배포 지원 — `npx common-ai-skill` 실행 시 스킬을 `~/.claude/skills/`에 자동 설치
- git submodule 배포 지원
- 재사용 가능한 GitHub Actions 워크플로우 (`reusable-skill-check.yml`) — 다른 팀이 PR에 스킬 준수 체크를 붙일 수 있음

### Fixed
- `bin/init.js`의 `@node_modules/...` CLAUDE.md 주입 방식을 `~/.claude/skills/` 직접 복사로 교체 — Claude Code 공식 동작에 맞는 검증된 표준 방식

### Changed
- 프로젝트 핵심 목적 명시 강화: README, HUMAN_README, CONTRIBUTING 전반에 "스킬 = 인터페이스, AI = 구현체" 패턴을 명시적으로 표현

## [1.0.0] - 2026-03-01

### Added
- 17개 추상 스킬 초기 릴리즈: delivery-workflow, test-runner, coverage, finalize, hexagonal-development, interface-first-development, docs-sync, security-audit, version, ai-token-optimize, principle-audit, framework-selection, rag-development, observability, evaluation, human-in-the-loop, agent-orchestration
- Agent Skills 표준 호환 YAML 프론트매터 (`name`, `description`)
- AI PR 리뷰 및 자동 머지 워크플로우
- git flow 브랜치/PR 규칙
