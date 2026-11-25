---
title: "Progress: accounts and saved work for purpose.sisyphusdev.com"
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Progress File
doc_type: record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Progress: accounts and saved work for purpose.sisyphusdev.com

Design: [`../../Workstreams/Sisyphusdev_Site/POSIWID_Design_Purpose_Accounts.md`](../../Workstreams/Sisyphusdev_Site/POSIWID_Design_Purpose_Accounts.md) (phases P0–P6, decisions D1–D5).

## done_when

- An individual and an organization member can each sign in on purpose.sisyphusdev.com, save work to their personal or team space, and reopen it on another browser.
- The isolation test suite passes on every pull request with 0 cross-space reads, and it is a required check.
- The tools still work signed out.
- The privacy note and delete-my-data route are live.

## Current step

P0: Marc decides D1–D5 (design § 5).

## Done

- 2026-11-25 — POSIWID design, this file, SDEV-D-14 (proposed) and SDEV-OI-06 (https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/18)

## Blocked on

- D1–D5, Marc, since 2026-11-25.
- Package installs are refused in the claude.ai cloud session (shell network is off). P3 and P4 need `@neondatabase/auth` and a JWT library such as `jose`. Workers Builds installs them at deploy, but local tests in that session can't. Run those phases on the Surface or in a session with installs allowed.

## Next step

Record Marc's D1–D5 answers in `Workstreams/Sisyphusdev_Site/DECISIONS.md`. Then P1: create the Neon project and enable Neon Auth, with his approval for creating the resource.

## Dead ends

- Managed Neon Auth's Organization plugin has no teams (Beta, checked 2026-11-25 against the Neon Auth skill's plugin table). That is why D1 recommends our own organization and team tables.

## Outcome

