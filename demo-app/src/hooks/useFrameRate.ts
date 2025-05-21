import { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

export const useFrameRate = () => {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  
  // Use Three.js animation loop via useFrame instead of our own requestAnimationFrame
  useFrame(() => {
    const currentTime = performance.now();
    frameCount.current++;
    
    // Update FPS every 500ms
    if (currentTime - lastTime.current >= 500) {
      // Calculate fps based on how many frames in the elapsed time
      setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)));
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
  });
  
  return fps;
};
