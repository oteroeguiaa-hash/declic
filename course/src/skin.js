// Matériaux de pelage, de peau et d'écailles : motifs procéduraux calculés dans le shader,
// dans l'espace propre de chaque partie (les taches suivent la peau quand le squelette bouge).
import * as THREE from "three";

export const PATTERNS = {
  plain: 0, spots: 1, rosettes: 2, stripes: 3, zebra: 4, zebrafine: 4, giraffe: 5, reticulated: 5, masai: 13,
  tabby: 6, holstein: 7, patches: 7, appaloosa: 8, dalmatian: 8, dots: 10, blotches: 11, bands: 12,
  tricolor: 7, merle: 7, brindle: 6, barred: 14, wolf: 15, saddle: 16, husky: 16, sideband: 17,
  pronghorn: 17, impala: 17, blackbuck: 16, topi: 16, okapi: 18, legstripes: 18, kudu: 19, chipmunk: 19,
  saddlewhite: 20, clown: 12, bars: 12, hourglass: 21, orca: 21, dall: 21, magpie: 21, belly: 0, collar: 22,
  chestband: 22, panda: 23, spectacled: 22, mask: 24, tan: 25, points: 26, skunk: 27, badger: 28, ratel: 16,
  collie: 23, whitehead: 0, oryx: 17, oryxlight: 17, chamois: 24, ring: 0, whitecheek: 0, tear: 0,
};

const NOISE_GLSL = /* glsl */`
float h31(vec3 p){ p = fract(p*vec3(.1031,.11369,.13787)); p += dot(p, p.yxz+19.19); return fract((p.x+p.y)*p.z); }
vec3 h33(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6))); return fract(sin(p)*43758.5453123); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(h31(i),h31(i+vec3(1,0,0)),f.x), mix(h31(i+vec3(0,1,0)),h31(i+vec3(1,1,0)),f.x), f.y),
             mix(mix(h31(i+vec3(0,0,1)),h31(i+vec3(1,0,1)),f.x), mix(h31(i+vec3(0,1,1)),h31(i+vec3(1,1,1)),f.x), f.y), f.z);
}
float fbm(vec3 p){ float a=0.5, s=0.0; for(int i=0;i<4;i++){ s+=a*vnoise(p); p*=2.03; a*=0.5; } return s; }
vec2 voro(vec3 p){
  vec3 i = floor(p), f = fract(p); float d1 = 8.0, d2 = 8.0;
  for(int z=-1;z<=1;z++) for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
    vec3 g = vec3(float(x),float(y),float(z)); vec3 o = h33(i+g)*0.85+0.075; vec3 r = g+o-f; float d = dot(r,r);
    if(d<d1){ d2=d1; d1=d; } else if(d<d2){ d2=d; }
  }
  return vec2(sqrt(d1), sqrt(d2));
}
`;

const hex = (c) => new THREE.Color(c);
function lum(c) { return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b; }

