---
Contributed By: Marc Dugas
Last Updated: 2026-11-22
Document Type: Governance Standard
Topic: POSIWID diagnostic grounding
Status: Active
doc_type: canonical-spec
agent_grounding: true
agent_maintenance: true
authority_rank: 1
Source: Public version of Marc's POSIWID grounding rule
---

# POSIWID Diagnostic Grounding

Which POSIWID files an answering agent may cite, and for what. Same rule as Marc's private repo (PUB-D-06).

| File | `agent_grounding` | May be cited for |
|------|-------------------|------------------|
| Diagnostic (`doc_type: forensic-analysis`, usually `POSIWID_*.md`) | **true** by default | The observation, expectations and gaps it records. The domain INDEX gives it a rank-1 row |
| Change proposed inside a diagnostic (step 4) | (part of the diagnostic) | Nothing, as an adopted change. It stays a proposal until a `DECISIONS.md` row or a separate approved artifact adopts it |
| Design (`doc_type: posiwid-design`) | **false** until the owner approves it, then true | The approved expectations, outputs and controls |
| Facilitation draft (`doc_type: facilitation-draft`, `POSIW-FAC-*`) | **false** until promoted | Nothing |
| Simulation (`Document Type: POSIWID Simulation`) | **false**, always | Nothing. A prediction is not an observation |
| `DECISIONS.md` | false | Nothing. It holds the choice, not the observation |

- The owner may set any one analysis to `agent_grounding: false`. An explicit false always wins.
- A diagnostic isn't an issue-status register and isn't an executive brief.
- `posiwid-analyst` saves diagnostics, designs and simulations. `posiwid-facilitator` saves facilitation drafts only.
