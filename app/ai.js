/* Verda AI Assist — drafting engine.
   -----------------------------------------------------------------------
   HONEST NOTE ON HOW THIS WORKS:
   Verda is a static, no-backend app. A real live call to the Claude API
   requires a server-side proxy so the API key is never exposed in the
   browser — that backend doesn't exist yet. Everything in this file is a
   deterministic, rule-based drafting engine that turns structured form
   input into readable prose, in the same shape a Claude-drafted report
   would take. It is intentionally isolated behind the functions below
   (generateAIDraft, generateAuditSummary, suggestSkills) so that wiring in
   a real POST to a Claude API backend later is a one-function swap, not a
   rewrite.
   ----------------------------------------------------------------------- */

const VerdaAI = (() => {

  /* Every framework's sections are now rendered from structured input —
     the tables, numeric returns and narrative blocks the user actually filled
     in. There are deliberately no per-segment prose templates: a template
     that prints "0 incidents, PPE compliance N/A" from fields nobody filled
     is inventing a compliance position, which is the one thing a report of
     this kind must never do. */

  // Renders one section's numeric/text returns as an aligned KPI block, so
  // the figures a reviewer checks first sit above the narrative.
  function returnsBlock(inputs, fieldDefs) {
    const defs = fieldDefs || [];
    const rows = defs
      .filter(f => inputs && inputs[f.key] !== undefined && String(inputs[f.key]).trim() !== "")
      .map(f => ({ label: f.label + (f.unit ? ` (${f.unit})` : ""), value: String(inputs[f.key]).trim() }));
    if (!rows.length) return "";
    const w = Math.max(...rows.map(r => r.label.length));
    return rows.map(r => `  ${r.label.padEnd(w)} : ${r.value}`).join("\n") + "\n";
  }

  // Renders one data table as fixed-width text, so the plain-text report
  // carries the same rows as the HTML one (a text report is what gets pasted
  // into an email or a regulator's portal).
  function textTable(tableDef, rows) {
    const cols = tableDef.columns.filter(c => rows.some(r => String(r[c.key] ?? "").trim()));
    if (!cols.length) return "";
    const header = cols.map(c => c.label + (c.unit ? ` (${c.unit})` : ""));
    const body = rows.map(r => cols.map(c => String(r[c.key] ?? "").replace(/\s+/g, " ").trim()));
    const w = header.map((hd, i) => Math.min(34, Math.max(hd.length, ...body.map(b => b[i].length))));
    const line = (cells) => "  " + cells.map((v, i) =>
      (v.length > w[i] ? v.slice(0, w[i] - 1) + "…" : v).padEnd(w[i])).join("  ").replace(/\s+$/, "");
    return `\n  ${tableDef.title}\n${line(header)}\n  ${w.map(n => "-".repeat(n)).join("  ")}\n` +
      body.map(line).join("\n") + "\n";
  }

  function tablesBlock(tables, tableDefs) {
    if (!tables || !tableDefs) return "";
    return tableDefs.map(t => {
      const rows = tables[t.id];
      return (rows && rows.length) ? textTable(t, rows) : "";
    }).join("");
  }

  // A section under a framework that declares its own narrative blocks
  // (e.g. ESSR: monthly updates / cumulative KPI / management comment).
  function sectionWithBlocks(def, data, blocks, tableDefs) {
    const d = data || {};
    let out = `${def.label}\n${"-".repeat(Math.min(def.label.length, 71))}\n`;
    const returns = returnsBlock(d.inputs, def.fields);
    if (returns) out += `Returns for the period:\n${returns}`;
    const tables = tablesBlock(d.tables, tableDefs);
    if (tables) out += tables;
    const photos = (d.photos || []).length;
    let anyNarrative = false;
    blocks.forEach(b => {
      const text = (d[b.key] || "").trim();
      if (text) { anyNarrative = true; out += `\n${b.label}:\n${text}\n`; }
    });
    if (!anyNarrative && !tables) {
      // The ESSR convention: where nothing has changed since the previous
      // period, that is reported explicitly rather than left blank.
      if (returns) {
        out += `\n${blocks[blocks.length - 1].label}: No change to report for this period beyond the returns above.\n`;
      } else if (photos) {
        out += `\nPhotographs are attached for this section but no narrative has been written. Describe what they show before this report is issued.\n`;
      } else {
        out += `\nNo change to report for this period. Confirm before issue — a section left blank is a finding at review.\n`;
      }
    }
    if (photos) out += `\n  [${photos} photograph(s) attached to this section — see the full report.]\n`;
    return out;
  }

  function generateAIDraft({ clientName, period, segments, segmentData, standardTitle, segmentDefs, blocks, header, headerDefs, tableDefs }) {
    const defs = segmentDefs || [];
    const defFor = (id) => defs.find((x) => x.id === id) || { id, label: id[0].toUpperCase() + id.slice(1) };
    const labelFor = (id) => defFor(id).label;
    const hdr = header || {};

    // Framework-specific header lines (ESSR: document no., version, project,
    // distribution list) sit above the standard client/period block.
    const extraHeader = (headerDefs || [])
      .filter(f => (hdr[f.key] || "").trim())
      .map(f => `${f.label}: ${hdr[f.key].trim()}`)
      .join("\n");

    const head =
`${standardTitle || "VERDA REPORTING"}
${extraHeader ? extraHeader + "\n" : ""}Client: ${clientName || "—"}
Reporting Period: ${period || "—"}
Sections included: ${segments.map(labelFor).join("; ")}
Generated: ${new Date().toISOString().slice(0, 10)}
-----------------------------------------------------------------------`;

    // A framework that declares narrative blocks gets the structured
    // section renderer; the modular segments keep their bespoke templates.
    const tablesFor = (id) => (tableDefs || {})[id] || null;
    const useBlocks = Array.isArray(blocks) && blocks.length > 1;
    const body = segments.map(id => useBlocks
      ? sectionWithBlocks(defFor(id), segmentData[id] || {}, blocks, tablesFor(id))
      : sectionWithBlocks(defFor(id), segmentData[id] || {}, blocks || [{ key: "notes", label: "Notes" }], tablesFor(id))
    ).join("\n");

    const summary =
`\nSUMMARY\nThis report was compiled from the ${segments.length} selected section(s) above. ` +
`Review each section, add any site-specific context, and forward for sign-off before submission.`;

    return `${head}\n\n${body}${summary}`;
  }

  /* The ToR and the ESIA are separate documents with separate titles. Both
     render their tables into the text version, because the plain-text copy is
     what gets pasted into an email or a regulator's portal and a table that
     only exists in the HTML is a table the reviewer never sees. */
  function generateEsiaDraft({ projectName, docTitle, meta, sections, tableDefs }) {
    const m = meta || {};
    const header =
`${docTitle || "TERMS OF REFERENCE / ESIA REPORT"}
Project: ${projectName || "—"}
Client / site: ${m.client || "—"}${m.author ? "\nPrepared by: " + m.author : ""}${m.ref ? "\nReference: " + m.ref : ""}
Generated: ${new Date().toISOString().slice(0, 10)}
-----------------------------------------------------------------------\n`;

    const body = sections.map(sec => {
      let out = `\n${sec.title}\n${"-".repeat(Math.min(sec.title.length, 71))}\n`;
      const text = (sec.text || "").trim();
      out += text ? text + "\n" : "[Not yet written — this section must be completed before the document is issued.]\n";
      const defs = (tableDefs || {})[sec.id] || [];
      out += tablesBlock(sec.tables, defs);
      const photos = (sec.photos || []).length;
      if (photos) out += `\n  [${photos} figure(s) attached to this section — see the full document.]\n`;
      return out;
    }).join("");

    const counts = sections.reduce((a, s) => {
      Object.values(s.tables || {}).forEach(rows => rows.forEach(r => {
        if (r.lat !== undefined && r.lng !== undefined && String(r.lat).trim() && String(r.lng).trim()) a.points++;
      }));
      return a;
    }, { points: 0 });

    const footer = `\n-----------------------------------------------------------------------
${sections.length} section(s)${counts.points ? `; ${counts.points} coordinate(s) recorded` : ""}.
Review every section before issue. Sections marked as not yet written must be completed.\n`;
    return header + body + footer;
  }

  function generateAuditSummary({ industry, findings }) {
    const nonCompliant = findings.filter(f => f.status === "Non-Compliant");
    const compliant = findings.filter(f => f.status === "Compliant");
    const na = findings.filter(f => f.status === "N/A");

    let text =
`EHS AUDIT FINDINGS SUMMARY\nIndustry checklist: ${industry}\nGenerated: ${new Date().toISOString().slice(0, 10)}\n` +
`-----------------------------------------------------------------------\n` +
`Items reviewed: ${findings.length}  |  Compliant: ${compliant.length}  |  Non-Compliant: ${nonCompliant.length}  |  N/A: ${na.length}\n\n`;

    if (nonCompliant.length === 0) {
      text += "No non-compliant items were identified in this audit. Maintain current controls and re-audit at the next scheduled interval.\n";
    } else {
      text += "NON-COMPLIANT ITEMS & RECOMMENDED CORRECTIVE ACTIONS:\n";
      text += nonCompliant.map(f =>
        `  • ${f.item}\n    Note: ${f.note || "—"}\n    Recommended action: Assign an owner, set a closure date, and re-verify at next visit.`
      ).join("\n");
      text += "\n";
    }
    return text;
  }

  function suggestSkills(freeText, keywordMap) {
    const t = (freeText || "").toLowerCase();
    const hits = [];
    keywordMap.forEach(rule => {
      const matched = rule.match.filter(k => t.includes(k));
      if (matched.length) hits.push({ suggest: rule.suggest, why: rule.why, matched });
    });
    // de-dupe by suggestion, keep richest match
    const seen = new Map();
    hits.forEach(h => {
      if (!seen.has(h.suggest) || seen.get(h.suggest).matched.length < h.matched.length) seen.set(h.suggest, h);
    });
    return Array.from(seen.values());
  }

  return { generateAIDraft, generateEsiaDraft, generateAuditSummary, suggestSkills };
})();
