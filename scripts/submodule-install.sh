#!/bin/sh
# Install common-ai-skill as a git submodule and wire it into CLAUDE.md

set -e

REPO_URL="https://github.com/jaemyeong-hwnag/common-ai-skill.git"
SUBMODULE_PATH=".skills"
CLAUDE_MD="CLAUDE.md"
MARKER_START="<!-- common-ai-skill:start -->"
MARKER_END="<!-- common-ai-skill:end -->"

SKILLS="delivery-workflow test-runner coverage finalize hexagonal-development \
interface-first-development docs-sync security-audit version ai-token-optimize \
principle-audit framework-selection rag-development observability evaluation \
human-in-the-loop agent-orchestration"

# Add submodule if not already present
if [ ! -f ".gitmodules" ] || ! grep -q "$SUBMODULE_PATH" ".gitmodules" 2>/dev/null; then
  echo "Adding submodule..."
  git submodule add "$REPO_URL" "$SUBMODULE_PATH"
else
  echo "Submodule already present, updating..."
  git submodule update --remote "$SUBMODULE_PATH"
fi

# Build import block
IMPORTS=""
for skill in $SKILLS; do
  IMPORTS="${IMPORTS}@.skills/skills/${skill}/SKILL.md
"
done

BLOCK="${MARKER_START}
# common-ai-skill
Auto-select and apply skills based on work context. Detect project conventions first, then implement.

${IMPORTS}${MARKER_END}"

# Write to CLAUDE.md
if [ ! -f "$CLAUDE_MD" ]; then
  printf '%s\n' "$BLOCK" > "$CLAUDE_MD"
  echo "✓ Created $CLAUDE_MD with common-ai-skill imports"
elif grep -q "$MARKER_START" "$CLAUDE_MD"; then
  # Update existing block (requires python3 for reliable multiline replace)
  python3 -c "
import re, sys
content = open('$CLAUDE_MD').read()
block = '''$BLOCK'''
result = re.sub(r'$MARKER_START[\s\S]*?$MARKER_END', block, content)
open('$CLAUDE_MD', 'w').write(result)
"
  echo "✓ Updated common-ai-skill imports in $CLAUDE_MD"
else
  printf '\n%s\n' "$BLOCK" >> "$CLAUDE_MD"
  echo "✓ Added common-ai-skill imports to $CLAUDE_MD"
fi

echo ""
echo "Done. Commit the changes:"
echo "  git add .gitmodules $SUBMODULE_PATH $CLAUDE_MD"
echo "  git commit -m 'chore: add common-ai-skill submodule'"
