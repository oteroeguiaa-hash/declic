// Outils partagés par les fonctions serveur. Le "_" au début du nom empêche Vercel d'en faire une route.
import { createClient } from "@supabase/supabase-js";

// Nettoie les variables d'environnement : un espace ou un retour à la ligne collé par erreur
// dans Vercel ne doit rien casser.
for (const [k, v] of Object.entries(process.env)) {
  if (typeof v === "string" && v !== v.trim()) process.env[k] = v.trim();
}

const ULTRA_CAP = Number(process.env.ULTRA_MONTHLY_CAP) || 300;

// Source de vérité des offres. Le navigateur a sa propre copie, uniquement pour l'affichage.
export const PLANS = {
  free: { n: "Gratuit", lim: 5, eb: false, kw: false, ph: 2, deep: false, shown: 5 },
  plus: { n: "Pro", lim: 60, eb: true, kw: true, ph: 4, deep: false, shown: 60 },
  pro: { n: "Ultra", lim: ULTRA_CAP, eb: true, kw: true, ph: 8, deep: true, shown: null }, // affichée « illimitée »
};

let _db;
// Client Supabase avec la clé service : contourne les règles RLS, à n'utiliser que côté serveur.
export function db() {
  if (!_db) {
    _db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _db;
}

// Mois en cours, en heure de Paris, pour que le compteur reparte bien le 1er à minuit.
export function month() {
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit" })
    .format(new Date())
    .slice(0, 7);
}

export function send(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(body);
}

// Renvoie l'utilisateur connecté (vérifié par Supabase à partir du jeton envoyé par le navigateur), ou null.
export async function getUser(req) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) return null;
  const { data, error } = await db().auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

// Profil du compte ; le recrée si le déclencheur d'inscription ne l'a pas fait.
export async function getProfile(user) {
  const { data } = await db().from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (data) return data;
  const { data: created, error } = await db()
    .from("profiles")
    .upsert({ id: user.id, name: String(user.user_metadata?.name || "").slice(0, 40) }, { onConflict: "id" })
    .select("*")
    .single();
  if (error) throw error;
  return created;
}

export function isAdmin(user) {
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return !!user?.email && list.includes(user.email.toLowerCase());
}

export function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, "");
  const proto = req.headers["x-forwarded-proto"] || "https";
  return `${proto}://${req.headers.host}`;
}

export function allow(req, res, methods) {
  if (methods.includes(req.method)) return true;
  res.setHeader("Allow", methods.join(", "));
  res.status(405).end();
  return false;
}
