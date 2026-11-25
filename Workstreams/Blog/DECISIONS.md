---
title: Blog — Decisions Log
doc_type: decisions-log
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Decisions Log
Status: Active
agent_grounding: false
agent_maintenance: true
---

# Decisions Log — Blog

Why things are the way they are. Not for citing as fact.

| Date | Decision | Rationale | Status | Superseded by |
|------|----------|-----------|--------|---------------|
| 2026-11-24 | BLOG-D-01 — Create a blog for sisyphusdev.com, at `blog.sisyphusdev.com` | Marc, 2026-11-24: "I want to create a blog on the site." He chose the `blog.sisyphusdev.com` subdomain (SDEV-D-09: each app has its own subdomain). | adopted |  |
| 2026-11-24 | BLOG-D-02 — Posts are Markdown files in `Workstreams/Blog/posts/`, one per post, built into static pages at deploy; a post is published by merging a pull request with `Status: Published` | Marc chose "Markdown files in the repo" on 2026-11-24. No backend, no editor to host; the build stops on a post with bad front matter. | adopted |  |
| 2026-11-24 | BLOG-D-03 — The post list follows the layout Marc liked on X's blog: a featured latest post, then cards that each show a category flag, the title and the date | Marc, 2026-11-24: "I like the layout of https://blog.x.com/en … I like the category flag, title, and [date]." He confirmed "date". Images come later. | adopted |  |
| 2026-11-24 | BLOG-D-04 — The blog uses the same fonts and off-white background as the rest of sisyphusdev.com | Marc chose "Same as my site" on 2026-11-24. Space Grotesk headings, Inter body, `#F4F5F2` background, white cards. | adopted |  |
| 2026-11-25 | BLOG-D-05 — A post can be scheduled: `Status: Published` with a future `date` is merged now and appears on the blog on that date (America/New_York). Until then the build leaves it out | Marc, 2026-11-25: "I want to be able to make blog posts that delay publication." Uses the existing `date` field, so no new front matter. The post's Markdown is visible in this public repository from the merge, before its date. | adopted |  |
