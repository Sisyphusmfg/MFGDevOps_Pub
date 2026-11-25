---
title: Goal_Agent — Domain Index
doc_type: readme-index
domain: goal-agent
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# Goal_Agent — Domain Index

How AI manages goals in this repo, and in public. It has three layers: the method for people, the agent layer (goal-agent and five skills) that an AI agent working in this repo runs, and the form at sisyphusdev.com/goals that hands the method and a goal to any AI assistant.

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-25 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How the goal method works: gates, what a goal needs, AI rules, pace and health, milestones, closing | [`../../Persona/POSIWID_Design_Goal_Agent.md`](../../Persona/POSIWID_Design_Goal_Agent.md) *(method authority in Persona, PUB-D-05; Draft, grounding waits on Marc)* | 1 |
| **How an AI agent runs a goal in this repo**: the agent, its rules, and which skill does each step | [`../../.agents/agents/goal-agent.md`](../../.agents/agents/goal-agent.md) | 1 |
| Propose, APPROVE and CHARTER | [`../../.agents/skills/goal-execution/SKILL.md`](../../.agents/skills/goal-execution/SKILL.md) | 1 |
| Measurable change, milestones, backlog, re-plan | [`../../.agents/skills/goal-plan/SKILL.md`](../../.agents/skills/goal-plan/SKILL.md) | 1 |
| Check-ins: pace, health, escalation | [`../../.agents/skills/goal-checkin/SKILL.md`](../../.agents/skills/goal-checkin/SKILL.md) | 1 |
| Monthly review, milestone go/no-go, the 3-goal limit | [`../../.agents/skills/goal-review/SKILL.md`](../../.agents/skills/goal-review/SKILL.md) | 1 |
| Closing and the evidence pack | [`../../.agents/skills/goal-close/SKILL.md`](../../.agents/skills/goal-close/SKILL.md) | 1 |
| What a proposal and an engagement file hold | [`Goal_Proposal_Template.md`](Goal_Proposal_Template.md) · [`Goal_Engagement_Template.md`](Goal_Engagement_Template.md) | 1 |
| Which goals exist and their health | Engagement register, below | 1 |
| The goal form, and the exact method text given to an AI | [`app/index.html`](app/index.html) (`method()` in the script) | 1 |
| Whether the form is live, and open items | [`Goal_Agent_Status.md`](Goal_Agent_Status.md) | 1 |
| How a goal is filled from a POSIWID analysis (button or upload), and which fields map | [`app/index.html`](app/index.html) (`parsePosiwid()` and `applyPosiwid()`) | 1 |
| Why the AI prompt carries the method, why browser-only, why POSIWID import, the agent layer and its limits | [`DECISIONS.md`](DECISIONS.md) GA-D-01 to GA-D-07 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-24 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-22 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-25 | — | HITL *(not for grounding)*. GA-D-01 public domain and form; GA-D-02 AI prompt = method + filled form; GA-D-03 browser-only; GA-D-04 start a goal from a POSIWID analysis; GA-D-05 agent layer in the public repo; GA-D-06 limits and cadence; GA-D-07 public goals only (active) |
| [`Goal_Proposal_Template.md`](Goal_Proposal_Template.md) | 2026-11-22 | 1 | Template for `Engagements/GOAL-PROP-YYYYMMDD-topic.md`: source lineage, proposal, APPROVE |
| [`Goal_Engagement_Template.md`](Goal_Engagement_Template.md) | 2026-11-22 | 1 | Template for `Engagements/GOAL-YYYYMMDD-topic.md`: approval, charter, POSIWID snapshot, backlog, measurable change, guardrails, milestones, health, check-ins, reviews, open stops, evidence, trace, closure, COMPLETE |
| [`Goal_Agent_Status.md`](Goal_Agent_Status.md) | 2026-11-25 | 1 | Live state: form written, not deployed; open items GA-OI-01 and -02; GA-OI-03 POSIWID import done |
| [`app/index.html`](app/index.html) | 2026-11-24 | 1 | Goal form: goal, source, measurable change, guardrails and kill criteria, milestones, AI limits, gates. Two outputs: "Prompt for an AI" (method + goal) and "Goal record". Copy or download. Fills from a POSIWID analysis, by upload or by the POSIWID page's "Start a goal" button. Draft kept in local storage only |

## Agent layer register (outside this folder, owned here)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`../../.agents/agents/goal-agent.md`](../../.agents/agents/goal-agent.md) | 2026-11-25 | 1 | Canonical goal-agent: who does what, 10 operating rules, steps and skills |
| [`../../.agents/skills/goal-execution/SKILL.md`](../../.agents/skills/goal-execution/SKILL.md) | 2026-11-22 | 1 | Propose from a primary source, APPROVE, anchor, charter, CHARTER |
| [`../../.agents/skills/goal-plan/SKILL.md`](../../.agents/skills/goal-plan/SKILL.md) | 2026-11-22 | 1 | Measurable change quality test, milestones, backlog order, one active row, re-plan triggers |
| [`../../.agents/skills/goal-checkin/SKILL.md`](../../.agents/skills/goal-checkin/SKILL.md) | 2026-11-22 | 1 | Evidence, facts, pace formula, health thresholds, escalation, entry format |
| [`../../.agents/skills/goal-review/SKILL.md`](../../.agents/skills/goal-review/SKILL.md) | 2026-11-22 | 1 | Monthly and milestone reviews, 0–1 scoring, independent check, six decision options, entry format |
| [`../../.agents/skills/goal-close/SKILL.md`](../../.agents/skills/goal-close/SKILL.md) | 2026-11-22 | 1 | Final measurement, outcomes, evidence pack, look back, tidy without deleting |
| `.claude/skills/goal-*/SKILL.md`, `.cursor/skills/goal-*/SKILL.md`, `.claude/agents/goal-agent.md`, `.cursor/agents/goal-agent.md` | 2026-11-22 | — | Pointers for Claude Code and Cursor to the canonical files above. Not copies |

## Engagement register

Proposals and engagements live in `Engagements/`. Update the row whenever the file changes.

| File | Goal | Status | Health | Active row | Next milestone | Last check-in |
|------|------|--------|--------|------------|----------------|---------------|
| — | No goals yet | — | — | — | — | — |

Status: proposed · approved · chartered · paused · closed (with outcome).

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../../README.md`](../../README.md) |
| POSIWID_Analysis (the best source for a goal) | [`../POSIWID_Analysis/INDEX.md`](../POSIWID_Analysis/INDEX.md) |
| Sisyphusdev_Site (hosting and build) | [`../Sisyphusdev_Site/INDEX.md`](../Sisyphusdev_Site/INDEX.md) |
