// Ouvre le paiement Stripe pour l'offre demandée, ou l'espace client Stripe si un abonnement existe déjà
// (changement d'offre, résiliation, factures).
import { allow, getProfile, getUser, send, siteUrl } from "./_lib.js";
import { PRICE, customerFor, stripe } from "./_stripe.js";

export default async function handler(req, res) {
  if (!allow(req, res, ["POST"])) return;
  const user = await getUser(req);
  if (!user) return send(res, 401, { error: "auth" });

  const want = req.body?.plan; // "plus", "pro", ou "manage" pour l'espace client
  if (!["plus", "pro", "manage"].includes(want)) return send(res, 400, { error: "invalid" });

  try {
    const profile = await getProfile(user);
    const site = siteUrl(req);

    if (want === "manage" || profile.stripe_subscription_id) {
      if (!profile.stripe_customer_id) return send(res, 400, { error: "no_customer" });
      const portal = await stripe().billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${site}/?paiement=retour`,
        locale: "fr",
      });
      return send(res, 200, { url: portal.url });
    }

    if (!PRICE[want]) return send(res, 500, { error: "not_configured" });
    const customer = await customerFor(user, profile);
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      customer,
      client_reference_id: user.id,
      line_items: [{ price: PRICE[want], quantity: 1 }],
      subscription_data: { metadata: { user_id: user.id } },
      allow_promotion_codes: true,
      locale: "fr",
      success_url: `${site}/?paiement=ok`,
      cancel_url: `${site}/?paiement=annule`,
    });
    return send(res, 200, { url: session.url });
  } catch (e) {
    console.error("checkout", e?.message || e);
    return send(res, 502, { error: "stripe" });
  }
}
