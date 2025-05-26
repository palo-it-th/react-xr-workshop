import { Vector3 } from 'three';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

import {
  GameSceneView,
  GlobalGameState,
  MonsterCurrentState,
  MonsterStateBase,
} from '../types/common';

const GAME_TIME = 90;

export const useGlobalGameStore = create<GlobalGameState>((set) => ({
  // Manage game view state
  gameView: GameSceneView.HOME,
  setGameView: (view) => set(() => ({ gameView: view })),

  // Manage monster state
  monsters: {},
  generateMonsters: (count: number) =>
    set(() => {
      const newMonsters: { [key: string]: MonsterStateBase } = {};
      for (let i = 0; i < count; i++) {
        const id = uuid();
        newMonsters[id] = {
          id,
          monsterState: MonsterCurrentState.RUN,
        };
      }
      return { monsters: newMonsters };
    }),
  addMonster: (id, initialState) =>
    set((state) => ({
      monsters: {
        ...state.monsters,
        [id]: {
          id,
          monsterState: initialState,
        },
      },
    })),
  updateMonster: (id, newState) =>
    set((state) => ({
      monsters: {
        ...state.monsters,
        [id]: {
          ...state.monsters[id],
          monsterState: newState,
        },
      },
    })),
  removeMonster: (id) =>
    set((state) => {
      const remainingMonsters = { ...state.monsters };
      delete remainingMonsters[id];
      return { monsters: remainingMonsters };
    }),

  resetMonster: () => set(() => ({ monsters: {} })),

  // Manage particle position state
  particlePosition: new Vector3(0, 0, 0),
  updateParticlePosition: (position) =>
    set(() => ({ particlePosition: position })),

  // Manage points state
  points: 0,
  addPoints: (points) => set((state) => ({ points: state.points + points })),
  resetPoints: () => set(() => ({ points: 0 })),

  // Manage time state
  timeCountDown: GAME_TIME,
  setTimeCountDown: (time) => set(() => ({ timeCountDown: time })),

  // Manage game state
  resetGame: () => {
    set(() => ({
      gameView: GameSceneView.HOME,
      monsters: {},
      points: 0,
      timeCountDown: GAME_TIME,
    }));
  },
  restartGame() {
    set(() => ({
      gameView: GameSceneView.IN_GAME,
      monsters: {},
      points: 0,
      timeCountDown: GAME_TIME,
    }));
  },
}));
