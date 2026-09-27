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

// 1. PyTorch Deep Learning Training Dashboard Screen Texture
function makePyTorchDashboardTexture() {
  return createTextCanvas(640, 400, (ctx, w, h) => {
    // Deep dark titanium dashboard background
    ctx.fillStyle = "#070b14";
    ctx.fillRect(0, 0, w, h);

    // Header Bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, 44);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 44);
    ctx.lineTo(w, 44);
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 15px 'Outfit', sans-serif, system-ui";
    ctx.fillText("AVP NEURAL TRAINING BENCHMARK // PYTORCH 2.5", 18, 28);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 12px monospace";
    ctx.fillText("● TRAINING IN PROGRESS · EPOCH 184/200", 350, 28);

    // Top Metric KPI Cards
    const kpis = [
      { label: "TRAIN LOSS", val: "0.0421", col: "#22c55e", x: 18, w: 140 },
      { label: "VAL ACCURACY", val: "98.74%", col: "#38bdf8", x: 170, w: 140 },
      { label: "GPU VRAM", val: "18.4 / 24 GB", col: "#f59e0b", x: 322, w: 145 },
      { label: "GPU TEMP", val: "62°C (315W)", col: "#a855f7", x: 479, w: 143 },
    ];

    kpis.forEach((k) => {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(k.x, 56, k.w, 54);
      ctx.strokeStyle = "#334155";
      ctx.strokeRect(k.x, 56, k.w, 54);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 10px monospace";
      ctx.fillText(k.label, k.x + 12, 74);

      ctx.fillStyle = k.col;
      ctx.font = "bold 16px monospace";
      ctx.fillText(k.val, k.x + 12, 98);
    });

    // Main Left Area: Training Loss Curve Chart
    const gx = 18;
    const gy = 124;
    const gw = 380;
    const gh = 220;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = "#1e293b";
    ctx.strokeRect(gx, gy, gw, gh);

    // Chart grid
    ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
    ctx.lineWidth = 1;
    for (let y = gy + 30; y < gy + gh; y += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, y);
      ctx.lineTo(gx + gw, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("LOSS CURVE (CROSS-ENTROPY)", gx + 14, gy + 22);

    // Decaying Loss Curve (Vivid Neon Emerald)
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < gw - 40; x++) {
      const prog = x / (gw - 40);
      const val = 1.8 * Math.exp(-prog * 4.2) + 0.08 + Math.sin(prog * 30) * 0.02;
      const py = gy + gh - 20 - val * (gh - 60);
      if (x === 0) ctx.moveTo(gx + 20 + x, py);
      else ctx.lineTo(gx + 20 + x, py);
    }
    ctx.stroke();

    // Validation Loss Curve (Electric Cyan)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let x = 0; x < gw - 40; x++) {
      const prog = x / (gw - 40);
      const val = 1.9 * Math.exp(-prog * 3.8) + 0.12 + Math.cos(prog * 25) * 0.03;
      const py = gy + gh - 20 - val * (gh - 60);
      if (x === 0) ctx.moveTo(gx + 20 + x, py);
      else ctx.lineTo(gx + 20 + x, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Right Area: Neural Architecture Layers
    const rx = 414;
    const rw = 208;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(rx, gy, rw, gh);
    ctx.strokeStyle = "#1e293b";
    ctx.strokeRect(rx, gy, rw, gh);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("LAYER PROFILE", rx + 14, gy + 22);

    const layers = [
      ["Input (RGB-D)", "224x224x4", "#38bdf8"],
      ["Conv2D + BatchNorm", "64 filters", "#93c5fd"],
      ["ResBlock x4", "Residual Add", "#c084fc"],
      ["Self-Attention", "8 Heads", "#f43f5e"],
      ["Dense Linear", "1000 Classes", "#22c55e"],
    ];

    layers.forEach(([lName, lDim, col], i) => {
      const ly = gy + 38 + i * 34;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(rx + 10, ly, rw - 20, 28);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "10px monospace";
      ctx.fillText(lName, rx + 16, ly + 18);

      ctx.fillStyle = col;
      ctx.font = "bold 10px monospace";
      ctx.fillText(lDim, rx + 120, ly + 18);
    });

    // Bottom Footer
    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.fillText("LEARNING RATE: 1e-4 · OPTIMIZER: AdamW (weight_decay=0.01) · AMP: FP16 MIXED PRECISION", 18, h - 14);
  });
}

// 2. Zone 8 Overhead Lightbox Banner Texture
function makeZone8BannerTexture() {
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
    ctx.fillText("ZONE 08 // EDGE AI & DEEP LEARNING COMPUTE CLUSTER", 38, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
    ctx.fillText("ARTIFICIAL INTELLIGENCE & NEURAL LAB", 38, 98);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px 'Outfit', sans-serif, system-ui";
    ctx.fillText("PyTorch & TensorRT Accelerators · High-Density GPU Rack · Edge AI Jetson Orin Nodes", 38, 134);

    const cards = [
      { label: "GPU ACCEL", text: "4x TENSOR CORES", color: "#38bdf8", x: 38, w: 220 },
      { label: "PYTORCH STACK", text: "CUDA 12.6 MIXED-FP16", color: "#22c55e", x: 274, w: 210 },
      { label: "EDGE INFERENCE", text: "JETSON 275 TOPS", color: "#f59e0b", x: 500, w: 220 },
      { label: "LATENCY TARGET", text: "3.2ms REALTIME", color: "#a855f7", x: 736, w: 248 },
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
// COMPLETE ZONE 8 SHOWCASE COMPONENT
// -------------------------------------------------------------

export function Zone8AIServerShowcase({ vision }: { vision?: THREE.Texture }) {
  const pytorchTex = useMemo(() => makePyTorchDashboardTexture(), []);
  const bannerTex = useMemo(() => makeZone8BannerTexture(), []);

  return (
    <group position={[2.55, 0, 2.55]}>
      {/* 1. Architectural Back Wall Cladding & Overhead Lightbox Banner */}
      <group position={[0, 1.95, -0.58]}>
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

      {/* 2. 19" Half-Rack AI GPU Server Cabinet (Left Side) */}
      <group position={[-0.88, 0, -0.05]}>
        {/* Steel Cabinet Enclosure (Sleek Matte Obsidian) */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[0.55, 1.3, 0.65]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Tinted Tempered Glass Front Door */}
        <mesh position={[0, 0.65, 0.33]}>
          <planeGeometry args={[0.5, 1.2]} />
          <meshStandardMaterial color="#0284c7" transparent opacity={0.35} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Blue Perimeter LED Rack Strip */}
        <mesh position={[0, 0.65, 0.325]}>
          <boxGeometry args={[0.48, 1.18, 0.01]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Rack Sled 1: 4U High-Density GPU Compute Node */}
        <group position={[0, 0.85, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.46, 0.18, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} />
          </mesh>
          {/* Front Bezel Hexagonal Honeycomb Ventilation */}
          <mesh position={[0, 0, 0.201]}>
            <planeGeometry args={[0.44, 0.16]} />
            <meshStandardMaterial color="#090d16" metalness={0.8} />
          </mesh>
          {/* Array of Blinking Activity LEDs (NVIDIA Tensor Green & Cyan) */}
          {[-0.15, -0.05, 0.05, 0.15].map((lx, i) => (
            <mesh key={i} position={[lx, 0.04, 0.203]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#22c55e" : "#38bdf8"}
                emissive={i % 2 === 0 ? "#22c55e" : "#38bdf8"}
                emissiveIntensity={1}
              />
            </mesh>
          ))}
        </group>

        {/* Rack Sled 2: 2U 10GbE Fiber Switch with RJ45 Ports */}
        <group position={[0, 0.6, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.46, 0.08, 0.4]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          {/* Glowing Green RJ45 Activity Bar */}
          <mesh position={[0, 0, 0.201]}>
            <planeGeometry args={[0.4, 0.03]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Rack Sled 3: Power Distribution Unit (PDU) */}
        <group position={[0, 0.4, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.46, 0.08, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
          {/* Red LED Digital Voltage Display (230.4 V) */}
          <mesh position={[0.1, 0, 0.201]}>
            <planeGeometry args={[0.08, 0.03]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
          </mesh>
        </group>
      </group>

      {/* 3. Scandinavian Blonde Birch Developer Desk (Right Side) */}
      <group position={[0.4, 0, -0.05]}>
        {/* Blonde Birch Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.045, 0.8]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.4} />
        </mesh>
        {/* Edge Trim */}
        <mesh position={[0, 0.725, 0]}>
          <boxGeometry args={[1.52, 0.02, 0.82]} />
          <meshStandardMaterial color="#dfc49f" roughness={0.5} />
        </mesh>
        {/* White Powder-Coated Legs */}
        {[-0.68, 0.68].flatMap((x) =>
          [-0.34, 0.34].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.36, z]} castShadow>
              <cylinderGeometry args={[0.022, 0.022, 0.72, 12]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.7} />
            </mesh>
          )),
        )}

        {/* A. Ultrawide 34" Curved Developer Monitor (PyTorch Dashboard) */}
        <group position={[-0.15, 0.765, -0.06]}>
          {/* Heavy Anodized Aluminum Stand */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.02, 0.025, 0.24, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.005, 0.04]}>
            <boxGeometry args={[0.2, 0.01, 0.14]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          {/* Monitor Enclosure */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.68, 0.38, 0.03]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* Active PyTorch Training Screen */}
          <mesh position={[0, 0.3, 0.016]}>
            <planeGeometry args={[0.65, 0.35]} />
            <meshStandardMaterial
              map={pytorchTex}
              emissive="#ffffff"
              emissiveMap={pytorchTex}
              emissiveIntensity={0.65}
              roughness={0.2}
              polygonOffset
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
            />
          </mesh>
        </group>

        {/* B. Secondary Portrait/Coding Monitor (Right) */}
        <group position={[0.45, 0.765, -0.04]} rotation={[0, -0.25, 0]}>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.018, 0.02, 0.28, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.32, 0]} castShadow>
            <boxGeometry args={[0.3, 0.46, 0.025]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.32, 0.014]}>
            <planeGeometry args={[0.27, 0.43]} />
            <meshStandardMaterial
              color="#091326"
              emissive="#00b4d8"
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* C. Edge AI Hardware Suite: NVIDIA Jetson AGX Orin & Raspberry Pi 5 */}
        <group position={[-0.55, 0.77, 0.18]}>
          {/* Acrylic Display Riser */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.26, 0.01, 0.16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.6} metalness={0.3} />
          </mesh>
          {/* Jetson AGX Orin Aluminum Heatsink Block */}
          <group position={[-0.05, 0.04, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.1, 0.035, 0.1]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Center Cooling Fan Grille */}
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.005, 16]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} />
            </mesh>
            {/* Glowing Green NVIDIA Tensor Status LED */}
            <mesh position={[0.045, 0.01, 0.045]}>
              <sphereGeometry args={[0.004, 6, 6]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
            </mesh>
          </group>

          {/* Raspberry Pi 5 Developer Board */}
          <group position={[0.07, 0.03, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.07, 0.012, 0.05]} />
              <meshStandardMaterial color="#15803d" roughness={0.4} />
            </mesh>
            {/* Silver SoC Heatsink */}
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.02, 0.008, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* D. Ergonomic Mesh Office Task Chair */}
        <group position={[0, 0, 0.6]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.46, 0]} castShadow>
            <boxGeometry args={[0.42, 0.05, 0.42]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.74, -0.18]} castShadow>
            <boxGeometry args={[0.4, 0.44, 0.03]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.23, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.44, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Dramatic Overhead Spotlight */}
      <spotLight
        position={[0, 2.4, 0.5]}
        target-position={[0, 0.7, 0]}
        color="#38bdf8"
        intensity={1.8}
        distance={4.2}
        angle={0.6}
        penumbra={0.35}
      />
    </group>
  );
}
