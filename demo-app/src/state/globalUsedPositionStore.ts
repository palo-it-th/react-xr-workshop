import { create } from 'zustand';
import * as THREE from 'three';

export enum PositionScene {
  DroneSpawnScene = 'DroneSpawnScene',
}

type GlobalUsedPosition = {
  usedPositions: { [key in PositionScene]: { [key: string]: THREE.Vector3 } };
  addUsedPosition: (
    scene: PositionScene,
    id: string,
    position: THREE.Vector3,
  ) => void;
  removeUsedPosition: (scene: PositionScene, id: string) => void;
  reset: () => void;
};

export const useGlobalPositionStore = create<GlobalUsedPosition>((set) => ({
  usedPositions: {
    DroneSpawnScene: {},
  },
  addUsedPosition: (scene, id, position) =>
    set((state) => ({
      usedPositions: {
        ...state.usedPositions,
        [scene]: {
          ...state.usedPositions[scene],
          [id]: position,
        },
      },
    })),

  removeUsedPosition: (scene, id) =>
    set((state) => {
      const remainingPositions = { ...state.usedPositions[scene] };
      delete remainingPositions[id];
      return {
        usedPositions: {
          ...state.usedPositions,
          [scene]: remainingPositions,
        },
      };
    }),
  reset() {
    set(() => ({
      usedPositions: {
        MonsterSpawnScene: {},
        DroneSpawnScene: {},
      },
    }));
  },
}));
