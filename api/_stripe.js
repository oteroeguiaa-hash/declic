import Stripe from "stripe";
import { db } from "./_lib.js";

let _stripe;
export function stripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return _stripe;
}

export const PRICE = { plus: process.env.STRIPE_PRICE_PLUS, pro: process.env.STRIPE_PRICE_PRO };

export function planFromPrice(priceId) {
  if (priceId && priceId === PRICE.pro) return "pro";
  if (priceId && priceId === PRICE.plus) return "plus";
  return null;
}

// Client Stripe du compte ; créé au premier paiement.
export async function customerFor(user, profile) {
  if (profile.stripe_customer_id) return profile.stripe_customer_id;
  const c = await stripe().customers.create({ email: user.email, metadata: { user_id: user.id } });
  await db().from("profiles").update({ stripe_customer_id: c.id }).eq("id", user.id);
  return c.id;
}

// Recopie l'état réel d'un abonnement Stripe dans le profil. Relit toujours Stripe :
// l'ordre d'arrivée des webhooks n'a donc pas d'importance.
export async function syncSubscription(subscriptionId) {
  const sub = await stripe().subscriptions.retrieve(subscriptionId);
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  let userId = sub.metadata?.user_id;
  if (!userId) {
    const { data } = await db().from("profiles").select("id").eq("stripe_customer_id", customerId).maybeSingle();
    userId = data?.id;
  }
  if (!userId) throw new Error(`aucun compte pour le client ${customerId}`);

  const live = ["active", "trialing", "past_due"].includes(sub.status);
  const plan = live ? planFromPrice(sub.items.data[0]?.price?.id) || "free" : "free";

  // Un abonnement résilié ne doit pas écraser un abonnement plus récent du même compte.
  const { data: prof } = await db().from("profiles").select("stripe_subscription_id").eq("id", userId).maybeSingle();
  if (!live && prof?.stripe_subscription_id && prof.stripe_subscription_id !== sub.id) return;

  await db()
    .from("profiles")
    .update({ plan, stripe_customer_id: customerId, stripe_subscription_id: live ? sub.id : null })
    .eq("id", userId);
}
