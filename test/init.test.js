const fs = require("fs");
const os = require("os");
const path = require("path");
const assert = require("assert");
const { execSync } = require("child_process");

const INIT_SCRIPT = path.resolve(__dirname, "../bin/init.js");

function withTempDir(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cas-test-"));
  try {
    fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function runInit(cwd) {
  execSync(`node ${INIT_SCRIPT}`, { cwd, stdio: "pipe" });
}

function readClaude(dir) {
  return fs.readFileSync(path.join(dir, "CLAUDE.md"), "utf8");
}

// Simulate node_modules layout so @path refs are realistic
function setupNodeModules(dir) {
  const skillsBase = path.join(
    dir,
    "node_modules",
    "common-ai-skill",
    "skills"
  );
  fs.mkdirSync(path.join(skillsBase, "delivery-workflow"), { recursive: true });
  fs.writeFileSync(
    path.join(skillsBase, "delivery-workflow", "SKILL.md"),
    "# delivery-workflow"
  );
}

// Test 1: creates CLAUDE.md when none exists
withTempDir((dir) => {
  setupNodeModules(dir);
  runInit(dir);
  const content = readClaude(dir);
  assert.ok(
    content.includes("<!-- common-ai-skill:start -->"),
    "should contain start marker"
  );
  assert.ok(
    content.includes("<!-- common-ai-skill:end -->"),
    "should contain end marker"
  );
  assert.ok(
    content.includes("@node_modules/common-ai-skill/skills/delivery-workflow/SKILL.md"),
    "should include delivery-workflow import"
  );
  console.log("✓ creates CLAUDE.md from scratch");
});

// Test 2: appends to existing CLAUDE.md
withTempDir((dir) => {
  setupNodeModules(dir);
  fs.writeFileSync(path.join(dir, "CLAUDE.md"), "# My Project\n\nExisting content.\n");
  runInit(dir);
  const content = readClaude(dir);
  assert.ok(content.includes("# My Project"), "should preserve existing content");
  assert.ok(content.includes("<!-- common-ai-skill:start -->"), "should add skill block");
  console.log("✓ appends to existing CLAUDE.md without overwriting");
});

// Test 3: updates (does not duplicate) on re-run
withTempDir((dir) => {
  setupNodeModules(dir);
  runInit(dir);
  runInit(dir); // second run
  const content = readClaude(dir);
  const count = (content.match(/<!-- common-ai-skill:start -->/g) || []).length;
  assert.strictEqual(count, 1, "should not duplicate skill block on re-run");
  console.log("✓ idempotent — no duplicate block on re-run");
});

// Test 4: all 17 skills are included
withTempDir((dir) => {
  setupNodeModules(dir);
  runInit(dir);
  const content = readClaude(dir);
  const expected = [
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
  for (const skill of expected) {
    assert.ok(content.includes(skill), `should include skill: ${skill}`);
  }
  console.log(`✓ all ${expected.length} skills included`);
});

console.log("\nAll tests passed.");
