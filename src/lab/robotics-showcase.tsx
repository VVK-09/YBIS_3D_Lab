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

// 1. Robot Teach Pendant / Control Console Touchscreen Texture
function makeTeachPendantTexture() {
  return createTextCanvas(512, 384, (ctx, w, h) => {
    // Deep industrial controller dark background
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, w, h);

    // Header bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, 44);
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 44);
    ctx.lineTo(w, 44);
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 15px 'Outfit', sans-serif, system-ui";
    ctx.fillText("AVP KINEMATICS CONTROL SUITE", 16, 28);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 12px monospace";
    ctx.fillText("● ROS2 JAZZY · REALTIME 1kHz", 310, 28);

    // Left Panel: 6-Axis Joint Telemetry
    const jx = 16;
    const jy = 56;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(jx, jy, 230, 240);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(jx, jy, 230, 240);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 12px monospace";
    ctx.fillText("JOINT ANGLES (DH MODEL)", jx + 12, jy + 22);

    const joints = [
      ["J1 (WAIST)", "+45.2°", "#38bdf8"],
      ["J2 (SHOULDER)", "-30.1°", "#38bdf8"],
      ["J3 (ELBOW)", "+82.4°", "#38bdf8"],
      ["J4 (PITCH)", "0.0°", "#94a3b8"],
      ["J5 (ROLL)", "-45.0°", "#38bdf8"],
      ["J6 (GRIPPER)", "CLOSED", "#22c55e"],
    ];

    joints.forEach(([jName, jVal, col], idx) => {
      const rowY = jy + 46 + idx * 30;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(jx + 10, rowY, 210, 24);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "11px monospace";
      ctx.fillText(jName, jx + 16, rowY + 16);

      ctx.fillStyle = col;
      ctx.font = "bold 11px monospace";
      ctx.fillText(jVal, jx + 150, rowY + 16);
    });

    // Right Panel: 3D TCP Coordinates & Trajectory
    const rx = 260;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(rx, jy, 236, 240);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(rx, jy, 236, 240);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 12px monospace";
    ctx.fillText("TCP CARTESIAN COORDINATES", rx + 12, jy + 22);

    const coords = [
      ["TCP X", "342.50 mm"],
      ["TCP Y", "-128.40 mm"],
      ["TCP Z", "415.80 mm"],
      ["ROLL", "12.5°"],
      ["PITCH", "-88.2°"],
      ["YAW", "0.0°"],
    ];

    coords.forEach(([cName, cVal], idx) => {
      const rowY = jy + 46 + idx * 30;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(rx + 10, rowY, 216, 24);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "11px monospace";
      ctx.fillText(cName, rx + 16, rowY + 16);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 11px monospace";
      ctx.fillText(cVal, rx + 130, rowY + 16);
    });

    // Bottom Status Bar & Mode Buttons
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(16, 310, 110, 36);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px 'Outfit', sans-serif, system-ui";
    ctx.fillText("TEACH MODE", 30, 333);

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(136, 310, 110, 36);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("AUTO RUN", 160, 333);

    ctx.fillStyle = "#dc2626";
    ctx.fillRect(256, 310, 240, 36);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Outfit', sans-serif, system-ui";
    ctx.fillText("EMERGENCY STOP (READY)", 285, 333);

    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.fillText("SAFETY INTERLOCK: CLOSED · SERVO CAN BUS: HEALTHY · E-STOP: CLEAR", 16, 368);
  });
}

