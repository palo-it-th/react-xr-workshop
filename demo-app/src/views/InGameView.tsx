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
import SpawnMonsterView from './SpawnMonsterView';
import XRUIWrapper from '../components/common/UI/XRUIWrapper';
import { useGlobalGameStore } from '../state/globalGameStore';
import { GameSceneView, MonsterCurrentState } from '../types/common';
import PreStartGameView from './PreStartGameView';
import EndGameView from './EndGameView';

const MONSTER_HIT_POINTS = 50;

interface InGameViewProps {
  sessionMode: XRSessionMode | null;
  onSessionEnd: () => void;
}

export default function InGameScene({
  sessionMode,
  onSessionEnd,
}: InGameViewProps) {
  const session = useXR((state) => state.session);
  const gameStore = useGlobalGameStore((state) => state);
  const isGamePreStart = gameStore.gameView === GameSceneView.IN_GAME_PRE_START;
  const isGameStarted = gameStore.gameView === GameSceneView.IN_GAME;
  const isGameEnded = gameStore.gameView === GameSceneView.END_GAME;

  const scoreBoardRef = useRef<THREE.Mesh>(null);
  const timeBoardRef = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const [shouldDisplaySkyBox, setShouldDisplaySkyBox] = useState(true);
  const [isPreLoaded, setIsPreLoaded] = useState(false);

  const shouldDisplayPreStart =
    isGamePreStart && !isGameStarted && !isGameEnded;
  const shouldDisplayStarted = isPreLoaded && !isGamePreStart && isGameStarted;

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
      setIsPreLoaded(true);
    }, 3000);
  }, []);

  useFrame(() => {
    adjustBoardPosition();
  });

  useEffect(() => {
    if (!isGameStarted) return;
    const timer = setInterval(() => {
      const time = gameStore.timeCountDown;
      if (time === 0) {
        gameStore.setTimeCountDown(0);
        gameStore.setGameView(GameSceneView.END_GAME);
        clearInterval(timer);
        return;
      }
      gameStore.setTimeCountDown(time - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameStarted, gameStore.timeCountDown]);

  const adjustBoardPosition = () => {
    if (scoreBoardRef.current) {
      scoreBoardRef.current.lookAt(3, 0, 0);
    }
    if (timeBoardRef.current) {
      timeBoardRef.current.lookAt(-3, 0, 0);
    }
  };

  const onHitMonster = (id: string) => {
    if (
      gameStore.monsters[id].monsterState === MonsterCurrentState.DEAD ||
      isGameEnded
    ) {
      return;
    }
    gameStore.addPoints(MONSTER_HIT_POINTS);
  };

  const onQuit = () => {
    window.location.reload();
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
        ref={cameraRef}
        makeDefault
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {shouldDisplayPreStart && <PreStartGameView />}

      {shouldDisplayStarted && (
        <>
          <SpawnMonsterView onHitMonster={onHitMonster} />

          <XRUIWrapper ref={timeBoardRef} position={[-5, -0.8, -5]}>
            <Root flexDirection="row">
              <Card color={'red'} height={60} width={200} receiveShadow>
                <Container
                  flexDirection="row"
                  gap={6}
                  padding={6}
                  justifyContent={'center'}
                >
                  <Text fontSize={28}>TIME: </Text>
                  <Text fontSize={40}>{`${gameStore.timeCountDown}`}</Text>
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
                  <Text fontSize={24}>SCORE: </Text>
                  <Text fontSize={32}>{`${gameStore.points}`}</Text>
                </Container>
              </Card>
            </Root>
          </XRUIWrapper>
        </>
      )}

      {isGameEnded && (
        <EndGameView
          onQuit={onQuit}
          onRestart={() => {
            gameStore.restartGame();
          }}
        />
      )}
    </>
  );
}
