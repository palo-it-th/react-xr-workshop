import React, { forwardRef, ReactNode, RefAttributes } from 'react';

import {
  ComponentInternals,
  Container,
  ContainerProperties,
} from '@react-three/uikit';

export type SizedBoxProperties = ContainerProperties & {
  width?: number;
  height?: number;
};

export const SizedBox: (
  props: SizedBoxProperties & RefAttributes<ComponentInternals>,
) => ReactNode = forwardRef(
  (props: SizedBoxProperties & RefAttributes<ComponentInternals>, ref) => {
    const { width, height, ...rest } = props;
    return <Container ref={ref} width={width} height={height} {...rest} />;
  },
);
