import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import Simple3DScene from './3DObject/scenes/Simple3DScene';
import Simple3DModelAnimationScene from './3DObject/scenes/Simple3DModelAnimationScene';

// const store = createXRStore({
//   frameRate: 'high',
// });

function App() {
  return (
    <>
      <Canvas>
        {/* <OrbitControls /> */}
        {/* <XR store={store}>
          
        </XR> */}

        {/* <Simple3DScene /> */}
        <Simple3DModelAnimationScene />
      </Canvas>
    </>
  );
}

export default App;
