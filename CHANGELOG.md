# Changelog

## [1.3.0] - 2026-03-29

### Added
- `create-release.yml`: automated semantic version release workflow (auto-detect bump from commit types via `workflow_dispatch`)

### Fixed
- `pyproject.toml`: fix build-backend (`setuptools.backends.legacy` → `setuptools.build_meta`)
- `common_ai_skill/install.py`: fix skills path for pip-installed package
- Repository URL corrected in `package.json`, `submodule-install.sh`, `reusable-skill-check.yml` (`hjm/` → `jaemyeong-hwnag/`)
- Added Installation section to `README.md` (npm, pip, submodule methods)

## [1.2.0] - 2026-03-28

### Added
- `pyproject.toml` + `common_ai_skill/install.py`: pip distribution support (`pip install ai-skill-interface`)
- Context signals section in README for structured skill auto-selection
- `requires:` dependency metadata in skill frontmatter (agent-orchestration, coverage, evaluation, finalize, hexagonal-development, rag-development)
- `close-issues-on-merge.yml`: auto-close linked issues on PR merge (dual trigger: `pull_request:closed` + `workflow_run`)
- `auto-pr.yml`: auto-inject `Closes #<id>` from branch name into PR body
- Chore/docs issue template, `fix/*` branch type in CONTRIBUTING.md

### Removed
- `skill-propose`, `skill-install`, `skill-update` skills (no implementation backing them)
- `enhancement` and `bug` labels (duplicates of `feature` and `fix`)
- Redundant `noop` push trigger from `reusable-skill-check.yml`

### Fixed
- Abstraction check: validate diff only (not full file) to prevent false positives on unchanged content
- AI code review: exempt workflow/config/docs files from test requirement
- `ai-pr-review.yml`: remove `gh pr review --request-changes` — `GITHUB_TOKEN` cannot review its own PR
- `ai-pr-review.yml`: write review issues to file to prevent `GITHUB_OUTPUT` multiline errors
- `issue-branch.yml`: replace inline `--body` with `--body-file` to fix YAML parse failure
- `release-merge.yml`: remove `enforce_admins` toggle — `GITHUB_TOKEN` cannot modify admin protection
- PR template: remove redundant Type section, clarify testing instructions
- CONTRIBUTING.md: correct "squash merge" to "rebase merge", add `fix/*` branch type
- `pyproject.toml` version synced with `package.json`

### Changed
- Branch protection: `develop` and `main` require status checks (strict=true): "Validate branch name", "AI code review"
- Repository: auto-merge enabled, squash merge disabled

## [1.1.9] - 2026-03-28

### Fixed
- `release-merge.yml`: remove `enforce_admins` disable/re-enable API calls

## [1.1.8] - 2026-03-28

### Fixed
- `release-merge.yml`: rewrite trigger from `pull_request` to `push: branches: [main]` — `pull_request` events from GITHUB_TOKEN-created PRs never cascade to other workflows; detect release from merge commit message; idempotent GitHub Release creation; remove enforce_admins toggle steps (develop branch protection updated to allow bot direct push)
- `ai-pr-review.yml`: remove `push:` trigger and `noop` job that caused YAML parse failures with 0 jobs; fix 0-indented multi-line strings in `run: |` blocks that broke YAML parsing; add `ready_for_review` event type; remove redundant `event_name` guards
- `develop` branch protection: remove `required_pull_request_reviews` rule to allow `github-actions[bot]` back-merge direct pushes; `enforce_admins: false`

## [1.1.7] - 2026-03-28

### Fixed
- `release-merge.yml`: duplicate `env:` key in `publish-github-release` step caused YAML parse error, preventing `pull_request` events from triggering the workflow — use `export VERSION` in shell instead

## [1.1.6] - 2026-03-28

### Added
- `label-pr.yml`: auto-label every PR with type (feature/fix/improve/chore/release/hotfix) and size (size/S/M/L) on open/sync
- `release-merge.yml`: auto-publish GitHub Release with changelog section after release/* merges to main
- Labels: `release`, `breaking-change`, `wip`, `size/S`, `size/M`, `size/L`

### Changed
- `auto-pr.yml`: `release/*` and `hotfix/*` PRs created as ready (not draft)
- `pull_request_template.md`: added type selector, breaking-change flag, testing checklist

### Fixed
- `release-merge.yml`: rewrite job-level `if` conditions from multiline `|` blocks to single-line `${{ }}` expressions — resolved workflow file parse error causing all runs to fail with 0 jobs
- Branch protection: `main` and `develop` direct push blocked, force push disabled
- Repository: squash merge disabled; only rebase (feature branches) and merge commit (release/hotfix) allowed

## [1.1.5] - 2026-03-28

### Added
- GitHub issue templates: feature / bug / improve / hotfix
- PR template with principle checklist
- `issue-branch.yml`: auto-create branch with issue ID when issue is labeled
- `auto-pr.yml`: auto-create draft PR on first branch push
- `release-merge.yml`: auto-merge release/* PRs (merge commit) + back-merge main → develop
- `ai-pr-review.yml`: branch-name validation (issue ID required), formal `request-changes` on principle violation, rebase merge for feature/fix/improve/chore, merge commit for release/hotfix

## [1.1.4] - 2026-03-24

### Fixed
- `ai-pr-review.yml`: duplicate `env:` key in `Check abstraction compliance` step — YAML disallows duplicate mapping keys, causing GitHub to reject the workflow at validation time (0s phantom failures)
- `reusable-skill-check.yml`: `GITHUB_TOKEN` declared as a `workflow_call` secret — GitHub forbids this; the automatic token is always provided to called workflows

## [1.1.3] - 2026-03-24

### Fixed
- `ai-pr-review.yml`: 중복 `if:` 키(`ai-review` job에서 lines 173·176)로 인한 YAML 파싱 실패 수정 — GitHub이 workflow run을 즉시 failure(0s, 0 jobs)로 처리하던 근본 원인
- workflow 파일들에서 불필요한 `push` 트리거 및 `noop` job 제거 — 의도된 트리거로 복원: `ai-pr-review.yml`은 `pull_request`만, `reusable-skill-check.yml`은 `workflow_call`만

## [1.1.2] - 2026-03-24

### Fixed
- GitHub Actions push 이벤트 시 phantom failure runs 제거 — 각 job에 `if: github.event_name` 조건 추가로 push 시 `skipped` 처리

## [1.1.1] - 2026-03-24

### Fixed
- GitHub Actions 워크플로우 YAML 파싱 에러 수정 — `run: |` 블록 내 멀티라인 문자열이 column 0으로 떨어져 YAML 파서가 `*`/`{`를 alias/mapping으로 오인, 모든 워크플로우 실행이 `jobs: []`, `conclusion: failure`로 종료되던 문제
- `ai-pr-review.yml`: PR 코멘트 body를 `echo` + `--body-file` 방식으로 교체
- `reusable-skill-check.yml`: PR 코멘트 body 교체 + Python f-string을 문자열 연결로 교체

## [1.1.0] - 2026-03-24

### Added
- npm 배포 지원 — `npx ai-skill-interface` 실행 시 스킬을 `~/.claude/skills/`에 자동 설치
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
