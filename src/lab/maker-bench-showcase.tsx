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

// 1. Oscilloscope Display Screen Texture
function makeOscilloscopeTexture() {
  return createTextCanvas(512, 320, (ctx, w, h) => {
    // Dark CRT / LCD Oscilloscope screen
    ctx.fillStyle = "#030d08";
    ctx.fillRect(0, 0, w, h);

    // Green reticle grid
    ctx.strokeStyle = "rgba(34, 197, 94, 0.25)";
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

    // Channel 1: Sine Wave (Vivid Neon Emerald)
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = h / 2 - 20 + Math.sin((x / w) * Math.PI * 8) * 65;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Channel 2: PWM Square Wave (Electric Cyan)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const cycle = (x % 90) > 45 ? 1 : -1;
      const y = h / 2 + 70 + cycle * 35;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Top Header & Readings
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 16px monospace";
    ctx.fillText("CH1: 1.00V/div  10.00 kHz SINE", 16, 26);

    ctx.fillStyle = "#38bdf8";
    ctx.fillText("CH2: 2.50V/div  PWM 50.0%", 280, 26);

    // Bottom Telemetry Stats
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("Vpp: 3.31V · Vrms: 1.17V · Freq: 10.024 kHz · Trigger: Auto", 16, h - 14);
  });
}

// 2. Zone 3 Overhead Lightbox Banner Texture
function makeZone3BannerTexture() {
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
    ctx.fillText("ZONE 03 // HARDWARE ASSEMBLY & SOLDERING LAB", 38, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
    ctx.fillText("BREAK & BUILD SECTION · HARDWARE LAB", 38, 104);

    ctx.fillStyle = "#93c5fd";
    ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
    ctx.fillText("ELECTRONICS WORKBENCH · SOLDERING STATIONS · OSCILLOSCOPES · PCB TESTING", 38, 148);

    const cards = [
      { text: "● RIGOL 100MHz DUAL SCOPE", color: "#4ade80", border: "#22c55e", x: 38, w: 275 },
      { text: "● DIGITAL SOLDER: 350°C", color: "#f97316", border: "#ea580c", x: 328, w: 295 },
      { text: "● ESD WORKBENCH: GROUNDED", color: "#38bdf8", border: "#0284c7", x: 638, w: 260 },
    ];

    cards.forEach((c) => {
      ctx.fillStyle = "#0c1930";
      ctx.fillRect(c.x, 172, c.w, 48);
      ctx.strokeStyle = c.border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(c.x, 172, c.w, 48);

      ctx.fillStyle = c.color;
      ctx.font = "bold 14px monospace";
      ctx.fillText(c.text, c.x + 16, 202);
    });
  });
}

// -------------------------------------------------------------
// COMPLETE ZONE 3 SHOWCASE COMPONENT
// -------------------------------------------------------------

