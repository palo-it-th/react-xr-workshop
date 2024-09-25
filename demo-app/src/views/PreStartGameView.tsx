import React from 'react';
import { Root, Text } from '@react-three/uikit';
import { Button } from '@react-three/uikit-default';

import { GameSceneView } from '../types/common';
import XRUIWrapper from '../components/common/UI/XRUIWrapper';
import { useGlobalGameStore } from '../state/globalGameStore';

export default function PreStartGameView() {
  const gameStore = useGlobalGameStore((state) => state);

  return (
    <XRUIWrapper position={[0, 1.5, -2.5]}>
      <Root>
        <Button
          width={200}
          onClick={() => gameStore.setGameView(GameSceneView.IN_GAME)}
        >
          <Text>START</Text>
        </Button>
      </Root>
    </XRUIWrapper>
  );
}
