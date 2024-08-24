import './App.css';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import SimpleXRScene from './scene/SimpleXRScene';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import XRButton from './common/XRButton';
import { useState } from 'react';

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
        <XR store={store}>
          <SimpleXRScene
            sessionMode={sessionMode}
            onSessionEnd={() => {
              setSessionMode(null);
            }}
          />
        </XR>
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
