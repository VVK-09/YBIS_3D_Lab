import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Helper to create dynamic textures via 2D Canvas
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

// OLED Screen Graphic Texture
function makeOledTexture() {
  return createTextCanvas(256, 128, (ctx, w, h) => {
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, w, h);

    // Cyan glowing header
    ctx.fillStyle = "#06b6d4";
    ctx.font = "bold 18px monospace";
    ctx.fillText("IOT NODE 06 // ACTIVE", 14, 26);

    ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(14, 34);
    ctx.lineTo(w - 14, 34);
    ctx.stroke();

    // Sensor Readings
    ctx.fillStyle = "#38bdf8";
    ctx.font = "16px monospace";
    ctx.fillText("TEMP: 24.6 °C", 14, 60);
    ctx.fillText("HUM : 58.2 %RH", 14, 82);

    // Mini Waveform
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(140, 75);
    ctx.lineTo(160, 68);
    ctx.lineTo(180, 80);
    ctx.lineTo(200, 62);
    ctx.lineTo(220, 74);
    ctx.lineTo(240, 66);
    ctx.stroke();

    ctx.fillStyle = "#0284c7";
    ctx.font = "12px monospace";
    ctx.fillText("WIFI: CONNECTED  [88%]", 14, 110);

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(w - 22, 106, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Category Header Badge Textures
function makeCategoryTexture(title: string, subtitle: string) {
  return createTextCanvas(512, 96, (ctx, w, h) => {
    ctx.fillStyle = "#040812";
    ctx.fillRect(0, 0, w, h);

    // Glowing border
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);

    // Left accent block
    ctx.fillStyle = "#0ea5e9";
    ctx.fillRect(4, 4, 14, h - 8);

    // Main Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Outfit', sans-serif, system-ui";
    ctx.fillText(title, 28, 44);

    // Subtitle
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 17px 'Outfit', sans-serif, system-ui";
    ctx.fillText(subtitle, 28, 74);
  });
}

// Wall Sign Texture
function makeWallSignTexture() {
  return createTextCanvas(1024, 180, (ctx, w, h) => {
    ctx.fillStyle = "#070c18";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    ctx.fillStyle = "#0284c7";
    ctx.fillRect(36, 22, 160, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Outfit', sans-serif";
    ctx.fillText("AVP INNOVATION HUB", 48, 40);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 44px 'Outfit', sans-serif";
    ctx.fillText("ZONE 06 · IOT & EMBEDDED SYSTEMS LAB", 36, 104);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "18px 'Outfit', sans-serif";
    ctx.fillText("ORGANIZED COMPONENT KITS · SENSORS · MICROCONTROLLERS · ACTUATORS", 36, 144);
  });
}

// Front-facing Box Label Texture Generator (Large bold text like "IR SENSORS", "ESP 32")
function makeBoxLabelTexture(title: string, category: string, color: string = "#38bdf8") {
  return createTextCanvas(512, 160, (ctx, w, h) => {
    // Dark matte faceplate
    ctx.fillStyle = "#080e1a";
    ctx.fillRect(0, 0, w, h);

    // Glowing border
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    // Left category bar
    ctx.fillStyle = color;
    ctx.fillRect(4, 4, 14, h - 8);

    // Sub-header category tag
    ctx.fillStyle = color;
    ctx.font = "bold 18px 'Outfit', sans-serif, system-ui";
    ctx.fillText(category.toUpperCase(), 30, 36);

    // Main large bold label text (e.g. "ESP 32", "IR SENSORS")
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px 'Outfit', sans-serif, system-ui";
    ctx.fillText(title, 30, 88);

    // Bottom spec tag / inventory badge
    ctx.fillStyle = "rgba(226, 232, 240, 0.65)";
    ctx.font = "bold 14px monospace";
    ctx.fillText("AVP LAB KIT · VERIFIED INVENTORY", 30, 128);

    // Status indicator beacon
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(w - 28, 38, 7, 0, Math.PI * 2);
    ctx.fill();

    // Decorative technical barcode
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let x = 0; x < 40; x += 4) {
      ctx.fillRect(w - 65 + x, 75, x % 8 === 0 ? 3 : 1.5, 45);
    }
  });
}

// -------------------------------------------------------------
// COMPONENT KIT BOX STRUCTURE (Clean box with front label)
// -------------------------------------------------------------

export function ComponentKitBox({
  position,
  title,
  category,
  accentColor = "#38bdf8",
  children,
}: {
  position: [number, number, number];
  title: string;
  category: string;
  accentColor?: string;
  children?: React.ReactNode;
}) {
  const labelTex = useMemo(
    () => makeBoxLabelTexture(title, category, accentColor),
    [title, category, accentColor],
  );

  // Box Dimensions:
  // Width along Z: 0.32m
  // Depth along X: 0.26m (front is +X)
  // Height Y: 0.09m
  const bw = 0.32;
  const bd = 0.26;
  const bh = 0.09;

  return (
    <group position={position}>
      {/* 1. Main Storage Box Base Body */}
      <mesh position={[0, bh / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bd, bh, bw]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* 2. Reinforced Bottom Bevel Rim */}
      <mesh position={[0, 0.008, 0]}>
        <boxGeometry args={[bd + 0.006, 0.016, bw + 0.006]} />
        <meshStandardMaterial color="#090d16" roughness={0.5} />
      </mesh>

      {/* 3. Front Faceplate with Crisp Glowing Label Text (facing +X towards camera) */}
      <mesh position={[bd / 2 + 0.001, bh / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[bw - 0.02, bh - 0.016]} />
        <meshStandardMaterial
          map={labelTex}
          emissive={accentColor}
          emissiveMap={labelTex}
          emissiveIntensity={0.65}
          roughness={0.15}
        />
      </mesh>

      {/* 4. Brushed Silver Industrial Front Latches */}
      {[-0.1, 0.1].map((z, i) => (
        <mesh key={i} position={[bd / 2 + 0.004, bh / 2, z]}>
          <boxGeometry args={[0.006, 0.03, 0.018]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* 5. Translucent Acrylic Top Display Lid */}
      <mesh position={[0, bh + 0.005, 0]} castShadow>
        <boxGeometry args={[bd - 0.015, 0.01, bw - 0.015]} />
        <meshStandardMaterial
          color="#e0f2fe"
          transparent
          opacity={0.35}
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* Top Lid Accent Edge Frame */}
      <mesh position={[0, bh + 0.006, 0]}>
        <boxGeometry args={[bd, 0.004, bw]} />
        <meshStandardMaterial color={accentColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* 6. Hardware Component Mounted On / In the Box */}
      {children && <group position={[0, bh + 0.01, 0]}>{children}</group>}
    </group>
  );
}

// -------------------------------------------------------------
// REALISTIC IOT HARDWARE 3D MODELS
// -------------------------------------------------------------

// IR Obstacle & Line Tracking Sensor Module
export function IrSensorModule({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Blue PCB */}
      <mesh position={[0, 0.006, 0]} castShadow>
        <boxGeometry args={[0.075, 0.004, 0.034]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.35} />
      </mesh>

      {/* Front IR Emitter LED (Purple / Clear 5mm) */}
      <mesh position={[0.04, 0.009, -0.008]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.0035, 0.0035, 0.008, 10]} />
        <meshStandardMaterial color="#c084fc" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.044, 0.009, -0.008]}>
        <sphereGeometry args={[0.0035, 10, 8]} />
        <meshStandardMaterial color="#e9d5ff" transparent opacity={0.9} emissive="#c084fc" emissiveIntensity={0.6} />
      </mesh>

      {/* Front IR Photodiode Receiver LED (Glossy Black 5mm) */}
      <mesh position={[0.04, 0.009, 0.008]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.0035, 0.0035, 0.008, 10]} />
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[0.044, 0.009, 0.008]}>
        <sphereGeometry args={[0.0035, 10, 8]} />
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* LM393 Comparator IC Chip */}
      <mesh position={[-0.002, 0.009, 0]}>
        <boxGeometry args={[0.014, 0.004, 0.018]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Blue Trimmer Potentiometer with Tuning Screw */}
      <mesh position={[-0.02, 0.011, 0]}>
        <boxGeometry args={[0.012, 0.008, 0.012]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[-0.02, 0.015, 0]}>
        <cylinderGeometry args={[0.0025, 0.0025, 0.002, 8]} />
        <meshStandardMaterial color="#ca8a04" metalness={0.9} />
      </mesh>

      {/* Status LEDs */}
      <mesh position={[0.01, 0.009, -0.008]}>
        <boxGeometry args={[0.003, 0.003, 0.003]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.01, 0.009, 0.008]}>
        <boxGeometry args={[0.003, 0.003, 0.003]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>

      {/* Gold Header Pins at back */}
      <mesh position={[-0.04, 0.006, 0]}>
        <boxGeometry args={[0.008, 0.002, 0.016]} />
        <meshStandardMaterial color="#ca8a04" metalness={0.9} />
      </mesh>
    </group>
  );
}

