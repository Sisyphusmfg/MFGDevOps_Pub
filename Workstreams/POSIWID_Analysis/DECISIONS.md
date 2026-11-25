---
title: POSIWID_Analysis — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — POSIWID_Analysis

Human-in-the-loop rationale. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status | Superseded by |
|------|----------|-----------|--------|---------------|
| 2026-11-22 | POS-D-01 — Create a public POSIWID_Analysis domain, starting with a simple entry form for how to do a POSIWID analysis. | Marc asked for this in chat as the first public app. It's an accessible version of private work (PUB-D-02). | adopted |  |
| 2026-11-22 | POS-D-02 — The form runs entirely in the browser. It has no backend, the draft is kept in local storage, and output is copy or download only. | It needs no accounts, costs nothing to run, and nothing a user types leaves their device. That makes it safe for real plant problems. | proposed |  |
| 2026-11-22 | POS-D-03 — Serve the form at `sisyphusdev.com/posiwid` from the site Worker, not on its own subdomain. | One Worker and one build (SDEV-D-04). A `posiwid.sisyphusdev.com` subdomain can point at the same Worker later. Adopted by Marc on 2026-11-24 ("Mark 03 adopted."); live check that day: `https://sisyphusdev.com/posiwid/` serves the form. | adopted |  |
| 2026-11-22 | POS-D-04 — The way agents do POSIWID work lives in this public repo: `posiwid-facilitator` and `posiwid-analyst` agents and the `posiwid-analysis` and `posiwid-measurement-simulator` skills in `.agents/` (pointers in `.claude/` and `.cursor/`), plus a facilitation template, `Sessions/` for drafts and an analysis register here. It's a public rewrite of the private layer, with owner checkpoints renamed C1, C2, C-MECH, C3 and C4. The IOED answering step is left out until a public IOED skill exists. | Marc: "yes, bring the POSIWID skills across." | adopted |  |
| 2026-11-22 | POS-D-05 — Only analyses that are fine to publish are filed here. A system that can't be analyzed without internal names, people, suppliers, part numbers or business figures stays in the private repo. | Analysis files in this repo are public (PUB-D-03). It's the same rule as GA-D-07 for goals. Adopted (Marc, 2026-11-22). | adopted |  |
