# Déclic

Site "photo → annonce" pour Vinted et eBay.

- `index.html` : le site complet (HTML, CSS et JS dans un seul fichier).
- `api/analyze.js` : fonction serveur (Vercel) qui appelle l'API Anthropic pour analyser les photos.

## À brancher hors de claude.ai
1. Analyse des photos : déployer sur Vercel, définir la variable `ANTHROPIC_API_KEY`, puis mettre `window.DECLIC_API="/api/analyze"` en haut de `index.html`.
2. Paiement : coller les liens Stripe (Payment Links) dans `window.DECLIC_STRIPE={plus:"…",pro:"…"}`.
3. Avis clients : aujourd'hui ils utilisent la base de données des artefacts claude.ai (`claude.use("db")`). Hors de claude.ai, il faut les brancher sur un vrai stockage (par exemple Supabase), avec validation avant publication.
4. Comptes et limites d'offre : stockés dans le navigateur (localStorage) ; à remplacer par de vrais comptes pour une mise en production.
