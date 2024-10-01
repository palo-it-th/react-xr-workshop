import React from 'react';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import { OrbitControls, CameraShake } from '@react-three/drei';
import ExampleUI from '../components/ExampleUI';

export default function SimpleUIScene() {
  return (
    <>
      <OrbitControls />
      <CameraShake />
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new GridHelper(40, 40)} />
      <ExampleUI />
    </>
  );
}
