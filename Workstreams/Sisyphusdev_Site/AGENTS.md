---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Agent Operating Instructions
Topic: Sisyphusdev_Site
Status: Active
agent_grounding: false
agent_maintenance: false
---

# Agent Operating Instructions — Sisyphusdev_Site

Follow root [`../../AGENTS.md`](../../AGENTS.md). Read [`INDEX.md`](INDEX.md) before searching file bodies.

## Domain rules

- **Links on the webpage stay in this repository (PUB-D-03).** Every link in the built site points to `MFGDevOps_Pub`, a sisyphusdev.com path or subdomain, or a public site. CI checks this on every pull request.
- **Merging to `main` publishes.** Cloudflare Workers Builds deploys on every push to `main` (SDEV-D-05). Say so in any pull request that touches `site/`, another domain's `app/`, root `wrangler.jsonc` or `scripts/build-site.sh`.
- This domain owns root [`../../wrangler.jsonc`](../../wrangler.jsonc) and [`../../scripts/build-site.sh`](../../scripts/build-site.sh). Keep the Worker name `mfgdevops-pub`, because it must match the Worker connected to Workers Builds.
- Add or change cards only in [`site/public/apps.json`](site/public/apps.json). Use `Live` only for an app whose files ship in the same deploy, or whose URL already answers.
- After a deploy, record live `curl -I` output and the date in [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md).
- Never write a Cloudflare API token, account ID or other secret into any file.
- Marc merges every pull request (PUB-D-04).
