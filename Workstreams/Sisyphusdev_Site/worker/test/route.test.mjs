// Run: node --test Workstreams/Sisyphusdev_Site/worker/test/
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { route } from "../index.mjs";

const r = (u) => route(new URL(u));

test("apex app paths move to the purpose subdomain", () => {
  assert.deepEqual(r("https://sisyphusdev.com/posiwid/"), { redirect: "https://purpose.sisyphusdev.com/posiwid/", status: 301 });
  assert.deepEqual(r("https://www.sisyphusdev.com/goals/?x=1"), { redirect: "https://purpose.sisyphusdev.com/goals/?x=1", status: 301 });
  assert.deepEqual(r("https://sisyphusdev.com/goals"), { redirect: "https://purpose.sisyphusdev.com/goals", status: 301 });
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
    "https://purpose.sisyphusdev.com/logo-small.png",
    "https://abc-mfgdevops-pub.example.workers.dev/posiwid/",
  ]) assert.equal(r(u), null, u);
});

test("fetch hands non-redirects to ASSETS", async () => {
  const env = { ASSETS: { fetch: async (req) => new Response("asset:" + new URL(req.url).pathname) } };
  const ok = await worker.fetch(new Request("https://purpose.sisyphusdev.com/goals/"), env);
  assert.equal(await ok.text(), "asset:/goals/");
  const red = await worker.fetch(new Request("https://sisyphusdev.com/posiwid/"), env);
  assert.equal(red.status, 301);
  assert.equal(red.headers.get("location"), "https://purpose.sisyphusdev.com/posiwid/");
});
