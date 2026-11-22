---
title: Goal_Agent — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Goal_Agent

Human-in-the-loop rationale. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-11-22 | GA-D-01: Create a public Goal_Agent domain with a goal input form at `/goals`, as a public version of Marc's goal-agent method. | Marc asked to build the Goal Agent input next (PUB-D-02). | active |
| 2026-11-22 | GA-D-02: The form's output includes the method for an AI together with the filled-out form, as one prompt. The same "Prompt for an AI" output is added to the POSIWID page. | Marc said the method to give an AI should come with the filled-out form. One paste gives any assistant both the rules and the goal. | active |
| 2026-11-22 | GA-D-03: Browser-only, like the POSIWID form. No backend, no direct AI call, draft kept in local storage. | No cost, no accounts, and goal details never leave the device unless the owner pastes them somewhere. | proposed |
| 2026-11-22 | GA-D-04: A goal can start from a POSIWID analysis in two ways: the POSIWID form's "Start a goal" button, or uploading a saved POSIWID file on the Goal page. Both fill the source, expectation, gaps, measure and check. The goal's baseline is the analysis's current value, or its baseline if there's no current value. | Marc asked for a button from the POSIWID form that fills the goal form, or an uploaded POSIWID form. A goal starts from where the system is now, so the current value is the right baseline. | active |
