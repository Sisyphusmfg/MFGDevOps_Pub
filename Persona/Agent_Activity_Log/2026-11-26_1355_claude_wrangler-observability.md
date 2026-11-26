---
Document Type: Agent Activity Entry
doc_type: record
Status: Active
agent_grounding: false
Agent: Claude Opus 5.5, claude.ai session
Timestamp: "2026-11-26T13:55:00-05:00"
Pull Request: https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/24
Decisions: SDEV-D-21
---

# 2026-11-26T13:55:00-05:00 — Claude (claude.ai session)

Added the `observability` block to root `wrangler.jsonc`, matching what Marc turned on in the Cloudflare dashboard: Workers Logs and traces at full sampling, with invocation logs and persistence; issue detection off. Without it, the next deploy would turn observability off. Also SDEV-D-21 in `Workstreams/Sisyphusdev_Site/DECISIONS.md`, a deploy-log row in the status file, and INDEX register rows. Rollback: revert this pull request; the next deploy then turns observability off.
