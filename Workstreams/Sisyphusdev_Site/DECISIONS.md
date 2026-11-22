---
title: Sisyphusdev_Site — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Sisyphusdev_Site

Human-in-the-loop rationale. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-11-22 | SDEV-D-01: sisyphusdev.com is the active place to use the apps Marc builds. It starts as a home page and app directory, with each app on its own subdomain. | Marc bought the domain for this, and chose the landing page and directory option from a set of options. Path vs subdomain is refined by SDEV-D-04. | active |
| 2026-11-22 | SDEV-D-02: The site is a static-assets Cloudflare Worker, and the app list is one JSON file. | The domain is already on Cloudflare (Free plan). A Worker plus Access or Tunnel can later front private or self-hosted apps on the same domain. | active |
| 2026-11-22 | SDEV-D-03: The site's code lives in MFGDevOps_Pub, under this domain. | Marc stated this in chat. The private repository stays 100% private (PUB-D-01). | active |
| 2026-11-22 | SDEV-D-04: One Worker serves the home page and every app, each at its own path (e.g. `/posiwid/`). Each domain keeps its own web files in `app/`, and `scripts/build-site.sh` assembles `dist/` at deploy. | Workers Builds connects one Worker to the repo. A small build step keeps each app in its own domain without a Worker per app. A subdomain can still point at the same Worker later. | proposed |
| 2026-11-22 | SDEV-D-05: `wrangler.jsonc` lives at the repo root, with the Worker name `mfgdevops-pub`. | Marc connected Workers Builds to the repo, which created a Worker `mfgdevops-pub` that deploys from the root. The config has to sit where the build runs, and its name has to match the connected Worker. Replaces the earlier `sisyphusdev-home` name. | active |
