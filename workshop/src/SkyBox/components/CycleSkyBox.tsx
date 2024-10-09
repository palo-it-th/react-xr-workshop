import { useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const DEFAULT_SPHERE_GEOMETRY = new THREE.SphereGeometry(200, 60, 40);

interface CircleSkyProps {
  textureUrl: string;
  sphereGeometry?: THREE.SphereGeometry;
}

// Create a sky material with the texture
const createSkyMaterial = (textureUrl: string): THREE.MeshBasicMaterial => {
  return new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(textureUrl),
    side: THREE.BackSide,
  });
};

const CircleSky = ({ textureUrl }: CircleSkyProps) => {
    const { scene } = useThree();

    // Create a sphere geometry
    const sphereGeometry = useMemo(() => DEFAULT_SPHERE_GEOMETRY, []);

    // Create a sky material and put the texture on it
    const skyMaterial = useMemo(
      () => createSkyMaterial(textureUrl),
      [textureUrl],
    );

    // Add the sky to the scene
    useEffect(() => {
      const sky = new THREE.Mesh(sphereGeometry, skyMaterial);
      sky.material.side = THREE.BackSide;
      scene.add(sky);

      return () => {
        scene.remove(sky);
      };
    }, [sphereGeometry, skyMaterial]);

    return <></>;
};

export default CircleSky;
