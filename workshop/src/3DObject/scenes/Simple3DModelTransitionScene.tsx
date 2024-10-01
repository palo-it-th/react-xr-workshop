import React, { useEffect, useRef, useState } from 'react';
import { AxesHelper, GridHelper, Mesh } from 'three';
import { OrbitControls, Text, CameraShake } from '@react-three/drei';
import { Box3D } from '../components/Box';
import { useRandomPosition } from '../hooks/useRandomPosition';

export default function Simple3DModelTransitionScene() {
  const refBox1 = useRef<Mesh>();
  const refBox2 = useRef<Mesh>();
  const refBox3 = useRef<Mesh>();

  const [isEnableAutoSpawn, setIsEnableAutoSpawn] = useState(false);

  const { randomPositionVector3 } = useRandomPosition({
    usedPositions: [],
    objectSize: 2,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsEnableAutoSpawn(true);
    }, 3000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isEnableAutoSpawn) {
        refBox1.current?.position.copy(randomPositionVector3());
        refBox2.current?.position.copy(randomPositionVector3());
        refBox3.current?.position.copy(randomPositionVector3());
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [isEnableAutoSpawn]);

  return (
    <>
      <OrbitControls />
      <CameraShake />
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />
      {/* <Drone position={[5, 0, -2]} scale={3} /> */}
      <Box3D ref={refBox1} geometry={{ position: [-4, 0, -5] }} color={'red'} />
      <Box3D
        ref={refBox2}
        geometry={{ position: [0, 0, -8] }}
        color={'green'}
      />
      <Box3D ref={refBox3} geometry={{ position: [4, 0, -6] }} color={'blue'} />
      <Text scale={0.5} position={[0, 0, 0]}>
        PLAYER
      </Text>
    </>
  );
}
