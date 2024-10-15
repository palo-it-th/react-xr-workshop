import React from 'react';
import { AxesHelper, GridHelper } from 'three';
import { OrbitControls } from '@react-three/drei';
import { CatModel } from '../components/Cat';

export default function Simple3DToJSXScene() {
  return (
    <>
      <OrbitControls />
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />
      <CatModel />
    </>
  );
}
