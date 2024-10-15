import React from 'react';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import { OrbitControls, CameraShake } from '@react-three/drei';
import Atom from '../components/Atom';

export default function SimpleVFXScene() {
  return (
    <>
      {/* Camera control */}
      <OrbitControls />
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      {/* Render grids */}
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />
      {/* Render particles */}
      <Atom position={new Vector3(-4, 2, -2)} />
      <Atom position={new Vector3(0, 2, -2)} />
      <Atom position={new Vector3(4, 2, -2)} />
    </>
  );
}
