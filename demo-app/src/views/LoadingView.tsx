import React from 'react';

import XRUIWrapper from '../components/common/UI/XRUIWrapper';
import { Container, Root } from '@react-three/uikit';
import { Progress } from '@react-three/uikit-default';

interface LoadingViewProps {
  progress: number;
}

export default function LoadingView({ progress }: LoadingViewProps) {
  return (
    <XRUIWrapper position={[0, 0, -2]} scale={0.2}>
      <Root>
        <Container flexDirection={'column'}>
          <Progress value={progress} width={200} />
        </Container>
      </Root>
    </XRUIWrapper>
  );
}
