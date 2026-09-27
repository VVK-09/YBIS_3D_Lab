import { useMemo } from "react";
import * as THREE from "three";

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

// 1. FPV Ground Telemetry Screen HUD Texture
function makeDroneTelemetryTexture() {
  return createTextCanvas(640, 480, (ctx, w, h) => {
    // FPV Cockpit Camera Feed Simulated View (Dark sky with horizon line)
    ctx.fillStyle = "#030a16";
    ctx.fillRect(0, 0, w, h);

    // Simulated indoor lab grid in camera background
    ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Artificial Horizon Pitch Ladder & Roll Indicator
    const cx = w / 2;
    const cy = h / 2;
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2;

    // Horizon line
    ctx.beginPath();
    ctx.moveTo(cx - 100, cy);
    ctx.lineTo(cx - 30, cy);
    ctx.moveTo(cx + 30, cy);
    ctx.lineTo(cx + 100, cy);
    ctx.stroke();

    // Center Crosshair Reticle
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.moveTo(cx, cy - 20);
    ctx.lineTo(cx, cy - 8);
    ctx.moveTo(cx, cy + 8);
    ctx.lineTo(cx, cy + 20);
    ctx.stroke();

    // Top Telemetry Header
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, 40);
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 15px monospace";
    ctx.fillText("● LIVE FPV 5.8GHz · CH: R8 · LATENCY: 9.4ms", 20, 26);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 15px monospace";
    ctx.fillText("PX4 STABILIZED · INDOOR POS-HOLD", 340, 26);

    // Left HUD: Altitude & Speed Tapes
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(16, 60, 110, 160);
    ctx.strokeStyle = "#38bdf8";
    ctx.strokeRect(16, 60, 110, 160);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("ALT (LiDAR)", 24, 82);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.fillText("1.25 m", 24, 110);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("SPEED (OPTIC)", 24, 145);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.fillText("0.18 m/s", 24, 175);

    // Right HUD: Battery & Signal Telemetry
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(w - 130, 60, 114, 160);
    ctx.strokeStyle = "#22c55e";
    ctx.strokeRect(w - 130, 60, 114, 160);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 11px monospace";
    ctx.fillText("4S LI-PO VOLTS", w - 122, 82);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.fillText("15.6 V", w - 122, 110);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 11px monospace";
    ctx.fillText("LINK RSSI", w - 122, 145);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.fillText("-54 dBm", w - 122, 175);

    // Bottom Telemetry Bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, h - 45, w, 45);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 13px monospace";
    ctx.fillText("FLIGHT TIME: 04:18 | DRAW: 14.8A | CAPACITY: 1300mAh (78%) | FAILSAFE: AUTO-LAND", 20, h - 18);
  });
}

// 2. High-Visibility Helipad Landing Mat Texture
function makeHelipadTexture() {
  return createTextCanvas(512, 512, (ctx, w, h) => {
    // Durable industrial rubberized slate mat
    ctx.fillStyle = "#0c1524";
    ctx.fillRect(0, 0, w, h);

    // High-vis yellow safety border with diagonal chevrons
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Outer neon green ring
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 210, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary cyan dashed ring
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 160, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Crosshairs
    ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2, 50);
    ctx.lineTo(w / 2, h - 50);
    ctx.moveTo(50, h / 2);
    ctx.lineTo(w - 50, h / 2);
    ctx.stroke();

    // Central Bold 'H' Helipad Marker
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 130px 'Outfit', sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("H", w / 2, h / 2);

    // Compass headings
    ctx.font = "bold 18px monospace";
    ctx.fillStyle = "#eab308";
    ctx.fillText("N (000°)", w / 2, 36);
    ctx.fillText("AVP DRONE ARENA // PAD-01", w / 2, h - 30);
  });
}

