import { useRef, useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { BoxObject } from '../common/BoxObject';
import SkyBox from '../common/SkyBox';

export default function SimpleMeshScene() {
  const [red, setRed] = useState(false);

  return (
    <>
      <SkyBox />
      <ambientLight intensity={2} />
      <pointLight position={[0, 10, 0]} intensity={30} rotation={[90, 0, 0]} />

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