// 2. Zone 4 Overhead Lightbox Banner Texture
function makeZone4BannerTexture() {
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
    ctx.fillText("ZONE 04 // ADVANCED ROBOTICS & MECHATRONICS LAB", 38, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'Outfit', sans-serif, system-ui";
    ctx.fillText("AUTONOMOUS SYSTEMS & KINEMATICS", 38, 98);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px 'Outfit', sans-serif, system-ui";
    ctx.fillText("Industrial 6-Axis Manipulators · Quadruped Bio-Robots · Bionic Hands · Humanoid Kinematics", 38, 134);

    const cards = [
      { label: "6-AXIS ARM", text: "REPEATABILITY ±0.02mm", color: "#38bdf8", x: 38, w: 220 },
      { label: "QUADRUPED DOG", text: "360° LIDAR SLAM", color: "#f59e0b", x: 274, w: 210 },
      { label: "HUMANOID BOT", text: "22-DOF KINEMATICS", color: "#a855f7", x: 500, w: 220 },
      { label: "BUS PROTOCOL", text: "CAN-FD REALTIME", color: "#22c55e", x: 736, w: 248 },
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
// COMPLETE ZONE 4 SHOWCASE COMPONENT
// -------------------------------------------------------------

export function Zone4RoboticsShowcase() {
  const pendantTex = useMemo(() => makeTeachPendantTexture(), []);
  const bannerTex = useMemo(() => makeZone4BannerTexture(), []);

  return (
    <group position={[2.45, 0, -3.62]}>
      {/* 1. Architectural Back Wall Cladding & Overhead Lightbox */}
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

      {/* 2. Premium Light Blonde Birch Robotics Bench with Satin Aluminum Legs */}
      <group position={[0, 0, -0.05]}>
        {/* Table Top: Light Scandinavian Blonde Birch */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.045, 0.85]} />
          <meshStandardMaterial color="#ebd5b3" roughness={0.4} />
        </mesh>
        {/* Chamfered table edge rim */}
        <mesh position={[0, 0.725, 0]}>
          <boxGeometry args={[2.42, 0.02, 0.87]} />
          <meshStandardMaterial color="#dfc49f" roughness={0.5} />
        </mesh>

        {/* Satin White Powder-Coated Legs */}
        {[-1.12, 1.12].flatMap((x) =>
          [-0.36, 0.36].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.36, z]} castShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.72, 16]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.7} roughness={0.3} />
            </mesh>
          )),
        )}

        {/* Horizontal Stretcher Rails */}
        {[-0.36, 0.36].map((z, i) => (
          <mesh key={i} position={[0, 0.15, z]}>
            <boxGeometry args={[2.24, 0.03, 0.03]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
          </mesh>
        ))}

        {/* High-Tech Under-Desk LED Strip Glow */}
        <mesh position={[0, 0.71, 0.4]}>
          <boxGeometry args={[2.3, 0.01, 0.01]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* 3. Wall Display Shelving Unit with Glass/Aluminum Brackets */}
      <group position={[0, 1.25, -0.45]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.35, 0.025, 0.32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Aluminum brackets */}
        {[-0.9, 0, 0.9].map((bx, i) => (
          <mesh key={i} position={[bx, -0.08, -0.06]}>
            <boxGeometry args={[0.02, 0.14, 0.2]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ---------------- ROBOTICS EQUIPMENT SUITE ---------------- */}

      {/* A. 6-Axis Precision Industrial Articulated Robot Arm */}
      <group position={[-0.45, 0.765, -0.05]}>
        {/* Heavy Circular Steel Base Turntable */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.13, 0.14, 0.04, 24]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Ring Light Indicator (Glowing Cyan) */}
        <mesh position={[0, 0.041, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.005, 24]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>

        {/* Joint 1: Base Rotary Housing */}
        <mesh position={[0, 0.09, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 0.1, 20]} />
          <meshStandardMaterial color="#f97316" roughness={0.35} />
        </mesh>

        {/* Joint 2: Shoulder Articulation */}
        <group position={[0, 0.16, 0]} rotation={[0.4, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* Lower Arm Boom */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <mesh position={[0.042, 0.15, 0]}>
            <boxGeometry args={[0.005, 0.26, 0.06]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>

          {/* Joint 3: Elbow Joint */}
          <group position={[0, 0.3, 0]} rotation={[-0.8, 0, 0]}>
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, 0.09, 16]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} />
            </mesh>
            {/* Forearm Boom */}
            <mesh position={[0, 0.14, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.055, 0.28, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>

            {/* Joint 4 & 5: Wrist Assembly */}
            <group position={[0, 0.28, 0]} rotation={[0.3, 0, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.045, 14, 14]} />
                <meshStandardMaterial color="#f97316" />
              </mesh>

              {/* Joint 6: Tool Flange & Parallel Gripper */}
              <group position={[0, 0.06, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.9} />
                </mesh>
                {/* Gripper Base Block */}
                <mesh position={[0, 0.025, 0]} castShadow>
                  <boxGeometry args={[0.09, 0.03, 0.04]} />
                  <meshStandardMaterial color="#334155" metalness={0.7} />
                </mesh>
                {/* Finger 1 */}
                <mesh position={[-0.03, 0.06, 0]} castShadow>
                  <boxGeometry args={[0.012, 0.05, 0.025]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.9} />
                </mesh>
                {/* Finger 2 */}
                <mesh position={[0.03, 0.06, 0]} castShadow>
                  <boxGeometry args={[0.012, 0.05, 0.025]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.9} />
                </mesh>
                {/* Held Machined Precision Gear Part */}
                <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.022, 0.022, 0.015, 12]} />
                  <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* B. Unitree / Boston Dynamics Style Autonomous Quadruped Robot Dog */}
      <group position={[0.55, 0.765, 0.02]} rotation={[0, -0.4, 0]}>
        {/* Main Torso Chassis (Sleek High-Gloss Industrial Yellow & Carbon Black) */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.44]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} />
        </mesh>
        {/* Carbon fiber underbelly & spine */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.225, 0.06, 0.42]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* 360° Spinning LiDAR Sensor Turret on Back */}
        <group position={[0, 0.3, 0.08]}>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.045, 0.05, 0.03, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.045, 0]}>
            <cylinderGeometry args={[0.038, 0.038, 0.025, 16]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
          </mesh>
        </group>

        {/* Front Head Sensor Array & Dual Stereo Depth Cameras */}
        <group position={[0, 0.23, 0.23]}>
          <mesh>
            <boxGeometry args={[0.16, 0.08, 0.06]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {[-0.045, 0.045].map((cx, i) => (
            <mesh key={i} position={[cx, 0.01, 0.031]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.005, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
            </mesh>
          ))}
        </group>

        {/* 4 Articulated Quadruped Legs (Upper thigh, Knee servo, Lower shin, Rubber foot) */}
        {[
          { lx: -0.12, lz: 0.15, ang: 0.2 },
          { lx: 0.12, lz: 0.15, ang: 0.2 },
          { lx: -0.12, lz: -0.15, ang: -0.2 },
          { lx: 0.12, lz: -0.15, ang: -0.2 },
        ].map((leg, i) => (
          <group key={i} position={[leg.lx, 0.2, leg.lz]}>
            {/* Hip Servo Actuator Canister */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 0.04, 14]} />
              <meshStandardMaterial color="#0f172a" metalness={0.8} />
            </mesh>
            {/* Upper Thigh */}
            <group rotation={[leg.ang, 0, 0]}>
              <mesh position={[0, -0.06, 0]} castShadow>
                <boxGeometry args={[0.025, 0.12, 0.035]} />
                <meshStandardMaterial color="#eab308" />
              </mesh>
              {/* Knee Joint */}
              <group position={[0, -0.12, 0]} rotation={[-leg.ang * 1.8, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
                  <meshStandardMaterial color="#334155" metalness={0.7} />
                </mesh>
                {/* Lower Shin */}
                <mesh position={[0, -0.06, 0]} castShadow>
                  <boxGeometry args={[0.018, 0.12, 0.022]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.6} />
                </mesh>
                {/* High-Traction Rubber Footpad */}
                <mesh position={[0, -0.12, 0]}>
                  <sphereGeometry args={[0.022, 10, 10]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.9} />
                </mesh>
              </group>
            </group>
          </group>
        ))}
      </group>

      {/* C. Cybernetic Bionic Hand with Tendons on Acrylic Testing Stand */}
      <group position={[0.05, 0.765, 0.18]}>
        {/* Clear Acrylic Round Base */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.5} transparent opacity={0.6} />
        </mesh>
        {/* Carbon Fiber Support Pylon */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.018, 0.022, 0.14, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Palm Housing */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[0.09, 0.08, 0.03]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* 5 Articulated Fingers (Thumb, Index, Middle, Ring, Pinky) */}
        {[-0.032, -0.016, 0, 0.016, 0.032].map((fx, i) => (
          <group key={i} position={[fx, 0.22, 0]} rotation={[(i - 2) * 0.05, 0, 0]}>
            {/* Phalanx 1 */}
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[0.01, 0.035, 0.012]} />
              <meshStandardMaterial color="#0284c7" metalness={0.5} />
            </mesh>
            {/* Phalanx 2 */}
            <mesh position={[0, 0.045, 0.008]} rotation={[0.4, 0, 0]}>
              <boxGeometry args={[0.009, 0.028, 0.01]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
            {/* Tactile Sensor Fingertip (Glowing Amber) */}
            <mesh position={[0, 0.06, 0.018]}>
              <sphereGeometry args={[0.006, 8, 8]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* D. Teach Pendant / Robotics Control Console with Cable */}
      <group position={[-0.85, 0.765, 0.15]} rotation={[0.25, 0.2, 0]}>
        {/* Industrial Rugged Housing (Safety Orange/Charcoal) */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.26, 0.04, 0.2]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {/* Rubberized Corner Bumpers */}
        {[-0.13, 0.13].flatMap((bx) =>
          [-0.1, 0.1].map((bz) => (
            <mesh key={`${bx}-${bz}`} position={[bx, 0.05, bz]}>
              <boxGeometry args={[0.03, 0.045, 0.03]} />
              <meshStandardMaterial color="#f97316" />
            </mesh>
          )),
        )}
        {/* Active Touchscreen Display */}
        <mesh position={[0, 0.071, 0]}>
          <planeGeometry args={[0.22, 0.16]} />
          <meshStandardMaterial
            map={pendantTex}
            emissive="#ffffff"
            emissiveMap={pendantTex}
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
        {/* Large Mushroom Emergency Stop Button */}
        <group position={[0.1, 0.08, -0.07]}>
          <mesh>
            <cylinderGeometry args={[0.016, 0.02, 0.018, 14]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0, 0.012, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.008, 14]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        </group>
      </group>

      {/* E. Top Display Shelf Equipment (Humanoid Robot & Hexapod SpiderBot) */}
      {/* 1. Humanoid Robot on Shelf */}
      <group position={[-0.7, 1.28, -0.45]}>
        {/* Torso */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[0.16, 0.22, 0.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        {/* Chest Reactor Arc Core (Glowing Cyan) */}
        <mesh position={[0, 0.21, 0.052]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.004, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
        {/* Head with Visor */}
        <group position={[0, 0.33, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.09, 0.09]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.01, 0.047]}>
            <planeGeometry args={[0.08, 0.025]} />
            <meshStandardMaterial color="#00b4d8" emissive="#00b4d8" emissiveIntensity={1} />
          </mesh>
        </group>
        {/* Bipedal Legs */}
        {[-0.05, 0.05].map((lx, i) => (
          <group key={i} position={[lx, 0.07, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.022, 0.025, 0.14, 10]} />
              <meshStandardMaterial color="#475569" metalness={0.7} />
            </mesh>
            <mesh position={[0, -0.07, 0.02]}>
              <boxGeometry args={[0.038, 0.015, 0.07]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. Hexapod Spider Bot on Shelf */}
      <group position={[0.65, 1.28, -0.45]}>
        {/* Central Disc Chassis */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.04, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Ultrasonic Eye Sensor */}
        <group position={[0, 0.05, 0.085]}>
          {[-0.02, 0.02].map((ex, i) => (
            <mesh key={i} position={[ex, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.01, 10]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
        {/* 6 Spider Legs */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx * Math.PI) / 3;
          return (
            <group key={idx} position={[0.08 * Math.cos(angle), 0.04, 0.08 * Math.sin(angle)]} rotation={[0, -angle, 0]}>
              <mesh position={[0.04, 0.02, 0]} rotation={[0, 0, -0.3]}>
                <boxGeometry args={[0.07, 0.012, 0.015]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>
              <mesh position={[0.08, -0.03, 0]} rotation={[0, 0, 0.5]}>
                <boxGeometry args={[0.08, 0.01, 0.012]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Overhead Spot Downlight for Dramatic Stage Illumination */}
      <pointLight position={[0, 1.6, 0.1]} color="#e0f2fe" intensity={1.2} distance={3.2} />
    </group>
  );
}
