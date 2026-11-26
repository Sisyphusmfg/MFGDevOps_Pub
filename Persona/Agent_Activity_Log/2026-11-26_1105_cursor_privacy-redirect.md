---
Document Type: Agent Activity Entry
doc_type: record
Status: Active
agent_grounding: false
Agent: Cursor Grok, cloud agent session
Timestamp: "2026-11-26T11:05:00-05:00"
Pull Request: this pull request
Decisions: none
---

# 2026-11-26T11:05:00-05:00 — Cursor (cloud agent session)

After pull request #21 merged, a fetch of `https://sisyphusdev.com/privacy` returned 307. The Worker rewrote `/privacy` to `/privacy/index.html`, and assets HTML handling redirects that path back to `/privacy`, so the notice did not load. Moved the notice to `privacy.html`, which assets serves at `/privacy` with status 200, and stopped rewriting the path. Rollback: revert this pull request. Merging publishes the corrected notice.
