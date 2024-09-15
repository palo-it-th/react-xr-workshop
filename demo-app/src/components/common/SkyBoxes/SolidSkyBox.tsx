import { useThree } from '@react-three/fiber';
import { memo } from 'react';
import { Color } from 'three';

interface SolidSkyBoxProps {
  color?: Color;
}

const SolidSkyBox = memo(({ color = new Color(0, 0, 0) }: SolidSkyBoxProps) => {
  const { scene } = useThree();

  scene.background = color;
  return null;
});

export default SolidSkyBox;
