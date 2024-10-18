import React from 'react';

import { Html } from '@react-three/drei';
import { Card } from '@react-three/uikit-default';

export default function HTMLExample() {
  return (
    <group>
      <Card
        width={560}
        height={315}
        borderRadius={32}
        padding={32}
        gap={8}
        flexDirection="column"
      >
        <group scale={[0.37, 0.37, 0.37]}>
          <Html transform>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZHgyQGoeaB0?si=VRxS3J-TvLmE4cSI?&autoplay=1&loop=1&playlist=ZHgyQGoeaB0&rel=0&showinfo=0&color=white&iv_load_policy=3&mute=1"
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
