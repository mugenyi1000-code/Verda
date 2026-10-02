/* Verda design canvas — artboard generator.
 *
 * Every artboard on the canvas is a standalone .dc.html document rendered in
 * its own sandboxed, no-egress iframe, so each one has to carry the whole
 * design system with it. Writing eight copies by hand guarantees they drift,
 * so they are generated from one set of tokens here — the same tokens as
 * app/styles.css, lifted value-for-value rather than re-eyeballed.
 *
 * The iframe cannot reach fonts.googleapis.com, so IBM Plex is embedded as a
 * base64 latin subset (SIL Open Font License 1.1) instead of linked.
 *
 *   node design/build-artboards.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "artboards");
mkdirSync(out, { recursive: true });
const b64 = f => readFileSync(join(here, "fonts", f)).toString("base64");

const FONTS = `
/* IBM Plex Sans / IBM Plex Mono — latin subset, SIL Open Font License 1.1.
   Embedded because an artboard iframe has no network. */
@font-face{font-family:"IBM Plex Sans";font-style:normal;font-weight:400 700;font-display:block;
  src:url(data:font/woff2;base64,${b64("sans.woff2")}) format("woff2");}
@font-face{font-family:"IBM Plex Mono";font-style:normal;font-weight:400;font-display:block;
  src:url(data:font/woff2;base64,${b64("mono400.woff2")}) format("woff2");}
@font-face{font-family:"IBM Plex Mono";font-style:normal;font-weight:500;font-display:block;
  src:url(data:font/woff2;base64,${b64("mono500.woff2")}) format("woff2");}
@font-face{font-family:"IBM Plex Mono";font-style:normal;font-weight:600;font-display:block;
  src:url(data:font/woff2;base64,${b64("mono600.woff2")}) format("woff2");}
`;

/* ---- Tokens: copied value-for-value from app/styles.css ---- */
const TOKENS = `
:root,:root[data-theme="forest"]{--brand-1:#1a6b45;--brand-2:#2f9c63;--brand-3:#e8f4ec;--solid-1:#1a6b45;--solid-2:#2f9c63;--accent:#c2600a;--bg:#f2f5f2;--surface:#fff;--surface-2:#f7faf8;--text:#12211a;--ink-strong:#0b1611;--muted:#5a6b62;--border:#d9e4dd;--line:#e8efea;--warn:#b3372b;--ring:rgba(26,107,69,.26)}
:root[data-theme="ocean"]{--brand-1:#0a6383;--brand-2:#2496b4;--brand-3:#e5f4f9;--solid-1:#0a6383;--solid-2:#2496b4;--accent:#c2700a;--bg:#f1f6f9;--surface:#fff;--surface-2:#f5fafc;--text:#0c2230;--ink-strong:#06151f;--muted:#4d6673;--border:#d3e5ec;--line:#e6f0f4;--warn:#b3372b;--ring:rgba(10,99,131,.26)}
:root[data-theme="amber"]{--brand-1:#9c4a08;--brand-2:#d97d0c;--brand-3:#fcefdf;--solid-1:#9c4a08;--solid-2:#d97d0c;--accent:#1a6b45;--bg:#faf6f0;--surface:#fff;--surface-2:#fdfaf5;--text:#271a0c;--ink-strong:#1a1107;--muted:#76634e;--border:#eddfc9;--line:#f4ebdc;--warn:#a8301f;--ring:rgba(156,74,8,.26)}
:root[data-theme="slate"]{--brand-1:#7fb8e8;--brand-2:#a8cdf0;--brand-3:#1c2c40;--solid-1:#2f4d72;--solid-2:#3f6b96;--accent:#e8973f;--bg:#0b111a;--surface:#141d29;--surface-2:#1a2534;--text:#dde6ef;--ink-strong:#f2f6fa;--muted:#8b9cb0;--border:#27374b;--line:#1f2d3e;--warn:#f08a7d;--ring:rgba(127,184,232,.3)}
:root{--shadow-raise:0 1px 2px rgba(15,30,22,.05);--shadow-float:0 10px 28px rgba(15,30,22,.10),0 2px 8px rgba(15,30,22,.06);--shadow-modal:0 24px 60px rgba(10,20,15,.26),0 6px 18px rgba(10,20,15,.12);
  --r-control:7px;--r-card:12px;--r-feature:16px;--r-pill:999px;
  --font-ui:"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --font-data:"IBM Plex Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --sp-1:4px;--sp-2:8px;--sp-3:12px;--sp-4:16px;--sp-5:24px;--sp-6:32px;--sp-7:48px;
  --chart-1:#2a78d6;--chart-2:#eb6834;--chart-3:#1baf7a;--chart-good:#0ca30c;--chart-warning:#fab219;--chart-serious:#ec835a;--chart-critical:#d03b3b}
:root[data-theme="slate"]{--shadow-raise:0 1px 2px rgba(0,0,0,.4);--shadow-float:0 10px 28px rgba(0,0,0,.5),0 2px 8px rgba(0,0,0,.3);--chart-1:#3987e5;--chart-2:#d95926;--chart-3:#199e70}
`;

/* ---- Components: the rules the mocked screens actually use, again lifted
   from app/styles.css so the mockups and the running app cannot disagree. */
const COMPONENTS = `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:var(--font-ui);background:var(--bg);color:var(--text);font-size:14px;line-height:1.55;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,h5{color:var(--ink-strong);margin-top:0;text-wrap:balance}
h1{font-size:1.95rem;font-weight:600;letter-spacing:-.021em;line-height:1.15}
h2{font-size:1.4rem;font-weight:600;letter-spacing:-.015em;line-height:1.2}
h3{font-size:1.06rem;font-weight:600;letter-spacing:-.008em;line-height:1.3}
h4{font-size:.96rem;font-weight:600;letter-spacing:-.005em;line-height:1.35}
h5{font-size:.88rem;font-weight:600;margin:0}
p{line-height:1.6;max-width:74ch}
a{color:var(--brand-1);text-underline-offset:2px}
.mono,.num,.stat,.kpi-value,.calc-figure,.chart-value,.coord-cell,.plan-price{font-family:var(--font-data);font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
.num,.table td.num,.table th.num{text-align:right;font-variant-numeric:tabular-nums}
.muted{color:var(--muted)}
.small{font-size:.82rem}
.icon{width:18px;height:18px;flex-shrink:0}

/* topbar */
.topbar{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:var(--surface);border-bottom:1px solid var(--border)}
.brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:1.16rem;letter-spacing:-.02em;color:var(--ink-strong)}
.brand .logo{width:32px;height:32px;border-radius:9px;background:var(--solid-1);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:.95rem}
.topbar-right{display:flex;align-items:center;gap:10px}
.tsel{padding:7px 10px;border-radius:9px;border:1px solid var(--border);background:var(--surface);color:var(--text);font-size:.85rem;display:inline-flex;align-items:center;gap:7px}
.tsel::after{content:"";width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid var(--muted)}
.credits-pill{display:inline-flex;align-items:center;gap:6px;font-size:.82rem;font-weight:700;color:var(--brand-1);background:var(--brand-3);padding:6px 12px;border-radius:999px}
.credits-pill .icon{width:15px;height:15px}

/* layout */
.layout{display:flex}
.sidebar{width:258px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);padding:16px 12px}
.nav-group{margin-bottom:20px}
.nav-group-title{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);padding:4px 10px;font-weight:600}
.nav-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:9px;text-decoration:none;color:var(--text);font-size:.89rem;font-weight:500;margin:2px 0;border-left:3px solid transparent}
.nav-item .icon{opacity:.65}
.nav-item.active{background:var(--brand-3);color:var(--brand-1);font-weight:600;border-left-color:var(--brand-1)}
.nav-item.active .icon{opacity:1}
.main{flex:1;min-width:0;padding:26px 30px}

/* page header */
.page-header{display:flex;align-items:center;justify-content:space-between;gap:24px;background:linear-gradient(115deg,var(--brand-3) 0%,transparent 72%);border:1px solid var(--border);border-radius:var(--r-feature);padding:20px 24px;margin-bottom:20px}
.page-header-text h1{margin:0 0 6px}
.page-header-text p{margin:0;max-width:62ch}
.page-header-illus{width:150px;height:92px;flex-shrink:0}

/* cards */
.grid{display:grid;gap:18px;margin-bottom:20px}
.grid-2{grid-template-columns:1fr 1fr}
.grid-3{grid-template-columns:repeat(3,1fr)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-card);padding:18px 20px;margin-bottom:16px}
.card>:last-child{margin-bottom:0}
.card h3{margin-top:0}
.stat{font-size:1.85rem;font-weight:500;color:var(--ink-strong);letter-spacing:-.045em;line-height:1.1}
.stat.warn{color:var(--warn)}
.stat-card{display:flex;gap:14px;align-items:flex-start}
.stat-icon{width:42px;height:42px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--brand-3);color:var(--brand-1)}
.stat-icon-warn{background:color-mix(in srgb,var(--warn) 14%,transparent);color:var(--warn)}
.stat-icon .icon{width:21px;height:21px}
.stat-label{font-size:.78rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:2px}
.stat-body p{margin:4px 0 0}
.notice-card{border-left:3px solid var(--accent);background:var(--surface-2)}
.notice-card p{margin:6px 0 0}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:var(--r-control);border:1px solid var(--border);background:var(--surface);color:var(--text);font-family:inherit;font-size:.875rem;font-weight:500;text-decoration:none}
.btn .icon{width:17px;height:17px}
.btn-primary{background:var(--solid-1);color:#fff;border-color:var(--solid-1);font-weight:600}
.btn-ghost{background:transparent}
.btn-sm{padding:5px 11px;font-size:.79rem}
.btn-hover{background:var(--surface-2);border-color:var(--brand-2)}
.btn-focus{outline:2px solid var(--brand-2);outline-offset:2px}
.btn-disabled{opacity:.45}

/* forms */
.lbl{display:block;margin:12px 0;font-size:.8rem;font-weight:500;color:var(--muted)}
.inp{width:100%;padding:9px 11px;border-radius:var(--r-control);border:1px solid var(--border);background:var(--surface);color:var(--text);font-size:.9rem;margin-top:5px;font-family:inherit;display:block}
.inp.ph{color:var(--muted)}
.inp.sel{padding-right:26px}
.inp-focus{border-color:var(--brand-1);box-shadow:0 0 0 3px var(--ring)}
.inp-invalid{border-color:var(--warn);background:color-mix(in srgb,var(--warn) 8%,transparent)}
.sel{position:relative}
.sel::after{content:"";position:absolute;right:11px;top:calc(50% + 2px);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid var(--muted)}
.form-row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}
.form-row>*{flex:1;min-width:140px}