// 3. Zone 5 Overhead Lightbox Banner Texture
function makeZone5BannerTexture() {
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
    ctx.fillText("ZONE 05 // AUTONOMOUS DRONE ARENA & AVIONICS LAB", 38, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
    ctx.fillText("UAV FLIGHT CAGE & AUTOPILOT ARENA", 38, 98);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px 'Outfit', sans-serif, system-ui";
    ctx.fillText("Acrobatic FPV Quadcopters · Indoor Optic Flow Positioning · PX4 Autopilot · Telemetry Ground Station", 38, 134);

    const cards = [
      { label: "FLIGHT ENCLOSURE", text: "HIGH-TENSILE CAGE", color: "#38bdf8", x: 38, w: 220 },
      { label: "HOVERING FPV", text: "CARBON X-FRAME", color: "#22c55e", x: 274, w: 210 },
      { label: "AUTOPILOT STACK", text: "PX4 + OPTIC FLOW", color: "#f59e0b", x: 500, w: 220 },
      { label: "TELEMETRY LINK", text: "5.8GHz LOW-LATENCY", color: "#a855f7", x: 736, w: 248 },
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

// -------------------------------------------------------------
// COMPLETE ZONE 5 SHOWCASE COMPONENT
// -------------------------------------------------------------

export function Zone5DroneArenaShowcase({
  drone,
  net,
  mat,
}: {
  drone?: THREE.Texture;
  net?: THREE.Texture;
  mat?: THREE.Texture;
}) {
  const telemetryTex = useMemo(() => makeDroneTelemetryTexture(), []);
  const helipadTex = useMemo(() => makeHelipadTexture(), []);
  const bannerTex = useMemo(() => makeZone5BannerTexture(), []);
  const s = 2.1;

  return (
    <group position={[4.85, 0, -2.55]}>
      {/* 1. Architectural Back Wall Cladding & Overhead Lightbox Banner */}
      <group position={[0, 2.1, -1.08]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.9, 0.02]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.15, 0.015]}>
          <planeGeometry args={[2.25, 0.44]} />
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

      {/* 2. Helipad Flight Floor Mat */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[s, s]} />
        <meshStandardMaterial map={helipadTex} roughness={0.6} />
      </mesh>

      {/* 3. High-Security Safety Flight Enclosure Cage */}
      {/* Structural Corner Aluminum Posts */}
      {[-0.98, 0.98].flatMap((x) =>
        [-0.98, 0.98].map((z) => (
          <group key={`${x}-${z}`} position={[x, s / 2, z]}>
            {/* Main structural mast */}
            <mesh castShadow>
              <cylinderGeometry args={[0.024, 0.024, s, 12]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Flange foot mounting plate */}
            <mesh position={[0, -s / 2 + 0.01, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 12]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.7} />
            </mesh>
            {/* Top Warning Beacon LED (Blinking Amber/Red) */}
            <mesh position={[0, s / 2 + 0.02, 0]}>
              <sphereGeometry args={[0.02, 10, 10]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
            </mesh>
          </group>
        )),
      )}

      {/* Top Perimeter Framing Beams */}
      {[-0.98, 0.98].map((x) => (
        <mesh key={`x-${x}`} position={[x, s, 0]}>
          <boxGeometry args={[0.03, 0.03, s]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      ))}
      {[-0.98, 0.98].map((z) => (
        <mesh key={`z-${z}`} position={[0, s, z]}>
          <boxGeometry args={[s, 0.03, 0.03]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
      ))}

      {/* Safety Netting Walls (Semi-Transparent Fine Grid) */}
      <mesh position={[0, s / 2, 0]}>
        <boxGeometry args={[s - 0.02, s, s - 0.02]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.16} />
      </mesh>

      {/* 4. Suspended Mid-Air Illuminated Neon FPV Racing Hoop Gate */}
      <group position={[0, 1.35, -0.2]} rotation={[0, 0, 0]}>
        {/* Glowing Outer Ring */}
        <mesh>
          <torusGeometry args={[0.32, 0.02, 16, 32]} />
          <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={1} toneMapped={false} />
        </mesh>
        {/* Inner Cyan Glow */}
        <mesh>
          <torusGeometry args={[0.3, 0.008, 12, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* 5. Mid-Air Hovering FPV Racing Quadcopter */}
      <group position={[0.08, 1.35, 0.35]} rotation={[0.08, 0.15, -0.05]}>
        {/* Carbon Fiber X-Frame Center Chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.03, 0.14]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* 4 Carbon Fiber Motor Arms */}
        {[
          { ax: 0.12, az: 0.12, ang: Math.PI / 4 },
          { ax: -0.12, az: 0.12, ang: -Math.PI / 4 },
          { ax: 0.12, az: -0.12, ang: -Math.PI / 4 },
          { ax: -0.12, az: -0.12, ang: Math.PI / 4 },
        ].map((arm, i) => (
          <group key={i}>
            <mesh position={[arm.ax * 0.5, 0, arm.az * 0.5]} rotation={[0, arm.ang, 0]} castShadow>
              <boxGeometry args={[0.025, 0.01, 0.16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} />
            </mesh>

            {/* Brushless Outrunner Motor */}
            <group position={[arm.ax, 0.015, arm.az]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.022, 0.022, 0.025, 16]} />
                <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Copper Stator Coils */}
              <mesh position={[0, 0.005, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.015, 12]} />
                <meshStandardMaterial color="#b45309" metalness={0.9} />
              </mesh>

              {/* Spinning High-Speed Propeller Blur Disk */}
              <mesh position={[0, 0.022, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.003, 16]} />
                <meshStandardMaterial
                  color="#38bdf8"
                  emissive="#38bdf8"
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.35}
                />
              </mesh>
            </group>
          </group>
        ))}

        {/* Top-Mounted 4S LiPo Battery Pack */}
        <mesh position={[0, 0.035, -0.01]} castShadow>
          <boxGeometry args={[0.065, 0.038, 0.11]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {/* Battery Strap */}
        <mesh position={[0, 0.036, -0.01]}>
          <boxGeometry args={[0.068, 0.04, 0.03]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>

        {/* Front-Facing FPV Tilt Camera */}
        <group position={[0, 0.01, 0.08]} rotation={[-0.4, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.035, 0.035, 0.035]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.014, 0.01, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} />
          </mesh>
        </group>

        {/* Rear Glowing Status Tail LED Strip (Vivid Purple) */}
        <mesh position={[0, 0.01, -0.075]}>
          <boxGeometry args={[0.06, 0.012, 0.005]} />
          <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={1} toneMapped={false} />
        </mesh>

        {/* 5.8GHz Lollipop Antenna Mast */}
        <group position={[0, 0.06, -0.06]}>
          <mesh>
            <cylinderGeometry args={[0.003, 0.003, 0.06, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.035, 0]}>
            <sphereGeometry args={[0.014, 10, 10]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      </group>

      {/* 6. Ground Control Telemetry Station & Pilot Tech Desk */}
      <group position={[1.2, 0, 0.15]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Light Scandinavian Blonde Birch Workstation */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.04, 0.65]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.4} />
        </mesh>
        {/* White Powder-Coated Legs */}
        {[-0.58, 0.58].flatMap((x) =>
          [-0.26, 0.26].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.36, z]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.72, 12]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.6} />
            </mesh>
          )),
        )}

        {/* A. Field Telemetry Monitor Displaying Live FPV & Horizon */}
        <group position={[0.25, 0.76, -0.05]}>
          {/* Stand */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.018, 0.022, 0.16, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.005, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.01, 16]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          {/* Bezel */}
          <mesh position={[0, 0.24, 0]} castShadow>
            <boxGeometry args={[0.54, 0.34, 0.03]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} />
          </mesh>
          {/* Active Screen */}
          <mesh position={[0, 0.24, 0.016]}>
            <planeGeometry args={[0.5, 0.3]} />
            <meshStandardMaterial
              map={telemetryTex}
              emissive="#ffffff"
              emissiveMap={telemetryTex}
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* B. FPV Goggles Resting on Workbench */}
        <group position={[-0.2, 0.78, 0.12]} rotation={[0, 0.35, 0]}>
          {/* Main Goggles Chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.16, 0.07, 0.09]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          {/* Dual Front Patch Antennas */}
          {[-0.05, 0.05].map((ax, i) => (
            <mesh key={i} position={[ax, 0.03, 0.045]}>
              <cylinderGeometry args={[0.006, 0.008, 0.04, 8]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
          ))}
          {/* Foam Eye Cushion */}
          <mesh position={[0, 0, -0.048]}>
            <boxGeometry args={[0.15, 0.065, 0.015]} />
            <meshStandardMaterial color="#475569" roughness={0.9} />
          </mesh>
        </group>

        {/* C. Professional Dual-Gimbal Radio Transmitter (Remote Controller) */}
        <group position={[-0.42, 0.77, -0.04]} rotation={[0.1, -0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.16, 0.03, 0.18]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          {/* Dual Gimbals */}
          {[-0.045, 0.045].map((gx, i) => (
            <mesh key={i} position={[gx, 0.025, 0]}>
              <cylinderGeometry args={[0.018, 0.022, 0.02, 12]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.8} />
            </mesh>
          ))}
          {/* Folding Antenna */}
          <mesh position={[0, 0.015, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.08, 8]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        </group>

        {/* D. Disassembled F450 Drone Kit Chassis */}
        <group position={[0.2, 0.77, 0.16]} rotation={[0, 0.6, 0]}>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.015, 12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* 4 Colored Arms (2 Red front, 2 White back) */}
          {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((ang, i) => (
            <mesh key={i} position={[0.09 * Math.cos(ang), 0.01, 0.09 * Math.sin(ang)]} rotation={[0, -ang, 0]}>
              <boxGeometry args={[0.1, 0.012, 0.02]} />
              <meshStandardMaterial color={i < 2 ? "#ef4444" : "#f8fafc"} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Dramatic Overhead Spotlight Illuminating the Helipad */}
      <spotLight
        position={[0, 2.5, 0]}
        target-position={[0, 0, 0]}
        color="#38bdf8"
        intensity={2.2}
        distance={4.5}
        angle={0.65}
        penumbra={0.4}
      />
    </group>
  );
}
