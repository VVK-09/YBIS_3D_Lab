import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function createTextCanvas(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  if (ctx) {
    draw(ctx, width, height);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

// 1. Zone 9 Overhead Lightbox Banner Texture
function makeZone9BannerTexture() {
  return createTextCanvas(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = "#070d1a";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#00b4d8";
    ctx.lineWidth = 5;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.fillStyle = "#00b4d8";
    ctx.fillRect(8, 8, 14, h - 16);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 20px monospace";
    ctx.fillText("ZONE 09 // SPATIAL COMPUTING & AR/VR IMMERSIVE LAB", 38, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
    ctx.fillText("IMMERSIVE SPATIAL PROTOTYPING & XR", 38, 98);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px 'Outfit', sans-serif, system-ui";
    ctx.fillText("VisionOS Spatial Experiences · Room-Scale LiDAR Meshing · 6-DOF Mixed Reality · Holographic Displays", 38, 134);

    const cards = [
      { label: "SPATIAL VISOR", text: "APPLE VISION PRO 4K", color: "#38bdf8", x: 38, w: 220 },
      { label: "MIXED REALITY", text: "QUEST 3 PASSTHROUGH", color: "#22c55e", x: 274, w: 210 },
      { label: "TRACKING STACK", text: "ROOM-SCALE LIDAR MESH", color: "#f59e0b", x: 500, w: 220 },
      { label: "HOLOGRAPHY", text: "VOLUMETRIC PROJECTION", color: "#a855f7", x: 736, w: 248 },
    ];

    cards.forEach((c) => {
      ctx.fillStyle = "#0c1930";
      ctx.fillRect(c.x, 154, c.w, 82);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 11px monospace";
      ctx.fillText(c.label, c.x + 16, 178);

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(c.x + 10, 186, c.w - 20, 40);

      ctx.strokeStyle = c.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(c.x + 10, 186, c.w - 20, 40);

      ctx.fillStyle = c.color;
      ctx.font = "bold 13px monospace";
      ctx.fillText(c.text, c.x + 18, 211);
    });
  });
}

// Animated Floating Hologram Component
function FloatingHologram() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group position={[0, 0.9, 0]}>
      {/* Ethereal Floating Hologram Geometry */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.85} />
      </mesh>
      {/* Internal Pulsing Core */}
      <mesh>
        <octahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      {/* Vertical Holographic Light Emitter Column */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.08, 0.18, 0.45, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// COMPLETE ZONE 9 SHOWCASE COMPONENT
// -------------------------------------------------------------

export function Zone9SpatialVRShowcase({ mural }: { mural?: THREE.Texture }) {
  const bannerTex = useMemo(() => makeZone9BannerTexture(), []);

  return (
    <group position={[-4.35, 0, 2.55]}>
      {/* 1. Architectural Feature Wall with Lightbox Banner */}
      <group position={[-1.15, 1.95, 0.1]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.55, 0.95, 0.02]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.18, 0.015]}>
          <planeGeometry args={[2.3, 0.44]} />
          <meshStandardMaterial
            map={bannerTex}
            emissive="#ffffff"
            emissiveMap={bannerTex}
            emissiveIntensity={0.28}
            roughness={0.45}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      </group>

      {/* 2. Premium Curved Lounge Sectional Sofa (Scandinavian Soft Slate & Warm Birch Base) */}
      <group position={[0.1, 0, -0.1]} rotation={[0, 0.35, 0]}>
        {/* Birch Wood Base Plinth */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[1.75, 0.12, 0.75]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.4} />
        </mesh>
        {/* Deep Comfortable Seat Cushion (Modern Light Slate Gray) */}
        <mesh position={[0, 0.26, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.24, 0.65]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.54, -0.28]} castShadow>
          <boxGeometry args={[1.7, 0.42, 0.18]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </mesh>
        {/* Left Armrest */}
        <mesh position={[-0.8, 0.42, 0]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.72]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </mesh>
        {/* Right Armrest */}
        <mesh position={[0.8, 0.42, 0]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.72]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </mesh>
        {/* Decorative Throw Pillows */}
        <mesh position={[-0.45, 0.42, -0.18]} rotation={[0.15, 0.1, 0]}>
          <boxGeometry args={[0.28, 0.28, 0.1]} />
          <meshStandardMaterial color="#0284c7" roughness={0.6} />
        </mesh>
        <mesh position={[0.45, 0.42, -0.18]} rotation={[0.15, -0.15, 0]}>
          <boxGeometry args={[0.28, 0.28, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" roughness={0.6} />
        </mesh>
      </group>

      {/* 3. Minimalist Scandinavian Blonde Birch Coffee Table */}
      <group position={[0.2, 0, 0.75]}>
        {/* Rounded Oval Tabletop */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.44, 0.04, 32]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.4} />
        </mesh>
        {/* 3 Cylindrical Blonde Birch Legs */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((ang, i) => (
          <mesh key={i} position={[0.28 * Math.cos(ang), 0.15, 0.28 * Math.sin(ang)]} castShadow>
            <cylinderGeometry args={[0.025, 0.03, 0.3, 16]} />
            <meshStandardMaterial color="#ebd5b3" roughness={0.4} />
          </mesh>
        ))}

        {/* ---------------- SPATIAL COMPUTING VISORS ---------------- */}

        {/* A. Apple Vision Pro Spatial Headset on Inductive Charging Stand */}
        <group position={[-0.14, 0.34, -0.06]} rotation={[0, 0.4, 0]}>
          {/* Circular Magnetic Charging Puck */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.065, 0.07, 0.015, 20]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.018, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.003, 20]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
          </mesh>

          {/* Vision Pro Curved Visor (Laminated Black Glass) */}
          <group position={[0, 0.045, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.075, 24, 16]} />
              <meshStandardMaterial color="#050811" roughness={0.1} metalness={0.9} />
            </mesh>
            {/* Glowing EyeSight Spatial Display Hue */}
            <mesh position={[0, 0, 0.04]}>
              <sphereGeometry args={[0.065, 16, 12]} />
              <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.5} transparent opacity={0.6} />
            </mesh>
            {/* Silver Anodized Aluminum Enclosure Ring */}
            <mesh position={[0, 0, -0.01]}>
              <torusGeometry args={[0.072, 0.008, 12, 32]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* 3D Woven Solo Knit Headband (Ribbed Texture) */}
            <mesh position={[0, 0, -0.075]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.078, 0.014, 12, 28, Math.PI]} />
              <meshStandardMaterial color="#f97316" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* B. Meta Quest 3 Mixed Reality Headset with Controllers */}
        <group position={[0.15, 0.34, 0.08]} rotation={[0, -0.35, 0]}>
          {/* Main White Headset Chassis */}
          <group position={[0, 0.04, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.14, 0.065, 0.08]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            {/* 3 Vertical Tracking Sensor Cutouts on Front */}
            {[-0.035, 0, 0.035].map((cx, i) => (
              <mesh key={i} position={[cx, 0, 0.041]}>
                <boxGeometry args={[0.014, 0.038, 0.004]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
            ))}
            {/* Black Foam Facial Interface */}
            <mesh position={[0, 0, -0.042]}>
              <boxGeometry args={[0.13, 0.06, 0.015]} />
              <meshStandardMaterial color="#334155" roughness={0.9} />
            </mesh>
          </group>

          {/* Touch Plus Controller Resting Beside */}
          <group position={[0.12, 0.02, 0]} rotation={[0, 0, 0.5]}>
            <mesh position={[0, 0.03, 0]}>
              <cylinderGeometry args={[0.014, 0.012, 0.09, 12]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
            <mesh position={[0, 0.07, 0.01]}>
              <cylinderGeometry args={[0.025, 0.025, 0.015, 14]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>
        </group>
      </group>

      {/* 4. Central Holographic 3D Volumetric Projection Plinth */}
      <group position={[-0.55, 0, 0.88]}>
        {/* Sleek Cylindrical Matte Obsidian Plinth */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.24, 0.28, 0.64, 28]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Brushed Stainless Ring Trim */}
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[0.245, 0.245, 0.02, 28]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
        {/* Holographic Projection Lens (Glowing Cyan) */}
        <mesh position={[0, 0.655, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.01, 28]} />
          <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={1} toneMapped={false} />
        </mesh>

        {/* Animated Floating Hologram */}
        <FloatingHologram />
      </group>

      {/* 5. Architectural Potted Plant (Fiddle-Leaf Fig) */}
      <group position={[0.95, 0, 0.1]}>
        {/* Fluted Modern White Ceramic Planter */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.1, 0.44, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 16]} />
          <meshStandardMaterial color="#3e2723" roughness={0.9} />
        </mesh>
        {/* Broad Green Tropical Leaves */}
        {[-0.5, 0.3, 1.2, 2.1, 3.0, 3.8].map((rot, i) => (
          <group key={i} position={[0, 0.44 + i * 0.08, 0]} rotation={[0.2, rot, 0.2]}>
            <mesh position={[0.12, 0.04, 0]} rotation={[0, 0, -0.4]} castShadow>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#15803d" roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
