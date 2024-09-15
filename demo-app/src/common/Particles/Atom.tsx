import useQuark from '../../hooks/useQuark';
import { memo, useEffect } from 'react';
import ParticleProps from '../../types/common';

const RESOURCE_PATH = './particles/atom.json';

const Atom = memo(({ enable = true, scale, position, rotation }: ParticleProps) => {
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
