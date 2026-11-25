// Run: node --test scripts/test/build-blog.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { markdownToHtml, readPost, slugFromFile, formatDate, build } from "../build-blog.mjs";

const post = (fm, body = "Hello **world**.") => `---\n${fm}\n---\n\n${body}\n`;
const OK = 'Contributed By: Marc Dugas\nLast Updated: 2026-11-24\nDocument Type: Blog Post\ndoc_type: record\nStatus: Published\nagent_grounding: false\ntitle: "A: first post"\ncategory: Systems\ndate: 2026-11-24';

test("markdown subset, with HTML escaped", () => {
  const h = markdownToHtml("# Head\n\nPara with `<b>` and [a link](https://x.test) and *it*.\n\n- one\n- two\n\n> quote\n\n```\n<raw>\n```\n\n<script>bad()</script>");
  assert.match(h, /<h2>Head<\/h2>/);
  assert.match(h, /<code>&lt;b&gt;<\/code>/);
  assert.match(h, /<a href="https:\/\/x.test">a link<\/a>/);
  assert.match(h, /<em>it<\/em>/);
  assert.match(h, /<ul><li>one<\/li><li>two<\/li><\/ul>/);
  assert.match(h, /<blockquote><p>quote<\/p><\/blockquote>/);
  assert.match(h, /<pre><code>&lt;raw&gt;<\/code><\/pre>/);
  assert.doesNotMatch(h, /<script>/);
  assert.match(markdownToHtml("[x](javascript:alert(1))"), /href="#"/);
});

test("front matter, slug and date", () => {
  const p = readPost("2026-11-24_Blog_First_Post.md", post(OK));
  assert.deepEqual(p.errors, []);
  assert.equal(p.title, "A: first post");
  assert.equal(p.slug, "first-post");
  assert.equal(slugFromFile("2026-11-24_Blog_Hello_World.md"), "hello-world");
  assert.equal(formatDate("2026-11-04"), "November 4, 2026");
  const bad = readPost("x.md", post("title: T\nStatus: Live\ndate: 24/11/2026"));
  assert.equal(bad.errors.length, 3);
});

test("build: published only, newest first, drafts on request, bad post stops the build", () => {
  const dir = mkdtempSync(join(tmpdir(), "blog-"));
  const posts = join(dir, "posts"); mkdirSync(posts);
  writeFileSync(join(posts, "2026-11-20_Blog_Older.md"), post(OK.replace("2026-11-24\n", "2026-11-24\n").replace("date: 2026-11-24", "date: 2026-11-20").replace('"A: first post"', "Older")));
  writeFileSync(join(posts, "2026-11-24_Blog_Newer.md"), post(OK.replace('"A: first post"', "Newer").replace("category: Systems", "category: AI")));
  writeFileSync(join(posts, "2026-11-25_Blog_Draft.md"), post(OK.replace("Status: Published", "Status: Draft").replace('"A: first post"', "Draft")));
  const out = join(dir, "out");
  const built = build(posts, out);
  assert.deepEqual(built.map((p) => p.title), ["Newer", "Older"]);
  const index = readFileSync(join(out, "index.html"), "utf8");
  assert.ok(index.indexOf("Newer") < index.indexOf("Older"));
  assert.match(index, /class="flag">AI</);
  assert.match(index, /class="card featured"[^>]*data-cat="AI"/);
  assert.ok(existsSync(join(out, "newer", "index.html")));
  assert.ok(!existsSync(join(out, "draft")));
  assert.equal(build(posts, join(dir, "out2"), { drafts: true }).length, 3);
  writeFileSync(join(posts, "2026-11-26_Blog_Broken.md"), post("title: Broken"));
  assert.throws(() => build(posts, join(dir, "out3")), /Broken/);
});

test("empty blog renders a placeholder", () => {
  const dir = mkdtempSync(join(tmpdir(), "blog-"));
  build(join(dir, "none"), join(dir, "out"));
  assert.match(readFileSync(join(dir, "out", "index.html"), "utf8"), /No posts yet/);
});
