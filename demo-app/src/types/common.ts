import { RefObject } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';

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

export default interface ParticleProps {
  enable?: boolean;
  scale?: Vector3;
  position?: Vector3;
  rotation?: Vector3;
}

export interface MonsterModelBase<TAction = any> {
  objectID: string;
  triggerAction?: TAction;
  stopAction?: TAction;
  stopAllActions?: boolean;
  monsterActionState?: MonsterCurrentState;
  onMonsterSpawnedByObjectId?: (id: string, position: THREE.Vector3) => void;
}

export interface GLTFAction extends THREE.AnimationClip {
  name: string;
}

export enum GameSceneView {
  HOME,
  IN_GAME_PRE_START,
  IN_GAME,
  END_GAME,
}

export interface GlobalGameState {
  gameView: GameSceneView;
  setGameView: (view: GameSceneView) => void;
  monsters: { [key: string]: MonsterStateBase };
  generateMonsters: (count: number) => void;
  addMonster: (id: string, initialState: MonsterCurrentState) => void;
  updateMonster: (id: string, newState: MonsterCurrentState) => void;
  removeMonster: (id: string) => void;
  resetMonster: () => void;
  points: number;
  addPoints: (points: number) => void;
  resetPoints: () => void;
  particlePosition: Vector3;
  updateParticlePosition: (position: Vector3) => void;
  timeCountDown: number;
  setTimeCountDown: (time: number) => void;
  resetGame: () => void;
  restartGame: () => void;
}
