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

function runInit(homeDir) {
  execSync(`node ${INIT_SCRIPT}`, {
    stdio: "pipe",
    env: { ...process.env, HOME: homeDir },
  });
}

function skillsDir(homeDir) {
  return path.join(homeDir, ".claude", "skills");
}

// Test 1: copies skills to ~/.claude/skills/
withTempDir((homeDir) => {
  runInit(homeDir);
  const dest = skillsDir(homeDir);
  assert.ok(fs.existsSync(dest), "~/.claude/skills/ should exist");
  assert.ok(
    fs.existsSync(path.join(dest, "delivery-workflow", "SKILL.md")),
    "delivery-workflow/SKILL.md should be copied"
  );
  console.log("✓ copies skills to ~/.claude/skills/");
});

// Test 2: idempotent — re-run does not fail or duplicate
withTempDir((homeDir) => {
  runInit(homeDir);
  runInit(homeDir);
  const dest = skillsDir(homeDir);
  const files = fs.readdirSync(dest);
  const dupes = files.filter((f) => files.indexOf(f) !== files.lastIndexOf(f));
  assert.strictEqual(dupes.length, 0, "no duplicate skill dirs on re-run");
  console.log("✓ idempotent — re-run does not duplicate");
});

// Test 3: all 20 skills are installed
withTempDir((homeDir) => {
  runInit(homeDir);
  const dest = skillsDir(homeDir);
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
    "skill-propose",
    "skill-install",
    "skill-update",
  ];
  for (const skill of expected) {
    assert.ok(
      fs.existsSync(path.join(dest, skill, "SKILL.md")),
      `should install skill: ${skill}`
    );
  }
  console.log(`✓ all ${expected.length} skills installed`);
});

// Test 4: each installed file is non-empty
withTempDir((homeDir) => {
  runInit(homeDir);
  const dest = skillsDir(homeDir);
  for (const skill of fs.readdirSync(dest)) {
    const content = fs.readFileSync(path.join(dest, skill, "SKILL.md"), "utf8");
    assert.ok(content.length > 0, `${skill}/SKILL.md should not be empty`);
  }
  console.log("✓ all installed SKILL.md files are non-empty");
});

console.log("\nAll tests passed.");
