---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: POSIWID Design
Topic: "POSIWID design — sign-in and saved work for purpose.sisyphusdev.com (individuals, organizations, teams)"
Status: Draft
doc_type: posiwid-design
agent_grounding: false
agent_maintenance: true
authority_rank: 1
---

# POSIWID Design — Accounts and saved work for System Design and Analysis

Sign-in for `purpose.sisyphusdev.com` (POSIWID, POSIWID Design, Goal) that saves a person's input to a Neon Postgres database. An account is either an individual or an organization with teams. Saved work is split the same way: what a person saves belongs to their personal space or to one team, and nobody outside that space can read it. Method: [`../../Persona/POSIWID_Method_Reference.md`](../../Persona/POSIWID_Method_Reference.md).

Status: Draft. Marc decided D1, D2, D3 and D5 on 2026-11-25 (SDEV-D-15 to SDEV-D-18). D4 stays open.

## 0. What the system does today

- The three tools save input only in the visitor's own browser (`localStorage`). It does not follow the person to another device or browser, and it can't be shared.
- No sign-in, no server-side storage, no database behind the apps. The Worker only routes and serves static files (SDEV-D-12).

## 1. What it is expected to do

1. **Work without an account, as today.** Signing in is optional. A visitor who never signs in loses nothing.
2. **Sign in as an individual.** A person gets a personal space the moment they first sign in.
3. **Sign in as part of an organization.** An organization has owners, admins and members. It has one or more teams, and a member can belong to more than one team.
4. **Save and reopen work.** A signed-in person saves a POSIWID analysis, a POSIWID design or a goal into one space (personal or a team) and reopens it later on any device.
5. **Keep data split exactly as accounts are split.** Every saved record belongs to exactly one space. A person can read and write a record only if they own that personal space or are a current member of that team. Leaving a team removes access at once.
6. **Enforce the split in the database,** not only in app code, so a bug in one route can't leak another space's data.
7. **Keep secrets out of the repository** (PUB-D-03, PUB-D-15). Connection strings and keys live only in Cloudflare and Neon settings.
8. **Stay reversible** (PUB-D-04). Every schema change has a back path, and the apps keep working if the API is off.

## 2. Expected outputs

| # | Output (observable) | Required execution artifact |
|---|---------------------|-----------------------------|
| O1 | A **Sign in** control on each tool, using a one-time email code (D2). Signing out returns to local-only mode | Neon Auth enabled on the project, with `purpose.sisyphusdev.com` as a trusted domain; sign-in UI in the shared app menu |
| O2 | A **space picker** showing "Personal" plus each team the person belongs to, grouped by organization | API route `GET /api/spaces`; membership tables |
| O3 | **Save**, **Open** and **Delete** in each tool. They act on the space chosen in the picker, and show who saved what and when | API routes `/api/records`; the `record` table |
| O4 | **Organization admin page**: create an organization, add or remove members by email, set roles, create teams and assign members | API routes `/api/orgs/*`; an admin page at `purpose.sisyphusdev.com/account/` |
| O5 | **Bring local work in.** On first sign-in, offer to copy what is in this browser into the personal space | Client import step; uses the O3 routes |
| O6 | **Isolation tests** that try to read, list, change and delete another space's records and must fail. They run on every pull request | Test suite against a Neon branch; a CI job |
| O7 | **Privacy note**: what is stored, where, and how to delete an account and its data | Page on sisyphusdev.com; a delete-my-data route |

## 3. Controls

| Output | Measure | Gate | Feedback |
|--------|---------|------|----------|
| O1 | Sign-in, sign-out and session-after-reload work on purpose and on a preview URL | Manual check recorded in the status file before the first production deploy | Auth errors logged by the Worker |
| O2–O3 | Records saved in one space never appear in another | O6 suite passes; it is a required check before merge | Worker logs every denied request with the user id and space id, never with record contents |
| O4 | Only owners and admins change membership; an organization can't lose its last owner | API tests in O6 | Membership changes written to an `audit` table |
| O5 | The import copies, then asks before clearing local data | Manual check | — |
| All | Each schema migration has a tested down step and is tried on a Neon branch first | Migration pull request shows the up, down and up again output | Rollback = down migration plus revert of the pull request |
| All | No secret in git | `secret-scan` (PUB-D-15) | — |

