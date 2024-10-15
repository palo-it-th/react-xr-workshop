import React, { useEffect, useRef, useState } from 'react';
import { AxesHelper, GridHelper, Mesh, Vector3 } from 'three';
import { OrbitControls, Text, CameraShake } from '@react-three/drei';
import { Box3D } from '../components/Box';
import { useRandomPosition } from '../hooks/useRandomPosition';

export default function Simple3DModelTransitionsScene() {
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

  const textRef = useRef<Mesh>();
  useEffect(() => {
    textRef.current?.scale.set(2, 2, 2);
  }, []);

  return (
    <>
      <OrbitControls />
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />

      {/*
        Randomly spawn boxes
      */}
      <Box3D ref={refBox1} geometry={{ position: [-4, 0, -5] }} color={'red'} />
      <Box3D
        ref={refBox2}
        geometry={{ position: [0, 0, -8] }}
        color={'green'}
      />
      <Box3D ref={refBox3} geometry={{ position: [0, 0, 0] }} color={'blue'} />

      {/*
        3D Transitions : Position
       */}
      {/* <Text position={[0, 1, -4]}>position(x0,y1,z-4)</Text>
      <Text position={[0, 1, -4]}>position(x0,y1,z-4)</Text> */}

      {/* 

      {/*
        3D Transitions : Rotation
       */}

      {/* <Text rotation={[0, 1.6, 0]} position={[0, 1, -2]}>
        Rotation(0,1.6,0)
      </Text>
      <Text ref={textRef} position={[0, 1, -2]}>
        Rotation(0,1.6,0)
      </Text> */}

      {/*
        3D Transitions : Scale
       */}
      {/* <Text scale={[2, 2, 2]} position={[0, 1, -4]}>
        Scale(2x,2x,2x)
      </Text>

      <Text ref={textRef} position={[0, 1, -4]}>
        Scale(2x,2x,2x)
      </Text> */}
    </>
  );
}
