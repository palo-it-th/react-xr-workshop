import { useThree } from '@react-three/fiber';
import { memo, useEffect } from 'react';
import { Color } from 'three';

interface SolidSkyProps {
  color?: Color;
}

const SolidSky = ({ color = new Color(0, 0, 0) }: SolidSkyProps) => {
  const { scene } = useThree();

  // Set the background color of the scene
  scene.background = color;

  useEffect(() => {
    return () => {
      scene.background = null;
    };
  }, []);

  return null;
};

export default SolidSky;
