---
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Template
doc_type: procedure
Status: Active
agent_grounding: true
agent_maintenance: true
authority_rank: 1
---

# How to write a blog post

Drafts are written and kept in Marc's private repository, not here (BLOG-D-06). This page is the post format for both places. A post comes to this repository only when it is ready: `Status: Published`. A post here with `Status: Draft` stops the build.

1. Copy the block below into a new file in `posts/`, named `YYYY-MM-DD_Blog_Short_Title.md`. The page address comes from the name: `2026-11-24_Blog_Short_Title.md` becomes `blog.sisyphusdev.com/blog/short-title/`. Set `slug:` to choose a different one.
2. Fill in the front matter and write the post below it.
3. Add a row for the file to the post register in [`INDEX.md`](INDEX.md).
4. Set `Status: Published` and open a pull request. Merging publishes the post. Publishing is a publication (PUB-D-04): the pull request says so.
5. To schedule a post (BLOG-D-05), set `Status: Published` and set `date` to the day it should appear. Merge any time before then. The site checks once a day, at about 6:15 AM New York time in winter (7:15 AM in summer), and rebuilds when a scheduled date has arrived. The post's Markdown is public in the repository from the merge.

```markdown
---
Contributed By: Marc Dugas
Last Updated: YYYY-MM-DD
Document Type: Blog Post
doc_type: record
Status: Published
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
| `date` | Yes | `YYYY-MM-DD`, New York time. Newest post is featured at the top. A Published post with a later date is scheduled and appears on that date |
| `Status` | Yes | `Published` in this repository. `Draft` is used only while the post is kept privately; a Draft here stops the build |
| `summary` | No | Used in the page description |
| `slug` | No | Lowercase words joined by hyphens |

The build supports headings (`##`–`####`), paragraphs, bulleted and numbered lists, quotes, code blocks, inline code, links, bold and italic. HTML in a post is shown as text, not run. Images come later (BLOG-D-03).

Preview posts, drafts and scheduled ones included, from any folder of post files: `node scripts/build-blog.mjs <posts folder> /tmp/blog --drafts`, then open `/tmp/blog/index.html`. Add `--today=YYYY-MM-DD` to see the blog as it will be on a given day.
