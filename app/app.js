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
      workflowRuns: []
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
    { id: "dashboard", group: "monitor", label: () => T().dashboard, render: renderDashboard },
    { id: "reporting", group: "monitor", label: () => T().reporting, render: renderReporting },
    { id: "esia", group: "monitor", label: () => T().esia, render: renderEsia },
    { id: "audits", group: "monitor", label: () => T().audits, render: renderAudits },
    { id: "records", group: "monitor", label: () => T().records, render: renderRecords },
    { id: "maps", group: "monitor", label: () => T().maps, render: renderMaps },
    { id: "workflows", group: "monitor", label: () => T().workflows, render: renderWorkflows },

    { id: "clients", group: "manage", label: () => T().clients, render: renderClients },
    { id: "documents", group: "manage", label: () => T().documents, render: renderDocuments },
    { id: "checklists", group: "manage", label: () => T().checklists, render: renderChecklists },
    { id: "credits", group: "manage", label: () => T().credits, render: renderCredits },
    { id: "skills", group: "manage", label: () => T().skills, render: renderSkills },

    { id: "resources", group: "grow", label: () => T().resources, render: renderResources },
    { id: "supplies", group: "grow", label: () => T().supplies, render: renderSupplies },
    { id: "iec", group: "grow", label: () => T().iec, render: renderIec },
    { id: "solutions", group: "grow", label: () => T().solutions, render: renderSolutions }
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
        ${SECTIONS.filter(s => s.group === g.id).map(s => `<a href="#/${s.id}" class="nav-item" data-id="${s.id}">${s.label()}</a>`).join("")}
      </div>`).join("");
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
    document.getElementById("topbar-credits").textContent = state.user ? `${creditBalance()} credits` : "";
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
          ${card("Active Compliance Care Plans", `<div class="stat">${state.clients.length}</div><p class="muted">Recurring clients under a Verda compliance care plan.</p>`)}
          ${card("Permits due within 60 days", `<div class="stat ${permitsSoon.length ? 'warn' : ''}">${permitsSoon.length}</div><p class="muted">Check Checklists → Permits for the full list.</p>`)}
          ${card("Reports generated", `<div class="stat">${state.reports.length}</div><p class="muted">EEIS Reporting drafts created so far.</p>`)}
        </div>
        <div class="grid grid-2">
          ${card("Upcoming site visits", `<table class="table"><thead><tr><th>Client</th><th>Industry</th><th>Next visit</th></tr></thead><tbody>${
            upcoming.map(c => `<tr><td>${c.name}</td><td>${c.industry}</td><td>${c.nextVisit}</td></tr>`).join("")
          }</tbody></table>`)}
          ${card("Quick actions", `<div class="quick-actions">
            <a class="btn" href="#/reporting">+ New EEIS Report</a>
            <a class="btn" href="#/esia">+ New ToR / ESIA Draft</a>
            <a class="btn" href="#/audits">+ Run an Audit</a>
            <a class="btn" href="#/records">+ Add a Record / Photo</a>
          </div>`)}
        </div>
      </section>
    `));
    const su = document.getElementById("hero-signup"), li = document.getElementById("hero-login");
    if (su) su.addEventListener("click", (e) => { e.preventDefault(); openAuthModal("signup"); });
    if (li) li.addEventListener("click", (e) => { e.preventDefault(); openAuthModal("login"); });
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
            <select name="role">${VERDA_SEED.solutionsByRole.map(r => `<option>${r}</option>`).join("")}</select>
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
    document.getElementById("topbar-credits").textContent = state.user ? `${creditBalance()} credits` : "";
  }

  /* ============================ EEIS REPORTING ============================ */
  function renderReporting(main) {
    const segs = VERDA_SEED.reportSegments;
    main.appendChild(h(`
      <section>
        <h1>EEIS Reporting</h1>
        <p class="muted">Build a monthly or quarterly report from modular segments — include only what's relevant to this client.</p>
        <div class="card">
          <label>Client
            <select id="rep-client">${state.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
          </label>
          <label>Reporting period<input id="rep-period" placeholder="e.g. Q3 2026 / September 2026" /></label>
          <fieldset class="segments">
            <legend>Segments to include</legend>
            ${segs.map(s => `<label class="seg-toggle"><input type="checkbox" class="seg-check" value="${s.id}" checked /> ${s.label} <span class="muted small">— ${s.hint}</span></label>`).join("")}
          </fieldset>
          <div id="seg-forms"></div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="gen-report">Generate with AI Assist (${VERDA_SEED.creditCosts.aiDraft} credits)</button>
          </div>
        </div>
        <div id="report-output"></div>
        <div class="card">
          <h3>Past reports</h3>
          <table class="table"><thead><tr><th>Client</th><th>Period</th><th>Segments</th><th>Generated</th><th></th></tr></thead>
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
          <textarea data-field="notes" placeholder="Notes / narrative for ${s.label.toLowerCase()} this period..."></textarea>
        </div>`;
      }).join("") || `<p class="muted">Select at least one segment above.</p>`;
    }
    renderSegForms();
    main.querySelectorAll(".seg-check").forEach(cb => cb.addEventListener("change", renderSegForms));

    function refreshList() {
      main.querySelector("#reports-list").innerHTML = state.reports.slice().reverse().map(r => `
        <tr><td>${r.clientName}</td><td>${r.period}</td><td>${r.segments.join(", ")}</td><td>${r.date.slice(0,10)}</td>
        <td><button class="btn btn-ghost btn-sm" data-dl="${r.id}">Download</button></td></tr>`).join("") ||
        `<tr><td colspan="5" class="muted">No reports generated yet.</td></tr>`;
      main.querySelectorAll("[data-dl]").forEach(btn => btn.addEventListener("click", () => {
        const r = state.reports.find(x => x.id === btn.dataset.dl);
        downloadText(`EEIS-Reporting-${r.clientName.replace(/\s+/g,"_")}-${r.period.replace(/\s+/g,"_")}.txt`, r.text);
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
      const text = VerdaAI.generateAIDraft({ clientName: client.name, period, segments, segmentData });
      const rec = { id: uid("rep"), clientName: client.name, period, segments, text, date: new Date().toISOString() };
      state.reports.push(rec);
      save();
      main.querySelector("#report-output").innerHTML = card("Generated report (preview)", `<pre class="report-pre">${text}</pre>
        <div class="modal-actions"><button class="btn btn-primary" id="dl-now">Download .txt</button></div>`);
      main.querySelector("#dl-now").addEventListener("click", () => downloadText(`EEIS-Reporting-${client.name.replace(/\s+/g,"_")}.txt`, text));
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
        <label>Industry<select id="chk-industry">${VERDA_SEED.industries.map(i => `<option value="${i.id}">${i.name}</option>`).join("")}</select></label>
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
    main.appendChild(h(`
      <section>
        <h1>Free IEC Materials</h1>
        <p class="muted">Information, Education & Communication materials across Health, Safety, Social and Environment — free to download and print.</p>
        <div class="grid grid-2" id="iec-list"></div>
      </section>
    `));
    main.querySelector("#iec-list").innerHTML = VERDA_SEED.iecMaterials.map((m, i) =>
      card(`${m.title} <span class="badge">${m.category}</span>`, `<button class="btn" data-iec="${i}">Download</button>`)
    ).join("");
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
    function fill(list) { panel.innerHTML = list.map(x => card(x, `<a class="btn btn-ghost" href="#/dashboard">Explore →</a>`)).join(""); }
    fill(VERDA_SEED.solutionsByNeed);
    main.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      main.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      fill({ need: VERDA_SEED.solutionsByNeed, industry: VERDA_SEED.solutionsByIndustry, role: VERDA_SEED.solutionsByRole }[btn.dataset.tab]);
    }));
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
