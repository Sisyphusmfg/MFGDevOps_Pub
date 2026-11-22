---
title: POSIWID_Analysis — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — POSIWID_Analysis

Human-in-the-loop rationale. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-11-22 | POS-D-01: Create a public POSIWID_Analysis domain, starting with a simple entry form for how to do a POSIWID analysis. | Marc asked for this in chat as the first public app. It's an accessible version of private work (PUB-D-02). | active |
| 2026-11-22 | POS-D-02: The form runs entirely in the browser. It has no backend, the draft is kept in local storage, and output is copy or download only. | It needs no accounts, costs nothing to run, and nothing a user types leaves their device. That makes it safe for real plant problems. | proposed |
| 2026-11-22 | POS-D-03: Serve the form at `sisyphusdev.com/posiwid` from the site Worker, not on its own subdomain. | One Worker and one build (SDEV-D-04). A `posiwid.sisyphusdev.com` subdomain can point at the same Worker later. | proposed |
