import { XRSessionMode } from 'iwer/lib/session/XRSession';
import React from 'react';

interface XRButton2DProps {
  mode: XRSessionMode;
  store: any;
  onXRRequestSuccess: (mode: XRSessionMode) => void;
}

const XRButton2D = ({ mode, store, onXRRequestSuccess }: XRButton2DProps) => {
  const onEnterXR = () => {
    navigator?.xr?.isSessionSupported(mode).then((supported) => {
      if (supported) {
        if (mode === XRSessionMode.ImmersiveAR) {
          store.enterAR();
        } else {
          store.enterVR();
        }
        onXRRequestSuccess(mode);
      } else {
        window.alert(`${mode} is not supported on this device`);
      }
    });
  };

  return (
    <button
      style={{
        bottom: '1em',
        color: 'black',
        padding: '0.5em 1em',
        cursor: 'pointer',
        fontSize: '2em',
      }}
      onClick={onEnterXR}
    >
      {mode === XRSessionMode.ImmersiveVR
        ? 'Enter Immersive VR'
        : 'Enter Immersive AR'}
    </button>
  );
};

export default XRButton2D;
