---
title: POSIWID_Analysis — Domain Index
doc_type: readme-index
domain: posiwid-analysis
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# POSIWID_Analysis — Domain Index

POSIWID work in public: the agent layer (posiwid-facilitator, posiwid-analyst and two skills) that runs analyses in this repo, the facilitation template and analysis register, and the guided form at sisyphusdev.com/posiwid. The method itself lives in Persona (PUB-D-05).

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-22 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How to do a POSIWID analysis: the five questions, missing expectations, diagnostic vs design, the feedback loop | [`../../Persona/POSIWID_Method_Reference.md`](../../Persona/POSIWID_Method_Reference.md) *(method authority in Persona, PUB-D-05; Draft, grounding waits on Marc)* | 1 |
| **How an AI agent runs POSIWID work in this repo**: modes, where files go, checkpoints | [`../../.agents/skills/posiwid-analysis/SKILL.md`](../../.agents/skills/posiwid-analysis/SKILL.md) | 1 |
| Facilitation (two containers, de-facto definition, gap table, mechanism check) | [`../../.agents/agents/posiwid-facilitator.md`](../../.agents/agents/posiwid-facilitator.md) · [`facilitation-workflow.md`](../../.agents/skills/posiwid-analysis/references/facilitation-workflow.md) · [`POSIWID_Facilitation_Session_Template.md`](POSIWID_Facilitation_Session_Template.md) | 1 |
| Designs, diagnostics, promotion | [`../../.agents/agents/posiwid-analyst.md`](../../.agents/agents/posiwid-analyst.md) · [`design-template.md`](../../.agents/skills/posiwid-analysis/references/design-template.md) · [`analysis-template.md`](../../.agents/skills/posiwid-analysis/references/analysis-template.md) | 1 |
| Predicting the result of a change | [`../../.agents/skills/posiwid-measurement-simulator/SKILL.md`](../../.agents/skills/posiwid-measurement-simulator/SKILL.md) | 1 |
| Which POSIWID files can be cited | [`../../Persona/POSIWID_Diagnostic_Grounding.md`](../../Persona/POSIWID_Diagnostic_Grounding.md) | 1 |
| Which analyses exist | Analysis register, below | 1 |
| The guided entry form: what it asks and what it outputs | [`app/index.html`](app/index.html) | 1 |
| The design form (expectations, expected outputs, expected controls on the outputs): what it asks and what it outputs | [`design-app/index.html`](design-app/index.html) | 1 |
| Whether the form is live, and open items | [`POSIWID_Analysis_Status.md`](POSIWID_Analysis_Status.md) | 1 |
| Why the forms run in the browser only, and where they are served | [`DECISIONS.md`](DECISIONS.md) POS-D-01 to POS-D-06 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-24 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-24 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-24 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-24 | — | HITL *(not for grounding)*. POS-D-01 public domain; POS-D-02 browser-only form; POS-D-03 served at `/posiwid`; POS-D-04 agent layer; POS-D-05 public analyses only (active) |
| [`POSIWID_Facilitation_Session_Template.md`](POSIWID_Facilitation_Session_Template.md) | 2026-11-22 | 1 | Template for `Sessions/POSIW-FAC-*` drafts: intake, problem container, de-facto definition (C1), expectations, gap table (C2), outputs, mechanism check (C-MECH), controls, handoff (C3), concerns |
| [`POSIWID_Analysis_Status.md`](POSIWID_Analysis_Status.md) | 2026-11-24 | 1 | Live state: form written, not deployed; open items POS-OI-01 to -03 |
| [`app/index.html`](app/index.html) | 2026-11-24 | 1 | Guided form, crediting Stafford Beer, with the site logo (`/logo-small.png`) and tab icon: system details, questions 1–5, repeatable gaps and changes, progress checklist, live output with two tabs, "Analysis" (Markdown with front matter) and "Prompt for an AI" (method + analysis, GA-D-02), copy and download, and a "Start a goal" button that opens the Goal form filled from this analysis (GA-D-04). Draft kept in the browser's local storage only |
| [`design-app/index.html`](design-app/index.html) | 2026-11-24 | 1 | POSIWID Design form (POS-D-06), served at `purpose.sisyphusdev.com/design/` in System Design and Analysis: expectations E1…, each with many expected outputs (O1.1…, with evidence) and many controls (K1.1…, naming the output they act on, with frequency); progress checks; Markdown or AI-prompt output; draft kept in local storage |

## Agent layer register (outside this folder, owned here)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`../../.agents/agents/posiwid-facilitator.md`](../../.agents/agents/posiwid-facilitator.md) | 2026-11-22 | 1 | Facilitator: rules, phases 0–7, draft, handoff brief |
| [`../../.agents/agents/posiwid-analyst.md`](../../.agents/agents/posiwid-analyst.md) | 2026-11-22 | 1 | Analyst: design, diagnostic, promotion, simulation; save workflow |
| [`../../.agents/skills/posiwid-analysis/SKILL.md`](../../.agents/skills/posiwid-analysis/SKILL.md) | 2026-11-22 | 1 | Modes, file locations, facilitation, design, diagnostic, promotion, routing |
| [`../../.agents/skills/posiwid-analysis/references/`](../../.agents/skills/posiwid-analysis/references/) | 2026-11-22 | 1 | `facilitation-workflow.md`, `design-template.md`, `analysis-template.md`, `posiwid-checklist.md` |
| [`../../.agents/skills/posiwid-measurement-simulator/SKILL.md`](../../.agents/skills/posiwid-measurement-simulator/SKILL.md) | 2026-11-22 | 1 | Predict and revise the result of a step 4 change; `references/simulation-template.md` |
| `.claude/` and `.cursor/` `skills/posiwid-*`, `agents/posiwid-*` | 2026-11-22 | — | Pointers to the canonical files above |

## Analysis register

Facilitation drafts live in `Sessions/`. Designs and diagnostics live in the domain of the system analyzed, or in `Analyses/` if none fits. Simulations sit beside their diagnostic.

| File | System | Type | Status | Grounding | Promoted to |
|------|--------|------|--------|-----------|-------------|
| — | No analyses yet | — | — | — | — |

Type: facilitation-draft · posiwid-design · forensic-analysis · simulation. Status: Draft · Active · promoted · superseded.

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../../README.md`](../../README.md) |
| Sisyphusdev_Site (hosting and build) | [`../Sisyphusdev_Site/INDEX.md`](../Sisyphusdev_Site/INDEX.md) |
| Persona | [`../../Persona/INDEX.md`](../../Persona/INDEX.md) |
