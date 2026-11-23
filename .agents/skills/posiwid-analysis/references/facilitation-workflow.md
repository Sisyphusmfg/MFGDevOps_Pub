---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Procedure
Topic: POSIWID facilitation workflow
Status: Active
doc_type: procedure
agent_grounding: false
agent_maintenance: true
---

# POSIWID facilitation workflow

The operating guide for facilitation mode. Method: [`Persona/POSIWID_Method_Reference.md`](../../../../Persona/POSIWID_Method_Reference.md) § A. Draft template: [`Workstreams/POSIWID_Analysis/POSIWID_Facilitation_Session_Template.md`](../../../../Workstreams/POSIWID_Analysis/POSIWID_Facilitation_Session_Template.md).

## When to use it

- People list problems but can't state expectations.
- The owner wants interactive discovery before a formal design or diagnostic.

Skip facilitation when an approved design already exists and only a diagnostic update is needed.

## Rules

1. One or two questions per turn. Not a questionnaire.
2. One phase at a time. Label the container in each reply.
3. Read back at C1 (de-facto definition) and C2 (gap table).
4. Never cite a facilitation draft as fact.
5. Offer the mechanism check after outputs. The answer must be recorded, but running the check is optional.

## Phases

| Phase | Section of the draft | POSIWID mapping |
|-------|----------------------|-----------------|
| 0 Intake | Intake | Boundary, observer, stakeholders, target domain |
| 1 Problem container | Phase 1 | Diagnostic step 1 input |
| 2 De-facto definition | Phase 2 | Diagnostic step 1 → **C1** |
| 3 Root expectations | Phase 3 | Design step 1 |
| 4 Gap table | Phase 4 | Diagnostic step 3 → **C2** |
| 5 Expected outputs | Phase 5 | Design step 2 |
| 5A Mechanism check offer | Phase 5A | Accepted or declined → **C-MECH** |
| 6 Controls sketch | Phase 6 (optional) | Design step 3 |
| 7 Handoff | Handoff | `posiwid-analyst` → **C3** |

## Mechanism check (phase 5A)

Once there's at least one expectation and output pair, ask:

> "Would you like to test whether we understand the mechanisms that will produce these outputs?"

Record `accepted` or `declined`.

If accepted:

1. State the claim: **mechanism X produces output Y**.
2. Ask the owner to rate their understanding from 1 to 7.
3. Have them explain the mechanism step by step. At each step, ask "how does that happen?"
4. Ask for the rating again, and record the change.
5. Record missing links, owners and evidence, and what each means for the controls.

Don't fill in the owner's chain for them. If no mechanism can be named, that's the finding: record a mechanism-design gap. (A dedicated public IOED answering skill doesn't exist yet. Until it does, mark any link you suggest as a `hypothesis` for the owner to confirm.)

## Root expectation questions

Ask against each de-facto clause:

- If the system stopped doing [X], what would have to be true instead?
- Who should receive [X], and by when, given that today they get [Y]?
- What decision should this system enable that [the de-facto behavior] blocks today?
- What must never happen again?
- If the purpose is what it does, is this outcome acceptable? If not, what outcome is?
- What would we see on an ordinary Tuesday if [this clause] were fixed?

## Owner checkpoints

| ID | The owner confirms | If skipped |
|----|--------------------|------------|
| C1 | The de-facto definition is problematic but accurate | The expectations have nothing to anchor to |
| C2 | The gap table is complete enough to design | Promotion produces vague files |
| C-MECH | The mechanism check was accepted or declined | Can't move from outputs to controls or handoff |
| C3 | Ready for `posiwid-analyst` | No formal save |
| C4 | (Analyst) The design is approved for grounding | `agent_grounding` stays false |

Silence never satisfies a checkpoint: ask.

## Saving the draft

| Field | Value |
|-------|-------|
| Location | `Workstreams/POSIWID_Analysis/Sessions/POSIW-FAC-YYYYMMDD-short-topic.md` |
| doc_type | `facilitation-draft` |
| agent_grounding | `false` |
| Status | `Draft` |

Save at the end of phases 2, 4, 5A and 7, and keep its row in the POSIWID_Analysis INDEX analysis register up to date.

## Handoff brief to posiwid-analyst

- System boundary and observer
- Draft path
- The confirmed de-facto definition (C1) and gap rows (C2)
- The mechanism check outcome, and any mechanism gaps
- Target domain, and design or diagnostic
- Open questions
- **Concerns / deviations / findings**, including any blocked network fetch (host, and what needed it), or `No blocked network fetch`

## Room scripts

- **Opening:** "We'll fill the problem container first: everything wrong today. Then we'll name what the system actually does, and only then what it should do instead."
- **De-facto read-back:** "So what this system does today is… Is that wrong but accurate?"
- **Gap close:** "The space between these two columns is the gap we're here to close."
