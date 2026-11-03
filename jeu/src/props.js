// Arbres, rochers, buissons, objets au sol + herbe.
// Rendu par instances avec deux niveaux de détail (proche / lointain), reconstruits quand le joueur bouge.
import * as THREE from "three";
import { mergeGeometries, mergeVertices } from "../vendor/addons/BufferGeometryUtils.js";
import { mulberry32, fbm, smoothstep, createNoise2D } from "./noise.js";
import { makeAtlas, makeBroadleaf, makeConifer, makeLeafBush, makeFern, makeLog, makeVegetationMaterial, vegUniforms } from "./trees.js";

// ---------- Fabrication des modèles ----------

function hash3(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function prep(geo) {
  let g = geo.index ? geo.toNonIndexed() : geo;
  g.deleteAttribute("uv");
  g.deleteAttribute("normal");
  return g;
}

function paint(geo, fn) {
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    fn(p.getX(i), p.getY(i), p.getZ(i), c);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}

function displace(geo, amount, freq, cx = 0, cy = 0, cz = 0) {
  const p = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.set(p.getX(i), p.getY(i), p.getZ(i));
    const n = hash3(Math.round(v.x * freq * 100) / 100, Math.round(v.y * freq * 100) / 100, Math.round(v.z * freq * 100) / 100) - 0.5;
    const dir = v.clone().sub(new THREE.Vector3(cx, cy, cz)).normalize();
    v.addScaledVector(dir, n * amount);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  return geo;
}

function finish(parts, smooth = true) {
  let g = mergeGeometries(parts);
  if (smooth) g = mergeVertices(g, 1e-3);
  g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

const lin = (hex) => new THREE.Color(hex);

function makeRock(lod, seed) {
  const g = prep(new THREE.IcosahedronGeometry(1, lod ? 0 : 1));
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = hash3(Math.round(x * 50 + seed), Math.round(y * 50), Math.round(z * 50)) * 0.45 + 0.75;
    x *= n * 1.25; z *= n; y *= n * 0.7;
    if (y < -0.15) y = -0.15 + (y + 0.15) * 0.3;
    p.setXYZ(i, x, y, z);
  }
  paint(g, (x, y, z, c) => {
    c.set(0x6d6a64).lerp(lin(0x8a867c), hash3(x * 4, y * 4, z * 4));
    if (y > 0.35 && hash3(x * 9, y, z * 9) > 0.55) c.lerp(lin(0x5c6b3a), 0.55); // mousse
    c.multiplyScalar(0.6 + 0.4 * Math.min(1, (y + 0.2) / 0.8));
  });
  return finish([g], false);
}

function makeStick() {
  const g = prep(new THREE.CylinderGeometry(0.035, 0.045, 1.1, 5, 1));
  g.rotateZ(Math.PI / 2); g.translate(0, 0.05, 0);
  const tw = prep(new THREE.CylinderGeometry(0.015, 0.025, 0.35, 4, 1));
  tw.rotateZ(0.9); tw.translate(0.2, 0.12, 0.05);
  paint(g, (x, y, z, c) => c.set(0x5a432c).lerp(lin(0x3a2a1a), hash3(x * 9, y, z)));
  paint(tw, (x, y, z, c) => c.set(0x5a432c));
  return finish([g, tw], false);
}

function makeFlint() {
  const g = prep(new THREE.DodecahedronGeometry(0.16, 0));
  g.scale(1.3, 0.6, 1);
  g.translate(0, 0.06, 0);
  paint(g, (x, y, z, c) => c.set(0x7c7a76).lerp(lin(0x9a968e), hash3(x * 20, y * 20, z * 20)));
  return finish([g], false);
}

// ---------- Types d'objets ----------

export const PROP_TYPES = {
  pine:  { kind: "tree", hp: 6, radius: 0.32, near: 75, center: 1.4, name: "Pin" },
  oak:   { kind: "tree", hp: 7, radius: 0.42, near: 75, center: 1.4, name: "Chêne" },
  birch: { kind: "tree", hp: 5, radius: 0.24, near: 75, center: 1.4, name: "Bouleau" },
  rock:  { kind: "rock", hp: 6, radius: 1.05, near: 70, center: 0.4, name: "Rocher" },
  bush:  { kind: "bush", hp: 1, radius: 0.0, near: 90, maxDist: 110, center: 0.5, name: "Buisson" },
  stick: { kind: "pickup", hp: 1, radius: 0, near: 45, maxDist: 45, center: 0.08, name: "Branche" },
  flint: { kind: "pickup", hp: 1, radius: 0, near: 45, maxDist: 45, center: 0.08, name: "Pierre" },
  fern:  { kind: "decor", hp: 1, radius: 0, near: 55, maxDist: 60, center: 0.35, name: "Fougère" },
  log:   { kind: "log", hp: 3, radius: 0, near: 70, maxDist: 150, center: 0.3, name: "Tronc couché" },
};
const CANDIDATES = 750000; // même nombre quelle que soit la qualité : l'île est identique partout

const CELL = 16;

export class Props {
  constructor(scene, world, quality, seed, renderer) {
    this.scene = scene;
    this.world = world;
    this.quality = quality;
    this.list = [];             // {t, x, y, z, ry, s, hp, alive, state, respawnAt}
    this.grid = new Map();
    this.byType = {};
    for (const k in PROP_TYPES) this.byType[k] = [];
    this.uniforms = { uTime: { value: 0 } };
    this.generate(seed);
    this.buildMeshes(renderer);
    this.lastBuild = new THREE.Vector3(1e9, 0, 1e9);
    this.dirty = true;
    this.falling = [];
    this.shakes = new Map();
  }

  key(cx, cz) { return cx * 73856093 ^ cz * 19349663; }

  addToGrid(id) {
    const p = this.list[id];
    const k = this.key(Math.floor(p.x / CELL), Math.floor(p.z / CELL));
    let arr = this.grid.get(k);
    if (!arr) this.grid.set(k, (arr = []));
    arr.push(id);
  }

  query(x, z, r, cb) {
    const x0 = Math.floor((x - r) / CELL), x1 = Math.floor((x + r) / CELL);
    const z0 = Math.floor((z - r) / CELL), z1 = Math.floor((z + r) / CELL);
    for (let cx = x0; cx <= x1; cx++) for (let cz = z0; cz <= z1; cz++) {
      const arr = this.grid.get(this.key(cx, cz));
      if (arr) for (const id of arr) cb(id, this.list[id]);
    }
  }

  add(t, x, z, s, rand, state = 1) {
    const id = this.list.length;
    const y = this.world.heightAt(x, z);
    this.list.push({ t, x, y, z, ry: rand() * Math.PI * 2, s, hp: PROP_TYPES[t].hp, alive: true, state, respawnAt: 0, s0: state });
    this.byType[t].push(id);
    this.addToGrid(id);
    return id;
  }

  generate(seed) {
    const rand = mulberry32(seed + 1234);
    const W = this.world;
    const forestN = createNoise2D(seed + 777);
    const thickN = createNoise2D(seed + 901);
    const R = W.half * 0.94;
    const tooClose = (x, z, d) => {
      let hit = false;
      this.query(x, z, d, (id, p) => {
        const k = PROP_TYPES[p.t].kind;
        if (!hit && (k === "tree" || k === "rock" || k === "bush") && (p.x - x) ** 2 + (p.z - z) ** 2 < d * d) hit = true;
      });
      return hit;
    };
    const near = (x, z, d) => { const a = rand() * 6.283, r = d * (0.4 + rand() * 0.6); return [x + Math.cos(a) * r, z + Math.sin(a) * r]; };
    const dry = (x, z) => W.streamAt(x, z) < 0.02 && W.heightAt(x, z) > 2.4;
    for (let i = 0; i < CANDIDATES; i++) {
      const x = (rand() * 2 - 1) * R, z = (rand() * 2 - 1) * R;
      const h = W.heightAt(x, z);
      if (h < 2.2) continue;
      const st = W.streamAt(x, z);
      const r = rand();
      if (st > 0.02) continue;
      const slope = W.slopeAt(x, z);
      const moist = W.moisture(x, z);
      const forest = fbm(forestN, x / 180, z / 180, 3) * 0.5 + 0.5;
      const thicket = fbm(thickN, x / 110, z / 110, 2);
      const bank = W.streamAt(x + 7, z) + W.streamAt(x - 7, z) + W.streamAt(x, z + 7) + W.streamAt(x, z - 7) > 0.05;

      // Bosquets : buissons partout, fougères, jeunes arbres, branches et troncs couchés
      if (thicket > 0.33 && h > 3 && h < 45 && slope < 0.28) {
        if (r < 0.22) {
          if (!tooClose(x, z, 1.6)) this.add("bush", x, z, 0.7 + rand() * 0.6, rand, rand() < 0.6 ? 1 : 0);
          for (let k = 0; k < 2; k++) { const [fx, fz] = near(x, z, 2.2); if (dry(fx, fz)) this.add("fern", fx, fz, 0.7 + rand() * 0.6, rand); }
          if (rand() < 0.35) { const [sx, sz] = near(x, z, 2.5); if (dry(sx, sz)) this.add("stick", sx, sz, 0.8 + rand() * 0.4, rand); }
          continue;
        }
        if (r < 0.28) {
          const t = rand() < 0.5 ? "birch" : "oak";
          if (!tooClose(x, z, 2.2)) this.add(t, x, z, 0.45 + rand() * 0.3, rand);
          continue;
        }
        if (r < 0.285) { this.add("log", x, z, 0.8 + rand() * 0.4, rand); continue; }
      }

      // Arbres
      if (h > 3.2 && h < 62 && slope < 0.32) {
        const dens = smoothstep(0.38, 0.68, forest * 0.75 + moist * 0.4 + (bank ? 0.15 : 0)) * (1 - smoothstep(45, 62, h));
        if (r < dens * 0.9) {
          let t;
          if (h > 30 || moist < 0.35) t = "pine";
          else if ((moist > 0.62 || bank) && rand() < 0.5) t = "birch";
          else t = rand() < 0.45 ? "pine" : "oak";
          if (!tooClose(x, z, t === "oak" ? 4.2 : 3.0)) {
            this.add(t, x, z, 0.75 + rand() * 0.55, rand);
            const r2 = rand();
            if (r2 < 0.22) { const [sx, sz] = near(x, z, 4); if (dry(sx, sz)) this.add("stick", sx, sz, 0.8 + rand() * 0.4, rand); }
            else if (r2 < 0.42) { const [fx, fz] = near(x, z, 3.5); if (dry(fx, fz)) this.add("fern", fx, fz, 0.7 + rand() * 0.5, rand); }
            else if (r2 < 0.435) { const [lx, lz] = near(x, z, 5); if (dry(lx, lz)) this.add("log", lx, lz, 0.8 + rand() * 0.4, rand); }
          }
          continue;
        }
      }
      // Rochers
      if (rand() < 0.014 + slope * 0.3 && h < 85) {
        if (!tooClose(x, z, 3)) this.add("rock", x, z, 0.6 + rand() * 1.6, rand);
        continue;
      }
      // Buissons (plus nombreux au bord des ruisseaux)
      if (h > 3 && h < 40 && slope < 0.25 && r < 0.06 * (0.4 + moist) * (bank ? 3 : 1)) {
        if (!tooClose(x, z, 2)) this.add("bush", x, z, 0.8 + rand() * 0.5, rand);
        continue;
      }
      // Fougères au bord de l'eau
      if (bank && r < 0.2) { this.add("fern", x, z, 0.8 + rand() * 0.5, rand); continue; }
      // Pierres au sol
      if (rand() < 0.04 && slope < 0.3) this.add("flint", x, z, 0.8 + rand() * 0.6, rand);
    }
  }

  buildMeshes(renderer) {
    const atlas = makeAtlas(renderer);
    const mat = makeVegetationMaterial(atlas);
    const depthMat = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: atlas, alphaTest: 0.42, side: THREE.DoubleSide });
    this.depthMat = depthMat;
    const plain = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
    const rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0, flatShading: true });
    this.materials = { tree: mat, rock: rockMat };

    const geos = {
      pine: [makeConifer(false, 11), makeConifer(true, 11)],
      oak: [makeBroadleaf(false, 21), makeBroadleaf(true, 21)],
      birch: [makeBroadleaf(false, 31, true), makeBroadleaf(true, 31, true)],
      rock: [makeRock(false, 1), makeRock(true, 1)],
      bush: [makeLeafBush(true)],
      bushEmpty: [makeLeafBush(false)],
      fern: [makeFern(5)],
      log: [makeLog(3)],
      stick: [makeStick()],
      flint: [makeFlint()],
    };
    this.geos = geos;
    this.meshes = {};
    for (const key in geos) {
      const baseType = key === "bushEmpty" ? "bush" : key;
      const cap = this.byType[baseType].length + 4;
      const kind = PROP_TYPES[baseType].kind;
      const m = kind === "rock" ? rockMat : kind === "pickup" ? plain : mat;
      const arr = geos[key].map((g, lod) => {
        const im = new THREE.InstancedMesh(g, m, cap);
        if (m === mat) im.customDepthMaterial = depthMat;
        im.count = 0;
        im.frustumCulled = false;
        im.castShadow = lod === 0 && kind !== "pickup" && kind !== "decor";
        im.receiveShadow = true;
        im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.scene.add(im);
        return im;
      });
      this.meshes[key] = arr;
    }
    // Matrices pré-calculées
    this.matrices = new Float32Array(this.list.length * 16);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      q.setFromAxisAngle(up, p.ry);
      const sy = PROP_TYPES[p.t].kind === "rock" ? p.s * (0.8 + hash3(i, 1, 2) * 0.6) : p.s;
      const sink = PROP_TYPES[p.t].kind === "tree" ? -0.25 : PROP_TYPES[p.t].kind === "rock" ? -0.15 * p.s : 0;
      m4.compose(new THREE.Vector3(p.x, p.y + sink, p.z), q, new THREE.Vector3(p.s, sy, p.s));
      m4.toArray(this.matrices, i * 16);
    }
    this.slot = new Int32Array(this.list.length).fill(-1);
  }

  renderKey(p) {
    if (p.t === "bush" && p.state === 0) return "bushEmpty";
    return p.t;
  }

  rebuild(cam) {
    const far2 = this.quality.viewDistance ** 2;
    const counts = {};
    for (const k in this.meshes) counts[k] = [0, 0];
    this.slot.fill(-1);
    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      if (!p.alive) continue;
      const def = PROP_TYPES[p.t];
      const d2 = (p.x - cam.x) ** 2 + (p.z - cam.z) ** 2;
      const maxD = def.maxDist ? def.maxDist * def.maxDist : far2;
      if (d2 > maxD) continue;
      const key = this.renderKey(p);
      const meshes = this.meshes[key];
      const lod = d2 < def.near * def.near * this.quality.lodScale || meshes.length === 1 ? 0 : 1;
      const im = meshes[lod];
      const n = counts[key][lod]++;
      im.instanceMatrix.array.set(this.matrices.subarray(i * 16, i * 16 + 16), n * 16);
      if (lod === 0) this.slot[i] = n;
    }
    for (const k in this.meshes) {
      this.meshes[k].forEach((im, lod) => {
        im.count = counts[k][lod];
        im.instanceMatrix.needsUpdate = true;
      });
    }
    this.lastBuild.copy(cam);
    this.dirty = false;
  }

  update(dt, cam, gameHours) {
    vegUniforms.uTime.value += dt;
    if (this.dirty || (cam.x - this.lastBuild.x) ** 2 + (cam.z - this.lastBuild.z) ** 2 > 36) this.rebuild(cam);

    // Petites secousses quand on frappe un arbre/rocher
    if (this.shakes.size) {
      const m4 = new THREE.Matrix4(), r = new THREE.Matrix4();
      for (const [id, t] of this.shakes) {
        const left = t - dt;
        const slot = this.slot[id];
        const p = this.list[id];
        if (slot >= 0) {
          const im = this.meshes[this.renderKey(p)][0];
          m4.fromArray(this.matrices, id * 16);
          if (left > 0) {
            const k = Math.sin(left * 40) * left * 0.12;
            r.makeRotationAxis(new THREE.Vector3(Math.cos(p.ry), 0, Math.sin(p.ry)), k);
            const pos = new THREE.Vector3().setFromMatrixPosition(m4);
            m4.setPosition(0, 0, 0).premultiply(r).setPosition(pos);
          }
          im.setMatrixAt(slot, m4);
          im.instanceMatrix.needsUpdate = true;
        }
        if (left <= 0) this.shakes.delete(id); else this.shakes.set(id, left);
      }
    }

    // Arbres qui tombent
    for (let i = this.falling.length - 1; i >= 0; i--) {
      const f = this.falling[i];
      f.t += dt;
      const k = Math.min(1, (f.t / 1.8) ** 2);
      f.mesh.quaternion.setFromAxisAngle(f.axis, k * Math.PI * 0.48).multiply(f.base);
      if (f.t > 1.8) f.mesh.position.y -= dt * 0.5;
      if (f.t > 4.5) { this.scene.remove(f.mesh); this.falling.splice(i, 1); }
    }

    // Repousse
    this.respawnTimer = (this.respawnTimer || 0) + dt;
    if (this.respawnTimer > 3) {
      this.respawnTimer = 0;
      for (const p of this.list) {
        if (p.respawnAt && gameHours >= p.respawnAt) {
          const near = (p.x - cam.x) ** 2 + (p.z - cam.z) ** 2 < 30 * 30;
          if (near && p.t !== "bush") continue; // pas sous les yeux du joueur
          p.alive = true; p.state = 1; p.hp = PROP_TYPES[p.t].hp; p.respawnAt = 0;
          this.dirty = true;
        }
      }
    }
  }

  // Cible la plus proche dans l'axe du regard.
  pick(origin, dir, maxDist) {
    let best = -1, bestT = maxDist;
    const v = new THREE.Vector3();
    this.query(origin.x, origin.z, maxDist + 2, (id, p) => {
      if (!p.alive) return;
      const def = PROP_TYPES[p.t];
      const cy = p.y + def.center * (def.kind === "tree" ? 1 : p.s);
      v.set(p.x - origin.x, 0, p.z - origin.z);
      let t, distToRay;
      if (def.kind === "tree") {
        // Tronc vertical : distance horizontale au rayon
        const dh = Math.hypot(dir.x, dir.z) || 1e-6;
        t = (v.x * dir.x + v.z * dir.z) / (dh * dh);
        const px = origin.x + dir.x * t, pz = origin.z + dir.z * t;
        const py = origin.y + dir.y * t;
        distToRay = Math.hypot(px - p.x, pz - p.z);
        if (py < p.y - 0.5 || py > p.y + 6) return;
        if (distToRay > def.radius * p.s + 0.35) return;
      } else {
        v.y = cy - origin.y;
        t = v.dot(dir);
        if (t < 0) return;
        const closest = origin.clone().addScaledVector(dir, t);
        distToRay = closest.distanceTo(new THREE.Vector3(p.x, cy, p.z));
        const rad = def.kind === "rock" ? 1.1 * p.s : def.kind === "bush" ? 0.95 * p.s : def.kind === "log" ? 1.3 : def.kind === "decor" ? 0.7 * p.s : 0.45;
        if (distToRay > rad) return;
        t = Math.max(0, t - rad * 0.6);
      }
      if (t > 0 && t < bestT) { bestT = t; best = id; }
    });
    return best >= 0 ? { id: best, dist: bestT, prop: this.list[best] } : null;
  }

  hit(id) {
    this.shakes.set(id, 0.35);
  }

  remove(id, gameHours, respawnHours, fall) {
    const p = this.list[id];
    p.alive = false;
    p.respawnAt = gameHours + respawnHours;
    this.dirty = true;
    if (fall) {
      const mesh = new THREE.Mesh(this.geos[p.t][0], this.materials.tree);
      const m4 = new THREE.Matrix4().fromArray(this.matrices, id * 16);
      m4.decompose(mesh.position, mesh.quaternion, mesh.scale);
      mesh.castShadow = true;
      mesh.customDepthMaterial = this.depthMat;
      this.scene.add(mesh);
      const away = new THREE.Vector3(fall.x, 0, fall.z).normalize();
      const axis = new THREE.Vector3(away.z, 0, -away.x).normalize();
      this.falling.push({ mesh, t: 0, axis, base: mesh.quaternion.clone() });
    }
  }

  setBush(id, state, gameHours, respawnHours) {
    const p = this.list[id];
    p.state = state;
    p.respawnAt = state === 0 ? gameHours + respawnHours : 0;
    this.dirty = true;
  }

  // Collisions : repousse un cercle (joueur/animal) hors des troncs et rochers.
  collide(pos, radius) {
    this.query(pos.x, pos.z, 4, (id, p) => {
      if (!p.alive) return;
      const def = PROP_TYPES[p.t];
      if (!def.radius) return;
      const r = def.radius * p.s + radius;
      if (def.kind === "rock" && pos.y > p.y + p.s * 0.9) return; // on est monté dessus
      const dx = pos.x - p.x, dz = pos.z - p.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < r * r && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        pos.x = p.x + (dx / d) * r;
        pos.z = p.z + (dz / d) * r;
      }
    });
  }

  // Vrai si aucun arbre/rocher dans le rayon donné.
  isClear(x, z, r) {
    let clear = true;
    this.query(x, z, r, (id, p) => {
      if (p.alive && PROP_TYPES[p.t].radius && (p.x - x) ** 2 + (p.z - z) ** 2 < r * r) clear = false;
    });
    return clear;
  }

  serialize() {
    const out = [];
    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      if (!p.alive || p.state !== p.s0 || p.hp !== PROP_TYPES[p.t].hp) out.push([i, p.alive ? 1 : 0, p.state, p.hp, Math.round(p.respawnAt * 100) / 100]);
    }
    return out;
  }

  restore(arr) {
    for (const [i, alive, state, hp, respawnAt] of arr || []) {
      const p = this.list[i];
      if (!p) continue;
      p.alive = !!alive; p.state = state; p.hp = hp; p.respawnAt = respawnAt;
    }
    this.dirty = true;
  }
}

