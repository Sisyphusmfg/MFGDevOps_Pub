---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
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
- **Live site:** [sisyphusdev.com](https://sisyphusdev.com) is built from [`Workstreams/Sisyphusdev_Site/`](Workstreams/Sisyphusdev_Site/INDEX.md).

**Agents:** read [`AGENTS.md`](AGENTS.md) first, then route **root README → domain INDEX → document** (two hops max). Before you act, read the newest entries in [`Persona/Agent_Activity_Log.md`](Persona/Agent_Activity_Log.md) (reached through [`Persona/INDEX.md`](Persona/INDEX.md)). Append one entry in the same pull request as your change. Every pull request states its rollback path before merge (PUB-D-04).

## Subfolder index

| Domain | Purpose | INDEX |
|--------|---------|-------|
| `Persona/` | Metadata standard, decisions that apply to the whole repo, and the shared agent activity log | [`Persona/INDEX.md`](Persona/INDEX.md) |
| `Reference/` | Public method references. Empty until the first reference is published | [`Reference/INDEX.md`](Reference/INDEX.md) |
| `Workstreams/Sisyphusdev_Site/` | Source, deploy procedure and live status for sisyphusdev.com, the home page and directory of Marc's apps | [`Workstreams/Sisyphusdev_Site/INDEX.md`](Workstreams/Sisyphusdev_Site/INDEX.md) |
| `.github/workflows/` | CI: the check that blocks links to private repositories (PUB-D-03) | [`public-link-check.yml`](.github/workflows/public-link-check.yml) |
| `Inbox/` | Unsorted drops waiting to be filed (not grounding) | [`Inbox/README.md`](Inbox/README.md) |
| `Archive/` | Superseded and legacy material (not grounding) | [`Archive/README.md`](Archive/README.md) |

## Rules of the road

- Every domain folder has INDEX / DECISIONS / AGENTS / README. Operated workstreams also keep a `*_Status.md`.
- New domain: copy an existing domain's four files, then add a row here and in [`AGENTS.md`](AGENTS.md).
- Projects move here as **accessible public versions** of private work (PUB-D-02). Each one becomes its own domain under `Workstreams/`. When it has a usable app, it also gets a card on sisyphusdev.com.
- Secrets (passwords, passphrases, tokens, keys, account or ID numbers) are **never** stored in this tree.
- License: [`LICENSE`](LICENSE).
