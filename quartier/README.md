# Balade 3D à Woluwe

Promenade à pied (ou en drone) dans Woluwe-Saint-Lambert et le parc Georges-Henri, sur les **tuiles 3D photoréalistes de Google** (les mêmes images que la vue 3D de Google Maps / Google Earth).

**Jouer** : ouvrir `/quartier/` sur le site, coller sa clé Google, écrire son adresse, puis « Partir de ma rue » ou « Parc Georges-Henri ».

- Clé : Google Cloud → activer **Map Tiles API** → créer une clé API (facturation à configurer, quota gratuit mensuel). La clé et l'adresse restent dans le navigateur (`localStorage`), rien n'est envoyé au dépôt.
- Adresses trouvées avec OpenStreetMap (Nominatim).
- Commandes : ZQSD / WASD, Maj pour courir, Espace pour sauter, F drone, H ma rue, P le parc. Sur téléphone : joystick à gauche, glisser à droite.
- **Météo et heure réelles** (Open-Meteo, sans clé, mise à jour toutes les 10 min) : ciel, nuit étoilée, lever/coucher du soleil, temps gris, brouillard selon la visibilité, pluie, neige. Pour tester : `?meteo=pluie`, `neige`, `brouillard`, `nuit` ou `soleil`.
- **Netteté / FPS** : détail maximal de Google dans un rayon autour du joueur (35 à 90 m selon la qualité), filtrage anisotrope des textures, collisions accélérées (three-mesh-bvh), résolution dynamique selon les FPS.
- Collisions et sol calculés par rayons sur le maillage 3D de Google : on marche sur les trottoirs, on monte les bordures, les façades arrêtent.

## Code

- `src/main.js` : le code source.
- `app.js` : version compilée chargée par la page. Après une modification : `npm run build:quartier`.
- `draco/` : décodeur Draco (géométrie compressée des tuiles).
