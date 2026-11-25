---
Document Type: Agent Activity Entry
doc_type: record
Status: Active
agent_grounding: false
Agent: Claude Opus 5.5, claude.ai session
Timestamp: "2026-11-24T21:15:00-05:00"
Pull Request: https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/8
Decisions: SDEV-D-01, SDEV-D-04, SDEV-D-08
---

# 2026-11-24T21:15:00-05:00 — Claude (claude.ai session)

Recorded Marc's words (2026-11-24 21:11): SDEV-D-04 (one Worker, each app at its own path) set to `adopted`. SDEV-D-01's "each app on its own subdomain" clause split out as SDEV-D-08, superseded by SDEV-D-04 (PUB-D-11). Live check: `https://sisyphusdev.com/posiwid/` loads the POSIWID form; `wrangler.jsonc` routes only `sisyphusdev.com` and `www.sisyphusdev.com`. Rollback: revert this pull request.
