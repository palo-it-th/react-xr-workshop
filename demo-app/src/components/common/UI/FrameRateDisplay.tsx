import React, { useEffect, useRef } from 'react';
import { Container, Root, Text } from '@react-three/uikit';
import { Card } from '@react-three/uikit-default';
import XRUIWrapper from './XRUIWrapper';
import { useFrameRate } from '../../../hooks/useFrameRate';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

interface FrameRateDisplayProps {
  position?: [number, number, number];
}

const FrameRateDisplay: React.FC<FrameRateDisplayProps> = ({
  position = [2, 1.5, -5]
}) => {
  const fps = useFrameRate();
  const wrapperRef = useRef<THREE.Mesh>(null);
  
  // Ensure the FPS counter is always facing the camera
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.lookAt(0, 0, 0);
    }
  },[wrapperRef.current])
  
  return (
    <XRUIWrapper ref={wrapperRef} position={position}>
      <Root flexDirection="row">
        <Card height={40} width={110} opacity={0.9} receiveShadow color="green">
          <Container
            flexDirection="row"
            gap={4}
            padding={4}
            justifyContent={'center'}
          >
            <Text fontSize={18} color="white">FPS: </Text>
            <Text fontSize={24} color="white">{`${fps}`}</Text>
          </Container>
        </Card>
      </Root>
    </XRUIWrapper>
  );
};

export default FrameRateDisplay;
