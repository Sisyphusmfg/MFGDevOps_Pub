---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Method Reference
Status: Draft
doc_type: canonical-spec
agent_grounding: false
agent_maintenance: true
authority_rank: 1
Source: Stafford Beer, The Heart of Enterprise (1979), Diagnosing the System for Organizations (1985), "What is cybernetics?" (2002); public version of Marc's POSIWID method
---

# POSIWID Method Reference — Public Edition

**POSIWID: the purpose of a system is what it does.** Judge a system by what it reliably does, not by what it was designed, said or meant to do. When a system keeps producing an outcome, that outcome is, in practice, what the system is for, until something changes it.

This is the method authority for POSIWID work by people and by agents in this repo (PUB-D-05). The agent layer ([`posiwid-facilitator`](../.agents/agents/posiwid-facilitator.md), [`posiwid-analyst`](../.agents/agents/posiwid-analyst.md), and the skills [`posiwid-analysis`](../.agents/skills/posiwid-analysis/SKILL.md) and [`posiwid-measurement-simulator`](../.agents/skills/posiwid-measurement-simulator/SKILL.md)) and the form at [purpose.sisyphusdev.com/posiwid](https://purpose.sisyphusdev.com/posiwid/) carry it out. Whether an analysis can be cited is set by [`POSIWID_Diagnostic_Grounding.md`](POSIWID_Diagnostic_Grounding.md).

## Credit and background

POSIWID comes from Stafford Beer, the British cybernetician, who described the method in his 1979 book *The Heart of Enterprise* and restated it in a 2001 address, published in 2002 as "What is cybernetics?". The phrase is Beer's. The acronym came later. Beer offered it as a plain starting point for understanding a system, better than guessing at good intentions, blame or ignorance.

Two ideas carry the method:

- **Nominal purpose:** what the system is said to be for (the mission, charter, spec or policy).
- **De-facto purpose:** what its consistent outputs show it actually does.

The gap between them is the finding. It's an invitation to discover *how* the system produces the result, not an accusation of bad faith.

POSIWID is a heuristic, not a full methodology. It diagnoses; it doesn't redesign. That's why the method below has two executables, one for new systems and one for existing ones, joined by a feedback loop.

## The five questions (the core)

| # | Question | What a good answer has |
|---|----------|------------------------|
| 1 | **What is the system doing?** | Observed behavior, as a camera would record it, with evidence: data, logs, dates. No reasons or intentions yet |
| 2 | **What is the system expected to do?** | One agreed expectation and where it comes from: a spec, a standard, a customer, a target |
| 3 | **What are the gaps between the expectations and what the system is doing, if any?** | Each gap points back to an observation in 1 and an expectation in 2, with its evidence and impact |
| 4 | **What could be done to close the gaps?** | Specific changes, each naming the gap it closes, an owner, and how to roll it back |
| 5 | **What is the measurable change to the system?** | One measure with a **baseline**, a **current value** and a **target**, plus how anyone can check it and when |

If nobody can answer question 2, stop and define the expectations first (see § A, Facilitation). Without an agreed expectation, a "gap" is only an opinion.

## A. Design executable (new systems)

Use it when designing a new system, process, workflow or domain.

| Step | Question | Content |
|------|----------|---------|
| **1** | **What are the expectations?** | Purpose, constraints, stakeholders, and success at the level of intent |
| **2** | **What are the expected outputs?** | Concrete, observable deliverables or behaviors the system must produce, each with observable evidence and the execution artifact it needs |
| **2A** | **Mechanism check (offered)** | Do we understand how the system will produce those outputs? Offer an "explain the mechanism" check. The owner accepts or declines, and the answer is recorded |
| **3** | **What are the control methods for the outputs?** | How each output is measured, gated and corrected, and how often |
| **4** | **What execution artifacts must exist?** | SOPs, procedures, engineering or physical designs, each a separate file linked from step 2 |

A design predicts behavior. After go-live, run the diagnostic executable (§ B) against it. A mechanism nobody can explain is a design gap. Record it as one, and don't paper over it with a confident-sounding control.

### Facilitation: problems without expectations

The most common stall in design work: people can list everything wrong with today's system, but can't say what the system should achieve or what evidence would prove it. The answer is **two containers**.

| Container | Holds | Facilitator's stance |
|-----------|-------|----------------------|
| **Problem container** | Current pain, failures, friction, history. This is diagnostic material: what the system *is doing* | "Yes, capture all of it here. Nothing is lost." |
| **Expectation container** | What the system must achieve, intent and constraints. This is design step 1 and then step 2 | "Now let's translate: what do we want instead?" |

**Rules**

1. Problems are welcome, in the problem container only. Don't mix them into expectation language.
2. Nothing is thrown away. The problem container is real input for the gap analysis and the baseline.
3. Movement is explicit. The facilitator moves items from one container to the other, and never assumes the group will sort them.
4. People aren't the problem. Describing the problem over and over is a conversational loop, and the containers let the group leave it without losing face.
5. Outputs come after expectations. Once expectations exist, add the observable evidence for each.

**Room script:** "We have a place for everything that's wrong today, and I'll keep filling it. Separately, we need a place for what we want the system to do. I'll help move items across when you're ready. We don't have to solve both in the same sentence."

### Root expectations from the de-facto definition

Once the problem container is full enough, write **one clear statement of what the system is doing today**, the de-facto definition. It should be problematic but accurate: what the system reliably produces, not what the charter says.

*Example:* "This system routes every request through three manual handoffs and returns no status until the last step is complete."

Then ask what must be true *instead*, one clause at a time. The gap appears side by side:

| De-facto (what it does) | Root expectation (what it must do) | Gap |
|-------------------------|------------------------------------|-----|
| Three manual handoffs | One owner visible end to end | Handoffs and ownership |
| No status until complete | The customer sees status within 4 hours | Visibility and delay |

This works because people already agree that the de-facto definition is wrong: they helped write it. Expectations arrive as corrections to observed behavior, not as wish lists, and gaps come out specific and checkable.

**Root expectation questions** (ask against each de-facto clause):

- If the system stopped doing [X], what would have to be true instead?
- Who should receive [X], and by when, given that today they get [Y]?
- What decision should this system enable that [the de-facto behavior] blocks today?
- What must never happen again?
- If the purpose is what it does, is this outcome acceptable? If not, what outcome is?
- What would we see on an ordinary Tuesday if [this clause] were fixed?

**Prompt swaps**

| Weak prompt | Stronger prompt |
|-------------|-----------------|
| "What do you want?" | "What would a good week look like for your team?" |
| "Define the requirements." | "What decision should this system let you make that you can't make today?" |
| "Stop being negative." | "Keep the problem list. Pick the top three we must get rid of first." |
| Abstract goals | "Show me the report, screen or handoff that would prove we're there." |

Start small: one workflow, one observable output, one measure, before widening the scope.

**One-line anchor:** problems describe the past and present. Expectations and outputs describe the future the group is willing to be held to. Until those exist, stay in diagnostic mode: useful, but not yet design.

## B. Diagnostic executable (existing systems)

Use it to analyze what a system actually does. It's the five questions plus a feedback loop.

| Step | Question | Beer's terms |
|------|----------|--------------|
| **1** | What is the system doing? | Observed behavior; de-facto purpose from consistent outputs |
| **2** | What is it expected to do? | Nominal purpose: stated intent, design, policy |
| **3** | What are the gaps? | The difference between nominal and de-facto: the POSIWID insight |
| **4** | What could be changed to close the gaps? | Leverage points. These stay proposals until adopted |
| **5** | What is the measurable change? | Measures, baseline, current value, target, how to check |
| **↻** | **Feedback loop** | Measure again, compare with the expectations, revise the expectations if the evidence warrants it, and run again |

The loop is cybernetic. Closing a gap doesn't only mean forcing the system to meet a fixed expectation. Measurement can show that the expectation was wrong. Then update the expectation and run the analysis again, which may feed a revised design and new execution artifacts.

Every diagnostic states **the observer** (whose perspective), **the system boundary** (what's in and out), and **why it passes the constant-failure test**.

### The constant-failure test and when to drop the inference

Impute a de-facto purpose only where the system **consistently** produces the outcome and **isn't being reformed** even though it could be (Beer, *Diagnosing the System for Organizations*, 1985, p. 99). One-off failures, hard trade-offs and plain mistakes aren't POSIWID cases.

Drop the POSIWID reading when:

- the output isn't consistent
- the system is being actively reformed
- an outside shock or a resource limit explains the output better
- keeping the claim means ignoring other major outputs

POSIWID generates hypotheses. It never proves.

### Diagnostic sequence

1. Write down the stated (nominal) purpose.
2. Observe the actual, consistent behavior and outputs, side effects included.
3. Infer the de-facto purpose: what purpose would those outputs rationally serve?
4. Surface and interpret the gap, without accusation.
5. Find the leverage points for change. Knowing what a system actually regulates lets you change it without making things worse.

### From finding to adoption

A diagnostic can be cited for what it records (see [`POSIWID_Diagnostic_Grounding.md`](POSIWID_Diagnostic_Grounding.md)). A change proposed in step 4 is adopted only by a `DECISIONS.md` row or a separate approved artifact, such as a revised design, an SOP or an engineering design. The diagnostic file stays as the record of what was observed.

### Predicting the result of a change

Before adopting a step 4 change, you can predict what an observer would record if it were in effect, and what the step 5 measures would read. The prediction lives in its own file, never in step 1, and is revised as evidence arrives. The skill [`posiwid-measurement-simulator`](../.agents/skills/posiwid-measurement-simulator/SKILL.md) holds the rules.

## Common mistakes

- **Explaining instead of observing in question 1.** "Operators are careless" is a theory. "12 of 40 changeovers skipped step 4" is an observation.
- **An expectation with no source.** If you can't say where an expectation comes from, it's a preference.
- **Changes with no gap.** Every change should close a named gap.
- **A measure nobody can repeat.** If someone else can't run the same check and get the same number, it isn't a measure yet.
- **POSIWID as a gotcha.** Pinning one sinister purpose on a complex system with many conflicting purposes is misuse. Two honest observers can read the same system differently. Name your observer.

## Selected sources

- Beer, S. *The Heart of Enterprise*. Wiley, 1979.
- Beer, S. *Diagnosing the System for Organizations*. Wiley, 1985, p. 99.
- Beer, S. "What is cybernetics?" *Kybernetes* 31(2), 2002.
- Meadows, D. *Thinking in Systems*. Chelsea Green, 2008: a parallel formulation of purpose from behavior.

## Tools

- The guided form at [purpose.sisyphusdev.com/posiwid](https://purpose.sisyphusdev.com/posiwid/) walks through the five questions and produces a Markdown file, or a prompt that gives any AI this method plus your analysis.
- An AI agent working in this repo uses `posiwid-facilitator` for facilitation and `posiwid-analyst` for designs, diagnostics, promotion and simulations.
