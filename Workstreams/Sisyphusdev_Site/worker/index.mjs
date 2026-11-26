// Worker for sisyphusdev.com and its app subdomains (SDEV-D-09).
// Static files come from dist/ through the ASSETS binding. This script sends
// app paths to the subdomain that owns them and opens the app at its first tool.
// The privacy notice is dist/privacy.html. Assets HTML handling serves that file
// at /privacy with status 200. Do not rewrite /privacy to /privacy/index.html:
// that path is redirected back to /privacy, which loops.
// Owner domain: Workstreams/Sisyphusdev_Site/ (see its INDEX.md).

// Subdomain -> the app paths it serves and the path "/" opens.
export const APPS = {
  "purpose.sisyphusdev.com": {
    name: "System Design and Analysis",
    paths: ["/posiwid/", "/design/", "/goals/"],
    home: "/posiwid/",
  },
  "blog.sisyphusdev.com": {
    name: "Blog",
    paths: ["/blog/"],
    home: "/blog/",
  },
};

// Hosts that serve the home page and app directory.
export const SITE_HOSTS = ["sisyphusdev.com", "www.sisyphusdev.com"];

function appForPath(pathname) {
  for (const [host, app] of Object.entries(APPS)) {
    for (const p of app.paths) {
      if (pathname === p.slice(0, -1) || pathname.startsWith(p)) return host;
    }
  }
  return null;
}

export function route(url) {
  const host = url.hostname;
  const app = APPS[host];
  if (app && url.pathname === "/") {
    return { redirect: `https://${host}${app.home}${url.search}`, status: 302 };
  }
  if (SITE_HOSTS.includes(host)) {
    const target = appForPath(url.pathname);
    if (target) {
      return { redirect: `https://${target}${url.pathname}${url.search}${url.hash}`, status: 301 };
    }
  }
  // Every other host (workers.dev previews included) and path serves files as-is.
  // /privacy is one of those paths. It must reach ASSETS unchanged.
  return null;
}

// Scheduled blog posts (BLOG-D-05, SDEV-D-13). The site is static, so a post
// dated in the future only appears when the site is rebuilt on or after its
// date. Once a day the cron trigger in wrangler.jsonc reads the deployed
// blog/schedule.json; when its next date has arrived, it POSTs the Workers
// Builds deploy hook, which rebuilds main and publishes the post.
// The hook URL is the Worker secret BLOG_DEPLOY_HOOK, never a file.
export function todayInNewYork(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function rebuildDue(schedule, today) {
  return Boolean(schedule && typeof schedule.next === "string" && schedule.next <= today);
}

export async function checkSchedule(env, now = new Date()) {
  const today = todayInNewYork(now);
  const res = await env.ASSETS.fetch(new Request("https://blog.sisyphusdev.com/blog/schedule.json"));
  if (!res.ok) {
    console.error(`blog schedule: blog/schedule.json returned ${res.status}; no rebuild`);
    return { today, rebuilt: false, reason: `schedule.json ${res.status}` };
  }
  const schedule = await res.json();
  if (!rebuildDue(schedule, today)) {
    console.log(`blog schedule: next ${schedule.next ?? "none"}, today ${today}; no rebuild`);
    return { today, rebuilt: false, reason: "not due" };
  }
  if (!env.BLOG_DEPLOY_HOOK) {
    console.error(`blog schedule: a post dated ${schedule.next} is due but the BLOG_DEPLOY_HOOK secret is not set`);
    return { today, rebuilt: false, reason: "no hook" };
  }
  const hook = await fetch(env.BLOG_DEPLOY_HOOK, { method: "POST" });
  if (!hook.ok) {
    console.error(`blog schedule: deploy hook returned ${hook.status}`);
    return { today, rebuilt: false, reason: `hook ${hook.status}` };
  }
  console.log(`blog schedule: post dated ${schedule.next} is due; rebuild started`);
  return { today, rebuilt: true, reason: "due" };
}

export default {
  async fetch(request, env) {
    const r = route(new URL(request.url));
    if (r) return Response.redirect(r.redirect, r.status);
    return env.ASSETS.fetch(request);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(checkSchedule(env, new Date(event.scheduledTime)));
  },
};
