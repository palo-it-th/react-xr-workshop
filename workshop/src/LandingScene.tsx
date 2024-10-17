import { Html } from '@react-three/drei';
import React, { useState } from 'react';
import Simple3DModelAnimationScene from './3DObject/scenes/Simple3DModelAnimationScene';
import Simple3DRenderScene from './Basic/scenes/Simple3DRenderScene';
import Simple3DUtilitiesScene from './Basic/scenes/Simple3DUtilitiesScene';
import SimpleCycleSkyBoxScene from './SkyBox/ scenes/SimpleSkyBoxScene';
import SimpleUIScene from './UI/scenes/SimpleUIScene';
import SimpleVFXScene from './VFX/scenes/SimpleVFXScene';
import Simple3DModelToJSXScene from './3DObject/scenes/Simple3DModelToJSXScene';
import Simple3DModelTransitionsScene from './3DObject/scenes/Simple3DModelTransitionsScene';
import SimpleXRSelect from './UI/scenes/SimpleXRSelect';

enum LandingSceneView {
  Landing = 'Landing',
  Basic3DRender = '3DRender',
  Basic3DUtilities = '3DUtilities',
  BasicSkyBox = 'SkyBox',
  BasicVFX = 'VFX',
  Basic3DObject = '3DObject',
  Basic3DTransitions = '3DTransitions',
  Basic3DObjectAnimation = '3DAnimation',
  BasicUI = 'UI',
  BasicXR = 'XR',
}

export default function LandingScene() {
  const [currentView, setCurrentView] = useState(LandingSceneView.Landing);
  const [backgroundImage, setBackgroundImage] = useState<any>({
    backgroundImage: 'url(/BG/react-three-fiber.jpg)',
  });

  return (
    <>
      <Html fullscreen>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...backgroundImage,
          }}
        >
          {currentView === LandingSceneView.Landing && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 200,
                gap: 10,
              }}
            >
              {Object.values(LandingSceneView).map((view) => {
                if (view === LandingSceneView.Landing) return null;
                return (
                  <button
                    key={view}
                    onClick={() => {
                      setCurrentView(view);
                      setBackgroundImage({});
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid black',
                      borderRadius: 5,
                    }}
                  >
                    {view}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Html>
      {/* Basic Render and Utilities */}
      {currentView === LandingSceneView.Basic3DRender && (
        <Simple3DRenderScene />
      )}
      {currentView === LandingSceneView.Basic3DUtilities && (
        <Simple3DUtilitiesScene />
      )}

      {/* 3D Objects */}
      {currentView === LandingSceneView.Basic3DObject && (
        <Simple3DModelToJSXScene />
      )}
      {currentView === LandingSceneView.Basic3DObjectAnimation && (
        <Simple3DModelAnimationScene />
      )}
      {currentView === LandingSceneView.Basic3DTransitions && (
        <Simple3DModelTransitionsScene />
      )}

      {/* UI */}
      {currentView === LandingSceneView.BasicUI && <SimpleUIScene />}

      {/* SkyBox */}
      {currentView === LandingSceneView.BasicSkyBox && (
        <SimpleCycleSkyBoxScene />
      )}

      {/* Visual Effects */}
      {currentView === LandingSceneView.BasicVFX && <SimpleVFXScene />}

      {/* XR */}
      {currentView === LandingSceneView.BasicXR && <SimpleXRSelect />}
    </>
  );
}
