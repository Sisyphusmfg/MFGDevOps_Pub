// Run: node --test Workstreams/Sisyphusdev_Site/worker/test/route.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { privacyAssetPath, route } from "../index.mjs";

const r = (u) => route(new URL(u));

test("apex app paths move to the purpose subdomain", () => {
  assert.deepEqual(r("https://sisyphusdev.com/posiwid/"), { redirect: "https://purpose.sisyphusdev.com/posiwid/", status: 301 });
  assert.deepEqual(r("https://www.sisyphusdev.com/goals/?x=1"), { redirect: "https://purpose.sisyphusdev.com/goals/?x=1", status: 301 });
  assert.deepEqual(r("https://sisyphusdev.com/goals"), { redirect: "https://purpose.sisyphusdev.com/goals", status: 301 });
  assert.deepEqual(r("https://sisyphusdev.com/design/"), { redirect: "https://purpose.sisyphusdev.com/design/", status: 301 });
});

test("blog lives on its own subdomain", () => {
  assert.deepEqual(r("https://sisyphusdev.com/blog/first-post/"), { redirect: "https://blog.sisyphusdev.com/blog/first-post/", status: 301 });
  assert.deepEqual(r("https://blog.sisyphusdev.com/"), { redirect: "https://blog.sisyphusdev.com/blog/", status: 302 });
  assert.equal(r("https://blog.sisyphusdev.com/blog/"), null);
  assert.equal(r("https://blog.sisyphusdev.com/blog/blog.css"), null);
});

test("purpose root opens the first tool", () => {
  assert.deepEqual(r("https://purpose.sisyphusdev.com/"), { redirect: "https://purpose.sisyphusdev.com/posiwid/", status: 302 });
});

test("everything else is served as-is", () => {
  for (const u of [
    "https://sisyphusdev.com/",
    "https://sisyphusdev.com/apps.json",
    "https://sisyphusdev.com/posiwidx",
    "https://purpose.sisyphusdev.com/posiwid/",
    "https://purpose.sisyphusdev.com/goals/",
    "https://purpose.sisyphusdev.com/design/",
    "https://purpose.sisyphusdev.com/logo-small.png",
    "https://abc-mfgdevops-pub.example.workers.dev/posiwid/",
    "https://sisyphusdev.com/privacy",
    "https://www.sisyphusdev.com/privacy/",
    "https://purpose.sisyphusdev.com/privacy",
    "https://blog.sisyphusdev.com/privacy",
    "https://abc-mfgdevops-pub.example.workers.dev/privacy",
  ]) assert.equal(r(u), null, u);
});

test("privacy is the notice file on every host, with no redirect", async () => {
  assert.equal(privacyAssetPath("/privacy"), "/privacy/index.html");
  assert.equal(privacyAssetPath("/privacy/"), "/privacy/index.html");
  assert.equal(privacyAssetPath("/privacy/index.html"), null);
  const env = {
    ASSETS: { fetch: async (req) => new Response("privacy:" + new URL(req.url).pathname, { status: 200 }) },
  };
  for (const u of [
    "https://sisyphusdev.com/privacy",
    "https://www.sisyphusdev.com/privacy/",
    "https://purpose.sisyphusdev.com/privacy",
    "https://blog.sisyphusdev.com/privacy",
    "https://preview.example.workers.dev/privacy",
  ]) {
    const res = await worker.fetch(new Request(u), env);
    assert.equal(res.status, 200, u);
    assert.equal(res.headers.get("location"), null, u);
    assert.equal(await res.text(), "privacy:/privacy/index.html", u);
  }
});

test("fetch hands non-redirects to ASSETS", async () => {
  const env = { ASSETS: { fetch: async (req) => new Response("asset:" + new URL(req.url).pathname) } };
  const ok = await worker.fetch(new Request("https://purpose.sisyphusdev.com/goals/"), env);
  assert.equal(await ok.text(), "asset:/goals/");
  const red = await worker.fetch(new Request("https://sisyphusdev.com/posiwid/"), env);
  assert.equal(red.status, 301);
  assert.equal(red.headers.get("location"), "https://purpose.sisyphusdev.com/posiwid/");
});

// Scheduled blog posts (BLOG-D-05, SDEV-D-13)
import { rebuildDue, checkSchedule } from "../index.mjs";

test("rebuild is due only when the next scheduled date has arrived", () => {
  assert.equal(rebuildDue({ next: "2026-12-01" }, "2026-11-30"), false);
  assert.equal(rebuildDue({ next: "2026-12-01" }, "2026-12-01"), true);
  assert.equal(rebuildDue({ next: "2026-12-01" }, "2026-12-02"), true);
  assert.equal(rebuildDue({ next: null }, "2026-12-02"), false);
  assert.equal(rebuildDue(null, "2026-12-02"), false);
});

test("checkSchedule posts the deploy hook only when due and configured", async () => {
  const assets = (body, status = 200) => ({ fetch: async () => new Response(JSON.stringify(body), { status }) });
  const calls = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => { calls.push([url, init.method]); return new Response("{}", { status: 200 }); };
  const quiet = console.log, loud = console.error;
  console.log = () => {}; console.error = () => {};
  try {
    // 12:00 UTC on Dec 1 = Dec 1 in New York.
    const at = new Date("2026-12-01T12:00:00Z");
    assert.equal((await checkSchedule({ ASSETS: assets({ next: "2026-12-02" }), BLOG_DEPLOY_HOOK: "https://hook.test/x" }, at)).rebuilt, false);
    assert.equal((await checkSchedule({ ASSETS: assets({ next: "2026-12-01" }) }, at)).reason, "no hook");
    assert.equal((await checkSchedule({ ASSETS: assets({}, 404), BLOG_DEPLOY_HOOK: "https://hook.test/x" }, at)).reason, "schedule.json 404");
    assert.equal(calls.length, 0);
    assert.equal((await checkSchedule({ ASSETS: assets({ next: "2026-12-01" }), BLOG_DEPLOY_HOOK: "https://hook.test/x" }, at)).rebuilt, true);
    assert.deepEqual(calls, [["https://hook.test/x", "POST"]]);
  } finally {
    globalThis.fetch = realFetch; console.log = quiet; console.error = loud;
  }
});
