#!/usr/bin/env bash
set -euo pipefail

HOME_DIR="${HOME:?HOME is required}"
TOP_N="${TOP_N:-40}"

human_du() {
  local path="$1"
  if [[ -e "$path" ]]; then
    du -sh "$path" 2>/dev/null || true
  else
    printf "missing\t%s\n" "$path"
  fi
}

top_children() {
  local path="$1"
  local label="$2"

  printf "\n== %s ==\n" "$label"
  if [[ ! -d "$path" ]]; then
    printf "missing\t%s\n" "$path"
    return 0
  fi

  # Keep this simple and macOS-friendly; permission-denied entries are ignored.
  du -sk "$path"/* 2>/dev/null | sort -nr | head -n "$TOP_N" || true
}

printf "== Filesystem ==\n"
df -h "$HOME_DIR" || true

printf "\n== Key Cache Roots ==\n"
human_du "$HOME_DIR/.cache"
human_du "$HOME_DIR/Library/Caches"
human_du "$HOME_DIR/.npm"
human_du "$HOME_DIR/.cache/huggingface/hub"
human_du "$HOME_DIR/.cache/agentic-capital"
human_du "$HOME_DIR/.cache/codex-runtimes"

top_children "$HOME_DIR/.cache" "~/.cache"
top_children "$HOME_DIR/Library/Caches" "~/Library/Caches"

if command -v hf >/dev/null 2>&1 && [[ -d "$HOME_DIR/.cache/huggingface/hub" ]]; then
  printf "\n== Hugging Face Cache ==\n"
  hf cache list --cache-dir "$HOME_DIR/.cache/huggingface/hub" --sort size --limit 50 || true
  printf "\n== Hugging Face Prune Dry Run ==\n"
  hf cache prune --cache-dir "$HOME_DIR/.cache/huggingface/hub" --dry-run || true
fi
