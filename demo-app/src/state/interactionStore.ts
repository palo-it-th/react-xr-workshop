import { create } from 'zustand';
import * as THREE from 'three';

type InteractionState = {
  // Currently focused object ID
  focusedObjectId: string | null;
  // Last interaction timestamp (to avoid excessive updates)
  lastInteractionTime: number;
  // Distance to camera for LOD management
  distanceToCamera: number;
  // Actions
  setFocusedObject: (id: string | null) => void;
  updateDistanceToCamera: (distance: number) => void;
  // Check if interaction throttling is needed
  canInteract: () => boolean;
};

// Minimum time between interactions (ms)
const INTERACTION_THROTTLE = 100;

export const useInteractionStore = create<InteractionState>((set, get) => ({
  focusedObjectId: null,
  lastInteractionTime: 0,
  distanceToCamera: 0,
  
  setFocusedObject: (id) => set({ 
    focusedObjectId: id,
    lastInteractionTime: Date.now()
  }),
  
  updateDistanceToCamera: (distance) => set({ 
    distanceToCamera: distance 
  }),
  
  canInteract: () => {
    const now = Date.now();
    const timeSinceLastInteraction = now - get().lastInteractionTime;
    return timeSinceLastInteraction > INTERACTION_THROTTLE;
  }
}));
