// Build the blog for blog.sisyphusdev.com (BLOG-D-02, BLOG-D-03).
// Reads one Markdown file per post from Workstreams/Blog/posts/ and writes
// static pages under dist/blog/. No dependencies: Node 18+ only.
//
//   node scripts/build-blog.mjs [postsDir] [outDir] [--drafts]
//
// Published posts only, unless --drafts is given (local preview).
// A post with bad front matter stops the build with a message.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const STATUSES = ["Draft", "Published"];

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Front matter: "key: value" lines between --- markers. Quotes are stripped.
export function parseFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][A-Za-z_ ]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    data[kv[1].trim()] = v;
  }
  return { data, body: text.slice(m[0].length) };
}

function inline(s) {
  // Code spans first, so their content is not formatted.
  const codes = [];
  let out = s.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  out = escapeHtml(out);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
    const safe = /^(https?:\/\/|\/|#|mailto:)/i.test(href) ? href : "#";
    return `<a href="${safe}">${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[Number(i)])}</code>`);
  return out;
}

// A small Markdown subset: headings, paragraphs, lists, quotes, code blocks,
// links, bold, italic, inline code. Raw HTML is escaped.
export function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    const fence = line.match(/^```/);
    if (fence) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      html.push(`<pre><code>${escapeHtml(buf.join("\n"))}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      // Post titles are h1; body headings start at h2.
      const level = Math.min(h[1].length + 1, 4);
      html.push(`<h${level}>${inline(h[2].trim())}</h${level}>`);
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      html.push(`<blockquote><p>${inline(buf.join(" "))}</p></blockquote>`);
      continue;
    }
    const ul = /^\s*[-*]\s+/;
    const ol = /^\s*\d+\.\s+/;
    if (ul.test(line) || ol.test(line)) {
      const re = ul.test(line) ? ul : ol;
      const tag = re === ul ? "ul" : "ol";
      const items = [];
      while (i < lines.length && re.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(re, ""))}</li>`);
      html.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }
    const buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,4}\s|```|>|\s*[-*]\s+|\s*\d+\.\s+)/.test(lines[i])) buf.push(lines[i++].trim());
    html.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return html.join("\n");
}

