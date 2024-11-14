import { Html, CameraControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { XRSessionMode } from 'iwer/lib/session/XRSession';

import CircleSkyBox from '../components/common/SkyBoxes/CircleSkyBox';
import Button2D from '../components/common/UI/Button2D';
import { GreenArcadeMachine } from '../components/common/3DObjects/GreenArcadeMachine';
import '../styles/StartGameScene.css';

const FOCUS_POINT = new Vector3(1.5, -20, -175);
const GAME_MACHINE_POINT = new Vector3(0, -75, -185);

interface StartGameSceneProps {
  onGameStart: (mode: XRSessionMode) => void;
}

export default function HomeView({ onGameStart }: StartGameSceneProps) {
  const cameraRef = useRef<CameraControls>(null);
  const isStartedRef = useRef<boolean>(false);
  const modeRef = useRef<XRSessionMode | null>(null);

  const handleStartGame = (mode: XRSessionMode) => {
    modeRef.current = mode;
    handleGoToTheArcade();
  };

  const handleGoToTheArcade = () => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;
    if (cameraRef.current) {
      cameraRef.current?.reset(true);
      cameraRef.current?.moveTo(
        FOCUS_POINT.x,
        FOCUS_POINT.y,
        FOCUS_POINT.z,
        true,
      );
    }
    setTimeout(() => {
      onGameStart && onGameStart(modeRef.current!);
    }, 2500);
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current?.reset(true);
    }
  }, []);

  return (
    <>
      <CircleSkyBox textureUrl="/sky-box/room.jpeg" />
      <ambientLight intensity={2} />
      <directionalLight
        position={[0, 5, 1]}
        rotation={[0, 0, 0]}
        intensity={20}
      />

      <CameraControls ref={cameraRef} />

      <GreenArcadeMachine position={GAME_MACHINE_POINT} scale={30} />

      {!isStartedRef.current && (
        <Html fullscreen>
          <div className="banner-container">
            <img src="/colour_logo.png" alt="banner" />
            <div className="presented">Galactic XR Shooter</div>
          </div>
          <div className="start-game-container">
            <Button2D
              style={{ width: '400px' }}
              label="Enter Immersive VR"
              onClick={() => handleStartGame(XRSessionMode.ImmersiveVR)}
            />
            <Button2D
              style={{ width: '400px' }}
              label="Enter Immersive AR"
              onClick={() => handleStartGame(XRSessionMode.ImmersiveAR)}
            />
          </div>
        </Html>
      )}
    </>
  );
}
