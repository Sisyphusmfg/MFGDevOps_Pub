---
title: Blog
doc_type: readme-index
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Folder README
Status: Active
agent_grounding: false
---

# Blog

The source for the sisyphusdev blog at [blog.sisyphusdev.com](https://blog.sisyphusdev.com/). Each post is one Markdown file in `posts/`. When a change merges to `main`, the site build turns every published post into a page.

Only finished posts come here. Drafts are written and kept in Marc's private repository, and a post is copied here when it is ready to publish (BLOG-D-06). A post with `Status: Draft` in this folder stops the build.

The post format is in [`Post_Template.md`](Post_Template.md). To see the blog locally, run this from the repo root:

```bash
bash scripts/build-site.sh && npx wrangler dev
```

To find a document, start at [`INDEX.md`](INDEX.md).
