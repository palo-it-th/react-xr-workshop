// Implement square skybox component

import React from 'react';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

interface CubeSkyBoxProps {
  textureUrls: string[];
}

const CubeSkyBox = ({ textureUrls }: CubeSkyBoxProps) => {
    const { scene } = useThree();

    useEffect(() => {
        // Load the cube textures
        const loader = new THREE.CubeTextureLoader();
        const textures = loader.load(textureUrls);
        scene.background = textures;
        return () => {
            // Dispose the textures for cleanup memory
            textures.dispose();
        };
    }, []);

    return <></>;
};

export default CubeSkyBox;
