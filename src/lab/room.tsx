import { useMemo } from "react";
import * as THREE from "three";
import { ROOM } from "./config";
import { LogoPlate, Plant } from "./furniture";
import { makeTileTexture } from "./textures";

const { w, d, h } = ROOM;
const wall = "#eef2f6";

export function Room({
  floorMap,
  logo,
  whiteLogo,
  schoolLogo,
  schoolLogoDark,
  coBrandedEntrance,
}: {
  floorMap?: THREE.Texture;
  logo?: THREE.Texture;
  whiteLogo?: THREE.Texture;
  schoolLogo?: THREE.Texture;
  schoolLogoDark?: THREE.Texture;
  coBrandedEntrance?: THREE.Texture;
}) {
  const tile = useMemo(() => {
    const t = floorMap ?? makeTileTexture();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(w / 0.62, d / 0.62);
    t.anisotropy = 8;
    return t;
  }, [floorMap]);

  const sign = useMemo(() => makeTitleSign(), []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial map={tile} color="#e8edf2" roughness={0.28} metalness={0.08} />
      </mesh>

      <mesh position={[0, h / 2, -d / 2]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={wall} roughness={0.9} />
      </mesh>
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color={wall} roughness={0.88} />
      </mesh>
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color={wall} roughness={0.88} />
      </mesh>

      <EntranceWall whiteLogo={whiteLogo} schoolLogo={schoolLogo} coBrandedEntrance={coBrandedEntrance} />

      {/* Executive 3D Campus Branding Sky Monument floating in lab background */}
      <CampusBrandingMonument logo={schoolLogo} />

      {/* Grand Central Back Wall School Master Crest Installation */}
      <group position={[0, 2.76, -d / 2 + 0.03]}>
        {/* Architectural Text Ribbon */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[5.2, 0.56]} />
          <meshBasicMaterial map={sign} transparent />
        </mesh>
        {/* Central Illuminated Plaque for School Logo */}
        <mesh position={[0, 0, 0.015]} castShadow>
          <boxGeometry args={[1.76, 0.76, 0.02]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Cyan Ambient Rim Light behind Logo Plaque */}
        <mesh position={[0, 0, 0.008]}>
          <boxGeometry args={[1.8, 0.8, 0.01]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.85} />
        </mesh>
        {/* Large, Prominent, Highly Visible Yashwantrao Bhonsale International School Logo */}
        <group position={[0, 0, 0.03]}>
          <LogoPlate map={schoolLogoDark} width={1.55} aspect={3.767} />
        </group>
      </group>

      <group position={[-5.5, 0, 3.55]}>
        <Plant scale={1.1} />
      </group>
      <group position={[5.5, 0, 3.55]}>
        <Plant scale={1.05} />
      </group>
    </group>
  );
}

function CampusBrandingMonument({ logo }: { logo?: THREE.Texture }) {
  const subBanner = useMemo(() => makeMonumentSubBanner(), []);
  const glowTex = useMemo(() => makeRadialGlowTexture(), []);

  const monumentW = 6.4;
  const monumentH = 1.62;
  const logoW = 4.8;
  const logoH = logoW / 3.767;

  return (
    <group position={[0, 3.52, -d / 2 - 1.15]}>
      {/* Smooth Ethereal Radial Backlight Halo (No hard edges, natural atmospheric glow) */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[monumentW + 3.2, monumentH + 2.2]} />
        <meshBasicMaterial
          map={glowTex}
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Structural Brushed Titanium Pylons anchoring monument to campus ground */}
      {[-2.35, 2.35].map((x, i) => (
        <group key={i} position={[x, -1.7, -0.01]}>
          <mesh>
            <boxGeometry args={[0.09, 3.65, 0.12]} />
            <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.22} />
          </mesh>
          {/* Ground Mounting Flange */}
          <mesh position={[0, -1.78, 0]}>
            <boxGeometry args={[0.3, 0.09, 0.3]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Outer Glowing Cyan Accent Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[monumentW + 0.08, monumentH + 0.08, 0.04]} />
        <meshStandardMaterial
          color="#00b4d8"
          emissive="#00b4d8"
          emissiveIntensity={0.92}
          toneMapped={false}
        />
      </mesh>

      {/* Deep Obsidian / Tech Glass Monument Plinth */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[monumentW, monumentH, 0.08]} />
        <meshStandardMaterial
          color="#050e1a"
          metalness={0.75}
          roughness={0.2}
        />
      </mesh>

      {/* Top Architectural Linear Luminaire Strip */}
      <mesh position={[0, monumentH / 2 + 0.015, 0.05]}>
        <boxGeometry args={[monumentW - 0.2, 0.025, 0.05]} />
        <meshStandardMaterial
          color="#bae6fd"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {/* Front Logo Plate - Yashwantrao Bhonsale International School */}
      {logo && (
        <mesh position={[0, 0.12, 0.065]}>
          <planeGeometry args={[logoW, logoH]} />
          <meshStandardMaterial
            map={logo}
            transparent
            roughness={0.15}
            metalness={0.08}
            emissiveMap={logo}
            emissive={new THREE.Color("#ffffff")}
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Institutional Sub-Banner Ribbon */}
      <mesh position={[0, -0.66, 0.065]}>
        <planeGeometry args={[logoW, 0.32]} />
        <meshBasicMaterial map={subBanner} transparent />
      </mesh>

      {/* Rear Architectural Finish for 360-degree rotation view */}
      <mesh position={[0, 0, -0.042]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[monumentW - 0.05, monumentH - 0.05]} />
        <meshStandardMaterial color="#091b31" metalness={0.82} roughness={0.3} />
      </mesh>
    </group>
  );
}

function EntranceWall({
  whiteLogo,
  schoolLogo,
  coBrandedEntrance,
}: {
  whiteLogo?: THREE.Texture;
  schoolLogo?: THREE.Texture;
  coBrandedEntrance?: THREE.Texture;
}) {
  const z = d / 2 - 0.12;
  const hh = 1.12;
  const pw = 2.85;
  return (
    <group>
      {/* Side half-walls */}
      <mesh position={[-4.15, hh / 2, z]} castShadow>
        <boxGeometry args={[3.5, hh, 0.12]} />
        <meshStandardMaterial color="#dfe5ec" roughness={0.7} />
      </mesh>
      <mesh position={[4.15, hh / 2, z]} castShadow>
        <boxGeometry args={[3.5, hh, 0.12]} />
        <meshStandardMaterial color="#dfe5ec" roughness={0.7} />
      </mesh>
      {/* Center Co-Branded Navy Entrance Installation */}
      <mesh position={[0, hh / 2, z]} castShadow>
        <boxGeometry args={[pw, hh, 0.16]} />
        <meshStandardMaterial color="#092244" roughness={0.45} />
      </mesh>
      {coBrandedEntrance ? (
        <mesh position={[0, hh / 2, z + 0.085]} castShadow>
          <planeGeometry args={[2.72, 1.05]} />
          <meshStandardMaterial
            map={coBrandedEntrance}
            roughness={0.25}
            metalness={0.08}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
      ) : (
        <group position={[0, 0.62, z + 0.09]}>
          <LogoPlate map={whiteLogo} width={1.45} aspect={1.4} />
        </group>
      )}
      {/* Cyan LED along partition top */}
      <mesh position={[0, hh + 0.015, z]}>
        <boxGeometry args={[w - 0.4, 0.03, 0.06]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <group position={[-1.65, 0, z - 0.35]}>
        <Plant scale={0.85} />
      </group>
      <group position={[1.65, 0, z - 0.35]}>
        <Plant scale={0.8} />
      </group>
    </group>
  );
}

function makeTitleSign() {
  const c = document.createElement("canvas");
  c.width = 3072;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 3072, 256);

  // Left Title: Center-aligned within the left bay (x = 620)
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#092244";
  ctx.font = "800 60px 'Outfit', sans-serif, system-ui";
  ctx.fillText("AVP INNOVATION HUB", 620, 95);

  ctx.fillStyle = "#0284c7";
  ctx.font = "600 26px 'Plus Jakarta Sans', sans-serif, system-ui";
  ctx.fillText("CENTER FOR ADVANCED RESEARCH", 620, 175);

  // Right Title: Center-aligned within the right bay (x = 2452)
  ctx.textAlign = "center";
  ctx.fillStyle = "#092244";
  ctx.font = "800 58px 'Outfit', sans-serif, system-ui";
  ctx.fillText("FUTURE READY STEM LAB", 2452, 95);

  ctx.fillStyle = "#0284c7";
  ctx.font = "600 28px 'Plus Jakarta Sans', sans-serif, system-ui";
  ctx.fillText("LEARN · BUILD · EXPERIMENT · INNOVATE", 2452, 175);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function makeRadialGlowTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(256, 256, 12, 256, 256, 256);
  grad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
  grad.addColorStop(0.35, "rgba(14, 165, 233, 0.22)");
  grad.addColorStop(0.7, "rgba(2, 132, 199, 0.08)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeMonumentSubBanner() {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 2048, 256);

  // Subtle glass background plate with gradient
  const grad = ctx.createLinearGradient(0, 0, 2048, 0);
  grad.addColorStop(0, "rgba(8, 28, 54, 0)");
  grad.addColorStop(0.12, "rgba(12, 38, 72, 0.75)");
  grad.addColorStop(0.5, "rgba(14, 46, 88, 0.9)");
  grad.addColorStop(0.88, "rgba(12, 38, 72, 0.75)");
  grad.addColorStop(1, "rgba(8, 28, 54, 0)");
  ctx.fillStyle = grad;
  ctx.roundRect(80, 20, 1888, 216, 24);
  ctx.fill();

  // Subtle cyan border lines
  ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Primary Line: STEM & AI INNOVATION CENTER
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#38bdf8";
  ctx.font = "700 46px 'Outfit', sans-serif, system-ui";
  ctx.fillText("CBSE CURRICULUM STEM & AI INNOVATION CENTER", 1024, 88);

  // Secondary Line: AFFILIATION NO. 1130979 · CHARATHE, SAWANTWADI · ESTD. 2016
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "600 30px 'Plus Jakarta Sans', sans-serif, system-ui";
  ctx.fillText("AFFILIATION NO. 1130979   ·   ESTD. 2016   ·   SAWANTWADI", 1024, 158);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

export function Lights() {
  return (
    <>
      <color attach="background" args={["#b7c4d4"]} />
      <fog attach="fog" args={["#b7c4d4", 22, 48]} />
      <hemisphereLight args={["#fff4e6", "#8aa0b8", 0.7]} />
      <ambientLight intensity={0.42} />
      <directionalLight
        position={[2.5, 8.2, 6.2]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0003}
        shadow-camera-near={1}
        shadow-camera-far={28}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <pointLight position={[-3.2, 2.4, -3.0]} color="#ffe7b8" intensity={0.65} distance={8} />
      <pointLight position={[3.0, 2.4, -3.0]} color="#38bdf8" intensity={0.8} distance={8} />
      <pointLight position={[0, 2.8, 2.0]} color="#ffffff" intensity={0.5} distance={9} />
    </>
  );
}
