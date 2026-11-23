---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Method Reference
Status: Draft
doc_type: canonical-spec
agent_grounding: false
agent_maintenance: true
authority_rank: 1
Source: Stafford Beer, The Heart of Enterprise (1979); Marc's five-question POSIWID format
---

# POSIWID Method Reference — Public Edition

**POSIWID: the purpose of a system is what it does.** It means you judge a system by what it actually does, not by what it was designed or meant to do. When a system keeps producing an outcome, that outcome is, in practice, what the system is for, until something changes it.

## Credit

POSIWID comes from Stafford Beer, the British cybernetician, who described the method in his 1979 book *The Heart of Enterprise*. The five-question format below is Marc Dugas's working adaptation of Beer's idea.

## The five questions

Describe a system by answering these questions in order.

| # | Question | What a good answer has |
|---|----------|------------------------|
| 1 | **What is the system doing?** | Observed behavior, as a camera would record it, with evidence: data, logs, dates. No reasons or intentions yet |
| 2 | **What is the system expected to do?** | One agreed expectation and where it comes from: a spec, a standard, a customer, a target |
| 3 | **What are the gaps between the expectations and what the system is doing, if any?** | Each gap points back to an observation in 1 and an expectation in 2, with its evidence and impact |
| 4 | **What could be done to close the gaps?** | Specific changes, each naming the gap it closes, an owner, and how to roll it back |
| 5 | **What is the measurable change to the system?** | One measure with a **baseline**, a **current value** and a **target**, plus how anyone can check it and when |

## When there are no clear expectations

If nobody can answer question 2, stop. Define the expectations first. Write down what each stakeholder thinks the system is for, then agree on one statement. Without an agreed expectation, a "gap" is only an opinion.

## Two kinds of analysis

| Kind | Use it for | Output `doc_type` |
|------|-----------|-------------------|
| Diagnostic | An existing system that isn't doing what people expect | `forensic-analysis` |
| Design | A new workflow or system, before it's built | `posiwid-design` |

A design answers question 1 with the predicted behavior. After launch, a diagnostic checks the prediction against what actually happens.

## The feedback loop

Question 5 doesn't end the analysis. Make the change, then measure again:

1. Record the baseline before the change.
2. Make the change, keeping the rollback ready.
3. Check the measure on the date you set. Update the current value.
4. If it moved toward the target, keep the change. If it didn't, or something else got worse, roll back and go back to question 1 with the new observations.

## Common mistakes

- **Explaining instead of observing in question 1.** "Operators are careless" is a theory. "12 of 40 changeovers skipped step 4" is an observation.
- **An expectation with no source.** If you can't say where an expectation comes from, it's a preference.
- **Changes with no gap.** Every change should close a named gap.
- **A measure nobody can repeat.** If someone else can't run the same check and get the same number, it isn't a measure yet.

## Tool

The guided form at [sisyphusdev.com/posiwid](https://sisyphusdev.com/posiwid/) walks through these five questions and produces a Markdown file with front matter.
