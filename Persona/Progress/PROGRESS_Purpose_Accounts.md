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

P1: create the new Neon project and enable Neon Auth. Waiting on Marc's go-ahead to create the resource and his choice of project name.

## Done

- 2026-11-25 — Marc decided D1 (own tables), D2 (email code), D3 (admins see all teams), D5 (new Neon project, Hyperdrive): SDEV-D-15 to SDEV-D-18
- 2026-11-25 — POSIWID design, this file, SDEV-D-14 (proposed) and SDEV-OI-06 (https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/18)

## Blocked on

- D4 (organization-wide space) is open; the first version builds without one.
- P1 resource creation needs Marc's go-ahead.
- Package installs are refused in the claude.ai cloud session (shell network is off). P3 and P4 need `@neondatabase/auth` and a JWT library such as `jose`. Workers Builds installs them at deploy, but local tests in that session can't. Run those phases on the Surface or in a session with installs allowed.

## Next step

P1: create the Neon project (AWS us-east), enable Neon Auth with email OTP, add trusted domains `https://purpose.sisyphusdev.com` and the workers.dev preview origin, and create a Hyperdrive config. Record the outputs in the site status file, without connection strings.

## Dead ends

- Managed Neon Auth's Organization plugin has no teams (Beta, checked 2026-11-25 against the Neon Auth skill's plugin table). That is why D1 recommends our own organization and team tables.

## Outcome

