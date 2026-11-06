# Sprint des espèces

Simulateur 3D de courses entre humains et animaux, dans le navigateur. Il ne donne pas la victoire au plus rapide en pointe : le résultat dépend de la distance, de l'accélération, de l'endurance, de la fatigue, de la chaleur, du terrain et de la météo.

**Jouer** : ouvrir `/course/` sur le site. Aucune installation ni compte n'est nécessaire.

## Ce qu'il y a dedans

- **450 espèces, races et profils humains**, répartis en 19 catégories : humains (sprinteur, sprinteuse, demi-fond, marathon, ultra-trail, décathlon, nageur, club, jogging, non entraîné, surpoids, enfant, senior, chasseur San), félins, canidés (une quarantaine de races de chiens, loups, renards, chacals, coyote, lycaon…), hyènes et autres carnivores, bovins, équidés, grands herbivores, cervidés et antilopes, suidés, primates, marsupiaux, ours, petits mammifères, oiseaux coureurs, oiseaux volants, reptiles, animaux aquatiques, insectes et autres invertébrés.
- **Caractéristiques par espèce**, tirées de mesures publiées quand elles existent : vitesse de pointe, accélération, vitesse critique (aérobie), réserve anaérobie, masse, puissance, endurance, récupération, thermorégulation, longueur et fréquence de foulée. Certaines fiches citent leur source (Wilson 2013 pour le guépard, Lindstedt 1991 pour l'antilope d'Amérique, Hutchinson 2003 pour l'éléphant…).
- **2 à 8 couloirs** : humain contre animal, ou animaux entre eux.
- **Réglages** : distance (50 m à 10 km, ou personnalisée jusqu'à 100 km), terrain (piste, herbe, terre, route, sable, neige, boue, eau), météo (soleil, nuages, pluie, orage, vent de face ou de dos, brouillard, neige), température (−20 à 45 °C). Pour chaque concurrent : masse, condition physique, niveau d'entraînement (humains) et mode de locomotion (course, vol, nage) quand l'espèce en a plusieurs.
- **Prévision du modèle** avant le départ, sur plusieurs distances.

## Modèle physiologique (`src/physio.js`)

La base est le modèle de Keller (1973), utilisé en biomécanique du sprint :

- `dv/dt = F − v/τ` : la force propulsive `F` est limitée par `Fmax` ;
- `dE/dt = σ − F·v` : la réserve anaérobie `E` se vide au-dessus de la puissance aérobie `σ` et se recharge en dessous.

Ce modèle reproduit les records humains : 9,7 s au 100 m, 44,7 s au 400 m pour un sprinteur d'élite, 13 min au 5 km pour un fondeur. Il est étendu de plusieurs façons :

- la force maximale baisse quand la réserve s'épuise (fatigue neuromusculaire) ;
- l'aérobie démarre lentement (cinétique de la VO2) ;
- le glycogène s'épuise sur les longues distances (« le mur ») ;
- la chaleur corporelle s'accumule : chaque espèce dissipe plus ou moins bien, selon la température et la pluie ;
- le vent freine davantage les petits corps ;
- le terrain pénalise moins les pieds adaptés (coussinets du dromadaire sur le sable, renne et husky sur la neige) ;
- les reptiles et les insectes dépendent de la température ;
- l'allure dépend de l'espèce : l'humain gère sa course et finit au sprint, alors que le guépard part à fond puis doit marcher pour récupérer.

Résultat : le guépard bat le sprinteur au 100 m (5,7 s), mais perd sur 1 km et au-delà. Le pur-sang et l'autruche dominent le 5 km, et le lycaon et la hyène tiennent longtemps.

## Rendu 3D (`src/models.js`, `src/rig.js`, `src/parts.js`, `src/skin.js`)

- Chaque créature est un squelette d'os (tronc, cou, queue, pattes) recouvert d'une peau souple (SkinnedMesh), avec tête, oreilles, cornes, bois, crinière, bosses et trompe générées selon l'espèce.
- Les pattes suivent une **cinématique inverse** : chaque pied a une phase d'appui et une phase aérienne, calées sur la fréquence de foulée réelle à la vitesse du moment.
- Les **allures** changent avec la vitesse (nombre de Froude) : pas, trot, amble, petit galop, galop transverse (cheval), galop rotatoire (guépard, lévrier), bond, demi-bond (lièvre), saut (kangourou). La flexion du dos est marquée chez les félins. L'éléphant ne galope jamais, et le dromadaire et le trotteur gardent leur allure.
- Corps à part pour les humains (départ accroupi, bras, inclinaison à l'accélération, crawl dans l'eau), les oiseaux coureurs, les oiseaux en vol, les kangourous, les reptiles (pattes écartées, ondulation), les serpents, les cétacés et les poissons, les pinnipèdes, les insectes, les araignées et l'escargot.
- Pelages procéduraux calculés dans le shader : taches, rosettes, rayures, zèbre, girafe, holstein, dalmatien, etc. La respiration s'accélère avec la fatigue, et la peau des humains brille de sueur quand ils chauffent.
- Les très petits animaux peuvent être agrandis à l'image. La physique, elle, reste à l'échelle réelle.

## Course

- **Piste d'athlétisme** de 400 m. Les couloirs s'élargissent pour les grands animaux, et les départs sont décalés pour que tous courent la même distance. Les courses de 100 m et moins se font en ligne droite. Le terrain « Eau » remplace la piste par un canal bordé de bouées.
- **Caméras** : latérale (touche 1), première personne (2), aérienne (3), arrivée (4) et libre à la souris (5). La touche Tab ou un clic sur une ligne du tableau choisit le concurrent suivi.
- **Statistiques en direct** : vitesse instantanée et moyenne, distance, accélération, énergie, fatigue, réserve anaérobie, glycogène, échauffement, foulée, allure, position, et graphique de vitesse.
- **Résultats** : classement, écarts, pointe, moyenne, temps au 100 m, énergie à l'arrivée, foulée, temps de réaction, explication du résultat. Quatre graphiques : vitesse et énergie en fonction de la distance, fatigue et distance en fonction du temps.
- **Lecture** de ×0,25 à ×200, pause, et bouton « Terminer » qui calcule la fin de la course. Les concurrents trop lents, comme l'escargot au 100 m, reçoivent leur temps calculé par le même modèle.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Interface et styles |
| `src/main.js` | Préparation, course, caméras, tableau de bord, résultats |
| `src/species.js` | Catalogue des espèces et profils humains |
| `src/physio.js` | Modèle physiologique |
| `src/models.js` | Créatures 3D et animations |
| `src/rig.js` | Squelette, peau en tubes, cinématique inverse |
| `src/parts.js` | Têtes, cornes, bois, becs |
| `src/skin.js` | Matériaux et motifs de pelage |
| `src/world.js` | Stade, piste, canal, météo |
| `src/chart.js` | Graphiques |
| `vendor/` | three.js r170 et le ciel (`Sky.js`) |
