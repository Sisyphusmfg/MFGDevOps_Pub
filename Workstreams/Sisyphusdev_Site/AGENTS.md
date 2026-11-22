---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Agent Operating Instructions
Topic: Sisyphusdev_Site
Status: Active
agent_grounding: false
agent_maintenance: false
---

# Agent Operating Instructions — Sisyphusdev_Site

Follow root [`../../AGENTS.md`](../../AGENTS.md). Read [`INDEX.md`](INDEX.md) before searching file bodies.

## Domain rules

- **No private links on the webpage (PUB-D-03).** Every link in `site/public/` points to `MFGDevOps_Pub`, a `*.sisyphusdev.com` subdomain, or a public site. CI checks this. Run the check in [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) step 2 before you deploy.
- Add or change apps only in [`site/public/apps.json`](site/public/apps.json). Set an app to `Live` only when its public URL answers. Leave `href` empty until then.
- A deploy is a publication. Deploy only when Marc asks, and record the live `wrangler deploy` and `curl -I` output, with the date, in [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md).
- Never write a Cloudflare API token, account ID or other secret into any file. Wrangler keeps its login outside the repo.
- Keep the Worker name `sisyphusdev-home`, so rollbacks and deploy history stay on one Worker.
- Marc merges every pull request (PUB-D-04).
