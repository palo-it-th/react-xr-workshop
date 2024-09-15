import { memo, useEffect } from "react";
import useQuark from "../../../hooks/useQuark";
import ParticleProps from "../../../types/common";

const RESOURCE_PATH = './particles/blue-flamethrower.json';

interface BlueFrameTrailProps extends ParticleProps {
  attachedObject: any;
}

const BlueFrameTrail = memo(({ enable = true, scale, position, rotation, attachedObject }: BlueFrameTrailProps) => {
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
    
    particleObj?.parent?.add(attachedObject);
  }, [position, particleObj]);

  return null;
});

export default BlueFrameTrail;
