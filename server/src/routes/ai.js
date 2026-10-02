/* Server-side Claude proxy.
 *
 * The whole point is that the API key lives here and never reaches a browser.
 * A key shipped to the client is a key anyone can read out of devtools and
 * spend, and no amount of obfuscation changes that.
 *
 * Three things this does beyond forwarding:
 *   1. Debits credits BEFORE the call and refunds on failure, so a crash does
 *      not hand out free generations and a failure does not silently charge.
 *   2. Holds one in-flight draft per organisation. Drafting is the expensive
 *      path; a double-clicked button should not become two bills.
 *   3. Records every call in the audit log with its token usage, because
 *      "why is the bill what it is" has to be answerable.
 */
import Anthropic from "@anthropic-ai/sdk";
import { requireRole } from "../lib/auth.js";
import * as repo from "../lib/repo.js";
import { config } from "../config.js";

const MODEL = "claude-opus-5-5";
const DRAFT_COST = 20;

/* A stable system prompt, cached: it is the same bytes on every request, so it
   is a prefix worth paying for once. Anything that varies goes in the user
   turn, below the cache breakpoint. */
const SYSTEM = `You are drafting narrative sections of an environmental, health and safety
compliance report for an industrial site in East or Central Africa — a mine, quarry, factory
or construction project. The report goes to a regulator and, on lender-financed work, to an
independent environmental and social consultant.

Rules you must follow:
- Write ONLY from the figures and notes supplied. Never invent a measurement, a date, a permit
  number, a limit or an incident. If something needed is missing, write "[not supplied]" rather
  than filling the gap.
- Do not state compliance or non-compliance with a limit unless the limit was supplied.
- Plain professional English, past tense, third person. No marketing language.
- Keep to the section asked for. Do not add recommendations unless asked.
- A reviewer must be able to trace every sentence back to a figure the user entered.`;

let client = null;
const getClient = () => (client ||= new Anthropic({ apiKey: config.anthropicKey }));

// org id -> true while a draft is running
const inFlight = new Set();

export default async function aiRoutes(app) {
  app.post("/api/orgs/:orgId/ai/draft", { preHandler: requireRole("member") }, async (req, reply) => {
    if (!config.anthropicKey) {
      return reply.code(503).send({ error: "drafting is not configured on this server" });
    }
    const { section, figures, notes, standard, period, siteName } = req.body || {};
    if (!section || typeof section !== "string") {
      return reply.code(400).send({ error: "section is required" });
    }

    if (inFlight.has(req.orgId)) {
      return reply.code(429).send({ error: "a draft is already running for this organisation" });
    }

    const balance = await repo.creditBalance(req.orgId);
    if (balance < DRAFT_COST) {
      return reply.code(402).send({ error: "not enough credits", balance, needed: DRAFT_COST });
    }

    inFlight.add(req.orgId);
    // Debit first. A refund is easy to reason about; a generation that was
    // never paid for is not.
    await repo.addCredits(req.orgId, req.user.id, -DRAFT_COST, `draft:${section}`);

    try {
      const response = await getClient().beta.messages.create({
        model: MODEL,
        max_tokens: 16000,
        // Thinking is always on for this model; effort is the control. Report
        // prose off a table of figures does not need the top of the range.
        output_config: { effort: "medium" },
        // A policy decline should degrade to another model rather than hand the
        // user an empty draft they have already been charged for.
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
        messages: [{
          role: "user",
          content: buildPrompt({ section, figures, notes, standard, period, siteName })
        }]
      });

      // A refusal arrives as HTTP 200. Read stop_reason before content, or an
      // empty draft looks like a successful one.
      if (response.stop_reason === "refusal") {
        await repo.addCredits(req.orgId, req.user.id, DRAFT_COST, "refund: declined");
        await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "ai.refused",
          entity: "section", entityId: section,
          detail: { category: response.stop_details?.category || null }, ip: req.ip });
        return reply.code(422).send({
          error: "the model declined to draft this",
          category: response.stop_details?.category || null
        });
      }

      const text = response.content.filter(b => b.type === "text").map(b => b.text).join("\n").trim();
      if (!text) {
        await repo.addCredits(req.orgId, req.user.id, DRAFT_COST, "refund: empty response");
        return reply.code(502).send({ error: "the model returned nothing" });
      }

      await repo.audit({
        orgId: req.orgId, userId: req.user.id, action: "ai.draft",
        entity: "section", entityId: section,
        detail: {
          model: response.model,
          input_tokens: response.usage?.input_tokens,
          output_tokens: response.usage?.output_tokens,
          cache_read: response.usage?.cache_read_input_tokens
        },
        ip: req.ip
      });

      return {
        text,
        model: response.model,
        creditsCharged: DRAFT_COST,
        balance: await repo.creditBalance(req.orgId)
      };
    } catch (err) {
      await repo.addCredits(req.orgId, req.user.id, DRAFT_COST, "refund: draft failed");
      // Typed classes, most specific first — never string-match an error.
      if (err instanceof Anthropic.AuthenticationError) {
        req.log.error("Anthropic rejected the server's API key");
        return reply.code(503).send({ error: "drafting is misconfigured on this server" });
      }
      if (err instanceof Anthropic.RateLimitError) {
        return reply.code(429).send({ error: "the drafting service is busy — try again shortly" });
      }
      if (err instanceof Anthropic.BadRequestError) {
        req.log.error({ err: err.message }, "bad request to Anthropic");
        return reply.code(400).send({ error: "that section could not be drafted as sent" });
      }
      if (err instanceof Anthropic.APIError) {
        req.log.error({ status: err.status, err: err.message }, "Anthropic API error");
        return reply.code(502).send({ error: "the drafting service failed" });
      }
      throw err;
    } finally {
      inFlight.delete(req.orgId);
    }
  });
}

/* The figures go in as a table rather than prose, so the model has nothing to
   infer and a reviewer can line the draft up against the input. */
export function buildPrompt({ section, figures, notes, standard, period, siteName }) {
  const lines = [];
  lines.push(`Draft the narrative for this report section.`);
  lines.push("");
  lines.push(`Section:   ${section}`);
  if (standard) lines.push(`Standard:  ${standard}`);
  if (period) lines.push(`Period:    ${period}`);
  if (siteName) lines.push(`Site:      ${siteName}`);
  lines.push("");
  const entries = Object.entries(figures || {}).filter(([, v]) => v !== "" && v !== null && v !== undefined);
  if (entries.length) {
    lines.push("Figures entered for this section:");
    for (const [k, v] of entries) lines.push(`  ${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`);
  } else {
    lines.push("No figures were entered for this section.");
  }
  if (notes) {
    lines.push("");
    lines.push("Notes from the monitor:");
    lines.push(String(notes));
  }
  lines.push("");
  lines.push("Write the narrative only — no heading, no preamble, no bullet list unless the figures are a list.");
  return lines.join("\n");
}
