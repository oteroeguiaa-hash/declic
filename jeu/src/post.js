// Post-traitement : occlusion ambiante (SSAO), perspective aérienne (brume selon l'altitude, plus chaude vers le soleil),
// rayons de soleil volumétriques, halo très léger (bloom), étalonnage des couleurs, anticrénelage (FXAA).
// La scène est rendue en HDR dans une texture, puis composée avec un tone mapping filmique.
import * as THREE from "three";
import { refrUniforms } from "./world.js";

const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const DEPTH_FN = `
uniform float uNear; uniform float uFar;
float viewZ(float d){ return (uNear * uFar) / ((uFar - uNear) * d - uFar); }`;

export class Post {
  constructor(renderer, quality) {
    this.renderer = renderer;
    this.q = quality;
    const hdr = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true };
    this.sceneRT = new THREE.WebGLRenderTarget(4, 4, { ...hdr, samples: quality.msaa });
    this.sceneRT.depthTexture = new THREE.DepthTexture(4, 4);
    this.sceneRT.depthTexture.type = THREE.UnsignedIntType;
    const lo = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false };
    this.raysRT = new THREE.WebGLRenderTarget(4, 4, lo);
    this.bloomA = new THREE.WebGLRenderTarget(4, 4, lo);
    this.refrRT = new THREE.WebGLRenderTarget(4, 4, lo);
    this.bloomB = new THREE.WebGLRenderTarget(4, 4, lo);
    const ao = { type: THREE.UnsignedByteType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false };
    this.aoA = new THREE.WebGLRenderTarget(4, 4, ao);
    this.aoB = new THREE.WebGLRenderTarget(4, 4, ao);
    this.ldrRT = new THREE.WebGLRenderTarget(4, 4, { type: THREE.UnsignedByteType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false });

    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.quad.frustumCulled = false;
    this.scene = new THREE.Scene();
    this.scene.add(this.quad);

    this.raysMat = new THREE.ShaderMaterial({
      uniforms: { tDepth: { value: null }, uSun: { value: new THREE.Vector2() }, uAspect: { value: 1 } },
      defines: { SAMPLES: quality.raySamples },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tDepth; uniform vec2 uSun; uniform float uAspect; varying vec2 vUv;
        float occl(vec2 uv){
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
          float d = texture2D(tDepth, uv).r;
          vec2 dd = (uv - uSun) * vec2(uAspect, 1.0);
          float glow = exp(-dot(dd, dd) * 10.0);
          return step(0.99999, d) * (0.03 + glow);
        }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec2 delta = (vUv - uSun) * (0.92 / float(SAMPLES));
          vec2 c = vUv - delta * hash(vUv * 731.0);
          float illum = 1.0, sum = 0.0;
          for (int i = 0; i < SAMPLES; i++) {
            sum += occl(c) * illum;
            illum *= 0.965;
            c -= delta;
          }
          gl_FragColor = vec4(vec3(sum / float(SAMPLES) * 2.2), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });

    // Occlusion ambiante à partir de la profondeur (demi-résolution)
    this.aoMat = new THREE.ShaderMaterial({
      uniforms: { tDepth: { value: null }, uNear: { value: 0.1 }, uFar: { value: 9000 }, uProj: { value: new THREE.Vector4() }, uRes: { value: new THREE.Vector2() }, uRadius: { value: 1.4 } },
      defines: { AO_SAMPLES: quality.ssao > 1 ? 12 : 8 },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tDepth; uniform vec4 uProj; uniform vec2 uRes; uniform float uRadius; varying vec2 vUv;
        ${DEPTH_FN}
        vec3 viewPos(vec2 uv){ float z = viewZ(texture2D(tDepth, uv).r); return vec3((uv * 2.0 - 1.0 + uProj.zw) * -z / uProj.xy, z); }
        float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
        void main(){
          float d = texture2D(tDepth, vUv).r;
          if (d >= 0.99999) { gl_FragColor = vec4(1.0); return; }
          vec3 P = viewPos(vUv);
          vec3 N = normalize(cross(dFdx(P), dFdy(P)));
          float pr = uRadius * uProj.y * 0.5 * uRes.y / -P.z;          // rayon à l'écran (pixels)
          pr = clamp(pr, 3.0, 70.0);
          float n0 = ign(gl_FragCoord.xy) * 6.2831;
          float sum = 0.0;
          for (int i = 0; i < AO_SAMPLES; i++) {
            float t = (float(i) + 0.5) / float(AO_SAMPLES);
            float a = n0 + float(i) * 2.39996;
            vec2 o = vec2(cos(a), sin(a)) * pr * sqrt(t) / uRes;
            vec3 v = viewPos(vUv + o) - P;
            float vv = dot(v, v);
            sum += max(0.0, dot(v, N) + P.z * 0.002) / (vv + 0.05) * (1.0 - smoothstep(uRadius * uRadius * 2.0, uRadius * uRadius * 8.0, vv));
          }
          float ao = clamp(1.0 - sum * 1.6 / float(AO_SAMPLES), 0.0, 1.0);
          ao = mix(ao, 1.0, smoothstep(60.0, 140.0, -P.z));
          gl_FragColor = vec4(vec3(ao), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    // Flou qui respecte les contours (profondeur)
    this.aoBlur = new THREE.ShaderMaterial({
      uniforms: { tAO: { value: null }, tDepth: { value: null }, uDir: { value: new THREE.Vector2() }, uNear: { value: 0.1 }, uFar: { value: 9000 } },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tAO; uniform sampler2D tDepth; uniform vec2 uDir; varying vec2 vUv;
        ${DEPTH_FN}
        void main(){
          float z0 = viewZ(texture2D(tDepth, vUv).r);
          float s = 0.0, w = 0.0;
          for (int i = -3; i <= 3; i++) {
            vec2 uv = vUv + uDir * float(i);
            float z = viewZ(texture2D(tDepth, uv).r);
            float k = exp(-float(i * i) * 0.18) * (1.0 / (1.0 + abs(z - z0) * 4.0 / max(1.0, -z0 * 0.05)));
            s += texture2D(tAO, uv).r * k; w += k;
          }
          gl_FragColor = vec4(vec3(s / w), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });

    this.brightMat = new THREE.ShaderMaterial({
      uniforms: { tColor: { value: null }, uThreshold: { value: 2.2 } },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tColor; uniform float uThreshold; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tColor, vUv).rgb;
          float l = max(c.r, max(c.g, c.b));
          float k = max(0.0, l - uThreshold) / max(l, 1e-4);
          gl_FragColor = vec4(min(c * k, vec3(20.0)), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });

    this.copyMat = new THREE.ShaderMaterial({
      uniforms: { tColor: { value: null } },
      vertexShader: VERT,
      fragmentShader: `uniform sampler2D tColor; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(tColor, vUv).rgb, 1.0); }`,
      depthTest: false, depthWrite: false,
    });

    this.blurMat = new THREE.ShaderMaterial({
      uniforms: { tColor: { value: null }, uDir: { value: new THREE.Vector2() } },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tColor; uniform vec2 uDir; varying vec2 vUv;
        void main(){
          vec3 s = texture2D(tColor, vUv).rgb * 0.227;
          s += (texture2D(tColor, vUv + uDir * 1.385).rgb + texture2D(tColor, vUv - uDir * 1.385).rgb) * 0.316;
          s += (texture2D(tColor, vUv + uDir * 3.231).rgb + texture2D(tColor, vUv - uDir * 3.231).rgb) * 0.070;
          gl_FragColor = vec4(s, 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });

    this.compMat = new THREE.ShaderMaterial({
      uniforms: {
        tColor: { value: null }, tRays: { value: null }, tBloom: { value: null }, tAO: { value: null }, uAOOn: { value: 0 },
        uRayCol: { value: new THREE.Color() }, uBloom: { value: 0.5 }, uSat: { value: 1.06 }, uWarm: { value: 0 },
        tDepth: { value: null }, uInvVP: { value: new THREE.Matrix4() }, uCam: { value: new THREE.Vector3() },
        uMist: { value: 0 }, uMistCol: { value: new THREE.Color() },
        uUnder: { value: 0 }, uUnderCol: { value: new THREE.Color() },
        uTime: { value: 0 }, uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uSurf: { value: 0 }, uWet: { value: 0 },
        uFogCol: { value: new THREE.Color() }, uFogSun: { value: new THREE.Color() }, uFogDens: { value: 2e-4 }, uFogFall: { value: 1 / 380 },
        uExposure: { value: 1 }, uSRGB: { value: 1 },
      },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tColor; uniform sampler2D tRays; uniform sampler2D tBloom; uniform sampler2D tAO; uniform float uAOOn;
        uniform vec3 uRayCol; uniform float uBloom; uniform float uSat; uniform float uWarm;
        uniform sampler2D tDepth; uniform mat4 uInvVP; uniform vec3 uCam; uniform float uMist; uniform vec3 uMistCol;
        uniform float uUnder; uniform vec3 uUnderCol; uniform float uTime; uniform vec3 uSunDir; uniform float uSurf; uniform float uWet;
        uniform vec3 uFogCol; uniform vec3 uFogSun; uniform float uFogDens; uniform float uFogFall; uniform float uExposure; uniform float uSRGB;
        float caust(vec2 p){
          float a = sin(p.x * 0.9 + uTime * 0.9) + sin(p.y * 0.8 - uTime * 0.7) + sin((p.x + p.y) * 0.55 + uTime * 0.5) + sin((p.x - p.y) * 1.3 - uTime * 1.1);
          return pow(abs(a) * 0.25, 2.5);
        }
        // Tone mapping filmique ACES (approximation de Narkowicz, avec matrices d'entrée/sortie)
        vec3 RRTAndODTFit(vec3 v){ vec3 a = v * (v + 0.0245786) - 0.000090537; vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081; return a / b; }
        vec3 aces(vec3 c){
          const mat3 I = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
          const mat3 O = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
          c *= uExposure / 0.6;
          return clamp(O * RRTAndODTFit(I * c), 0.0, 1.0);
        }
        vec3 toSRGB(vec3 c){ return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
        varying vec2 vUv;
        void main(){
          vec2 uv0 = vUv;
          if (uWet > 0.001) uv0 += vec2(sin(vUv.y * 30.0 + uTime * 3.0), cos(vUv.x * 24.0 + uTime * 2.0)) * 0.004 * uWet;
          vec3 c = texture2D(tColor, uv0).rgb;
          float d = texture2D(tDepth, vUv).r;
          vec4 wp = uInvVP * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
          wp.xyz /= wp.w;
          vec3 ray = wp.xyz - uCam;
          bool sky = d >= 0.99999;
          // Occlusion ambiante (plus marquée dans les zones peu éclairées)
          if (uAOOn > 0.5 && !sky && uUnder < 0.5) {
            float ao = texture2D(tAO, vUv).r;
            float l = dot(c, vec3(0.3, 0.59, 0.11));
            c *= mix(1.0, ao, 0.85 - 0.35 * smoothstep(0.3, 2.0, l));
          }
          if (uUnder > 0.5) {
            vec2 wob = vec2(sin(vUv.y * 40.0 + uCam.x * 0.7 + uCam.z * 0.5), 0.0);
            float dd = texture2D(tDepth, vUv + wob * 0.0015).r;
            vec4 wq = uInvVP * vec4(vUv * 2.0 - 1.0, dd * 2.0 - 1.0, 1.0);
            wq.xyz /= wq.w;
            float dist = dd >= 0.99999 ? 200.0 : length(wq.xyz - uCam);
            c = texture2D(tColor, vUv + wob * 0.0015).rgb * vec3(0.55, 0.85, 0.9);
            vec3 rd = normalize(wq.xyz - uCam);
            float L = min(dist, 28.0);
            vec2 sxz = uSunDir.xz / max(0.25, uSunDir.y);
            float shafts = 0.0;
            for (int i = 0; i < 10; i++) {
              vec3 s = uCam + rd * (L * (float(i) + 0.5) / 10.0);
              float below = max(0.0, uSurf - s.y);
              shafts += caust((s.xz + sxz * below) * 0.35) * exp(-below * 0.12);
            }
            shafts *= L / 10.0 * 0.06;
            c = mix(c, uUnderCol, 1.0 - exp(-dist * 0.07));
            c += uUnderCol * vec3(1.6, 2.6, 2.4) * shafts * max(0.0, uSunDir.y + 0.1);
            c += uUnderCol * 2.0 * smoothstep(0.2, 0.9, rd.y) * exp(-max(0.0, uSurf - uCam.y) * 0.08);
          } else if (!sky) {
            // Perspective aérienne : brume exponentielle selon l'altitude, intégrée le long du regard
            float dist = length(ray);
            vec3 rd = ray / max(dist, 1e-3);
            float b = uFogFall;
            float k = rd.y * b * dist;
            float od = uFogDens * exp(-b * max(uCam.y, -20.0)) * dist * (abs(k) > 1e-3 ? (1.0 - exp(-k)) / k : 1.0);
            float f = 1.0 - exp(-od);
            float sunAmt = pow(max(dot(rd, uSunDir), 0.0), 6.0);
            vec3 fc = mix(uFogCol, uFogSun, sunAmt);
            c = mix(c, fc, f);
          }
          // Brume de vallée : une couche basse qui remplit les creux
          if (uMist > 0.001 && uUnder < 0.5) {
            float dist = sky ? 2500.0 : length(ray);
            float y = sky ? uCam.y + normalize(ray).y * 2500.0 : wp.y;
            float layer = 1.0 - smoothstep(6.0, 26.0, y);
            float camIn = 1.0 - smoothstep(8.0, 30.0, uCam.y);
            float amount = uMist * layer * (1.0 - exp(-dist * mix(0.004, 0.012, camIn)));
            c = mix(c, uMistCol, clamp(amount, 0.0, 0.88));
          }
          c += texture2D(tRays, vUv).r * uRayCol;
          c += texture2D(tBloom, vUv).rgb * uBloom;
          c *= mix(vec3(1.0), vec3(1.06, 1.0, 0.9), uWarm);
          vec3 o = aces(c);
          // Étalonnage : saturation, contraste doux, ombres légèrement froides et hautes lumières chaudes
          float l = dot(o, vec3(0.2126, 0.7152, 0.0722));
          o = mix(vec3(l), o, uSat);
          o = mix(o * vec3(0.97, 1.0, 1.035), o * vec3(1.035, 1.0, 0.965), smoothstep(0.1, 0.7, l));
          o = toSRGB(clamp(o, 0.0, 1.0));
          o = o + (o - 0.5) * 0.04 * (1.0 - abs(o - 0.5) * 2.0);
          vec2 p = vUv - 0.5;
          o *= 1.0 - dot(p, p) * 0.32;
          o += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
          gl_FragColor = vec4(clamp(o, 0.0, 1.0), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.compMat.toneMapped = false;

    // FXAA 3.11 (version compacte), sur l'image finale
    this.fxaaMat = new THREE.ShaderMaterial({
      uniforms: { tColor: { value: null }, uInv: { value: new THREE.Vector2() } },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tColor; uniform vec2 uInv; varying vec2 vUv;
        float lu(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
        void main(){
          vec3 rgbM = texture2D(tColor, vUv).rgb;
          float lM = lu(rgbM);
          float lNW = lu(texture2D(tColor, vUv + vec2(-1.0, -1.0) * uInv).rgb), lNE = lu(texture2D(tColor, vUv + vec2(1.0, -1.0) * uInv).rgb);
          float lSW = lu(texture2D(tColor, vUv + vec2(-1.0, 1.0) * uInv).rgb), lSE = lu(texture2D(tColor, vUv + vec2(1.0, 1.0) * uInv).rgb);
          float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE))), lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
          if (lMax - lMin < max(0.0312, lMax * 0.125)) { gl_FragColor = vec4(rgbM, 1.0); return; }
          vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), ((lNW + lSW) - (lNE + lSE)));
          float red = max((lNW + lNE + lSW + lSE) * 0.03125, 0.0078125);
          float rcp = 1.0 / (min(abs(dir.x), abs(dir.y)) + red);
          dir = clamp(dir * rcp, -8.0, 8.0) * uInv;
          vec3 A = 0.5 * (texture2D(tColor, vUv + dir * (1.0 / 3.0 - 0.5)).rgb + texture2D(tColor, vUv + dir * (2.0 / 3.0 - 0.5)).rgb);
          vec3 B = A * 0.5 + 0.25 * (texture2D(tColor, vUv - dir * 0.5).rgb + texture2D(tColor, vUv + dir * 0.5).rgb);
          float lB = lu(B);
          gl_FragColor = vec4((lB < lMin || lB > lMax) ? A : B, 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.fxaaMat.toneMapped = false;

    this.rays = true;
    this.bloom = true;
    this.ssao = quality.ssao > 0;
    this.fxaa = quality.fxaa !== false;
    this._v = new THREE.Vector3();
    this._f = new THREE.Vector3();
  }

  setSize(w, h) {
    w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
    this.sceneRT.setSize(w, h);
    const rs = this.q.rayScale;
    this.raysRT.setSize(Math.max(1, Math.round(w * rs)), Math.max(1, Math.round(h * rs)));
    this.bloomA.setSize(Math.max(1, w >> 2), Math.max(1, h >> 2));
    this.refrRT.setSize(Math.max(1, w >> 1), Math.max(1, h >> 1));
    this.bloomB.setSize(Math.max(1, w >> 2), Math.max(1, h >> 2));
    this.aoA.setSize(Math.max(1, w >> 1), Math.max(1, h >> 1));
    this.aoB.setSize(Math.max(1, w >> 1), Math.max(1, h >> 1));
    this.ldrRT.setSize(w, h);
    this.w = w; this.h = h;
  }

  pass(mat, target) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.scene, this.cam);
  }

  // sun : { dir, color, strength, warm, mist, fog: { color, sun, dens, fall } … }
  render(scene, camera, sun) {
    const r = this.renderer;
    // Passe 1 : tout sauf l'eau (calque 0). Copie de l'image pour la réfraction. Passe 2 : l'eau (calque 1).
    camera.layers.set(0);
    r.setRenderTarget(this.sceneRT);
    r.render(scene, camera);
    this.copyMat.uniforms.tColor.value = this.sceneRT.texture;
    this.pass(this.copyMat, this.refrRT);
    refrUniforms.tRefr.value = this.refrRT.texture;
    refrUniforms.uRefrOn.value = 1;
    refrUniforms.uRefrScale.value = this.refrRT.width / Math.max(1, this.sceneRT.width);
    camera.layers.set(1);
    const ac = r.autoClear, su = r.shadowMap.autoUpdate;
    r.autoClear = false; r.shadowMap.autoUpdate = false;
    r.setRenderTarget(this.sceneRT);
    r.render(scene, camera);
    r.autoClear = ac; r.shadowMap.autoUpdate = su;
    camera.layers.set(0);

    const depth = this.sceneRT.depthTexture;
    // Occlusion ambiante
    const u = this.compMat.uniforms;
    u.uAOOn.value = this.ssao && !sun.under ? 1 : 0;
    if (u.uAOOn.value) {
      const P = camera.projectionMatrix.elements;
      for (const m of [this.aoMat, this.aoBlur]) { m.uniforms.uNear.value = camera.near; m.uniforms.uFar.value = camera.far; }
      this.aoMat.uniforms.tDepth.value = depth;
      this.aoMat.uniforms.uProj.value.set(P[0], P[5], P[8], P[9]);
      this.aoMat.uniforms.uRes.value.set(this.aoA.width, this.aoA.height);
      this.pass(this.aoMat, this.aoA);
      this.aoBlur.uniforms.tDepth.value = depth;
      this.aoBlur.uniforms.tAO.value = this.aoA.texture;
      this.aoBlur.uniforms.uDir.value.set(1 / this.aoA.width, 0);
      this.pass(this.aoBlur, this.aoB);
      this.aoBlur.uniforms.tAO.value = this.aoB.texture;
      this.aoBlur.uniforms.uDir.value.set(0, 1 / this.aoA.height);
      this.pass(this.aoBlur, this.aoA);
    }

    // Position du soleil à l'écran
    const sp = this._v.copy(camera.position).addScaledVector(sun.dir, 1000).project(camera);
    camera.getWorldDirection(this._f);
    const facing = this._f.dot(sun.dir);
    const onScreen = Math.max(0, 1 - Math.max(0, Math.max(Math.abs(sp.x), Math.abs(sp.y)) - 1) * 1.2);
    const rayK = (this.rays ? 1 : 0) * sun.strength * THREE.MathUtils.smoothstep(facing, 0.05, 0.55) * onScreen;
    if (rayK > 0.002) {
      this.raysMat.uniforms.tDepth.value = depth;
      this.raysMat.uniforms.uSun.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5);
      this.raysMat.uniforms.uAspect.value = this.w / this.h;
      this.pass(this.raysMat, this.raysRT);
    }
    u.uRayCol.value.copy(sun.color).multiplyScalar(rayK);

    // Bloom très subtil
    u.uBloom.value = this.bloom ? 0.16 : 0;
    if (this.bloom) {
      this.brightMat.uniforms.tColor.value = this.sceneRT.texture;
      this.pass(this.brightMat, this.bloomA);
      const bw = this.bloomA.width, bh = this.bloomA.height;
      for (let i = 0; i < 2; i++) {
        this.blurMat.uniforms.tColor.value = this.bloomA.texture;
        this.blurMat.uniforms.uDir.value.set(1 / bw * (1 + i), 0);
        this.pass(this.blurMat, this.bloomB);
        this.blurMat.uniforms.tColor.value = this.bloomB.texture;
        this.blurMat.uniforms.uDir.value.set(0, 1 / bh * (1 + i));
        this.pass(this.blurMat, this.bloomA);
      }
    }

    u.tDepth.value = depth;
    u.tAO.value = this.aoA.texture;
    u.uInvVP.value.multiplyMatrices(camera.matrixWorld, camera.projectionMatrixInverse);
    u.uCam.value.copy(camera.position);
    u.uMist.value = this.mist === false || sun.under ? 0 : sun.mist || 0;
    u.uUnder.value = sun.under ? 1 : 0;
    u.uTime.value = performance.now() * 0.001;
    u.uSunDir.value.copy(sun.dir);
    u.uSurf.value = sun.surf ?? 0;
    u.uWet.value = sun.wet || 0;
    u.uExposure.value = r.toneMappingExposure;
    if (sun.fog) { u.uFogCol.value.copy(sun.fog.color); u.uFogSun.value.copy(sun.fog.sun); u.uFogDens.value = sun.fog.dens; u.uFogFall.value = sun.fog.fall; }
    if (sun.under) u.uUnderCol.value.setRGB(0.03, 0.16, 0.18).multiplyScalar(0.25 + (sun.day ?? 1) * 0.9);
    if (sun.mistColor) u.uMistCol.value.copy(sun.mistColor);
    u.tColor.value = this.sceneRT.texture;
    u.tRays.value = this.raysRT.texture;
    u.tBloom.value = this.bloomA.texture;
    u.uWarm.value = sun.warm;
    if (this.fxaa) {
      this.pass(this.compMat, this.ldrRT);
      this.fxaaMat.uniforms.tColor.value = this.ldrRT.texture;
      this.fxaaMat.uniforms.uInv.value.set(1 / this.w, 1 / this.h);
      this.pass(this.fxaaMat, null);
    } else this.pass(this.compMat, null);
  }
}