export function Zone3BreakBuildShowcase() {
  const scopeTex = useMemo(() => makeOscilloscopeTexture(), []);
  const bannerTex = useMemo(() => makeZone3BannerTexture(), []);

  return (
    <group position={[0.25, 0, -3.55]}>
      {/* 1. Architectural Back Wall Cladding & Overhead Sign */}
      <group position={[0, 1.95, -0.58]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.0, 0.95, 0.02]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.18, 0.015]}>
          <planeGeometry args={[1.92, 0.44]} />
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

      {/* 2. Makerspace Tool Wall Pegboard (Light Silver Metallic) */}
      <group position={[0, 1.15, -0.57]}>
        <mesh receiveShadow>
          <boxGeometry args={[1.7, 0.85, 0.015]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.008]}>
          <boxGeometry args={[1.72, 0.87, 0.008]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Pegboard Holes */}
        {Array.from({ length: 14 }).map((_, col) =>
          Array.from({ length: 6 }).map((_, row) => (
            <mesh key={`${col}-${row}`} position={[-0.75 + col * 0.115, -0.32 + row * 0.13, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.004, 0.004, 0.006, 8]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.2} />
            </mesh>
          )),
        )}

        {/* Hanging Tools: Wire Strippers, Solder Spools, Heat Gun, Pliers */}
        {/* Wire Strippers */}
        <group position={[-0.5, 0.12, 0.025]}>
          <mesh position={[-0.015, 0.02, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.015, 0.09, 0.012]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          <mesh position={[0.015, 0.02, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.015, 0.09, 0.012]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          <mesh position={[0, -0.045, 0]}>
            <boxGeometry args={[0.025, 0.04, 0.008]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>

        {/* Solder Wire Spool Holder */}
        <group position={[-0.2, 0.1, 0.04]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
          {/* Wire lead */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.002, 0.002, 0.06, 6]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>

        {/* Heat Shrink Gun */}
        <group position={[0.15, 0.12, 0.035]} rotation={[0, 0, -0.2]}>
          <mesh>
            <boxGeometry args={[0.045, 0.12, 0.04]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.014, 0.018, 0.05, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>

        {/* Multi-Drawer Component Organizer Boxes on Pegboard Shelf */}
        <group position={[0.55, -0.1, 0.06]}>
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.24, 0.1]} />
            <meshStandardMaterial color="#1e293b" metalness={0.4} />
          </mesh>
          {/* Drawers */}
          {[-0.1, 0, 0.1].flatMap((x) =>
            [-0.07, 0, 0.07].map((y, j) => (
              <mesh key={`${x}-${j}`} position={[x, y, 0.04]}>
                <boxGeometry args={[0.085, 0.055, 0.03]} />
                <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} />
              </mesh>
            )),
          )}
        </group>
      </group>

      {/* 3. Heavy-Duty Electronics Workbench (Blonde Birch & White Frame) */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.95, 0.045, 0.72]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.35} metalness={0.04} />
        </mesh>
        <mesh position={[0, 0.738, 0.36]}>
          <boxGeometry args={[1.94, 0.01, 0.008]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* White Powder-Coated Aluminum Legs */}
        {[
          [-0.88, -0.3],
          [0.88, -0.3],
          [-0.88, 0.3],
          [0.88, 0.3],
        ].map(([x, z], i) => (
          <group key={i} position={[x, 0.36, z]}>
            <mesh castShadow>
              <boxGeometry args={[0.05, 0.72, 0.05]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.25} />
            </mesh>
            <mesh position={[0, -0.36, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.015, 12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* ---------------- BENCHTOP INSTRUMENTATION ---------------- */}

        {/* 1. Rigol 100MHz Digital Storage Oscilloscope */}
        <group position={[-0.55, 0.765, -0.06]}>
          {/* Main Case (Modern Industrial Light Gray) */}
          <mesh position={[0, 0.11, 0]} castShadow>
            <boxGeometry args={[0.3, 0.2, 0.18]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
          </mesh>
          {/* Display Bezel */}
          <mesh position={[-0.05, 0.11, 0.091]}>
            <planeGeometry args={[0.17, 0.14]} />
            <meshStandardMaterial
              map={scopeTex}
              emissive="#ffffff"
              emissiveMap={scopeTex}
              emissiveIntensity={0.65}
              roughness={0.1}
            />
          </mesh>
          {/* Control Knobs & BNC Probes on Right */}
          <group position={[0.09, 0.11, 0.092]}>
            {[-0.04, 0, 0.04].map((y, i) => (
              <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.012, 12]} />
                <meshStandardMaterial color="#0284c7" metalness={0.8} />
              </mesh>
            ))}
          </group>
        </group>

        {/* 2. Dual-Channel Adjustable DC Bench Power Supply */}
        <group position={[-0.2, 0.765, -0.06]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[0.2, 0.18, 0.22]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Red/Green 7-Segment LED Readouts */}
          <mesh position={[0, 0.13, 0.111]}>
            <planeGeometry args={[0.15, 0.045]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0, 0.07, 0.111]}>
            <planeGeometry args={[0.15, 0.045]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.9} />
          </mesh>
          {/* Terminal Binding Posts (Red, Black, Green Ground) */}
          {[-0.05, 0, 0.05].map((x, i) => (
            <mesh key={i} position={[x, 0.02, 0.112]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.015, 10]} />
              <meshStandardMaterial color={["#ef4444", "#090d16", "#22c55e"][i]} />
            </mesh>
          ))}
        </group>

        {/* 3. Digital Soldering Station with Rest & Brass Sponge */}
        <group position={[0.18, 0.765, 0.04]}>
          {/* Station Base with LCD */}
          <mesh position={[0, 0.06, 0]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.14]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.07, 0.071]}>
            <planeGeometry args={[0.09, 0.04]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.8} />
          </mesh>
          {/* Iron Stand Holder */}
          <mesh position={[0.11, 0.05, 0]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.08, 12]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Soldering Iron in Stand */}
          <mesh position={[0.11, 0.08, 0.02]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0.11, 0.14, 0.04]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.003, 0.02, 8]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.9} />
          </mesh>
        </group>

        {/* 4. Desktop Fume Extractor Fan with Articulated Carbon Filter */}
        <group position={[0.5, 0.765, -0.08]}>
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.18, 0.18, 0.07]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.15, 0.036]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.005, 16]} />
            <meshStandardMaterial color="#090d16" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.015, 0.02, 0.08, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.8} />
          </mesh>
        </group>

        {/* 5. Circuit Breadboard Prototyping Station (ESP32 + LEDs) */}
        <group position={[-0.1, 0.765, 0.18]}>
          {/* Solderless Breadboard */}
          <mesh position={[0, 0.006, 0]} castShadow>
            <boxGeometry args={[0.19, 0.012, 0.09]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.6} />
          </mesh>
          {/* ESP32 Microcontroller Board */}
          <mesh position={[0, 0.016, 0]} castShadow>
            <boxGeometry args={[0.055, 0.006, 0.03]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.4} />
          </mesh>
          {/* Blinking Prototype LEDs */}
          {[-0.05, 0.05].map((x, i) => (
            <mesh key={i} position={[x, 0.02, 0]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshStandardMaterial color={i === 0 ? "#22c55e" : "#ef4444"} emissive={i === 0 ? "#22c55e" : "#ef4444"} emissiveIntensity={1} />
            </mesh>
          ))}
          {/* Jumper Wires */}
          {[-0.04, 0.04].map((z, j) => (
            <mesh key={j} position={[0.02, 0.02, z]}>
              <boxGeometry args={[0.08, 0.004, 0.004]} />
              <meshStandardMaterial color={j === 0 ? "#eab308" : "#3b82f6"} />
            </mesh>
          ))}
        </group>

        {/* 6. Handheld Digital Multimeter with Probes */}
        <group position={[0.7, 0.765, 0.16]}>
          <mesh position={[0, 0.015, 0]} castShadow>
            <boxGeometry args={[0.08, 0.025, 0.15]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.4} />
          </mesh>
          {/* LCD */}
          <mesh position={[0, 0.028, -0.03]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.06, 0.03]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
          </mesh>
          {/* Dial */}
          <mesh position={[0, 0.028, 0.02]}>
            <cylinderGeometry args={[0.015, 0.015, 0.004, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>

      {/* 4. Modern Swivel Maker Stools (Chrome Base & Padded Seat) */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <group key={i} position={[x, 0, 0.55]}>
          <mesh position={[0, 0.48, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.05, 18]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.02, 0.025, 0.44, 10]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
