// Imposteurs de forêt : chaque modèle d'arbre est « photographié » au chargement sous 6 angles + vue de dessus
// (couleur et normales). Au loin, chaque arbre devient deux cartes (verticale + horizontale) qui affichent
// la bonne vue, éclairées comme les arbres 3D. Toute l'île garde ses forêts, jusqu'à l'horizon,
// avec un fondu tramé invisible entre arbres 3D et imposteurs.
import * as THREE from "three";
import { vegUniforms } from "./trees.js";

const ANGLES = 6, PER = ANGLES + 1;

export class ImpostorBaker {
  // entries : [{ geo, height, crownR, crownY, avgColor }]
  constructor(renderer, atlas, entries, tile = 128) {
    this.tile = tile;
    const cols = Math.floor(2048 / tile) >= 16 ? 16 : Math.floor(2048 / tile);
    this.cols = cols;
    const rows = Math.ceil((entries.length * PER) / cols);
    this.size = [cols * tile, rows * tile];
    const mk = (srgb) => {
      const rt = new THREE.WebGLRenderTarget(cols * tile, rows * tile, { depthBuffer: true, samples: 4 });
      rt.texture.generateMipmaps = false;     // activées une seule fois, après la prise de vue
      rt.texture.minFilter = THREE.LinearMipmapLinearFilter;
      rt.texture.magFilter = THREE.LinearFilter;
      if (srgb) rt.texture.colorSpace = THREE.SRGBColorSpace;
      return rt;
    };
    this.albedoRT = mk(false);   // linéaire : un tampon multi-échantillonné sRGB n'est pas fiable partout
    this.normalRT = mk(false);
    const common = {
      vertexShader: `
        attribute vec3 color; varying vec2 vUv; varying vec3 vCol; varying vec3 vN;
        void main(){ vUv = uv; vCol = color; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      side: THREE.DoubleSide,
    };
    const albedoMat = new THREE.ShaderMaterial({
      ...common, uniforms: { map: { value: atlas } },
      fragmentShader: `uniform sampler2D map; varying vec2 vUv; varying vec3 vCol; varying vec3 vN;
        void main(){ vec4 t = texture2D(map, vUv); if (t.a < 0.5) discard; gl_FragColor = vec4(t.rgb * vCol, 1.0);
        #include <colorspace_fragment>
        }`,
    });
    const normalMat = new THREE.ShaderMaterial({
      ...common, uniforms: { map: { value: atlas } },
      fragmentShader: `uniform sampler2D map; varying vec2 vUv; varying vec3 vCol; varying vec3 vN;
        void main(){ vec4 t = texture2D(map, vUv); if (t.a < 0.5) discard; vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
        // les feuilles gardent leur normale « de houppier » (déjà tournée vers l'extérieur)
        if (n.z < 0.0 && vUv.x > 0.5) n.z = -n.z * 0.5;
        gl_FragColor = vec4(n * 0.5 + 0.5, 1.0); }`,
    });
    const scene = new THREE.Scene();
    const mesh = new THREE.Mesh(undefined, albedoMat);
    mesh.frustumCulled = false;
    scene.add(mesh);
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400);
    const prev = { rt: renderer.getRenderTarget(), color: renderer.getClearColor(new THREE.Color()), alpha: renderer.getClearAlpha(), tone: renderer.toneMapping };
    renderer.toneMapping = THREE.NoToneMapping;
    this.entries = entries.map((e, idx) => {
      const Q = Math.max(e.height * 1.04, e.crownR * 2.3, 2);
      return { ...e, Q, idx };
    });
    for (const [rt, mat] of [[this.albedoRT, albedoMat], [this.normalRT, normalMat]]) {
      rt.scissorTest = false;
      renderer.setRenderTarget(rt);
      renderer.setClearColor(0x000000, 0);
      renderer.clear(true, true, true);
      rt.scissorTest = true;
      mesh.material = mat;
      for (const e of this.entries) {
        mesh.geometry = e.geo;
        for (let k = 0; k < PER; k++) {
          const ti = e.idx * PER + k, cx = ti % cols, cy = Math.floor(ti / cols);
          const x = cx * tile, y = cy * tile;
          // une cible de rendu a sa propre fenêtre (setViewport du moteur ne s'y applique pas)
          rt.viewport.set(x, y, tile, tile);
          rt.scissor.set(x, y, tile, tile);
          renderer.setRenderTarget(rt);
          // fond = couleur moyenne du feuillage, transparent (évite les liserés sombres avec les mipmaps)
          if (mat === albedoMat) renderer.setClearColor(e.avgColor, 0); else renderer.setClearColor(0x8080ff, 0);
          renderer.clear(true, true, true);
          const Q = e.Q;
          if (k < ANGLES) {
            const th = (k / ANGLES) * Math.PI * 2;
            cam.left = -Q / 2; cam.right = Q / 2; cam.top = Q; cam.bottom = 0;
            cam.position.set(Math.sin(th) * 150, 0, Math.cos(th) * 150);
            cam.up.set(0, 1, 0);
            cam.lookAt(0, 0, 0);
          } else {
            cam.left = -Q / 2; cam.right = Q / 2; cam.top = Q / 2; cam.bottom = -Q / 2;
            cam.position.set(0, 200, 0);
            cam.up.set(0, 0, -1);
            cam.lookAt(0, 0, 0);
          }
          cam.near = 1; cam.far = 400;
          cam.updateProjectionMatrix();
          cam.updateMatrixWorld();
          renderer.render(scene, cam);
        }
      }
    }
    renderer.setClearColor(prev.color, prev.alpha);
    renderer.toneMapping = prev.tone;
    // Résolution du multi-échantillonnage et mipmaps, une seule fois (rendu vide sans effacement)
    const empty = new THREE.Scene(), ac = renderer.autoClear;
    renderer.autoClear = false;
    for (const rt of [this.albedoRT, this.normalRT]) {
      rt.viewport.set(0, 0, rt.width, rt.height); rt.scissor.set(0, 0, rt.width, rt.height); rt.scissorTest = false;
      rt.texture.generateMipmaps = true;
      renderer.setRenderTarget(rt);
      renderer.render(empty, cam);
    }
    renderer.autoClear = ac;
    renderer.setRenderTarget(prev.rt);
    mesh.geometry = undefined;
    albedoMat.dispose(); normalMat.dispose();
  }
}

// Champ d'imposteurs : toutes les instances, découpées en blocs (découpage par le champ de vision)
export class ImpostorField {
  constructor(scene, baker, items, opts = {}) {
    // items : [{ x, y, z, s, ry, entry, tint }], tint : [r, g, b] (teinte d'automne) ou null
    this.baker = baker;
    this.uniforms = {
      tAlb: { value: baker.albedoRT.texture }, tNrm: { value: baker.normalRT.texture },
      uGrid: { value: new THREE.Vector3(baker.cols, baker.size[0] / baker.tile, baker.size[1] / baker.tile) },
      uEntry: { value: baker.entries.map((e) => new THREE.Vector4(e.Q, e.crownY, 0, 0)) },
      uFade: vegUniforms.uFade, uSunDir: vegUniforms.uSunDir, uSunCol: vegUniforms.uSunCol, uTime: vegUniforms.uTime,
      uThin: { value: opts.thin ?? 0 },
    };
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.uniforms);
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
uniform vec3 uGrid; uniform vec4 uEntry[${baker.entries.length}]; uniform vec2 uFade; uniform float uTime; uniform float uThin;
attribute vec3 aCorner; attribute vec3 aPos; attribute vec4 aData; attribute vec3 aTint;
varying vec2 vT0; varying vec2 vT1; varying float vW; varying vec3 vBR; varying vec3 vBU; varying vec3 vBF; varying float vVis; varying float vFadeIn; varying vec3 vTint; varying vec3 vWP;
vec2 tileOrigin(float t) { return vec2(mod(t, uGrid.x), floor(t / uGrid.x)); }`)
        .replace("#include <beginnormal_vertex>", "vec3 objectNormal = vec3(0.0, 1.0, 0.0);")
        .replace("#include <begin_vertex>", `
  float s = aData.x, ro = aData.y, e = aData.z;
  vec4 E = uEntry[int(e)];
  float Q = E.x * s;
  vec3 toC = cameraPosition - aPos;
  float dH = length(toC.xz);
  vec2 th = toC.xz / max(dH, 1e-3);
  float c = cos(ro), sn = sin(ro);
  // direction de la caméra dans le repère de l'arbre (rotation inverse autour de Y)
  vec2 dl = vec2(c * th.x - sn * th.y, sn * th.x + c * th.y);
  float ang = atan(dl.x, dl.y);
  float fk = ang / (6.2831853 / 6.0);
  float k0 = floor(fk);
  vW = fk - k0;
  float base = e * 7.0;
  vec3 R = vec3(c, 0.0, -sn), Zm = vec3(-sn, 0.0, -c);    // axes locaux X et -Z après rotation
  float el = toC.y / max(length(toC), 1e-3);
  vec3 p;
  vec2 luv;
  if (aCorner.z < 0.5) {
    vec3 right = normalize(vec3(th.y, 0.0, -th.x));
    p = aPos + right * aCorner.x * Q + vec3(0.0, aCorner.y * Q, 0.0);
    luv = vec2(aCorner.x + 0.5, aCorner.y);
    vT0 = tileOrigin(base + mod(k0, 6.0)); vT1 = tileOrigin(base + mod(k0 + 1.0, 6.0));
    vBR = right; vBU = vec3(0.0, 1.0, 0.0); vBF = vec3(th.x, 0.0, th.y);
    vVis = 1.0 - smoothstep(0.6, 0.92, abs(el));
  } else {
    p = aPos + R * aCorner.x * Q + Zm * aCorner.y * Q + vec3(0.0, E.y * s, 0.0);
    luv = vec2(aCorner.x + 0.5, aCorner.y + 0.5);
    vT0 = vT1 = tileOrigin(base + 6.0); vW = 0.0;
    vBR = R; vBU = Zm; vBF = vec3(0.0, 1.0, 0.0);
    vVis = smoothstep(0.3, 0.7, el);
  }
  // Éclaircissement lointain (qualité « rapide ») : un arbre sur deux disparaît, les autres grossissent un peu
  float hsh = fract(sin(dot(aPos.xz, vec2(12.9898, 78.233))) * 43758.5453);
  float thin = uThin * smoothstep(400.0, 1200.0, dH);
  if (hsh < thin * 0.5) s = 0.0;
  // léger balancement au vent (cimes)
  p.x += sin(uTime * 0.8 + aPos.x * 0.05) * 0.15 * aCorner.y * s * step(aCorner.z, 0.5);
  vFadeIn = clamp((dH - uFade.x) / max(1.0, uFade.y - uFade.x), 0.0, 1.0);
  if (s <= 0.0 || vFadeIn <= 0.0) p = vec3(0.0, -1e5, 0.0);
  vMapUvB = luv;
  vTint = aTint;
  vWP = p;
  vec3 transformed = p;`)
        .replace("#include <project_vertex>", "vec4 mvPosition = viewMatrix * vec4(transformed, 1.0); gl_Position = projectionMatrix * mvPosition;")
        .replace("#include <worldpos_vertex>", "vec4 worldPosition = vec4(transformed, 1.0);")
        .replace("#include <common>", "#include <common>\nvarying vec2 vMapUvB;");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform sampler2D tAlb; uniform sampler2D tNrm; uniform vec3 uGrid; uniform vec3 uSunDir; uniform vec3 uSunCol;
varying vec2 vMapUvB; varying vec2 vT0; varying vec2 vT1; varying float vW; varying vec3 vBR; varying vec3 vBU; varying vec3 vBF; varying float vVis; varying float vFadeIn; varying vec3 vTint; varying vec3 vWP;
float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
vec3 bbN;`)
        .replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>
  float dz = ign(gl_FragCoord.xy);
  if (dz >= vFadeIn) discard;                                 // complément exact du fondu des arbres 3D
  if (fract(dz * 7.31 + 0.37) >= vVis) discard;               // passage carte verticale ↔ vue de dessus`)
        .replace("#include <map_fragment>", `
  vec2 luv = clamp(vMapUvB, 0.004, 0.996);
  vec2 uv0 = (vT0 + luv) / uGrid.yz, uv1 = (vT1 + luv) / uGrid.yz;
  vec4 a0 = texture2D(tAlb, uv0), a1 = texture2D(tAlb, uv1);
  vec4 tc = mix(a0, a1, vW);
  vec2 dUv = max(abs(dFdx(uv0)), abs(dFdy(uv0))) * vec2(textureSize(tAlb, 0));
  tc.a *= 1.0 + max(0.0, log2(max(dUv.x, dUv.y))) * 0.45;
  if (tc.a < 0.5) discard;
  diffuseColor.rgb = tc.rgb / max(tc.a, 0.5);
  float lm = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
  diffuseColor.rgb = mix(vec3(lm), diffuseColor.rgb, 1.25) * 1.35;   // les cimes vues de loin captent plus de lumière
  float autK = 1.0 - step(2.99, vTint.r + vTint.g + vTint.b);
  float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
  diffuseColor.rgb = mix(diffuseColor.rgb, lum * vTint * 2.6, autK * 0.85);
  vec3 tn = mix(texture2D(tNrm, uv0).xyz, texture2D(tNrm, uv1).xyz, vW) * 2.0 - 1.0;
  bbN = normalize(vBR * tn.x + vBU * tn.y + vBF * tn.z);`)
        .replace("#include <normal_fragment_begin>", `#include <normal_fragment_begin>
  normal = normalize((viewMatrix * vec4(bbN, 0.0)).xyz);`)
        .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  vec3 toCam = normalize(cameraPosition - vWP);
  float back = pow(max(dot(-toCam, uSunDir), 0.0), 3.0);
  totalEmissiveRadiance += diffuseColor.rgb * uSunCol * (back * 1.2 + 0.06);`);
    };
    mat.customProgramCacheKey = () => "impostor" + baker.entries.length;
    this.material = mat;

    // Géométrie : 2 quads (vertical, horizontal)
    const corners = new Float32Array([-0.5, 0, 0, 0.5, 0, 0, 0.5, 1, 0, -0.5, 1, 0, -0.5, -0.5, 1, 0.5, -0.5, 1, 0.5, 0.5, 1, -0.5, 0.5, 1]);
    const index = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];
    // Blocs de 500 m
    const B = 500, half = opts.half || 2000, nB = Math.ceil((2 * half) / B);
    const buckets = new Map();
    items.forEach((it, i) => {
      const bi = Math.min(nB - 1, Math.max(0, Math.floor((it.x + half) / B))), bj = Math.min(nB - 1, Math.max(0, Math.floor((it.z + half) / B)));
      const k = bj * nB + bi;
      if (!buckets.has(k)) buckets.set(k, []);
      buckets.get(k).push(i);
    });
    this.where = new Int32Array(items.length * 2);
    this.meshes = [];
    for (const [k, list] of buckets) {
      const n = list.length;
      const pos = new Float32Array(n * 3), data = new Float32Array(n * 4), tintA = new Float32Array(n * 3);
      let minY = 1e9, maxY = -1e9, maxQ = 0;
      list.forEach((id, j) => {
        const it = items[id];
        pos.set([it.x, it.y, it.z], j * 3);
        data.set([it.s, it.ry, it.entry, 0], j * 4);
        tintA.set(it.tint || [1, 1, 1], j * 3);
        minY = Math.min(minY, it.y); maxY = Math.max(maxY, it.y); maxQ = Math.max(maxQ, baker.entries[it.entry].Q * it.s);
        this.where[id * 2] = this.meshes.length; this.where[id * 2 + 1] = j;
      });
      const g = new THREE.InstancedBufferGeometry();
      g.setIndex(index);
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(24), 3));
      g.setAttribute("aCorner", new THREE.BufferAttribute(corners, 3));
      g.setAttribute("aPos", new THREE.InstancedBufferAttribute(pos, 3));
      g.setAttribute("aData", new THREE.InstancedBufferAttribute(data, 4));
      g.setAttribute("aTint", new THREE.InstancedBufferAttribute(tintA, 3));
      g.instanceCount = n;
      const bi = k % nB, bj = Math.floor(k / nB);
      const cx = -half + (bi + 0.5) * B, cz = -half + (bj + 0.5) * B;
      g.boundingSphere = new THREE.Sphere(new THREE.Vector3(cx, (minY + maxY) / 2 + maxQ / 2, cz), Math.hypot(B / 2, B / 2, (maxY - minY) / 2 + maxQ));
      const m = new THREE.Mesh(g, mat);
      m.frustumCulled = true;
      m.receiveShadow = false;
      m.castShadow = false;
      m.matrixAutoUpdate = false;
      scene.add(m);
      this.meshes.push(m);
    }
  }

  // Arbre abattu / repoussé : taille 0 ou rétablie
  setVisible(id, s) {
    const mi = this.where[id * 2], j = this.where[id * 2 + 1];
    const m = this.meshes[mi];
    if (!m) return;
    const a = m.geometry.attributes.aData;
    a.array[j * 4] = s;
    a.addUpdateRange(j * 4, 1);
    a.needsUpdate = true;
  }
}
