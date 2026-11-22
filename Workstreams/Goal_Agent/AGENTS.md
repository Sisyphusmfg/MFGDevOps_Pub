---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Agent Operating Instructions
Topic: Goal_Agent
Status: Active
agent_grounding: false
agent_maintenance: false
---

# Agent Operating Instructions — Goal_Agent

Follow root [`../../AGENTS.md`](../../AGENTS.md). Read [`INDEX.md`](INDEX.md) before searching file bodies.

## Domain rules

- The method text exists in two places: [`Goal_Method_Reference.md`](Goal_Method_Reference.md) for people, and `method()` in [`app/index.html`](app/index.html) for the AI. Change both in the same pull request. Marc approves changes to gates, health thresholds or AI rules.
- The AI prompt must keep the three gates and the rule that only the owner marks COMPLETE (GA-D-02).
- The form keeps everything in the browser (GA-D-03). Don't add analytics, a backend, or a direct call to an AI service unless Marc decides to.
- Example text must be invented and generic. No real plant, line, part, supplier or person names (PUB-D-03).
- The site build mounts `app/` at `/goals` through `scripts/build-site.sh`. If you move `app/`, update that script in the same pull request.
- Marc merges every pull request (PUB-D-04).
