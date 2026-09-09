/* Verda — EHS/Compliance platform shell.
   Static, no-backend app: all data persists to localStorage in this browser.
   Sections marked "Demo" simulate a real backend flow (payments, multi-user
   auth, live AI API) so the platform can be trialled end-to-end before a
   server is built. */

(function () {
  "use strict";

  const STORE_KEY = "verda_state_v2";
  const T = () => VERDA_SEED.translations[state.lang] || VERDA_SEED.translations.en;

  function seedState() {
    return {
      lang: "en",
      theme: "forest",
      user: null,
      users: [],
      clients: JSON.parse(JSON.stringify(VERDA_SEED.clients)),
      credits: {},
      creditLedger: [],
      reports: [],
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
      incidents: [],
      risks: [],
      actions: [],
      training: [],
      ui: { checklistIndustry: null }
    };
  }

  let state = load();

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
    training: '<path d="M12 4 2.5 8.2 12 12.4l9.5-4.2L12 4Z"/><path d="M6.5 10.4V15c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.6"/><path d="M21.5 8.2v5.1"/>'
  };
  function icon(name, cls) {
    const path = ICON_PATHS[name];
    if (!path) return "";
    return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  /* ---------------------------- ILLUSTRATIONS (original flat-style SVG art, no stock photos/hotlinking) ---------------------------- */
  const ILLUS_CONTENT = {
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
    { id: "records", group: "monitor", label: () => T().records, render: renderRecords },
    { id: "maps", group: "monitor", label: () => T().maps, render: renderMaps },

    // Manage — the programmes and deliverables that follow from it
    { id: "actions", group: "manage", label: () => T().actions, render: renderActions },
    { id: "reporting", group: "manage", label: () => T().reporting, render: renderReporting },
    { id: "esia", group: "manage", label: () => T().esia, render: renderEsia },
    { id: "training", group: "manage", label: () => T().training, render: renderTraining },
    { id: "workflows", group: "manage", label: () => T().workflows, render: renderWorkflows },
    { id: "clients", group: "manage", label: () => T().clients, render: renderClients },
    { id: "checklists", group: "manage", label: () => T().checklists, render: renderChecklists },
    { id: "documents", group: "manage", label: () => T().documents, render: renderDocuments },
    { id: "credits", group: "manage", label: () => T().credits, render: renderCredits },

    // Grow — enablement, marketplace and community
    { id: "solutions", group: "grow", label: () => T().solutions, render: renderSolutions },
    { id: "resources", group: "grow", label: () => T().resources, render: renderResources },
    { id: "supplies", group: "grow", label: () => T().supplies, render: renderSupplies },
    { id: "iec", group: "grow", label: () => T().iec, render: renderIec },
    { id: "skills", group: "grow", label: () => T().skills, render: renderSkills }
  ];

  function buildNav() {
    const groups = [
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

  /* Which illustration heads each module page. Dashboard is excluded — it
     leads with the hero and the pillar gallery instead. */
  const SECTION_ILLUS = {
    analytics: "governance", incidents: "safety", risk: "safety", audits: "audit",
    records: "people", maps: "sitemap", actions: "audit", reporting: "documents",
    esia: "wildlife", training: "training", workflows: "governance", clients: "people",
    checklists: "industry", documents: "documents", credits: "governance",
    solutions: "industry", resources: "training", supplies: "supplies",
    iec: "health", skills: "training"
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
  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
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
  function today() { return new Date().toISOString().slice(0, 10); }
  function daysUntil(dateStr) {
    if (!dateStr) return null;
    return Math.round((new Date(dateStr) - new Date(today())) / 86400000);
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
  function barChart(rows, title) {
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
      <table class="table"><thead><tr><th>${title}</th><th>Count</th></tr></thead><tbody>
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
          </div>` : `<p>Signed in as <strong>${state.user.name}</strong> · ${state.user.role || ""} · ${creditBalance()} credits</p>`}
        </div>
        <div class="grid grid-3">
          ${statCard("clients", "Active Compliance Care Plans", state.clients.length, "Recurring clients under a Verda compliance care plan.")}
          ${statCard("warn", "Permits due within 60 days", permitsSoon.length, "Check Checklists → Permits for the full list.", permitsSoon.length > 0)}
          ${statCard("reporting", "Reports generated", state.reports.length, "EEIS Reporting drafts created so far.")}
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
              <div class="sector-group-title">${group}</div>
              <div class="sector-chips">
                ${VERDA_SEED.industries.filter(i => i.group === group).map(i =>
                  `<button class="sector-chip" data-sector="${i.id}">${i.name}</button>`).join("")}
              </div>
            </div>`).join("")}
        </div>
        <div class="grid grid-2">
          ${card("Upcoming site visits", `<table class="table"><thead><tr><th>Client</th><th>Industry</th><th>Next visit</th></tr></thead><tbody>${
            upcoming.map(c => `<tr><td>${c.name}</td><td>${c.industry}</td><td>${c.nextVisit}</td></tr>`).join("")
          }</tbody></table>`)}
          ${card("Quick actions", `<div class="quick-actions">
            <a class="btn" href="#/reporting">${icon("reporting")}<span>New EEIS Report</span></a>
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
            <select name="industry">${VERDA_SEED.industries.map(i => `<option value="${i.name}">${i.name}</option>`).join("")}</select>
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
      box.innerHTML = `<span class="muted small">${state.user.name}</span> <button class="btn btn-ghost" id="logout-btn">${T().logout}</button>`;
      document.getElementById("logout-btn").addEventListener("click", () => { state.user = null; save(); renderTopbar(); route(); });
    } else {
      box.innerHTML = `<button class="btn btn-ghost" id="login-btn">${T().login}</button><button class="btn btn-primary" id="signup-btn">${T().signup}</button>`;
      document.getElementById("login-btn").addEventListener("click", () => openAuthModal("login"));
      document.getElementById("signup-btn").addEventListener("click", () => openAuthModal("signup"));
    }
    updateCreditsChip();
  }

  /* ============================ EEIS REPORTING ============================ */
  function renderReporting(main) {
    // Which framework the report is built against: EEIS's own modular
    // segments, or the eight IFC Performance Standards.
    let standard = VERDA_SEED.reportStandards[0];
    const segsFor = (std) => VERDA_SEED[std.segmentsKey];
    let segs = segsFor(standard);

    main.appendChild(h(`
      <section>
        <h1>EEIS Reporting</h1>
        <p class="muted">Build a monthly or quarterly report from modular segments — include only what's relevant to this client. Report against EEIS segments or the IFC Performance Standards.</p>
        <div class="card">
          <label>Reporting standard
            <select id="rep-standard">${VERDA_SEED.reportStandards.map(s => `<option value="${s.id}">${s.name}</option>`).join("")}</select>
          </label>
          <label>Client
            <select id="rep-client">${state.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
          </label>
          <label>Reporting period<input id="rep-period" placeholder="e.g. Q3 2026 / September 2026" /></label>
          <fieldset class="segments">
            <legend>Segments to include</legend>
            <div id="seg-toggles"></div>
          </fieldset>
          <div id="seg-forms"></div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="gen-report">Generate with AI Assist (${VERDA_SEED.creditCosts.aiDraft} credits)</button>
          </div>
        </div>
        <div id="report-output"></div>
        <div class="card">
          <h3>Past reports</h3>
          <table class="table"><thead><tr><th>Client</th><th>Standard</th><th>Period</th><th>Segments</th><th>Generated</th><th></th></tr></thead>
          <tbody id="reports-list"></tbody></table>
        </div>
      </section>
    `));

    function renderSegForms() {
      const checked = Array.from(main.querySelectorAll(".seg-check:checked")).map(c => c.value);
      const container = main.querySelector("#seg-forms");
      container.innerHTML = checked.map(id => {
        const s = segs.find(x => x.id === id);
        return `<div class="seg-form" data-seg="${id}">
          <h4>${s.label}</h4>
          <textarea data-field="notes" placeholder="Notes / narrative for this ${standard.id === "ifc" ? "Performance Standard" : "segment"} this period..."></textarea>
        </div>`;
      }).join("") || `<p class="muted">Select at least one segment above.</p>`;
    }

    function renderSegToggles() {
      main.querySelector("#seg-toggles").innerHTML = segs.map(s =>
        `<label class="seg-toggle"><input type="checkbox" class="seg-check" value="${s.id}" checked /> ${s.label} <span class="muted small">— ${s.hint}</span></label>`
      ).join("");
      main.querySelectorAll(".seg-check").forEach(cb => cb.addEventListener("change", renderSegForms));
      renderSegForms();
    }
    renderSegToggles();

    main.querySelector("#rep-standard").addEventListener("change", (e) => {
      standard = VERDA_SEED.reportStandards.find(s => s.id === e.target.value);
      segs = segsFor(standard);
      renderSegToggles();
    });

    function refreshList() {
      main.querySelector("#reports-list").innerHTML = state.reports.slice().reverse().map(r => `
        <tr><td>${r.clientName}</td><td>${statusBadge(r.standardName || "EEIS", r.standard === "ifc" ? "serious" : "good")}</td>
        <td>${r.period}</td><td>${r.segments.length}</td><td>${r.date.slice(0,10)}</td>
        <td><button class="btn btn-ghost btn-sm" data-dl="${r.id}">Download</button></td></tr>`).join("") ||
        `<tr><td colspan="6" class="muted">No reports generated yet.</td></tr>`;
      main.querySelectorAll("[data-dl]").forEach(btn => btn.addEventListener("click", () => {
        const r = state.reports.find(x => x.id === btn.dataset.dl);
        const prefix = r.standard === "ifc" ? "IFC-PS-Report" : "EEIS-Reporting";
        downloadText(`${prefix}-${r.clientName.replace(/\s+/g,"_")}-${r.period.replace(/\s+/g,"_")}.txt`, r.text);
      }));
    }
    refreshList();

    main.querySelector("#gen-report").addEventListener("click", () => {
      const clientId = main.querySelector("#rep-client").value;
      const client = state.clients.find(c => c.id === clientId);
      const period = main.querySelector("#rep-period").value.trim() || "Current period";
      const segments = Array.from(main.querySelectorAll(".seg-check:checked")).map(c => c.value);
      if (!segments.length) { alert("Select at least one segment."); return; }
      if (!spendCredits(VERDA_SEED.creditCosts.aiDraft, "EEIS Reporting AI draft")) return;
      const segmentData = {};
      segments.forEach(id => {
        const notes = main.querySelector(`.seg-form[data-seg="${id}"] [data-field="notes"]`).value;
        segmentData[id] = { notes };
      });
      const text = VerdaAI.generateAIDraft({
        clientName: client.name, period, segments, segmentData,
        standardTitle: standard.title, segmentDefs: segs
      });
      const rec = {
        id: uid("rep"), clientName: client.name, period, segments, text,
        standard: standard.id, standardName: standard.id === "ifc" ? "IFC PS" : "EEIS",
        date: new Date().toISOString()
      };
      state.reports.push(rec);
      save();
      main.querySelector("#report-output").innerHTML = card("Generated report (preview)", `<pre class="report-pre">${text}</pre>
        <div class="modal-actions"><button class="btn btn-primary" id="dl-now">Download .txt</button></div>`);
      main.querySelector("#dl-now").addEventListener("click", () =>
        downloadText(`${standard.id === "ifc" ? "IFC-PS-Report" : "EEIS-Reporting"}-${client.name.replace(/\s+/g,"_")}.txt`, text));
      renderTopbar();
      refreshList();
    });
  }

  /* ============================ ToR & ESIA ============================ */
  function renderEsia(main) {
    main.appendChild(h(`
      <section>
        <h1>ToR & ESIA Reporting</h1>
        <p class="muted">Structured input following standard Terms of Reference / ESIA report structure. Draft with AI Assist, then submit for EEIS processing using credits.</p>
        <div class="card">
          <label>Project name<input id="esia-project" /></label>
          <div id="esia-sections">
            ${VERDA_SEED.esiaSections.map(s => `
              <div class="seg-form">
                <h4>${s.title}</h4>
                <textarea data-esia="${s.id}" placeholder="Enter content for this section..."></textarea>
              </div>`).join("")}
          </div>
          <div class="modal-actions">
            <button class="btn" id="esia-draft">Generate Draft with AI Assist</button>
            <button class="btn btn-primary" id="esia-submit">Submit for ESIA Processing (${VERDA_SEED.creditCosts.esiaSubmit} credits)</button>
          </div>
        </div>
        <div id="esia-output"></div>
        <div class="card">
          <h3>Submissions</h3>
          <table class="table"><thead><tr><th>Project</th><th>Status</th><th>Submitted</th></tr></thead>
            <tbody id="esia-subs"></tbody></table>
        </div>
      </section>
    `));

    function refreshSubs() {
      main.querySelector("#esia-subs").innerHTML = state.esiaSubmissions.slice().reverse().map(s =>
        `<tr><td>${s.project}</td><td><span class="badge">${s.status}</span></td><td>${s.date.slice(0,10)}</td></tr>`
      ).join("") || `<tr><td colspan="3" class="muted">No submissions yet.</td></tr>`;
    }
    refreshSubs();

    function collectSections() {
      return VERDA_SEED.esiaSections.map(s => ({ title: s.title, text: main.querySelector(`[data-esia="${s.id}"]`).value }));
    }

    main.querySelector("#esia-draft").addEventListener("click", () => {
      const projectName = main.querySelector("#esia-project").value.trim() || "Untitled project";
      const text = VerdaAI.generateEsiaDraft({ projectName, sections: collectSections() });
      const rec = { id: uid("esia"), project: projectName, text, date: new Date().toISOString() };
      state.esiaDrafts.push(rec); save();
      main.querySelector("#esia-output").innerHTML = card("ToR / ESIA draft (preview)", `<pre class="report-pre">${text}</pre>
        <div class="modal-actions"><button class="btn btn-primary" id="esia-dl">Download .txt</button></div>`);
      main.querySelector("#esia-dl").addEventListener("click", () => downloadText(`ESIA-${projectName.replace(/\s+/g,"_")}.txt`, text));
    });

    main.querySelector("#esia-submit").addEventListener("click", () => {
      const projectName = main.querySelector("#esia-project").value.trim() || "Untitled project";
      if (!spendCredits(VERDA_SEED.creditCosts.esiaSubmit, "ESIA processing submission")) return;
      state.esiaSubmissions.push({ id: uid("sub"), project: projectName, status: "Submitted for EEIS Review", date: new Date().toISOString(), sections: collectSections() });
      save(); renderTopbar(); refreshSubs();
      alert("Submitted. This is a demo queue — connect a backend workflow to route submissions to EEIS reviewers.");
    });
  }

  /* ============================ AUDITS ============================ */
  function renderAudits(main) {
    main.appendChild(h(`
      <section>
        <h1>Audits</h1>
        <div class="tabs">
          <button class="tab-btn active" data-tab="ehs">Auto EHS Audit</button>
          <button class="tab-btn" data-tab="esia">ESIA Audit</button>
        </div>
        <div id="audit-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#audit-panel");

    function ehsPanel() {
      panel.innerHTML = `
        <div class="card">
          <label>Industry checklist
            <select id="audit-industry">${VERDA_SEED.industries.map(i => `<option value="${i.id}">${i.name}</option>`).join("")}</select>
          </label>
          <div id="audit-items"></div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="audit-ai">Generate AI Findings Summary (${VERDA_SEED.creditCosts.auditAiSummary} credits)</button>
          </div>
        </div>
        <div id="audit-output"></div>`;
      function loadItems() {
        const ind = VERDA_SEED.industries.find(i => i.id === panel.querySelector("#audit-industry").value);
        panel.querySelector("#audit-items").innerHTML = ind.checklist.map((item, idx) => `
          <div class="audit-row">
            <div>${item}</div>
            <select data-idx="${idx}" class="audit-status">
              <option>Compliant</option><option>Non-Compliant</option><option>N/A</option>
            </select>
            <input class="audit-note" data-idx="${idx}" placeholder="Note (optional)" />
          </div>`).join("");
      }
      loadItems();
      panel.querySelector("#audit-industry").addEventListener("change", loadItems);
      panel.querySelector("#audit-ai").addEventListener("click", () => {
        const ind = VERDA_SEED.industries.find(i => i.id === panel.querySelector("#audit-industry").value);
        const findings = ind.checklist.map((item, idx) => ({
          item, status: panel.querySelectorAll(".audit-status")[idx].value,
          note: panel.querySelectorAll(".audit-note")[idx].value
        }));
        if (!spendCredits(VERDA_SEED.creditCosts.auditAiSummary, "Auto EHS audit AI summary")) return;
        const text = VerdaAI.generateAuditSummary({ industry: ind.name, findings });
        state.audits.push({ id: uid("aud"), type: "EHS", industry: ind.name, text, date: new Date().toISOString() });
        save(); renderTopbar();
        panel.querySelector("#audit-output").innerHTML = card("Audit findings (AI-assisted)", `<pre class="report-pre">${text}</pre>
          <div class="modal-actions"><button class="btn btn-primary" id="audit-dl">Download .txt</button></div>`);
        panel.querySelector("#audit-dl").addEventListener("click", () => downloadText(`EHS-Audit-${ind.name.replace(/\s+/g,"_")}.txt`, text));
      });
    }

    function esiaAuditPanel() {
      panel.innerHTML = `
        <div class="card">
          <p class="muted">Audit site performance against ESMP commitments. Add each commitment and its current status.</p>
          <div id="esia-audit-items"><div class="audit-row"><input class="ea-item" placeholder="ESMP commitment, e.g. 'Quarterly effluent testing'" />
            <select class="ea-status"><option>Compliant</option><option>Non-Compliant</option><option>N/A</option></select>
            <input class="ea-note" placeholder="Note (optional)" /></div></div>
          <button class="btn btn-ghost btn-sm" id="ea-add-row">+ Add commitment</button>
          <div class="modal-actions">
            <button class="btn btn-primary" id="ea-ai">Generate AI Findings Summary (${VERDA_SEED.creditCosts.auditAiSummary} credits)</button>
          </div>
        </div>
        <div id="ea-output"></div>`;
      panel.querySelector("#ea-add-row").addEventListener("click", () => {
        panel.querySelector("#esia-audit-items").insertAdjacentHTML("beforeend",
          `<div class="audit-row"><input class="ea-item" placeholder="ESMP commitment" />
            <select class="ea-status"><option>Compliant</option><option>Non-Compliant</option><option>N/A</option></select>
            <input class="ea-note" placeholder="Note (optional)" /></div>`);
      });
      panel.querySelector("#ea-ai").addEventListener("click", () => {
        const items = Array.from(panel.querySelectorAll(".ea-item")).map(i => i.value).filter(Boolean);
        if (!items.length) { alert("Add at least one ESMP commitment."); return; }
        const findings = items.map((item, idx) => ({
          item, status: panel.querySelectorAll(".ea-status")[idx].value, note: panel.querySelectorAll(".ea-note")[idx].value
        }));
        if (!spendCredits(VERDA_SEED.creditCosts.auditAiSummary, "ESIA audit AI summary")) return;
        const text = VerdaAI.generateAuditSummary({ industry: "ESMP Commitments", findings });
        state.audits.push({ id: uid("aud"), type: "ESIA", industry: "ESMP", text, date: new Date().toISOString() });
        save(); renderTopbar();
        panel.querySelector("#ea-output").innerHTML = card("ESIA audit findings (AI-assisted)", `<pre class="report-pre">${text}</pre>
          <div class="modal-actions"><button class="btn btn-primary" id="ea-dl">Download .txt</button></div>`);
        panel.querySelector("#ea-dl").addEventListener("click", () => downloadText("ESIA-Audit.txt", text));
      });
    }

    ehsPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      btn.dataset.tab === "ehs" ? ehsPanel() : esiaAuditPanel();
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
            <select id="rec-client">${state.clients.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}</select>
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
          ${r.photo ? `<img src="${r.photo}" alt="" />` : `<div class="record-noimg">No photo</div>`}
          <div class="record-body">
            <span class="badge">${r.category}</span>
            <p>${r.desc}</p>
            <p class="muted small">${r.client} · ${r.date.slice(0,10)}</p>
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

  /* ============================ MAPS ============================ */
  function renderMaps(main) {
    main.appendChild(h(`
      <section>
        <h1>Maps & Site Visits</h1>
        <p class="muted">Client site locations on an ArcGIS (Esri) basemap — colour follows your selected theme.</p>
        <div class="card"><div id="verda-map" style="height:420px;border-radius:12px;overflow:hidden;"></div></div>
        <div class="card">
          <h3>Add / edit site coordinates</h3>
          <table class="table"><thead><tr><th>Client</th><th>Lat</th><th>Lng</th><th></th></tr></thead>
          <tbody id="coord-rows">
            ${state.clients.map(c => `<tr>
              <td>${c.name}</td>
              <td><input class="coord-lat" data-id="${c.id}" value="${c.lat ?? ""}" placeholder="e.g. 0.3476" /></td>
              <td><input class="coord-lng" data-id="${c.id}" value="${c.lng ?? ""}" placeholder="e.g. 32.5825" /></td>
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

  /* ============================ WORKFLOWS ============================ */
  function renderWorkflows(main) {
    main.appendChild(h(`
      <section>
        <h1>Workflows</h1>
        <p class="muted">Predefined workflows for HR, Environment, and Safety Administration — map each step to your applicable national OSH/Environment Act obligations.</p>
        <div class="grid grid-3" id="wf-templates">
          ${VERDA_SEED.workflowTemplates.map(w => `
            <div class="card">
              <h3>${w.name}</h3>
              <p class="muted small">${w.area}</p>
              <button class="btn btn-primary" data-start="${w.id}">Start a run</button>
            </div>`).join("")}
        </div>
        <div class="card">
          <h3>Active workflow runs</h3>
          <div id="wf-runs"></div>
        </div>
      </section>
    `));
    function refreshRuns() {
      main.querySelector("#wf-runs").innerHTML = state.workflowRuns.slice().reverse().map(run => {
        const tpl = VERDA_SEED.workflowTemplates.find(t => t.id === run.templateId);
        return `<div class="wf-run">
          <strong>${tpl.name}</strong> — ${run.client || "Unassigned"} <span class="muted small">${run.date.slice(0,10)}</span>
          ${tpl.steps.map((s, i) => `<label class="seg-toggle"><input type="checkbox" class="wf-step" data-run="${run.id}" data-idx="${i}" ${run.done[i] ? "checked" : ""}/> ${s}</label>`).join("")}
        </div>`;
      }).join("") || `<p class="muted">No workflow runs yet — start one above.</p>`;
      main.querySelectorAll(".wf-step").forEach(cb => cb.addEventListener("change", () => {
        const run = state.workflowRuns.find(r => r.id === cb.dataset.run);
        run.done[parseInt(cb.dataset.idx, 10)] = cb.checked;
        save();
      }));
    }
    refreshRuns();
    main.querySelectorAll("[data-start]").forEach(btn => btn.addEventListener("click", () => {
      const tpl = VERDA_SEED.workflowTemplates.find(t => t.id === btn.dataset.start);
      const client = prompt("Client / site for this workflow run (optional):", "") || "";
      state.workflowRuns.push({ id: uid("run"), templateId: tpl.id, client, done: tpl.steps.map(() => false), date: new Date().toISOString() });
      save(); refreshRuns();
    }));
  }

  /* ============================ CLIENTS / CARE PLANS ============================ */
  function renderClients(main) {
    main.appendChild(h(`
      <section>
        <h1>Clients & Compliance Care Plans</h1>
        <p class="muted">A Compliance Care Plan is Verda's recurring monitoring engagement — the fixed-fee alternative to a one-off ESIA/ESMP project (formerly called a "retainer").</p>
        <div class="card">
          <h3>Add a client</h3>
          <div class="form-row">
            <input id="cl-name" placeholder="Client name" />
            <select id="cl-industry">${VERDA_SEED.industries.map(i => `<option>${i.name}</option>`).join("")}</select>
            <input id="cl-site" placeholder="Site" />
            <select id="cl-plan"><option>Monthly</option><option>Quarterly</option></select>
            <input id="cl-nextvisit" type="date" />
            <input id="cl-permit" type="date" />
            <button class="btn btn-primary" id="cl-add">Add</button>
          </div>
        </div>
        <table class="table">
          <thead><tr><th>Client</th><th>Industry</th><th>Site</th><th>Care Plan</th><th>Next visit</th><th>Permit expiry</th><th>Status</th></tr></thead>
          <tbody id="cl-rows"></tbody>
        </table>
      </section>
    `));
    function refresh() {
      main.querySelector("#cl-rows").innerHTML = state.clients.map(c => `
        <tr><td>${c.name}</td><td>${c.industry}</td><td>${c.site}</td><td>${c.plan}</td><td>${c.nextVisit}</td><td>${c.permitExpiry}</td><td><span class="badge">${c.status}</span></td></tr>
      `).join("");
    }
    refresh();
    main.querySelector("#cl-add").addEventListener("click", () => {
      const name = main.querySelector("#cl-name").value.trim();
      if (!name) { alert("Enter a client name."); return; }
      state.clients.push({
        id: uid("c"), name, industry: main.querySelector("#cl-industry").value, site: main.querySelector("#cl-site").value,
        plan: main.querySelector("#cl-plan").value, nextVisit: main.querySelector("#cl-nextvisit").value || "TBD",
        permitExpiry: main.querySelector("#cl-permit").value || "TBD", status: "Active"
      });
      save(); refresh();
      main.querySelector("#cl-name").value = ""; main.querySelector("#cl-site").value = "";
    });
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
    main.appendChild(h(`
      <section>
        <h1>Checklists</h1>
        <div class="tabs">
          <button class="tab-btn active" data-tab="industry">By industry</button>
          <button class="tab-btn" data-tab="permits">EHS permits (all industries)</button>
        </div>
        <div id="checklist-panel"></div>
      </section>
    `));
    const panel = main.querySelector("#checklist-panel");
    function industryPanel() {
      panel.innerHTML = `
        <label>Industry<select id="chk-industry">${VERDA_SEED.industries.map(i =>
          `<option value="${i.id}" ${state.ui && state.ui.checklistIndustry === i.id ? "selected" : ""}>${i.name}</option>`).join("")}</select></label>
        <div id="chk-items"></div>
        <button class="btn" id="chk-download">Download checklist</button>`;
      function load() {
        const ind = VERDA_SEED.industries.find(i => i.id === panel.querySelector("#chk-industry").value);
        panel.querySelector("#chk-items").innerHTML = `<ul class="checklist">${ind.checklist.map(i => `<li><label><input type="checkbox"/> ${i}</label></li>`).join("")}</ul>`;
      }
      load();
      panel.querySelector("#chk-industry").addEventListener("change", load);
      panel.querySelector("#chk-download").addEventListener("click", () => {
        const ind = VERDA_SEED.industries.find(i => i.id === panel.querySelector("#chk-industry").value);
        downloadText(`Checklist-${ind.name.replace(/\s+/g,"_")}.txt`, `${ind.name.toUpperCase()} COMPLIANCE CHECKLIST\n\n` + ind.checklist.map(i => `[ ] ${i}`).join("\n"));
      });
    }
    function permitsPanel() {
      panel.innerHTML = `<p class="muted small">Commonly required across industries — verify current requirements with your national regulator (e.g. NEMA).</p>
        <ul class="checklist">${VERDA_SEED.permitsChecklist.map(p => `<li><label><input type="checkbox"/> ${p}</label></li>`).join("")}</ul>
        <button class="btn" id="permits-download">Download permits checklist</button>`;
      panel.querySelector("#permits-download").addEventListener("click", () =>
        downloadText("EHS-Permits-Checklist.txt", "EHS PERMITS CHECKLIST (ALL INDUSTRIES)\n\n" + VERDA_SEED.permitsChecklist.map(p => `[ ] ${p}`).join("\n")));
    }
    industryPanel();
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      btn.dataset.tab === "industry" ? industryPanel() : permitsPanel();
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
            <li>EEIS Reporting AI draft — ${VERDA_SEED.creditCosts.aiDraft} credits</li>
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
        .map(t => `<tr><td>${t.date.slice(0,10)}</td><td>${t.reason}</td><td>${t.amount > 0 ? "+" : ""}${t.amount}</td></tr>`).join("")
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
          <li>Build a report in EEIS Reporting — toggle only the segments you need.</li>
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
        panel.querySelector("#ev-list").innerHTML = state.events.map(e => card(e.title, `<p>${e.desc}</p><p class="muted small">${e.date}</p>`)).join("");
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
          card(p.author, `<p>${p.text}</p><p class="muted small">${p.date.slice(0,10)}</p>`)).join("");
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
            <select id="sp-cat">${state.supplies.map(c => `<option>${c.category}</option>`).join("")}</select>
            <input id="sp-item" placeholder="Item name" />
            <button class="btn btn-primary" id="sp-add">Add</button>
          </div>
        </div>
      </section>
    `));
    function refresh() {
      main.querySelector("#supply-list").innerHTML = state.supplies.map(c => card(c.category, `<ul class="checklist">${c.items.map(i => `<li>${i}</li>`).join("")}</ul>`)).join("");
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
            <label>Site / client<select id="inc-client">${state.clients.map(c => `<option>${c.name}</option>`).join("")}</select></label>
            <label>Type<select id="inc-type">${S.incidentTypes.map(t => `<option>${t}</option>`).join("")}</select></label>
            <label>Severity<select id="inc-sev">${S.incidentSeverities.map(t => `<option>${t}</option>`).join("")}</select></label>
          </div>
          <label>What happened<textarea id="inc-desc" placeholder="Describe the event, who was involved, and the immediate action taken..."></textarea></label>
          <button class="btn btn-primary" id="inc-add">${icon("incidents")}<span>Log incident</span></button>
        </div>
        <div class="card">
          <h3>Incident register</h3>
          <table class="table"><thead><tr><th>Date</th><th>Site</th><th>Type</th><th>Severity</th><th>Status</th><th></th></tr></thead>
          <tbody id="inc-rows"></tbody></table>
        </div>
      </section>`));

    const SEV_STATUS = { Low: "good", Medium: "warning", High: "serious", Critical: "critical" };
    function refresh() {
      main.querySelector("#inc-rows").innerHTML = state.incidents.slice().reverse().map(i => `
        <tr>
          <td>${i.date}</td><td>${i.client}</td><td>${i.type}</td>
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

    main.querySelector("#inc-add").addEventListener("click", () => {
      const desc = main.querySelector("#inc-desc").value.trim();
      if (!desc) { alert("Describe what happened."); return; }
      state.incidents.push({
        id: uid("inc"), date: main.querySelector("#inc-date").value || today(),
        client: main.querySelector("#inc-client").value, type: main.querySelector("#inc-type").value,
        severity: main.querySelector("#inc-sev").value, desc, status: "Open"
      });
      save();
      main.querySelector("#inc-desc").value = "";
      refresh();
    });
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
        return `<tr><td>${r.hazard}</td><td>${r.area}</td><td>${score}</td>
          <td>${statusBadge(band.label, band.status)}</td><td>${r.controls || "—"}</td><td>${r.owner || "—"}</td></tr>`;
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
          <td>${a.title}</td><td>${a.source}</td><td>${a.owner || "—"}</td>
          <td>${a.due || "—"} ${overdue ? statusBadge("Overdue", "critical") : ""}</td>
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
            <label>Site / client<select id="tr-client">${state.clients.map(c => `<option>${c.name}</option>`).join("")}</select></label>
            <label>Course<select id="tr-course">${S.trainingCourses.map(c => `<option value="${c.name}">${c.name} (${c.validityMonths} mo)</option>`).join("")}</select></label>
            <label>Completed<input id="tr-date" type="date" value="${today()}" /></label>
          </div>
          <button class="btn btn-primary" id="tr-add">${icon("training")}<span>Add record</span></button>
        </div>
        <div class="card">
          <h3>Competency matrix</h3>
          <table class="table"><thead><tr><th>Person</th><th>Site</th><th>Course</th><th>Completed</th><th>Expires</th><th>Status</th></tr></thead>
          <tbody id="tr-rows"></tbody></table>
        </div>
      </section>`));

    function refresh() {
      main.querySelector("#tr-rows").innerHTML = state.training.slice().reverse().map(t => {
        const st = trainingStatus(t.expires);
        return `<tr><td>${t.person}</td><td>${t.client}</td><td>${t.course}</td>
          <td>${t.completed}</td><td>${t.expires}</td><td>${statusBadge(st.label, st.status)}</td></tr>`;
      }).join("") || `<tr><td colspan="6" class="muted">No training records yet.</td></tr>`;
    }
    refresh();

    main.querySelector("#tr-add").addEventListener("click", () => {
      const person = main.querySelector("#tr-person").value.trim();
      if (!person) { alert("Enter the person's name."); return; }
      const courseName = main.querySelector("#tr-course").value;
      const course = S.trainingCourses.find(c => c.name === courseName);
      const completed = main.querySelector("#tr-date").value || today();
      state.training.push({
        id: uid("tr"), person, client: main.querySelector("#tr-client").value,
        course: courseName, completed, expires: addMonths(completed, course.validityMonths)
      });
      save();
      main.querySelector("#tr-person").value = "";
      refresh();
    });
  }

  /* ============================ ANALYTICS ============================ */
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

    main.appendChild(h(`
      <section>
        <h1>Analytics</h1>
        <p class="muted">Leading and lagging indicators across every module — the management view of what the records add up to.</p>
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
  }

  /* ============================ BOOTSTRAP ============================ */
  function init() {
    document.documentElement.setAttribute("data-theme", state.theme);
    document.getElementById("lang-select").value = state.lang;
    document.getElementById("theme-select").value = state.theme;
    buildNav();
    renderTopbar();
    route();

    window.addEventListener("hashchange", () => { window.__verdaMapActive = false; buildNav(); route(); });
    document.getElementById("lang-select").addEventListener("change", (e) => {
      state.lang = e.target.value; save(); buildNav(); route();
    });
    document.getElementById("theme-select").addEventListener("change", (e) => {
      applyTheme(e.target.value); buildNav(); route();
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => { /* offline support best-effort */ });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
