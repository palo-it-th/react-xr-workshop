import React from 'react';
import { AxesHelper, GridHelper } from 'three';
import { CameraControls } from '@react-three/drei';
import CycleSkyBox from '../components/CycleSkyBox';

export default function SimpleCycleSkyBoxScene() {
  return (
    <>
      <CameraControls />
      <color attach="background" args={['#111']} />
      {/* <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} /> */}
      <CycleSkyBox textureUrl="/sky-box/galaxy-sky.png" />
    </>
  );
}
