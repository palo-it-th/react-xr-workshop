import React, { useState } from 'react';
import { useXRSession } from '../hooks/useXRSession';
import SimpleXRScene from './SimpleXRScene';
import StartGameScene from './StartGameScene';
import { Progress } from '@react-three/uikit-default';
import { Container, Root } from '@react-three/uikit';

interface AllGameSceneProps {
  store: any;
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

  const [isGameStarted, setIsStarted] = useState(false);

  return (
    <>
      {isGameStarted && (
        <SimpleXRScene
          sessionMode={sessionMode}
          onSessionEnd={onXRRequestReset}
        />
      )}
      {!isGameStarted && (
        <StartGameScene
          onGameStart={(mode) => {
            setIsStarted(true);
            onXRRequestChangeMode(mode);
          }}
        />
      )}

      <Root>
        <Container flexDirection={'column'}>
          {isLoading && <Progress value={progress} width={200} />}
        </Container>
      </Root>
    </>
  );
}
