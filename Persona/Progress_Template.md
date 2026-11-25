---
title: Progress file template
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Template
doc_type: procedure
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Progress file template (PUB-D-16)

A progress file holds the state of one piece of agent work that runs across more than one session: what is done, what is current, what is blocked, and what comes next. A new session resumes from this file, not from chat. Completed actions still go in the activity log (one entry per pull request). The progress file is for work that isn't finished yet.

## When to keep one

- The work will not finish in one session or one pull request, or
- another agent, host or person may pick it up next.

A one-session change doesn't need one.

## Rules

1. Name it `Persona/Progress/PROGRESS_<Topic>.md` (words joined with underscores). One file per piece of work.
2. Create it in the first pull request of the work, and update it in every later pull request of that work.
3. Before starting, an agent lists `Persona/Progress/PROGRESS_*.md` and reads any with `Status: Active` that match its task.
4. Write facts from command output and files, not from memory. A dead end gets one line, so the next session doesn't try it again.
5. When the work is finished or stopped, set `Status: Closed`, fill in **Outcome**, and leave the file in place as the record. Don't delete it.
6. Register the file in [`INDEX.md`](INDEX.md) (Persona) when it is created, and update its row when its status changes.

## Copy this

```markdown
---
title: "Progress: <topic>"
Contributed By: <owner>
Last Updated: YYYY-MM-DD
Document Type: Progress File
doc_type: record
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Progress: <topic>

## done_when

- <checkable condition that makes this work finished>

## Current step

<one line: what is being done now, by whom>

## Done

- YYYY-MM-DD — <what finished> (PR #, entry file)

## Blocked on

- <what, who must act, since when> — or "nothing"

## Next step

<one line: what the next session does first>

## Dead ends

- <what was tried, why it didn't work>

## Outcome

<filled in when Status becomes Closed>
```
