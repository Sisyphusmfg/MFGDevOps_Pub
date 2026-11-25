---
name: machine-first-scaffold
description: Explain the machine-first method and scaffold a folder into a machine-first domain (INDEX, DECISIONS, AGENTS, README). Self-contained; works in any git repository. Use for "scaffold a new domain", "make this folder machine-first", "how does machine-first work", or when a project, workstream or goal needs a domain of its own.
---

# machine-first-scaffold

This skill is self-contained. It describes the whole method and carries every template it needs in [`references/templates.md`](references/templates.md). It needs no other file, tool or service. Copy this folder into any repository and it works.

## What machine-first is

A machine-first repository is organized so an AI agent can find the right document by **routing**, not by searching. Searching file bodies is slow, picks up drafts and stale copies, and gives an agent no way to tell a fact from a guess. Routing answers the question "which file is authoritative for this?" before any file is read.

The method has five parts:

1. **Domains.** Content is split into folders, one per subject (a project, a workstream, a method, a site). Each domain is self-describing.
2. **Four files per domain.** Every domain folder has the same four files, each with one job:

   | File | Job | Agents may cite it? |
   |------|-----|---------------------|
   | `INDEX.md` | Routing: which question goes to which document, plus a register of every file in the folder | Yes. It is the canonical route |
   | `DECISIONS.md` | Why things are the way they are: one row per decision, made or approved by a person | No. Human-in-the-loop record only |
   | `AGENTS.md` | How an agent behaves in this folder: what it may write, what it must not do | No. Instructions, not facts |
   | `README.md` | Onboarding for a person reading the folder for the first time | No. It defers routing to INDEX |

3. **Two-hop routing.** An agent reads the root `README.md` to find the domain, then the domain `INDEX.md` to find the document. It reads at most two routing files before it opens the answer. It does not search file bodies until the route fails.
4. **Front matter on every document.** Each Markdown file starts with a YAML block that says what it is and whether an agent may rely on it (fields below). Non-Markdown files (code, config, images) get a row in their domain INDEX instead.
5. **Authority is explicit.** A document is citable only when its INDEX row routes to it at `authority_rank: 1` and its front matter says `agent_grounding: true`. Everything else (drafts, notes, decisions, archives) is context, not fact.

### Front matter

| Field | Required | Meaning |
|-------|----------|---------|
| `Contributed By` | Yes | Who owns the content |
| `Last Updated` | Yes | `YYYY-MM-DD`; change it with every edit |
| `Document Type` | Yes | Human label: Domain Index, Procedure, Record, Decisions Log… |
| `doc_type` | Yes | Machine label: `readme-index`, `canonical-spec`, `procedure`, `checklist`, `record`, `decisions-log`, `posiwid-design`, `forensic-analysis` |
| `Status` | When it applies | `Draft`, `Active`, `Superseded`, `Archived`. The four routing files are always `Active`; maturity belongs on the documents they route to |
| `agent_grounding` | Yes | `true` lets agents cite the file. Default `false` |
| `agent_maintenance` | When it applies | `true` lets agents edit the file |
| `authority_rank` | When it applies | `1` is authoritative; higher numbers support |
| `Source` | When it applies | Where the content came from |

The block must parse as YAML: quote any value that contains `: ` or starts with a special character (`*`, `&`, `!`, `|`, `>`, `%`, `@`, `` ` ``). Never put passwords, keys, tokens or account numbers in any file.

### Decisions

Every `DECISIONS.md` keeps its decisions in one table:

`| Date | Decision | Rationale | Status | Superseded by |`

- The Decision cell starts with an ID and a title: `<PREFIX>-D-NN — title`, where `<PREFIX>` is short and unique to the domain.
- Status is one of `proposed`, `adopted`, `superseded`, `rejected`. Only a person adopts or rejects; an agent records what the person said, in their words.
- `Superseded by` holds the ID of the replacing decision, and is filled only when Status is `superseded`.
- **One decision per row.** When a later decision replaces part of an earlier one, split the earlier row first: the replaced part gets its own row and ID, marked `superseded`, and the rest stays as it was.
- Open questions and work queues go in their own tables under their own headings. They are not decision tables.

### Keeping it true

- When a file is added, changed or removed, update its row in the domain INDEX register (date and description) in the same change.
- An INDEX routes. It does not carry notes about approval or grounding; those live in the file's front matter and in DECISIONS.
- A file named in an INDEX that is not on disk is marked `⚠️ Missing on disk`, not silently dropped.
- An operated system (a site, a service, a running process) gets a `<Domain>_Status.md` with its live state, written from command output, not from memory.
- `Archive/` holds the past. It is never cited.

## When to use this skill

- A new project, workstream, method or site needs a home.
- An existing folder works but agents keep searching it; promote it to four-file routing.
- A goal or project needs a domain of its own.
- Someone asks how machine-first works: explain the sections above.

## Inputs

- **Target path:** the domain folder, e.g. `Workstreams/<Name>/`.
- **Domain name:** human title for the INDEX.
- **Domain id:** lowercase, hyphenated, for the INDEX `domain:` field.
- **Decision prefix:** short and unique in the repository, e.g. `SITE`, `QA`.
- **Owner:** the person who makes the decisions.

## Phase A — Create the four files

Copy the four templates from [`references/templates.md`](references/templates.md) into the target folder and fill in the placeholders. Do not leave a placeholder in a file you commit.

## Phase B — Fill the INDEX

1. List every file already in the folder (skip `Archive/`). Add each to the document register with its date, `authority_rank` and a one-line description.
2. Write the question rows: for each question a reader is likely to ask, name the one document that answers it.
3. Mark any file the routes name that is not on disk as `⚠️ Missing on disk`.

## Phase C — Design, if the domain runs a system

If the domain will operate something (a process, a service, a site), write a short design next to it before building: what the system is expected to do, the outputs that show it is doing it, how each output is checked, and the documents the system needs to run. Register it in the INDEX. A domain that only holds reference material skips this.

## Phase D — Domain created for a goal or project

When a domain is created because a specific goal or project needs one:

1. Make the first row of its `DECISIONS.md` the decision that created it, naming the goal or project and linking to where it was approved.
2. Register the goal or project file in the new INDEX and add a question row such as "What is this domain for, and how is success measured?" that routes to it.
3. If the repository keeps a register of goals or projects, add a row there pointing to the new domain.
4. Create only the files the goal needs. No placeholder or empty documents.

## Phase E — Connect it

1. Add a row for the new domain to the root `README.md` (where to find each domain).
2. Add it to the domain list in the root `AGENTS.md`, if the repository has one.
3. Add a cross-link row to each peer domain that relates to it.

## Phase F — Check

1. Every file in the folder has front matter that parses, or an INDEX row if it is not Markdown.
2. The INDEX register and the files on disk match, both ways.
3. Ask three to five real questions. Each one reaches its answer through root README → domain INDEX → document, without searching file bodies. If one doesn't, add the missing question row.
