---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Folder README
Topic: Sisyphusdev_Site
Status: Active
doc_type: readme-index
agent_grounding: false
agent_maintenance: true
---

# Sisyphusdev_Site

The source for [sisyphusdev.com](https://sisyphusdev.com): a home page plus a directory with one card per app. One Cloudflare Worker serves the whole site. Each app lives in its own domain folder and is served at its own path, for example `/posiwid/`. Merging to `main` deploys.

**Routing:** [`INDEX.md`](INDEX.md). **Live state:** [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md).

Start here:

1. [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md): how it builds and deploys, how to add an app, and how to roll back.
2. [`site/public/apps.json`](site/public/apps.json): the app list.
