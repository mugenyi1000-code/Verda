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

  function narrativeForSegment(seg, data) {
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
        return "";
    }
  }

  function generateAIDraft({ clientName, period, segments, segmentData }) {
    const header =
`EEIS REPORTING
Client: ${clientName || "—"}
Reporting Period: ${period || "—"}
Segments included: ${segments.map(s => s[0].toUpperCase() + s.slice(1)).join(", ")}
Generated: ${new Date().toISOString().slice(0, 10)}
-----------------------------------------------------------------------`;

    const body = segments.map(s => narrativeForSegment(s, segmentData[s] || {})).join("\n");

    const summary =
`\nSUMMARY\nThis report was compiled from the ${segments.length} selected segment(s) above. ` +
`Review each section, add any site-specific context, and forward to the client contact for sign-off.`;

    return `${header}\n\n${body}${summary}`;
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
