import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { LabScene } from "./scene";

export default function CanvasApp() {
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const onDown = () => {
      isDraggingRef.current = true;
    };
    const onUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener("pointerdown", onDown, { capture: true });
    window.addEventListener("pointerup", onUp, { capture: true });
    window.addEventListener("pointercancel", onUp, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", onDown, { capture: true });
      window.removeEventListener("pointerup", onUp, { capture: true });
      window.removeEventListener("pointercancel", onUp, { capture: true });
    };
  }, []);

  return (
    <Canvas
      className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
      shadows
      dpr={[1, 1.25]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 42, position: [0.6, 9.4, 11.2], near: 0.1, far: 80 }}
      onCreated={({ gl, scene, raycaster }) => {
        gl.setClearColor("#b7c4d4");
        // Expose renderer info for performance profiling
        if (typeof window !== "undefined") {
          (window as any).__gl = gl;
          (window as any).__scene = scene;
        }
        // When dragging to orbit/walk, bypass scene traversal in raycasting
        const origIntersectObjects = (raycaster as any).intersectObjects;
        (raycaster as any).intersectObjects = function (objects: any, recursive: any, target: any) {
          if (isDraggingRef.current) return target || [];
          return origIntersectObjects.call(this, objects, recursive, target);
        };
      }}
    >
      <LabScene />
    </Canvas>
  );
}
