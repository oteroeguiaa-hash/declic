# Balade 3D à Woluwe

Promenade à pied (ou en drone) dans Woluwe-Saint-Lambert et le parc Georges-Henri, sur les **tuiles 3D photoréalistes de Google** (les mêmes images que la vue 3D de Google Maps / Google Earth).

**Jouer** : ouvrir `/quartier/` sur le site, coller sa clé Google, écrire son adresse, puis « Partir de ma rue » ou « Parc Georges-Henri ».

- Clé : Google Cloud → activer **Map Tiles API** → créer une clé API (facturation à configurer, quota gratuit mensuel). La clé et l'adresse restent dans le navigateur (`localStorage`), rien n'est envoyé au dépôt.
- Adresses trouvées avec OpenStreetMap (Nominatim).
- Lieux : parc Georges-Henri, Cinquantenaire, rue Vergote, Hof ten Berg, Andromède, Docks Bruxsel, Woluwe Shopping, Court-Saint-Étienne, + n'importe quelle adresse et ses propres favoris (gardés dans le navigateur).
- Commandes : ZQSD / WASD, Maj pour courir, Espace pour sauter, 1-4 ou V vitesse ×1/×2/×5/×10, F drone, T lieux, H ma rue, P le parc. Sur téléphone : joystick à gauche, glisser à droite.
- Boutons du haut : Lieux, vitesse (une tape = plus vite : ×2, ×5, ×10… ×1 million, puis ×1), Drone / Marcher. Mini-carte : une tape ouvre la carte. Collisions jusqu'à ×100 à pied ; au-delà on survole les toits. Le monde se recentre tous les 3 km pour suivre la courbure de la Terre.
- **La ville la nuit** (`src/night.js`) : fenêtres allumées (petits rectangles posés étage par étage sur les façades des bâtiments OSM, pas sur les murs mitoyens ; hauteur OSM ou mesurée sur le toit), lampadaires (OSM, sinon le long des rues) qui éclairent la rue, traînées de phares blanches et rouges qui filent sur les grands axes. Automatique à la vraie nuit, ou bouton 🌙.
- **Heure de la journée** (bouton) : Maintenant, 5h, Lever, 10h, 12h, 16h, Coucher, 18h, 22h, Minuit — soleil à sa vraie position pour la date du jour (lever / coucher calculés), ciel avec disque et halo du soleil, façades face au soleil réchauffées quand il est bas.
- **Vie dans les rues** (`src/traffic.js`, modèles dans `src/cars.js`) : fausses voitures (carrosseries lissées, 7 silhouettes : citadine, compacte, berline, break, SUV, mini, supercar rare ; peinture brillante, jantes alu, passages de roue, optiques), trams et passants sur le vrai réseau OSM (voitures à droite, trams sur les rails, piétons sur les trottoirs), phares la nuit.
- **Magasins** (`src/shops.js`, `src/interior.js`) : en marche, devant un vrai commerce OSM (nom et type réels), bouton « Entrer » (ou E). Intérieur fabriqué selon le type (boulangerie, supermarché, pharmacie, café, vêtements, autre) avec articles et prix belges ; on prend des articles (E), on paye à la caisse, porte-monnaie de 50 € gardé dans le navigateur.
- **Rendu des magasins** : panneaux lumineux surfaciques (RectAreaLight), spots à ombres douces, occlusion ambiante (GTAO), léger halo, ACES ; sols / murs / bois avec relief (normal maps) ; emballages lisibles (marque, nom, illustration, contenance, Nutri-Score, code-barres). Qualité Normale : rendu simplifié.
- **Le vrai magasin** (`src/places.js`, facultatif) : avec « Maps JavaScript API » et « Places API (New) » activées sur la clé : vraies photos (affichées en bas à gauche), horaires (fermé = on ne peut pas entrer, selon l'heure choisie), note, couleurs de l'intérieur tirées des photos.
- **Vrais modèles de voitures** (facultatif) : voir `models/cars/LISEZMOI.md`.
- **Boussole sombre** : mini-carte ronde foncée qui tourne avec le regard, flèche fixe, N rouge sur le cadran.
- **Carte GPS** (`src/map.js`, Leaflet) : mini-carte ronde, grande carte (M) en plan ou satellite Google (Map Tiles API 2D, même clé) avec trafic Google en option, repli OpenStreetMap ; toucher la carte = s'y téléporter.
- **Ville construite par le jeu** (`src/citygen.js`) : là où la 3D Google manque (zones plates), chaque bâtiment OSM absent du relief est construit (façades brique / enduit avec fenêtres et porte, toit à quatre pans pour les maisons, plat pour les immeubles, hauteur OSM ou estimée) et les arbres OSM sont plantés. Détection bâtiment par bâtiment par un rayon sur le toit.
- **Ambiance sonore** (`src/ambience.js`) : rumeur de la ville, vent, voitures au loin, oiseaux le jour, pluie ; étouffée dans les magasins. Rendu « cinéma » dehors (vignette, grain) en qualité Haute / Ultra.
- **Marche** : photos Street View (Map Tiles API, même clé) projetées sur la 3D (`src/streetview.js`, désactivé à la demande : la 3D reste telle quelle) avec carte de profondeur pour les zones cachées ; vrais murs = bâtiments, murs et clôtures OpenStreetMap (`src/osmwalls.js`), fini les murs invisibles des arbres et voitures ; démarrage/arrêt progressifs ; bruits de pas synthétisés (`src/footsteps.js`). Orientation des photos ajustable avec `?svheading=`.
- Collisions à pied et en drone (petits pas + glissement le long des murs) : on ne traverse pas les bâtiments, même à ×10.
- Test sans clé Google : `/quartier/?tileset=/quartier/test-scene/tileset.json` (sol, immeuble, bordure, muret).
- **Météo et heure réelles** (Open-Meteo, sans clé, mise à jour toutes les 10 min) : ciel, nuit étoilée, lever/coucher du soleil, temps gris, brouillard selon la visibilité, pluie, neige. Pour tester : `?meteo=pluie`, `neige`, `brouillard`, `nuit` ou `soleil`.
- **Netteté / FPS** : détail maximal de Google dans un rayon autour du joueur (35 à 90 m selon la qualité), filtrage anisotrope des textures, collisions accélérées (three-mesh-bvh), résolution dynamique selon les FPS.
- Collisions et sol calculés par rayons sur le maillage 3D de Google : on marche sur les trottoirs, on monte les bordures, les façades arrêtent.

## Code

- `src/main.js` : le code source.
- `app.js` : version compilée chargée par la page. Après une modification : `npm run build:quartier`.
- `draco/` : décodeur Draco (géométrie compressée des tuiles).
