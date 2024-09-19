import { Html } from '@react-three/drei';
import React from 'react';
import '../../../styles/MachineScreen.css';

export default function MachineScreen() {
  return (
    <Html
      position={[0.055, -0.145, 1.865]}
      transform
      rotation={[1.3, 0, 0]}
      scale={0.16}
    >
      <div className='blink-container'>
        <h1 className="blink">START GAME</h1>
      </div>
    </Html>
  );
}
