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

P2: schema, `can_access` and row-level security as an up/down migration on a Neon branch of `sisyphusdev-apps`, plus the low-privilege app role and the isolation tests.

## Done

- 2026-11-25 — SDEV-D-20: Marc chose email notification (D6 a). His address stays out of the repo (Worker secret `APPROVER_EMAIL`)
- 2026-11-25 — SDEV-D-19 (Marc approves every account). Neon Auth sign-up closed (`disable_sign_up: true`), Google provider removed, 0 users (Neon API and SQL output). Design gains O8, the `access_request` and `platform_admin` tables, and D6
- 2026-11-25 — P1: Neon project `sisyphusdev-apps` (`little-silence-14430370`, aws-us-east-1, branch `br-cool-mud-bbp8240c`), Neon Auth enabled, trusted origin purpose.sisyphusdev.com, app name set. Neon's default sign-in methods (password, shared Google, Organization plugin) are still on, to be narrowed in P3
- 2026-11-25 — Marc decided D1 (own tables), D2 (email code), D3 (admins see all teams), D5 (new Neon project, Hyperdrive): SDEV-D-15 to SDEV-D-18
- 2026-11-25 — POSIWID design, this file, SDEV-D-14 (proposed) and SDEV-OI-06 (https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/18)

## Blocked on

- D4 (organization-wide space) is open; the first version builds without one.
- Email Routing setup for SDEV-D-20 (SDEV-OI-07): the agent's Cloudflare API call was blocked by the session safety check; Marc does it in the dashboard.
- Package installs are refused in the claude.ai cloud session (shell network is off). P3 and P4 need `@neondatabase/auth` and a JWT library such as `jose`. Workers Builds installs them at deploy, but local tests in that session can't. Run those phases on the Surface or in a session with installs allowed.

## Next step

P2 on a Neon branch (not `main`). Then Marc creates the Hyperdrive config for the app role (`npx wrangler hyperdrive create sisyphusdev-apps --connection-string="<app role connection string>"`, run on the Surface so the string never enters a file or chat).

## To do later (from P1)

- P3: check that the Admin plugin can create a user who signs in by email code, and that code sign-in works while sign-up is closed (design § Account approval). Then turn off password sign-in and the Organization plugin (SDEV-D-15, -16). Google is already removed.
- P3: bootstrap Marc as the first user and platform admin. Needs his sign-in email, given by him at that step and never written to the repository.
- P3: trust the workers.dev preview origin, or test previews against a Neon branch with its own Auth URL.
- P6: turn off localhost origins; own mail server.

## Dead ends

- Managed Neon Auth's Organization plugin has no teams (Beta, checked 2026-11-25 against the Neon Auth skill's plugin table). That is why D1 recommends our own organization and team tables.

## Outcome

