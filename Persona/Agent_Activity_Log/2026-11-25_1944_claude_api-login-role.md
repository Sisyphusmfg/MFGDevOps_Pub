---
Document Type: Agent Activity Entry
doc_type: record
Status: Active
agent_grounding: false
Agent: Claude Opus 5.5, claude.ai session
Timestamp: "2026-11-25T19:44:00-05:00"
Pull Request: https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/20
Decisions: SDEV-D-14
---

# 2026-11-25T19:44:00-05:00 — Claude (claude.ai session)

After Marc created `app_api_login` in the Neon Console as the agent had asked, the agent found that Console roles are `neon_superuser` members (bypassrls, createrole, createdb). That would bypass row-level security. The agent created `app_api_web` by SQL on `main` instead: login, no special attributes, member of `app_api` only, no password. Verified as that role: 0 records and 0 requests visible, and `neon_auth.user` denied. Marc sets the password and deletes `app_api_login`. Rollback: `DROP ROLE app_api_web`.
