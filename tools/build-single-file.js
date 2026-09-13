#!/usr/bin/env node
/* Build a single self-contained HTML file from app/ — for sharing Verda as one
   file (email, USB stick, an embedded preview) with no server and no separate
   assets. Run:  node tools/build-single-file.js
   Output:      dist/verda-demo.html

   The bundle differs from app/ in three deliberate ways, all because a single
   file has no origin to fetch from:
     1. No service worker registration (there is no sw.js next to it).
     2. No Leaflet/ArcGIS map — an embedded sandbox blocks third-party tiles,
        so the map panel explains that instead of showing a dead grey box.
     3. Example records are pre-seeded so Analytics opens with real charts
        rather than a wall of zeros. Every seeded row is prefixed "Example:". */

const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..", "app");
const OUT_DIR = path.join(__dirname, "..", "dist");
const read = (f) => fs.readFileSync(path.join(APP, f), "utf8");

const css = read("styles.css");
let appJs = read("app.js");
const dataJs = read("data.js");
const aiJs = read("ai.js");

// 1. no service worker in a single-file build
appJs = appJs.replace(
  /if \("serviceWorker" in navigator\) \{[\s\S]*?\n    \}/,
  "/* service worker omitted in the single-file build */"
);

// 2. the map panel explains itself instead of rendering an empty container
appJs = appJs.replace(
  "Map tiles couldn't load — check your internet connection (this pulls a public Leaflet + ArcGIS/Esri basemap over the network).",
  "Site mapping runs on Leaflet with ArcGIS/Esri basemaps. Third-party map tiles are blocked in this embedded preview — run the full app from app/index.html to see the live map."
);

// 3. example data, so the first look shows the platform working
const seedScript = `
(function seedExampleData() {
  var KEY = "verda_state_v2";
  try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }
  function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
  function daysAhead(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
  function monthsAgo(n) { var d = new Date(); d.setMonth(d.getMonth() - n); return d.toISOString().slice(0, 10); }
  function monthsAhead(n) { var d = new Date(); d.setMonth(d.getMonth() + n); return d.toISOString().slice(0, 10); }

  var state = {
    incidents: [
      { id: "inc_x1", date: monthsAgo(4), client: "Kaletex Ventures", type: "Near-miss", severity: "Medium",
        desc: "Example: pallet shifted on racking during offload; area cordoned, no injuries.", status: "Closed" },
      { id: "inc_x2", date: monthsAgo(3), client: "Cosmic Investments", type: "Environmental spill / release", severity: "High",
        desc: "Example: hydraulic hose failure on excavator released ~15L oil; spill kit deployed, soil removed.", status: "Closed" },
      { id: "inc_x3", date: monthsAgo(2), client: "Abubaker Technical", type: "First aid case", severity: "Low",
        desc: "Example: minor laceration to hand during blade change; treated on site.", status: "Closed" },
      { id: "inc_x4", date: monthsAgo(1), client: "Crested Crane Timber", type: "Near-miss", severity: "Medium",
        desc: "Example: operator bypassed guard interlock on planer; machine locked out pending retraining.", status: "Under investigation" },
      { id: "inc_x5", date: daysAgo(9), client: "Lusango Real Uganda", type: "Vehicle incident", severity: "Medium",
        desc: "Example: reversing tipper contacted site fencing; no injuries, banksman procedure reviewed.", status: "Under investigation" },
      { id: "inc_x6", date: daysAgo(3), client: "Kaletex Ventures", type: "Near-miss", severity: "Low",
        desc: "Example: unsecured cable across walkway reported by operator; rerouted same shift.", status: "Open" }
    ],
    risks: [
      { id: "risk_x1", hazard: "Example: unguarded conveyor drive", area: "Packing line", likelihood: 4, severity: 4,
        controls: "Fixed guard, LOTO procedure, pre-start check", owner: "Plant Engineer" },
      { id: "risk_x2", hazard: "Example: silica dust at crusher", area: "Quarry — crushing", likelihood: 4, severity: 3,
        controls: "Water suppression, P3 respirators, exposure monitoring", owner: "Site Manager" },
      { id: "risk_x3", hazard: "Example: working at height on silo access", area: "Silo platform", likelihood: 2, severity: 5,
        controls: "Fixed ladder cage, harness, permit to work", owner: "Safety Officer" },
      { id: "risk_x4", hazard: "Example: effluent pH excursion to drain", area: "Treatment plant", likelihood: 3, severity: 3,
        controls: "Inline pH monitoring, dosing alarm, weekly lab sample", owner: "EHS Manager" },
      { id: "risk_x5", hazard: "Example: manual handling of 25kg sacks", area: "Warehouse", likelihood: 3, severity: 2,
        controls: "Trolleys, two-person lift rule, training", owner: "Warehouse Supervisor" },
      { id: "risk_x6", hazard: "Example: reversing vehicles in yard", area: "Loading yard", likelihood: 2, severity: 2,
        controls: "One-way route, banksman, hi-vis enforcement", owner: "Logistics Lead" }
    ],
    actions: [
      { id: "act_x1", title: "Example: fit interlocked guard to planer feed", source: "Incident", owner: "Plant Engineer",
        due: daysAhead(12), priority: "High", status: "In progress", created: daysAgo(18) },
      { id: "act_x2", title: "Example: retrain packing crew on machine guarding", source: "Audit finding", owner: "Safety Officer",
        due: daysAhead(25), priority: "Medium", status: "Open", created: daysAgo(10) },
      { id: "act_x3", title: "Example: replace worn hydraulic hoses on excavator fleet", source: "Incident", owner: "Workshop Foreman",
        due: daysAgo(6), priority: "High", status: "In progress", created: daysAgo(40) },
      { id: "act_x4", title: "Example: renew effluent discharge permit", source: "Permit condition", owner: "EHS Manager",
        due: daysAhead(45), priority: "Medium", status: "Open", created: daysAgo(20) },
      { id: "act_x5", title: "Example: install dust suppression at secondary crusher", source: "Risk assessment", owner: "Site Manager",
        due: daysAhead(60), priority: "Medium", status: "Open", created: daysAgo(15) },
      { id: "act_x6", title: "Example: close out community grievance on night haulage noise", source: "Community grievance", owner: "Community Liaison",
        due: daysAgo(2), priority: "Medium", status: "In progress", created: daysAgo(30) },
      { id: "act_x7", title: "Example: replace expired first aid kit stock", source: "Inspection", owner: "Safety Officer",
        due: daysAgo(28), priority: "Low", status: "Closed", created: daysAgo(50) },
      { id: "act_x8", title: "Example: update ESMP monitoring log template", source: "Audit finding", owner: "EHS Manager",
        due: daysAgo(35), priority: "Low", status: "Closed", created: daysAgo(60) }
    ],
    training: [
      { id: "tr_x1", person: "Example: John Okello", client: "Kaletex Ventures", course: "General EHS Induction", completed: monthsAgo(4), expires: monthsAhead(8) },
      { id: "tr_x2", person: "Example: Sarah Nabirye", client: "Kaletex Ventures", course: "First Aid at Work", completed: monthsAgo(10), expires: monthsAhead(14) },
      { id: "tr_x3", person: "Example: Peter Mugisha", client: "Cosmic Investments", course: "Working at Height", completed: monthsAgo(22), expires: monthsAhead(2) },
      { id: "tr_x4", person: "Example: Grace Auma", client: "Abubaker Technical", course: "Fire Safety & Evacuation", completed: monthsAgo(11), expires: monthsAhead(1) },
      { id: "tr_x5", person: "Example: David Kato", client: "Crested Crane Timber", course: "Hazardous Chemicals / SDS Awareness", completed: monthsAgo(26), expires: monthsAgo(2) },
      { id: "tr_x6", person: "Example: Ruth Nakimuli", client: "Lusango Real Uganda", course: "Emergency Response / Spill Response", completed: monthsAgo(14), expires: monthsAgo(2) }
    ]
  };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* preview still works without it */ }
})();
`;

