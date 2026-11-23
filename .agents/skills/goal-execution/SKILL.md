---
name: goal-execution
description: Propose a goal from a POSIWID analysis, the owner's request or an issue list for the owner's APPROVE, then charter it for CHARTER and hand off to tracking. Use for "what should we pursue", "propose a goal", "start a goal", GOAL-PROP or a new GOAL engagement in MFGDevOps_Pub.
---

# goal-execution

Method authority: [`Persona/POSIWID_Design_Goal_Agent.md`](../../../Persona/POSIWID_Design_Goal_Agent.md). If this skill and the design disagree, the design wins: say so to the owner.

The entry point for every goal. Proposing, APPROVE and CHARTER happen here. After CHARTER, tracking moves to `goal-plan`, `goal-checkin`, `goal-review` and `goal-close`.

## When to use

- The owner asks for candidate goals, or to start a goal
- A POSIWID analysis or issue list has gaps worth pursuing
- An approved proposal needs its charter

## When not to use

- Nobody is willing to wait for the owner's APPROVE before work starts
- There's no POSIWID anchor and the owner hasn't asked for an analysis first
- The goal would need private details. This repo is public (PUB-D-03)

## Gates

```text
Propose → APPROVE (owner) → Charter → CHARTER (owner) → Plan → Check-ins → Reviews → Close → COMPLETE (owner)
```

| Gate | Who | Meaning |
|------|-----|---------|
| **APPROVE** | Owner | Pursue this goal. You may write the charter |
| **CHARTER** | Owner | Scope, anchor, measurable change and allowed write paths are confirmed. You may act |
| **COMPLETE** | Owner | The evidence pack is accepted |

**Hard rule:** no backlog, no writes outside the proposal file, and no "doing the work" until APPROVE. Nothing outside the charter's allowed paths until CHARTER.

## 1. Propose

**Primary sources only:**

| Source | What counts | How to cite |
|--------|-------------|-------------|
| POSIWID analysis | A gap row or expectation in a POSIWID analysis (`forensic-analysis` or `posiwid-design`) | INDEX route, file and gap number |
| Owner's request | What the owner asked for in this conversation | Date, plus the request in a sentence |
| Issue list | An open issue in a list routed by a domain INDEX | File and issue ID |

Search results, logs and vendor material can support a goal, but can't be its only basis.

1. Read the sources through their domain INDEX.
2. Derive 1 to 3 goals from gap rows, issues or the owner's stated outcome. Don't speculate.
3. For each, copy [`Workstreams/Goal_Agent/Goal_Proposal_Template.md`](../../../Workstreams/Goal_Agent/Goal_Proposal_Template.md) to `Workstreams/Goal_Agent/Engagements/GOAL-PROP-YYYYMMDD-short-topic.md`, and fill it in: proposed goal, source lineage, why now, draft success criteria, draft anchor, risks and out of scope.
4. Register it in the Goal_Agent INDEX engagement register (status `proposed`).
5. Ask the owner: **approve, revise or reject?** Stop until they answer.

## 2. Resolve the anchor (after APPROVE)

| Situation | Do |
|-----------|-----|
| The source is a POSIWID analysis | Use its expectation, gaps and measure |
| There's no analysis yet | Hand off to `posiwid-analyst` (diagnostic), or to `posiwid-facilitator` if the expectations are unclear. The form at `/posiwid/` also works |
| The expectations are unclear | Stop. Hand off to `posiwid-facilitator` to define them first |

## 3. Charter

1. Copy [`Goal_Engagement_Template.md`](../../../Workstreams/Goal_Agent/Goal_Engagement_Template.md) to `Workstreams/Goal_Agent/Engagements/GOAL-YYYYMMDD-short-topic.md`, linking back to the proposal.
2. Fill in the approval, charter and POSIWID snapshot sections, and draft the change backlog from the gaps.
3. List the **allowed write paths** explicitly, or write "none, hand-off only".
4. Ask the owner to confirm **CHARTER**. Record the date when they do.
5. Update the engagement register row (status `chartered`). If this makes more than 3 goals past CHARTER, propose which to pause (GA-D-06).
6. Hand off to `goal-plan`.

## Checklist before any action

- [ ] APPROVE recorded, with date
- [ ] CHARTER recorded, with allowed paths
- [ ] Every backlog row cites a gap or an expected-output row
- [ ] Nothing in the goal is private (PUB-D-03)
