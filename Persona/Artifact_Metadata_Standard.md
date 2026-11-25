---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Governance Standard
Status: Active
doc_type: canonical-spec
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# Artifact Metadata Standard

This is Marc's machine-first metadata standard. Every `.md` file starts with YAML front matter. Non-markdown files (code, configs, scripts, images, JSON) get a register row in their domain `INDEX.md`.

| Field | Required | Values |
|-------|----------|--------|
| Contributed By | Yes | Marc Dugas |
| Last Updated | Yes | `YYYY-MM-DD` |
| Document Type | Yes | Status Report, Procedure, Checklist, Record, Domain Index, Folder README, Agent Operating Instructions… |
| Status | When applicable | Draft · Active · Open · Closed · Superseded · Archived |
| doc_type | Yes | `readme-index` · `canonical-spec` · `posiwid-design` · `procedure` · `checklist` · `forensic-analysis` · `decisions-log` · `record` |
| agent_grounding | Yes | `true` means agents may cite it. Default `false` |
| agent_maintenance | When applicable | `true` means agents may update this file |
| authority_rank | When applicable | `1` = authoritative. Higher numbers = supporting |
| Source | When applicable | Where the content came from (command output, public vendor docs, a published paper) |

Machine-first routing files (`AGENTS.md`, `INDEX.md`, `DECISIONS.md`, `README.md`) are always `Status: Active`. Draft, Proposed and other maturity marks belong on the documents those files route to.

## File naming

- Dated records: `YYYY-MM-DD_<Domain>_<Topic>.<ext>`, e.g. `2026-11-22_SisyphusdevSite_FirstDeploy.md`.
- Living documents: `Topic_Name.md`, with no date.
- Decision IDs: `<DOMAIN>-D-NN` (e.g. `PUB-D-01`, `SDEV-D-01`). Open items: `<DOMAIN>-OI-NN`.

## Public-only content (PUB-D-03)

- No GitHub link to a `Sisyphusmfg` repository other than `MFGDevOps_Pub`.
- No internal names, people, suppliers, customer or part numbers, or business figures.
- `Source:` may name public sources only.

## Never stored

Passwords, passphrases, API keys or tokens, connection strings with credentials, SSNs, government ID numbers, and bank, card, account, ERP or customer account numbers.
