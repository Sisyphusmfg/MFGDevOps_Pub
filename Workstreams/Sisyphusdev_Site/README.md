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

The source for [sisyphusdev.com](https://sisyphusdev.com). It's a home page plus a directory with one card per app. Each app runs on its own subdomain (for example `goals.sisyphusdev.com`). The page is plain HTML with no build step, served by a Cloudflare Worker.

**Routing:** [`INDEX.md`](INDEX.md). **Live state:** [`Sisyphusdev_Site_Status.md`](Sisyphusdev_Site_Status.md).

Start here:

1. [`Site_Deploy_Procedure.md`](Site_Deploy_Procedure.md): preview, deploy, add an app, roll back.
2. [`site/public/apps.json`](site/public/apps.json): the app list. Edit it to add a card.
