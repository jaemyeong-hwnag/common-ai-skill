import os
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
]


def skills_src() -> Path:
    return Path(__file__).parent.parent / "skills"


def skills_dest() -> Path:
    return Path.home() / ".claude" / "skills"


def main() -> None:
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

    print(f"installed {installed} skills to {dest_root}")


if __name__ == "__main__":
    main()
