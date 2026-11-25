---
title: Persona — Domain Index
doc_type: readme-index
domain: persona
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# Persona — Domain Index

Repo-wide rules for `MFGDevOps_Pub`: the methods that agents follow (POSIWID and the goal agent), the metadata standard, decisions that apply to the whole repo, and the shared agent activity log.

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-22 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How to run POSIWID work: origin, five questions, design executable, two-container facilitation, root expectations, diagnostic executable and loop, constant-failure test, simulations, sources | [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md) *(Draft)* | 1 |
| Which POSIWID files (diagnostics, designs, drafts, simulations) an agent may cite | [`POSIWID_Diagnostic_Grounding.md`](POSIWID_Diagnostic_Grounding.md) | 1 |
| How AI manages goals: gates, AI rules, limits, pace and health, reviews, closing | [`POSIWID_Design_Goal_Agent.md`](POSIWID_Design_Goal_Agent.md) *(Draft)* | 1 |
| How machine-first works, and how to scaffold a new domain (four files, routing, front matter, decision table) | [`../.agents/skills/machine-first-scaffold/SKILL.md`](../.agents/skills/machine-first-scaffold/SKILL.md) | 1 |
| Front matter, file naming, decision IDs, and what may be published | [`Artifact_Metadata_Standard.md`](Artifact_Metadata_Standard.md) | 1 |
| Why this repo exists, the public-only rule, who merges, where methods live, the grounding rule | [`DECISIONS.md`](DECISIONS.md) PUB-D-01 to PUB-D-07 *(HITL — not for grounding)* | — |
| What an agent did recently | [`Agent_Activity_Log.md`](Agent_Activity_Log.md) (format and entries before 2026-11-24) → newest entries are the last files in `Agent_Activity_Log/` | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-24 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-24 | — | HITL *(not for grounding)*. PUB-D-01 repo created; PUB-D-02 public versions, not copies; PUB-D-03 no private links (CI); PUB-D-04 same machine-first format, Marc merges; PUB-D-05 agent methods live in Persona; PUB-D-06 POSIWID grounding rule; PUB-D-07 `main` protected by ruleset |
| [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md) | 2026-11-24 | 1 | POSIWID method, credited to Stafford Beer (*The Heart of Enterprise*, 1979): background, five questions, design executable with mechanism check, two-container facilitation, root expectations, prompt swaps, diagnostic executable and loop, constant-failure test, diagnostic sequence, adoption, simulations, common mistakes, sources. Moved from Workstreams/POSIWID_Analysis and expanded (PUB-D-05). Draft, `agent_grounding: false` |
| [`POSIWID_Diagnostic_Grounding.md`](POSIWID_Diagnostic_Grounding.md) | 2026-11-22 | 1 | Which POSIWID files can be cited: diagnostics true by default, designs after approval, drafts and simulations never (PUB-D-06) |
| [`POSIWID_Design_Goal_Agent.md`](POSIWID_Design_Goal_Agent.md) | 2026-11-24 | 1 | POSIWID design of the goal agent: expectations, outputs, gates, AI rules, limits and cadence, goal parts, pace and health, reviews, closing, measurable change, where it is carried out. Replaces Workstreams/Goal_Agent/Goal_Method_Reference.md (PUB-D-05). Draft, `agent_grounding: false` |
| [`Artifact_Metadata_Standard.md`](Artifact_Metadata_Standard.md) | 2026-11-22 | 1 | Public edition of the metadata standard: fields, naming, public-only content, never-stored list |
| [`Agent_Activity_Log.md`](Agent_Activity_Log.md) | 2026-11-24 | — | Agent log format and the 15 entries written before 2026-11-24 (PUB-D-09). New entries are one file each in `Agent_Activity_Log/` (PUB-D-08). `agent_grounding: false`. |

## Agent layer register (outside this folder, owned here)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`../.agents/skills/machine-first-scaffold/SKILL.md`](../.agents/skills/machine-first-scaffold/SKILL.md) | 2026-11-24 | 1 | Self-contained machine-first method and domain scaffold (PUB-D-12). Pointers in `.claude/skills/` and `.cursor/skills/` |
| [`../.agents/skills/machine-first-scaffold/references/templates.md`](../.agents/skills/machine-first-scaffold/references/templates.md) | 2026-11-24 | 1 | Templates for INDEX, DECISIONS, AGENTS and README |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../README.md`](../README.md) |
| Reference | [`../Reference/INDEX.md`](../Reference/INDEX.md) |
| Sisyphusdev_Site | [`../Workstreams/Sisyphusdev_Site/INDEX.md`](../Workstreams/Sisyphusdev_Site/INDEX.md) |
