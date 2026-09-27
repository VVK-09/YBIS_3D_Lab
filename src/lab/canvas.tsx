import { Canvas } from "@react-three/fiber";
import { LabScene } from "./scene";

export default function CanvasApp() {
  return (
    <Canvas
      className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance", logarithmicDepthBuffer: true }}
      camera={{ fov: 42, position: [0.6, 9.4, 11.2], near: 0.1, far: 80 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#b7c4d4");
      }}
    >
      <LabScene />
    </Canvas>
  );
}
