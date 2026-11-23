---
name: goal-plan
description: After CHARTER on a GOAL engagement, set the measurable change (baseline, target, date, how to check), guardrails, milestones with go and no-go tests, and a prioritized backlog with exactly one active row. Re-plan on drift or every 4 check-ins. Use for "break this goal down", "what's next on GOAL-…" or a plan change. Not for proposing goals (use goal-execution).
---

# goal-plan

Method authority: [`Persona/POSIWID_Design_Goal_Agent.md`](../../../Persona/POSIWID_Design_Goal_Agent.md). If this skill and the design disagree, the design wins: say so to the owner.

## Preconditions

- The engagement in `Workstreams/Goal_Agent/Engagements/GOAL-*.md` has APPROVE and CHARTER recorded. If not, stop and use `goal-execution`.
- Read the POSIWID anchor that the charter names.

## Steps

1. **Measurable change.** For each in-scope gap, add a row to `## Measurable change`: metric, gap number, baseline with source and date, target, target date, how to check. Ask the owner again if any of these fails:
   - the target can be proven true or false from the stated source
   - the metric counts an outcome, not effort. Prefer absolute counts to ratios that can be gamed by shrinking the denominator
   - the baseline has a source, or says `unknown, first check-in sets it`
   - there's at least one guardrail
2. **Milestones.** At least one per 90 days of the goal's length, each with a go test and a no-go test.
3. **Backlog.** Fill `Priority`, `Verify` and `Stop if` in `## Change backlog`. Every row cites a gap. Order by: unblocks the most rows, then closes the largest gap before the next milestone, then least effort. Mark exactly **one** row `active`.
4. **Blocked top row.** Mark it `blocked`, add an open stop for the owner, and make the smallest safe unblocked row active.
5. **Confirm.** Show the owner the new sections. The owner confirms the targets before the first check-in.

## Re-plan when

- A milestone is reached or missed
- Health is at-risk or worse
- Every 4 check-ins (GA-D-06)
- The owner changes the scope

A re-plan changes the backlog, never the target. Show the backlog change in chat before writing. A removed row becomes `retired` with a dated reason in `## Action trace`, and is never deleted. A re-plan isn't a review.

## Write

Only the engagement file (the sections above, plus one `## Action trace` row) and its row in the Goal_Agent INDEX engagement register (health, active row, next milestone).