/* tables */
.table{width:100%;border-collapse:collapse;margin-top:10px}
.table th,.table td{text-align:left;padding:9px 12px;font-size:.865rem}
.table thead th{color:var(--muted);font-weight:600;font-size:.7rem;text-transform:uppercase;letter-spacing:.07em;background:var(--surface-2);border-bottom:1px solid var(--border);white-space:nowrap}
.table thead th:first-child{border-top-left-radius:var(--r-control)}
.table thead th:last-child{border-top-right-radius:var(--r-control)}
.table tbody tr{border-bottom:1px solid var(--line)}
.table tbody td{vertical-align:top}
.table tbody tr:last-child{border-bottom:none}
.table a{font-weight:600;text-decoration:none}
.row-overdue{background:color-mix(in srgb,var(--warn) 6%,transparent);box-shadow:inset 3px 0 0 var(--warn)}
.row-overdue td:first-child{font-weight:600}
.table-scroll{overflow-x:auto}

/* badges */
.badge{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:var(--r-pill);background:var(--brand-3);color:var(--brand-1);font-size:.72rem;font-weight:600;white-space:nowrap}
.badge::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}
.badge.badge-good{background:rgba(12,163,12,.16);color:#0a7d0a}
.badge.badge-warning{background:rgba(250,178,25,.24);color:#8a6000}
.badge.badge-serious{background:rgba(236,131,90,.24);color:#a54a22}
.badge.badge-critical{background:rgba(208,59,59,.16);color:#b02a2a}

/* tabs */
.tabs{display:inline-flex;gap:2px;margin:16px 0;flex-wrap:wrap;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-control);padding:3px}
.tab-btn{padding:7px 14px;border-radius:5px;border:1px solid transparent;background:transparent;color:var(--muted);font-family:inherit;font-size:.83rem;font-weight:500}
.tab-btn.active{background:var(--surface);color:var(--ink-strong);font-weight:600;border-color:var(--border)}

/* kpi */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.kpi-tile{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--border);border-radius:var(--r-card);padding:15px 16px 14px;display:flex;flex-direction:column;gap:2px}
.kpi-value{font-size:1.6rem;font-weight:500;letter-spacing:-.045em;color:var(--ink-strong);line-height:1.1}
.kpi-label{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-top:3px}
.kpi-sub{margin-top:3px}
.kpi-good{border-left-color:var(--chart-good)}
.kpi-warning{border-left-color:var(--chart-warning)}
.kpi-critical{border-left-color:var(--chart-critical)}
.kpi-critical .kpi-value{color:var(--warn)}

/* charts */
.chart{width:100%;max-width:560px;height:auto;display:block;margin-top:6px}
.chart-axis{stroke:var(--border);stroke-width:1}
.chart-value{font-size:13px;font-weight:500;text-anchor:middle;fill:var(--text);font-family:var(--font-data)}
.chart-label{font-size:12px;text-anchor:middle;fill:var(--muted)}
.chart-figure{margin:0;padding:2px 0 4px}
.chart-title{font-weight:700;font-size:.95rem;margin:0 0 4px;color:var(--ink-strong)}
.chart-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.8rem;color:var(--muted);margin:2px 0 6px}
.chart-legend i{display:inline-block;width:10px;height:10px;border-radius:2px}
.legend-item{display:inline-flex;align-items:center;gap:6px}
.chart-table summary{font-size:.82rem;color:var(--muted);margin-top:8px}

/* reporting */
.seg-toggle{display:grid;grid-template-columns:auto 1fr;gap:4px 9px;align-items:start;padding:7px 9px;border-radius:9px;border:1px solid transparent;margin:2px 0}
.seg-toggle-label{font-weight:600}
.seg-toggle .small{grid-column:2}
.seg-filled{border-color:var(--brand-2);background:var(--brand-3)}
.guide-box{border-left:3px solid var(--brand-2);background:var(--brand-3);border-radius:0 var(--r-control) var(--r-control) 0;padding:12px 16px;margin:10px 0 16px}
.guide-box p{margin:4px 0;font-size:.86rem}
.guide-box summary{font-size:.84rem;font-weight:600;color:var(--brand-1);margin-top:6px}
.guide-example{font-style:italic}
.seg-form h5{margin:20px 0 6px;font-size:.7rem;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);font-weight:600;padding-bottom:5px;border-bottom:1px solid var(--line)}
.report-table{border:1px solid var(--border);border-radius:var(--r-card);padding:13px 15px;margin:12px 0 18px;background:var(--surface-2)}
.report-table-head h5{margin:0 0 2px;font-size:.92rem;color:var(--text);text-transform:none;letter-spacing:0}
.entry-table th,.entry-table td{padding:5px 6px;vertical-align:middle;font-size:.8rem}
.entry-cell{padding:6px 8px;}
.entry-cell.sel{padding-right:22px;font-size:.84rem;border:1px solid var(--border);border-radius:var(--r-control);background:var(--surface);display:block}
.cell-computed{background:var(--brand-3);font-weight:700;border-color:var(--brand-2)}
.dropzone{border:1.5px dashed var(--border);border-radius:var(--r-card);padding:18px;text-align:center;background:var(--surface-2)}
.dropzone-active{border-color:var(--brand-1);background:var(--brand-3)}
.dropzone p{margin:2px 0;font-size:.86rem}
.photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;margin-top:12px}
.photo-card{margin:0;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-card);padding:8px}
.photo-card .shot{width:100%;height:130px;border-radius:7px;display:block}
.photo-card figcaption{font-size:.78rem;color:var(--muted);margin-top:5px}
.report-preview{border:1px solid var(--border);border-radius:var(--r-card);padding:22px 24px;background:var(--surface);box-shadow:var(--shadow-float)}
.report-doc h1{font-size:1.35rem;margin:0 0 12px;letter-spacing:-.015em}
.report-section h3{margin:20px 0 6px;border-bottom:2px solid var(--border);padding-bottom:5px;font-size:1rem}
.report-section h4{margin:14px 0 3px;font-size:.92rem}
.kv-table th{width:34%;color:var(--muted);font-weight:600}