export function slugFromFile(file) {
  return basename(file, ".md")
    .replace(/^\d{4}-\d{2}-\d{2}_(Blog_)?/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function readPost(file, text) {
  const { data, body } = parseFrontMatter(text);
  const errors = [];
  const title = data.title;
  const category = data.category;
  const date = data.date;
  const status = data.Status;
  if (!title) errors.push("title is missing");
  if (!category) errors.push("category is missing");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("date must be YYYY-MM-DD");
  if (!STATUSES.includes(status)) errors.push(`Status must be ${STATUSES.join(" or ")}`);
  const slug = data.slug || slugFromFile(file);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push(`slug "${slug}" must be lowercase words joined by hyphens`);
  return { file, title, category, date, status, slug, summary: data.summary || "", body, errors };
}

export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

const HEAD = (title, desc) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/blog/blog.css">
</head>
<body>
<header>
  <div class="wrap">
    <a class="brand" href="/blog/"><img src="/logo-small.png" alt="" width="40" height="35">sisyphusdev <span>/ blog</span></a>
    <nav aria-label="Site"><a href="/blog/">All posts</a><a href="https://sisyphusdev.com/">All apps</a></nav>
  </div>
</header>
`;

const FOOT = `<footer>
  <div class="wrap">
    <span>© Sisyphus Manufacturing · Anderson, SC</span>
    <span>Source: <a href="https://github.com/Sisyphusmfg/MFGDevOps_Pub/tree/main/Workstreams/Blog">MFGDevOps_Pub/Workstreams/Blog</a></span>
  </div>
</footer>
</body>
</html>
`;

function flag(category) {
  return `<span class="flag">${escapeHtml(category)}</span>`;
}

function card(p, featured) {
  const cls = featured ? "card featured" : "card";
  return `<article class="${cls}" data-cat="${escapeHtml(p.category)}">
  ${flag(p.category)}
  <h${featured ? 2 : 3}><a href="/blog/${p.slug}/">${escapeHtml(p.title)}</a></h${featured ? 2 : 3}>
  <time datetime="${p.date}">${formatDate(p.date)}</time>
</article>`;
}

export function renderIndex(posts) {
  const [first, ...rest] = posts;
  const cats = [...new Set(rest.map((p) => p.category))].sort();
  const filters = cats.length > 1
    ? `<div class="filters" role="group" aria-label="Filter by category"><button type="button" data-f="All" aria-pressed="true">All</button>${cats.map((c) => `<button type="button" data-f="${escapeHtml(c)}" aria-pressed="false">${escapeHtml(c)}</button>`).join("")}</div>`
    : "";
  const body = posts.length
    ? `${card(first, true)}${rest.length ? `
  <div class="list-head"><h2>More posts</h2>${filters}</div>
  <div class="grid" id="grid">
${rest.map((p) => card(p, false)).join("\n")}
  </div>
  <p class="empty" id="none" hidden>No posts in this category yet.</p>` : ""}`
    : `<p class="empty">No posts yet. The first one is on its way.</p>`;
  return `${HEAD("Blog — sisyphusdev", "Notes on manufacturing, systems and AI from Sisyphus Manufacturing.")}
<main class="wrap">
  <section class="intro">
    <div class="eyebrow">Blog</div>
    <h1>Notes from the shop floor and the lab</h1>
  </section>
  ${body}
</main>
${FOOT.replace("</body>", `<script>
(function () {
  var buttons = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('#grid .card');
  var none = document.getElementById('none');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f, shown = 0;
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      cards.forEach(function (c) { var on = f === 'All' || c.dataset.cat === f; c.hidden = !on; if (on) shown++; });
      if (none) none.hidden = shown > 0;
    });
  });
})();
</script>
</body>`)}`;
}

export function renderPost(p) {
  return `${HEAD(`${p.title} — sisyphusdev blog`, p.summary || p.title)}
<main class="wrap post">
  <article>
    ${flag(p.category)}
    <h1>${escapeHtml(p.title)}</h1>
    <time datetime="${p.date}">${formatDate(p.date)}</time>
    <div class="body">
${markdownToHtml(p.body)}
    </div>
  </article>
  <p class="back"><a href="/blog/">← All posts</a></p>
</main>
${FOOT}`;
}

export const CSS = `:root {
  --ground: #F4F5F2; --ink: #15181C; --ink-2: #3B4148; --ink-3: #4A5058;
  --line: #D5D8D2; --chip: #EDEFEA; --accent: #C2410C; --hover: #B23C0A; --focus: #1D4ED8;
  --mono: "JetBrains Mono", ui-monospace, monospace;
  --head: "Space Grotesk", system-ui, sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--ground); color: var(--ink); font-family: Inter, system-ui, sans-serif; }
a { color: var(--ink); } a:hover { color: var(--hover); }
a:focus-visible, button:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
.wrap { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
header { border-bottom: 1px solid var(--line); }
header .wrap { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; padding-top: 18px; padding-bottom: 18px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; font-family: var(--head); font-weight: 700; font-size: 19px; }
.brand span { color: var(--ink-3); font-weight: 500; }
nav { display: flex; flex-wrap: wrap; gap: 4px; }
nav a { padding: 12px 14px; font-size: 15px; font-weight: 500; text-decoration: none; }
.eyebrow { font-family: var(--mono); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
.intro { padding-top: 64px; padding-bottom: 32px; }
h1 { margin: 16px 0 0; font-family: var(--head); font-weight: 700; font-size: clamp(36px, 5.5vw, 64px); line-height: 1.04; letter-spacing: -.03em; max-width: 880px; }
.flag { display: inline-block; align-self: flex-start; font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: #fff; background: var(--accent); padding: 5px 10px; border-radius: 4px; }
time { display: block; font-size: 14px; color: var(--ink-3); }
.card { display: flex; flex-direction: column; gap: 14px; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 24px; }
.card h2, .card h3 { margin: 0; font-family: var(--head); font-weight: 700; letter-spacing: -.02em; line-height: 1.15; }
.card h3 { font-size: 24px; }
.card a { text-decoration: none; }
.card a:hover { text-decoration: underline; }
.card time { margin-top: auto; }
.featured { padding: 40px; gap: 18px; margin-bottom: 48px; border-top: 4px solid var(--ink); }
.featured h2 { font-size: clamp(30px, 4vw, 48px); max-width: 860px; }
.list-head { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; justify-content: space-between; border-top: 2px solid var(--ink); padding-top: 20px; margin-bottom: 24px; }
.list-head h2 { margin: 0; font-family: var(--head); font-weight: 700; font-size: 28px; letter-spacing: -.02em; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; }
.filters button { min-height: 44px; padding: 0 16px; border-radius: 999px; font: 500 14px Inter, system-ui, sans-serif; cursor: pointer; background: transparent; color: var(--ink); border: 1px solid #B9BDB5; }
.filters button[aria-pressed="true"] { background: var(--ink); color: var(--ground); border-color: var(--ink); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding-bottom: 72px; }
.grid .card { min-height: 220px; }
.empty { font-size: 17px; color: var(--ink-3); padding-bottom: 72px; }
.post { max-width: 760px; padding-top: 56px; padding-bottom: 72px; }
.post article { display: flex; flex-direction: column; gap: 16px; }
.post h1 { margin: 0; font-size: clamp(34px, 5vw, 56px); }
.body { margin-top: 16px; font-size: 18px; line-height: 1.7; color: var(--ink-2); }
.body h2, .body h3, .body h4 { font-family: var(--head); color: var(--ink); letter-spacing: -.01em; margin: 36px 0 8px; }
.body h2 { font-size: 28px; } .body h3 { font-size: 22px; } .body h4 { font-size: 18px; }
.body blockquote { margin: 24px 0; padding: 4px 20px; border-left: 4px solid var(--accent); color: var(--ink); }
.body pre { background: var(--ink); color: #E6E8EB; border-radius: 8px; padding: 16px; overflow: auto; font: 14px/1.6 var(--mono); }
.body code { font-family: var(--mono); font-size: .9em; background: var(--chip); padding: 2px 5px; border-radius: 4px; }
.body pre code { background: none; padding: 0; }
.back { margin-top: 48px; font-weight: 600; }
footer { border-top: 1px solid var(--line); }
footer .wrap { padding-top: 20px; padding-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; font-size: 13px; color: var(--ink-3); }
`;

export function build(postsDir, outDir, { drafts = false } = {}) {
  const files = existsSync(postsDir) ? readdirSync(postsDir).filter((f) => f.endsWith(".md")).sort() : [];
  const posts = [];
  const problems = [];
  for (const f of files) {
    const p = readPost(f, readFileSync(join(postsDir, f), "utf8"));
    if (p.errors.length) { problems.push(`${f}: ${p.errors.join("; ")}`); continue; }
    if (p.status === "Published" || drafts) posts.push(p);
  }
  const slugs = new Map();
  for (const p of posts) {
    if (slugs.has(p.slug)) problems.push(`${p.file}: slug "${p.slug}" is also used by ${slugs.get(p.slug)}`);
    slugs.set(p.slug, p.file);
  }
  if (problems.length) throw new Error("build-blog: fix these posts:\n  " + problems.join("\n  "));
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "blog.css"), CSS);
  writeFileSync(join(outDir, "index.html"), renderIndex(posts));
  for (const p of posts) {
    mkdirSync(join(outDir, p.slug), { recursive: true });
    writeFileSync(join(outDir, p.slug, "index.html"), renderPost(p));
  }
  return posts;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const drafts = args.includes("--drafts");
  const [postsDir = "Workstreams/Blog/posts", outDir = "dist/blog"] = args.filter((a) => !a.startsWith("--"));
  try {
    const posts = build(postsDir, outDir, { drafts });
    console.log(`build-blog: ${posts.length} post(s) in ${outDir}${drafts ? " (drafts included)" : ""}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