// ---------- Herbe ----------
export class Grass {
  constructor(scene, world, quality) {
    const count = quality.grassCount;
    const R = quality.grassRadius;
    // Une instance = une touffe de 5 brins (densité ×5 pour le même nombre d'instances).
    const pos = [], bt = [], idx = [];
    const rb = mulberry32(7);
    const w = 0.03;
    for (let k = 0; k < 5; k++) {
      const ox = (rb() - 0.5) * 0.4, oz = (rb() - 0.5) * 0.4;
      const rot = rb() * Math.PI, hk = 0.65 + rb() * 0.6;
      const lx = (rb() - 0.5) * 0.25, lz = (rb() - 0.5) * 0.25;
      const c = Math.cos(rot), sn = Math.sin(rot);
      const base = pos.length / 3;
      const prof = [[-w, 0], [w, 0], [-w * 0.75, 0.4], [w * 0.75, 0.4], [-w * 0.4, 0.75], [w * 0.4, 0.75], [0, 1]];
      for (const [x, t] of prof) {
        const y = t * hk;
        pos.push(ox + x * c + lx * t * t, y, oz + x * sn + lz * t * t);
        bt.push(t);
      }
      idx.push(base, base + 1, base + 2, base + 2, base + 1, base + 3, base + 2, base + 3, base + 4, base + 4, base + 3, base + 5, base + 4, base + 5, base + 6);
    }
    const geo = new THREE.InstancedBufferGeometry();
    geo.setIndex(idx);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(new Array(pos.length).fill(0).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
    geo.setAttribute("bt", new THREE.Float32BufferAttribute(bt, 1));
    const off = new Float32Array(count * 4);
    const rand = mulberry32(99);
    for (let i = 0; i < count; i++) {
      off[i * 4] = (rand() * 2 - 1) * R;
      off[i * 4 + 1] = (rand() * 2 - 1) * R;
      off[i * 4 + 2] = rand() * Math.PI * 2;
      off[i * 4 + 3] = 0.3 + rand() * 0.35;
    }
    geo.setAttribute("aOff", new THREE.InstancedBufferAttribute(off, 4));
    geo.instanceCount = count;

    this.uniforms = {
      uTime: { value: 0 },
      uCam: { value: new THREE.Vector2() },
      uR: { value: R },
      tHeight: { value: world.heightTex },
      uHM: { value: world.hmTransform },
    };
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.uniforms, { uSunDir: vegUniforms.uSunDir, uSunCol: vegUniforms.uSunCol });
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform vec2 uCam; uniform float uR; uniform sampler2D tHeight; uniform vec2 uHM;
attribute vec4 aOff; attribute float bt; varying float vT; varying float vVar; varying vec3 vGW;`)
        .replace("#include <begin_vertex>", `
  vec2 wxz = uCam + mod(aOff.xy - uCam + uR, 2.0 * uR) - uR;
  vec2 hg = texture2D(tHeight, wxz * uHM.x + uHM.y).rg;
  float rnd = fract(sin(dot(floor(wxz * 7.0), vec2(12.9898, 78.233))) * 43758.5453);
  float keep = step(rnd, hg.g);
  float dist = length(wxz - uCam);
  float fade = 1.0 - smoothstep(uR * 0.55, uR, dist);
  float s = aOff.w * keep * fade;
  vec3 p = position;
  p.y *= s;
  p.xz *= keep * (0.7 + 0.3 * fade);
  float c = cos(aOff.z), sn = sin(aOff.z);
  p = vec3(p.x * c - p.z * sn, p.y, p.x * sn + p.z * c);
  float gust = sin(uTime * 1.7 + wxz.x * 0.25 + wxz.y * 0.18) * 0.5 + 0.5;
  float bend = bt * bt * s * (0.16 + 0.28 * gust);
  p.x += bend * 0.8; p.z += bend * 0.4;
  vec3 transformed = vec3(wxz.x, hg.r - 0.02, wxz.y) + p;
  vT = bt;
  vVar = fract(sin(dot(floor(wxz * 0.35), vec2(39.3, 11.7))) * 9137.1);
  vGW = transformed;`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying float vT; varying float vVar; varying vec3 vGW; uniform vec3 uSunDir; uniform vec3 uSunCol;")
        .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  vec3 toCamG = normalize(cameraPosition - vGW);
  float backG = pow(max(dot(-toCamG, uSunDir), 0.0), 3.0);
  totalEmissiveRadiance += diffuseColor.rgb * uSunCol * backG * vT * vT * 1.4;`)
        .replace("#include <normal_fragment_begin>", "#include <normal_fragment_begin>\n  normal = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);")
        .replace("#include <color_fragment>", `#include <color_fragment>
  vec3 base = pow(vec3(0.10, 0.17, 0.05), vec3(2.2));
  vec3 tipA = pow(vec3(0.40, 0.55, 0.17), vec3(2.2));
  vec3 tipB = pow(vec3(0.58, 0.56, 0.26), vec3(2.2));
  vec3 tipC = pow(vec3(0.30, 0.46, 0.14), vec3(2.2));
  vec3 tip = vVar < 0.33 ? tipA : vVar < 0.66 ? tipC : mix(tipA, tipB, 0.6);
  diffuseColor.rgb = mix(base, tip, smoothstep(0.0, 0.9, vT));`);
    };
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);
  }

  update(dt, cam) {
    this.uniforms.uTime.value += dt;
    this.uniforms.uCam.value.set(cam.x, cam.z);
  }
}
