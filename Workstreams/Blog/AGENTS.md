---
title: Blog — Agent Instructions
doc_type: readme-index
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Agent Operating Instructions
Status: Active
agent_grounding: false
---

# Agent instructions — Blog

Follow the root `AGENTS.md` first. This file adds what is specific to this folder.

- Route through [`INDEX.md`](INDEX.md) before reading other files here.
- Allowed write paths: this folder, `scripts/build-blog.mjs` and its test, and the blog rows in the Sisyphusdev_Site files.
- **A post is written in Marc's voice. Never set `Status: Published` yourself.** Draft posts only when Marc asks; he publishes. Publishing a post is a publication (PUB-D-04): the pull request says so.
- **Drafts never come to this repository (BLOG-D-06).** A post comes here only when Marc says it is ready, with `Status: Published` set on his word. The build stops on a `Status: Draft` post here.
- Posts are public (PUB-D-03): no internal names, people, suppliers, part numbers or business figures, and no GitHub link to a `Sisyphusmfg` repository other than `MFGDevOps_Pub`.
- Every post file gets a row in the INDEX post register, and its front matter follows [`Post_Template.md`](Post_Template.md).
- Run `node --test scripts/test/build-blog.test.mjs` after changing the build script.
