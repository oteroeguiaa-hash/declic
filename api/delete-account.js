// Suppression définitive du compte (droit à l'effacement, RGPD) :
// résilie l'abonnement Stripe en cours, puis efface le compte et toutes ses données.
import { allow, db, getProfile, getUser, send } from "./_lib.js";
import { stripe } from "./_stripe.js";

export default async function handler(req, res) {
  if (!allow(req, res, ["POST"])) return;
  const user = await getUser(req);
  if (!user) return send(res, 401, { error: "auth" });

  try {
    const profile = await getProfile(user);
    if (profile.stripe_subscription_id) {
      await stripe().subscriptions.cancel(profile.stripe_subscription_id).catch((e) => {
        if (e?.code !== "resource_missing") throw e;
      });
    }
    // Les profils, compteurs, annonces et avis sont supprimés en cascade.
    const { error } = await db().auth.admin.deleteUser(user.id);
    if (error) throw error;
    return send(res, 200, { ok: true });
  } catch (e) {
    console.error("delete-account", e?.message || e);
    return send(res, 500, { error: "server" });
  }
}
