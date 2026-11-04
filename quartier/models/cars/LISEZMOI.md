# Vrais modèles de voitures (facultatif)

1. Télécharge des voitures au format **.glb** (par exemple sur sketchfab.com, filtre « Downloadable », licence qui permet l'usage).
2. Mets les fichiers ici, dans `quartier/models/cars/`.
3. Crée `list.json` à côté :

```json
[
  { "file": "clio.glb", "length": 4.05, "rotate": 0, "weight": 3 },
  { "file": "golf.glb", "length": 4.28, "rotate": 180, "weight": 2 },
  { "file": "lambo.glb", "length": 4.6, "rotate": 0, "weight": 1 }
]
```

- `length` : longueur réelle de la voiture en mètres (le modèle est mis à l'échelle).
- `rotate` : rotation en degrés si la voiture roule « en marche arrière » (essaie 0, 90, 180, 270).
- `weight` : fréquence relative dans la circulation.

Les voitures fabriquées par le jeu restent utilisées pour 20 % du trafic.
