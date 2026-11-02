// Traduction d’une annonce (titre + description) pour vendre à l’étranger.
// Réservée aux offres payantes ; ne consomme pas d’analyse (texte seul, très peu coûteux).
import Anthropic from "@anthropic-ai/sdk";
import { PLANS, allow, getProfile, getUser, send } from "./_lib.js";

export const config = { maxDuration: 30 };
const anthropic = new Anthropic();
const LANGS = { fr: "français", en: "anglais", es: "espagnol", de: "allemand", it: "italien" };
const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000b-\u001f]/g, " ").trim().slice(0, max);

export default async function handler(req, res) {
  if (!allow(req, res, ["POST"])) return;
  const user = await getUser(req);
  if (!user) return send(res, 401, { error: "auth" });

  const to = req.body?.to;
  const titre = clean(req.body?.titre, 150);
  const description = clean(req.body?.description, 2500);
  if (!LANGS[to] || !titre) return send(res, 400, { error: "invalid" });

  try {
    const profile = await getProfile(user);
    if (!PLANS[profile.plan] || profile.plan === "free") return send(res, 403, { error: "plan" });

    const msg = await anthropic.beta.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: {
        effort: "low",
        format: {
          type: "json_schema",
          schema: { type: "object", additionalProperties: false, required: ["titre", "description"], properties: { titre: { type: "string" }, description: { type: "string" } } },
        },
      },
      messages: [{
        role: "user",
        content:
          `Traduis cette annonce de vente d’occasion en ${LANGS[to]}, avec un ton naturel de vendeur local sur Vinted ou eBay. ` +
          "Garde les marques, tailles, chiffres et hashtags pertinents (traduis les hashtags quand c’est naturel). N’ajoute aucune information.\n\n" +
          `TITRE : ${titre}\n\nDESCRIPTION :\n${description}`,
      }],
    });
    if (msg.stop_reason === "refusal" || msg.stop_reason === "max_tokens") throw new Error(`stop_reason ${msg.stop_reason}`);
    const out = JSON.parse(msg.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
    return send(res, 200, { titre: String(out.titre || "").slice(0, 150), description: String(out.description || "").slice(0, 3000) });
  } catch (e) {
    console.error("translate", e?.status || "", e?.message || e);
    return send(res, 502, { error: "failed" });
  }
}
