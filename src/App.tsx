import { useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
// import { Container, Root } from '@react-three/uikit';
import { XRSessionMode } from 'iwer/lib/session/XRSession';

import XRButton from './common/XRButton';
import SimpleXRScene from './scene/SimpleXRScene';
// import TabExample from './components/uikit-example/TabExample';

import './App.css';

// Add this line
const store = createXRStore({
  frameRate: 'high',
});

function App() {
  // There is some bugs that state mode value is not match with session object.
  // So, we store the session mode here.
  const [sessionMode, setSessionMode] = useState<XRSessionMode | null>(null);
  return (
    <>
      <Canvas>
        {/* <OrbitControls /> */}
        <XR store={store}>
          <SimpleXRScene
            sessionMode={sessionMode}
            onSessionEnd={() => {
              setSessionMode(null);
            }}
          />
        </XR>

        {/* Example render UIKit */}
        {/* <Root>
          <Container flexDirection={'column'}>
            <TabExample />
          </Container>
        </Root> */}
      </Canvas>
      {sessionMode === null && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            alignItems: 'center',
            width: '100%',
            left: '50%',
            top: '85%',
            translate: '-50%',
            justifyContent: 'space-around',
          }}
        >
          <XRButton
            mode={XRSessionMode.ImmersiveVR}
            store={store}
            onXRRequestSuccess={setSessionMode}
          />
          <XRButton
            mode={XRSessionMode.ImmersiveAR}
            store={store}
            onXRRequestSuccess={setSessionMode}
          />
        </div>
      )}
    </>
  );
}

export default App;
