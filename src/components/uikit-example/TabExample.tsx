import React from 'react';

import { Container, Text } from '@react-three/uikit';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@react-three/uikit-default';

export default function TabExample() {
  return (
    <Tabs defaultValue="account" width={600}>
      <TabsList width="100%">
        <TabsTrigger flexGrow={1} value="account">
          <Text>Enter Immersive VR</Text>
        </TabsTrigger>
        <TabsTrigger flexGrow={1} value="password">
          <Text>Enter Immersive AR</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card width={600}>
          <CardHeader>
            <CardTitle>
              <Text>Enter Immersive VR</Text>
            </CardTitle>
            <CardDescription>
              <Text>
                Make changes to your account here. Click save when you're done.
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent flexDirection="column" gap={8}>
            <Container flexDirection="column" gap={4}>
              <Label>
                <Text>Name</Text>
              </Label>
              <Text>Pedro Duarte</Text>
            </Container>
            <Container flexDirection="column" gap={4}>
              <Label>
                <Text>Username</Text>
              </Label>
              <Text>@peduarte</Text>
            </Container>
          </CardContent>
          <CardFooter>
            <Button width={'100%'}>
              <Text>START GAME VR MODE</Text>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card width={600}>
          <CardHeader>
            <CardTitle>
              <Text>Enter Immersive AR</Text>
            </CardTitle>
            <CardDescription>
              <Text>
                Change your password here. After saving, you'll be logged out.
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent flexDirection="column" gap={8}>
            <Container flexDirection="column" gap={4}>
              <Label>
                <Text>Current password</Text>
              </Label>
              <Text>password</Text>
            </Container>
            <Container flexDirection="column" gap={4}>
              <Label>
                <Text>New password</Text>
              </Label>
              <Text>password</Text>
            </Container>
          </CardContent>
          <CardFooter>
            <Button width={'100%'}>
              <Text>START GAME XR MODE</Text>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
