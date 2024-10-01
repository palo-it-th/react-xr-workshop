import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import Simple3DModelAnimationScene from './3DObject/scenes/Simple3DModelAnimationScene';
import SimpleVFXScene from './VFX/scenes/SimpleVFXScene';
import SimpleCycleSkyBoxScene from './SkyBox/ scenes/SimpleSkyBoxScene';
import SimpleUIScene from './UI/scenes/SimpleUIScene';

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
        {/* <Simple3DModelAnimationScene /> */}
        {/* <SimpleVFXScene /> */}
        {/* <SimpleCycleSkyBoxScene /> */}
        <SimpleUIScene />
      </Canvas>
    </>
  );
}

export default App;
