---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Status Report
doc_type: record
Topic: Sisyphusdev_Site — live status
Status: Active
agent_grounding: true
agent_maintenance: true
authority_rank: 1
Source: Cloudflare API output, 2026-11-22
---

# Sisyphusdev_Site Status

| Field | Value |
|-------|-------|
| Scope | sisyphusdev.com home page, app directory, and the build that mounts each app |
| Overall status | Live (checked 2026-11-24 after PR #9): System Design and Analysis serves POSIWID and Goal at `purpose.sisyphusdev.com`, and the old paths on sisyphusdev.com redirect there. POSIWID Design is live at `/design/`, and the blog is live at `blog.sisyphusdev.com` with no posts yet |
| Next action | Confirm the redirect codes with `curl -sI https://sisyphusdev.com/posiwid/` and `curl -sI https://sisyphusdev.com/blog/` (expect `301`). Publish the first blog post (Blog domain, `Post_Template.md`) |

## POSIWID snapshot

| Question | Answer |
|----------|--------|
| What is it doing? | The DNS zone answers. Workers Builds runs on push to `main` but fails, so nothing is served |
| What is it expected to do? | Serve a home page with one card per app, plus each app at its path |
| Gap | `wrangler.jsonc` was in `Workstreams/Sisyphusdev_Site/site/`, but Workers Builds runs from the repo root, and the Worker name didn't match (`sisyphusdev-home` vs `mfgdevops-pub`) |
| Change | Root `wrangler.jsonc` named `mfgdevops-pub`, with a build step that assembles `dist/` (SDEV-D-04, SDEV-D-05) |
| Measurable change | Public apps reachable from the directory. Baseline 0 (2026-11-22). Current 0. Target 2 after this deploy (POSIWID Analysis and the MFGDevOps_Pub card). Check: `curl -sI https://sisyphusdev.com/posiwid/` returns `200`, and the Live count on the home page is 2 |

## Live state (from command output)

| Date | Check | Result |
|------|-------|--------|
| 2026-11-22 | Cloudflare API `GET /zones?name=sisyphusdev.com` | Zone `active`, Free plan, Cloudflare nameservers |
| 2026-11-22 | Cloudflare API `GET /accounts/{id}/workers/scripts` (16:58) | One Worker, `mfgdevops-pub`, created by Workers Builds. No static assets |
| 2026-11-22 | Workers Builds trigger for `mfgdevops-pub` | Repo `MFGDevOps_Pub`, branch `main`, root `/`, deploy command `npx wrangler deploy`, no build command |
| 2026-11-22 | Latest build (21:48 UTC) | `fail`. Wrangler: "Could not detect a directory containing static files" |
| 2026-11-22 | Cloudflare API `GET /accounts/{id}/workers/domains` | No custom domains attached |
| 2026-11-24 | Fetch `https://sisyphusdev.com/posiwid/` | Loads: title "POSIWID Analysis — sisyphusdev" |
| 2026-11-24 | Fetch `https://posiwid.sisyphusdev.com/` | Not reachable (no such subdomain yet) |
| 2026-11-24 | After PR #9 merged (22:0x): fetch `https://purpose.sisyphusdev.com/posiwid/` | Loads: title "POSIWID — System Design and Analysis — sisyphusdev", menu POSIWID · Goal · All apps |
| 2026-11-24 | Fetch `https://purpose.sisyphusdev.com/goals/` | Loads: title "Goal — System Design and Analysis — sisyphusdev" |
| 2026-11-24 | Fetch `https://sisyphusdev.com/posiwid/?check=2205` | Redirects to `https://purpose.sisyphusdev.com/posiwid/?check=2205`. The fetch tool reported status 302; the Worker code sends 301. Re-check with `curl -sI` |
| 2026-11-24 | After PR #11 merged: fetch `https://purpose.sisyphusdev.com/design/?check=2200` | Loads: title "POSIWID Design — System Design and Analysis — sisyphusdev", menu POSIWID · POSIWID Design · Goal · All apps |
| 2026-11-25 | After PR #12 merged: fetch `https://blog.sisyphusdev.com/?check=1025` and `/blog/?check=1025` | Both load: title "Blog — sisyphusdev", heading "Notes from the shop floor and the lab", "No posts yet. The first one is on its way." Workers Builds attached `blog.sisyphusdev.com` |

## Deploy log

| Date | Version | Command output summary | `curl -I` |
|------|---------|------------------------|-----------|
| 2026-11-22 | — | Workers Builds failed: no Wrangler config at repo root | — |

## Open items

| ID | Priority | Item | Detail |
|----|----------|------|--------|
| SDEV-OI-01 | High | First successful deploy | Fix in PR #2. Record output here |
| SDEV-OI-02 | Closed 2026-11-22 | Deploy from CI or by hand | Marc connected Workers Builds to the repo. CI deploy on push to `main` |
| SDEV-OI-04 | Medium | PR preview builds failing | Every pull-request branch build failed: `wrangler preview` needs a `previews` block. Fixed by SDEV-D-07 (PR #7). 2026-11-22: the PR #7 preview build passed (was failing on every PR branch), but its comment said "No Preview URL". `preview_urls: true` was added to PR #7, and applies from the first production deploy after merge. Check: the next PR's Cloudflare comment shows a `…workers.dev` Preview URL |
| SDEV-OI-03 | Low | Private apps behind Cloudflare Access | For work-in-progress apps. Not started |
| SDEV-OI-06 | Medium | Accounts and saved work for purpose (SDEV-D-14) | Opened 2026-11-25. Design drafted; Marc decided D1–D3 and D5 (SDEV-D-15 to -18). **P1 done 2026-11-25 18:45** (Neon API output): project `sisyphusdev-apps` (`little-silence-14430370`), AWS us-east-1, Postgres 17, default branch `main` (`br-cool-mud-bbp8240c`), database `neondb`. Neon Auth enabled (Better Auth), app name "System Design and Analysis", trusted origin `https://purpose.sisyphusdev.com`, localhost allowed. Auth URL `https://ep-long-flower-bbdjyj10.neonauth.c-15.us-east-1.aws.neon.tech/neondb/auth` (public). 18:50: sign-up closed for SDEV-D-19 (`disable_sign_up: true`, Google provider removed, `neon_auth.user` count 0). Still on: password sign-in for existing users (there are none) and the Organization plugin, both narrowed in P3. Hyperdrive waits for P2, which creates the low-privilege app role it connects as. Preview origins not trusted yet Progress: `Persona/Progress/PROGRESS_Purpose_Accounts.md` |
| SDEV-OI-07 | Medium | Email for access requests (SDEV-D-20) | Opened 2026-11-25. 18:53, on Marc's instruction ("Turn on email routing and change my dns"): Email Routing on sisyphusdev.com `enabled: true`, status `ready`. DNS now has MX `route1/2/3.mx.cloudflare.net`, SPF `v=spf1 include:_spf.mx.cloudflare.net ~all` and DKIM `cf2024-1._domainkey`. Marc's destination address is verified (Cloudflare API output). An earlier attempt at 18:50 was blocked by the session safety check. 18:58: Marc added Worker secret `APPROVER_EMAIL` (Cloudflare API lists it, type `secret_text`; value not read). Left: the `send_email` binding in P5 |
| SDEV-OI-05 | Medium | Scheduled blog posts need a deploy hook (SDEV-D-13) | Opened 2026-11-25. Marc: in Cloudflare, Workers & Pages → `mfgdevops-pub` → Settings → Builds → Deploy Hooks, create a hook for branch `main`, then add its URL as the Worker secret `BLOG_DEPLOY_HOOK` (Settings → Variables and Secrets, type Secret). Until then a due post is logged ("BLOG_DEPLOY_HOOK secret is not set") and waits for the next merge. Check: Worker logs show "blog schedule:" once a day; on a due date the build history shows a build triggered by the deploy hook |
