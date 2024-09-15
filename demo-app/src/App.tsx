import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import { Container, Root } from '@react-three/uikit';
import { Progress } from '@react-three/uikit-default';
import { XRSessionMode } from 'iwer/lib/session/XRSession';

import XRButton from './components/common/UI/XRButton';
import { useXRSession } from './hooks/useXRSession';

import './App.css';
import { OrbitControls } from '@react-three/drei';
import SimpleXRScene from './scene/SimpleXRScene';
// import MonsterSpawnScene from './scene/MonsterSpawnScene';

// Add this line
const store = createXRStore({
  frameRate: 'high',
});

function App() {
  // // There is some bugs that state mode value is not match with session object.
  // // So, we store the session mode here.
  // const [sessionMode, setSessionMode] = useState<XRSessionMode | null>(null);

  const {
    onXRRequestChangeMode,
    onXRRequestReset,
    sessionMode,
    isLoading,
    progress,
  } = useXRSession({ store });

  return (
    <>
      <Canvas>
        <OrbitControls />
        <XR store={store}>
          <SimpleXRScene
            sessionMode={sessionMode}
            onSessionEnd={onXRRequestReset}
          />
        </XR>

        {/* <MonsterSpawnScene /> */}

        {/* Example render UIKit */}
        <Root>
          <Container flexDirection={'column'}>
            {isLoading && <Progress value={progress} width={200} />}

            {sessionMode === null && !isLoading && (
              <Container gap={20}>
                <XRButton
                  onClick={() =>
                    onXRRequestChangeMode(XRSessionMode.ImmersiveVR)
                  }
                  label={'Enter Immersive VR'}
                />
                <XRButton
                  onClick={() =>
                    onXRRequestChangeMode(XRSessionMode.ImmersiveAR)
                  }
                  label={'Enter Immersive AR'}
                />
              </Container>
            )}
          </Container>
        </Root>
      </Canvas>

      {/** TODO: REMOVE */}
      {/* {sessionMode === null && (
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
      )} */}
    </>
  );
}

export default App;
