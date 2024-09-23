import React, { useState } from 'react';
import { useXRSession } from '../hooks/useXRSession';
import StartGameScene from './StartGameScene';
import { Progress } from '@react-three/uikit-default';
import { Container, Root } from '@react-three/uikit';
import InGameScene from './InGameScene';

interface AllGameSceneProps {
  store: any;
}

enum GameScene {
  START,
  IN_GAME,
  END_GAME,
}

export default function AllGameScene(props: AllGameSceneProps) {
  const { store } = props;

  const {
    onXRRequestChangeMode,
    onXRRequestReset,
    sessionMode,
    isLoading,
    progress,
  } = useXRSession({ store });

  const [currentGameScene, setStartGameScene] = useState(GameScene.START);

  const isGameStarted = currentGameScene === GameScene.IN_GAME;
  // const isGameEnded = currentGameScene === GameScene.END_GAME;

  return (
    <>
      {isGameStarted && (
        <InGameScene
          sessionMode={sessionMode}
          onSessionEnd={onXRRequestReset}
        />
      )}
      {!isGameStarted && (
        <StartGameScene
          onGameStart={(mode) => {
            setStartGameScene(GameScene.IN_GAME);
            onXRRequestChangeMode(mode);
          }}
        />
      )}
      {isLoading && (
        <Root>
          <Container flexDirection={'column'}>
            <Progress value={progress} width={200} />
          </Container>
        </Root>
      )}
    </>
  );
}
