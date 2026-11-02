// Validation des avis clients, réservée aux adresses listées dans ADMIN_EMAILS.
import { allow, db, getUser, isAdmin, send } from "./_lib.js";

export default async function handler(req, res) {
  if (!allow(req, res, ["GET", "POST"])) return;
  const user = await getUser(req);
  if (!user || !isAdmin(user)) return send(res, 403, { error: "forbidden" });

  if (req.method === "GET") {
    const { data, error } = await db()
      .from("reviews")
      .select("id,name,stars,body,cat,created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) return send(res, 500, { error: "server" });
    return send(res, 200, { pending: data });
  }

  const id = Number(req.body?.id);
  const action = req.body?.action;
  if (!Number.isInteger(id) || !["publish", "reject"].includes(action)) return send(res, 400, { error: "invalid" });

  const q = action === "publish"
    ? db().from("reviews").update({ status: "published" }).eq("id", id)
    : db().from("reviews").delete().eq("id", id);
  const { error } = await q;
  if (error) return send(res, 500, { error: "server" });
  return send(res, 200, { ok: true });
}
