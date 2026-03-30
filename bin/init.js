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

function detectProject(cwd) {
  const exists = (f) => fs.existsSync(path.join(cwd, f));
  const readJson = (f) => {
    try { return JSON.parse(fs.readFileSync(path.join(cwd, f), "utf8")); }
    catch { return null; }
  };
  const globMatch = (pattern) => {
    try {
      const entries = fs.readdirSync(cwd, { recursive: true, withFileTypes: true });
      return entries.some((e) => e.isFile() && e.name.match(pattern));
    } catch { return false; }
  };

  const pkg = readJson("package.json");
  const allDeps = Object.keys({
    ...(pkg?.dependencies || {}),
    ...(pkg?.devDependencies || {}),
  });

  const AI_DEPS = ["openai", "@anthropic-ai/sdk", "anthropic", "langchain",
    "@langchain/core", "llamaindex", "ollama", "groq-sdk",
    "google-generativeai", "@google/generative-ai", "cohere-ai",
    "ai", "@ai-sdk/openai", "@ai-sdk/anthropic"];

  const signals = {
    hasTests: exists("test") || exists("tests") || exists("spec") ||
      globMatch(/\.(test|spec)\.(js|ts|py|rb|go|rs)$/),
    hasAI: allDeps.some((d) => AI_DEPS.includes(d)) ||
      exists("ai") || globMatch(/llm|agent|prompt|embedding/i),
    hasHexagonal: (exists("src/domain") || exists("src/application") ||
      exists("src/infrastructure") || exists("domain") ||
      exists("application") || exists("infrastructure")),
    hasVersioning: exists("CHANGELOG.md") || exists("CHANGELOG"),
    hasRAG: allDeps.some((d) =>
      ["chromadb", "pinecone-client", "weaviate-client",
       "qdrant-client", "@pinecone-database/pinecone",
       "faiss-node", "vectorstore"].includes(d)),
    hasMultiAgent: allDeps.some((d) =>
      ["langgraph", "@langchain/langgraph", "crewai", "autogen"].includes(d)),
  };

  return signals;
}

function selectSkills(signals) {
  const selected = new Set(["delivery-workflow", "auto-select"]);

  if (signals.hasTests) {
    selected.add("test-runner");
    selected.add("coverage");
  }

  if (signals.hasHexagonal) {
    selected.add("hexagonal-development");
    selected.add("interface-first-development");
  }

  if (signals.hasAI) {
    selected.add("framework-selection");
    selected.add("observability");
    selected.add("human-in-the-loop");
  }

  if (signals.hasRAG) {
    selected.add("rag-development");
  }

  if (signals.hasMultiAgent) {
    selected.add("agent-orchestration");
    selected.add("harness-engineering");
  }

  if (signals.hasVersioning) {
    selected.add("version");
    selected.add("docs-sync");
  }

  return [...selected];
}

function initProject(cwd) {
  // Ensure skills are installed globally first
  installGlobal();
  console.log("");

  const signals = detectProject(cwd);
  const selected = selectSkills(signals);

  const claudeMdPath = path.join(cwd, "CLAUDE.md");
  const skillsHeader = "## Skills\n\n";
  const skillLines = selected
    .map((s) => `@~/.claude/skills/${s}/SKILL.md`)
    .join("\n");
  const block = skillsHeader + skillLines + "\n";

  if (fs.existsSync(claudeMdPath)) {
    const existing = fs.readFileSync(claudeMdPath, "utf8");
    const alreadyImported = selected.filter((s) =>
      existing.includes(`${s}/SKILL.md`)
    );
    const missing = selected.filter((s) =>
      !existing.includes(`${s}/SKILL.md`)
    );

    if (missing.length === 0) {
      console.log("✓ CLAUDE.md already contains all recommended skills");
    } else {
      const appendBlock =
        "\n" + missing.map((s) => `@~/.claude/skills/${s}/SKILL.md`).join("\n") + "\n";
      fs.appendFileSync(claudeMdPath, appendBlock);
      console.log(`✓ Added ${missing.length} skills to existing CLAUDE.md`);
      if (alreadyImported.length > 0) {
        console.log(`  (${alreadyImported.length} already present, skipped)`);
      }
    }
  } else {
    fs.writeFileSync(claudeMdPath, block);
    console.log("✓ Created CLAUDE.md");
  }

  console.log("");
  console.log("Skills selected for this project:");
  selected.forEach((s) => console.log(`  - ${s}`));

  const reasons = [];
  if (signals.hasTests)      reasons.push("  tests detected        → test-runner, coverage");
  if (signals.hasHexagonal)  reasons.push("  layered structure      → hexagonal-development, interface-first-development");
  if (signals.hasAI)         reasons.push("  AI dependencies        → framework-selection, observability, human-in-the-loop");
  if (signals.hasRAG)        reasons.push("  vector store detected  → rag-development");
  if (signals.hasMultiAgent) reasons.push("  multi-agent lib        → agent-orchestration, harness-engineering");
  if (signals.hasVersioning) reasons.push("  CHANGELOG detected     → version, docs-sync");

  if (reasons.length > 0) {
    console.log("");
    console.log("Why:");
    reasons.forEach((r) => console.log(r));
  }
}

const subcommand = process.argv[2];

if (subcommand === "init") {
  initProject(process.cwd());
} else {
  installGlobal();
}
