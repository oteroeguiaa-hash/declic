# Balade 3D à Woluwe

Promenade à pied (ou en drone) dans Woluwe-Saint-Lambert et le parc Georges-Henri, sur les **tuiles 3D photoréalistes de Google** (les mêmes images que la vue 3D de Google Maps / Google Earth).

**Jouer** : ouvrir `/quartier/` sur le site, coller sa clé Google, écrire son adresse, puis « Partir de ma rue » ou « Parc Georges-Henri ».

- Clé : Google Cloud → activer **Map Tiles API** → créer une clé API (facturation à configurer, quota gratuit mensuel). La clé et l'adresse restent dans le navigateur (`localStorage`), rien n'est envoyé au dépôt.
- Adresses trouvées avec OpenStreetMap (Nominatim).
- Lieux : parc Georges-Henri, Cinquantenaire, rue Vergote, Hof ten Berg, Andromède, Docks Bruxsel, Woluwe Shopping, Court-Saint-Étienne, + n'importe quelle adresse et ses propres favoris (gardés dans le navigateur).
- Commandes : ZQSD / WASD, Maj pour courir, Espace pour sauter, 1-4 ou V vitesse ×1/×2/×5/×10, F drone, T lieux, H ma rue, P le parc. Sur téléphone : joystick à gauche, glisser à droite.
- Boutons du haut : Lieux, vitesse (une tape = plus vite : ×2, ×5, ×10… ×1 million, puis ×1), Drone / Marcher. Mini-carte : une tape ouvre la carte. Collisions jusqu'à ×100 à pied ; au-delà on survole les toits. Le monde se recentre tous les 3 km pour suivre la courbure de la Terre.
- **La ville la nuit** (`src/night.js`) : fenêtres allumées (petits rectangles posés étage par étage sur les façades des bâtiments OSM, pas sur les murs mitoyens ; hauteur OSM ou mesurée sur le toit), lampadaires (OSM, sinon le long des rues) qui éclairent la rue, traînées de phares blanches et rouges qui filent sur les grands axes. Automatique à la vraie nuit, ou bouton 🌙.
- **Boussole sombre** : mini-carte ronde foncée qui tourne avec le regard, flèche fixe, N rouge sur le cadran.
- **Carte GPS** (`src/map.js`, Leaflet) : mini-carte ronde, grande carte (M) en plan ou satellite Google (Map Tiles API 2D, même clé) avec trafic Google en option, repli OpenStreetMap ; toucher la carte = s'y téléporter.
- **Marche immersive** : photos Street View (Map Tiles API, même clé) projetées sur la 3D autour du joueur (`src/streetview.js`) avec carte de profondeur pour les zones cachées ; vrais murs = bâtiments, murs et clôtures OpenStreetMap (`src/osmwalls.js`), fini les murs invisibles des arbres et voitures ; démarrage/arrêt progressifs ; bruits de pas synthétisés (`src/footsteps.js`). Orientation des photos ajustable avec `?svheading=`.
- Collisions à pied et en drone (petits pas + glissement le long des murs) : on ne traverse pas les bâtiments, même à ×10.
- Test sans clé Google : `/quartier/?tileset=/quartier/test-scene/tileset.json` (sol, immeuble, bordure, muret).
- **Météo et heure réelles** (Open-Meteo, sans clé, mise à jour toutes les 10 min) : ciel, nuit étoilée, lever/coucher du soleil, temps gris, brouillard selon la visibilité, pluie, neige. Pour tester : `?meteo=pluie`, `neige`, `brouillard`, `nuit` ou `soleil`.
- **Netteté / FPS** : détail maximal de Google dans un rayon autour du joueur (35 à 90 m selon la qualité), filtrage anisotrope des textures, collisions accélérées (three-mesh-bvh), résolution dynamique selon les FPS.
- Collisions et sol calculés par rayons sur le maillage 3D de Google : on marche sur les trottoirs, on monte les bordures, les façades arrêtent.

## Code

- `src/main.js` : le code source.
- `app.js` : version compilée chargée par la page. Après une modification : `npm run build:quartier`.
- `draco/` : décodeur Draco (géométrie compressée des tuiles).
