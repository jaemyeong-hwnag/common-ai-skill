import json
import os
import re
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

AI_DEPS = {
    "openai", "anthropic", "langchain", "langchain-core", "langchain-community",
    "llama-index", "llama_index", "ollama", "groq", "cohere",
    "google-generativeai", "google-genai", "transformers", "huggingface-hub",
    "ai21", "together", "mistralai",
}

RAG_DEPS = {
    "chromadb", "pinecone-client", "pinecone", "weaviate-client",
    "qdrant-client", "faiss-cpu", "faiss-gpu", "pgvector",
}

MULTI_AGENT_DEPS = {
    "langgraph", "crewai", "autogen", "pyautogen", "swarm",
}


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


def _read_deps(cwd: Path) -> set:
    deps: set = set()

    # pyproject.toml
    pyproject = cwd / "pyproject.toml"
    if pyproject.exists():
        text = pyproject.read_text()
        deps.update(re.findall(r'^\s*"?([a-zA-Z0-9_\-]+)', text, re.MULTILINE))

    # requirements.txt / requirements-*.txt
    for req_file in cwd.glob("requirements*.txt"):
        for line in req_file.read_text().splitlines():
            m = re.match(r"^([a-zA-Z0-9_\-]+)", line.strip())
            if m:
                deps.add(m.group(1).lower())

    # package.json
    pkg = cwd / "package.json"
    if pkg.exists():
        try:
            data = json.loads(pkg.read_text())
            deps.update(data.get("dependencies", {}).keys())
            deps.update(data.get("devDependencies", {}).keys())
        except json.JSONDecodeError:
            pass

    return {d.lower() for d in deps}


def detect_project(cwd: Path) -> dict:
    deps = _read_deps(cwd)

    def exists(*parts):
        return any((cwd / p).exists() for p in parts)

    def glob_match(pattern):
        try:
            return any(
                re.search(pattern, str(f), re.IGNORECASE)
                for f in cwd.rglob("*")
                if f.is_file()
            )
        except Exception:
            return False

    return {
        "hasTests": (
            exists("test", "tests", "spec", "specs") or
            glob_match(r"\.(test|spec)\.(py|js|ts|rb|go|rs)$")
        ),
        "hasAI": bool(deps & AI_DEPS) or glob_match(r"(llm|agent|prompt|embedding)"),
        "hasHexagonal": exists(
            "src/domain", "src/application", "src/infrastructure",
            "domain", "application", "infrastructure",
        ),
        "hasVersioning": exists("CHANGELOG.md", "CHANGELOG"),
        "hasRAG": bool(deps & RAG_DEPS),
        "hasMultiAgent": bool(deps & MULTI_AGENT_DEPS),
    }


def select_skills(signals: dict) -> list:
    selected = ["delivery-workflow", "auto-select"]

    if signals["hasTests"]:
        selected += ["test-runner", "coverage"]
    if signals["hasHexagonal"]:
        selected += ["hexagonal-development", "interface-first-development"]
    if signals["hasAI"]:
        selected += ["framework-selection", "observability", "human-in-the-loop"]
    if signals["hasRAG"]:
        selected.append("rag-development")
    if signals["hasMultiAgent"]:
        selected += ["agent-orchestration", "harness-engineering"]
    if signals["hasVersioning"]:
        selected += ["version", "docs-sync"]

    return list(dict.fromkeys(selected))  # deduplicate, preserve order


def init_project(cwd: Path) -> None:
    install_global()
    print()

    signals = detect_project(cwd)
    selected = select_skills(signals)

    claude_md = cwd / "CLAUDE.md"
    skill_lines = [f"@~/.claude/skills/{s}/SKILL.md" for s in selected]

    if claude_md.exists():
        existing = claude_md.read_text()
        missing = [s for s in selected if f"{s}/SKILL.md" not in existing]
        already = [s for s in selected if f"{s}/SKILL.md" in existing]

        if not missing:
            print("✓ CLAUDE.md already contains all recommended skills")
        else:
            append_block = "\n" + "\n".join(
                f"@~/.claude/skills/{s}/SKILL.md" for s in missing
            ) + "\n"
            with claude_md.open("a") as f:
                f.write(append_block)
            print(f"✓ Added {len(missing)} skills to existing CLAUDE.md")
            if already:
                print(f"  ({len(already)} already present, skipped)")
    else:
        claude_md.write_text("## Skills\n\n" + "\n".join(skill_lines) + "\n")
        print("✓ Created CLAUDE.md")

    print()
    print("Skills selected for this project:")
    for s in selected:
        print(f"  - {s}")

    reasons = []
    if signals["hasTests"]:      reasons.append("  tests detected        → test-runner, coverage")
    if signals["hasHexagonal"]:  reasons.append("  layered structure      → hexagonal-development, interface-first-development")
    if signals["hasAI"]:         reasons.append("  AI dependencies        → framework-selection, observability, human-in-the-loop")
    if signals["hasRAG"]:        reasons.append("  vector store detected  → rag-development")
    if signals["hasMultiAgent"]: reasons.append("  multi-agent lib        → agent-orchestration, harness-engineering")
    if signals["hasVersioning"]: reasons.append("  CHANGELOG detected     → version, docs-sync")

    if reasons:
        print()
        print("Why:")
        for r in reasons:
            print(r)


def main() -> None:
    subcommand = sys.argv[1] if len(sys.argv) > 1 else None

    if subcommand == "init":
        init_project(Path.cwd())
    else:
        install_global()


if __name__ == "__main__":
    main()
