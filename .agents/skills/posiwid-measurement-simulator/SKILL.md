---
name: posiwid-measurement-simulator
description: Predict what a system would be observed doing, and what its measures would read, after a proposed POSIWID change, then revise that prediction as evidence arrives. Use when asked to simulate the outcome of a change, predict measurements, or update a POSIWID simulation with new evidence.
---

# posiwid-measurement-simulator

Method authority: [`Persona/POSIWID_Method_Reference.md`](../../../Persona/POSIWID_Method_Reference.md) § B. This skill adds one step to the diagnostic feedback loop: a forward look. It doesn't change the five questions or the loop.

**The prediction is a hypothesis, not an observation.** `posiwid-analyst` runs this skill. The owner judges whether a prediction is good enough to act on.

Template: [`references/simulation-template.md`](references/simulation-template.md)

## What it answers

If this proposed change were in effect, what would an observer record the system doing, and what would the step 5 measures read? The prediction may fall short of the expectation. Then state the remaining gap. Never copy the target into the prediction and call the gap closed.

## When to run

- Someone asks what the measures would do if a change were made.
- A diagnostic has step 4 changes and step 5 measures, but no prediction.
- New evidence arrives for an existing simulation.

Don't run it without a diagnostic, and don't invent a baseline.

## Steps

1. Route root `README.md` → the diagnostic's domain `INDEX.md` → the diagnostic. Read steps 1 to 5 and the loop, and the linked design if there is one.
2. If step 1 (what the system is doing) is missing or is only a wish, stop and say what's missing.
3. Save one file, `POSIWID_Simulation_<short-topic>.md`, beside the diagnostic, from the template.
4. For each step 4 change, write the simulated observed behavior, the simulated measure readings, the evidence that would confirm or refute them, and the predicted remaining gap. The target stays the step 5 target.
5. Label every number or behavior that wasn't supplied as `assumption`. Don't invent occurrence data, defect history or baselines.
6. Never paste the prediction into diagnostic step 1.
7. Don't adopt the change. A simulation writes no `DECISIONS.md` row.
8. Don't revise expectations. If the prediction suggests an expectation is wrong, hand that back to the diagnostic feedback loop.

## When evidence arrives

1. Append one revision-log row. Never edit an earlier row.
2. Write the observation into diagnostic step 1, and into step 5 Current if a measure was taken. That is the observation, not the prediction.
3. Update the simulated sections to the revised hypothesis. The log keeps the old prediction.
4. If the observation shows the expectation was wrong, stop at the handoff to the diagnostic feedback loop. Edit step 2 only if the owner asks for that revision.

## Grounding and saving

- Simulation file: `doc_type: record`, `Document Type: POSIWID Simulation`, `agent_grounding: false`, `authority_rank: —`. Always. Never cite it as what the system does.
- Register it in the analysis register of the POSIWID_Analysis INDEX (and in its own domain INDEX), marked as a prediction, not for grounding.
- Add an activity-log entry, with a rollback path, in the same pull request. Don't merge.
