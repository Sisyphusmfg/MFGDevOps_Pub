---
title: Sisyphusdev_Site — Domain Index
doc_type: readme-index
domain: sisyphusdev-site
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# Sisyphusdev_Site — Domain Index

sisyphusdev.com is the active place to use the apps Marc builds. This domain holds the home page and app directory, the build and Worker config that publish every app, the deploy procedure, and the live status.

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-22 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How the site builds and deploys, preview, add an app, roll back | [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) *(Draft; first deploy pending)* | 1 |
| Whether the site is live, what's deployed, build failures, open items | [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) | 1 |
| Which apps the directory lists, and their status | [`site/public/apps.json`](site/public/apps.json) | 1 |
| The site logo and icons, and which file to use where | [`site/public/logo.png`](site/public/logo.png) (master) · [`site/public/logo-small.png`](site/public/logo-small.png) · [`site/public/favicon.png`](site/public/favicon.png) · [`site/public/apple-touch-icon.png`](site/public/apple-touch-icon.png) | 1 |
| Which folder is served at which path | [`../../scripts/build-site.sh`](../../scripts/build-site.sh) | 1 |
| Worker name, custom domains, build command | [`../../wrangler.jsonc`](../../wrangler.jsonc) | 1 |
| Why one Worker, why paths, why the config is at the root, where the logo lives | [`DECISIONS.md`](DECISIONS.md) SDEV-D-01 to SDEV-D-07 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-22 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-24 | — | HITL *(not for grounding)*. SDEV-D-01 to -03 site basics; SDEV-D-04 one Worker, apps at paths, build step (proposed); SDEV-D-05 root config, Worker `mfgdevops-pub`; SDEV-D-06 logo in `site/public/`, PNG for now; SDEV-D-07 PR preview builds |
| [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) | 2026-11-22 | 1 | Live state: first Workers Builds deploy failed (no root config); fix in PR #2. Open items SDEV-OI-01 to -03 |
| [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) | 2026-11-22 | 1 | Procedure: how Workers Builds deploys, path map, preview, private-link check, verify, add an app, roll back. Draft |
| [`../../wrangler.jsonc`](../../wrangler.jsonc) | 2026-11-22 | 1 | Worker config at repo root (owned here): name `mfgdevops-pub`, build `bash scripts/build-site.sh`, assets `./dist`, custom domains `sisyphusdev.com`, `www.sisyphusdev.com`, `previews` block and `preview_urls: true` for PR preview builds and links (SDEV-D-07) |
| [`../../scripts/build-site.sh`](../../scripts/build-site.sh) | 2026-11-22 | 1 | Build script (owned here): copies `site/public/` to `dist/` and each listed domain `app/` to `dist/<path>/` (`/posiwid`, `/goals`) |
| [`site/public/index.html`](site/public/index.html) | 2026-11-22 | 1 | Home page and app directory with status filters. Reads `apps.json`. Header uses `/logo-small.png` |
| [`site/public/logo.png`](site/public/logo.png) | 2026-11-22 | 1 | Master logo: Marc's `Sisyphus_MFG_DevOps_Push.png` (657×576, off-white background), same pixels, recompressed losslessly. Served at `/logo.png`. All other logo files are made from it |
| [`site/public/logo-small.png`](site/public/logo-small.png) | 2026-11-22 | 1 | 120×105 copy for page headers (shown at 40 px, sharp on high-density screens). About 16 KB instead of 379 KB |
| [`site/public/favicon.png`](site/public/favicon.png) | 2026-11-22 | 1 | 48×48 square copy for the browser tab |
| [`site/public/apple-touch-icon.png`](site/public/apple-touch-icon.png) | 2026-11-22 | 1 | 180×180 square copy for phone home screens |
| [`site/public/apps.json`](site/public/apps.json) | 2026-11-22 | 1 | App list: 3 Live (POSIWID Analysis at `/posiwid/`, MFGDevOps_Pub, Goal Agent at `/goals/`), 2 Planned (IOED, AI Lab) |
| [`site/public/404.html`](site/public/404.html) | 2026-11-22 | — | Not-found page, with the logo |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../../README.md`](../../README.md) |
| POSIWID_Analysis | [`../POSIWID_Analysis/INDEX.md`](../POSIWID_Analysis/INDEX.md) |
| Persona | [`../../Persona/INDEX.md`](../../Persona/INDEX.md) |
