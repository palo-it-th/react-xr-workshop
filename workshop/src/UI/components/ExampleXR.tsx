import React from 'react';

const ExampleXR = ({ mode }: { mode: 'VR' | 'AR' | null }) => {
  return (
    <>
      {mode === 'VR' && (
        <mesh position={[0, 1.5, -2]}>
          <boxGeometry />
          <meshStandardMaterial color="blue" />
        </mesh>
      )}
      {mode === 'AR' && (
        <mesh position={[1, 1.5, -2]}>
          <sphereGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </>
  );
};

export default ExampleXR;
