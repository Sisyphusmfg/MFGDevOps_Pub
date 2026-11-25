---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Blog Post
doc_type: record
Status: Draft
agent_grounding: false
title: "Thank you for writing it down: what a harness engineering article changed in my repositories"
category: Systems
date: 2026-12-01
summary: "Trackmind's article on harness engineering gave me a checklist to hold my machine-first setup against. Here is what it found and what I changed in a day."
---

Every so often someone publishes the thing you were trying to say, and says it better. Last week that was Trackmind, with an X article called [Harness Engineering: How to Fix Your Agent Without Changing the Model](https://x.com/0xTrackmind/status/2124105677748527453). I want to say thank you, in public, because writing like that is a gift. Somebody spent their time turning hard-won practice into something a stranger can use the same day. I used it the same day.

## What the article argues

The short version: when an agent fails, the usual reflex is to blame the model, rewrite the prompt, or try a bigger model. Trackmind argues that most of those failures come from the environment around the model, the harness, and that the harness is the part you actually own. The article breaks the harness into parts: a contract that says what done means, a map of where to look, tools that fail loudly, state kept in files, sensors that can come back red, exits that stop a loop, walls that limit damage, and traces that turn the last failure into the next fix.

One line has stuck with me all week: sensors "let it be wrong out loud." That is the whole difference between a check and a hope.

## Holding my setup up against it

I've been building what I call a machine-first architecture: repositories where every folder has a routing index, a decision log, agent instructions and a human README, so that people and AI agents can find the same answers by the same path. I wrote about where it started in [From README to rulebook](/blog/from-readme-to-rulebook/).

So I asked an agent to read the article and score my setup against it, part by part, using what the files and git history actually showed rather than what the instructions claimed. That is the POSIWID habit: judge a system by what it does.

The result was humbling in a useful way.

- **Strong:** the map (short indexes that route a question in two hops), state in files (decision tables, status files, one activity-log file per agent action) and traces (a harness feedback log where agents record where the normal path failed).
- **Partial:** sensors and exits. There were checks that could fail, but not for the things that mattered most, and "stop and ask me" was written down as a rule rather than built in.
- **Missing:** a contract. Nothing said what done meant before the work started. My register-audit hook also failed quietly: it ran, logged a problem, and let the agent carry on as if nothing were wrong. And there was no standard place for work in flight, so a new session could see what was finished but not what was half done.
- **Unverified:** the walls. My instructions said agents never push straight to main. Nothing in the repository proved that GitHub actually enforced it.

## What I changed in a day

Every one of these came straight from the article's checklist:

1. **A contract on every pull request.** The pull request template now has a `done_when` section, written before the work: a list of conditions a reviewer can check and that could come back false. Each one is reported under the checks that were run.
2. **A sensor for the activity log.** Agents were supposed to add a log entry with every change. Now a CI check fails any pull request that doesn't add one, or adds a malformed one.
3. **A sensor for secrets.** A secret scan runs on every pull request's commits and fails it on a find. "Never write a password into a file" was a rule; now it is also a check.
4. **State for work in flight.** Work that will span more than one session gets a progress file from a template: the current step, what was tried, what is blocked, what comes next. It is closed with an outcome when the work ends.
5. **A loud tool.** The register-audit hook now fails the edit when the index and the files disagree, and sends the agent back to fix it before it stops.
6. **Walls I actually checked.** I opened the repository rules in GitHub and confirmed what they enforce: pull requests only, no force pushes, no branch deletion, and required checks that must pass before merge. Then I wrote down the gap that remains: required approvals is zero, so "agents never merge" is still a rule, not a wall.

None of this needed a different model. It needed a better environment, which was the article's point.

## Why publishing matters

I don't know Trackmind. I found the article because someone shared it, and I could use it because it was concrete: named parts, a worked example, a build order. That is what makes shared knowledge travel. A vague essay would have made me nod. A checklist made me change six things.

It is also the reason I keep a public version of this work, in [MFGDevOps_Pub on GitHub](https://github.com/Sisyphusmfg/MFGDevOps_Pub), and the reason this blog exists. Manufacturing knowledge has always lived in people's heads and in binders nobody reads. The more of us who write down how our systems actually work, and how we fixed them when they didn't, the faster everyone else gets to the next fix.

So: thank you, Trackmind, for writing it down. It made my repositories better within a day of reading it.
