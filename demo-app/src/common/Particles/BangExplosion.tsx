import { memo, useEffect } from "react";
import useQuark from "../../hooks/useQuark";
import ParticleProps from "../Types/Particle";
import { QuarksUtil } from "three.quarks";
import useOneShotVFX from "../../hooks/useOneShotVFX";


const RESOURCE_PATH = './particles/bang-explosion.json';

const BangExplosion = memo(({ enable = true, scale, position, rotation }: ParticleProps) => {

    const { particleObj, cloneParticle } = useQuark({
        enable,
        assetUrl: RESOURCE_PATH,
        scale: scale,
        position: position,
        rotation: rotation,
        autoDestroy: true,
      });
    
      useOneShotVFX({particleObj, cloneFunc: cloneParticle, position});
    
      return null;
})

export default BangExplosion;