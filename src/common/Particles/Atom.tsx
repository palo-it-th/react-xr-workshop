import { Vector3 } from 'three';
import useQuark from '../../hooks/useQuark';
import { memo, useEffect } from 'react';

const RESOURCE_PATH = './particles/atom.json';

interface AtomProps {
  enable?: boolean;
  scale?: Vector3;
  position?: Vector3;
  rotation?: Vector3;
}

const Atom = memo(({ enable = true, scale, position, rotation }: AtomProps) => {
  const { particleObj } = useQuark({
    enable,
    assetUrl: RESOURCE_PATH,
    scale: scale,
    position: position,
    rotation: rotation,
  });

  useEffect(() => {
    particleObj?.position.set(
      position?.x || 0,
      position?.y || 0,
      position?.z || 0,
    );
  }, [position, particleObj]);

  return null;
});

export default Atom;
