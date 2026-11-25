---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Agent Operating Instructions
Topic: POSIWID_Analysis
Status: Active
agent_grounding: false
agent_maintenance: false
---

# Agent Operating Instructions — POSIWID_Analysis

Follow root [`../../AGENTS.md`](../../AGENTS.md). Read [`INDEX.md`](INDEX.md) before searching file bodies.

## Domain rules

- **Running POSIWID work:** act as [`posiwid-facilitator`](../../.agents/agents/posiwid-facilitator.md) or [`posiwid-analyst`](../../.agents/agents/posiwid-analyst.md), with skill [`posiwid-analysis`](../../.agents/skills/posiwid-analysis/SKILL.md). Drafts go in `Sessions/`. Every POSIWID file gets a row in the [`INDEX.md`](INDEX.md) analysis register.
- Only analyses that are fine to publish (POS-D-05).
- The method lives in Persona (PUB-D-05). It's carried out in three places: the agent layer in `.agents/`, the form's `method()` prompt in `app/index.html`, and the form itself. Change them together.

- Keep the five questions worded as in [`../../Persona/POSIWID_Method_Reference.md`](../../Persona/POSIWID_Method_Reference.md). Change the wording only when Marc approves it.
- The forms keep everything in the browser (POS-D-02). Don't add analytics, a backend, or any request that sends form content off the device unless Marc decides to.
- Example text in the form must be invented and generic. No real plant, line, part, supplier or person names (PUB-D-03).
- The form's output front matter follows [`../../Persona/Artifact_Metadata_Standard.md`](../../Persona/Artifact_Metadata_Standard.md). Keep the two in step.
- The site build mounts `app/` at `/posiwid` and `design-app/` at `/design` through `scripts/build-site.sh`; the routing Worker (`Workstreams/Sisyphusdev_Site/worker/index.mjs`) lists both paths for `purpose.sisyphusdev.com`. If you rename or move either folder, update both in the same pull request.
- The design form asks the three design questions in Marc's wording (POS-D-06): what are the expectations, what are the expected outputs, what are the expected controls on the outputs.
- Marc merges every pull request (PUB-D-04).
