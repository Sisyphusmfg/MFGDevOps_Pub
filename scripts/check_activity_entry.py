#!/usr/bin/env python3
"""Fail a pull request that adds no activity-log entry file (PUB-D-13).

Every pull request adds one new file in Persona/Agent_Activity_Log/, named
YYYY-MM-DD_HHMM_<agent>_<topic>.md, with front matter that parses and has the
entry fields (PUB-D-08). Editing an existing entry does not count.

Usage (repo root):  python3 scripts/check_activity_entry.py <base-sha> [<head-sha>]
Exit 0 = at least one valid new entry; exit 1 = none, or a new entry is malformed.
Rollback: revert the pull request that added this file and its workflow.
"""
from __future__ import annotations

import re
import subprocess
import sys

import yaml

LOG_DIR = "Persona/Agent_Activity_Log/"
NAME_RE = re.compile(r"^\d{4}-\d{2}-\d{2}_\d{4}_[a-z0-9]+(?:-[a-z0-9]+)*_[a-z0-9]+(?:-[a-z0-9]+)*\.md$")
REQUIRED = ["Document Type", "doc_type", "Status", "agent_grounding", "Agent", "Timestamp", "Pull Request", "Decisions"]


def added_files(base: str, head: str) -> list[str]:
    out = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=A", f"{base}...{head}"],
        check=True, capture_output=True, text=True,
    ).stdout
    return [line for line in out.splitlines() if line]


def entry_problems(path: str, text: str) -> list[str]:
    problems: list[str] = []
    name = path[len(LOG_DIR):]
    if "/" in name or not NAME_RE.match(name):
        problems.append("name must be YYYY-MM-DD_HHMM_<agent>_<topic>.md (lowercase words joined by hyphens)")
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n", text, re.S)
    if not m:
        return problems + ["no front matter block"]
    try:
        fm = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as e:
        return problems + [f"front matter does not parse: {e.__class__.__name__}"]
    if not isinstance(fm, dict):
        return problems + ["front matter is not a mapping"]
    missing = [k for k in REQUIRED if k not in fm or fm[k] in (None, "")]
    if missing:
        problems.append("missing fields: " + ", ".join(missing))
    if fm.get("agent_grounding") not in (False, "false"):
        problems.append("agent_grounding must be false")
    if not text[m.end():].strip():
        problems.append("no Action text below the front matter")
    return problems


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    base, head = argv[1], (argv[2] if len(argv) > 2 else "HEAD")
    new = [p for p in added_files(base, head) if p.startswith(LOG_DIR) and p.endswith(".md")]
    if not new:
        print(f"FAIL: this pull request adds no file in {LOG_DIR}.")
        print("Add one entry file in the same pull request as the change (PUB-D-08).")
        print("Format: Persona/Agent_Activity_Log.md § Entry format.")
        return 1
    bad = 0
    for p in new:
        text = subprocess.run(["git", "show", f"{head}:{p}"], check=True, capture_output=True, text=True).stdout
        problems = entry_problems(p, text)
        if problems:
            bad += 1
            print(f"FAIL: {p}: " + "; ".join(problems))
        else:
            print(f"OK: {p}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
