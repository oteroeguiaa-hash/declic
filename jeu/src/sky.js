// Ciel physique, cycle jour/nuit, soleil/lune, étoiles, nuages, brouillard et éclairage d'ambiance.
import * as THREE from "three";
import { Sky } from "../vendor/addons/Sky.js";
import { smoothstep, clamp, mulberry32 } from "./noise.js";
import { vegUniforms } from "./trees.js";

const C = (r, g, b) => new THREE.Color(r, g, b);
const FOG_NIGHT = C(0.018, 0.026, 0.05);
const FOG_DUSK = C(0.62, 0.42, 0.32);
const FOG_DAY = C(0.6, 0.7, 0.8);
const SUN_LOW = C(1.0, 0.55, 0.3);
const SUN_HIGH = C(1.0, 0.96, 0.9);
const MOON = C(0.55, 0.65, 0.95);

export class Environment {
  constructor(scene, renderer, quality) {
    this.scene = scene;
    this.renderer = renderer;
    this.quality = quality;

    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    this.sky.frustumCulled = false;
    const u = this.sky.material.uniforms;
    u.turbidity.value = 6;
    u.rayleigh.value = 1.6;
    u.mieCoefficient.value = 0.005;
    u.mieDirectionalG.value = 0.82;
    // Nuit : le shader d'origine éclaircit les tons sombres (ciel gris). On le fond vers un vrai ciel nocturne.
    u.uDay = { value: 1 };
    this.sky.material.fragmentShader = this.sky.material.fragmentShader
      .replace("uniform vec3 up;", "uniform vec3 up;\nuniform float uDay;")
      .replace("gl_FragColor = vec4( retColor, 1.0 );", `
      vec3 nightSky = mix(vec3(0.010, 0.016, 0.035), vec3(0.0015, 0.003, 0.011), smoothstep(0.0, 0.6, direction.y));
      gl_FragColor = vec4( mix(nightSky, retColor, uDay), 1.0 );`);
    this.sky.material.needsUpdate = true;
    scene.add(this.sky);

    // Copie du ciel pour la carte d'environnement (reflets de l'eau, lumière ambiante).
    this.envScene = new THREE.Scene();
    const envSky = new THREE.Mesh(this.sky.geometry, this.sky.material);
    envSky.scale.setScalar(50);
    this.envScene.add(envSky);
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.envRT = null;
    this.envTimer = 999;

    this.sun = new THREE.DirectionalLight(0xffffff, 3);
    this.sun.castShadow = quality.shadows;
    if (quality.shadows) {
      const s = quality.shadowSize;
      this.sun.shadow.mapSize.set(s, s);
      const r = quality.shadowRange;
      Object.assign(this.sun.shadow.camera, { left: -r, right: r, top: r, bottom: -r, near: 1, far: 500 });
      this.sun.shadow.bias = -0.0004;
      this.sun.shadow.normalBias = 0.04;
      this.shadowTexel = (2 * r) / s;
    }
    scene.add(this.sun, this.sun.target);

    this.hemi = new THREE.HemisphereLight(0xbfd8ff, 0x4a4030, 0.5);
    scene.add(this.hemi);

    scene.fog = new THREE.Fog(FOG_DAY.clone(), quality.viewDistance * 0.25, quality.viewDistance);

    this.buildStars();
    this.buildMoon();
    this.buildClouds();

    this.sunDir = new THREE.Vector3();
    this.lightDir = new THREE.Vector3();
    this.dayFactor = 1;  // 1 = plein jour, 0 = nuit noire
    this._m = new THREE.Matrix4();
    this._mi = new THREE.Matrix4();
    this._v = new THREE.Vector3();
  }

