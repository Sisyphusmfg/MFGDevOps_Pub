---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Status Report
doc_type: record
Topic: POSIWID_Analysis — live status
Status: Active
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# POSIWID_Analysis Status

| Field | Value |
|-------|-------|
| Scope | Public POSIWID method and the guided form at `/posiwid` |
| Overall status | Form and method written, in review (PR #2). Not deployed |
| Next action | Marc reviews and merges PR #2. Cloudflare Workers Builds then deploys on push to `main` |

## POSIWID snapshot

| Question | Answer |
|----------|--------|
| What is it doing? | Nothing on the site yet. The method and form are in this repo and not yet deployed |
| What is it expected to do? | Let anyone work through a five-question POSIWID analysis and leave with a file they can use |
| Gap | No public method page and no tool |
| Change | Publish the method reference and the guided form |
| Measurable change | Completed analyses downloaded. Baseline 0 (2026-11-22). Current 0. Target: Marc completes one real analysis with the form and saves the output into a repo. Check: the file exists, with `doc_type` front matter, and all six progress items were done |

## Open items

| ID | Priority | Item | Detail |
|----|----------|------|--------|
| POS-OI-01 | High | First live check | After deploy: `curl -sI https://purpose.sisyphusdev.com/posiwid/` should return `200`. Record it here |
| POS-OI-02 | Medium | Marc approves the method wording | Then set `agent_grounding: true` on the method reference |
| POS-OI-04 | Medium | First analysis run by an agent in this repo | A facilitation draft through C3 and promotion, with register rows |
| POS-OI-03 | Low | Subdomain | Point `posiwid.sisyphusdev.com` at the same Worker, if wanted (POS-D-03) |
