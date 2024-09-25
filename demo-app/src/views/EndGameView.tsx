import React from 'react';
import { Root, Container, Text } from '@react-three/uikit';
import { Button, Card } from '@react-three/uikit-default';

import XRUIWrapper from '../components/common/UI/XRUIWrapper';
import { useGlobalGameStore } from '../state/globalGameStore';
import { SizedBox } from '../components/uikit-example/SizedBoxExample';

interface EndGameViewProps {
  onQuit: () => void;
  onRestart: () => void;
}

export default function EndGameView({ onQuit, onRestart }: EndGameViewProps) {
  const gameStore = useGlobalGameStore((state) => state);

  return (
    <XRUIWrapper position={[0, 1.8, -2.5]}>
      <Root>
        <Container width={300} flexDirection="column">
          <Card width={300} padding={10} justifyContent="center">
            <Text color="white">TIME UP</Text>
            <SizedBox height={2} />
            <Container height={90} flexDirection="row" justifyContent="center">
              <Text color="white">{`SCORE: ${gameStore.points}`}</Text>
            </Container>
          </Card>

          <SizedBox height={15} />
          <Container flexDirection="row" justifyContent="space-between">
            <Button width={120} onClick={onRestart}>
              <Text>TRY AGAIN</Text>
            </Button>
            <Button width={120} onClick={onQuit}>
              <Text>QUIT</Text>
            </Button>
          </Container>
        </Container>
      </Root>
    </XRUIWrapper>
  );
}
