import React, { useState } from 'react';
import { XR, createXRStore } from '@react-three/xr';
import { Button } from '@react-three/uikit-default';
import { OrbitControls } from '@react-three/drei';
import { GridHelper } from 'three';
import { Root, Text } from '@react-three/uikit';
import ExampleXR from '../components/ExampleXR';

const store = createXRStore({
  frameRate: 'high',
});

const SimpleXRSelect = () => {
  const [mode, setMode] = useState<'VR' | 'AR' | null>(null);

  return (
    <>
      <group position={[0, 2, 1]}>
        <Root gap={20}>
          <Button
            variant={'outline'}
            onClick={() => {
              setMode('VR');
              store.enterVR();
            }}
          >
            <Text fontWeight="bold" color="white">
              Enter Immersive VR
            </Text>
          </Button>
          <Button
            variant={'outline'}
            onClick={() => {
              setMode('AR');
              store.enterAR();
            }}
          >
            <Text fontWeight="bold" color="white">
              Enter Immersive AR
            </Text>
          </Button>
        </Root>
      </group>
      <XR store={store}>
        <OrbitControls />
        <color attach="background" args={['#111']} />
        <ambientLight intensity={2} />
        <primitive object={new GridHelper(40, 40)} />
        <ExampleXR mode={mode} />
      </XR>
    </>
  );
};

export default SimpleXRSelect;
