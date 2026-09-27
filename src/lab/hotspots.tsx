import { useMemo, useState } from "react";
import { Billboard, useCursor } from "@react-three/drei";
import { ZONES } from "./config";
import { useLab } from "./store";
import { makeHotspotTexture } from "./textures";

export function Hotspots() {
  const selected = useLab((s) => s.selected);
  const hovered = useLab((s) => s.hovered);
  const select = useLab((s) => s.select);
  const setHovered = useLab((s) => s.setHovered);
  const phase = useLab((s) => s.phase);

  const textures = useMemo(() => {
    const map = new Map<string, ReturnType<typeof makeHotspotTexture>>();
    for (const z of ZONES) {
      map.set(`${z.id}-0`, makeHotspotTexture(z.id, false, z.color));
      map.set(`${z.id}-1`, makeHotspotTexture(z.id, true, z.color));
    }
    return map;
  }, []);

  if (phase !== "explore") return null;

  return (
    <group>
      {ZONES.map((z) => {
        if (selected === z.id) return null;
        const on = hovered === z.id;
        const tex = textures.get(`${z.id}-${on ? 1 : 0}`);
        return (
          <Hotspot
            key={z.id}
            id={z.id}
            position={z.pos}
            map={tex}
            on={on}
            onHover={setHovered}
            onSelect={select}
          />
        );
      })}
    </group>
  );
}

function Hotspot({
  id,
  position,
  map,
  on,
  onHover,
  onSelect,
}: {
  id: number;
  position: [number, number, number];
  map: ReturnType<typeof makeHotspotTexture> | undefined;
  on: boolean;
  onHover: (id: number | null) => void;
  onSelect: (id: number) => void;
}) {
  const [over, setOver] = useState(false);
  useCursor(over);
  return (
    <Billboard position={position} follow>
      <mesh
        scale={on ? 1.12 : 1}
        onPointerOver={(e) => {
          e.stopPropagation();
          setOver(true);
          onHover(id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setOver(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
      >
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial map={map} transparent depthTest={false} />
      </mesh>
    </Billboard>
  );
}
