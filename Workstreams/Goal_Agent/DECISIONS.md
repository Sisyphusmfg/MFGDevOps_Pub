---
title: Goal_Agent — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Goal_Agent

Human-in-the-loop rationale. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status | Superseded by |
|------|----------|-----------|--------|---------------|
| 2026-11-22 | GA-D-01 — Create a public Goal_Agent domain with a goal input form, as a public version of Marc's goal-agent method. | Marc asked to build the Goal Agent input next (PUB-D-02). | adopted |  |
| 2026-11-22 | GA-D-02 — The form's output includes the method for an AI together with the filled-out form, as one prompt. The same "Prompt for an AI" output is added to the POSIWID page. | Marc said the method to give an AI should come with the filled-out form. One paste gives any assistant both the rules and the goal. | adopted |  |
| 2026-11-22 | GA-D-03 — Browser-only, like the POSIWID form. No backend, no direct AI call, draft kept in local storage. | No cost, no accounts, and goal details never leave the device unless the owner pastes them somewhere. | proposed |  |
| 2026-11-22 | GA-D-04 — A goal can start from a POSIWID analysis in two ways: the POSIWID form's "Start a goal" button, or uploading a saved POSIWID file on the Goal page. Both fill the source, expectation, gaps, measure and check. The goal's baseline is the analysis's current value, or its baseline if there's no current value. | Marc asked for a button from the POSIWID form that fills the goal form, or an uploaded POSIWID form. A goal starts from where the system is now, so the current value is the right baseline. | adopted |  |
| 2026-11-22 | GA-D-05 — The way AI manages goals lives in this public repo: a goal-agent and five skills (`goal-execution`, `goal-plan`, `goal-checkin`, `goal-review`, `goal-close`) in `.agents/`, with pointers in `.claude/` and `.cursor/`, plus proposal and engagement templates and an engagement register in this domain. It's a public rewrite of the private goal-agent layer: gates named APPROVE, CHARTER and COMPLETE, and no private agents, paths or IDs. | Marc: "The way AI manages goals is not in my MFGDevOps_Pub. It needs to be." | adopted |  |
| 2026-11-22 | GA-D-06 — Limits and cadence carried over from Marc's adopted private settings: at most 3 goals past CHARTER at once; health on-track at pace 0.9 or more, at-risk 0.7 to under 0.9, off-track under 0.7, stale at twice the check-in interval; re-plan every 4 check-ins; review monthly; check-ins weekly by default. | Same method in both repos (PUB-D-04). These are the values Marc adopted for the private goal layer on 2026-11-21. | adopted |  |
| 2026-11-22 | GA-D-07 — Only goals that are fine to publish are filed here. A goal that needs internal names, people, suppliers, part numbers or business figures stays in the private repo. | Engagement files in this repo are public (PUB-D-03). Adopted (Marc, 2026-11-22). | adopted |  |
| 2026-11-22 | GA-D-08 — The goal form is served at `/goals` on sisyphusdev.com (from GA-D-01) | Split from GA-D-01 on 2026-11-24 so each row holds one decision (PUB-D-11). SDEV-D-11 moves the form into System Design and Analysis at `purpose.sisyphusdev.com`. | superseded | SDEV-D-11 |
