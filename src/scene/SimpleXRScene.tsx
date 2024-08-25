import { useEffect, useState } from 'react';
import { PerspectiveCamera, Sphere } from '@react-three/drei';
import { BoxObject } from '../common/3DObjects/BoxObject';
import SpaceSkyBox from '../common/SkyBoxes/SpaceSkyBox';
import { useXR } from '@react-three/xr';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import ClearSkyBox from '../common/SkyBoxes/ClearSkyBox';
import Atom from '../common/Particles/Atom';
import { Vector3 } from 'three';

interface SimpleXRSceneProps {
  sessionMode: XRSessionMode | null;
  onSessionEnd: () => void;
}

export default function SimpleXRScene({
  sessionMode,
  onSessionEnd,
}: SimpleXRSceneProps) {
  const session = useXR((state) => state.session);
  const [red, setRed] = useState(false);
  const [shouldDisplaySkyBox, setShouldDisplaySkyBox] = useState(true);

  useEffect(() => {
    const mode = sessionMode;
    setShouldDisplaySkyBox(mode === null || mode === XRSessionMode.ImmersiveVR);
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
      {shouldDisplaySkyBox ? <SpaceSkyBox /> : <ClearSkyBox />}
      <Atom
        enable={true}
        scale={new Vector3(0.025, 0.025, 0.025)}
        position={new Vector3(1, 1, 0)}
      />
      {/** Make joysticks are more brighten */}
      <ambientLight intensity={2} />
      <directionalLight position={[0, 10, 0]} intensity={30} />

      <PerspectiveCamera
        makeDefault
        position={[0, 1.6, 2]}
        rotation={[31, 0, 0]}
      />
      <BoxObject
        color={red ? 'red' : 'yellow'}
        onClick={() => {
          console.log('clicked');
          setRed(!red);
        }}
        position={[0, 1, -1]}
        scale={[0.5, 0.5, 0.5]}
      />
      <Sphere scale={[0.2, 0.2, 0.2]} position={[0, 1, -1]}>
        <meshStandardMaterial color="green" />
      </Sphere>
    </>
  );
}
