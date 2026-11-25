---
title: Sisyphusdev_Site — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Sisyphusdev_Site

Human-in-the-loop rationale. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status | Superseded by |
|------|----------|-----------|--------|---------------|
| 2026-11-22 | SDEV-D-01 — sisyphusdev.com is the active place to use the apps Marc builds. It starts as a home page and app directory. | Marc bought the domain for this, and chose the landing page and directory option from a set of options. | adopted |  |
| 2026-11-22 | SDEV-D-08 — Each app is served on its own subdomain (from SDEV-D-01) | Split from SDEV-D-01 on 2026-11-24 so each row holds one decision (PUB-D-11). SDEV-D-04 serves each app at its own path on the one Worker instead. | superseded | SDEV-D-04 |
| 2026-11-22 | SDEV-D-02 — The site is a static-assets Cloudflare Worker, and the app list is one JSON file. | The domain is already on Cloudflare (Free plan). A Worker plus Access or Tunnel can later front private or self-hosted apps on the same domain. | adopted |  |
| 2026-11-22 | SDEV-D-03 — The site's code lives in MFGDevOps_Pub, under this domain. | Marc stated this in chat. The private repository stays 100% private (PUB-D-01). | adopted |  |
| 2026-11-22 | SDEV-D-04 — One Worker serves the home page and every app. Each domain keeps its own web files in `app/`, and `scripts/build-site.sh` assembles `dist/` at deploy. | Workers Builds connects one Worker to the repo. A small build step keeps each app in its own domain without a Worker per app. A subdomain can still point at the same Worker later. Adopted by Marc on 2026-11-24 ("04 looks like it's adopted"); live check that day: `https://sisyphusdev.com/posiwid/` serves the POSIWID form. | adopted |  |
| 2026-11-22 | SDEV-D-10 — Each app is served at its own path on sisyphusdev.com (e.g. `/posiwid/`) (from SDEV-D-04) | Split from SDEV-D-04 on 2026-11-24 so each row holds one decision (PUB-D-11). SDEV-D-09 gives each app its own subdomain instead. | superseded | SDEV-D-09 |
| 2026-11-22 | SDEV-D-05 — `wrangler.jsonc` lives at the repo root, with the Worker name `mfgdevops-pub`. | Marc connected Workers Builds to the repo, which created a Worker `mfgdevops-pub` that deploys from the root. The config has to sit where the build runs, and its name has to match the connected Worker. Replaces the earlier `sisyphusdev-home` name. | adopted |  |
| 2026-11-22 | SDEV-D-06 — The site logo is Marc's Sisyphus mark (a figure pushing a boulder up a slope). For now it is Marc's PNG, `Sisyphus_MFG_DevOps_Push.png`, kept in `site/public/` as `logo.png`, with smaller copies for headers and icons. An SVG redraw was made, then set aside. | Marc said "just use this file for now". One copy at the site root serves all apps. The SVG redraw is in git history (PR #3, first commit) if a vector version is wanted later. | adopted |  |
| 2026-11-22 | SDEV-D-07 — Add an empty `"previews": {}` block to `wrangler.jsonc`, so Cloudflare's preview builds on pull-request branches (`npx wrangler preview`) succeed and give each PR its own Preview URL. Also set `"preview_urls": true`, so previews get a public `workers.dev` address (Cloudflare marks it noindex). It takes effect from the first production deploy after merge. Previews never touch sisyphusdev.com. | Marc asked for it after every PR-branch build failed with "Your Wrangler configuration is missing a `previews` block". Chosen over turning preview builds off. | adopted |  |
| 2026-11-24 | SDEV-D-09 — Each app has its own subdomain of sisyphusdev.com | Marc, 2026-11-24: "Yes, go with sub domains." Subdomains let an app get its own backend, sign-in or host later without touching the others. | adopted |  |
| 2026-11-24 | SDEV-D-11 — POSIWID and Goal are one app, "System Design and Analysis", at `purpose.sisyphusdev.com`, with a menu to switch between "POSIWID" and "Goal" | Marc, 2026-11-24: "Put POSIWID and Goals under one sub domain called “Purpose”. With a menu to switch between the different apps “Goal” and “POSIWID” they are one app called “System Design and Analysis”". One subdomain keeps both tools on one browser origin, so the POSIWID form's "Start a goal" handoff through local storage keeps working. The tools stay at `/posiwid/` and `/goals/` on that subdomain; `/` opens POSIWID. | adopted |  |
| 2026-11-24 | SDEV-D-12 — The old app paths on sisyphusdev.com (`/posiwid/`, `/goals/`) redirect (301) to the app's subdomain, through a small Worker script; every other request is still a static file from `dist/` | Marc chose this option on 2026-11-24 ("Subdomains, paths redirect"). Existing links keep working. The script is `Workstreams/Sisyphusdev_Site/worker/index.mjs`, with tests in `worker/test/`. | adopted |  |
| 2026-11-25 | SDEV-D-13 — Scheduled blog posts go live through a daily cron trigger on the site Worker (11:15 UTC) that reads `blog/schedule.json` and, only when a scheduled date has arrived, POSTs a Workers Builds deploy hook stored as the Worker secret `BLOG_DEPLOY_HOOK` | Serves BLOG-D-05. The site is static, so a dated post needs a rebuild on its date. Deploy hooks are Cloudflare's documented way to start a build without a commit. Rebuilding only when due avoids a deploy every day. Kept in Cloudflare: no GitHub Actions secret or API token. The hook URL works without other credentials, so it lives only in the secret. | proposed |  |