## 4. Design

### Request path

```
browser (purpose.sisyphusdev.com)
  │ 1. sign in with Neon Auth (Managed Better Auth) → session
  │ 2. ask the auth client for a short-lived JWT (EdDSA, 15 minutes)
  ▼
Worker mfgdevops-pub, /api/*   (same origin, so no CORS)
  │ 3. verify the JWT against Neon Auth's JWKS; user id = the token's subject
  │ 4. open a transaction as a low-privilege role, SET LOCAL app.user_id = <id>
  ▼
Neon Postgres: row-level security on every app table checks app.user_id against membership
```

- The Worker reaches Neon through **Hyperdrive** (connection pooling from Cloudflare) or the **Neon serverless driver** over HTTP. The connection string is a Worker secret or the Hyperdrive config, never in `wrangler.jsonc`. D5 picks one.
- The Worker connects as a role that does **not** own the tables and has `BYPASSRLS` off. Row-level security therefore applies to every query the API runs.
- Managed Neon Auth JWTs carry no custom claims. Organization and team membership is looked up in the database for each request, and that lookup is exactly what the security policies use.

### Data model (one record, one space)

| Table | Holds | Key columns |
|-------|-------|-------------|
| `neon_auth.*` | Users and sessions (managed by Neon Auth) | user id |
| `organization` | An organization account | `id`, `name`, `created_by` |
| `org_member` | Who is in an organization, and their role | `org_id`, `user_id` (or `invited_email` until first sign-in), `role` ∈ owner, admin, member |
| `team` | A team inside one organization | `id`, `org_id`, `name` |
| `team_member` | Who is on a team | `team_id`, `user_id` |
| `space` | Where records live: one personal space per user, one space per team | `id`, `kind` ∈ personal, team, `user_id` (personal), `team_id` (team); exactly one of the two is set |
| `record` | A saved POSIWID analysis, design or goal | `id`, `space_id`, `app` ∈ posiwid, design, goal, `title`, `data` (JSONB, the same shape the app keeps in local storage today), `created_by`, `updated_by`, `updated_at`, `version` |
| `audit` | Membership and role changes | who, what, when |

The access rule, written once as a SQL function `can_access(space_id)`, is true when either:
- the space is personal and `space.user_id = app.user_id`, or
- the space is a team and `app.user_id` is in `team_member` for that team, and is still a member of the team's organization, or
- the space is a team and `app.user_id` is an owner or admin of that team's organization (D3: admins see every team's records).

Row-level security on `record` uses it for select, insert, update and delete. `space`, `team` and the membership tables get matching policies: you see your own memberships, and owners and admins see their organization's.

`version` gives optimistic locking. A save sends the version it opened. If someone on the team saved in between, the API returns a conflict instead of overwriting their work.

### What changes in the apps

- The shared menu gains the Sign in control and the space picker (O1, O2).
- Each tool keeps its local-storage save. When the person is signed in, Save also writes to the chosen space, and Open lists that space's records. The POSIWID → Goal handoff keeps working, because all tools stay on one origin (SDEV-D-11).
- If `/api` is unavailable, the tools fall back to local-only mode and say so. That is the feature flag and the rollback.

