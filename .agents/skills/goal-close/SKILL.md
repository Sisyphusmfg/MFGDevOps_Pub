---
name: goal-close
description: Prepare a GOAL engagement for the owner's COMPLETE or stop decision. Covers the final measurement, a POSIWID look back, the evidence pack, and retiring the backlog, without deleting anything. Use for "close GOAL-…", "we're done with…", "stop this goal" or when a review decides Stop or Present for COMPLETE.
---

# goal-close

Method authority: [`Persona/POSIWID_Design_Goal_Agent.md`](../../../Persona/POSIWID_Design_Goal_Agent.md). If this skill and the design disagree, the design wins: say so to the owner.

Closing is the owner's decision. You never mark COMPLETE and never call your own work achieved.

## Steps

1. **Final measurement.** Run `goal-checkin` once more, taking final values from the stated sources.
2. **Proposed outcome:** **Achieved** (targets met, evidence pack complete) · **Partly achieved** (with scores) · **Stopped** (a kill criterion or new information) · **Superseded** (link the new proposal or goal).
3. **Evidence pack.** Every criterion row has proof and a status. Mark the pack `ready for review`.
4. **Look back** (add under `## Closure notes`):
   1. What the system actually did: baseline to final, with dates
   2. What it was expected to do
   3. Gaps that remained, and why
   4. What to repeat, and what to avoid
   5. Measurable change: baseline · final · target · how checked
5. **Tidy, don't delete.** Remaining backlog rows become `retired` ("engagement closed"). Each open stop is resolved or carried into a follow-up proposal.
6. **Ask the owner** for COMPLETE (Achieved or Partly achieved), or to confirm Stopped or Superseded.
7. **After the owner decides:** record the date and the choice in the engagement, and update its register row (status, final value, outcome). If the owner's reason sets a precedent, record it in the Goal_Agent `DECISIONS.md`.

## Output to the owner

The proposed outcome, final against target, a two-line lesson, and whether to draft a follow-up proposal.
