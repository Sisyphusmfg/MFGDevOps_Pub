---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Template
Topic: Goal engagement template
Status: Active
doc_type: record
agent_grounding: false
agent_maintenance: true
---

<!-- Copy this file to Engagements/GOAL-YYYYMMDD-short-topic.md. In the copy set Document Type: Goal Engagement, Status: Active, Topic: the goal. Delete this comment. -->

# GOAL-YYYYMMDD: short topic

> **Goal engagement.** The one file for this goal: charter, plan, check-ins, reviews and evidence. Continuity and evidence, not program fact. This file is public (PUB-D-03).

## Approval

| Field | Value |
|-------|-------|
| **Proposal** | `GOAL-PROP-…` file, or the approval in a dated message |
| **Source lineage** | POSIWID analysis · Owner's request · Issue list, with citation |
| **APPROVE** | ☐ Owner approved pursuit on YYYY-MM-DD |

## Charter

| Field | Value |
|-------|-------|
| **Goal** | One sentence: the measurable change pursued |
| **POSIWID anchor** | Link to the analysis (expectation and gaps) |
| **In-scope gaps** | Gap numbers |
| **Allowed write paths** | An explicit list, or "none, hand-off only" |
| **The AI may** | |
| **The AI must not** | |

**CHARTER:** ☐ Owner confirmed scope, anchor, measure and allowed paths on YYYY-MM-DD

## POSIWID snapshot (from the anchor)

**Expected:** 

| # | Doing | Expected | Gap |
|---|-------|----------|-----|
| G1 | | | |

## Change backlog

| # | Gap | Change | Owner | Evidence criterion | Priority | Verify | Stop if | Status |
|---|-----|--------|-------|--------------------|----------|--------|---------|--------|
| 1 | G1 | | goal-agent | | 1 | | | pending |

Status: `pending` · `active` (exactly one) · `blocked` · `done` · `retired`. Set by `goal-plan` after CHARTER.

## Measurable change

Set by `goal-plan`, and confirmed by the owner. Only the owner changes a target, and the change is made in the source POSIWID analysis first.

| Metric | Gap | Baseline (source, date) | Current (source, date) | Target | By | How to check |
|--------|-----|-------------------------|------------------------|--------|----|--------------|
| | | | | | | |

**Guardrails** (must not get worse)

| Metric | Baseline | Limit | How to check |
|--------|----------|-------|--------------|
| | | | |

**Kill criteria:** 

**Cadence:** check-in weekly · review monthly · re-plan every 4 check-ins (GA-D-06)

## Milestones

| ID | Date | Go if | No-go if | Result |
|----|------|-------|----------|--------|
| M1 | | | | |

## Health

| Field | Value |
|-------|-------|
| Health | on-track · at-risk · off-track · blocked · stale |
| Pace | x.xx (worked out in the latest check-in) |
| Active backlog row | # |
| Last check-in | YYYY-MM-DD |
| Next review | YYYY-MM-DD |

## Check-ins

Newest last. Format in skill `goal-checkin`.

## Reviews

Newest last. Format in skill `goal-review`.

## Open stops

Decisions or access only the owner can give. Resolved rows keep their dated note.

| ID | Raised | Blocks row | Question or decision | Options | Agent recommends | Resolved (date, choice) |
|----|--------|------------|----------------------|---------|------------------|-------------------------|

## Evidence pack

| Criterion | Evidence | Status |
|-----------|----------|--------|
| | | |

Pack status: draft · ready for review

## Action trace

| Date | Action | Gap or row | Result |
|------|--------|------------|--------|

## Closure notes

*Filled by `goal-close`.*

**COMPLETE:** ☐ Owner accepted the evidence on YYYY-MM-DD · Outcome: Achieved · Partly achieved · Stopped · Superseded
