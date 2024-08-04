import './App.css';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import SimpleMeshScene from './scene/SimpleMeshScene';
import { ErrorBoundary } from 'react-error-boundary';
import * as THREE from 'three'; // Add this line

const store = createXRStore({ frameRate: 'high' });

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
        <Canvas>
          <XR store={store}>
            <color attach="background" args={['#111']} />
            <ambientLight intensity={2} />
            <pointLight position={[20, 10, -10]} intensity={2} />
            <primitive object={new THREE.AxesHelper(2)} />
            <primitive object={new THREE.GridHelper(20, 20)} />
            <SimpleMeshScene />
          </XR>
        </Canvas>
      </ErrorBoundary>
    </>
  );
}

export default App;
