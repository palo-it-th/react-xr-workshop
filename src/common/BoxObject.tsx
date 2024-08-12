import { Color } from '@react-three/fiber';
import { forwardRef } from 'react';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';
import useBoxBehavior from '../hooks/useBoxBehavior';

interface BoxObjectProps {
  color: Color;
  onClick: () => void;
  position: [number, number, number];
  scale: [number, number, number];
}

export const BoxObject = ({
  color,
  onClick,
  position,
  scale,
}: BoxObjectProps) => {
  const { refBox } = useBoxBehavior();
  return (
    <mesh
      ref={refBox}
      pointerEventsType={{ deny: 'grab' }}
      onClick={onClick}
      position={position}
      scale={scale}
    >
      <boxGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};
