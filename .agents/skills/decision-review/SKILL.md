---
name: decision-review
description: >-
  Walk the owner through a domain's open decisions (rows with status
  `proposed`, plus unresolved open-question rows), one by one, and record what
  the owner chooses. Use for "go through the open decisions", "review the
  proposed decisions in <domain>", "what's still open in <PREFIX>", or any
  request to settle open `*-D-NN` rows.
---

# Decision review

Settle a domain's open decisions with the owner. The agent finds the open rows, gives each one plain context, asks for a choice, frames any row the owner wants to discuss in POSIWID terms, and records only the choices the owner made, in one pull request.

The owner is the judge. The agent never adopts, rejects or rewrites a decision on its own.

## Rules

- Only an explicit answer from the owner changes a row's status. A row the owner skipped, deferred or did not answer stays `proposed`. Silence is not consent.
- One row holds one decision. A narrower or changed version of a row is a new row with a new ID that supersedes the old one. Do not reword an existing decision into a different one.
- Agents assign decision IDs. If the repo has skill **neon-decision-grounding**, run it before you add or supersede a row. If it does not, take the next free number from that domain's `DECISIONS.md` on `main` and from open pull requests that touch it.
- `DECISIONS.md` is HITL maintenance, not grounding. Read it to find the open rows. For the facts behind a row, read the document the row's rationale names, reached through the domain `INDEX.md`.
- Keep recording and doing apart. A pull request that records decisions does not also carry out a change that could break other work, such as a new failing CI gate. Ask the owner whether the change goes in the same pull request or a separate one. Recommend a separate one when it could fail other pull requests or change live behavior.
- Blocked access: stop that line of work and tell the owner what was blocked and what needed it. Do not try another route. Log it in `Persona/Harness_Feedback.md` if the repo has that file. The rest of the review can continue.

## Steps

### 1. Find the domain

- The owner may name a domain, a decision prefix (`PER`, `GM`) or an acronym. Resolve it to a `<PREFIX>-D-` ID pattern: search `DECISIONS.md` files and domain INDEX files in every repo attached to the session.
- If the name does not match a prefix in the first repo you check, check the other repos before you ask. If it matches more than one domain, ask which one.
- Route as the repo's `AGENTS.md` says: root `README.md`, then domain `INDEX.md`, then `DECISIONS.md`.

### 2. Collect the open rows

- Read the domain `DECISIONS.md` on `main`. Pull first; do not trust a stale clone or the Dropbox copy.
- Open rows are decision rows with status `proposed`, and rows in open-question tables (`<PREFIX>-U-NN`) that are not marked resolved.
- Check open pull requests that touch the same `DECISIONS.md`. Note any row that a pull request already changes, so you do not review a row that is about to change.
- For each row, read the domain `*_Status.md` and the document that proposed the row, so you can say why it is open and what depends on it.

### 3. Present the list

Send one message (`SendUserMessage` in cloud sessions) with the repo and file path, then one numbered entry per open row:

- **ID and title**, with the date the row was proposed.
- **The choice in plain words.** If the row is phrased as a question ("whether X stays parallel"), say what each answer would mean.
- **Why it is open**, and anything that depends on it.

Put flags after the list: a check you could not run, a pull request already touching a row, or a conflict between documents. Do not resolve a conflict yourself.

### 4. Ask for a choice

- Use `AskUserQuestion`, with one question per row and at most 4 questions per call. Use more calls if there are more rows.
- Each question must make sense on its own, because the dialog may hide the list. Name the ID and the choice in the question text.
- Write options that fit the row: `Adopt`, `Reject`, `Discuss first`. When a row has more than one adoptable answer, give each answer as its own option (for example `Adopt: failing gate` and `Adopt: advisory only`). Keep option labels short.
- If the session has no `AskUserQuestion`, ask in plain text, numbered to match the list.

### 5. Discuss what the owner wants to discuss

For each row marked `Discuss first`:

- Frame it in POSIWID terms: what the system is doing now, what it is expected to do, the gap, and the measurable change (baseline, current value, target, and how to check it).
- Give 2 or 3 options. State the trade-off of each in one line.
- Give your lean and label it as a lean. The owner decides.
- If the owner picks a changed version, that is a new row that supersedes the old one (see Rules).
- Ask any follow-up questions the recording needs, such as whether a change goes in the same pull request.

### 6. Record the outcomes

Make one branch and one pull request per repo, following that repo's `AGENTS.md` and pull request template.

- **Adopted:** set Status to `adopted`. Add the date and the owner's choice to the rationale, for example `Adopted by Marc 2026-11-27: failing gate.` For a question-style row, the rationale says which answer was chosen.
- **Rejected:** set Status to `rejected`. Add the date and any reason the owner gave.
- **Changed version:** add the new row (step 5), set the old row to `superseded`, and put the new ID in `Superseded by`.
- **Not answered or still in discussion:** leave the row unchanged.
- Update the domain `INDEX.md` register row for `DECISIONS.md` (date and description), and the domain `*_Status.md` next action if it named these rows.
- Add one activity-log entry file. In `Decisions:`, list every ID and its new status.
- In the pull request description, write `done_when` before you edit. For example: each answered row shows the owner's status; unanswered rows are unchanged; the decision-ID collision check passes. Put the rollback path (`Revert this PR`) and any blocked access under Concerns.
- The owner merges. Agents never merge and never turn on auto-merge.

### 7. Report

End with a short table: ID, the owner's choice, and new status. Then give the pull request link and the rows still open. Do not recap the steps.

## Example

The owner asks to "go through the open XYZ decisions". The agent finds `XYZ-D-04` and `XYZ-D-06` in `Workstreams/XYZ/DECISIONS.md`, both `proposed`, and lists them with their context. It asks one `AskUserQuestion` call with two questions. The owner adopts `XYZ-D-04` and marks `XYZ-D-06` `Discuss first`. The agent sends a POSIWID frame for `XYZ-D-06` with three options and a lean. The owner picks a narrower version, which becomes `XYZ-D-09` (ID from **neon-decision-grounding**); `XYZ-D-06` becomes `superseded` with `Superseded by` set to `XYZ-D-09`. One pull request records all of it.
