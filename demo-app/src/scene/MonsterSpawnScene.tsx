import React, { useEffect, useRef, useState } from 'react';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import { OrbitControls, Text } from '@react-three/drei';
import { v4 as uuid } from 'uuid';

import { useDroneMonsterStore } from '../state/droneMonsterStore';
import { MonsterCurrentState } from '../types/common';
import {
  PositionScene,
  useGlobalPositionStore,
} from '../state/globalUsedPositionStore';
import Drone from '../components/common/3DObjects/Drone';
import BangExplosion from '../components/common/Particles/BangExplosion';

const MONSTER_COUNT = 6;
const REMOVE_DEAD_MONSTER_TIMER = 500;
const ADD_NEW_MONSTER_TIMER = 1000;
const RE_SPAWN_TIMER = 4000;

export default function MonsterSpawnScene() {
  const generatedRef = useRef(false);
  const monsters = useDroneMonsterStore((state) => state.monsters);
  const droneMonsterStore = useDroneMonsterStore((state) => state);
  const usedPositions = useGlobalPositionStore(
    (state) => state.usedPositions[PositionScene.DroneSpawnScene],
  );
  const positionStore = useGlobalPositionStore((state) => state);

  const [particlePosition, setParticlePosition] = useState(
    new Vector3(0, 0, 0),
  );

  useEffect(() => {
    if (generatedRef.current) {
      return;
    }
    generatedRef.current = true;
    for (let i = 0; i < MONSTER_COUNT; i++) {
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
    }, REMOVE_DEAD_MONSTER_TIMER);
  };

  const addNewMonster = () => {
    setTimeout(() => {
      const id = uuid();
      droneMonsterStore.addDroneMonster(id, MonsterCurrentState.RUN);
    }, ADD_NEW_MONSTER_TIMER);
  };

  const onMonsterSpawned = (id: string, position: Vector3) => {
    positionStore.addUsedPosition(PositionScene.DroneSpawnScene, id, position);
  };

  return (
    <>
      <OrbitControls />

      <BangExplosion
        enable={true}
        scale={new Vector3(0.5, 0.5, 0.5)}
        position={particlePosition}
      />

      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />
      {droneMonsterStore.monsters &&
        Object.keys(droneMonsterStore.monsters).map((id) => {
          const isDead = monsters[id].monsterState === MonsterCurrentState.DEAD;
          return (
            <Drone
              key={id}
              objectID={id}
              respawnTimer={RE_SPAWN_TIMER}
              triggerAction="Vertical"
              scale={isDead ? 1 : 2}
              initialPosition={new Vector3(0, 0, -100)}
              stopAllActions={isDead}
              monsterActionState={monsters[id].monsterState}
              onClick={(event) => {
                event.stopPropagation();
                onClick(id);
                setParticlePosition(event.point);
              }}
              usedPositions={Object.values(usedPositions)}
              onMonsterSpawnedByObjectId={onMonsterSpawned}
            />
          );
        })}
      <Text>Me</Text>
    </>
  );
}
