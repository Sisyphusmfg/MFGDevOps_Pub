---
title: Goal_Agent — Domain Index
doc_type: readme-index
domain: goal-agent
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# Goal_Agent — Domain Index

The public goal method (the owner approves, the AI pursues, the owner judges) and the form at sisyphusdev.com/goals. The form builds a goal record and a prompt that hands the method and the goal to any AI assistant.

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-22 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How the goal method works: gates, what a goal needs, AI rules, pace and health, milestones, closing | [`Goal_Method_Reference.md`](Goal_Method_Reference.md) *(Draft; grounding waits on Marc)* | 1 |
| The goal form, and the exact method text given to an AI | [`app/index.html`](app/index.html) (`method()` in the script) | 1 |
| Whether the form is live, and open items | [`Goal_Agent_Status.md`](Goal_Agent_Status.md) | 1 |
| Why the AI prompt carries the method, and why browser-only | [`DECISIONS.md`](DECISIONS.md) GA-D-01 to GA-D-03 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-22 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-22 | — | HITL *(not for grounding)*. GA-D-01 public domain and form; GA-D-02 AI prompt = method + filled form; GA-D-03 browser-only |
| [`Goal_Method_Reference.md`](Goal_Method_Reference.md) | 2026-11-22 | 1 | Public method: three gates, goal parts, AI rules, pace formula, health thresholds, milestones, reviews, closing. Draft, `agent_grounding: false` |
| [`Goal_Agent_Status.md`](Goal_Agent_Status.md) | 2026-11-22 | 1 | Live state: form written, not deployed; open items GA-OI-01 to -03 |
| [`app/index.html`](app/index.html) | 2026-11-22 | 1 | Goal form: goal, source, measurable change, guardrails and kill criteria, milestones, AI limits, gates. Two outputs: "Prompt for an AI" (method + goal) and "Goal record". Copy or download. Draft kept in local storage only |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../../README.md`](../../README.md) |
| POSIWID_Analysis (the best source for a goal) | [`../POSIWID_Analysis/INDEX.md`](../POSIWID_Analysis/INDEX.md) |
| Sisyphusdev_Site (hosting and build) | [`../Sisyphusdev_Site/INDEX.md`](../Sisyphusdev_Site/INDEX.md) |