/* calculators */
.calc-group{margin:26px 0 10px;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.calc-card h4{margin:0 0 4px;font-size:1rem}
.calc-result{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;padding:9px 12px;border-radius:10px;background:var(--brand-3);margin:7px 0}
.calc-figure{font-size:1.35rem;font-weight:500;color:var(--ink-strong);letter-spacing:-.04em}
.calc-unit{font-size:.84rem;font-weight:700;color:var(--muted)}
.calc-name{font-size:.84rem;color:var(--text)}
.calc-note{margin:8px 0 0;border-top:1px solid var(--border);padding-top:8px}
.calc-invalid{color:var(--warn);font-size:.86rem;font-weight:600;margin:8px 0 0}

/* workflow + audit */
.wf-run{padding:14px;border:1px solid var(--border);border-radius:12px;margin-bottom:12px;background:var(--bg)}
.wf-run-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap}
.wf-run-head h3{margin:0 0 2px}
.wf-run-meta{display:flex;align-items:center;gap:8px}
.wf-bar{height:5px;background:var(--line);border-radius:var(--r-pill);overflow:hidden;margin:12px 0 4px}
.wf-bar span{display:block;height:100%;background:var(--brand-2);border-radius:var(--r-pill)}
.audit-item{padding:10px 0;border-bottom:1px solid var(--line)}
.audit-item:last-child{border-bottom:none}
.audit-item-text{font-size:.89rem;margin-bottom:6px}
.audit-item-controls{display:grid;grid-template-columns:170px 210px 1fr;gap:8px}
.audit-item-controls .inp{margin:0;font-size:.83rem;padding:6px 9px}
.risk-matrix{border-collapse:separate;border-spacing:3px;width:100%}
.risk-matrix th{font-size:.75rem;color:var(--muted);font-weight:700;width:16%;text-align:center}
.risk-cell{text-align:center;font-weight:800;font-size:.9rem;color:#fff;border-radius:7px;height:38px}
.risk-good{background:#0ca30c}.risk-warning{background:#fab219;color:#4a3600}.risk-serious{background:#ec835a}.risk-critical{background:#d03b3b}

/* checkbox + empty state */
.cb{width:15px;height:15px;border:1px solid var(--border);border-radius:4px;background:var(--surface);display:inline-block;vertical-align:-2px}
.cb-on{background:var(--solid-1);border-color:var(--solid-1);position:relative}
.cb-on::after{content:"";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(42deg)}
.empty-state{display:flex;flex-direction:column;align-items:center;gap:10px;padding:34px 24px;text-align:center;color:var(--muted)}
.empty-state p{margin:0;max-width:46ch;font-size:.88rem}
.empty-state strong{color:var(--text);font-weight:600}

/* annotation pins — design notes, not part of the product UI */
.pin{position:absolute;z-index:5;display:flex;align-items:center;gap:7px;font-size:.72rem;font-weight:600;color:#fff;background:#12211a;padding:4px 10px;border-radius:999px;box-shadow:var(--shadow-raise);font-family:var(--font-ui)}
.pin b{font-family:var(--font-data);opacity:.75;font-weight:500}
.rel{position:relative}
.footnote{border-top:1px solid var(--border);margin-top:22px;padding-top:12px;font-size:.78rem;color:var(--muted);display:flex;gap:18px;flex-wrap:wrap}
`;

/* ---- Icons: the same paths app/app.js draws from ---- */
const ICON_PATHS = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  analytics: '<path d="M3.5 20.5h17"/><rect x="5" y="12" width="3.6" height="6" rx="1"/><rect x="10.2" y="7.5" width="3.6" height="10.5" rx="1"/><rect x="15.4" y="10" width="3.6" height="8" rx="1"/>',
  incidents: '<path d="M12 3.2 21.4 20H2.6Z"/><path d="M12 9.6v4.3M12 17h.01"/>',
  risk: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M9 3.5v17M15 3.5v17M3.5 9h17M3.5 15h17"/>',
  audits: '<circle cx="10.5" cy="10.5" r="7"/><path d="m20 20-4.3-4.3"/><path d="M7.5 10.5h6M10.5 7.5v6"/>',
  inspections: '<path d="M9 3v8a3 3 0 0 0 6 0V3"/><path d="M7 3h4M13 3h4"/><path d="M12 14v3"/><circle cx="12" cy="19.5" r="2.5"/>',
  records: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2.5h9A1.5 1.5 0 0 1 21 9v9.5A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-12Z"/>',
  maps: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  actions: '<path d="M4 12.5 9 17.5 20 6.5"/><path d="M4 6.5h8"/>',
  reporting: '<path d="M6 2.5h8l4 4V21a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 21V3a.5.5 0 0 1 .5-.5Z"/><path d="M14 2.5V7h4"/><path d="M9 12h6M9 15.5h6M9 8.5h3"/>',
  tor: '<path d="M6 2.5h9l3.5 3.5V21a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5Z"/><path d="M15 2.5V6h3.5"/><path d="M9 11h6M9 14.5h6"/><circle cx="12" cy="18.5" r="2"/>',
  esia: '<rect x="4.5" y="3.5" width="15" height="18" rx="1.5"/><path d="M9 2.5h6a1 1 0 0 1 1 1V5H8V3.5a1 1 0 0 1 1-1Z"/><path d="m8.5 12.5 2 2 4-4.5M8.5 17h7"/>',
  training: '<path d="M12 4 2.5 8.2 12 12.4l9.5-4.2L12 4Z"/><path d="M6.5 10.4V15c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.6"/><path d="M21.5 8.2v5.1"/>',
  workflows: '<circle cx="5" cy="6" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="18" cy="12" r="2.5"/><path d="M7.3 7 15.7 11M7.3 17 15.7 13"/>',
  clients: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0"/><circle cx="17.5" cy="8.5" r="2.6"/><path d="M15.8 13.2a5.6 5.6 0 0 1 5.4 5.6"/>',
  checklists: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="m7.5 12 2.5 2.5 5-5"/>',
  documents: '<path d="M7 3.5h7l4 4V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4"/><path d="M9.5 12h5M9.5 15h5"/>',
  credits: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2v9.6M9.3 15.2c0 1 .9 1.8 2.7 1.8s2.7-.7 2.7-1.7c0-2.6-5.4-1.2-5.4-3.8 0-1 .9-1.7 2.7-1.7s2.7.6 2.7 1.6"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M8.8 14.8c0 1.2 1.1 2.1 3.2 2.1s3.2-.8 3.2-2c0-3.1-6.4-1.4-6.4-4.5 0-1.2 1.1-2 3.2-2s3.2.7 3.2 1.9"/>',
  warn: '<path d="M12 3.5 21.5 20h-19Z"/><path d="M12 9.5v4.2M12 16.8h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M12 3.5v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 19.5h16"/>',
  camera: '<path d="M3.5 8.5h3.2l1.6-2.6h7.4l1.6 2.6h3.2v10a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1Z"/><circle cx="12" cy="13.6" r="3.4"/>'
};
const icon = (n, cls) => ICON_PATHS[n]
  ? `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[n]}</svg>`
  : "";

/* ---- Grouped bar chart: the geometry of groupedBarChart() in app/app.js ---- */
const SERIES_VARS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];
function groupedBarChart(rows, seriesDefs, title, note) {
  const series = seriesDefs.slice(0, 3);
  const W = 560, H = 230, padL = 16, padR = 12, padT = 28, padB = 46;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const max = Math.max(1, ...rows.flatMap(r => series.map(s => Number(r.values[s.key]) || 0)));
  const slot = plotW / rows.length;
  const groupW = Math.min(58 * series.length, slot * 0.68);
  const barW = Math.max(4, (groupW - 2 * (series.length - 1)) / series.length);
  const body = rows.map((r, i) => {
    const gx = padL + slot * i + (slot - groupW) / 2;
    return series.map((s, j) => {
      const v = Number(r.values[s.key]) || 0;
      const hgt = Math.round((v / max) * plotH);
      const x = gx + j * (barW + 2);
      const y = padT + plotH - hgt;
      const rad = Math.min(4, hgt, barW / 2);
      const d = hgt <= 0 ? "" : `M${x} ${y + hgt} V${y + rad} q0 -${rad} ${rad} -${rad} h${barW - 2 * rad} q${rad} 0 ${rad} ${rad} V${y + hgt} Z`;
      const fill = (series.length === 1 && r.color) ? r.color : (s.color || SERIES_VARS[j]);
      return (hgt > 0 ? `<path d="${d}" style="fill:${fill}"/>` : "") +
        `<text x="${x + barW / 2}" y="${y - 6}" class="chart-value">${v}</text>`;
    }).join("") + `<text x="${gx + groupW / 2}" y="${padT + plotH + 17}" class="chart-label">${r.label}</text>`;
  }).join("");
  const legend = series.length > 1
    ? `<div class="chart-legend">${series.map((s, j) => `<span class="legend-item"><i style="background:${s.color || SERIES_VARS[j]}"></i>${s.label}</span>`).join("")}</div>`
    : "";
  /* Every chart in Verda ships with the figures behind it — a reader who
     needs the number, or a screen reader, never has to infer it from a bar. */
  const table = `<details class="chart-table"><summary>View data table</summary>
    <table class="table"><thead><tr><th>${title.split(" — ")[0]}</th>${series.map(x => `<th class="num">${x.label}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(r => `<tr><td>${r.label}</td>${series.map(x => `<td class="mono num">${r.values[x.key]}</td>`).join("")}</tr>`).join("")}</tbody></table></details>`;
  return `<figure class="chart-figure"><figcaption class="chart-title">${title}</figcaption>
    <svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
    <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" class="chart-axis"/>
    ${body}</svg>${legend}${note ? `<p class="small muted" style="margin:6px 0 0">${note}</p>` : ""}${table}</figure>`;
}

/* ---- Shell: top bar + sidebar, as app/index.html builds them ---- */
const NAV = [
  ["monitor", "Monitor", [["dashboard", "Dashboard"], ["analytics", "Analytics"], ["incidents", "Incidents"], ["risk", "Risk register"], ["audits", "Audits"], ["inspections", "Inspections"], ["records", "Records"], ["maps", "Maps"]]],
  ["manage", "Manage", [["actions", "Actions"], ["reporting", "Verda Reporting"], ["tor", "Terms of Reference"], ["esia", "ESIA"], ["training", "Training"], ["workflows", "Workflows"], ["clients", "Clients"], ["checklists", "Checklists"], ["documents", "Documents"]]]
];
function sidebar(active) {
  return `<nav class="sidebar">${NAV.map(([, label, items]) => `
    <div class="nav-group"><div class="nav-group-title">${label}</div>
      ${items.map(([id, text]) => `<span class="nav-item${id === active ? " active" : ""}">${icon(id)}${text}</span>`).join("")}
    </div>`).join("")}
    <div class="nav-group"><div class="nav-group-title">Grow</div>
      <span class="nav-item">${icon("credits")}Credits</span>
      <span class="nav-item">${icon("clients")}Solutions</span>
    </div></nav>`;
}
function topbar() {
  return `<header class="topbar">
    <div class="brand"><span class="logo">V</span> Verda <span class="muted small">by EEIS</span></div>
    <div class="topbar-right">
      <span class="credits-pill">${icon("coin")}<span class="mono">240</span> credits</span>
      <span class="tsel">🇺🇬 Uganda</span>
      <span class="tsel">English</span>
      <span class="tsel">Forest</span>
      <span class="small muted">A. Nakato</span>
      <span class="btn btn-sm">Sign out</span>
    </div></header>`;
}
function shell(active, main) {
  return `${topbar()}<div class="layout">${sidebar(active)}<main class="main">${main}</main></div>`;
}
function pageHeader(title, lead, illus) {
  return `<div class="page-header"><div class="page-header-text"><h1>${title}</h1><p class="muted">${lead}</p></div>${illus || ""}</div>`;
}
/* Design-note pin. These are annotations on the mockup, never product UI. */
const pin = (n, text, style) => `<span class="pin" style="${style}"><b>${n}</b>${text}</span>`;

function artboard({ file, title, width, body, theme = "forest", extraCss = "" }) {
  const html = `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<script src="./support.js"><\/script>
<style>${FONTS}${TOKENS}${ILLUS_CSS}${COMPONENTS}
.root{width:${width}px;background:var(--bg);overflow:hidden}
${extraCss}</style>
</head>
<body><div class="root">${body}</div></body>
</html>`;
  writeFileSync(join(out, file), html);
  return html.length;
}

/* ---- Illustrations: original flat-style SVG art from app/app.js ---- */
const ILLUS = {
  mining: `<path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
    <path d="M8 122 L34 122 L44 104 L70 104 L80 86 L120 86 L130 104 L156 104 L166 122 L192 122 Z" class="illus-fill-2"/>
    <path d="M28 122 L44 122 L52 108 L74 108 L82 96 L118 96 L126 108 L148 108 L156 122 L172 122 Z" class="illus-fill-1"/>
    <rect x="94" y="26" width="5" height="40" rx="2" class="illus-fill-muted"/>
    <rect x="118" y="26" width="5" height="40" rx="2" class="illus-fill-muted"/>
    <path d="M96 30 L121 66 M121 30 L96 66" stroke-width="3" class="illus-stroke-muted" fill="none"/>
    <circle cx="109" cy="22" r="8" class="illus-fill-accent"/>
    <rect x="36" y="70" width="30" height="14" rx="3" class="illus-fill-accent"/>
    <rect x="30" y="76" width="10" height="8" rx="2" class="illus-fill-muted"/>
    <circle cx="40" cy="86" r="5" class="illus-fill-muted"/><circle cx="60" cy="86" r="5" class="illus-fill-muted"/>`,
  environment: `<path d="M0 112 Q50 96 100 110 T200 104 V140 H0 Z" class="illus-fill-3"/>
    <circle cx="162" cy="32" r="15" class="illus-fill-accent"/>
    <rect x="70" y="74" width="7" height="32" rx="3" class="illus-fill-muted"/>
    <circle cx="73" cy="60" r="24" class="illus-fill-1"/><circle cx="53" cy="72" r="17" class="illus-fill-2"/>
    <circle cx="95" cy="70" r="19" class="illus-fill-2"/><circle cx="140" cy="100" r="5" class="illus-fill-1"/>
    <circle cx="26" cy="106" r="4" class="illus-fill-accent"/><circle cx="176" cy="110" r="4" class="illus-fill-1"/>`,
  people: `<path d="M0 122 H200 V140 H0 Z" class="illus-fill-3"/>
    <circle cx="58" cy="54" r="15" class="illus-fill-1"/><path d="M34 122 Q34 82 58 82 Q82 82 82 122 Z" class="illus-fill-1"/>
    <circle cx="102" cy="42" r="17" class="illus-fill-2"/><path d="M74 122 Q74 72 102 72 Q130 72 130 122 Z" class="illus-fill-2"/>
    <circle cx="146" cy="56" r="14" class="illus-fill-accent"/><path d="M124 122 Q124 84 146 84 Q168 84 168 122 Z" class="illus-fill-accent"/>`
};
const ILLUS_CSS = `.illus{width:100%;height:110px;display:block}
.illus-fill-1{fill:var(--brand-1)}.illus-fill-2{fill:var(--brand-2)}.illus-fill-3{fill:var(--brand-3)}
.illus-fill-accent{fill:var(--accent)}.illus-fill-muted{fill:var(--muted)}.illus-stroke-muted{stroke:var(--muted)}`;
const illus = (name, cls) => `<svg class="illus ${cls || ""}" viewBox="0 0 200 140" aria-hidden="true">${ILLUS[name]}</svg>`;

/* A stand-in for a site photograph: flat art, never a stock image. */
const shot = (a, b) => `<svg class="shot" viewBox="0 0 200 130" preserveAspectRatio="none" aria-hidden="true">
  <rect width="200" height="130" fill="${a}"/><path d="M0 92 L48 60 L86 84 L130 48 L200 96 V130 H0 Z" fill="${b}"/>
  <circle cx="163" cy="30" r="13" fill="rgba(255,255,255,.35)"/></svg>`;

/* ======================================================================
   1. Main — the dashboard a monitoring consultant opens on
   ====================================================================== */
const dueRows = [
  ["Quarterly effluent sampling — Outfall 2", "Monitoring", "R. Okello", "11 Sep 2026", "critical", "Overdue 4 days", true],
  ["NEMA waste transporter licence renewal", "Permit", "A. Nakato", "12 Oct 2026", "warning", "Due in 27 days", false],
  ["Statutory hoist examination — Shaft B", "Inspection", "J. Mwesige", "19 Sep 2026", "warning", "Due in 4 days", false],
  ["ESSR 081 — September submission to IESC", "Report", "A. Nakato", "10 Oct 2026", "good", "On track", false],
  ["Working-at-height refresher — 14 crew", "Training", "S. Achieng", "30 Sep 2026", "good", "On track", false]
];
const dashMain = `
${pageHeader("Dashboard",
  "Kilembe Copper, Kasese — ESSR contract SBC-707. Reporting period August 2026, submitted to the IESC on 8 September.",
  illus("mining", "page-header-illus"))}

<div class="kpi-grid">
  <div class="kpi-tile kpi-warning"><span class="kpi-value">5.36</span><span class="kpi-label">LTIFR</span>
    <span class="kpi-sub small muted">1 lost-time injury in <span class="mono">186,420</span> h worked</span></div>
  <div class="kpi-tile kpi-critical"><span class="kpi-value">16.09</span><span class="kpi-label">TRIFR</span>
    <span class="kpi-sub small muted">3 recordables — above the <span class="mono">12.0</span> contract threshold</span></div>
  <div class="kpi-tile"><span class="kpi-value">186,420</span><span class="kpi-label">Man-hours, August</span>
    <span class="kpi-sub small muted">Cumulative <span class="mono">4,318,905</span> h — carried forward</span></div>
  <div class="kpi-tile kpi-warning"><span class="kpi-value">4</span><span class="kpi-label">Permits expiring ≤ 60 days</span>
    <span class="kpi-sub small muted">Earliest: NEMA waste licence, 12 Oct</span></div>
</div>

<div class="grid grid-2">
  <div class="card">
    <h3>Due in the next 30 days</h3>
    <p class="small muted" style="margin:2px 0 0">Every obligation Verda tracks for this site, in one register. Overdue rows carry a stripe as well as a colour.</p>
    <table class="table"><thead><tr><th>Obligation</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>
      ${dueRows.map(([what, kind, owner, due, cls, status, late]) => `<tr${late ? ' class="row-overdue"' : ""}>
        <td>${what}<div class="small muted">${kind}</div></td><td>${owner}</td><td class="mono small">${due}</td>
        <td><span class="badge badge-${cls}">${status}</span></td></tr>`).join("")}
    </tbody></table>
  </div>
  <div class="card">
    ${groupedBarChart(
      [{ label: "Mar", values: { fac: 6, mtc: 2, lti: 0 } }, { label: "Apr", values: { fac: 4, mtc: 1, lti: 0 } },
       { label: "May", values: { fac: 7, mtc: 3, lti: 1 } }, { label: "Jun", values: { fac: 5, mtc: 1, lti: 0 } },
       { label: "Jul", values: { fac: 3, mtc: 2, lti: 0 } }, { label: "Aug", values: { fac: 5, mtc: 2, lti: 1 } }],
      [{ key: "fac", label: "First aid" }, { key: "mtc", label: "Medical treatment" }, { key: "lti", label: "Lost time" }],
      "Recordable incidents by month",
      "Classified on the ILO scheme; every bar is value-labelled, so magnitude never depends on reading a colour.")}
    <div class="calc-result" style="margin-top:14px">
      <span class="calc-figure">225.3</span><span class="calc-unit">days / 10⁶ h</span>
      <span class="calc-name">Severity rate — 42 lost days this period</span>
    </div>
    <table class="table"><thead><tr><th>August classification</th><th class="num">Count</th><th class="num">Cumulative</th><th>Counts toward</th></tr></thead><tbody>
      <tr><td>Lost-time injury</td><td class="mono num">1</td><td class="mono num">7</td><td class="small muted">LTIFR, TRIFR, severity</td></tr>
      <tr><td>Medical treatment</td><td class="mono num">2</td><td class="mono num">19</td><td class="small muted">TRIFR</td></tr>
      <tr><td>First aid</td><td class="mono num">5</td><td class="mono num">61</td><td class="small muted">Leading indicators only</td></tr>
      <tr><td>Near miss</td><td class="mono num">28</td><td class="mono num">312</td><td class="small muted">Near-miss ratio</td></tr>
      <tr><td>Dangerous occurrence</td><td class="mono num">0</td><td class="mono num">2</td><td class="small muted">Reportable to the regulator</td></tr>
    </tbody></table>
  </div>
</div>

<div class="grid grid-3">
  <div class="card stat-card"><span class="stat-icon">${icon("actions")}</span>
    <div class="stat-body"><div class="stat-label">Open actions</div><div class="stat">23</div>
      <p class="small muted">Across 6 audits and 2 incidents</p></div></div>
  <div class="card stat-card"><span class="stat-icon stat-icon-warn">${icon("warn")}</span>
    <div class="stat-body"><div class="stat-label">Overdue</div><div class="stat warn">6</div>
      <p class="small muted">Oldest open 41 days — Tailings berm freeboard</p></div></div>
  <div class="card stat-card"><span class="stat-icon">${icon("clients")}</span>
    <div class="stat-body"><div class="stat-label">Subcontractors on site</div><div class="stat">11</div>
      <p class="small muted">2 prequalifications lapse this month</p></div></div>
</div>

<div class="card notice-card">
  <h4>Carried forward, not re-typed</h4>
  <p class="small">Cumulative man-hours, inductions, PPE issued, water abstracted, waste by stream, grievances and area restored are
  owned by Verda and rolled forward from the last submitted period. Nothing in a cumulative column is ever keyed in twice.</p>
</div>

<div class="footnote">
  <span><strong>Elevation</strong> — a card is a hairline container; nothing lifts unless it genuinely floats.</span>
  <span><strong>Figures</strong> — IBM Plex Mono, tabular, right-aligned in tables.</span>
  <span><strong>Status</strong> — label + dot + stripe, never colour alone.</span>
</div>`;

/* ======================================================================
   2. Reporting — the ESSR builder: tables, photographs, carry-forward
   ====================================================================== */
const sectionPicker = [
  ["1", "Executive summary", "Narrative · 1 table", true],
  ["2", "Project & contract data", "Header fields", true],
  ["3", "Workforce & man-hours", "3 tables · 2 carried forward", true],
  ["4.1", "Occupational health & safety", "4 tables · 1 chart", true],
  ["4.3", "Water abstraction & discharge", "2 tables · photographs", true],
  ["4.4", "Waste management", "1 table · 1 chart", false],
  ["4.5", "Air quality & noise", "2 tables", false],
  ["5", "Grievance mechanism", "1 table · carried forward", false],
  ["6", "Training & induction", "2 tables · carried forward", false],
  ["7", "Site photographs", "Gallery", false]
];
const waterRows = [
  ["Borehole BH-03", "Abstraction", "18,420", "412,880", "NWSC permit W/2419"],
  ["Borehole BH-07", "Abstraction", "9,105", "236,440", "NWSC permit W/2419"],
  ["Nyamwamba intake", "Surface abstraction", "4,260", "118,905", "Surface water permit S/771"],
  ["Outfall 2 — treated effluent", "Discharge", "12,880", "301,210", "NEMA discharge permit D/1188"]
];
const repMain = `
${pageHeader("Verda Reporting",
  "ESSR 081 — September 2026 · Kilembe Copper · standard: Environmental, Social & Safety Report (lender format)",
  illus("environment", "page-header-illus"))}

<div class="grid" style="grid-template-columns:330px 1fr;gap:18px;align-items:start">

  <div class="card" style="margin:0">
    <h3 style="margin-bottom:2px">Sections</h3>
    <p class="small muted" style="margin:0 0 10px">Tick what this month's report covers. Five of ten started.</p>
    <div class="wf-bar"><span style="width:50%"></span></div>
    <p class="small muted" style="margin:0 0 10px"><span class="mono">5</span> of <span class="mono">10</span> sections have data</p>
    ${sectionPicker.map(([n, name, meta, on]) => `
      <div class="seg-toggle${on ? " seg-filled" : ""}"><span class="cb${on ? " cb-on" : ""}"></span>
        <span class="seg-toggle-label"><span class="mono small muted">${n}</span> ${name}</span>
        <span class="small muted">${meta}</span></div>`).join("")}
    <div style="display:flex;gap:8px;margin-top:14px">
      <span class="btn btn-sm">Select all</span><span class="btn btn-sm">Clear</span>
    </div>
  </div>

  <div style="min-width:0">
    <div class="card" style="margin-bottom:16px">
      <div class="form-row">
        <label class="lbl" style="margin:0">Reporting standard
          <span class="inp sel" style="position:relative">ESSR — lender / IESC format</span></label>
        <label class="lbl" style="margin:0">Period
          <span class="inp sel" style="position:relative">September 2026</span></label>
        <label class="lbl" style="margin:0">Site
          <span class="inp sel" style="position:relative">Kilembe Copper — Kasese</span></label>
        <span class="btn btn-primary" style="flex:0 0 auto">${icon("reporting")}Generate report</span>
      </div>
    </div>

    <div class="card seg-form">
      <h3 style="margin-bottom:2px"><span class="mono muted" style="font-size:.85rem">4.3</span> Water abstraction &amp; discharge</h3>
      <div class="guide-box">
        <p><strong>What this section is for.</strong> Volumes abstracted and discharged in the period, against the permit
        conditions that authorise them.</p>
        <p><strong>How to fill it in.</strong> One row per source or outfall. Enter this period's volume only — Verda carries
        the cumulative column forward from August.</p>
        <p class="guide-example">Example: “Borehole BH-03 — 18,420 m³ abstracted, within the 22,000 m³/month permit limit.”</p>
        <p class="small" style="margin-top:8px"><strong>Show me</strong> ▸</p>
      </div>

      <h5>Tables</h5>
      <div class="report-table">
        <div class="report-table-head"><h5>Table 4.3.1 — Water balance by source and outfall</h5>
          <p class="small muted" style="margin:0">Volumes in m³. The cumulative column is computed, not typed.</p></div>
        <div class="table-scroll"><table class="table entry-table"><thead><tr>
          <th>Source / outfall</th><th>Type</th><th class="num">This period (m³)</th><th class="num">Cumulative (m³)</th><th>Authorising permit</th><th></th>
        </tr></thead><tbody>
          ${waterRows.map(([src, type, period, cum, permit]) => `<tr>
            <td><span class="entry-cell">${src}</span></td>
            <td><span class="entry-cell sel" style="position:relative">${type}</span></td>
            <td><span class="entry-cell mono num">${period}</span></td>
            <td><span class="entry-cell cell-computed mono num">${cum}</span></td>
            <td><span class="entry-cell mono">${permit}</span></td>
            <td><span class="btn btn-sm" title="Remove row">×</span></td></tr>`).join("")}
        </tbody></table></div>
        <p class="small muted" style="margin:8px 0 0">↻ Cumulative figures carried forward from ESSR 080 (August 2026). Green cells are owned by Verda and cannot be edited.</p>
        <span class="btn btn-sm" style="margin-top:10px">${icon("plus")}Add row</span>
      </div>

      <h5>Photographs</h5>
      <div class="dropzone dropzone-active">
        <p><strong>Drop photographs here</strong> — or click to choose files</p>
        <p class="muted">JPG or PNG. Each one is downscaled in the browser, captioned, and filed against this section and period.</p>
      </div>
      <div class="photo-grid">
        <figure class="photo-card">${shot("#cfe0d6", "#2f9c63")}<figcaption>Fig 4.3.1 — Outfall 2 sampling point, 04 Sep 2026</figcaption></figure>
        <figure class="photo-card">${shot("#d8e3ea", "#1a6b45")}<figcaption>Fig 4.3.2 — BH-03 flow meter reading 412,880 m³</figcaption></figure>
        <figure class="photo-card">${shot("#e6ddcd", "#c2600a")}<figcaption>Fig 4.3.3 — Silt trap after desilting, 11 Sep 2026</figcaption></figure>
        <figure class="photo-card" style="display:flex;align-items:center;justify-content:center;border-style:dashed;color:var(--muted)">
          <div class="small" style="text-align:center">${icon("camera")}<div style="margin-top:6px">Add another</div></div></figure>
      </div>

      <h5>Narrative</h5>
      <span class="inp inp-focus" style="min-height:74px;padding:11px">Abstraction remained within permitted limits at all three
      sources. Outfall 2 exceeded the 50 mg/l TSS condition on 6 September following heavy rainfall; the silt trap was desilted
      the same week and a follow-up sample on 11 September returned 28 mg/l.|</span>
      <p class="small muted" style="margin-top:6px">Verda can draft this from the tables above. The draft is a documented template — review it before it goes to the IESC.</p>
    </div>
  </div>
</div>

<div class="card" style="margin-top:4px">
  <h3>Generated document</h3>
  <p class="small muted" style="margin:0 0 12px">The one thing on this screen that genuinely sits above the page, so it is the one thing that carries a shadow.</p>
  <div class="report-preview"><div class="report-doc">
    <h1>Environmental, Social &amp; Safety Report — ESSR 081</h1>
    <table class="table kv-table"><tbody>
      <tr><th>Project</th><td>Kilembe Copper redevelopment, Kasese District, Uganda</td></tr>
      <tr><th>Contract</th><td class="mono">SBC-707</td></tr>
      <tr><th>Reporting period</th><td>1 – 30 September 2026</td></tr>
      <tr><th>Prepared by</th><td>EEIS — A. Nakato, Lead E&amp;S Monitor</td></tr>
    </tbody></table>
    <div class="report-section">
      <h3>4.3 Water abstraction and discharge</h3>
      <h4>Table 4.3.1 — Water balance by source and outfall</h4>
      <table class="table"><thead><tr><th>Source / outfall</th><th class="num">This period (m³)</th><th class="num">Cumulative (m³)</th><th>Permit</th></tr></thead><tbody>
        ${waterRows.map(([src, , period, cum, permit]) => `<tr><td>${src}</td><td class="mono num">${period}</td><td class="mono num">${cum}</td><td class="mono">${permit}</td></tr>`).join("")}
      </tbody></table>
      <h4>Narrative</h4>
      <p class="small">Abstraction remained within permitted limits at all three sources. Outfall 2 exceeded the 50 mg/l TSS
      condition on 6 September following heavy rainfall; the silt trap was desilted the same week and a follow-up sample on
      11 September returned 28 mg/l.</p>
    </div>
  </div></div>
</div>

<div class="footnote">
  <span><strong>Three blocks per section</strong> — tables, photographs, narrative. Same order in every section, so the tenth is learned from the first.</span>
  <span><strong>Green cells are Verda's</strong> — the cumulative column is the switching cost.</span>
</div>`;

/* ======================================================================
   3. Analytics — the auto-KPI engine
   ====================================================================== */
const kpiDefs = [
  ["LTIFR", "Lost-time injury frequency rate", "LTIs ÷ hours worked × 1,000,000", "5.36", "warning", "≤ 4.0"],
  ["TRIFR", "Total recordable injury frequency rate", "Recordables ÷ hours × 1,000,000", "16.09", "critical", "≤ 12.0"],
  ["Severity rate", "Lost days per million hours", "Lost days ÷ hours × 1,000,000", "225.3", "warning", "≤ 180"],
  ["Near-miss ratio", "Near misses per recordable", "Near misses ÷ recordables", "9.3", "good", "≥ 8.0"],
  ["Induction coverage", "Workforce inducted before first shift", "Inducted ÷ headcount", "98.4%", "good", "100%"],
  ["Action closure", "Corrective actions closed by due date", "Closed on time ÷ raised", "74%", "warning", "≥ 90%"],
  ["Waste diversion", "Waste recovered rather than landfilled", "Recovered ÷ total generated", "61%", "good", "≥ 55%"],
  ["Grievance closure", "Grievances closed within 30 days", "Closed ≤30 d ÷ received", "88%", "good", "≥ 85%"]
];
const analyticsMain = `
${pageHeader("Analytics",
  "Every rate on this screen is computed from the returns already entered — nothing here is typed in twice.",
  illus("mining", "page-header-illus"))}

<div class="card">
  <div class="form-row" style="align-items:flex-end">
    <label class="lbl" style="margin:0;min-width:260px">Site
      <span class="inp sel" style="position:relative">Kilembe Copper — Kasese, Uganda</span></label>
    <label class="lbl" style="margin:0;min-width:200px">Period
      <span class="inp sel" style="position:relative">Rolling 12 months to Sep 2026</span></label>
    <p class="small muted" style="flex:2;min-width:280px;margin:0 0 9px">
      Rates are per site. A frequency rate blended across sites with different exposure bases is not a figure you can quote to a lender.</p>
  </div>
</div>

<div class="kpi-grid">
  <div class="kpi-tile kpi-warning"><span class="kpi-value">5.36</span><span class="kpi-label">LTIFR</span>
    <span class="kpi-sub small muted">Contract threshold <span class="mono">4.0</span></span></div>
  <div class="kpi-tile kpi-critical"><span class="kpi-value">16.09</span><span class="kpi-label">TRIFR</span>
    <span class="kpi-sub small muted">Contract threshold <span class="mono">12.0</span></span></div>
  <div class="kpi-tile kpi-good"><span class="kpi-value">9.3</span><span class="kpi-label">Near-miss ratio</span>
    <span class="kpi-sub small muted">Reporting culture holding up</span></div>
  <div class="kpi-tile kpi-warning"><span class="kpi-value">74%</span><span class="kpi-label">Action closure on time</span>
    <span class="kpi-sub small muted">6 of 23 open actions overdue</span></div>
</div>

<div class="grid grid-2">
  <div class="card">${groupedBarChart(
    [{ label: "Apr", values: { bore: 26, surf: 4, mun: 1 } }, { label: "May", values: { bore: 28, surf: 5, mun: 1 } },
     { label: "Jun", values: { bore: 24, surf: 6, mun: 2 } }, { label: "Jul", values: { bore: 27, surf: 4, mun: 1 } },
     { label: "Aug", values: { bore: 29, surf: 5, mun: 2 } }, { label: "Sep", values: { bore: 28, surf: 4, mun: 1 } }],
    [{ key: "bore", label: "Borehole" }, { key: "surf", label: "Surface" }, { key: "mun", label: "Municipal" }],
    "Water abstracted by source — thousands of m³",
    "Drawn straight from Table 4.3.1 of each monthly ESSR. No separate data entry.")}</div>
  <div class="card">
    <h3>Exposure — the denominator</h3>
    <p class="small muted" style="margin:0 0 10px">Every frequency rate on this page divides by hours actually worked, on the ILO base of 1,000,000 hours.</p>
    <table class="table"><thead><tr><th>Employer</th><th class="num">Headcount</th><th class="num">Hours, Sep</th><th class="num">Cumulative</th></tr></thead><tbody>
      <tr><td>Direct — Kilembe Copper</td><td class="mono num">412</td><td class="mono num">89,240</td><td class="mono num">2,105,318</td></tr>
      <tr><td>Contractor — civil works</td><td class="mono num">238</td><td class="mono num">51,680</td><td class="mono num">1,214,402</td></tr>
      <tr><td>Contractor — drilling</td><td class="mono num">96</td><td class="mono num">24,960</td><td class="mono num">638,140</td></tr>
      <tr><td>Contractor — security</td><td class="mono num">74</td><td class="mono num">20,540</td><td class="mono num">361,045</td></tr>
      <tr><td><strong>Total</strong></td><td class="mono num"><strong>820</strong></td><td class="mono num"><strong>186,420</strong></td><td class="mono num"><strong>4,318,905</strong></td></tr>
    </tbody></table>
    <p class="small muted" style="margin:10px 0 0">Subcontractor hours count toward the site rate whenever the contract makes the principal responsible — which every lender-financed contract here does.</p>
  </div>
</div>

<div class="card">
  <h3>KPI definitions</h3>
  <p class="small muted" style="margin:0">Fourteen indicators ship with Verda, each with its formula and the basis it is computed on. A rate nobody can reproduce is a rate a lender will not accept.</p>
  <table class="table"><thead><tr><th>Indicator</th><th>What it measures</th><th>Formula</th><th class="num">Current</th><th>Status</th><th class="num">Target</th></tr></thead><tbody>
    ${kpiDefs.map(([k, what, formula, val, cls, target]) => `<tr>
      <td><strong>${k}</strong></td><td class="muted">${what}</td><td class="mono small">${formula}</td>
      <td class="mono num">${val}</td><td><span class="badge badge-${cls}">${cls === "good" ? "On target" : cls === "warning" ? "Watch" : "Off target"}</span></td>
      <td class="mono num">${target}</td></tr>`).join("")}
  </tbody></table>
</div>

<div class="footnote"><span><strong>No colour-only signals</strong> — every status badge carries its own word.</span>
<span><strong>Every rate is reproducible</strong> — formula and denominator are on screen, not in a footnote.</span></div>`;

/* ======================================================================
   4. Inspections — regimes, register and the calculators behind them
   ====================================================================== */
const inspRows = [
  ["Winding rope — Shaft B", "Statutory · 6-monthly", "J. Mwesige", "19 Sep 2026", "warning", "Due in 4 days", false],
  ["Mobile crane 40 t — LTM 1040", "Thorough examination · 12-monthly", "External — UNBS", "02 Aug 2026", "critical", "Overdue 44 days", true],
  ["Air receiver, compressor house", "Pressure vessel · 24-monthly", "External — UNBS", "14 Mar 2027", "good", "In date", false],
  ["Portable electrical tools (87)", "PAT · quarterly", "E. Byaruhanga", "30 Sep 2026", "warning", "Due in 15 days", false],
  ["Fire extinguishers (146)", "Servicing · 12-monthly", "Contracted — Fireguard", "11 Jan 2027", "good", "In date", false],
  ["Tailings dam instrumentation", "Piezometers · weekly", "R. Okello", "16 Sep 2026", "good", "In date", false]
];
const inspMain = `
${pageHeader("Inspections",
  "Ninety-one inspection regimes for plant and equipment, each with its interval, who may carry it out, and the instrument that requires it.",
  illus("mining", "page-header-illus"))}

<div class="tabs"><span class="tab-btn active">Register</span><span class="tab-btn">Regimes</span><span class="tab-btn">Calculations</span></div>

<div class="card">
  <h3>Equipment inspection register</h3>
  <p class="small muted" style="margin:0">Intervals come from the regime, so a date entered once sets every date after it.</p>
  <table class="table"><thead><tr><th>Item</th><th>Regime</th><th>Competent person</th><th>Next due</th><th>Status</th></tr></thead><tbody>
    ${inspRows.map(([item, regime, who, due, cls, status, late]) => `<tr${late ? ' class="row-overdue"' : ""}>
      <td>${item}</td><td class="muted small">${regime}</td><td>${who}</td><td class="mono small">${due}</td>
      <td><span class="badge badge-${cls}">${status}</span></td></tr>`).join("")}
  </tbody></table>
</div>

<div class="grid grid-2">
  <div class="card calc-card">
    <div class="calc-group">Ventilation · mining</div>
    <h4>Airflow required underground</h4>
    <p class="small muted" style="margin:0 0 4px">Minimum air quantity from persons underground, diesel power in use and the statutory rate per kilowatt.</p>
    <div class="form-row">
      <label class="lbl" style="margin:0">Persons underground<span class="inp">86</span></label>
      <label class="lbl" style="margin:0">Diesel kW in use<span class="inp inp-focus">1,240</span></label>
      <label class="lbl" style="margin:0">Rate (m³/s per kW)<span class="inp">0.06</span></label>
    </div>
    <div class="calc-result"><span class="calc-figure">78.8</span><span class="calc-unit">m³/s</span>
      <span class="calc-name">Minimum airflow required</span></div>
    <div class="calc-result"><span class="calc-figure">94.6</span><span class="calc-unit">m³/s</span>
      <span class="calc-name">With 20% design margin</span></div>
    <p class="calc-note small muted">0.06 m³/s per kW of diesel plus 0.1 m³/s per person. Check the rate against the mine's
    own ventilation plan and the regulator's current requirement before relying on it.</p>
  </div>

  <div class="card calc-card">
    <div class="calc-group">Containment · environmental</div>
    <h4>Secondary containment for a bulk fuel store</h4>
    <div class="form-row">
      <label class="lbl" style="margin:0">Largest tank (litres)<span class="inp">45,000</span></label>
      <label class="lbl" style="margin:0">Total stored (litres)<span class="inp inp-invalid">−12,000</span></label>
      <label class="lbl" style="margin:0">Bund basis<span class="inp sel" style="position:relative">110% of largest tank</span></label>
    </div>
    <p class="calc-invalid">A stored volume cannot be negative. Enter the quantity actually on site.</p>
    <p class="small muted" style="margin:10px 0 0">When the inputs are valid this returns the required bund volume and the
    footprint needed at the bund wall height you specify.</p>
    <div class="calc-note">
      <p class="small muted" style="margin:0">Fifteen calculators ship with Verda: containment, ventilation, noise, dust
      deposition, effluent loading, waste density, spill response, PPE issue rates and more.</p>
    </div>
  </div>
</div>

<div class="footnote"><span><strong>Invalid input is explained, not swallowed</strong> — the message says what to do next.</span>
<span><strong>Every calculator carries its basis</strong> — and tells you to check it against the current requirement.</span></div>`;

/* ======================================================================
   5. Audits — a protocol being worked through
   ====================================================================== */
const auditItems = [
  ["Is the tailings storage facility operating within the freeboard specified in the approved design?", "Non-conformance", "Major", "Freeboard 0.7 m against 1.2 m specified — TSF-04"],
  ["Are piezometer readings taken weekly and reviewed by the responsible engineer?", "Conforms", "", "Readings to 14 Sep sighted, countersigned"],
  ["Is a current NEMA discharge permit held for every outfall in use?", "Non-conformance", "Minor", "Outfall 3 commissioned Aug, permit applied for 02 Sep"],
  ["Are emergency spillway and decant structures inspected after every rainfall event above 25 mm?", "Observation", "", "Records exist but are not dated consistently"],
  ["Has the dam-break study been reviewed within the last five years?", "Not applicable", "", "Facility commissioned 2024 — first review due 2029"]
];
const auditMain = `
${pageHeader("Audits",
  "Thirteen audit protocols, 246 items — each traced to the instrument or standard that requires it.",
  illus("environment", "page-header-illus"))}

<div class="tabs"><span class="tab-btn active">Run an audit</span><span class="tab-btn">Protocols</span><span class="tab-btn">Findings</span><span class="tab-btn">Actions</span><span class="tab-btn">History</span></div>

<div class="card">
  <div class="form-row">
    <label class="lbl" style="margin:0">Protocol<span class="inp sel" style="position:relative">Tailings storage facility — operation &amp; surveillance</span></label>
    <label class="lbl" style="margin:0">Site<span class="inp sel" style="position:relative">Kilembe Copper — Kasese</span></label>
    <label class="lbl" style="margin:0">Auditor<span class="inp">A. Nakato</span></label>
    <label class="lbl" style="margin:0">Date<span class="inp mono">15 Sep 2026</span></label>
  </div>
  <p class="small muted" style="margin:10px 0 0">Basis: NEMA (Waste Management) Regulations 2020; GISTM 2020 principles 6–9; the facility's own approved operating manual.</p>
</div>

<div class="grid grid-3">
  <div class="card stat-card"><span class="stat-icon">${icon("checklists")}</span>
    <div class="stat-body"><div class="stat-label">Items answered</div><div class="stat">18 / 24</div>
      <p class="small muted">Six left in section 4</p></div></div>
  <div class="card stat-card"><span class="stat-icon stat-icon-warn">${icon("warn")}</span>
    <div class="stat-body"><div class="stat-label">Non-conformances</div><div class="stat warn">3</div>
      <p class="small muted">1 major, 2 minor</p></div></div>
  <div class="card stat-card"><span class="stat-icon">${icon("actions")}</span>
    <div class="stat-body"><div class="stat-label">Actions raised</div><div class="stat">3</div>
      <p class="small muted">Each with an owner and a due date</p></div></div>
</div>

<div class="card">
  <h3>Section 4 — Containment and surveillance</h3>
  <p class="small muted" style="margin:0 0 4px">The item text leads; the controls sit beneath it, so a long clause is never squeezed into a sliver of column.</p>
  ${auditItems.map(([text, result, sev, note]) => `
    <div class="audit-item">
      <div class="audit-item-text">${text}</div>
      <div class="audit-item-controls">
        <span class="inp sel" style="position:relative;margin:0">${result}</span>
        <span class="inp sel" style="position:relative;margin:0${sev ? "" : ";opacity:.5"}">${sev || "Severity — n/a"}</span>
        <span class="inp" style="margin:0">${note}</span>
      </div>
    </div>`).join("")}
</div>

<div class="grid grid-2">
  <div class="card">
    <h3>Risk rating of the major finding</h3>
    <p class="small muted" style="margin:0 0 8px">Freeboard shortfall — likelihood <strong>Likely</strong>, consequence <strong>Major</strong>.</p>
    <table class="risk-matrix"><tbody>
      <tr><th></th><th>Insig.</th><th>Minor</th><th>Mod.</th><th>Major</th><th>Severe</th></tr>
      <tr><th>Almost certain</th><td class="risk-cell risk-warning">M</td><td class="risk-cell risk-serious">H</td><td class="risk-cell risk-critical">E</td><td class="risk-cell risk-critical">E</td><td class="risk-cell risk-critical">E</td></tr>
      <tr><th>Likely</th><td class="risk-cell risk-good">L</td><td class="risk-cell risk-warning">M</td><td class="risk-cell risk-serious">H</td><td class="risk-cell risk-critical" style="outline:2px solid var(--ink-strong);outline-offset:1px">E</td><td class="risk-cell risk-critical">E</td></tr>
      <tr><th>Possible</th><td class="risk-cell risk-good">L</td><td class="risk-cell risk-warning">M</td><td class="risk-cell risk-warning">M</td><td class="risk-cell risk-serious">H</td><td class="risk-cell risk-critical">E</td></tr>
      <tr><th>Unlikely</th><td class="risk-cell risk-good">L</td><td class="risk-cell risk-good">L</td><td class="risk-cell risk-warning">M</td><td class="risk-cell risk-serious">H</td><td class="risk-cell risk-serious">H</td></tr>
      <tr><th>Rare</th><td class="risk-cell risk-good">L</td><td class="risk-cell risk-good">L</td><td class="risk-cell risk-good">L</td><td class="risk-cell risk-warning">M</td><td class="risk-cell risk-serious">H</td></tr>
    </tbody></table>
    <p class="small muted" style="margin:10px 0 0">The selected cell is outlined as well as filled — the rating survives a greyscale print.</p>
  </div>
  <div class="card">
    <h3>Actions raised by this audit</h3>
    <table class="table"><thead><tr><th>Action</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>
      <tr class="row-overdue"><td>Restore TSF-04 freeboard to 1.2 m and re-survey</td><td>Mine engineer</td><td class="mono small">22 Sep 2026</td><td><span class="badge badge-critical">Major NC</span></td></tr>
      <tr><td>Submit Outfall 3 discharge permit application to NEMA</td><td>A. Nakato</td><td class="mono small">30 Sep 2026</td><td><span class="badge badge-warning">Open</span></td></tr>
      <tr><td>Standardise rainfall-event inspection record dating</td><td>R. Okello</td><td class="mono small">14 Oct 2026</td><td><span class="badge badge-warning">Open</span></td></tr>
    </tbody></table>
    <p class="small muted" style="margin:12px 0 0">Findings become actions on the same screen. An audit that ends in a PDF nobody actions is an audit that did not happen.</p>
  </div>
</div>

<div class="footnote"><span><strong>Every item names its basis</strong> — the instrument, not the auditor's opinion.</span>
<span><strong>Findings carry through</strong> — to actions, to the monthly report, to the KPI.</span></div>`;

/* ======================================================================
   6. Workflow — a procedure in progress
   ====================================================================== */
const wfSteps = [
  [true, "Secure the scene and make the area safe", "Shift supervisor", "Same day", "PHOTO-2291", "Closed 06 Sep"],
  [true, "Notify the mine manager and the client's E&S lead", "Shift supervisor", "Within 4 h", "EMAIL-0913", "Closed 06 Sep"],
  [true, "Notify the Commissioner for Mines (reportable injury)", "Mine manager", "Within 24 h", "DOM-F7/2291", "Closed 07 Sep"],
  [true, "Preserve evidence and take scene photographs", "SHE officer", "Within 24 h", "PHOTO-2292…2297", "Closed 06 Sep"],
  [false, "Complete the investigation using the cause taxonomy", "SHE officer", "Within 7 days", "", "Due 13 Sep — overdue"],
  [false, "Agree corrective actions with owners and dates", "Mine manager", "Within 10 days", "", "Due 16 Sep"],
  [false, "Brief the workforce and record attendance", "Training officer", "Within 14 days", "", "Due 20 Sep"],
  [false, "Carry the incident into the monthly ESSR", "Lead monitor", "With the period report", "", "Due 10 Oct"]
];
const wfMain = `
${pageHeader("Workflows",
  "Twenty-two procedures across eight areas, 158 steps — each step with a role, a deadline and the evidence that closes it.",
  illus("people", "page-header-illus"))}

<div class="tabs"><span class="tab-btn active">Runs in progress</span><span class="tab-btn">Template library</span></div>

<div class="card">
  <div class="wf-run" style="background:var(--surface)">
    <div class="wf-run-head">
      <div><h3>Reportable injury — investigation and notification</h3>
        <p class="small muted" style="margin:0">Started 06 Sep 2026 · triggered by incident <span class="mono">INC-2291</span> — lost-time injury, conveyor guard</p></div>
      <div class="wf-run-meta"><span class="badge badge-critical">1 step overdue</span><span class="btn btn-sm">Open incident</span></div>
    </div>
    <div class="wf-bar"><span style="width:50%"></span></div>
    <p class="small muted" style="margin:0"><span class="mono">4</span> of <span class="mono">8</span> steps closed</p>
    <table class="table"><thead><tr><th></th><th>Step</th><th>Role</th><th>Deadline</th><th>Evidence</th><th>State</th></tr></thead><tbody>
      ${wfSteps.map(([done, task, role, days, ev, state]) => `<tr${!done && state.includes("overdue") ? ' class="row-overdue"' : ""}>
        <td><span class="cb${done ? " cb-on" : ""}"></span></td>
        <td>${task}</td><td class="muted">${role}</td><td class="small">${days}</td>
        <td>${ev ? `<span class="mono small">${ev}</span>` : `<span class="entry-cell small muted" style="min-width:150px">Reference…</span>`}</td>
        <td class="small ${state.includes("overdue") ? "" : "muted"}">${state}</td></tr>`).join("")}
    </tbody></table>
  </div>
</div>

<div class="grid grid-2">
  <div class="card">
    <h3>Other runs in progress</h3>
    <table class="table"><thead><tr><th>Procedure</th><th>Area</th><th>Progress</th><th>State</th></tr></thead><tbody>
      <tr><td>Permit renewal — NEMA waste transporter</td><td class="muted">Permitting</td><td class="mono num">3 / 6</td><td><span class="badge badge-warning">Due 12 Oct</span></td></tr>
      <tr><td>Subcontractor mobilisation — drilling</td><td class="muted">Contractor control</td><td class="mono num">7 / 9</td><td><span class="badge badge-good">On track</span></td></tr>
      <tr><td>Grievance — Nyakasanga access road dust</td><td class="muted">Community</td><td class="mono num">2 / 5</td><td><span class="badge badge-warning">Day 19 of 30</span></td></tr>
      <tr><td>Emergency drill — tailings breach scenario</td><td class="muted">Emergency preparedness</td><td class="mono num">1 / 7</td><td><span class="badge badge-good">On track</span></td></tr>
    </tbody></table>
  </div>
  <div class="card">
    <h3>Template library</h3>
    <p class="small muted" style="margin:0 0 6px">Eight areas. Starting a run copies the template and stamps every deadline from the trigger date.</p>
    <table class="table"><thead><tr><th>Area</th><th class="num">Procedures</th><th class="num">Steps</th></tr></thead><tbody>
      <tr><td>Incident &amp; investigation</td><td class="mono num">4</td><td class="mono num">31</td></tr>
      <tr><td>Permitting &amp; licensing</td><td class="mono num">3</td><td class="mono num">19</td></tr>
      <tr><td>Contractor control</td><td class="mono num">3</td><td class="mono num">22</td></tr>
      <tr><td>Community &amp; grievance</td><td class="mono num">2</td><td class="mono num">12</td></tr>
      <tr><td>Emergency preparedness</td><td class="mono num">3</td><td class="mono num">24</td></tr>
      <tr><td>Monitoring &amp; reporting</td><td class="mono num">3</td><td class="mono num">21</td></tr>
      <tr><td>Training &amp; competence</td><td class="mono num">2</td><td class="mono num">14</td></tr>
      <tr><td>Change &amp; closure</td><td class="mono num">2</td><td class="mono num">15</td></tr>
    </tbody></table>
  </div>
</div>

<div class="footnote"><span><strong>A step closes on evidence</strong> — a reference, not a tick.</span>
<span><strong>Deadlines are stamped from the trigger</strong> — "within 24 h" becomes a date the moment the run starts.</span></div>`;

/* ======================================================================
   7. Field — phone width, the screen used standing on a bench
   ====================================================================== */
const fieldMain = `
<header class="topbar" style="flex-wrap:wrap;gap:8px;padding:10px 14px">
  <div class="brand"><span class="logo">V</span> Verda</div>
  <div class="topbar-right" style="flex-wrap:wrap;justify-content:flex-end;row-gap:8px">
    <span class="tsel">🇺🇬 UG</span><span class="small muted">A. Nakato</span>
  </div>
</header>
<main class="main" style="padding:18px 16px">
  <h1 style="font-size:1.5rem;margin-bottom:4px">Record an observation</h1>
  <p class="small muted" style="margin:0 0 14px">Three fields and a photograph. Everything else is filled in from where you are and who you are.</p>

  <div class="card" style="padding:16px">
    <label class="lbl">Site<span class="inp sel" style="position:relative">Kilembe Copper — Kasese</span></label>
    <label class="lbl">What did you see?
      <span class="inp sel" style="position:relative">Unsafe condition</span></label>
    <label class="lbl">Where<span class="inp mono">0.2034 N, 30.0891 E</span></label>
    <p class="small muted" style="margin:-6px 0 0">Taken from the handset. Tap to correct it on the map.</p>

    <label class="lbl" style="margin-top:16px">Severity</label>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <span class="badge badge-good">Low</span><span class="badge badge-warning">Medium</span>
      <span class="badge badge-serious" style="outline:2px solid var(--ink-strong);outline-offset:2px">High</span>
      <span class="badge badge-critical">Critical</span>
    </div>

    <label class="lbl" style="margin-top:16px">Photograph</label>
    <div class="dropzone dropzone-active" style="padding:14px">
      <p><strong>Take a photo</strong> or choose one</p>
      <p class="muted small" style="margin:0">Downscaled on the handset — it uploads on a weak signal.</p>
    </div>
    <figure class="photo-card" style="margin-top:10px">${shot("#dfe6e1", "#1a6b45")}
      <figcaption>Conveyor CV-04, guard removed — 15 Sep 2026, 09:12</figcaption></figure>

    <label class="lbl" style="margin-top:14px">Note
      <span class="inp inp-focus" style="min-height:64px;padding:10px">Return-idler guard missing on the drive end of CV-04. Area barriered; electrician notified.|</span></label>

    <span class="btn btn-primary" style="width:100%;justify-content:center;margin-top:14px">Save observation</span>
    <p class="small muted" style="text-align:center;margin:10px 0 0">Saved on the handset. It syncs when you are back in signal.</p>
  </div>

  <div class="card notice-card" style="padding:14px 16px">
    <h4 style="margin:0">Why it is this short</h4>
    <p class="small">A form with fourteen fields gets filled in from memory at the end of the shift. A form with three gets
    filled in where the hazard is, which is the only version worth having.</p>
  </div>
</main>`;

/* ======================================================================
   8. System — the design system sheet
   ====================================================================== */
const swatch = (name, val, note) => `<div style="min-width:132px">
  <div style="height:46px;border-radius:var(--r-control);background:${val};border:1px solid var(--border)"></div>
  <div class="small" style="margin-top:5px;font-weight:600">${name}</div>
  <div class="small muted mono">${note}</div></div>`;
const THEME_ROLES = ["brand-1", "brand-2", "brand-3", "accent", "bg", "text", "border", "warn"];
const themeStrip = (theme, label, cols) => `<div style="margin-bottom:16px">
  <div class="small" style="font-weight:600;margin-bottom:6px">${label}</div>
  <div style="display:flex;gap:6px">${cols.map((c, i) => `<div style="flex:1;min-width:0">
    <div style="height:34px;border-radius:6px;background:${c};border:1px solid rgba(0,0,0,.08)"></div>
    <div class="small muted" style="margin-top:4px;font-size:.66rem;letter-spacing:.02em">${THEME_ROLES[i]}</div>
    <div class="small muted mono" style="font-size:.68rem">${c}</div></div>`).join("")}</div></div>`;

const systemMain = `
<div style="padding:30px 34px">
  <h1 style="margin-bottom:6px">Verda design system</h1>
  <p class="muted" style="margin:0 0 24px">The vocabulary every screen on this canvas is built from. Values are the ones in
  <span class="mono small">app/styles.css</span> — this sheet documents the running app, it does not propose a new one.</p>

  <div class="card">
    <h3>Colour — four complete themes, not one palette with variants</h3>
    <p class="small muted" style="margin:0 0 14px">Each theme declares the whole set, so no colour is left to inherit from a block that may not apply. Forest is the default.</p>
    ${themeStrip("forest", "Forest — default", ["#1a6b45", "#2f9c63", "#e8f4ec", "#c2600a", "#f2f5f2", "#12211a", "#d9e4dd", "#b3372b"])}
    ${themeStrip("ocean", "Ocean", ["#0a6383", "#2496b4", "#e5f4f9", "#c2700a", "#f1f6f9", "#0c2230", "#d3e5ec", "#b3372b"])}
    ${themeStrip("amber", "Amber", ["#9c4a08", "#d97d0c", "#fcefdf", "#1a6b45", "#faf6f0", "#271a0c", "#eddfc9", "#a8301f"])}
    ${themeStrip("slate", "Slate — a dark theme in its own right, not an inversion", ["#7fb8e8", "#a8cdf0", "#1c2c40", "#e8973f", "#0b111a", "#dde6ef", "#27374b", "#f08a7d"])}
  </div>

  <div class="grid grid-2">
    <div class="card">
      <h3>Type — two faces, one job each</h3>
      <p class="small muted" style="margin:0 0 12px">IBM Plex Sans runs the interface. IBM Plex Mono carries anything that is a
      measurement or a reference — coordinates, permit numbers, m³, kWh, LTIFR, document references — because an ESSR is mostly
      readings, and readings have to line up in a column.</p>
      <div style="border-top:1px solid var(--line);padding-top:10px">
        <div style="font-size:1.95rem;font-weight:600;letter-spacing:-.021em;line-height:1.15;color:var(--ink-strong)">Compliance monitoring</div>
        <div class="small muted mono">h1 — 1.95rem / 600 / −0.021em</div>
      </div>
      <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
        <div style="font-size:1.4rem;font-weight:600;letter-spacing:-.015em">Water abstraction and discharge</div>
        <div class="small muted mono">h2 — 1.4rem / 600 / −0.015em</div>
      </div>
      <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
        <div style="font-size:1.06rem;font-weight:600">Table 4.3.1 — Water balance</div>
        <div class="small muted mono">h3 — 1.06rem / 600</div>
      </div>
      <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
        <div>Body copy sits at 14px on a 1.55 line, measured to 74 characters.</div>
        <div class="small muted mono">body — 14px / 1.55 / max 74ch</div>
      </div>
      <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:10px">
        <div class="mono" style="font-size:1.6rem;font-weight:500;letter-spacing:-.045em;color:var(--ink-strong)">4,318,905</div>
        <div class="small muted mono">figure — Plex Mono 500, tabular, −0.045em</div>
      </div>
    </div>

    <div class="card">
      <h3>Shape and elevation</h3>
      <p class="small muted" style="margin:0 0 12px">Radius by role: a control, a card and a feature panel are different objects.
      Elevation is spent only where something genuinely floats.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">
        <div style="flex:1;min-width:110px"><div style="height:52px;border-radius:7px;background:var(--surface);border:1px solid var(--border)"></div><div class="small mono muted" style="margin-top:5px">7px — control</div></div>
        <div style="flex:1;min-width:110px"><div style="height:52px;border-radius:12px;background:var(--surface);border:1px solid var(--border)"></div><div class="small mono muted" style="margin-top:5px">12px — card</div></div>
        <div style="flex:1;min-width:110px"><div style="height:52px;border-radius:16px;background:var(--surface);border:1px solid var(--border)"></div><div class="small mono muted" style="margin-top:5px">16px — feature</div></div>
        <div style="flex:1;min-width:110px"><div style="height:52px;border-radius:999px;background:var(--brand-3)"></div><div class="small mono muted" style="margin-top:5px">999px — pill</div></div>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <div style="flex:1;min-width:150px"><div style="height:58px;border-radius:12px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-raise)"></div><div class="small muted" style="margin-top:5px"><strong>raise</strong> — resting card</div></div>
        <div style="flex:1;min-width:150px"><div style="height:58px;border-radius:12px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-float)"></div><div class="small muted" style="margin-top:5px"><strong>float</strong> — the generated document only</div></div>
        <div style="flex:1;min-width:150px"><div style="height:58px;border-radius:16px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-modal)"></div><div class="small muted" style="margin-top:5px"><strong>modal</strong> — dialogs only</div></div>
      </div>
      <p class="small muted" style="margin:14px 0 0">Spacing runs 4 · 8 · 12 · 16 · 24 · 32 · 48. Content column caps at 1120px.</p>
    </div>
  </div>

  <div class="grid grid-2">
    <div class="card">
      <h3>Controls and their states</h3>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:8px">
        <span class="btn btn-primary">Generate report</span>
        <span class="btn">Rest</span><span class="btn btn-hover">Hover</span>
        <span class="btn btn-focus">Focus</span><span class="btn btn-disabled">Disabled</span>
        <span class="btn btn-sm">Small</span><span class="btn btn-ghost">Ghost</span>
      </div>
      <div class="grid grid-2" style="gap:12px;margin:12px 0 0">
        <div><label class="lbl" style="margin:0">Rest<span class="inp ph">Permit number</span></label></div>
        <div><label class="lbl" style="margin:0">Focus<span class="inp inp-focus">NEMA/WD/1188</span></label></div>
        <div><label class="lbl" style="margin:0">Computed — carried forward<span class="inp cell-computed mono">4,318,905</span></label></div>
        <div><label class="lbl" style="margin:0">Invalid<span class="inp inp-invalid mono">−12,000</span></label>
          <p class="calc-invalid" style="margin:6px 0 0">A stored volume cannot be negative.</p></div>
      </div>
      <div class="tabs" style="margin:18px 0 6px"><span class="tab-btn active">Register</span><span class="tab-btn">Regimes</span><span class="tab-btn">Calculations</span></div>
      <p class="small muted" style="margin:0">One segmented control with a single moving selection — not a row of buttons that each look chosen.</p>
    </div>

    <div class="card">
      <h3>State, encoded twice</h3>
      <p class="small muted" style="margin:0 0 10px">Colour is never the only signal. A badge carries a dot and a word; an
      overdue row carries a stripe; a bar carries its value.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
        <span class="badge badge-good">In date</span><span class="badge badge-warning">Due in 4 days</span>
        <span class="badge badge-serious">Action required</span><span class="badge badge-critical">Overdue 44 days</span>
        <span class="badge">Draft</span>
      </div>
      <table class="table"><thead><tr><th>Item</th><th>Due</th><th>Status</th></tr></thead><tbody>
        <tr class="row-overdue"><td>Mobile crane — thorough examination</td><td class="mono small">02 Aug 2026</td><td><span class="badge badge-critical">Overdue</span></td></tr>
        <tr><td>Winding rope — Shaft B</td><td class="mono small">19 Sep 2026</td><td><span class="badge badge-warning">Due soon</span></td></tr>
        <tr><td>Air receiver — compressor house</td><td class="mono small">14 Mar 2027</td><td><span class="badge badge-good">In date</span></td></tr>
      </tbody></table>
      <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
        <div style="flex:1;min-width:130px"><div class="kpi-tile kpi-good"><span class="kpi-value">9.3</span><span class="kpi-label">On target</span></div></div>
        <div style="flex:1;min-width:130px"><div class="kpi-tile kpi-warning"><span class="kpi-value">5.36</span><span class="kpi-label">Watch</span></div></div>
        <div style="flex:1;min-width:130px"><div class="kpi-tile kpi-critical"><span class="kpi-value">16.09</span><span class="kpi-label">Off target</span></div></div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3>Empty states earn their space</h3>
    <div class="grid grid-2" style="margin:0">
      <div style="border:1px solid var(--border);border-radius:var(--r-card)">
        <div class="empty-state">${illus("environment", "")}
          <p><strong>No monitoring results yet.</strong> Add a sampling round and Verda will chart it against the permit
          conditions for this site.</p>
          <span class="btn btn-sm">${icon("plus")}Add sampling round</span></div>
      </div>
      <div>
        <p class="small muted" style="margin:0">An empty table is the first thing a new user sees on half these screens. A line
        of grey text tells them nothing. The module's own illustration plus a sentence naming the next action tells them what
        the screen is for — which is the whole job of an empty state.</p>
        <p class="small muted">Seventeen illustrations ship with Verda, drawn for this product: pits and headframes, wetlands,
        crews, wildlife. No stock photography and nothing hotlinked, so they theme with everything else and work offline.</p>
      </div>
    </div>
  </div>

  <div class="card notice-card">
    <h4 style="margin:0">What this sheet does not cover</h4>
    <p class="small">Motion is deliberately thin: 120–160 ms on colour and border only, and every transition is disabled under
    <span class="mono">prefers-reduced-motion</span>. Nothing on a working screen slides, and nothing bounces.</p>
  </div>
</div>`;

/* ======================================================================
   Emit the artboards and the canvas layout
   ====================================================================== */
const DESK = 1440;
/* Frame heights are the rendered heights measured in a headless browser, plus
   ~5% slack. A fixed frame does not scale its artboard: too small clips, and
   surplus just paints the artboard's own background. */
const boards = [
  { file: "Main.dc.html",        title: "Dashboard",        width: DESK, h: 1640, body: shell("dashboard", dashMain) },
  { file: "Analytics.dc.html",   title: "Analytics",        width: DESK, h: 1605, body: shell("analytics", analyticsMain) },
  { file: "Inspections.dc.html", title: "Inspections",      width: DESK, h: 1300, body: shell("inspections", inspMain) },
  { file: "Reporting.dc.html",   title: "Verda Reporting",  width: DESK, h: 2790, body: shell("reporting", repMain) },
  { file: "Audits.dc.html",      title: "Audits",           width: DESK, h: 1775, body: shell("audits", auditMain) },
  { file: "Workflows.dc.html",   title: "Workflow run",     width: DESK, h: 1520, body: shell("workflows", wfMain) },
  { file: "Field.dc.html",       title: "Field capture",    width: 390,  h: 1350, body: fieldMain },
  { file: "System.dc.html",      title: "Design system",    width: 1200, h: 2460, body: systemMain }
];
for (const b of boards) {
  const bytes = artboard({ file: b.file, title: b.title, width: b.width, body: b.body });
  process.stdout.write(`${b.file.padEnd(22)} ${b.width}\u00d7${b.h}  ${(bytes / 1024).toFixed(0)} KB\n`);
}

/* Layout: Monitor screens across the top, the deliverable-shaped screens below,
   then the phone and the system sheet. Rows are 220px apart and columns 160px
   apart \u2014 the name strip and tweak chips sit above every frame. */
const at = {};
const place = (file, x, y) => { const b = boards.find(v => v.file === file); at[file] = { file, x, y, w: b.width, h: b.h }; };
const COL = [0, DESK + 160, 2 * (DESK + 160)];
place("Main.dc.html", COL[0], 0);
place("Analytics.dc.html", COL[1], 0);
place("Inspections.dc.html", COL[2], 0);
place("Reporting.dc.html", COL[0], 1860);
place("Audits.dc.html", COL[1], 1860);
place("Workflows.dc.html", COL[2], 1860);
place("Field.dc.html", COL[0], 4900);
place("System.dc.html", COL[0] + 700, 4900);

const canvas = {
  artboards: boards.map(b => at[b.file]),
  annotations: [
    { id: "brief", x: 0, y: -300, w: 330, text: "Verda \u2014 EHS and E&S compliance monitoring for industrial sites in Uganda, Kenya, Tanzania, Rwanda, DR Congo and Zambia. Static hi-fi mockups, matched value-for-value to app/styles.css." },
    { id: "row-monitor", x: 420, y: -220, w: 300, text: "Row 1 \u2014 Monitor: what is happening on site now. The dashboard, the auto-KPI engine, the equipment inspection register." },
    { id: "row-manage", x: 420, y: 1620, w: 300, text: "Row 2 \u2014 Manage: the deliverables. The ESSR builder with tables, photographs and carried-forward figures; an audit protocol being worked; a procedure in progress." },
    { id: "row-system", x: 0, y: 4640, w: 330, text: "Row 3 \u2014 the phone screen used standing on a bench, and the design system every board above is built from." }
  ],
  launch: { view: "canvas" }
};
writeFileSync(join(out, "canvas.json"), JSON.stringify(canvas, null, 2) + "\n");
process.stdout.write("canvas.json            " + canvas.artboards.length + " artboards\n");
