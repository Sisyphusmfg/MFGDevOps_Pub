---
title: Persona — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Persona (repo-wide)

Human-in-the-loop rationale for decisions that apply to the whole repo. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status | Superseded by |
|------|----------|-----------|--------|---------------|
| 2026-11-22 | PUB-D-01 — Marc Dugas created `Sisyphusmfg/MFGDevOps_Pub` for things he publishes publicly. GitHub `main` is the only write path. The private MFGDevOps repository stays 100% private. | Marc stated this in chat. It keeps one clear line between public and private work. | adopted |  |
| 2026-11-22 | PUB-D-02 — Projects move here as accessible public versions of private work. They are rewritten for a public reader, not copied. | Marc said he will move accessible versions of his other projects into the public space. Rewriting is how internal details stay out. | adopted |  |
| 2026-11-22 | PUB-D-03 — No links to the private repository may exist on the webpage, and none anywhere in this repo. CI enforces it with `.github/workflows/public-link-check.yml`. | Marc set the rule for the webpage. Extending it to the whole repo and checking it in CI stops a link slipping in without anyone noticing. | adopted |  |
| 2026-11-22 | PUB-D-04 — Same machine-first architecture and format as the private repo: four-file domains, two-hop routing, front matter, activity log, reversibility. Marc merges every pull request. | Marc said the machine-first architecture shall exist in the public repo in the same format as the private repo. | adopted |  |
| 2026-11-22 | PUB-D-05 — The methods agents follow live in Persona, as in the private repo: `POSIWID_Method_Reference.md` and `POSIWID_Design_Goal_Agent.md`. Skills, agents, forms and domain pages carry them out and route back to Persona. | Marc: "It's the personas that contain the methods for POSIWID and Goals for agents." | adopted |  |
| 2026-11-22 | PUB-D-06 — POSIWID grounding is the same as in Marc's private repo. A diagnostic is citable by default for what it records, a design is citable once the owner approves it, and facilitation drafts and simulations are never citable. Written in `POSIWID_Diagnostic_Grounding.md`. | Brought across with the POSIWID skills at Marc's request, carrying over the rule he had already adopted privately. | adopted |  |
| 2026-11-22 | PUB-D-07 — `main` is protected by the GitHub ruleset "Protect main" (ID 27867792): restrict deletions, block force pushes, require a pull request (0 approvals, conversations resolved), require the `check` status, no bypass. Merged branches are deleted automatically. Dependabot alerts and the dependency graph are on. The Workers Builds check is not required. | Marc asked to protect `main` and had Claude apply it (2026-11-22). Approvals stay at 0 because agents work under Marc's account and he can't approve his own PRs. To change it: Settings → Rules → Rulesets → Protect main. | adopted |  |
| 2026-11-24 | PUB-D-08 — Each activity-log entry is its own file in `Persona/Agent_Activity_Log/`, named `YYYY-MM-DD_HHMM_<agent>_<topic>.md` (America/New_York time). Entries are not registered one by one in an INDEX. | Marc, 2026-11-24: "The agent log file fix needs to go there." Appends to one shared file make concurrent pull requests conflict; new files never do. | adopted |  |
| 2026-11-24 | PUB-D-09 — Entries written before 2026-11-24 stay in `Agent_Activity_Log.md` as frozen history. The file keeps the entry format; nothing new is appended to it. | Keeps the existing record unchanged instead of splitting it into one file per entry. | adopted |  |
| 2026-11-24 | PUB-D-10 — Decision tables use `Date \| Decision \| Rationale \| Status \| Superseded by`, with status `proposed`, `adopted`, `superseded` or `rejected` | Marc, 2026-11-24: "Fix the decisions files also per the new method." The Decision cell starts with `<PREFIX>-D-NN — title`. `active` in the existing records means `adopted`. `Superseded by` holds the replacing decision ID and is filled only when Status is `superseded`. Each DECISIONS.md keeps its decisions in one table; open-work and unresolved-question tables are not decision tables. | adopted |  |
| 2026-11-24 | PUB-D-11 — Each decision row holds exactly one decision | Marc, 2026-11-24, same instruction. When a later decision replaces part of an earlier one, split the earlier row first so the replaced part has its own row, marked `superseded` with its `Superseded by` ID. No row in this repo was partly superseded on 2026-11-24. | adopted |  |
