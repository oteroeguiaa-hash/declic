// Configuration publique lue par le navigateur au chargement de la page.
// La clé "anon" de Supabase est faite pour être publique : les règles RLS protègent les données.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  });
}
