---
title: Blog
doc_type: readme-index
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Folder README
Status: Active
agent_grounding: false
---

# Blog

The source for the sisyphusdev blog at [blog.sisyphusdev.com](https://blog.sisyphusdev.com/). Each post is one Markdown file in `posts/`. When a change merges to `main`, the site build turns every published post into a page.

To write a post, copy [`Post_Template.md`](Post_Template.md). To see the blog locally, drafts included, run this from the repo root:

```bash
bash scripts/build-site.sh && node scripts/build-blog.mjs Workstreams/Blog/posts dist/blog --drafts && npx wrangler dev
```

To find a document, start at [`INDEX.md`](INDEX.md).
