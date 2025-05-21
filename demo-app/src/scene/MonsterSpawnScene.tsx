import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useCameraPosition } from '../hooks/useCameraPosition';
import { useInteractionStore } from '../state/interactionStore';

// Reduce the number of monsters to improve performance
const MONSTER_COUNT = 4; // Reduced from 6
const REMOVE_DEAD_MONSTER_TIMER = 500;
const ADD_NEW_MONSTER_TIMER = 1000;
const RE_SPAWN_TIMER = 4000;

// Define a frustum culling distance
const CULLING_DISTANCE = 30;

export default function MonsterSpawnScene({
  onHitMonster,
}: {
  onHitMonster: (id: string) => void;
}) {
  const generatedRef = useRef(false);
  const monsters = useDroneMonsterStore((state) => state.monsters);
  const droneMonsterStore = useDroneMonsterStore((state) => state);
  const usedPositions = useGlobalPositionStore(
    (state) => state.usedPositions[PositionScene.DroneSpawnScene],
  );
  const positionStore = useGlobalPositionStore((state) => state);  const [particlePosition, setParticlePosition] = useState(
    new Vector3(0, 0, 0),
  );

  useEffect(() => {
    if (generatedRef.current) {
      return;
    }
    generatedRef.current = true;
    droneMonsterStore.generateDroneMonsters(MONSTER_COUNT);
    return () => {
      droneMonsterStore.reset();
    };
  }, []);

  const onClick = (id: string) => {
    // Check if the monster is already dead
    if (monsters[id].monsterState === MonsterCurrentState.DEAD) {
      return;
    }
    
    // Only process the click if interaction is allowed
    if (useInteractionStore.getState().canInteract()) {
      onMonsterDead(id);
      onHitMonster(id);
    }
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
  };  const isFirstRender = useMemo(() => {
    return particlePosition.x === 0 && particlePosition.y === 0;
  }, [particlePosition]);
  
  // Use the camera position hook for culling
  const cameraPositionRef = useCameraPosition();
  
  // Determine if a monster should be visible based on distance
  const isMonsterVisible = (position: Vector3) => {
    if (!position) return true;
    // Simple distance-based culling
    return position.distanceTo(cameraPositionRef.current) < CULLING_DISTANCE;
  };

  return (
    <>
      {/* <OrbitControls /> */}

      {!isFirstRender && (
        <BangExplosion
          enable={true}
          scale={new Vector3(0.5, 0.5, 0.5)}
          position={particlePosition}
        />
      )}
      {/* 
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} /> */}
      {droneMonsterStore.monsters &&
        Object.keys(droneMonsterStore.monsters).map((id) => {
          const isDead = monsters[id].monsterState === MonsterCurrentState.DEAD;
          const position = usedPositions[id];

          // Skip rendering if monster is too far away and not visible
          if (position && !isMonsterVisible(position) && !isDead) {
            return null;
          }

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
      {/* <Text position={[0,0,-20]}>Me</Text> */}
    </>
  );
}
