import { useEffect } from 'react';
import { Object3D, Object3DEventMap, Vector3 } from 'three';
import { QuarksUtil } from 'three.quarks';

interface OneShotVFX {
  particleObj: Object3D<Object3DEventMap> | null;
  position: Vector3 | undefined;
  cloneFunc: () => Object3D<Object3DEventMap> | undefined;
}

const useOneShotVFX = ({ particleObj, position, cloneFunc }: OneShotVFX) => {
  useEffect(() => {
    if (particleObj === null) return;
    particleObj?.position.set(
      position?.x || 0,
      position?.y || 0,
      position?.z || 0,
    );
    const cloned = cloneFunc();
    if (cloned === undefined) return;
    QuarksUtil.play(cloned);
  }, [position, particleObj]);
};

export default useOneShotVFX;
