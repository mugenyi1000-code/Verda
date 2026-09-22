/* Verda — EHS/Compliance platform shell.
   Static, no-backend app: all data persists to localStorage in this browser.
   Sections marked "Demo" simulate a real backend flow (payments, multi-user
   auth, live AI API) so the platform can be trialled end-to-end before a
   server is built. */

(function () {
  "use strict";

  const STORE_KEY = "verda_state_v2";
  const T = () => VERDA_SEED.translations[state.lang] || VERDA_SEED.translations.en;
  // The jurisdiction currently in force. Requirements differ by country, so
  // nothing that cites a regulator or a permit should be rendered without it.
  const COUNTRY = () => VERDA_SEED.countries.find(c => c.id === state.country) || VERDA_SEED.countries[0];
  /* Everything in Verda is per-site, but each screen used to open with its
     client selector defaulting to whichever client happened to be first in the
     list. That silently files an incident, a training record or a report
     against the wrong site — a mistake nobody notices until an auditor does.
     Verda now remembers the site you are working on and defaults every
     selector to it. */
  function currentClient() {
    const byId = state.clients.find(c => c.id === state.ui.clientId);
    return byId || state.clients[0] || null;
  }
  function setCurrentClient(nameOrId) {
    const c = state.clients.find(x => x.id === nameOrId || x.name === nameOrId);
    if (c && state.ui.clientId !== c.id) { state.ui.clientId = c.id; save(); }
  }
  // Options for a client picker, with the site in context pre-selected.
  // With no clients on the books the picker must not be a silently empty
  // select: an empty select still submits, and a record filed against no site
  // is worse than one that was never filed. The placeholder carries value ""
  // so requireClient() below can refuse it.
  function clientOptions() {
    if (!state.clients.length) {
      return `<option value="" disabled selected>— add a client first —</option>`;
    }
    const cur = currentClient();
    return state.clients.map(c =>
      `<option value="${esc(c.name)}" ${cur && c.name === cur.name ? "selected" : ""}>${esc(c.name)}</option>`).join("");
  }
  // Read a client picker, refusing the empty placeholder. Returns "" when there
  // is nothing to file against, having told the user where to go.
  function requireClient(root, id) {
    const el = root.querySelector("#" + id);
    const value = el ? el.value : "";
    if (!value) {
      alert("Add a client on the Clients screen first — every record is filed against a site.");
      location.hash = "#/clients";
      return "";
    }
    return value;
  }

  // External links open in a new tab and never hand the opener to the target.
  function extLink(url, text) {
    return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text)} ↗</a>`;
  }

  const countryName = (id) => {
    const c = VERDA_SEED.countries.find(x => x.id === id);
    return c ? c.name : "—";
  };

  // Download filename prefix per reporting framework.
  const REPORT_FILE_PREFIX = {
    verda: "Verda-Reporting",
    ifc: "IFC-PS-Report",
    essr: "ESSR"
  };
  // What one item of each framework is called, and its badge tone in the list.
  const SEG_NOUN = { verda: "segment", ifc: "Performance Standard", essr: "section" };
  const STANDARD_BADGE = { verda: "good", ifc: "serious", essr: "warning" };
  // Narrative boxes a framework asks for when it doesn't declare its own.
  const DEFAULT_BLOCKS = [{ key: "notes", label: "Notes / narrative" }];

  function seedState() {
    return {
      lang: "en",
      theme: "forest",
      country: "ug",            // active jurisdiction — drives permits and the regulatory register
      user: null,
      users: [],
      clients: JSON.parse(JSON.stringify(VERDA_SEED.clients)),
      credits: {},
      creditLedger: [],
      reports: [],
      geoLayers: [],         // sensitive-area layers the user has loaded (GeoJSON)
      officerContacts: [],   // the officers this user actually deals with
      docs: {},              // in-progress ToR and ESIA content, per document type
      docRecords: [],        // generated and submitted ToR/ESIA documents
      esiaDrafts: [],
      esiaSubmissions: [],
      audits: [],
      records: [],
      supplies: JSON.parse(JSON.stringify(VERDA_SEED.ppeCatalog)),
      events: [
        { id: "e1", title: "Sample: Quarterly NEMA Compliance Webinar", date: "2026-10-01", desc: "Add your own events here — this is a placeholder." }
      ],
      forumPosts: [
        { id: "p1", author: "Verda Team", text: "Welcome to the Verda Community — post questions or share compliance tips here.", date: "2026-09-01" }
      ],
      workflowRuns: [],
      esmpAudit: [],
      incidents: [],
      subcontractors: [],
      equipment: [],          // equipment and machines under an inspection regime
      workforce: [],          // exposure hours by period, client and employer — the KPI denominator
      risks: [],
      actions: [],
      training: [],
      monitors: [],           // practitioners and firms, with the capacities they registered
      screening: null,        // the free screening tool's working answers
      ui: { checklistIndustry: null, clientId: null, kpiClient: "" },
      platformRevenue: null
    };
  }

  let state = load();
  // Saved states from before these registers existed must not crash on load.
  if (!state.ui || typeof state.ui !== "object") state.ui = {};
  if (!state.docs || typeof state.docs !== "object") state.docs = {};
  ["subcontractors", "workforce", "equipment", "docRecords", "geoLayers", "officerContacts", "monitors"].forEach(k => { if (!Array.isArray(state[k])) state[k] = []; });

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(seedState(), JSON.parse(raw));
    } catch (e) { /* fall through to fresh seed */ }
    return seedState();
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { console.warn("Verda: save failed", e); }
  }

  function uid(prefix) { return prefix + "_" + Math.random().toString(36).slice(2, 9); }

  /* ---------------------------- ICONS (inline SVG, no external deps) ---------------------------- */
  const ICON_PATHS = {
    // a stamped page — terms of reference, the document that is approved first
    tor: '<path d="M6 2.5h9l3.5 3.5V21a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5Z"/><path d="M15 2.5V6h3.5"/><path d="M9 11h6M9 14.5h6"/><circle cx="12" cy="18.5" r="2"/>',
    // calipers over a gauge — measurement and examination
    inspections: '<path d="M9 3v8a3 3 0 0 0 6 0V3"/><path d="M7 3h4M13 3h4"/><path d="M12 14v3"/><circle cx="12" cy="19.5" r="2.5"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    reporting: '<path d="M6 2.5h8l4 4V21a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 21V3a.5.5 0 0 1 .5-.5Z"/><path d="M14 2.5V7h4"/><path d="M9 12h6M9 15.5h6M9 8.5h3"/>',
    esia: '<rect x="4.5" y="3.5" width="15" height="18" rx="1.5"/><path d="M9 2.5h6a1 1 0 0 1 1 1V5H8V3.5a1 1 0 0 1 1-1Z"/><path d="m8.5 12.5 2 2 4-4.5M8.5 17h7"/>',
    audits: '<circle cx="10.5" cy="10.5" r="7"/><path d="m20 20-4.3-4.3"/><path d="M7.5 10.5h6M10.5 7.5v6"/>',
    records: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2.5h9A1.5 1.5 0 0 1 21 9v9.5A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-12Z"/>',
    maps: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    workflows: '<circle cx="5" cy="6" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="18" cy="12" r="2.5"/><path d="M7.3 7 15.7 11M7.3 17 15.7 13"/>',
    clients: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0"/><circle cx="17.5" cy="8.5" r="2.6"/><path d="M15.8 13.2a5.6 5.6 0 0 1 5.4 5.6"/>',
    documents: '<path d="M7 3.5h7l4 4V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4"/><path d="M9.5 12h5M9.5 15h5"/>',
    checklists: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="m7.5 12 2.5 2.5 5-5"/>',
    credits: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2v9.6M9.3 15.2c0 1 .9 1.8 2.7 1.8s2.7-.7 2.7-1.7c0-2.6-5.4-1.2-5.4-3.8 0-1 .9-1.7 2.7-1.7s2.7.6 2.7 1.6"/>',
    skills: '<path d="M12 4 2 8.5 12 13l10-4.5L12 4Z"/><path d="M6 10.8V16c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-5.2"/><path d="M21 8.5v5.3"/>',
    resources: '<path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H11v17.5H6.2A2.2 2.2 0 0 0 4 22.7Z"/><path d="M20 5.2A2.2 2.2 0 0 0 17.8 3H13v17.5h4.8a2.2 2.2 0 0 1 2.2 2.2Z"/>',
    supplies: '<path d="M3.5 8.2 12 3.7l8.5 4.5V16L12 20.5 3.5 16Z"/><path d="M3.5 8.2 12 12.7l8.5-4.5M12 12.7v7.8"/>',
    iec: '<path d="M3 10.5v3l14 4V6.5Z"/><path d="M17 8.3a3.4 3.4 0 0 1 0 7.4"/><path d="m7.5 14.5.7 3.6a1.6 1.6 0 0 0 3.1-.6l-.3-2.5"/>',
    solutions: '<path d="M9.5 3.5h-4A1 1 0 0 0 4.5 4.5v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z"/><path d="M18.5 3.5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z"/><path d="M9.5 12.5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z"/><path d="M18.5 12.5h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M8.8 14.8c0 1.2 1.1 2.1 3.2 2.1s3.2-.8 3.2-2c0-3.1-6.4-1.4-6.4-4.5 0-1.2 1.1-2 3.2-2s3.2.7 3.2 1.9"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/>',
    theme: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none"/>',
    warn: '<path d="M12 3.5 21.5 20h-19Z"/><path d="M12 9.5v4.2M12 16.8h.01"/>',
    analytics: '<path d="M3.5 20.5h17"/><rect x="5" y="12" width="3.6" height="6" rx="1"/><rect x="10.2" y="7.5" width="3.6" height="10.5" rx="1"/><rect x="15.4" y="10" width="3.6" height="8" rx="1"/>',
    incidents: '<path d="M12 3.2 21.4 20H2.6Z"/><path d="M12 9.6v4.3M12 17h.01"/>',
    risk: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M9 3.5v17M15 3.5v17M3.5 9h17M3.5 15h17"/>',
    actions: '<path d="M4 12.5 9 17.5 20 6.5"/><path d="M4 6.5h8"/>',
    training: '<path d="M12 4 2.5 8.2 12 12.4l9.5-4.2L12 4Z"/><path d="M6.5 10.4V15c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.6"/><path d="M21.5 8.2v5.1"/>',
    revenue: '<path d="M3.5 20.5h17"/><path d="M6 17V9.5M11 17V5.5M16 17v-5M21 17V3.5"/><path d="M17.8 6.2 21 3.5M21 3.5h-3.4M21 3.5v3.3"/>',
    plans: '<path d="M20.5 12.7 12.8 20.4a1.7 1.7 0 0 1-2.4 0l-7-7A1.7 1.7 0 0 1 2.9 12V4.6a1.7 1.7 0 0 1 1.7-1.7H12c.45 0 .88.18 1.2.5l7.3 7.3a1.7 1.7 0 0 1 0 2.4Z"/><circle cx="7.6" cy="7.6" r="1.3"/>',
    // a funnel — a question set that narrows to one answer
    screening: '<path d="M3.5 4.5h17l-6.5 8v7l-4 2v-9Z"/>',
    // a person inside a locating ring — finding the practitioner for the job
    monitors: '<circle cx="12" cy="9.5" r="3"/><path d="M6.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="12" cy="12" r="9.5"/>',
    // a slide rule / calculator keypad
    toolbox: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M7.5 7h9"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01M8 15.5h.01M12 15.5h.01M16 15.5h.01M8 18.5h8"/>'
  };
  function icon(name, cls) {
    const path = ICON_PATHS[name];
    if (!path) return "";
    return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  /* ---------------------------- ILLUSTRATIONS (original flat-style SVG art, no stock photos/hotlinking) ---------------------------- */
  const ILLUS_CONTENT = {
    // An open pit stepped in benches, a headframe over the shaft, and a haul
    // truck on the ramp — the three things that read as "mine" at 72px.
    mining: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <path d="M8 122 L34 122 L44 104 L70 104 L80 86 L120 86 L130 104 L156 104 L166 122 L192 122 Z" class="illus-fill-2"/>
      <path d="M28 122 L44 122 L52 108 L74 108 L82 96 L118 96 L126 108 L148 108 L156 122 L172 122 Z" class="illus-fill-1"/>
      <rect x="94" y="26" width="5" height="40" rx="2" class="illus-fill-muted"/>
      <rect x="118" y="26" width="5" height="40" rx="2" class="illus-fill-muted"/>
      <path d="M96 30 L121 66 M121 30 L96 66" stroke-width="3" class="illus-stroke-muted" fill="none"/>
      <circle cx="109" cy="22" r="8" class="illus-fill-accent"/>
      <rect x="36" y="70" width="30" height="14" rx="3" class="illus-fill-accent"/>
      <rect x="30" y="76" width="10" height="8" rx="2" class="illus-fill-muted"/>
      <circle cx="40" cy="86" r="5" class="illus-fill-muted"/>
      <circle cx="60" cy="86" r="5" class="illus-fill-muted"/>`,
    environment: `
      <path d="M0 112 Q50 96 100 110 T200 104 V140 H0 Z" class="illus-fill-3"/>
      <circle cx="162" cy="32" r="15" class="illus-fill-accent"/>
      <rect x="70" y="74" width="7" height="32" rx="3" class="illus-fill-muted"/>
      <circle cx="73" cy="60" r="24" class="illus-fill-1"/>
      <circle cx="53" cy="72" r="17" class="illus-fill-2"/>
      <circle cx="95" cy="70" r="19" class="illus-fill-2"/>
      <circle cx="140" cy="100" r="5" class="illus-fill-1"/>
      <circle cx="26" cy="106" r="4" class="illus-fill-accent"/>
      <circle cx="176" cy="110" r="4" class="illus-fill-1"/>`,
    people: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <circle cx="58" cy="54" r="15" class="illus-fill-1"/>
      <path d="M34 122 Q34 82 58 82 Q82 82 82 122 Z" class="illus-fill-1"/>
      <circle cx="102" cy="42" r="17" class="illus-fill-2"/>
      <path d="M74 122 Q74 72 102 72 Q130 72 130 122 Z" class="illus-fill-2"/>
      <circle cx="146" cy="56" r="14" class="illus-fill-accent"/>
      <path d="M124 122 Q124 84 146 84 Q168 84 168 122 Z" class="illus-fill-accent"/>`,
    wildlife: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <ellipse cx="112" cy="92" rx="30" ry="18" class="illus-fill-1"/>
      <circle cx="150" cy="70" r="13" class="illus-fill-1"/>
      <path d="M146 60 Q142 50 136 52 Q142 54 142 62Z" class="illus-fill-1"/>
      <path d="M136 54 Q126 40 116 44 Q128 44 130 56Z" class="illus-fill-muted"/>
      <path d="M144 52 Q140 36 148 30 Q146 40 150 46Z" class="illus-fill-muted"/>
      <path d="M154 52 Q160 36 168 32 Q162 42 160 48Z" class="illus-fill-muted"/>
      <rect x="90" y="104" width="6" height="18" rx="2" class="illus-fill-1"/>
      <rect x="104" y="106" width="6" height="18" rx="2" class="illus-fill-1"/>
      <rect x="118" y="106" width="6" height="18" rx="2" class="illus-fill-1"/>
      <rect x="130" y="104" width="6" height="18" rx="2" class="illus-fill-1"/>
      <path d="M38 46 Q46 36 56 44 Q48 40 46 50 Q42 40 34 45Z" class="illus-fill-accent"/>
      <path d="M58 30 Q66 20 76 28 Q68 24 66 34 Q62 24 54 29Z" class="illus-fill-2"/>`,
    safety: `
      <circle cx="100" cy="76" r="42" class="illus-fill-1"/>
      <path d="M100 46 L134 60 V80 Q134 106 100 118 Q66 106 66 80 V60 Z" class="illus-fill-surface"/>
      <path d="M84 80 L96 92 L118 64" fill="none" stroke="var(--brand-1)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M74 40 Q100 20 126 40 L120 48 Q100 34 80 48 Z" class="illus-fill-accent"/>
      <rect x="88" y="34" width="24" height="10" rx="2" class="illus-fill-accent"/>`,
    health: `
      <path d="M100 118 C60 92 40 70 40 48 C40 30 56 20 70 26 C82 31 90 42 100 54 C110 42 118 31 130 26 C144 20 160 30 160 48 C160 70 140 92 100 118Z" class="illus-fill-accent"/>
      <rect x="90" y="52" width="20" height="44" class="illus-fill-surface"/>
      <rect x="78" y="64" width="44" height="20" class="illus-fill-surface"/>
      <path d="M40 100 H70 L80 84 L92 112 L100 92 L108 100 H160" fill="none" stroke="var(--brand-1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    industry: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <path d="M18 122 V70 L54 88 V70 L90 88 V52 H108 V122 Z" class="illus-fill-1"/>
      <rect x="118" y="46" width="16" height="76" rx="3" class="illus-fill-2"/>
      <rect x="142" y="62" width="16" height="60" rx="3" class="illus-fill-2"/>
      <path d="M126 40 q-6 -10 2 -18 q-2 10 6 14 q4 4 0 10Z" class="illus-fill-muted"/>
      <path d="M150 56 q-5 -8 1 -14 q-1 8 5 11 q3 3 0 8Z" class="illus-fill-muted"/>
      <rect x="30" y="96" width="12" height="12" rx="2" class="illus-fill-surface"/>
      <rect x="62" y="100" width="12" height="12" rx="2" class="illus-fill-surface"/>`,
    energy: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <path d="M56 122 L64 44 L72 122 Z" class="illus-fill-muted"/>
      <circle cx="64" cy="42" r="6" class="illus-fill-1"/>
      <path d="M64 36 L60 6 L70 8 Z" class="illus-fill-1"/>
      <path d="M69 45 L96 58 L90 66 Z" class="illus-fill-1"/>
      <path d="M59 45 L32 58 L38 66 Z" class="illus-fill-1"/>
      <path d="M126 122 L134 46 H150 L158 122 Z" fill="none" stroke="var(--brand-2)" stroke-width="4"/>
      <path d="M131 96 H153 M133 74 H151 M135 58 H149" stroke="var(--brand-2)" stroke-width="4" stroke-linecap="round"/>
      <path d="M128 46 H118 M156 46 H166" stroke="var(--brand-2)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="176" cy="30" r="12" class="illus-fill-accent"/>`,
    services: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <rect x="34" y="56" width="86" height="66" rx="4" class="illus-fill-1"/>
      <path d="M28 56 H126 L118 34 H36 Z" class="illus-fill-accent"/>
      <rect x="50" y="76" width="26" height="26" rx="3" class="illus-fill-surface"/>
      <rect x="88" y="76" width="20" height="46" rx="3" class="illus-fill-surface"/>
      <rect x="132" y="76" width="40" height="34" rx="4" class="illus-fill-2"/>
      <path d="M172 86 h14 l10 12 v12 h-24Z" class="illus-fill-2"/>
      <circle cx="146" cy="116" r="8" class="illus-fill-muted"/>
      <circle cx="182" cy="116" r="8" class="illus-fill-muted"/>`,
    publichealth: `
      <path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
      <rect x="30" y="42" width="72" height="80" rx="5" class="illus-fill-1"/>
      <rect x="60" y="56" width="12" height="34" class="illus-fill-surface"/>
      <rect x="49" y="67" width="34" height="12" class="illus-fill-surface"/>
      <rect x="44" y="100" width="18" height="22" rx="2" class="illus-fill-surface"/>
      <rect x="72" y="100" width="18" height="22" rx="2" class="illus-fill-surface"/>
      <path d="M140 122 V70" stroke="var(--brand-2)" stroke-width="5" stroke-linecap="round"/>
      <path d="M140 84 q-18 -6 -20 -24 q20 2 20 24Z" class="illus-fill-2"/>
      <path d="M140 76 q18 -8 20 -26 q-20 4 -20 26Z" class="illus-fill-accent"/>
      <path d="M168 122 V88" stroke="var(--brand-2)" stroke-width="4" stroke-linecap="round"/>
      <path d="M168 98 q-14 -5 -15 -19 q15 2 15 19Z" class="illus-fill-2"/>`,
    audit: `
      <rect x="42" y="18" width="86" height="106" rx="7" class="illus-fill-3"/>
      <rect x="70" y="10" width="30" height="16" rx="5" class="illus-fill-2"/>
      <path d="M58 50 l8 8 16 -18" fill="none" stroke="var(--brand-1)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M58 78 l8 8 16 -18" fill="none" stroke="var(--brand-1)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="92" y="48" width="26" height="5" rx="2.5" class="illus-fill-2"/>
      <rect x="92" y="76" width="26" height="5" rx="2.5" class="illus-fill-2"/>
      <circle cx="140" cy="92" r="24" fill="none" stroke="var(--accent)" stroke-width="7"/>
      <path d="M157 109 L176 128" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"/>`,
    training: `
      <path d="M0 124 H200 V140 H0 Z" class="illus-fill-3"/>
      <path d="M100 30 L164 56 L100 82 L36 56 Z" class="illus-fill-1"/>
      <path d="M56 66 V96 q0 16 44 16 t44 -16 V66" fill="none" stroke="var(--brand-2)" stroke-width="7" stroke-linecap="round"/>
      <path d="M170 60 V96" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="170" cy="102" r="7" class="illus-fill-accent"/>`,
    supplies: `
      <path d="M0 124 H200 V140 H0 Z" class="illus-fill-3"/>
      <path d="M56 62 q0 -30 26 -30 t26 30 v6 H56Z" class="illus-fill-accent"/>
      <rect x="46" y="66" width="76" height="10" rx="5" class="illus-fill-accent"/>
      <path d="M132 78 h34 l6 42 h-46Z" class="illus-fill-1"/>
      <path d="M138 78 v-10 q0 -8 11 -8 t11 8 v10" fill="none" stroke="var(--brand-2)" stroke-width="5"/>
      <path d="M30 92 h28 v28 H30Z" class="illus-fill-2"/>
      <path d="M30 92 q-8 -14 6 -18 q6 -2 8 6" fill="none" stroke="var(--brand-2)" stroke-width="5" stroke-linecap="round"/>`,
    documents: `
      <rect x="34" y="20" width="72" height="94" rx="6" class="illus-fill-2"/>
      <rect x="52" y="30" width="72" height="94" rx="6" class="illus-fill-3"/>
      <rect x="70" y="40" width="72" height="94" rx="6" class="illus-fill-1"/>
      <rect x="84" y="60" width="44" height="6" rx="3" class="illus-fill-surface"/>
      <rect x="84" y="76" width="44" height="6" rx="3" class="illus-fill-surface"/>
      <rect x="84" y="92" width="26" height="6" rx="3" class="illus-fill-surface"/>
      <circle cx="158" cy="96" r="20" class="illus-fill-accent"/>
      <path d="M158 86 v20 M148 98 l10 10 10 -10" fill="none" stroke="var(--surface)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    sitemap: `
      <circle cx="100" cy="72" r="52" class="illus-fill-3"/>
      <path d="M48 72 h104 M100 20 q22 26 0 104 q-22 -52 0 -104" fill="none" stroke="var(--brand-2)" stroke-width="3"/>
      <circle cx="100" cy="72" r="52" fill="none" stroke="var(--brand-2)" stroke-width="3"/>
      <path d="M138 118 q-18 -22 -18 -34 a18 18 0 1 1 36 0 q0 12 -18 34Z" class="illus-fill-1"/>
      <circle cx="138" cy="83" r="7" class="illus-fill-surface"/>
      <path d="M56 108 q-12 -15 -12 -23 a12 12 0 1 1 24 0 q0 8 -12 23Z" class="illus-fill-accent"/>`,
    governance: `
      <rect x="52" y="26" width="70" height="92" rx="6" class="illus-fill-3"/>
      <rect x="66" y="44" width="42" height="5" rx="2.5" class="illus-fill-2"/>
      <rect x="66" y="58" width="42" height="5" rx="2.5" class="illus-fill-2"/>
      <rect x="66" y="72" width="26" height="5" rx="2.5" class="illus-fill-2"/>
      <path d="M132 40 L162 51 V72 Q162 96 132 108 Q102 96 102 72 V51 Z" class="illus-fill-1"/>
      <path d="M120 72 L129 82 L146 62" fill="none" stroke="var(--surface)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
  };
  function illustration(name, cls) {
    const content = ILLUS_CONTENT[name];
    if (!content) return "";
    return `<svg class="illus ${cls || ""}" viewBox="0 0 200 140" aria-hidden="true">${content}</svg>`;
  }

  function creditBalance() {
    if (!state.user) return 0;
    return state.credits[state.user.email] || 0;
  }
  function spendCredits(amount, reason) {
    if (!state.user) { alert("Log in first — free sign-up gives you " + VERDA_SEED.freeSignupCredits + " credits."); return false; }
    const bal = creditBalance();
    if (bal < amount) { alert(`Not enough credits. This action costs ${amount}, you have ${bal}. Visit Credits & Billing to top up.`); return false; }
    state.credits[state.user.email] = bal - amount;
    state.creditLedger.push({ id: uid("txn"), user: state.user.email, amount: -amount, reason, date: new Date().toISOString() });
    save();
    return true;
  }
  function addCredits(amount, reason) {
    if (!state.user) return;
    state.credits[state.user.email] = creditBalance() + amount;
    state.creditLedger.push({ id: uid("txn"), user: state.user.email, amount, reason, date: new Date().toISOString() });
    save();
  }

  /* ---------------------------- THEME ---------------------------------- */
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    save();
    if (window.__verdaMapActive) VerdaMap.setBasemap(theme);
  }

  /* ---------------------------- NAV / SECTIONS -------------------------- */
  const SECTIONS = [
    // Monitor — what's happening on site right now
    { id: "dashboard", group: "monitor", label: () => T().dashboard, render: renderDashboard },
    { id: "analytics", group: "monitor", label: () => T().analytics, render: renderAnalytics },
    { id: "incidents", group: "monitor", label: () => T().incidents, render: renderIncidents },
    { id: "risk", group: "monitor", label: () => T().risk, render: renderRisk },
    { id: "audits", group: "monitor", label: () => T().audits, render: renderAudits },
    { id: "inspections", group: "monitor", label: () => T().inspections, render: renderInspections },
    { id: "records", group: "monitor", label: () => T().records, render: renderRecords },
    { id: "maps", group: "monitor", label: () => T().maps, render: renderMaps },

    // Manage — the programmes and deliverables that follow from it
    { id: "actions", group: "manage", label: () => T().actions, render: renderActions },
    { id: "reporting", group: "manage", label: () => T().reporting, render: renderReporting },
    { id: "tor", group: "manage", label: () => T().tor, render: renderTor },
    { id: "esia", group: "manage", label: () => T().esia, render: renderEsia },
    { id: "training", group: "manage", label: () => T().training, render: renderTraining },
    { id: "workflows", group: "manage", label: () => T().workflows, render: renderWorkflows },
    { id: "clients", group: "manage", label: () => T().clients, render: renderClients },
    { id: "checklists", group: "manage", label: () => T().checklists, render: renderChecklists },
    { id: "documents", group: "manage", label: () => T().documents, render: renderDocuments },
    { id: "credits", group: "manage", label: () => T().credits, render: renderCredits },
    { id: "revenue", group: "manage", label: () => T().revenue, render: renderRevenue },
    { id: "plans", group: "grow", label: () => T().plans, render: renderPlans },

    // Grow — enablement, marketplace and community
    { id: "solutions", group: "grow", label: () => T().solutions, render: renderSolutions },
    { id: "resources", group: "grow", label: () => T().resources, render: renderResources },
    { id: "supplies", group: "grow", label: () => T().supplies, render: renderSupplies },
    { id: "iec", group: "grow", label: () => T().iec, render: renderIec },
    { id: "skills", group: "grow", label: () => T().skills, render: renderSkills },

    // Free — open to anyone, no account. The screening tool is the front door:
    // someone with a plot of land and a question finds out what the law asks of
    // them, and only then meets the people who can do the work.
    { id: "screening", group: "free", label: () => T().screening, render: renderScreening },
    { id: "monitors", group: "free", label: () => T().monitors, render: renderMonitors },
    { id: "toolbox", group: "free", label: () => T().toolbox, render: renderToolbox }
  ];

  function buildNav() {
    const groups = [
      { id: "free", label: T().nav_free },
      { id: "monitor", label: T().nav_monitor },
      { id: "manage", label: T().nav_manage },
      { id: "grow", label: T().nav_grow }
    ];
    const nav = document.getElementById("sidebar");
    nav.innerHTML = groups.map(g => `
      <div class="nav-group">
        <div class="nav-group-title">${g.label}</div>
        ${SECTIONS.filter(s => s.group === g.id).map(s => `<a href="#/${s.id}" class="nav-item" data-id="${s.id}">${icon(s.id)}<span>${s.label()}</span></a>`).join("")}
      </div>`).join("");
  }

  /* Picture for each sector family on the dashboard's coverage grid. */
  const SECTOR_GROUP_ILLUS = {
    "Industrial & Manufacturing": "industry",
    "Mining & Minerals": "mining",
    "Energy, Resources & Construction": "energy",
    "Services & Commerce": "services",
    "Public, Health & Agriculture": "publichealth"
  };

  /* Which illustration heads each module page. Dashboard is excluded — it
     leads with the hero and the pillar gallery instead. */
  const SECTION_ILLUS = {
    analytics: "governance", incidents: "safety", risk: "safety", audits: "audit",
    inspections: "audit", tor: "documents",
    records: "people", maps: "sitemap", actions: "audit", reporting: "documents",
    esia: "wildlife", training: "training", workflows: "governance", clients: "people",
    checklists: "industry", documents: "documents", credits: "governance", revenue: "governance", plans: "revenue",
    solutions: "industry", resources: "training", supplies: "supplies",
    iec: "health", skills: "training",
    screening: "sitemap", monitors: "people", toolbox: "audit"
  };

  /* Give every module page a picture without touching 20 render functions:
     wrap its <h1> (and the lead paragraph after it) beside an illustration. */
  function addPageHeaderIllustration(main, sectionId) {
    const name = SECTION_ILLUS[sectionId];
    if (!name) return;
    const h1 = main.querySelector("h1");
    if (!h1 || h1.closest(".hero")) return;

    const wrap = document.createElement("div");
    wrap.className = "page-header";
    const text = document.createElement("div");
    text.className = "page-header-text";
    h1.parentNode.insertBefore(wrap, h1);
    const lead = h1.nextElementSibling && h1.nextElementSibling.matches("p") ? h1.nextElementSibling : null;
    wrap.appendChild(text);
    text.appendChild(h1);
    if (lead) text.appendChild(lead);
    wrap.insertAdjacentHTML("beforeend", illustration(name, "page-header-illus"));
  }

  function currentSectionId() {
    const h = location.hash.replace(/^#\//, "");
    return SECTIONS.some(s => s.id === h) ? h : "dashboard";
  }

  function route() {
    const id = currentSectionId();
    document.querySelectorAll(".nav-item").forEach(a => a.classList.toggle("active", a.dataset.id === id));
    const section = SECTIONS.find(s => s.id === id);
    const main = document.getElementById("main");
    main.innerHTML = "";
    section.render(main);
    addPageHeaderIllustration(main, id);
    updateCreditsChip();
  }

  function updateCreditsChip() {
    const el = document.getElementById("topbar-credits");
    el.hidden = !state.user;
    el.innerHTML = state.user ? `${icon("coin")}<span>${creditBalance()} credits</span>` : "";
  }

  /* ---------------------------- helpers ---------------------------------- */
  function h(str) { const d = document.createElement("div"); d.innerHTML = str.trim(); return d.firstElementChild; }
  /* Handing the user a file, wherever Verda is running.
     Opened from a file or a web server, an anchor with `download` is the whole
     story. Published as a Claude artifact, the page runs in a frame that never
     grants plain downloads — an anchor there silently does nothing, which is
     the worst outcome: the user clicks, believes they have the report, and
     leaves without it. The frame's runtime mediates saving instead, so try
     that first and fall back to the anchor when there is no runtime. */
  async function saveFile(filename, data, mime) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime || "text/plain" });
    if (typeof window.claude === "object" && window.claude && typeof window.claude.use === "function") {
      try {
        const downloads = await window.claude.use("downloads");
        if (downloads) {
          await downloads.save({ filename, data: blob });
          return true;
        }
      } catch (err) {
        // The viewer saying no is an answer, not a failure: never nag, never
        // retry. Anything else is worth naming, because the user is standing
        // there waiting for a file that is not coming.
        const code = err && err.code;
        if (code === "declined") return false;
        if (code === "rate_limited") { alert("A save prompt is already open — finish that one first."); return false; }
        alert("That file could not be saved here (" + (code || "unknown error") + "). Open Verda from app/index.html to download it.");
        return false;
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  }
  function downloadText(filename, text) {
    return saveFile(filename, text, "text/plain");
  }
  /* An empty table is the first thing a new user meets on half these screens.
     Give it the module's own illustration and a sentence naming the next
     action, rather than a line of grey text that explains nothing. */
  function emptyState(illusName, message, cols) {
    const inner = `<div class="empty-state">${illustration(illusName)}<p>${message}</p></div>`;
    return cols ? `<tr><td colspan="${cols}">${inner}</td></tr>` : inner;
  }

  function card(title, bodyHtml, extraClass) {
    return `<div class="card ${extraClass || ""}"><h3>${title}</h3>${bodyHtml}</div>`;
  }
  function statCard(iconName, label, value, sub, warn) {
    return `<div class="card stat-card">
      <div class="stat-icon ${warn ? "stat-icon-warn" : ""}">${icon(iconName)}</div>
      <div class="stat-body">
        <div class="stat-label">${label}</div>
        <div class="stat ${warn ? "warn" : ""}">${value}</div>
        <p class="muted small">${sub}</p>
      </div>
    </div>`;
  }
  /* Every value a user typed is escaped before it reaches innerHTML.
     With local-only storage this is self-XSS, but the moment records are
     shared between tenants an unescaped incident description becomes
     stored XSS in someone else's session — so it is escaped at the seam,
     not left for the backend to worry about. */
  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function today() { return new Date().toISOString().slice(0, 10); }
  function daysUntil(dateStr) {
    if (!dateStr) return null;
    return Math.round((new Date(dateStr) - new Date(today())) / 86400000);
  }
  function addDays(dateStr, n) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + Number(n || 0));
    return d.toISOString().slice(0, 10);
  }
  function addMonths(dateStr, months) {
    const d = new Date(dateStr);
    d.setMonth(d.getMonth() + months);
    return d.toISOString().slice(0, 10);
  }
  function statusBadge(label, status) {
    return `<span class="badge badge-${status || "neutral"}">${label}</span>`;
  }
  function riskBandFor(score) {
    return VERDA_SEED.riskBands.find(b => score <= b.max) || VERDA_SEED.riskBands[VERDA_SEED.riskBands.length - 1];
  }
  function trainingStatus(expiry) {
    const d = daysUntil(expiry);
    if (d === null) return { label: "Unknown", status: "neutral" };
    if (d < 0) return { label: "Expired", status: "critical" };
    if (d <= 60) return { label: "Expiring soon", status: "warning" };
    return { label: "Valid", status: "good" };
  }

  /* ---- Charts: inline SVG, no chart library (keeps the app offline-capable).
     Colors come from CSS custom properties so they follow the active theme;
     the status palette is fixed and always paired with a visible label. ---- */
  function barChart(rows, title, valueLabel) {
    const W = 520, H = 210, padL = 16, padR = 12, padT = 26, padB = 40;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const max = Math.max(1, ...rows.map(r => r.value));
    const n = rows.length || 1;
    const slot = plotW / n, barW = Math.min(52, slot * 0.6);
    const bars = rows.map((r, i) => {
      const hgt = Math.round((r.value / max) * plotH);
      const x = padL + slot * i + (slot - barW) / 2;
      const y = padT + plotH - hgt;
      const rad = Math.min(4, hgt);
      const d = hgt <= 0 ? "" :
        `M${x} ${y + hgt} V${y + rad} q0 -${rad} ${rad} -${rad} h${barW - 2 * rad} q${rad} 0 ${rad} ${rad} V${y + hgt} Z`;
      return `<g><title>${r.label}: ${r.value}</title>` +
        (hgt > 0 ? `<path d="${d}" style="fill:${r.color}"/>` : "") +
        `<text x="${x + barW / 2}" y="${y - 7}" class="chart-value">${r.value}</text>` +
        `<text x="${x + barW / 2}" y="${padT + plotH + 17}" class="chart-label">${r.label}</text></g>`;
    }).join("");
    const table = `<details class="chart-table"><summary>View data table</summary>
      <table class="table"><thead><tr><th>${title}</th><th>${valueLabel || "Count"}</th></tr></thead><tbody>
      ${rows.map(r => `<tr><td>${r.label}</td><td>${r.value}</td></tr>`).join("")}
      </tbody></table></details>`;
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
      <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" class="chart-axis"/>
      ${bars}</svg>${table}`;
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  /* ============================ DASHBOARD ============================ */
  function renderDashboard(main) {
    const upcoming = [...state.clients].sort((a, b) => a.nextVisit.localeCompare(b.nextVisit)).slice(0, 5);
    const permitsSoon = state.clients.filter(c => new Date(c.permitExpiry) < new Date(Date.now() + 60 * 86400000));
    main.appendChild(h(`
      <section>
        <div class="hero">
          <h1>Welcome to Verda</h1>
          <p>${T().tagline}</p>
          ${!state.user ? `<div class="hero-actions">
            <a class="btn btn-primary" href="#/dashboard" id="hero-signup">${T().signup}</a>
            <a class="btn btn-ghost" href="#/dashboard" id="hero-login">${T().login}</a>
          </div>` : `<p>Signed in as <strong>${esc(state.user.name)}</strong> · ${esc(state.user.role) || ""} · ${creditBalance()} credits</p>`}
        </div>
        <div class="grid grid-3">
          ${statCard("clients", "Active Compliance Care Plans", state.clients.length, "Recurring clients under a Verda compliance care plan.")}
          ${statCard("warn", "Permits due within 60 days", permitsSoon.length, "Check Checklists → Permits for the full list.", permitsSoon.length > 0)}
          ${statCard("reporting", "Reports generated", state.reports.length, "Verda Reporting drafts created so far.")}
        </div>
        <h3>What Verda covers</h3>
        <div class="focus-grid">
          ${VERDA_SEED.pillars.map(p => `
            <a class="focus-card" href="#/${p.link}">${illustration(p.illus)}<h4>${p.name}</h4><p class="muted small">${p.blurb}</p></a>
          `).join("")}
        </div>
        <h3>Every sector, one platform</h3>
        <p class="muted small">${VERDA_SEED.industries.length} sectors with their own compliance checklists — pick yours to jump straight in.</p>
        <div class="sector-groups">
          ${[...new Set(VERDA_SEED.industries.map(i => i.group))].map(group => `
            <div class="sector-group">
              <div class="sector-group-header">
                ${illustration(SECTOR_GROUP_ILLUS[group] || "industry", "sector-group-illus")}
                <div class="sector-group-title">${group}</div>
              </div>
              <div class="sector-chips">
                ${VERDA_SEED.industries.filter(i => i.group === group).map(i =>
                  `<button class="sector-chip" data-sector="${i.id}">${i.name}</button>`).join("")}
              </div>
            </div>`).join("")}
        </div>
        <div class="grid grid-2">
          ${card("Upcoming site visits", `<table class="table"><thead><tr><th>Client</th><th>Industry</th><th>Next visit</th></tr></thead><tbody>${
            upcoming.map(c => `<tr><td>${esc(c.name)}</td><td>${esc(c.industry)}</td><td>${esc(c.nextVisit)}</td></tr>`).join("")
          }</tbody></table>`)}
          ${card("Quick actions", `<div class="quick-actions">
            <a class="btn" href="#/reporting">${icon("reporting")}<span>New Verda Report</span></a>
            <a class="btn" href="#/esia">${icon("esia")}<span>New ToR / ESIA Draft</span></a>
            <a class="btn" href="#/audits">${icon("audits")}<span>Run an Audit</span></a>
            <a class="btn" href="#/records">${icon("records")}<span>Add a Record / Photo</span></a>
          </div>`)}
        </div>
      </section>
    `));
    const su = document.getElementById("hero-signup"), li = document.getElementById("hero-login");
    if (su) su.addEventListener("click", (e) => { e.preventDefault(); openAuthModal("signup"); });
    if (li) li.addEventListener("click", (e) => { e.preventDefault(); openAuthModal("login"); });

    main.querySelectorAll("[data-sector]").forEach(btn => btn.addEventListener("click", () => {
      state.ui.checklistIndustry = btn.dataset.sector;
      save();
      location.hash = "#/checklists";
    }));
  }

  /* ============================ AUTH (demo) ============================ */
  function openAuthModal(mode) {
    const overlay = h(`<div class="modal-overlay"><div class="modal">
      <h2>${mode === "signup" ? T().signup : T().login}</h2>
      <p class="muted small">Prototype authentication — stored in this browser only. Wire up a real identity provider before production use.</p>
      <form id="auth-form">
        ${mode === "signup" ? `
          <label>Full name<input required name="name" /></label>
          <label>Company<input name="company" /></label>
          <label>Industry
            <select name="industry">${[...new Set(VERDA_SEED.industries.map(i => i.group))].map(g =>
              `<optgroup label="${esc(g)}">${VERDA_SEED.industries.filter(i => i.group === g).map(i =>
                `<option value="${esc(i.name)}">${esc(i.name)}</option>`).join("")}</optgroup>`).join("")}</select>
          </label>
          <label>Role
            <select name="role">${VERDA_SEED.solutionsByRole.map(r => `<option>${r.name}</option>`).join("")}</select>
          </label>` : ""}
        <label>Email<input required type="email" name="email" /></label>
        <label>Password<input required type="password" name="password" /></label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" id="auth-cancel">Cancel</button>
          <button type="submit" class="btn btn-primary">${mode === "signup" ? T().signup : T().login}</button>
        </div>
      </form>
    </div></div>`);
    document.body.appendChild(overlay);
    overlay.querySelector("#auth-cancel").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector("#auth-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const email = fd.get("email").trim().toLowerCase();
      if (mode === "signup") {
        if (state.users.some(u => u.email === email)) { alert("An account with that email already exists — log in instead."); return; }
        const user = { name: fd.get("name"), email, company: fd.get("company"), industry: fd.get("industry"), role: fd.get("role"), password: fd.get("password") };
        state.users.push(user);
        state.credits[email] = VERDA_SEED.freeSignupCredits;
        state.user = user;
      } else {
        const u = state.users.find(u => u.email === email && u.password === fd.get("password"));
        if (!u) { alert("No matching account. Try Free Sign Up."); return; }
        state.user = u;
      }
      save();
      overlay.remove();
      renderTopbar();
      route();
    });
  }

  function renderTopbar() {
    const box = document.getElementById("topbar-auth");
    if (state.user) {
      box.innerHTML = `<span class="muted small">${esc(state.user.name)}</span> <button class="btn btn-ghost" id="logout-btn">${T().logout}</button>`;
      document.getElementById("logout-btn").addEventListener("click", () => { state.user = null; save(); renderTopbar(); route(); });
    } else {
      box.innerHTML = `<button class="btn btn-ghost" id="login-btn">${T().login}</button><button class="btn btn-primary" id="signup-btn">${T().signup}</button>`;
      document.getElementById("login-btn").addEventListener("click", () => openAuthModal("login"));
      document.getElementById("signup-btn").addEventListener("click", () => openAuthModal("signup"));
    }
    updateCreditsChip();
  }

  /* ============================ VERDA REPORTING ============================ */

  // Categorical series colours, in fixed order (never cycled). Slots 1-3 of the
  // validated palette; a table asking for more than three series is capped.
  const SERIES_VARS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

  // Grouped bar chart, 1-3 series. Single series needs no legend (the title
  // names it); two or more always carry one, plus direct value labels, so
  // identity is never colour-alone.
  function groupedBarChart(rows, seriesDefs, title, valueLabel) {
    const series = seriesDefs.slice(0, 3);
    if (!rows.length || !series.length) return "";
    const W = 560, H = 230, padL = 16, padR = 12, padT = 28, padB = 46;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const max = Math.max(1, ...rows.flatMap(r => series.map(s => Number(r.values[s.key]) || 0)));
    const slot = plotW / rows.length;
    const groupW = Math.min(58 * series.length, slot * 0.68);
    const barW = Math.max(4, (groupW - 2 * (series.length - 1)) / series.length); // 2px surface gap
    const body = rows.map((r, i) => {
      const gx = padL + slot * i + (slot - groupW) / 2;
      return series.map((s, j) => {
        const v = Number(r.values[s.key]) || 0;
        const hgt = Math.round((v / max) * plotH);
        const x = gx + j * (barW + 2);
        const y = padT + plotH - hgt;
        const rad = Math.min(4, hgt, barW / 2);
        const d = hgt <= 0 ? "" :
          `M${x} ${y + hgt} V${y + rad} q0 -${rad} ${rad} -${rad} h${barW - 2 * rad} q${rad} 0 ${rad} ${rad} V${y + hgt} Z`;
        // A single-series chart may colour each bar by its own category
        // (the reserved status palette); multi-series colours by series.
        const fill = (series.length === 1 && r.color) ? r.color : (s.color || SERIES_VARS[j]);
        return `<g><title>${esc(r.label)} — ${esc(s.label)}: ${esc(String(v))}</title>` +
          (hgt > 0 ? `<path d="${d}" style="fill:${fill}"/>` : "") +
          `<text x="${x + barW / 2}" y="${y - 6}" class="chart-value">${esc(String(v))}</text></g>`;
      }).join("") +
        `<text x="${gx + groupW / 2}" y="${padT + plotH + 17}" class="chart-label">${esc(shortLabel(r.label))}</text>`;
    }).join("");
    const legend = series.length > 1
      ? `<div class="chart-legend">${series.map((s, j) =>
          `<span class="legend-item"><i style="background:${s.color || SERIES_VARS[j]}"></i>${esc(s.label)}</span>`).join("")}</div>`
      : "";
    const table = `<details class="chart-table"><summary>View data table</summary>
      <div class="table-scroll"><table class="table"><thead><tr><th>${esc(title)}</th>
      ${series.map(s => `<th>${esc(s.label)}${valueLabel ? ` (${esc(valueLabel)})` : ""}</th>`).join("")}</tr></thead><tbody>
      ${rows.map(r => `<tr><td>${esc(r.label)}</td>${series.map(s => `<td>${esc(String(r.values[s.key] ?? "—"))}</td>`).join("")}</tr>`).join("")}
      </tbody></table></div></details>`;
    return `<figure class="chart-figure"><figcaption class="chart-title">${esc(title)}</figcaption>
      <svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">
      <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" class="chart-axis"/>
      ${body}</svg>${legend}${table}</figure>`;
  }

  function shortLabel(s) {
    s = String(s || "");
    return s.length > 16 ? s.slice(0, 15) + "…" : s;
  }

  // Build chart rows from a table's live data. Returns null when there is
  // nothing numeric to plot yet — an empty chart frame is worse than none.
  function chartFromTable(tableDef, rows) {
    const spec = tableDef.chart;
    if (!spec || !rows || !rows.length) return null;
    if (spec.count) {
      // Count rows per category (e.g. grievances by status).
      const counts = new Map();
      rows.forEach(r => {
        const k = (r[spec.labelKey] || "").trim();
        if (k) counts.set(k, (counts.get(k) || 0) + 1);
      });
      if (!counts.size) return null;
      const palette = spec.status ? statusColorFor : null;
      return {
        rows: Array.from(counts, ([label, n]) => ({ label, values: { count: n }, color: palette ? palette(label) : null })),
        series: [{ key: "count", label: spec.valueLabel || "Count" }],
        title: spec.title, valueLabel: spec.valueLabel,
        perRowColor: !!palette
      };
    }
    const keys = spec.valueKeys.slice(0, 3);
    const out = rows
      .filter(r => (r[spec.labelKey] || "").trim() && keys.some(k => String(r[k] ?? "").trim() !== ""))
      .map(r => ({ label: r[spec.labelKey], values: Object.fromEntries(keys.map(k => [k, Number(r[k]) || 0])) }));
    if (!out.length) return null;
    const colFor = (k) => (tableDef.columns.find(c => c.key === k) || {}).label || k;
    return {
      rows: out,
      series: keys.map(k => ({ key: k, label: colFor(k) })),
      title: spec.title, valueLabel: spec.valueLabel
    };
  }

  // Status words map to the reserved status palette, so "Above limit" is never
  // the same colour as a neutral series.
  function statusColorFor(label) {
    const t = String(label).toLowerCase();
    if (/open|above|non-?compliant|expired|not paid|disputed|major|not obtained|not implemented|destroyed/.test(t)) return "var(--chart-critical)";
    if (/investigat|partial|part paid|applied|in progress|pending|minor|under |await/.test(t)) return "var(--chart-warning)";
    if (/closed|resolved|valid|within|compliant|paid|effective|delivered|obtained|protected/.test(t)) return "var(--chart-good)";
    return "var(--chart-1)";
  }

  function renderChartBlock(tableDef, rows) {
    const c = chartFromTable(tableDef, rows);
    if (!c) return `<p class="muted small chart-empty">Add rows with numbers and a chart appears here.</p>`;
    // Status charts carry a colour per row (the reserved status palette);
    // every bar is directly labelled with its category either way.
    return groupedBarChart(c.rows, c.series, c.title, c.valueLabel);
  }

  // Downscale a dropped photo before it is stored: site photos off a phone are
  // several MB each and localStorage is a few MB in total.
  function compressImage(file, maxDim, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("not an image"));
        img.onload = () => {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const hh = Math.max(1, Math.round(img.height * scale));
          const cv = document.createElement("canvas");
          cv.width = w; cv.height = hh;
          cv.getContext("2d").drawImage(img, 0, 0, w, hh);
          resolve(cv.toDataURL("image/jpeg", quality));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  const MAX_PHOTOS_PER_SECTION = 6;

  // Binary floating point makes 188.4 + 2.8 come out as 191.20000000000002.
  // Quantities in a compliance report are reported to at most a few decimals,
  // so round at the point the figure is produced rather than showing the user
  // an artefact of how the number is stored.
  function roundQty(n) {
    return Math.round((Number(n) + Number.EPSILON) * 1e6) / 1e6;
  }

  /* ---- Carry-forward of cumulative figures -------------------------------
     Lender-facing reports ask for two numbers on every line: this period, and
     the running total to date. Re-typing the running total each period is how
     those series go wrong, and a client 20 periods in cannot reconstruct it
     from scratch. Verda owns the series instead: the previous report for the
     same client and format supplies the opening balance, and the new total is
     computed rather than typed. */

  function priorReportFor(clientName, standardId) {
    return state.reports
      .filter(r => r.clientName === clientName && r.standard === standardId && r.full)
      .slice(-1)[0] || null;
  }

  // The cumulative figure this row closed at last period, or null if this row
  // (or this client) has no history yet.
  function priorCumulative(prior, sectionId, tableDef, labelValue) {
    if (!prior) return null;
    const cf = tableDef.carryForward;
    const rows = ((prior.full.segmentData[sectionId] || {}).tables || {})[tableDef.id];
    if (!rows) return null;
    const key = String(labelValue || "").trim().toLowerCase();
    if (!key) return null;
    const match = rows.find(r => String(r[cf.labelKey] || "").trim().toLowerCase() === key);
    if (!match) return null;
    const v = Number(match[cf.cumulativeKey]);
    return Number.isFinite(v) ? v : null;
  }

  function renderReporting(main) {
    let standard = VERDA_SEED.reportStandards[0];
    const segsFor = (std) => VERDA_SEED[std.segmentsKey];
    let segs = segsFor(standard);
    let guided = state.reportGuided !== false;   // on by default — most users are new to this

    // Live form model, kept outside the DOM so adding a table row or a photo
    // never discards what is already typed.
    let model = {};                              // sectionId -> { blocks, inputs, tables, photos }
    function sectionModel(id) {
      if (!model[id]) model[id] = { blocks: {}, inputs: {}, tables: {}, photos: [] };
      return model[id];
    }
    function tableRows(sectionId, tableDef) {
      const m = sectionModel(sectionId);
      if (!m.tables[tableDef.id]) {
        const starters = (tableDef.starterRows || []).map(r => Object.assign({}, r));
        m.tables[tableDef.id] = starters.length ? starters : [{}];
      }
      return m.tables[tableDef.id];
    }
    const tablesFor = (id) => VERDA_SEED.sectionTables[id] || [];

    let prior = null;                    // previous report for this client + format
    function refreshPrior() {
      const sel = main.querySelector("#rep-client");
      const client = sel && state.clients.find(c => c.id === sel.value);
      prior = client ? priorReportFor(client.name, standard.id) : null;
    }

    // Starter rows pre-fill a label column so the expected rows are visible.
    // A row carrying nothing but that scaffolding is not data, and must not be
    // reported as if the user had filled it in.
    function rowHasContent(tableDef, row) {
      const starterKeys = new Set((tableDef.starterRows || []).flatMap(r => Object.keys(r)));
      return Object.entries(row).some(([k, v]) =>
        String(v ?? "").trim() && !starterKeys.has(k));
    }
    function filledRows(sectionId, tableDef) {
      return (sectionModel(sectionId).tables[tableDef.id] || []).filter(r => rowHasContent(tableDef, r));
    }

    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>Verda Reporting</h1>
            <p class="muted">Fill in the tables, add your photos, and Verda assembles the report. Every section is optional — include only what applies to this client.</p>
          </div>
        </div>

        <div class="card notice-card" id="how-to">
          <h3>How to build a report — four steps</h3>
          <ol class="steps">
            <li><strong>Pick the format and the client.</strong> Verda's own segments for a straightforward monthly report, the IFC Performance Standards where a lender requires them, or the full ESSR where your contract demands it.</li>
            <li><strong>Tick the sections that apply.</strong> Untick anything that doesn't — you are not expected to fill all of them.</li>
            <li><strong>Fill the tables and drop in photos.</strong> Each table says what belongs in it. Numbers become charts automatically. Leave a figure blank if you don't have it; enter <strong>0</strong> if it genuinely is zero — those mean different things.</li>
            <li><strong>Generate, read it, then download.</strong> The draft is a starting point, not a finished submission. Read every line before it leaves your hands.</li>
          </ol>
          <label class="switch"><input type="checkbox" id="guided-toggle" ${guided ? "checked" : ""} />
            <span>Guided mode — show what each section is for, with example wording</span></label>
        </div>

        <div class="card">
          <div class="form-row">
            <label>Reporting format
              <select id="rep-standard">${VERDA_SEED.reportStandards.map(s => `<option value="${esc(s.id)}">${esc(s.name)}</option>`).join("")}</select>
            </label>
            <label>Client
              <select id="rep-client">${state.clients.map(c =>
                `<option value="${esc(c.id)}" ${currentClient() && c.id === currentClient().id ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select>
            </label>
            <label>Reporting period<input id="rep-period" placeholder="e.g. October 2026 / Q3 2026" /></label>
          </div>
          <div id="rep-header-fields" class="field-grid"></div>
        </div>

        <div class="card">
          <h3>Sections to include</h3>
          <p class="muted small" id="seg-progress"></p>
          <div class="seg-toggle-actions">
            <button class="btn btn-ghost btn-sm" id="seg-all">Select all</button>
            <button class="btn btn-ghost btn-sm" id="seg-none">Clear all</button>
          </div>
          <div id="seg-toggles"></div>
        </div>

        <div id="seg-forms"></div>

        <div class="card">
          <button class="btn btn-primary" id="gen-report">Generate report with AI Assist (${VERDA_SEED.creditCosts.aiDraft} credits)</button>
          <p class="muted small">Drafts the narrative from what you entered. It cannot invent data it wasn't given — blank stays blank.</p>
        </div>
        <div id="report-output"></div>

        <div class="card">
          <h3>Past reports</h3>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>Client</th><th>Format</th><th>Period</th><th>Sections</th><th>Photos</th><th>Generated</th><th></th></tr></thead>
            <tbody id="reports-list"></tbody></table>
          </div>
        </div>
      </section>
    `));

    /* ---- header fields (format-specific, e.g. ESSR document number) ---- */
    function renderHeaderFields() {
      const box = main.querySelector("#rep-header-fields");
      box.innerHTML = (standard.headerFields || []).map(f =>
        `<label>${esc(f.label)}<input data-header="${esc(f.key)}" placeholder="${esc(f.placeholder || "")}" /></label>`
      ).join("");
    }

    /* ---- one table ---- */
    function tableHtml(sectionId, t) {
      const rows = tableRows(sectionId, t);
      const head = t.columns.map(c =>
        `<th>${esc(c.label)}${c.unit ? ` <span class="muted">(${esc(c.unit)})</span>` : ""}</th>`).join("");
      const body = rows.map((row, ri) => `<tr>${t.columns.map(c => {
        const v = row[c.key] == null ? "" : String(row[c.key]);
        if (c.type === "select") {
          return `<td><select data-cell="${esc(c.key)}" data-row="${ri}">
            <option value="">—</option>
            ${c.options.map(o => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></td>`;
        }
        // The cumulative column is computed from last period's closing figure
        // plus this period's, and locked — except on the first report for this
        // client, where the user establishes the opening balance.
        if (t.carryForward && c.key === t.carryForward.cumulativeKey) {
          const opening = priorCumulative(prior, sectionId, t, row[t.carryForward.labelKey]);
          if (opening !== null) {
            const total = roundQty(opening + (Number(row[t.carryForward.periodKey]) || 0));
            row[c.key] = String(total);
            return `<td><input type="number" class="cell-computed" data-cell="${esc(c.key)}" data-row="${ri}"
              value="${total}" readonly
              title="Carried forward from ${esc(prior.period)}: ${opening}, plus this period" /></td>`;
          }
        }
        const type = c.type === "number" ? "number" : c.type === "date" ? "date" : "text";
        return `<td><input type="${type}" data-cell="${esc(c.key)}" data-row="${ri}" value="${esc(v)}" /></td>`;
      }).join("")}<td class="row-actions"><button class="btn btn-ghost btn-sm" data-delrow="${ri}" title="Remove this row" aria-label="Remove row ${ri + 1}">✕</button></td></tr>`).join("");
      return `<div class="report-table" data-table="${esc(t.id)}">
        <div class="report-table-head">
          <h5>${esc(t.title)}</h5>
          ${t.hint ? `<p class="muted small">${esc(t.hint)}</p>` : ""}
        </div>
        <div class="table-scroll"><table class="table entry-table"><thead><tr>${head}<th></th></tr></thead>
        <tbody>${body}</tbody></table></div>
        <button class="btn btn-ghost btn-sm" data-addrow="${esc(t.id)}">+ Add row</button>
        ${t.carryForward ? (prior
          ? `<p class="muted small carry-note">Running totals are carried forward from <strong>${esc(prior.period)}</strong> and locked — enter this period's figure and the total updates itself.</p>`
          : `<p class="muted small carry-note">This is the first report for this client in this format, so enter the opening running totals yourself. From the next one Verda carries them forward.</p>`) : ""}
        <div class="chart-slot" data-chart="${esc(t.id)}">${t.chart ? renderChartBlock(t, rows) : ""}</div>
      </div>`;
    }

    /* ---- one section ---- */
    function sectionHtml(sec) {
      const blocks = standard.blocks || DEFAULT_BLOCKS;
      const m = sectionModel(sec.id);
      const guide = VERDA_SEED.sectionGuide[sec.id];
      const guideHtml = (guided && guide) ? `<div class="guide-box">
        <p><strong>What this section is for.</strong> ${esc(guide.what)}</p>
        <p><strong>How to fill it.</strong> ${esc(guide.how)}</p>
        <details><summary>Example wording</summary>
          <p class="guide-example">${esc(guide.example)}</p>
          <p class="muted small">Guidance only — describe what actually happened on your site.</p>
        </details>
      </div>` : "";
      const fields = (sec.fields || []).map(f =>
        `<label class="field-sm">${esc(f.label)}${f.unit ? ` <span class="muted">(${esc(f.unit)})</span>` : ""}
          <input type="${f.type === "number" ? "number" : "text"}" data-input="${esc(f.key)}"
            value="${esc(m.inputs[f.key] || "")}" placeholder="${esc(f.placeholder || "")}" /></label>`).join("");
      const tables = tablesFor(sec.id).map(t => tableHtml(sec.id, t)).join("");
      const narrative = blocks.map(b =>
        `<label>${esc(b.label)}<textarea data-field="${esc(b.key)}" rows="3"
          placeholder="${esc(b.label)} — in your own words.">${esc(m.blocks[b.key] || "")}</textarea></label>`).join("");
      return `<div class="card seg-form" data-seg="${esc(sec.id)}">
        <h4>${esc(sec.label)}</h4>
        ${sec.hint ? `<p class="muted small">${esc(sec.hint)}</p>` : ""}
        ${guideHtml}
        ${fields ? `<h5>Summary figures</h5><div class="field-grid">${fields}</div>` : ""}
        ${tables}
        <h5>Narrative</h5>
        ${narrative}
        <h5>Photographs</h5>
        <div class="dropzone" data-drop="${esc(sec.id)}" tabindex="0" role="button"
             aria-label="Add photographs for ${esc(sec.label)}">
          <p><strong>Drag photos here</strong> — or click to choose, or paste from your clipboard.</p>
          <p class="muted small">Up to ${MAX_PHOTOS_PER_SECTION} per section. Photos are resized in your browser and stored on this device only.</p>
          <input type="file" accept="image/*" multiple hidden data-file="${esc(sec.id)}" />
        </div>
        <div class="photo-grid" data-photos="${esc(sec.id)}"></div>
      </div>`;
    }

    /* ---- photos ---- */
    function renderPhotos(sectionId) {
      const grid = main.querySelector(`[data-photos="${sectionId}"]`);
      if (!grid) return;
      const photos = sectionModel(sectionId).photos;
      grid.innerHTML = photos.map((p, i) => `<figure class="photo-card">
        <img src="${p.src}" alt="${esc(p.caption || "Site photograph")}" />
        <input class="photo-caption" data-caption="${i}" value="${esc(p.caption || "")}" placeholder="Caption — what this shows" />
        <button class="btn btn-ghost btn-sm" data-delphoto="${i}">Remove</button>
      </figure>`).join("");
      grid.querySelectorAll("[data-caption]").forEach(inp => inp.addEventListener("input", () => {
        photos[Number(inp.dataset.caption)].caption = inp.value;
      }));
      grid.querySelectorAll("[data-delphoto]").forEach(btn => btn.addEventListener("click", () => {
        photos.splice(Number(btn.dataset.delphoto), 1);
        renderPhotos(sectionId);
      }));
    }

    async function addFiles(sectionId, files) {
      const m = sectionModel(sectionId);
      const list = Array.from(files).filter(f => f.type.startsWith("image/"));
      if (!list.length) { alert("That doesn't look like an image file. Photos can be JPG, PNG, HEIC-converted or WebP."); return; }
      const room = MAX_PHOTOS_PER_SECTION - m.photos.length;
      if (room <= 0) { alert(`This section already has ${MAX_PHOTOS_PER_SECTION} photos. Remove one before adding another.`); return; }
      for (const f of list.slice(0, room)) {
        try {
          m.photos.push({ src: await compressImage(f, 1100, 0.72), caption: f.name.replace(/\.[^.]+$/, "") });
        } catch (e) { alert(`Couldn't read "${f.name}". Try saving it as a JPG or PNG first.`); }
      }
      if (list.length > room) alert(`Added ${room} photo(s) — this section is now full at ${MAX_PHOTOS_PER_SECTION}.`);
      renderPhotos(sectionId);
    }

    /* ---- wiring for a rendered section ---- */
    function wireSection(sec) {
      const form = main.querySelector(`.seg-form[data-seg="${sec.id}"]`);
      if (!form) return;
      const m = sectionModel(sec.id);

      form.querySelectorAll("[data-input]").forEach(el =>
        el.addEventListener("input", () => { m.inputs[el.dataset.input] = el.value; updateProgress(); }));
      form.querySelectorAll("[data-field]").forEach(el =>
        el.addEventListener("input", () => { m.blocks[el.dataset.field] = el.value; updateProgress(); }));

      tablesFor(sec.id).forEach(t => {
        const wrap = form.querySelector(`[data-table="${t.id}"]`);
        const rows = tableRows(sec.id, t);
        wrap.querySelectorAll("[data-cell]").forEach(el => {
          el.addEventListener("input", () => {
            rows[Number(el.dataset.row)][el.dataset.cell] = el.value;
            recomputeCumulative(sec.id, t, wrap, Number(el.dataset.row));
            updateProgress();
          });
          // Charts refresh on commit (blur / select change), not per keystroke.
          el.addEventListener("change", () => refreshChart(sec.id, t));
        });
        wrap.querySelector("[data-addrow]").addEventListener("click", () => {
          rows.push({});
          rerenderTable(sec, t);
        });
        wrap.querySelectorAll("[data-delrow]").forEach(btn => btn.addEventListener("click", () => {
          rows.splice(Number(btn.dataset.delrow), 1);
          if (!rows.length) rows.push({});
          rerenderTable(sec, t);
        }));
      });

      const dz = form.querySelector("[data-drop]");
      const picker = form.querySelector("[data-file]");
      dz.addEventListener("click", () => picker.click());
      dz.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); picker.click(); } });
      picker.addEventListener("change", () => { addFiles(sec.id, picker.files); picker.value = ""; });
      ["dragenter", "dragover"].forEach(ev => dz.addEventListener(ev, (e) => {
        e.preventDefault(); e.stopPropagation(); dz.classList.add("dropzone-active");
      }));
      ["dragleave", "drop"].forEach(ev => dz.addEventListener(ev, (e) => {
        e.preventDefault(); e.stopPropagation(); dz.classList.remove("dropzone-active");
      }));
      dz.addEventListener("drop", (e) => { if (e.dataTransfer && e.dataTransfer.files) addFiles(sec.id, e.dataTransfer.files); });
      dz.addEventListener("paste", (e) => {
        const items = (e.clipboardData && e.clipboardData.files) || [];
        if (items.length) { e.preventDefault(); addFiles(sec.id, items); }
      });
      renderPhotos(sec.id);
    }

    function recomputeCumulative(sectionId, t, wrap, ri) {
      if (!t.carryForward) return;
      const cf = t.carryForward;
      const rows = tableRows(sectionId, t);
      const opening = priorCumulative(prior, sectionId, t, rows[ri][cf.labelKey]);
      if (opening === null) return;
      const total = roundQty(opening + (Number(rows[ri][cf.periodKey]) || 0));
      rows[ri][cf.cumulativeKey] = String(total);
      const cell = wrap.querySelector(`[data-cell="${cf.cumulativeKey}"][data-row="${ri}"]`);
      if (cell) cell.value = String(total);
    }

    function refreshChart(sectionId, t) {
      const slot = main.querySelector(`.seg-form[data-seg="${sectionId}"] [data-chart="${t.id}"]`);
      if (slot && t.chart) slot.innerHTML = renderChartBlock(t, tableRows(sectionId, t));
    }

    function rerenderTable(sec, t) {
      const wrap = main.querySelector(`.seg-form[data-seg="${sec.id}"] [data-table="${t.id}"]`);
      if (!wrap) return;
      wrap.outerHTML = tableHtml(sec.id, t);
      // Re-wire just this table.
      const fresh = main.querySelector(`.seg-form[data-seg="${sec.id}"] [data-table="${t.id}"]`);
      const rows = tableRows(sec.id, t);
      fresh.querySelectorAll("[data-cell]").forEach(el => {
        el.addEventListener("input", () => {
          rows[Number(el.dataset.row)][el.dataset.cell] = el.value;
          recomputeCumulative(sec.id, t, fresh, Number(el.dataset.row));
          updateProgress();
        });
        el.addEventListener("change", () => refreshChart(sec.id, t));
      });
      fresh.querySelector("[data-addrow]").addEventListener("click", () => { rows.push({}); rerenderTable(sec, t); });
      fresh.querySelectorAll("[data-delrow]").forEach(btn => btn.addEventListener("click", () => {
        rows.splice(Number(btn.dataset.delrow), 1);
        if (!rows.length) rows.push({});
        rerenderTable(sec, t);
      }));
      updateProgress();
    }

    /* ---- section list ---- */
    function checkedIds() {
      return Array.from(main.querySelectorAll(".seg-check:checked")).map(c => c.value);
    }

    function sectionHasData(id) {
      const m = model[id];
      if (!m) return false;
      if (Object.values(m.blocks).some(v => (v || "").trim())) return true;
      if (Object.values(m.inputs).some(v => (v || "").trim())) return true;
      if (m.photos.length) return true;
      return tablesFor(id).some(t => filledRows(id, t).length > 0);
    }

    function updateProgress() {
      const ids = checkedIds();
      const done = ids.filter(sectionHasData).length;
      const el = main.querySelector("#seg-progress");
      if (!el) return;
      el.textContent = ids.length
        ? `${done} of ${ids.length} selected section(s) have something in them. Empty sections are reported as "no change" — that is allowed, but say so deliberately.`
        : "No sections selected yet — tick the ones that apply to this client.";
      main.querySelectorAll(".seg-toggle").forEach(lab => {
        const id = lab.querySelector(".seg-check").value;
        lab.classList.toggle("seg-filled", sectionHasData(id));
      });
    }

    function renderSegForms() {
      const ids = checkedIds();
      const container = main.querySelector("#seg-forms");
      const chosen = segs.filter(s => ids.includes(s.id));
      container.innerHTML = chosen.length
        ? chosen.map(sectionHtml).join("")
        : `<p class="muted">Tick a section above and its tables appear here.</p>`;
      chosen.forEach(wireSection);
      updateProgress();
    }

    function renderSegToggles() {
      main.querySelector("#seg-toggles").innerHTML = segs.map(s =>
        `<label class="seg-toggle"><input type="checkbox" class="seg-check" value="${esc(s.id)}" checked />
          <span class="seg-toggle-label">${esc(s.label)}</span>
          <span class="muted small">${esc(s.hint || "")}</span></label>`).join("");
      main.querySelectorAll(".seg-check").forEach(cb => cb.addEventListener("change", renderSegForms));
      renderSegForms();
    }

    main.querySelector("#seg-all").addEventListener("click", () => {
      main.querySelectorAll(".seg-check").forEach(c => { c.checked = true; });
      renderSegForms();
    });
    main.querySelector("#seg-none").addEventListener("click", () => {
      main.querySelectorAll(".seg-check").forEach(c => { c.checked = false; });
      renderSegForms();
    });
    main.querySelector("#guided-toggle").addEventListener("change", (e) => {
      guided = e.target.checked;
      state.reportGuided = guided;
      save();
      renderSegForms();
    });

    refreshPrior();
    renderHeaderFields();
    renderSegToggles();
    main.querySelector("#rep-client").addEventListener("change", (e) => {
      const c = state.clients.find(x => x.id === e.target.value);
      if (c) setCurrentClient(c.id);
      refreshPrior();
      renderSegForms();
    });

    main.querySelector("#rep-standard").addEventListener("change", (e) => {
      standard = VERDA_SEED.reportStandards.find(s => s.id === e.target.value);
      segs = segsFor(standard);
      model = {};                 // a different format asks different questions
      refreshPrior();
      renderHeaderFields();
      renderSegToggles();
    });

    /* ---- past reports ---- */
    function refreshList() {
      main.querySelector("#reports-list").innerHTML = state.reports.slice().reverse().map(r => `
        <tr><td>${esc(r.clientName)}</td>
        <td>${statusBadge(esc(r.standardName || "Verda"), STANDARD_BADGE[r.standard] || "good")}</td>
        <td>${esc(r.period)}</td><td>${r.segments.length}</td><td>${r.photoCount || 0}</td><td>${r.date.slice(0, 10)}</td>
        <td class="row-actions">
          <button class="btn btn-ghost btn-sm" data-dl="${esc(r.id)}">.txt</button>
          <button class="btn btn-ghost btn-sm" data-dlhtml="${esc(r.id)}">Full report</button>
        </td></tr>`).join("") ||
        emptyState("documents", "No reports yet. Pick a format above, tick the sections that apply, and <strong>Generate</strong> — the tables and photographs come with it.", 7);
      const base = (r) => `${REPORT_FILE_PREFIX[r.standard] || "Verda-Reporting"}-${r.clientName.replace(/\s+/g, "_")}-${String(r.period).replace(/\s+/g, "_")}`;
      main.querySelectorAll("[data-dl]").forEach(btn => btn.addEventListener("click", () => {
        const r = state.reports.find(x => x.id === btn.dataset.dl);
        downloadText(`${base(r)}.txt`, r.text);
      }));
      main.querySelectorAll("[data-dlhtml]").forEach(btn => btn.addEventListener("click", () => {
        const r = state.reports.find(x => x.id === btn.dataset.dlhtml);
        if (!r.full) { alert("This report was generated before tables and photos were stored. Generate it again to get the full version."); return; }
        downloadHtml(`${base(r)}.html`, buildReportHtml(r));
      }));
    }
    refreshList();

    /* ---- generate ---- */
    main.querySelector("#gen-report").addEventListener("click", () => {
      const client = state.clients.find(c => c.id === main.querySelector("#rep-client").value);
      const period = main.querySelector("#rep-period").value.trim() || "Current period";
      const segments = checkedIds();
      if (!segments.length) { alert("Tick at least one section to include."); return; }
      if (!spendCredits(VERDA_SEED.creditCosts.aiDraft, "Verda Reporting AI draft")) return;

      const blocks = standard.blocks || DEFAULT_BLOCKS;
      const segmentData = {};
      let photoCount = 0;
      segments.forEach(id => {
        const m = sectionModel(id);
        const tables = {};
        tablesFor(id).forEach(t => {
          const rows = filledRows(id, t);
          if (rows.length) tables[t.id] = rows;
        });
        photoCount += m.photos.length;
        segmentData[id] = Object.assign({}, m.blocks, { inputs: m.inputs, tables, photos: m.photos });
      });
      const header = {};
      main.querySelectorAll("#rep-header-fields [data-header]").forEach(el => {
        if (el.value.trim()) header[el.dataset.header] = el.value.trim();
      });

      const text = VerdaAI.generateAIDraft({
        clientName: client.name, period, segments, segmentData,
        standardTitle: standard.title, segmentDefs: segs,
        blocks, header, headerDefs: standard.headerFields || [],
        tableDefs: VERDA_SEED.sectionTables
      });

      const rec = {
        id: uid("rep"), clientName: client.name, period, segments, text,
        standard: standard.id, standardName: standard.shortName,
        date: new Date().toISOString(), photoCount,
        full: { standardTitle: standard.title, header, headerDefs: standard.headerFields || [], blocks, segmentData,
                sectionLabels: Object.fromEntries(segs.map(s => [s.id, s.label])) }
      };
      state.reports.push(rec);
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
      } catch (e) {
        // Photos are the only thing big enough to fill localStorage. Keep the
        // report, drop the stored copies, and say so rather than failing quietly.
        rec.full.segmentData = Object.fromEntries(Object.entries(rec.full.segmentData)
          .map(([k, v]) => [k, Object.assign({}, v, { photos: [] })]));
        save();
        alert("The report was generated and the download below includes your photos. Browser storage was full, so the saved copy in 'Past reports' keeps the tables and narrative but not the images.");
      }

      const preview = main.querySelector("#report-output");
      preview.innerHTML = card("Generated report", `
        <p class="muted small">Read it through before it leaves your hands. "Full report" keeps the tables, charts and photographs; ".txt" is the plain-text version.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" id="dl-html">Download full report (.html)</button>
          <button class="btn btn-ghost" id="dl-now">Download .txt</button>
        </div>
        <div class="report-preview">${buildReportHtml(rec, true)}</div>`);
      preview.querySelector("#dl-now").addEventListener("click", () =>
        downloadText(`${REPORT_FILE_PREFIX[standard.id] || "Verda-Reporting"}-${client.name.replace(/\s+/g, "_")}.txt`, text));
      preview.querySelector("#dl-html").addEventListener("click", () =>
        downloadHtml(`${REPORT_FILE_PREFIX[standard.id] || "Verda-Reporting"}-${client.name.replace(/\s+/g, "_")}.html`,
          buildReportHtml(rec)));
      preview.scrollIntoView({ behavior: "smooth", block: "start" });
      renderTopbar();
      refreshList();
      refreshPrior();             // this report is now the carry-forward source
      updateProgress();
    });
  }

  // The report as a document: narrative, the tables as tables, the charts as
  // charts, and the photographs. Used for the on-screen preview (inline) and
  // for the downloadable standalone file.
  function buildReportHtml(rec, inline) {
    const f = rec.full;
    if (!f) return `<pre class="report-pre">${esc(rec.text)}</pre>`;
    const defsFor = (id) => VERDA_SEED.sectionTables[id] || [];
    const body = rec.segments.map(id => {
      const d = f.segmentData[id] || {};
      const label = (f.sectionLabels || {})[id] || id;
      const figures = Object.entries(d.inputs || {}).filter(([, v]) => String(v).trim());
      const tables = defsFor(id).map(t => {
        const rows = (d.tables || {})[t.id];
        if (!rows || !rows.length) return "";
        const head = t.columns.map(c => `<th>${esc(c.label)}${c.unit ? ` (${esc(c.unit)})` : ""}</th>`).join("");
        const tb = rows.map(r => `<tr>${t.columns.map(c => `<td>${esc(r[c.key] == null ? "" : String(r[c.key]))}</td>`).join("")}</tr>`).join("");
        return `<h4>${esc(t.title)}</h4>
          <div class="table-scroll"><table class="table"><thead><tr>${head}</tr></thead><tbody>${tb}</tbody></table></div>
          ${t.chart ? renderChartBlock(t, rows) : ""}`;
      }).join("");
      const narrative = (f.blocks || DEFAULT_BLOCKS).map(b => {
        const v = (d[b.key] || "").trim();
        return v ? `<h4>${esc(b.label)}</h4><p>${esc(v).replace(/\n/g, "<br/>")}</p>` : "";
      }).join("") || `<p class="muted">No change to report for this period.</p>`;
      const photos = (d.photos || []).length ? `<h4>Photographs</h4><div class="photo-grid report-photos">
        ${d.photos.map(p => `<figure class="photo-card"><img src="${p.src}" alt="${esc(p.caption || "Site photograph")}"/>
          <figcaption>${esc(p.caption || "")}</figcaption></figure>`).join("")}</div>` : "";
      return `<section class="report-section"><h3>${esc(label)}</h3>
        ${figures.length ? `<table class="table kv-table"><tbody>${figures.map(([k, v]) =>
          `<tr><th>${esc(labelForInput(id, k))}</th><td>${esc(String(v))}</td></tr>`).join("")}</tbody></table>` : ""}
        ${tables}${narrative}${photos}</section>`;
    }).join("");
    const extra = (f.headerDefs || []).filter(x => (f.header || {})[x.key])
      .map(x => `<tr><th>${esc(x.label)}</th><td>${esc(f.header[x.key])}</td></tr>`).join("");
    const doc = `<header class="report-head">
        <h1>${esc(f.standardTitle)}</h1>
        <table class="table kv-table"><tbody>
          ${extra}
          <tr><th>Client</th><td>${esc(rec.clientName)}</td></tr>
          <tr><th>Reporting period</th><td>${esc(rec.period)}</td></tr>
          <tr><th>Generated</th><td>${rec.date.slice(0, 10)}</td></tr>
        </tbody></table>
      </header>${body}`;
    return inline ? `<div class="report-doc">${doc}</div>` : doc;
  }

  function labelForInput(sectionId, key) {
    const all = [...VERDA_SEED.reportSegments, ...VERDA_SEED.ifcStandards, ...VERDA_SEED.essrSections];
    const sec = all.find(s => s.id === sectionId);
    const f = sec && (sec.fields || []).find(x => x.key === key);
    return f ? f.label + (f.unit ? ` (${f.unit})` : "") : key;
  }

  // Standalone HTML file: the report plus just enough CSS to print cleanly.
  function downloadHtml(filename, inner) {
    const css = `
      body{font:14px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#16241c;max-width:900px;margin:0 auto;padding:32px 24px}
      h1{font-size:1.5rem;margin:0 0 16px}h3{margin:32px 0 6px;border-bottom:2px solid #dde7e0;padding-bottom:6px}
      h4{margin:18px 0 4px;font-size:.95rem}h5{margin:10px 0 4px}
      table{width:100%;border-collapse:collapse;margin:8px 0 14px}
      th,td{text-align:left;padding:7px 9px;font-size:.85rem;border-bottom:1px solid #e6ece8;vertical-align:top}
      thead th{background:#f4f7f4;font-size:.74rem;text-transform:uppercase;letter-spacing:.03em}
      .kv-table th{width:34%}.muted{color:#5b6b61}.small{font-size:.82rem}
      .table-scroll{overflow-x:auto}
      .chart{width:100%;max-width:560px;height:auto;display:block;margin:6px 0}
      .chart-axis{stroke:#dde7e0}.chart-value{font-size:13px;font-weight:700;text-anchor:middle;fill:#16241c}
      .chart-label{font-size:12px;text-anchor:middle;fill:#5b6b61}
      .chart-title{font-weight:700;font-size:.88rem;margin:12px 0 2px}
      .chart-figure{margin:0}.chart-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.8rem;color:#5b6b61;margin:2px 0 6px}
      .chart-legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px}
      .chart-table summary{cursor:pointer;font-size:.82rem;color:#5b6b61}
      .photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
      .photo-card{margin:0}.photo-card img{width:100%;border-radius:8px;display:block}
      .photo-card figcaption{font-size:.8rem;color:#5b6b61;margin-top:4px}
      :root{--chart-1:#2a78d6;--chart-2:#eb6834;--chart-3:#1baf7a;--chart-good:#0ca30c;--chart-warning:#fab219;--chart-serious:#ec835a;--chart-critical:#d03b3b}
      @media print{body{max-width:none}h3{page-break-after:avoid}.report-section{page-break-inside:avoid}}`;
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>${esc(filename.replace(/\.html$/, ""))}</title><style>${css}</style></head><body>${inner}</body></html>`;
    return saveFile(filename, html, "text/html");
  }

  /* ==================== ToR & ESIA DOCUMENT BUILDER ====================
     The Terms of Reference and the ESIA are two different documents written
     at two different times: the ToR scopes what the study must do and is
     approved before any fieldwork starts; the ESIA reports what the study
     found. They share a builder but never a screen.

     Both take the same structured input as Verda Reporting — tables, figures,
     photographs — plus coordinate tables, because an ESIA whose sampling
     points and receptors have no coordinates cannot be verified or
     re-measured, which is most of what a baseline is for. */

  const DOC_TYPES = {
    tor: {
      key: "tor",
      title: "Terms of Reference (ToR)",
      lead: "The scoping document: what the ESIA must cover, who does it, by when and to what standard. Written and approved before fieldwork starts.",
      sectionsKey: "torSections",
      docTitle: "TERMS OF REFERENCE — ENVIRONMENTAL & SOCIAL IMPACT ASSESSMENT",
      filePrefix: "ToR",
      blocks: [{ key: "notes", label: "Content for this section" }]
    },
    esia: {
      key: "esia",
      title: "ESIA Report",
      lead: "The assessment itself: baseline, impacts, alternatives, the ESMP and the monitoring plan — reported against the ToR that scoped it.",
      sectionsKey: "esiaSections",
      docTitle: "ENVIRONMENTAL & SOCIAL IMPACT ASSESSMENT REPORT",
      filePrefix: "ESIA",
      blocks: [{ key: "notes", label: "Content for this section" }]
    }
  };

  const isCoordTable = (t) => !!t.map;
  const validLat = (v) => Number.isFinite(Number(v)) && Math.abs(Number(v)) <= 90;
  const validLng = (v) => Number.isFinite(Number(v)) && Math.abs(Number(v)) <= 180;

  /* A coordinate plot drawn from the points themselves — no tiles, no network.
     The Esri basemap is better when it loads, but a plot that disappears
     without a connection is useless on the sites this is built for. */
  function coordPlot(points, title) {
    const pts = points.filter(p => validLat(p.lat) && validLng(p.lng))
      .map(p => ({ lat: Number(p.lat), lng: Number(p.lng), label: p.label || "" }));
    if (!pts.length) return `<p class="muted small">Add a latitude and longitude and the points appear here.</p>`;
    const W = 560, H = 300, pad = 34;
    const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng);
    // A single point, or a row of points, still needs a box to sit in.
    const span = (arr) => {
      const lo = Math.min(...arr), hi = Math.max(...arr);
      const d = hi - lo;
      const m = d < 0.0005 ? 0.002 : d * 0.15;
      return [lo - m, hi + m];
    };
    const [y0, y1] = span(lats), [x0, x1] = span(lngs);
    const px = (lng) => pad + ((lng - x0) / (x1 - x0)) * (W - 2 * pad);
    const py = (lat) => H - pad - ((lat - y0) / (y1 - y0)) * (H - 2 * pad);
    const marks = pts.map((p, i) => `
      <g><title>${esc(p.label)}: ${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}</title>
        <circle cx="${px(p.lng).toFixed(1)}" cy="${py(p.lat).toFixed(1)}" r="6"
          style="fill:var(--chart-1)" stroke="var(--surface)" stroke-width="2"/>
        <text x="${px(p.lng).toFixed(1)}" y="${(py(p.lat) - 11).toFixed(1)}" class="chart-value">${esc(shortLabel(p.label))}</text>
      </g>`).join("");
    const table = `<details class="chart-table"><summary>View coordinates</summary>
      <div class="table-scroll"><table class="table"><thead><tr><th>Point</th><th class="num">Latitude</th><th class="num">Longitude</th></tr></thead>
      <tbody>${pts.map(p => `<tr><td>${esc(p.label || "—")}</td><td class="num">${p.lat.toFixed(6)}</td><td class="num">${p.lng.toFixed(6)}</td></tr>`).join("")}</tbody>
      </table></div></details>`;
    return `<figure class="chart-figure">
      <figcaption class="chart-title">${esc(title)} — ${pts.length} point${pts.length === 1 ? "" : "s"}</figcaption>
      <svg class="chart coord-plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}">
        <rect x="${pad}" y="${pad}" width="${W - 2 * pad}" height="${H - 2 * pad}" class="coord-frame"/>
        <text x="${pad}" y="${H - 12}" class="chart-label" text-anchor="start">${x0.toFixed(4)}°E</text>
        <text x="${W - pad}" y="${H - 12}" class="chart-label" text-anchor="end">${x1.toFixed(4)}°E</text>
        <text x="${pad - 6}" y="${H - pad}" class="chart-label" text-anchor="end">${y0.toFixed(4)}°N</text>
        <text x="${pad - 6}" y="${pad + 4}" class="chart-label" text-anchor="end">${y1.toFixed(4)}°N</text>
        ${marks}
      </svg>${table}</figure>`;
  }

  /* Capture a coordinate: from the map if tiles load, from the device's own
     GPS, from the client's saved site location, or typed in. All four exist
     because on a remote site at least one of them will not. */
  function openCoordPicker(onPick) {
    const client = currentClient();
    const overlay = h(`<div class="modal-overlay"><div class="modal modal-wide">
      <h2>Capture a coordinate</h2>
      <p class="muted small">Click the map to drop a point, use this device's GPS, take the site's saved location, or type the figures in.</p>
      <div id="pick-map" class="pick-map"></div>
      <div class="form-row">
        <label>Latitude<input id="pick-lat" type="number" step="any" placeholder="e.g. -12.8024" /></label>
        <label>Longitude<input id="pick-lng" type="number" step="any" placeholder="e.g. 28.2132" /></label>
      </div>
      <p class="muted small" id="pick-status"></p>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="pick-gps">Use this device's GPS</button>
        ${client && client.lat && client.lng ? `<button type="button" class="btn btn-ghost" id="pick-site">Use ${esc(client.name)}'s saved location</button>` : ""}
        <button type="button" class="btn btn-ghost" id="pick-cancel">Cancel</button>
        <button type="button" class="btn btn-primary" id="pick-ok">Use this coordinate</button>
      </div>
    </div></div>`);
    document.body.appendChild(overlay);
    const latIn = overlay.querySelector("#pick-lat"), lngIn = overlay.querySelector("#pick-lng");
    const status = overlay.querySelector("#pick-status");
    const close = () => overlay.remove();

    let marker = null, pickMap = null;
    if (typeof L !== "undefined") {
      const start = (client && client.lat && client.lng) ? [client.lat, client.lng] : [0.3476, 32.5825];
      pickMap = L.map("pick-map").setView(start, client && client.lat ? 13 : 6);
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Tiles © Esri", maxZoom: 16 }).addTo(pickMap);
      pickMap.on("click", (e) => {
        latIn.value = e.latlng.lat.toFixed(6);
        lngIn.value = e.latlng.lng.toFixed(6);
        if (marker) marker.remove();
        marker = L.marker(e.latlng).addTo(pickMap);
        status.textContent = "Point taken from the map.";
      });
    } else {
      overlay.querySelector("#pick-map").innerHTML =
        `<div class="pick-map-fallback">Map tiles are unavailable offline or behind a restricted network.
          Use the GPS button, the site's saved location, or type the coordinate below — all of which work without a connection.</div>`;
    }

    overlay.querySelector("#pick-gps").addEventListener("click", () => {
      if (!navigator.geolocation) { status.textContent = "This browser does not offer location access."; return; }
      status.textContent = "Asking this device for its location…";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          latIn.value = pos.coords.latitude.toFixed(6);
          lngIn.value = pos.coords.longitude.toFixed(6);
          status.textContent = `Taken from GPS, accurate to about ${Math.round(pos.coords.accuracy)} m.`;
          if (pickMap) { pickMap.setView([pos.coords.latitude, pos.coords.longitude], 15);
            if (marker) marker.remove(); marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(pickMap); }
        },
        (err) => { status.textContent = "Location refused or unavailable — type the coordinate instead. (" + err.message + ")"; },
        { enableHighAccuracy: true, timeout: 10000 });
    });
    const siteBtn = overlay.querySelector("#pick-site");
    if (siteBtn) siteBtn.addEventListener("click", () => {
      latIn.value = client.lat; lngIn.value = client.lng;
      status.textContent = `Taken from ${client.name}'s saved site location.`;
    });
    overlay.querySelector("#pick-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    overlay.querySelector("#pick-ok").addEventListener("click", () => {
      const lat = latIn.value, lng = lngIn.value;
      if (!validLat(lat) || !validLng(lng)) {
        status.textContent = "Latitude must be between -90 and 90, longitude between -180 and 180.";
        return;
      }
      onPick(Number(lat).toFixed(6), Number(lng).toFixed(6));
      close();
    });
  }

  function renderTor(main) { renderDocument(main, DOC_TYPES.tor); }
  function renderEsia(main) { renderDocument(main, DOC_TYPES.esia); }

  function renderDocument(main, doc) {
    const S = VERDA_SEED;
    const sections = S[doc.sectionsKey];
    const tablesFor = (id) => S.sectionTables[id] || [];
    let guided = state.reportGuided !== false;
    const store = state.docs[doc.key] || (state.docs[doc.key] = {});

    function secModel(id) {
      if (!store[id]) store[id] = { blocks: {}, tables: {}, photos: [] };
      return store[id];
    }
    function tableRows(sectionId, t) {
      const m = secModel(sectionId);
      if (!m.tables[t.id]) m.tables[t.id] = (t.starterRows || []).map(r => Object.assign({}, r));
      if (!m.tables[t.id].length) m.tables[t.id] = [{}];
      return m.tables[t.id];
    }

    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>${esc(doc.title)}</h1>
            <p class="muted">${esc(doc.lead)}</p>
          </div>
        </div>
        <div class="card doc-switch">
          <span class="muted small">These are two separate documents:</span>
          <a class="btn ${doc.key === "tor" ? "btn-primary" : "btn-ghost"}" href="#/tor">Terms of Reference</a>
          <a class="btn ${doc.key === "esia" ? "btn-primary" : "btn-ghost"}" href="#/esia">ESIA Report</a>
          <span class="muted small">${doc.key === "tor"
            ? "The ToR comes first and is usually approved by the regulator before fieldwork begins."
            : "Write the ESIA against the approved ToR — reviewers check the two against each other."}</span>
        </div>

        <div class="card">
          <div class="form-row">
            <label>Project name<input id="doc-project" value="${esc(store.__project || "")}" placeholder="e.g. Kabaale 40 MW Solar Plant" /></label>
            <label>Client / site<select id="doc-client">${clientOptions()}</select></label>
            <label>Prepared by<input id="doc-author" value="${esc(store.__author || "")}" placeholder="Lead consultant or firm" /></label>
            <label>Reference<input id="doc-ref" value="${esc(store.__ref || "")}" placeholder="Document reference" /></label>
          </div>
          <label class="switch"><input type="checkbox" id="doc-guided" ${guided ? "checked" : ""} />
            <span>Guided mode — what each section is for, how to fill it, and example wording</span></label>
        </div>

        <div class="card">
          <h3>Sections</h3>
          <p class="muted small" id="doc-progress"></p>
          <div class="seg-toggle-actions">
            <button class="btn btn-ghost btn-sm" id="doc-all">Select all</button>
            <button class="btn btn-ghost btn-sm" id="doc-none">Clear all</button>
          </div>
          <div id="doc-toggles"></div>
        </div>

        <div id="doc-forms"></div>

        <div class="card">
          <button class="btn btn-primary" id="doc-draft">Generate draft with AI Assist (${S.creditCosts.aiDraft} credits)</button>
          <button class="btn" id="doc-submit">Submit for processing (${S.creditCosts.esiaSubmit} credits)</button>
          <p class="muted small">Drafting turns what you entered into prose. Submission is a demo queue — connect a backend to route it to a reviewer.</p>
        </div>
        <div id="doc-output"></div>

        <div class="card">
          <h3>Saved ${esc(doc.filePrefix)} documents</h3>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>Project</th><th>Client</th><th>Sections</th><th>Points</th><th>Photos</th><th>Generated</th><th></th></tr></thead>
            <tbody id="doc-list"></tbody></table>
          </div>
        </div>
      </section>
    `));

    /* ---------- one table ---------- */
    function tableHtml(sectionId, t) {
      const rows = tableRows(sectionId, t);
      const head = t.columns.map(c => `<th>${esc(c.label)}${c.unit ? ` <span class="muted">(${esc(c.unit)})</span>` : ""}</th>`).join("");
      const body = rows.map((row, ri) => `<tr>${t.columns.map(c => {
        const v = row[c.key] == null ? "" : String(row[c.key]);
        if (c.type === "select") {
          return `<td><select data-cell="${esc(c.key)}" data-row="${ri}"><option value="">—</option>${
            c.options.map(o => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></td>`;
        }
        if (c.type === "coord") {
          const bad = v !== "" && !(c.key === "lat" ? validLat(v) : validLng(v));
          return `<td><input type="number" step="any" class="coord-cell${bad ? " cell-invalid" : ""}"
            data-cell="${esc(c.key)}" data-row="${ri}" value="${esc(v)}" /></td>`;
        }
        const type = c.type === "number" ? "number" : c.type === "date" ? "date" : "text";
        return `<td><input type="${type}" data-cell="${esc(c.key)}" data-row="${ri}" value="${esc(v)}" /></td>`;
      }).join("")}${isCoordTable(t)
        ? `<td class="row-actions"><button class="btn btn-ghost btn-sm" data-pick="${ri}" title="Capture from the map or GPS">📍 Map</button></td>` : ""}
        <td class="row-actions"><button class="btn btn-ghost btn-sm" data-delrow="${ri}" aria-label="Remove row ${ri + 1}">✕</button></td></tr>`).join("");
      return `<div class="report-table" data-table="${esc(t.id)}">
        <div class="report-table-head"><h5>${esc(t.title)}</h5>
          ${t.hint ? `<p class="muted small">${esc(t.hint)}</p>` : ""}</div>
        <div class="table-scroll"><table class="table entry-table"><thead><tr>${head}${isCoordTable(t) ? "<th></th>" : ""}<th></th></tr></thead>
        <tbody>${body}</tbody></table></div>
        <button class="btn btn-ghost btn-sm" data-addrow="${esc(t.id)}">+ Add row</button>
        <div class="chart-slot" data-chart="${esc(t.id)}">${chartFor(t, rows)}</div>
      </div>`;
    }
    const chartFor = (t, rows) => isCoordTable(t)
      ? coordPlot(rows.map(r => ({ lat: r.lat, lng: r.lng, label: r[t.columns[0].key] })), t.title)
      : (t.chart ? renderChartBlock(t, rows) : "");

    /* ---------- one section ---------- */
    function sectionHtml(sec) {
      const m = secModel(sec.id);
      const guide = S.sectionGuide[sec.id];
      const guideHtml = (guided && guide) ? `<div class="guide-box">
        <p><strong>What this section is for.</strong> ${esc(guide.what)}</p>
        <p><strong>How to fill it.</strong> ${esc(guide.how)}</p>
        <details><summary>Example wording</summary><p class="guide-example">${esc(guide.example)}</p>
          <p class="muted small">Guidance only — describe this project, not the example.</p></details>
      </div>` : "";
      return `<div class="card seg-form" data-seg="${esc(sec.id)}">
        <h4>${esc(sec.title)}</h4>
        ${sec.hint ? `<p class="muted small">${esc(sec.hint)}</p>` : ""}
        ${guideHtml}
        ${tablesFor(sec.id).map(t => tableHtml(sec.id, t)).join("")}
        <h5>Narrative</h5>
        ${doc.blocks.map(b => `<label>${esc(b.label)}<textarea data-field="${esc(b.key)}" rows="4"
          placeholder="Write this section in your own words.">${esc(m.blocks[b.key] || "")}</textarea></label>`).join("")}
        <h5>Figures &amp; photographs</h5>
        <div class="dropzone" data-drop="${esc(sec.id)}" tabindex="0" role="button" aria-label="Add images for ${esc(sec.title)}">
          <p><strong>Drag images here</strong> — or click to choose, or paste.</p>
          <p class="muted small">Site photos, maps, layout drawings, survey figures. Up to ${MAX_PHOTOS_PER_SECTION} per section, resized in your browser and stored on this device only.</p>
          <input type="file" accept="image/*" multiple hidden data-file="${esc(sec.id)}" />
        </div>
        <div class="photo-grid" data-photos="${esc(sec.id)}"></div>
      </div>`;
    }

    /* ---------- photos ---------- */
    function renderPhotos(sectionId) {
      const grid = main.querySelector(`[data-photos="${sectionId}"]`);
      if (!grid) return;
      const photos = secModel(sectionId).photos;
      grid.innerHTML = photos.map((p, i) => `<figure class="photo-card">
        <img src="${p.src}" alt="${esc(p.caption || "Figure")}" />
        <input class="photo-caption" data-caption="${i}" value="${esc(p.caption || "")}" placeholder="Figure caption" />
        <button class="btn btn-ghost btn-sm" data-delphoto="${i}">Remove</button></figure>`).join("");
      grid.querySelectorAll("[data-caption]").forEach(inp => inp.addEventListener("input",
        () => { photos[Number(inp.dataset.caption)].caption = inp.value; save(); }));
      grid.querySelectorAll("[data-delphoto]").forEach(btn => btn.addEventListener("click", () => {
        photos.splice(Number(btn.dataset.delphoto), 1); save(); renderPhotos(sectionId); updateProgress();
      }));
    }
    async function addFiles(sectionId, files) {
      const m = secModel(sectionId);
      const list = Array.from(files).filter(f => f.type.startsWith("image/"));
      if (!list.length) { alert("That doesn't look like an image file."); return; }
      const room = MAX_PHOTOS_PER_SECTION - m.photos.length;
      if (room <= 0) { alert(`This section already holds ${MAX_PHOTOS_PER_SECTION} images.`); return; }
      for (const f of list.slice(0, room)) {
        try { m.photos.push({ src: await compressImage(f, 1100, 0.72), caption: f.name.replace(/\.[^.]+$/, "") }); }
        catch (e) { alert(`Couldn't read "${f.name}".`); }
      }
      saveQuietly(); renderPhotos(sectionId); updateProgress();
    }
    // Images are the only thing big enough to fill browser storage; the work
    // must survive a failed save rather than disappear with it.
    function saveQuietly() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
      catch (e) { alert("Browser storage is full. Your work is still on screen and will generate and download, but it may not be saved between visits — remove some images or download the document now."); }
    }

    /* ---------- wiring ---------- */
    function wireTable(sec, t, wrap) {
      const rows = tableRows(sec.id, t);
      wrap.querySelectorAll("[data-cell]").forEach(el => {
        el.addEventListener("input", () => {
          rows[Number(el.dataset.row)][el.dataset.cell] = el.value;
          if (el.classList.contains("coord-cell")) {
            const ok = el.dataset.cell === "lat" ? validLat(el.value) : validLng(el.value);
            el.classList.toggle("cell-invalid", el.value !== "" && !ok);
          }
          updateProgress(); saveQuietly();
        });
        el.addEventListener("change", () => refreshChart(sec, t));
      });
      wrap.querySelector("[data-addrow]").addEventListener("click", () => { rows.push({}); rerender(sec, t); });
      wrap.querySelectorAll("[data-delrow]").forEach(b => b.addEventListener("click", () => {
        rows.splice(Number(b.dataset.delrow), 1);
        if (!rows.length) rows.push({});
        rerender(sec, t);
      }));
      wrap.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => {
        const ri = Number(b.dataset.pick);
        openCoordPicker((lat, lng) => {
          rows[ri].lat = lat; rows[ri].lng = lng;
          rerender(sec, t); saveQuietly();
        });
      }));
    }
    function refreshChart(sec, t) {
      const slot = main.querySelector(`.seg-form[data-seg="${sec.id}"] [data-chart="${t.id}"]`);
      if (slot) slot.innerHTML = chartFor(t, tableRows(sec.id, t));
    }
    function rerender(sec, t) {
      const wrap = main.querySelector(`.seg-form[data-seg="${sec.id}"] [data-table="${t.id}"]`);
      if (!wrap) return;
      wrap.outerHTML = tableHtml(sec.id, t);
      wireTable(sec, t, main.querySelector(`.seg-form[data-seg="${sec.id}"] [data-table="${t.id}"]`));
      updateProgress();
    }
    function wireSection(sec) {
      const form = main.querySelector(`.seg-form[data-seg="${sec.id}"]`);
      if (!form) return;
      const m = secModel(sec.id);
      form.querySelectorAll("[data-field]").forEach(el => el.addEventListener("input", () => {
        m.blocks[el.dataset.field] = el.value; updateProgress(); saveQuietly();
      }));
      tablesFor(sec.id).forEach(t => wireTable(sec, t, form.querySelector(`[data-table="${t.id}"]`)));
      const dz = form.querySelector("[data-drop]"), picker = form.querySelector("[data-file]");
      dz.addEventListener("click", () => picker.click());
      dz.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); picker.click(); } });
      picker.addEventListener("change", () => { addFiles(sec.id, picker.files); picker.value = ""; });
      ["dragenter", "dragover"].forEach(ev => dz.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); dz.classList.add("dropzone-active"); }));
      ["dragleave", "drop"].forEach(ev => dz.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); dz.classList.remove("dropzone-active"); }));
      dz.addEventListener("drop", (e) => { if (e.dataTransfer && e.dataTransfer.files) addFiles(sec.id, e.dataTransfer.files); });
      dz.addEventListener("paste", (e) => { const f = e.clipboardData && e.clipboardData.files; if (f && f.length) { e.preventDefault(); addFiles(sec.id, f); } });
      renderPhotos(sec.id);
    }

    const checkedIds = () => Array.from(main.querySelectorAll(".seg-check:checked")).map(c => c.value);
    function hasData(id) {
      const m = store[id];
      if (!m) return false;
      if (Object.values(m.blocks).some(v => (v || "").trim())) return true;
      if (m.photos.length) return true;
      return Object.values(m.tables).some(rows => rows.some(r => Object.values(r).some(v => (v || "").toString().trim())));
    }
    function countPoints() {
      let n = 0;
      sections.forEach(sec => tablesFor(sec.id).filter(isCoordTable).forEach(t => {
        ((store[sec.id] || {}).tables || {})[t.id]?.forEach(r => { if (validLat(r.lat) && validLng(r.lng)) n++; });
      }));
      return n;
    }
    function updateProgress() {
      const ids = checkedIds(), done = ids.filter(hasData).length, pts = countPoints();
      const el = main.querySelector("#doc-progress");
      if (el) el.textContent = ids.length
        ? `${done} of ${ids.length} selected section(s) have content · ${pts} coordinate${pts === 1 ? "" : "s"} captured.`
        : "No sections selected — tick the ones this document needs.";
      main.querySelectorAll(".seg-toggle").forEach(lab =>
        lab.classList.toggle("seg-filled", hasData(lab.querySelector(".seg-check").value)));
    }

    function renderForms() {
      const ids = checkedIds();
      const chosen = sections.filter(s => ids.includes(s.id));
      main.querySelector("#doc-forms").innerHTML = chosen.length
        ? chosen.map(sectionHtml).join("")
        : `<p class="muted">Tick a section above and its tables appear here.</p>`;
      chosen.forEach(wireSection);
      updateProgress();
    }
    function renderToggles() {
      main.querySelector("#doc-toggles").innerHTML = sections.map(s =>
        `<label class="seg-toggle"><input type="checkbox" class="seg-check" value="${esc(s.id)}" checked />
          <span class="seg-toggle-label">${esc(s.title)}</span>
          <span class="muted small">${esc(s.hint || "")}</span></label>`).join("");
      main.querySelectorAll(".seg-check").forEach(cb => cb.addEventListener("change", renderForms));
      renderForms();
    }
    renderToggles();

    ["project", "author", "ref"].forEach(k => main.querySelector(`#doc-${k}`).addEventListener("input", (e) => {
      store["__" + k] = e.target.value; saveQuietly();
    }));
    main.querySelector("#doc-client").addEventListener("change", (e) => setCurrentClient(e.target.value));
    main.querySelector("#doc-all").addEventListener("click", () => {
      main.querySelectorAll(".seg-check").forEach(c => { c.checked = true; }); renderForms();
    });
    main.querySelector("#doc-none").addEventListener("click", () => {
      main.querySelectorAll(".seg-check").forEach(c => { c.checked = false; }); renderForms();
    });
    main.querySelector("#doc-guided").addEventListener("change", (e) => {
      guided = e.target.checked; state.reportGuided = guided; save(); renderForms();
    });

    /* ---------- collect, draft, submit ---------- */
    function collect() {
      const ids = checkedIds();
      const out = { sections: [], photoCount: 0, points: countPoints() };
      ids.forEach(id => {
        const sec = sections.find(s => s.id === id);
        const m = secModel(id);
        const tables = {};
        tablesFor(id).forEach(t => {
          const rows = (m.tables[t.id] || []).filter(r => Object.values(r).some(v => (v || "").toString().trim()));
          if (rows.length) tables[t.id] = rows;
        });
        out.photoCount += m.photos.length;
        out.sections.push({ id, title: sec.title, text: m.blocks.notes || "", tables, photos: m.photos });
      });
      return out;
    }
    function meta() {
      return {
        project: main.querySelector("#doc-project").value.trim() || "Untitled project",
        client: main.querySelector("#doc-client").value,
        author: main.querySelector("#doc-author").value.trim(),
        ref: main.querySelector("#doc-ref").value.trim()
      };
    }

    function refreshList() {
      const rows = state.docRecords.filter(r => r.kind === doc.key);
      main.querySelector("#doc-list").innerHTML = rows.slice().reverse().map(r => `
        <tr><td>${esc(r.project)}</td><td>${esc(r.client)}</td><td>${r.sectionCount}</td>
        <td>${r.points || 0}</td><td>${r.photoCount || 0}</td><td>${r.date.slice(0, 10)}</td>
        <td class="row-actions">
          <button class="btn btn-ghost btn-sm" data-txt="${esc(r.id)}">.txt</button>
          <button class="btn btn-ghost btn-sm" data-html="${esc(r.id)}">Full document</button>
          ${r.status ? statusBadge(r.status, "warning") : ""}</td></tr>`).join("") ||
        emptyState("documents", "Nothing generated yet. Fill the sections that apply and Verda assembles the document.", 7);
      main.querySelectorAll("[data-txt]").forEach(b => b.addEventListener("click", () => {
        const r = state.docRecords.find(x => x.id === b.dataset.txt);
        downloadText(`${doc.filePrefix}-${r.project.replace(/[^\w]+/g, "_")}.txt`, r.text);
      }));
      main.querySelectorAll("[data-html]").forEach(b => b.addEventListener("click", () => {
        const r = state.docRecords.find(x => x.id === b.dataset.html);
        downloadHtml(`${doc.filePrefix}-${r.project.replace(/[^\w]+/g, "_")}.html`, docHtml(doc, r));
      }));
    }
    refreshList();

    main.querySelector("#doc-draft").addEventListener("click", () => {
      const data = collect();
      if (!data.sections.length) { alert("Tick at least one section."); return; }
      if (!requireClient(main, "doc-client")) return;
      if (!spendCredits(S.creditCosts.aiDraft, `${doc.filePrefix} draft`)) return;
      const m = meta();
      const text = VerdaAI.generateEsiaDraft({
        projectName: m.project, docTitle: doc.docTitle, meta: m,
        sections: data.sections, tableDefs: S.sectionTables
      });
      const rec = Object.assign({
        id: uid("doc"), kind: doc.key, text, date: new Date().toISOString(),
        sectionCount: data.sections.length, photoCount: data.photoCount, points: data.points,
        full: { docTitle: doc.docTitle, meta: m, sections: data.sections }
      }, m);
      state.docRecords.push(rec);
      saveQuietly();
      const out = main.querySelector("#doc-output");
      out.innerHTML = card(`${doc.title} — draft`, `
        <p class="muted small">A draft assembled from what you entered. Read every line: this document carries your name to a regulator.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" id="doc-dl-html">Download full document (.html)</button>
          <button class="btn btn-ghost" id="doc-dl-txt">Download .txt</button>
        </div>
        <div class="report-preview">${docHtml(doc, rec, true)}</div>`);
      out.querySelector("#doc-dl-html").addEventListener("click", () =>
        downloadHtml(`${doc.filePrefix}-${m.project.replace(/[^\w]+/g, "_")}.html`, docHtml(doc, rec)));
      out.querySelector("#doc-dl-txt").addEventListener("click", () =>
        downloadText(`${doc.filePrefix}-${m.project.replace(/[^\w]+/g, "_")}.txt`, text));
      out.scrollIntoView({ behavior: "smooth", block: "start" });
      renderTopbar(); refreshList();
    });

    main.querySelector("#doc-submit").addEventListener("click", () => {
      const data = collect();
      if (!data.sections.length) { alert("Tick at least one section before submitting."); return; }
      if (!spendCredits(S.creditCosts.esiaSubmit, `${doc.filePrefix} processing submission`)) return;
      const m = meta();
      state.docRecords.push(Object.assign({
        id: uid("doc"), kind: doc.key, text: "", date: new Date().toISOString(),
        sectionCount: data.sections.length, photoCount: data.photoCount, points: data.points,
        status: "Submitted for review", full: { docTitle: doc.docTitle, meta: m, sections: data.sections }
      }, m));
      saveQuietly(); renderTopbar(); refreshList();
      alert("Submitted to the demo queue. Connect a backend workflow to route submissions to a reviewer.");
    });
  }

  // The document as a document: narrative, tables, coordinate plots, figures.
  function docHtml(doc, rec, inline) {
    const f = rec.full;
    if (!f) return `<pre class="report-pre">${esc(rec.text)}</pre>`;
    const defs = (id) => VERDA_SEED.sectionTables[id] || [];
    const body = f.sections.map(sec => {
      const tables = defs(sec.id).map(t => {
        const rows = (sec.tables || {})[t.id];
        if (!rows || !rows.length) return "";
        const head = t.columns.map(c => `<th>${esc(c.label)}${c.unit ? ` (${esc(c.unit)})` : ""}</th>`).join("");
        const tb = rows.map(r => `<tr>${t.columns.map(c => `<td>${esc(r[c.key] == null ? "" : String(r[c.key]))}</td>`).join("")}</tr>`).join("");
        const fig = t.map
          ? coordPlot(rows.map(r => ({ lat: r.lat, lng: r.lng, label: r[t.columns[0].key] })), t.title)
          : (t.chart ? renderChartBlock(t, rows) : "");
        return `<h4>${esc(t.title)}</h4><div class="table-scroll"><table class="table"><thead><tr>${head}</tr></thead><tbody>${tb}</tbody></table></div>${fig}`;
      }).join("");
      const text = (sec.text || "").trim();
      const photos = (sec.photos || []).length ? `<h4>Figures</h4><div class="photo-grid report-photos">${
        sec.photos.map(p => `<figure class="photo-card"><img src="${p.src}" alt="${esc(p.caption || "Figure")}"/>
          <figcaption>${esc(p.caption || "")}</figcaption></figure>`).join("")}</div>` : "";
      return `<section class="report-section"><h3>${esc(sec.title)}</h3>
        ${text ? `<p>${esc(text).replace(/\n/g, "<br/>")}</p>` : `<p class="muted">Not yet written.</p>`}
        ${tables}${photos}</section>`;
    }).join("");
    const m = f.meta || {};
    const head = `<header class="report-head"><h1>${esc(f.docTitle)}</h1>
      <table class="table kv-table"><tbody>
        <tr><th>Project</th><td>${esc(m.project || rec.project)}</td></tr>
        <tr><th>Client / site</th><td>${esc(m.client || rec.client)}</td></tr>
        ${m.author ? `<tr><th>Prepared by</th><td>${esc(m.author)}</td></tr>` : ""}
        ${m.ref ? `<tr><th>Reference</th><td>${esc(m.ref)}</td></tr>` : ""}
        <tr><th>Generated</th><td>${rec.date.slice(0, 10)}</td></tr>
      </tbody></table></header>`;
    return inline ? `<div class="report-doc">${head}${body}</div>` : head + body;
  }

  /* ============================ AUDITS ============================
     Beyond the per-sector EHS checklist: management system audits against the
     Annex SL clauses the standards share, compliance and readiness audits, and
     the protocols where missing something costs most — tailings, workers'
     accommodation, contractors.

     A finding is graded, and the grade sets the closure target. An audit that
     produces findings with no owner and no date is an audit that changed
     nothing, so raising a corrective action is one click from each finding. */

  function renderAudits(main) {
    const S = VERDA_SEED;
    const groups = [...new Set(S.auditProtocols.map(p => p.group))];

    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>Audits</h1>
            <p class="muted">${S.auditProtocols.length} audit protocols plus the ${S.industries.length} sector checklists and your own ESMP commitments.
              Findings are graded, each grade carries a closure target, and a corrective action can be raised from any finding.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="conduct">Conduct an audit</button>
          <button class="tab-btn" data-tab="ehs">Sector EHS checklist</button>
          <button class="tab-btn" data-tab="esia">ESIA / ESMP commitments</button>
          <button class="tab-btn" data-tab="register">Audit register</button>
          <button class="tab-btn" data-tab="protocols">Protocol library</button>
        </div>
        <div id="audit-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#audit-panel");

    const GRADE = S.auditFindingCategories;
    const gradeDays = { "Major non-conformity": 0, "Minor non-conformity": 30, "Observation": 90, "Opportunity for improvement": 180, "Positive practice": null };
    const gradeStatus = { "Major non-conformity": "critical", "Minor non-conformity": "serious", "Observation": "warning", "Opportunity for improvement": "good", "Positive practice": "good" };

    /* ---------------- Conduct ---------------- */
    function conductPanel() {
      panel.innerHTML = `
        <div class="card">
          <div class="form-row">
            <label>Protocol<select id="ap-protocol">${groups.map(g =>
              `<optgroup label="${esc(g)}">${S.auditProtocols.filter(p => p.group === g).map(p =>
                `<option value="${esc(p.id)}">${esc(p.name)}</option>`).join("")}</optgroup>`).join("")}</select></label>
            <label>Client / site<select id="ap-client">${clientOptions()}</select></label>
            <label>Auditor<input id="ap-auditor" placeholder="Who is carrying out the audit" /></label>
            <label>Date<input id="ap-date" type="date" value="${today()}" /></label>
          </div>
          <div id="ap-basis" class="guide-box"></div>
        </div>
        <div id="ap-items"></div>
        <div class="card">
          <div id="ap-score"></div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="ap-save">Save audit &amp; raise actions</button>
            <button class="btn" id="ap-ai">AI findings summary (${S.creditCosts.auditAiSummary} credits)</button>
          </div>
        </div>
        <div id="ap-output"></div>`;

      const answers = {};
      function proto() { return S.auditProtocols.find(p => p.id === panel.querySelector("#ap-protocol").value); }

      function load() {
        const p = proto();
        Object.keys(answers).forEach(k => delete answers[k]);
        panel.querySelector("#ap-basis").innerHTML =
          `<p><strong>Scope.</strong> ${esc(p.scope)}</p><p class="small">${esc(p.basis)}</p>`;
        panel.querySelector("#ap-items").innerHTML = p.sections.map((sec, si) => `
          <div class="card">
            <h4>${esc(sec.title)}</h4>
            ${sec.items.map((item, ii) => {
              const key = `${si}-${ii}`;
              return `<div class="audit-item" data-key="${key}">
                <div class="audit-item-text">${esc(item)}</div>
                <div class="audit-item-controls">
                  <select data-af="result" data-key="${key}">
                    <option value="">— not assessed —</option>
                    <option>Conforms</option><option>Does not conform</option><option>Partially conforms</option><option>Not applicable</option>
                  </select>
                  <select data-af="grade" data-key="${key}" disabled>
                    <option value="">Grade</option>
                    ${GRADE.map(g => `<option>${esc(g.category)}</option>`).join("")}
                  </select>
                  <input data-af="note" data-key="${key}" placeholder="Evidence seen, or what is missing" />
                </div>
              </div>`;
            }).join("")}
          </div>`).join("");

        panel.querySelectorAll("[data-af]").forEach(el => el.addEventListener("input", () => {
          const k = el.dataset.key;
          answers[k] = answers[k] || {};
          answers[k][el.dataset.af] = el.value;
          if (el.dataset.af === "result") {
            // A grade only means something on something that did not conform.
            const g = panel.querySelector(`[data-af="grade"][data-key="${k}"]`);
            const needsGrade = /Does not conform|Partially conforms/.test(el.value);
            g.disabled = !needsGrade;
            if (needsGrade && !g.value) g.value = el.value === "Does not conform" ? "Major non-conformity" : "Minor non-conformity";
            if (!needsGrade) g.value = "";
            answers[k].grade = g.value;
          }
          score();
        }));
        score();
      }

      function collect() {
        const p = proto();
        const out = [];
        p.sections.forEach((sec, si) => sec.items.forEach((item, ii) => {
          const a = answers[`${si}-${ii}`] || {};
          out.push({ section: sec.title, item, result: a.result || "", grade: a.grade || "", note: a.note || "" });
        }));
        return out;
      }

      function score() {
        const rows = collect();
        const assessed = rows.filter(r => r.result && r.result !== "Not applicable");
        const conform = assessed.filter(r => r.result === "Conforms").length;
        const pct = assessed.length ? Math.round((conform / assessed.length) * 100) : null;
        const byGrade = GRADE.map(g => ({ label: g.category, n: rows.filter(r => r.grade === g.category).length }));
        panel.querySelector("#ap-score").innerHTML = `
          <div class="kpi-grid">
            ${kpiCard("Conformance", pct === null ? "—" : pct + "%", `${conform} of ${assessed.length} assessed`,
              pct === null ? null : pct >= 90 ? "good" : pct >= 70 ? "warning" : "critical")}
            ${kpiCard("Items assessed", `${assessed.length} / ${rows.length}`, "Excluding not applicable.")}
            ${byGrade.filter(g => g.n).map(g => kpiCard(g.label, g.n,
              gradeDays[g.label] === null ? "Record and replicate." :
              gradeDays[g.label] === 0 ? "Close immediately." : `Close within ${gradeDays[g.label]} days.`,
              gradeStatus[g.label])).join("")}
          </div>`;
      }

      load();
      panel.querySelector("#ap-protocol").addEventListener("change", load);

      panel.querySelector("#ap-save").addEventListener("click", () => {
        const p = proto();
        const rows = collect();
        const assessed = rows.filter(r => r.result && r.result !== "Not applicable");
        if (!assessed.length) { alert("Assess at least one item before saving."); return; }
        if (!requireClient(panel, "ap-client")) return;
        const findings = rows.filter(r => r.grade && r.grade !== "Positive practice");
        const date = panel.querySelector("#ap-date").value || today();
        const client = panel.querySelector("#ap-client").value;
        setCurrentClient(client);
        const rec = {
          id: uid("aud"), protocolId: p.id, protocolName: p.name, client,
          auditor: panel.querySelector("#ap-auditor").value.trim(), date,
          assessed: assessed.length, total: rows.length,
          conformance: Math.round((assessed.filter(r => r.result === "Conforms").length / assessed.length) * 100),
          rows
        };
        state.audits.push(rec);
        // Each finding becomes a corrective action with the grade's own closure
        // target as its due date — a finding without an owner and a date is an
        // audit that changed nothing.
        let raised = 0;
        findings.forEach(f => {
          const days = gradeDays[f.grade];
          state.actions.push({
            id: uid("act"), title: `${f.grade}: ${f.item}`,
            source: "Audit finding", client, owner: "",
            due: addDays(date, days === null ? 90 : days || 0),
            priority: f.grade === "Major non-conformity" ? "High" : f.grade === "Minor non-conformity" ? "Medium" : "Low",
            status: "Open", notes: f.note || ""
          });
          raised++;
        });
        save(); 
        panel.querySelector("#ap-output").innerHTML = card("Audit saved", `
          <p>${esc(p.name)} at ${esc(client)} — ${rec.conformance}% conformance across ${rec.assessed} assessed items.</p>
          <p class="muted small">${raised} corrective action${raised === 1 ? "" : "s"} raised in <a href="#/actions">Actions (CAPA)</a>,
            each dated from its grade's closure target. Assign owners there.</p>
          <div class="modal-actions"><button class="btn" id="ap-dl">Download audit report</button></div>`);
        panel.querySelector("#ap-dl").addEventListener("click", () => downloadAudit(rec));
      });

      panel.querySelector("#ap-ai").addEventListener("click", () => {
        const p = proto();
        const rows = collect().filter(r => r.result);
        if (!rows.length) { alert("Assess at least one item first."); return; }
        if (!spendCredits(S.creditCosts.auditAiSummary, "Audit findings summary")) return;
        const text = VerdaAI.generateAuditSummary({
          industry: p.name,
          findings: rows.map(r => ({ item: r.item, status: r.result === "Conforms" ? "Compliant" : r.result === "Not applicable" ? "N/A" : "Non-Compliant", note: r.note }))
        });
        panel.querySelector("#ap-output").innerHTML = card("Findings summary", `<pre class="report-pre">${esc(text)}</pre>
          <div class="modal-actions"><button class="btn btn-primary" id="ap-ai-dl">Download .txt</button></div>`);
        panel.querySelector("#ap-ai-dl").addEventListener("click", () =>
          downloadText(`Audit-Summary-${p.name.replace(/[^\w]+/g, "_")}.txt`, text));
        renderTopbar();
      });
    }

    function downloadAudit(rec) {
      const findings = rec.rows.filter(r => r.grade);
      downloadText(`Audit-${rec.protocolName.replace(/[^\w]+/g, "_")}-${rec.date}.txt`,
        `${rec.protocolName.toUpperCase()}\nClient / site: ${rec.client}\nAuditor: ${rec.auditor || "—"}\nDate: ${rec.date}\n` +
        `Conformance: ${rec.conformance}% (${rec.assessed} of ${rec.total} items assessed)\n` +
        `-----------------------------------------------------------------------\n\n` +
        (findings.length ? `FINDINGS\n` + findings.map(f =>
          `  [${f.grade}] ${f.item}\n      Section: ${f.section}\n      Result: ${f.result}\n      Note: ${f.note || "—"}` +
          `\n      Closure target: ${gradeDays[f.grade] === null ? "—" : gradeDays[f.grade] === 0 ? "immediate" : gradeDays[f.grade] + " days"}`
        ).join("\n\n") : "No graded findings recorded.\n") +
        `\n\nFULL RESULT\n` + rec.rows.filter(r => r.result).map(r =>
          `  [${r.result}] ${r.item}${r.note ? "\n      " + r.note : ""}`).join("\n") + "\n");
    }

    /* ---------------- Sector EHS checklist (kept) ---------------- */
    function ehsPanel() {
      panel.innerHTML = `
        <div class="card">
          <label>Sector checklist
            <select id="audit-industry">${[...new Set(S.industries.map(i => i.group))].map(g =>
              `<optgroup label="${esc(g)}">${S.industries.filter(i => i.group === g).map(i =>
                `<option value="${esc(i.id)}">${esc(i.name)}</option>`).join("")}</optgroup>`).join("")}</select></label>
          <p class="muted small" id="audit-count"></p>
          <div id="audit-items"></div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="audit-ai">Generate AI findings summary (${S.creditCosts.auditAiSummary} credits)</button>
          </div>
        </div>
        <div id="audit-output"></div>`;
      function loadItems() {
        const ind = S.industries.find(i => i.id === panel.querySelector("#audit-industry").value);
        panel.querySelector("#audit-count").textContent = `${ind.checklist.length} items.`;
        panel.querySelector("#audit-items").innerHTML = ind.checklist.map((item, idx) => `
          <div class="audit-row">
            <div>${esc(item)}</div>
            <select data-idx="${idx}" class="audit-status">
              <option>Compliant</option><option>Non-Compliant</option><option>N/A</option>
            </select>
            <input class="audit-note" data-idx="${idx}" placeholder="Note (optional)" />
          </div>`).join("");
      }
      loadItems();
      panel.querySelector("#audit-industry").addEventListener("change", loadItems);
      panel.querySelector("#audit-ai").addEventListener("click", () => {
        const ind = S.industries.find(i => i.id === panel.querySelector("#audit-industry").value);
        const findings = ind.checklist.map((item, idx) => ({
          item, status: panel.querySelectorAll(".audit-status")[idx].value,
          note: panel.querySelectorAll(".audit-note")[idx].value
        }));
        if (!spendCredits(S.creditCosts.auditAiSummary, "Auto EHS audit AI summary")) return;
        const text = VerdaAI.generateAuditSummary({ industry: ind.name, findings });
        state.audits.push({ id: uid("aud"), protocolName: ind.name + " (sector checklist)", client: currentClient() ? currentClient().name : "",
          date: today(), assessed: findings.filter(f => f.status !== "N/A").length, total: findings.length,
          conformance: Math.round((findings.filter(f => f.status === "Compliant").length / Math.max(1, findings.filter(f => f.status !== "N/A").length)) * 100),
          rows: findings.map(f => ({ section: ind.name, item: f.item, result: f.status, grade: "", note: f.note })) });
        save(); renderTopbar();
        panel.querySelector("#audit-output").innerHTML = card("Findings summary", `<pre class="report-pre">${esc(text)}</pre>
          <div class="modal-actions"><button class="btn btn-primary" id="audit-dl">Download .txt</button></div>`);
        panel.querySelector("#audit-dl").addEventListener("click", () =>
          downloadText(`Audit-${ind.name.replace(/[^\w]+/g, "_")}.txt`, text));
      });
    }

    /* ---------------- ESIA / ESMP commitments (kept) ---------------- */
    function esiaPanel() {
      panel.innerHTML = `
        <div class="card">
          <h3>ESIA / ESMP commitment audit</h3>
          <p class="muted small">Audit against the commitments in your own ESMP. Add each commitment, then judge whether it is being met —
            a commitment made in an approved ESIA is an enforceable condition, not an aspiration.</p>
          <div class="form-row">
            <label>Commitment<input id="esa-item" placeholder="e.g. Dust suppression twice daily on unsealed haul roads" /></label>
            <label>Source<input id="esa-src" placeholder="ESMP section or permit condition" /></label>
            <label>Status<select id="esa-status"><option>Met</option><option>Partly met</option><option>Not met</option><option>Not yet due</option></select></label>
            <button class="btn btn-primary" id="esa-add">Add</button>
          </div>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Commitment</th><th>Source</th><th>Status</th><th></th></tr></thead>
            <tbody id="esa-rows"></tbody></table></div>
        </div>`;
      state.esmpAudit = state.esmpAudit || [];
      const ST = { "Met": "good", "Partly met": "warning", "Not met": "critical", "Not yet due": "warning" };
      function refresh() {
        panel.querySelector("#esa-rows").innerHTML = state.esmpAudit.map(x =>
          `<tr><td>${esc(x.item)}</td><td class="small">${esc(x.src || "—")}</td>
            <td>${statusBadge(x.status, ST[x.status])}</td>
            <td class="row-actions"><button class="btn btn-ghost btn-sm" data-esa-del="${esc(x.id)}">Remove</button></td></tr>`).join("") ||
          emptyState("wildlife", "No commitments recorded. Take them from the approved ESMP — each one is a condition someone can be held to.", 4);
        panel.querySelectorAll("[data-esa-del]").forEach(b => b.addEventListener("click", () => {
          state.esmpAudit = state.esmpAudit.filter(x => x.id !== b.dataset.esaDel); save(); refresh();
        }));
      }
      refresh();
      panel.querySelector("#esa-add").addEventListener("click", () => {
        const item = panel.querySelector("#esa-item").value.trim();
        if (!item) { alert("Enter the commitment."); return; }
        state.esmpAudit.push({ id: uid("esa"), item, src: panel.querySelector("#esa-src").value.trim(), status: panel.querySelector("#esa-status").value });
        save(); refresh();
        panel.querySelector("#esa-item").value = ""; panel.querySelector("#esa-src").value = "";
      });
    }

    /* ---------------- Register ---------------- */
    function registerPanel() {
      const audits = state.audits.slice().reverse();
      const gradeRows = GRADE.map(g => ({
        label: g.category.replace(" non-conformity", ""),
        values: { n: state.audits.reduce((a, x) => a + (x.rows || []).filter(r => r.grade === g.category).length, 0) },
        color: `var(--chart-${gradeStatus[g.category]})`
      })).filter(r => r.values.n);
      panel.innerHTML = `
        <div class="grid grid-3">
          ${statCard("audits", "Audits completed", state.audits.length, "All protocols.")}
          ${statCard("risk", "Open findings", state.actions.filter(a => a.source === "Audit finding" && a.status !== "Closed").length, "Raised from audits, not yet closed.", true)}
          ${statCard("analytics", "Average conformance", state.audits.length
            ? Math.round(state.audits.reduce((a, x) => a + (x.conformance || 0), 0) / state.audits.length) + "%" : "—", "Across every audit recorded.")}
        </div>
        ${gradeRows.length ? `<div class="card">${groupedBarChart(gradeRows, [{ key: "n", label: "Findings" }], "Findings by grade", "Findings")}</div>` : ""}
        <div class="card">
          <h3>Audit register</h3>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Date</th><th>Protocol</th><th>Client / site</th><th>Auditor</th><th class="num">Assessed</th><th class="num">Conformance</th><th></th></tr></thead>
            <tbody>${audits.map(a => `<tr>
              <td>${esc(a.date)}</td><td>${esc(a.protocolName)}</td><td>${esc(a.client || "—")}</td>
              <td class="small">${esc(a.auditor || "—")}</td><td class="num">${a.assessed}/${a.total}</td>
              <td class="num">${a.conformance}%</td>
              <td class="row-actions"><button class="btn btn-ghost btn-sm" data-aud-dl="${esc(a.id)}">Report</button></td></tr>`).join("") ||
              emptyState("audit", "No audits recorded yet. Pick a protocol on the first tab and work through it — findings become corrective actions automatically.", 7)}
            </tbody></table></div>
        </div>`;
      panel.querySelectorAll("[data-aud-dl]").forEach(b => b.addEventListener("click", () =>
        downloadAudit(state.audits.find(x => x.id === b.dataset.audDl))));
    }

    /* ---------------- Protocol library ---------------- */
    function protocolsPanel() {
      panel.innerHTML = groups.map(g => `
        <h3 class="calc-group">${esc(g)}</h3>
        ${S.auditProtocols.filter(p => p.group === g).map(p => `
          <div class="card">
            <h4>${esc(p.name)}</h4>
            <p class="muted small"><strong>Scope.</strong> ${esc(p.scope)}</p>
            <p class="muted small">${esc(p.basis)}</p>
            <details><summary>${p.sections.length} sections · ${p.sections.reduce((a, s) => a + s.items.length, 0)} items</summary>
              ${p.sections.map(sec => `<h5>${esc(sec.title)}</h5>
                <ul class="checklist">${sec.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`).join("")}
            </details>
          </div>`).join("")}`).join("") +
        `<div class="card">
          <h3>Finding grades and closure targets</h3>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Grade</th><th>What it means</th><th>Closure target</th></tr></thead>
            <tbody>${GRADE.map(g => `<tr><td>${statusBadge(g.category, gradeStatus[g.category])}</td>
              <td class="small">${esc(g.meaning)}</td><td>${esc(g.target)}</td></tr>`).join("")}</tbody></table></div>
          <p class="muted small">A corrective action is raised from every finding with the grade's target as its due date.</p>
        </div>
        <div class="modal-actions"><button class="btn" id="ap-lib-dl">Download every protocol (.txt)</button></div>`;
      panel.querySelector("#ap-lib-dl").addEventListener("click", () =>
        downloadText("Audit-Protocols.txt", "AUDIT PROTOCOLS\n\n" + S.auditProtocols.map(p =>
          `${p.name.toUpperCase()}  [${p.group}]\n  Scope: ${p.scope}\n  Basis: ${p.basis}\n` +
          p.sections.map(sec => `\n  ${sec.title}\n` + sec.items.map(i => `    [ ] ${i}`).join("\n")).join("")).join("\n\n")));
    }

    const panels = { conduct: conductPanel, ehs: ehsPanel, esia: esiaPanel, register: registerPanel, protocols: protocolsPanel };
    conductPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      panels[btn.dataset.tab]();
    }));
  }

  /* ====================== INSPECTIONS & CALCULATIONS ======================
     Two halves of the same job: knowing what has to be examined and when,
     and turning a quantity into the figure a standard or a permit actually
     asks for. Both are calculated — a due date typed by hand goes stale, and
     a conversion done in someone's head is a conversion nobody can check. */

  // Add an interval expressed in days or months to a date.
  function addInterval(dateStr, every, unit) {
    if (!dateStr) return "";
    if (unit === "days") {
      const d = new Date(dateStr);
      d.setDate(d.getDate() + Number(every));
      return d.toISOString().slice(0, 10);
    }
    return addMonths(dateStr, Number(every));
  }

  // Due status, with a warning window so an examination is chased before it
  // lapses rather than after — a lapsed statutory examination usually means
  // the equipment may not lawfully be used.
  function dueStatus(nextDue, warnDays) {
    if (!nextDue) return { label: "Not scheduled", status: "warning", days: null };
    const days = daysUntil(nextDue);
    if (days < 0) return { label: `Overdue by ${Math.abs(days)}d`, status: "critical", days };
    if (days <= (warnDays || 30)) return { label: `Due in ${days}d`, status: "warning", days };
    return { label: `Valid — ${days}d`, status: "good", days };
  }

  // A tiny, deliberately limited expression evaluator for calculator formulas.
  // Only numbers, the named inputs, arithmetic, ceil/floor/log10/sqrt/min/max
  // are accepted — anything else is rejected rather than executed.
  function evalFormula(expr, vars) {
    const allowed = /^[\d\s+\-*/().,a-zA-Z_]+$/;
    if (!allowed.test(expr)) return null;
    const fns = { ceil: Math.ceil, floor: Math.floor, round: Math.round, log10: Math.log10, sqrt: Math.sqrt, min: Math.min, max: Math.max, abs: Math.abs };
    const names = Object.keys(vars).concat(Object.keys(fns));
    const values = Object.keys(vars).map(k => Number(vars[k])).concat(Object.keys(fns).map(k => fns[k]));
    try {
      // eslint-disable-next-line no-new-func
      const out = Function(...names, `"use strict"; return (${expr});`)(...values);
      return Number.isFinite(out) ? out : null;
    } catch (e) { return null; }
  }

  // Whole numbers print whole — "18 toilets", not "18.0 toilets".
  //
  // Small non-zero figures get significant digits rather than two decimals.
  // 86.4 m³/day is 0.001 m³/s, and printing that as "0.00" is the same failure
  // as printing a wrong number: it reads as nothing when it is something.
  const fmtNum = (v) => {
    if (v === null) return "—";
    if (Number.isInteger(v)) return v.toLocaleString();
    const abs = Math.abs(v);
    if (abs >= 1000) return Math.round(v).toLocaleString();
    if (abs >= 10) return v.toFixed(1);
    if (abs >= 0.01) return v.toFixed(2);
    if (abs > 0) {
      // toPrecision gives exponent form below 1e-6; at that point it is the
      // honest rendering, so let it through rather than showing a row of zeros.
      const p = v.toPrecision(3);
      return p.includes("e") ? p : p.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
    }
    return v.toFixed(2);
  };

  function renderInspections(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>Inspections &amp; Calculations</h1>
            <p class="muted">Equipment and machines that must be examined, when each one is next due, and the calculations
              that turn a quantity into the figure a standard or permit asks for. Due dates and derived figures are calculated,
              never typed.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="register">Equipment register</button>
          <button class="tab-btn" data-tab="regimes">Inspection requirements</button>
          <button class="tab-btn" data-tab="calc">Calculators</button>
        </div>
        <div id="insp-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#insp-panel");

    /* ---------------- Equipment register ---------------- */
    function registerPanel() {
      const cats = [...new Set(S.inspectionRegimes.map(r => r.category))];
      panel.innerHTML = `
        <div class="card">
          <h3>Add equipment</h3>
          <div class="form-row">
            <label>Equipment type
              <select id="eq-type">${cats.map(c =>
                `<optgroup label="${esc(c)}">${S.inspectionRegimes.map((r, i) => r.category === c
                  ? `<option value="${i}">${esc(r.item)} — ${esc(r.inspection)}</option>` : "").join("")}</optgroup>`).join("")}</select></label>
            <label>Asset ID / description<input id="eq-id" placeholder="e.g. CRN-02 Liebherr 40t" /></label>
            <label>Client / site<select id="eq-client">${clientOptions()}</select></label>
          </div>
          <div class="form-row">
            <label>Owned by<select id="eq-owner">${S.employerTypes.map(t => `<option>${esc(t)}</option>`).join("")}</select></label>
            <label>Owner name<input id="eq-owner-name" placeholder="Own plant or sub-contractor" list="eq-owner-options" /></label>
            <label>Last inspection<input id="eq-last" type="date" value="${today()}" /></label>
            <label>Certificate no.<input id="eq-cert" placeholder="Report / certificate reference" /></label>
          </div>
          <div id="eq-regime" class="guide-box"></div>
          <button class="btn btn-primary" id="eq-add">${icon("audits")}<span>Add to register</span></button>
          <datalist id="eq-owner-options">${state.subcontractors.map(sc => `<option value="${esc(sc.name)}"></option>`).join("")}</datalist>
        </div>

        <div class="grid grid-3" id="eq-kpis"></div>

        <div class="card">
          <h3>Equipment register</h3>
          <p class="muted small">Next due is calculated from the last inspection date and the statutory interval. Sorted by what lapses first.</p>
          <div class="table-scroll">
            <table class="table">
              <thead><tr><th>Asset</th><th>Type</th><th>Inspection</th><th>Owner</th><th>Site</th><th>Last</th><th>Interval</th><th>Next due</th><th>Status</th><th></th></tr></thead>
              <tbody id="eq-rows"></tbody>
            </table>
          </div>
          <button class="btn" id="eq-download">Download register (.txt)</button>
        </div>`;

      // Show what the selected type actually requires, before it is added.
      function showRegime() {
        const r = S.inspectionRegimes[Number(panel.querySelector("#eq-type").value)];
        panel.querySelector("#eq-regime").innerHTML = `
          <p><strong>${esc(r.item)} — ${esc(r.inspection)}.</strong> Every <strong>${r.every} ${esc(r.unit)}</strong>, by: ${esc(r.who)}.</p>
          <p class="small">${esc(r.basis)}</p>
          <p class="small muted">Verda will set the next due date from the last inspection you enter. The interval is a maximum — check the regulation applying to your jurisdiction.</p>`;
      }
      showRegime();
      panel.querySelector("#eq-type").addEventListener("change", showRegime);

      function refresh() {
        const rows = state.equipment.map(e => {
          const r = S.inspectionRegimes[e.regime] || {};
          const next = addInterval(e.last, r.every, r.unit);
          return { e, r, next, st: dueStatus(next) };
        }).sort((a, b) => (a.st.days === null ? 1e9 : a.st.days) - (b.st.days === null ? 1e9 : b.st.days));

        panel.querySelector("#eq-rows").innerHTML = rows.map(({ e, r, next, st }) => `
          <tr${st.status === "critical" ? ' class="row-overdue"' : ""}>
            <td>${esc(e.assetId)}</td><td>${esc(r.item || "—")}</td><td>${esc(r.inspection || "—")}</td>
            <td>${esc(e.ownerName || e.owner || "—")}</td><td>${esc(e.client)}</td>
            <td>${esc(e.last)}</td><td>${r.every} ${esc(r.unit || "")}</td>
            <td>${esc(next)}</td><td>${statusBadge(st.label, st.status)}</td>
            <td class="row-actions">
              <button class="btn btn-ghost btn-sm" data-done="${esc(e.id)}" title="Record an inspection today">Inspected</button>
              <button class="btn btn-ghost btn-sm" data-del="${esc(e.id)}">Remove</button></td></tr>`).join("") ||
          emptyState("audit", "No equipment registered. Add the plant and machines carrying a statutory examination — <strong>that is where a lapse costs most</strong>.", 10);

        const overdue = rows.filter(r => r.st.status === "critical").length;
        const soon = rows.filter(r => r.st.status === "warning").length;
        panel.querySelector("#eq-kpis").innerHTML =
          statCard("audits", "Equipment registered", rows.length, "Items carrying an inspection requirement.") +
          statCard("risk", "Overdue examinations", overdue, overdue ? "Usually means the item may not lawfully be used." : "None overdue.", overdue > 0) +
          statCard("actions", "Due within 30 days", soon, "Schedule the competent person now.", soon > 0);

        panel.querySelectorAll("[data-done]").forEach(b => b.addEventListener("click", () => {
          const e = state.equipment.find(x => x.id === b.dataset.done);
          e.last = today(); save(); refresh();
        }));
        panel.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
          state.equipment = state.equipment.filter(x => x.id !== b.dataset.del);
          save(); refresh();
        }));
      }
      refresh();

      panel.querySelector("#eq-add").addEventListener("click", () => {
        const assetId = panel.querySelector("#eq-id").value.trim();
        if (!assetId) { alert("Give the asset an ID or description so it can be found on site."); return; }
        if (!requireClient(panel, "eq-client")) return;
        state.equipment.push({
          id: uid("eq"), assetId, regime: Number(panel.querySelector("#eq-type").value),
          client: panel.querySelector("#eq-client").value,
          owner: panel.querySelector("#eq-owner").value,
          ownerName: panel.querySelector("#eq-owner-name").value.trim(),
          last: panel.querySelector("#eq-last").value || today(),
          cert: panel.querySelector("#eq-cert").value.trim()
        });
        save(); refresh();
        panel.querySelector("#eq-id").value = ""; panel.querySelector("#eq-cert").value = "";
      });

      panel.querySelector("#eq-download").addEventListener("click", () => {
        const lines = state.equipment.map(e => {
          const r = S.inspectionRegimes[e.regime] || {};
          const next = addInterval(e.last, r.every, r.unit);
          return `${e.assetId}\n    ${r.item} — ${r.inspection}\n    Owner: ${e.ownerName || e.owner}  |  Site: ${e.client}` +
            `\n    Last: ${e.last}  |  Every ${r.every} ${r.unit}  |  Next due: ${next}  |  ${dueStatus(next).label}` +
            `\n    Certificate: ${e.cert || "—"}\n    Basis: ${r.basis}`;
        });
        downloadText("Equipment-Inspection-Register.txt",
          "EQUIPMENT & MACHINE INSPECTION REGISTER\nNext due dates calculated from the last inspection and the statutory interval.\n\n" +
          (lines.join("\n\n") || "No equipment registered."));
      });
    }

    /* ---------------- Inspection requirements reference ---------------- */
    function regimesPanel() {
      const cats = [...new Set(S.inspectionRegimes.map(r => r.category))];
      panel.innerHTML = `
        <div class="card">
          <h3>What has to be inspected, and how often</h3>
          <p class="muted small">${S.inspectionRegimes.length} equipment and machine inspection requirements across ${cats.length} categories.
            Intervals are maximums under most regimes — several jurisdictions are stricter, and a manufacturer's schedule may be shorter still.</p>
          <label>Category<select id="rg-cat"><option value="">— all categories —</option>${
            cats.map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>Equipment</th><th>Inspection</th><th class="num">Interval</th><th>By whom</th><th>Basis</th></tr></thead>
            <tbody id="rg-rows"></tbody></table>
          </div>
          <button class="btn" id="rg-download">Download requirements (.txt)</button>
        </div>`;
      function load() {
        const cat = panel.querySelector("#rg-cat").value;
        panel.querySelector("#rg-rows").innerHTML = S.inspectionRegimes.filter(r => !cat || r.category === cat)
          .map(r => `<tr><td>${esc(r.item)}</td><td>${esc(r.inspection)}</td>
            <td class="num">${r.every} ${esc(r.unit)}</td><td>${esc(r.who)}</td><td>${esc(r.basis)}</td></tr>`).join("");
      }
      load();
      panel.querySelector("#rg-cat").addEventListener("change", load);
      panel.querySelector("#rg-download").addEventListener("click", () =>
        downloadText("Inspection-Requirements.txt", "EQUIPMENT & MACHINE INSPECTION REQUIREMENTS\n\n" +
          cats.map(c => `${c.toUpperCase()}\n` + S.inspectionRegimes.filter(r => r.category === c)
            .map(r => `  • ${r.item} — ${r.inspection}\n      Every ${r.every} ${r.unit}, by ${r.who}\n      ${r.basis}`).join("\n")).join("\n\n")));
    }

    /* ---------------- Calculators ---------------- */
    const calcPanel = () => calculatorPanel(panel);

    const panels = { register: registerPanel, regimes: regimesPanel, calc: calcPanel };
    registerPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      panels[btn.dataset.tab]();
    }));
  }

  /* ============================ RECORDS ============================ */
  function renderRecords(main) {
    const cats = ["PPE", "Environment", "Community", "CSR"];
    main.appendChild(h(`
      <section>
        <h1>Records</h1>
        <p class="muted">Store PPE, environment, community and CSR records with supporting photos.</p>
        <div class="card">
          <label>Category<select id="rec-cat">${cats.map(c => `<option>${c}</option>`).join("")}</select></label>
          <label>Description<input id="rec-desc" placeholder="e.g. PPE issued to site crew, tree planting event..." /></label>
          <label>Site / client
            <select id="rec-client">${state.clients.map(c => `<option value="${esc(c.name)}">${esc(c.name)}</option>`).join("")}</select>
          </label>
          <label>Photo (optional)<input id="rec-photo" type="file" accept="image/*" /></label>
          <button class="btn btn-primary" id="rec-add">Add record</button>
        </div>
        <div class="record-gallery" id="rec-gallery"></div>
      </section>
    `));
    function refresh() {
      main.querySelector("#rec-gallery").innerHTML = state.records.slice().reverse().map(r => `
        <div class="record-card">
          ${r.photo ? `<img src="${esc(r.photo)}" alt="" />` : `<div class="record-noimg">No photo</div>`}
          <div class="record-body">
            <span class="badge">${esc(r.category)}</span>
            <p>${esc(r.desc)}</p>
            <p class="muted small">${esc(r.client)} · ${esc(r.date.slice(0,10))}</p>
          </div>
        </div>`).join("") || `<p class="muted">No records yet.</p>`;
    }
    refresh();
    main.querySelector("#rec-add").addEventListener("click", async () => {
      const desc = main.querySelector("#rec-desc").value.trim();
      if (!desc) { alert("Add a description."); return; }
      const fileInput = main.querySelector("#rec-photo");
      let photo = null;
      if (fileInput.files[0]) {
        try { photo = await fileToDataUrl(fileInput.files[0]); } catch (e) { /* ignore */ }
      }
      state.records.push({
        id: uid("rec"), category: main.querySelector("#rec-cat").value, desc,
        client: main.querySelector("#rec-client").value, photo, date: new Date().toISOString()
      });
      save();
      main.querySelector("#rec-desc").value = ""; fileInput.value = "";
      refresh();
    });
  }

  /* ==================== SENSITIVE AREAS & SCREENING ====================
     Verda ships no wetland boundaries — see the note in data.js. What it does
     is let you load the layer you obtained from the agency that holds it, and
     screen every coordinate you have recorded against it. That is the part
     that actually answers a question: "does sampling point P3 fall inside a
     wetland?" A map you can look at does not answer it; a screening result
     with a distance does. */

  // Ray casting. Works on a polygon's outer ring in degrees, which is fine at
  // the scale a site sits at; it is not a projected-area calculation and is
  // not claimed to be one.
  function pointInRing(lng, lat, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      const intersects = ((yi > lat) !== (yj > lat)) &&
        (lng < ((xj - xi) * (lat - yi)) / ((yj - yi) || 1e-12) + xi);
      if (intersects) inside = !inside;
    }
    return inside;
  }
  // A polygon with holes: inside the outer ring and outside every hole.
  function pointInPolygon(lng, lat, rings) {
    if (!rings.length || !pointInRing(lng, lat, rings[0])) return false;
    for (let i = 1; i < rings.length; i++) if (pointInRing(lng, lat, rings[i])) return false;
    return true;
  }
  function pointInFeature(lng, lat, geom) {
    if (!geom) return false;
    if (geom.type === "Polygon") return pointInPolygon(lng, lat, geom.coordinates);
    if (geom.type === "MultiPolygon") return geom.coordinates.some(p => pointInPolygon(lng, lat, p));
    return false;
  }

  // Great-circle distance in metres — used to report how close a point sits to
  // a boundary it is outside of, because "outside" and "outside by 4 m" are
  // different answers.
  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371000, toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }
  // Distance to the nearest vertex of a feature. An approximation — it can
  // overstate the distance to a long straight edge — so it is labelled as the
  // nearest mapped vertex, not the nearest point on the boundary.
  function distanceToFeature(lat, lng, geom) {
    let best = Infinity;
    const walk = (rings) => rings.forEach(ring => ring.forEach(([x, y]) => {
      const d = haversine(lat, lng, y, x);
      if (d < best) best = d;
    }));
    if (geom.type === "Polygon") walk(geom.coordinates);
    else if (geom.type === "MultiPolygon") geom.coordinates.forEach(walk);
    else if (geom.type === "Point") best = haversine(lat, lng, geom.coordinates[1], geom.coordinates[0]);
    else if (geom.type === "LineString") walk([geom.coordinates]);
    return best;
  }

  const featureName = (f) => {
    const p = f.properties || {};
    return p.name || p.NAME || p.Name || p.SITE_NAME || p.site_name || p.WETLAND || p.title || "(unnamed feature)";
  };

  // Every coordinate the platform holds: client sites, and every coordinate
  // table in the ToR and ESIA documents.
  function allProjectPoints() {
    const pts = [];
    state.clients.forEach(c => {
      if (Number.isFinite(Number(c.lat)) && Number.isFinite(Number(c.lng)))
        pts.push({ label: c.name, source: "Client site", lat: Number(c.lat), lng: Number(c.lng) });
    });
    Object.entries(state.docs || {}).forEach(([kind, store]) => {
      Object.entries(store).forEach(([secId, m]) => {
        if (!m || !m.tables) return;
        const defs = VERDA_SEED.sectionTables[secId] || [];
        defs.filter(t => t.map).forEach(t => {
          (m.tables[t.id] || []).forEach(r => {
            if (validLat(r.lat) && validLng(r.lng)) {
              pts.push({
                label: r[t.columns[0].key] || t.title,
                source: `${kind.toUpperCase()} — ${t.title}`,
                lat: Number(r.lat), lng: Number(r.lng)
              });
            }
          });
        });
      });
    });
    return pts;
  }

  function screenPoints(points, layer, bufferM) {
    return points.map(p => {
      let inside = null, nearest = null, nearestDist = Infinity;
      layer.features.forEach(f => {
        if (pointInFeature(p.lng, p.lat, f.geometry)) { if (!inside) inside = f; }
        const d = distanceToFeature(p.lat, p.lng, f.geometry);
        if (d < nearestDist) { nearestDist = d; nearest = f; }
      });
      const within = !inside && nearestDist <= bufferM;
      return {
        point: p,
        status: inside ? "inside" : within ? "buffer" : "outside",
        feature: inside ? featureName(inside) : featureName(nearest),
        distance: inside ? 0 : nearestDist
      };
    });
  }

  function renderSensitiveAreas(panel) {
    const S = VERDA_SEED;
    const c = COUNTRY();
    const nat = S.wetlandSourcesByCountry[c.id] || [];

    let lastStatus = "";
    function draw() {
      const layers = state.geoLayers;
      panel.innerHTML = `
        <div class="card notice-card">
          <h3>Wetlands and other sensitive areas</h3>
          <p><strong>Verda does not ship wetland boundaries, and will not.</strong> National wetland boundaries are held by the
            agencies listed below; they are large, licensed, and revised. A plausible-looking polygon shipped in an app is worse
            than none — someone screens a site against it, reads "no wetland here", and clears works that needed a permit.</p>
          <p class="small">What Verda does instead: obtain the layer from the authority that holds it, load it here, and every
            coordinate in the platform — client sites, ToR study areas, ESIA sampling points, receptors, monitoring points — is
            screened against it with a distance.</p>
        </div>

        <div class="card">
          <h3>Load a layer</h3>
          <div class="form-row">
            <label>Layer name<input id="geo-name" placeholder="e.g. Wetlands — Wetlands Management Dept 2025" /></label>
            <label>Type<select id="geo-kind">
              <option>Wetland</option><option>Protected area</option><option>Forest reserve</option>
              <option>Riparian buffer</option><option>Cultural heritage</option><option>Settlement</option><option>Other</option>
            </select></label>
            <label>Screening buffer (m)<input id="geo-buffer" type="number" value="500" min="0" /></label>
          </div>
          <div class="dropzone" id="geo-drop" tabindex="0" role="button" aria-label="Load a GeoJSON layer">
            <p><strong>Drop a GeoJSON file here</strong> — or click to choose.</p>
            <p class="muted small">GeoJSON (.geojson / .json). A browser cannot read a .shp directly: convert the shapefile first
              in QGIS (Export → Save Features As → GeoJSON) or with mapshaper.org, and keep it in WGS84 / EPSG:4326.</p>
            <input type="file" accept=".geojson,.json,application/geo+json,application/json" hidden id="geo-file" />
          </div>
          <div id="geo-status">${lastStatus}</div>
        </div>

        ${layers.length ? `<div class="card">
          <h3>Loaded layers</h3>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Layer</th><th>Type</th><th class="num">Features</th><th>Loaded</th><th></th></tr></thead>
            <tbody>${layers.map(l => `<tr><td>${esc(l.name)}</td><td>${esc(l.kind)}</td>
              <td class="num">${l.features.length}</td><td>${esc(l.date.slice(0, 10))}</td>
              <td class="row-actions"><button class="btn btn-ghost btn-sm" data-geo-del="${esc(l.id)}">Remove</button></td></tr>`).join("")}
            </tbody></table></div>
        </div>` : ""}

        <div class="card"><h3>Screening result</h3><div id="geo-screen"></div></div>

        <div class="card">
          <h3>Where the authoritative layer comes from — ${esc(c.name)}</h3>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Source</th><th>What it holds</th><th>Format</th><th>Note</th></tr></thead>
            <tbody>${nat.map(x => `<tr><td>${extLink(x.url, x.name)}</td><td>${esc(x.what)}</td>
              <td>${esc(x.format)}<br/><span class="muted small">${esc(x.licence)}</span></td>
              <td class="small">${esc(x.note)}</td></tr>`).join("")}</tbody></table></div>
        </div>
        <div class="card">
          <h3>Regional and global sources</h3>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Source</th><th>What it holds</th><th>Format &amp; licence</th><th>Note</th></tr></thead>
            <tbody>${S.wetlandSourcesGlobal.map(x => `<tr><td>${extLink(x.url, x.name)}</td><td>${esc(x.what)}</td>
              <td>${esc(x.format)}<br/><span class="muted small">${esc(x.licence)}</span></td>
              <td class="small">${esc(x.note)}</td></tr>`).join("")}</tbody></table></div>
          <p class="muted small">Whichever layer you screen against, the determination that counts is the regulator's.
            A screening result is evidence for a conversation with them, not a substitute for it.</p>
        </div>`;

      const file = panel.querySelector("#geo-file"), dz = panel.querySelector("#geo-drop");
      dz.addEventListener("click", () => file.click());
      dz.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); file.click(); } });
      ["dragenter", "dragover"].forEach(ev => dz.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); dz.classList.add("dropzone-active"); }));
      ["dragleave", "drop"].forEach(ev => dz.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); dz.classList.remove("dropzone-active"); }));
      dz.addEventListener("drop", (e) => { if (e.dataTransfer.files.length) loadGeo(e.dataTransfer.files[0]); });
      file.addEventListener("change", () => { if (file.files.length) loadGeo(file.files[0]); file.value = ""; });
      panel.querySelectorAll("[data-geo-del]").forEach(b => b.addEventListener("click", () => {
        state.geoLayers = state.geoLayers.filter(x => x.id !== b.dataset.geoDel);
        save(); draw();
      }));
      screen();
    }

    function loadGeo(f) {
      const status = panel.querySelector("#geo-status");
      const reader = new FileReader();
      reader.onerror = () => { status.innerHTML = `<p class="calc-invalid">Could not read that file.</p>`; };
      reader.onload = () => {
        let gj;
        try { gj = JSON.parse(reader.result); }
        catch (e) {
          status.innerHTML = `<p class="calc-invalid">That is not valid JSON. If it is a .shp, convert it to GeoJSON first — a browser cannot read a shapefile.</p>`;
          return;
        }
        const features = gj.type === "FeatureCollection" ? gj.features
          : gj.type === "Feature" ? [gj]
          : gj.type && gj.coordinates ? [{ type: "Feature", properties: {}, geometry: gj }] : null;
        if (!features || !features.length) {
          status.innerHTML = `<p class="calc-invalid">No features found. Expected a GeoJSON FeatureCollection.</p>`;
          return;
        }
        const polys = features.filter(x => x.geometry && /Polygon/.test(x.geometry.type)).length;
        const layer = {
          id: uid("geo"), name: panel.querySelector("#geo-name").value.trim() || f.name.replace(/\.[^.]+$/, ""),
          kind: panel.querySelector("#geo-kind").value, date: new Date().toISOString(),
          features: features.map(x => ({ properties: x.properties || {}, geometry: x.geometry })).filter(x => x.geometry)
        };
        state.geoLayers.push(layer);
        try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
        catch (e) {
          state.geoLayers.pop();
          status.innerHTML = `<p class="calc-invalid">That layer is too large for browser storage. Simplify it first
            (in QGIS: Vector → Geometry Tools → Simplify, or clip it to your area of interest) and load it again.</p>`;
          return;
        }
        lastStatus = `<p class="muted small">Loaded <strong>${esc(layer.name)}</strong> — ${layer.features.length} feature(s),
          ${polys} polygon(s). ${polys ? "" : "No polygons, so points can be measured against it but not screened as inside or outside."}</p>`;
        draw();
      };
      reader.readAsText(f);
    }

    function screen() {
      const box = panel.querySelector("#geo-screen");
      const pts = allProjectPoints();
      const layers = state.geoLayers;
      if (!layers.length) {
        box.innerHTML = `<p class="muted small">Load a layer above and every coordinate the platform holds is screened against it.
          ${pts.length ? `${pts.length} coordinate(s) are ready to screen.` : "No coordinates recorded yet — add them on a client site, or in a ToR or ESIA coordinate table."}</p>`;
        return;
      }
      if (!pts.length) {
        box.innerHTML = `<p class="muted small">No coordinates to screen yet. Record them against a client site, or in a ToR or ESIA coordinate table, and they appear here.</p>`;
        return;
      }
      const buffer = Number(panel.querySelector("#geo-buffer").value) || 0;
      const html = layers.map(l => {
        const rows = screenPoints(pts, l, buffer);
        const inside = rows.filter(r => r.status === "inside").length;
        const near = rows.filter(r => r.status === "buffer").length;
        return `<h4>${esc(l.name)} <span class="muted small">(${esc(l.kind)})</span></h4>
          <div class="kpi-grid">
            ${kpiCard("Inside the layer", inside, inside ? "These need a determination before work proceeds." : "No point falls inside.", inside ? "critical" : "good")}
            ${kpiCard(`Within ${buffer} m`, near, near ? "Close enough that a setback may apply." : "None within the buffer.", near ? "warning" : "good")}
            ${kpiCard("Outside", rows.length - inside - near, "Beyond the buffer.")}
          </div>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Point</th><th>Source</th><th class="num">Lat</th><th class="num">Long</th><th>Nearest feature</th><th class="num">Distance</th><th>Result</th></tr></thead>
            <tbody>${rows.map(r => `<tr${r.status === "inside" ? ' class="row-overdue"' : ""}>
              <td>${esc(r.point.label)}</td><td class="small">${esc(r.point.source)}</td>
              <td class="num">${r.point.lat.toFixed(5)}</td><td class="num">${r.point.lng.toFixed(5)}</td>
              <td>${esc(r.feature)}</td>
              <td class="num">${r.status === "inside" ? "—" : Math.round(r.distance).toLocaleString() + " m"}</td>
              <td>${statusBadge(
                r.status === "inside" ? "Inside" : r.status === "buffer" ? "Within buffer" : "Outside",
                r.status === "inside" ? "critical" : r.status === "buffer" ? "warning" : "good")}</td></tr>`).join("")}
            </tbody></table></div>`;
      }).join("");
      box.innerHTML = html + `<p class="muted small">Distance is to the nearest mapped vertex of the feature, which can overstate
        the distance to a long straight boundary — treat a near miss as "check it properly". Screening uses the layer you loaded:
        it is only as current and as accurate as that layer, and the regulator's determination is the one that counts.</p>
        <div class="modal-actions"><button class="btn" id="geo-dl">Download screening result (.txt)</button></div>`;
      const dl = panel.querySelector("#geo-dl");
      if (dl) dl.addEventListener("click", () => {
        const lines = layers.map(l => {
          const rows = screenPoints(pts, l, buffer);
          return `LAYER: ${l.name} (${l.kind}) — ${l.features.length} features, loaded ${l.date.slice(0, 10)}\n` +
            rows.map(r => `  ${r.point.label} [${r.point.source}]  ${r.point.lat.toFixed(6)}, ${r.point.lng.toFixed(6)}\n` +
              `      ${r.status === "inside" ? "INSIDE" : r.status === "buffer" ? "WITHIN " + buffer + " m" : "OUTSIDE"} — ${r.feature}` +
              `${r.status === "inside" ? "" : ` (${Math.round(r.distance)} m to nearest mapped vertex)`}`).join("\n");
        }).join("\n\n");
        downloadText("Sensitive-Area-Screening.txt",
          `SENSITIVE AREA SCREENING\nGenerated ${today()}  |  Buffer ${buffer} m\n` +
          `Screened against layers loaded by the user. Only as current as those layers.\n` +
          `The regulator's determination is the one that counts.\n\n` + lines + "\n");
      });
    }

    draw();
    panel.addEventListener("input", (e) => { if (e.target.id === "geo-buffer") screen(); });
  }

  /* ============================ MAPS ============================ */
  function renderMaps(main) {
    main.appendChild(h(`
      <section>
        <h1>Maps & Site Visits</h1>
        <p class="muted">Client site locations on an ArcGIS (Esri) basemap — colour follows your selected theme.
          Load a sensitive-area layer below and every coordinate in the platform is screened against it.</p>
        <div class="card"><div id="verda-map" style="height:420px;border-radius:12px;overflow:hidden;"></div></div>
        <div id="geo-panel"></div>
        <div class="card">
          <h3>Add / edit site coordinates</h3>
          <table class="table"><thead><tr><th>Client</th><th>Lat</th><th>Lng</th><th></th></tr></thead>
          <tbody id="coord-rows">
            ${state.clients.map(c => `<tr>
              <td>${esc(c.name)}</td>
              <td><input class="coord-lat" data-id="${esc(c.id)}" value="${esc(c.lat ?? "")}" placeholder="e.g. 0.3476" /></td>
              <td><input class="coord-lng" data-id="${esc(c.id)}" value="${esc(c.lng ?? "")}" placeholder="e.g. 32.5825" /></td>
              <td><button class="btn btn-ghost btn-sm" data-save="${c.id}">Save</button></td>
            </tr>`).join("")}
          </tbody></table>
        </div>
        <div class="card">
          <h3>Virtual Site Inspections (Matterport)</h3>
          <p class="muted">Paste a Matterport share link (embed URL) to view a virtual walkthrough for a site visit.</p>
          <label>Matterport embed URL<input id="mp-url" placeholder="https://my.matterport.com/show/?m=..." /></label>
          <button class="btn" id="mp-load">Load walkthrough</button>
          <div id="mp-frame" class="mp-frame"></div>
        </div>
      </section>
    `));

    window.__verdaMapActive = true;
    if (typeof L === "undefined") {
      main.querySelector("#verda-map").innerHTML =
        `<div class="muted" style="padding:20px;text-align:center;">Map tiles couldn't load — check your internet connection (this pulls a public Leaflet + ArcGIS/Esri basemap over the network).</div>`;
    } else {
      VerdaMap.init("verda-map", state.theme);
      VerdaMap.setMarkers(state.clients.filter(c => c.lat && c.lng));
    }

    renderSensitiveAreas(main.querySelector("#geo-panel"));

    function refreshRows() {
      main.querySelectorAll("[data-save]").forEach(btn => btn.addEventListener("click", () => {
        const id = btn.dataset.save;
        const lat = parseFloat(main.querySelector(`.coord-lat[data-id="${id}"]`).value);
        const lng = parseFloat(main.querySelector(`.coord-lng[data-id="${id}"]`).value);
        const c = state.clients.find(c => c.id === id);
        if (!isNaN(lat) && !isNaN(lng)) { c.lat = lat; c.lng = lng; save(); VerdaMap.setMarkers(state.clients.filter(c => c.lat && c.lng)); }
      }));
    }
    refreshRows();

    main.querySelector("#mp-load").addEventListener("click", () => {
      const url = main.querySelector("#mp-url").value.trim();
      const frame = main.querySelector("#mp-frame");
      if (!url) { frame.innerHTML = ""; return; }
      frame.innerHTML = `<iframe src="${url}" allow="xr-spatial-tracking" allowfullscreen title="Matterport walkthrough"></iframe>`;
    });
  }

  /* ============================ WORKFLOWS ============================
     A template is a procedure, not a checklist: it states what starts it,
     what "done" means, and for each step who does it, within how many days,
     and what evidence closes it. A run computes each step's due date from the
     start date and the step's own SLA — so a procedure that has stalled shows
     as stalled, which a row of unticked boxes does not. */

  function renderWorkflows(main) {
    const S = VERDA_SEED;
    const areas = [...new Set(S.workflowTemplates.map(w => w.area))];

    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>Workflows</h1>
            <p class="muted">${S.workflowTemplates.length} procedures across ${areas.length} areas, ${S.workflowTemplates.reduce((a, w) => a + w.steps.length, 0)} steps in total.
              Each step carries the role that owns it, the days it should take, and the evidence that closes it.
              Start a run and Verda works out when each step is due.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="runs">Active runs</button>
          <button class="tab-btn" data-tab="library">Procedure library</button>
        </div>
        <div id="wf-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#wf-panel");

    const stepDue = (run, i) => {
      let days = 0;
      const tpl = S.workflowTemplates.find(t => t.id === run.templateId);
      for (let k = 0; k <= i; k++) days += Number(tpl.steps[k].days) || 0;
      return addDays(run.started || run.date.slice(0, 10), days);
    };

    /* ---------------- Active runs ---------------- */
    function runsPanel() {
      const runs = state.workflowRuns.slice().reverse();
      const openRuns = runs.filter(r => !r.closed);
      let overdueTotal = 0, dueSoon = 0;
      openRuns.forEach(r => {
        const tpl = S.workflowTemplates.find(t => t.id === r.templateId);
        if (!tpl) return;
        tpl.steps.forEach((st, i) => {
          if (r.done[i]) return;
          const d = daysUntil(stepDue(r, i));
          if (d < 0) overdueTotal++; else if (d <= 3) dueSoon++;
        });
      });

      panel.innerHTML = `
        <div class="card">
          <h3>Start a run</h3>
          <div class="form-row">
            <label>Procedure<select id="wf-start-tpl">${areas.map(a =>
              `<optgroup label="${esc(a)}">${S.workflowTemplates.filter(w => w.area === a).map(w =>
                `<option value="${esc(w.id)}">${esc(w.name)}</option>`).join("")}</optgroup>`).join("")}</select></label>
            <label>Client / site<select id="wf-start-client">${clientOptions()}</select></label>
            <label>Reference<input id="wf-start-ref" placeholder="What this run is about" /></label>
            <label>Start date<input id="wf-start-date" type="date" value="${today()}" /></label>
            <button class="btn btn-primary" id="wf-start">Start</button>
          </div>
          <div id="wf-start-preview" class="guide-box"></div>
        </div>

        <div class="grid grid-3">
          ${statCard("workflows", "Open runs", openRuns.length, `${runs.length - openRuns.length} closed.`)}
          ${statCard("risk", "Overdue steps", overdueTotal, overdueTotal ? "A procedure that has stalled." : "Nothing overdue.", overdueTotal > 0)}
          ${statCard("actions", "Due within 3 days", dueSoon, "Coming up.", dueSoon > 0)}
        </div>

        <div id="wf-runs"></div>`;

      function preview() {
        const tpl = S.workflowTemplates.find(t => t.id === panel.querySelector("#wf-start-tpl").value);
        panel.querySelector("#wf-start-preview").innerHTML = `
          <p><strong>Starts when:</strong> ${esc(tpl.trigger)}</p>
          <p><strong>Done means:</strong> ${esc(tpl.outcome)}</p>
          <p class="small muted">${tpl.steps.length} steps · target completion
            ${tpl.steps.reduce((a, x) => a + (Number(x.days) || 0), 0)} days from start.</p>`;
      }
      preview();
      panel.querySelector("#wf-start-tpl").addEventListener("change", preview);

      panel.querySelector("#wf-start").addEventListener("click", () => {
        const tpl = S.workflowTemplates.find(t => t.id === panel.querySelector("#wf-start-tpl").value);
        if (!requireClient(panel, "wf-start-client")) return;
        setCurrentClient(panel.querySelector("#wf-start-client").value);
        state.workflowRuns.push({
          id: uid("run"), templateId: tpl.id,
          client: panel.querySelector("#wf-start-client").value,
          ref: panel.querySelector("#wf-start-ref").value.trim(),
          started: panel.querySelector("#wf-start-date").value || today(),
          done: tpl.steps.map(() => false), notes: tpl.steps.map(() => ""),
          date: new Date().toISOString()
        });
        save(); runsPanel();
      });

      const box = panel.querySelector("#wf-runs");
      box.innerHTML = runs.map(run => {
        const tpl = S.workflowTemplates.find(t => t.id === run.templateId);
        if (!tpl) return "";
        const doneCount = run.done.filter(Boolean).length;
        const pct = Math.round((doneCount / tpl.steps.length) * 100);
        const overdue = tpl.steps.some((st, i) => !run.done[i] && daysUntil(stepDue(run, i)) < 0);
        return `<div class="card wf-run">
          <div class="wf-run-head">
            <div>
              <h3>${esc(tpl.name)}</h3>
              <p class="muted small">${esc(run.client || "Unassigned")}${run.ref ? " · " + esc(run.ref) : ""} · started ${esc(run.started || run.date.slice(0, 10))}</p>
            </div>
            <div class="wf-run-meta">
              ${statusBadge(run.closed ? "Closed" : overdue ? "Overdue" : pct === 100 ? "Complete" : `${pct}%`,
                run.closed ? "good" : overdue ? "critical" : pct === 100 ? "good" : "warning")}
              <button class="btn btn-ghost btn-sm" data-wf-del="${esc(run.id)}">Remove</button>
            </div>
          </div>
          <div class="wf-bar"><span style="width:${pct}%"></span></div>
          <div class="table-scroll"><table class="table wf-steps">
            <thead><tr><th></th><th>Step</th><th>Role</th><th>Due</th><th>Evidence required</th><th>Evidence reference</th></tr></thead>
            <tbody>${tpl.steps.map((st, i) => {
              const due = stepDue(run, i), left = daysUntil(due), late = !run.done[i] && left < 0;
              return `<tr${late ? ' class="row-overdue"' : ""}>
                <td><input type="checkbox" class="wf-step" data-run="${esc(run.id)}" data-idx="${i}" ${run.done[i] ? "checked" : ""} /></td>
                <td>${esc(st.task)}</td>
                <td class="small">${esc(st.role)}</td>
                <td class="small">${esc(due)}${run.done[i] ? "" : ` <span class="muted">(${left < 0 ? Math.abs(left) + "d late" : left + "d"})</span>`}</td>
                <td class="small muted">${esc(st.evidence)}</td>
                <td><input class="wf-note" data-run="${esc(run.id)}" data-idx="${i}" value="${esc(run.notes ? run.notes[i] || "" : "")}" placeholder="Record or file reference" /></td>
              </tr>`;
            }).join("")}</tbody></table></div>
          <div class="modal-actions">
            <button class="btn btn-ghost btn-sm" data-wf-dl="${esc(run.id)}">Download run record</button>
            ${pct === 100 && !run.closed ? `<button class="btn btn-primary btn-sm" data-wf-close="${esc(run.id)}">Close this run</button>` : ""}
          </div>
        </div>`;
      }).join("") || `<div class="card">${emptyState("workflows", "No runs yet. Start one above — Verda works out when each step falls due from the procedure's own timings.")}</div>`;

      box.querySelectorAll(".wf-step").forEach(cb => cb.addEventListener("change", () => {
        const run = state.workflowRuns.find(r => r.id === cb.dataset.run);
        run.done[Number(cb.dataset.idx)] = cb.checked;
        save(); runsPanel();
      }));
      box.querySelectorAll(".wf-note").forEach(inp => inp.addEventListener("input", () => {
        const run = state.workflowRuns.find(r => r.id === inp.dataset.run);
        if (!run.notes) run.notes = [];
        run.notes[Number(inp.dataset.idx)] = inp.value;
        save();
      }));
      box.querySelectorAll("[data-wf-del]").forEach(b => b.addEventListener("click", () => {
        state.workflowRuns = state.workflowRuns.filter(r => r.id !== b.dataset.wfDel);
        save(); runsPanel();
      }));
      box.querySelectorAll("[data-wf-close]").forEach(b => b.addEventListener("click", () => {
        state.workflowRuns.find(r => r.id === b.dataset.wfClose).closed = today();
        save(); runsPanel();
      }));
      box.querySelectorAll("[data-wf-dl]").forEach(b => b.addEventListener("click", () => {
        const run = state.workflowRuns.find(r => r.id === b.dataset.wfDl);
        const tpl = S.workflowTemplates.find(t => t.id === run.templateId);
        downloadText(`Workflow-${tpl.name.replace(/[^\w]+/g, "_")}.txt`,
          `${tpl.name.toUpperCase()}\nClient / site: ${run.client || "—"}${run.ref ? "\nReference: " + run.ref : ""}\n` +
          `Started: ${run.started || run.date.slice(0, 10)}\nStarts when: ${tpl.trigger}\nDone means: ${tpl.outcome}\n\n` +
          tpl.steps.map((st, i) => `[${run.done[i] ? "x" : " "}] ${i + 1}. ${st.task}\n      Role: ${st.role}  |  Due: ${stepDue(run, i)}` +
            `\n      Evidence required: ${st.evidence}\n      Evidence held: ${(run.notes && run.notes[i]) || "—"}`).join("\n\n") + "\n");
      }));
    }

    /* ---------------- Procedure library ---------------- */
    function libraryPanel() {
      panel.innerHTML = areas.map(area => `
        <h3 class="calc-group">${esc(area)}</h3>
        ${S.workflowTemplates.filter(w => w.area === area).map(w => `
          <div class="card">
            <h4>${esc(w.name)}</h4>
            <p class="muted small"><strong>Starts when:</strong> ${esc(w.trigger)}</p>
            <p class="muted small"><strong>Done means:</strong> ${esc(w.outcome)}</p>
            <details><summary>${w.steps.length} steps · ${w.steps.reduce((a, x) => a + x.days, 0)} days target</summary>
              <div class="table-scroll"><table class="table">
                <thead><tr><th class="num">#</th><th>Step</th><th>Role</th><th class="num">Days</th><th>Evidence</th></tr></thead>
                <tbody>${w.steps.map((st, i) => `<tr><td class="num">${i + 1}</td><td>${esc(st.task)}</td>
                  <td class="small">${esc(st.role)}</td><td class="num">${st.days}</td>
                  <td class="small muted">${esc(st.evidence)}</td></tr>`).join("")}</tbody></table></div>
            </details>
          </div>`).join("")}`).join("") +
        `<div class="modal-actions"><button class="btn" id="wf-lib-dl">Download every procedure (.txt)</button></div>`;
      panel.querySelector("#wf-lib-dl").addEventListener("click", () =>
        downloadText("Workflow-Procedures.txt", "WORKFLOW PROCEDURES\n\n" + areas.map(a =>
          `${a.toUpperCase()}\n` + S.workflowTemplates.filter(w => w.area === a).map(w =>
            `\n  ${w.name}\n      Starts when: ${w.trigger}\n      Done means: ${w.outcome}\n` +
            w.steps.map((st, i) => `      ${i + 1}. ${st.task}  [${st.role}, ${st.days}d] — ${st.evidence}`).join("\n")).join("\n")).join("\n\n")));
    }

    const panels = { runs: runsPanel, library: libraryPanel };
    runsPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      panels[btn.dataset.tab]();
    }));
  }

  /* ============================ CLIENTS / CARE PLANS ============================ */
  function renderClients(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>Clients, Sub-contractors &amp; Workforce</h1>
            <p class="muted">Who you monitor, who works for them, and the hours behind every safety rate.
              A principal is answerable for the people its sub-contractors bring on site, so they are tracked here too — not as an afterthought.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="clients">Clients &amp; care plans</button>
          <button class="tab-btn" data-tab="subs">Sub-contractors</button>
          <button class="tab-btn" data-tab="hours">Workforce &amp; hours</button>
        </div>
        <div id="client-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#client-panel");

    /* ---------------- Clients ---------------- */
    function clientsPanel() {
      panel.innerHTML = `
        <div class="card">
          <h3>Add a client</h3>
          <div class="form-row">
            <input id="cl-name" placeholder="Client name" />
            <select id="cl-industry">${[...new Set(S.industries.map(i => i.group))].map(g =>
              `<optgroup label="${esc(g)}">${S.industries.filter(i => i.group === g).map(i =>
                `<option>${esc(i.name)}</option>`).join("")}</optgroup>`).join("")}</select>
            <select id="cl-country">${S.countries.map(c =>
              `<option value="${esc(c.id)}" ${c.id === state.country ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select>
            <input id="cl-site" placeholder="Site" />
            <select id="cl-plan"><option>Monthly</option><option>Quarterly</option></select>
            <input id="cl-nextvisit" type="date" title="Next visit" />
            <input id="cl-permit" type="date" title="Permit expiry" />
            <button class="btn btn-primary" id="cl-add">Add</button>
          </div>
        </div>
        <div class="card">
          <div class="table-scroll">
            <table class="table">
              <thead><tr><th>Client</th><th>Industry</th><th>Country</th><th>Site</th><th>Care Plan</th><th>Next visit</th><th>Permit expiry</th><th>Status</th></tr></thead>
              <tbody id="cl-rows"></tbody>
            </table>
          </div>
        </div>`;
      function refresh() {
        panel.querySelector("#cl-rows").innerHTML = state.clients.map(c => `
          <tr><td>${esc(c.name)}</td><td>${esc(c.industry)}</td><td>${esc(countryName(c.country))}</td>
          <td>${esc(c.site)}</td><td>${esc(c.plan)}</td><td>${esc(c.nextVisit)}</td>
          <td>${esc(c.permitExpiry)}</td><td><span class="badge">${esc(c.status)}</span></td></tr>`).join("");
      }
      refresh();
      panel.querySelector("#cl-add").addEventListener("click", () => {
        const name = panel.querySelector("#cl-name").value.trim();
        if (!name) { alert("Enter a client name."); return; }
        state.clients.push({
          id: uid("c"), name, industry: panel.querySelector("#cl-industry").value,
          country: panel.querySelector("#cl-country").value, site: panel.querySelector("#cl-site").value,
          plan: panel.querySelector("#cl-plan").value, nextVisit: panel.querySelector("#cl-nextvisit").value || "TBD",
          permitExpiry: panel.querySelector("#cl-permit").value || "TBD", status: "Active"
        });
        save(); refresh();
        panel.querySelector("#cl-name").value = ""; panel.querySelector("#cl-site").value = "";
      });
    }

    /* ---------------- Sub-contractors ---------------- */
    function subsPanel() {
      panel.innerHTML = `
        <div class="card">
          <h3>Register a sub-contractor</h3>
          <div class="form-row">
            <input id="sc-name" placeholder="Sub-contractor name" />
            <select id="sc-client">${clientOptions()}</select>
            <input id="sc-scope" placeholder="Scope of work" />
            <select id="sc-status">
              <option>Pre-qualification in progress</option><option>Approved</option>
              <option>Approved with conditions</option><option>Suspended</option><option>Not approved</option>
            </select>
            <input id="sc-insurance" type="date" title="Insurance expiry" />
            <input id="sc-contact" placeholder="EHS contact" />
            <button class="btn btn-primary" id="sc-add">Add</button>
          </div>
          <p class="muted small">Pre-qualification status is your record of a decision, not the decision itself — work through the checklist below before you mark one approved.</p>
        </div>
        <div class="card">
          <h3>Sub-contractor register</h3>
          <div class="table-scroll">
            <table class="table">
              <thead><tr><th>Sub-contractor</th><th>Client / site</th><th>Scope</th><th>Pre-qualification</th><th>Insurance expiry</th><th>EHS contact</th><th></th></tr></thead>
              <tbody id="sc-rows"></tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <h3>Pre-qualification checklist</h3>
          <p class="muted small">${S.subcontractorPrequal.length} checks before award. Tick as you verify — this is a working sheet.</p>
          <ul class="checklist">${S.subcontractorPrequal.map(i => `<li><label><input type="checkbox"/> ${esc(i)}</label></li>`).join("")}</ul>
          <button class="btn" id="sc-download">Download checklist (.txt)</button>
        </div>`;
      const PQ_STATUS = { "Approved": "good", "Approved with conditions": "warning",
        "Pre-qualification in progress": "warning", "Suspended": "critical", "Not approved": "critical" };
      function refresh() {
        panel.querySelector("#sc-rows").innerHTML = state.subcontractors.map(sc => {
          const days = sc.insurance ? daysUntil(sc.insurance) : null;
          const expiring = days !== null && days < 30;
          return `<tr><td>${esc(sc.name)}</td><td>${esc(sc.client)}</td><td>${esc(sc.scope)}</td>
            <td>${statusBadge(sc.status, PQ_STATUS[sc.status] || "warning")}</td>
            <td${expiring ? ' class="row-overdue"' : ""}>${esc(sc.insurance || "—")}${
              days !== null && days < 0 ? " (expired)" : expiring ? ` (${days}d)` : ""}</td>
            <td>${esc(sc.contact || "—")}</td>
            <td class="row-actions"><button class="btn btn-ghost btn-sm" data-del="${esc(sc.id)}">Remove</button></td></tr>`;
        }).join("") || emptyState("people", "No sub-contractors registered. <strong>Every company that brings workers on site belongs here</strong> — their injuries count in your rates.", 7);
        panel.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
          state.subcontractors = state.subcontractors.filter(x => x.id !== b.dataset.del);
          save(); refresh();
        }));
      }
      refresh();
      panel.querySelector("#sc-add").addEventListener("click", () => {
        const name = panel.querySelector("#sc-name").value.trim();
        if (!name) { alert("Enter the sub-contractor's name."); return; }
        if (!requireClient(panel, "sc-client")) return;
        state.subcontractors.push({
          id: uid("sc"), name, client: panel.querySelector("#sc-client").value,
          scope: panel.querySelector("#sc-scope").value.trim(),
          status: panel.querySelector("#sc-status").value,
          insurance: panel.querySelector("#sc-insurance").value,
          contact: panel.querySelector("#sc-contact").value.trim()
        });
        save(); refresh();
        panel.querySelector("#sc-name").value = ""; panel.querySelector("#sc-scope").value = "";
      });
      panel.querySelector("#sc-download").addEventListener("click", () =>
        downloadText("Subcontractor-Prequalification-Checklist.txt",
          "SUB-CONTRACTOR PRE-QUALIFICATION CHECKLIST\n\n" + S.subcontractorPrequal.map(i => `[ ] ${i}`).join("\n")));
    }

    /* ---------------- Workforce & hours ---------------- */
    function hoursPanel() {
      panel.innerHTML = `
        <div class="card notice-card">
          <h3>Why this matters</h3>
          <p>Every safety frequency rate is <em>events per ${VERDA_SEED.kpiExposureBase.toLocaleString()} hours worked</em>.
            Without hours there is no denominator, and Verda will show a dash rather than a zero that reads like good news.</p>
          <p class="small">Enter hours for each employer separately — your own workforce and each sub-contractor — and every KPI can be split between them.
            A site that reports only its direct employees' injuries is reporting a fiction.</p>
        </div>
        <div class="card">
          <h3>Record a period</h3>
          <div class="form-row">
            <label>Period<input id="wf-period" placeholder="e.g. October 2026" /></label>
            <label>Client / site<select id="wf-client">${clientOptions()}</select></label>
            <label>Employer type<select id="wf-type">${S.employerTypes.map(t => `<option>${esc(t)}</option>`).join("")}</select></label>
            <label>Employer name<input id="wf-employer" placeholder="Own workforce or sub-contractor" list="wf-employer-options" /></label>
          </div>
          <div class="form-row">
            <label>Headcount<input id="wf-head" type="number" min="0" /></label>
            <label>Of which female<input id="wf-female" type="number" min="0" /></label>
            <label>Hours worked<input id="wf-hours" type="number" min="0" placeholder="Total for the period" /></label>
            <button class="btn btn-primary" id="wf-add">Add period</button>
          </div>
          <datalist id="wf-employer-options">${state.subcontractors.map(sc => `<option value="${esc(sc.name)}"></option>`).join("")}</datalist>
        </div>
        <div class="card">
          <h3>Workforce &amp; hours register</h3>
          <div class="table-scroll">
            <table class="table">
              <thead><tr><th>Period</th><th>Client / site</th><th>Employer type</th><th>Employer</th><th>Headcount</th><th>Female</th><th>Hours</th><th></th></tr></thead>
              <tbody id="wf-rows"></tbody>
              <tfoot id="wf-total"></tfoot>
            </table>
          </div>
        </div>
        <div class="card"><h3>Hours by employer</h3><div id="wf-chart"></div></div>`;
      function refresh() {
        panel.querySelector("#wf-rows").innerHTML = state.workforce.slice().reverse().map(w => `
          <tr><td>${esc(w.period)}</td><td>${esc(w.client)}</td><td>${esc(w.employerType)}</td>
          <td>${esc(w.employer || "—")}</td><td>${Number(w.headcount) || 0}</td><td>${Number(w.female) || 0}</td>
          <td>${(Number(w.hours) || 0).toLocaleString()}</td>
          <td class="row-actions"><button class="btn btn-ghost btn-sm" data-del="${esc(w.id)}">Remove</button></td></tr>`).join("") ||
          emptyState("governance", "No hours recorded. Until they are, every frequency rate shows a dash rather than a zero — because a zero would read as good news.", 8);
        const tot = exposure();
        panel.querySelector("#wf-total").innerHTML = state.workforce.length
          ? `<tr><th colspan="4">Total</th><th>${tot.headcount}</th><th>${tot.female}</th><th>${tot.hours.toLocaleString()}</th><th></th></tr>` : "";
        panel.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
          state.workforce = state.workforce.filter(x => x.id !== b.dataset.del);
          save(); refresh();
        }));
        // hours by employer, biggest first
        const byEmp = new Map();
        state.workforce.forEach(w => {
          const k = w.employer || w.employerType;
          byEmp.set(k, (byEmp.get(k) || 0) + (Number(w.hours) || 0));
        });
        const rows = Array.from(byEmp, ([label, v]) => ({ label, values: { hours: v } }))
          .sort((a, b) => b.values.hours - a.values.hours).slice(0, 8);
        panel.querySelector("#wf-chart").innerHTML = rows.length
          ? groupedBarChart(rows, [{ key: "hours", label: "Hours worked" }], "Hours by employer", "Hours")
          : `<p class="muted small">Add a period above and the split appears here.</p>`;
      }
      refresh();
      panel.querySelector("#wf-add").addEventListener("click", () => {
        const period = panel.querySelector("#wf-period").value.trim();
        const hours = Number(panel.querySelector("#wf-hours").value);
        if (!period) { alert("Enter the period this covers, e.g. October 2026."); return; }
        if (!requireClient(panel, "wf-client")) return;
        if (!hours) { alert("Enter the hours worked — without them no frequency rate can be calculated."); return; }
        state.workforce.push({
          id: uid("wf"), period, client: panel.querySelector("#wf-client").value,
          employerType: panel.querySelector("#wf-type").value,
          employer: panel.querySelector("#wf-employer").value.trim(),
          headcount: Number(panel.querySelector("#wf-head").value) || 0,
          female: Number(panel.querySelector("#wf-female").value) || 0,
          hours
        });
        save(); refresh();
        panel.querySelector("#wf-hours").value = ""; panel.querySelector("#wf-head").value = "";
        panel.querySelector("#wf-female").value = "";
      });
    }

    const panels = { clients: clientsPanel, subs: subsPanel, hours: hoursPanel };
    clientsPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      panels[btn.dataset.tab]();
    }));
  }

  /* ============================ DOCUMENTS ============================ */
  function renderDocuments(main) {
    const templates = [
      { name: "Environmental Policy Template", body: "ENVIRONMENTAL POLICY TEMPLATE\n\n[Company Name] is committed to complying with all applicable environmental laws and regulations, preventing pollution, and continually improving environmental performance...\n\n1. Scope\n2. Commitments\n3. Roles & Responsibilities\n4. Review Cycle" },
      { name: "Waste Management Plan Template", body: "WASTE MANAGEMENT PLAN TEMPLATE\n\n1. Waste streams generated\n2. Segregation procedure\n3. Storage requirements\n4. Licensed transporter details\n5. Waste transfer record log\n6. Review and update schedule" },
      { name: "Emergency Response Plan Template", body: "EMERGENCY RESPONSE PLAN TEMPLATE\n\n1. Emergency scenarios covered\n2. Roles & responsibilities\n3. Evacuation procedure\n4. Emergency contacts\n5. Drill schedule and records" },
      { name: "Incident Report Form", body: "INCIDENT REPORT FORM\n\nDate/Time:\nLocation:\nPersons involved:\nDescription of incident:\nImmediate action taken:\nRoot cause (if known):\nCorrective action planned:\nReported by:" },
      { name: "PPE Register Template", body: "PPE REGISTER TEMPLATE\n\nEmployee Name | PPE Issued | Date Issued | Condition Checked | Replacement Due" },
      { name: "Permit Tracker Template", body: "PERMIT TRACKER TEMPLATE\n\nPermit Type | Issuing Authority | Issue Date | Expiry Date | Status | Renewal Action Owner" },
      { name: "ESMP Monitoring Log", body: "ESMP MONITORING LOG\n\nESMP Commitment | Monitoring Frequency | Last Checked | Result | Corrective Action" }
    ];
    main.appendChild(h(`
      <section>
        <h1>Documents Library</h1>
        <p class="muted">Standard compliance document templates — download and adapt for each client.</p>
        <div class="grid grid-2" id="doc-list"></div>
      </section>
    `));
    main.querySelector("#doc-list").innerHTML = templates.map((t, i) =>
      card(t.name, `<button class="btn" data-doc="${i}">Download</button>`)
    ).join("");
    main.querySelectorAll("[data-doc]").forEach(btn => btn.addEventListener("click", () => {
      const t = templates[parseInt(btn.dataset.doc, 10)];
      downloadText(t.name.replace(/\s+/g, "_") + ".txt", t.body);
    }));
  }

  /* ============================ CHECKLISTS ============================ */
  function renderChecklists(main) {
    const groups = [...new Set(VERDA_SEED.industries.map(i => i.group))];
    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>Checklists & Regulatory Register</h1>
            <p class="muted">Sector checklists, the permits each jurisdiction requires, and who issues them.
              Everything on this page follows the jurisdiction selected in the top bar —
              currently <strong id="chk-country-name">${esc(COUNTRY().name)}</strong>.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="industry">By sector</button>
          <button class="tab-btn" data-tab="permits">Permits &amp; approvals</button>
          <button class="tab-btn" data-tab="register">Regulators &amp; law</button>
          <button class="tab-btn" data-tab="hazards">Hazard library</button>
          <button class="tab-btn" data-tab="training">Training catalogue</button>
          <button class="tab-btn" data-tab="lists">Other registers</button>
          <button class="tab-btn" data-tab="apply">Where to apply</button>
          <button class="tab-btn" data-tab="officers">Officer contacts</button>
        </div>
        <div id="checklist-panel"></div>
        <div class="card notice-card">
          <h3>How current is this?</h3>
          <p>Compiled ${esc(VERDA_SEED.contentReview.compiled)} · next review due ${esc(VERDA_SEED.contentReview.verifyBy)} · owner: ${esc(VERDA_SEED.contentReview.owner)}.</p>
          <p class="small">${esc(VERDA_SEED.contentReview.note)}</p>
        </div>
      </section>
    `));
    const panel = main.querySelector("#checklist-panel");

    function industryPanel() {
      const c = COUNTRY();
      panel.innerHTML = `
        <div class="card">
          <label>Sector
            <select id="chk-industry">${groups.map(g =>
              `<optgroup label="${esc(g)}">${VERDA_SEED.industries.filter(i => i.group === g).map(i =>
                `<option value="${esc(i.id)}">${esc(i.name)}</option>`).join("")}</optgroup>`).join("")}</select>
          </label>
          <p class="muted small" id="chk-count"></p>
          <div id="chk-note"></div>
          <div id="chk-items"></div>
          <button class="btn" id="chk-download">Download checklist (.txt)</button>
        </div>`;
      function load() {
        const ind = VERDA_SEED.industries.find(i => i.id === panel.querySelector("#chk-industry").value);
        const note = ind.countryNotes && ind.countryNotes[c.id];
        panel.querySelector("#chk-count").textContent =
          `${ind.checklist.length} items · ${esc(c.name)}. Tick as you verify — nothing is saved, this is a working sheet.`;
        panel.querySelector("#chk-note").innerHTML = note
          ? `<div class="guide-box"><p><strong>${esc(c.name)}:</strong> ${esc(note)}</p></div>` : "";
        panel.querySelector("#chk-items").innerHTML =
          `<ul class="checklist">${ind.checklist.map(i =>
            `<li><label><input type="checkbox"/> ${esc(i)}</label></li>`).join("")}</ul>`;
      }
      load();
      panel.querySelector("#chk-industry").addEventListener("change", load);
      panel.querySelector("#chk-download").addEventListener("click", () => {
        const ind = VERDA_SEED.industries.find(i => i.id === panel.querySelector("#chk-industry").value);
        const note = ind.countryNotes && ind.countryNotes[c.id];
        downloadText(`Checklist-${ind.name.replace(/[^\w]+/g, "_")}-${c.id.toUpperCase()}.txt`,
          `${ind.name.toUpperCase()} — COMPLIANCE CHECKLIST\nJurisdiction: ${c.name}\n` +
          `Compiled ${VERDA_SEED.contentReview.compiled}; verify against current law before use.\n\n` +
          (note ? `${c.name} note: ${note}\n\n` : "") +
          ind.checklist.map(i => `[ ] ${i}`).join("\n"));
      });
    }

    function permitsPanel() {
      const c = COUNTRY();
      panel.innerHTML = `
        <div class="card">
          <h3>Permits and approvals — ${esc(c.name)}</h3>
          <p class="muted small">Submissions are made in ${esc(c.reportingLanguage)}. Verify scope, fees and validity with the issuing authority: requirements turn on project type and scale.
            The <strong>Where to apply</strong> tab has the portal links for each of these.</p>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>Permit / approval</th><th>Issuing authority</th><th>When it is needed</th></tr></thead>
            <tbody>${c.permits.map(p =>
              `<tr><td>${esc(p.permit)}</td><td>${esc(p.authority)}</td><td>${esc(p.when)}</td></tr>`).join("")}</tbody></table>
          </div>
          <button class="btn" id="permits-download">Download permit register (.txt)</button>
        </div>
        <div class="card">
          <h3>Generic EHS permit checklist (any jurisdiction)</h3>
          <p class="muted small">Use this where a country register has not been compiled yet — then map each line to the local authority.</p>
          <ul class="checklist">${VERDA_SEED.permitsChecklist.map(p =>
            `<li><label><input type="checkbox"/> ${esc(p)}</label></li>`).join("")}</ul>
        </div>`;
      panel.querySelector("#permits-download").addEventListener("click", () =>
        downloadText(`Permit-Register-${c.id.toUpperCase()}.txt`,
          `PERMITS AND APPROVALS — ${c.name.toUpperCase()}\n` +
          `Submissions in ${c.reportingLanguage}\nCompiled ${VERDA_SEED.contentReview.compiled}; verify before relying on it.\n\n` +
          c.permits.map(p => `[ ] ${p.permit}\n      Authority: ${p.authority}\n      When: ${p.when}`).join("\n\n")));
    }

    function registerPanel() {
      const c = COUNTRY();
      panel.innerHTML = `
        <div class="card">
          <h3>Regulators — ${esc(c.name)}</h3>
          <p class="muted small">Official language(s): ${esc(c.languages.join(", "))} · currency ${esc(c.currency)} · regulatory submissions in ${esc(c.reportingLanguage)}.</p>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>Body</th><th>Short</th><th>What it regulates</th></tr></thead>
            <tbody>${c.regulators.map(r =>
              `<tr><td>${r.url ? extLink(r.url, r.name) : esc(r.name)}</td><td>${esc(r.abbr)}</td><td>${esc(r.remit)}</td></tr>`).join("")}</tbody></table>
          </div>
        </div>
        <div class="card">
          <h3>Principal instruments</h3>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>Instrument</th><th>Reference</th><th>What it covers</th></tr></thead>
            <tbody>${c.laws.map(l =>
              `<tr><td>${esc(l.title)}</td><td>${esc(l.instrument)}</td><td>${esc(l.covers)}</td></tr>`).join("")}</tbody></table>
          </div>
          <p class="muted small">References are to the principal Act or regulation as commonly cited. Amendments and statutory instruments are frequent — always work from the current consolidated text.</p>
          <button class="btn" id="reg-download">Download register (.txt)</button>
        </div>`;
      panel.querySelector("#reg-download").addEventListener("click", () =>
        downloadText(`Regulatory-Register-${c.id.toUpperCase()}.txt`,
          `REGULATORY REGISTER — ${c.name.toUpperCase()}\nCompiled ${VERDA_SEED.contentReview.compiled}; review due ${VERDA_SEED.contentReview.verifyBy}\n\n` +
          `REGULATORS\n` + c.regulators.map(r => `  ${r.abbr === "—" ? "" : r.abbr + " — "}${r.name}\n      ${r.remit}`).join("\n") +
          `\n\nPRINCIPAL INSTRUMENTS\n` + c.laws.map(l => `  ${l.title} (${l.instrument})\n      ${l.covers}`).join("\n") +
          `\n\n${VERDA_SEED.contentReview.note}\n`));
    }

    /* ---- Hazard library ---- */
    function hazardsPanel() {
      const S = VERDA_SEED;
      const cats = [...new Set(S.hazardLibrary.map(hz => hz.category))];
      panel.innerHTML = `
        <div class="card">
          <h3>Hazard library</h3>
          <p class="muted small">${S.hazardLibrary.length} hazards across ${cats.length} categories, each with the controls normally expected.
            Pick any of these straight into the <a href="#/risk">Risk Register</a> and the controls come with it.</p>
          <label>Category<select id="hz-cat"><option value="">— all categories —</option>${
            cats.map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Category</th><th>Hazard</th><th>Controls normally expected</th></tr></thead>
            <tbody id="hz-rows"></tbody></table></div>
          <button class="btn" id="hz-download">Download hazard library (.txt)</button>
        </div>`;
      function load() {
        const cat = panel.querySelector("#hz-cat").value;
        const rows = S.hazardLibrary.filter(hz => !cat || hz.category === cat);
        panel.querySelector("#hz-rows").innerHTML = rows.map(hz =>
          `<tr><td>${esc(hz.category)}</td><td>${esc(hz.hazard)}</td><td>${esc(hz.controls)}</td></tr>`).join("");
      }
      load();
      panel.querySelector("#hz-cat").addEventListener("change", load);
      panel.querySelector("#hz-download").addEventListener("click", () =>
        downloadText("Hazard-Library.txt", "HAZARD LIBRARY\n\n" + cats.map(c =>
          `${c.toUpperCase()}\n` + S.hazardLibrary.filter(hz => hz.category === c)
            .map(hz => `  • ${hz.hazard}\n      Controls: ${hz.controls}`).join("\n")).join("\n\n")));
    }

    /* ---- Training catalogue ---- */
    function trainingPanel() {
      const S = VERDA_SEED;
      const cats = [...new Set(S.trainingCatalogue.map(t => t.category))];
      panel.innerHTML = `
        <div class="card">
          <h3>Training catalogue</h3>
          <p class="muted small">${S.trainingCatalogue.length} courses with the validity period Verda uses to calculate each refresher date.
            Recording one in <a href="#/training">Training &amp; Competency</a> sets the expiry automatically.</p>
          <label>Category<select id="tc-cat"><option value="">— all categories —</option>${
            cats.map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
          <div class="table-scroll"><table class="table">
            <thead><tr><th>Course</th><th>Category</th><th class="num">Valid for</th><th>Typically required for</th></tr></thead>
            <tbody id="tc-rows"></tbody></table></div>
          <button class="btn" id="tc-download">Download catalogue (.txt)</button>
        </div>`;
      function load() {
        const cat = panel.querySelector("#tc-cat").value;
        panel.querySelector("#tc-rows").innerHTML = S.trainingCatalogue.filter(t => !cat || t.category === cat)
          .map(t => `<tr><td>${esc(t.name)}</td><td>${esc(t.category)}</td><td class="num">${t.validityMonths} months</td><td>${esc(t.roles)}</td></tr>`).join("");
      }
      load();
      panel.querySelector("#tc-cat").addEventListener("change", load);
      panel.querySelector("#tc-download").addEventListener("click", () =>
        downloadText("Training-Catalogue.txt", "TRAINING CATALOGUE\n\n" + cats.map(c =>
          `${c.toUpperCase()}\n` + S.trainingCatalogue.filter(t => t.category === c)
            .map(t => `  • ${t.name} — valid ${t.validityMonths} months (${t.roles})`).join("\n")).join("\n\n")));
    }

    /* ---- Everything else the platform draws its pick-lists from ---- */
    function listsPanel() {
      const S = VERDA_SEED;
      const simple = (title, note, items, render) => `
        <div class="card">
          <h3>${esc(title)} <span class="muted small">(${items.length})</span></h3>
          <p class="muted small">${esc(note)}</p>
          ${render(items)}
        </div>`;
      const asList = (items) => `<ul class="checklist compact-list">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
      const asTable = (cols) => (items) => `<div class="table-scroll"><table class="table">
        <thead><tr>${cols.map(c => `<th>${esc(c[0])}</th>`).join("")}</tr></thead>
        <tbody>${items.map(it => `<tr>${cols.map(c => `<td>${esc(String(it[c[1]] ?? ""))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

      panel.innerHTML =
        simple("Injury classification", "Decides which frequency rate an incident feeds. Get this wrong and every safety KPI is wrong.",
          S.injuryClassifications, asTable([["Code","code"],["Classification","label"],["What it means","desc"]])) +
        simple("Employer types", "Who the person works for. Every safety rate can be split on this.", S.employerTypes, asList) +
        simple("Immediate causes", "What happened at the sharp end.", S.causeTaxonomy.immediate, asList) +
        simple("Underlying causes", "Why the system allowed it — this is where corrective actions belong.", S.causeTaxonomy.underlying, asList) +
        simple("Permit to work types", "Each permit exists to guarantee one control.", S.permitToWorkTypes,
          asTable([["Permit","type"],["Validity","validity"],["The control it guarantees","key"]])) +
        simple("Emergency scenarios", "What an emergency plan and drill programme should cover.", S.emergencyScenarios, asList) +
        simple("Monitoring parameters", "Environmental and occupational parameters with their usual units.", S.monitoringParameters,
          asTable([["Medium","medium"],["Parameter","parameter"],["Unit","unit"]])) +
        simple("Waste streams", "Hazard classification and the normal disposal route for each stream.", S.wasteStreamLibrary,
          asTable([["Stream","stream"],["Class","class"],["Route","route"]])) +
        simple("Audit finding grades", "What each grade means and how quickly it should close.", S.auditFindingCategories,
          asTable([["Grade","category"],["Meaning","meaning"],["Closure target","target"]])) +
        simple("Job roles", "For competence matrices and training assignment.", S.jobRoles, asList) +
        simple("Document types", "What an EHS document register normally holds.", S.documentTypes, asList) +
        simple("KPI definitions", "Every automatically calculated figure, its formula and its source.", S.kpiDefinitions,
          asTable([["KPI","name"],["Formula","formula"],["Source","source"]]));
    }

    /* ---- Where to apply: the actual portals ---- */
    function applyPanel() {
      const c = COUNTRY();
      panel.innerHTML = `
        <div class="card notice-card">
          <h3>Applying in ${esc(c.name)}</h3>
          <p>Submissions are made in ${esc(c.reportingLanguage)}. Most of these need a government account created
            <em>before</em> you can start an application — set that up first, because it is usually the slowest step.</p>
          <p class="small">Links checked ${esc(VERDA_SEED.contentReview.linksChecked || VERDA_SEED.contentReview.compiled)}.
            Government portals are rebuilt and renamed often: if one fails, start from the regulator's own home page in the
            <strong>Regulators &amp; law</strong> tab rather than trusting a stale link.</p>
        </div>
        <div class="card">
          <h3>Application portals and guidance</h3>
          <div class="table-scroll">
            <table class="table">
              <thead><tr><th>Portal</th><th>What you do there</th></tr></thead>
              <tbody>${c.portals.map(x =>
                `<tr><td>${extLink(x.url, x.name)}</td><td>${esc(x.what)}</td></tr>`).join("")}</tbody>
            </table>
          </div>
          <button class="btn" id="apply-download">Download links (.txt)</button>
        </div>
        <div class="card">
          <h3>Regulator websites</h3>
          <div class="table-scroll">
            <table class="table">
              <thead><tr><th>Body</th><th>Regulates</th></tr></thead>
              <tbody>${c.regulators.map(r =>
                `<tr><td>${r.url ? extLink(r.url, r.name) : esc(r.name) + ' <span class="muted small">(no official site confirmed)</span>'}</td>
                <td>${esc(r.remit)}</td></tr>`).join("")}</tbody>
            </table>
          </div>
          <p class="muted small">Where no site is listed, Verda has not confirmed an official one — ask the authority directly
            rather than following a search result that looks plausible. A wrong portal is how application fees get paid to the wrong party.</p>
        </div>`;
      panel.querySelector("#apply-download").addEventListener("click", () =>
        downloadText(`Permit-Portals-${c.id.toUpperCase()}.txt`,
          `WHERE TO APPLY — ${c.name.toUpperCase()}\nSubmissions in ${c.reportingLanguage}\n` +
          `Links checked ${VERDA_SEED.contentReview.linksChecked || VERDA_SEED.contentReview.compiled}; portals change, verify before use.\n\n` +
          `APPLICATION PORTALS\n` + c.portals.map(x => `  ${x.name}\n      ${x.what}\n      ${x.url}`).join("\n\n") +
          `\n\nREGULATORS\n` + c.regulators.map(r => `  ${r.name}${r.url ? "\n      " + r.url : "  (no official site confirmed)"}\n      ${r.remit}`).join("\n")));
    }

    /* ---- Officer contacts: roles shipped, people kept by the user ---- */
    function officersPanel() {
      const c = COUNTRY();
      const roles = VERDA_SEED.officerRoles[c.id] || [];
      const STALE_DAYS = 180;

      function draw() {
        const mine = state.officerContacts.filter(x => x.country === c.id);
        panel.innerHTML = `
          <div class="card notice-card">
            <h3>Why Verda ships no names</h3>
            <p>These are individual public servants. They transfer, are promoted and are replaced constantly, and a stale name and
              number in a submitted report is worse than a blank line — someone calls a stranger, or a regulator reads a contact who
              left two years ago. Publishing officials' personal details is also not ours to do.</p>
            <p class="small">So Verda ships the <strong>roles</strong> — which posts exist in ${esc(c.name)}, what each is responsible for, and
              where the current holder sits — and gives you a register for the people you actually deal with, which flags a contact
              that has not been verified in ${STALE_DAYS} days.</p>
          </div>

          <div class="card">
            <h3>Statutory roles — ${esc(c.name)}</h3>
            <div class="table-scroll"><table class="table">
              <thead><tr><th>Role</th><th>Level</th><th>What they are responsible for</th><th>Where to find the current holder</th></tr></thead>
              <tbody>${roles.map(r => `<tr><td><strong>${esc(r.role)}</strong></td><td>${esc(r.level)}</td>
                <td class="small">${esc(r.remit)}</td><td class="small">${esc(r.find)}</td></tr>`).join("")}</tbody></table></div>
            <button class="btn" id="of-roles-dl">Download roles (.txt)</button>
          </div>

          <div class="card">
            <h3>Your contact register</h3>
            <div class="form-row">
              <label>Name<input id="of-name" placeholder="Post holder's name" /></label>
              <label>Role<select id="of-role">${roles.map(r => `<option>${esc(r.role)}</option>`).join("")}<option>Other</option></select></label>
              <label>District / county / province<input id="of-area" placeholder="Where they cover" /></label>
            </div>
            <div class="form-row">
              <label>Phone<input id="of-phone" placeholder="Office or mobile" /></label>
              <label>Email<input id="of-email" type="email" placeholder="Official address" /></label>
              <label>Last verified<input id="of-date" type="date" value="${today()}" /></label>
              <button class="btn btn-primary" id="of-add">Add contact</button>
            </div>
            <p class="muted small">Record how you verified it — a name taken from a two-year-old report is not verified.</p>
            <label>How this was verified<input id="of-how" placeholder="e.g. spoke to them on 14/09, or confirmed at the district office" /></label>
          </div>

          <div class="card">
            <h3>Contacts on file — ${esc(c.name)} <span class="muted small">(${mine.length})</span></h3>
            <div class="table-scroll"><table class="table">
              <thead><tr><th>Name</th><th>Role</th><th>Area</th><th>Phone</th><th>Email</th><th>Last verified</th><th></th></tr></thead>
              <tbody>${mine.map(x => {
                const age = x.verified ? Math.abs(daysUntil(x.verified)) : null;
                const stale = age === null || age > STALE_DAYS;
                return `<tr${stale ? ' class="row-overdue"' : ""}>
                  <td>${esc(x.name)}</td><td class="small">${esc(x.role)}</td><td>${esc(x.area || "—")}</td>
                  <td>${esc(x.phone || "—")}</td><td>${esc(x.email || "—")}</td>
                  <td>${esc(x.verified || "—")} ${statusBadge(stale ? "Verify" : `${age}d ago`, stale ? "warning" : "good")}</td>
                  <td class="row-actions">
                    <button class="btn btn-ghost btn-sm" data-of-ok="${esc(x.id)}" title="Confirm this is still current">Verified today</button>
                    <button class="btn btn-ghost btn-sm" data-of-del="${esc(x.id)}">Remove</button></td></tr>`;
              }).join("") || `<tr><td colspan="7" class="muted">No contacts recorded for ${esc(c.name)} yet. Add the people you actually deal with — starting with the district or county environment officer for each of your sites.</td></tr>`}
              </tbody></table></div>
            ${mine.length ? `<button class="btn" id="of-dl">Download contacts (.txt)</button>` : ""}
          </div>`;

        panel.querySelector("#of-add").addEventListener("click", () => {
          const name = panel.querySelector("#of-name").value.trim();
          if (!name) { alert("Enter the post holder's name."); return; }
          state.officerContacts.push({
            id: uid("of"), country: c.id, name,
            role: panel.querySelector("#of-role").value,
            area: panel.querySelector("#of-area").value.trim(),
            phone: panel.querySelector("#of-phone").value.trim(),
            email: panel.querySelector("#of-email").value.trim(),
            verified: panel.querySelector("#of-date").value || today(),
            how: panel.querySelector("#of-how").value.trim()
          });
          save(); draw();
        });
        panel.querySelectorAll("[data-of-ok]").forEach(b => b.addEventListener("click", () => {
          const x = state.officerContacts.find(y => y.id === b.dataset.ofOk);
          x.verified = today(); save(); draw();
        }));
        panel.querySelectorAll("[data-of-del]").forEach(b => b.addEventListener("click", () => {
          state.officerContacts = state.officerContacts.filter(y => y.id !== b.dataset.ofDel);
          save(); draw();
        }));
        panel.querySelector("#of-roles-dl").addEventListener("click", () =>
          downloadText(`Officer-Roles-${c.id.toUpperCase()}.txt`,
            `STATUTORY OFFICER ROLES — ${c.name.toUpperCase()}\n\n` +
            roles.map(r => `  ${r.role}  [${r.level}]\n      ${r.remit}\n      Where to find them: ${r.find}`).join("\n\n") +
            `\n\nVerda ships no names or numbers for these posts: holders change constantly and a stale contact is worse than a blank.\n`));
        const dl = panel.querySelector("#of-dl");
        if (dl) dl.addEventListener("click", () => downloadText(`Officer-Contacts-${c.id.toUpperCase()}.txt`,
          `OFFICER CONTACTS — ${c.name.toUpperCase()}\nExported ${today()}\n\n` +
          mine.map(x => `  ${x.name} — ${x.role}\n      Area: ${x.area || "—"}  |  Phone: ${x.phone || "—"}  |  Email: ${x.email || "—"}` +
            `\n      Last verified: ${x.verified || "never"}${x.how ? "  (" + x.how + ")" : ""}`).join("\n\n") + "\n"));
      }
      draw();
    }

    const panels = { industry: industryPanel, permits: permitsPanel, register: registerPanel,
      hazards: hazardsPanel, training: trainingPanel, lists: listsPanel, apply: applyPanel, officers: officersPanel };
    industryPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      panels[btn.dataset.tab]();
    }));
  }

  /* ============================ CREDITS & BILLING ============================ */
  function renderCredits(main) {
    const packages = [{ credits: 500, label: "Starter" }, { credits: 1500, label: "Growth" }, { credits: 5000, label: "Scale" }];
    main.appendChild(h(`
      <section>
        <h1>Credits & Billing</h1>
        <p class="muted">Free platform access to start (${VERDA_SEED.freeSignupCredits} credits on sign-up), then buy credits as you go. AI drafting and ESIA processing use credits.</p>
        <div class="card"><h3>Your balance</h3><div class="stat">${state.user ? creditBalance() : "—"} credits</div>
          ${!state.user ? `<p class="muted">Log in or sign up to see your balance.</p>` : ""}</div>
        <div class="grid grid-3" id="cr-packages">
          ${packages.map(p => `<div class="card"><h3>${p.label}</h3><div class="stat">${p.credits}</div>
            <button class="btn btn-primary" data-buy="${p.credits}">Simulate Purchase (Demo)</button></div>`).join("")}
        </div>
        <div class="card"><h3>Cost per action</h3>
          <ul class="checklist">
            <li>Verda Reporting AI draft — ${VERDA_SEED.creditCosts.aiDraft} credits</li>
            <li>ESIA processing submission — ${VERDA_SEED.creditCosts.esiaSubmit} credits</li>
            <li>Auto EHS / ESIA audit AI summary — ${VERDA_SEED.creditCosts.auditAiSummary} credits</li>
          </ul>
          <p class="muted small">Demo billing — no real payment gateway is connected. Wire up Stripe/Flutterwave/Mobile Money on the buy action for production.</p>
        </div>
        <div class="card"><h3>Transaction history</h3><table class="table"><thead><tr><th>Date</th><th>Reason</th><th>Amount</th></tr></thead><tbody id="cr-ledger"></tbody></table></div>
      </section>
    `));
    function refresh() {
      main.querySelector("#cr-ledger").innerHTML = state.creditLedger.filter(t => state.user && t.user === state.user.email).slice().reverse()
        .map(t => `<tr><td>${esc(t.date.slice(0,10))}</td><td>${esc(t.reason)}</td><td>${t.amount > 0 ? "+" : ""}${esc(t.amount)}</td></tr>`).join("")
        || `<tr><td colspan="3" class="muted">No transactions yet.</td></tr>`;
    }
    refresh();
    main.querySelectorAll("[data-buy]").forEach(btn => btn.addEventListener("click", () => {
      if (!state.user) { alert("Log in first."); openAuthModal("login"); return; }
      addCredits(parseInt(btn.dataset.buy, 10), "Credit purchase (demo)");
      renderTopbar(); refresh();
      main.querySelector(".stat").textContent = creditBalance() + " credits";
      alert("Demo purchase complete — credits added.");
    }));
  }

  /* ============================ SKILLS ADVISOR ============================ */

  /* =========================================================================
     FREE PROJECT SCREENING

     The question a person with a plot of land actually has is "do I need an
     ESIA?", and the honest answer is "here is the tier your project falls in,
     here is why, and here is the schedule that decides it". That is what this
     produces.

     The engine is a published decision tree, not a model. It takes the highest
     tier produced by three things — the sector, the scale, and the sensitivity
     triggers — and it reports every answer that raised the outcome, so the
     reasoning can be read back and argued with. A screening opinion nobody can
     reproduce is worth nothing to a regulator.

     It is not a determination. Only the regulator screens a project.
     ========================================================================= */
  const TIER_ORDER = { none: 0, brief: 1, esia: 2 };
  const tierMax = (a, b) => (TIER_ORDER[b] > TIER_ORDER[a] ? b : a);

  function screeningState() {
    if (!state.screening) state.screening = { sector: "", scale: "", triggers: [], photos: [], coords: null, projectName: "", notes: "" };
    if (!Array.isArray(state.screening.photos)) state.screening.photos = [];
    if (!Array.isArray(state.screening.triggers)) state.screening.triggers = [];
    return state.screening;
  }

  // The band a scale figure falls in. Returns null when the sector is not
  // screened on scale at all, so the result can say so rather than imply a
  // threshold that does not exist.
  function scaleBandFor(sector, value) {
    const spec = VERDA_SEED.screeningScaleBands[sector.scale];
    if (!spec || !Number.isFinite(value)) return null;
    const band = spec.bands.find(b => b.max === null || value <= b.max);
    return band ? { tier: band.tier, spec } : null;
  }

  function screeningOutcome(ans, countryId) {
    const S = VERDA_SEED;
    const framework = S.screeningFramework[countryId];
    const sector = S.screeningSectors.find(x => x.id === ans.sector);
    if (!sector || !framework) return null;

    const reasons = [], flags = [];
    let tier = sector.mandatory ? "esia" : (sector.floor || "none");
    if (sector.mandatory) {
      reasons.push({ what: sector.label, why: "This sector sits on the mandatory list in every one of the six schedules Verda covers — the upper-tier study is the starting point, not the exception." });
    } else if (tier !== "none") {
      reasons.push({ what: sector.label, why: "This sector does not fall below the lower tier on its own, whatever its size." });
    }
    if (sector.note) flags.push(sector.note);

    const value = Number(ans.scale);
    const band = scaleBandFor(sector, value);
    if (band) {
      const before = tier;
      tier = tierMax(tier, band.tier);
      if (TIER_ORDER[band.tier] > TIER_ORDER[before]) {
        reasons.push({ what: `${fmtNum(value)} ${band.spec.unit}`, why: "At this scale the project moves up a tier in the bands a practitioner would apply. Confirm the figure against the schedule, which may use a different unit." });
      }
    }

    ans.triggers.forEach(id => {
      const t = S.screeningTriggers.find(x => x.id === id);
      if (!t) return;
      const before = tier;
      tier = tierMax(tier, t.tier);
      if (TIER_ORDER[t.tier] > TIER_ORDER[before]) reasons.push({ what: t.label, why: t.why });
      else reasons.push({ what: t.label, why: t.why, supporting: true });
      (t.flags || []).forEach(f => { if (!flags.includes(f)) flags.push(f); });
    });

    return { tier, reasons, flags, framework, sector, band, country: countryName(countryId), countryId };
  }

  // Which registered monitors could actually take this on. Service need follows
  // from the tier; sector and country must match what the monitor registered.
  function monitorsFor(outcome) {
    const need = outcome.tier === "esia" ? "esia" : outcome.tier === "brief" ? "projectbrief" : "screening";
    return (state.monitors || []).filter(m =>
      (m.countries || []).includes(outcome.countryId) &&
      ((m.services || []).includes(need) || (m.services || []).includes("esia")));
  }

  const TIER_COPY = {
    none: { badge: "good", head: "No environmental study is indicated",
            lead: "Nothing you have told us puts this project on the screening schedule. That is not the same as needing no permits — it means the environmental study is not the gate." },
    brief: { badge: "warning", head: "The lower tier applies",
             lead: "This project looks like it needs the shorter submission, not the full study. The regulator can still ask for more after reading it." },
    esia: { badge: "critical", head: "A full study is indicated",
            lead: "This project falls in the upper tier. Budget for a full study with stakeholder consultation — it is the long path, and starting it late is what delays projects." }
  };

  function renderScreening(main) {
    const S = VERDA_SEED;
    const ans = screeningState();
    let step = 0;

    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>${T().screening}</h1>
            <p class="muted">Free, and no account needed. Answer a few questions about what you are planning and where, and Verda
              tells you which environmental submission your project needs, why, and who is registered to do it.</p>
          </div>
        </div>
        <div class="card notice-card">
          <h4>What this is, and what it is not</h4>
          <p class="small">This is a published decision tree over the screening schedules of ${S.countries.length} countries — every answer that changes the outcome is reported back to you with the reason. It is
          <strong>not a determination and not legal advice</strong>. Only the regulator screens a project, and the schedules are amended often. Use this to know what you are walking into, then confirm it.</p>
        </div>
        <div id="scr-panel"></div>
      </section>`));

    const panel = main.querySelector("#scr-panel");
    const STEPS = ["What you are planning", "How big", "Where it is", "Pictures and maps", "Your result"];

    function progress() {
      return `<div class="card" style="padding:14px 18px">
        <div class="wf-bar"><span style="width:${Math.round((step / (STEPS.length - 1)) * 100)}%"></span></div>
        <p class="small muted" style="margin:6px 0 0">Step <span class="mono">${step + 1}</span> of <span class="mono">${STEPS.length}</span> — ${esc(STEPS[step])}</p>
      </div>`;
    }
    const navBtns = (backOk, nextLabel, nextId) => `
      <div class="modal-actions" style="justify-content:space-between">
        <button class="btn btn-ghost" id="scr-back" ${backOk ? "" : "disabled"}>Back</button>
        <button class="btn btn-primary" id="${nextId || "scr-next"}">${esc(nextLabel || "Continue")}</button>
      </div>`;

    function draw() {
      panel.innerHTML = progress() + `<div class="card" id="scr-body"></div>`;
      const body = panel.querySelector("#scr-body");
      [stepSector, stepScale, stepWhere, stepEvidence, stepResult][step](body);
      const back = panel.querySelector("#scr-back");
      if (back) back.addEventListener("click", () => { step = Math.max(0, step - 1); draw(); });
      const next = panel.querySelector("#scr-next");
      if (next) next.addEventListener("click", () => { if (validate()) { step = Math.min(STEPS.length - 1, step + 1); save(); draw(); } });
    }

    function validate() {
      if (step === 0 && !ans.sector) { alert("Pick what you are planning — the whole screening follows from it."); return false; }
      return true;
    }

    /* ---- 1. sector ---- */
    function stepSector(body) {
      const groups = [...new Set(S.screeningSectors.map(x => x.group))];
      body.innerHTML = `
        <h3>What are you planning to build or operate?</h3>
        <p class="muted small">Pick the closest match. If two fit, pick the one with the larger footprint — screening works on the whole project, not its smallest part.</p>
        <label>Project name (optional, used on the note you can download)
          <input id="scr-name" value="${esc(ans.projectName || "")}" placeholder="e.g. Warehouse at plot 14" /></label>
        <label>Country — the schedule that applies
          <select id="scr-country">${S.countries.map(c =>
            `<option value="${esc(c.id)}" ${c.id === state.country ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label>
        ${groups.map(g => `
          <h5 style="margin:18px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">${esc(g)}</h5>
          <div class="sector-chips">
            ${S.screeningSectors.filter(x => x.group === g).map(x => `
              <button class="sector-chip${ans.sector === x.id ? " seg-filled" : ""}" data-sector="${esc(x.id)}">${esc(x.label)}</button>`).join("")}
          </div>`).join("")}
        ${navBtns(false)}`;
      body.querySelectorAll("[data-sector]").forEach(b => b.addEventListener("click", () => {
        ans.sector = b.dataset.sector; ans.scale = ""; save(); draw();
      }));
      body.querySelector("#scr-name").addEventListener("input", e => { ans.projectName = e.target.value; });
      body.querySelector("#scr-country").addEventListener("change", e => {
        state.country = e.target.value; save(); renderTopbar(); draw();
      });
    }

    /* ---- 2. scale ---- */
    function stepScale(body) {
      const sector = S.screeningSectors.find(x => x.id === ans.sector);
      const spec = S.screeningScaleBands[sector.scale];
      body.innerHTML = spec ? `
        <h3>${esc(spec.label)}</h3>
        <p class="muted small">An estimate is fine at this stage. Screening is about the order of magnitude, not the survey.</p>
        <label>${esc(spec.label)} <span class="muted">(${esc(spec.unit)})</span>
          <input id="scr-scale" type="number" step="any" min="0" value="${esc(ans.scale || "")}" placeholder="enter a number" /></label>
        <p class="small muted" id="scr-scale-hint"></p>
        ${sector.note ? `<div class="guide-box"><p>${esc(sector.note)}</p></div>` : ""}
        ${navBtns(true)}` : `
        <h3>Scale does not decide this one</h3>
        <p>A ${esc(sector.label.toLowerCase())} is screened on what it does and where it is rather than how big it is, so there is no size question here.</p>
        ${navBtns(true)}`;
      const inp = body.querySelector("#scr-scale");
      if (inp) {
        const hint = body.querySelector("#scr-scale-hint");
        const upd = () => {
          ans.scale = inp.value;
          const v = Number(inp.value);
          if (inp.value === "") { hint.textContent = ""; return; }
          if (v < 0) { hint.innerHTML = `<span class="calc-invalid">A size cannot be negative.</span>`; return; }
          const band = scaleBandFor(sector, v);
          hint.textContent = band
            ? (band.tier === "esia" ? "At this scale, expect the upper tier on size alone."
              : band.tier === "brief" ? "At this scale, size alone points at the lower tier."
              : "At this scale, size alone does not trigger a study — where it is may still.")
            : "";
        };
        inp.addEventListener("input", upd); upd();
      }
    }

    /* ---- 3. where ---- */
    function stepWhere(body) {
      body.innerHTML = `
        <h3>Where is it, and what is around it?</h3>
        <p class="muted small">This is the part that changes the answer most often. A small project in a wetland is screened harder than a large one on bare ground.</p>
        <div class="form-row">
          <label>Latitude<input id="scr-lat" class="coord-cell mono" value="${esc(ans.coords ? ans.coords.lat : "")}" placeholder="0.3476" /></label>
          <label>Longitude<input id="scr-lng" class="coord-cell mono" value="${esc(ans.coords ? ans.coords.lng : "")}" placeholder="32.5825" /></label>
          <button class="btn" id="scr-pick" style="flex:0 0 auto;align-self:flex-end">${icon("maps")}Pick on a map</button>
        </div>
        <p class="small muted">Coordinates are optional, and they stay in this browser. They are used to put a location on the note you download.</p>
        <h5 style="margin:20px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Tick everything that is true</h5>
        <ul class="checklist">
          ${S.screeningTriggers.map(t => `
            <li><label><input type="checkbox" data-trig="${esc(t.id)}" ${ans.triggers.includes(t.id) ? "checked" : ""} /> ${esc(t.label)}</label></li>`).join("")}
        </ul>
        <label>Anything else worth noting (optional)
          <textarea id="scr-notes" placeholder="Existing use of the land, anything unusual nearby, how long the works will run...">${esc(ans.notes || "")}</textarea></label>
        ${navBtns(true)}`;
      body.querySelectorAll("[data-trig]").forEach(cb => cb.addEventListener("change", () => {
        const id = cb.dataset.trig;
        ans.triggers = cb.checked ? [...new Set([...ans.triggers, id])] : ans.triggers.filter(x => x !== id);
        save();
      }));
      const lat = body.querySelector("#scr-lat"), lng = body.querySelector("#scr-lng");
      const setCoords = () => {
        const a = parseFloat(lat.value), b = parseFloat(lng.value);
        ans.coords = (Number.isFinite(a) && Number.isFinite(b)) ? { lat: a, lng: b } : null;
      };
      lat.addEventListener("input", setCoords); lng.addEventListener("input", setCoords);
      body.querySelector("#scr-notes").addEventListener("input", e => { ans.notes = e.target.value; });
      body.querySelector("#scr-pick").addEventListener("click", () => openCoordPicker((la, ln) => {
        lat.value = la; lng.value = ln; setCoords(); save();
      }));
    }

    /* ---- 4. evidence ---- */
    function stepEvidence(body) {
      body.innerHTML = `
        <h3>Add pictures or a map of the area</h3>
        <p class="muted small">Optional, and they never leave this browser — they are downscaled here and stored locally. A photograph of the site and a sketch of the boundary are what a practitioner asks for first.</p>
        <div class="dropzone" id="scr-drop" tabindex="0">
          <p><strong>Drop photographs or a map here</strong> — or click to choose files</p>
          <p class="muted">JPG or PNG. Site photographs, a screenshot of the plot on a map, a survey sketch.</p>
        </div>
        <input type="file" id="scr-file" accept="image/*" multiple hidden />
        <div class="photo-grid" id="scr-photos"></div>
        ${navBtns(true, "See the result")}`;
      const grid = body.querySelector("#scr-photos");
      const paint = () => {
        grid.innerHTML = ans.photos.map((ph, i) => `
          <figure class="photo-card"><img src="${ph.src}" alt="${esc(ph.caption || "Site photograph")}" />
            <input class="photo-caption" data-cap="${i}" value="${esc(ph.caption || "")}" placeholder="What this shows" />
            <button class="btn btn-ghost btn-sm" data-rm="${i}" style="margin-top:6px">Remove</button></figure>`).join("")
          || `<p class="muted small">No pictures added.</p>`;
        grid.querySelectorAll("[data-rm]").forEach(b => b.addEventListener("click", () => {
          ans.photos.splice(Number(b.dataset.rm), 1); save(); paint();
        }));
        grid.querySelectorAll("[data-cap]").forEach(inp => inp.addEventListener("input", () => {
          ans.photos[Number(inp.dataset.cap)].caption = inp.value; save();
        }));
      };
      const take = async (files) => {
        for (const f of [...files].slice(0, 8 - ans.photos.length)) {
          try { ans.photos.push({ src: await compressImage(f, 900, 0.7), caption: "" }); }
          catch (e) { alert("That file could not be read as an image."); }
        }
        save(); paint();
      };
      const drop = body.querySelector("#scr-drop"), file = body.querySelector("#scr-file");
      drop.addEventListener("click", () => file.click());
      drop.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); file.click(); } });
      file.addEventListener("change", e => take(e.target.files));
      drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("dropzone-active"); });
      drop.addEventListener("dragleave", () => drop.classList.remove("dropzone-active"));
      drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("dropzone-active"); take(e.dataTransfer.files); });
      paint();
    }

    /* ---- 5. result ---- */
    function stepResult(body) {
      const out = screeningOutcome(ans, state.country);
      if (!out) { body.innerHTML = `<p class="muted">Pick a sector first.</p>${navBtns(true)}`; return; }
      const copy = TIER_COPY[out.tier];
      const study = out.tier === "esia" ? out.framework.upper : out.tier === "brief" ? out.framework.lower : null;
      const matches = monitorsFor(out);

      body.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:14px;flex-wrap:wrap">
          <div style="flex:1;min-width:260px">
            <span class="badge badge-${copy.badge}">${esc(copy.head)}</span>
            <h3 style="margin:10px 0 4px">${esc(study ? study.name : "No study indicated")}</h3>
            <p>${esc(copy.lead)}</p>
          </div>
        </div>

        ${study ? `<div class="calc-result"><span class="calc-name"><strong>${esc(out.framework.authority)}</strong> decides this. Basis: ${esc(study.basis)}</span></div>` : ""}

        <h5 style="margin:22px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Why — every answer that shaped this</h5>
        ${out.reasons.length ? `<table class="table"><thead><tr><th>Your answer</th><th>What it does</th></tr></thead><tbody>
          ${out.reasons.map(r => `<tr><td>${esc(r.what)}${r.supporting ? ` <span class="badge">supporting</span>` : ""}</td><td class="muted">${esc(r.why)}</td></tr>`).join("")}
        </tbody></table>` : `<p class="muted">Nothing you told us raised the outcome above the starting point for this sector.</p>`}

        ${out.flags.length ? `
          <h5 style="margin:22px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Other consents this flags</h5>
          <ul class="checklist">${out.flags.map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}

        <div class="guide-box">
          <p><strong>Confirm it here.</strong> ${esc(out.framework.checkAt)}</p>
          <p><strong>Who may sign it.</strong> ${esc(out.framework.practitioner)}</p>
        </div>

        <h5 style="margin:22px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Who can do this work</h5>
        ${matches.length ? `<table class="table"><thead><tr><th>Monitor</th><th>Grade</th><th>Sectors</th><th>Contact</th></tr></thead><tbody>
          ${matches.map(m => `<tr><td><strong>${esc(m.name)}</strong></td><td>${esc((S.monitorCapacities.grades.find(g => g.id === m.grade) || {}).label || "—")}</td>
            <td class="muted small">${esc((m.sectors || []).join(", ") || "All sectors")}</td><td class="small">${esc(m.contact || "—")}</td></tr>`).join("")}
        </tbody></table>` : emptyState("people",
          "<strong>No monitor is registered for this country yet.</strong> The directory is filled by the practitioners who use Verda — register your practice and screening results like this one will route to you.", 4)}
        <a class="btn" href="#/monitors">${icon("monitors")}Open the monitor directory</a>

        <div class="modal-actions" style="justify-content:space-between;margin-top:20px">
          <button class="btn btn-ghost" id="scr-back">Back</button>
          <span>
            <button class="btn" id="scr-restart">Start again</button>
            <button class="btn btn-primary" id="scr-dl">${icon("download")}Download this screening note</button>
          </span>
        </div>
        <p class="small muted" style="margin-top:14px">This note records what you told Verda and what the decision tree made of it. It is a starting position for a conversation with ${esc(out.framework.authority)} or a registered practitioner — it is not a screening decision, and it does not bind anyone.</p>`;

      body.querySelector("#scr-restart").addEventListener("click", () => {
        state.screening = { sector: "", scale: "", triggers: [], photos: [], coords: null, projectName: "", notes: "" };
        save(); step = 0; draw();
      });
      body.querySelector("#scr-dl").addEventListener("click", () => downloadText(
        `Screening-note-${(ans.projectName || "project").replace(/[^\w]+/g, "_")}.txt`, screeningNote(ans, out)));
    }

    draw();
  }

  function screeningNote(ans, out) {
    const S = VERDA_SEED;
    const study = out.tier === "esia" ? out.framework.upper : out.tier === "brief" ? out.framework.lower : null;
    const sector = out.sector;
    const L = [];
    L.push("INDICATIVE PROJECT SCREENING NOTE");
    L.push("Produced by Verda — free screening tool. Not a screening decision.");
    L.push("");
    L.push(`Project:      ${ans.projectName || "(unnamed)"}`);
    L.push(`Country:      ${out.country}`);
    L.push(`Sector:       ${sector.label}`);
    if (ans.scale) L.push(`Scale:        ${ans.scale} ${(S.screeningScaleBands[sector.scale] || {}).unit || ""}`);
    if (ans.coords) L.push(`Location:     ${ans.coords.lat}, ${ans.coords.lng}`);
    L.push(`Date:         ${today()}`);
    L.push("");
    L.push("OUTCOME");
    L.push(`  ${study ? study.name : "No environmental study indicated"}`);
    L.push(`  Decided by: ${out.framework.authority}`);
    if (study) L.push(`  Basis:      ${study.basis}`);
    L.push("");
    L.push("WHY");
    out.reasons.forEach(r => { L.push(`  • ${r.what}${r.supporting ? " (supporting)" : ""}`); L.push(`      ${r.why}`); });
    if (out.flags.length) {
      L.push("");
      L.push("OTHER CONSENTS FLAGGED");
      out.flags.forEach(f => L.push(`  • ${f}`));
    }
    if (ans.notes) { L.push(""); L.push("NOTES FROM THE APPLICANT"); L.push(`  ${ans.notes}`); }
    if (ans.photos.length) {
      L.push("");
      L.push(`PICTURES ATTACHED IN THE BROWSER: ${ans.photos.length}`);
      ans.photos.forEach((p, i) => L.push(`  ${i + 1}. ${p.caption || "(no caption)"}`));
    }
    L.push("");
    L.push("CONFIRM AGAINST");
    L.push(`  ${out.framework.checkAt}`);
    L.push(`  ${out.framework.practitioner}`);
    L.push("");
    L.push("This note is an indicative screening produced by a published decision tree.");
    L.push("It is not a determination, not legal advice, and it binds nobody. Only the");
    L.push("regulator screens a project, and the schedules are amended often.");
    return L.join("\n");
  }


  /* The calculator engine. Lives at module level because two screens use it:
     Inspections, where the figures feed a statutory submission, and the free
     toolbox, which is open without an account. One copy, so a corrected factor
     is corrected in both places. */
  function calculatorPanel(panel) {
    const S = VERDA_SEED;
    const groups = [...new Set(S.calculators.map(c => c.group))];
    panel.innerHTML = `
      <div class="card notice-card">
        <h3>Enter a quantity, get the figure the standard asks for</h3>
        <p>Every calculation updates as you type. Every factor is shown and editable, and every calculator states where its
          basis comes from — a compliance figure whose origin nobody can explain is worse than no figure at all.</p>
        <p class="small">Where a factor depends on your permit, your grid or your national regulation, Verda asks you for it
          rather than supplying a default that would look authoritative and be wrong.</p>
      </div>
      ${groups.map(g => `
        <h3 class="calc-group">${esc(g)}</h3>
        ${S.calculators.filter(c => c.group === g).map(c => `
          <div class="card calc-card" data-calc="${esc(c.id)}">
            <h4>${esc(c.name)}</h4>
            <p class="muted small">${esc(c.basis)}</p>
            <div class="field-grid">
              ${c.inputs.map(inp => inp.factorTable
                ? `<label class="field-sm">${esc(inp.label)} <span class="muted">(${esc(inp.unit)})</span>
                     <select data-factor="${esc(inp.key)}">${inp.factorTable.map((f, i) =>
                       `<option value="${f.factor}" ${f.factor === inp.default ? "selected" : ""}>${esc(f.name)} — ${f.factor} ${esc(f.unit)}</option>`).join("")}</select>
                     <input type="number" step="any" data-in="${esc(inp.key)}" value="${inp.default}" />
                   </label>`
                : `<label class="field-sm">${esc(inp.label)} <span class="muted">(${esc(inp.unit)})</span>
                     <input type="number" step="any" data-in="${esc(inp.key)}" ${inp.default !== undefined ? `value="${inp.default}"` : ""} placeholder="${inp.default === undefined ? "enter a value" : ""}" />
                   </label>`).join("")}
            </div>
            <div class="calc-out" data-out></div>
            ${c.note ? `<p class="muted small calc-note">${esc(c.note)}</p>` : ""}
          </div>`).join("")}`).join("")}`;

    S.calculators.forEach(c => {
      const card = panel.querySelector(`[data-calc="${c.id}"]`);
      if (!card) return;
      const read = () => {
        const vars = {};
        c.inputs.forEach(inp => {
          const el = card.querySelector(`[data-in="${inp.key}"]`);
          vars[inp.key] = el && el.value !== "" ? Number(el.value) : NaN;
        });
        return vars;
      };
      const compute = () => {
        const vars = read();
        const missing = c.inputs.filter(inp => !Number.isFinite(vars[inp.key]));
        if (missing.length) {
          card.querySelector("[data-out]").innerHTML =
            `<p class="muted small">Enter ${missing.map(m => esc(m.label.toLowerCase())).join(" and ")} to calculate.</p>`;
          return;
        }
        // A negative quantity, headcount or duration is not a small number —
        // it is a typo. Computing from it produces a confident wrong answer,
        // which is the worst thing a compliance calculator can do.
        const negative = c.inputs.filter(inp => vars[inp.key] < 0);
        if (negative.length) {
          card.querySelector("[data-out]").innerHTML =
            `<p class="calc-invalid">${esc(negative.map(m => m.label).join(" and "))} cannot be negative — check the figure you entered.</p>`;
          return;
        }
        card.querySelector("[data-out]").innerHTML = c.outputs.map(o => {
          const v = evalFormula(o.expr, vars);
          let badge = "";
          if (o.compare && o.compare.limit !== undefined && v !== null) {
            const over = o.compare.good === "lower" ? v > o.compare.limit : v < o.compare.limit;
            badge = statusBadge(over ? "Above the limit you entered" : "Within the limit you entered", over ? "critical" : "good");
          }
          return `<div class="calc-result">
            <span class="calc-figure">${fmtNum(v)}</span>
            <span class="calc-unit">${esc(o.unit)}</span>
            <span class="calc-name">${esc(o.label)}</span> ${badge}</div>`;
        }).join("");
      };
      card.querySelectorAll("[data-in]").forEach(el => el.addEventListener("input", compute));
      // A factor table writes the chosen factor into its own number field,
      // which stays editable so a site-specific factor can be used instead.
      card.querySelectorAll("[data-factor]").forEach(sel => sel.addEventListener("change", () => {
        const target = card.querySelector(`[data-in="${sel.dataset.factor}"]`);
        target.value = sel.value; compute();
      }));
      compute();
    });
  }

  /* =========================================================================
     MONITOR DIRECTORY

     Who can actually do the work, and what each one is registered for. The
     register ships empty and stays that way until practitioners fill it —
     seeding it with invented firms would put made-up names in front of someone
     deciding who to trust with a statutory submission.
     ========================================================================= */
  function renderMonitors(main) {
    const S = VERDA_SEED;
    const CAP = S.monitorCapacities;

    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>${T().monitors}</h1>
            <p class="muted">Practitioners and firms, and the capacities each one is registered for. Screening results route
              here: when someone's project needs a study, Verda shows them the monitors registered for that country and that work.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="find">Find a monitor</button>
          <button class="tab-btn" data-tab="register">Register a practice</button>
          <button class="tab-btn" data-tab="capacities">What the capacities mean</button>
        </div>
        <div id="mon-panel"></div>
      </section>`));
    const panel = main.querySelector("#mon-panel");

    /* ---------------- find ---------------- */
    function findPanel() {
      panel.innerHTML = `
        <div class="card">
          <div class="form-row">
            <label>Country<select id="mf-country"><option value="">Any country</option>${S.countries.map(c =>
              `<option value="${esc(c.id)}" ${c.id === state.country ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label>
            <label>Service needed<select id="mf-service"><option value="">Any service</option>${CAP.services.map(x =>
              `<option value="${esc(x.id)}">${esc(x.label)}</option>`).join("")}</select></label>
            <label>Sector<select id="mf-sector"><option value="">Any sector</option>${[...new Set(S.industries.map(i => i.name))].map(n =>
              `<option>${esc(n)}</option>`).join("")}</select></label>
          </div>
        </div>
        <div class="card"><div class="table-scroll"><table class="table">
          <thead><tr><th>Monitor</th><th>Grade</th><th>Countries</th><th>Registered for</th><th>Sectors</th><th>Contact</th><th></th></tr></thead>
          <tbody id="mf-rows"></tbody></table></div></div>`;

      function refresh() {
        const country = panel.querySelector("#mf-country").value;
        const service = panel.querySelector("#mf-service").value;
        const sector = panel.querySelector("#mf-sector").value;
        const rows = (state.monitors || []).filter(m =>
          (!country || (m.countries || []).includes(country)) &&
          (!service || (m.services || []).includes(service)) &&
          (!sector || !(m.sectors || []).length || (m.sectors || []).includes(sector)));
        panel.querySelector("#mf-rows").innerHTML = rows.map(m => `
          <tr>
            <td><strong>${esc(m.name)}</strong>${m.registration ? `<div class="small muted mono">${esc(m.registration)}</div>` : ""}</td>
            <td>${esc((CAP.grades.find(g => g.id === m.grade) || {}).label || "—")}</td>
            <td class="small">${esc((m.countries || []).map(countryName).join(", ") || "—")}</td>
            <td class="small muted">${esc((m.services || []).map(id => (CAP.services.find(x => x.id === id) || {}).label).filter(Boolean).join(" · ") || "—")}</td>
            <td class="small muted">${esc((m.sectors || []).join(", ") || "All sectors")}</td>
            <td class="small">${esc(m.contact || "—")}</td>
            <td class="row-actions"><button class="btn btn-ghost btn-sm" data-del="${esc(m.id)}">Remove</button></td>
          </tr>`).join("") || emptyState("people",
            "<strong>No monitor registered yet.</strong> The directory is filled by the practitioners who use Verda — open <em>Register a practice</em> to add the first one.", 7);
        panel.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
          state.monitors = state.monitors.filter(x => x.id !== b.dataset.del); save(); refresh();
        }));
      }
      ["#mf-country", "#mf-service", "#mf-sector"].forEach(sel =>
        panel.querySelector(sel).addEventListener("change", refresh));
      refresh();
    }

    /* ---------------- register ---------------- */
    function registerPanel() {
      panel.innerHTML = `
        <div class="card">
          <h3>Register a practice</h3>
          <p class="muted small">What you enter stays in this browser. Verda has no backend yet, so this register is local to
            whoever is using this copy — it is the shape the directory takes, not a live national register.</p>
          <div class="form-row">
            <label>Name of practitioner or firm<input id="mr-name" placeholder="Name as registered" /></label>
            <label>Registration number (optional)<input id="mr-reg" class="mono" placeholder="Regulator's registration ref" /></label>
            <label>Grade<select id="mr-grade">${CAP.grades.map(g => `<option value="${esc(g.id)}">${esc(g.label)}</option>`).join("")}</select></label>
            <label>Contact<input id="mr-contact" placeholder="Email or phone" /></label>
          </div>
          <h5 style="margin:20px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Countries registered in</h5>
          <div class="sector-chips">${S.countries.map(c =>
            `<label class="sector-chip"><input type="checkbox" data-country="${esc(c.id)}" style="width:auto;margin:0 6px 0 0" />${esc(c.name)}</label>`).join("")}</div>
          <h5 style="margin:20px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Services offered</h5>
          <ul class="checklist compact-list">${CAP.services.map(x =>
            `<li><label><input type="checkbox" data-service="${esc(x.id)}" /> ${esc(x.label)}</label></li>`).join("")}</ul>
          <h5 style="margin:20px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px">Sectors — leave all unticked to mean "any sector"</h5>
          <ul class="checklist compact-list">${S.industries.map(i =>
            `<li><label><input type="checkbox" data-sector="${esc(i.name)}" /> ${esc(i.name)}</label></li>`).join("")}</ul>
          <button class="btn btn-primary" id="mr-add" style="margin-top:16px">${icon("plus")}Add to the directory</button>
        </div>`;
      panel.querySelector("#mr-add").addEventListener("click", () => {
        const name = panel.querySelector("#mr-name").value.trim();
        if (!name) { alert("Enter the name of the practitioner or firm."); return; }
        const picked = (attr) => [...panel.querySelectorAll(`[data-${attr}]:checked`)].map(el => el.dataset[attr]);
        const countries = picked("country");
        if (!countries.length) { alert("Tick at least one country — the directory routes on it."); return; }
        const services = picked("service");
        if (!services.length) { alert("Tick at least one service, or a screening result has nothing to match on."); return; }
        state.monitors.push({
          id: uid("mon"), name, registration: panel.querySelector("#mr-reg").value.trim(),
          grade: panel.querySelector("#mr-grade").value, contact: panel.querySelector("#mr-contact").value.trim(),
          countries, services, sectors: picked("sector"), added: today()
        });
        save();
        alert(`${name} added to the directory.`);
        panel.querySelectorAll(".tab-btn")[0];
        main.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === "find"));
        findPanel();
      });
    }

    /* ---------------- capacities ---------------- */
    function capacitiesPanel() {
      panel.innerHTML = `
        <div class="card">
          <h3>Grades</h3>
          <p class="muted small">What a monitor may sign follows from the grade, and it is the regulator's register that decides it — not this directory.</p>
          <table class="table"><thead><tr><th>Grade</th><th>What it means</th></tr></thead><tbody>
            ${CAP.grades.map(g => `<tr><td><strong>${esc(g.label)}</strong></td><td class="muted">${esc(g.note)}</td></tr>`).join("")}
          </tbody></table>
        </div>
        <div class="card">
          <h3>Services</h3>
          <p class="muted small">The ${CAP.services.length} capacities a monitor can register against. A screening result asks
            for the one its tier needs, then shows who holds it in that country.</p>
          <ul class="checklist compact-list">${CAP.services.map(x => `<li>${esc(x.label)}</li>`).join("")}</ul>
        </div>
        <div class="card">
          <h3>Sectors</h3>
          <p class="muted small">The ${S.industries.length} sectors Verda carries checklists for. A monitor with no sector ticked
            is treated as available for any of them.</p>
          <ul class="checklist compact-list">${S.industries.map(i => `<li>${esc(i.name)} <span class="muted small">— ${esc(i.group)}</span></li>`).join("")}</ul>
        </div>`;
    }

    const tabs = { find: findPanel, register: registerPanel, capacities: capacitiesPanel };
    main.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(x => x.classList.toggle("active", x === b));
      tabs[b.dataset.tab]();
    }));
    findPanel();
  }

  /* =========================================================================
     FREE TOOLBOX — calculators and converters

     The same calculator engine the Inspections module uses, opened up without
     an account, plus straight unit conversion. Every factor is shown and
     editable, and every calculator states where its basis comes from.
     ========================================================================= */
  function renderToolbox(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <div class="page-header">
          <div class="page-header-text">
            <h1>${T().toolbox}</h1>
            <p class="muted">Free, no account. ${S.calculators.length} environmental, forestry and HSE calculators and
              ${S.converters.length} unit converters — the arithmetic a site officer does on the back of an envelope, done
              consistently and with its basis on screen.</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn active" data-tab="calc">Calculators</button>
          <button class="tab-btn" data-tab="conv">Converters</button>
        </div>
        <div id="tb-panel"></div>
      </section>`));
    const panel = main.querySelector("#tb-panel");

    function convPanel() {
      const groups = [...new Set(S.converters.map(c => c.group))];
      panel.innerHTML = `
        <div class="card notice-card">
          <h4>Conversion factors, not estimates</h4>
          <p class="small">Every factor here is an exact or standard definition. Where two units are only interchangeable under
            an assumption — mg/l and ppm, which match only in dilute water — the converter says so rather than hiding it.</p>
        </div>
        ${groups.map(g => `
          <h3 class="calc-group">${esc(g)}</h3>
          ${S.converters.filter(c => c.group === g).map(c => `
            <div class="card calc-card" data-conv="${esc(c.id)}">
              <h4>${esc(c.label)}</h4>
              <div class="form-row">
                <label>Value<input type="number" step="any" data-cv value="1" /></label>
                <label>From<select data-cf>${c.units.map(u => `<option value="${esc(u.id)}">${esc(u.label)}</option>`).join("")}</select></label>
              </div>
              <div data-cout></div>
              ${c.note ? `<p class="muted small calc-note">${esc(c.note)}</p>` : ""}
            </div>`).join("")}`).join("")}`;

      S.converters.forEach(c => {
        const cardEl = panel.querySelector(`[data-conv="${c.id}"]`);
        if (!cardEl) return;
        const compute = () => {
          const raw = cardEl.querySelector("[data-cv]").value;
          const from = c.units.find(u => u.id === cardEl.querySelector("[data-cf]").value);
          const out = cardEl.querySelector("[data-cout]");
          if (raw === "" || !Number.isFinite(Number(raw))) { out.innerHTML = `<p class="muted small">Enter a value to convert.</p>`; return; }
          // Every unit carries a factor relative to the group's base unit, so a
          // conversion is base = value / from.f, then base * to.f.
          const base = Number(raw) / from.f;
          out.innerHTML = c.units.filter(u => u.id !== from.id).map(u => `
            <div class="calc-result"><span class="calc-figure">${fmtNum(base * u.f)}</span>
              <span class="calc-unit">${esc(u.label)}</span></div>`).join("");
        };
        cardEl.querySelector("[data-cv]").addEventListener("input", compute);
        cardEl.querySelector("[data-cf]").addEventListener("change", compute);
        compute();
      });
    }

    const tabs = { calc: () => calculatorPanel(panel), conv: convPanel };
    main.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(x => x.classList.toggle("active", x === b));
      tabs[b.dataset.tab]();
    }));
    calculatorPanel(panel);
  }

  function renderSkills(main) {
    main.appendChild(h(`
      <section>
        <h1>Skills Advisor</h1>
        <p class="muted">Describe your recent work, questions, or prompts — Verda scans for EHS topics and suggests relevant certifications. (Rule-based heuristic today; a Claude API backend can replace this with full NLP analysis.)</p>
        <div class="card">
          <textarea id="skills-input" placeholder="e.g. 'We had a chemical spill near the effluent point and I need to update our SDS register and run an internal audit...'"></textarea>
          <button class="btn btn-primary" id="skills-go">Analyze & suggest</button>
        </div>
        <div id="skills-output"></div>
      </section>
    `));
    main.querySelector("#skills-go").addEventListener("click", () => {
      const text = main.querySelector("#skills-input").value;
      const results = VerdaAI.suggestSkills(text, VERDA_SEED.skillKeywords);
      main.querySelector("#skills-output").innerHTML = results.length
        ? `<div class="grid grid-2">${results.map(r => card(r.suggest, `<p>${r.why}</p><p class="muted small">Matched: ${r.matched.join(", ")}</p>`)).join("")}</div>`
        : `<p class="muted">No strong matches yet — add more detail about the topics you work on.</p>`;
    });
  }

  /* ============================ RESOURCES HUB ============================ */
  function renderResources(main) {
    main.appendChild(h(`
      <section>
        <h1>Resources Hub</h1>
        <div class="tabs">
          <button class="tab-btn active" data-tab="demo">Demo</button>
          <button class="tab-btn" data-tab="qhse">QHSE Library</button>
          <button class="tab-btn" data-tab="events">Events & Webinars</button>
          <button class="tab-btn" data-tab="community">Community</button>
        </div>
        <div id="res-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#res-panel");
    function demoPanel() {
      panel.innerHTML = `<div class="card"><h3>Product walkthrough</h3>
        <ol class="checklist">
          <li>Sign up free and land on your Dashboard.</li>
          <li>Add your first client under Clients & Compliance Care Plans.</li>
          <li>Build a report in Verda Reporting — toggle only the segments you need.</li>
          <li>Run an Auto EHS Audit against the right industry checklist.</li>
          <li>Draft a ToR/ESIA using the structured input, then submit for processing.</li>
        </ol>
        <p class="muted">Want a live walkthrough with your team? Request one below.</p>
        <label>Your email<input id="demo-email" type="email" /></label>
        <button class="btn btn-primary" id="demo-request">Request a live demo</button></div>`;
      panel.querySelector("#demo-request").addEventListener("click", () => {
        const email = panel.querySelector("#demo-email").value.trim();
        if (!email) { alert("Enter an email."); return; }
        alert(`Thanks — demo request noted for ${email}. Connect this button to your CRM/email backend to route it automatically.`);
      });
    }
    function qhsePanel() {
      const items = ["ISO 45001 — Occupational Health & Safety Management Systems", "ISO 14001 — Environmental Management Systems", "ISO 9001 — Quality Management Systems",
        "NEMA (Uganda) Environmental Impact Assessment Regulations", "IFC Performance Standards on Environmental & Social Sustainability", "OSHA General Industry Standards (reference)"];
      panel.innerHTML = `<p class="muted">Reference standards worth knowing — search the issuing body's official site for the current published version.</p>
        <ul class="checklist">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    }
    function eventsPanel() {
      panel.innerHTML = `<div class="card"><h3>Add an event</h3>
        <div class="form-row"><input id="ev-title" placeholder="Title" /><input id="ev-date" type="date" /><input id="ev-desc" placeholder="Description" />
        <button class="btn btn-primary" id="ev-add">Add</button></div></div>
        <div class="grid grid-2" id="ev-list"></div>`;
      function refresh() {
        panel.querySelector("#ev-list").innerHTML = state.events.map(e => card(esc(e.title), `<p>${esc(e.desc)}</p><p class="muted small">${esc(e.date)}</p>`)).join("");
      }
      refresh();
      panel.querySelector("#ev-add").addEventListener("click", () => {
        const title = panel.querySelector("#ev-title").value.trim();
        if (!title) return;
        state.events.push({ id: uid("ev"), title, date: panel.querySelector("#ev-date").value || "TBD", desc: panel.querySelector("#ev-desc").value });
        save(); refresh();
      });
    }
    function communityPanel() {
      panel.innerHTML = `<div class="card"><h3>Post to the community</h3>
        <textarea id="cm-text" placeholder="Ask a question or share a tip..."></textarea>
        <button class="btn btn-primary" id="cm-post">Post</button></div>
        <div id="cm-list"></div>`;
      function refresh() {
        panel.querySelector("#cm-list").innerHTML = state.forumPosts.slice().reverse().map(p =>
          card(esc(p.author), `<p>${esc(p.text)}</p><p class="muted small">${esc(p.date.slice(0,10))}</p>`)).join("");
      }
      refresh();
      panel.querySelector("#cm-post").addEventListener("click", () => {
        const text = panel.querySelector("#cm-text").value.trim();
        if (!text) return;
        state.forumPosts.push({ id: uid("post"), author: state.user ? state.user.name : "Guest", text, date: new Date().toISOString() });
        save(); refresh();
      });
    }
    demoPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      ({ demo: demoPanel, qhse: qhsePanel, events: eventsPanel, community: communityPanel })[btn.dataset.tab]();
    }));
  }

  /* ============================ SUPPLIES & HIRE ============================ */
  function renderSupplies(main) {
    main.appendChild(h(`
      <section>
        <h1>Supplies & Hire</h1>
        <p class="muted small">Categories follow the standard PPE classification used industry-wide (as organised by suppliers such as Honeywell, DuPont, MSA Safety and SafeSourceDirect). No branded products or pricing are reproduced — this is your own inventory to manage.</p>
        <div class="grid grid-2" id="supply-list"></div>
        <div class="card">
          <h3>Add an item to a category</h3>
          <div class="form-row">
            <select id="sp-cat">${state.supplies.map(c => `<option>${esc(c.category)}</option>`).join("")}</select>
            <input id="sp-item" placeholder="Item name" />
            <button class="btn btn-primary" id="sp-add">Add</button>
          </div>
        </div>
      </section>
    `));
    function refresh() {
      main.querySelector("#supply-list").innerHTML = state.supplies.map(c => card(esc(c.category), `<ul class="checklist">${c.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`)).join("");
    }
    refresh();
    main.querySelector("#sp-add").addEventListener("click", () => {
      const item = main.querySelector("#sp-item").value.trim();
      if (!item) return;
      const cat = state.supplies.find(c => c.category === main.querySelector("#sp-cat").value);
      cat.items.push(item);
      save(); refresh();
      main.querySelector("#sp-item").value = "";
    });
  }

  /* ============================ IEC MATERIALS ============================ */
  function renderIec(main) {
    const CATEGORY_ILLUS = { Health: "health", Safety: "safety", Social: "people", Environment: "environment" };
    const categories = [...new Set(VERDA_SEED.iecMaterials.map(m => m.category))];
    main.appendChild(h(`
      <section>
        <h1>Free IEC Materials</h1>
        <p class="muted">Information, Education & Communication materials across Health, Safety, Social and Environment — free to download and print.</p>
        ${categories.map(cat => `
          <div class="card">
            <div class="iec-cat-header">
              ${illustration(CATEGORY_ILLUS[cat] || "environment", "iec-cat-illus")}
              <h3>${cat}</h3>
            </div>
            <div class="grid grid-2" id="iec-list-${cat}"></div>
          </div>`).join("")}
      </section>
    `));
    categories.forEach(cat => {
      const items = VERDA_SEED.iecMaterials.map((m, i) => ({ ...m, i })).filter(m => m.category === cat);
      main.querySelector(`#iec-list-${cat}`).innerHTML = items.map(m =>
        card(m.title, `<button class="btn" data-iec="${m.i}">Download</button>`)
      ).join("");
    });
    main.querySelectorAll("[data-iec]").forEach(btn => btn.addEventListener("click", () => {
      const m = VERDA_SEED.iecMaterials[parseInt(btn.dataset.iec, 10)];
      downloadText(m.title.replace(/\s+/g, "_") + ".txt", m.body);
    }));
  }

  /* ============================ SOLUTIONS ============================ */
  function renderSolutions(main) {
    main.appendChild(h(`
      <section>
        <h1>Solutions</h1>
        <div class="tabs">
          <button class="tab-btn active" data-tab="need">By business need</button>
          <button class="tab-btn" data-tab="industry">By industry</button>
          <button class="tab-btn" data-tab="role">By role</button>
        </div>
        <div class="grid grid-3" id="sol-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#sol-panel");
    function sectionLink(id) {
      const section = SECTIONS.find(s => s.id === id);
      if (!section) return "";
      return `<a class="btn btn-ghost btn-sm" href="#/${id}">${icon(id)}<span>${section.label()}</span></a>`;
    }
    function fill(list) {
      panel.className = "grid grid-2";
      panel.innerHTML = list.map(x => card(x.name,
        `<p class="muted">${x.blurb}</p><div class="solution-links">${x.sections.map(sectionLink).join("")}</div>`
      )).join("");
    }
    fill(VERDA_SEED.solutionsByNeed);
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      fill({ need: VERDA_SEED.solutionsByNeed, industry: VERDA_SEED.solutionsByIndustry, role: VERDA_SEED.solutionsByRole }[btn.dataset.tab]);
    }));
  }

  /* ============================ INCIDENTS ============================ */
  function renderIncidents(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <h1>Incidents</h1>
        <p class="muted">Report and investigate incidents and near-misses. Raise a corrective action straight from any record.</p>
        <div class="card">
          <h3>Report an incident</h3>
          <div class="form-row">
            <label>Date<input id="inc-date" type="date" value="${today()}" /></label>
            <label>Site / client<select id="inc-client">${clientOptions()}</select></label>
            <label>Type<select id="inc-type">${S.incidentTypes.map(t => `<option>${t}</option>`).join("")}</select></label>
            <label>Severity<select id="inc-sev">${S.incidentSeverities.map(t => `<option>${t}</option>`).join("")}</select></label>
          </div>
          <div class="form-row">
            <label>Classification
              <select id="inc-class">${S.injuryClassifications.map(c =>
                `<option value="${esc(c.code)}" ${c.code === "NM" ? "selected" : ""}>${esc(c.label)}</option>`).join("")}</select></label>
            <label>Who they work for
              <select id="inc-employer-type">${S.employerTypes.map(t => `<option>${esc(t)}</option>`).join("")}</select></label>
            <label>Employer name<input id="inc-employer" placeholder="Sub-contractor or company name" /></label>
            <label>Days lost<input id="inc-days" type="number" min="0" value="0" /></label>
          </div>
          <p class="muted small" id="inc-class-help"></p>
          <label>What happened<textarea id="inc-desc" placeholder="Describe the event, who was involved, and the immediate action taken..."></textarea></label>
          <div class="form-row">
            <label>Immediate cause
              <select id="inc-cause-i"><option value="">— not yet determined —</option>${S.causeTaxonomy.immediate.map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
            <label>Underlying cause
              <select id="inc-cause-u"><option value="">— not yet determined —</option>${S.causeTaxonomy.underlying.map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
          </div>
          <button class="btn btn-primary" id="inc-add">${icon("incidents")}<span>Log incident</span></button>
        </div>
        <div class="card">
          <h3>Incident register</h3>
          <div class="table-scroll"><table class="table"><thead><tr><th>Date</th><th>Site</th><th>Type</th><th>Class</th><th>Employer</th><th>Days lost</th><th>Severity</th><th>Status</th><th></th></tr></thead>
          <tbody id="inc-rows"></tbody></table></div>
        </div>
      </section>`));

    const SEV_STATUS = { Low: "good", Medium: "warning", High: "serious", Critical: "critical" };
    function refresh() {
      main.querySelector("#inc-rows").innerHTML = state.incidents.slice().reverse().map(i => `
        <tr>
          <td>${esc(i.date)}</td><td>${esc(i.client)}</td><td>${esc(i.type)}</td>
          <td>${esc(i.classification || "—")}</td>
          <td>${esc(i.employer || i.employerType || "—")}</td>
          <td>${esc(String(i.daysLost || 0))}</td>
          <td>${statusBadge(i.severity, SEV_STATUS[i.severity])}</td>
          <td><select class="inc-status" data-id="${i.id}">${S.incidentStatuses.map(s => `<option ${s === i.status ? "selected" : ""}>${s}</option>`).join("")}</select></td>
          <td><button class="btn btn-ghost btn-sm" data-raise="${i.id}">Raise action</button></td>
        </tr>`).join("") || `<tr><td colspan="6" class="muted">No incidents logged yet.</td></tr>`;

      main.querySelectorAll(".inc-status").forEach(sel => sel.addEventListener("change", () => {
        const inc = state.incidents.find(x => x.id === sel.dataset.id);
        inc.status = sel.value; save();
      }));
      main.querySelectorAll("[data-raise]").forEach(btn => btn.addEventListener("click", () => {
        const inc = state.incidents.find(x => x.id === btn.dataset.raise);
        state.actions.push({
          id: uid("act"), title: `Corrective action: ${inc.type} at ${inc.client}`,
          source: "Incident", owner: "", due: addMonths(today(), 1),
          priority: inc.severity === "Critical" || inc.severity === "High" ? "High" : "Medium",
          status: "Open", created: today()
        });
        save();
        alert("Corrective action raised — see Actions (CAPA).");
      }));
    }
    refresh();

    main.querySelector("#inc-client").addEventListener("change", (e) => setCurrentClient(e.target.value));
    main.querySelector("#inc-add").addEventListener("click", () => {
      const desc = main.querySelector("#inc-desc").value.trim();
      if (!desc) { alert("Describe what happened."); return; }
      if (!requireClient(main, "inc-client")) return;
      state.incidents.push({
        id: uid("inc"), date: main.querySelector("#inc-date").value || today(),
        client: main.querySelector("#inc-client").value, type: main.querySelector("#inc-type").value,
        severity: main.querySelector("#inc-sev").value, desc, status: "Open",
        classification: main.querySelector("#inc-class").value,
        employerType: main.querySelector("#inc-employer-type").value,
        employer: main.querySelector("#inc-employer").value.trim(),
        daysLost: Number(main.querySelector("#inc-days").value) || 0,
        causeImmediate: main.querySelector("#inc-cause-i").value,
        causeUnderlying: main.querySelector("#inc-cause-u").value
      });
      save();
      main.querySelector("#inc-desc").value = "";
      main.querySelector("#inc-employer").value = "";
      main.querySelector("#inc-days").value = "0";
      refresh();
    });

    // Say what the chosen classification means and which rates it feeds —
    // classification is the single field that decides every safety KPI.
    function classHelp() {
      const c = VERDA_SEED.injuryClassifications.find(x => x.code === main.querySelector("#inc-class").value);
      const rates = { ltifr: "LTIFR", trifr: "TRIFR", aifr: "AIFR", nearmiss: "near-miss rate" };
      const feeds = c.counts.map(k => rates[k]).filter(Boolean);
      main.querySelector("#inc-class-help").textContent =
        `${c.desc} ${feeds.length ? "Counts toward: " + feeds.join(", ") + "." : "Counts toward no injury frequency rate."}`;
    }
    classHelp();
    main.querySelector("#inc-class").addEventListener("change", classHelp);

    // Sub-contractor picker: employer name suggests from the register.
    const empList = main.querySelector("#inc-employer");
    empList.setAttribute("list", "inc-employer-options");
    empList.insertAdjacentHTML("afterend",
      `<datalist id="inc-employer-options">${state.subcontractors.map(sc => `<option value="${esc(sc.name)}"></option>`).join("")}</datalist>`);
  }

  /* ============================ RISK REGISTER ============================ */
  function renderRisk(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <h1>Risk Register</h1>
        <p class="muted">Score hazards on a 5×5 likelihood × severity matrix. Verda bands the score and tracks controls and ownership.</p>
        <div class="card">
          <h3>Add a hazard</h3>
          <div class="form-row">
            <label>Hazard category
              <select id="risk-cat"><option value="">— all categories —</option>${
                [...new Set(S.hazardLibrary.map(hz => hz.category))].map(c => `<option>${esc(c)}</option>`).join("")}</select></label>
            <label>Pick from the hazard library
              <select id="risk-lib"><option value="">— choose, or type your own below —</option></select></label>
          </div>
          <div class="form-row">
            <label>Hazard<input id="risk-hazard" placeholder="e.g. Unguarded conveyor drive" /></label>
            <label>Area / activity<input id="risk-area" placeholder="e.g. Packing line" /></label>
            <label>Likelihood<select id="risk-l">${S.riskLikelihood.map((l, i) => `<option value="${i + 1}">${i + 1} — ${l}</option>`).join("")}</select></label>
            <label>Severity<select id="risk-s">${S.riskSeverity.map((l, i) => `<option value="${i + 1}">${i + 1} — ${l}</option>`).join("")}</select></label>
          </div>
          <div class="form-row">
            <label>Existing controls<input id="risk-controls" placeholder="e.g. Fixed guard, LOTO procedure" /></label>
            <label>Owner<input id="risk-owner" placeholder="Who owns this risk" /></label>
          </div>
          <button class="btn btn-primary" id="risk-add">${icon("risk")}<span>Add to register</span></button>
        </div>
        <div class="grid grid-2">
          <div class="card"><h3>Risk matrix</h3><div id="risk-matrix"></div>
            <p class="muted small">Likelihood (rows) × Severity (columns). Cell numbers are hazards currently at that score.</p></div>
          <div class="card"><h3>Profile</h3><div id="risk-profile"></div></div>
        </div>
        <div class="card">
          <h3>Register</h3>
          <table class="table"><thead><tr><th>Hazard</th><th>Area</th><th>Score</th><th>Band</th><th>Controls</th><th>Owner</th></tr></thead>
          <tbody id="risk-rows"></tbody></table>
        </div>
      </section>`));

    /* The hazard library fills in the hazard and its normally-expected
       controls, so a register starts from known practice rather than a blank
       box. Both fields stay editable — the library is a starting point. */
    const libSel = main.querySelector("#risk-lib");
    const catSel = main.querySelector("#risk-cat");
    function fillLib() {
      const cat = catSel.value;
      const list = S.hazardLibrary.filter(hz => !cat || hz.category === cat);
      libSel.innerHTML = `<option value="">— choose, or type your own below —</option>` +
        list.map((hz, i) => `<option value="${S.hazardLibrary.indexOf(hz)}">${esc(hz.hazard)}</option>`).join("");
    }
    fillLib();
    catSel.addEventListener("change", fillLib);
    libSel.addEventListener("change", () => {
      const hz = S.hazardLibrary[Number(libSel.value)];
      if (!hz) return;
      main.querySelector("#risk-hazard").value = hz.hazard;
      main.querySelector("#risk-controls").value = hz.controls;
    });

    function refresh() {
      // matrix
      let m = `<table class="risk-matrix"><thead><tr><th></th>${S.riskSeverity.map((s, i) => `<th>${i + 1}</th>`).join("")}</tr></thead><tbody>`;
      for (let l = 5; l >= 1; l--) {
        m += `<tr><th>${l}</th>`;
        for (let s = 1; s <= 5; s++) {
          const band = riskBandFor(l * s);
          const count = state.risks.filter(r => r.likelihood === l && r.severity === s).length;
          m += `<td class="risk-cell risk-${band.status}" title="${band.label} — score ${l * s}">${count || ""}</td>`;
        }
        m += `</tr>`;
      }
      m += `</tbody></table>`;
      main.querySelector("#risk-matrix").innerHTML = m;

      // profile chart
      const rows = S.riskBands.map(b => ({
        label: b.label,
        value: state.risks.filter(r => riskBandFor(r.likelihood * r.severity).label === b.label).length,
        color: `var(--chart-${b.status})`
      }));
      main.querySelector("#risk-profile").innerHTML = barChart(rows, "Hazards by risk band");

      main.querySelector("#risk-rows").innerHTML = state.risks.slice().reverse().map(r => {
        const score = r.likelihood * r.severity, band = riskBandFor(score);
        return `<tr><td>${esc(r.hazard)}</td><td>${esc(r.area)}</td><td>${score}</td>
          <td>${statusBadge(band.label, band.status)}</td><td>${esc(r.controls) || "—"}</td><td>${esc(r.owner) || "—"}</td></tr>`;
      }).join("") || `<tr><td colspan="6" class="muted">No hazards recorded yet.</td></tr>`;
    }
    refresh();

    main.querySelector("#risk-add").addEventListener("click", () => {
      const hazard = main.querySelector("#risk-hazard").value.trim();
      if (!hazard) { alert("Name the hazard."); return; }
      state.risks.push({
        id: uid("risk"), hazard, area: main.querySelector("#risk-area").value,
        likelihood: parseInt(main.querySelector("#risk-l").value, 10),
        severity: parseInt(main.querySelector("#risk-s").value, 10),
        controls: main.querySelector("#risk-controls").value, owner: main.querySelector("#risk-owner").value
      });
      save();
      main.querySelector("#risk-hazard").value = ""; main.querySelector("#risk-area").value = "";
      refresh();
    });
  }

  /* ============================ ACTIONS (CAPA) ============================ */
  function renderActions(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <h1>Actions (CAPA)</h1>
        <p class="muted">One tracker for every corrective and preventive action — whatever raised it. Overdue items are flagged automatically.</p>
        <div class="card">
          <h3>Add an action</h3>
          <div class="form-row">
            <label>Action<input id="act-title" placeholder="e.g. Fit guard to conveyor drive" /></label>
            <label>Source<select id="act-source">${S.actionSources.map(s => `<option>${s}</option>`).join("")}</select></label>
            <label>Owner<input id="act-owner" placeholder="Assigned to" /></label>
            <label>Due<input id="act-due" type="date" value="${addMonths(today(), 1)}" /></label>
            <label>Priority<select id="act-priority">${S.actionPriorities.map(p => `<option ${p === "Medium" ? "selected" : ""}>${p}</option>`).join("")}</select></label>
          </div>
          <button class="btn btn-primary" id="act-add">${icon("actions")}<span>Add action</span></button>
        </div>
        <div class="card">
          <h3>Action tracker</h3>
          <table class="table"><thead><tr><th>Action</th><th>Source</th><th>Owner</th><th>Due</th><th>Priority</th><th>Status</th></tr></thead>
          <tbody id="act-rows"></tbody></table>
        </div>
      </section>`));

    const PRI_STATUS = { Low: "good", Medium: "warning", High: "critical" };
    function refresh() {
      main.querySelector("#act-rows").innerHTML = state.actions.slice().reverse().map(a => {
        const overdue = a.status !== "Closed" && daysUntil(a.due) < 0;
        return `<tr class="${overdue ? "row-overdue" : ""}">
          <td>${esc(a.title)}</td><td>${esc(a.source)}</td><td>${esc(a.owner) || "—"}</td>
          <td>${esc(a.due) || "—"} ${overdue ? statusBadge("Overdue", "critical") : ""}</td>
          <td>${statusBadge(a.priority, PRI_STATUS[a.priority])}</td>
          <td><select class="act-status" data-id="${a.id}">${S.actionStatuses.map(s => `<option ${s === a.status ? "selected" : ""}>${s}</option>`).join("")}</select></td>
        </tr>`;
      }).join("") || `<tr><td colspan="6" class="muted">No actions yet — raise one here or from an incident.</td></tr>`;

      main.querySelectorAll(".act-status").forEach(sel => sel.addEventListener("change", () => {
        state.actions.find(a => a.id === sel.dataset.id).status = sel.value;
        save(); refresh();
      }));
    }
    refresh();

    main.querySelector("#act-add").addEventListener("click", () => {
      const title = main.querySelector("#act-title").value.trim();
      if (!title) { alert("Describe the action."); return; }
      state.actions.push({
        id: uid("act"), title, source: main.querySelector("#act-source").value,
        owner: main.querySelector("#act-owner").value, due: main.querySelector("#act-due").value,
        priority: main.querySelector("#act-priority").value, status: "Open", created: today()
      });
      save();
      main.querySelector("#act-title").value = ""; main.querySelector("#act-owner").value = "";
      refresh();
    });
  }

  /* ============================ TRAINING & COMPETENCY ============================ */
  function renderTraining(main) {
    const S = VERDA_SEED;
    main.appendChild(h(`
      <section>
        <h1>Training & Competency</h1>
        <p class="muted">Who is trained on what, and when it expires. Verda calculates the refresher date from each course's validity period.</p>
        <div class="card">
          <h3>Record training</h3>
          <div class="form-row">
            <label>Person<input id="tr-person" placeholder="Full name" /></label>
            <label>Site / client<select id="tr-client">${clientOptions()}</select></label>
            <label>Role<select id="tr-role">${S.jobRoles.map(r => `<option>${esc(r)}</option>`).join("")}</select></label>
            <label>Employer<select id="tr-employer-type">${S.employerTypes.map(t => `<option>${esc(t)}</option>`).join("")}</select></label>
          </div>
          <div class="form-row">
            <label>Employer name<input id="tr-employer" placeholder="Sub-contractor or company name" list="tr-employer-options" /></label>
            <label>Course
              <select id="tr-course">${[...new Set(S.trainingCatalogue.map(c => c.category))].map(cat =>
                `<optgroup label="${esc(cat)}">${S.trainingCatalogue.filter(c => c.category === cat).map(c =>
                  `<option value="${esc(c.name)}">${esc(c.name)} — ${c.validityMonths} mo</option>`).join("")}</optgroup>`).join("")}</select></label>
            <label>Completed<input id="tr-date" type="date" value="${today()}" /></label>
          </div>
          <p class="muted small" id="tr-course-help"></p>
          <datalist id="tr-employer-options">${state.subcontractors.map(sc => `<option value="${esc(sc.name)}"></option>`).join("")}</datalist>
          <button class="btn btn-primary" id="tr-add">${icon("training")}<span>Add record</span></button>
        </div>
        <div class="card">
          <h3>Competency matrix</h3>
          <div class="table-scroll"><table class="table"><thead><tr><th>Person</th><th>Site</th><th>Role</th><th>Employer</th><th>Course</th><th>Completed</th><th>Expires</th><th>Status</th></tr></thead>
          <tbody id="tr-rows"></tbody></table></div>
        </div>
      </section>`));

    function refresh() {
      main.querySelector("#tr-rows").innerHTML = state.training.slice().reverse().map(t => {
        const st = trainingStatus(t.expires);
        return `<tr><td>${esc(t.person)}</td><td>${esc(t.client)}</td><td>${esc(t.role || "—")}</td>
          <td>${esc(t.employer || t.employerType || "—")}</td><td>${esc(t.course)}</td>
          <td>${esc(t.completed)}</td><td>${esc(t.expires)}</td><td>${statusBadge(st.label, st.status)}</td></tr>`;
      }).join("") || emptyState("training", "No training recorded. Choose a course and Verda sets the refresher date from its validity period.", 8);
    }
    refresh();

    main.querySelector("#tr-client").addEventListener("change", (e) => setCurrentClient(e.target.value));
    main.querySelector("#tr-add").addEventListener("click", () => {
      const person = main.querySelector("#tr-person").value.trim();
      if (!person) { alert("Enter the person's name."); return; }
      if (!requireClient(main, "tr-client")) return;
      const courseName = main.querySelector("#tr-course").value;
      const course = S.trainingCatalogue.find(c => c.name === courseName);
      const completed = main.querySelector("#tr-date").value || today();
      state.training.push({
        id: uid("tr"), person, client: main.querySelector("#tr-client").value,
        role: main.querySelector("#tr-role").value,
        employerType: main.querySelector("#tr-employer-type").value,
        employer: main.querySelector("#tr-employer").value.trim(),
        course: courseName, completed, expires: addMonths(completed, course.validityMonths)
      });
      save();
      main.querySelector("#tr-person").value = "";
      refresh();
    });

    // The refresher date is calculated, so say which validity period produced it.
    function courseHelp() {
      const c = S.trainingCatalogue.find(x => x.name === main.querySelector("#tr-course").value);
      main.querySelector("#tr-course-help").textContent = c
        ? `Valid for ${c.validityMonths} months — Verda sets the refresher date from the completion date. Typically required for: ${c.roles}.`
        : "";
    }
    courseHelp();
    main.querySelector("#tr-course").addEventListener("change", courseHelp);
  }

  /* ---- Platform (SaaS) revenue: what Verda earns its developers ---- */
  function renderPlatformRevenue(container) {
    const P = state.platformRevenue;
    const plans = VERDA_SEED.platformPlans;
    const priceOf = (id) => id === "enterprise" ? P.enterprisePrice : (plans.find(p => p.id === id) || {}).price || 0;
    const usd = (n) => `$${Math.round(n).toLocaleString()}`;

    const paidPlans = ["team", "business", "enterprise"];
    const rows = paidPlans.map(id => {
      const plan = plans.find(p => p.id === id);
      const subs = P.subscribers[id] || 0;
      const price = priceOf(id);
      return { id, name: plan.name, subs, price, mrr: subs * price };
    });
    const subscriptionMrr = rows.reduce((a, r) => a + r.mrr, 0);
    const payingAccounts = rows.reduce((a, r) => a + r.subs, 0);
    const creditMrr = payingAccounts * P.creditRevenuePerPayingAccount;
    const grossMrr = subscriptionMrr + creditMrr;
    const infraCost = payingAccounts * P.infraCostPerAccount;
    const netMrr = grossMrr - infraCost - P.monthlyBuildCost;
    const churnedPerMonth = payingAccounts * (P.monthlyChurnPct / 100);
    const arpa = payingAccounts > 0 ? grossMrr / payingAccounts : 0;
    // Lifetime = 1/churn rate (months); LTV = ARPA x lifetime, net of infra.
    const lifetimeMonths = P.monthlyChurnPct > 0 ? 100 / P.monthlyChurnPct : null;
    const ltv = lifetimeMonths ? (arpa - P.infraCostPerAccount) * lifetimeMonths : null;
    const accountsToBreakEven = (arpa - P.infraCostPerAccount) > 0
      ? Math.ceil(P.monthlyBuildCost / (arpa - P.infraCostPerAccount)) : null;

    container.innerHTML = `
      <div class="card notice-card">
        <strong>This models the product business, and it cannot start today.</strong>
        <p class="muted small">Subscriptions need a backend, real authentication, multi-tenancy and a payment gateway. Until those exist this tab is a plan, not a forecast — the services tab is the revenue that is available now.</p>
      </div>
      <div class="card">
        <h3>Assumptions</h3>
        <div class="form-row">
          ${rows.map(r => `<label>${esc(r.name)} subscribers${r.id === "enterprise" ? "" : ` <span class="muted small">($${r.price}/mo)</span>`}
            <input class="pr-in" data-field="subs" data-plan="${esc(r.id)}" type="number" min="0" value="${r.subs}" /></label>`).join("")}
          <label>Enterprise price /mo<input class="pr-in" data-field="enterprisePrice" type="number" min="0" value="${P.enterprisePrice}" /></label>
        </div>
        <div class="form-row">
          <label>Monthly churn %<input class="pr-in" data-field="monthlyChurnPct" type="number" min="0" step="0.5" value="${P.monthlyChurnPct}" /></label>
          <label>Credit revenue / account /mo<input class="pr-in" data-field="creditRevenuePerPayingAccount" type="number" min="0" value="${P.creditRevenuePerPayingAccount}" /></label>
          <label>Infra cost / account /mo<input class="pr-in" data-field="infraCostPerAccount" type="number" min="0" value="${P.infraCostPerAccount}" /></label>
          <label>Build &amp; run cost /mo<input class="pr-in" data-field="monthlyBuildCost" type="number" min="0" value="${P.monthlyBuildCost}" /></label>
        </div>
      </div>
      <div class="grid grid-3">
        ${statCard("revenue", "Platform MRR", usd(grossMrr), `${payingAccounts} paying accounts · ${usd(subscriptionMrr)} subscriptions + ${usd(creditMrr)} credits.`)}
        ${statCard("analytics", "Annual run rate", usd(grossMrr * 12), "Gross, before costs.")}
        ${statCard("governance", "Net after costs", usd(netMrr), netMrr >= 0 ? "Covers infra and build cost." : "Does not yet cover infra and build cost.", netMrr < 0)}
      </div>
      <div class="grid grid-2">
        <div class="card"><h3>Unit economics</h3>
          <table class="table"><tbody>
            <tr><td>Average revenue per account</td><td>${usd(arpa)}/mo</td></tr>
            <tr><td>Infra cost per account</td><td>${usd(P.infraCostPerAccount)}/mo</td></tr>
            <tr><td>Expected account lifetime</td><td>${lifetimeMonths ? lifetimeMonths.toFixed(0) + " months" : "—"}</td></tr>
            <tr><td>Lifetime value per account</td><td>${ltv !== null ? usd(ltv) : "—"}</td></tr>
            <tr><td>Accounts lost per month at ${P.monthlyChurnPct}% churn</td><td>${churnedPerMonth.toFixed(1)}</td></tr>
            <tr><td>Accounts needed to cover build cost</td><td>${accountsToBreakEven !== null ? accountsToBreakEven : "not reachable"}</td></tr>
          </tbody></table>
        </div>
        <div class="card"><h3>MRR by plan</h3>
          ${barChart(rows.map(r => ({ label: r.name, value: Math.round(r.mrr), color: "var(--chart-1)" })), "MRR by plan", "$ / month")}
        </div>
      </div>
      <div class="card">
        <h3>What has to be true first</h3>
        <ul class="checklist">
          <li>Backend with real authentication, roles and per-tenant data separation.</li>
          <li>Payment gateway (card and mobile money) wired to plans and credit packs.</li>
          <li>A live Claude API proxy so AI drafting is genuinely AI, not templated.</li>
          <li>Someone answering support, or Team-tier customers churn straight back out.</li>
        </ul>
        <p class="muted small">Each is a real build. The order above is also the order they pay off in.</p>
      </div>`;

    container.querySelectorAll(".pr-in").forEach(inp => inp.addEventListener("input", () => {
      const val = parseFloat(inp.value) || 0;
      if (inp.dataset.field === "subs") P.subscribers[inp.dataset.plan] = val;
      else P[inp.dataset.field] = val;
      save();
      renderPlatformRevenue(container);
      // Re-focus the field the user was typing in. No setSelectionRange here:
      // it throws on <input type="number">, which every field here is.
      const focused = container.querySelector(`.pr-in[data-field="${inp.dataset.field}"]${inp.dataset.plan ? `[data-plan="${inp.dataset.plan}"]` : ""}`);
      if (focused) focused.focus();
    }));
  }

  /* ============================ PLANS & PRICING ============================ */
  function renderPlans(main) {
    const plans = VERDA_SEED.platformPlans;
    const packs = VERDA_SEED.creditPacks;
    main.appendChild(h(`
      <section>
        <h1>Plans & Pricing</h1>
        <p class="muted">How Verda is sold as a product — the packaging a prospect sees. Separate from the compliance care plans EEIS sells as a service.</p>
        <div class="card notice-card">
          <strong>Packaging proposal, not a live billing system.</strong>
          <p class="muted small">These prices are a starting point to test with buyers. Nothing here can actually be charged until the backend, real authentication and a payment gateway are built — see <code>docs/monetisation.md</code> for the sequence.</p>
        </div>
        <div class="plan-grid">
          ${plans.map(p => `
            <div class="plan-card ${p.id === "team" ? "plan-featured" : ""}">
              ${p.id === "team" ? `<div class="plan-flag">${esc(p.cta)}</div>` : ""}
              <h3>${esc(p.name)}</h3>
              <div class="plan-price">${p.price === null ? "Custom" : (p.price === 0 ? "Free" : `$${p.price}`)}
                ${p.price ? `<span class="plan-per">/${esc(p.per)}</span>` : ""}</div>
              <p class="muted small plan-seats">${esc(p.seats)}</p>
              <p class="plan-pitch">${esc(p.pitch)}</p>
              <ul class="checklist plan-features">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
              <button class="btn ${p.id === "team" ? "btn-primary" : ""}" data-plan="${esc(p.id)}">${p.price === null ? "Talk to us" : "Choose " + esc(p.name)}</button>
            </div>`).join("")}
        </div>
        <div class="card">
          <h3>Credit packs</h3>
          <p class="muted small">Usage revenue on top of subscription. Credits pay for AI-assisted drafting (${VERDA_SEED.creditCosts.aiDraft}), audit summaries (${VERDA_SEED.creditCosts.auditAiSummary}) and ESIA processing submissions (${VERDA_SEED.creditCosts.esiaSubmit}).</p>
          <div class="grid grid-3">
            ${packs.map(p => `<div class="card"><h3>${esc(p.label)}</h3><div class="stat">${p.credits}</div>
              <p class="muted small">credits — $${p.price} (${(p.price / p.credits * 100).toFixed(1)}¢ each)</p></div>`).join("")}
          </div>
        </div>
        <div class="card">
          <h3>Why this is defensible</h3>
          <ul class="checklist">
            <li>Coverage: 18 sectors with real checklists, not one vertical.</li>
            <li>Two reporting frameworks — national (NEMA-style) and IFC PS1–PS8 for lender-financed clients.</li>
            <li>Works offline on remote sites, which most cloud EHS tools do not.</li>
            <li>Five languages, so it travels beyond one market.</li>
            <li>Priced well below enterprise EHS suites, aimed at operators those suites ignore.</li>
          </ul>
        </div>
      </section>`));

    main.querySelectorAll("[data-plan]").forEach(btn => btn.addEventListener("click", () => {
      alert("Billing isn't connected yet — this is the packaging, not a checkout. Connect a payment provider to make this button real.");
    }));
  }

  /* ============================ REVENUE PLANNER ============================ */
  function renderRevenue(main) {
    if (!state.revenue) state.revenue = JSON.parse(JSON.stringify(VERDA_SEED.revenueDefaults));
    if (!state.platformRevenue) state.platformRevenue = JSON.parse(JSON.stringify(VERDA_SEED.platformRevenueDefaults));
    const R = state.revenue;
    const money = (n) => `${esc(R.currency)} ${Math.round(n).toLocaleString()}`;

    /* One visit falls in each billing period (a quarterly plan is visited
       quarterly, a monthly plan monthly), so the fee for a period must clear
       the cost of that period's visit — that is the break-even fee. */
    function tierMaths(t) {
      const costPerVisit = t.labCost + (t.daysPerVisit * R.dayRate) + t.travel;
      const annualRevenue = t.fee * t.visitsPerYear * t.clients;
      const annualCost = costPerVisit * t.visitsPerYear * t.clients;
      const marginPerVisit = t.fee - costPerVisit;
      return {
        costPerVisit, annualRevenue, annualCost, marginPerVisit,
        annualMargin: annualRevenue - annualCost,
        mrr: annualRevenue / 12,
        monthlyMargin: (annualRevenue - annualCost) / 12,
        marginPct: t.fee > 0 ? (marginPerVisit / t.fee) * 100 : 0
      };
    }

    main.appendChild(h(`
      <section>
        <h1>Revenue Planner</h1>
        <p class="muted">Two ways this makes money: delivering compliance care plans as a service, and licensing Verda itself as a product. Model both here.</p>
        <div class="tabs">
          <button class="tab-btn active" data-rev-tab="services">Services — compliance care plans</button>
          <button class="tab-btn" data-rev-tab="platform">Platform — Verda subscriptions</button>
        </div>
        <div id="rev-platform" hidden></div>
        <div id="rev-services"></div>
      </section>`));

    const servicesPanel = main.querySelector("#rev-services");
    servicesPanel.appendChild(h(`
      <div>
        <div class="card notice-card">
          <strong>These are placeholder figures, not EEIS rates.</strong>
          <p class="muted small">Replace every number below with your own rate card before quoting. The three that decide everything: your fee per tier, your lab cost per visit, and your loaded day rate.</p>
        </div>
        <div class="card">
          <h3>Shared inputs</h3>
          <div class="form-row">
            <label>Currency<input id="rv-currency" value="${R.currency}" /></label>
            <label>Loaded day rate<input id="rv-dayrate" type="number" min="0" value="${R.dayRate}" /></label>
            <label>Fixed monthly overhead<input id="rv-overhead" type="number" min="0" value="${R.overhead}" /></label>
          </div>
        </div>
        <div class="card">
          <h3>Per tier</h3>
          <div class="table-scroll">
            <table class="table"><thead><tr>
              <th>Tier</th><th>Billing</th><th>Fee per period</th><th>Clients</th>
              <th>Lab cost / visit</th><th>Days / visit</th><th>Travel / visit</th>
            </tr></thead><tbody>
              ${R.tiers.map(t => `<tr>
                <td>${t.name}</td>
                <td class="muted small">${t.billing}<br>${t.visitsPerYear} visits/yr</td>
                <td><input class="rv-in" data-tier="${t.id}" data-field="fee" type="number" min="0" value="${t.fee}" /></td>
                <td><input class="rv-in" data-tier="${t.id}" data-field="clients" type="number" min="0" value="${t.clients}" /></td>
                <td><input class="rv-in" data-tier="${t.id}" data-field="labCost" type="number" min="0" value="${t.labCost}" /></td>
                <td><input class="rv-in" data-tier="${t.id}" data-field="daysPerVisit" type="number" min="0" step="0.25" value="${t.daysPerVisit}" /></td>
                <td><input class="rv-in" data-tier="${t.id}" data-field="travel" type="number" min="0" value="${t.travel}" /></td>
              </tr>`).join("")}
            </tbody></table>
          </div>
        </div>
        <div id="rv-results"></div>
      </div>`));

    // Tab switching between the two revenue models.
    main.querySelectorAll("[data-rev-tab]").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll("[data-rev-tab]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const showPlatform = btn.dataset.revTab === "platform";
      main.querySelector("#rev-platform").hidden = !showPlatform;
      main.querySelector("#rev-services").hidden = showPlatform;
      if (showPlatform) renderPlatformRevenue(main.querySelector("#rev-platform"));
    }));

    function refresh() {
      const rows = R.tiers.map(t => ({ t, m: tierMaths(t) }));
      const totalClients = R.tiers.reduce((a, t) => a + t.clients, 0);
      const mrr = rows.reduce((a, r) => a + r.m.mrr, 0);
      const monthlyMargin = rows.reduce((a, r) => a + r.m.monthlyMargin, 0);
      const marginPct = mrr > 0 ? (monthlyMargin / mrr) * 100 : 0;
      const marginPerClient = totalClients > 0 ? monthlyMargin / totalClients : 0;
      const breakEvenClients = marginPerClient > 0 ? Math.ceil(R.overhead / marginPerClient) : null;
      const profit = monthlyMargin - R.overhead;

      const chartRows = rows.map(r => ({
        label: r.t.name.split("—")[0].trim(),
        value: Math.max(0, Math.round(r.m.monthlyMargin)),
        color: "var(--chart-1)"
      }));

      main.querySelector("#rv-results").innerHTML = `
        <div class="grid grid-3">
          ${statCard("revenue", "Monthly recurring revenue", money(mrr), `${totalClients} client${totalClients === 1 ? "" : "s"} across ${R.tiers.length} tiers.`)}
          ${statCard("analytics", "Monthly gross margin", money(monthlyMargin), `${marginPct.toFixed(0)}% of revenue after delivery cost.`, marginPct < 30)}
          ${statCard("governance", "After overhead", money(profit), profit >= 0 ? "Covers overhead." : "Does not yet cover overhead.", profit < 0)}
        </div>
        <div class="grid grid-2">
          <div class="card"><h3>Break-even</h3>
            ${breakEvenClients === null
              ? `<p class="muted">No tier earns a positive margin yet — a fee has to clear its own cost per visit before client count can help.</p>`
              : `<div class="stat">${breakEvenClients}</div>
                 <p class="muted">clients at the current mix to cover ${money(R.overhead)} of monthly overhead (average margin ${money(marginPerClient)} per client per month).</p>`}
            <p class="muted small">Annual: revenue ${money(mrr * 12)} · gross margin ${money(monthlyMargin * 12)}</p>
          </div>
          <div class="card"><h3>Monthly gross margin by tier</h3>${barChart(chartRows, "Monthly gross margin by tier", R.currency + " / month")}</div>
        </div>
        <div class="card">
          <h3>Margin per visit</h3>
          <p class="muted small">A tier only works if its fee for the period clears the cost of that period's visit. Anything at or below zero loses more money with every client you add.</p>
          <div class="table-scroll">
            <table class="table" id="rv-margin-table"><thead><tr>
              <th>Tier</th><th>Fee</th><th>Cost / visit</th><th>Margin / visit</th><th>Margin %</th><th>MRR</th><th>Monthly margin</th>
            </tr></thead><tbody>
              ${rows.map(r => {
                const band = r.m.marginPerVisit <= 0 ? "critical" : r.m.marginPct < 30 ? "warning" : "good";
                return `<tr>
                  <td>${r.t.name}</td>
                  <td>${money(r.t.fee)}</td>
                  <td>${money(r.m.costPerVisit)}</td>
                  <td>${money(r.m.marginPerVisit)}</td>
                  <td>${statusBadge(r.m.marginPct.toFixed(0) + "%", band)}</td>
                  <td>${money(r.m.mrr)}</td>
                  <td>${money(r.m.monthlyMargin)}</td>
                </tr>`;
              }).join("")}
            </tbody></table>
          </div>
          <div class="modal-actions"><button class="btn" id="rv-export">Download summary</button></div>
        </div>`;

      main.querySelector("#rv-export").addEventListener("click", () => {
        const lines = [
          "VERDA REVENUE PLANNER — SUMMARY",
          `Generated: ${today()}`,
          `Currency: ${R.currency} · Loaded day rate: ${money(R.dayRate)} · Monthly overhead: ${money(R.overhead)}`,
          "-----------------------------------------------------------------------",
          ...rows.map(r =>
            `${r.t.name} (${r.t.billing}, ${r.t.visitsPerYear} visits/yr, ${r.t.clients} clients)\n` +
            `  Fee ${money(r.t.fee)} · cost/visit ${money(r.m.costPerVisit)} · margin/visit ${money(r.m.marginPerVisit)} (${r.m.marginPct.toFixed(0)}%)\n` +
            `  MRR ${money(r.m.mrr)} · monthly margin ${money(r.m.monthlyMargin)}`),
          "-----------------------------------------------------------------------",
          `TOTAL MRR: ${money(mrr)}`,
          `TOTAL MONTHLY GROSS MARGIN: ${money(monthlyMargin)} (${marginPct.toFixed(0)}%)`,
          `AFTER OVERHEAD: ${money(profit)}`,
          breakEvenClients === null ? "BREAK-EVEN: not reachable at current fees" : `BREAK-EVEN: ${breakEvenClients} clients at the current mix`,
          "",
          "Figures are only as good as the rates entered. Verify against EEIS's rate card."
        ];
        downloadText("Verda-Revenue-Summary.txt", lines.join("\n"));
      });
    }

    function bindInputs() {
      main.querySelector("#rv-currency").addEventListener("input", (e) => { R.currency = e.target.value || "USD"; save(); refresh(); });
      main.querySelector("#rv-dayrate").addEventListener("input", (e) => { R.dayRate = parseFloat(e.target.value) || 0; save(); refresh(); });
      main.querySelector("#rv-overhead").addEventListener("input", (e) => { R.overhead = parseFloat(e.target.value) || 0; save(); refresh(); });
      main.querySelectorAll(".rv-in").forEach(inp => inp.addEventListener("input", () => {
        const tier = R.tiers.find(t => t.id === inp.dataset.tier);
        tier[inp.dataset.field] = parseFloat(inp.value) || 0;
        save(); refresh();
      }));
    }
    bindInputs();
    refresh();
  }

  /* ============================ ANALYTICS ============================ */
  /* ============================ AUTO KPI ENGINE ============================
     Every figure below is computed from registers the user already fills in —
     incidents, actions, training, risks and the workforce/hours register — so
     no KPI is typed in by hand and none can drift from its source data.
     Frequency rates need exposure hours: without them a rate is undefined,
     and Verda says so rather than printing a zero that reads like good news. */

  const EMPLOYER_DIRECT = "Direct employee";

  // Hours and headcount for a period, optionally filtered to one employer type.
  function exposure(filterFn) {
    const rows = state.workforce.filter(w => !filterFn || filterFn(w));
    return {
      hours: rows.reduce((a, w) => a + (Number(w.hours) || 0), 0),
      headcount: rows.reduce((a, w) => a + (Number(w.headcount) || 0), 0),
      female: rows.reduce((a, w) => a + (Number(w.female) || 0), 0)
    };
  }

  const classOf = (inc) => VERDA_SEED.injuryClassifications.find(c => c.code === inc.classification);
  const countsToward = (inc, rate) => {
    const c = classOf(inc);
    return !!c && c.counts.indexOf(rate) !== -1;
  };

  // rate = events per kpiExposureBase hours worked. Null when hours are unknown.
  function frequencyRate(events, hours) {
    if (!hours) return null;
    return (events * VERDA_SEED.kpiExposureBase) / hours;
  }

  function computeKpis(filterFn) {
    const incidents = state.incidents.filter(i => !filterFn || filterFn(i));
    const ex = exposure(filterFn ? (w) => filterFn({ employerType: w.employerType, employer: w.employer, client: w.client }) : null);
    const n = (rate) => incidents.filter(i => countsToward(i, rate)).length;
    const fatalities = incidents.filter(i => i.classification === "FAT").length;
    const daysLost = incidents.reduce((a, i) => a + (Number(i.daysLost) || 0), 0);
    const recordable = n("trifr");
    const nearMiss = n("nearmiss");
    return {
      hours: ex.hours, headcount: ex.headcount, female: ex.female,
      fatalities, daysLost, recordable, nearMiss,
      ltifr: frequencyRate(n("ltifr"), ex.hours),
      trifr: frequencyRate(recordable, ex.hours),
      aifr: frequencyRate(n("aifr"), ex.hours),
      severity: frequencyRate(daysLost, ex.hours),
      nearmissrate: frequencyRate(nearMiss, ex.hours),
      nmratio: recordable ? nearMiss / recordable : null,
      incidents: incidents.length
    };
  }

  const fmtRate = (v) => v === null ? "—" : (v < 10 ? v.toFixed(2) : Math.round(v).toLocaleString());
  const pct = (num, den) => den ? Math.round((num / den) * 100) : null;

  function kpiCard(label, value, sub, status) {
    return `<div class="kpi-tile${status ? " kpi-" + status : ""}">
      <div class="kpi-value">${value}</div>
      <div class="kpi-label">${esc(label)}</div>
      ${sub ? `<div class="kpi-sub muted small">${esc(sub)}</div>` : ""}</div>`;
  }

  function renderAnalytics(main) {
    const openActions = state.actions.filter(a => a.status !== "Closed");
    const overdue = openActions.filter(a => daysUntil(a.due) < 0);
    const highRisks = state.risks.filter(r => r.likelihood * r.severity > 9);
    const expiredTraining = state.training.filter(t => trainingStatus(t.expires).status === "critical");
    const trainingValid = state.training.length
      ? Math.round((state.training.filter(t => trainingStatus(t.expires).status === "good").length / state.training.length) * 100)
      : null;

    // last 6 months of incidents
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
      months.push({ key: d.toISOString().slice(0, 7), label: d.toLocaleString("en", { month: "short" }) });
    }
    const incidentRows = months.map(m => ({
      label: m.label,
      value: state.incidents.filter(i => (i.date || "").slice(0, 7) === m.key).length,
      color: "var(--chart-1)"
    }));
    const actionRows = VERDA_SEED.actionStatuses.map(s => ({
      label: s, value: state.actions.filter(a => a.status === s).length, color: "var(--chart-1)"
    }));
    const riskRows = VERDA_SEED.riskBands.map(b => ({
      label: b.label,
      value: state.risks.filter(r => riskBandFor(r.likelihood * r.severity).label === b.label).length,
      color: `var(--chart-${b.status})`
    }));

    /* ---- Auto KPIs, computed from the registers ----
       Filtered to one site by default. A single rate blended across every
       client a consultant serves describes no site that exists — and a
       regulator or lender only ever asks about theirs. */
    const siteFilter = state.ui.kpiClient || "";
    const onSite = (x) => !siteFilter || x.client === siteFilter;
    const withEmployer = (fn) => (x) => onSite(x) && fn(x);

    const all = computeKpis(onSite);
    const direct = computeKpis(withEmployer((x) => (x.employerType || EMPLOYER_DIRECT) === EMPLOYER_DIRECT));
    const subs = computeKpis(withEmployer((x) => x.employerType && x.employerType !== EMPLOYER_DIRECT));
    const base = VERDA_SEED.kpiExposureBase.toLocaleString();
    const noHours = !all.hours;

    const rateRow = (key, label) => `
      <tr><th>${esc(label)}</th>
        <td class="num">${fmtRate(all[key])}</td>
        <td class="num">${fmtRate(direct[key])}</td>
        <td class="num">${fmtRate(subs[key])}</td></tr>`;

    const kpiSection = `
      <div class="card site-filter">
        <label>Site
          <select id="kpi-client">
            <option value="">All sites combined</option>
            ${state.clients.map(c => `<option value="${esc(c.name)}" ${c.name === siteFilter ? "selected" : ""}>${esc(c.name)}</option>`).join("")}
          </select>
        </label>
        <p class="muted small">${siteFilter
          ? `Showing <strong>${esc(siteFilter)}</strong> only. Rates below cover this site's hours and incidents.`
          : `Showing <strong>every site combined</strong>. A blended rate across different sites describes none of them — pick one before quoting a figure to a client or a regulator.`}</p>
      </div>
      ${noHours ? `<div class="card notice-card">
        <h3>Frequency rates need hours</h3>
        <p>No exposure hours have been recorded, so every rate below shows a dash rather than a zero.
          A zero would read as "no injuries per million hours" when what it really means is "we don't know".</p>
        <p class="small">Add hours under <a href="#/clients">Clients → Workforce &amp; hours</a>, per employer, and every rate here fills in and splits automatically.</p>
      </div>` : ""}

      <div class="kpi-grid">
        ${kpiCard("Hours worked", all.hours ? all.hours.toLocaleString() : "—", "All employers, all periods recorded")}
        ${kpiCard("Workforce", all.headcount || "—", all.headcount ? `${pct(all.female, all.headcount)}% female` : "Add a period to populate")}
        ${kpiCard("Sub-contractor share of hours", all.hours ? pct(subs.hours, all.hours) + "%" : "—",
          subs.hours ? `${subs.hours.toLocaleString()} of ${all.hours.toLocaleString()} hours` : "No sub-contractor hours recorded")}
        ${kpiCard("Fatalities", all.fatalities, "Work-related deaths recorded", all.fatalities ? "critical" : "good")}
        ${kpiCard("LTIFR", fmtRate(all.ltifr), `Lost time injuries per ${base} hours`, all.ltifr === null ? null : (all.ltifr > 0 ? "warning" : "good"))}
        ${kpiCard("TRIFR", fmtRate(all.trifr), `Recordable injuries per ${base} hours`, all.trifr === null ? null : (all.trifr > 0 ? "warning" : "good"))}
        ${kpiCard("Severity rate", fmtRate(all.severity), `Days lost per ${base} hours`)}
        ${kpiCard("Near-miss : injury ratio", all.nmratio === null ? "—" : all.nmratio.toFixed(1) + " : 1",
          "A healthy reporting culture runs high")}
      </div>

      <div class="card">
        <h3>Safety rates — own workforce against sub-contractors</h3>
        <p class="muted small">Per ${base} hours worked, calculated from the incident classification and the hours register.
          Reporting a site-wide rate without this split hides the group most often getting hurt.</p>
        <div class="table-scroll">
          <table class="table kpi-table">
            <thead><tr><th>Rate</th><th class="num">All</th><th class="num">Direct employees</th><th class="num">Sub-contractors</th></tr></thead>
            <tbody>
              ${rateRow("ltifr", "LTIFR — lost time injury frequency")}
              ${rateRow("trifr", "TRIFR — total recordable injury frequency")}
              ${rateRow("aifr", "AIFR — all injury frequency (incl. first aid)")}
              ${rateRow("severity", "Severity rate — days lost")}
              ${rateRow("nearmissrate", "Near-miss reporting rate")}
              <tr><th>Hours worked</th><td class="num">${all.hours.toLocaleString()}</td><td class="num">${direct.hours.toLocaleString()}</td><td class="num">${subs.hours.toLocaleString()}</td></tr>
              <tr><th>Recordable injuries</th><td class="num">${all.recordable}</td><td class="num">${direct.recordable}</td><td class="num">${subs.recordable}</td></tr>
              <tr><th>Days lost</th><td class="num">${all.daysLost}</td><td class="num">${direct.daysLost}</td><td class="num">${subs.daysLost}</td></tr>
            </tbody>
          </table>
        </div>
        <details class="chart-table">
          <summary>How each of these is calculated</summary>
          <div class="table-scroll">
            <table class="table"><thead><tr><th>KPI</th><th>Formula</th><th>Source register</th></tr></thead>
            <tbody>${VERDA_SEED.kpiDefinitions.map(k =>
              `<tr><td>${esc(k.name)}</td><td>${esc(k.formula)}</td><td>${esc(k.source)}</td></tr>`).join("")}</tbody></table>
          </div>
          <p class="muted small">Rates are per ${base} hours — the ILO/international convention. US OSHA practice uses 200,000 hours, which produces a number five times smaller for the same performance; never compare the two without converting.</p>
        </details>
      </div>`;

    // Incidents by classification, and by employer type — both from the register.
    const siteIncidents = state.incidents.filter(onSite);
    const classRows = VERDA_SEED.injuryClassifications
      .map(c => ({ label: c.code, values: { n: siteIncidents.filter(i => i.classification === c.code).length } }))
      .filter(r => r.values.n > 0);
    const empRows = VERDA_SEED.employerTypes
      .map(t => ({ label: t, values: { n: siteIncidents.filter(i => (i.employerType || EMPLOYER_DIRECT) === t).length } }))
      .filter(r => r.values.n > 0);

    main.appendChild(h(`
      <section>
        <h1>Analytics</h1>
        <p class="muted">Leading and lagging indicators across every module — the management view of what the records add up to.
          Every figure here is calculated from the registers; nothing on this page is typed in.</p>
        ${kpiSection}
        <div class="grid grid-2">
          <div class="card">${
            classRows.length ? groupedBarChart(classRows, [{ key: "n", label: "Incidents" }], "Incidents by classification", "Incidents")
              : `<h3>Incidents by classification</h3><p class="muted small">Log an incident and its classification appears here.</p>`}</div>
          <div class="card">${
            empRows.length ? groupedBarChart(empRows, [{ key: "n", label: "Incidents" }], "Incidents by employer type", "Incidents")
              : `<h3>Incidents by employer</h3><p class="muted small">Log an incident and the direct/sub-contractor split appears here.</p>`}</div>
        </div>
        <div class="grid grid-3">
          ${statCard("incidents", "Incidents logged", state.incidents.length, "All severities, all sites.")}
          ${statCard("actions", "Open actions", openActions.length, `${overdue.length} overdue.`, overdue.length > 0)}
          ${statCard("risk", "High / critical risks", highRisks.length, "Score above 9 on the 5×5 matrix.", highRisks.length > 0)}
        </div>
        <div class="grid grid-3">
          ${statCard("training", "Training records", state.training.length, expiredTraining.length ? `${expiredTraining.length} expired.` : "None expired.", expiredTraining.length > 0)}
          ${statCard("clients", "Compliance care plans", state.clients.length, "Active recurring clients.")}
          ${statCard("analytics", "Training currency", trainingValid === null ? "—" : trainingValid + "%", "Records currently valid.")}
        </div>
        <div class="grid grid-2">
          <div class="card"><h3>Incidents by month</h3>${barChart(incidentRows, "Incidents by month")}</div>
          <div class="card"><h3>Actions by status</h3>${barChart(actionRows, "Actions by status")}</div>
        </div>
        <div class="card"><h3>Risk profile</h3>${barChart(riskRows, "Hazards by risk band")}</div>
      </section>`));

    main.querySelector("#kpi-client").addEventListener("change", (e) => {
      state.ui.kpiClient = e.target.value;
      if (e.target.value) setCurrentClient(e.target.value);
      save();
      route();
    });
  }

  /* ============================ BOOTSTRAP ============================ */

  // Wire one top-bar control. A control missing from the page shell must never
  // take the whole app down with it: the single-file build keeps its own copy
  // of the shell, and a blank page is a far worse failure than one missing
  // switch. Returns false so the caller can log what was skipped.
  function wireControl(id, value, onChange) {
    const el = document.getElementById(id);
    if (!el) { console.warn(`Verda: control #${id} is not in this page shell — skipping.`); return false; }
    if (value !== undefined && value !== null) el.value = value;
    el.addEventListener("change", onChange);
    return true;
  }

  function init() {
    document.documentElement.setAttribute("data-theme", state.theme);

    wireControl("lang-select", state.lang, (e) => { state.lang = e.target.value; save(); buildNav(); route(); });
    wireControl("theme-select", state.theme, (e) => { applyTheme(e.target.value); buildNav(); route(); });
    wireControl("country-select", state.country || "ug", (e) => { state.country = e.target.value; save(); route(); });

    buildNav();
    renderTopbar();
    route();

    window.addEventListener("hashchange", () => { window.__verdaMapActive = false; buildNav(); route(); });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => { /* offline support best-effort */ });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
