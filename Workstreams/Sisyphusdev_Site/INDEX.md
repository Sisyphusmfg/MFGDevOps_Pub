---
title: Sisyphusdev_Site — Domain Index
doc_type: readme-index
domain: sisyphusdev-site
Contributed By: Marc Dugas
Last Updated: 2026-11-26
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
| Last Updated | 2026-11-26 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How the site builds and deploys, preview, add an app, roll back | [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) *(Draft; first deploy pending)* | 1 |
| Whether the site is live, what's deployed, build failures, open items | [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) | 1 |
| Which apps the directory lists, and their status | [`site/public/apps.json`](site/public/apps.json) | 1 |
| The site logo and icons, and which file to use where | [`site/public/logo.png`](site/public/logo.png) (master) · [`site/public/logo-small.png`](site/public/logo-small.png) · [`site/public/favicon.png`](site/public/favicon.png) · [`site/public/apple-touch-icon.png`](site/public/apple-touch-icon.png) | 1 |
| Which folder is served at which path | [`../../scripts/build-site.sh`](../../scripts/build-site.sh) | 1 |
| Worker name, custom domains, build command | [`../../wrangler.jsonc`](../../wrangler.jsonc) | 1 |
| The privacy notice | [`site/public/privacy/index.html`](site/public/privacy/index.html) | 1 |
| Sign-in, organizations and teams, and saved work for purpose.sisyphusdev.com: what it must do and the build plan | [`POSIWID_Design_Purpose_Accounts.md`](POSIWID_Design_Purpose_Accounts.md) | 1 |
| The purpose database schema, access rule and row-level security | [`db/migrations/0001_spaces.up.sql`](db/migrations/0001_spaces.up.sql) | 1 |
| Proving one space can't see another's data | [`db/test/isolation.sql`](db/test/isolation.sql) | 1 |
| Why one Worker, why paths, why the config is at the root, where the logo lives | [`DECISIONS.md`](DECISIONS.md) SDEV-D-01 to SDEV-D-07 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-24 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-25 | — | Domain agent instructions |
| [`POSIWID_Design_Purpose_Accounts.md`](POSIWID_Design_Purpose_Accounts.md) | 2026-11-25 | 1 | Draft POSIWID design: optional sign-in (Neon Auth), personal and team spaces, Neon Postgres with row-level security, Worker `/api/*`, account approval by Marc (SDEV-D-19), decisions D1–D6 (all but D4 decided), phases P0–P6, measurable change |
| [`db/migrations/0001_spaces.up.sql`](db/migrations/0001_spaces.up.sql) | 2026-11-25 | 1 | Migration up: role `app_api`, schema `app` (organizations, members, teams, spaces, records, access requests, platform admins, audit), `can_access`, guard triggers, row-level security, least grants |
| [`db/migrations/0001_spaces.down.sql`](db/migrations/0001_spaces.down.sql) | 2026-11-25 | — | Migration down: drops schema `app` and role `app_api` (deletes data) |
| [`db/test/isolation.sql`](db/test/isolation.sql) | 2026-11-25 | 1 | Isolation tests T1–T10: personal, team, admin and anonymous access; role and last-owner guards; access requests |
| [`db/run.sh`](db/run.sh) | 2026-11-25 | — | Runs up, down or test with psql against a branch (`DATABASE_URL` from the shell) |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-25 | — | HITL *(not for grounding)*. SDEV-D-01 to -03 site basics; SDEV-D-04 one Worker and build step; SDEV-D-05 root config, Worker `mfgdevops-pub`; SDEV-D-06 logo in `site/public/`, PNG for now; SDEV-D-07 PR preview builds; SDEV-D-09 each app its own subdomain; SDEV-D-11 POSIWID and Goal as System Design and Analysis at `purpose.sisyphusdev.com`; SDEV-D-12 old paths redirect; SDEV-D-13 daily check publishes scheduled blog posts through a deploy hook; SDEV-D-14 sign-in and saved work for purpose (proposed); SDEV-D-15 to -18 own org/team tables, email code, admins see all teams, new Neon project with Hyperdrive; SDEV-D-19 Marc approves every account; SDEV-D-20 request emails to Marc |
| [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) | 2026-11-26 | 1 | Live state: home page, System Design and Analysis at `purpose.sisyphusdev.com` (POSIWID, POSIWID Design, Goal) and the blog at `blog.sisyphusdev.com`. Checked 2026-11-26: direct curl of HTML was a Cloudflare challenge; served HTML includes the Web Analytics beacon and Google Fonts. Privacy notice not deployed yet. Open items SDEV-OI-01 to -07 |
| [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) | 2026-11-26 | 1 | Procedure: how Workers Builds deploys, path and subdomain map, routing Worker, privacy notice at `/privacy` on every host, preview, link check, verify, add an app, roll back. Draft |
| [`../../wrangler.jsonc`](../../wrangler.jsonc) | 2026-11-25 | 1 | Worker config at repo root (owned here): name `mfgdevops-pub`, script `Workstreams/Sisyphusdev_Site/worker/index.mjs`, build `bash scripts/build-site.sh`, assets `./dist` (binding `ASSETS`, Worker runs first), custom domains `sisyphusdev.com`, `www.sisyphusdev.com`, `purpose.sisyphusdev.com`, `blog.sisyphusdev.com`, daily cron 11:15 UTC (SDEV-D-13), previews |
| [`../../scripts/build-site.sh`](../../scripts/build-site.sh) | 2026-11-24 | 1 | Build script (owned here): copies `site/public/` to `dist/` and each listed app folder to `dist/<path>/` (`/posiwid`, `/design`, `/goals`); then runs `scripts/build-blog.mjs` for `/blog` (BLOG-D-02) |
| [`site/public/index.html`](site/public/index.html) | 2026-11-26 | 1 | Home page and app directory with status filters. Reads `apps.json`. Header uses `/logo-small.png`. Footer links to `/privacy` |
| [`site/public/privacy/index.html`](site/public/privacy/index.html) | 2026-11-26 | 1 | Privacy notice, served at `/privacy` on every host. Readable without JavaScript. Effective 2026-11-26 |
| [`site/public/logo.png`](site/public/logo.png) | 2026-11-22 | 1 | Master logo: Marc's `Sisyphus_MFG_DevOps_Push.png` (657×576, off-white background), same pixels, recompressed losslessly. Served at `/logo.png`. All other logo files are made from it |
| [`site/public/logo-small.png`](site/public/logo-small.png) | 2026-11-22 | 1 | 120×105 copy for page headers (shown at 40 px, sharp on high-density screens). About 16 KB instead of 379 KB |
| [`site/public/favicon.png`](site/public/favicon.png) | 2026-11-22 | 1 | 48×48 square copy for the browser tab |
| [`site/public/apple-touch-icon.png`](site/public/apple-touch-icon.png) | 2026-11-22 | 1 | 180×180 square copy for phone home screens |
| [`site/public/apps.json`](site/public/apps.json) | 2026-11-24 | 1 | App list: 2 Live (System Design and Analysis at `purpose.sisyphusdev.com`, MFGDevOps_Pub), 1 Building (Blog at `blog.sisyphusdev.com`), 2 Planned (IOED, AI Lab) |
| [`site/public/404.html`](site/public/404.html) | 2026-11-26 | — | Not-found page, with the logo and a footer link to `/privacy` |
| [`worker/index.mjs`](worker/index.mjs) | 2026-11-26 | 1 | Routing Worker (SDEV-D-12): sends each app path on sisyphusdev.com to its subdomain (`/posiwid/`, `/design/`, `/goals/` → `purpose`; `/blog/` → `blog`) and opens `/` on each subdomain at its first page. Maps `/privacy` and `/privacy/` to `/privacy/index.html` with status 200. Serves everything else from `dist/`. Its daily `scheduled` handler POSTs the `BLOG_DEPLOY_HOOK` secret when `blog/schedule.json` shows a post is due (SDEV-D-13) |
| [`worker/test/route.test.mjs`](worker/test/route.test.mjs) | 2026-11-26 | — | Tests for the routing Worker, including `/privacy` on every host. Run `node --test Workstreams/Sisyphusdev_Site/worker/test/route.test.mjs` |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Blog | [`../Blog/INDEX.md`](../Blog/INDEX.md) |
| Root | [`../../README.md`](../../README.md) |
| POSIWID_Analysis | [`../POSIWID_Analysis/INDEX.md`](../POSIWID_Analysis/INDEX.md) |
| Persona | [`../../Persona/INDEX.md`](../../Persona/INDEX.md) |
