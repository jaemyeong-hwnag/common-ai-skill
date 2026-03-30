import shutil
import sys
from pathlib import Path

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


def init_project(cwd: Path) -> None:
    install_global()
    print()

    claude_md = cwd / "CLAUDE.md"
    entry = "@~/.claude/skills/auto-select/SKILL.md"

    if claude_md.exists():
        existing = claude_md.read_text()
        if "auto-select/SKILL.md" in existing:
            print("✓ CLAUDE.md already includes auto-select")
        else:
            with claude_md.open("a") as f:
                f.write("\n" + entry + "\n")
            print("✓ Added auto-select to existing CLAUDE.md")
    else:
        claude_md.write_text(entry + "\n")
        print("✓ Created CLAUDE.md")

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
