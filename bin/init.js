#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CLAUDE_MD = path.join(process.cwd(), "CLAUDE.md");
const MARKER_START = "<!-- common-ai-skill:start -->";
const MARKER_END = "<!-- common-ai-skill:end -->";

const SKILLS = [
  "delivery-workflow",
  "test-runner",
  "coverage",
  "finalize",
  "hexagonal-development",
  "interface-first-development",
  "docs-sync",
  "security-audit",
  "version",
  "ai-token-optimize",
  "principle-audit",
  "framework-selection",
  "rag-development",
  "observability",
  "evaluation",
  "human-in-the-loop",
  "agent-orchestration",
];

function buildSkillBlock() {
  const imports = SKILLS.map(
    (s) => `@node_modules/common-ai-skill/skills/${s}/SKILL.md`
  ).join("\n");

  return `${MARKER_START}
# common-ai-skill
Auto-select and apply skills based on work context. Detect project conventions first, then implement.

${imports}
${MARKER_END}`;
}

function run() {
  const block = buildSkillBlock();

  if (!fs.existsSync(CLAUDE_MD)) {
    fs.writeFileSync(CLAUDE_MD, block + "\n");
    console.log("✓ Created CLAUDE.md with common-ai-skill imports");
    return;
  }

  let content = fs.readFileSync(CLAUDE_MD, "utf8");

  if (content.includes(MARKER_START)) {
    // Update existing block
    const re = new RegExp(
      `${MARKER_START}[\\s\\S]*?${MARKER_END}`,
      "m"
    );
    content = content.replace(re, block);
    fs.writeFileSync(CLAUDE_MD, content);
    console.log("✓ Updated common-ai-skill imports in CLAUDE.md");
    return;
  }

  // Append to existing file
  fs.writeFileSync(CLAUDE_MD, content.trimEnd() + "\n\n" + block + "\n");
  console.log("✓ Added common-ai-skill imports to CLAUDE.md");
}

run();
