// Worker : calcule une bande de la carte des hauteurs (plusieurs workers travaillent en parallèle).
import { Relief } from "./relief.js";

let relief = null;
self.onmessage = (e) => {
  const { seed, j0, j1 } = e.data;
  if (!relief || relief.seed !== seed) relief = new Relief(seed);
  const r = relief.computeRows(j0, j1);
  self.postMessage({ j0, j1, ...r }, [r.heights.buffer, r.stream.buffer, r.waterY.buffer, r.bio.buffer, r.veg.buffer]);
};
