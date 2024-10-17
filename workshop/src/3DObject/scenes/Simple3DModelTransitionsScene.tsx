import React, { useEffect, useRef, useState } from 'react';
import { AxesHelper, GridHelper, Mesh } from 'three';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { Box3D } from '../components/Box';
import { useRandomPosition } from '../hooks/useRandomPosition';

enum Simple3DModelTransitionsSceneView {
  Init = 'Init',
  Translate = 'Translate',
  Rotate = 'Rotate',
  Scale = 'Scale',
}

export default function Simple3DModelTransitionsScene() {
  const refBox1 = useRef<Mesh>();
  const refBox2 = useRef<Mesh>();
  const refBox3 = useRef<Mesh>();

  const [isEnableAutoSpawn, setIsEnableAutoSpawn] = useState(false);
  const [sceneView, setSceneView] = useState(
    Simple3DModelTransitionsSceneView.Init,
  );

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
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />

      {
        {
          [Simple3DModelTransitionsSceneView.Init]: (
            <>
              <Box3D
                ref={refBox1}
                geometry={{ position: [-4, 0, -5] }}
                color={'red'}
              />
              <Box3D
                ref={refBox2}
                geometry={{ position: [0, 0, -8] }}
                color={'green'}
              />
              <Box3D
                ref={refBox3}
                geometry={{ position: [0, 0, 0] }}
                color={'blue'}
              />
            </>
          ),
          [Simple3DModelTransitionsSceneView.Translate]: <TranslateScene />,
          [Simple3DModelTransitionsSceneView.Rotate]: <RotateScene />,
          [Simple3DModelTransitionsSceneView.Scale]: <ScaleScene />,
        }[sceneView]
      }

      <Html fullscreen>
        <div style={{ display: 'flex', flexDirection: 'column', width: 150 }}>
          {Object.values(Simple3DModelTransitionsSceneView).map((action) => (
            <button
              style={{ margin: 5, padding: 5 }}
              key={action}
              onClick={() => {
                setSceneView(action);
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </Html>
    </>
  );
}

const TranslateScene = () => {
  return (
    <>
      <Text position={[0, 0, 0]}>position(x0,y0,z0)</Text>
      <Text position={[0, 2, -4]}>position(x0,y1,z-4)</Text>
    </>
  );
};

const RotateScene = () => {
  const textRef = useRef<Mesh>();
  useEffect(() => {
    textRef.current?.rotation.set(0, 1.6, 0);
  }, []);

  return (
    <>
      <Text position={[0, 1, -2]}>Rotation(0,1.6,0)</Text>
      <Text ref={textRef} position={[0, 1, -2]}>
        Rotation(0,1.6,0)
      </Text>
    </>
  );
};

const ScaleScene = () => {
  const textRef = useRef<Mesh>();

  useEffect(() => {
    textRef.current?.scale.set(2, 2, 2);
  }, []);

  return (
    <>
      <Text position={[0, 0, 0]}>Scale(Default)</Text>

      <Text ref={textRef} position={[0, 1, -4]}>
        Scale(2x,2x,2x)
      </Text>

      <Box3D geometry={{ position: [0, 5, -6], scale: 1 }} color={'red'} />
    </>
  );
};
