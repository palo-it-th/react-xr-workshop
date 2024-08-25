import { Vector3 } from 'three';
import useQuark from '../../hooks/useQuark';
import { memo } from 'react';

const RESOURCE_PATH = './particles/atom.json';

interface AtomProps {
  enable?: boolean;
  scale?: Vector3;
  position?: Vector3;
  rotation?: Vector3;
}

const Atom = memo(({ enable = true, scale, position, rotation }: AtomProps) => {
  useQuark({
    enable,
    assetUrl: RESOURCE_PATH,
    scale: scale,
    position: position,
    rotation: rotation,
  });

  return null;
});

export default Atom;
