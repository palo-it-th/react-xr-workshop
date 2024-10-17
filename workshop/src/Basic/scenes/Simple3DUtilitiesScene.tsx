import React, { useState } from 'react';
import BasicBox from '../components/Box';
import { CameraControls, Html } from '@react-three/drei';

export default function Simple3DUtilitiesScene() {
  const [enableAmbientLight, setEnableAmbientLight] = useState(false);
  const [enableSpotLight, setEnableSpotLight] = useState(false);
  const [enablePointLight, setEnablePointLight] = useState(false);

  const [enableControls, setEnableControls] = useState(true);

  return (
    <>
      <color attach="background" args={['#111']} />
      {/* CameraControls is a component that provides a set of controls for the camera*/}
      {enableControls && <CameraControls />}
      {/* ambientLight is a component that adds ambient light to the scene */}
      {enableAmbientLight && <ambientLight intensity={2} />}
      {/* spotLight is a component that adds a spotlight to the scene */}
      {enableSpotLight && (
        <>
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            isSpotLight
          />
          {/* <SpotLight
            castShadow
            color="#0c8cbf"
            penumbra={1}
            distance={6}
            angle={0.35}
            attenuation={5}
            anglePower={4}
            intensity={2}
            position={[-2, 2, 0]}
          />
          <SpotLight
            castShadow
            color="#b00c3f"
            penumbra={1}
            distance={6}
            angle={0.35}
            attenuation={5}
            anglePower={4}
            intensity={2}
            position={[2, 2, 0]}
          /> */}
        </>
      )}
      {/* pointLight is a component that adds a point light to the scene */}
      {enablePointLight && (
        <pointLight color={'#fff'} intensity={2} position={[0, 0, 0]} />
      )}
      {/* BasicBox is a component that renders a box */}
      <BasicBox position={[-1.2, 0, 0]} />
      <BasicBox position={[1.2, 0, 0]} />

      <Html fullscreen>
        <div style={{ display: 'flex', flexDirection: 'column', width: 180 }}>
          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setEnableAmbientLight(!enableAmbientLight);
            }}
          >
            {enableAmbientLight ? 'Disable' : 'Enable'} Ambient Light
          </button>
          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setEnableSpotLight(!enableSpotLight);
            }}
          >
            {enableSpotLight ? 'Disable' : 'Enable'} Spot Light
          </button>
          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setEnablePointLight(!enablePointLight);
            }}
          >
            {enablePointLight ? 'Disable' : 'Enable'} Point Light
          </button>

          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setEnableAmbientLight(true);
              setEnableSpotLight(true);
              setEnablePointLight(true);
            }}
          >
            Enable All Light
          </button>

          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setEnableAmbientLight(false);
              setEnableSpotLight(false);
              setEnablePointLight(false);
            }}
          >
            Disable All Light
          </button>

          <div style={{ height: 40 }} />

          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setEnableControls(!enableControls);
            }}
          >
            {enableControls ? 'Disable' : 'Enable'} Camera Controls
          </button>
        </div>
      </Html>
    </>
  );
}
