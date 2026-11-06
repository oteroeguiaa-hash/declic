// Pluie tropicale : traînées de gouttes autour du joueur (calculées sur la carte graphique), plus denses
// et plus inclinées quand l'averse forcit. Sous la canopée, la pluie arrive en grosses gouttes qui tombent des feuilles.
import * as THREE from "three";

export class Rain {
  constructor(scene) {
    const N = 6000, R = 22, H = 26;
    const pos = new Float32Array(N * 2 * 3), seed = new Float32Array(N * 2 * 4);
    for (let i = 0; i < N; i++) {
      const x = (Math.random() * 2 - 1) * R, z = (Math.random() * 2 - 1) * R, y = Math.random() * H, sp = 0.8 + Math.random() * 0.4, k = Math.random();
      for (let e = 0; e < 2; e++) {
        pos.set([x, y, z], (i * 2 + e) * 3);
        seed.set([e, sp, k, Math.random()], (i * 2 + e) * 4);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4));
    this.u = { uTime: { value: 0 }, uRain: { value: 0 }, uCam: { value: new THREE.Vector3() }, uLight: { value: new THREE.Color(0.7, 0.72, 0.75) }, uWind: { value: new THREE.Vector2(0.15, 0.05) } };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.u, transparent: true, depthWrite: false, fog: false,
      vertexShader: `
        uniform float uTime; uniform float uRain; uniform vec3 uCam; uniform vec2 uWind;
        attribute vec4 aSeed; varying float vA;
        void main() {
          float R = 22.0, H = 26.0;
          vec3 p = position;
          float fall = 9.0 * aSeed.y;
          p.y = mod(p.y - uTime * fall - uCam.y, H) + uCam.y - H * 0.45;
          // la boîte de gouttes suit le joueur sans « glisser » (positions repliées dans la boîte)
          p.x = mod(p.x - uCam.x + R, 2.0 * R) - R + uCam.x;
          p.z = mod(p.z - uCam.z + R, 2.0 * R) - R + uCam.z;
          float len = 0.45 + 0.5 * uRain;
          p.y += aSeed.x * len;
          p.xz -= aSeed.x * uWind * len * (0.5 + uRain);
          // seules une partie des gouttes sont visibles selon l'intensité
          vA = step(aSeed.z, uRain) * (0.35 + 0.4 * aSeed.w) * (aSeed.x > 0.5 ? 0.0 : 1.0) + step(aSeed.z, uRain) * (aSeed.x > 0.5 ? 0.6 : 0.0) * (0.35 + 0.4 * aSeed.w);
          float d = length(p.xz - uCam.xz);
          vA *= smoothstep(R, R * 0.6, d) * smoothstep(0.3, 1.2, d);
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uLight; varying float vA;
        void main() { if (vA < 0.01) discard; gl_FragColor = vec4(uLight, vA * 0.55); }`,
    });
    this.mesh = new THREE.LineSegments(g, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 3;
    scene.add(this.mesh);
  }

  update(dt, cam, rain, day, flash = 0) {
    this.u.uTime.value += dt;
    this.u.uRain.value = rain;
    this.u.uCam.value.copy(cam);
    this.u.uLight.value.setRGB(0.12 + 0.6 * day + flash, 0.13 + 0.6 * day + flash, 0.15 + 0.62 * day + flash);
    this.mesh.visible = rain > 0.02;
  }
}
