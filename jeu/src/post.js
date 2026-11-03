// Post-traitement : rayons de soleil volumétriques (god rays), halo lumineux (bloom), étalonnage des couleurs.
// La scène est rendue en HDR dans une texture, puis composée à l'écran avec le tone mapping ACES.
import * as THREE from "three";

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
      uniforms: { tColor: { value: null }, uThreshold: { value: 1.2 } },
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
      },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tColor; uniform sampler2D tRays; uniform sampler2D tBloom;
        uniform vec3 uRayCol; uniform float uBloom; uniform float uSat; uniform float uWarm;
        varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tColor, vUv).rgb;
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
    r.setRenderTarget(this.sceneRT);
    r.render(scene, camera);

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
    this.compMat.uniforms.uBloom.value = this.bloom ? 0.5 : 0;
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
    u.tColor.value = this.sceneRT.texture;
    u.tRays.value = this.raysRT.texture;
    u.tBloom.value = this.bloomA.texture;
    u.uWarm.value = sun.warm;
    this.pass(this.compMat, null);
  }
}
