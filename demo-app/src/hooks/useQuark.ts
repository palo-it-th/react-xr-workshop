import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Object3D, Vector3 } from 'three';
import { BatchedRenderer, QuarksLoader } from 'three.quarks';

interface QuarkProps {
  enable?: boolean;
  assetUrl: string;
  scale?: Vector3;
  position?: Vector3;
  rotation?: Vector3;
  onProgress?: (event: ProgressEvent) => void;
  onError?: (err: unknown) => void;
}

const useQuark = ({
  enable = true,
  assetUrl,
  scale = new Vector3(1, 1, 1),
  position = new Vector3(0, 0, 0),
  rotation = new Vector3(1, 1, 1),
  onProgress = () => {},
  onError = () => {},
}: QuarkProps) => {
  const batchRendererRef = useRef(new BatchedRenderer());
  const { scene } = useThree();
  const [particleObj, setParticleObj] = useState<Object3D | null>(null);

  useFrame((_, delta) => {
    if (enable) batchRendererRef.current.update(delta);
  });

  useEffect(() => {
    const loader = new QuarksLoader();
    loader.setCrossOrigin('*');
    loader.load(
      assetUrl,
      (obj) => {
        obj.traverse((child: Object3D) => {
          if (child.type === 'ParticleEmitter') {
            batchRendererRef.current.addSystem((child as any).system);
          }
        });
        obj.scale.set(scale.x, scale.y, scale.z);
        obj.rotation.set(rotation.x, rotation.y, rotation.z);
        obj.position.set(position.x, position.y, position.z);
        setParticleObj(obj);
        scene.add(obj);
      },
      onProgress,
      onError,
    );
    scene.add(batchRendererRef.current);

    return () => {
      // Release memory
      scene.remove(batchRendererRef.current);
      scene.remove(particleObj as Object3D);
    };
  }, []);

  return { particleObj };
};

export default useQuark;