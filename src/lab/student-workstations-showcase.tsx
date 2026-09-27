import { useMemo } from "react";
import * as THREE from "three";
import { TABLE_LAYOUT } from "./config";

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

// 1. VS Code / Python Engineering IDE Laptop Screen Texture
function makeIdeScreenTexture() {
  return createTextCanvas(512, 320, (ctx, w, h) => {
    // VS Code Dark Modern Theme Background
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, w, h);

    // Left Activity Bar
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, 36, h);
    ctx.fillStyle = "#007acc";
    ctx.fillRect(0, 20, 3, 24);

    // File Explorer Tree
    ctx.fillStyle = "#252526";
    ctx.fillRect(36, 0, 95, h);
    ctx.fillStyle = "#cccccc";
    ctx.font = "bold 9px monospace";
    ctx.fillText("EXPLORER", 44, 18);

    const files = ["main.py", "robot_arm.py", "vision_ai.cpp", "kinematics.h", "config.json"];
    files.forEach((f, i) => {
      ctx.fillStyle = i === 1 ? "#38bdf8" : "#9cdcfe";
      ctx.font = "8px monospace";
      ctx.fillText(f, 44, 38 + i * 16);
    });

    // Editor Tab Header
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(131, 0, w - 131, 22);
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(131, 0, 110, 22);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 9px monospace";
    ctx.fillText("robot_arm.py", 145, 14);

    // Python Code Editor Area
    const code = [
      { text: "import rospy", col: "#c586c0" },
      { text: "from sensor_msgs.msg import JointState", col: "#4ec9b0" },
      { text: "from avp_kinematics import DHModel, InverseKinematics", col: "#dcdcaa" },
      { text: "", col: "#d4d4d4" },
      { text: "class RoboticArmController:", col: "#4ec9b0" },
      { text: "    def __init__(self, dof=6):", col: "#dcdcaa" },
      { text: "        self.kinematics = DHModel.load_urdf('avp_arm.urdf')", col: "#9cdcfe" },
      { text: "        self.target_tcp = [342.5, -128.4, 415.8]", col: "#b5cea8" },
      { text: "        rospy.loginfo('● 6-DOF KINEMATICS SOLVER READY')", col: "#6a9955" },
      { text: "    def solve_ik(self, x, y, z):", col: "#dcdcaa" },
      { text: "        joints = self.kinematics.inverse(x, y, z)", col: "#9cdcfe" },
      { text: "        return [round(j, 2) for j in joints]", col: "#c586c0" },
    ];

    code.forEach((line, i) => {
      // Line numbers
      ctx.fillStyle = "#858585";
      ctx.font = "8px monospace";
      ctx.fillText(String(i + 1), 138, 38 + i * 14);

      // Syntax highlighted text
      ctx.fillStyle = line.col;
      ctx.fillText(line.text, 160, 38 + i * 14);
    });

    // Integrated Terminal at Bottom
    ctx.fillStyle = "#181818";
    ctx.fillRect(131, h - 65, w - 131, 65);
    ctx.fillStyle = "#007acc";
    ctx.fillRect(131, h - 65, w - 131, 2);

    ctx.fillStyle = "#4ec9b0";
    ctx.font = "bold 9px monospace";
    ctx.fillText("TERMINAL: bash · python3 main.py", 142, h - 48);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 8px monospace";
    ctx.fillText("[SUCCESS] Trajectory planned in 1.4ms. Joint limits verified.", 142, h - 30);
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("avp-student@innovation-hub:~/robotics$ _", 142, h - 14);
  });
}

// -------------------------------------------------------------
// COMPLETE ZONE 7 WORKSTATIONS COMPONENT
// -------------------------------------------------------------

