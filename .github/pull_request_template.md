## Summary

<!-- What changed and why, in two or three lines. Name the decision IDs (e.g. PUB-D-04). -->

## done_when

<!-- The condition that makes this pull request finished, written before the work (PUB-D-14).
     Each line is something a reviewer can check and that could come back false.
     Example:
     - `python3 scripts/check_front_matter.py` reports 0 errors
     - Persona/INDEX.md routes "how do I X" to the new file at rank 1
     - The page at https://example.com/x returns 200 -->

- 

## Checks run

<!-- Commands run and their results, for each done_when line. -->

## Rollback (PUB-D-04)

<!-- How to undo this change and what the undo restores. Usually: revert this PR.
     If it cannot be undone (data deletion, history rewrite, external send or publication,
     a rename that breaks links, a migration with no way back), write IRREVERSIBLE here
     with the reason and the risk. Marc must approve it explicitly; agents never merge it. -->

Revert this PR.

## Activity log (PUB-D-08, PUB-D-13)

<!-- The entry file this PR adds in Persona/Agent_Activity_Log/. CI fails without one. -->

`Persona/Agent_Activity_Log/YYYY-MM-DD_HHMM_<agent>_<topic>.md`

## Concerns / deviations / findings

<!-- Anything that went differently from the brief, and any blocked network fetch
     (exact host and what needed it). If none: "No blocked network fetch." -->

No blocked network fetch.

<!-- Marc merges every pull request (PUB-D-04). If this changes what sisyphusdev.com serves, say so in the Summary: merging deploys the site (SDEV-D-05). -->
