// Stripe prévient ici à chaque paiement, changement d'offre ou résiliation.
// C'est le SEUL endroit où l'offre d'un compte change.
// À déclarer dans Stripe → Developers → Webhooks : URL https://ton-domaine.fr/api/stripe-webhook
// Événements : checkout.session.completed, customer.subscription.created,
//              customer.subscription.updated, customer.subscription.deleted
import { stripe, syncSubscription } from "./_stripe.js";

export const config = { api: { bodyParser: false } };

// La signature Stripe se vérifie sur le corps brut, octet pour octet.
// Ne jamais lire req.body ici : Vercel le décoderait en JSON et la signature ne correspondrait plus.
async function rawBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  let event;
  try {
    event = stripe().webhooks.constructEvent(await rawBody(req), req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    console.error("signature webhook invalide", e?.message);
    return res.status(400).send("signature invalide");
  }

  try {
    const o = event.data.object;
    if (event.type === "checkout.session.completed" && o.mode === "subscription" && o.subscription) {
      await syncSubscription(typeof o.subscription === "string" ? o.subscription : o.subscription.id);
    } else if (event.type.startsWith("customer.subscription.")) {
      await syncSubscription(o.id);
    }
    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("webhook", event.type, e?.message || e);
    return res.status(500).send("erreur"); // Stripe réessaiera
  }
}
