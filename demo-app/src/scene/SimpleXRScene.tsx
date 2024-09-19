import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useXR } from '@react-three/xr';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import { PerspectiveCamera, Sphere } from '@react-three/drei';

import Atom from '../components/common/Particles/Atom';
// import SpaceSkyBox from '../components/common/SkyBoxes/SpaceSkyBox';
import SolidSkyBox from '../components/common/SkyBoxes/SolidSkyBox';
import BlueFrameTrail from '../components/common/Particles/BlueFrameTrail';
import BangExplosion from '../components/common/Particles/BangExplosion';
import SqueakGhostWin from '../components/common/3DObjects/SqueakGhostWin';
import { BoxObject } from '../components/common/3DObjects/BoxObject';
import CircleSkyBox from '../components/common/SkyBoxes/CircleSkyBox';

interface SimpleXRSceneProps {
  sessionMode: XRSessionMode | null;
  onSessionEnd: () => void;
}

export default function SimpleXRScene({
  sessionMode,
  onSessionEnd,
}: SimpleXRSceneProps) {
  const session = useXR((state) => state.session);
  const boxRef = useRef<any>(null);
  const [red, setRed] = useState(false);
  const [shouldDisplaySkyBox, setShouldDisplaySkyBox] = useState(true);
  const [particlePosition, setParticlePosition] = useState(
    new Vector3(0, 0, 0),
  );

  useEffect(() => {
    const mode = sessionMode;
    setShouldDisplaySkyBox(mode === XRSessionMode.ImmersiveVR);
  }, [sessionMode]);

  useEffect(() => {
    if (!session) return;
    session.addEventListener('end', onSessionEnd);
    return () => {
      session.removeEventListener('end', onSessionEnd);
    };
  }, [session]);

  return (
    <>
      {shouldDisplaySkyBox ? (
        <CircleSkyBox textureUrl="/sky-box/galaxy.png" />
      ) : (
        <SolidSkyBox />
      )}
      <Atom
        enable={true}
        scale={new Vector3(0.02, 0.02, 0.02)}
        position={new Vector3(2, 1, 1)}
      />

      <BlueFrameTrail
        attachedObject={boxRef}
        enable={true}
        scale={new Vector3(0.1, 0.1, 0.1)}
        position={new Vector3(0, 0, 0)}
      />

      <BangExplosion
        enable={true}
        scale={new Vector3(0.5, 0.5, 0.5)}
        position={particlePosition}
      />

      {/** Make joysticks are more brighten */}
      <ambientLight intensity={2} />
      <directionalLight
        position={[0, 10, 0]}
        rotation={[90, 0, 0]}
        intensity={30}
      />

      <PerspectiveCamera
        makeDefault
        position={[0, 3.5, 4]}
        rotation={[31, 0, 0]}
      />

      {/** Example render 3D Model with animation + Random spawn */}
      <SqueakGhostWin
        objectID="1234"
        usedPositions={[]}
        triggerAction="clip_hips_s:SSC"
        scale={0.3}
        onClick={(event) => {
          setParticlePosition(event.point);
        }}
      />

      <BoxObject
        color={red ? 'red' : 'yellow'}
        onClick={(event) => {
          console.log('clicked', event);
          setRed(!red);
          setParticlePosition(event.point);
        }}
        position={[0, 1.2, -2]}
        scale={[0.5, 0.5, 0.5]}
      >
        {/** Add a sphere inside the box. Its position, rotation and scale will be local  */}
        <Sphere scale={[0.5, 0.5, 0.5]} position={[1, 1, -1]} ref={boxRef}>
          <meshStandardMaterial color="green" />
        </Sphere>
      </BoxObject>
    </>
  );
}
