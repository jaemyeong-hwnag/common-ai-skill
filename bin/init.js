#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILLS_SRC = path.resolve(__dirname, "../skills");
const SKILLS_DEST = path.join(os.homedir(), ".claude", "skills");

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
  "skill-propose",
  "skill-install",
  "skill-update",
  "harness-engineering",
];

function run() {
  fs.mkdirSync(SKILLS_DEST, { recursive: true });

  let installed = 0;
  for (const skill of SKILLS) {
    const src = path.join(SKILLS_SRC, skill, "SKILL.md");
    if (!fs.existsSync(src)) {
      console.warn(`⚠ skill not found: ${skill}`);
      continue;
    }
    const destDir = path.join(SKILLS_DEST, skill);
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, path.join(destDir, "SKILL.md"));
    installed++;
  }

  console.log(`✓ Installed ${installed} skills to ${SKILLS_DEST}`);
}

run();
