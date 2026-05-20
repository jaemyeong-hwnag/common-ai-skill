const fs = require("fs");
const path = require("path");
const assert = require("assert");

const SKILLS_DIR = path.resolve(__dirname, "../skills");
const README = path.resolve(__dirname, "../README.md");

function installedSkills() {
  return fs
    .readdirSync(SKILLS_DIR)
    .filter((skill) => fs.existsSync(path.join(SKILLS_DIR, skill, "SKILL.md")))
    .sort();
}

function extractFencedBlockAfterHeading(content, heading) {
  const start = content.indexOf(heading);
  assert.ok(start >= 0, `missing heading: ${heading}`);

  const match = content.slice(start).match(/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)\n```/);
  assert.ok(match, `missing fenced block after heading: ${heading}`);
  return match[1].trim();
}

// ── Test 1: Every SKILL.md has valid YAML frontmatter ────────────────────────
{
  const skills = fs.readdirSync(SKILLS_DIR);
  for (const skill of skills) {
    const file = path.join(SKILLS_DIR, skill, "SKILL.md");
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");

    // Must start with ---
    assert.ok(
      content.startsWith("---"),
      `${skill}/SKILL.md must start with YAML frontmatter (---)`
    );

    // Must have closing ---
    const secondDash = content.indexOf("---", 3);
    assert.ok(
      secondDash > 3,
      `${skill}/SKILL.md must have closing frontmatter (---)`
    );

    // Must have name: field
    const frontmatter = content.substring(3, secondDash);
    assert.ok(
      frontmatter.includes("name:"),
      `${skill}/SKILL.md frontmatter must include name: field`
    );

    // Must have description: field
    assert.ok(
      frontmatter.includes("description:"),
      `${skill}/SKILL.md frontmatter must include description: field`
    );
  }
  console.log("✓ all SKILL.md files have valid YAML frontmatter (name + description)");
}

// ── Test 2: Every SKILL.md has structural markers (XML tags or ## headings) ───
{
  const skills = fs.readdirSync(SKILLS_DIR);
  for (const skill of skills) {
    const file = path.join(SKILLS_DIR, skill, "SKILL.md");
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");

    const hasXmlTag =
      content.includes("<constraints>") ||
      content.includes("<criteria>") ||
      content.includes("<instruction>");
    const hasHeading =
      content.includes("## ") || content.includes("**Done**");
    assert.ok(
      hasXmlTag || hasHeading,
      `${skill}/SKILL.md must have XML tags or ## headings for structure`
    );
  }
  console.log("✓ all SKILL.md files have structural markers");
}

// ── Test 3: No technology-specific terms in SKILL.md ─────────────────────────
{
  const BANNED_TERMS = [
    /\bJest\b/,
    /\bMocha\b/,
    /\bPytest\b/,
    /\bESLint\b/,
    /\bPrettier\b/,
    /\bnpm\b/,
    /\byarn\b/,
    /\bpip\b/,
    /\bDocker\b/,
    /\bKubernetes\b/,
    /\bReact\b/,
    /\bVue\b/,
    /\bAngular\b/,
    /\bDjango\b/,
    /\bFlask\b/,
    /\bExpress\b/,
    /\bsrc\/\b/,
    /\bindex\.ts\b/,
    /\bindex\.js\b/,
  ];

  const skills = fs.readdirSync(SKILLS_DIR);
  for (const skill of skills) {
    const file = path.join(SKILLS_DIR, skill, "SKILL.md");
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");

    for (const term of BANNED_TERMS) {
      assert.ok(
        !term.test(content),
        `${skill}/SKILL.md contains banned technology term: ${term}`
      );
    }
  }
  console.log("✓ no SKILL.md contains banned technology-specific terms");
}

// ── Test 4: README contains a section for every skill ────────────────────────
{
  const readme = fs.readFileSync(README, "utf8");
  const skills = fs.readdirSync(SKILLS_DIR);

  // auto-select is documented as ## Auto-Selection, not ### auto-select
  const SPECIAL_SECTIONS = { "auto-select": "Auto-Selection" };

  for (const skill of skills) {
    const file = path.join(SKILLS_DIR, skill, "SKILL.md");
    if (!fs.existsSync(file)) continue;

    const section = SPECIAL_SECTIONS[skill] || skill;
    assert.ok(
      readme.includes(`### ${section}`) || readme.includes(`## ${section}`),
      `README.md must contain section for: ${skill}`
    );
  }
  console.log("✓ README.md contains a section for every skill");
}

// ── Test 5: Skills with requires: field reference existing skills ─────────────
{
  const installedSkills = new Set(fs.readdirSync(SKILLS_DIR));
  const skills = fs.readdirSync(SKILLS_DIR);

  for (const skill of skills) {
    const file = path.join(SKILLS_DIR, skill, "SKILL.md");
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");

    const match = content.match(/requires:\s*\[([^\]]+)\]/);
    if (!match) continue;

    const deps = match[1].split(",").map((d) => d.trim());
    for (const dep of deps) {
      assert.ok(
        installedSkills.has(dep),
        `${skill}/SKILL.md requires: [${dep}] but ${dep} does not exist in skills/`
      );
    }
  }
  console.log("✓ all requires: dependencies reference existing skills");
}

// ── Test 6: bin/init.js SKILLS array matches skills/ directory ───────────────
{
  const initScript = fs.readFileSync(
    path.resolve(__dirname, "../bin/init.js"),
    "utf8"
  );
  const pythonInstaller = fs.readFileSync(
    path.resolve(__dirname, "../ai_skill_interface/install.py"),
    "utf8"
  );
  const dirSkills = installedSkills();

  for (const skill of dirSkills) {
    assert.ok(
      initScript.includes(`"${skill}"`),
      `bin/init.js SKILLS array must include "${skill}"`
    );
    assert.ok(
      pythonInstaller.includes(`"${skill}"`),
      `ai_skill_interface/install.py SKILLS array must include "${skill}"`
    );
  }
  console.log("✓ installer SKILLS arrays match skills/ directory");
}

// ── Test 7: README auto-selection mirrors auto-select entrypoint ─────────────
{
  const readme = fs.readFileSync(README, "utf8");
  const autoSelect = fs.readFileSync(
    path.join(SKILLS_DIR, "auto-select", "SKILL.md"),
    "utf8"
  );

  const readmeRules = extractFencedBlockAfterHeading(readme, "## Auto-Selection");
  const entrypointRules = extractFencedBlockAfterHeading(
    autoSelect,
    "## Selection Rules"
  );

  assert.strictEqual(
    entrypointRules,
    readmeRules,
    "skills/auto-select/SKILL.md selection rules must mirror README.md Auto-Selection"
  );
  console.log("✓ auto-select selection rules mirror README.md");
}

// ── Test 8: Reusable workflow embedded Python is not double-escaped ──────────
{
  const workflow = fs.readFileSync(
    path.resolve(__dirname, "../.github/workflows/reusable-skill-check.yml"),
    "utf8"
  );

  for (const invalid of ["payload = {{", "headers={{", "{{diff}}", "{{os.environ"]) {
    assert.ok(
      !workflow.includes(invalid),
      `reusable-skill-check.yml contains invalid Python escape: ${invalid}`
    );
  }
  assert.ok(
    workflow.includes("cat /tmp/skill_violations.txt"),
    "reusable-skill-check.yml must write multiline violations through a file"
  );
  console.log("✓ reusable workflow embedded Python is validly escaped");
}

console.log("\nAll structure tests passed.");
