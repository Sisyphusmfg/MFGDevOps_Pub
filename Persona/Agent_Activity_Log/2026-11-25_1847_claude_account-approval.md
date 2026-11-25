---
Document Type: Agent Activity Entry
doc_type: record
Status: Active
agent_grounding: false
Agent: Claude Opus 5.5, claude.ai session
Timestamp: "2026-11-25T18:47:00-05:00"
Pull Request: https://github.com/Sisyphusmfg/MFGDevOps_Pub/pull/18
Decisions: SDEV-D-19
---

# 2026-11-25T18:47:00-05:00 — Claude (claude.ai session)

At Marc's request (2026-11-25 18:45, he approves anyone who tries to create an account): closed Neon Auth sign-up on `sisyphusdev-apps` branch `br-cool-mud-bbp8240c` (`disable_sign_up: true`) and removed the shared Google provider; verified 0 users and no OAuth providers. Added SDEV-D-19 (adopted), and to the design the request-access and approval flow (O8), `access_request` and `platform_admin` tables, an approval control and measure, and open decision D6 (how Marc is told about requests). Rollback: re-enable sign-up and Google in Neon Auth; revert this pull request for the docs.
