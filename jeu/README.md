# Lisière

Jeu de survie en 3D dans le navigateur : une île générée au hasard, un cycle jour/nuit, la faim, la soif, le froid, des cerfs à chasser et des loups la nuit.

**Jouer** : ouvrir `/jeu/` sur le site (ordinateur, ou téléphone tenu à l'horizontale : un écran le demande au lancement). Le jeu s'installe comme une appli (« Ajouter à l'écran d'accueil ») et marche hors connexion.

## Ce qu'il y a dedans

- **Île procédurale de 4 × 4 km**, entièrement présente dès le lancement, avec une carte (touche M) et une mini-carte : chaîne de montagnes enneigées d'un côté de l'île, collines, vallées, rivières, lacs, marais, falaises côtières, criques et plages. Chaque « Nouvelle île » est différente.
- **Ciel physique** (diffusion atmosphérique), soleil et lune, étoiles, nuages, perspective aérienne (brume selon l'altitude, plus chaude vers le soleil), reflets sur l'eau, écume.
- **Forêts denses** : près de 200 000 arbres de 11 essences (chêne, vieux chêne, hêtre, bouleau, pin sylvestre, épicéa, sapin, peuplier, saule, arbre mort, jeune arbre), jeunes, adultes et anciens ; bosquets très serrés et clairières ; troncs couchés, racines, souches.
- **Sous-bois en couches** : herbe en vraies touffes (fleurs, herbes sèches, terre nue), couvre-sol, fougères, jeunes pousses et ronces, litière (brindilles, cailloux, pommes de pin), mousse.
- **Survie** : santé, faim, soif, endurance, chaleur. Boire à la rivière, manger des baies, chasser, cuire la viande.
- **Artisanat** : hache, pioche, lance, torche, gourde, feu de camp, abri (dormir, point de réapparition).
- **Faune** : cerfs qui fuient, loups qui chassent la nuit et craignent le feu.
- **Sons** 100 % synthétisés : vent, ressac, oiseaux, grillons, pas selon le sol, feu, hurlements.
- **Sauvegarde automatique** (dans le navigateur).

## Construction et aménagement

- **Construction modulaire** (`src/build.js`) : fondations (bois, pierre), planchers, murs (rondins, planches, pierre, fenêtre, porte), portes, escaliers, toits, piquets, clôtures, portails. Grille de 3 m avec points d'accroche, aperçu vert/rouge, rotation, détection des chevauchements, démontage et déplacement (ressources rendues). On marche sur les planchers, on monte les escaliers, les murs arrêtent joueur et animaux.
- **Mobilier** (`src/furniture.js`) : cuisine, salon, chambre, extérieur, en plusieurs styles. Meubles interactifs : rangements (coffres, armoire, frigo qui empêche la viande de s'abîmer), four / plaques / barbecue (cuisson), évier (eau), lit (dormir, réapparition), canapé et chaises (s'asseoir), lampes (lumière), télévision, console avec un jeu du serpent, potager, mangeoire, porte de garage.
- Tout est sauvegardé, y compris le contenu des rangements.

## Rendu

- **Arbres** générés par squelette (tronc, charpentières, branches, rameaux) ; écorces et feuillages dessinés au chargement avec leurs normal maps ; feuilles translucides à contre-jour ; vent différent selon l'essence et la taille (balancement, branches, frémissement des feuilles), ombres qui bougent avec.
- **Toute l'île à distance** : chaque modèle d'arbre est « photographié » sous 6 angles + vue de dessus (couleur et normales). Au loin, les arbres deviennent des imposteurs éclairés comme les arbres 3D, avec un fondu tramé invisible (pas d'apparition brutale).
- **Terrain** déplacé sur la carte graphique, avec morphing continu entre niveaux de détail (pas de saut), normales et occlusion au pixel : les montagnes gardent leur relief à plusieurs kilomètres.
- **Matériaux du sol PBR** (8 couches : herbe, litière, roche, sable, terre, neige, mousse, gravier) avec couleur, hauteur, normales et rugosité ; mélange par hauteur pour des transitions naturelles ; roche projetée sur 3 axes.
- **Post-traitement** : occlusion ambiante (SSAO), rayons de soleil, bloom très léger, tone mapping filmique ACES, étalonnage (ombres légèrement froides, hautes lumières chaudes), FXAA ou MSAA + alpha-to-coverage pour les feuillages.

## Performances

- Trois niveaux (Rapide, Équilibré, Beau), choisis automatiquement selon l'appareil, modifiables depuis l'accueil.
- Relief calculé en parallèle par plusieurs workers.
- Rendu par instances, découpage selon le champ de vision, niveaux de détail progressifs, ombres calculées sur des doublures allégées, imposteurs par blocs de 500 m.
- Herbe et sous-bois entièrement calculés sur la carte graphique.
- Résolution dynamique : baisse toute seule si le jeu ralentit, remonte quand ça va mieux.
- Aucun fichier à télécharger à part le code : textures et sons sont générés.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page, interface, styles |
| `src/main.js` | Boucle de jeu, interactions, sauvegarde, menus |
| `src/relief.js`, `src/relief-worker.js` | Relief de l'île (calculé en parallèle) |
| `src/world.js` | Terrain, sol, eau |
| `src/textures.js` | Matériaux PBR du sol |
| `src/trees.js` | Atlas, essences d'arbres, végétation |
| `src/impostors.js` | Forêts lointaines (imposteurs) |
| `src/ground.js` | Herbe et sous-bois |
| `src/sky.js` | Ciel, jour/nuit, lumières, nuages |
| `src/props.js` | Placement et rendu des arbres, rochers, buissons, objets au sol |
| `src/creatures.js` | Cerfs et loups |
| `src/structures.js` | Feux de camp, abris, canoë |
| `src/build.js` | Système de construction |
| `src/furniture.js` | Mobilier et interactions |
| `src/fish.js` | Vie sous-marine |
| `src/post.js`, `src/reflection.js` | Image : occlusion, perspective aérienne, rayons, halo, étalonnage, FXAA, réfraction, reflets |
| `src/player.js` | Déplacements, nage, survie, outil en main |
| `src/items.js` | Objets et recettes |
| `src/input.js`, `src/ui.js`, `src/audio.js` | Commandes, interface, sons |
| `vendor/` | Three.js r170 (copié ici pour fonctionner hors connexion) |

## Publier sur l'App Store / Google Play

Le jeu est déjà prêt à être emballé avec [Capacitor](https://capacitorjs.com) (tous les chemins sont relatifs) :

```bash
npm i @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init Lisiere com.tonnom.lisiere --web-dir jeu
npx cap add android && npx cap add ios
npx cap open android   # puis « Build > Generate Signed Bundle » dans Android Studio
```

Il faut un compte Google Play (25 $ une fois) et/ou Apple Developer (99 $/an, Mac obligatoire pour iOS).
