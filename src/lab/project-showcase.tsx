import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// -------------------------------------------------------------
// TEXTURE HELPERS (Dynamic 2D Canvas Textures)
// -------------------------------------------------------------

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

// Overhead Wall Sign Texture for Zone 10
function makeProjectWallSignTexture() {
  return createTextCanvas(1024, 180, (ctx, w, h) => {
    // Deep dark titanium background
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, w, h);

    // Glowing magenta/rose border
    ctx.strokeStyle = "rgba(224, 86, 160, 0.55)";
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // Sub-header Pill Badge
    ctx.fillStyle = "#e056a0";
    ctx.fillRect(36, 22, 175, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText("AVP INNOVATION HUB", 48, 40);

    // Main Headline
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
    ctx.fillText("ZONE 10 · PROJECT DISPLAY & INNOVATION WALL", 36, 102);

    // Subtitle Spec
    ctx.fillStyle = "#f472b6";
    ctx.font = "17px 'Outfit', sans-serif, system-ui";
    ctx.fillText("STUDENT ROBOTICS · 3D MECHANISMS · SMART IOT BUILDS · COMPETITION AWARDS", 36, 144);
  });
}

// Category Header Marquee Texture for Each Bay
function makeBayMarqueeTexture(title: string, subtitle: string, accentColor: string) {
  return createTextCanvas(512, 110, (ctx, w, h) => {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    // Left accent block
    ctx.fillStyle = accentColor;
    ctx.fillRect(4, 4, 14, h - 8);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px 'Outfit', sans-serif, system-ui";
    ctx.fillText(title, 28, 44);

    // Subtitle
    ctx.fillStyle = accentColor;
    ctx.font = "bold 16px 'Outfit', sans-serif, system-ui";
    ctx.fillText(subtitle, 28, 76);
  });
}

// Museum Exhibit Placard Texture
function makeExhibitPlacardTexture(code: string, title: string, subtitle: string, color: string = "#f43f5e") {
  return createTextCanvas(512, 140, (ctx, w, h) => {
    ctx.fillStyle = "#080e1a";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    // Left vertical strip
    ctx.fillStyle = color;
    ctx.fillRect(4, 4, 10, h - 8);

    // Code Tag
    ctx.fillStyle = color;
    ctx.font = "bold 16px monospace";
    ctx.fillText(code, 26, 32);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Outfit', sans-serif, system-ui";
    ctx.fillText(title, 26, 76);

    // Subtitle / Specs
    ctx.fillStyle = "rgba(226, 232, 240, 0.75)";
    ctx.font = "bold 14px 'Outfit', sans-serif, system-ui";
    ctx.fillText(subtitle, 26, 114);
  });
}

