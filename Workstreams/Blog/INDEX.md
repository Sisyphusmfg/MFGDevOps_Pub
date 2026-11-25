---
title: Blog — Domain Index
doc_type: readme-index
domain: blog
Contributed By: Marc Dugas
Last Updated: 2026-11-25
Document Type: Domain Index
Status: Active
authority_rank: 1
agent_grounding: true
agent_maintenance: true
---

# Blog — Domain Index

The sisyphusdev blog at `blog.sisyphusdev.com`: one Markdown file per post in `posts/`, built into static pages when the site deploys.

## Document Control

| Field | Value |
|-------|-------|
| Domain | blog |
| Owner | Marc Dugas |
| Last Updated | 2026-11-24 |
| Parent | Root [`README.md`](../../README.md) |

## Question → authoritative document

| If the question is about… | Authoritative document | Rank |
|---|---|---|
| How to write, publish and schedule a post | [`Post_Template.md`](Post_Template.md) | 1 |
| What a post page and the post list look like, and how posts are built | [`../../scripts/build-blog.mjs`](../../scripts/build-blog.mjs) | 1 |
| Which posts exist | Post register, below | 1 |
| Whether the blog is live | [`../Sisyphusdev_Site/Sisyphusdev_Site_Status.md`](../Sisyphusdev_Site/Sisyphusdev_Site_Status.md) | 1 |
| Why the blog is built this way | [`DECISIONS.md`](DECISIONS.md) | — |

## Document register (on-disk)

| File | Updated | Rank | Description |
|------|---------|------|-------------|
| [`README.md`](README.md) | 2026-11-24 | — | Human onboarding |
| [`AGENTS.md`](AGENTS.md) | 2026-11-24 | — | Agent instructions for this domain |
| [`DECISIONS.md`](DECISIONS.md) | 2026-11-25 | — | Decision log: BLOG-D-01 to BLOG-D-05 |
| [`Post_Template.md`](Post_Template.md) | 2026-11-25 | 1 | Post front matter, file naming, the Markdown the build supports, how to publish and how to schedule a post (BLOG-D-05) |

## Post register

Published posts appear on the blog from their date; drafts don't. One row per file in `posts/`.

| File | Date | Category | Status | Title |
|------|------|----------|--------|-------|
| [`posts/2026-11-24_Blog_System_Design_And_Analysis.md`](posts/2026-11-24_Blog_System_Design_And_Analysis.md) | 2026-11-24 | Tools | Draft | Example post: System Design and Analysis |
| [`posts/2026-11-25_Blog_From_README_To_Rulebook.md`](posts/2026-11-25_Blog_From_README_To_Rulebook.md) | 2026-11-25 | Systems | Published | From README to rulebook: turning engineering knowledge into guidance people and agents can follow |
| [`posts/2026-12-01_Blog_Thank_You_For_Writing_It_Down.md`](posts/2026-12-01_Blog_Thank_You_For_Writing_It_Down.md) | 2026-12-01 | Systems | Draft | Thank you for writing it down: what a harness engineering article changed in my repositories |

## Agent layer register (outside this folder, owned here)

| File | Date | authority_rank | Description |
|------|------|----------------|-------------|
| [`../../scripts/build-blog.mjs`](../../scripts/build-blog.mjs) | 2026-11-25 | 1 | Builds `dist/blog/` from `posts/`: post list with a featured latest post, category flags and filter, one page per post. Leaves out Published posts dated after today (New York) and writes `schedule.json` with the next scheduled date (BLOG-D-05). No dependencies |
| [`../../scripts/test/build-blog.test.mjs`](../../scripts/test/build-blog.test.mjs) | 2026-11-25 | — | Tests. Run `node --test scripts/test/build-blog.test.mjs` |

## Cross-links

| Domain | INDEX |
|--------|-------|
| Sisyphusdev_Site | [`../Sisyphusdev_Site/INDEX.md`](../Sisyphusdev_Site/INDEX.md) |
