import React from 'react';
import { Container, Root, Text } from '@react-three/uikit';
import { Progress, Button, Card } from '@react-three/uikit-default';
import ExampleHTML from './ExampleHTML';

export default function ExampleUI() {
  return (
    <group position={[0, 2, -3]}>
      <Root gap={20}>
        <Container>
          <Card borderRadius={32} padding={32} gap={8} flexDirection="column">
            <Text fontSize={32}>Hello World!</Text>
            <Text fontSize={24} opacity={0.7}>
              This is the UIKit card.
            </Text>
          </Card>
        </Container>

        <Text fontWeight="bold" color="white">
          Hello World!
        </Text>

        <Progress value={90} width={200} />

        <Container>
          <Button variant="outline" backgroundColor="white">
            <Text>Button</Text>
          </Button>
        </Container>
        <Container>
          <ExampleHTML />
        </Container>
      </Root>
    </group>
  );
}
