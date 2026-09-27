import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useLab } from "./store";
import { BoxMesh } from "./furniture";

function useClickPulse(id: string) {
  const pulse = useLab((s) => s.pulseEquip);
  const active = useLab((s) => s.activeEquip === id);
  const hovered = useRef(false);
  useCursor(hovered.current);
  return {
    active,
    bind: {
      onPointerOver: (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        hovered.current = true;
      },
      onPointerOut: () => {
        hovered.current = false;
      },
      onClick: (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        pulse(id);
      },
    },
  };
}

export function RobotArm({ position, boosted = false }: { position: [number, number, number]; boosted?: boolean }) {
  const { active, bind } = useClickPulse("arm");
  const j0 = useRef<THREE.Group>(null);
  const j1 = useRef<THREE.Group>(null);
  const j2 = useRef<THREE.Group>(null);
  const k = boosted || active ? 1.8 : 0.55;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (j0.current) j0.current.rotation.y = Math.sin(t * 0.45 * k) * 0.85;
    if (j1.current) j1.current.rotation.z = -0.55 + Math.sin(t * 0.62 * k) * 0.38;
    if (j2.current) j2.current.rotation.z = 0.85 + Math.sin(t * 0.8 * k) * 0.28;
  });
  const orange = "#e85d04";
  const dark = "#1f2933";
  return (
    <group position={position} {...bind}>
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.08, 16]} />
        <meshStandardMaterial color={dark} metalness={0.5} roughness={0.35} />
      </mesh>
      <group ref={j0} position={[0, 0.08, 0]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.16, 14]} />
          <meshStandardMaterial color={orange} roughness={0.4} metalness={0.15} />
        </mesh>
        <group ref={j1} position={[0, 0.16, 0]}>
          <mesh position={[0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <boxGeometry args={[0.07, 0.32, 0.07]} />
            <meshStandardMaterial color={orange} roughness={0.4} />
          </mesh>
          <group ref={j2} position={[0.32, 0, 0]}>
            <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <boxGeometry args={[0.055, 0.28, 0.055]} />
              <meshStandardMaterial color={orange} roughness={0.4} />
            </mesh>
            <mesh position={[0.3, 0, 0]} castShadow>
              <boxGeometry args={[0.08, 0.04, 0.08]} />
              <meshStandardMaterial color={dark} metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[0.36, 0.04, 0]} castShadow>
              <boxGeometry args={[0.02, 0.1, 0.03]} />
              <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.25} />
            </mesh>
            <mesh position={[0.36, -0.04, 0]} castShadow>
              <boxGeometry args={[0.02, 0.1, 0.03]} />
              <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.25} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export function Printer3D({
  position,
  phase = 0,
}: {
  position: [number, number, number];
  phase?: number;
}) {
  const { active, bind } = useClickPulse("printer");
  const head = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * (active ? 1.6 : 0.85) + phase;
    if (!head.current) return;
    head.current.position.x = Math.sin(t * 0.9) * 0.09;
    head.current.position.z = Math.cos(t * 0.55) * 0.08;
    head.current.position.y = 0.18 + Math.abs(Math.sin(t * 0.4)) * 0.06;
  });
  return (
    <group position={position} {...bind}>
      <BoxMesh args={[0.36, 0.02, 0.34]} position={[0, 0.01, 0]} color="#1f2937" metalness={0.4} roughness={0.35} />
      {(
        [
          [-0.16, -0.15],
          [0.16, -0.15],
          [-0.16, 0.15],
          [0.16, 0.15],
        ] as const
      ).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]}>
          <boxGeometry args={[0.02, 0.42, 0.02]} />
          <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      <BoxMesh args={[0.36, 0.02, 0.34]} position={[0, 0.43, 0]} color="#374151" />
      <mesh position={[0, 0.22, -0.17]}>
        <planeGeometry args={[0.32, 0.4]} />
        <meshStandardMaterial color="#9ecfff" transparent opacity={0.18} roughness={0.1} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.22, 0.01, 0.22]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.04, 0.1]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.25} />
      </mesh>
      <group ref={head}>
        <mesh castShadow>
          <boxGeometry args={[0.08, 0.04, 0.06]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
        <mesh position={[0, -0.04, 0]}>
          <coneGeometry args={[0.012, 0.04, 8]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export function FilamentSpool({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <torusGeometry args={[0.055, 0.028, 10, 18]} />
      <meshStandardMaterial color={color} roughness={0.45} />
    </mesh>
  );
}

export function MiniDrone({
  position,
  hover = false,
  color = "#0f172a",
}: {
  position: [number, number, number];
  hover?: boolean;
  color?: string;
}) {
  const { active, bind } = useClickPulse("drone");
  const props = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    if (props.current) props.current.rotation.y += (active || hover ? 28 : 10) * d;
    if (body.current && hover) {
      body.current.position.y = Math.sin(performance.now() * 0.002) * 0.08;
      body.current.rotation.y += d * 0.35;
    }
  });
  const arms: [number, number][] = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  return (
    <group position={position} {...bind}>
      <group ref={body}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.03, 0.1]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.025, 0]}>
          <sphereGeometry args={[0.022, 10, 8]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
        </mesh>
        {arms.map(([x, z], i) => (
          <mesh key={i} position={[x * 0.08, 0, z * 0.08]} rotation={[0, Math.atan2(z, x), 0]}>
            <boxGeometry args={[0.12, 0.012, 0.018]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        ))}
        <group ref={props}>
          {arms.map(([x, z], i) => (
            <mesh key={i} position={[x * 0.14, 0.02, z * 0.14]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.004, 12]} />
              <meshStandardMaterial color="#94a3b8" transparent opacity={0.55} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export function Humanoid({ position }: { position: [number, number, number] }) {
  const { active, bind } = useClickPulse("humanoid");
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = Math.sin(clock.elapsedTime * (active ? 1.2 : 0.35)) * 0.35;
  });
  return (
    <group position={position} ref={g} {...bind}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.22, 6, 12]} />
        <meshStandardMaterial color="#e8edf3" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.075, 14, 12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.785, 0.055]}>
        <boxGeometry args={[0.1, 0.03, 0.02]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.14, 0.55, 0]} rotation={[0, 0, s * 0.15]} castShadow>
          <capsuleGeometry args={[0.035, 0.2, 4, 8]} />
          <meshStandardMaterial color="#e8edf3" />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.05, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.04, 0.22, 4, 8]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      ))}
    </group>
  );
}

