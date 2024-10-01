import { forwardRef } from 'react';
import { BoxGeometry } from 'three';
import { Color } from '@react-three/fiber';
import { Box, ShapeProps } from '@react-three/drei';

type BoxBaseProps = {
  color: Color;
};

type BoxProps = {
  geometry: ShapeProps<typeof BoxGeometry>;
} & BoxBaseProps;

export const Box3D = forwardRef((props: BoxProps, ref: any) => {
  return (
    <Box {...props.geometry} ref={ref}>
      <meshStandardMaterial color={props.color} />
    </Box>
  );
});
