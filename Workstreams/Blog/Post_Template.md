---
Contributed By: Marc Dugas
Last Updated: 2026-11-24
Document Type: Template
doc_type: procedure
Status: Active
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# How to write a blog post

1. Copy the block below into a new file in `posts/`, named `YYYY-MM-DD_Blog_Short_Title.md`. The page address comes from the name: `2026-11-24_Blog_Short_Title.md` becomes `blog.sisyphusdev.com/blog/short-title/`. Set `slug:` to choose a different one.
2. Fill in the front matter and write the post below it.
3. Add a row for the file to the post register in [`INDEX.md`](INDEX.md).
4. Open a pull request. While `Status: Draft`, the post isn't built. Change it to `Status: Published` when it's ready; merging publishes it.

```markdown
---
Contributed By: Marc Dugas
Last Updated: YYYY-MM-DD
Document Type: Blog Post
doc_type: record
Status: Draft
agent_grounding: false
title: "The post title"
category: Systems
date: YYYY-MM-DD
summary: "One sentence for search engines and link previews."
---

The first paragraph.

## A section heading

More text, with **bold**, *italic*, `code` and [a link](https://example.com).

- A list item
- Another

> A quote.
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Quote it if it contains `: ` |
| `category` | Yes | Shown as the flag on the card. Keep a short list (e.g. Systems, Manufacturing, AI, Tools) |
| `date` | Yes | `YYYY-MM-DD`. Newest post is featured at the top |
| `Status` | Yes | `Draft` or `Published` |
| `summary` | No | Used in the page description |
| `slug` | No | Lowercase words joined by hyphens |

The build supports headings (`##`–`####`), paragraphs, bulleted and numbered lists, quotes, code blocks, inline code, links, bold and italic. HTML in a post is shown as text, not run. Images come later (BLOG-D-03).
