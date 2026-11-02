// Fonction serveur (Vercel : dossier /api). Clé à définir dans les variables d'environnement : ANTHROPIC_API_KEY
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { prompt, images = [], deep } = req.body || {};
  if (typeof prompt !== "string" || !prompt || !Array.isArray(images) || images.length === 0 || images.length > 8) {
    return res.status(400).json({ error: "requete invalide" });
  }
  const content = images.map((d) => ({
    type: "image",
    source: { type: "base64", media_type: "image/jpeg", data: String(d).split(",")[1] || "" },
  }));
  content.push({ type: "text", text: prompt });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: deep ? "claude-opus-5-5" : "claude-sonnet-5-5",
      max_tokens: 1200,
      messages: [{ role: "user", content }],
    }),
  });
  if (!r.ok) return res.status(502).json({ error: "service indisponible" });

  const j = await r.json();
  const text = (j.content || []).map((b) => b.text || "").join("");
  const m = text.match(/\{[\s\S]*\}/);
  try {
    return res.status(200).json(JSON.parse(m[0]));
  } catch (e) {
    return res.status(502).json({ error: "reponse illisible" });
  }
}