  buildStars() {
    const rand = mulberry32(4242);
    const n = 2600;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = rand() * 2 - 1, t = rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      pos[i * 3] = s * Math.cos(t) * 4000;
      pos[i * 3 + 1] = Math.abs(u) * 4000 - 200;
      pos[i * 3 + 2] = s * Math.sin(t) * 4000;
      const b = 0.4 + rand() * 0.6;
      const warm = rand();
      col[i * 3] = b * (0.85 + warm * 0.15); col[i * 3 + 1] = b * 0.9; col[i * 3 + 2] = b * (1.0 - warm * 0.15);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    this.starMat = new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0, fog: false, depthWrite: false });
    this.stars = new THREE.Points(g, this.starMat);
    this.stars.frustumCulled = false;
    this.stars.renderOrder = -1;
    this.scene.add(this.stars);
  }

  buildMoon() {
    const g = new THREE.CircleGeometry(90, 32);
    this.moonMat = new THREE.MeshBasicMaterial({ color: 0xdfe6ff, fog: false, transparent: true, depthWrite: false });
    this.moon = new THREE.Mesh(g, this.moonMat);
    this.moon.frustumCulled = false;
    this.scene.add(this.moon);
  }

  buildClouds() {
    const g = new THREE.PlaneGeometry(9000, 9000, 1, 1);
    g.rotateX(Math.PI / 2); // face vers le bas
    this.cloudUniforms = { uTime: { value: 0 }, uLight: { value: new THREE.Color() }, uShade: { value: new THREE.Color() }, uCover: { value: 0.5 } };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.cloudUniforms,
      transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false,
      vertexShader: `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: `
        uniform float uTime; uniform vec3 uLight; uniform vec3 uShade; uniform float uCover; varying vec3 vW;
        float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
        float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*vnoise(p); p*=2.03; a*=0.5; } return s; }
        void main(){
          vec2 p = vW.xz * 0.0011 + vec2(uTime * 0.004, uTime * 0.0015);
          float n = fbm(p);
          float d = smoothstep(uCover, uCover + 0.28, n);
          float dist = length(vW.xz - cameraPosition.xz);
          float fade = 1.0 - smoothstep(1200.0, 4200.0, dist);
          float shade = smoothstep(uCover, uCover + 0.5, fbm(p + 0.03));
          vec3 col = mix(uLight, uShade, shade * 0.75);
          gl_FragColor = vec4(col, d * fade * 0.92);
          #include <colorspace_fragment>
        }`,
    });
    this.clouds = new THREE.Mesh(g, mat);
    this.clouds.position.y = 420;
    this.clouds.frustumCulled = false;
    this.clouds.renderOrder = 1;
    this.scene.add(this.clouds);
  }

  // hours : 0..24
  update(hours, dt, camPos, focus) {
    // Jour de 6 h à 20 h (14 h de soleil), nuit de 20 h à 6 h.
    const a = hours >= 6 && hours < 20 ? ((hours - 6) / 14) * Math.PI : Math.PI + (((hours - 20 + 24) % 24) / 10) * Math.PI;
    const az = a;
    const elev = Math.sin(a) * THREE.MathUtils.degToRad(a <= Math.PI ? 64 : 40);
    this.sunDir.set(Math.cos(elev) * Math.cos(az), Math.sin(elev), Math.cos(elev) * Math.sin(az) * 0.6 + 0.25).normalize();
    const sunY = this.sunDir.y;
    const dayK = smoothstep(-0.12, 0.18, sunY);
    this.dayFactor = dayK;
    const duskK = (1 - smoothstep(0.02, 0.3, Math.abs(sunY))) * smoothstep(-0.18, 0.0, sunY);

    const u = this.sky.material.uniforms;
    u.sunPosition.value.copy(this.sunDir);
    u.rayleigh.value = 1.2 + duskK * 1.4;
    u.uDay.value = smoothstep(-0.16, 0.04, sunY);

    // Lumière principale : soleil le jour, lune la nuit.
    const moonDir = this._v.copy(this.sunDir).negate();
    moonDir.y = Math.abs(moonDir.y) * 0.8 + 0.25; moonDir.normalize();
    const sunK = smoothstep(-0.02, 0.12, sunY);
    if (sunK > 0.01) {
      this.lightDir.copy(this.sunDir);
      this.sun.color.copy(SUN_LOW).lerp(SUN_HIGH, smoothstep(0.05, 0.45, sunY));
      this.sun.intensity = 3.2 * sunK;
    } else {
      this.lightDir.copy(moonDir);
      this.sun.color.copy(MOON);
      this.sun.intensity = 0.45 * (1 - smoothstep(-0.12, -0.02, sunY));
    }

    // Infos pour les rayons de soleil et la translucidité des feuilles
    this.sunInfo = this.sunInfo || { dir: this.sunDir, color: new THREE.Color(), strength: 0, warm: 0 };
    this.sunInfo.color.copy(SUN_LOW).lerp(SUN_HIGH, smoothstep(0.05, 0.5, sunY));
    this.sunInfo.strength = sunK * (0.35 + duskK * 1.0);
    this.sunInfo.warm = duskK;
    // Brume du matin dans les vallées (forte à l'aube, disparaît vers 10 h), un peu le soir et la nuit
    const morning = smoothstep(4.5, 6.2, hours) * (1 - smoothstep(8.2, 10.8, hours));
    const evening = smoothstep(19, 21.5, hours) * 0.35;
    const night = (hours < 4.5 || hours > 21.5) ? 0.3 : 0;
    this.sunInfo.mist = Math.max(morning * 0.85, evening, night);
    this.sunInfo.mistColor = this.sunInfo.mistColor || new THREE.Color();
    this.sunInfo.mistColor.copy(this.scene.fog.color).multiplyScalar(1.15).lerp(this.sunInfo.color, 0.12 * sunK);
    vegUniforms.uSunDir.value.copy(this.lightDir);
    vegUniforms.uSunCol.value.copy(this.sun.color).multiplyScalar(this.sun.intensity * 0.32);

    this.hemi.intensity = 0.12 + 0.55 * dayK;
    this.hemi.color.setRGB(0.25 + 0.5 * dayK, 0.32 + 0.52 * dayK, 0.55 + 0.45 * dayK);
    this.hemi.groundColor.setRGB(0.06 + 0.24 * dayK, 0.06 + 0.2 * dayK, 0.08 + 0.12 * dayK);

    const fog = this.scene.fog;
    fog.color.copy(FOG_NIGHT).lerp(FOG_DAY, dayK).lerp(FOG_DUSK, duskK * 0.7);
    this.renderer.toneMappingExposure = 0.55 + (1 - dayK) * 0.15;

    this.starMat.opacity = 1 - smoothstep(-0.2, 0.02, sunY);
    this.stars.position.copy(camPos);
    this.stars.rotation.y = hours * 0.02;
    this.moon.position.copy(camPos).addScaledVector(moonDir, 3500);
    this.moon.lookAt(camPos);
    this.moonMat.opacity = 1 - smoothstep(-0.05, 0.15, sunY);

    const cu = this.cloudUniforms;
    cu.uTime.value += dt;
    cu.uLight.value.setRGB(0.08, 0.09, 0.13).lerp(C(1, 1, 1), dayK).lerp(C(1.0, 0.62, 0.45), duskK * 0.8);
    cu.uShade.value.copy(cu.uLight.value).multiplyScalar(0.55);
    this.clouds.position.x = camPos.x; this.clouds.position.z = camPos.z;

    // Ombres : la caméra d'ombre suit le joueur, alignée sur les texels pour éviter le scintillement.
    const center = this._v.copy(focus);
    if (this.quality.shadows) {
      this._m.lookAt(new THREE.Vector3(), this.lightDir.clone().negate(), new THREE.Vector3(0, 1, 0));
      this._mi.copy(this._m).invert();
      center.applyMatrix4(this._mi);
      center.x = Math.round(center.x / this.shadowTexel) * this.shadowTexel;
      center.y = Math.round(center.y / this.shadowTexel) * this.shadowTexel;
      center.applyMatrix4(this._m);
    }
    this.sun.target.position.copy(center);
    this.sun.position.copy(center).addScaledVector(this.lightDir, 250);

    // Carte d'environnement recalculée de temps en temps (coûteux).
    this.envTimer += dt;
    if (this.envTimer > this.quality.envInterval) {
      this.envTimer = 0;
      const old = this.envRT;
      this.envRT = this.pmrem.fromScene(this.envScene, 0, 0.1, 1000);
      this.scene.environment = this.envRT.texture;
      this.scene.environmentIntensity = 0.55;
      if (old) old.dispose();
    }
  }

  forceEnvUpdate() { this.envTimer = 1e9; }
}
