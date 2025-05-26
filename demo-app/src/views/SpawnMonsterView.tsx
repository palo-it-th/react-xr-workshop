import React, { useEffect, useMemo, useRef } from 'react';

import { Vector3 } from 'three';
import { v4 as uuid } from 'uuid';

import Drone from '../components/common/3DObjects/Drone';
import BangExplosion from '../components/common/Particles/BangExplosion';
import { useGlobalGameStore } from '../state/globalGameStore';
import {
  PositionScene,
  useGlobalPositionStore,
} from '../state/globalUsedPositionStore';
import { MonsterCurrentState } from '../types/common';

const MONSTER_COUNT = 6;
const REMOVE_DEAD_MONSTER_TIMER = 500;
const ADD_NEW_MONSTER_TIMER = 1000;
const RE_SPAWN_TIMER = 5000;

interface MonsterSpawnViewProps {
  monsterCount?: number;
  removeDeadMonsterTimer?: number;
  addNewMonsterTimer?: number;
  reSpawnTimer?: number;
  monsterHitPoints?: number;
  onHitMonster?: (id: string) => void;
}

const MonsterSpawnView = (props: MonsterSpawnViewProps) => {
  const {
    monsterCount = MONSTER_COUNT,
    removeDeadMonsterTimer = REMOVE_DEAD_MONSTER_TIMER,
    addNewMonsterTimer = ADD_NEW_MONSTER_TIMER,
    reSpawnTimer = RE_SPAWN_TIMER,
    onHitMonster,
  } = props;

  const isInitializedRef = useRef(false);
  const gameStore = useGlobalGameStore((state) => state);
  const positionStore = useGlobalPositionStore((state) => state);

  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;
    gameStore.generateMonsters(monsterCount);
    return () => {
      gameStore.resetMonster();
    };
  }, []);

  const onClick = (id: string) => {
    if (gameStore.monsters[id].monsterState === MonsterCurrentState.DEAD) {
      return;
    }
    onMonsterDead(id);
    handleOnHitMonster(id);
  };

  const onMonsterDead = (id: string) => {
    gameStore.updateMonster(id, MonsterCurrentState.DEAD);

    positionStore.removeUsedPosition(PositionScene.DroneSpawnScene, id);

    setTimeout(() => {
      gameStore.removeMonster(id);
      addNewMonster();
    }, removeDeadMonsterTimer);
  };

  const addNewMonster = () => {
    setTimeout(() => {
      const id = uuid();
      gameStore.addMonster(id, MonsterCurrentState.RUN);
    }, addNewMonsterTimer);
  };

  const onMonsterSpawned = (id: string, position: Vector3) => {
    positionStore.addUsedPosition(PositionScene.DroneSpawnScene, id, position);
  };

  const handleOnHitMonster = (id: string) => {
    onHitMonster && onHitMonster(id);
  };

  const isFirstRender = useMemo(() => {
    return (
      gameStore.particlePosition.x === 0 && gameStore.particlePosition.y === 0
    );
  }, [gameStore.particlePosition]);

  return (
    <>
      {!isFirstRender && (
        <BangExplosion
          enable={true}
          scale={new Vector3(0.5, 0.5, 0.5)}
          position={gameStore.particlePosition}
        />
      )}
      {gameStore.monsters &&
        Object.keys(gameStore.monsters).map((id) => {
          const monsters = gameStore.monsters;
          const isDead = monsters[id].monsterState === MonsterCurrentState.DEAD;
          return (
            <Drone
              key={id}
              objectID={id}
              respawnTimer={reSpawnTimer}
              triggerAction="Vertical"
              scale={isDead ? 1 : 3}
              initialPosition={new Vector3(0, 0, -100)}
              stopAllActions={isDead}
              monsterActionState={monsters[id].monsterState}
              onClick={(event) => {
                event.stopPropagation();
                onClick(id);
                gameStore.updateParticlePosition(event.point);
              }}
              usedPositions={Object.values(
                positionStore.usedPositions['DroneSpawnScene'],
              )}
              onMonsterSpawnedByObjectId={onMonsterSpawned}
            />
          );
        })}
    </>
  );
};

export default MonsterSpawnView;
