# Agent Operating Instructions — Root

These are behavioral instructions for agents working in `MFGDevOps_Pub`. This file is not a knowledge source.

## Where to write

| Location | Role | Agents may |
|----------|------|-----------|
| GitHub `Sisyphusmfg/MFGDevOps_Pub`, branch `main` | **Primary.** The only write path | Read and write through branches and pull requests. Marc merges |

- Commit messages are one line saying what changed and why. Reference decision IDs (e.g. `PUB-D-03`). Pull before you start (`git pull --rebase`). Never force-push `main`.
- Marc merges every pull request (PUB-D-04).
- **`main` is protected** by the GitHub ruleset "Protect main" (PUB-D-07): no deletion, no force push, changes only through a pull request, and the `check` status (public-link check) must pass. A direct push to `main` is refused. Work on a branch and open a pull request.

## Public-only rule (PUB-D-03)

This repository and sisyphusdev.com are public. Marc's private MFGDevOps repository is separate.

- Never link to a private repository, from any file in this tree or from the website.
- Never copy private content here as-is. A project comes here as an **accessible public version**: rewritten for a public reader, with internal names, people, suppliers, part numbers and business figures removed (PUB-D-02).
- CI enforces the link rule. [`.github/workflows/public-link-check.yml`](.github/workflows/public-link-check.yml) fails any pull request that adds a GitHub link to a `Sisyphusmfg` repository other than `MFGDevOps_Pub`. Don't weaken or bypass it.
- If you are unsure whether something is public, leave it out and ask Marc.

## Four-file domain model

| File | Answering agent may ground? |
|------|----------------------------|
| `INDEX.md` | **Yes. Canonical routing** |
| `DECISIONS.md` | **No. HITL / maintenance only** |
| `AGENTS.md` | Instructions only |
| `README.md` | Human onboarding. Defer routing to INDEX |
| `*_Status.md` | Yes. Live state of a workstream |

`AGENTS.md`, `INDEX.md`, `DECISIONS.md` and `README.md` are always `Status: Active`. Content maturity lives in the documents they route to.

Every `DECISIONS.md` keeps its decisions in one table: `| Date | Decision | Rationale | Status | Superseded by |`. The Decision cell starts with an ID (`<PREFIX>-D-NN — title`). Status is one of `proposed`, `adopted`, `superseded`, `rejected`. `Superseded by` holds the replacing decision ID and is filled only when Status is `superseded`. Each row holds exactly one decision: when a later decision replaces part of an earlier one, split the earlier row first so the replaced part has its own row marked `superseded`. Open-work and unresolved-question tables are not decision tables (PUB-D-10, PUB-D-11).

## Routing order

1. Root [`README.md`](README.md): find the domain.
2. Domain `INDEX.md`: match the question to a document before searching file bodies.
3. Two hops at most.

## Using this repo from other agents

| Host | What it reads |
|------|----------------|
| Claude Code | Root `CLAUDE.md`, which imports root `AGENTS.md` |
| Gemini CLI | Root `GEMINI.md`, which imports root `AGENTS.md` |
| Cursor, Antigravity, others | Root `AGENTS.md` |

Skills and agents: `.agents/` is canonical (`.agents/skills/<name>/SKILL.md`, `.agents/agents/<name>.md`). `.claude/` and `.cursor/` hold short pointers to those files, never copies. Edit only `.agents/`.

| Agent or skill | Use for |
|----------------|---------|
| `goal-agent` | Running a goal: propose, charter, plan, check in, review, close |
| `goal-execution` · `goal-plan` · `goal-checkin` · `goal-review` · `goal-close` | Each step of a goal. Route: [`Workstreams/Goal_Agent/INDEX.md`](Workstreams/Goal_Agent/INDEX.md) |
| `posiwid-facilitator` | Interactive POSIWID facilitation: problems to de-facto definition, expectations and gaps |
| `posiwid-analyst` | POSIWID designs, diagnostics, promotion of drafts, simulations |
| `posiwid-analysis` · `posiwid-measurement-simulator` | POSIWID modes, and predicting the result of a change. Route: [`Workstreams/POSIWID_Analysis/INDEX.md`](Workstreams/POSIWID_Analysis/INDEX.md) |
| `machine-first-scaffold` | Scaffolding a new domain, following [`Persona/Machine_First_Method.md`](Persona/Machine_First_Method.md) (PUB-D-12). Route: [`Persona/INDEX.md`](Persona/INDEX.md) |

