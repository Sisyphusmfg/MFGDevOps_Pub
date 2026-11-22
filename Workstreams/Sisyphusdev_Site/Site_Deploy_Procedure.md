---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Procedure
doc_type: procedure
Topic: Preview, deploy, add an app, and roll back sisyphusdev.com
Status: Draft
agent_grounding: false
agent_maintenance: true
authority_rank: 1
---

# Site Deploy Procedure — sisyphusdev.com

Draft. It hasn't been run yet. Once step 3 has been run once and its output is recorded in [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md), set `agent_grounding: true`.

All commands run from a clone of `MFGDevOps_Pub` on either Ubuntu machine. They need Node.js, so check that `node -v` prints v20 or newer.

## 1. Preview locally

```bash
cd Workstreams/Sisyphusdev_Site/site
npx wrangler dev
```

Open http://localhost:8787. You should see the home page with the app cards.

## 2. Check for private links (PUB-D-03)

From the repo root:

```bash
git grep -nIiP 'github\.com/Sisyphusmfg/(?!MFGDevOps_Pub\b)[A-Za-z0-9_.-]+' -- . && echo "STOP: private link found" || echo "OK: no private links"
```

Deploy only on `OK`.

## 3. Deploy

```bash
cd Workstreams/Sisyphusdev_Site/site
npx wrangler login      # first time only; opens a browser
npx wrangler deploy
```

Wrangler creates the Worker `sisyphusdev-home` and attaches `sisyphusdev.com` and `www.sisyphusdev.com`. Copy the `Current Version ID` line it prints.

## 4. Verify and record

```bash
curl -sI https://sisyphusdev.com | head -1
curl -s https://sisyphusdev.com/apps.json | python3 -m json.tool | head -5
```

Expected: `HTTP/2 200`, then the start of the app list. Add a row to the deploy log in [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) with the date, the version ID and the first `curl` line.

## Add or update an app

Edit [`site/public/apps.json`](site/public/apps.json):

```json
{
  "name": "Goal Agent",
  "host": "goals.sisyphusdev.com",
  "status": "Live",
  "desc": "One sentence on what it does.",
  "tags": ["AI agent", "Planning"],
  "href": "https://goals.sisyphusdev.com",
  "cta": "Open app"
}
```

- `status` is `Live`, `Building` or `Planned`. Use `Live` only when the URL answers.
- If `href` is empty, the card shows a disabled button.
- Update the `apps.json` row in [`INDEX.md`](INDEX.md), open a pull request, and after merge repeat steps 2–4.

## Roll back

```bash
cd Workstreams/Sisyphusdev_Site/site
npx wrangler deployments list
npx wrangler rollback <version-id>
```

That restores the previous version in seconds. Record the rollback in the status file. To take the site down completely, remove the custom domains in the Cloudflare dashboard (Workers & Pages › `sisyphusdev-home` › Settings › Domains & Routes).
