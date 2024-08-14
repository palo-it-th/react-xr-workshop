import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three'; // Import THREE from 'three'

const textSources = [
  '/space-sky-box-textures/1.jpg',
  '/space-sky-box-textures/2.jpg',
  '/space-sky-box-textures/3.jpg',
  '/space-sky-box-textures/4.jpg',
  '/space-sky-box-textures/5.jpg',
  '/space-sky-box-textures/6.jpg',
];
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  const textures = loader.load(textSources);

  // Set the scene background property to the resulting texture.
  scene.background = textures;
  return null;
};

export default SkyBox;
