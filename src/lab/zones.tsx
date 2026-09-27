import * as THREE from "three";
import { Zone1VisionAiShowcase } from "./vision-ai-showcase";
import { Zone2PrintShowcase } from "./print-showcase";
import { Zone3BreakBuildShowcase } from "./maker-bench-showcase";
import { Zone4RoboticsShowcase } from "./robotics-showcase";
import { Zone5DroneArenaShowcase } from "./drone-arena-showcase";
import { Zone6IoTShowcase } from "./iot-showcase";
import { Zone7WorkstationsShowcase } from "./student-workstations-showcase";
import { Zone8AIServerShowcase } from "./ai-server-showcase";
import { Zone9SpatialVRShowcase } from "./spatial-vr-showcase";
import { Zone10ProjectShowcase } from "./project-showcase";

export function Zones({
  maps,
}: {
  maps: {
    panel?: THREE.Texture;
    vision?: THREE.Texture;
    drone?: THREE.Texture;
    cad?: THREE.Texture;
    mural?: THREE.Texture;
    wall?: THREE.Texture;
    peg?: THREE.Texture;
    net?: THREE.Texture;
    laptop?: THREE.Texture;
    droneMat?: THREE.Texture;
  };
}) {
  return (
    <group>
      <Zone1VisionAiShowcase map={maps.panel} />
      <Zone2PrintShowcase />
      <Zone3BreakBuildShowcase />
      <Zone4RoboticsShowcase />
      <Zone5DroneArenaShowcase drone={maps.drone} net={maps.net} mat={maps.droneMat} />
      <Zone6IoTShowcase />
      <Zone7WorkstationsShowcase laptop={maps.laptop} />
      <Zone8AIServerShowcase vision={maps.vision} />
      <Zone9SpatialVRShowcase mural={maps.mural} />
      <Zone10ProjectShowcase />
    </group>
  );
}
