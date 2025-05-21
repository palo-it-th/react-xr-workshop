import { useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useThree, useFrame } from '@react-three/fiber';

/**
 * Hook to track camera position for frustum culling and optimization
 */
export const useCameraPosition = () => {
  const { camera } = useThree();
  const cameraPosition = useRef(new Vector3());
  const frameCounter = useRef(0);
  
  // Only update position every few frames to reduce computational overhead
  const updateInterval = 10; // Update every 10 frames
  
  useFrame(() => {
    frameCounter.current = (frameCounter.current + 1) % updateInterval;
    
    // Only update the position tracking on specified frames to reduce overhead
    if (frameCounter.current === 0) {
      cameraPosition.current.copy(camera.position);
    }
  });
  
  return cameraPosition;
};
