---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Template
doc_type: canonical-spec
Status: Active
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# Machine-first domain templates

Templates for the four files of a machine-first domain, used by the `machine-first-scaffold` skill. Replace every `[placeholder]`. Dates are `YYYY-MM-DD`.

## INDEX.md

````markdown
---
title: [Domain Name] — Domain Index
doc_type: readme-index
domain: [domain-id]
Contributed By: [Owner]
Last Updated: [YYYY-MM-DD]
Document Type: Domain Index
Status: Active
authority_rank: 1
agent_grounding: true
agent_maintenance: true
---

# [Domain Name] — Domain Index

[One or two sentences: what this domain holds and what it is for.]

## Document Control

| Field | Value |
|-------|-------|
| Domain | [domain-id] |
| Owner | [Owner] |
| Last Updated | [YYYY-MM-DD] |
| Parent | Root `README.md` |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---|---|---|
| Why a choice was made | [`DECISIONS.md`](DECISIONS.md) | — |

## Document register (on-disk)

| File | Updated | Rank | Description |
|------|---------|------|-------------|
| [`README.md`](README.md) | [YYYY-MM-DD] | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | [YYYY-MM-DD] | — | Agent instructions for this domain |
| [`DECISIONS.md`](DECISIONS.md) | [YYYY-MM-DD] | — | Decision log (human-in-the-loop) |

## Cross-links

| Domain | INDEX |
|--------|-------|
| [Peer domain] | [`../[Peer]/INDEX.md`](../[Peer]/INDEX.md) |
````

## DECISIONS.md

````markdown
---
title: [Domain Name] — Decisions Log
doc_type: decisions-log
Contributed By: [Owner]
Last Updated: [YYYY-MM-DD]
Document Type: Decisions Log
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — [Domain Name]

Why things are the way they are. Not for citing as fact.

| Date | Decision | Rationale | Status | Superseded by |
|------|----------|-----------|--------|---------------|
| [YYYY-MM-DD] | [PREFIX]-D-01 — [Domain created for …] | [Who decided, in their words, and why] | adopted |  |
````

Rules: one decision per row; status `proposed`, `adopted`, `superseded` or `rejected`; `Superseded by` only when superseded; split a row before replacing part of it.

## AGENTS.md

````markdown
---
title: [Domain Name] — Agent Instructions
doc_type: readme-index
Contributed By: [Owner]
Last Updated: [YYYY-MM-DD]
Document Type: Agent Operating Instructions
Status: Active
agent_grounding: false
---

# Agent instructions — [Domain Name]

Follow the root `AGENTS.md` first. This file adds what is specific to this folder.

- Route through [`INDEX.md`](INDEX.md) before reading other files here.
- Allowed write paths: [this folder, and any others].
- Record a decision only when [Owner] states it, quoting their words. Never mark one `adopted` yourself.
- Update the INDEX register row of every file you change.
````

## README.md

````markdown
---
title: [Domain Name]
doc_type: readme-index
Contributed By: [Owner]
Last Updated: [YYYY-MM-DD]
Document Type: Folder README
Status: Active
agent_grounding: false
---

# [Domain Name]

[What this folder is, for a person new to it, in a short paragraph.]

To find a document, start at [`INDEX.md`](INDEX.md).
````
