---
title: Sisyphusdev_Site — Domain Index
doc_type: readme-index
domain: sisyphusdev-site
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# Sisyphusdev_Site — Domain Index

sisyphusdev.com is the active place to use the apps Marc builds. This domain holds the site's source, the deploy procedure and its live status. The site is a static Cloudflare Worker serving a home page and an app directory.

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-22 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How to preview, deploy, add an app, or roll back the site | [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) *(Draft; not yet run)* | 1 |
| Whether the site is live, what's deployed, and open items | [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) | 1 |
| Which apps the directory lists, and their status | [`site/public/apps.json`](site/public/apps.json) | 1 |
| Why a Worker, why one card per app, and where the code lives | [`DECISIONS.md`](DECISIONS.md) SDEV-D-01 to SDEV-D-03 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-22 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-22 | — | HITL *(not for grounding)*. SDEV-D-01 home page and directory first; SDEV-D-02 static Cloudflare Worker; SDEV-D-03 code lives in MFGDevOps_Pub |
| [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) | 2026-11-22 | 1 | Live state: zone active on Cloudflare, no Worker deployed yet; open items SDEV-OI-01 to -03 |
| [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md) | 2026-11-22 | 1 | Procedure: preview, deploy, verify, add an app, roll back. Draft, not yet run |
| [`site/wrangler.jsonc`](site/wrangler.jsonc) | 2026-11-22 | 1 | Worker config: name `sisyphusdev-home`, static assets from `site/public/`, custom domains `sisyphusdev.com` and `www.sisyphusdev.com` |
| [`site/public/index.html`](site/public/index.html) | 2026-11-22 | 1 | Home page and app directory with status filters. Reads `apps.json` |
| [`site/public/apps.json`](site/public/apps.json) | 2026-11-22 | 1 | App list: 1 Live (MFGDevOps_Pub), 4 Planned (POSIWID, Goal Agent, IOED, AI Lab) |
| [`site/public/404.html`](site/public/404.html) | 2026-11-22 | — | Not-found page |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../../README.md`](../../README.md) |
| Persona | [`../../Persona/INDEX.md`](../../Persona/INDEX.md) |
