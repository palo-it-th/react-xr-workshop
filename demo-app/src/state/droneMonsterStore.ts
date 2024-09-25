import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

import { MonsterCurrentState, MonsterStateBase } from '../types/common';

type DroneMonsterState = {
  monsters: { [key: string]: MonsterStateBase };
  generateDroneMonsters: (count: number) => void;
  addDroneMonster: (id: string, initialState: MonsterCurrentState) => void;
  updateDroneMonster: (id: string, newState: MonsterCurrentState) => void;
  removeDroneMonster: (id: string) => void;
  reset: () => void;
};

export const useDroneMonsterStore = create<DroneMonsterState>((set) => ({
  monsters: {},
  generateDroneMonsters: (count: number) =>
    set((state) => {
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
  addDroneMonster: (id, initialState) =>
    set((state) => ({
      monsters: {
        ...state.monsters,
        [id]: {
          id,
          monsterState: initialState,
        },
      },
    })),
  updateDroneMonster: (id, newState) =>
    set((state) => ({
      monsters: {
        ...state.monsters,
        [id]: {
          ...state.monsters[id],
          monsterState: newState,
        },
      },
    })),
  removeDroneMonster: (id) =>
    set((state) => {
      const remainingMonsters = { ...state.monsters };
      delete remainingMonsters[id];
      return { monsters: remainingMonsters };
    }),

  reset: () => set(() => ({ monsters: {} })),
}));
