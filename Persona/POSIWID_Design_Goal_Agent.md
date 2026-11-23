---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: POSIWID Design
Topic: POSIWID design — goal agent (how AI manages goals)
Status: Draft
doc_type: posiwid-design
agent_grounding: false
agent_maintenance: true
authority_rank: 1
Source: Public version of Marc's goal-agent design
---

# POSIWID Design — Goal Agent

How an AI manages a goal with a person, written as a POSIWID design (see [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md)). The person owns the goal and judges it. The AI checks, plans, tracks and reports, and never approves its own work.

This is the method authority for goals. The agent layer ([`goal-agent`](../.agents/agents/goal-agent.md) and its five skills) and the form at [sisyphusdev.com/goals](https://sisyphusdev.com/goals/) carry it out.

## 1. What the goal agent is expected to do

1. Propose goals only from a primary source: a POSIWID analysis, the owner's own request, or an issue list.
2. Do nothing beyond proposing until the owner approves, and nothing beyond planning until the owner confirms the charter.
3. Tie every action to a gap or to the measure. No orphan work.
4. Report progress from real values, with pace and health, so that drift shows up early.
5. Leave every decision about targets, pausing, stopping and completion to the owner.

## 2. Expected outputs

| Output | Observable evidence |
|--------|---------------------|
| Goal proposal | A `GOAL-PROP-…` file with source lineage and an APPROVE box ([template](../Workstreams/Goal_Agent/Goal_Proposal_Template.md)) |
| Goal engagement | One `GOAL-…` file per goal holding the charter, plan, check-ins, reviews and evidence ([template](../Workstreams/Goal_Agent/Goal_Engagement_Template.md)) |
| Check-ins | Dated entries with the current value, the pace arithmetic and a health state |
| Reviews | Monthly entries with scores, an independent check, a recommendation and the owner's decision |
| Evidence pack | Criterion · evidence · status, marked ready for review before COMPLETE |
| Register | One row per goal in the Goal_Agent INDEX engagement register |

## 3. Controls

### Three gates

| Gate | Who | Meaning |
|------|-----|---------|
| **1 APPROVE** | Owner | The goal is worth pursuing. Before this, the AI only reviews and recommends |
| **2 CHARTER** | Owner | The scope, measurable change and the AI's limits (allowed paths, may and must not) are confirmed. Before this, the AI only plans |
| **3 COMPLETE** | Owner | The evidence shows the target is met. Only the owner marks it |

```text
Propose → APPROVE → Charter → CHARTER → Plan → Check-ins → Reviews → Evidence → COMPLETE
```

### Rules for the AI

- Every action closes a listed gap or moves the measure.
- Values come only from the "how to check" source, with a date. Never estimates.
- Never change the baseline, target or date. Raise it as a question for the owner.
- Stay inside the limits. Report a worsening guardrail at once, and stop if a kill criterion is met.
- Mark assumptions as assumptions.
- Don't grade your own work. A fresh agent or person checks scores and evidence at each review.

### Limits and cadence

| Setting | Value |
|---------|-------|
| Active goals past CHARTER at once | 3 at most |
| Check-ins | Weekly by default |
| Re-plan | Every 4 check-ins, and when a milestone is reached or missed, or health drops |
| Review | Monthly. Milestones get go or no-go on their date |

## 4. What a goal needs

| Part | Why |
|------|-----|
| **Outcome** | What will be true, not an activity |
| **Source** | Where the goal came from. A POSIWID analysis is strongest. A goal with no source is a guess |
| **Expectation and gaps** | The POSIWID expectation it serves and the gaps it closes |
| **Measurable change** | One measure, with a baseline (source and date), a target, a target date, and how anyone can check it |
| **Guardrails** | Measures that must not get worse while chasing the target |
| **Kill criteria** | When to stop altogether |
| **Milestones** | Dated checkpoints with a go test and a no-go test |
| **Scope and limits** | What's in and out of scope, and what the AI may and must not do |

When a goal starts from a POSIWID analysis, its baseline is the analysis's current value: a goal starts from where the system is now.

## 5. Check-ins: pace and health

```text
elapsed  = (today - start) / (target date - start)
expected = baseline + (target - baseline) × elapsed
pace     = (current - baseline) / (expected - baseline)     1.0 = on plan
```

| Health | Rule |
|--------|------|
| on-track | pace 0.9 or more |
| at-risk | pace 0.7 to under 0.9, or a guardrail got worse |
| off-track | pace under 0.7, or a milestone no-go test is met |
| blocked | the active action is blocked and nothing else can start |
| stale | no check-in for twice the check-in interval |

At-risk or worse: name a likely cause and re-plan the backlog. A re-plan changes the actions, never the target.

## 6. Reviews and closing

At each monthly review, score each measure from 0.0 to 1.0 against target (0.6 to 0.7 is good on a stretch target), check milestones, keep to the 3-goal limit, and offer the owner exactly: continue, re-plan, change target, pause, stop, or present for COMPLETE.

To close: take a final measurement, write a short POSIWID look back (what the system does now against what it was expected to do), lay out the evidence table, retire leftover backlog rows without deleting them, and ask the owner to decide on gate 3.

## 7. Measurable change for this design

| Measure | Baseline | Current | Target | How to check |
|---------|----------|---------|--------|--------------|
| Goals run end to end with the agent layer (APPROVE through COMPLETE or a recorded stop) | 0 (2026-11-22) | 0 | 1 by the end of the first goal's horizon | The Goal_Agent INDEX engagement register shows a closed goal whose file has check-ins, a review and an evidence pack |

## 8. Where it is carried out

| Who uses it | File |
|-------------|------|
| An AI agent working in this repo | [`.agents/agents/goal-agent.md`](../.agents/agents/goal-agent.md), with skills [`goal-execution`](../.agents/skills/goal-execution/SKILL.md), [`goal-plan`](../.agents/skills/goal-plan/SKILL.md), [`goal-checkin`](../.agents/skills/goal-checkin/SKILL.md), [`goal-review`](../.agents/skills/goal-review/SKILL.md), [`goal-close`](../.agents/skills/goal-close/SKILL.md) |
| Any AI assistant, by paste | The "Prompt for an AI" output of the form at [sisyphusdev.com/goals](https://sisyphusdev.com/goals/) |
| People | This page, and the form |

A POSIWID analysis from [sisyphusdev.com/posiwid](https://sisyphusdev.com/posiwid/) is the best source for a goal: press **Start a goal** there, or upload the saved file on the goals page.
