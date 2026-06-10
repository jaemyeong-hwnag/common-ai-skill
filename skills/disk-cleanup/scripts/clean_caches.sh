#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

HOME_DIR="${HOME:?HOME is required}"
APPLY=0
AGGRESSIVE_HF=0
INCLUDE_AGENTIC_MODELS=0
INCLUDE_CODEX_RUNTIMES=0

usage() {
  cat <<'USAGE'
Usage: bash scripts/clean_caches.sh [--apply] [--aggressive-hf] [--include-agentic-models] [--include-codex-runtimes]

Without --apply this performs a dry run.

Default cleanup removes regenerable package/app caches only.
Aggressive flags remove large model/runtime caches that may require downloads to restore.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply)
      APPLY=1
      ;;
    --aggressive-hf)
      AGGRESSIVE_HF=1
      ;;
    --include-agentic-models)
      INCLUDE_AGENTIC_MODELS=1
      ;;
    --include-codex-runtimes)
      INCLUDE_CODEX_RUNTIMES=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf "Unknown option: %s\n\n" "$1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

mode_label() {
  if [[ "$APPLY" -eq 1 ]]; then
    printf "APPLY"
  else
    printf "DRY-RUN"
  fi
}

run_cmd() {
  printf "[%s] %s\n" "$(mode_label)" "$*"
  if [[ "$APPLY" -eq 1 ]]; then
    "$@" || printf "[warn] command failed, continuing: %s\n" "$*" >&2
  fi
}

remove_path() {
  local path="$1"
  case "$path" in
    "$HOME_DIR/Library/Caches/JetBrains"|"$HOME_DIR/Library/Caches/JetBrains/"*|\
    "$HOME_DIR/Library/Application Support/JetBrains"|"$HOME_DIR/Library/Application Support/JetBrains/"*|\
    "$HOME_DIR/Library/Preferences/"*JetBrains*|"$HOME_DIR/Library/Preferences/"*IntelliJ*|\
    "$HOME_DIR/Library/Logs/JetBrains"|"$HOME_DIR/Library/Logs/JetBrains/"*|\
    "$HOME_DIR/.config/JetBrains"|"$HOME_DIR/.config/JetBrains/"*|\
    "$HOME_DIR/.local/share/JetBrains"|"$HOME_DIR/.local/share/JetBrains/"*)
      printf "[protect] preserving JetBrains/IntelliJ path %s\n" "$path"
      return 0
      ;;
  esac

  if [[ ! -e "$path" ]]; then
    printf "[skip] missing %s\n" "$path"
    return 0
  fi

  printf "[%s] rm -rf %s\n" "$(mode_label)" "$path"
  if [[ "$APPLY" -eq 1 ]]; then
    rm -rf "$path" || printf "[warn] remove failed, continuing: %s\n" "$path" >&2
  fi
}

printf "Cleanup mode: %s\n" "$(mode_label)"

if command -v brew >/dev/null 2>&1; then
  run_cmd brew cleanup -s
else
  remove_path "$HOME_DIR/Library/Caches/Homebrew"
fi
remove_path "$HOME_DIR/Library/Caches/Homebrew/downloads"

if command -v npm >/dev/null 2>&1; then
  run_cmd npm cache clean --force
else
  remove_path "$HOME_DIR/.npm/_cacache"
fi
remove_path "$HOME_DIR/.npm/_npx"
remove_path "$HOME_DIR/.npm/_libvips"

if command -v uv >/dev/null 2>&1; then
  run_cmd uv cache clean
else
  remove_path "$HOME_DIR/.cache/uv"
fi

if command -v pip3 >/dev/null 2>&1; then
  run_cmd pip3 cache purge
fi

if command -v hf >/dev/null 2>&1; then
  run_cmd hf cache prune --cache-dir "$HOME_DIR/.cache/huggingface/hub" --yes
fi

for shipit_cache in "$HOME_DIR"/Library/Caches/*.ShipIt; do
  remove_path "$shipit_cache"
done

remove_path "$HOME_DIR/Library/Caches/com.openai.codex/org.sparkle-project.Sparkle"
remove_path "$HOME_DIR/Library/Caches/Google"
remove_path "$HOME_DIR/Library/Caches/ms-playwright"
remove_path "$HOME_DIR/Library/Caches/node-gyp"
remove_path "$HOME_DIR/Library/Caches/ollama"
remove_path "$HOME_DIR/.cache/github-copilot"
remove_path "$HOME_DIR/.cache/mole"
remove_path "$HOME_DIR/.cache/pkg"
remove_path "$HOME_DIR/.gradle/daemon"
remove_path "$HOME_DIR/.gradle/caches"
remove_path "$HOME_DIR/.gradle/native"
remove_path "$HOME_DIR/.gradle/kotlin-profile"

if [[ "$AGGRESSIVE_HF" -eq 1 ]]; then
  remove_path "$HOME_DIR/.cache/huggingface/hub"
fi

if [[ "$INCLUDE_AGENTIC_MODELS" -eq 1 ]]; then
  remove_path "$HOME_DIR/.cache/agentic-capital/models"
fi

if [[ "$INCLUDE_CODEX_RUNTIMES" -eq 1 ]]; then
  remove_path "$HOME_DIR/.cache/codex-runtimes"
fi

printf "Done. Re-run scripts/audit_caches.sh to verify reclaimed space.\n"
