---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Status Report
doc_type: record
Topic: Goal_Agent — live status
Status: Active
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# Goal_Agent Status

| Field | Value |
|-------|-------|
| Scope | Public goal method and the goal form at `/goals` |
| Overall status | Form and method written, in review (PR #4). Not deployed |
| Next action | Marc reviews and merges PR #4. Workers Builds deploys |

## POSIWID snapshot

| Question | Answer |
|----------|--------|
| What is it doing? | The goal method exists only privately. The public directory lists Goal Agent as Planned |
| What is it expected to do? | Let anyone write a goal an AI can pursue under the owner's control, and hand the method plus the goal to any assistant in one paste |
| Gap | No public method and no form |
| Change | Publish the method reference and the goal form, with a "Prompt for an AI" output |
| Measurable change | Goals run with the prompt. Baseline 0 (2026-11-22). Current 0. Target: Marc runs one real goal through an AI with the prompt, to at least one check-in in the specified format. Check: the check-in shows pace arithmetic and a health state |

## Open items

| ID | Priority | Item | Detail |
|----|----------|------|--------|
| GA-OI-01 | High | First live check | After deploy: `curl -sI https://sisyphusdev.com/goals/` returns `200`. Record it here |
| GA-OI-02 | Medium | Marc approves the method wording | Then set `agent_grounding: true` on the method reference |
| GA-OI-03 | Closed 2026-11-22 | Import from a POSIWID file | Done in PR #4 (GA-D-04): upload on the Goal page, or "Start a goal" on the POSIWID page. Tested locally both ways |
