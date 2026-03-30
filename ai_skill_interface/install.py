import shutil
import sys
from pathlib import Path
from typing import Callable

SKILLS = [
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
]

# Agent configs: each defines how to write the auto-select entry point.
# claude uses @import; others inline the skill content (no import support).
AGENTS = [
    {
        "name": "claude",
        "file": "CLAUDE.md",
        "detect": lambda cwd: True,  # always included as default
        "entry": lambda content: "@~/.claude/skills/auto-select/SKILL.md\n",
        "marker": "auto-select/SKILL.md",
    },
    {
        "name": "cursor",
        "file": ".cursor/rules",
        "detect": lambda cwd: (cwd / ".cursor").exists(),
        "entry": lambda content: content,
        "marker": "auto-select",
    },
    {
        "name": "windsurf",
        "file": ".windsurfrules",
        "detect": lambda cwd: (cwd / ".windsurfrules").exists(),
        "entry": lambda content: content,
        "marker": "auto-select",
    },
    {
        "name": "copilot",
        "file": ".github/copilot-instructions.md",
        "detect": lambda cwd: (cwd / ".github").exists(),
        "entry": lambda content: content,
        "marker": "auto-select",
    },
    {
        "name": "cline",
        "file": ".clinerules",
        "detect": lambda cwd: (cwd / ".clinerules").exists(),
        "entry": lambda content: content,
        "marker": "auto-select",
    },
]


def skills_src() -> Path:
    return Path(__file__).parent / "skills"


def skills_dest() -> Path:
    return Path.home() / ".claude" / "skills"


def install_global() -> None:
    src_root = skills_src()
    dest_root = skills_dest()
    dest_root.mkdir(parents=True, exist_ok=True)

    installed = 0
    for skill in SKILLS:
        src = src_root / skill / "SKILL.md"
        if not src.exists():
            print(f"warning: skill not found: {skill}", file=sys.stderr)
            continue
        dest_dir = dest_root / skill
        dest_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest_dir / "SKILL.md")
        installed += 1

    print(f"✓ Installed {installed} skills to {dest_root}")


def write_agent_config(cwd: Path, agent: dict, auto_select_content: str) -> None:
    file_path = cwd / agent["file"]
    entry = agent["entry"](auto_select_content)

    file_path.parent.mkdir(parents=True, exist_ok=True)

    if file_path.exists():
        existing = file_path.read_text()
        if agent["marker"] in existing:
            print(f"  ✓ {agent['file']} already configured")
        else:
            with file_path.open("a") as f:
                f.write("\n" + entry)
            print(f"  ✓ {agent['file']} updated")
    else:
        file_path.write_text(entry)
        print(f"  ✓ {agent['file']} created")


def detect_agents(cwd: Path) -> list:
    return [a for a in AGENTS if a["detect"](cwd)]


def init_project(cwd: Path) -> None:
    install_global()
    print()

    auto_select_content = (skills_src() / "auto-select" / "SKILL.md").read_text()
    detected = detect_agents(cwd)

    print(f"Detected agents: {', '.join(a['name'] for a in detected)}")
    print()

    for agent in detected:
        write_agent_config(cwd, agent, auto_select_content)

    print()
    print("AI will analyze this project and select skills automatically.")
    print(f"All 19 skills are available at: {skills_dest()}")


def main() -> None:
    subcommand = sys.argv[1] if len(sys.argv) > 1 else None

    if subcommand == "init":
        init_project(Path.cwd())
    else:
        install_global()


if __name__ == "__main__":
    main()