Methods agents follow live in Persona (PUB-D-05): [`Persona/Machine_First_Method.md`](Persona/Machine_First_Method.md), [`Persona/POSIWID_Method_Reference.md`](Persona/POSIWID_Method_Reference.md), [`Persona/POSIWID_Diagnostic_Grounding.md`](Persona/POSIWID_Diagnostic_Grounding.md) and [`Persona/POSIWID_Design_Goal_Agent.md`](Persona/POSIWID_Design_Goal_Agent.md). If a skill and its Persona method disagree, the Persona method wins.

## Agent activity log

Each entry is its own file in `Persona/Agent_Activity_Log/`, named `YYYY-MM-DD_HHMM_<agent>_<topic>.md` in America/New_York time (PUB-D-08). Before you start, read the newest 20 entries: the last 20 files by name in that folder (if it has fewer than 20, read the tail of [`Persona/Agent_Activity_Log.md`](Persona/Agent_Activity_Log.md), which keeps older entries and the entry format, PUB-D-09). After acting, add one entry file in the same pull request as the change it describes. Do not edit an entry after it merges; a correction is a new entry file. Do not register entry files in an INDEX. The log is `agent_grounding: false`.

## Problem-solving format (POSIWID)

Describe systems as:

1. What is the system doing?
2. What is it expected to do?
3. What are the gaps?
4. What changes would close the gaps?
5. What is the measurable change? State it with a baseline, a current value and a target, and say how to check it.

Design artifacts use `doc_type: posiwid-design`. Diagnostics use `doc_type: forensic-analysis`.

## Reversibility (PUB-D-04)

1. Every pull request states its rollback path before merge: how to undo the change and what the undo restores. For most pull requests the path is `revert this PR`.
2. Prefer reversible designs: additive changes, and parallel paths over in-place replacement.
3. Some changes can't be undone: data deletion, a history rewrite, a publication, or a rename that breaks external links. Flag each one `IRREVERSIBLE` in the pull request description, with the reason and the risk. Marc must approve it explicitly. Agents never merge it.
4. After merge, observe what the change actually does, and roll back if it diverges from intent. A deploy to sisyphusdev.com is a publication: record it in the site's status file.

## Domains

| Domain | INDEX |
|--------|-------|
| Persona | [`Persona/INDEX.md`](Persona/INDEX.md) |
| Reference | [`Reference/INDEX.md`](Reference/INDEX.md) |
| Sisyphusdev_Site | [`Workstreams/Sisyphusdev_Site/INDEX.md`](Workstreams/Sisyphusdev_Site/INDEX.md) |
| POSIWID_Analysis | [`Workstreams/POSIWID_Analysis/INDEX.md`](Workstreams/POSIWID_Analysis/INDEX.md) |
| Goal_Agent | [`Workstreams/Goal_Agent/INDEX.md`](Workstreams/Goal_Agent/INDEX.md) |
| Blog | [`Workstreams/Blog/INDEX.md`](Workstreams/Blog/INDEX.md) |

## Hard rules

- Never write passwords, passphrases, API keys or tokens, SSNs, government ID numbers, or bank, card or account numbers into any file.
- Edit files in place in git. Git history replaces copying old versions to `Archive/`.
- When a file changes, update its row in the domain `INDEX.md` register (date, description).
- Every `.md` artifact needs front matter per [`Persona/Artifact_Metadata_Standard.md`](Persona/Artifact_Metadata_Standard.md). Non-markdown files get a register row in their domain INDEX.
- Each operated workstream keeps a `*_Status.md`. Update it at the end of every session, and record system state from live output, not from memory.
- `Inbox/` is a drop zone. File each item into a domain and register it in that domain's INDEX.
- `Archive/` is never grounding.
- Cite an artifact only when an INDEX row routes to it at `authority_rank: 1`. Do not cite `DECISIONS.md` or `Archive/`.
- Run scripts as `bash script.sh`.

Live write paths: `Persona/`, `Reference/`, `Workstreams/Sisyphusdev_Site/`, `Workstreams/POSIWID_Analysis/`, `Workstreams/Goal_Agent/`, `Workstreams/Blog/`, `.agents/`, `.claude/`, `.cursor/`, `scripts/`, root `wrangler.jsonc`, `.github/`, root `README.md`, root `AGENTS.md`.

**Merging to `main` deploys sisyphusdev.com** (Cloudflare Workers Builds, SDEV-D-05). A pull request that changes what the site serves says so in its description.
