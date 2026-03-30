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

// Agent configs: each defines how to write the auto-select entry point
// claude uses @import; others inline the skill content (no import support)
const AGENTS = [
  {
    name: "claude",
    file: "CLAUDE.md",
    detect: () => true, // always included as default
    write: (content) => content,
    entry: () => "@~/.claude/skills/auto-select/SKILL.md\n",
    marker: "auto-select/SKILL.md",
  },
  {
    name: "cursor",
    file: ".cursor/rules",
    detect: (cwd) => fs.existsSync(path.join(cwd, ".cursor")),
    write: (content) => content,
    entry: (autoSelectContent) => autoSelectContent,
    marker: "auto-select",
  },
  {
    name: "windsurf",
    file: ".windsurfrules",
    detect: (cwd) => fs.existsSync(path.join(cwd, ".windsurfrules")),
    write: (content) => content,
    entry: (autoSelectContent) => autoSelectContent,
    marker: "auto-select",
  },
  {
    name: "copilot",
    file: ".github/copilot-instructions.md",
    detect: (cwd) => fs.existsSync(path.join(cwd, ".github")),
    write: (content) => content,
    entry: (autoSelectContent) => autoSelectContent,
    marker: "auto-select",
  },
  {
    name: "cline",
    file: ".clinerules",
    detect: (cwd) => fs.existsSync(path.join(cwd, ".clinerules")),
    write: (content) => content,
    entry: (autoSelectContent) => autoSelectContent,
    marker: "auto-select",
  },
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

function readAutoSelectContent() {
  const src = path.join(SKILLS_SRC, "auto-select", "SKILL.md");
  return fs.readFileSync(src, "utf8");
}

function writeAgentConfig(cwd, agent, autoSelectContent) {
  const filePath = path.join(cwd, agent.file);
  const entry = agent.entry(autoSelectContent);

  // ensure parent directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf8");
    if (existing.includes(agent.marker)) {
      console.log(`  ✓ ${agent.file} already configured`);
    } else {
      fs.appendFileSync(filePath, "\n" + entry);
      console.log(`  ✓ ${agent.file} updated`);
    }
  } else {
    fs.writeFileSync(filePath, entry);
    console.log(`  ✓ ${agent.file} created`);
  }
}

function detectAgents(cwd) {
  return AGENTS.filter((a) => a.detect(cwd));
}

function initProject(cwd) {
  installGlobal();
  console.log("");

  const autoSelectContent = readAutoSelectContent();
  const detected = detectAgents(cwd);

  console.log(`Detected agents: ${detected.map((a) => a.name).join(", ")}`);
  console.log("");

  for (const agent of detected) {
    writeAgentConfig(cwd, agent, autoSelectContent);
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
