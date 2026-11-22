---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Folder README
Topic: POSIWID_Analysis
Status: Active
doc_type: readme-index
agent_grounding: false
agent_maintenance: true
---

# POSIWID_Analysis

POSIWID stands for "the purpose of a system is what it does." This domain holds the public method and a guided form that walks anyone through a five-question analysis. The form produces a Markdown file that's ready to save into a machine-first repo.

**Routing:** [`INDEX.md`](INDEX.md). **Live state:** [`POSIWID_Analysis_Status.md`](POSIWID_Analysis_Status.md).

Start here:

1. [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md): the method on one page.
2. The form, live at [sisyphusdev.com/posiwid](https://sisyphusdev.com/posiwid/) after deploy. The source is [`app/index.html`](app/index.html).

To try the form locally, run this from the repo root:

```bash
bash scripts/build-site.sh && npx wrangler dev
```

Then open http://localhost:8787/posiwid/.
