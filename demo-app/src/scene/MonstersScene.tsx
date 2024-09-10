import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { v4 as uuid } from 'uuid';

import Drone from '../common/3DObjects/Drone';
import { useDroneMonsterStore } from '../state/droneMonsterStore';
import { MonsterCurrentState } from '../types/common';
import {
  PositionScene,
  useGlobalPositionStore,
} from '../state/globalUsedPositionStore';

const droneMonsterCount = 4;

export default function MonstersScene() {
  const generatedRef = useRef(false);
  const monsters = useDroneMonsterStore((state) => state.monsters);
  const droneMonsterStore = useDroneMonsterStore((state) => state);
  const usedPositions = useGlobalPositionStore(
    (state) => state.usedPositions[PositionScene.DroneSpawnScene],
  );
  const positionStore = useGlobalPositionStore((state) => state);

  useEffect(() => {
    if (generatedRef.current) {
      return;
    }
    generatedRef.current = true;
    for (let i = 0; i < droneMonsterCount; i++) {
      const id = uuid();
      droneMonsterStore.addDroneMonster(id, MonsterCurrentState.RUN);
    }

    return () => {
      droneMonsterStore.reset();
    };
  }, []);

  const onClick = (id: string) => {
    if (monsters[id].monsterState === MonsterCurrentState.DEAD) {
      return;
    }
    onMonsterDead(id);
  };

  const onMonsterDead = (id: string) => {
    droneMonsterStore.updateDroneMonster(id, MonsterCurrentState.DEAD);

    positionStore.removeUsedPosition(PositionScene.DroneSpawnScene, id);

    setTimeout(() => {
      droneMonsterStore.removeDroneMonster(id);
      addNewMonster();
    }, 500);
  };

  const addNewMonster = () => {
    setTimeout(() => {
      const id = uuid();
      droneMonsterStore.addDroneMonster(id, MonsterCurrentState.RUN);
    }, 1000);
  };

  const onMonsterSpawned = (id: string, position: Vector3) => {
    positionStore.addUsedPosition(PositionScene.DroneSpawnScene, id, position);
  };

  return (
    <>
      {monsters &&
        Object.keys(monsters).map((id) => {
          const isDead = monsters[id].monsterState === MonsterCurrentState.DEAD;
          return (
            <Drone
              key={id}
              objectID={id}
              respawnTimer={2500}
              triggerAction="Vertical"
              scale={isDead ? 2 : 3}
              initialPosition={new Vector3(0, 0, -20)}
              stopAllActions={isDead}
              monsterActionState={monsters[id].monsterState}
              onClick={(event) => {
                event.stopPropagation();
                onClick(id);
              }}
              usedPositions={Object.values(usedPositions)}
              onMonsterSpawnedByObjectId={onMonsterSpawned}
            />
          );
        })}
    </>
  );
}
