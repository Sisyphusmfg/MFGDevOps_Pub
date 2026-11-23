---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Checklist
Topic: POSIWID checklist
Status: Active
doc_type: checklist
agent_grounding: false
agent_maintenance: true
---

# POSIWID checklist

Skill: [../SKILL.md](../SKILL.md)

## Every mode

- [ ] The analysis is fine to publish (PUB-D-03, POS-D-05)
- [ ] Front matter per `Persona/Artifact_Metadata_Standard.md`
- [ ] A row in the POSIWID_Analysis INDEX analysis register (and the file's own domain INDEX)
- [ ] An activity-log entry in the same pull request, with a rollback path

## Facilitation

- [ ] Intake: boundary, observer, stakeholders, target domain
- [ ] Phase 1: problem container (pain only)
- [ ] Phase 2: de-facto definition → **C1** confirmed
- [ ] Phase 3: a root expectation for each de-facto clause
- [ ] Phase 4: gap table → **C2** confirmed
- [ ] Phase 5: expected outputs with observable evidence
- [ ] Phase 5A: mechanism check offered, and `accepted` or `declined` recorded → **C-MECH**
- [ ] Phase 6: controls sketch (optional), keeping open mechanism gaps
- [ ] Saved at `Workstreams/POSIWID_Analysis/Sessions/POSIW-FAC-…`, `facilitation-draft`, `agent_grounding: false`
- [ ] **C3:** owner approves the handoff

## Design

- [ ] 1 Expectations · 2 Outputs (observable evidence, execution artifact column) · 3 Controls · 4 Execution artifacts
- [ ] `posiwid-design`, `agent_grounding: false` until **C4** approval
- [ ] A diagnostic run planned for after go-live
- [ ] The source draft linked, if promoted

## Diagnostic

- [ ] Observer, boundary, constant-failure test
- [ ] 1 Doing · 2 Expected (with source) · 3 Gaps (with evidence) · 4 Changes (gap, owner, rollback) · 5 Measurable change (baseline, current, target, how to check) · ↻ Loop
- [ ] `forensic-analysis`, `agent_grounding: true` unless the owner sets it false
- [ ] A rank-1 INDEX row. Unresolved choices in `DECISIONS.md`

## Adoption of a diagnostic finding

- [ ] A `DECISIONS.md` row records what was accepted, and from which analysis
- [ ] Design revised and execution artifacts created or updated, as separate files
- [ ] The diagnostic stays as the record of what was observed
