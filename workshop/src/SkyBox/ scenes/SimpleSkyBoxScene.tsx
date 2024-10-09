import React from 'react';
import { Color as THREEColor } from 'three';
import { CameraControls, Plane } from '@react-three/drei';
import CycleSky from '../components/SphereSky';
import SolidSky from '../components/SolidSky';
import CubeSky from '../components/CubeSky';
import PlaneSky from '../components/PlaneSky';

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
      {/*<CycleSky textureUrl="/sky-box/galaxy-sky.png" />*/}
      {/*<CubeSky textureUrls={CUBE_TEXTURE_URLS} />*/}
      {<SolidSky color={new THREEColor('#2fc')} />}
      {/*<PlaneSky textureUrl={'/space-sky-box-textures/1.jpg'} />*/}
    </>
  );
}
