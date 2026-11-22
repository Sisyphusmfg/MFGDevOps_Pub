# sisyphusdev.com

The home page and app directory for [sisyphusdev.com](https://sisyphusdev.com). It's a static Cloudflare Worker: plain HTML, with no build step.

## Layout

| Path | What it is |
|---|---|
| `public/index.html` | Landing page and app directory |
| `public/apps.json` | The app list. One entry per app, and the page renders one card for each entry |
| `public/404.html` | Not-found page |
| `wrangler.jsonc` | Worker config, including the custom domains (`sisyphusdev.com`, `www.sisyphusdev.com`) |
| `DECISIONS.md` | Why things are the way they are |

## Add or update an app

Edit `public/apps.json`:

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

- `status` must be `Live`, `Building` or `Planned`.
- If `href` is empty, the card shows a disabled button.

## Preview locally

```bash
cd sites/sisyphusdev
npx wrangler dev
```

## Deploy

```bash
cd sites/sisyphusdev
npx wrangler login     # first time only
npx wrangler deploy
```

Then check it: `curl -I https://sisyphusdev.com` should return `200`.

## Public-only rule

This repo is public. Never link to, or copy content from, the private `MFGDevOps` repo. To check, run:

```bash
grep -rnE 'MFGDevOps("|/)' sites/sisyphusdev/public/
```

It should return nothing.
