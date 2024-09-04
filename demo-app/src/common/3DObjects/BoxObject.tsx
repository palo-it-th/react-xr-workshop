import { Color, ThreeEvent } from '@react-three/fiber';
import { forwardRef } from 'react';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from 'three';
import useBoxBehavior from '../../hooks/useBoxBehavior';
import { Box } from '@react-three/drei';

interface BoxObjectProps {
  color: Color;
  onClick: (event: ThreeEvent<MouseEvent>) => void;
  position: [number, number, number];
  scale: [number, number, number];
  children?: React.ReactNode;
}

export const BoxObject = ({
  color,
  onClick,
  position,
  scale,
  children,
}: BoxObjectProps) => {
  const { refBox } = useBoxBehavior();
  return (
    <Box
      ref={refBox}
      pointerEventsType={{ deny: 'grab' }}
      onClick={onClick}
      position={position}
      scale={scale}
    >
      <meshStandardMaterial color={color} />
      {children}
    </Box>
  );
};
