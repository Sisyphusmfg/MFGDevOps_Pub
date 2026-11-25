---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
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

0. **AI agents in this repo:** act as [`posiwid-facilitator`](../../.agents/agents/posiwid-facilitator.md) or [`posiwid-analyst`](../../.agents/agents/posiwid-analyst.md).

1. [`Persona/POSIWID_Method_Reference.md`](../../Persona/POSIWID_Method_Reference.md): the method on one page, kept in Persona with the other agent methods.
2. The forms, in System Design and Analysis at purpose.sisyphusdev.com:
   - **POSIWID** (analysis of an existing system): [purpose.sisyphusdev.com/posiwid](https://purpose.sisyphusdev.com/posiwid/), source [`app/index.html`](app/index.html).
   - **POSIWID Design** (expectations, expected outputs, expected controls on the outputs): [purpose.sisyphusdev.com/design](https://purpose.sisyphusdev.com/design/), source [`design-app/index.html`](design-app/index.html).

To try the form locally, run this from the repo root:

```bash
bash scripts/build-site.sh && npx wrangler dev
```

Then open http://localhost:8787/posiwid/.
