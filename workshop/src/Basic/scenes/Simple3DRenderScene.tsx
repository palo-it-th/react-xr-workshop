import React from 'react';
import BasicBox from '../components/Box';

export default function Simple3DRenderScene() {
  return (
    <>
      {/* Render a simple 3D BasicBox component */}
      <BasicBox position={[-1.2, 0, 0]} />
    </>
  );
}
