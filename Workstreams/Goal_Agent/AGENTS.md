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

- **Running goals:** act as [`../../.agents/agents/goal-agent.md`](../../.agents/agents/goal-agent.md) and use its five skills. Proposals and engagements go in `Engagements/`, copied from the templates here, and every one gets a row in the [`INDEX.md`](INDEX.md) engagement register.
- Only goals that are fine to publish (GA-D-07). The owner alone marks APPROVE, CHARTER and COMPLETE.
- The method text exists in three places: [`../../Persona/POSIWID_Design_Goal_Agent.md`](../../Persona/POSIWID_Design_Goal_Agent.md), the method authority (PUB-D-05), the skills in `.agents/skills/goal-*` for agents in this repo, and `method()` in [`app/index.html`](app/index.html) for a pasted AI prompt. Change all three in the same pull request. Marc approves changes to gates, health thresholds or AI rules.
- The AI prompt must keep the three gates and the rule that only the owner marks COMPLETE (GA-D-02).
- The form keeps everything in the browser (GA-D-03). Don't add analytics, a backend, or a direct call to an AI service unless Marc decides to.
- Example text must be invented and generic. No real plant, line, part, supplier or person names (PUB-D-03).
- The site build mounts `app/` at `/goals` through `scripts/build-site.sh`. If you move `app/`, update that script in the same pull request.
- Marc merges every pull request (PUB-D-04).
