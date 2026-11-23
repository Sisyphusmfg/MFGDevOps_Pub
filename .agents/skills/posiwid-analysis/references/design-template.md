---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Template
Topic: POSIWID design template
Status: Active
doc_type: record
agent_grounding: false
agent_maintenance: true
---

# POSIWID design template (new systems)

Save in the domain of the system being designed. The design is the grounding layer for the system once the owner approves it. SOPs, procedures and engineering designs that it requires are separate files, linked from steps 2 and 4.

````markdown
---
Contributed By: Marc Dugas
Last Updated: YYYY-MM-DD
Document Type: POSIWID Design
Topic: POSIWID design — [system name]
Status: Draft
doc_type: posiwid-design
agent_grounding: false
agent_maintenance: true
authority_rank: 1
Source: [facilitation draft path, or "direct"]
---

# POSIWID Design — [system name]

**System boundary:** [what's in scope]
**Owner:** [name]
**Links:** [related files, domain INDEX]

## 1. What are the expectations?

[Purpose, constraints, stakeholders, and success at the level of intent. What the system is *for*.]

*If people can only list current problems, run facilitation first (Persona POSIWID Method Reference § A).*

## 2. What are the expected outputs?

| Output | Description | Observable evidence | Required execution artifact |
|--------|-------------|---------------------|-----------------------------|
| | [Concrete deliverable or behavior] | [How you know it exists and works] | [SOP, procedure or engineering design path, or TBD] |

### Mechanism check

[If promoted from a `POSIW-FAC-*` draft: the offer outcome (accepted or declined). If accepted: which mechanisms were confirmed, and which remain mechanism-design gaps.]

## 3. What are the control methods for the outputs?

| Output | Control method | Mechanism basis or open gap | Measure or gate | Feedback cadence |
|--------|----------------|-----------------------------|-----------------|------------------|
| | | Confirmed · open gap · check declined | | |

[Keep unresolved mechanism gaps visible rather than filling them with unsupported controls.]

## 4. Required execution artifacts

| Artifact | Type | Implements | Status |
|----------|------|------------|--------|
| | SOP · Procedure · Engineering design | [Which outputs and controls] | Draft · Approved · TBD |

## After go-live

Run the diagnostic ([`analysis-template.md`](analysis-template.md)) against this design: diagnostic step 2 ↔ design step 1, step 1 ↔ design step 2, step 5 ↔ design step 3. When diagnostic findings are adopted (a `DECISIONS.md` row), revise this design and the execution artifacts, rather than promoting the diagnostic in place.
````

When the owner approves the design: set `Status: Active` and `agent_grounding: true`, and record the approval date in the domain `DECISIONS.md`.

Each approved execution artifact gets its own file, with `authority_rank: 1`, an INDEX row, and front matter linking back to this design (`doc_type: procedure` for an SOP or procedure).
