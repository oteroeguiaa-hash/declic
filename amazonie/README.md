# Selva

Jeu de survie en 3D dans le navigateur, au cœur de la forêt amazonienne : une île du fleuve Amazone générée au hasard, des journées de 12 h sous l'équateur, la chaleur humide, les averses tropicales, la fièvre, les serpents venimeux, le jaguar et le caïman.

**Jouer** : ouvrir `/amazonie/` sur le site (ordinateur, ou téléphone tenu à l'horizontale). Le jeu s'installe comme une appli et marche hors connexion. Il est construit sur le moteur de « Lisière » (`/jeu`), dont il reprend le rendu, la construction et le mobilier.

## Le paysage

- **Île fluviale de 4 × 4 km**, effilée dans le sens du courant, entourée par le fleuve aux eaux limoneuses couleur café au lait (opaques, on n'y voit pas le fond). Berges en **barrancos** (talus de terre rouge de 3 à 9 m) ou **plages de sable**.
- **Terra firme** : plateaux bas aux sommets aplatis, entaillés par les **igarapés** (ruisseaux couleur thé).
- **Várzea et igapó** : grandes plaines au ras de l'eau, forêt les pieds dans l'eau, **lacs aux eaux noires** dont des anciens méandres en croissant, **vitórias-régias** (nénuphars géants) qui flottent.
- **Forêt à plusieurs étages** (près de 280 000 arbres) : **sumaúmas** (fromagers) émergents de 40 à 50 m avec leurs immenses contreforts, **castanheiras** (noyers du Brésil), **angelins**, arbres du dossel aux feuilles vernissées, **apuís** (figuiers étrangleurs avec treillis de racines et racines aériennes), **embaúbas** (Cecropia) aux feuilles palmées argentées, palmiers **açaí** (touffes), **buriti** (palmes en éventail, marais) et **paxiúba** (sur racines-échasses), sous-étage d'arbustes, quelques **ipês en fleurs** (rose, jaune, violet) dans la canopée.
- **Sous-bois** : litière de grandes feuilles mortes, fougères, **héliconias** (bractées rouges et jaunes), plantules, troncs couchés, camu-camu.
- **Ciel équatorial** : soleil presque au zénith, nuit qui tombe d'un coup vers 18 h, air humide et brumeux, cumulus, brume à l'aube et après la pluie, **averses tropicales** (surtout l'après-midi) avec rideaux de pluie, ciel gris, **orages** (éclairs, tonnerre).
- **Sons 100 % synthétisés** : cigales, singes hurleurs à l'aube, piha « capitão-do-mato », aras, grenouilles la nuit, pluie sur les feuilles, rugissement du jaguar.

## La survie

- Santé, faim, soif, endurance, chaleur, plus : **mouillé** 🌧️, **fièvre** 🤒 et **venin** 🐍.
- **L'eau du fleuve rend malade** : il faut faire bouillir l'eau de la gourde près d'un feu, ou la laisser se remplir sous la pluie (eau saine).
- **Chaleur humide** : on a soif bien plus vite au soleil ; la viande se gâte en une journée.
- **Trempé la nuit**, on grelotte (feu, cape de pluie en palmes).
- **Moustiques** au crépuscule près de l'eau (fièvre) : un feu ou une torche les éloigne.
- **Serpents venimeux** (jararaca, surucucu, serpent corail) immobiles dans le sous-bois : avancer accroupi. **Tisane d'écorce** contre la fièvre et le venin.
- **Faune** : jaguar (parfois noir) qui traque puis bondit, puma, caïman noir à l'affût dans l'eau, hardes de pécaris à lèvres blanches, pécari à collier, tapir, tamanoir, capybaras, daguet rouge, agouti, paca, coatis, ocelot ; 22 oiseaux (aras, toucans, hoazin, jabiru, harpie, urubus…), 13 poissons (pirarucu, piranhas, tambaqui, néons…), dendrobates, rainettes, iguane, boa, anaconda, morphos bleus.
- **Artisanat** : outils en bois puis en pierre, **machette**, lance, torche, gourde, **tisane**, **cape de pluie**, feu de camp, **tapiri** (abri en palmes), **pirogue**. Noix du Brésil sous les castanheiras, baies d'açaí, camu-camu.

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

## Fichiers propres à Selva

| Fichier | Rôle |
|---|---|
| `src/relief.js` | Île fluviale : terra firme, várzea, lacs en croissant, barrancos, plages |
| `src/trees.js` | Écorces et feuillages tropicaux, 11 essences (contreforts, palmes pennées et en éventail, racines aériennes), héliconia, vitória-régia |
| `src/props.js` | Répartition de la forêt par étages et par milieu |
| `src/rain.js` | Rideaux de pluie |
| `src/sky.js` | Ciel équatorial, météo (averses, orages) |
| `src/creatures.js`, `src/birds.js`, `src/fish.js`, `src/herps.js`, `src/insects.js` | Faune amazonienne |
| `src/player.js`, `src/main.js` | Survie : fièvre, venin, pluie, eau à faire bouillir, moustiques |

Les autres fichiers sont ceux du moteur de Lisière (voir `/jeu/README.md`).
