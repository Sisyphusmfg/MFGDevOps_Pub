# Decisions: sisyphusdev.com

- **2026-11-22: The site's code lives in MFGDevOps_Pub.** MFGDevOps stays 100% private. Accessible versions of the private projects will be moved into this public repo over time, and each one gets a card in `apps.json` when it lands.
- **2026-11-22: The home page and app directory come first.** sisyphusdev.com is the active place to use the apps I build. Each app runs on its own subdomain (for example `goals.sisyphusdev.com`), and the home page lists them all.
- **2026-11-22: The site is a static-assets Cloudflare Worker.** The domain is already on Cloudflare (Free plan). There's no build step, and the app list is a single JSON file.
