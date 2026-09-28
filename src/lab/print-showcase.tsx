import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// -------------------------------------------------------------
// TEXTURE GENERATION HELPERS
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

// 1. CoreXY 3D Printer Touchscreen UI (Bambu Lab Style)
function makePrinterScreenTexture(
  printerName: string,
  modelName: string,
  progress: number,
  nozzleTemp: number,
  bedTemp: number,
  speedMode: string,
) {
  return createTextCanvas(512, 320, (ctx, w, h) => {
    // Dark glassmorphic background
    ctx.fillStyle = "#070c18";
    ctx.fillRect(0, 0, w, h);

    // Top Header Bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, 44);

    ctx.fillStyle = "#00b4d8";
    ctx.font = "bold 15px monospace";
    ctx.fillText(`● ${printerName}`, 16, 28);

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.fillText("CHAMBER 36°C · 192.168.1.104 · Wi-Fi 5G", 220, 28);

    // Subtle divider
    ctx.strokeStyle = "rgba(0, 180, 216, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(14, 44);
    ctx.lineTo(w - 14, 44);
    ctx.stroke();

    // Left Panel: 3D Model Thumbnail Viewport
    ctx.fillStyle = "#0b1222";
    ctx.fillRect(16, 56, 170, 160);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 56, 170, 160);

    // Isometric 3D Benchy / Model wireframe representation
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(40, 170);
    ctx.lineTo(145, 170);
    ctx.lineTo(165, 140);
    ctx.lineTo(70, 140);
    ctx.closePath();
    ctx.stroke();

    // Cabin
    ctx.strokeRect(70, 105, 50, 35);
    // Chimney stack
    ctx.fillStyle = "#f97316";
    ctx.fillRect(100, 85, 14, 20);

    // Layer scanning line
    ctx.strokeStyle = "#00b4d8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 130);
    ctx.lineTo(180, 130);
    ctx.stroke();

    // Model Name Tag
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText(modelName, 16, 235);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px monospace";
    ctx.fillText("PLA-CF · 0.16mm HIGH QUALITY", 16, 252);

    // Right Panel: Print Progress & Gauges
    // Circular Progress Ring
    const centerX = 330;
    const centerY = 135;
    const radius = 54;

    ctx.lineWidth = 9;
    ctx.strokeStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Active progress arc
    ctx.strokeStyle = "#00b4d8";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * progress) / 100);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px 'Outfit', sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${progress}%`, centerX, centerY + 6);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("PRINTING", centerX, centerY + 22);
    ctx.textAlign = "left";

    // ETA and Layer Readout
    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText("ETA: 38m remaining", 250, 218);
    ctx.fillStyle = "#64748b";
    ctx.font = "11px monospace";
    ctx.fillText("Layer 184 / 248 · Z: 29.4mm", 250, 236);

    // Bottom Status Telemetry Cards
    const yCards = 270;
    // Nozzle
    ctx.fillStyle = "#111c34";
    ctx.fillRect(16, yCards, 150, 40);
    ctx.fillStyle = "#f97316";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`🔥 ${nozzleTemp}°C / 220°C`, 26, yCards + 25);

    // Bed
    ctx.fillStyle = "#111c34";
    ctx.fillRect(180, yCards, 150, 40);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`♨️ ${bedTemp}°C / 60°C`, 190, yCards + 25);

    // Speed Mode
    ctx.fillStyle = "#111c34";
    ctx.fillRect(344, yCards, 152, 40);
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`⚡ ${speedMode}`, 354, yCards + 25);
  });
}

// 2. Resin SLA Printer Touchscreen UI
function makeResinScreenTexture() {
  return createTextCanvas(400, 240, (ctx, w, h) => {
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, w, h);

    // Header
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, w, 36);
    ctx.fillStyle = "#ea580c";
    ctx.font = "bold 14px monospace";
    ctx.fillText("● PHOTON MONO M5s · SLA RESIN", 14, 23);

    // Main status ring
    ctx.fillStyle = "#f4f4f5";
    ctx.font = "bold 32px 'Outfit', sans-serif, system-ui";
    ctx.fillText("64%", 24, 82);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "12px monospace";
    ctx.fillText("LAYER 780 / 1,220 · 50μm", 24, 104);
    ctx.fillText("RESIN: BIO-CLEAR EMERALD", 24, 124);

    // Mini graph / exposure
    ctx.fillStyle = "#27272a";
    ctx.fillRect(24, 140, w - 48, 8);
    ctx.fillStyle = "#ea580c";
    ctx.fillRect(24, 140, (w - 48) * 0.64, 8);

    // Exposure & ETA
    ctx.fillStyle = "#e4e4e7";
    ctx.font = "13px monospace";
    ctx.fillText("EXPOSURE: 2.3s · LIFT: 8mm", 24, 175);
    ctx.fillText("ESTIMATED FINISH: 42 MIN", 24, 198);

    // UV indicator
    ctx.fillStyle = "#a855f7";
    ctx.fillText("UV 405nm LED ARRAY: 100% OK", 24, 222);
  });
}

// 3. Ultrawide CAD / Slicing Workstation Screen
function makeSlicerScreenTexture() {
  return createTextCanvas(1024, 512, (ctx, w, h) => {
    // Dark Charcoal Workstation IDE Background
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(0, 0, w, h);

    // Top Slicer Application Menu Bar
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, 0, w, 36);

    ctx.fillStyle = "#00b4d8";
    ctx.font = "bold 15px 'Outfit', sans-serif, system-ui";
    ctx.fillText("AVP SLICER STUDIO v2.4", 16, 24);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px sans-serif";
    ctx.fillText("File   Edit   Prepare   Preview   Device   Calibration", 220, 24);

    // Print Action Button
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(w - 130, 6, 115, 24);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("▶ SLICE & PRINT", w - 120, 22);

    // Left Sidebar: Slicing Parameters
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 36, 230, h - 36);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 36, 230, h - 36);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText("PRINT SETTINGS", 16, 62);

    const settings = [
      ["Printer:", "Bambu X1-Carbon 0.4 Nozzle"],
      ["Plate Type:", "Textured PEI Spring Sheet"],
      ["Filament:", "AVP PLA-CF (Matte Black)"],
      ["Layer Height:", "0.16mm (Optimal)"],
      ["Wall Loops:", "4 Perimeters"],
      ["Infill Density:", "20% Gyroid"],
      ["Print Speed:", "250 mm/s"],
      ["Nozzle Temp:", "220°C"],
      ["Bed Temp:", "60°C"],
    ];

    settings.forEach(([k, v], i) => {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px sans-serif";
      ctx.fillText(k, 16, 88 + i * 22);
      ctx.fillStyle = "#f1f5f9";
      ctx.font = "bold 11px monospace";
      ctx.fillText(v, 16, 100 + i * 22);
    });

    // Slicing Stats Summary Box
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(12, 310, 206, 185);
    ctx.strokeStyle = "#0284c7";
    ctx.strokeRect(12, 310, 206, 185);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText("SLICING SUMMARY", 22, 332);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
    ctx.fillText("1h 38m", 22, 362);
    ctx.fillStyle = "#64748b";
    ctx.font = "11px sans-serif";
    ctx.fillText("Estimated Total Print Time", 22, 378);

    ctx.fillStyle = "#f1f5f9";
    ctx.font = "12px monospace";
    ctx.fillText("Filament: 48.2g · 16.1m", 22, 404);
    ctx.fillText("Material Cost: $1.45", 22, 424);
    ctx.fillText("Total Layers: 210", 22, 444);
    ctx.fillText("Toolpath: 1,842 segments", 22, 464);

    // Main 3D Slicer Viewport (Build Plate & G-Code Toolpaths)
    const vpX = 240;
    const vpY = 46;
    const vpW = w - 250;
    const vpH = h - 60;

    // Viewport Grid Lines (Isometric Heated Bed Grid)
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let x = vpX + 20; x < vpX + vpW - 20; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, vpY + 40);
      ctx.lineTo(x, vpY + vpH - 40);
      ctx.stroke();
    }
    for (let y = vpY + 40; y < vpY + vpH - 40; y += 35) {
      ctx.beginPath();
      ctx.moveTo(vpX + 20, y);
      ctx.lineTo(vpX + vpW - 20, y);
      ctx.stroke();
    }

    // 3D Sliced Model Representation (Simulated G-code Layer)
    ctx.save();
    ctx.translate(vpX + vpW / 2 - 20, vpY + vpH / 2 + 10);

    // Outer Perimeters (Orange Toolpaths)
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 160, 95, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Perimeters (Green Toolpaths)
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 150, 86, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, 142, 79, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Gyroid Infill (Cyan Toolpaths)
    ctx.strokeStyle = "rgba(6, 182, 212, 0.75)";
    ctx.lineWidth = 1.8;
    for (let i = -110; i <= 110; i += 22) {
      ctx.beginPath();
      ctx.moveTo(i, -55);
      ctx.bezierCurveTo(i + 15, -20, i - 15, 20, i, 55);
      ctx.stroke();
    }

    // Hotend Nozzle Position Indicator
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(80, -30, 6, 0, Math.PI * 2);
    ctx.fill();

    // Travel Vector
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(80, -30);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();

    // Layer Height Slider on Right Edge
    const sliderX = w - 24;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(sliderX, vpY + 20, 10, vpH - 50);
    ctx.fillStyle = "#00b4d8";
    ctx.fillRect(sliderX - 2, vpY + 120, 14, 18);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("Z: 18.2mm", w - 85, vpY + 134);
    ctx.fillText("Layer 114", w - 85, vpY + 148);

    // Color Legend Bar on Top of Viewport
    const legend = [
      ["#f97316", "Outer Wall"],
      ["#22c55e", "Inner Wall"],
      ["#06b6d4", "Gyroid Infill"],
      ["#eab308", "Support"],
      ["#3b82f6", "Travel Move"],
    ];
    legend.forEach(([col, label], i) => {
      ctx.fillStyle = col;
      ctx.fillRect(vpX + 20 + i * 115, vpY + 12, 12, 12);
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "11px sans-serif";
      ctx.fillText(label, vpX + 38 + i * 115, vpY + 22);
    });
  });
}

// 4. Overhead Zone 02 Architectural Cladding Banner (High-Contrast Illuminated Lightbox)
function makeZone2BannerTexture() {
  return createTextCanvas(1024, 256, (ctx, w, h) => {
    // Deep midnight sapphire background (non-reflective, high contrast)
    ctx.fillStyle = "#070d1a";
    ctx.fillRect(0, 0, w, h);

    // Glowing Cyan Outer Frame
    ctx.strokeStyle = "#00b4d8";
    ctx.lineWidth = 5;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    // Left neon accent bar
    ctx.fillStyle = "#00b4d8";
    ctx.fillRect(8, 8, 14, h - 16);

    // Zone Badge (Vivid Electric Cyan)
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 20px monospace";
    ctx.fillText("ZONE 02 // RAPID PROTOTYPING & ADDITIVE LAB", 38, 48);

    // Main Header (Pure Brilliant White - High Contrast)
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
    ctx.fillText("3D PRINTING & DIGITAL FABRICATION", 38, 104);

    // Subtitle (Vibrant Sky Blue - Razor Sharp)
    ctx.fillStyle = "#93c5fd";
    ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
    ctx.fillText("HIGH-SPEED CORE-XY FDM · SLA RESIN STATION · CAD & SLICING BENCH", 38, 148);

    // Live Telemetry status badges (Dark Blue Cards with Bright Neon Text)
    const cards = [
      { text: "● 2 NODES PRINTING (74%)", color: "#4ade80", border: "#22c55e", x: 38, w: 275 },
      { text: "● FILAMENT DRYBOX: 18% RH", color: "#38bdf8", border: "#0284c7", x: 328, w: 295 },
      { text: "● BED CALIBRATION: OK", color: "#fbbf24", border: "#f59e0b", x: 638, w: 260 },
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

// 5. Filament Spool Label Texture
function makeSpoolLabelTexture(material: string, color: string) {
  return createTextCanvas(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#0a0f1d";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 115, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = "bold 22px 'Outfit', sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("AVP FILAMENT", w / 2, 85);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px monospace";
    ctx.fillText(material, w / 2, 125);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px monospace";
    ctx.fillText("1.75mm · 1.0 kg", w / 2, 155);
    ctx.fillText("210-230°C / 60°C", w / 2, 178);

    // Barcode mock
    ctx.fillStyle = "#cbd5e1";
    for (let x = 60; x <= 196; x += 6) {
      if (Math.sin(x * 12) > -0.2) {
        ctx.fillRect(x, 195, 3, 20);
      }
    }
  });
}

// 6. Filament Drybox OLED Display
function makeDryboxOledTexture() {
  return createTextCanvas(256, 128, (ctx, w, h) => {
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#00b4d8";
    ctx.font = "bold 15px monospace";
    ctx.fillText("HEAT DRYBOX ACTIVE", 12, 26);

    ctx.strokeStyle = "rgba(0, 180, 216, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 28px monospace";
    ctx.fillText("18% RH", 12, 68);

    ctx.fillStyle = "#f97316";
    ctx.font = "bold 20px monospace";
    ctx.fillText("48.5 °C", 140, 68);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px monospace";
    ctx.fillText("DUAL SPOOL FEED · PT-FE LINKED", 12, 102);
  });
}

// -------------------------------------------------------------
// 3D BENCHY MINIATURE PRINT MODEL
// -------------------------------------------------------------

function BenchyBoatModel({
  position,
  color = "#00b4d8",
  scale = 1,
}: {
  position: [number, number, number];
  color?: string;
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Hull Bottom */}
      <mesh position={[0, 0.015, 0]} castShadow>
        <boxGeometry args={[0.075, 0.02, 0.045]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Hull Bow Pointed Tip */}
      <mesh position={[0.045, 0.022, 0]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.035, 0.025, 0.042]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Cabin Deck House */}
      <mesh position={[-0.01, 0.042, 0]} castShadow>
        <boxGeometry args={[0.038, 0.035, 0.032]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Cabin Roof */}
      <mesh position={[-0.01, 0.062, 0]} castShadow>
        <boxGeometry args={[0.044, 0.006, 0.036]} />
        <meshStandardMaterial color={color} roughness={0.35} />
      </mesh>
      {/* Chimney Exhaust Pipe */}
      <mesh position={[0.005, 0.075, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.024, 10]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Stern Flagpole Hole / Box */}
      <mesh position={[-0.035, 0.03, 0]} castShadow>
        <boxGeometry args={[0.012, 0.016, 0.038]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// FLAGSHIP CORE-XY ENCLOSED 3D PRINTER (BAMBU LAB X1-C STYLE)
// -------------------------------------------------------------

function FlagshipCoreXyPrinter({
  position,
  phase = 0,
}: {
  position: [number, number, number];
  phase?: number;
}) {
  const toolheadRef = useRef<THREE.Group>(null);
  const [turbo, setTurbo] = useState(false);

  // Animated Toolhead Gantry Motion
  useFrame(({ clock }) => {
    if (!toolheadRef.current) return;
    const speed = turbo ? 3.5 : 1.6;
    const t = clock.elapsedTime * speed + phase;
    // CoreXY Toolhead toolpaths on heated bed
    toolheadRef.current.position.x = Math.sin(t * 1.8) * 0.085;
    toolheadRef.current.position.z = Math.cos(t * 1.1) * 0.08;
    toolheadRef.current.position.y = 0.16 + Math.sin(t * 0.2) * 0.01;
  });

  const screenTex = useMemo(
    () =>
      makePrinterScreenTexture(
        "BAMBU X1-CARBON",
        "3D_BENCHY_SPEED.GCODE",
        turbo ? 92 : 74,
        220,
        60,
        turbo ? "LUDICROUS 166%" : "STANDARD 100%",
      ),
    [turbo],
  );

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setTurbo((v) => !v);
      }}
    >
      {/* 1. Light Titanium / Silver Base Chassis */}
      <mesh position={[0, 0.025, 0]} castShadow>
        <boxGeometry args={[0.38, 0.05, 0.38]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.65} roughness={0.25} />
      </mesh>

      {/* 4 Robust Corner Frame Pillars (Satin Anodized Aluminum) */}
      {[
        [-0.175, -0.175],
        [0.175, -0.175],
        [-0.175, 0.175],
        [0.175, 0.175],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.23, z]} castShadow>
          <boxGeometry args={[0.028, 0.41, 0.028]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* 2. Side Arctic White Exterior Panels with Silver Grip */}
      {[-0.18, 0.18].map((x, i) => (
        <group key={i} position={[x, 0.23, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.008, 0.39, 0.33]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.3} />
          </mesh>
          {/* Recessed Handle */}
          <mesh position={[x > 0 ? 0.003 : -0.003, 0.04, 0]}>
            <boxGeometry args={[0.006, 0.08, 0.14]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* 3. Rear Metal Enclosure Panel with Exhaust Fan Grille */}
      <mesh position={[0, 0.23, -0.18]} castShadow>
        <boxGeometry args={[0.33, 0.39, 0.008]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Exhaust Fan Grille Ring */}
      <mesh position={[0, 0.3, -0.185]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.008, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 4. Top Canopy Frame with Glass Lid */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <boxGeometry args={[0.38, 0.025, 0.38]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* Clear Top Tempered Glass Pane */}
      <mesh position={[0, 0.455, 0]}>
        <boxGeometry args={[0.33, 0.006, 0.33]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.35} roughness={0.05} metalness={0.1} />
      </mesh>

      {/* 5. Front Crystal-Clear Glass Door with Vertical Cyan/Silver Handle */}
      <mesh position={[0, 0.23, 0.18]}>
        <boxGeometry args={[0.32, 0.38, 0.006]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.16} roughness={0.05} metalness={0.1} />
      </mesh>
      {/* Vertical Cyan Anodized Aluminum Door Handle */}
      <mesh position={[0.13, 0.23, 0.192]} castShadow>
        <boxGeometry args={[0.012, 0.16, 0.014]} />
        <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 6. High-Tech Color Touchscreen UI (Top-Right Frame) */}
      <group position={[0.11, 0.485, 0.165]} rotation={[-Math.PI / 6, 0, 0]}>
        {/* Bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.09, 0.014]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {/* Screen Display Face */}
        <mesh position={[0, 0, 0.008]}>
          <planeGeometry args={[0.132, 0.082]} />
          <meshStandardMaterial
            map={screenTex}
            emissive="#ffffff"
            emissiveMap={screenTex}
            emissiveIntensity={0.65}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* 7. Multi-Material AMS 4-Spool Unit Mounted on Top */}
      <group position={[0, 0.49, -0.02]}>
        {/* AMS Base Tray */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.34, 0.04, 0.28]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Curved Tinted AMS Cover Hood */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.33, 0.09, 0.27]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={0.25} roughness={0.1} />
        </mesh>
        {/* 4 Spools of Filament loaded inside AMS */}
        {[-0.11, -0.035, 0.035, 0.11].map((x, i) => {
          const colors = ["#0f172a", "#00b4d8", "#f97316", "#f8fafc"];
          return (
            <group key={i} position={[x, 0.07, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.048, 0.048, 0.022, 16]} />
                <meshStandardMaterial color={colors[i]} roughness={0.4} />
              </mesh>
              {/* Spool Flanges */}
              {[-0.012, 0.012].map((sy, j) => (
                <mesh key={j} position={[0, sy, 0]}>
                  <cylinderGeometry args={[0.052, 0.052, 0.003, 16]} />
                  <meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} />
                </mesh>
              ))}
            </group>
          );
        })}
        {/* PTFE Guide Tubes entering top glass */}
        <mesh position={[0, 0.005, 0.08]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.06, 8]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} />
        </mesh>
      </group>

      {/* 8. Internal Heated Build Plate & Chamber Mechanics */}
      {/* Interior Chamber LED Light Strip */}
      <mesh position={[0, 0.42, 0.13]}>
        <boxGeometry args={[0.28, 0.008, 0.015]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>

      {/* Dual Precision Lead Screws */}
      {[-0.13, 0.13].map((x, i) => (
        <group key={i} position={[x, 0.23, -0.12]}>
          <mesh>
            <cylinderGeometry args={[0.005, 0.005, 0.38, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Brass Nut */}
          <mesh position={[0, -0.09, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.014, 10]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Textured Gold PEI Magnetic Spring-Steel Sheet on Heated Bed */}
      <group position={[0, 0.12, 0]}>
        <mesh position={[0, 0.008, 0]} receiveShadow>
          <boxGeometry args={[0.26, 0.012, 0.26]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} />
        </mesh>
        {/* Gold Textured PEI Surface */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.252, 0.002, 0.252]} />
          <meshStandardMaterial color="#d97706" roughness={0.7} metalness={0.4} />
        </mesh>
        {/* Front Alignment Notches */}
        {[-0.08, 0.08].map((x, i) => (
          <mesh key={i} position={[x, 0.015, 0.13]}>
            <boxGeometry args={[0.02, 0.002, 0.01]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        ))}

        {/* Real 3D Printed Benchy Model on the build plate */}
        <BenchyBoatModel position={[0, 0.016, 0]} color="#00b4d8" scale={1.1} />
      </group>

      {/* 9. Carbon-Fiber X-Gantry Rails & Moving Toolhead */}
      <group ref={toolheadRef} position={[0, 0.24, 0]}>
        {/* Cross Gantry Rail */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.32, 0.015, 0.015]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* Toolhead Body */}
        <mesh position={[0, 0.015, 0]} castShadow>
          <boxGeometry args={[0.055, 0.05, 0.055]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Front Cooling Fan Shroud */}
        <mesh position={[0, 0.015, 0.029]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.006, 12]} />
          <meshStandardMaterial color="#00b4d8" metalness={0.8} />
        </mesh>
        {/* Status RGB Light Bar */}
        <mesh position={[0, 0.038, 0.028]}>
          <boxGeometry args={[0.035, 0.006, 0.004]} />
          <meshStandardMaterial
            color={turbo ? "#f97316" : "#22c55e"}
            emissive={turbo ? "#f97316" : "#22c55e"}
            emissiveIntensity={1}
          />
        </mesh>

        {/* Hotend Nozzle Block & Glowing Brass Tip */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[0.018, 0.012, 0.018]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} />
        </mesh>
        <mesh position={[0, -0.024, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.006, 0.01, 8]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Bowden Cable / PTFE Tube curving up */}
        <mesh position={[0, 0.065, -0.01]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.07, 8]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// PRECISION SLA RESIN 3D PRINTER & POST-PROCESSING STATION
// -------------------------------------------------------------

function PrecisionResinPrinter({ position }: { position: [number, number, number] }) {
  const resinLcdTex = useMemo(() => makeResinScreenTexture(), []);

  return (
    <group position={position}>
      {/* 1. Heavy Pearl White Cast-Aluminum Base */}
      <mesh position={[0, 0.07, 0]} castShadow>
        <boxGeometry args={[0.26, 0.14, 0.26]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.45} roughness={0.25} />
      </mesh>

      {/* Front Touchscreen UI */}
      <group position={[0, 0.07, 0.131]}>
        <mesh>
          <planeGeometry args={[0.13, 0.075]} />
          <meshStandardMaterial
            map={resinLcdTex}
            emissive="#ffffff"
            emissiveMap={resinLcdTex}
            emissiveIntensity={0.65}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 2. CNC Machined Anodized Resin Vat */}
      <mesh position={[0, 0.155, 0]} castShadow>
        <boxGeometry args={[0.22, 0.028, 0.2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Liquid UV Photopolymer Resin in Vat */}
      <mesh position={[0, 0.165, 0]}>
        <boxGeometry args={[0.2, 0.008, 0.18]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.25}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Vat Thumbscrews on Left and Right */}
      {[-0.105, 0.105].map((x, i) => (
        <mesh key={i} position={[x, 0.175, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.018, 12]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} />
        </mesh>
      ))}

      {/* 3. Ball-Screw Vertical Z-Tower */}
      <mesh position={[0, 0.32, -0.09]} castShadow>
        <boxGeometry args={[0.065, 0.32, 0.045]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Dual Chrome Linear Guide Rails */}
      {[-0.018, 0.018].map((x, i) => (
        <mesh key={i} position={[x, 0.32, -0.065]}>
          <cylinderGeometry args={[0.004, 0.004, 0.3, 10]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* 4. Perforated Aluminum Build Platform (Suspended in Action) */}
      <group position={[0, 0.31, 0]}>
        {/* Cantilever Arm connecting to Z-Tower */}
        <mesh position={[0, 0.02, -0.045]} castShadow>
          <boxGeometry args={[0.04, 0.025, 0.09]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} />
        </mesh>
        {/* Top Knob */}
        <mesh position={[0, 0.042, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.02, 14]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Build Plate */}
        <mesh position={[0, 0.005, 0]} castShadow>
          <boxGeometry args={[0.16, 0.01, 0.12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* 3D Printed Resin Model Hanging Upside Down (Voronoi Ring/Pendant with Support Struts) */}
        <group position={[0, -0.04, 0]}>
          <mesh castShadow>
            <torusGeometry args={[0.035, 0.012, 12, 24]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.4}
              transparent
              opacity={0.85}
              roughness={0.1}
            />
          </mesh>
          {/* Support Trees */}
          {[-0.025, 0.025].flatMap((x) =>
            [-0.02, 0.02].map((z, j) => (
              <mesh key={`${x}-${z}`} position={[x, 0.025, z]}>
                <cylinderGeometry args={[0.0015, 0.0015, 0.035, 6]} />
                <meshStandardMaterial color="#34d399" transparent opacity={0.7} />
              </mesh>
            )),
          )}
        </group>
      </group>

      {/* 5. UV-Blocking Amber/Orange Acrylic Hood Cover (Bright & Translucent) */}
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[0.25, 0.36, 0.25]} />
        <meshStandardMaterial
          color="#fb923c"
          transparent
          opacity={0.3}
          roughness={0.06}
          metalness={0.1}
        />
      </mesh>
      {/* Top Handle on UV Hood */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.06, 0.016, 0.025]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// CURVED CAD / SLICING WORKSTATION
// -------------------------------------------------------------

function SlicerWorkstation({ position }: { position: [number, number, number] }) {
  const slicerTex = useMemo(() => makeSlicerScreenTexture(), []);

  return (
    <group position={position}>
      {/* Articulated Gas-Spring Monitor Desk Clamp Arm */}
      <mesh position={[0, 0.08, -0.18]}>
        <cylinderGeometry args={[0.025, 0.03, 0.16, 12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.22, -0.14]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.025, 0.16, 0.025]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* 34-Inch Ultrawide 21:9 Curved Display (Silver/White Slim Bezel) */}
      <group position={[0, 0.3, -0.06]}>
        {/* Display Frame / Bezel */}
        <mesh castShadow>
          <boxGeometry args={[0.54, 0.28, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.25} metalness={0.6} />
        </mesh>
        {/* Screen Display Pane */}
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.528, 0.268]} />
          <meshStandardMaterial
            map={slicerTex}
            emissive="#ffffff"
            emissiveMap={slicerTex}
            emissiveIntensity={0.65}
            roughness={0.1}
          />
        </mesh>
        {/* Subtle Ambient LED Bias Light Bar Behind Monitor */}
        <mesh position={[0, 0, -0.012]}>
          <boxGeometry args={[0.48, 0.01, 0.006]} />
          <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Extended Felt Desk Mat (Light Silver Gray) */}
      <mesh position={[0, 0.005, 0.04]} receiveShadow>
        <boxGeometry args={[0.52, 0.006, 0.28]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>

      {/* Compact Mechanical Backlit Keyboard (White Chassis) */}
      <group position={[-0.05, 0.012, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.26, 0.014, 0.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Keycap Glow Line */}
        <mesh position={[0, 0.008, 0]}>
          <boxGeometry args={[0.245, 0.004, 0.088]} />
          <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Ergonomic Precision Mouse */}
      <mesh position={[0.15, 0.016, 0.06]} castShadow>
        <boxGeometry args={[0.045, 0.02, 0.075]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Compact Workstation Tower (Modern Arctic White ITX) */}
      <group position={[0.26, 0.14, -0.1]} castShadow>
        <mesh>
          <boxGeometry args={[0.11, 0.28, 0.22]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.25} />
        </mesh>
        {/* Tempered Glass Side Window */}
        <mesh position={[-0.056, 0, 0]}>
          <planeGeometry args={[0.2, 0.25]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={0.35} />
        </mesh>
        {/* Glowing RGB Fan Ring Inside */}
        <mesh position={[0, 0.03, -0.02]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.038, 0.005, 8, 16]} />
          <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// INDUSTRIAL MAKER WALL PEGBOARD & TOOL ORGANIZER
// -------------------------------------------------------------

function PegboardPins() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => new THREE.CylinderGeometry(0.004, 0.004, 0.006, 8), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#94a3b8", roughness: 0.4, metalness: 0.2 }), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let col = 0; col < 14; col++) {
      for (let row = 0; row < 6; row++) {
        dummy.position.set(-0.75 + col * 0.115, -0.32 + row * 0.13, 0.012);
        dummy.rotation.set(Math.PI / 2, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return <instancedMesh ref={meshRef} args={[geo, mat, 84]} />;
}

function MakerspaceToolPegboard({ position }: { position: [number, number, number] }) {
  const dryboxTex = useMemo(() => makeDryboxOledTexture(), []);

  return (
    <group position={position}>
      {/* 1. Clean Light Anodized Metal Pegboard Panel */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[1.7, 0.85, 0.015]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Pegboard Edge Frame in Brushed Aluminum */}
      <mesh position={[0, 0, 0.008]}>
        <boxGeometry args={[1.72, 0.87, 0.008]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Regular array of laser-cut peg holes (Light Silver) */}
      <PegboardPins />

      {/* 2. Hanging Tools on Peg Hooks */}
      {/* Precision Flush Cutters (Blue Handles) */}
      <group position={[-0.55, 0.14, 0.025]}>
        {[-0.016, 0.016].map((x, i) => (
          <mesh key={i} position={[x, 0.02, 0]} rotation={[0, 0, i === 0 ? 0.25 : -0.25]}>
            <boxGeometry args={[0.014, 0.09, 0.012]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} />
          </mesh>
        ))}
        {/* Steel Cutting Jaws */}
        <mesh position={[0, -0.045, 0]}>
          <boxGeometry args={[0.025, 0.035, 0.008]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Digital Vernier Calipers */}
      <group position={[-0.32, 0.1, 0.025]}>
        {/* Main Caliper Beam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.024, 0.22, 0.006]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Fixed Jaws */}
        <mesh position={[0.02, 0.1, 0]}>
          <boxGeometry args={[0.04, 0.016, 0.006]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Digital LCD Readout Box */}
        <mesh position={[0, 0.04, 0.006]}>
          <boxGeometry args={[0.045, 0.05, 0.012]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.04, 0.013]}>
          <planeGeometry args={[0.035, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Palette Knife / Bed Scraper */}
      <group position={[-0.12, 0.12, 0.025]}>
        {/* Wooden Handle */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.018, 0.08, 0.014]} />
          <meshStandardMaterial color="#854d0e" roughness={0.6} />
        </mesh>
        {/* Flexible Stainless Steel Blade */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[0.035, 0.11, 0.003]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Hex Wrench / Allen Key Set in Red Holder */}
      <group position={[0.1, 0.12, 0.025]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.07, 0.08, 0.02]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        {/* 5 Graduated L-Keys */}
        {[-0.024, -0.012, 0, 0.012, 0.024].map((x, i) => (
          <mesh key={i} position={[x, 0.03 + i * 0.008, 0.008]}>
            <cylinderGeometry args={[0.0025, 0.0025, 0.08 + i * 0.015, 6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Brass Nozzle Cleaning Wire Brush */}
      <group position={[0.28, 0.13, 0.025]}>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.014, 0.09, 0.01]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <boxGeometry args={[0.02, 0.05, 0.012]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* 3. Horizontal Filament Spool Wall Rack (3 Spools) */}
      <group position={[0.55, 0.08, 0.06]}>
        {/* Chrome Support Rod */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.36, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        {/* Mounting Brackets */}
        {[-0.17, 0.17].map((x, i) => (
          <mesh key={i} position={[x, 0, -0.035]}>
            <boxGeometry args={[0.014, 0.04, 0.07]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        ))}
        {/* 3 Spools: Matte Black, Sunset Orange, Lime Green */}
        {[-0.1, 0, 0.1].map((x, i) => {
          const colors = ["#0f172a", "#f97316", "#84cc16"];
          return (
            <group key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.065, 0.065, 0.042, 18]} />
                <meshStandardMaterial color={colors[i]} roughness={0.4} />
              </mesh>
              {[-0.022, 0.022].map((sy, j) => (
                <mesh key={j} position={[0, sy, 0]}>
                  <cylinderGeometry args={[0.072, 0.072, 0.004, 18]} />
                  <meshStandardMaterial color="#cbd5e1" transparent opacity={0.65} />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>

      {/* 4. Digital Thermo-Hygrometer Display on Pegboard */}
      <group position={[-0.55, -0.22, 0.025]}>
        <mesh>
          <boxGeometry args={[0.13, 0.08, 0.016]} />
          <meshStandardMaterial color="#020617" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.009]}>
          <planeGeometry args={[0.12, 0.07]} />
          <meshStandardMaterial
            map={dryboxTex}
            emissive="#ffffff"
            emissiveMap={dryboxTex}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// FINISHED PRINT ARTIFACT TOWER & SAMPLES (REPLACING OLD SHELF)
// -------------------------------------------------------------

function PrintArtifactGalleryTower({ position }: { position: [number, number, number] }) {
  const planetaryRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (planetaryRef.current) planetaryRef.current.rotation.y += delta * 1.2;
  });

  return (
    <group position={position}>
      {/* Modern Black Steel Shelf Frame */}
      {/* 4 Upright Corner Pillars */}
      {[
        [-0.2, -0.16],
        [0.2, -0.16],
        [-0.2, 0.16],
        [0.2, 0.16],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.65, z]} castShadow>
          <boxGeometry args={[0.02, 1.3, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.25} />
        </mesh>
      ))}

      {/* 4 Frosted Glass Shelves with LED Edge Lights */}
      {[0.12, 0.45, 0.8, 1.15].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.015, 0.34]} />
            <meshStandardMaterial
              color="#e0f2fe"
              transparent
              opacity={0.6}
              roughness={0.15}
              metalness={0.2}
            />
          </mesh>
          {/* Cyan LED Edge Glow Strip Under Shelf */}
          <mesh position={[0, -0.01, 0]}>
            <boxGeometry args={[0.4, 0.004, 0.32]} />
            <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}

      {/* ---------------- SHELF CONTENT ---------------- */}

      {/* TIER 4 (Top Y = 1.15): Kinetic Planetary Gear Bearing & Orange Benchy */}
      <group position={[-0.09, 1.17, 0]}>
        <BenchyBoatModel position={[0, 0, 0]} color="#f97316" scale={1.2} />
      </group>
      {/* Kinetic Planetary Gear Bearing */}
      <group ref={planetaryRef} position={[0.09, 1.21, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.045, 0.01, 10, 20]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.35} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.016, 0.016, 0.018, 12]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* TIER 3 (Mid-High Y = 0.8): Complex Voronoi Spiral Emerald Vase */}
      <group position={[-0.08, 0.81, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.038, 0.022, 0.16, 16]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.25}
            transparent
            opacity={0.8}
            roughness={0.15}
          />
        </mesh>
      </group>
      {/* Articulated Multi-Segment Flexi Dragon / Lizard in Silk Gold */}
      <group position={[0.08, 0.82, 0]}>
        {[-0.04, -0.02, 0, 0.02, 0.04].map((z, k) => (
          <mesh key={k} position={[Math.sin(k * 0.9) * 0.015, 0, z]}>
            <capsuleGeometry args={[0.012 - k * 0.0015, 0.02, 4, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* TIER 2 (Mid-Low Y = 0.45): Calibration XYZ 20mm Test Cubes & Infill Swatches */}
      {[-0.1, 0, 0.1].map((x, idx) => {
        const colors = ["#ef4444", "#3b82f6", "#22c55e"];
        return (
          <group key={idx} position={[x, 0.47, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.045, 0.045, 0.045]} />
              <meshStandardMaterial color={colors[idx]} roughness={0.4} />
            </mesh>
          </group>
        );
      })}

      {/* TIER 1 (Bottom Y = 0.12): Filament Swatch Deck Cards */}
      <group position={[0, 0.14, 0]}>
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.26, 0.03, 0.18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Sample Swatches */}
        {[-0.08, -0.03, 0.03, 0.08].map((x, idx) => {
          const colors = ["#f43f5e", "#0ea5e9", "#eab308", "#10b981"];
          return (
            <mesh key={idx} position={[x, 0.035, 0]}>
              <boxGeometry args={[0.018, 0.03, 0.12]} />
              <meshStandardMaterial color={colors[idx]} roughness={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* Modern Floor Indoor Potted Monstera Plant beside the tower */}
      <group position={[0, 0, 0.38]}>
        {/* White Ceramic Cylinder Pot */}
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.075, 0.22, 18]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.02, 16]} />
          <meshStandardMaterial color="#3f2e18" roughness={0.9} />
        </mesh>
        {/* Arching Glossy Green Leaves */}
        {[-0.6, 0, 0.6, 1.8, 3.2].map((rot, i) => (
          <group key={i} rotation={[0.3, rot, -0.2]}>
            <mesh position={[0.06, 0.32 + i * 0.03, 0]} castShadow>
              <sphereGeometry args={[0.055, 6, 6]} />
              <meshStandardMaterial color="#15803d" roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// COMPLETE ZONE 2 3D PRINTING & RAPID PROTOTYPING SHOWCASE
// -------------------------------------------------------------

export function Zone2PrintShowcase() {
  const bannerTex = useMemo(() => makeZone2BannerTexture(), []);

  return (
    <group position={[-1.85, 0, -3.55]}>
      {/* -------------------------------------------------------------
          1. ARCHITECTURAL WALL CLADDING & OVERHEAD LAB SIGN
          ------------------------------------------------------------- */}
      <group position={[0, 1.85, -0.58]}>
        {/* Clean Light Architectural Back Wall Panel */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.0, 1.15]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.5} />
        </mesh>
        {/* Cyan Glowing Accent Border */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[2.02, 1.17]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* High-Impact Overhead Lab Banner Sign */}
        <mesh position={[0, 0.28, 0.012]}>
          <planeGeometry args={[1.92, 0.44]} />
          <meshStandardMaterial
            map={bannerTex}
            emissive="#ffffff"
            emissiveMap={bannerTex}
            emissiveIntensity={0.28}
            roughness={0.45}
          />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          2. MAKERSPACE WALL PEGBOARD & TOOL ORGANIZER (Below Banner)
          ------------------------------------------------------------- */}
      <MakerspaceToolPegboard position={[0.05, 1.15, -0.57]} />

      {/* -------------------------------------------------------------
          3. HEAVY-DUTY INDUSTRIAL WORKBENCH (Blonde Birch & White/Silver Frame)
          ------------------------------------------------------------- */}
      <group position={[0, 0, 0]}>
        {/* Bright Blonde Scandinavian Birch Tabletop (W: 1.95m, D: 0.72m, H: 0.74m) */}
        <mesh position={[0.05, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.95, 0.045, 0.72]} />
          <meshStandardMaterial
            color="#ebd5b3"
            roughness={0.35}
            metalness={0.04}
          />
        </mesh>
        {/* Front Edge Chamfer Accent Strip in Satin Aluminum */}
        <mesh position={[0.05, 0.738, 0.36]}>
          <boxGeometry args={[1.94, 0.01, 0.008]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Clean White Powder-Coated Aluminum Legs */}
        {[
          [-0.85, -0.3],
          [0.95, -0.3],
          [-0.85, 0.3],
          [0.95, 0.3],
        ].map(([x, z], i) => (
          <group key={i} position={[x, 0.36, z]}>
            <mesh castShadow>
              <boxGeometry args={[0.05, 0.72, 0.05]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.25} roughness={0.3} />
            </mesh>
            {/* Chrome Adjustable Leveling Foot */}
            <mesh position={[0, -0.36, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.015, 12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>
        ))}

        {/* Cross-Bracing Frame Struts in Satin Silver */}
        <mesh position={[0.05, 0.15, -0.3]} castShadow>
          <boxGeometry args={[1.8, 0.03, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
        </mesh>
        {[-0.85, 0.95].map((x, i) => (
          <mesh key={i} position={[x, 0.15, 0]}>
            <boxGeometry args={[0.03, 0.03, 0.58]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Ambient Neon Cyan LED Light Bar Behind Table Lip */}
        <mesh position={[0.05, 0.75, -0.35]}>
          <boxGeometry args={[1.85, 0.01, 0.015]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>

        {/* ---------------- EQUIPMENT ON BENCH ---------------- */}

        {/* 1. Flagship CoreXY FDM Printer (Bambu X1-C Style with AMS) */}
        <FlagshipCoreXyPrinter position={[-0.42, 0.765, 0.02]} phase={0} />

        {/* 2. Precision SLA Resin 3D Printer */}
        <PrecisionResinPrinter position={[0.16, 0.765, 0.02]} />

        {/* 3. Slicing & CAD Workstation */}
        <SlicerWorkstation position={[0.68, 0.765, 0.04]} />

        {/* 4. Benchtop Accessories: IPA Bottle & Microfiber Cloth */}
        <group position={[-0.08, 0.765, 0.18]}>
          {/* IPA Spray Bottle (Translucent White with Blue Trigger) */}
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.022, 0.025, 0.12, 14]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} transparent opacity={0.85} />
          </mesh>
          <mesh position={[0, 0.125, 0]}>
            <boxGeometry args={[0.02, 0.025, 0.035]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, 0.13, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.025, 8]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          {/* Folded Microfiber Cloth */}
          <mesh position={[0.05, 0.008, 0]}>
            <boxGeometry args={[0.065, 0.016, 0.065]} />
            <meshStandardMaterial color="#eab308" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* -------------------------------------------------------------
          4. ARTIFACT GALLERY & SAMPLES TOWER (Left of Workbench)
          ------------------------------------------------------------- */}
      <PrintArtifactGalleryTower position={[-1.18, 0, 0.02]} />
    </group>
  );
}
