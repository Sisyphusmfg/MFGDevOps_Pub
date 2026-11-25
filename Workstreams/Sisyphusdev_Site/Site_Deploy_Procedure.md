---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Procedure
doc_type: procedure
Topic: Build, preview, deploy, add an app, and roll back sisyphusdev.com
Status: Draft
agent_grounding: false
agent_maintenance: true
authority_rank: 1
---

# Site Deploy Procedure — sisyphusdev.com

Draft. Set `agent_grounding: true` after the first successful deploy is recorded in [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md).

## How it deploys (SDEV-D-04, SDEV-D-05)

Cloudflare Workers Builds watches `main` on `Sisyphusmfg/MFGDevOps_Pub`. On every push it runs `npx wrangler deploy` from the **repo root**. Wrangler reads [`../../wrangler.jsonc`](../../wrangler.jsonc) and runs its build command, `bash scripts/build-site.sh`. That script assembles `dist/` from each domain's web files, then Wrangler uploads `dist/` to the Worker `mfgdevops-pub`.

| Address | Path in `dist/` | Source folder |
|---------|-----------------|---------------|
| `sisyphusdev.com/` | `/` | `Workstreams/Sisyphusdev_Site/site/public/` |
| `purpose.sisyphusdev.com/posiwid/` (System Design and Analysis → POSIWID) | `/posiwid/` | `Workstreams/POSIWID_Analysis/app/` |
| `purpose.sisyphusdev.com/design/` (System Design and Analysis → POSIWID Design) | `/design/` | `Workstreams/POSIWID_Analysis/design-app/` |
| `purpose.sisyphusdev.com/goals/` (System Design and Analysis → Goal) | `/goals/` | `Workstreams/Goal_Agent/app/` |
| `blog.sisyphusdev.com/blog/` (Blog) | `/blog/` | Built from `Workstreams/Blog/posts/` by `scripts/build-blog.mjs` |

The Worker script [`worker/index.mjs`](worker/index.mjs) runs before the static files (SDEV-D-12). On `sisyphusdev.com` and `www.sisyphusdev.com` it redirects `/posiwid/`, `/design/` and `/goals/` (301) to `purpose.sisyphusdev.com`. On `purpose.sisyphusdev.com` it sends `/` to `/posiwid/`. Every other request, including previews on `workers.dev`, is a static file from `dist/`. To add an app on its own subdomain: add its folder to `scripts/build-site.sh`, its subdomain and paths to `APPS` in the script, a custom-domain route in `wrangler.jsonc`, and a card in `apps.json`. Run the tests with `node --test Workstreams/Sisyphusdev_Site/worker/test/route.test.mjs`.

**Merging to `main` publishes the site.** Treat every merge that touches these folders, `wrangler.jsonc` or `scripts/build-site.sh` as a publication (PUB-D-04).

## 1. Preview locally

From the repo root (Node.js v20 or newer):

```bash
bash scripts/build-site.sh
npx wrangler dev
```

Open http://localhost:8787 and http://localhost:8787/posiwid/.

## 2. Check for GitHub links outside this repository (PUB-D-03)

```bash
git grep -nIiP 'github\.com/Sisyphusmfg/(?!MFGDevOps_Pub\b)[A-Za-z0-9_.-]+' -- . && echo "STOP: GitHub link outside MFGDevOps_Pub found" || echo "OK: GitHub links stay in MFGDevOps_Pub"
```

CI runs the same check on every pull request.

## 3. Deploy

Normally you merge the pull request, and Workers Builds deploys. Watch it in Cloudflare › Workers & Pages › `mfgdevops-pub` › Deployments.

To deploy by hand from the repo root:

```bash
npx wrangler login      # first time only
npx wrangler deploy
```

## 4. Verify and record

```bash
curl -sI https://sisyphusdev.com | head -1
curl -sI https://purpose.sisyphusdev.com/posiwid/ | head -1
```

Expected: `HTTP/2 200` for both. Add a deploy-log row to [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md) with the date, the version ID and both `curl` lines.

## Add an app

1. Put its web files in `Workstreams/<Domain>/app/` with an `index.html`.
2. Add `"Workstreams/<Domain>/app:<path>"` to the `apps` list in [`../../scripts/build-site.sh`](../../scripts/build-site.sh).
3. Add its card to [`site/public/apps.json`](site/public/apps.json), with `href` set to `/<path>/`.
4. Update both domains' INDEX registers, then open a pull request.

`status` in `apps.json` is `Live`, `Building` or `Planned`. If `href` is empty, the card shows a disabled button.

## Roll back

```bash
npx wrangler deployments list
npx wrangler rollback <version-id>
```

That restores the previous version in seconds. Also revert the pull request, or the next push redeploys the change. Record the rollback in the status file.
