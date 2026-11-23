---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Agent Operating Instructions
Topic: Persona
Status: Active
agent_grounding: false
agent_maintenance: false
---

# Agent Operating Instructions — Persona

Follow root [`../AGENTS.md`](../AGENTS.md). Read [`INDEX.md`](INDEX.md) before searching file bodies.

## Domain rules

- Only Marc adds or changes decisions in [`DECISIONS.md`](DECISIONS.md). Agents may record a decision Marc states in chat, quoting what he decided.
- Append to [`Agent_Activity_Log.md`](Agent_Activity_Log.md). Never edit or remove an entry.
- Changes to [`Artifact_Metadata_Standard.md`](Artifact_Metadata_Standard.md) need Marc's approval in the pull request.
- **Agent methods live here (PUB-D-05):** [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md), [`POSIWID_Diagnostic_Grounding.md`](POSIWID_Diagnostic_Grounding.md) and [`POSIWID_Design_Goal_Agent.md`](POSIWID_Design_Goal_Agent.md). Skills, agents, forms and domain pages carry a method out and point back here. If they disagree, the Persona file wins. Change a method here first, then the skills in `.agents/` and the form's prompt text in the same pull request. Marc approves method changes.