## 5. Decisions for Marc (before building)

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| D1 *(decided: A, SDEV-D-15)* | Where organizations and teams live | **A.** Neon Auth for sign-in only; organizations, teams and invitations in our own tables (above). **B.** Neon Auth's Organization plugin for organizations, members and emailed invitations, with teams in our own tables. The plugin is Beta and has no teams. **C.** Self-managed Better Auth inside the Worker, whose organization plugin has teams. We would then run the auth server ourselves | **A.** One model, all of it under row-level security, and nothing Beta in the security path. Cost: invitations are "add by email, active at first sign-in" with no invitation email until we add a mailer |
| D2 *(decided: email code only, SDEV-D-16)* | Sign-in methods | Email code (works on Neon's shared mail for testing) · Google · GitHub · email and password | Email code plus Google. Production needs our own mail server and our own Google OAuth app (Neon production checklist) |
| D3 *(decided: yes, SDEV-D-17)* | Can organization owners and admins read every team's records? | Yes (admin oversight) · No (team members only) | Your call. It changes the `can_access` rule |
| D4 | Is there an organization-wide space, besides teams? | Yes · No (organizations work only through teams) | No for the first version. Add later as a third space kind |
| D5 *(decided: new project, Hyperdrive, SDEV-D-18)* | Database home and connection | A new Neon project (e.g. `sisyphusdev-apps`, AWS us-east region; Neon Auth needs AWS and no IP allowlist) or a new database in an existing project · Hyperdrive or the serverless HTTP driver | New project, kept apart from `MFGDevOps_DB` (that one holds the repository index). Hyperdrive |

## 6. Build order

Each phase is one pull request (or more), with its own `done_when`. Progress is tracked in [`../../Persona/Progress/PROGRESS_Purpose_Accounts.md`](../../Persona/Progress/PROGRESS_Purpose_Accounts.md).

| Phase | Work | Who | done_when |
|-------|------|-----|-----------|
| P0 | Decide D1–D5 | Marc | Each D row is recorded in `DECISIONS.md` as adopted or rejected |
| P1 | Create the Neon project (or database). Enable Neon Auth. Add trusted domains `https://purpose.sisyphusdev.com` and the workers.dev preview origin | Marc approves resource creation; agent or Marc runs it | `neon neon-auth status` shows enabled; the domain list shows both origins |
| P2 | Schema, `can_access` and row-level security as a migration with up and down steps. The O6 isolation test suite runs against a Neon branch | Agent | Up, down, up all succeed on a branch. Isolation tests: user B reads 0 of user A's records; a removed team member reads 0 team records |
| P3 | Worker `/api/*`: JWT check against JWKS, spaces, records and orgs routes, low-privilege role. Secrets set in Cloudflare | Agent writes; Marc sets secrets | API tests pass; a request with no token or a bad token gets 401; another space's record gets 404 |
| P4 | App changes: Sign in, space picker, Save/Open/Delete, import from local, offline fallback | Agent | Save on one browser opens on another for the same user; signed out, everything works as before |
| P5 | Organization admin page | Agent | Owner creates an organization and a team, adds a member by email; that member sees the team space after first sign-in |
| P6 | Production readiness: own mail server and OAuth apps, privacy note, delete-my-data, O6 as a required check | Marc and agent | Neon production checklist items done; privacy page live |

Going live (P4 onward on `main`) is a publication. Storing other people's data is not something a revert fully undoes, because data already saved stays saved. Those pull requests are flagged `IRREVERSIBLE` for the data part and need Marc's explicit approval (PUB-D-04).

## 7. Measurable change

| Measure | Baseline (2026-11-25) | Target | How to check |
|---------|----------------------|--------|--------------|
| Work that follows a person to another device | 0. Local storage only | Any saved record opens on a second browser after sign-in | P4 check, recorded in the status file |
| Cross-space reads in the isolation suite | No suite (no server data) | 0 of all attempts, on every pull request | CI job from O6 |
| Tools usable without an account | 3 of 3 | 3 of 3 | Signed-out check on each tool after each app pull request |
| Secrets in git | 0 | 0 | `secret-scan` |

## 8. Known limits and risks

- Neon Auth's Organization plugin is Beta and has no teams. That is why D1 recommends our own tables.
- A sign-out does not cancel a JWT already issued. Tokens last 15 minutes.
- Personal data brings duties: a privacy note, deletion on request, and care with where the database region is. P6 covers the first two.
- This repository is public. The design and the schema are public by intent. Data, connection strings and keys never are.
