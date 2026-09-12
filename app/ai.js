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

  function bulletList(items) {
    return items.filter(Boolean).map(i => `  • ${i}`).join("\n");
  }

  function narrativeForSegment(seg, data, label) {
    const d = data || {};
    switch (seg) {
      case "safety":
        return `SAFETY\n` +
          `During the reporting period, ${d.incidents || "0"} incident(s) and ${d.nearMisses || "0"} near-miss event(s) were recorded. ` +
          `PPE compliance was observed at ${d.ppeCompliance || "N/A"}. ${d.trainingNote || "Routine safety briefings were conducted."}\n` +
          (d.notes ? `Notes: ${d.notes}\n` : "");
      case "security":
        return `SECURITY\n` +
          `${d.securityIncidents || "0"} security-related incident(s) were logged this period. Access control and site perimeter checks were carried out ${d.accessChecks || "as scheduled"}.\n` +
          (d.notes ? `Notes: ${d.notes}\n` : "");
      case "environment":
        return `ENVIRONMENT\n` +
          `Effluent and air monitoring were carried out ${d.monitoringFreq || "as scheduled"}. ${d.wasteNote || "Waste was segregated and handed to a licensed transporter."} ` +
          `${d.spillNote || "No uncontrolled spills were recorded."}\n` +
          (d.notes ? `Notes: ${d.notes}\n` : "");
      case "ghg":
        return `GHG\n` +
          `Estimated fuel/energy use for the period: ${d.energyUse || "not yet tracked"}. ${d.reductionActions || "No specific reduction actions logged this period."}\n` +
          (d.notes ? `Notes: ${d.notes}\n` : "");
      case "community":
        return `COMMUNITY\n` +
          `${d.grievances || "0"} grievance(s) were logged, of which ${d.grievancesClosed || "0"} were closed out. ${d.engagementNote || "No community engagement activities were scheduled this period."}\n` +
          (d.notes ? `Notes: ${d.notes}\n` : "");
      case "permitting":
        return `PERMITTING\n` +
          `Current permit status: ${d.permitStatus || "valid"}. Next renewal due: ${d.renewalDate || "not set"}. ${d.submissionNote || "No new submissions were made this period."}\n` +
          (d.notes ? `Notes: ${d.notes}\n` : "");
      default:
        // Any framework segment without a bespoke template — the IFC
        // Performance Standards, or an ESSR section — is rendered from its
        // own label, its numeric returns and whichever narrative blocks the
        // framework declares.
        return `${label || seg}\n` +
          ((d.notes && d.notes.trim())
            ? d.notes.trim()
            : "Status not yet recorded for this period. Add site data, monitoring results and any corrective actions before this report is issued.") + "\n";
    }
  }

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

  // A section under a framework that declares its own narrative blocks
  // (e.g. ESSR: monthly updates / cumulative KPI / management comment).
  function sectionWithBlocks(def, data, blocks) {
    const d = data || {};
    let out = `${def.label}\n${"-".repeat(Math.min(def.label.length, 71))}\n`;
    const returns = returnsBlock(d.inputs, def.fields);
    if (returns) out += `Returns for the period:\n${returns}`;
    let anyNarrative = false;
    blocks.forEach(b => {
      const text = (d[b.key] || "").trim();
      if (text) { anyNarrative = true; out += `\n${b.label}:\n${text}\n`; }
    });
    if (!anyNarrative) {
      // The ESSR convention: where nothing has changed since the previous
      // period, that is reported explicitly rather than left blank.
      out += returns
        ? `\n${blocks[blocks.length - 1].label}: No change to report for this period beyond the returns above.\n`
        : `\nNo change to report for this period. Confirm before issue — a section left blank is a finding at review.\n`;
    }
    return out;
  }

  function generateAIDraft({ clientName, period, segments, segmentData, standardTitle, segmentDefs, blocks, header, headerDefs }) {
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
    const useBlocks = Array.isArray(blocks) && blocks.length > 1;
    const body = segments.map(id => useBlocks
      ? sectionWithBlocks(defFor(id), segmentData[id] || {}, blocks)
      : narrativeForSegment(id, segmentData[id] || {}, labelFor(id))
    ).join("\n");

    const summary =
`\nSUMMARY\nThis report was compiled from the ${segments.length} selected section(s) above. ` +
`Review each section, add any site-specific context, and forward for sign-off before submission.`;

    return `${head}\n\n${body}${summary}`;
  }

  function generateEsiaDraft({ projectName, sections }) {
    const header =
`TERMS OF REFERENCE / ESIA REPORT DRAFT
Project: ${projectName || "—"}
Generated: ${new Date().toISOString().slice(0, 10)}
-----------------------------------------------------------------------\n`;
    const body = sections.map(s => `${s.title}\n${s.text && s.text.trim() ? s.text.trim() : "[Not yet completed — add input for this section.]"}`).join("\n\n");
    return header + body;
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
