---
name: goal-checkin
description: Record progress on a chartered GOAL engagement from evidence, update current values, work out pace against target and set health (on-track, at-risk, off-track, blocked, stale). Use for "log progress on GOAL-…", "how is GOAL-… doing" or when new evidence arrives.
---

# goal-checkin

Method authority: [`Persona/POSIWID_Design_Goal_Agent.md`](../../../Persona/POSIWID_Design_Goal_Agent.md). If this skill and the design disagree, the design wins: say so to the owner.

The control loop: measure, compare, flag drift. Needs `## Measurable change` from `goal-plan`.

## Steps

1. **Evidence.** Read each current value from the source in "How to check". The owner's word counts only with a date. Never write an estimate as a value. Record system state from live output.
2. **Facts.** Note what's been learned since the last check-in, what's no longer true, and what's still to find out.
3. **Pace.** Assume steady progress unless the charter says otherwise, and show the arithmetic:

   ```text
   elapsed  = (today - start) / (target date - start)
   expected = baseline + (target - baseline) × elapsed
   progress = (current - baseline) / (target - baseline)
   pace     = (current - baseline) / (expected - baseline)     1.0 = on plan
   ```

4. **Health** (GA-D-06):

   | Health | Rule |
   |--------|------|
   | on-track | pace 0.9 or more |
   | at-risk | pace 0.7 to under 0.9, or a guardrail moved the wrong way |
   | off-track | pace under 0.7, or a milestone no-go test is met |
   | blocked | the active row is blocked and no unblocked row exists |
   | stale | no check-in for twice the check-in interval |

5. **Backlog.** Mark the active row done or blocked, with its Verify result, and make the next row active.
6. **Escalate.** At-risk or worse: give a one-line likely cause and run a `goal-plan` re-plan. Off-track, or a kill criterion met: add an open stop for the owner. Never change a target here.

## Check-in entry (append under `## Check-ins`, newest last)

```text
### YYYY-MM-DD: check-in
- Current: <metric> = <value> (source: <where, when>)
- Pace: <arithmetic> -> Health: <state> (was <state>)
- Facts: + <learned> / - <no longer true> / ? <to find out>
- Backlog: #<n> done|blocked (verify: <result>); next active: #<m>
- Guardrails: <each: OK or worse>
- Stops: <none | OS-n>
```

## Write

The engagement file (`## Check-ins`, `## Health`, the Current column, backlog status, and one `## Action trace` row) and its row in the Goal_Agent INDEX engagement register.
