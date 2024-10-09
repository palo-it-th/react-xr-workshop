import { memo } from 'react';
import SquareSkyBox from './SquareSkyBox';

const SPACE_SKY_BOX_TEXTURES = [
  '/space-sky-box-textures/1.jpg',
  '/space-sky-box-textures/2.jpg',
  '/space-sky-box-textures/3.jpg',
  '/space-sky-box-textures/4.jpg',
  '/space-sky-box-textures/5.jpg',
  '/space-sky-box-textures/6.jpg',
];

// Notes : Use memo to avoid reloading texture if it is rerendered.
const SpaceSkyBox = () => {
  return <SquareSkyBox textureUrls={SPACE_SKY_BOX_TEXTURES} />;
};

export default SpaceSkyBox;
