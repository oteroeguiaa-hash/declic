// Reflets de l'eau calme (rivières, lacs, mer) : la scène est rendue depuis une caméra « miroir »
// sous la surface, puis projetée sur l'eau. Actif seulement près de l'eau (coûteux).
import * as THREE from "three";

export const reflUniforms = {
  tRefl: { value: null },
  uReflMat: { value: new THREE.Matrix4() },
  uReflOn: { value: 0 },
  uReflLevel: { value: 0 },
};

// Code à injecter dans le shader de l'eau, juste avant la sortie de couleur.
// Suppose que vWPos (position monde) et nxy (perturbation des vagues) existent.
export const REFL_PARS = `uniform sampler2D tRefl; uniform mat4 uReflMat; uniform float uReflOn; uniform float uReflLevel;`;
export const REFL_APPLY = `
  {
    float on = uReflOn * (1.0 - smoothstep(0.35, 1.2, abs(vWPos.y - uReflLevel))) * step(vWPos.y, cameraPosition.y);
    if (on > 0.001) {
      vec4 rp = uReflMat * vec4(vWPos, 1.0);
      vec2 ruv = rp.xy / rp.w + nxy * 0.035;
      vec3 refl = texture2D(tRefl, ruv).rgb;
      float cosV = max(dot(normalize(cameraPosition - vWPos), vec3(0.0, 1.0, 0.0)), 0.0);
      float fres = 0.12 + 0.82 * pow(1.0 - cosV, 3.0);
      outgoingLight = mix(outgoingLight, refl, fres * on);
      diffuseColor.a = max(diffuseColor.a, fres * on * 0.95);
    }
  }
  #include <opaque_fragment>`;

export class Reflection {
  constructor(renderer, quality) {
    this.renderer = renderer;
    this.enabled = quality.reflections > 0;
    this.scale = quality.reflections || 0.4;
    this.rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, depthBuffer: true });
    this.cam = new THREE.PerspectiveCamera();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.hidden = [];
    this.bias = new THREE.Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    reflUniforms.tRefl.value = this.rt.texture;
    this._v = new THREE.Vector3();
    this._t = new THREE.Vector3();
    this._u = new THREE.Vector3();
  }

  setSize(w, h) {
    this.rt.setSize(Math.max(1, Math.round(w * this.scale)), Math.max(1, Math.round(h * this.scale)));
  }

  // level : altitude de la surface de l'eau la plus proche, ou null si pas d'eau à proximité.
  render(scene, camera, level) {
    if (!this.enabled || level == null) { reflUniforms.uReflOn.value = 0; return; }
    const r = this.renderer;
    const c = this.cam;
    c.copy(camera, false);
    // Position et cible reflétées par rapport au plan horizontal de l'eau
    c.position.set(camera.position.x, 2 * level - camera.position.y, camera.position.z);
    camera.getWorldDirection(this._v);
    this._t.copy(camera.position).add(this._v);
    this._t.y = 2 * level - this._t.y;
    this._u.set(0, 1, 0).applyQuaternion(camera.quaternion);
    this._u.y = -this._u.y;
    c.up.copy(this._u);
    c.lookAt(this._t);
    c.updateMatrixWorld();
    c.projectionMatrix.copy(camera.projectionMatrix);

    reflUniforms.uReflMat.value.copy(this.bias).multiply(c.projectionMatrix).multiply(c.matrixWorldInverse);
    reflUniforms.uReflLevel.value = level;
    reflUniforms.uReflOn.value = 0; // l'eau elle-même n'est pas rendue dans le reflet

    this.plane.constant = -level + 0.05;
    const prevClip = r.clippingPlanes, prevShadow = r.shadowMap.autoUpdate;
    r.clippingPlanes = [this.plane];
    r.shadowMap.autoUpdate = false;
    for (const o of this.hidden) o.visible = false;
    r.setRenderTarget(this.rt);
    r.render(scene, c);
    r.setRenderTarget(null);
    for (const o of this.hidden) o.visible = true;
    r.clippingPlanes = prevClip;
    r.shadowMap.autoUpdate = prevShadow;
    reflUniforms.uReflOn.value = 1;
  }
}
