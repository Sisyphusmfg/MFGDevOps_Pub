---
name: posiwid-analysis
description: Run POSIWID work in MFGDevOps_Pub. Covers two-container facilitation, design of a new system, diagnostic of an existing one, and promotion of a facilitation draft. Use when the user mentions POSIWID, facilitation, de-facto definition, gap analysis, a system with problems but no clear expectations, or promoting a draft.
---

# posiwid-analysis

Method authority: [`Persona/POSIWID_Method_Reference.md`](../../../Persona/POSIWID_Method_Reference.md). Citation rules: [`Persona/POSIWID_Diagnostic_Grounding.md`](../../../Persona/POSIWID_Diagnostic_Grounding.md). If this skill and the method disagree, the method wins: say so to the owner.

Stafford Beer: *the purpose of a system is what it does.* Read this skill first for any POSIWID work.

## Choose the mode

| Mode | When | Agent | Template | Output |
|------|------|-------|----------|--------|
| **Facilitation** | Interactive discovery, or problems with no clear expectations | `posiwid-facilitator` | [`facilitation-workflow.md`](references/facilitation-workflow.md) and [`POSIWID_Facilitation_Session_Template.md`](../../../Workstreams/POSIWID_Analysis/POSIWID_Facilitation_Session_Template.md) | `POSIW-FAC-*` draft |
| **Design** | A new system, process or domain | `posiwid-analyst` | [`design-template.md`](references/design-template.md) | `posiwid-design` |
| **Diagnostic** | An existing system | `posiwid-analyst` | [`analysis-template.md`](references/analysis-template.md) | `forensic-analysis` |
| **Promotion** | A confirmed facilitation draft becomes a design or diagnostic | `posiwid-analyst` | design or analysis template | The formal file, in its target domain |
| **Simulation** | Predict the result of a proposed change | `posiwid-analyst` | skill [`posiwid-measurement-simulator`](../posiwid-measurement-simulator/SKILL.md) | `POSIWID_Simulation_*` |

**Typical path:** facilitation → owner confirms → promotion to design or diagnostic → (after go-live) diagnostic against the design → simulation of proposed changes → feedback loop.

## Where files go

| File | Location |
|------|----------|
| Facilitation draft | `Workstreams/POSIWID_Analysis/Sessions/POSIW-FAC-YYYYMMDD-short-topic.md` |
| Design or diagnostic | The domain of the system analyzed. If none fits, `Workstreams/POSIWID_Analysis/Analyses/` |
| Simulation | Beside its diagnostic |

Register every file in the analysis register of [`Workstreams/POSIWID_Analysis/INDEX.md`](../../../Workstreams/POSIWID_Analysis/INDEX.md), and in its own domain INDEX when it's saved elsewhere.

**Public repo (PUB-D-03, POS-D-05).** File only analyses that are fine to publish. If an analysis needs internal names, people, suppliers, part numbers or business figures, say so and keep it out of this repo.

## Facilitation (two containers)

1. **Problem container:** capture pain only. Nothing is lost.
2. **De-facto definition:** one statement of what the system reliably does. Owner confirms (**C1**).
3. **Root expectations:** one de-facto clause at a time, into the expectation container.
4. **Gap table:** de-facto | expectation | gap. Owner confirms (**C2**).
5. **Expected outputs,** with observable evidence.
6. **Mechanism check offer:** ask once whether to run an "explain the mechanism" check, and record accepted or declined (**C-MECH**). Silence isn't an answer.
7. **Controls sketch,** keeping unexplained mechanisms as gaps.
8. **Handoff** to `posiwid-analyst`. Owner confirms (**C3**).

Ask one or two questions per turn, and label which container each reply is about. Never mix problems and expectations in one question. Drafts are `doc_type: facilitation-draft`, `agent_grounding: false`, and are never cited as fact.

## Design (four steps)

1. Expectations · 2. Expected outputs (with observable evidence and the execution artifact each needs) · 3. Control methods · 4. Required execution artifacts.

`doc_type: posiwid-design`. `agent_grounding: false` until the owner approves it, then true (**C4**). Execution artifacts (SOPs, procedures, engineering designs) are separate files linked from step 2.

## Diagnostic (five questions and the loop)

1. Doing · 2. Expected · 3. Gaps · 4. Changes (proposals until adopted) · 5. Measurable change (baseline, current, target, how to check) · ↻ feedback loop.

State the observer, the boundary and the constant-failure test. `doc_type: forensic-analysis`, `agent_grounding: true` by default, with a rank-1 INDEX row for what it records. Unresolved choices go in the domain `DECISIONS.md`. Beer's guardrails: name the observer and the boundary, apply the constant-failure test, and treat every finding as a hypothesis, not proof.

## Promotion (draft → formal file)

1. Read the confirmed draft (C1, C2, C-MECH recorded, C3 given).
2. Choose design or diagnostic.
3. Save it in the target domain, not in `Sessions/`, from the right template.
4. Link the draft in `Source`.
5. Register it, and set the draft's register row to `promoted`.

## Checklist

[`references/posiwid-checklist.md`](references/posiwid-checklist.md)

## Quick routing

- "Help me define what this should do" → facilitation → `posiwid-facilitator`
- "Design [system]" → design → `posiwid-analyst`
- "Analyze what [system] is actually doing" → diagnostic → `posiwid-analyst` (facilitate first if the expectations are unclear)
- "Promote this draft" → promotion → `posiwid-analyst`
- "What would the numbers do if we made this change?" → simulation → `posiwid-analyst`
- "Turn this gap into a goal" → `goal-agent` (skill `goal-execution`)
