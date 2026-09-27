import { useMemo } from "react";
import * as THREE from "three";

// Helper for high-DPI canvas textures
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

// 1. Live Vision AI Interactive Wall Screen Texture
function makeVisionAiScreenTexture() {
  return createTextCanvas(1280, 720, (ctx, w, h) => {
    // Deep dark titanium background
    ctx.fillStyle = "#060a14";
    ctx.fillRect(0, 0, w, h);

    // Subtle digital matrix grid
    ctx.strokeStyle = "rgba(14, 165, 233, 0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Top Header Bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, 56);
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 56);
    ctx.lineTo(w, 56);
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 20px 'Outfit', sans-serif, system-ui";
    ctx.fillText("AVP VISION AI · YASHWANTRAO BHONSALE INTL SCHOOL", 28, 36);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 13px monospace";
    ctx.fillText("● YBIS NODE-01", 600, 36);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px monospace";
    ctx.fillText("60 FPS · CBSE 1130979 · GPU 38%", 750, 36);

    // Left Main Viewport: Live Camera Feed with Object Detection Bounding Boxes
    const vpX = 28;
    const vpY = 80;
    const vpW = 800;
    const vpH = 520;

    ctx.fillStyle = "#0a101f";
    ctx.fillRect(vpX, vpY, vpW, vpH);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.strokeRect(vpX, vpY, vpW, vpH);

    // Camera simulated room view wireframe
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(vpX + 40, vpY + 40, vpW - 80, vpH - 80);

    // Detected Object 1: Person (Student Engineer)
    const b1X = vpX + 80;
    const b1Y = vpY + 70;
    const b1W = 220;
    const b1H = 400;

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.strokeRect(b1X, b1Y, b1W, b1H);

    // Corner brackets
    ctx.lineWidth = 5;
    [
      [b1X, b1Y, 20, 0, 0, 20],
      [b1X + b1W, b1Y, -20, 0, 0, 20],
      [b1X, b1Y + b1H, 20, 0, 0, -20],
      [b1X + b1W, b1Y + b1H, -20, 0, 0, -20],
    ].forEach(([x, y, dx1, dy1, dx2, dy2]) => {
      ctx.beginPath();
      ctx.moveTo(x + dx1, y + dy1);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dx2, y + dy2);
      ctx.stroke();
    });

    // Label tag
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(b1X, b1Y - 26, 150, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("PERSON: 98.4%", b1X + 8, b1Y - 8);

    // Pose Landmarks (Skeletal Keypoints)
    ctx.fillStyle = "#22c55e";
    const keypoints = [
      [b1X + 110, b1Y + 40], // Head
      [b1X + 110, b1Y + 90], // Neck
      [b1X + 60, b1Y + 110], // L Shoulder
      [b1X + 160, b1Y + 110], // R Shoulder
      [b1X + 40, b1Y + 190], // L Elbow
      [b1X + 180, b1Y + 190], // R Elbow
      [b1X + 30, b1Y + 260], // L Hand
      [b1X + 190, b1Y + 250], // R Hand
      [b1X + 80, b1Y + 230], // L Hip
      [b1X + 140, b1Y + 230], // R Hip
    ];
    keypoints.forEach(([kx, ky]) => {
      ctx.beginPath();
      ctx.arc(kx, ky, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    // Skeleton Bones
    ctx.strokeStyle = "rgba(34, 197, 94, 0.7)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(keypoints[0][0], keypoints[0][1]);
    ctx.lineTo(keypoints[1][0], keypoints[1][1]);
    ctx.lineTo(keypoints[2][0], keypoints[2][1]);
    ctx.lineTo(keypoints[4][0], keypoints[4][1]);
    ctx.lineTo(keypoints[6][0], keypoints[6][1]);
    ctx.moveTo(keypoints[1][0], keypoints[1][1]);
    ctx.lineTo(keypoints[3][0], keypoints[3][1]);
    ctx.lineTo(keypoints[5][0], keypoints[5][1]);
    ctx.lineTo(keypoints[7][0], keypoints[7][1]);
    ctx.stroke();

    // Detected Object 2: Bionic Robot Hand / Hardware
    const b2X = vpX + 440;
    const b2Y = vpY + 180;
    const b2W = 280;
    const b2H = 260;

    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3;
    ctx.strokeRect(b2X, b2Y, b2W, b2H);

    ctx.fillStyle = "#ea580c";
    ctx.fillRect(b2X, b2Y - 26, 185, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("BIONIC_ARM: 96.1%", b2X + 8, b2Y - 8);

    // Hand Landmark Mesh
    ctx.strokeStyle = "rgba(249, 115, 22, 0.6)";
    ctx.lineWidth = 2;
    for (let f = 0; f < 5; f++) {
      ctx.beginPath();
      ctx.moveTo(b2X + 140, b2Y + 180);
      ctx.lineTo(b2X + 60 + f * 40, b2Y + 60);
      ctx.stroke();
    }

    // Right Sidebar: Real-Time Analytics & Classification Feed
    const sbX = 850;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(sbX, vpY, 400, vpH);
    ctx.strokeStyle = "#1e293b";
    ctx.strokeRect(sbX, vpY, 400, vpH);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
    ctx.fillText("DETECTION TELEMETRY", sbX + 20, vpY + 36);

    const detections = [
      ["STUDENT_RESEARCHER", "98.4%", "#38bdf8"],
      ["BIONIC_PROSTHETIC", "96.1%", "#f97316"],
      ["GESTURE_PINCH_ZOOM", "94.8%", "#22c55e"],
      ["FPV_DRONE_CHASSIS", "92.3%", "#a855f7"],
      ["SAFETY_EYEWEAR_OK", "99.1%", "#38bdf8"],
    ];

    detections.forEach(([label, conf, col], i) => {
      const dy = vpY + 70 + i * 52;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(sbX + 20, dy, 360, 42);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 14px monospace";
      ctx.fillText(label, sbX + 32, dy + 26);

      ctx.fillStyle = col;
      ctx.font = "bold 15px monospace";
      ctx.fillText(conf, sbX + 310, dy + 26);
    });

    // Depth Heatmap Mini Thumbnail
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(sbX + 20, vpY + 350, 360, 140);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText("STEREO DEPTH ESTIMATION MAP", sbX + 32, vpY + 375);

    // Simulated Depth Gradient
    const grad = ctx.createLinearGradient(sbX + 32, 0, sbX + 360, 0);
    grad.addColorStop(0, "#3b82f6");
    grad.addColorStop(0.5, "#a855f7");
    grad.addColorStop(1, "#f43f5e");
    ctx.fillStyle = grad;
    ctx.fillRect(sbX + 32, vpY + 390, 336, 85);

    // Bottom Status Bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, h - 50, w, 50);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px 'Outfit', sans-serif, system-ui";
    ctx.fillText("NEURAL BACKBONE: YOLOv11-LARGE · MEDIAPIPE MULTI-MODAL PIPELINE · STEREO RGB-D CAMERA", 28, h - 20);
  });
}

// 2. Zone 1 Overhead Lightbox Banner Texture
function makeZone1BannerTexture() {
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
    ctx.fillText("ZONE 01 // YBIS STEM & AI RESEARCH LAB", 38, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px 'Outfit', sans-serif, system-ui";
    ctx.fillText("VISION AI & INTERACTIVE SMART WALL", 38, 104);

    ctx.fillStyle = "#93c5fd";
    ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
    ctx.fillText("YASHWANTRAO BHONSALE INTERNATIONAL SCHOOL · CBSE CURRICULUM", 38, 148);

    const cards = [
      { text: "● 60 FPS LIVE INFERENCE", color: "#4ade80", border: "#22c55e", x: 38, w: 275 },
      { text: "● INTEL REALSENSE DEPTH", color: "#38bdf8", border: "#0284c7", x: 328, w: 295 },
      { text: "● JETSON ORIN CLUSTER", color: "#fbbf24", border: "#f59e0b", x: 638, w: 260 },
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
// COMPLETE ZONE 1 SHOWCASE COMPONENT
// -------------------------------------------------------------

export function Zone1VisionAiShowcase({ map }: { map?: THREE.Texture }) {
  const wallScreenTex = useMemo(() => makeVisionAiScreenTexture(), []);
  const bannerTex = useMemo(() => makeZone1BannerTexture(), []);

  return (
    <group position={[-4.15, 0, -3.55]}>
      {/* 1. Architectural Back Wall Cladding & Overhead Sign */}
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

      {/* 2. Large 85" Interactive Vision AI Smart Wall Display */}
      <group position={[0, 1.15, -0.54]}>
        {/* Ambient Backlight Halo (Behind chassis against the wall) */}
        <mesh position={[0, 0, -0.015]}>
          <boxGeometry args={[2.14, 1.29, 0.01]} />
          <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.6} />
        </mesh>

        {/* Sleek Dark Aluminum Frame Bezel */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.1, 1.25, 0.04]} />
          <meshStandardMaterial color="#0b1329" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Illuminated Perimeter Trim (Only around the border, not underneath screen) */}
        <mesh position={[0, 0.605, 0.021]}>
          <boxGeometry args={[2.06, 0.012, 0.004]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, -0.605, 0.021]}>
          <boxGeometry args={[2.06, 0.012, 0.004]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-1.025, 0, 0.021]}>
          <boxGeometry args={[0.012, 1.22, 0.004]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[1.025, 0, 0.021]}>
          <boxGeometry args={[0.012, 1.22, 0.004]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>

        {/* Main 4K Display Screen Face */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[2.02, 1.18]} />
          <meshStandardMaterial
            map={map || wallScreenTex}
            emissive="#ffffff"
            emissiveMap={map || wallScreenTex}
            emissiveIntensity={0.4}
            roughness={0.2}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>

        {/* Top Stereoscopic Intel RealSense RGB-D Depth Camera Bar */}
        <group position={[0, 0.65, 0.04]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.035, 0.04]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Dual Camera Lenses */}
          {[-0.08, 0, 0.08].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.009, 0.009, 0.006, 12]} />
              <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 3. Developer Vision AI Workstation Desk (Blonde Birch & White Frame) */}
      <group position={[0.05, 0, 0.55]}>
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.045, 0.64]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.35} metalness={0.04} />
        </mesh>
        {/* White Powder-Coated Aluminum Desk Legs */}
        {[
          [-0.58, -0.24],
          [0.58, -0.24],
          [-0.58, 0.24],
          [0.58, 0.24],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.36, z]} castShadow>
            <boxGeometry args={[0.045, 0.72, 0.045]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.25} />
          </mesh>
        ))}

        {/* Laptop Station on Desk */}
        <group position={[-0.15, 0.765, 0.04]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.012, 0.22]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Angled Laptop Display */}
          <group position={[0, 0.01, -0.1]} rotation={[-0.3, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.3, 0.19, 0.01]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.006]}>
              <planeGeometry args={[0.28, 0.17]} />
              <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
            </mesh>
          </group>
        </group>

        {/* Edge AI Nvidia Jetson Orin Accelerator Rig on Desk */}
        <group position={[0.42, 0.765, 0.04]} castShadow>
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.16, 0.06, 0.16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Black Aluminum Heatsink Fins */}
          {Array.from({ length: 8 }).map((_, f) => (
            <mesh key={f} position={[-0.05 + f * 0.014, 0.068, 0]}>
              <boxGeometry args={[0.005, 0.018, 0.14]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
          ))}
          {/* Glowing Green Nvidia AI Status LED */}
          <mesh position={[0, 0.04, 0.082]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.004, 8]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
          </mesh>
        </group>
      </group>

      {/* Ergonomic Office Task Chair */}
      <group position={[0.05, 0, 1.15]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.42, 0.05, 0.42]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.72, -0.18]} castShadow>
          <boxGeometry args={[0.4, 0.45, 0.04]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.44, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      </group>

      {/* Architectural Potted Plant */}
      <group position={[1.15, 0, 0.15]}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.26, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} />
        </mesh>
        {[-0.4, 0.2, 0.9, 1.8, 2.7].map((rot, i) => (
          <mesh key={i} position={[0.05 * Math.cos(rot), 0.35 + i * 0.04, 0.05 * Math.sin(rot)]} castShadow>
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshStandardMaterial color="#16a34a" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
