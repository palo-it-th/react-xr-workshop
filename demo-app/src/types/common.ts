import { RefObject } from 'react';
import * as THREE from 'three';

export enum MonsterCurrentState {
  IDLE = 'idle',
  RUN = 'run',
  DEAD = 'dead',
}

export interface MonsterStateBase {
  id: string;
  monsterState: MonsterCurrentState;
}

export interface UseSpawnMonsterBase {
  monsterRef?: RefObject<THREE.Group<THREE.Object3DEventMap>>;
  firstSpawnTimer?: number;
  respawnTimer?: number;
  isMonsterDead?: boolean;
  initialPosition?: THREE.Vector3;
  onMonsterSpawned?: (position: THREE.Vector3) => void;
  usedPositions: THREE.Vector3[];
  objectSize?: number;
}