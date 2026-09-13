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
      subcontractors: [],
      workforce: [],          // exposure hours by period, client and employer — the KPI denominator
      risks: [],
      actions: [],
      training: [],
      ui: { checklistIndustry: null },
      platformRevenue: null
    };
  }

  let state = load();
  // Saved states from before these registers existed must not crash on load.
  ["subcontractors", "workforce"].forEach(k => { if (!Array.isArray(state[k])) state[k] = []; });

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
    training: '<path d="M12 4 2.5 8.2 12 12.4l9.5-4.2L12 4Z"/><path d="M6.5 10.4V15c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.6"/><path d="M21.5 8.2v5.1"/>',
    revenue: '<path d="M3.5 20.5h17"/><path d="M6 17V9.5M11 17V5.5M16 17v-5M21 17V3.5"/><path d="M17.8 6.2 21 3.5M21 3.5h-3.4M21 3.5v3.3"/>',
    plans: '<path d="M20.5 12.7 12.8 20.4a1.7 1.7 0 0 1-2.4 0l-7-7A1.7 1.7 0 0 1 2.9 12V4.6a1.7 1.7 0 0 1 1.7-1.7H12c.45 0 .88.18 1.2.5l7.3 7.3a1.7 1.7 0 0 1 0 2.4Z"/><circle cx="7.6" cy="7.6" r="1.3"/>'
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
    { id: "revenue", group: "manage", label: () => T().revenue, render: renderRevenue },
    { id: "plans", group: "grow", label: () => T().plans, render: renderPlans },

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
    records: "people", maps: "sitemap", actions: "audit", reporting: "documents",
    esia: "wildlife", training: "training", workflows: "governance", clients: "people",
    checklists: "industry", documents: "documents", credits: "governance", revenue: "governance", plans: "revenue",
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
              <select id="rep-client">${state.clients.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}</select>
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
            const total = opening + (Number(row[t.carryForward.periodKey]) || 0);
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
      const total = opening + (Number(rows[ri][cf.periodKey]) || 0);
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
    main.querySelector("#rep-client").addEventListener("change", () => {
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
        `<tr><td colspan="7" class="muted">No reports generated yet.</td></tr>`;
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
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
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
        `<tr><td>${esc(s.project)}</td><td><span class="badge">${esc(s.status)}</span></td><td>${esc(s.date.slice(0,10))}</td></tr>`
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
      main.querySelector("#esia-output").innerHTML = card("ToR / ESIA draft (preview)", `<pre class="report-pre">${esc(text)}</pre>
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
            <select id="audit-industry">${[...new Set(VERDA_SEED.industries.map(i => i.group))].map(g => `<optgroup label="${esc(g)}">${VERDA_SEED.industries.filter(i => i.group === g).map(i => `<option value="${esc(i.id)}">${esc(i.name)}</option>`).join("")}</optgroup>`).join("")}</select>
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
        panel.querySelector("#audit-output").innerHTML = card("Audit findings (AI-assisted)", `<pre class="report-pre">${esc(text)}</pre>
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
        panel.querySelector("#ea-output").innerHTML = card("ESIA audit findings (AI-assisted)", `<pre class="report-pre">${esc(text)}</pre>
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
          <strong>${esc(tpl.name)}</strong> — ${esc(run.client) || "Unassigned"} <span class="muted small">${run.date.slice(0,10)}</span>
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
            <select id="sc-client">${state.clients.map(c => `<option>${esc(c.name)}</option>`).join("")}</select>
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
        }).join("") || `<tr><td colspan="7" class="muted">No sub-contractors registered yet. Every company that brings workers on site belongs here.</td></tr>`;
        panel.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
          state.subcontractors = state.subcontractors.filter(x => x.id !== b.dataset.del);
          save(); refresh();
        }));
      }
      refresh();
      panel.querySelector("#sc-add").addEventListener("click", () => {
        const name = panel.querySelector("#sc-name").value.trim();
        if (!name) { alert("Enter the sub-contractor's name."); return; }
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
            <label>Client / site<select id="wf-client">${state.clients.map(c => `<option>${esc(c.name)}</option>`).join("")}</select></label>
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
          `<tr><td colspan="8" class="muted">No hours recorded yet — until there are, every frequency rate shows a dash.</td></tr>`;
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
          <p class="muted small">Submissions are made in ${esc(c.reportingLanguage)}. Verify scope, fees and validity with the issuing authority: requirements turn on project type and scale.</p>
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
              `<tr><td>${esc(r.name)}</td><td>${esc(r.abbr)}</td><td>${esc(r.remit)}</td></tr>`).join("")}</tbody></table>
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

    const panels = { industry: industryPanel, permits: permitsPanel, register: registerPanel,
      hazards: hazardsPanel, training: trainingPanel, lists: listsPanel };
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
            <label>Site / client<select id="inc-client">${state.clients.map(c => `<option>${esc(c.name)}</option>`).join("")}</select></label>
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

    main.querySelector("#inc-add").addEventListener("click", () => {
      const desc = main.querySelector("#inc-desc").value.trim();
      if (!desc) { alert("Describe what happened."); return; }
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
            <label>Site / client<select id="tr-client">${state.clients.map(c => `<option>${esc(c.name)}</option>`).join("")}</select></label>
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
      }).join("") || `<tr><td colspan="8" class="muted">No training records yet.</td></tr>`;
    }
    refresh();

    main.querySelector("#tr-add").addEventListener("click", () => {
      const person = main.querySelector("#tr-person").value.trim();
      if (!person) { alert("Enter the person's name."); return; }
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

    /* ---- Auto KPIs, computed from the registers ---- */
    const all = computeKpis(null);
    const direct = computeKpis((x) => (x.employerType || EMPLOYER_DIRECT) === EMPLOYER_DIRECT);
    const subs = computeKpis((x) => x.employerType && x.employerType !== EMPLOYER_DIRECT);
    const base = VERDA_SEED.kpiExposureBase.toLocaleString();
    const noHours = !all.hours;

    const rateRow = (key, label) => `
      <tr><th>${esc(label)}</th>
        <td class="num">${fmtRate(all[key])}</td>
        <td class="num">${fmtRate(direct[key])}</td>
        <td class="num">${fmtRate(subs[key])}</td></tr>`;

    const kpiSection = `
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
    const classRows = VERDA_SEED.injuryClassifications
      .map(c => ({ label: c.code, values: { n: state.incidents.filter(i => i.classification === c.code).length } }))
      .filter(r => r.values.n > 0);
    const empRows = VERDA_SEED.employerTypes
      .map(t => ({ label: t, values: { n: state.incidents.filter(i => (i.employerType || EMPLOYER_DIRECT) === t).length } }))
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