// Crée le jeu de matériaux d'une créature.
// kind : "fur" | "scale" | "skin" | "feather" | "chitin" | "smooth"
export function makeSkin(look, kind = "fur") {
  const cols = (look.c || "#8a7a66/#d8ccb8").split("/");
  const c1 = hex(cols[0]);
  const c2 = hex(cols[1] || cols[0]);
  const pat = look.pat || "plain";
  let mark = look.mark || look.stripe || look.rosette;
  let markC, bellyC;
  const darkPats = ["spots", "rosettes", "stripes", "dots", "blotches", "bands", "zebra", "zebrafine", "holstein", "patches", "tricolor", "merle", "brindle", "barred", "dalmatian", "appaloosa", "okapi", "legstripes", "kudu", "chipmunk", "clown", "bars"];
  if (mark) markC = hex(mark);
  else if (lum(c2) < lum(c1) - 0.12 && (darkPats.includes(pat) || PATTERNS[pat] >= 15)) markC = c2.clone();
  else if (pat === "giraffe" || pat === "reticulated" || pat === "masai") markC = c1.clone();
  else if (pat === "kudu" || pat === "okapi" || pat === "legstripes" || pat === "saddlewhite") markC = new THREE.Color(0xf6f2ea);
  else markC = new THREE.Color(0x1a1410);
  if (lum(c2) >= lum(c1) - 0.02) bellyC = c2.clone();
  else bellyC = c1.clone().lerp(new THREE.Color(0xffffff), 0.18);
  if (pat === "giraffe" || pat === "reticulated" || pat === "masai") { bellyC = c2.clone(); }
  if (pat === "kudu" || pat === "okapi") bellyC = c1.clone().lerp(c2, 0.3);
  if (pat === "zebra" || pat === "zebrafine") bellyC = c1.clone();
  if (pat === "holstein" || pat === "patches" || pat === "tricolor" || pat === "merle" || pat === "dalmatian" || pat === "appaloosa") bellyC = c1.clone();
  let base = c1.clone();
  if (pat === "giraffe" || pat === "reticulated" || pat === "masai") base = c2.clone();

  // Échelle du motif (m) : relative à la taille de l'animal.
  const H = parseFloat(look.H || look.L || 1);
  let scale = 0.06 * Math.max(0.05, H) * (pat === "zebra" ? 2.2 : pat === "zebrafine" ? 1.5 : pat === "stripes" ? 2.0
    : pat === "giraffe" || pat === "reticulated" || pat === "masai" ? 3.2 : pat === "holstein" || pat === "patches" || pat === "tricolor" ? 6
    : pat === "rosettes" ? 1.25 : pat === "dots" ? 0.55 : pat === "blotches" ? 1.8 : pat === "bands" || pat === "bars" || pat === "clown" ? 2.4 : pat === "tabby" || pat === "brindle" ? 1.3 : 1);

  const uniforms = {
    uBase: { value: base }, uBelly: { value: bellyC }, uMark: { value: markC },
    uPat: { value: PATTERNS[pat] ?? 0 }, uScale: { value: scale }, uBreath: { value: 0 },
    uSweat: { value: 0 }, uBellyAmt: { value: look.nobelly ? 0 : 1 },
    uFur: { value: kind === "fur" ? 1 : kind === "feather" ? 0.6 : 0.2 },
  };
  const make = (axis, region) => {
    const m = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: kind === "skin" ? 0.62 : kind === "scale" ? 0.55 : kind === "chitin" ? 0.35 : kind === "smooth" ? 0.35 : 0.88,
      metalness: kind === "chitin" ? 0.15 : 0,
    });
    const ax = { value: axis };
    const rg = { value: region };
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, uniforms, { uAxis: ax, uRegion: rg });
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
          attribute vec4 tint; attribute float breath;
          varying vec3 vLocalP; varying vec3 vWN; varying vec4 vTint; uniform float uBreath;`)
        .replace("#include <begin_vertex>", `#include <begin_vertex>
          transformed += normal * breath * uBreath;
          vLocalP = position; vTint = tint;`)
        .replace("#include <defaultnormal_vertex>", `#include <defaultnormal_vertex>
          vWN = normalize(mat3(modelMatrix) * objectNormal);`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
          varying vec3 vLocalP; varying vec3 vWN; varying vec4 vTint;
          uniform vec3 uBase, uBelly, uMark; uniform float uPat, uScale, uSweat, uBellyAmt, uFur, uAxis, uRegion;
          ${NOISE_GLSL}
          vec3 skinColor(){
            vec3 p = vLocalP / uScale;
            float up = vWN.y;
            vec3 col = uBase;
            float belly = smoothstep(-0.05, -0.65, up) * uBellyAmt * (uRegion < 0.5 ? 1.0 : 0.6);
            col = mix(col, uBelly, belly);
            int pt = int(uPat + 0.5);
            float m = 0.0;
            float ax = uAxis < 0.5 ? vLocalP.x : (uAxis < 1.5 ? vLocalP.y : vLocalP.z);
            float axs = ax / uScale;
            if (pt == 1) { vec2 v = voro(p*2.4); m = 1.0 - smoothstep(0.22, 0.32, v.x); }
            else if (pt == 2) { vec2 v = voro(p); float r = v.x; m = smoothstep(0.24,0.3,r) * (1.0 - smoothstep(0.38,0.46,r)); m *= step(0.35, vnoise(p*3.0)) ; m = max(m, (1.0 - smoothstep(0.12,0.2,v.x)) * 0.0); col = mix(col, col*0.82, 1.0 - smoothstep(0.2,0.3,r)); }
            else if (pt == 3) { float w = axs*1.2 + fbm(p*0.9)*2.4; float s = sin(w*3.1416); m = smoothstep(0.45, 0.75, s) * smoothstep(0.15, 0.5, fbm(p*1.7+3.0)+0.25); }
            else if (pt == 4) { float w = axs*1.0 + fbm(p*0.5)*1.2; float s = sin(w*3.1416); m = smoothstep(-0.05, 0.12, s); belly *= 0.0; }
            else if (pt == 5) { vec2 v = voro(p*0.9); m = smoothstep(0.035, 0.09, v.y - v.x); col = mix(uBelly, uMark, m); m = 0.0; }
            else if (pt == 13) { vec2 v = voro(p*0.9 + fbm(p*2.0)*0.6); m = smoothstep(0.05, 0.11, v.y - v.x) * smoothstep(0.2, 0.5, fbm(p*3.0)+0.3); col = mix(uBelly, uMark, m); m = 0.0; }
            else if (pt == 6) { float w = axs*1.8 + fbm(p*1.3)*3.0; m = smoothstep(0.5, 0.9, sin(w*3.1416)) * 0.75; }
            else if (pt == 7) { float n = fbm(p*0.5 + 7.0); m = smoothstep(0.46, 0.5, n); }
            else if (pt == 8) { vec2 v = voro(p*1.3); m = (1.0 - smoothstep(0.16, 0.22, v.x)) * step(0.35, h31(floor(p*1.3))); }
            else if (pt == 10) { vec2 v = voro(p*2.5); m = (1.0 - smoothstep(0.12, 0.18, v.x)) * 0.85; }
            else if (pt == 11) { vec2 v = voro(p*0.9 + fbm(p)*0.8); m = (1.0 - smoothstep(0.22, 0.34, v.x)); }
            else if (pt == 12) { float s = sin(axs*3.1416*0.9); m = smoothstep(0.55, 0.65, s); }
            else if (pt == 14) { float s = sin((axs*2.0 + fbm(p*2.0)) * 3.1416); m = smoothstep(0.6, 0.85, s) * 0.6; }
            else if (pt == 15) { m = smoothstep(0.35, 0.85, up) * 0.55 * (uRegion < 0.5 ? 1.0 : 0.3) * (0.6 + 0.4*fbm(p*2.0)); }
            else if (pt == 16) { m = smoothstep(0.25, 0.6, up) * (uRegion < 0.5 ? 1.0 : 0.0); }
            else if (pt == 17) { m = smoothstep(-0.25, -0.1, up) * (1.0 - smoothstep(0.0, 0.12, up)) * (uRegion < 0.5 ? 1.0 : 0.0); }
            else if (pt == 18) { float s = sin(axs*3.1416*1.4 + fbm(p)*1.5); m = smoothstep(0.1, 0.4, s) * (uRegion > 0.5 ? 1.0 : 0.0); }
            else if (pt == 19) { float s = sin(axs*3.1416*0.5); m = smoothstep(0.82, 0.92, s) * smoothstep(0.0, 0.5, up) * (uRegion < 0.5 ? 1.0 : 0.0); }
            else if (pt == 20) { m = smoothstep(0.2, 0.55, up) * (uRegion < 0.5 ? 1.0 : 0.0); }
            else if (pt == 21) { m = smoothstep(-0.1, -0.45, up) * (uRegion < 0.5 ? 1.0 : 0.5); col = mix(col, uBase, belly); }
            else if (pt == 22) { m = 0.0; }
            else if (pt == 23) { m = 0.0; }
            else if (pt == 24) { m = 0.0; }
            else if (pt == 25) { m = (uRegion > 0.5 ? smoothstep(-0.1, -0.5, vLocalP.y/ max(uScale*12.0, 0.01)) : 0.0); }
            else if (pt == 26) { m = 0.0; }
            else if (pt == 27) { m = smoothstep(0.55, 0.8, up) * (uRegion < 0.5 ? 1.0 : 0.0); }
            else if (pt == 28) { m = 0.0; }
            col = mix(col, uMark, clamp(m, 0.0, 1.0));
            // Grain du pelage / de la peau.
            float g = vnoise(vLocalP * 260.0 / max(uScale*16.0, 0.2)) * 0.5 + vnoise(vLocalP * 60.0 / max(uScale*16.0, 0.2)) * 0.5;
            col *= 1.0 + (g - 0.5) * 0.22 * uFur;
            col = mix(col, vTint.rgb, vTint.a);
            return col;
          }`)
        .replace("vec4 diffuseColor = vec4( diffuse, opacity );", "vec4 diffuseColor = vec4( diffuse * skinColor(), opacity );")
        .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
          roughnessFactor = mix(roughnessFactor, 0.32, uSweat);`);
    };
    m.customProgramCacheKey = () => "skin-v3";
    return m;
  };
  return {
    body: make(0, 0), limb: make(1, 1), head: make(0, 2),
    uniforms,
    colors: { base, belly: bellyC, mark: markC, c1, c2 },
  };
}

export function plainMat(color, rough = 0.6, metal = 0, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra });
}