// Award Certificate Texture for Center Bay
function makeAwardCertificateTexture(title: string, sub: string, org: string) {
  return createTextCanvas(512, 360, (ctx, w, h) => {
    // Parchment / luxury ivory background
    ctx.fillStyle = "#fcfaf4";
    ctx.fillRect(0, 0, w, h);

    // Gold dual border
    ctx.strokeStyle = "#b45309";
    ctx.lineWidth = 6;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // Header Badge
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 16px 'Outfit', sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF EXCELLENCE", w / 2, 56);

    // Main Title
    ctx.fillStyle = "#b45309";
    ctx.font = "bold 28px 'Outfit', sans-serif, system-ui";
    ctx.fillText(title, w / 2, 116);

    // Description
    ctx.fillStyle = "#334155";
    ctx.font = "17px serif";
    ctx.fillText(sub, w / 2, 166);

    // Gold Star / Seal
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(w / 2, 230, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("★ 1ST ★", w / 2, 234);

    // Organization Footer
    ctx.fillStyle = "#64748b";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText(org, w / 2, 310);
  });
}


// -------------------------------------------------------------
// EXHIBIT PLACARD 3D MESH
// -------------------------------------------------------------

function ExhibitPlacard({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: THREE.Texture;
}) {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      {/* Plinth Base */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.28, 0.01, 0.06]} />
        <meshStandardMaterial color="#090d16" roughness={0.6} />
      </mesh>
      {/* Angled Display Stand facing front (-X towards camera) */}
      <mesh position={[0, 0.038, 0]} rotation={[-Math.PI / 7, 0, 0]}>
        <boxGeometry args={[0.26, 0.075, 0.012]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.2}
          emissive="#ffffff"
          emissiveMap={texture}
          emissiveIntensity={0.32}
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// EXHIBITION BAY UNIT (Facing -X towards camera)
// -------------------------------------------------------------

function ExhibitionBay({
  position,
  title,
  subtitle,
  accentColor,
  children,
}: {
  position: [number, number, number];
  title: string;
  subtitle: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  const W = 0.88; // Width along Z
  const D = 0.44; // Depth along X
  const H = 2.15; // Total height
  const frameColor = "#0f172a";

  const marqueeTex = useMemo(
    () => makeBayMarqueeTexture(title, subtitle, accentColor),
    [title, subtitle, accentColor],
  );

  return (
    <group position={position}>
      {/* 1. Back Tinted Glass / Panel */}
      <mesh position={[D / 2 - 0.01, H / 2, 0]} receiveShadow>
        <boxGeometry args={[0.015, H, W]} />
        <meshStandardMaterial color="#0b1120" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Decorative vertical LED accent rods behind the shelves */}
      {[-W / 2 + 0.06, W / 2 - 0.06].map((z, i) => (
        <mesh key={i} position={[D / 2 - 0.02, H / 2, z]}>
          <cylinderGeometry args={[0.006, 0.006, H - 0.1, 8]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* 2. Side Frame Pillars */}
      <mesh position={[0, H / 2, -W / 2]} castShadow>
        <boxGeometry args={[D, H, 0.024]} />
        <meshStandardMaterial color={frameColor} roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0, H / 2, W / 2]} castShadow>
        <boxGeometry args={[D, H, 0.024]} />
        <meshStandardMaterial color={frameColor} roughness={0.35} metalness={0.3} />
      </mesh>

      {/* Neon accent edge along front pillars */}
      <mesh position={[-D / 2, H / 2, -W / 2 + 0.005]}>
        <boxGeometry args={[0.012, H - 0.08, 0.008]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[-D / 2, H / 2, W / 2 - 0.005]}>
        <boxGeometry args={[0.012, H - 0.08, 0.008]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.7} />
      </mesh>

      {/* 3. Base Plinth */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[D + 0.01, 0.08, W + 0.01]} />
        <meshStandardMaterial color="#070a12" roughness={0.6} />
      </mesh>

      {/* 4. Lower Storage Credenza Cabinet */}
      <mesh position={[0, 0.34, 0]} castShadow>
        <boxGeometry args={[D - 0.02, 0.52, W - 0.03]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Front Door Split & Chrome Handles */}
      <mesh position={[-D / 2 + 0.005, 0.34, 0]}>
        <boxGeometry args={[0.008, 0.48, W - 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {[-0.08, 0.08].map((z, i) => (
        <mesh key={i} position={[-D / 2 - 0.005, 0.38, z]}>
          <boxGeometry args={[0.015, 0.12, 0.015]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* 5. Crystal Glass Shelves (Counter Y=0.62, Mid Y=1.12, Top Y=1.62) */}
      {[0.62, 1.12, 1.62].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Glass Pane */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[D - 0.02, 0.018, W - 0.03]} />
            <meshStandardMaterial
              color="#e0f2fe"
              transparent
              opacity={0.65}
              roughness={0.1}
              metalness={0.2}
            />
          </mesh>
          {/* Front Brushed Metal Rim */}
          <mesh position={[-D / 2 + 0.01, 0, 0]}>
            <boxGeometry args={[0.02, 0.022, W - 0.02]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
          </mesh>
          {/* LED Downlight Bar under shelf */}
          <mesh position={[0, -0.014, 0]}>
            <boxGeometry args={[D - 0.08, 0.008, W - 0.08]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.85}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* 6. Top Header Marquee Canopy */}
      <mesh position={[0, H - 0.1, 0]} castShadow>
        <boxGeometry args={[D + 0.02, 0.2, W + 0.02]} />
        <meshStandardMaterial color="#090d16" roughness={0.4} />
      </mesh>
      {/* Front Glowing Marquee Sign */}
      <mesh position={[-D / 2 - 0.011, H - 0.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[W - 0.04, 0.17]} />
        <meshStandardMaterial
          map={marqueeTex}
          emissive="#ffffff"
          emissiveMap={marqueeTex}
          emissiveIntensity={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* Shelved Content / Exhibits */}
      {children}
    </group>
  );
}

// -------------------------------------------------------------
// HIGH-DETAIL 3D PROJECT MODELS
// -------------------------------------------------------------

// 1. Golden Championship Trophy Cup
function ChampionshipTrophy({ position }: { position: [number, number, number] }) {
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f59e0b",
        metalness: 0.88,
        roughness: 0.18,
      }),
    [],
  );

  return (
    <group position={position}>
      {/* Black Marble Tiered Base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.18, 0.06, 0.18]} />
        <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Gold Base Inscription Plate */}
      <mesh position={[-0.091, 0.03, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.14, 0.035]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lower Gold Pedestal */}
      <mesh position={[0, 0.08, 0]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.07, 0.09, 0.04, 16]} />
      </mesh>
      <mesh position={[0, 0.13, 0]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.035, 0.045, 0.08, 16]} />
      </mesh>

      {/* Main Trophy Fluted Cup */}
      <mesh position={[0, 0.22, 0]} castShadow material={goldMat}>
        <cylinderGeometry args={[0.1, 0.04, 0.14, 16]} />
      </mesh>
      {/* Inner Hollow Look */}
      <mesh position={[0, 0.285, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.01, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} />
      </mesh>

      {/* Dual Curved Handles */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, 0.22, s * 0.11]} rotation={[Math.PI / 2, 0, 0]} material={goldMat} castShadow>
          <torusGeometry args={[0.04, 0.012, 10, 16, Math.PI]} />
        </mesh>
      ))}

      {/* Top Victory Star Badge */}
      <mesh position={[0, 0.32, 0]} castShadow material={goldMat}>
        <octahedronGeometry args={[0.03]} />
      </mesh>
    </group>
  );
}

