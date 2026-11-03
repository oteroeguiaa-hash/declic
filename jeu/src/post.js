// Post-traitement : rayons de soleil volumétriques (god rays), halo lumineux (bloom), étalonnage des couleurs.
// La scène est rendue en HDR dans une texture, puis composée à l'écran avec le tone mapping ACES.
import * as THREE from "three";
import { refrUniforms } from "./world.js";

const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

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

    this.brightMat = new THREE.ShaderMaterial({
      uniforms: { tColor: { value: null }, uThreshold: { value: 1.7 } },
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
        tColor: { value: null }, tRays: { value: null }, tBloom: { value: null },
        uRayCol: { value: new THREE.Color() }, uBloom: { value: 0.5 }, uSat: { value: 1.08 }, uWarm: { value: 0 },
        tDepth: { value: null }, uInvVP: { value: new THREE.Matrix4() }, uCam: { value: new THREE.Vector3() },
        uMist: { value: 0 }, uMistCol: { value: new THREE.Color() },
        uUnder: { value: 0 }, uUnderCol: { value: new THREE.Color() },
        uTime: { value: 0 }, uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uSurf: { value: 0 }, uWet: { value: 0 },
      },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tColor; uniform sampler2D tRays; uniform sampler2D tBloom;
        uniform vec3 uRayCol; uniform float uBloom; uniform float uSat; uniform float uWarm;
        uniform sampler2D tDepth; uniform mat4 uInvVP; uniform vec3 uCam; uniform float uMist; uniform vec3 uMistCol;
        uniform float uUnder; uniform vec3 uUnderCol; uniform float uTime; uniform vec3 uSunDir; uniform float uSurf; uniform float uWet;
        float caust(vec2 p){
          float a = sin(p.x * 0.9 + uTime * 0.9) + sin(p.y * 0.8 - uTime * 0.7) + sin((p.x + p.y) * 0.55 + uTime * 0.5) + sin((p.x - p.y) * 1.3 - uTime * 1.1);
          return pow(abs(a) * 0.25, 2.5);
        }
        varying vec2 vUv;
        void main(){
          // Lentille mouillée en sortant de l'eau : l'image coule légèrement
          vec2 uv0 = vUv;
          if (uWet > 0.001) uv0 += vec2(sin(vUv.y * 30.0 + uTime * 3.0), cos(vUv.x * 24.0 + uTime * 2.0)) * 0.004 * uWet;
          vec3 c = texture2D(tColor, uv0).rgb;
          // Sous l'eau : lumière bleu-vert qui s'éteint avec la distance, légère ondulation
          if (uUnder > 0.5) {
            vec2 wob = vec2(sin(vUv.y * 40.0 + uCam.x * 0.7 + uCam.z * 0.5), 0.0);
            float d = texture2D(tDepth, vUv + wob * 0.0015).r;
            vec4 wp = uInvVP * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
            wp.xyz /= wp.w;
            float dist = d >= 0.99999 ? 200.0 : length(wp.xyz - uCam);
            c = texture2D(tColor, vUv + wob * 0.0015).rgb * vec3(0.55, 0.85, 0.9);
            // Rayons lumineux qui traversent l'eau : on avance le long du regard et on cumule la lumière
            vec3 rd = normalize(wp.xyz - uCam);
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
            // Vers la surface : fenêtre lumineuse (le ciel vu à travers l'eau)
            c += uUnderCol * 2.0 * smoothstep(0.2, 0.9, rd.y) * exp(-max(0.0, uSurf - uCam.y) * 0.08);
          }
          // Brume de vallée : une couche basse qui remplit les creux, plus dense au loin
          if (uMist > 0.001) {
            float d = texture2D(tDepth, vUv).r;
            vec4 wp = uInvVP * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
            wp.xyz /= wp.w;
            vec3 ray = wp.xyz - uCam;
            float dist = d >= 0.99999 ? 2500.0 : length(ray);
            float y = d >= 0.99999 ? uCam.y + normalize(ray).y * 2500.0 : wp.y;
            float layer = 1.0 - smoothstep(6.0, 26.0, y);
            float camIn = 1.0 - smoothstep(8.0, 30.0, uCam.y);
            float amount = uMist * layer * (1.0 - exp(-dist * mix(0.004, 0.012, camIn)));
            c = mix(c, uMistCol, clamp(amount, 0.0, 0.88));
          }
          c += texture2D(tRays, vUv).r * uRayCol;
          c += texture2D(tBloom, vUv).rgb * uBloom;
          c *= mix(vec3(1.0), vec3(1.06, 1.0, 0.9), uWarm);
          gl_FragColor = vec4(c, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          vec3 o = gl_FragColor.rgb;
          float l = dot(o, vec3(0.299, 0.587, 0.114));
          o = mix(vec3(l), o, uSat);
          o = (o - 0.5) * 1.05 + 0.5;                                  // contraste léger
          vec2 p = vUv - 0.5;
          o *= 1.0 - dot(p, p) * 0.55;                                   // vignettage
          o += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
          gl_FragColor = vec4(clamp(o, 0.0, 1.0), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.compMat.toneMapped = true;

    this.rays = true;
    this.bloom = true;
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
    this.w = w; this.h = h;
  }

  pass(mat, target) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.scene, this.cam);
  }

  // sun : { dir: Vector3 (vers le soleil), color: Color, strength: 0..n, warm: 0..1 }
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
    const ac = r.autoClear, su = r.shadowMap.autoUpdate, bg = scene.background;
    r.autoClear = false; r.shadowMap.autoUpdate = false;
    r.setRenderTarget(this.sceneRT);
    r.render(scene, camera);
    r.autoClear = ac; r.shadowMap.autoUpdate = su;
    camera.layers.set(0);

    // Position du soleil à l'écran
    const sp = this._v.copy(camera.position).addScaledVector(sun.dir, 1000).project(camera);
    camera.getWorldDirection(this._f);
    const facing = this._f.dot(sun.dir);
    const onScreen = Math.max(0, 1 - Math.max(0, Math.max(Math.abs(sp.x), Math.abs(sp.y)) - 1) * 1.2);
    const rayK = (this.rays ? 1 : 0) * sun.strength * THREE.MathUtils.smoothstep(facing, 0.05, 0.55) * onScreen;

    if (rayK > 0.002) {
      this.raysMat.uniforms.tDepth.value = this.sceneRT.depthTexture;
      this.raysMat.uniforms.uSun.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5);
      this.raysMat.uniforms.uAspect.value = this.w / this.h;
      this.pass(this.raysMat, this.raysRT);
    }
    this.compMat.uniforms.uRayCol.value.copy(sun.color).multiplyScalar(rayK);

    // Bloom
    this.compMat.uniforms.uBloom.value = this.bloom ? 0.28 : 0;
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

    const u = this.compMat.uniforms;
    u.tDepth.value = this.sceneRT.depthTexture;
    u.uInvVP.value.multiplyMatrices(camera.matrixWorld, camera.projectionMatrixInverse);
    u.uCam.value.copy(camera.position);
    u.uMist.value = this.mist === false || sun.under ? 0 : sun.mist || 0;
    u.uUnder.value = sun.under ? 1 : 0;
    u.uTime.value = performance.now() * 0.001;
    u.uSunDir.value.copy(sun.dir);
    u.uSurf.value = sun.surf ?? 0;
    u.uWet.value = sun.wet || 0;
    if (sun.under) u.uUnderCol.value.setRGB(0.03, 0.16, 0.18).multiplyScalar(0.25 + (sun.day ?? 1) * 0.9);
    if (sun.mistColor) u.uMistCol.value.copy(sun.mistColor);
    u.tColor.value = this.sceneRT.texture;
    u.tRays.value = this.raysRT.texture;
    u.tBloom.value = this.bloomA.texture;
    u.uWarm.value = sun.warm;
    this.pass(this.compMat, null);
  }
}
