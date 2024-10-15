import React from 'react';
import BasicBox from '../components/Box';
import { CameraControls } from '@react-three/drei';

export default function Simple3DUtilitiesScene() {
  return (
    <>
      {/* CameraControls is a component that provides a set of controls for the camera*/}
      <CameraControls />
      {/* ambientLight is a component that adds ambient light to the scene */}
      <ambientLight intensity={Math.PI / 2} />
      {/* spotLight is a component that adds a spotlight to the scene */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      {/* pointLight is a component that adds a point light to the scene */}
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {/* BasicBox is a component that renders a box */}
      <BasicBox position={[-1.2, 0, 0]} />
      <BasicBox position={[1.2, 0, 0]} />
    </>
  );
}