// The page shell is EXTRACTED from app/index.html rather than duplicated here.
// A second copy is how the single-file build silently drifts from the real app:
// a control added to index.html but missing from the bundle makes init() throw
// on a null element and the whole page renders blank.
const indexHtml = read("index.html");
const bodyMatch = indexHtml.match(/<body>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.error("build: could not find <body> in app/index.html");
  process.exit(1);
}
const body = bodyMatch[1]
  // Scripts are inlined further down, so drop the tags that load them.
  .replace(/\n?\s*<script\b[\s\S]*?<\/script>/g, "")
  // Single-file builds have no origin, so the preview footer says so.
  .replace(
    "Prototype build: AI drafting, payments and multi-user auth are simulated in-browser pending backend integration.",
    "Preview build: example records are pre-loaded and marked \u201CExample:\u201D; AI drafting, payments and multi-user sign-in are simulated in the browser pending backend integration."
  );

// Guard against the drift this extraction is meant to prevent: every element
// init() looks up must exist in the shell we are about to ship. Only init() is
// checked — everything else is rendered into the page at runtime, so its ids
// are not expected in the static shell.
const initBody = appJs.slice(appJs.indexOf("function init() {"));
const requiredIds = [...initBody.matchAll(/getElementById\("([\w-]+)"\)/g)].map((m) => m[1]);
const missing = [...new Set(requiredIds)].filter((id) => !body.includes(`id="${id}"`));
if (missing.length) {
  console.error("build: app.js looks up ids that the page shell does not contain:", missing.join(", "));
  process.exit(1);
}


const html = `<title>Verda EHS Platform</title>
<style>
${css}
</style>
${body}
<script>
${dataJs}
</script>
<script>
${aiJs}
</script>
<script>
/* Map stub — the single-file build ships without Leaflet (see header comment). */
const VerdaMap = { init: function () { return null; }, setBasemap: function () {}, setMarkers: function () {} };
</script>
<script>
${seedScript}
</script>
<script>
${appJs}
</script>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
const outFile = path.join(OUT_DIR, "verda-demo.html");
fs.writeFileSync(outFile, html);
console.log("Wrote " + outFile + " (" + Math.round(html.length / 1024) + " KB)");
