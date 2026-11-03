# Lisière

Jeu de survie en 3D dans le navigateur : une île générée au hasard, un cycle jour/nuit, la faim, la soif, le froid, des cerfs à chasser et des loups la nuit.

**Jouer** : ouvrir `/jeu/` sur le site (ordinateur ou téléphone en paysage). Le jeu s'installe comme une appli (« Ajouter à l'écran d'accueil ») et marche hors connexion.

## Ce qu'il y a dedans

- **Île procédurale** de 2,2 km de côté, avec une carte (touche M) et une mini-carte : plages, collines, forêts, montagnes rocheuses enneigées. Chaque « Nouvelle île » est différente.
- **Ciel physique** (diffusion atmosphérique), soleil et lune, étoiles, nuages, brouillard qui suit l'heure, reflets du ciel sur l'eau, écume sur le rivage.
- **Végétation** : ~18 000 arbres, rochers, buissons et objets au sol ; jusqu'à 70 000 brins d'herbe animés par le vent ; arbres qui se balancent et tombent quand on les abat.
- **Survie** : santé, faim, soif, endurance, chaleur. Boire à la rivière, manger des baies, chasser, cuire la viande.
- **Artisanat** : hache, pioche, lance, torche, gourde, feu de camp, abri (dormir, point de réapparition).
- **Faune** : cerfs qui fuient, loups qui chassent la nuit et craignent le feu.
- **Sons** 100 % synthétisés : vent, ressac, oiseaux, grillons, pas selon le sol, feu, hurlements.
- **Sauvegarde automatique** (dans le navigateur).

## Construction et aménagement

- **Construction modulaire** (`src/build.js`) : fondations (bois, pierre), planchers, murs (rondins, planches, pierre, fenêtre, porte), portes, escaliers, toits, piquets, clôtures, portails. Grille de 3 m avec points d'accroche, aperçu vert/rouge, rotation, détection des chevauchements, démontage et déplacement (ressources rendues). On marche sur les planchers, on monte les escaliers, les murs arrêtent joueur et animaux.
- **Mobilier** (`src/furniture.js`) : cuisine, salon, chambre, extérieur, en plusieurs styles. Meubles interactifs : rangements (coffres, armoire, frigo qui empêche la viande de s'abîmer), four / plaques / barbecue (cuisson), évier (eau), lit (dormir, réapparition), canapé et chaises (s'asseoir), lampes (lumière), télévision, console avec un jeu du serpent, potager, mangeoire, porte de garage.
- Tout est sauvegardé, y compris le contenu des rangements.

## Performances

- Trois niveaux (Rapide, Équilibré, Beau), choisis automatiquement selon l'appareil.
- Rendu par instances avec deux niveaux de détail pour les arbres et les rochers.
- Herbe entièrement calculée sur la carte graphique.
- Résolution dynamique : baisse toute seule si le jeu passe sous 40 images/s, remonte quand ça va mieux.
- Aucun fichier à télécharger à part le code (~800 Ko) : textures et sons sont générés.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page, interface, styles |
| `src/main.js` | Boucle de jeu, interactions, sauvegarde, menus |
| `src/world.js` | Relief, sol, eau |
| `src/sky.js` | Ciel, jour/nuit, lumières, nuages |
| `src/props.js` | Arbres, rochers, buissons, objets au sol, herbe |
| `src/creatures.js` | Cerfs et loups |
| `src/structures.js` | Feux de camp, abris, canoë |
| `src/build.js` | Système de construction |
| `src/furniture.js` | Mobilier et interactions |
| `src/fish.js` | Vie sous-marine |
| `src/post.js`, `src/reflection.js` | Image : réfraction, rayons, halo, brume, reflets |
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
