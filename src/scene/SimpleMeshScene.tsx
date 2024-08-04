import { useXRStore } from '@react-three/xr';
import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import { BoxObject } from '../common/BoxObject';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function SimpleMeshScene() {
  const [red, setRed] = useState(false);
  const internalStore = useXRStore();
  const [isSupported, setIsSupported] = useState(false);
  const refBox = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (refBox.current !== null) {
      refBox.current.rotation.x += delta;
      refBox.current.rotation.y -= delta;
    }
  });

  const openARSession = () => {
    navigator?.xr
      ?.isSessionSupported(XRSessionMode.ImmersiveAR)
      .then((supported) => {
        setIsSupported(supported);
        if (supported) {
          internalStore.enterAR();
        }
      });
  };

  return (
    <>
      {isSupported ? (
        <BoxObject
          ref={refBox}
          color={red ? 'red' : 'yellow'}
          onClick={() => {
            setRed(!red);
          }}
          position={[0, 1, -1]}
          scale={[0.5, 0.5, 0.5]}
        />
      ) : (
        <Html>
          <button
            onClick={openARSession}
            style={{ width: '100px', height: '50px' }}
          >
            Enter AR
          </button>
        </Html>
      )}
    </>
  );
}
