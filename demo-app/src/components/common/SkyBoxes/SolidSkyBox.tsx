import { useThree } from '@react-three/fiber';
import { memo, useEffect } from 'react';
import { Color } from 'three';

interface SolidSkyBoxProps {
  color?: Color;
}

const SolidSkyBox = ({ color = new Color(0, 0, 0) }: SolidSkyBoxProps) => {
  const { scene } = useThree();

  scene.background = color;

  useEffect(() => {
    return () => {
      scene.background = null;
    };
  }, []);

  return null;
};

export default SolidSkyBox;
