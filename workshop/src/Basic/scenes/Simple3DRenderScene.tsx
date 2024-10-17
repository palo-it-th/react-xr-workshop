import React from 'react';
import BasicBox from '../components/Box';
import { Canvas } from 'react-three-fiber';
import { CameraControls } from '@react-three/drei';

export default function Simple3DRenderScene() {
  return (
    <>
      <CameraControls />

      {/* Render a simple 3D BasicBox component */}
      <BasicBox position={[-1.2, 0, 0]} />
    </>
  );
}