// Arduino Uno Rev4 / Rev3
export function ArduinoUno({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[-0.02, 0.035, 0]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[0.07, 0.08, 0.1]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      <group position={[0, 0.045, 0]} rotation={[0, 0, -0.42]}>
        {/* Teal Blue PCB */}
        <mesh castShadow>
          <boxGeometry args={[0.075, 0.005, 0.11]} />
          <meshStandardMaterial color="#008184" roughness={0.35} metalness={0.1} />
        </mesh>

        {/* ATmega328P DIP IC Chip */}
        <mesh position={[-0.005, 0.006, 0.015]} castShadow>
          <boxGeometry args={[0.018, 0.006, 0.055]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {[-0.012, 0.012].map((x, side) => (
          <mesh key={side} position={[x, 0.003, 0.015]}>
            <boxGeometry args={[0.004, 0.002, 0.052]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Silver USB-B Jack */}
        <mesh position={[-0.026, 0.009, -0.045]} castShadow>
          <boxGeometry args={[0.02, 0.014, 0.022]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Black DC Barrel Power Jack */}
        <mesh position={[0.022, 0.009, -0.045]} castShadow>
          <boxGeometry args={[0.022, 0.014, 0.026]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Female Header Strips */}
        <mesh position={[-0.033, 0.008, 0.005]} castShadow>
          <boxGeometry args={[0.006, 0.01, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <mesh position={[0.033, 0.008, 0.01]} castShadow>
          <boxGeometry args={[0.006, 0.01, 0.075]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Quartz Crystal Oscillator */}
        <mesh position={[-0.008, 0.006, -0.02]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.0025, 0.009, 4, 8]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Tactile Reset Button */}
        <mesh position={[-0.026, 0.009, -0.02]}>
          <cylinderGeometry args={[0.0025, 0.0025, 0.003, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} />
        </mesh>

        {/* Power LED */}
        <mesh position={[0.015, 0.005, -0.01]}>
          <boxGeometry args={[0.003, 0.003, 0.003]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[0.015, 0.005, 0.002]}>
          <boxGeometry args={[0.003, 0.003, 0.003]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// Raspberry Pi 5 / 4 Single Board Computer
export function RaspberryPiModel({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[-0.02, 0.035, 0]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[0.07, 0.08, 0.1]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      <group position={[0, 0.045, 0]} rotation={[0, 0, -0.42]}>
        {/* Dark Green PCB */}
        <mesh castShadow>
          <boxGeometry args={[0.076, 0.005, 0.11]} />
          <meshStandardMaterial color="#15803d" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Broadcom SoC Processor with Aluminum Finned Heatsink */}
        <mesh position={[-0.005, 0.008, -0.01]} castShadow>
          <boxGeometry args={[0.024, 0.008, 0.024]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
        </mesh>
        {[-0.008, -0.003, 0.002, 0.007].map((z, i) => (
          <mesh key={i} position={[-0.005, 0.014, -0.01 + z]}>
            <boxGeometry args={[0.022, 0.005, 0.0018]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}

        {/* Dual Stacked Silver USB 3.0 Ports (blue tabs) */}
        <mesh position={[-0.02, 0.013, 0.046]} castShadow>
          <boxGeometry args={[0.024, 0.018, 0.022]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.02, 0.013, 0.058]}>
          <boxGeometry args={[0.02, 0.012, 0.002]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>

        {/* Dual Stacked Silver USB 2.0 Ports */}
        <mesh position={[0.018, 0.013, 0.046]} castShadow>
          <boxGeometry args={[0.024, 0.018, 0.022]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Silver Gigabit Ethernet Port */}
        <mesh position={[-0.025, 0.012, -0.045]} castShadow>
          <boxGeometry args={[0.022, 0.016, 0.026]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.75} roughness={0.25} />
        </mesh>

        {/* 40-pin GPIO Header */}
        <mesh position={[0.032, 0.008, -0.005]}>
          <boxGeometry args={[0.008, 0.008, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>

        {/* Power & Activity LEDs */}
        <mesh position={[-0.03, 0.005, -0.048]}>
          <boxGeometry args={[0.002, 0.002, 0.002]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[-0.03, 0.005, -0.042]}>
          <boxGeometry args={[0.002, 0.002, 0.002]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ESP32 NodeMCU DevKit
export function Esp32Module({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[-0.015, 0.03, 0]} rotation={[0, 0, -0.42]}>
        <boxGeometry args={[0.055, 0.065, 0.075]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      <group position={[0, 0.04, 0]} rotation={[0, 0, -0.42]}>
        {/* Matte Black PCB */}
        <mesh castShadow>
          <boxGeometry args={[0.042, 0.004, 0.075]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} />
        </mesh>

        {/* Silver RF Metal Shield Can (ESP-WROOM-32) */}
        <mesh position={[0, 0.005, 0.008]} castShadow>
          <boxGeometry args={[0.026, 0.005, 0.03]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Meandered Gold PCB Antenna Trace */}
        <mesh position={[0, 0.003, -0.024]}>
          <boxGeometry args={[0.028, 0.001, 0.012]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Micro-USB Port */}
        <mesh position={[0, 0.005, 0.036]}>
          <boxGeometry args={[0.012, 0.006, 0.008]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>

        {/* Dual 15-pin Headers along edges */}
        <mesh position={[-0.018, 0.007, 0]}>
          <boxGeometry args={[0.004, 0.008, 0.065]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.018, 0.007, 0]}>
          <boxGeometry args={[0.004, 0.008, 0.065]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Glowing Blue Onboard LED */}
        <mesh position={[-0.008, 0.004, 0.028]}>
          <boxGeometry args={[0.002, 0.002, 0.002]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// Ultrasonic Distance Sensor (HC-SR04)
export function UltrasonicSensor({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.03, 0.03, 0.06]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      <group position={[0.015, 0.035, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.065, 0.03, 0.004]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.35} />
        </mesh>

        {/* Iconic Dual Transducer Eyes */}
        {[-0.018, 0.018].map((x, i) => (
          <group key={i} position={[x, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.018, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.0095, 0]}>
              <cylinderGeometry args={[0.009, 0.009, 0.001, 16]} />
              <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.6} />
            </mesh>
          </group>
        ))}

        <mesh position={[0, -0.008, 0.004]}>
          <boxGeometry args={[0.008, 0.004, 0.003]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.9} />
        </mesh>

        <mesh position={[0, -0.018, 0]}>
          <boxGeometry args={[0.016, 0.008, 0.002]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// PIR Motion Sensor (HC-SR501)
export function PirSensor({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.045, 0.004, 0.045]} />
        <meshStandardMaterial color="#15803d" roughness={0.4} />
      </mesh>

      {/* White Translucent Hemispherical Fresnel Dome Lens */}
      <mesh position={[0, 0.024, 0]}>
        <sphereGeometry args={[0.016, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} transparent opacity={0.88} />
      </mesh>

      {/* Dual Yellow/Orange Trimmer Potentiometers */}
      {[-0.012, 0.012].map((z, i) => (
        <mesh key={i} position={[-0.015, 0.016, z]}>
          <boxGeometry args={[0.008, 0.008, 0.008]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ESP32-CAM AI Vision Module with Camera
export function Esp32Cam({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.04, 0.04]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.3} roughness={0.1} />
      </mesh>

      <group position={[0.015, 0.038, 0]} rotation={[0, 0, -0.25]}>
        <mesh castShadow>
          <boxGeometry args={[0.004, 0.05, 0.035]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        <mesh position={[0.006, 0.008, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.006, 0.007, 0.008, 14]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.011, 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.003, 0.003, 0.002, 10]} />
          <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.4} />
        </mesh>

        <mesh position={[-0.003, -0.014, 0]}>
          <boxGeometry args={[0.002, 0.014, 0.016]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// DHT22 Temperature & Humidity Sensor
export function Dht22Sensor({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.024, 0]} castShadow>
        <boxGeometry args={[0.016, 0.034, 0.024]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
      {[-0.008, -0.002, 0.004, 0.01].map((y, i) => (
        <mesh key={i} position={[0.0082, 0.024 + y, 0]}>
          <boxGeometry args={[0.001, 0.002, 0.016]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}
      <mesh position={[0, 0.004, 0]}>
        <boxGeometry args={[0.018, 0.004, 0.026]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0, -0.003, 0]}>
        <boxGeometry args={[0.008, 0.008, 0.002]} />
        <meshStandardMaterial color="#ca8a04" metalness={0.9} />
      </mesh>
    </group>
  );
}

// MQ Gas & Air Quality Sensor
export function MqGasSensor({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.005, 0]} castShadow>
        <boxGeometry args={[0.038, 0.004, 0.038]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.35} />
      </mesh>

      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.024, 18]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.0122, 0.0122, 0.014, 18]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Dual-Channel Smart Relay Module
export function DualRelayModule({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.005, 0]} castShadow>
        <boxGeometry args={[0.065, 0.004, 0.09]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.35} />
      </mesh>

      {[-0.018, 0.018].map((z, i) => (
        <group key={i} position={[-0.005, 0.018, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.028, 0.022, 0.026]} />
            <meshStandardMaterial color="#2563eb" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {[-0.022, 0.022].map((z, i) => (
        <mesh key={i} position={[-0.026, 0.013, z]} castShadow>
          <boxGeometry args={[0.014, 0.014, 0.022]} />
          <meshStandardMaterial color="#16a34a" roughness={0.4} />
        </mesh>
      ))}

      <mesh position={[0.02, 0.008, -0.018]}>
        <boxGeometry args={[0.003, 0.003, 0.003]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.02, 0.008, 0.018]}>
        <boxGeometry args={[0.003, 0.003, 0.003]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// Active 0.96" I2C OLED Display
export function OledDisplay({
  position = [0, 0, 0],
  scale = 1.45,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const oledTex = useMemo(() => makeOledTexture(), []);
  return (
    <group position={position} scale={scale}>
      <mesh position={[-0.01, 0.025, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.04, 0.05, 0.06]} />
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      <group position={[0, 0.035, 0]} rotation={[0, 0, -0.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.004, 0.045, 0.06]} />
          <meshStandardMaterial color="#1e40af" roughness={0.35} />
        </mesh>

        <mesh position={[0.003, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.052, 0.034]} />
          <meshStandardMaterial
            map={oledTex}
            emissive="#38bdf8"
            emissiveMap={oledTex}
            emissiveIntensity={0.85}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

// LoRa Wireless Module
export function LoraModule({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.006, 0]} castShadow>
        <boxGeometry args={[0.055, 0.004, 0.075]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.012, 0.008]} castShadow>
        <boxGeometry args={[0.028, 0.008, 0.028]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>

      <mesh position={[-0.022, 0.012, -0.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.008, 8]} />
        <meshStandardMaterial color="#ca8a04" metalness={0.9} roughness={0.2} />
      </mesh>

      <group position={[-0.026, 0.012, -0.03]} rotation={[0.4, 0, -0.4]}>
        <mesh position={[0, 0.045, 0]} castShadow>
          <cylinderGeometry args={[0.004, 0.006, 0.09, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
      </group>

      <mesh position={[0.018, 0.009, 0.02]}>
        <boxGeometry args={[0.003, 0.003, 0.003]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

// TowerPro SG90 Micro Servo Motors
export function ServoMotorModel({
  position = [0, 0, 0],
  rotation = 0,
  scale = 1.35,
}: {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
}) {
  const horn = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (horn.current) {
      horn.current.rotation.y = Math.sin(clock.elapsedTime * 2.5 + rotation) * 0.9;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh position={[0, 0.022, 0]} castShadow>
        <boxGeometry args={[0.024, 0.028, 0.014]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.85} roughness={0.3} />
      </mesh>

      <mesh position={[0.006, 0.038, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.006, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>

      <group ref={horn} position={[0.006, 0.042, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.024, 0.002, 0.006]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      <mesh position={[-0.016, 0.015, 0]}>
        <boxGeometry args={[0.012, 0.003, 0.008]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
    </group>
  );
}

// 28BYJ-48 Stepper Motor + ULN2003 Driver Board
export function StepperMotorKit({
  position = [0, 0, 0],
  scale = 1.35,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <group position={[-0.02, 0.018, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.022, 18]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.004, 0.014]}>
          <boxGeometry args={[0.014, 0.014, 0.008]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.01, 8]} />
          <meshStandardMaterial color="#ca8a04" metalness={0.85} />
        </mesh>
      </group>

      <group position={[0.025, 0.006, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.04, 0.004, 0.04]} />
          <meshStandardMaterial color="#15803d" roughness={0.4} />
        </mesh>
        {[-0.01, -0.003, 0.004, 0.011].map((z, i) => (
          <mesh key={i} position={[-0.012, 0.006, z]}>
            <boxGeometry args={[0.003, 0.003, 0.003]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Prototyping Solderless Breadboard
export function PrototypingBreadboard({
  position = [0, 0, 0],
  scale = 1.25,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.006, 0]} castShadow>
        <boxGeometry args={[0.07, 0.008, 0.16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>

      {[-0.03, 0.03].map((x, i) => (
        <group key={i}>
          <mesh position={[x - 0.002, 0.0105, 0]}>
            <boxGeometry args={[0.0015, 0.001, 0.14]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[x + 0.002, 0.0105, 0]}>
            <boxGeometry args={[0.0015, 0.001, 0.14]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
        </group>
      ))}

      <mesh position={[-0.015, 0.018, -0.03]}>
        <sphereGeometry args={[0.0035, 10, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.015, 0.018, 0.01]}>
        <sphereGeometry args={[0.0035, 10, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.015, 0.018, 0.035]}>
        <sphereGeometry args={[0.0035, 10, 8]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// ULTRA-PREMIUM SHOWCASE CABINET UNIT
// -------------------------------------------------------------

export function IoTShowcaseCabinet({
  position,
  categoryTitle,
  categorySubtitle,
  children,
}: {
  position: [number, number, number];
  categoryTitle: string;
  categorySubtitle: string;
  children: React.ReactNode;
}) {
  const W = 0.82;
  const D = 0.44;
  const H = 2.15;
  const frameColor = "#0f172a";
  const trimColor = "#334155";
  const glassColor = "#e0f2fe";

  const headerTex = useMemo(
    () => makeCategoryTexture(categoryTitle, categorySubtitle),
    [categoryTitle, categorySubtitle],
  );

  return (
    <group position={position}>
      {/* 1. Back Panel */}
      <mesh position={[-D / 2 + 0.01, H / 2, 0]} receiveShadow>
        <boxGeometry args={[0.02, H, W]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Vertical Slats on Back Panel */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-D / 2 + 0.022, H / 2, -W / 2 + 0.08 + i * 0.082]}>
          <boxGeometry args={[0.008, H - 0.1, 0.024]} />
          <meshStandardMaterial color="#090d16" roughness={0.7} />
        </mesh>
      ))}

      {/* 2. Side Panels */}
      <mesh position={[0, H / 2, -W / 2]} castShadow>
        <boxGeometry args={[D, H, 0.024]} />
        <meshStandardMaterial color={frameColor} roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, H / 2, W / 2]} castShadow>
        <boxGeometry args={[D, H, 0.024]} />
        <meshStandardMaterial color={frameColor} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 3. Bottom Base Plinth */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[D + 0.01, 0.08, W + 0.01]} />
        <meshStandardMaterial color="#070a12" roughness={0.5} />
      </mesh>

      {/* 4. Lower Storage Credenza Doors */}
      <mesh position={[D / 2 - 0.005, 0.37, 0]} castShadow>
        <boxGeometry args={[0.018, 0.56, W - 0.04]} />
        <meshStandardMaterial color="#182234" roughness={0.45} metalness={0.15} />
      </mesh>
      {/* Vertical Door Handles */}
      {[-0.04, 0.04].map((z, i) => (
        <mesh key={i} position={[D / 2 + 0.01, 0.42, z]}>
          <boxGeometry args={[0.012, 0.12, 0.008]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* 5. Countertop Worktop Shelf at Y = 0.66 */}
      <mesh position={[0, 0.66, 0]} castShadow receiveShadow>
        <boxGeometry args={[D + 0.015, 0.024, W - 0.01]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* 6. Upper Display Shelves */}
      {[1.06, 1.46, 1.86].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Glass/Acrylic Shelf Plank */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[D - 0.04, 0.016, W - 0.04]} />
            <meshStandardMaterial
              color={glassColor}
              transparent
              opacity={0.55}
              roughness={0.15}
              metalness={0.1}
            />
          </mesh>

          {/* Under-shelf Cyan LED Glow Strip */}
          <mesh position={[D / 2 - 0.06, -0.012, 0]}>
            <boxGeometry args={[0.02, 0.006, W - 0.08]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.95}
              toneMapped={false}
            />
          </mesh>

          {/* Rear Shelf Subtle Edge Light */}
          <mesh position={[-D / 2 + 0.03, 0.01, 0]}>
            <boxGeometry args={[0.008, 0.008, W - 0.08]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={0.6}
              toneMapped={false}
            />
          </mesh>

          {/* Metallic Front Ledge Trim */}
          <mesh position={[D / 2 - 0.02, 0.008, 0]}>
            <boxGeometry args={[0.008, 0.018, W - 0.04]} />
            <meshStandardMaterial color={trimColor} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 7. Top Canopy & Header Assembly */}
      <mesh position={[0, H - 0.05, 0]} castShadow>
        <boxGeometry args={[D + 0.02, 0.1, W + 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.4} metalness={0.2} />
      </mesh>

      <mesh position={[0, H - 0.105, 0]}>
        <boxGeometry args={[D - 0.1, 0.008, W - 0.12]} />
        <meshStandardMaterial
          color="#f0f9ff"
          emissive="#bae6fd"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Internal spotlights casting down on the showcase */}
      <pointLight
        position={[0.06, H - 0.18, 0]}
        intensity={2.6}
        distance={3.4}
        color="#e0f2fe"
        decay={1.8}
      />
      <pointLight
        position={[0.1, 1.25, 0]}
        intensity={1.6}
        distance={2.4}
        color="#bae6fd"
        decay={1.8}
      />

      {/* 8. Backlit Category Sign Header mounted on front of canopy */}
      <mesh position={[D / 2 + 0.012, H - 0.045, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[W - 0.06, 0.08]} />
        <meshStandardMaterial
          map={headerTex}
          emissive="#38bdf8"
          emissiveMap={headerTex}
          emissiveIntensity={0.55}
          roughness={0.2}
        />
      </mesh>

      {/* Slender vertical corner accent LED pillars */}
      {[-W / 2 + 0.008, W / 2 - 0.008].map((z, i) => (
        <mesh key={i} position={[D / 2 - 0.01, H / 2 + 0.33, z]}>
          <boxGeometry args={[0.006, H - 0.72, 0.006]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* 9. Box structures inside this cabinet */}
      {children}
    </group>
  );
}

// -------------------------------------------------------------
// COMPLETE ZONE 6 IOT SHOWCASE ENVIRONMENT
// -------------------------------------------------------------

export function Zone6IoTShowcase() {
  const wallSignTex = useMemo(() => makeWallSignTexture(), []);

  // Four cabinets placed along the left wall (wall is at X = -6.0):
  // X = -5.65 puts the back at -5.87 and front at -5.43 facing +X towards room and camera!
  // Spacing along Z: 0.88m intervals centered around Z = -0.2
  // Z coordinates: -1.52, -0.64, +0.24, +1.12
  const cabinets = [
    {
      id: 0,
      z: -1.52,
      title: "01 · MICROCONTROLLERS & SOCs",
      subtitle: "ARDUINO · RASPBERRY PI · ESP32 · STM32",
    },
    {
      id: 1,
      z: -0.64,
      title: "02 · SMART SENSORS & VISION",
      subtitle: "IR SENSORS · ULTRASONIC · PIR · CAM · GAS",
    },
    {
      id: 2,
      z: 0.24,
      title: "03 · WIRELESS & AUTOMATION",
      subtitle: "RELAYS · OLED HUD · LORA · IOT GATEWAYS",
    },
    {
      id: 3,
      z: 1.12,
      title: "04 · ACTUATORS & PROTOTYPING",
      subtitle: "SERVOS · STEPPERS · BREADBOARD · INVENTORY",
    },
  ];

  return (
    <group>
      {/* -------------------------------------------------------------
          ARCHITECTURAL WALL PANELING BEHIND ZONE 6 (at X = -5.98)
          ------------------------------------------------------------- */}
      <group position={[-5.98, 1.45, -0.2]}>
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.8, 2.7]} />
          <meshStandardMaterial color="#0b1120" roughness={0.85} />
        </mesh>

        <mesh position={[0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.84, 2.74]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>

        {Array.from({ length: 32 }).map((_, i) => (
          <mesh
            key={i}
            position={[0.015, 0, -1.8 + i * 0.116]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.035, 2.65, 0.014]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
        ))}

        {/* Floating Illuminated Lab Header Sign above the cabinets */}
        <mesh position={[0.04, 0.96, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.2, 0.52]} />
          <meshStandardMaterial
            map={wallSignTex}
            emissive="#38bdf8"
            emissiveMap={wallSignTex}
            emissiveIntensity={0.35}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* -------------------------------------------------------------
          FLOOR ZONING ACCENT STRIP
          ------------------------------------------------------------- */}
      <mesh position={[-5.05, 0.005, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.03, 3.8]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* -------------------------------------------------------------
          CABINET 1: MICROCONTROLLERS & EMBEDDED SOCS (Z = -1.52)
          ------------------------------------------------------------- */}
      <IoTShowcaseCabinet
        position={[-5.65, 0, cabinets[0].z]}
        categoryTitle={cabinets[0].title}
        categorySubtitle={cabinets[0].subtitle}
      >
        {/* Countertop Level (Y = 0.68) */}
        <ComponentKitBox
          position={[0, 0.68, -0.19]}
          title="ARDUINO UNO"
          category="MICROCONTROLLER"
          accentColor="#008184"
        >
          <ArduinoUno position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 0.68, 0.19]}
          title="ARDUINO MEGA"
          category="DEVELOPMENT KIT"
          accentColor="#0284c7"
        >
          <ArduinoUno position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 1 Level (Y = 1.07) */}
        <ComponentKitBox
          position={[0, 1.07, -0.19]}
          title="RASPBERRY PI"
          category="SINGLE BOARD PC"
          accentColor="#16a34a"
        >
          <RaspberryPiModel position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.07, 0.19]}
          title="RPI PICO W"
          category="EMBEDDED SOC"
          accentColor="#22c55e"
        >
          <RaspberryPiModel position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 2 Level (Y = 1.47) */}
        <ComponentKitBox
          position={[0, 1.47, -0.19]}
          title="ESP 32"
          category="IOT WIFI+BLE"
          accentColor="#38bdf8"
        >
          <Esp32Module position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.47, 0.19]}
          title="NODE MCU"
          category="WIFI CONTROLLER"
          accentColor="#60a5fa"
        >
          <Esp32Module position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 3 Top Level (Y = 1.87) */}
        <ComponentKitBox
          position={[0, 1.87, -0.19]}
          title="STM32 ARM"
          category="32-BIT CORTEX"
          accentColor="#1d4ed8"
        />
        <ComponentKitBox
          position={[0, 1.87, 0.19]}
          title="MCU CHIPS"
          category="IC INVENTORY"
          accentColor="#0f172a"
        />
      </IoTShowcaseCabinet>

      {/* -------------------------------------------------------------
          CABINET 2: SMART SENSORS & VISION LAB (Z = -0.64)
          ------------------------------------------------------------- */}
      <IoTShowcaseCabinet
        position={[-5.65, 0, cabinets[1].z]}
        categoryTitle={cabinets[1].title}
        categorySubtitle={cabinets[1].subtitle}
      >
        {/* Countertop Level (Y = 0.68) */}
        <ComponentKitBox
          position={[0, 0.68, -0.19]}
          title="IR SENSORS"
          category="OBSTACLE & TRACK"
          accentColor="#e11d48"
        >
          <IrSensorModule position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 0.68, 0.19]}
          title="ULTRASONIC"
          category="DISTANCE SENSORS"
          accentColor="#2563eb"
        >
          <UltrasonicSensor position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 1 Level (Y = 1.07) */}
        <ComponentKitBox
          position={[0, 1.07, -0.19]}
          title="PIR SENSORS"
          category="MOTION DETECTORS"
          accentColor="#16a34a"
        >
          <PirSensor position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.07, 0.19]}
          title="ESP32-CAM"
          category="AI VISION MODULE"
          accentColor="#0284c7"
        >
          <Esp32Cam position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 2 Level (Y = 1.47) */}
        <ComponentKitBox
          position={[0, 1.47, -0.19]}
          title="DHT22 SENSORS"
          category="TEMP & HUMIDITY"
          accentColor="#06b6d4"
        >
          <Dht22Sensor position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.47, 0.19]}
          title="MQ SENSORS"
          category="GAS & AIR QUALITY"
          accentColor="#eab308"
        >
          <MqGasSensor position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 3 Top Level (Y = 1.87) */}
        <ComponentKitBox
          position={[0, 1.87, -0.19]}
          title="SOIL PROBES"
          category="MOISTURE SENSORS"
          accentColor="#ca8a04"
        />
        <ComponentKitBox
          position={[0, 1.87, 0.19]}
          title="OPTICAL LDR"
          category="LIGHT DETECTORS"
          accentColor="#10b981"
        />
      </IoTShowcaseCabinet>

      {/* -------------------------------------------------------------
          CABINET 3: WIRELESS IOT & AUTOMATION (Z = +0.24)
          ------------------------------------------------------------- */}
      <IoTShowcaseCabinet
        position={[-5.65, 0, cabinets[2].z]}
        categoryTitle={cabinets[2].title}
        categorySubtitle={cabinets[2].subtitle}
      >
        {/* Countertop Level (Y = 0.68) */}
        <ComponentKitBox
          position={[0, 0.68, -0.19]}
          title="RELAYS"
          category="AC AUTOMATION"
          accentColor="#2563eb"
        >
          <DualRelayModule position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 0.68, 0.19]}
          title="OLED DISPLAYS"
          category="I2C HUD GRAPHICS"
          accentColor="#06b6d4"
        >
          <OledDisplay position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 1 Level (Y = 1.07) */}
        <ComponentKitBox
          position={[0, 1.07, -0.19]}
          title="LORA NODES"
          category="LONG RANGE WIRELESS"
          accentColor="#7c3aed"
        >
          <LoraModule position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.07, 0.19]}
          title="LCD 1602"
          category="CHARACTER MODULES"
          accentColor="#0284c7"
        >
          <OledDisplay position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 2 Level (Y = 1.47) */}
        <ComponentKitBox
          position={[0, 1.47, -0.19]}
          title="4-CH RELAYS"
          category="POWER AUTOMATION"
          accentColor="#3b82f6"
        >
          <DualRelayModule position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.47, 0.19]}
          title="ZIGBEE / BLE"
          category="MESH PROTOCOLS"
          accentColor="#8b5cf6"
        >
          <LoraModule position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 3 Top Level (Y = 1.87) */}
        <ComponentKitBox
          position={[0, 1.87, -0.19]}
          title="DC-DC POWER"
          category="BUCK CONVERTERS"
          accentColor="#f59e0b"
        />
        <ComponentKitBox
          position={[0, 1.87, 0.19]}
          title="BMS BOARDS"
          category="BATTERY SHIELDS"
          accentColor="#ef4444"
        />
      </IoTShowcaseCabinet>

      {/* -------------------------------------------------------------
          CABINET 4: ACTUATORS & PROTOTYPING (Z = +1.12)
          ------------------------------------------------------------- */}
      <IoTShowcaseCabinet
        position={[-5.65, 0, cabinets[3].z]}
        categoryTitle={cabinets[3].title}
        categorySubtitle={cabinets[3].subtitle}
      >
        {/* Countertop Level (Y = 0.68) */}
        <ComponentKitBox
          position={[0, 0.68, -0.19]}
          title="BREADBOARD"
          category="PROTOTYPING CIRCUIT"
          accentColor="#38bdf8"
        >
          <PrototypingBreadboard position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 0.68, 0.19]}
          title="JUMPERS"
          category="CONNECTING WIRES"
          accentColor="#f97316"
        />

        {/* Shelf 1 Level (Y = 1.07) */}
        <ComponentKitBox
          position={[0, 1.07, -0.19]}
          title="SG90 SERVOS"
          category="MICRO ACTUATORS"
          accentColor="#0284c7"
        >
          <ServoMotorModel position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.07, 0.19]}
          title="MG996R"
          category="HIGH TORQUE MOTORS"
          accentColor="#2563eb"
        >
          <ServoMotorModel position={[0, 0, 0]} rotation={1.5} />
        </ComponentKitBox>

        {/* Shelf 2 Level (Y = 1.47) */}
        <ComponentKitBox
          position={[0, 1.47, -0.19]}
          title="STEPPERS"
          category="28BYJ-48 MOTORS"
          accentColor="#16a34a"
        >
          <StepperMotorKit position={[0, 0, 0]} />
        </ComponentKitBox>
        <ComponentKitBox
          position={[0, 1.47, 0.19]}
          title="DRIVERS"
          category="ULN2003 / L298N"
          accentColor="#eab308"
        >
          <StepperMotorKit position={[0, 0, 0]} />
        </ComponentKitBox>

        {/* Shelf 3 Top Level (Y = 1.87) */}
        <ComponentKitBox
          position={[0, 1.87, -0.19]}
          title="RESISTORS"
          category="PASSIVE COMPONENTS"
          accentColor="#ca8a04"
        />
        <ComponentKitBox
          position={[0, 1.87, 0.19]}
          title="CAPACITORS"
          category="ELECTROLYTIC KITS"
          accentColor="#64748b"
        />
      </IoTShowcaseCabinet>

      {/* -------------------------------------------------------------
          DECORATIVE LAB GREENERY FLANKING ZONE 6
          ------------------------------------------------------------- */}
      <group position={[-5.25, 0, -2.15]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.12, 0.44, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.22, 12, 10]} />
          <meshStandardMaterial color="#15803d" roughness={0.6} />
        </mesh>
      </group>

      <group position={[-5.25, 0, 1.75]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.12, 0.44, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.22, 12, 10]} />
          <meshStandardMaterial color="#166534" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
