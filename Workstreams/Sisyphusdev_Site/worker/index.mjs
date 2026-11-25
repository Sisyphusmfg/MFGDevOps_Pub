// Worker for sisyphusdev.com and its app subdomains (SDEV-D-09).
// Static files come from dist/ through the ASSETS binding. This script only
// sends app paths to the subdomain that owns them, and opens the app at its
// first tool. Owner domain: Workstreams/Sisyphusdev_Site/ (see its INDEX.md).

// Subdomain -> the app paths it serves and the path "/" opens.
export const APPS = {
  "purpose.sisyphusdev.com": {
    name: "System Design and Analysis",
    paths: ["/posiwid/", "/goals/"],
    home: "/posiwid/",
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
  return null;
}

export default {
  async fetch(request, env) {
    const r = route(new URL(request.url));
    if (r) return Response.redirect(r.redirect, r.status);
    return env.ASSETS.fetch(request);
  },
};
