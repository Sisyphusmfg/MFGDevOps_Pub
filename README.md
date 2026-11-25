---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Root README / Router
Topic: MFGDevOps_Pub — public manufacturing engineering and AI work
Status: Active
doc_type: readme-index
agent_grounding: true
agent_maintenance: true
---

# MFGDevOps_Pub — Public Manufacturing DevOps Router

The public, machine-first workspace for Sisyphus Manufacturing: tools, methods and sites for manufacturing, shared openly. It uses the four-file model (INDEX · DECISIONS · AGENTS · README).

- **Primary (write here):** GitHub [`Sisyphusmfg/MFGDevOps_Pub`](https://github.com/Sisyphusmfg/MFGDevOps_Pub), branch `main` (PUB-D-01).
- **Public by design:** everything in this tree can be read by anyone. Nothing here links to private repositories (PUB-D-03).
- **Live site:** [sisyphusdev.com](https://sisyphusdev.com) is built from the repo by Cloudflare Workers Builds on every push to `main`. Routing and deploy: [`Workstreams/Sisyphusdev_Site/`](Workstreams/Sisyphusdev_Site/INDEX.md).

**Agents:** read [`AGENTS.md`](AGENTS.md) first, then route **root README → domain INDEX → document** (two hops max). Before you act, read the newest entries: the last files in `Persona/Agent_Activity_Log/` (format and older entries in [`Persona/Agent_Activity_Log.md`](Persona/Agent_Activity_Log.md), reached through [`Persona/INDEX.md`](Persona/INDEX.md)). Add one entry file in the same pull request as your change. Every pull request states its rollback path before merge (PUB-D-04).

## Subfolder index

| Domain | Purpose | INDEX |
|--------|---------|-------|
| `Persona/` | The methods agents follow (POSIWID, goal agent), metadata standard, repo-wide decisions, shared agent activity log | [`Persona/INDEX.md`](Persona/INDEX.md) |
| `Reference/` | Public method references. Empty until the first reference is published | [`Reference/INDEX.md`](Reference/INDEX.md) |
| `Workstreams/Sisyphusdev_Site/` | sisyphusdev.com: home page and app directory, deploy procedure, live status. Owns root `wrangler.jsonc` and `scripts/build-site.sh` | [`Workstreams/Sisyphusdev_Site/INDEX.md`](Workstreams/Sisyphusdev_Site/INDEX.md) |
| `Workstreams/POSIWID_Analysis/` | POSIWID work: agent layer routing, facilitation template, analysis register, and the guided form at purpose.sisyphusdev.com/posiwid | [`Workstreams/POSIWID_Analysis/INDEX.md`](Workstreams/POSIWID_Analysis/INDEX.md) |
| `Workstreams/Goal_Agent/` | How AI manages goals: method, goal-agent and skills, templates, engagement register, and the goal form at purpose.sisyphusdev.com/goals | [`Workstreams/Goal_Agent/INDEX.md`](Workstreams/Goal_Agent/INDEX.md) |
| `.agents/` (`.claude/`, `.cursor/` point to it) | AI agent layer: `goal-agent` and five goal skills; `posiwid-facilitator`, `posiwid-analyst` and two POSIWID skills | [`Workstreams/Goal_Agent/INDEX.md`](Workstreams/Goal_Agent/INDEX.md) |
| `wrangler.jsonc` · `scripts/` | Cloudflare Worker config and the build that assembles the site. Merging to `main` deploys (SDEV-D-05) | [`Workstreams/Sisyphusdev_Site/INDEX.md`](Workstreams/Sisyphusdev_Site/INDEX.md) |
| `.github/workflows/` | CI: the check that blocks links to private repositories (PUB-D-03) | [`public-link-check.yml`](.github/workflows/public-link-check.yml) |
| `Inbox/` | Unsorted drops waiting to be filed (not grounding) | [`Inbox/README.md`](Inbox/README.md) |
| `Archive/` | Superseded and legacy material (not grounding) | [`Archive/README.md`](Archive/README.md) |

## Rules of the road

- Every domain folder has INDEX / DECISIONS / AGENTS / README. Operated workstreams also keep a `*_Status.md`.
- New domain: copy an existing domain's four files, then add a row here and in [`AGENTS.md`](AGENTS.md).
- Projects move here as **accessible public versions** of private work (PUB-D-02). Each one becomes its own domain under `Workstreams/`. When it has a usable app, it also gets a card on sisyphusdev.com.
- Secrets (passwords, passphrases, tokens, keys, account or ID numbers) are **never** stored in this tree.
- License: [`LICENSE`](LICENSE).
