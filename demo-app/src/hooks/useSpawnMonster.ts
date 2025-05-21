import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import { useRandomPosition } from './useRandomPosition';
import { UseSpawnMonsterBase } from '../types/common';

const MONSTER_SPAWN_TIMER = 5000;
const MONSTER_FIRST_SPAWN_TIMER = 1000;
// Add throttling to reduce calculations
const FRAME_SKIP = 2; // Only update every 3 frames

export const useSpawnMonster = ({
  monsterRef,
  firstSpawnTimer = MONSTER_FIRST_SPAWN_TIMER,
  respawnTimer = MONSTER_SPAWN_TIMER,
  isMonsterDead = false,
  onMonsterSpawned,
  initialPosition,
  usedPositions,
  objectSize,
}: UseSpawnMonsterBase) => {
  const { randomPositionVector3 } = useRandomPosition({
    usedPositions,
    objectSize,
  });
  const [position, setPosition] = useState<THREE.Vector3>(
    initialPosition || randomPositionVector3(),
  );
  const [firstSpawned, setFirstSpawned] = useState(false);
  const respawnIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  // Frame counter for throttling
  const frameCount = useRef(0);
  // Cache target vectors to avoid creating new ones each frame
  const targetVector = useRef(new THREE.Vector3());
  const newPosVector = useRef(new THREE.Vector3());
  
  // Direction vector for lookAt calculation
  const lookAtVector = useRef(new THREE.Vector3(0, 0, 0));

  const updatePosition = useCallback(() => {
    if (!monsterRef?.current || !position) {
      return;
    }

    // Skip frames to reduce performance impact
    frameCount.current = (frameCount.current + 1) % FRAME_SKIP;
    if (frameCount.current !== 0) {
      return;
    }

    // Only do lookAt when necessary (first time and respawn)
    if (!monsterRef.current.userData.initialLookAtDone) {
      monsterRef.current.lookAt(lookAtVector.current);
      monsterRef.current.userData.initialLookAtDone = true;
    }

    if (!firstSpawned) {
      monsterRef.current.position.copy(position);
      return;
    }

    if (isMonsterDead) {
      // Avoid creating new Vector3 instances every frame
      targetVector.current.set(
        position.x > 0 ? position.x + 5 : position.x - 5,
        position.y > 0 ? position.y + 5 : position.y - 5,
        position.z - 20
      );
      
      // Reuse the cached vector instead of creating a new one
      monsterRef.current.position.lerp(targetVector.current, 0.1);
    } else {
      // Avoid creating new Vector3 instances
      targetVector.current.copy(position);
      
      // Reuse the cached vector instead of creating a new one with clone()
      monsterRef.current.position.lerp(targetVector.current, 0.1);
    }
  }, [position, isMonsterDead, firstSpawned, monsterRef]);

  useEffect(() => {
    if (isMonsterDead) {
      return;
    }

    if (firstSpawned) {
      respawnIntervalIdRef.current = setInterval(() => {
        const newPosition = randomPositionVector3();
        setPosition(newPosition);
        // Reset lookAt flag when respawning
        if (monsterRef?.current) {
          monsterRef.current.userData.initialLookAtDone = false;
        }
        onMonsterSpawned && onMonsterSpawned(newPosition);
      }, respawnTimer);
    } else {
      setTimeout(() => {
        const newPosition = randomPositionVector3();
        setPosition(newPosition);
        setFirstSpawned(true);
        onMonsterSpawned && onMonsterSpawned(newPosition);
      }, firstSpawnTimer);
    }

    return () => {
      if (respawnIntervalIdRef.current) {
        clearInterval(respawnIntervalIdRef.current);
      }
    };
  }, [firstSpawnTimer, respawnTimer, firstSpawned, isMonsterDead]);

  useFrame(() => {
    updatePosition();
  });
};
