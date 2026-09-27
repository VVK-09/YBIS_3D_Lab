import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

const WOOD = "#c4a574";
const WOOD_DARK = "#8a6840";
const METAL = "#8b95a3";
const NAVY = "#092244";

export function BoxMesh({
  args,
  position,
  rotation,
  color,
  roughness = 0.55,
  metalness = 0,
  emissive,
  emissiveIntensity = 0,
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? "#000"}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

export function Desk({
  width = 1.4,
  depth = 0.62,
  height = 0.74,
  color = WOOD,
}: {
  width?: number;
  depth?: number;
  height?: number;
  color?: string;
}) {
  const leg = 0.05;
  const inset = 0.08;
  return (
    <group>
      <RoundedBox args={[width, 0.045, depth]} radius={0.02} position={[0, height, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.04} />
      </RoundedBox>
      {(
        [
          [-width / 2 + inset, -depth / 2 + inset],
          [width / 2 - inset, -depth / 2 + inset],
          [-width / 2 + inset, depth / 2 - inset],
          [width / 2 - inset, depth / 2 - inset],
        ] as const
      ).map(([x, z], i) => (
        <mesh key={i} position={[x, height / 2, z]} castShadow>
          <boxGeometry args={[leg, height, leg]} />
          <meshStandardMaterial color={METAL} roughness={0.35} metalness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function Chair({ rotation = 0 }: { rotation?: number }) {
  return (
    <group rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.36, 0.05, 0.36]} radius={0.02} position={[0, 0.46, 0]} castShadow>
        <meshStandardMaterial color="#1a1d24" roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[0.36, 0.38, 0.05]} radius={0.02} position={[0, 0.68, -0.16]} castShadow>
        <meshStandardMaterial color="#111318" roughness={0.55} />
      </RoundedBox>
      <mesh position={[0, 0.23, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.42, 10]} />
        <meshStandardMaterial color="#4b5563" roughness={0.35} metalness={0.45} />
      </mesh>
    </group>
  );
}

export function Laptop({
  open = 1,
  screen,
}: {
  open?: number;
  screen?: THREE.Texture;
}) {
  const lid = -Math.PI / 2 + open * 1.75;
  return (
    <group>
      <mesh position={[0, 0.012, 0]} castShadow>
        <boxGeometry args={[0.32, 0.014, 0.22]} />
        <meshStandardMaterial color="#1f2933" roughness={0.35} metalness={0.4} />
      </mesh>
      <group position={[0, 0.02, -0.1]} rotation={[lid, 0, 0]}>
        <mesh position={[0, 0.11, 0]} castShadow>
          <boxGeometry args={[0.32, 0.22, 0.01]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.11, 0.006]}>
          <planeGeometry args={[0.29, 0.18]} />
          {screen ? (
            <meshStandardMaterial
              map={screen}
              emissive="#ffffff"
              emissiveMap={screen}
              emissiveIntensity={0.55}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial color="#0b1e3d" emissive="#1e63d6" emissiveIntensity={0.35} />
          )}
        </mesh>
      </group>
    </group>
  );
}

export function Monitor({
  width = 0.7,
  height = 0.42,
  map,
  bezel = "#1a1d22",
}: {
  width?: number;
  height?: number;
  map?: THREE.Texture;
  bezel?: string;
}) {
  return (
    <group>
      <mesh position={[0, height / 2 + 0.14, 0]} castShadow>
        <boxGeometry args={[width + 0.04, height + 0.04, 0.04]} />
        <meshStandardMaterial color={bezel} roughness={0.4} metalness={0.25} />
      </mesh>
      <mesh position={[0, height / 2 + 0.14, 0.022]}>
        <planeGeometry args={[width, height]} />
        {map ? (
          <meshStandardMaterial
            map={map}
            emissive="#fff"
            emissiveMap={map}
            emissiveIntensity={0.62}
            toneMapped={false}
          />
        ) : (
          <meshStandardMaterial color={NAVY} emissive="#0ea5e9" emissiveIntensity={0.3} />
        )}
      </mesh>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 0.16, 12]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color="#374151" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Cabinet({
  width = 0.9,
  height = 1.4,
  depth = 0.4,
  drawers = 3,
}: {
  width?: number;
  height?: number;
  depth?: number;
  drawers?: number;
}) {
  const h = (height - 0.08) / drawers;
  return (
    <group>
      <BoxMesh args={[width, height, depth]} position={[0, height / 2, 0]} color="#dfe5ec" roughness={0.7} />
      {Array.from({ length: drawers }).map((_, i) => (
        <group key={i} position={[0, 0.06 + i * h + h / 2, depth / 2 + 0.005]}>
          <BoxMesh args={[width - 0.08, h - 0.04, 0.02]} color="#c9d2dc" />
          <mesh position={[0, 0, 0.016]}>
            <boxGeometry args={[0.12, 0.018, 0.02]} />
            <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Plant({ scale = 1 }: { scale?: number }) {
  const leaves = useMemo(
    () =>
      [
        [0.12, 0.42, 0.05, 0.7],
        [-0.1, 0.38, -0.08, 0.85],
        [0.02, 0.5, -0.1, 1],
        [0.08, 0.34, 0.12, 0.6],
        [-0.12, 0.46, 0.06, 0.75],
      ] as [number, number, number, number][],
    [],
  );
  return (
    <group scale={scale}>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.07, 0.16, 12]} />
        <meshStandardMaterial color="#c07a4a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.078, 0.078, 0.04, 12]} />
        <meshStandardMaterial color="#5a3a22" />
      </mesh>
      {leaves.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]} scale={s} castShadow>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshStandardMaterial color={i % 2 ? "#3f7a45" : "#2f6a3a"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function Pegboard({ width = 1.6, height = 1.1, map }: { width?: number; height?: number; map?: THREE.Texture }) {
  return (
    <mesh position={[0, height / 2, 0]} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={map} color={map ? "#ffffff" : "#cfd6de"} roughness={0.75} />
    </mesh>
  );
}

export function Bin({ color, position }: { color: string; position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.14, 0.1, 0.18]} />
      <meshStandardMaterial color={color} roughness={0.55} />
    </mesh>
  );
}

export function Stool() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
        <meshStandardMaterial color="#f4c430" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 10]} />
        <meshStandardMaterial color={METAL} metalness={0.55} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.14, 16]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
    </group>
  );
}

export function Sofa() {
  return (
    <group>
      <RoundedBox args={[1.35, 0.38, 0.62]} radius={0.06} position={[0, 0.28, 0]} castShadow>
        <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[1.35, 0.38, 0.12]} radius={0.04} position={[0, 0.52, -0.24]} castShadow>
        <meshStandardMaterial color="#1b4332" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.28, 0.58]} radius={0.04} position={[-0.62, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#1b4332" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.12, 0.28, 0.58]} radius={0.04} position={[0.62, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#1b4332" roughness={0.7} />
      </RoundedBox>
    </group>
  );
}

export function ShelfUnit({
  width = 1.5,
  height = 1.7,
  depth = 0.32,
  shelves = 4,
  color = "#d7dde5",
}: {
  width?: number;
  height?: number;
  depth?: number;
  shelves?: number;
  color?: string;
}) {
  return (
    <group>
      <BoxMesh args={[0.04, height, depth]} position={[-width / 2, height / 2, 0]} color={color} />
      <BoxMesh args={[0.04, height, depth]} position={[width / 2, height / 2, 0]} color={color} />
      {Array.from({ length: shelves }).map((_, i) => (
        <BoxMesh
          key={i}
          args={[width, 0.03, depth]}
          position={[0, 0.12 + (i * (height - 0.2)) / (shelves - 1), 0]}
          color={color}
        />
      ))}
      <BoxMesh args={[width, 0.04, depth]} position={[0, height, 0]} color={NAVY} />
    </group>
  );
}

export function LogoPlate({
  map,
  width = 1.7,
  aspect = 1.4,
}: {
  map?: THREE.Texture;
  width?: number;
  aspect?: number;
}) {
  const h = width / aspect;
  return (
    <mesh>
      <planeGeometry args={[width, h]} />
      {map ? (
        <meshStandardMaterial
          map={map}
          transparent
          roughness={0.3}
          metalness={0.05}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      ) : (
        <meshStandardMaterial color={NAVY} />
      )}
    </mesh>
  );
}
