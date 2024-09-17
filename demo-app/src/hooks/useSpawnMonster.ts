import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import { useRandomPosition } from './useRandomPosition';
import { UseSpawnMonsterBase } from '../types/common';

const MONSTER_SPAWN_TIMER = 5000;
const MONSTER_FIRST_SPAWN_TIMER = 1000;

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

  const updatePosition = useCallback(() => {
    if (!monsterRef?.current || !position) {
      return;
    }

    monsterRef.current.lookAt(0, 0, 0);

    if (!firstSpawned) {
      monsterRef.current.position.copy(position);
      return;
    }

    if (isMonsterDead) {
      const newX = position.x > 0 ? position.x + 5 : position.x - 5;
      const newY = position.y > 0 ? position.y + 5 : position.y - 5;
      const targetPos = new THREE.Vector3(newX, newY, position.z - 20);
      const newPos = monsterRef.current.position.clone().lerp(targetPos, 0.1);
      monsterRef.current.position.copy(newPos);
    } else {
      const targetPos = new THREE.Vector3(position.x, position.y, position.z);
      const newPos = monsterRef.current.position.clone().lerp(targetPos, 0.1);
      monsterRef.current.position.copy(newPos);
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
