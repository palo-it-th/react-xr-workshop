import React from 'react';

import { Html } from '@react-three/drei';
import { Root } from '@react-three/uikit';
import { Card } from '@react-three/uikit-default';
import { DoubleSide, MeshBasicMaterial, MeshPhongMaterial } from 'three';

export default function HTMLExample() {
    return (
        <group>
            <Card width={560} height={315} borderRadius={32} padding={32} gap={8} flexDirection="column">
                <group  scale={[0.37, 0.37, 0.37]}>
                    <Html transform  >
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/ZHgyQGoeaB0?si=VRxS3J-TvLmE4cSI"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Html>
                </group>
            </Card>
        </group>
    );
}