export function Zone7WorkstationsShowcase({ laptop }: { laptop?: THREE.Texture }) {
  const ideTex = useMemo(() => makeIdeScreenTexture(), []);

  // Shared reusable materials for high rendering performance across 10 tables
  const materials = useMemo(
    () => ({
      tableTop: new THREE.MeshStandardMaterial({ color: "#ebd5b3", roughness: 0.45 }),
      tableTrim: new THREE.MeshStandardMaterial({ color: "#dfc49f", roughness: 0.55 }),
      steelLegs: new THREE.MeshStandardMaterial({ color: "#f8fafc", metalness: 0.65, roughness: 0.3 }),
      powerRail: new THREE.MeshStandardMaterial({ color: "#e2e8f0", metalness: 0.8, roughness: 0.3 }),
      ledStrip: new THREE.MeshStandardMaterial({ color: "#38bdf8", emissive: "#38bdf8", emissiveIntensity: 1 }),
      laptopChassis: new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.85, roughness: 0.25 }),
      laptopScreenMat: new THREE.MeshStandardMaterial({
        map: ideTex,
        emissive: "#ffffff",
        emissiveMap: ideTex,
        emissiveIntensity: 0.65,
        roughness: 0.2,
      }),
      chairMesh: new THREE.MeshStandardMaterial({ color: "#334155", roughness: 0.75 }),
      chairSeat: new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.85 }),
      chairChrome: new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.9, roughness: 0.15 }),
      breadboardMat: new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.4 }),
      trayMat: new THREE.MeshStandardMaterial({ color: "#0284c7", roughness: 0.3 }),
    }),
    [ideTex],
  );

  return (
    <group>
      {TABLE_LAYOUT.map((t, idx) => (
        <group key={idx} position={[t.x, 0, t.z]}>
          {/* 1. Scandinavian Blonde Birch Table Top */}
          <mesh position={[0, 0.74, 0]} material={materials.tableTop} castShadow receiveShadow>
            <boxGeometry args={[1.36, 0.04, 0.72]} />
          </mesh>
          {/* Edge Bevel Trim */}
          <mesh position={[0, 0.725, 0]} material={materials.tableTrim}>
            <boxGeometry args={[1.38, 0.015, 0.74]} />
          </mesh>

          {/* 2. Satin White Powder-Coated Steel Frame & Legs */}
          {[-0.62, 0.62].flatMap((x) =>
            [-0.3, 0.3].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.36, z]} material={materials.steelLegs} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.72, 12]} />
              </mesh>
            )),
          )}
          {/* Under-desk cable management crossbar */}
          <mesh position={[0, 0.68, 0]} material={materials.powerRail}>
            <boxGeometry args={[1.24, 0.03, 0.06]} />
          </mesh>

          {/* 3. Central Power & USB-C Integrated Divider Hub */}
          <mesh position={[0, 0.77, 0]} material={materials.powerRail}>
            <boxGeometry args={[0.9, 0.025, 0.08]} />
          </mesh>
          {/* Glowing Status LED / USB-C Outlets */}
          {[-0.25, 0, 0.25].map((px, i) => (
            <mesh key={i} position={[px, 0.785, 0]} material={materials.ledStrip}>
              <boxGeometry args={[0.04, 0.005, 0.012]} />
            </mesh>
          ))}

          {/* 4. Student Laptops (3 per table) */}
          {[-0.38, 0, 0.38].map((x, j) => (
            <group key={`lap-${j}`} position={[x, 0.76, 0.12]} rotation={[0, (j - 1) * 0.08, 0]}>
              {/* Laptop Base Keyboard Deck */}
              <mesh position={[0, 0.006, 0]} material={materials.laptopChassis} castShadow>
                <boxGeometry args={[0.26, 0.01, 0.18]} />
              </mesh>
              {/* Keyboard Trackpad */}
              <mesh position={[0, 0.011, 0.04]} material={materials.chairSeat}>
                <planeGeometry args={[0.08, 0.05]} />
              </mesh>
              {/* Laptop Screen Display Lid (Angled 110°) */}
              <group position={[0, 0.01, -0.09]} rotation={[-0.35, 0, 0]}>
                <mesh position={[0, 0.08, 0]} material={materials.laptopChassis} castShadow>
                  <boxGeometry args={[0.26, 0.16, 0.008]} />
                </mesh>
                {/* Active IDE Screen Display */}
                <mesh position={[0, 0.08, 0.005]} material={materials.laptopScreenMat}>
                  <planeGeometry args={[0.24, 0.14]} />
                </mesh>
              </group>
            </group>
          ))}

          {/* 5. Electronics Prototyping Breadboard & Component Tray on Desk */}
          <group position={[0.42, 0.765, -0.18]} rotation={[0, -0.2, 0]}>
            {/* White Solderless Breadboard */}
            <mesh material={materials.breadboardMat} castShadow>
              <boxGeometry args={[0.16, 0.01, 0.06]} />
            </mesh>
            {/* Embedded Microcontroller (ESP32) */}
            <mesh position={[-0.02, 0.01, 0]}>
              <boxGeometry args={[0.05, 0.006, 0.028]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Glowing Status LED */}
            <mesh position={[0.03, 0.012, 0]}>
              <sphereGeometry args={[0.004, 6, 6]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
            </mesh>
          </group>

          {/* 6. Ergonomic Modern Mesh Office Task Chairs (Facing Desks) */}
          {/* Front Chairs (3 facing forward) */}
          {[-0.38, 0, 0.38].map((x, j) => (
            <group key={`chair-f-${j}`} position={[x, 0, 0.54]} rotation={[0, Math.PI, 0]}>
              {/* Contoured Seat Cushion */}
              <mesh position={[0, 0.46, 0]} material={materials.chairSeat} castShadow>
                <boxGeometry args={[0.38, 0.05, 0.38]} />
              </mesh>
              {/* Breathable Ergonomic Mesh Backrest */}
              <mesh position={[0, 0.74, -0.17]} material={materials.chairMesh} castShadow>
                <boxGeometry args={[0.36, 0.42, 0.03]} />
              </mesh>
              {/* Pneumatic Gas Cylinder */}
              <mesh position={[0, 0.23, 0]} material={materials.chairChrome}>
                <cylinderGeometry args={[0.022, 0.025, 0.44, 10]} />
              </mesh>
              {/* 5-Star Base Plate */}
              <mesh position={[0, 0.03, 0]} material={materials.chairSeat}>
                <cylinderGeometry args={[0.18, 0.18, 0.02, 10]} />
              </mesh>
            </group>
          ))}

          {/* Back Chairs (2 facing backward) */}
          {[-0.38, 0.38].map((x, j) => (
            <group key={`chair-b-${j}`} position={[x, 0, -0.54]}>
              <mesh position={[0, 0.46, 0]} material={materials.chairSeat} castShadow>
                <boxGeometry args={[0.38, 0.05, 0.38]} />
              </mesh>
              <mesh position={[0, 0.74, -0.17]} material={materials.chairMesh} castShadow>
                <boxGeometry args={[0.36, 0.42, 0.03]} />
              </mesh>
              <mesh position={[0, 0.23, 0]} material={materials.chairChrome}>
                <cylinderGeometry args={[0.022, 0.025, 0.44, 10]} />
              </mesh>
              <mesh position={[0, 0.03, 0]} material={materials.chairSeat}>
                <cylinderGeometry args={[0.18, 0.18, 0.02, 10]} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
