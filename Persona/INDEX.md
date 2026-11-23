---
title: Persona — Domain Index
doc_type: readme-index
domain: persona
Contributed By: Marc Dugas
Last Updated: 2026-11-22
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
| How to run a POSIWID analysis: five questions, missing expectations, diagnostic vs design, feedback loop | [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md) *(Draft)* | 1 |
| How AI manages goals: gates, AI rules, limits, pace and health, reviews, closing | [`POSIWID_Design_Goal_Agent.md`](POSIWID_Design_Goal_Agent.md) *(Draft)* | 1 |
| Front matter, file naming, decision IDs, and what may be published | [`Artifact_Metadata_Standard.md`](Artifact_Metadata_Standard.md) | 1 |
| Why this repo exists, the public-only rule, who merges, where methods live | [`DECISIONS.md`](DECISIONS.md) PUB-D-01 to PUB-D-05 *(HITL — not for grounding)* | — |
| What an agent did recently | [`Agent_Activity_Log.md`](Agent_Activity_Log.md) *(entries not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-22 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-22 | — | HITL *(not for grounding)*. PUB-D-01 repo created; PUB-D-02 public versions, not copies; PUB-D-03 no private links (CI); PUB-D-04 same machine-first format, Marc merges; PUB-D-05 agent methods live in Persona |
| [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md) | 2026-11-22 | 1 | POSIWID method, credited to Stafford Beer (*The Heart of Enterprise*, 1979): five questions, no-expectations rule, diagnostic vs design, feedback loop, common mistakes. Moved from Workstreams/POSIWID_Analysis (PUB-D-05). Draft, `agent_grounding: false` |
| [`POSIWID_Design_Goal_Agent.md`](POSIWID_Design_Goal_Agent.md) | 2026-11-22 | 1 | POSIWID design of the goal agent: expectations, outputs, gates, AI rules, limits and cadence, goal parts, pace and health, reviews, closing, measurable change, where it is carried out. Replaces Workstreams/Goal_Agent/Goal_Method_Reference.md (PUB-D-05). Draft, `agent_grounding: false` |
| [`Artifact_Metadata_Standard.md`](Artifact_Metadata_Standard.md) | 2026-11-22 | 1 | Public edition of the metadata standard: fields, naming, public-only content, never-stored list |
| [`Agent_Activity_Log.md`](Agent_Activity_Log.md) | 2026-11-22 | — | Shared agent log. `agent_grounding: false`. Eight entries (scaffold; deploy fix and POSIWID form; logo; logo correction; Goal Agent; POSIWID-to-goal import; goal agent layer; methods moved to Persona) |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../README.md`](../README.md) |
| Reference | [`../Reference/INDEX.md`](../Reference/INDEX.md) |
| Sisyphusdev_Site | [`../Workstreams/Sisyphusdev_Site/INDEX.md`](../Workstreams/Sisyphusdev_Site/INDEX.md) |
