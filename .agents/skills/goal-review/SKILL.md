---
name: goal-review
description: Run the monthly review of one GOAL engagement or all of them, or a milestone go/no-go. Score progress, check milestones, enforce the 3-active-goal limit, and put a decision to the owner. Use for "monthly review", "review my goals", "goal portfolio" or when a review or milestone date is due.
---

# goal-review

Method authority: [`Persona/POSIWID_Design_Goal_Agent.md`](../../../Persona/POSIWID_Design_Goal_Agent.md). If this skill and the design disagree, the design wins: say so to the owner.

You prepare. **The owner decides.** You don't grade your own work: a fresh agent, or a person who hasn't seen the work, checks the scores and evidence.

## Cadence (GA-D-06; an engagement can set its own in `## Measurable change`)

| Review | When | Covers |
|--------|------|--------|
| Monthly | Once a month | Health, active rows, open stops, scores, and portfolio focus (keep, change or stop) |
| Milestone | On the milestone date | Go or no-go only |

Check-ins stay on their own interval (default weekly) and aren't reviews.

## Monthly review

1. **Freshness.** Run `goal-checkin` on any engagement whose last check-in is older than its interval.
2. **Score** each measurable-change row from 0.0 to 1.0 as progress toward target, capped at 1.0. On a stretch target, 0.6 to 0.7 is a good result. A run of 1.0 scores means the targets were too easy: say so.
3. **Milestones due:** state the go and no-go tests and the evidence for each.
4. **Portfolio** (every engagement in the Goal_Agent INDEX register): active count against the limit of 3. Over it, propose which to pause. Also flag conflicts (one goal's backlog harming another's guardrail) and stale engagements.
5. **Independent check** of scores and evidence. Record who checked and the result.
6. **Decision.** For each engagement, offer exactly: **Continue · Re-plan · Change target · Pause · Stop · Present for COMPLETE**. Recommend one, with a one-line reason, and wait for the owner.
7. **Record** the review entry. Then route: Re-plan → `goal-plan`. Change target → update the source POSIWID analysis first, then `goal-plan`. Stop or Present for COMPLETE → `goal-close`.

## Milestone review

State the go and no-go tests and the evidence for each, record the entry, and put the result to the owner. Don't rescore the portfolio.

## Review entry (append under `## Reviews`, newest last)

```text
### YYYY-MM-DD: review (monthly|milestone)
- Health: <state> · Pace: <x.xx> · Last check-in: <date>
- Scores: <metric> <0.0–1.0> … (checked by: <who>, result: agree|adjusted)
- Milestone <M?>: go <met|not met> · no-go <met|not met> · evidence: <…>
- Guardrails: <within limits | breach>
- Open stops: <ids, oldest first>
- Agent recommends: <option>, because <reason>
- Owner's decision: <option>, because <reason> (date)
```

## Output to the owner

One table: Engagement · Health · Score · Next milestone · Recommendation. Then the open stops, oldest first.
