import './App.css';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import SimpleMeshScene from './scene/SimpleMeshScene';
import { ErrorBoundary } from 'react-error-boundary';
// Add this line

const store = createXRStore({ frameRate: 'high' });

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
        <Canvas>
          <XR store={store}>
            <SimpleMeshScene />
          </XR>
        </Canvas>
      </ErrorBoundary>
    </>
  );
}

export default App;
