---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Template
Topic: POSIWID simulation template
Status: Active
doc_type: record
agent_grounding: false
agent_maintenance: true
---

# POSIWID simulation template

One file per diagnostic, saved beside it, with one block per step 4 change. Fill every section. Write `unresolved` where the input is missing, rather than inventing it. The file is a prediction: diagnostic step 1 stays the observation.

````markdown
---
Contributed By: Marc Dugas
Last Updated: YYYY-MM-DD
Document Type: POSIWID Simulation
Topic: POSIWID simulation — [system, change]
Status: Draft
doc_type: record
agent_grounding: false
agent_maintenance: true
authority_rank: —
Source: [diagnostic path, step 4 change ID]
---

# POSIWID Simulation — [system]

> A prediction of observed behavior, not a record of what the system does. `agent_grounding: false`. Writing it doesn't adopt the change.

**Diagnostic:** [path]
**Design:** [path, or none]
**Observer and boundary:** [copied from the diagnostic, and not widened here]

## Change C[n]: [short name]

**Diagnostic step 4:** [the proposed change]
**Adoption:** proposal. This file doesn't adopt it.

### Assumptions

- [Each assumption. Anything without supplied evidence is tagged `assumption`.]

### Simulated observed behavior

[What an observer would record as the system's consistent outputs if this change were in effect. Describe behavior. Don't write the target and call it the behavior.]

### Simulated measurements

| Measure | Current (diagnostic step 5) | Simulated value | Target (diagnostic step 5) | Evidence that would confirm or refute |
|---------|-----------------------------|-----------------|----------------------------|---------------------------------------|
| | | | | |

### Predicted remaining gap

[The simulated behavior against the expectation (diagnostic step 2, or design step 1). "None" is allowed only when the assumptions support it.]

## Revision log

Newest last. Never edit an earlier row. When evidence arrives, add a row, write the observation into the diagnostic, then update the simulated sections.

| When | Evidence | Predicted before | Observed | Updated simulated behavior |
|------|----------|------------------|----------|----------------------------|
| | | | | |
````
