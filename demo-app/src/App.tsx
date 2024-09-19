import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';

import './App.css';
import AllGameScene from './scene/AllGameScene';
// import MonsterSpawnScene from './scene/MonsterSpawnScene';

// Add this line
const store = createXRStore({
  frameRate: 'high',
});

function App() {
  return (
    <>
      <Canvas>
        {/* <OrbitControls /> */}
        <XR store={store}>
          <AllGameScene store={store} />
        </XR>

        {/* <MonsterSpawnScene /> */}

        {/* Example render UIKit */}
        {/* <Root>
          <Container flexDirection={'column'}>
            {isLoading && <Progress value={progress} width={200} />}
          </Container>
        </Root> */}
      </Canvas>
    </>
  );
}

export default App;
