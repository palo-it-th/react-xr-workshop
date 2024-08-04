import { Color } from '@react-three/fiber';
import { forwardRef } from 'react';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';

interface BoxObjectProps {
  color: Color;
  onClick: () => void;
  position: [number, number, number];
  scale: [number, number, number];
}

export const BoxObject = forwardRef<
  Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >,
  BoxObjectProps
>(
  (
    { color, onClick, position, scale }: BoxObjectProps,
    ref: React.Ref<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >,
  ) => {
    return (
      <mesh
        ref={ref}
        pointerEventsType={{ deny: 'grab' }}
        onClick={onClick}
        position={position}
        scale={scale}
      >
        <boxGeometry />
        <meshBasicMaterial color={color} />
      </mesh>
    );
  },
);
