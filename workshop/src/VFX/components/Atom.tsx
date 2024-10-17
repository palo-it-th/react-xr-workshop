import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';
import {
  BatchedRenderer,
  IEmitter,
  IParticleSystem,
  QuarksLoader,
} from 'three.quarks';

interface AtomProps {
  position: Vector3;
}

export default function Atom({ position }: AtomProps) {
  // Create a batch renderer
  // Batch renderer is a container for particle systems
  // It is used to render multiple particle systems in a single draw call
  const batchRenderer = useMemo(() => {
    return new BatchedRenderer();
  }, []);

  useFrame((_, delta) => {
    // Keep the batch renderer updated every frame
    batchRenderer.update(delta);
  });

  const { scene } = useThree();

  useEffect(() => {
    const loader = new QuarksLoader();

    // Ignore the cross-origin restriction
    loader.setCrossOrigin('');

    // Load the atom resource from https://quarks.art/
    // then put it to public folder
    loader.load('/particles/atom.json', (obj) => {
      obj.traverse((child) => {
        // Add the particle emitter to the batch renderer if object node is ParticleEmitter
        if (child.type === 'ParticleEmitter') {
          const system: IParticleSystem = (child as unknown as IEmitter).system;
          batchRenderer.addSystem(system);
        }
      });

      // Set the scale and position of the atom in the scene
      obj.scale.set(0.1, 0.1, 0.1);
      obj.position.copy(position);

      // Add the atom to the scene
      scene.add(obj);
    });
    // Add the batch renderer to the scene
    scene.add(batchRenderer);

    return () => {
      // Remove the atom from the scene
      scene.remove(batchRenderer);
    }
  }, []);

  return <></>;
}
