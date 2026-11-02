// Analyse des photos → annonce. Réservé aux comptes connectés, dans la limite de leur offre.
// Le serveur décide de tout : nombre de photos, modèle utilisé, version eBay, mots-clés, quota.
import Anthropic from "@anthropic-ai/sdk";
import { PLANS, allow, db, getProfile, getUser, month, send } from "./_lib.js";

export const config = { maxDuration: 60 };

const anthropic = new Anthropic(); // lit ANTHROPIC_API_KEY

const CATS = ["Vêtements", "Chaussures", "Électronique", "Mobilier", "Maison & déco", "Sport & loisirs", "Jeux & jouets", "Livres & médias", "Autre"];
const ETATS = ["Neuf avec étiquette", "Neuf sans étiquette", "Très bon état", "Bon état", "Satisfaisant", "Abîmé"];
const LANGS = { fr: "français", en: "anglais", es: "espagnol", de: "allemand", it: "italien" };
const MAX_IMAGE_CHARS = 1_400_000; // ~1 Mo par photo une fois décodée (le site les réduit avant l'envoi)

const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

function buildPrompt({ cat, details, etat, hint, lang }, withEbay) {
  const L = LANGS[lang] || LANGS.fr;
  return (
    `Tu es un expert de la revente d’occasion en Europe. À partir des photos, identifie l’objet, estime son prix d’occasion en euros et rédige l’annonce en ${L}.\n` +
    `Langue de l’annonce : ${L}. Le titre, la description, l’objet, la couleur et les mots-clés doivent être en ${L} (le champ « etat » reste une des valeurs françaises imposées).\n` +
    (cat === "auto"
      ? `Catégorie : à déterminer d’après les photos, parmi : ${CATS.join(", ")}. `
      : `Catégorie choisie par le vendeur : ${cat}. `) +
    `Informations du vendeur : ${details || "aucune"}. ` +
    (etat ? `État indiqué : ${etat}.` : "État à estimer d’après les photos.") + "\n" +
    (hint ? `Précisions du vendeur (prioritaires) : ${hint}\n` : "") +
    "N’invente aucun détail invisible : si une info est incertaine, mets une chaîne vide. Intègre les informations du vendeur dans les descriptions.\n" +
    "Version Vinted : titre de 60 caractères max au format « Objet marque taille couleur » ; description naturelle et chaleureuse de 3 à 6 lignes, terminée par 3 à 5 hashtags.\n" +
    (withEbay ? "Version eBay : titre de 80 caractères max riche en mots-clés ; description structurée et factuelle (caractéristiques, état, contenu), sans hashtags.\n" : "") +
    "Prix en euros (entiers) avec une fourchette de 20 euros maximum. « objet » : nom court avec marque et modèle si visibles. Donne 5 à 10 mots-clés de recherche."
  );
}

function schema(withEbay, auto) {
  const version = {
    type: "object",
    additionalProperties: false,
    required: ["titre", "description"],
    properties: { titre: { type: "string" }, description: { type: "string" } },
  };
  const properties = {
    objet: { type: "string" },
    marque: { type: "string" },
    couleur: { type: "string" },
    etat: { type: "string", enum: ETATS },
    prix: { type: "integer" },
    prix_min: { type: "integer" },
    prix_max: { type: "integer" },
    mots_cles: { type: "array", items: { type: "string" } },
    vinted: version,
  };
  if (withEbay) properties.ebay = version;
  if (auto) properties.categorie = { type: "string", enum: CATS };
  return { type: "object", additionalProperties: false, required: Object.keys(properties), properties };
}

export default async function handler(req, res) {
  if (!allow(req, res, ["POST"])) return;

  const user = await getUser(req);
  if (!user) return send(res, 401, { error: "auth" });

  const body = req.body || {};
  const images = Array.isArray(body.images) ? body.images : [];
  const cat = CATS.includes(body.cat) || body.cat === "auto" ? body.cat : "";
  const etat = ETATS.includes(body.etat) ? body.etat : "";
  if (!cat || images.length === 0) return send(res, 400, { error: "invalid" });

  const data = [];
  for (const img of images) {
    const m = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(String(img));
    if (!m || m[1].length > MAX_IMAGE_CHARS) return send(res, 400, { error: "image" });
    data.push(m[1]);
  }

  let profile;
  try {
    profile = await getProfile(user);
  } catch (e) {
    console.error("profile", e);
    return send(res, 500, { error: "server" });
  }
  const plan = PLANS[profile.plan] || PLANS.free;
  if (data.length > plan.ph) return send(res, 400, { error: "too_many_photos", max: plan.ph });

  // Réserve l'analyse avant d'appeler l'IA (atomique : impossible de dépasser la limite, même en parallèle).
  const m = month();
  const { data: used, error: rpcErr } = await db().rpc("consume_credit", {
    p_user: user.id, p_month: m, p_limit: plan.lim, p_photos: data.length,
  });
  if (rpcErr) {
    console.error("consume_credit", rpcErr);
    return send(res, 500, { error: "server" });
  }
  if (used == null) return send(res, 429, { error: "limit" });

  const refund = () => db().rpc("refund_credit", { p_user: user.id, p_month: m, p_photos: data.length });

  try {
    const fields = {
      cat,
      etat,
      details: clean(body.details, 400),
      hint: clean(body.hint, 300),
      lang: LANGS[body.lang] ? body.lang : "fr",
    };
    const content = data.map((b64) => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } }));
    content.push({ type: "text", text: buildPrompt(fields, plan.eb) });

    const msg = await anthropic.beta.messages.create({
      model: plan.deep ? "claude-opus-5-5" : "claude-sonnet-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default", // si le modèle décline, l'API réessaie sur le modèle de secours recommandé
      output_config: { effort: plan.deep ? "high" : "medium", format: { type: "json_schema", schema: schema(plan.eb, cat === "auto") } },
      messages: [{ role: "user", content }],
    });

    if (msg.stop_reason === "refusal" || msg.stop_reason === "max_tokens") throw new Error(`stop_reason ${msg.stop_reason}`);
    const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    const result = JSON.parse(text);
    if (!plan.kw) result.mots_cles = [];
    if (!plan.eb) delete result.ebay;

    return send(res, 200, { result, used });
  } catch (e) {
    console.error("analyze", e?.status || "", e?.message || e);
    await refund();
    if (e instanceof Anthropic.RateLimitError) return send(res, 503, { error: "busy" });
    return send(res, 502, { error: "failed" });
  }
}
