import React from 'react';
import { AxesHelper, GridHelper } from 'three';
import { OrbitControls, CameraShake } from '@react-three/drei';

export default function Simple3DToJSXScene() {
  return (
    <>
      <OrbitControls />
      <CameraShake />
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />
    </>
  );
}
