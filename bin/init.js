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
  "harness-engineering",
  "auto-select",
];

function installGlobal() {
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

function initProject(cwd) {
  installGlobal();
  console.log("");

  const claudeMdPath = path.join(cwd, "CLAUDE.md");
  const entry = "@~/.claude/skills/auto-select/SKILL.md";

  if (fs.existsSync(claudeMdPath)) {
    const existing = fs.readFileSync(claudeMdPath, "utf8");
    if (existing.includes("auto-select/SKILL.md")) {
      console.log("✓ CLAUDE.md already includes auto-select");
    } else {
      fs.appendFileSync(claudeMdPath, "\n" + entry + "\n");
      console.log("✓ Added auto-select to existing CLAUDE.md");
    }
  } else {
    fs.writeFileSync(claudeMdPath, entry + "\n");
    console.log("✓ Created CLAUDE.md");
  }

  console.log("");
  console.log("AI will analyze this project and select skills automatically.");
  console.log(`All 19 skills are available at: ${SKILLS_DEST}`);
}

const subcommand = process.argv[2];

if (subcommand === "init") {
  initProject(process.cwd());
} else {
  installGlobal();
}
