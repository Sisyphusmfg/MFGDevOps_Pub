---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Template
Topic: POSIWID diagnostic template
Status: Active
doc_type: record
agent_grounding: false
agent_maintenance: true
---

# POSIWID diagnostic template (existing systems)

Every section is required unless marked optional.

````markdown
---
Contributed By: Marc Dugas
Last Updated: YYYY-MM-DD
Document Type: Forensic Analysis
Topic: POSIWID analysis — [system name]
Status: Active
doc_type: forensic-analysis
agent_grounding: true
agent_maintenance: true
authority_rank: 1
Source: [facilitation draft path, data sources]
---

# POSIWID Analysis — [short title]

> Citable for the observation, expectations and gaps recorded here (Persona POSIWID Diagnostic Grounding). Step 4 changes are proposals until adopted. Not a status register or an executive brief.

**Observer:** [whose perspective]
**System boundary:** [what's in and out]
**Constant-failure test:** [why this qualifies: a consistent output, not being reformed]
**Design reference:** [link to the POSIWID design, if one exists]

## 1. What is the system doing?

[Observed behavior and consistent outputs, with evidence and dates.]

## 2. What is it expected to do?

[Stated intent, policy, design: the nominal purpose. Cite the source, such as design step 1.]

## 3. What are the gaps?

| # | Doing | Expected | Gap | Evidence | Impact |
|---|-------|----------|-----|----------|--------|
| G1 | | | | | |

[How the system produces each gap: an explanation, not an accusation.]

## 4. What could be changed to close the gaps?

| # | Change | Closes | Owner | Rollback |
|---|--------|--------|-------|----------|
| C1 | | G1 | | |

*Proposals until a `DECISIONS.md` row or a separate approved artifact adopts them.*

## 5. What is the measurable change?

| Measure | Baseline (source, date) | Current (source, date) | Target | How to check | Next check |
|---------|-------------------------|------------------------|--------|--------------|------------|
| | | | | | |

## ↻ Feedback loop

- **Measure:** [how and how often]
- **Compare:** [against step 2 and the step 5 targets]
- **Revise expectations:** [when the evidence shows step 2 should change, and how that's recorded]
- **Re-run:** [the next trigger or date]

## Promotion targets (optional, when adoption is expected)

| Adopted finding | Promote to | Owner |
|-----------------|------------|-------|
| | Revised design step, new SOP or engineering design | |
````

## Mapping to Beer

| Step | Beer's terms |
|------|--------------|
| 1 Doing | De-facto purpose, observed behavior |
| 2 Expected | Nominal purpose |
| 3 Gaps | The POSIWID insight |
| 4 Changes | Leverage points (proposals) |
| 5 Measurable change | Regulation and control |
| ↻ Loop | Second-order adjustment of expectations |

To start a goal from a gap, use `goal-agent` (skill `goal-execution`), citing the analysis and the gap number.
