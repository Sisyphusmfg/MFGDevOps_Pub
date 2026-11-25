// Run: node --test scripts/test/build-blog.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
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

test("build: published only, newest first, a draft stops the build unless --drafts, bad post stops the build", () => {
  const dir = mkdtempSync(join(tmpdir(), "blog-"));
  const posts = join(dir, "posts"); mkdirSync(posts);
  writeFileSync(join(posts, "2026-11-20_Blog_Older.md"), post(OK.replace("2026-11-24\n", "2026-11-24\n").replace("date: 2026-11-24", "date: 2026-11-20").replace('"A: first post"', "Older")));
  writeFileSync(join(posts, "2026-11-24_Blog_Newer.md"), post(OK.replace('"A: first post"', "Newer").replace("category: Systems", "category: AI")));
  writeFileSync(join(posts, "2026-11-25_Blog_Draft.md"), post(OK.replace("Status: Published", "Status: Draft").replace('"A: first post"', "Draft")));
  assert.throws(() => build(posts, join(dir, "out0")), /2026-11-25_Blog_Draft\.md: Status is Draft.*BLOG-D-06/);
  assert.equal(build(posts, join(dir, "out2"), { drafts: true }).length, 3);
  rmSync(join(posts, "2026-11-25_Blog_Draft.md"));
  const out = join(dir, "out");
  const built = build(posts, out);
  assert.deepEqual(built.map((p) => p.title), ["Newer", "Older"]);
  const index = readFileSync(join(out, "index.html"), "utf8");
  assert.ok(index.indexOf("Newer") < index.indexOf("Older"));
  assert.match(index, /class="flag">AI</);
  assert.match(index, /class="card featured"[^>]*data-cat="AI"/);
  assert.ok(existsSync(join(out, "newer", "index.html")));
  assert.ok(!existsSync(join(out, "draft")));
  writeFileSync(join(posts, "2026-11-26_Blog_Broken.md"), post("title: Broken"));
  assert.throws(() => build(posts, join(dir, "out3")), /Broken/);
});

test("empty blog renders a placeholder", () => {
  const dir = mkdtempSync(join(tmpdir(), "blog-"));
  build(join(dir, "none"), join(dir, "out"));
  assert.match(readFileSync(join(dir, "out", "index.html"), "utf8"), /No posts yet/);
});

test("scheduled posts wait for their date (BLOG-D-05)", () => {
  const dir = mkdtempSync(join(tmpdir(), "blog-sched-"));
  const posts = join(dir, "posts");
  mkdirSync(posts);
  writeFileSync(join(posts, "2026-11-24_Blog_Now.md"), post(OK));
  writeFileSync(join(posts, "2026-12-01_Blog_Later.md"), post(OK.replace("date: 2026-11-24", "date: 2026-12-01").replace("A: first post", "Later")));
  writeFileSync(join(posts, "2026-12-05_Blog_Even_Later.md"), post(OK.replace("date: 2026-11-24", "date: 2026-12-05").replace("A: first post", "Even later")));

  const before = build(posts, join(dir, "a"), { today: "2026-11-30" });
  assert.deepEqual(before.map((p) => p.slug), ["now"]);
  assert.deepEqual(before.scheduled.map((p) => p.slug), ["later", "even-later"]);
  assert.ok(!existsSync(join(dir, "a", "later")));
  assert.doesNotMatch(readFileSync(join(dir, "a", "index.html"), "utf8"), /Later/);
  assert.deepEqual(JSON.parse(readFileSync(join(dir, "a", "schedule.json"), "utf8")), { built: "2026-11-30", next: "2026-12-01" });

  const onDay = build(posts, join(dir, "b"), { today: "2026-12-01" });
  assert.deepEqual(onDay.map((p) => p.slug), ["later", "now"]);
  assert.ok(existsSync(join(dir, "b", "later", "index.html")));
  assert.equal(JSON.parse(readFileSync(join(dir, "b", "schedule.json"), "utf8")).next, "2026-12-05");

  const after = build(posts, join(dir, "c"), { today: "2026-12-31" });
  assert.equal(after.length, 3);
  assert.equal(JSON.parse(readFileSync(join(dir, "c", "schedule.json"), "utf8")).next, null);

  const preview = build(posts, join(dir, "d"), { today: "2026-11-30", drafts: true });
  assert.equal(preview.length, 3);
});

test("today is the America/New_York calendar day", async () => {
  const { todayInNewYork } = await import("../build-blog.mjs");
  // 03:00 UTC on Dec 1 is still Nov 30 in New York.
  assert.equal(todayInNewYork(new Date("2026-12-01T03:00:00Z")), "2026-11-30");
  assert.equal(todayInNewYork(new Date("2026-12-01T06:00:00Z")), "2026-12-01");
});
