// Clavier + souris (verrouillage du pointeur) et commandes tactiles (joystick + boutons).

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressed = new Set();       // touches enfoncées depuis la dernière image
    this.look = { x: 0, y: 0 };
    this.move = { x: 0, y: 0 };
    this.attackHeld = false;
    this.touch = matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    this.locked = false;
    this.sensitivity = 1;
    this.enabled = false;

    addEventListener("keydown", (e) => {
      if (e.repeat) return;
      this.keys.add(e.code);
      this.pressed.add(e.code);
      if (["Tab", "Space"].includes(e.code) && this.enabled) e.preventDefault();
    });
    addEventListener("keyup", (e) => this.keys.delete(e.code));
    addEventListener("blur", () => { this.keys.clear(); this.attackHeld = false; });

    canvas.addEventListener("mousedown", (e) => {
      if (this.touch || !this.enabled) return;
      if (!this.locked) { this.requestLock(); return; }
      if (e.button === 0) { this.attackHeld = true; this.pressed.add("Attack"); }
      if (e.button === 2) this.pressed.add("KeyE");
    });
    addEventListener("mouseup", (e) => { if (e.button === 0) this.attackHeld = false; });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    addEventListener("mousemove", (e) => {
      if (!this.locked) return;
      this.look.x += e.movementX * 0.0022 * this.sensitivity;
      this.look.y += e.movementY * 0.0022 * this.sensitivity;
    });
    addEventListener("wheel", (e) => { if (this.locked) this.pressed.add(e.deltaY > 0 ? "WheelDown" : "WheelUp"); }, { passive: true });
    document.addEventListener("pointerlockchange", () => {
      this.locked = document.pointerLockElement === canvas;
      if (this.onLockChange) this.onLockChange(this.locked);
    });

    if (this.touch) this.setupTouch();
  }

  requestLock() {
    if (this.touch) return;
    try { const p = this.canvas.requestPointerLock({ unadjustedMovement: true }); if (p && p.catch) p.catch(() => this.canvas.requestPointerLock()); }
    catch { this.canvas.requestPointerLock(); }
  }
  exitLock() { if (document.pointerLockElement) document.exitPointerLock(); }

  setupTouch() {
    document.body.classList.add("touch");
    const stick = document.getElementById("stick");
    const knob = document.getElementById("knob");
    let stickId = null, sx = 0, sy = 0;
    let lookId = null, lx = 0, ly = 0;
    const R = 55;
    const area = document.getElementById("touchArea");
    area.addEventListener("touchstart", (e) => {
      if (!this.enabled) return;
      for (const t of e.changedTouches) {
        if (t.clientX < innerWidth * 0.42 && stickId === null) {
          stickId = t.identifier; sx = t.clientX; sy = t.clientY;
          stick.style.left = sx - 65 + "px"; stick.style.top = sy - 65 + "px";
          stick.classList.add("on");
        } else if (lookId === null) {
          lookId = t.identifier; lx = t.clientX; ly = t.clientY;
        }
      }
      e.preventDefault();
    }, { passive: false });
    area.addEventListener("touchmove", (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === stickId) {
          let dx = t.clientX - sx, dy = t.clientY - sy;
          const d = Math.hypot(dx, dy);
          if (d > R) { dx *= R / d; dy *= R / d; }
          knob.style.transform = `translate(${dx}px, ${dy}px)`;
          this.move.x = dx / R; this.move.y = -dy / R;
        } else if (t.identifier === lookId) {
          this.look.x += (t.clientX - lx) * 0.0055 * this.sensitivity;
          this.look.y += (t.clientY - ly) * 0.0055 * this.sensitivity;
          lx = t.clientX; ly = t.clientY;
        }
      }
      e.preventDefault();
    }, { passive: false });
    const end = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === stickId) {
          stickId = null; this.move.x = this.move.y = 0;
          knob.style.transform = ""; stick.classList.remove("on");
        } else if (t.identifier === lookId) lookId = null;
      }
    };
    area.addEventListener("touchend", end);
    area.addEventListener("touchcancel", end);

    const bind = (id, code, hold) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("touchstart", (e) => {
        e.preventDefault(); e.stopPropagation();
        this.pressed.add(code);
        if (hold) this[hold] = true;
        el.classList.add("down");
      }, { passive: false });
      const up = (e) => { e.preventDefault(); if (hold) this[hold] = false; el.classList.remove("down"); };
      el.addEventListener("touchend", up);
      el.addEventListener("touchcancel", up);
    };
    bind("btnAttack", "Attack", "attackHeld");
    bind("btnUse", "KeyE");
    bind("btnJump", "Space", "jumpHeld");
    bind("btnBag", "Tab");
    bind("btnTool", "WheelDown");
    bind("btnBuild", "Build");
  }

  axis() {
    if (this.touch && (this.move.x || this.move.y)) return { x: this.move.x, y: this.move.y };
    const k = this.keys;
    return {
      x: (k.has("KeyD") || k.has("ArrowRight") ? 1 : 0) - (k.has("KeyA") || k.has("ArrowLeft") ? 1 : 0),
      y: (k.has("KeyW") || k.has("ArrowUp") ? 1 : 0) - (k.has("KeyS") || k.has("ArrowDown") ? 1 : 0),
    };
  }

  get sprint() {
    if (this.touch) return Math.hypot(this.move.x, this.move.y) > 0.95;
    return this.keys.has("ShiftLeft") || this.keys.has("ShiftRight");
  }
  get crouch() { return this.keys.has("KeyC") || this.keys.has("ControlLeft"); }
  get jump() { return this.keys.has("Space") || this.jumpHeld; }

  consumeLook() { const l = { ...this.look }; this.look.x = this.look.y = 0; return l; }
  was(code) { return this.pressed.has(code); }
  endFrame() { this.pressed.clear(); }
}
