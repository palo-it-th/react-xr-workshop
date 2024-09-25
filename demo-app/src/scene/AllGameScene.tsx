import React from 'react';

import { useXRSession } from '../hooks/useXRSession';
import HomeView from '../views/HomeView';
import { GameSceneView } from '../types/common';
import { useGlobalGameStore } from '../state/globalGameStore';
import InGameView from '../views/InGameView';
import LoadingView from '../views/LoadingView';

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

  const gameStore = useGlobalGameStore((state) => state);

  const isInGameView =
    gameStore.gameView === GameSceneView.IN_GAME ||
    gameStore.gameView === GameSceneView.END_GAME ||
    gameStore.gameView === GameSceneView.IN_GAME_PRE_START;
  const isHomeView = gameStore.gameView === GameSceneView.HOME;

  return (
    <>
      {isHomeView && (
        <HomeView
          onGameStart={(mode) => {
            gameStore.setGameView(GameSceneView.IN_GAME_PRE_START);
            onXRRequestChangeMode(mode);
          }}
        />
      )}

      {isInGameView && (
        <InGameView sessionMode={sessionMode} onSessionEnd={onXRRequestReset} />
      )}

      {isLoading && <LoadingView progress={progress} />}
    </>
  );
}