// 2. Translucent Crystal Tech Award Obelisk
function CrystalAward({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Dark Base */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.03, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Faceted Crystal Tower */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.05, 0.22, 6]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

// 3. Medals Display Pad
function MedalsDisplay({ position }: { position: [number, number, number] }) {
  const medals = [
    { c: "#f59e0b", ribbon: "#ef4444", z: -0.09, label: "Gold" },
    { c: "#e2e8f0", ribbon: "#3b82f6", z: 0.0, label: "Silver" },
    { c: "#b45309", ribbon: "#10b981", z: 0.09, label: "Bronze" },
  ];

  return (
    <group position={position}>
      {/* Angled Velvet Cushion sloping forward towards camera (-X) */}
      <mesh position={[0, 0.025, 0]} rotation={[0, 0, Math.PI / 8]} castShadow>
        <boxGeometry args={[0.18, 0.03, 0.32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      {medals.map((m, i) => (
        <group key={i} position={[0.02, 0.045 + (i === 1 ? 0.008 : 0), m.z]} rotation={[0, 0, Math.PI / 8]}>
          {/* Ribbon */}
          <mesh position={[0.04, 0.005, 0]}>
            <boxGeometry args={[0.08, 0.004, 0.035]} />
            <meshStandardMaterial color={m.ribbon} />
          </mesh>
          {/* Medal Disc */}
          <mesh position={[0, 0.01, 0]} castShadow>
            <cylinderGeometry args={[0.032, 0.032, 0.006, 16]} />
            <meshStandardMaterial color={m.c} metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 4. Autonomous Mars / Survey Rover Model
function AutonomousRoverModel({ position }: { position: [number, number, number] }) {
  const wheels = [
    [-0.12, 0.12],
    [0.12, 0.12],
    [-0.12, -0.12],
    [0.12, -0.12],
  ];

  return (
    <group position={position}>
      {/* Acrylic Display Riser */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.34, 0.02, 0.34]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      {/* Rover Main Chassis */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[0.2, 0.045, 0.16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Top Electronics Deck with Golden Solar Cell */}
      <mesh position={[0, 0.106, 0]}>
        <boxGeometry args={[0.16, 0.008, 0.14]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Solar Cell Grid Lines */}
      <mesh position={[0, 0.111, 0]}>
        <boxGeometry args={[0.14, 0.002, 0.12]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.25} />
      </mesh>

      {/* 4 Rugged All-Terrain Wheels */}
      {wheels.map(([x, z], i) => (
        <group key={i} position={[x, 0.05, z]}>
          {/* Suspension Arm */}
          <mesh position={[-x * 0.2, 0.01, 0]} rotation={[0, 0, x > 0 ? 0.3 : -0.3]}>
            <boxGeometry args={[0.04, 0.015, 0.015]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.038, 0.038, 0.03, 14]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>
          {/* Cyan Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.032, 10]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
        </group>
      ))}

      {/* Sensor Mast with Ultrasonic Eyes */}
      <mesh position={[-0.08, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.08, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} />
      </mesh>
      {/* Sensor Head */}
      <mesh position={[-0.08, 0.18, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.06]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Dual Transducer Cylinders */}
      {[-0.016, 0.016].map((z, i) => (
        <mesh key={i} position={[-0.092, 0.18, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.009, 0.009, 0.01, 10]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
        </mesh>
      ))}

      {/* Comm Antenna */}
      <mesh position={[0.08, 0.18, 0.06]}>
        <cylinderGeometry args={[0.002, 0.002, 0.15, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} />
      </mesh>
    </group>
  );
}

// 5. 3D Printed Planetary Gear Mechanism (Kinetic Animated Model)
function PlanetaryGearMechanism({ position }: { position: [number, number, number] }) {
  const gearsRef = useRef<THREE.Group>(null);
  const planet1 = useRef<THREE.Group>(null);
  const planet2 = useRef<THREE.Group>(null);
  const planet3 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    if (gearsRef.current) gearsRef.current.rotation.x += d * 0.9;
    if (planet1.current) planet1.current.rotation.x -= d * 1.8;
    if (planet2.current) planet2.current.rotation.x -= d * 1.8;
    if (planet3.current) planet3.current.rotation.x -= d * 1.8;
  });

  return (
    <group position={position}>
      {/* Angled Display Pedestal */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.24, 0.04, 0.24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* Spindle Stand */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.03, 0.18, 0.04]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>

      {/* Rotating Planetary Cluster */}
      <group position={[-0.02, 0.16, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Outer Ring Gear (Dark Matte Carbon PLA) */}
        <mesh castShadow>
          <torusGeometry args={[0.11, 0.016, 12, 28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Central Sun Gear (Vibrant Neon Orange Filament) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.036, 0.036, 0.025, 16]} />
          <meshStandardMaterial color="#f97316" roughness={0.35} />
        </mesh>

        {/* Planet Carrier (Rotates) */}
        <group ref={gearsRef}>
          {/* Planet Gear 1 (Electric Blue) */}
          <group ref={planet1} position={[0, 0.072, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.034, 0.034, 0.022, 14]} />
              <meshStandardMaterial color="#06b6d4" roughness={0.35} />
            </mesh>
          </group>

          {/* Planet Gear 2 */}
          <group ref={planet2} position={[-0.062, -0.036, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.034, 0.034, 0.022, 14]} />
              <meshStandardMaterial color="#06b6d4" roughness={0.35} />
            </mesh>
          </group>

          {/* Planet Gear 3 */}
          <group ref={planet3} position={[0.062, -0.036, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.034, 0.034, 0.022, 14]} />
              <meshStandardMaterial color="#06b6d4" roughness={0.35} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

// 6. Smart IoT Greenhouse Terrarium Model
function SmartGreenhouseModel({ position }: { position: [number, number, number] }) {
  const oledTex = useMemo(
    () =>
      createTextCanvas(256, 128, (ctx, w, h) => {
        ctx.fillStyle = "#020617";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#22c55e";
        ctx.font = "bold 16px monospace";
        ctx.fillText("TERRARIUM IOT v2", 12, 26);
        ctx.fillStyle = "#38bdf8";
        ctx.font = "14px monospace";
        ctx.fillText("HUMIDITY: 68% OK", 12, 54);
        ctx.fillText("TEMP: 24.2°C OPT", 12, 78);
        ctx.fillStyle = "#a855f7";
        ctx.fillText("PUMP: AUTO-STANDBY", 12, 104);
      }),
    [],
  );

  return (
    <group position={position}>
      {/* Base Basin */}
      <mesh position={[0, 0.015, 0]} castShadow>
        <boxGeometry args={[0.26, 0.03, 0.22]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Dark Soil Layer */}
      <mesh position={[0, 0.032, 0]}>
        <boxGeometry args={[0.24, 0.015, 0.2]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>

      {/* Clear Acrylic Enclosure Cube */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.24, 0.18, 0.2]} />
        <meshStandardMaterial
          color="#e0f2fe"
          transparent
          opacity={0.35}
          roughness={0.08}
          metalness={0.1}
        />
      </mesh>

      {/* Miniature Plants Inside */}
      {[-0.05, 0.05].map((z, i) => (
        <group key={i} position={[0, 0.06, z]}>
          <mesh position={[0, 0.02, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#22c55e" roughness={0.6} />
          </mesh>
          <mesh position={[0.02, 0.04, 0.01]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#16a34a" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Grow Light Bar on Top */}
      <mesh position={[0, 0.215, 0]}>
        <boxGeometry args={[0.24, 0.012, 0.04]} />
        <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.8} />
      </mesh>

      {/* Side Mounted OLED Screen */}
      <mesh position={[-0.125, 0.1, 0.03]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.09, 0.05]} />
        <meshStandardMaterial
          map={oledTex}
          emissive="#38bdf8"
          emissiveMap={oledTex}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// 7. Micro FPV Racing Drone on Tilted Launch Pad
function FpvRacingDroneExhibit({ position }: { position: [number, number, number] }) {
  const rotors = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (rotors.current) {
      rotors.current.children.forEach((c) => {
        c.rotation.y += delta * 18;
      });
    }
  });

  return (
    <group position={position}>
      {/* Carbon Fiber Angled Launch Pad */}
      <mesh position={[0, 0.025, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.26, 0.02, 0.26]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.036, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.22, 0.004, 0.22]} />
        <meshStandardMaterial color="#e056a0" emissive="#e056a0" emissiveIntensity={0.3} />
      </mesh>

      {/* Drone Body (Resting on Launch Pad) */}
      <group position={[-0.01, 0.065, 0]} rotation={[0, 0, 0.15]}>
        {/* X-Chassis */}
        <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.18, 0.012, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh rotation={[0, -Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.18, 0.012, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Central Aerodynamic 3D Printed Canopy (Neon Pink/Magenta) */}
        <mesh position={[0, 0.022, 0]} castShadow>
          <capsuleGeometry args={[0.022, 0.045, 6, 12]} />
          <meshStandardMaterial color="#e056a0" roughness={0.3} />
        </mesh>

        {/* FPV Camera Eye */}
        <mesh position={[-0.032, 0.025, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 10]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>

        {/* Spinning Propellers */}
        <group ref={rotors}>
          {[
            [-0.065, 0.065],
            [0.065, 0.065],
            [-0.065, -0.065],
            [0.065, -0.065],
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 0.02, z]}>
              <cylinderGeometry args={[0.035, 0.035, 0.002, 10]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.65} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Handheld Remote Controller facing front (-X) with controls angled up */}
      <group position={[0.06, 0.03, 0.1]} rotation={[0, 0, -Math.PI / 7]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.035, 0.09]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Dual Thumbsticks on left and right */}
        {[-0.025, 0.025].map((z, i) => (
          <mesh key={i} position={[-0.005, 0.025, z]}>
            <cylinderGeometry args={[0.006, 0.006, 0.015, 8]} />
            <meshStandardMaterial color="#e056a0" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ProjectWallSlats() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => new THREE.BoxGeometry(0.035, 2.65, 0.014), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.6 }), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 36; i++) {
      dummy.position.set(-0.015, 0, -2.0 + i * 0.114);
      dummy.rotation.set(0, -Math.PI / 2, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return <instancedMesh ref={meshRef} args={[geo, mat, 36]} />;
}

// -------------------------------------------------------------
// COMPLETE ZONE 10 PROJECT DISPLAY & INNOVATION WALL
// -------------------------------------------------------------

export function Zone10ProjectShowcase() {
  const wallSignTex = useMemo(() => makeProjectWallSignTexture(), []);

  // Placard textures
  const placardBionic = useMemo(
    () => makeExhibitPlacardTexture("PRJ-01", "BIONIC HAND", "5-AXIS TENDON DRIVE · EMG", "#f43f5e"),
    [],
  );
  const placardRover = useMemo(
    () => makeExhibitPlacardTexture("PRJ-02", "AI SURVEY ROVER", "AUTONOMOUS NAVIGATION · LIDAR", "#38bdf8"),
    [],
  );
  const placardRobotics = useMemo(
    () => makeExhibitPlacardTexture("PRJ-03", "LEGGED BIO-ROBOTS", "HEXAPOD & QUADRUPED KINEMATICS", "#eab308"),
    [],
  );
  const placardTrophy = useMemo(
    () => makeExhibitPlacardTexture("AWD-01", "NATIONAL CHAMPIONS", "STEM ROBOTICS OLYMPIAD 2025", "#f59e0b"),
    [],
  );
  const placardPatents = useMemo(
    () => makeExhibitPlacardTexture("AWD-02", "VERIFIED PATENTS", "STUDENT HARDWARE INVENTIONS", "#38bdf8"),
    [],
  );
  const placardMedals = useMemo(
    () => makeExhibitPlacardTexture("AWD-03", "OLYMPIC MEDALS", "GOLD · SILVER · BRONZE HONORS", "#f59e0b"),
    [],
  );
  const placardGears = useMemo(
    () => makeExhibitPlacardTexture("PRJ-04", "PLANETARY GEARBOX", "HIGH-TORQUE 3D EPICYCLIC DRIVE", "#f97316"),
    [],
  );
  const placardTerrarium = useMemo(
    () => makeExhibitPlacardTexture("PRJ-05", "SMART GREENHOUSE", "IOT CLOSED-LOOP CLIMATE NODE", "#10b981"),
    [],
  );
  const placardDrone = useMemo(
    () => makeExhibitPlacardTexture("PRJ-06", "MICRO FPV RACER", "3D PRINTED AERO CANOPY", "#e056a0"),
    [],
  );

  const certTex1 = useMemo(
    () =>
      makeAwardCertificateTexture(
        "NATIONAL STEM OLYMPIAD",
        "Awarded for First Place in Autonomous Robotics",
        "MINISTRY OF EDUCATION & TECH BOARD",
      ),
    [],
  );

  const certTex2 = useMemo(
    () =>
      makeAwardCertificateTexture(
        "YOUNG INNOVATOR PATENT",
        "Patent Grant: Low-Cost Bionic Prosthetic Joint",
        "GLOBAL PATENT & INNOVATION COUNCIL",
      ),
    [],
  );

  return (
    <group>
      {/* -------------------------------------------------------------
          1. ARCHITECTURAL BACK WALL CLADDING (at X = 5.96)
          ------------------------------------------------------------- */}
      <group position={[5.96, 1.45, 0.55]}>
        {/* Main Dark Architectural Cladding Panel */}
        <mesh position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[4.2, 2.7]} />
          <meshStandardMaterial color="#090e1a" roughness={0.85} />
        </mesh>

        {/* Glowing Magenta / Rose LED Wall Border */}
        <mesh position={[-0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[4.24, 2.74]} />
          <meshStandardMaterial
            color="#e056a0"
            emissive="#e056a0"
            emissiveIntensity={0.3}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Vertical Architectural Wood/Metal Slats on the wall */}
        <ProjectWallSlats />

        {/* Floating Illuminated Overhead Lab Sign above the shelves */}
        <mesh position={[-0.04, 0.98, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[3.4, 0.52]} />
          <meshStandardMaterial
            map={wallSignTex}
            emissive="#e056a0"
            emissiveMap={wallSignTex}
            emissiveIntensity={0.35}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          2. THE 3 EXHIBITION SHOWCASE UNITS (at X = 5.5, facing -X)
          ------------------------------------------------------------- */}

      {/* BAY 1 (LEFT, Z = -0.45): ADVANCED ROBOTICS */}
      <ExhibitionBay
        position={[5.5, 0, -0.45]}
        title="01 · ADVANCED ROBOTICS"
        subtitle="BIONICS · AUTONOMOUS AI · BIO-BOTS"
        accentColor="#f43f5e"
      >
        {/* Top Tier (Y = 1.62): Bionic Prosthetic Arm facing front */}
        <group position={[0, 1.63, 0]}>
          <mesh position={[0.03, 0.01, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.02, 16]} />
            <meshStandardMaterial color="#0284c7" transparent opacity={0.4} />
          </mesh>
          {/* Cybernetic Arm Structure facing -X */}
          <group position={[0.03, 0.02, 0]}>
            <mesh position={[0, 0.12, 0]} castShadow>
              <cylinderGeometry args={[0.028, 0.038, 0.22, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.25} />
            </mesh>
            {/* Palm facing -X towards camera */}
            <mesh position={[0, 0.24, 0]} castShadow>
              <boxGeometry args={[0.025, 0.05, 0.08]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
            </mesh>
            {/* 4 Articulated Fingers */}
            {[-0.027, -0.009, 0.009, 0.027].map((z, idx) => (
              <mesh key={idx} position={[-0.005, 0.29, z]} castShadow>
                <boxGeometry args={[0.012, 0.085, 0.014]} />
                <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.3} />
              </mesh>
            ))}
            {/* Thumb angled outward */}
            <mesh position={[-0.005, 0.25, -0.046]} rotation={[0, 0, 0.35]} castShadow>
              <boxGeometry args={[0.012, 0.06, 0.014]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardBionic} />
        </group>

        {/* Middle Tier (Y = 1.12): Autonomous Rover */}
        <group position={[0, 1.13, 0]}>
          <AutonomousRoverModel position={[0.04, 0, 0]} />
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardRover} />
        </group>

        {/* Lower Tier (Y = 0.62): Robot Dog & Spider Bot */}
        <group position={[0, 0.63, 0]}>
          <group position={[0.04, 0, -0.16]}>
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.16, 0.02, 0.2]} />
              <meshStandardMaterial color="#eab308" transparent opacity={0.3} />
            </mesh>
            {/* Robot Dog */}
            <mesh position={[0, 0.12, 0]} castShadow>
              <boxGeometry args={[0.16, 0.07, 0.09]} />
              <meshStandardMaterial color="#eab308" roughness={0.4} />
            </mesh>
            <mesh position={[-0.09, 0.13, 0]} castShadow>
              <boxGeometry args={[0.06, 0.05, 0.06]} />
              <meshStandardMaterial color="#111827" />
            </mesh>
            {[-0.05, 0.05].flatMap((x) =>
              [-0.04, 0.04].map((z, j) => (
                <mesh key={`${x}-${z}`} position={[x, 0.05, z]} castShadow>
                  <boxGeometry args={[0.02, 0.1, 0.02]} />
                  <meshStandardMaterial color="#1f2937" />
                </mesh>
              )),
            )}
          </group>
          {/* Spider Hexapod Bot */}
          <group position={[0.04, 0, 0.16]}>
            <mesh position={[0, 0.04, 0]} castShadow>
              <sphereGeometry args={[0.045, 10, 8]} />
              <meshStandardMaterial color="#0f172a" metalness={0.4} />
            </mesh>
            <mesh position={[-0.045, 0.04, 0]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
            </mesh>
            {/* 6 Spider Legs */}
            {[0, 60, 120, 180, 240, 300].map((deg, k) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <mesh
                  key={k}
                  position={[Math.cos(rad) * 0.05, 0.03, Math.sin(rad) * 0.05]}
                  rotation={[0, -rad, 0.4]}
                >
                  <boxGeometry args={[0.09, 0.012, 0.012]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
              );
            })}
          </group>
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardRobotics} />
        </group>
      </ExhibitionBay>

      {/* BAY 2 (CENTER, Z = 0.55): AWARDS & ACHIEVEMENTS */}
      <ExhibitionBay
        position={[5.5, 0, 0.55]}
        title="02 · AWARDS & HONORS"
        subtitle="STEM OLYMPIAD · PATENTS · TROPHIES"
        accentColor="#f59e0b"
      >
        {/* Top Tier (Y = 1.62): Golden Grand Championship Cup & Crystal Obelisk */}
        <group position={[0, 1.63, 0]}>
          <ChampionshipTrophy position={[0.02, 0, -0.06]} />
          <CrystalAward position={[0.02, 0, 0.16]} />
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardTrophy} />
        </group>

        {/* Middle Tier (Y = 1.12): Framed National Certificates on Back Panel & Tech Shield */}
        <group position={[0, 1.13, 0]}>
          {/* Framed Certificates hung against back panel */}
          <group position={[0.19, 0.22, 0]}>
            <mesh position={[0, 0, -0.16]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[0.24, 0.17]} />
              <meshStandardMaterial map={certTex1} roughness={0.3} />
            </mesh>
            {/* Frame border */}
            <mesh position={[-0.005, 0, -0.16]}>
              <boxGeometry args={[0.01, 0.19, 0.26]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
            </mesh>

            <mesh position={[0, 0, 0.16]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[0.24, 0.17]} />
              <meshStandardMaterial map={certTex2} roughness={0.3} />
            </mesh>
            <mesh position={[-0.005, 0, 0.16]}>
              <boxGeometry args={[0.01, 0.19, 0.26]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          {/* Innovation Shield Award on easel in center */}
          <group position={[0.04, 0.08, 0]}>
            <mesh rotation={[0, -Math.PI / 2, 0.2]} castShadow>
              <cylinderGeometry args={[0.07, 0.05, 0.012, 5]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
            </mesh>
            <mesh position={[-0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0.2]}>
              <cylinderGeometry args={[0.025, 0.025, 0.016, 8]} />
              <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
            </mesh>
          </group>
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardPatents} />
        </group>

        {/* Lower Tier (Y = 0.62): Olympic Medals Pad */}
        <group position={[0, 0.63, 0]}>
          <MedalsDisplay position={[0.02, 0, 0]} />
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardMedals} />
        </group>
      </ExhibitionBay>

      {/* BAY 3 (RIGHT, Z = 1.55): 3D PRINTED MECHANISMS & IOT */}
      <ExhibitionBay
        position={[5.5, 0, 1.55]}
        title="03 · 3D MECHANISMS & IOT"
        subtitle="KINETIC GEARS · GREENHOUSE · FPV"
        accentColor="#06b6d4"
      >
        {/* Top Tier (Y = 1.62): Animated Planetary Gear Mechanism */}
        <group position={[0, 1.63, 0]}>
          <PlanetaryGearMechanism position={[0.02, 0, 0]} />
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardGears} />
        </group>

        {/* Middle Tier (Y = 1.12): Smart Automated Terrarium Greenhouse */}
        <group position={[0, 1.13, 0]}>
          <SmartGreenhouseModel position={[0.02, 0, 0]} />
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardTerrarium} />
        </group>

        {/* Lower Tier (Y = 0.62): FPV Racing Drone on Launch Pad */}
        <group position={[0, 0.63, 0]}>
          <FpvRacingDroneExhibit position={[0.02, 0, 0]} />
          <ExhibitPlacard position={[-0.15, 0.01, 0]} texture={placardDrone} />
        </group>
      </ExhibitionBay>

      {/* -------------------------------------------------------------
          4. FLOOR ZONING ACCENT LINE
          ------------------------------------------------------------- */}
      <mesh position={[4.95, 0.005, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.03, 3.8]} />
        <meshStandardMaterial
          color="#e056a0"
          emissive="#e056a0"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
