---
title: POSIWID_Analysis — Domain Index
doc_type: readme-index
domain: posiwid-analysis
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Domain Index
Status: Active
authority_rank: 1
source_of_truth: true
agent_grounding: true
agent_maintenance: true
---

# POSIWID_Analysis — Domain Index

The public POSIWID method ("the purpose of a system is what it does") and the guided form at sisyphusdev.com/posiwid that walks anyone through a five-question analysis.

## Document Control

| Field | Value |
|-------|-------|
| Authority | Domain INDEX — canonical routing |
| Owner | Marc Dugas |
| Last Updated | 2026-11-22 |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---------------------------|------------------------|------|
| How to do a POSIWID analysis: the five questions, missing expectations, diagnostic vs design, the feedback loop | [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md) *(Draft; grounding waits on Marc)* | 1 |
| The guided entry form: what it asks and what it outputs | [`app/index.html`](app/index.html) | 1 |
| Whether the form is live, and open items | [`POSIWID_Analysis_Status.md`](POSIWID_Analysis_Status.md) | 1 |
| Why the form runs in the browser only, and why it's at a path, not a subdomain | [`DECISIONS.md`](DECISIONS.md) POS-D-01 to POS-D-03 *(HITL — not for grounding)* | — |

## Document register (on-disk)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`INDEX.md`](INDEX.md) | 2026-11-22 | 1 | This file — domain router |
| [`README.md`](README.md) | 2026-11-22 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-22 | — | Domain agent instructions |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-22 | — | HITL *(not for grounding)*. POS-D-01 public domain; POS-D-02 browser-only form; POS-D-03 served at `/posiwid` |
| [`POSIWID_Method_Reference.md`](POSIWID_Method_Reference.md) | 2026-11-22 | 1 | Public method, credited to Stafford Beer (*The Heart of Enterprise*, 1979): five questions, no-expectations rule, diagnostic vs design, feedback loop, common mistakes. Draft, `agent_grounding: false` |
| [`POSIWID_Analysis_Status.md`](POSIWID_Analysis_Status.md) | 2026-11-22 | 1 | Live state: form written, not deployed; open items POS-OI-01 to -03 |
| [`app/index.html`](app/index.html) | 2026-11-22 | 1 | Guided form, crediting Stafford Beer, with the site logo and tab icon: system details, questions 1–5, repeatable gaps and changes, progress checklist, live Markdown output with front matter, copy and download. Draft kept in the browser's local storage only |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Root | [`../../README.md`](../../README.md) |
| Sisyphusdev_Site (hosting and build) | [`../Sisyphusdev_Site/INDEX.md`](../Sisyphusdev_Site/INDEX.md) |
| Persona | [`../../Persona/INDEX.md`](../../Persona/INDEX.md) |
