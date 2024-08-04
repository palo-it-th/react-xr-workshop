import { useXRStore, XRStore } from '@react-three/xr';
import { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import { BoxObject } from '../common/BoxObject';
import { useFrame } from '@react-three/fiber';
import { Mesh, AxesHelper, GridHelper } from 'three';

export default function SimpleMeshScene() {
  const [red, setRed] = useState(false);
  const xrStore: XRStore = useXRStore();
  const [isSupported, setIsSupported] = useState(false);
  const refBox = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    if (refBox.current !== null) {
      refBox.current.rotation.x += delta;
      refBox.current.rotation.y -= delta;
    }
  });

  const openARSession = () => {
    if (xrStore.getState().session) {
      setIsSupported(true);
      return;
    }
    if (navigator?.xr === undefined) {
      setIsSupported(false);
      return;
    }
    navigator?.xr
      ?.isSessionSupported(XRSessionMode.ImmersiveAR)
      .then((supported) => {
        setIsSupported(supported);
        if (supported) {
          xrStore.enterAR();
        }
      });
  };

  useEffect(() => {
    openARSession();
  }, []);

  //TODO : Implement game logic here

  return (
    <>
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <pointLight position={[20, 10, -10]} intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(20, 20)} />
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
          <div style={{ width: '100%', flexGrow: 1 }}>AR not supported!!!</div>
        </Html>
      )}
    </>
  );
}
