/* Verda API client.
 *
 * The browser app has always kept its state in localStorage, and it still does.
 * This adds a server when one is configured, without making the app depend on
 * having one: a monitor on a site with no signal must still be able to work.
 *
 * Configure by setting a base URL before app.js loads — a script tag in the
 * page that assigns:
 *   window.VERDA_API = "https://api.example.com";
 * With nothing set, isEnabled() is false and every screen behaves exactly as it
 * did before — which is also what the single-file build does.
 */
(function () {
  "use strict";

  const BASE = (typeof window !== "undefined" && window.VERDA_API) || "";

  class ApiError extends Error {
    constructor(message, status, body) {
      super(message); this.name = "ApiError"; this.status = status; this.body = body;
    }
  }

  async function call(method, path, body) {
    if (!BASE) throw new ApiError("no server configured", 0, null);
    let res;
    try {
      res = await fetch(BASE + path, {
        method,
        // The session is an httpOnly cookie, so it has to be sent explicitly
        // on a cross-origin call and can never be read by this script.
        credentials: "include",
        headers: body === undefined ? {} : { "content-type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body)
      });
    } catch (err) {
      // Offline, DNS failure, server down. The caller decides whether to fall
      // back to local storage; it is not this layer's call to make.
      throw new ApiError("could not reach the server", 0, null);
    }
    let payload = null;
    try { payload = await res.json(); } catch { /* 204 and friends */ }
    if (!res.ok) throw new ApiError((payload && payload.error) || res.statusText, res.status, payload);
    return payload;
  }

  const VerdaApi = {
    isEnabled: () => !!BASE,
    baseUrl: () => BASE,
    ApiError,

    health: () => call("GET", "/api/health"),

    auth: {
      signup: (d) => call("POST", "/api/auth/signup", d),
      login: (d) => call("POST", "/api/auth/login", d),
      logout: () => call("POST", "/api/auth/logout"),
      me: () => call("GET", "/api/auth/me")
    },

    orgs: {
      create: (d) => call("POST", "/api/orgs", d),
      get: (orgId) => call("GET", `/api/orgs/${orgId}`),
      members: (orgId) => call("GET", `/api/orgs/${orgId}/members`),
      addMember: (orgId, d) => call("POST", `/api/orgs/${orgId}/members`, d),
      audit: (orgId) => call("GET", `/api/orgs/${orgId}/audit`)
    },

    sites: {
      list: (orgId) => call("GET", `/api/orgs/${orgId}/sites`),
      create: (orgId, d) => call("POST", `/api/orgs/${orgId}/sites`, d),
      update: (orgId, id, d) => call("PATCH", `/api/orgs/${orgId}/sites/${id}`, d),
      remove: (orgId, id) => call("DELETE", `/api/orgs/${orgId}/sites/${id}`)
    },

    records: {
      list: (orgId, q = {}) => {
        const qs = new URLSearchParams(Object.entries(q).filter(([, v]) => v)).toString();
        return call("GET", `/api/orgs/${orgId}/records${qs ? "?" + qs : ""}`);
      },
      create: (orgId, d) => call("POST", `/api/orgs/${orgId}/records`, d),
      remove: (orgId, id) => call("DELETE", `/api/orgs/${orgId}/records/${id}`)
    },

    reports: {
      list: (orgId) => call("GET", `/api/orgs/${orgId}/reports`),
      create: (orgId, d) => call("POST", `/api/orgs/${orgId}/reports`, d),
      submit: (orgId, id) => call("POST", `/api/orgs/${orgId}/reports/${id}/submit`)
    },

    /* Public — no session. The screening tool posts here so the aggregate is
       kept and a monitor can pick the lead up; the result the user sees is
       computed in the browser either way, so a server that is down or absent
       does not stop anyone screening a project. */
    screenings: {
      submit: (d) => call("POST", "/api/screenings", d),
      leads: (orgId) => call("GET", `/api/orgs/${orgId}/screenings`)
    },

    /* Drafting runs server-side so the Anthropic key never reaches a browser.
       With no server configured this throws, and the caller falls back to the
       local deterministic template engine in ai.js. */
    ai: {
      draft: (orgId, d) => call("POST", `/api/orgs/${orgId}/ai/draft`, d)
    }
  };

  if (typeof window !== "undefined") window.VerdaApi = VerdaApi;
  if (typeof module !== "undefined" && module.exports) module.exports = VerdaApi;
})();
