import { useEffect, useMemo, useRef } from "react";
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

function InstancedBatch({
  geometry,
  material,
  matrices,
  castShadow = false,
  receiveShadow = false,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  matrices: THREE.Matrix4[];
  castShadow?: boolean;
  receiveShadow?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < matrices.length; i++) {
      ref.current.setMatrixAt(i, matrices[i]);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, matrices.length]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  );
}

// -------------------------------------------------------------
// OPTIMIZED ZONE 7 WORKSTATIONS (INSTANCED MESHES)
// -------------------------------------------------------------

export function Zone7WorkstationsShowcase({ laptop }: { laptop?: THREE.Texture }) {
  const ideTex = useMemo(() => makeIdeScreenTexture(), []);

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
      esp32Mat: new THREE.MeshStandardMaterial({ color: "#0f172a" }),
      esp32LedMat: new THREE.MeshStandardMaterial({ color: "#22c55e", emissive: "#22c55e", emissiveIntensity: 1 }),
    }),
    [ideTex],
  );

  const geometries = useMemo(
    () => ({
      tableTop: new THREE.BoxGeometry(1.36, 0.04, 0.72),
      tableTrim: new THREE.BoxGeometry(1.38, 0.015, 0.74),
      steelLegs: new THREE.CylinderGeometry(0.02, 0.02, 0.72, 8),
      powerRail: new THREE.BoxGeometry(1.24, 0.03, 0.06),
      powerHub: new THREE.BoxGeometry(0.9, 0.025, 0.08),
      ledStrip: new THREE.BoxGeometry(0.04, 0.005, 0.012),
      laptopChassis: new THREE.BoxGeometry(0.26, 0.01, 0.18),
      laptopTrackpad: new THREE.PlaneGeometry(0.08, 0.05),
      laptopScreenLid: new THREE.BoxGeometry(0.26, 0.16, 0.008),
      laptopScreenMat: new THREE.PlaneGeometry(0.24, 0.14),
      breadboardMat: new THREE.BoxGeometry(0.16, 0.01, 0.06),
      esp32: new THREE.BoxGeometry(0.05, 0.006, 0.028),
      esp32Led: new THREE.SphereGeometry(0.004, 6, 6),
      chairSeat: new THREE.BoxGeometry(0.38, 0.05, 0.38),
      chairMesh: new THREE.BoxGeometry(0.36, 0.42, 0.03),
      chairChrome: new THREE.CylinderGeometry(0.022, 0.025, 0.44, 8),
      chairBase: new THREE.CylinderGeometry(0.18, 0.18, 0.02, 8),
    }),
    [],
  );

  const batches = useMemo(() => {
    const tableTopM: THREE.Matrix4[] = [];
    const tableTrimM: THREE.Matrix4[] = [];
    const steelLegsM: THREE.Matrix4[] = [];
    const powerRailM: THREE.Matrix4[] = [];
    const powerHubM: THREE.Matrix4[] = [];
    const ledStripM: THREE.Matrix4[] = [];
    const laptopChassisM: THREE.Matrix4[] = [];
    const laptopTrackpadM: THREE.Matrix4[] = [];
    const laptopScreenLidM: THREE.Matrix4[] = [];
    const laptopScreenMatM: THREE.Matrix4[] = [];
    const breadboardM: THREE.Matrix4[] = [];
    const esp32M: THREE.Matrix4[] = [];
    const esp32LedM: THREE.Matrix4[] = [];
    const chairSeatM: THREE.Matrix4[] = [];
    const chairMeshM: THREE.Matrix4[] = [];
    const chairChromeM: THREE.Matrix4[] = [];
    const chairBaseM: THREE.Matrix4[] = [];

    const dummy = new THREE.Object3D();
    const subDummy = new THREE.Object3D();

    for (const t of TABLE_LAYOUT) {
      // 1. Table Top
      dummy.position.set(t.x, 0.74, t.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      tableTopM.push(dummy.matrix.clone());

      // Trim
      dummy.position.set(t.x, 0.725, t.z);
      dummy.updateMatrix();
      tableTrimM.push(dummy.matrix.clone());

      // 4 Legs
      for (const lx of [-0.62, 0.62]) {
        for (const lz of [-0.3, 0.3]) {
          dummy.position.set(t.x + lx, 0.36, t.z + lz);
          dummy.updateMatrix();
          steelLegsM.push(dummy.matrix.clone());
        }
      }

      // Cable crossbar
      dummy.position.set(t.x, 0.68, t.z);
      dummy.updateMatrix();
      powerRailM.push(dummy.matrix.clone());

      // Power rail hub
      dummy.position.set(t.x, 0.77, t.z);
      dummy.updateMatrix();
      powerHubM.push(dummy.matrix.clone());

      // LED strip status lights
      for (const px of [-0.25, 0, 0.25]) {
        dummy.position.set(t.x + px, 0.785, t.z);
        dummy.updateMatrix();
        ledStripM.push(dummy.matrix.clone());
      }

      // 3 Laptops
      const lapX = [-0.38, 0, 0.38];
      for (let j = 0; j < 3; j++) {
        const x = lapX[j];
        const rotY = (j - 1) * 0.08;

        // Base
        dummy.position.set(t.x + x, 0.76 + 0.006, t.z + 0.12);
        dummy.rotation.set(0, rotY, 0);
        dummy.updateMatrix();
        laptopChassisM.push(dummy.matrix.clone());

        // Trackpad (rotated flat on deck)
        dummy.position.set(t.x + x, 0.76 + 0.011, t.z + 0.12 + 0.04);
        dummy.rotation.set(-Math.PI / 2, 0, rotY);
        dummy.updateMatrix();
        laptopTrackpadM.push(dummy.matrix.clone());

        // Screen lid angled 110 deg (-0.35 rad)
        dummy.position.set(t.x + x, 0.76 + 0.01, t.z + 0.12 - 0.09);
        dummy.rotation.set(0, rotY, 0);
        subDummy.position.set(0, 0.08, 0);
        subDummy.rotation.set(-0.35, 0, 0);
        subDummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        subDummy.updateMatrix();
        laptopScreenLidM.push(dummy.matrix.clone().multiply(subDummy.matrix));

        // Screen display face slightly in front [0, 0.08, 0.005]
        subDummy.position.set(0, 0.08, 0.005);
        subDummy.updateMatrix();
        laptopScreenMatM.push(dummy.matrix.clone().multiply(subDummy.matrix));
      }

      // Breadboard
      dummy.position.set(t.x + 0.42, 0.765, t.z - 0.18);
      dummy.rotation.set(0, -0.2, 0);
      dummy.updateMatrix();
      breadboardM.push(dummy.matrix.clone());

      // ESP32 on breadboard
      subDummy.position.set(-0.02, 0.01, 0);
      subDummy.rotation.set(0, 0, 0);
      subDummy.updateMatrix();
      esp32M.push(dummy.matrix.clone().multiply(subDummy.matrix));

      // LED on breadboard
      subDummy.position.set(0.03, 0.012, 0);
      subDummy.updateMatrix();
      esp32LedM.push(dummy.matrix.clone().multiply(subDummy.matrix));

      // Chairs: 3 front, 2 back
      // Front chairs
      for (const cx of [-0.38, 0, 0.38]) {
        // Seat
        dummy.position.set(t.x + cx, 0.46, t.z + 0.54);
        dummy.rotation.set(0, Math.PI, 0);
        dummy.updateMatrix();
        chairSeatM.push(dummy.matrix.clone());

        // Backrest (offset in group was [0, 0.74, -0.17], with rotY=PI, z becomes +0.17)
        dummy.position.set(t.x + cx, 0.74, t.z + 0.54 + 0.17);
        dummy.rotation.set(0, Math.PI, 0);
        dummy.updateMatrix();
        chairMeshM.push(dummy.matrix.clone());

        // Stem
        dummy.position.set(t.x + cx, 0.23, t.z + 0.54);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        chairChromeM.push(dummy.matrix.clone());

        // Base
        dummy.position.set(t.x + cx, 0.03, t.z + 0.54);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        chairBaseM.push(dummy.matrix.clone());
      }

      // Back chairs (2)
      for (const cx of [-0.38, 0.38]) {
        // Seat
        dummy.position.set(t.x + cx, 0.46, t.z - 0.54);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        chairSeatM.push(dummy.matrix.clone());

        // Backrest
        dummy.position.set(t.x + cx, 0.74, t.z - 0.54 - 0.17);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        chairMeshM.push(dummy.matrix.clone());

        // Stem
        dummy.position.set(t.x + cx, 0.23, t.z - 0.54);
        dummy.updateMatrix();
        chairChromeM.push(dummy.matrix.clone());

        // Base
        dummy.position.set(t.x + cx, 0.03, t.z - 0.54);
        dummy.updateMatrix();
        chairBaseM.push(dummy.matrix.clone());
      }
    }

    return {
      tableTopM,
      tableTrimM,
      steelLegsM,
      powerRailM,
      powerHubM,
      ledStripM,
      laptopChassisM,
      laptopTrackpadM,
      laptopScreenLidM,
      laptopScreenMatM,
      breadboardM,
      esp32M,
      esp32LedM,
      chairSeatM,
      chairMeshM,
      chairChromeM,
      chairBaseM,
    };
  }, []);

  return (
    <group>
      <InstancedBatch
        geometry={geometries.tableTop}
        material={materials.tableTop}
        matrices={batches.tableTopM}
        castShadow
        receiveShadow
      />
      <InstancedBatch
        geometry={geometries.tableTrim}
        material={materials.tableTrim}
        matrices={batches.tableTrimM}
      />
      <InstancedBatch
        geometry={geometries.steelLegs}
        material={materials.steelLegs}
        matrices={batches.steelLegsM}
      />
      <InstancedBatch
        geometry={geometries.powerRail}
        material={materials.powerRail}
        matrices={batches.powerRailM}
      />
      <InstancedBatch
        geometry={geometries.powerHub}
        material={materials.powerRail}
        matrices={batches.powerHubM}
      />
      <InstancedBatch
        geometry={geometries.ledStrip}
        material={materials.ledStrip}
        matrices={batches.ledStripM}
      />
      <InstancedBatch
        geometry={geometries.laptopChassis}
        material={materials.laptopChassis}
        matrices={batches.laptopChassisM}
      />
      <InstancedBatch
        geometry={geometries.laptopTrackpad}
        material={materials.chairSeat}
        matrices={batches.laptopTrackpadM}
      />
      <InstancedBatch
        geometry={geometries.laptopScreenLid}
        material={materials.laptopChassis}
        matrices={batches.laptopScreenLidM}
      />
      <InstancedBatch
        geometry={geometries.laptopScreenMat}
        material={materials.laptopScreenMat}
        matrices={batches.laptopScreenMatM}
      />
      <InstancedBatch
        geometry={geometries.breadboardMat}
        material={materials.breadboardMat}
        matrices={batches.breadboardM}
      />
      <InstancedBatch
        geometry={geometries.esp32}
        material={materials.esp32Mat}
        matrices={batches.esp32M}
      />
      <InstancedBatch
        geometry={geometries.esp32Led}
        material={materials.esp32LedMat}
        matrices={batches.esp32LedM}
      />
      <InstancedBatch
        geometry={geometries.chairSeat}
        material={materials.chairSeat}
        matrices={batches.chairSeatM}
        castShadow
      />
      <InstancedBatch
        geometry={geometries.chairMesh}
        material={materials.chairMesh}
        matrices={batches.chairMeshM}
      />
      <InstancedBatch
        geometry={geometries.chairChrome}
        material={materials.chairChrome}
        matrices={batches.chairChromeM}
      />
      <InstancedBatch
        geometry={geometries.chairBase}
        material={materials.chairSeat}
        matrices={batches.chairBaseM}
      />
    </group>
  );
}
