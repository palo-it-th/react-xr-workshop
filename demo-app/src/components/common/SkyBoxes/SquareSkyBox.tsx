// Implement square skybox component

import React from 'react';
import { useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const DEFAULT_BOX_GEOMETRY = new THREE.BoxGeometry(200, 200, 200);

interface SquareSkyBoxProps {
  textureUrls: string[];
}

const SquareSkyBox = ({ textureUrls }: SquareSkyBoxProps) => {
    const { scene } = useThree();

    useEffect(() => {
        const loader = new THREE.CubeTextureLoader();
        const textures = loader.load(textureUrls);
        scene.background = textures;
        return () => {
        textures.dispose();
        };
    }, []);

    return <></>;
};

export default SquareSkyBox;
