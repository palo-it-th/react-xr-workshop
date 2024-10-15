import { Canvas } from '@react-three/fiber';
import { createXRStore, XR } from '@react-three/xr';
import Simple3DModelAnimationScene from './3DObject/scenes/Simple3DModelAnimationScene';
import SimpleVFXScene from './VFX/scenes/SimpleVFXScene';
import SimpleCycleSkyBoxScene from './SkyBox/ scenes/SimpleSkyBoxScene';
import SimpleUIScene from './UI/scenes/SimpleUIScene';
import Simple3DRenderScene from './Basic/scenes/Simple3DRenderScene';
import Simple3DUtilitiesScene from './Basic/scenes/Simple3DUtilitiesScene';
import LandingScene from './LandingScene';

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

        <LandingScene />
      </Canvas>
    </>
  );
}

export default App;
