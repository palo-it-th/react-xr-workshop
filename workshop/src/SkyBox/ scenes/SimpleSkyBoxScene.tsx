import React from 'react';
import { Color as THREEColor } from 'three';
import { CameraControls, Plane } from '@react-three/drei';
import CycleSkyBox from '../components/CycleSkyBox';
import SolidSkyBox from '../components/SolidSkyBox';
import CubeSkyBox from '../components/CubeSkyBox';
import PlaneSkyBox from '../components/PlaneSkyBox';

const CUBE_TEXTURE_URLS = [
  '/space-sky-box-textures/1.jpg',
  '/space-sky-box-textures/2.jpg',
  '/space-sky-box-textures/3.jpg',
  '/space-sky-box-textures/4.jpg',
  '/space-sky-box-textures/5.jpg',
  '/space-sky-box-textures/6.jpg',
];

export default function SimpleCycleSkyBoxScene() {
  return (
    <>
      <CameraControls />
      {<CycleSkyBox textureUrl="/sky-box/galaxy-sky.png" />}
      {/*<CubeSkyBox textureUrls={CUBE_TEXTURE_URLS} />*/}
      {/*<SolidSkyBox color={new THREEColor('#2fc')} />*/}
      {/*<PlaneSkyBox textureUrl={'/space-sky-box-textures/1.jpg'} />*/}
    </>
  );
}
