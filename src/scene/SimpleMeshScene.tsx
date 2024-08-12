import { useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { BoxObject } from '../common/BoxObject';

export default function SimpleMeshScene() {
  const [red, setRed] = useState(false);

  return (
    <>
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <pointLight position={[20, 10, -10]} intensity={2} />

      <PerspectiveCamera
        makeDefault
        position={[0, 1.6, 2]}
        rotation={[31, 0, 0]}
      />
      <BoxObject
        color={red ? 'red' : 'yellow'}
        onClick={() => {
          console.log('clicked');
          setRed(!red);
        }}
        position={[0, 1, -1]}
        scale={[0.5, 0.5, 0.5]}
      />
    </>
  );
}
