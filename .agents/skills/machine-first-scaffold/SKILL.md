---
name: machine-first-scaffold
description: Scaffold a folder into a machine-first domain in this repository (INDEX, DECISIONS, AGENTS, README), following Persona/Machine_First_Method.md. Use for "scaffold a new domain", "make this folder machine-first", or when a project, workstream or goal needs a domain of its own.
---

# machine-first-scaffold

Repository scaffolding for a new machine-first domain. The method it applies, the rules for routing, authority and decisions, lives in [`Persona/Machine_First_Method.md`](../../../Persona/Machine_First_Method.md). Front matter fields are in [`Persona/Artifact_Metadata_Standard.md`](../../../Persona/Artifact_Metadata_Standard.md). Read both before scaffolding; if this skill and a Persona file disagree, the Persona file wins (PUB-D-05). The file templates are in [`references/templates.md`](references/templates.md).

## When to use

- A new project, workstream, method or site needs a home in this repository.
- An existing folder works, but agents keep searching it; promote it to four-file routing.
- A goal or project needs a domain of its own.

## Inputs

- **Target path:** the domain folder, e.g. `Workstreams/<Name>/`.
- **Domain name:** human title for the INDEX.
- **Domain id:** lowercase, hyphenated, for the INDEX `domain:` field.
- **Decision prefix:** short and unique in the repository, e.g. `SITE`, `QA`.
- **Owner:** the person who makes the decisions.

## Phase A — Create the four files

Copy the four templates from [`references/templates.md`](references/templates.md) into the target folder and fill in the placeholders. Don't leave a placeholder in a file you commit.

## Phase B — Fill the INDEX

1. List every file already in the folder (skip `Archive/`). Add each to the document register with its date, `authority_rank` and a one-line description.
2. Write the question rows: for each question a reader is likely to ask, name the one document that answers it.
3. Mark any file the routes name that isn't on disk as `⚠️ Missing on disk`.

## Phase C — Design, if the domain runs a system

If the domain will operate something (a process, a service, a site), write a POSIWID design next to it before building, following [`Persona/POSIWID_Method_Reference.md`](../../../Persona/POSIWID_Method_Reference.md): the expectations, the expected outputs, and the expected controls on those outputs. Register it in the INDEX. A domain that only holds reference material skips this.

## Phase D — Domain created for a goal or project

1. Make the first row of its `DECISIONS.md` the decision that created it, naming the goal or project and linking to where it was approved.
2. Register the goal or project file in the new INDEX and add a question row such as "What is this domain for, and how is success measured?" that routes to it.
3. Add a row to the register that tracks it (for goals, the engagement register in [`Workstreams/Goal_Agent/INDEX.md`](../../../Workstreams/Goal_Agent/INDEX.md)).
4. Create only the files the goal or project needs. No placeholder or empty documents.

## Phase E — Connect it

1. Add a row for the new domain to the root `README.md`.
2. Add it to the Domains table in the root `AGENTS.md`, and to its live write paths.
3. Add a cross-link row to each peer domain that relates to it.
4. Add one activity-log entry file in `Persona/Agent_Activity_Log/` in the same pull request (PUB-D-08), and state the rollback path in the pull request (PUB-D-04).

## Phase F — Check

1. Every file in the folder has front matter that parses as YAML, or an INDEX row if it isn't Markdown.
2. The INDEX register and the files on disk match, both ways.
3. Ask three to five real questions. Each one reaches its answer through root README → domain INDEX → document, without searching file bodies. If one doesn't, add the missing question row.
