import { useThree } from '@react-three/fiber';
import { memo } from 'react';
import { Color } from 'three';

const ClearSkyBox = memo(() => {
  const { scene } = useThree();

  scene.background = new Color(0, 0, 0);
  return null;
});

export default ClearSkyBox;
