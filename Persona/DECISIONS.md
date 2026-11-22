---
title: Persona — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Persona (repo-wide)

Human-in-the-loop rationale for decisions that apply to the whole repo. **Not** for answering-agent grounding.

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-11-22 | PUB-D-01: Marc Dugas created `Sisyphusmfg/MFGDevOps_Pub` for things he publishes publicly. GitHub `main` is the only write path. The private MFGDevOps repository stays 100% private. | Marc stated this in chat. It keeps one clear line between public and private work. | active |
| 2026-11-22 | PUB-D-02: Projects move here as accessible public versions of private work. They are rewritten for a public reader, not copied. | Marc said he will move accessible versions of his other projects into the public space. Rewriting is how internal details stay out. | active |
| 2026-11-22 | PUB-D-03: No links to the private repository may exist on the webpage, and none anywhere in this repo. CI enforces it with `.github/workflows/public-link-check.yml`. | Marc set the rule for the webpage. Extending it to the whole repo and checking it in CI stops a link slipping in without anyone noticing. | active |
| 2026-11-22 | PUB-D-04: Same machine-first architecture and format as the private repo: four-file domains, two-hop routing, front matter, activity log, reversibility. Marc merges every pull request. | Marc said the machine-first architecture shall exist in the public repo in the same format as the private repo. | active |
