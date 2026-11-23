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
| 2026-11-22 | SDEV-D-06: The site logo is Marc's Sisyphus mark (a figure pushing a boulder up a slope). For now it is Marc's PNG, `Sisyphus_MFG_DevOps_Push.png`, kept in `site/public/` as `logo.png`, with smaller copies for headers and icons. An SVG redraw was made, then set aside. | Marc said "just use this file for now". One copy at the site root serves all apps. The SVG redraw is in git history (PR #3, first commit) if a vector version is wanted later. | active |
| 2026-11-22 | SDEV-D-07: Add an empty `"previews": {}` block to `wrangler.jsonc`, so Cloudflare's preview builds on pull-request branches (`npx wrangler preview`) succeed and give each PR its own Preview URL. Also set `"preview_urls": true`, so previews get a public `workers.dev` address (Cloudflare marks it noindex). It takes effect from the first production deploy after merge. Previews never touch sisyphusdev.com. | Marc asked for it after every PR-branch build failed with "Your Wrangler configuration is missing a `previews` block". Chosen over turning preview builds off. | active |