export function RobotDog({ position }: { position: [number, number, number] }) {
  const { active, bind } = useClickPulse("dog");
  const legs = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * (active ? 6 : 2.2);
    if (!legs.current) return;
    legs.current.children.forEach((ch, i) => {
      ch.rotation.x = Math.sin(t + i * 1.5) * 0.35;
    });
  });
  return (
    <group position={position} {...bind}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.14]} />
        <meshStandardMaterial color="#eab308" roughness={0.45} />
      </mesh>
      <mesh position={[0.16, 0.24, 0]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <group ref={legs}>
        {(
          [
            [0.1, 0.08],
            [0.1, -0.08],
            [-0.1, 0.08],
            [-0.1, -0.08],
          ] as const
        ).map(([x, z], i) => (
          <mesh key={i} position={[x, 0.1, z]} castShadow>
            <boxGeometry args={[0.035, 0.2, 0.035]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function SpiderBot({ position }: { position: [number, number, number] }) {
  const { active, bind } = useClickPulse("spider");
  const legs = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * (active ? 8 : 3);
    if (!legs.current) return;
    legs.current.children.forEach((ch, i) => {
      ch.rotation.z = Math.sin(t + i) * 0.28;
    });
  });
  const angles = useMemo(() => [0, 60, 120, 180, 240, 300].map((a) => (a * Math.PI) / 180), []);
  return (
    <group position={position} {...bind}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <sphereGeometry args={[0.07, 12, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.3} />
      </mesh>
      <group ref={legs}>
        {angles.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 0.08, 0.05, Math.sin(a) * 0.08]} rotation={[0, -a, 0.4]} castShadow>
            <boxGeometry args={[0.16, 0.02, 0.02]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function BionicArm({ position }: { position: [number, number, number] }) {
  const { active, bind } = useClickPulse("bionic");
  const fingers = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = Math.sin(clock.elapsedTime * (active ? 3 : 1.2)) * 0.45;
    if (!fingers.current) return;
    fingers.current.children.forEach((ch) => {
      ch.rotation.x = 0.3 + t;
    });
  });
  return (
    <group position={position} {...bind}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.28, 10]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.34, 0]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.03]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.3} />
      </mesh>
      <group ref={fingers} position={[0, 0.38, 0]}>
        {[-0.03, -0.01, 0.01, 0.03].map((x, i) => (
          <mesh key={i} position={[x, 0.05, 0]} castShadow>
            <boxGeometry args={[0.012, 0.1, 0.012]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function VrHeadset({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.08, 0.1]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.14, 0.06, 0.02]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export function PiKit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.018, 0.08]} />
        <meshStandardMaterial color="#166534" roughness={0.5} />
      </mesh>
      <mesh position={[0.04, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.02, 0.04]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[-0.03, 0.03, 0.0]}>
        <boxGeometry args={[0.02, 0.03, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

export function F450Kit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[0.28, 0.02, 0.04]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[0.28, 0.02, 0.04]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.08, 0.03, 0.08]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}
