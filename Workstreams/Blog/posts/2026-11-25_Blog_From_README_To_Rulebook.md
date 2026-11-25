---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Blog Post
doc_type: record
Status: Published
agent_grounding: false
title: "From README to rulebook: turning engineering knowledge into guidance people and agents can follow"
category: Systems
date: 2026-11-25
summary: "How a folder-of-READMEs habit became a machine-first repository that tells people and AI agents what a manufacturing system shall be defined as, or how a workflow shall work."
---

Every programming class teaches the same habit: put a README in each folder that says what the folder is for. If you want to watch a fight start between two engineers, just wait for one to ask where some knowledge source is and the other to answer with "It's in the SharePoint". To get ahead of that, I at least started dropping README files in folders to provide some type of self sufficient bread crumb system.

The arrival of generally accessible AI tools gave me the opportunity to not only leave a little bit of knowledge about what something is, but how to interact with what's in the folder. 

## What I was trying to do

The goal is to turn written engineering knowledge (standards, specifications, design notes, decisions) into guidance that both people and AI can follow about what the manufacturing system shall do. Not a library to browse. A rulebook to act on.

Three things make that hard:

- **Many writers.** People and agents edit the same files, often at the same time.
- **Many readers who don't read the way people do.** An agent asked a question will search, find five files that mention the topic, and has no way to tell the current standard from last month's draft.
- **The cost of being wrong.** Guidance that is stale, unapproved or half-merged gets followed anyway.

A README tells you what a folder is for. It doesn't tell you which file is the answer, whether that file is approved, or who decided it.

## The base: machine-first

I call the structure machine-first: organized so an agent finds the right document by routing, not by searching. It has five parts.

1. **Domains.** One folder per subject: a standard, a workstream, a method.
2. **Four files in every domain**, each with one job:
   - `INDEX.md` routes. It maps the questions people ask to the one document that answers each, and it lists every file in the folder.
   - `DECISIONS.md` records why things are the way they are. A person makes or approves every decision.
   - `AGENTS.md` tells an agent how to behave in that folder: what it may write and what it must not do.
   - `README.md` is still there, for a person reading the folder for the first time. It no longer does the routing.
3. **Two-hop routing.** Root README to domain INDEX to document. No searching file bodies until the route fails. Nothing like Copilot giving you 8-month-old capacity findings to make a decision today. 
4. **Front matter on every document**: what it is, its status, and whether an agent may rely on it.
5. **Explicit authority.** A document can be cited only when its INDEX routes to it at rank 1 and its front matter says agents may ground on it. Drafts, notes and decision logs are context, not fact.

The README habit survives, but in its proper place: onboarding for people. Routing and authority moved into files built for them.

## What changed in one week

The base structure in this repository is about four months old. What changed this week is that it stopped being a set of written conventions and started acting like a system with controls. Each change came from something going wrong in daily use.

**Git became the only place to write.** Earlier in the month, the shared drive copy turned into a read-only backup, refreshed from git every hour. Every change now goes through a pull request, every pull request states how to undo it, and only I merge. Agents propose; a person decides.

**Decisions became data.** The decision logs had drifted into a dozen formats. They now share one table: date, decision, rationale, status, and what superseded it. There are four statuses (proposed, adopted, superseded, rejected), and one decision per row: when a later decision replaces part of an earlier one, the earlier row is split first so the history stays exact. Because the format is strict, a parser can read it. Every decision now loads into a database after each merge, ready for a dashboard. The first load read 156 decisions with zero format problems.

**Goals got their own files.** A goal is not a decision, so it no longer hides in a decision table. A proposal stays a draft until I approve it. Then it becomes its own file in the domain that owns the goal, with one decision row recording that it was activated.

**The activity log stopped causing merge conflicts.** Every agent records what it did in a shared log. With one file and several agents appending at once, every pair of open pull requests collided. Now each entry is its own small file. New files never conflict.

**Written rules became checks.** This was the big shift. A rule that lives only in an instruction file holds only as long as the agent follows it. So the rules that cost the most when broken now have checks that turn a pull request red:
- no activity-log entry, or a malformed one;
- a secret, such as a key or a token, in the changes;
- front matter that doesn't parse, or a folder register that doesn't match the files on disk.

Every pull request now also opens with a `done_when` section: the conditions that make the work finished, written before the work starts. Work that spans more than one session keeps a progress file, so the next session, person or agent picks up from facts instead of chat history.

**The archive folders went away.** I had kept superseded copies in archive folders, another habit from shared drives. Git already keeps every version of every file, and a document's standing is already in its front matter and its INDEX rank. Keeping copies only gave agents more stale files to trip over. This week the archive folders were deleted from this repository.

**Agents report friction instead of working around it.** When an agent is blocked, by a permission, a proxy or a missing tool, it stops, asks me, and logs what happened in a harness feedback file. Repeated problems get fixed in the rules or the scripts, through a normal pull request.

## What I learned

Measured the POSIWID way (the purpose of a system is what it does), the repository was doing something different from what I intended:

- **Doing:** agents searched, found stale copies, and followed whatever they found. Rules held as long as the model remembered them.
- **Expected:** every reader, human or agent, reaches the one approved answer, and every change can be traced and undone.
- **Gap:** most rules were prose. Nothing turned red when one was broken.
- **Change:** route instead of search, make authority explicit, keep one write path, and turn the expensive rules into checks.
- **Measure:** the share of hard rules backed by an automated check. It went up this week, and the goal is every rule whose failure costs rework.

The structure isn't special. Four files per folder, a strict decision table and a few CI checks are ordinary engineering. What made the difference was treating the knowledge base as a manufacturing system in its own right, with inputs, outputs, controls and a person who signs off.

## What's next

The decision database is ready for a live dashboard. The progress files will get the same treatment, so open work shows where it is blocked and on whom. And these methods, including the machine-first method itself, live in this repository, so anyone can copy the structure into their own.
