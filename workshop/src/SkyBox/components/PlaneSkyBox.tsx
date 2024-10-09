// Implement square skybox component

import React from 'react';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

interface PlaneSkyBoxProps {
  textureUrl: string;
}

const PlaneSkyBox = ({ textureUrl }: PlaneSkyBoxProps) => {
    const { scene } = useThree();

    useEffect(() => {
        // Load the cube textures
        const loader = new THREE.TextureLoader();
        const texture = loader.load(textureUrl);
        scene.background = texture;
        return () => {
            // Dispose the textures for cleanup memory
            texture.dispose();
        };
    }, []);

    return <></>;
};

export default PlaneSkyBox;
