import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';
import { BatchedRenderer, QuarksLoader } from 'three.quarks';

interface AtomProps {
  position: Vector3;
}

export default function Atom({ position }: AtomProps) {
  const ref = useRef<Mesh>(null);
  const [batchRenderer, setBatchRenderer] = useState(new BatchedRenderer());

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x = ref.current.rotation.y += 0.01;
    }
    batchRenderer.update(delta);
  });
  const { scene } = useThree();

  useEffect(() => {
    const loader = new QuarksLoader();

    loader.setCrossOrigin('');
    loader.load(
      '/particles/atom.json',
      (obj) => {
        obj.traverse((child) => {
          if (child.type === 'ParticleEmitter') {
            batchRenderer.addSystem((child as any).system);
          }
        });
        obj.scale.set(0.1, 0.1, 0.1);
        obj.position.copy(position);
        scene.add(obj);
      },
      () => {},
      () => {},
    );
    scene.add(batchRenderer);
  }, []);

  return <></>;
}
