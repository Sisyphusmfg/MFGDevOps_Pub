---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Method Reference
Status: Active
doc_type: canonical-spec
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# Machine-first method

This is the method authority for how this repository is organized, for people and for agents (PUB-D-05, PUB-D-12). The [`machine-first-scaffold`](../.agents/skills/machine-first-scaffold/SKILL.md) skill applies it when a new domain is created. If the skill and this file disagree, this file wins.

## What machine-first is

A machine-first repository is organized so an AI agent finds the right document by **routing**, not by searching. Searching file bodies is slow, picks up drafts and stale copies, and gives an agent no way to tell a fact from a guess. Routing answers "which file is authoritative for this?" before any file is read.

## The five parts

1. **Domains.** Content is split into folders, one per subject: a project, a workstream, a method, a site. Each domain describes itself.
2. **Four files per domain.** Every domain folder has the same four files, each with one job:

   | File | Job | Agents may cite it? |
   |------|-----|---------------------|
   | `INDEX.md` | Routing: which question goes to which document, plus a register of every file in the folder | Yes. It is the canonical route |
   | `DECISIONS.md` | Why things are the way they are: one row per decision, made or approved by a person | No. Human-in-the-loop record only |
   | `AGENTS.md` | How an agent behaves in this folder: what it may write, what it must not do | No. Instructions, not facts |
   | `README.md` | Onboarding for a person reading the folder for the first time | No. It defers routing to INDEX |

   The four routing files are always `Status: Active`. Maturity (Draft, Superseded…) belongs on the documents they route to.
3. **Two-hop routing.** An agent reads the root `README.md` to find the domain, then the domain `INDEX.md` to find the document. It reads at most two routing files before it opens the answer, and it doesn't search file bodies until the route fails.
4. **Front matter on every document.** Each Markdown file starts with a YAML block that says what it is and whether an agent may rely on it. The fields, file naming and decision-ID format are in [`Artifact_Metadata_Standard.md`](Artifact_Metadata_Standard.md). Non-Markdown files (code, config, images) get a row in their domain INDEX instead.
5. **Authority is explicit.** A document is citable only when its INDEX row routes to it at `authority_rank: 1` and its front matter says `agent_grounding: true`. Drafts, notes, decisions and archives are context, not fact.

## Decisions

Every `DECISIONS.md` keeps its decisions in one table (PUB-D-10, PUB-D-11):

`| Date | Decision | Rationale | Status | Superseded by |`

- The Decision cell starts with an ID and a title: `<PREFIX>-D-NN — title`, where `<PREFIX>` is short and unique to the domain.
- Status is one of `proposed`, `adopted`, `superseded`, `rejected`. Only a person adopts or rejects. An agent records what the person said, in their words.
- `Superseded by` holds the ID of the replacing decision, and is filled only when Status is `superseded`.
- **One decision per row.** When a later decision replaces part of an earlier one, split the earlier row first: the replaced part gets its own row and ID, marked `superseded`, and the rest stays as it was.
- Open questions and work queues go in their own tables under their own headings. They are not decision tables.

## Keeping it true

- When a file is added, changed or removed, update its row in the domain INDEX register (date and description) in the same change.
- An INDEX routes. It doesn't carry notes about approval or grounding; those live in the file's front matter and in DECISIONS.
- A file named in an INDEX that isn't on disk is marked `⚠️ Missing on disk`, not silently dropped.
- An operated system (a site, a service, a running process) gets a `<Domain>_Status.md` with its live state, written from command output, not from memory.
- Agents add one activity-log entry per change (PUB-D-08), and every pull request states its rollback path (PUB-D-04).
- `Archive/` holds the past. It is never cited.
