---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Agent Operating Instructions
Topic: POSIWID_Analysis
Status: Active
agent_grounding: false
agent_maintenance: false
---

# Agent Operating Instructions — POSIWID_Analysis

Follow root [`../../AGENTS.md`](../../AGENTS.md). Read [`INDEX.md`](INDEX.md) before searching file bodies.

## Domain rules

- Keep the five questions worded as in [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md). Change the wording only when Marc approves it.
- The form keeps everything in the browser (POS-D-02). Don't add analytics, a backend, or any request that sends form content off the device unless Marc decides to.
- Example text in the form must be invented and generic. No real plant, line, part, supplier or person names (PUB-D-03).
- The form's output front matter follows [`../../Persona/Artifact_Metadata_Standard.md`](../../Persona/Artifact_Metadata_Standard.md). Keep the two in step.
- The site build mounts `app/` at `/posiwid` through `scripts/build-site.sh`. If you rename or move `app/`, update that script in the same pull request.
- Marc merges every pull request (PUB-D-04).
