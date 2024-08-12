import './App.css';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import SimpleMeshScene from './scene/SimpleMeshScene';
import { XRSessionMode } from 'iwer/lib/session/XRSession';

// Add this line
const store = createXRStore({
  frameRate: 'high',
});

function App() {
  const onEnterAR = () => {
    navigator?.xr
      ?.isSessionSupported(XRSessionMode.ImmersiveAR)
      .then((supported) => {
        if (supported) {
          store.enterAR();
        } else {
          window.alert('AR is not supported on this device');
        }
      });
  };
  return (
    <>
      <Canvas>
        <XR store={store}>
          <SimpleMeshScene />
        </XR>
      </Canvas>
      <div>
        <button
          style={{
            position: 'absolute',
            bottom: '1em',
            color: 'black',
            left: '50%',
            translate: '-50%',
            padding: '0.5em 1em',
            cursor: 'pointer',
            fontSize: '2em',
          }}
          onClick={onEnterAR}
        >
          Enter Immersive VR
        </button>
      </div>
    </>
  );
}

export default App;
