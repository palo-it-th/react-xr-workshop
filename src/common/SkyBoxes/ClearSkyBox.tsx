import { useThree } from '@react-three/fiber';
import { memo } from 'react';
import { Color } from 'three';

interface ClearSkyBoxProps {
  color?: Color;
}

const ClearSkyBox = memo(({ color = new Color(0, 0, 0) }: ClearSkyBoxProps) => {
  const { scene } = useThree();

  scene.background = color;
  return null;
});

export default ClearSkyBox;
