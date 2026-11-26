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

P2 done. Hyperdrive exists. Waiting on Marc's answer about turning Hyperdrive caching off. Then P3: the Worker API.

## Done

- 2026-11-25 20:18 — Marc set the `app_api_web` password (without displaying it) and created Hyperdrive `sisyphusdev-apps` (ID `e8716c8b72064bc19275b1b631e4c3f4`): user `app_api_web`, direct host `ep-long-flower-bbdjyj10.c-15.us-east-1.aws.neon.tech`, database `neondb` (Cloudflare API). Query caching is on by default; the agent asked Marc to turn it off, because cached reads could cross users under row-level security
- 2026-11-25 20:01 — Marc deleted the Console roles `app_api_login` and his Console-made `app_api_web`. The agent recreated `app_api_web` by SQL: member of `app_api` only, no bypassrls, no password; verified 0 rows visible and `neon_auth.user` denied. Neon docs: SQL roles need plain-text passwords (no hashed `\password`), set with `ALTER ROLE ... WITH PASSWORD`
- 2026-11-25 — Created `app_api_web` by SQL on `main`: login, no superuser, no bypassrls, no createrole or createdb, member of `app_api` only, connection limit 50, no password yet. As `app_api_web`: 0 records and 0 requests visible; reading `neon_auth.user` is denied
- 2026-11-25 — `0001_spaces.up.sql` applied to `main` (pull request #19 merged, Marc's go-ahead 19:31). 9 tables with row-level security, 21 policies, 5 triggers; `app_api` can't log in or bypass row-level security; 0 rows visible to an anonymous API session
- 2026-11-25 — P2 on Neon branch `p2-schema-test` (`br-silent-haze-bb5kmch1`). Ran up (75 statements), then isolation tests: all 10 checks pass. A deliberately broken `can_access` (returns true) failed T1 ("A sees 2 records") and was rolled back. Then down (schema and role gone), up, and tests: all passed, 0 leftover rows. `main` not migrated yet
- 2026-11-25 — Email Routing enabled on sisyphusdev.com (MX, SPF, DKIM added) and Marc's destination verified, on his instruction. Marc added the `APPROVER_EMAIL` Worker secret (18:58, listed by the Cloudflare API). Left for P5: the `send_email` binding
- 2026-11-25 — SDEV-D-20: Marc chose email notification (D6 a). His address stays out of the repo (Worker secret `APPROVER_EMAIL`)
- 2026-11-25 — SDEV-D-19 (Marc approves every account). Neon Auth sign-up closed (`disable_sign_up: true`), Google provider removed, 0 users (Neon API and SQL output). Design gains O8, the `access_request` and `platform_admin` tables, and D6
- 2026-11-25 — P1: Neon project `sisyphusdev-apps` (`little-silence-14430370`, aws-us-east-1, branch `br-cool-mud-bbp8240c`), Neon Auth enabled, trusted origin purpose.sisyphusdev.com, app name set. Neon's default sign-in methods (password, shared Google, Organization plugin) are still on, to be narrowed in P3
- 2026-11-25 — Marc decided D1 (own tables), D2 (email code), D3 (admins see all teams), D5 (new Neon project, Hyperdrive): SDEV-D-15 to SDEV-D-18
- 2026-11-25 — POSIWID design, this file, SDEV-D-14 (proposed) and SDEV-OI-06 (https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/18)

## Blocked on

- D4 (organization-wide space) is open; the first version builds without one.
- Package installs are refused in the claude.ai cloud session (shell network is off). P3 and P4 need `@neondatabase/auth` and a JWT library such as `jose`. Workers Builds installs them at deploy, but local tests in that session can't. Run those phases on the Surface or in a session with installs allowed.

## Next step

Turn off Hyperdrive caching (on Marc's word). Then P3: add the Hyperdrive binding to `wrangler.jsonc`; build the Worker `/api/*` (JWT check against the JWKS, `SET LOCAL app.user_id` per transaction); add the email-code sign-in test (design § Account approval). Delete branch `p2-schema-test` once Marc agrees.

## To do later (from P1)

- P3: check that the Admin plugin can create a user who signs in by email code, and that code sign-in works while sign-up is closed (design § Account approval). Then turn off password sign-in and the Organization plugin (SDEV-D-15, -16). Google is already removed.
- P3: bootstrap Marc as the first user and platform admin. Needs his sign-in email, given by him at that step and never written to the repository.
- P3: trust the workers.dev preview origin, or test previews against a Neon branch with its own Auth URL.
- P6: turn off localhost origins; own mail server.

## Dead ends

- A role created in the Neon Console (`app_api_login`, 2026-11-25) is a member of `neon_superuser`, with bypassrls, createrole and createdb, so it ignores row-level security. Don't use Console-created roles for the API. Use `app_api_web`, created by SQL. Marc to delete `app_api_login`.

- None in P2. Note: CI can't run the isolation tests yet, because GitHub has no database credentials. P6 adds a CI job against a per-run Neon branch.

- Managed Neon Auth's Organization plugin has no teams (Beta, checked 2026-11-25 against the Neon Auth skill's plugin table). That is why D1 recommends our own organization and team tables.

## Outcome

