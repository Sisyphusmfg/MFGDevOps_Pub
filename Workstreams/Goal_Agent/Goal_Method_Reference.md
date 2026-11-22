---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Method Reference
Status: Draft
doc_type: canonical-spec
agent_grounding: false
agent_maintenance: true
authority_rank: 1
Source: Public version written from Marc's goal-agent method
---

# Goal Method Reference — Public Edition

A method for pursuing a goal with an AI assistant. The person owns the goal and judges it. The AI checks, plans, tracks and reports, and never approves its own work.

## Three gates

| Gate | Who | Meaning |
|------|-----|---------|
| **1 APPROVE** | Owner | The goal is worth pursuing. Before this, the AI only reviews and recommends |
| **2 CHARTER** | Owner | The scope, measurable change and the AI's limits are confirmed. Before this, the AI only plans |
| **3 COMPLETE** | Owner | The evidence shows the target is met. Only the owner marks it |

```text
Propose → APPROVE → Charter → CHARTER confirmed → Plan → Check-ins → Reviews → Evidence → COMPLETE
```

## What a goal needs

| Part | Why |
|------|-----|
| **Outcome** | What will be true, not an activity |
| **Source** | Where the goal came from: a POSIWID analysis (strongest), the owner's request, or an issue list. A goal with no source is a guess |
| **Expectation and gaps** | The POSIWID expectation it serves and the gaps it closes. Every action must trace to one |
| **Measurable change** | One measure, with a baseline (source and date), a target, a target date, and how anyone can check it |
| **Guardrails** | Measures that must not get worse while chasing the target |
| **Kill criteria** | When to stop altogether |
| **Milestones** | Dated checkpoints with a go test and a no-go test |
| **Scope and limits** | What's in and out of scope, and what the AI may and must not do |

## Rules for the AI

- Every action closes a listed gap or moves the measure.
- Values come only from the "how to check" source, with a date. Never estimates.
- Never change the baseline, target or date. Raise it as a question for the owner.
- Stay inside the limits. Report a worsening guardrail at once, and stop if a kill criterion is met.
- Mark assumptions as assumptions.

## Check-ins

At each check-in, read the current value from the source, then work out pace and health.

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

At-risk or worse: name a likely cause and re-plan the backlog. Re-plan every 4 check-ins anyway. A re-plan changes the actions, never the target.

## Milestones, reviews and closing

On each milestone date, apply the go and no-go tests. Once a month, review the goal. Each time, the choices are continue, re-plan, change target (owner's decision), pause, stop, or present for COMPLETE.

To close, take a final measurement, write a short POSIWID look back (what the system does now vs what it was expected to do), and lay out an evidence table: criterion, evidence, met or not met. Then the owner decides on gate 3.

## Tool

The form at [sisyphusdev.com/goals](https://sisyphusdev.com/goals/) builds the goal record and a prompt that gives an AI this method plus the goal. A POSIWID analysis from [sisyphusdev.com/posiwid](https://sisyphusdev.com/posiwid/) is the best source for a goal.
