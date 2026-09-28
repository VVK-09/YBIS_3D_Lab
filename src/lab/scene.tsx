import { Suspense, useMemo } from "react";
import { ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Lights, Room } from "./room";
import { Zones } from "./zones";
import { CameraRig } from "./camera";
import { Hotspots } from "./hotspots";
import {
  makeCadScreen,
  makeInnovationWall,
  makeLaptopScreen,
  makeNetTexture,
  makePegboardTexture,
  makeTileTexture,
  makeExploreMural,
  makeDroneMat,
} from "./textures";

function TexturedWorld() {
  const [panel, vision, drone, logo, whiteLogo, schoolLogo, schoolLogoDark, coBrandedEntrance] = useTexture([
    "/textures/panel-ui.jpg",
    "/textures/vision-ui.jpg",
    "/textures/drone-sim.jpg",
    "/brand/logo.png",
    "/brand/white-logo.png",
    "/brand/school-logo.png",
    "/brand/school-logo-dark.png",
    "/brand/co-branded-entrance.png",
  ]);

  const generated = useMemo(() => {
    [panel, vision, drone, logo, whiteLogo, schoolLogo, schoolLogoDark, coBrandedEntrance].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
    return {
      floor: makeTileTexture(),
      cad: makeCadScreen(),
      mural: makeExploreMural(),
      wall: makeInnovationWall(),
      peg: makePegboardTexture(),
      net: makeNetTexture(),
      laptop: makeLaptopScreen(2),
      droneMat: makeDroneMat(),
    };
  }, [panel, vision, drone, logo, whiteLogo, schoolLogo, schoolLogoDark, coBrandedEntrance]);

  return (
    <>
      <Room
        floorMap={generated.floor}
        logo={logo}
        whiteLogo={whiteLogo}
        schoolLogo={schoolLogo}
        schoolLogoDark={schoolLogoDark}
        coBrandedEntrance={coBrandedEntrance}
      />
      <Zones
        maps={{
          panel,
          vision,
          drone,
          cad: generated.cad,
          mural: generated.mural,
          wall: generated.wall,
          peg: generated.peg,
          net: generated.net,
          laptop: generated.laptop,
          droneMat: generated.droneMat,
        }}
      />
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.38}
        scale={16}
        blur={2.2}
        far={3.5}
        frames={1}
        resolution={512}
      />
    </>
  );
}

export function LabScene() {
  return (
    <>
      <Lights />
      <CameraRig />
      <Suspense fallback={null}>
        <TexturedWorld />
        <Hotspots />
      </Suspense>
    </>
  );
}
