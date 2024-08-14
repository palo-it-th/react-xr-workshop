import './App.css';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import SimpleMeshScene from './scene/SimpleScene';
import { XRSessionMode } from 'iwer/lib/session/XRSession';
import XRButton from './common/XRButton';

// Add this line
const store = createXRStore({
  frameRate: 'high',
});

function App() {
  return (
    <>
      <Canvas>
        <XR store={store}>
          <SimpleMeshScene />
        </XR>
      </Canvas>
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
        <XRButton mode={XRSessionMode.ImmersiveVR} store={store} />
        <XRButton mode={XRSessionMode.ImmersiveAR} store={store} />
      </div>
    </>
  );
}

export default App;
