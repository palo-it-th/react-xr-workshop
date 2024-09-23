import { useEffect, useRef, useState } from 'react';
import { useXR } from '@react-three/xr';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Container, Root, Text } from '@react-three/uikit';
import { useFrame } from 'react-three-fiber';
import { Card } from '@react-three/uikit-default';

import SolidSkyBox from '../components/common/SkyBoxes/SolidSkyBox';
import CircleSkyBox from '../components/common/SkyBoxes/CircleSkyBox';
import MonsterSpawnScene from './MonsterSpawnScene';
import XRUIWrapper from '../components/common/UI/XRUIWrapper';

interface InGameSceneProps {
  sessionMode: XRSessionMode | null;
  onSessionEnd: () => void;
}

export default function InGameScene({
  sessionMode,
  onSessionEnd,
}: InGameSceneProps) {
  const session = useXR((state) => state.session);

  const [shouldDisplaySkyBox, setShouldDisplaySkyBox] = useState(true);
  const [shouldDisplayMonsters, setShouldDisplayMonsters] = useState(false);
  const [gamePoints, setGamePoints] = useState(0);

  const scoreBoardRef = useRef<THREE.Mesh>(null);
  const timeBoardRef = useRef<THREE.Mesh>(null);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const mode = sessionMode;
    setShouldDisplaySkyBox(mode === XRSessionMode.ImmersiveVR);
  }, [sessionMode]);

  useEffect(() => {
    if (!session) return;
    session.addEventListener('end', onSessionEnd);
    return () => {
      session.removeEventListener('end', onSessionEnd);
    };
  }, [session]);

  useEffect(() => {
    setTimeout(() => {
      setShouldDisplayMonsters(true);
    }, 5000);
  }, []);

  useFrame(() => {
    adjustBoardPosition();
  });

  useEffect(() => {
    if (!shouldDisplayMonsters) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [shouldDisplayMonsters]);

  const adjustBoardPosition = () => {
    if (scoreBoardRef.current) {
      scoreBoardRef.current.lookAt(3, 0, 0);
    }
    if (timeBoardRef.current) {
      timeBoardRef.current.lookAt(-3, 0, 0);
    }
  };

  const POINTS_PER_HIT = 10;

  const onHitMonster = (id: string) => {
    setGamePoints((prev) => prev + POINTS_PER_HIT);
  };

  return (
    <>
      {shouldDisplaySkyBox ? (
        <CircleSkyBox textureUrl="/sky-box/galaxy.png" />
      ) : (
        <SolidSkyBox />
      )}
      <ambientLight intensity={2} />
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {shouldDisplayMonsters && (
        <>
          <MonsterSpawnScene onHitMonster={onHitMonster} />
          <XRUIWrapper ref={timeBoardRef} position={[-5, -0.8, -5]}>
            <Root flexDirection="row">
              <Card color={'red'} height={60} width={200} receiveShadow>
                <Container
                  flexDirection="row"
                  gap={6}
                  padding={6}
                  justifyContent={'center'}
                >
                  <Text fontSize={28}>Time: </Text>
                  <Text fontSize={40}>{`${countdown}`}</Text>
                </Container>
              </Card>
            </Root>
          </XRUIWrapper>
          <XRUIWrapper ref={scoreBoardRef} position={[5, -0.8, -5]}>
            <Root flexDirection="row">
              <Card height={60} width={200} opacity={0.8} receiveShadow>
                <Container
                  flexDirection="row"
                  gap={6}
                  padding={6}
                  justifyContent={'center'}
                >
                  <Text fontSize={24}>Score: </Text>
                  <Text fontSize={32}>{`${gamePoints}`}</Text>
                </Container>
              </Card>
            </Root>
          </XRUIWrapper>
        </>
      )}
    </>
  );
}
