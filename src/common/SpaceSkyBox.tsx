import { useThree } from '@react-three/fiber';
import { CubeTextureLoader, TextureLoader } from 'three'; // Import THREE from 'three'
import { memo, useEffect } from 'react';

const textSources = [
  '/space-sky-box-textures/1.jpg',
  '/space-sky-box-textures/2.jpg',
  '/space-sky-box-textures/3.jpg',
  '/space-sky-box-textures/4.jpg',
  '/space-sky-box-textures/5.jpg',
  '/space-sky-box-textures/6.jpg',
];

// Notes : Use memo to avoid reloading texture if it is rerendered.
const SpaceSkyBox = memo(() => {
  const { scene } = useThree();

  const loader = new CubeTextureLoader();
  const textures = loader.load(textSources);
  scene.background = textures;

  return null;
});

export default SpaceSkyBox;
