import { useThree } from '@react-three/fiber';
import React, { memo, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const DEFAULT_SPHERE_GEOMETRY = new THREE.SphereGeometry(200, 60, 40);

interface CircleSkyBoxProps {
  textureUrl: string;
  sphereGeometry?: THREE.SphereGeometry;
}

const createSkyMaterial = (textureUrl: string): THREE.MeshBasicMaterial => {
  return new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(textureUrl),
    side: THREE.BackSide,
  });
};

const CircleSkyBox = memo(
  ({ textureUrl }: CircleSkyBoxProps) => {
    const { scene } = useThree();

    const sphereGeometry = useMemo(() => DEFAULT_SPHERE_GEOMETRY, []);
    
    const skyMaterial = useMemo(
      () => createSkyMaterial(textureUrl),
      [textureUrl],
    );

    useEffect(() => {
      const sky = new THREE.Mesh(sphereGeometry, skyMaterial);
      sky.material.side = THREE.BackSide;
      scene.add(sky);

      return () => {
        scene.remove(sky);
      };
    }, [sphereGeometry, skyMaterial]);

    return <></>;
  },
  (prevProps, nextProps) => prevProps.textureUrl === nextProps.textureUrl,
);

export default CircleSkyBox;
