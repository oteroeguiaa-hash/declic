// Infos du compte connecté : offre, compteur du mois, droits d'administration.
import { PLANS, allow, db, getProfile, getUser, isAdmin, month, send } from "./_lib.js";

export default async function handler(req, res) {
  if (!allow(req, res, ["GET"])) return;
  const user = await getUser(req);
  if (!user) return send(res, 401, { error: "auth" });

  try {
    const profile = await getProfile(user);
    const { data: rows } = await db().from("monthly_usage").select("month,count,photos").eq("user_id", user.id);
    const m = month();
    const cur = (rows || []).find((r) => r.month === m);
    const plan = PLANS[profile.plan] ? profile.plan : "free";

    // Activité des 6 derniers mois (du plus ancien au plus récent), pour le graphique du profil.
    const [y, mo] = m.split("-").map(Number);
    const history = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(Date.UTC(y, mo - 1 - i, 1));
      const key = d.toISOString().slice(0, 7);
      history.push({ month: key, count: (rows || []).find((r) => r.month === key)?.count || 0 });
    }

    return send(res, 200, {
      history,
      total: (rows || []).reduce((s, r) => s + (r.count || 0), 0),
      email: user.email,
      name: profile.name,
      pref: profile.pref,
      since: profile.created_at,
      plan,
      used: cur?.count || 0,
      limit: PLANS[plan].shown, // null = illimité à l'affichage
      photos: (rows || []).reduce((s, r) => s + (r.photos || 0), 0),
      subscribed: !!profile.stripe_subscription_id,
      admin: isAdmin(user),
    });
  } catch (e) {
    console.error("me", e);
    return send(res, 500, { error: "server" });
  }
}
