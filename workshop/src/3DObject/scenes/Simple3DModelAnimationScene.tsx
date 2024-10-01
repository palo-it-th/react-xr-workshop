import React, { useState } from 'react';
import { AxesHelper, GridHelper } from 'three';
import { Html, OrbitControls } from '@react-three/drei';
import { CatActionName, CatModel } from '../components/Cat';

const actions: CatActionName[] = [
  'ArmatureAction',
  'Dead',
  'Drinking',
  'Jump_Quick',
  'Jump_Slow',
  'Looking',
  'Run1',
  'Run2',
  'Sitting1',
  'Tailing',
  'Waiting',
  'Walking',
];

export default function Simple3DModelAnimationScene() {
  const [modelAction, setModelAction] = useState<CatActionName | undefined>();
  const [stopModelAction, setStopModelAction] = useState<
    CatActionName | undefined
  >();
  const [resetAction, setResetAction] = useState(false);

  return (
    <>
      <OrbitControls />
      {/* <CameraShake /> */}
      <color attach="background" args={['#111']} />
      <ambientLight intensity={2} />
      <primitive object={new AxesHelper(2)} />
      <primitive object={new GridHelper(40, 40)} />
      <CatModel
        triggerAction={modelAction}
        stopAction={stopModelAction}
        stopAllActions={resetAction}
        scale={0.5}
      />

      <Html fullscreen>
        <div style={{ display: 'flex', flexDirection: 'column', width: 150 }}>
          {actions.map((action) => (
            <button
              style={{ margin: 5, padding: 5 }}
              key={action}
              onClick={() => {
                if (resetAction) {
                  setResetAction(false);
                }
                setStopModelAction(modelAction);
                setModelAction(action);
              }}
            >
              {action}
            </button>
          ))}

          <button
            style={{ margin: 5, padding: 5 }}
            onClick={() => {
              setResetAction(true);
            }}
          >
            RESET
          </button>
        </div>
      </Html>
    </>
  );
}
