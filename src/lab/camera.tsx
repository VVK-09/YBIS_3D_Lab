import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { COLLIDERS, ROOM } from "./config";
import { useLab } from "./store";

const SPEED = 2.55;
const EYE = 1.52;
const RADIUS = 0.28;
const HALF_W = ROOM.w / 2 - 0.38;
const HALF_D = ROOM.d / 2 - 0.38;

const held = new Set<string>();
let injected: string[] = [];
const pawn = {
  x: 0,
  z: 2.55,
  yaw: 0,
  pitch: -0.08,
  speed: 0,
};

function colliding(x: number, z: number) {
  for (const c of COLLIDERS) {
    if (Math.abs(x - c.x) < c.hx + RADIUS && Math.abs(z - c.z) < c.hz + RADIUS) return true;
  }
  return false;
}

function codesHas(code: string) {
  return held.has(code) || injected.includes(code);
}

const tmpDest = new THREE.Vector3();
const tmpTgt = new THREE.Vector3();
const tmpForward = new THREE.Vector3();
const tmpRight = new THREE.Vector3();
const tmpMove = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

export function CameraRig() {
  const mode = useLab((s) => s.mode);
  const flyTo = useLab((s) => s.flyTo);
  const stick = useLab((s) => s.stick);
  const controls = useRef<any>(null);
  const { camera, gl } = useThree();
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      held.add(e.code);
      if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }
    };
    const onUp = (e: KeyboardEvent) => held.delete(e.code);
    const clear = () => held.clear();
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    window.__controlsTest = {
      getYaw: () => pawn.yaw,
      getSpeed: () => pawn.speed,
      getPosition: () => ({ x: pawn.x, z: pawn.z }),
      setKeys: (codes) => {
        injected = codes.slice();
      },
    };
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      if (mode !== "walk") return;
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
    };
    const move = (e: PointerEvent) => {
      if (mode !== "walk" || !dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      pawn.yaw -= dx * 0.005;
      pawn.pitch = Math.max(-1.15, Math.min(0.85, pawn.pitch - dy * 0.004));
    };
    const up = () => {
      dragging.current = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl, mode]);

  useEffect(() => {
    return useLab.subscribe((state) => {
      if (
        state.flyTo &&
        state.flyTo.position[0] === 0.6 &&
        state.flyTo.position[1] === 9.4 &&
        state.flyTo.position[2] === 11.2
      ) {
        pawn.x = 0;
        pawn.z = 2.55;
        pawn.yaw = 0;
        pawn.pitch = -0.08;
        pawn.speed = 0;
      }
    });
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    if (mode === "orbit" && flyTo && controls.current) {
      tmpDest.set(...flyTo.position);
      tmpTgt.set(...flyTo.target);
      camera.position.lerp(tmpDest, 1 - Math.exp(-dt * 4.5));
      controls.current.target.lerp(tmpTgt, 1 - Math.exp(-dt * 4.5));
      controls.current.update();

      // When arrived close to destination, release to free mouse control immediately!
      if (
        camera.position.distanceTo(tmpDest) < 0.04 &&
        controls.current.target.distanceTo(tmpTgt) < 0.04
      ) {
        camera.position.copy(tmpDest);
        controls.current.target.copy(tmpTgt);
        controls.current.update();
        useLab.getState().clearFlyTo();
      }
    }

    const sprint = codesHas("ShiftLeft") || codesHas("ShiftRight") ? 1.65 : 1;
    let ax = 0;
    let az = 0;
    if (codesHas("KeyW") || codesHas("ArrowUp")) az += 1;
    if (codesHas("KeyS") || codesHas("ArrowDown")) az -= 1;
    if (codesHas("KeyD") || codesHas("ArrowRight")) ax += 1;
    if (codesHas("KeyA") || codesHas("ArrowLeft")) ax -= 1;
    ax += stick.x;
    az += stick.y;
    const mag = Math.hypot(ax, az);
    if (mag > 1) {
      ax /= mag;
      az /= mag;
    }

    tmpForward.set(-Math.sin(pawn.yaw), 0, -Math.cos(pawn.yaw));
    tmpRight.set(Math.cos(pawn.yaw), 0, -Math.sin(pawn.yaw));
    tmpMove.copy(tmpForward).multiplyScalar(az).addScaledVector(tmpRight, ax);

    const sp = SPEED * sprint;
    const nx = pawn.x + tmpMove.x * sp * dt;
    const nz = pawn.z + tmpMove.z * sp * dt;
    if (Math.abs(nx) < HALF_W && !colliding(nx, pawn.z)) pawn.x = nx;
    if (Math.abs(nz) < HALF_D && !colliding(pawn.x, nz)) pawn.z = nz;
    pawn.speed = mag * sp;

    if (mode === "walk") {
      camera.position.set(pawn.x, EYE, pawn.z);
      tmpLook.set(
        pawn.x - Math.sin(pawn.yaw) * Math.cos(pawn.pitch),
        EYE + Math.sin(pawn.pitch),
        pawn.z - Math.cos(pawn.yaw) * Math.cos(pawn.pitch),
      );
      camera.lookAt(tmpLook);
    }
  });

  if (mode !== "orbit") return null;

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.12}
      rotateSpeed={0.95}
      panSpeed={0.9}
      zoomSpeed={1.15}
      screenSpacePanning
      minDistance={0.6}
      maxDistance={25}
      maxPolarAngle={Math.PI / 2.05}
      minPolarAngle={0.12}
      target={[0, 0.55, -0.2]}
      enablePan
      onStart={() => {
        // Immediately yield camera to user mouse drag
        useLab.getState().clearFlyTo();
      }}
    />
  );
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      getPosition?: () => { x: number; z: number };
      setKeys?: (codes: string[]) => void;
    };
  }
}
